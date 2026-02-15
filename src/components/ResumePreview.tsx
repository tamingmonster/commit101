import { useResumeStore } from '../store/useResumeStore';
import { PreviewHeader } from './preview/PreviewHeader';
import { PreviewSummary } from './preview/PreviewSummary';
import { PreviewSkills } from './preview/PreviewSkills';
import { PreviewExperience } from './preview/PreviewExperience';
import { PreviewProjects } from './preview/PreviewProjects';
import { PreviewEducation } from './preview/PreviewEducation';

export const ResumePreview = () => {
  const { resumes, activeResumeId } = useResumeStore();
  const activeResume = resumes.find((resume) => resume.id === activeResumeId) ?? resumes[0];
  if (!activeResume) return null;
  const { profile, education, experience, projects, skills, settings } = activeResume.data;

  return (
    <div 
      className="resume-preview w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-2xl overflow-hidden relative print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: settings.fontFamily === 'mono' ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' : 'sans-serif' }}
    >
      {/* 装饰性侧边栏 (代码行号风格) */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 flex flex-col items-end pr-2 pt-8 text-xs text-gray-400 font-mono select-none">
        {/* 生成 60 行行号作为装饰，模拟代码编辑器效果 */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="h-6 leading-6">{i + 1}</div>
        ))}
      </div>

      <div className="pl-16 pr-12 py-8 h-full flex flex-col gap-6">
        <PreviewHeader profile={profile} settings={settings} />
        
        <PreviewSummary summary={profile.summary} visible={settings.visibleProfile.summary} />
        
        <PreviewSkills skills={skills} settings={settings} />

        <PreviewProjects projects={projects} settings={settings} />
        
        <PreviewExperience experience={experience} settings={settings} />
        
        <PreviewEducation education={education} settings={settings} />
      </div>
    </div>
  );
};
