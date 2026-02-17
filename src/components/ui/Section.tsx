import { useState, type ReactNode } from 'react';
import { ChevronDown, Eye, EyeOff, type LucideIcon } from 'lucide-react';

export type SectionProps = {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  defaultOpen?: boolean;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  color?: 'blue' | 'purple';
};

export const Section = ({ title, icon: Icon, children, defaultOpen = false, isVisible = true, onToggleVisibility, color = 'blue' }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const colors = {
    blue: {
      text: 'text-blue-400',
      bg: 'group-hover:bg-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'group-hover:bg-purple-500/20',
    },
  };
  
  const activeColor = colors[color];

  return (
    <div className="border-b border-white/5 last:border-none">
      <div 
        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 font-medium text-gray-200 group-hover:text-white transition-colors">
          <div className={`p-1.5 rounded-md bg-white/5 ${activeColor.bg} ${activeColor.text} transition-colors`}>
            <Icon size={16} />
          </div>
          {title}
        </div>
        <div className="flex items-center gap-2">
          {onToggleVisibility && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility();
              }}
              className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${isVisible ? activeColor.text : 'text-gray-500'}`}
              title={isVisible ? "Visible" : "Hidden"}
            >
              {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}
          <div className={`p-1.5 rounded-md text-gray-500 group-hover:text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <ChevronDown size={16} />
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};
