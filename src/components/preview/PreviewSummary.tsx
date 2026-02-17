import type { ResumeData } from '../../types/resume';
import { themes } from '../../utils/themes';

interface PreviewSummaryProps {
  summary: string;
  settings: ResumeData['settings'];
}

export const PreviewSummary = ({ summary, settings }: PreviewSummaryProps) => {
  if (!summary || !settings.visibleProfile.summary) return null;
  
  const { headerStyle = 'js', themeColor = 'blue' } = settings;
  const theme = themes[themeColor] || themes.blue;

  const renderHeader = () => {
    if (headerStyle === 'plain') {
      return null;
    }

    if (headerStyle === 'python') {
      return (
        <div className="flex items-center gap-2 mb-[length:var(--spacing-inner)] text-gray-400 font-mono text-xs uppercase tracking-wider">
          <span className="text-gray-500">#</span> Summary
        </div>
      );
    }

    // Default C-style block comment for JS, Java, C++, Go, Rust
    return (
      <div className="flex items-center gap-2 mb-[length:var(--spacing-inner)] text-gray-400 font-mono text-xs uppercase tracking-wider">
         <span className={theme.secondary}>/**</span> Summary <span className={theme.secondary}>*/</span>
      </div>
    );
  };

  return (
    <section>
      {renderHeader()}
      <p className="text-gray-700 leading-[var(--line-height)] text-sm whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};
