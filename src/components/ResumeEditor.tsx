import { useResumeStore } from '../store/useResumeStore';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Terminal } from 'lucide-react';
import { Section } from './ui/Section';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { AvatarCropper } from './editor/AvatarCropper';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export const ResumeEditor = () => {
  const store = useResumeStore();
  const activeResume = store.resumes.find((resume) => resume.id === store.activeResumeId) ?? store.resumes[0];
  if (!activeResume) return null;
  const { profile, education, experience, projects, skills, settings } = activeResume.data;
  const flatSkills = skills.flatMap((skill) => skill.items).filter(Boolean);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, height: 0, marginBottom: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', marginBottom: 16, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: -50, height: 0, marginBottom: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="pb-20">
      <Section title="Profile" icon={User} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" value={profile.name} onChange={(v: string) => store.updateProfile({ name: v })} />
          <Input label="Title" value={profile.title} onChange={(v: string) => store.updateProfile({ title: v })} />
          
          <AvatarCropper />
          
          <Input 
            label="Email" 
            value={profile.email} 
            onChange={(v: string) => store.updateProfile({ email: v })} 
            isVisible={settings.visibleProfile.email}
            onToggleVisibility={() => store.toggleProfileVisibility('email')}
          />
          <Input 
            label="Phone" 
            value={profile.phone} 
            onChange={(v: string) => store.updateProfile({ phone: v })} 
            isVisible={settings.visibleProfile.phone}
            onToggleVisibility={() => store.toggleProfileVisibility('phone')}
          />
          <Input 
            label="Website" 
            value={profile.website} 
            onChange={(v: string) => store.updateProfile({ website: v })} 
            isVisible={settings.visibleProfile.website}
            onToggleVisibility={() => store.toggleProfileVisibility('website')}
          />
          <Input 
            label="Github" 
            value={profile.github} 
            onChange={(v: string) => store.updateProfile({ github: v })} 
            isVisible={settings.visibleProfile.github}
            onToggleVisibility={() => store.toggleProfileVisibility('github')}
          />
          <Input 
            label="Location" 
            value={profile.location} 
            onChange={(v: string) => store.updateProfile({ location: v })} 
            className="col-span-2" 
            isVisible={settings.visibleProfile.location}
            onToggleVisibility={() => store.toggleProfileVisibility('location')}
          />
          <Input 
            label="Highest Education" 
            value={profile.highestEducation} 
            onChange={(v: string) => store.updateProfile({ highestEducation: v })} 
            className="col-span-2" 
            isVisible={settings.visibleProfile.highestEducation}
            onToggleVisibility={() => store.toggleProfileVisibility('highestEducation')}
          />
          <TextArea 
            label="Summary" 
            value={profile.summary} 
            onChange={(v: string) => store.updateProfile({ summary: v })} 
            className="col-span-2" 
            isVisible={settings.visibleProfile.summary}
            onToggleVisibility={() => store.toggleProfileVisibility('summary')}
          />
        </div>
      </Section>

      <Section 
        title="Experience" 
        icon={Briefcase} 
        isVisible={settings.visibleSections.experience}
        onToggleVisibility={() => store.toggleSectionVisibility('experience')}
      >
        <Input
          label="Section Title"
          value={settings.sectionTitles.experience}
          onChange={(v: string) => store.updateSectionTitle('experience', v)}
        />
        <AnimatePresence>
          {experience.map((exp) => (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 relative group transition-colors overflow-hidden"
            >
              <button
                onClick={() => store.removeExperience(exp.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company" value={exp.company} onChange={(v: string) => store.updateExperience(exp.id, { company: v })} />
                <Input label="Position" value={exp.position} onChange={(v: string) => store.updateExperience(exp.id, { position: v })} />
                <Input label="Start Date" value={exp.startDate} onChange={(v: string) => store.updateExperience(exp.id, { startDate: v })} />
                <Input label="End Date" value={exp.endDate} onChange={(v: string) => store.updateExperience(exp.id, { endDate: v })} />
                <TextArea
                  label="Description"
                  value={exp.description}
                  onChange={(v: string) => store.updateExperience(exp.id, { description: v })}
                  className="col-span-2"
                  isVisible={exp.visibleDescription}
                  onToggleVisibility={() => store.updateExperience(exp.id, { visibleDescription: !exp.visibleDescription })}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={store.addExperience}
          className="w-full py-3 flex items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl text-gray-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
        >
          <Plus size={16} /> Add Experience
        </motion.button>
      </Section>

      <Section 
        title="Projects" 
        icon={Code}
        isVisible={settings.visibleSections.projects}
        onToggleVisibility={() => store.toggleSectionVisibility('projects')}
      >
        <Input
          label="Section Title"
          value={settings.sectionTitles.projects}
          onChange={(v: string) => store.updateSectionTitle('projects', v)}
        />
        <AnimatePresence>
          {projects.map((proj) => (
            <motion.div 
              key={proj.id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 relative group transition-colors overflow-hidden"
            >
              <button
                onClick={() => store.removeProject(proj.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Project Name" value={proj.name} onChange={(v: string) => store.updateProject(proj.id, { name: v })} />
                <Input
                  label="Role"
                  value={proj.role}
                  onChange={(v: string) => store.updateProject(proj.id, { role: v })}
                  isVisible={proj.visibleRole}
                  onToggleVisibility={() => store.updateProject(proj.id, { visibleRole: !proj.visibleRole })}
                />
                <Input label="Start Date" value={proj.startDate} onChange={(v: string) => store.updateProject(proj.id, { startDate: v })} />
                <Input label="End Date" value={proj.endDate} onChange={(v: string) => store.updateProject(proj.id, { endDate: v })} />
                <Input 
                  label="Link" 
                  value={proj.link} 
                  onChange={(v: string) => store.updateProject(proj.id, { link: v })} 
                  className="col-span-2" 
                  isVisible={proj.visibleLink}
                  onToggleVisibility={() => store.updateProject(proj.id, { visibleLink: !proj.visibleLink })}
                />
                <Input 
                  label="Tech Stack (comma separated)" 
                  value={proj.techStack.join(', ')} 
                  onChange={(v: string) => store.updateProject(proj.id, { techStack: v.split(',').map(s => s.trim()) })} 
                  className="col-span-2" 
                />
                <TextArea
                  label="Description"
                  value={proj.description}
                  onChange={(v: string) => store.updateProject(proj.id, { description: v })}
                  className="col-span-2"
                  isVisible={proj.visibleDescription}
                  onToggleVisibility={() => store.updateProject(proj.id, { visibleDescription: !proj.visibleDescription })}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={store.addProject}
          className="w-full py-3 flex items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl text-gray-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
        >
          <Plus size={16} /> Add Project
        </motion.button>
      </Section>

      <Section 
        title="Skills" 
        icon={Terminal}
        isVisible={settings.visibleSections.skills}
        onToggleVisibility={() => store.toggleSectionVisibility('skills')}
      >
        <Input
          label="Section Title"
          value={settings.sectionTitles.skills}
          onChange={(v: string) => store.updateSectionTitle('skills', v)}
        />
        <Input
          label="Skills (comma separated)"
          value={flatSkills.join(', ')}
          onChange={(v: string) =>
            store.setSkills(
              v
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />
      </Section>

      <Section 
        title="Education" 
        icon={GraduationCap}
        isVisible={settings.visibleSections.education}
        onToggleVisibility={() => store.toggleSectionVisibility('education')}
      >
        <Input
          label="Section Title"
          value={settings.sectionTitles.education}
          onChange={(v: string) => store.updateSectionTitle('education', v)}
        />
        <AnimatePresence>
          {education.map((edu) => (
            <motion.div 
              key={edu.id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 relative group transition-colors overflow-hidden"
            >
              <button
                onClick={() => store.removeEducation(edu.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="School" value={edu.school} onChange={(v: string) => store.updateEducation(edu.id, { school: v })} />
                <Input label="Degree" value={edu.degree} onChange={(v: string) => store.updateEducation(edu.id, { degree: v })} />
                <Input label="Start Date" value={edu.startDate} onChange={(v: string) => store.updateEducation(edu.id, { startDate: v })} />
                <Input label="End Date" value={edu.endDate} onChange={(v: string) => store.updateEducation(edu.id, { endDate: v })} />
                <TextArea
                  label="Description"
                  value={edu.description}
                  onChange={(v: string) => store.updateEducation(edu.id, { description: v })}
                  className="col-span-2"
                  isVisible={settings.visibleFields.educationDescription}
                  onToggleVisibility={() => store.toggleFieldVisibility('educationDescription')}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={store.addEducation}
          className="w-full py-3 flex items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl text-gray-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
        >
          <Plus size={16} /> Add Education
        </motion.button>
      </Section>
    </div>
  );
};
