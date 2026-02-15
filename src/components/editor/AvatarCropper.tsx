import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

export const AvatarCropper = () => {
  const store = useResumeStore();
  const { resumes, activeResumeId } = store;
  const activeResume = resumes.find((resume) => resume.id === activeResumeId) ?? resumes[0];
  const { profile, settings } = activeResume?.data || {};

  const [avatarError, setAvatarError] = useState('');
  const [isCropping, setIsCropping] = useState(false);
  const [rawAvatar, setRawAvatar] = useState('');
  const [avatarZoom, setAvatarZoom] = useState(1);
  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });
  const [avatarBaseScale, setAvatarBaseScale] = useState(1);
  const [avatarImageSize, setAvatarImageSize] = useState({ width: 0, height: 0 });
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });
  const avatarImageRef = useRef<HTMLImageElement | null>(null);
  
  const cropSize = 280;
  const targetAvatarSize = 320;
  const avatarQuality = 0.85;
  const maxAvatarBytes = 2 * 1024 * 1024;

  if (!activeResume) return null;

  const clampAvatarOffset = (x: number, y: number, displayWidth: number, displayHeight: number) => {
    const minX = cropSize - displayWidth;
    const minY = cropSize - displayHeight;
    const nextX = Math.min(0, Math.max(minX, x));
    const nextY = Math.min(0, Math.max(minY, y));
    return { x: nextX, y: nextY };
  };

  const computeDisplaySize = (naturalWidth: number, naturalHeight: number, zoom = avatarZoom) => {
    const baseScale = cropSize / Math.min(naturalWidth, naturalHeight);
    const displayWidth = naturalWidth * baseScale * zoom;
    const displayHeight = naturalHeight * baseScale * zoom;
    return { baseScale, displayWidth, displayHeight };
  };

  const handleAvatarUpload = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please choose an image file');
      return;
    }
    if (file.size > maxAvatarBytes) {
      setAvatarError('Image size must be under 2MB');
      return;
    }
    setAvatarError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setRawAvatar(reader.result);
        setAvatarZoom(1);
        setAvatarOffset({ x: 0, y: 0 });
        setIsCropping(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarImageLoad = () => {
    const image = avatarImageRef.current;
    if (!image) return;
    const { baseScale, displayWidth, displayHeight } = computeDisplaySize(image.naturalWidth, image.naturalHeight, 1);
    setAvatarBaseScale(baseScale);
    setAvatarImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    const initialOffset = clampAvatarOffset((cropSize - displayWidth) / 2, (cropSize - displayHeight) / 2, displayWidth, displayHeight);
    setAvatarOffset(initialOffset);
  };

  const handleAvatarMouseDown = (event: React.MouseEvent) => {
    setIsDraggingAvatar(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setStartOffset({ ...avatarOffset });
  };

  const handleAvatarMouseMove = (event: React.MouseEvent) => {
    if (!isDraggingAvatar) return;
    const image = avatarImageRef.current;
    if (!image) return;
    const displayWidth = image.naturalWidth * avatarBaseScale * avatarZoom;
    const displayHeight = image.naturalHeight * avatarBaseScale * avatarZoom;
    const nextOffset = clampAvatarOffset(
      startOffset.x + (event.clientX - dragStart.x),
      startOffset.y + (event.clientY - dragStart.y),
      displayWidth,
      displayHeight
    );
    setAvatarOffset(nextOffset);
  };

  const handleAvatarMouseUp = () => {
    setIsDraggingAvatar(false);
  };

  const handleAvatarZoomChange = (value: number) => {
    const image = avatarImageRef.current;
    if (!image) {
      setAvatarZoom(value);
      return;
    }
    const displayWidth = image.naturalWidth * avatarBaseScale * value;
    const displayHeight = image.naturalHeight * avatarBaseScale * value;
    const nextOffset = clampAvatarOffset(avatarOffset.x, avatarOffset.y, displayWidth, displayHeight);
    setAvatarZoom(value);
    setAvatarOffset(nextOffset);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    setRawAvatar('');
  };

  const handleCropConfirm = () => {
    const image = avatarImageRef.current;
    if (!image) return;
    const displayWidth = image.naturalWidth * avatarBaseScale * avatarZoom;
    const displayHeight = image.naturalHeight * avatarBaseScale * avatarZoom;
    const scaleX = image.naturalWidth / displayWidth;
    const scaleY = image.naturalHeight / displayHeight;
    const sourceX = Math.max(0, -avatarOffset.x * scaleX);
    const sourceY = Math.max(0, -avatarOffset.y * scaleY);
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight, cropSize * scaleX);
    const canvas = document.createElement('canvas');
    canvas.width = targetAvatarSize;
    canvas.height = targetAvatarSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setAvatarError('Avatar processing failed. Please try again.');
      return;
    }
    ctx.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, targetAvatarSize, targetAvatarSize);
    const dataUrl = canvas.toDataURL('image/jpeg', avatarQuality);
    store.updateProfile({ avatarUrl: dataUrl });
    setIsCropping(false);
    setRawAvatar('');
  };

  return (
    <div className="col-span-2">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs text-gray-500 font-mono">Avatar</label>
        <button
          onClick={() => store.toggleProfileVisibility('avatar')}
          className={`text-xs hover:text-blue-400 transition-colors ${settings.visibleProfile.avatar ? 'text-blue-500/70' : 'text-gray-600'}`}
        >
          {settings.visibleProfile.avatar ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center cursor-pointer">
          <div className="mr-3 py-2 px-3 rounded bg-gray-700 text-gray-200 text-xs hover:bg-gray-600 transition-colors">
            Choose File
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
            className="hidden"
          />
        </label>
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt="avatar"
            className={`w-10 h-10 rounded-full object-cover border border-gray-700 ${!settings.visibleProfile.avatar && 'opacity-50'}`}
          />
        )}
      </div>
      <div className="mt-1 text-[11px] text-gray-500">
        Supports local images, auto-crops to square and compresses, max 2MB
      </div>
      {avatarError && (
        <div className="mt-1 text-[11px] text-red-400">
          {avatarError}
        </div>
      )}
      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[520px] rounded-lg bg-[#1e1e1e] border border-gray-800 p-6">
            <div className="text-sm text-gray-300 mb-4">Drag the image to adjust the crop area</div>
            <div
              className="relative mx-auto bg-gray-900 overflow-hidden rounded-md border border-gray-700"
              style={{ width: cropSize, height: cropSize }}
              onMouseMove={handleAvatarMouseMove}
              onMouseUp={handleAvatarMouseUp}
              onMouseLeave={handleAvatarMouseUp}
            >
              <img
                ref={avatarImageRef}
                src={rawAvatar}
                alt="crop"
                onLoad={handleAvatarImageLoad}
                onMouseDown={handleAvatarMouseDown}
                draggable={false}
                className="absolute select-none cursor-move"
                style={{
                  width: avatarImageSize.width ? avatarImageSize.width * avatarBaseScale * avatarZoom : 'auto',
                  height: avatarImageSize.height ? avatarImageSize.height * avatarBaseScale * avatarZoom : 'auto',
                  transform: `translate(${avatarOffset.x}px, ${avatarOffset.y}px)`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 border-2 border-blue-400/70"></div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2">Zoom</div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={avatarZoom}
                onChange={(e) => handleAvatarZoomChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={handleCropCancel}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Use this crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
