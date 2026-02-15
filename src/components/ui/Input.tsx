import { Eye, EyeOff } from 'lucide-react';

export type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
};

export const Input = ({ label, value, onChange, type = 'text', placeholder = '', className = '', isVisible = true, onToggleVisibility }: InputProps) => (
  <div className={className}>
    <div className="flex items-center justify-start mb-1.5">
      <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide uppercase opacity-80">{label}</label>
      {onToggleVisibility && (
        <button
          onClick={onToggleVisibility}
          className={`text-xs p-1 rounded hover:bg-white/10 transition-colors ${isVisible ? 'text-blue-400' : 'text-gray-600'}`}
        >
          {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
      )}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-black/20 hover:bg-black/30 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 ${!isVisible && 'opacity-50 grayscale'}`}
    />
  </div>
);
