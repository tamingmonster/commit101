import { useResumeStore } from '../store/useResumeStore';
import { PreviewHeader } from './preview/PreviewHeader';
import { PreviewSummary } from './preview/PreviewSummary';
import { PreviewSkills } from './preview/PreviewSkills';
import { PreviewExperience } from './preview/PreviewExperience';
import { PreviewProjects } from './preview/PreviewProjects';
import { PreviewEducation } from './preview/PreviewEducation';

const densityStyles = {
  compact: {
    '--spacing-section': '16px',
    '--spacing-item': '12px',
    '--spacing-inner': '4px',
    '--header-pb': '12px',
    '--line-height': '1.3',
  },
  normal: {
    '--spacing-section': '24px',
    '--spacing-item': '20px',
    '--spacing-inner': '8px',
    '--header-pb': '20px',
    '--line-height': '1.625',
  },
  loose: {
    '--spacing-section': '40px',
    '--spacing-item': '32px',
    '--spacing-inner': '16px',
    '--header-pb': '32px',
    '--line-height': '1.8',
  },
};

export const ResumePreview = () => {
  const { resumes, activeResumeId } = useResumeStore();
  const activeResume = resumes.find((resume) => resume.id === activeResumeId) ?? resumes[0];
  if (!activeResume) return null;
  const { profile, education, experience, projects, skills, settings } = activeResume.data;

  return (
    <div 
      className="resume-preview w-[210mm] h-[297mm] bg-white text-gray-900 shadow-2xl overflow-hidden relative print:shadow-none print:w-full print:h-full"
      style={{  
        fontFamily: settings.fontFamily === 'mono' ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' : 'sans-serif',
        ...(densityStyles[settings.density || 'normal'] as React.CSSProperties)
      }}
    >
      {settings.showLineNumbersSidebar && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 flex flex-col items-end pr-2 pt-8 text-xs text-gray-400 font-mono select-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>
      )}

      <div className={`${settings.showLineNumbersSidebar ? 'pl-16 pr-12' : 'px-12'} py-8 h-full flex flex-col gap-[var(--spacing-section)]`}>
        <PreviewHeader profile={profile} settings={settings} />
        
        <PreviewSummary summary={profile.summary} settings={settings} />
        
        <PreviewSkills skills={skills} settings={settings} />

        <PreviewProjects projects={projects} settings={settings} />
        
        <PreviewExperience experience={experience} settings={settings} />
        
        <PreviewEducation education={education} settings={settings} />
      </div>
    </div>
  );
};
