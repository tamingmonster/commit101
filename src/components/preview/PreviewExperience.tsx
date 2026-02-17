import type { ResumeData } from '../../types/resume';
import { themes } from '../../utils/themes';

interface PreviewExperienceProps {
  experience: ResumeData['experience'];
  settings: ResumeData['settings'];
}

export const PreviewExperience = ({ experience, settings }: PreviewExperienceProps) => {
  if (experience.length === 0 || !settings.visibleSections.experience) return null;
  const theme = themes[settings.themeColor || 'blue'] || themes.blue;

  return (
    <section>
      <div className="flex items-center gap-2 mb-[length:var(--spacing-inner)] text-gray-900 font-bold border-b border-gray-200 pb-2">
         <span className="inline-flex items-center gap-2 text-xl leading-none">
           <span className="leading-none">💼</span>
          <span>{settings.sectionTitles.experience}</span>
         </span>
      </div>
      <div>
        {experience.map(exp => (
          <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200 pb-[length:var(--spacing-item)] last:pb-0">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 border-2 border-white"></div>
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-gray-800 leading-tight">{exp.position}</h3>
                <span className={`text-sm font-medium ${theme.primary} font-mono`}>@ {exp.company}</span>
              </div>
              <span className="inline-flex items-center h-5 text-xs font-mono text-gray-500 bg-gray-50 px-2 rounded leading-none whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
            </div>
            {exp.visibleDescription && (
              <p className="text-sm text-gray-600 leading-[var(--line-height)] whitespace-pre-line">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
