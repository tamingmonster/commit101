import type { ResumeData } from '../../types/resume';

interface PreviewEducationProps {
  education: ResumeData['education'];
  settings: ResumeData['settings'];
}

export const PreviewEducation = ({ education, settings }: PreviewEducationProps) => {
  if (education.length === 0 || !settings.visibleSections.education) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-[length:var(--spacing-inner)] text-gray-900 font-bold border-b border-gray-200 pb-2">
         <span className="inline-flex items-center gap-2 text-xl leading-none">
           <span className="leading-none">🎓</span>
          <span>{settings.sectionTitles.education}</span>
         </span>
      </div>
      <div className="space-y-[length:var(--spacing-item)]">
        {education.map(edu => (
          <div key={edu.id} className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-gray-800 leading-tight">{edu.school}</h3>
                <div className="text-sm text-gray-600">| {edu.degree}</div>
              </div>
              {settings.visibleFields.educationDescription && edu.description && (
                <p className="text-xs text-gray-500 mt-[length:var(--spacing-inner)] leading-[var(--line-height)]">{edu.description}</p>
              )}
            </div>
            <span className="inline-flex items-center h-5 text-xs font-mono text-gray-500 whitespace-nowrap leading-none">{edu.startDate} - {edu.endDate}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
