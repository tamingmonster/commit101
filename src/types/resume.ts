export interface ResumeProfile {
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  summary: string;
  location: string;
  highestEducation: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string; // 支持 Markdown 或简单的换行
  visibleDescription: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  techStack: string[];
  link: string;
  visibleDescription: boolean;
  visibleRole: boolean;
  visibleLink: boolean;
}

export interface SkillItem {
  id: string;
  category: string;
  items: string[];
}

export interface ResumeSettings {
  themeColor: string;
  fontFamily: string;
  showIcons: boolean;
  layout: 'classic' | 'modern' | 'developer';
  visibleSections: {
    education: boolean;
    experience: boolean;
    projects: boolean;
    skills: boolean;
  };
  visibleProfile: {
    avatar: boolean;
    email: boolean;
    phone: boolean;
    website: boolean;
    github: boolean;
    location: boolean;
    summary: boolean;
    highestEducation: boolean;
  };
  sectionTitles: {
    education: string;
    experience: string;
    projects: string;
    skills: string;
  };
  visibleFields: {
    educationDescription: boolean;
  };
}

export interface ResumeData {
  profile: ResumeProfile;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  settings: ResumeSettings;
}

export interface ResumeDocument {
  id: string;
  name: string;
  data: ResumeData;
}
