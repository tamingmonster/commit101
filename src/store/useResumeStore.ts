import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ResumeData, ResumeDocument, EducationItem, ExperienceItem, ProjectItem, SkillItem } from '../types/resume';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialData: ResumeData = {
  profile: {
    name: 'Alex',
    title: 'Senior Full Stack Developer',
    avatarUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" shape-rendering="crispEdges"><rect width="240" height="240" rx="28" fill="%231b1f2a"/><rect x="60" y="40" width="120" height="120" rx="8" fill="%234cc9f0"/><rect x="80" y="70" width="30" height="30" fill="%230b1020"/><rect x="130" y="70" width="30" height="30" fill="%230b1020"/><rect x="95" y="115" width="50" height="15" fill="%230b1020"/><rect x="70" y="160" width="100" height="50" rx="6" fill="%234895ef"/><rect x="45" y="170" width="20" height="30" fill="%234361ee"/><rect x="175" y="170" width="20" height="30" fill="%234361ee"/><rect x="90" y="170" width="20" height="30" fill="%230b1020"/><rect x="130" y="170" width="20" height="30" fill="%230b1020"/><rect x="112" y="20" width="16" height="20" fill="%23f9c74f"/></svg>',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    website: 'alexcoder.dev',
    github: 'github.com/alexcoder',
    location: 'San Francisco, CA',
    highestEducation: 'Master of Science',
    summary: 'Passionate developer with 5+ years of experience in building scalable web applications. Loves clean code, modern UI designs, and pixel art.',
  },
  education: [
    {
      id: '1',
      school: 'Tech University',
      degree: 'B.S. in Computer Science',
      startDate: '2015-09',
      endDate: '2019-06',
      description: 'Graduated with Honors. Member of the ACM coding club.',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Giants Inc',
      position: 'Frontend Developer',
      startDate: '2021-07',
      endDate: 'Present',
      description: '• Developed the main dashboard using React and TypeScript.\n• Improved site performance by 30%.\n• Mentored junior developers.',
      visibleDescription: true,
    },
    {
      id: '2',
      company: 'Startup Hub',
      position: 'Junior Developer',
      startDate: '2019-07',
      endDate: '2021-06',
      description: '• Built landing pages with HTML/CSS/JS.\n• Collaborated with designers to implement new features.',
      visibleDescription: true,
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Resume Generator',
      role: 'Creator',
      startDate: '2023-01',
      endDate: '2023-02',
      description: 'A tool to generate developer-friendly resumes.',
      techStack: ['React', 'Zustand', 'Tailwind'],
      link: 'https://github.com/alexcoder/resume-gen',
      visibleDescription: true,
      visibleRole: true,
      visibleLink: true,
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      role: 'Frontend Lead',
      startDate: '2022-05',
      endDate: '2022-12',
      description: 'Built a scalable e-commerce platform handling 10k+ daily users. Integrated Stripe for payments and optimized core web vitals.',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      link: 'https://github.com/alexcoder/shop-next',
      visibleDescription: true,
      visibleRole: true,
      visibleLink: true,
    },
    {
      id: '3',
      name: 'Task Master App',
      role: 'Full Stack Developer',
      startDate: '2021-08',
      endDate: '2022-03',
      description: 'Real-time collaborative task management tool. Implemented drag-and-drop kanban boards and live team chat.',
      techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      link: 'https://github.com/alexcoder/task-master',
      visibleDescription: true,
      visibleRole: true,
      visibleLink: true,
    },
  ],
  skills: [
    {
      id: '1',
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      id: '2',
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    },
  ],
  settings: {
    themeColor: '#007acc',
    fontFamily: 'mono',
    showIcons: true,
    layout: 'developer',
    visibleSections: {
      education: true,
      experience: true,
      projects: true,
      skills: true,
    },
    visibleProfile: {
      avatar: true,
      email: true,
      phone: true,
      website: true,
      github: true,
      location: true,
      summary: true,
      highestEducation: true,
    },
    sectionTitles: {
      education: 'Education',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
    },
    visibleFields: {
      educationDescription: true,
    },
  },
};

const cloneResumeData = (data: ResumeData) => JSON.parse(JSON.stringify(data)) as ResumeData;
const cloneResumeSettings = (settings: ResumeData['settings']) =>
  JSON.parse(JSON.stringify(settings)) as ResumeData['settings'];
