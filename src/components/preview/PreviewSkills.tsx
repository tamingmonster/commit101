import type { ResumeData } from '../../types/resume';

interface PreviewSkillsProps {
  skills: ResumeData['skills'];
  settings: ResumeData['settings'];
}

export const PreviewSkills = ({ skills, settings }: PreviewSkillsProps) => {
  const items = skills.flatMap((skill) => skill.items).filter(Boolean);
  if (items.length === 0 || !settings.visibleSections.skills) return null;

  return (
    <section className="flex flex-wrap gap-[length:var(--spacing-inner)]">
      {items.map((item, index) => (
        <span 
          key={index}
          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
        >
          {item}
        </span>
      ))}
    </section>
  );
};
