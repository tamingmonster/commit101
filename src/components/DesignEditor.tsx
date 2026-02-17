import { useResumeStore } from '../store/useResumeStore';
import { Check } from 'lucide-react';
import { themes, themeLabels } from '../utils/themes';
import type { ThemeColor } from '../utils/themes';

const themeStyles: Record<ThemeColor, { bg: string; border: string; ring: string }> = {
  blue: { bg: 'bg-blue-600', border: 'border-blue-500', ring: 'ring-blue-500' },
  purple: { bg: 'bg-purple-600', border: 'border-purple-500', ring: 'ring-purple-500' },
  green: { bg: 'bg-emerald-600', border: 'border-emerald-500', ring: 'ring-emerald-500' },
  orange: { bg: 'bg-orange-600', border: 'border-orange-500', ring: 'ring-orange-500' },
  red: { bg: 'bg-red-600', border: 'border-red-500', ring: 'ring-red-500' },
  gray: { bg: 'bg-gray-700', border: 'border-gray-500', ring: 'ring-gray-500' },
};

export const DesignEditor = () => {
  const store = useResumeStore();
  const activeResume = store.resumes.find((resume) => resume.id === store.activeResumeId) ?? store.resumes[0];
  if (!activeResume) return null;
  const { settings } = activeResume.data;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide uppercase opacity-80 mb-3">Theme Color</label>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(themes) as ThemeColor[]).map((color) => {
                const isSelected = settings.themeColor === color;
                const styles = themeStyles[color];
                return (
                  <button
                    key={color}
                    onClick={() => store.updateSettings({ themeColor: color })}
                    className={`group relative w-7 h-7 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? `${styles.bg} shadow-md scale-105`
                        : `bg-transparent border ${styles.border} opacity-60 hover:opacity-100 hover:scale-105`
                    }`}
                    title={themeLabels[color]}
                  >
                    {isSelected && (
                      <Check size={14} className="text-white stroke-[3] relative z-10" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide uppercase opacity-80 mb-2">Layout Details</label>
          <button
            onClick={() => store.updateSettings({ showLineNumbersSidebar: !settings.showLineNumbersSidebar })}
            className={`inline-flex items-center justify-between w-full px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
              settings.showLineNumbersSidebar
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/40'
                : 'bg-black/20 text-gray-400 border-white/5 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <span>Code line numbers sidebar</span>
            <span
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                settings.showLineNumbersSidebar ? 'bg-purple-500/80' : 'bg-gray-600'
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full bg-white transform transition-transform ${
                  settings.showLineNumbersSidebar ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </span>
          </button>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide uppercase opacity-80 mb-2">Density</label>
          <div className="flex bg-black/20 p-1 rounded-lg border border-white/5">
            {(['compact', 'normal', 'loose'] as const).map((d) => (
              <button
                key={d}
                onClick={() => store.updateSettings({ density: d })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  settings.density === d
                    ? 'bg-purple-500/20 text-purple-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide uppercase opacity-80 mb-2">Header Style</label>
          <div className="grid grid-cols-4 gap-2">
            {(['js', 'python', 'java', 'go', 'plain'] as const).map((style) => (
              <button
                key={style}
                onClick={() => store.updateSettings({ headerStyle: style })}
                className={`py-2 text-xs font-medium rounded-md transition-all capitalize border ${
                  (settings.headerStyle || 'js') === style
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-sm'
                    : 'text-gray-500 border-white/5 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {style === 'java' ? 'java/C++' : style === 'js' ? 'JavaScript/Rust' : style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
