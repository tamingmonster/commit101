import type { ResumeData } from '../../types/resume';

interface PreviewExperienceProps {
  experience: ResumeData['experience'];
  settings: ResumeData['settings'];
}

export const PreviewExperience = ({ experience, settings }: PreviewExperienceProps) => {
  if (experience.length === 0 || !settings.visibleSections.experience) return null;

  return (
    <section className="mb-2">
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold border-b border-gray-200 pb-2">
         <span className="inline-flex items-center gap-2 text-xl leading-none">
           <span className="leading-none">💼</span>
          <span>{settings.sectionTitles.experience}</span>
         </span>
      </div>
      <div className="space-y-5">
        {experience.map(exp => (
          <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 border-2 border-white"></div>
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-gray-800 leading-tight">{exp.position}</h3>
                <span className="text-sm font-medium text-blue-600 font-mono">@ {exp.company}</span>
              </div>
              <span className="inline-flex items-center h-5 text-xs font-mono text-gray-500 bg-gray-50 px-2 rounded leading-none whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
            </div>
            {exp.visibleDescription && (
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
