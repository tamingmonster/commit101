import { Github, Globe, Mail, MapPin, Phone, GraduationCap } from 'lucide-react';
import type { ResumeData } from '../../types/resume';
import { themes } from '../../utils/themes';

interface PreviewHeaderProps {
  profile: ResumeData['profile'];
  settings: ResumeData['settings'];
}

export const PreviewHeader = ({ profile, settings }: PreviewHeaderProps) => {
  const renderHeaderContent = () => {
    const { headerStyle = 'js', themeColor = 'blue' } = settings;
    const { name, title } = profile;

    // Standardized colors
    const theme = themes[themeColor] || themes.blue;
    const colors = {
      keyword: theme.primary,
      string: theme.secondary,
      punctuation: theme.accent,
      variable: 'text-gray-900',
    };

    switch (headerStyle) {
      case 'python':
        return (
          <>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              {name} 
              <span className={`${colors.punctuation} font-normal text-xl ml-2`}>=</span>
            </h1>
            <h2 className="text-lg text-gray-600 font-mono">
              <span className={colors.string}>"</span>{title}<span className={colors.string}>"</span>
            </h2>
          </>
        );
      case 'java':
        return (
          <>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              <span className={`text-xl ${colors.keyword} mr-2`}>String</span>
              {name} 
              <span className={`${colors.punctuation} font-normal text-xl ml-2`}>=</span>
            </h1>
            <h2 className="text-lg text-gray-600 font-mono">
              <span className={colors.string}>"</span>{title}<span className={colors.string}>"</span><span className={colors.punctuation}>;</span>
            </h2>
          </>
        );
      case 'go':
        return (
          <>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              {name} 
              <span className={`${colors.punctuation} font-normal text-xl ml-2`}>:=</span>
            </h1>
            <h2 className="text-lg text-gray-600 font-mono">
              <span className={colors.string}>"</span>{title}<span className={colors.string}>"</span>
            </h2>
          </>
        );
      case 'plain':
        return (
          <div className="flex items-baseline gap-4">
             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>
            <h2 className="text-lg text-gray-600 font-mono border-l border-gray-300 pl-4">
              {title}
            </h2>
          </div>
        );
      case 'js':
      default:
        return (
          <>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              <span className={`text-xl ${colors.keyword} mr-2`}>let</span>
              {name} 
              <span className={`${colors.punctuation} font-normal text-xl ml-2`}>=</span>
            </h1>
            <h2 className="text-lg text-gray-600 font-mono">
              <span className={colors.string}>"</span>{title}<span className={colors.string}>"</span><span className={colors.punctuation}>;</span>
            </h2>
          </>
        );
    }
  };

  const isPlain = settings.headerStyle === 'plain';
  const theme = themes[settings.themeColor || 'blue'] || themes.blue;

  return (
    <header className="border-b-2 border-gray-900 pb-[length:var(--header-pb)]">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className={`flex ${isPlain ? 'items-baseline' : 'items-baseline gap-3'} mb-3 flex-wrap`}>
            {renderHeaderContent()}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-mono text-gray-600">
            {profile.email && settings.visibleProfile.email && (
              <div className={`inline-flex items-center gap-1.5 hover:${theme.primary} transition-colors`}>
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <Mail size={14} className="block" />
                </span>
                <span className="leading-none">{profile.email}</span>
              </div>
            )}
            {profile.phone && settings.visibleProfile.phone && (
              <div className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <Phone size={14} className="block" />
                </span>
                <span className="leading-none">{profile.phone}</span>
              </div>
            )}
            {profile.location && settings.visibleProfile.location && (
              <div className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <MapPin size={14} className="block" />
                </span>
                <span className="leading-none">{profile.location}</span>
              </div>
            )}
            {profile.highestEducation && settings.visibleProfile.highestEducation && (
              <div className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <GraduationCap size={14} className="block" />
                </span>
                <span className="leading-none">{profile.highestEducation}</span>
              </div>
            )}
            {profile.website && settings.visibleProfile.website && (
              <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 hover:${theme.primary} transition-colors`}>
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <Globe size={14} className="block" />
                </span>
                <span className="leading-none">{profile.website}</span>
              </a>
            )}
            {profile.github && settings.visibleProfile.github && (
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 hover:${theme.primary} transition-colors`}>
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <Github size={14} className="block" />
                </span>
                <span className="leading-none">{profile.github}</span>
              </a>
            )}
          </div>
        </div>
        {profile.avatarUrl && settings.visibleProfile.avatar && (
          <div className="shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          </div>
        )}
      </div>
    </header>
  );
};
