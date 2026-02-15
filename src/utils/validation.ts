import type { ResumeData } from '../types/resume';

/**
 * Validates if the imported data matches the ResumeData structure.
 * This is a strict check to ensure all required fields and types are present.
 * 
 * @param data - The unknown data object to validate
 * @returns True if data is a valid ResumeData object
 */
export const isValidResumeData = (data: unknown): data is ResumeData => {
  if (!data || typeof data !== 'object') return false;
  const resume = data as Record<string, unknown>;
  const profile = resume.profile as Record<string, unknown> | undefined;
  const settings = resume.settings as Record<string, unknown> | undefined;
  const visibleSections = settings?.visibleSections as Record<string, unknown> | undefined;
  const visibleProfile = settings?.visibleProfile as Record<string, unknown> | undefined;
  return (
    !!profile &&
    Array.isArray(resume.education) &&
    Array.isArray(resume.experience) &&
    Array.isArray(resume.projects) &&
    Array.isArray(resume.skills) &&
    !!settings &&
    typeof settings.themeColor === 'string' &&
    typeof settings.fontFamily === 'string' &&
    typeof settings.showIcons === 'boolean' &&
    typeof settings.layout === 'string' &&
    !!visibleSections &&
    typeof visibleSections.education === 'boolean' &&
    typeof visibleSections.experience === 'boolean' &&
    typeof visibleSections.projects === 'boolean' &&
    typeof visibleSections.skills === 'boolean' &&
    !!visibleProfile &&
    typeof visibleProfile.email === 'boolean' &&
    typeof visibleProfile.phone === 'boolean' &&
    typeof visibleProfile.website === 'boolean' &&
    typeof visibleProfile.github === 'boolean' &&
    typeof visibleProfile.location === 'boolean' &&
    typeof visibleProfile.summary === 'boolean' &&
    typeof visibleProfile.avatar === 'boolean' &&
    typeof profile.name === 'string' &&
    typeof profile.title === 'string' &&
    typeof profile.avatarUrl === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.phone === 'string' &&
    typeof profile.website === 'string' &&
    typeof profile.github === 'string' &&
    typeof profile.summary === 'string' &&
    typeof profile.location === 'string'
  );
};
