import { Link as LinkIcon } from 'lucide-react';
import type { ResumeData } from '../../types/resume';

interface PreviewProjectsProps {
  projects: ResumeData['projects'];
  settings: ResumeData['settings'];
}

export const PreviewProjects = ({ projects, settings }: PreviewProjectsProps) => {
  if (projects.length === 0 || !settings.visibleSections.projects) return null;

  return (
    <section className="mb-2">
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold border-b border-gray-200 pb-2">
         <span className="inline-flex items-center gap-2 text-xl leading-none">
           <span className="leading-none">🚀</span>
          <span>{settings.sectionTitles.projects}</span>
         </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {projects.map(proj => (
          <div key={proj.id} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-gray-800 inline-flex items-center gap-1 leading-tight">
                  {proj.name}
                  {proj.link && proj.visibleLink && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-400 hover:text-blue-600">
                      <LinkIcon size={12} className="block" />
                    </a>
                  )}
                </h3>
                {proj.visibleRole && (
                  <span className="text-xs text-blue-600 font-mono">| {proj.role}</span>
                )}
              </div>
              <span className="inline-flex items-center h-5 text-xs font-mono text-gray-500 leading-none whitespace-nowrap">{proj.startDate} - {proj.endDate}</span>
            </div>
            {proj.visibleDescription && (
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{proj.description}</p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {proj.techStack.map((tech, idx) => (
                <span key={idx} className="inline-flex items-center h-4 text-[10px] px-1.5 bg-white border border-gray-200 rounded text-gray-500 font-mono leading-none">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