const normalizeResumeData = (data: ResumeData): ResumeData => ({
  ...data,
  settings: {
    ...initialData.settings,
    ...data.settings,
    visibleSections: {
      ...initialData.settings.visibleSections,
      ...data.settings.visibleSections,
    },
    visibleProfile: {
      ...initialData.settings.visibleProfile,
      ...data.settings.visibleProfile,
    },
    sectionTitles: {
      ...initialData.settings.sectionTitles,
      ...data.settings.sectionTitles,
    },
    visibleFields: {
      ...initialData.settings.visibleFields,
      ...data.settings.visibleFields,
    },
  },
});

const createBlankResumeData = (): ResumeData => ({
  profile: {
    name: '',
    title: '',
    avatarUrl: initialData.profile.avatarUrl,
    email: '',
    phone: '',
    website: '',
    github: '',
    summary: '',
    location: '',
    highestEducation: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  settings: cloneResumeSettings(initialData.settings),
});

const createResumeName = (count: number) => `Resume ${count}`;

const initialResumeId = generateId();

interface ResumeStore {
  resumes: ResumeDocument[];
  activeResumeId: string;
  setActiveResume: (id: string) => void;
  addResume: (mode: 'blank' | 'template' | 'duplicate') => void;
  renameResume: (id: string, name: string) => void;
  removeResume: (id: string) => void;
  importResumes: (resumes: ResumeDocument[], activeResumeId?: string) => void;
  updateProfile: (profile: Partial<ResumeData['profile']>) => void;
  updateSectionTitle: (section: keyof ResumeData['settings']['sectionTitles'], title: string) => void;
  toggleFieldVisibility: (field: keyof ResumeData['settings']['visibleFields']) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  setSkills: (items: string[]) => void;
  addSkill: () => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  updateSettings: (settings: Partial<ResumeData['settings']>) => void;
  // Helpers for nested visibility updates
  toggleSectionVisibility: (section: keyof ResumeData['settings']['visibleSections']) => void;
  toggleProfileVisibility: (field: keyof ResumeData['settings']['visibleProfile']) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumes: [
        {
          id: initialResumeId,
          name: createResumeName(1),
          data: cloneResumeData(initialData),
        },
      ],
      activeResumeId: initialResumeId,
      setActiveResume: (id) => set(() => ({ activeResumeId: id })),
      addResume: (mode) =>
        set((state) => {
          const data =
            mode === 'blank'
              ? createBlankResumeData()
              : mode === 'duplicate'
              ? cloneResumeData(
                  state.resumes.find((resume) => resume.id === state.activeResumeId)?.data ?? initialData
                )
              : cloneResumeData(initialData);
          const newResume: ResumeDocument = {
            id: generateId(),
            name: createResumeName(state.resumes.length + 1),
            data,
          };
          return {
            resumes: [...state.resumes, newResume],
            activeResumeId: newResume.id,
          };
        }),
      renameResume: (id, name) =>
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === id ? { ...resume, name } : resume
          ),
        })),
      removeResume: (id) =>
        set((state) => {
          if (state.resumes.length <= 1) return state;
          const nextResumes = state.resumes.filter((resume) => resume.id !== id);
          const nextActive =
            state.activeResumeId === id ? nextResumes[0]?.id ?? state.activeResumeId : state.activeResumeId;
          return { resumes: nextResumes, activeResumeId: nextActive };
        }),
      importResumes: (resumes, activeResumeId) =>
        set(() => ({
          resumes: resumes.map((resume) => ({ ...resume, data: normalizeResumeData(resume.data) })),
          activeResumeId: activeResumeId ?? resumes[0]?.id ?? initialResumeId,
        })),
      updateProfile: (profile) =>
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === state.activeResumeId
              ? { ...resume, data: { ...resume.data, profile: { ...resume.data.profile, ...profile } } }
              : resume
          ),
        })),
      updateSectionTitle: (section, title) =>
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === state.activeResumeId
              ? {
                  ...resume,
                  data: {
                    ...resume.data,
                    settings: {
                      ...resume.data.settings,
                      sectionTitles: {
                        ...resume.data.settings.sectionTitles,
                        [section]: title,
                      },
                    },
                  },
                }
              : resume
          ),
        })),
      toggleFieldVisibility: (field) =>
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === state.activeResumeId
              ? {
                  ...resume,
                  data: {
                    ...resume.data,
                    settings: {
                      ...resume.data.settings,
                      visibleFields: {
                        ...resume.data.settings.visibleFields,
                        [field]: !resume.data.settings.visibleFields[field],
                      },
                    },
                  },
                }
              : resume
          ),
        })),

  toggleSectionVisibility: (section) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                settings: {
                  ...resume.data.settings,
                  visibleSections: {
                    ...resume.data.settings.visibleSections,
                    [section]: !resume.data.settings.visibleSections[section],
                  },
                },
              },
            }
          : resume
      ),
    })),

  toggleProfileVisibility: (field) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                settings: {
                  ...resume.data.settings,
                  visibleProfile: {
                    ...resume.data.settings.visibleProfile,
                    [field]: !resume.data.settings.visibleProfile[field],
                  },
                },
              },
            }
          : resume
      ),
    })),
  
  addEducation: () =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                education: [
                  ...resume.data.education,
                  {
                    id: generateId(),
                    school: '',
                    degree: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  },
                ],
              },
            }
          : resume
      ),
    })),
  updateEducation: (id, education) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                education: resume.data.education.map((item) =>
                  item.id === id ? { ...item, ...education } : item
                ),
              },
            }
          : resume
      ),
    })),
  removeEducation: (id) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                education: resume.data.education.filter((item) => item.id !== id),
              },
            }
          : resume
      ),
    })),

  addExperience: () =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                experience: [
                  ...resume.data.experience,
                  {
                    id: generateId(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    visibleDescription: true,
                  },
                ],
              },
            }
          : resume
      ),
    })),
  updateExperience: (id, experience) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                experience: resume.data.experience.map((item) =>
                  item.id === id ? { ...item, ...experience } : item
                ),
              },
            }
          : resume
      ),
    })),
  removeExperience: (id) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                experience: resume.data.experience.filter((item) => item.id !== id),
              },
            }
          : resume
      ),
    })),

  addProject: () =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                projects: [
                  ...resume.data.projects,
                  {
                    id: generateId(),
                    name: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    techStack: [],
                    link: '',
                    visibleDescription: true,
                    visibleRole: true,
                    visibleLink: true,
                  },
                ],
              },
            }
          : resume
      ),
    })),
  updateProject: (id, project) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                projects: resume.data.projects.map((item) =>
                  item.id === id ? { ...item, ...project } : item
                ),
              },
            }
          : resume
      ),
    })),
  removeProject: (id) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                projects: resume.data.projects.filter((item) => item.id !== id),
              },
            }
          : resume
      ),
    })),

  setSkills: (items) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                skills: [
                  {
                    id: resume.data.skills[0]?.id ?? generateId(),
                    category: '',
                    items,
                  },
                ],
              },
            }
          : resume
      ),
    })),

  addSkill: () =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                skills: [
                  ...resume.data.skills,
                  {
                    id: generateId(),
                    category: '',
                    items: [],
                  },
                ],
              },
            }
          : resume
      ),
    })),
  updateSkill: (id, skill) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                skills: resume.data.skills.map((item) =>
                  item.id === id ? { ...item, ...skill } : item
                ),
              },
            }
          : resume
      ),
    })),
  removeSkill: (id) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                skills: resume.data.skills.filter((item) => item.id !== id),
              },
            }
          : resume
      ),
    })),

  updateSettings: (settings) =>
    set((state) => ({
      resumes: state.resumes.map((resume) =>
        resume.id === state.activeResumeId
          ? {
              ...resume,
              data: {
                ...resume.data,
                settings: { ...resume.data.settings, ...settings },
              },
            }
          : resume
      ),
    })),
    }),
    {
      name: 'resume-collection-v1',
      storage: createJSONStorage(() => localStorage),
      version: 0,
      migrate: (persistedState: any, version) => {
        if (version === undefined) {
          return persistedState;
        }
        return persistedState;
      },
      partialize: (state) => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<ResumeStore> | undefined;
        const resumes = (state?.resumes ?? currentState.resumes).map((resume) => ({
          ...resume,
          data: normalizeResumeData(resume.data),
        }));
        const activeResumeId =
          state?.activeResumeId && resumes.some((resume) => resume.id === state.activeResumeId)
            ? state.activeResumeId
            : resumes[0]?.id ?? currentState.activeResumeId;
        return { ...currentState, ...state, resumes, activeResumeId };
      },
    }
  )
);
