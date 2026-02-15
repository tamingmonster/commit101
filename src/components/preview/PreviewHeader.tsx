import { Github, Globe, Mail, MapPin, Phone, GraduationCap } from 'lucide-react';
import type { ResumeData } from '../../types/resume';

interface PreviewHeaderProps {
  profile: ResumeData['profile'];
  settings: ResumeData['settings'];
}

export const PreviewHeader = ({ profile, settings }: PreviewHeaderProps) => {
  return (
    <header className="border-b-2 border-gray-900 pb-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              <span className="text-xl text-blue-600 mr-2">let</span>
              {profile.name} 
              <span className="text-gray-400 font-normal text-xl ml-2">=</span>
            </h1>
            <h2 className="text-lg text-gray-600 font-mono">
              <span className="text-purple-600">"</span>{profile.title}<span className="text-purple-600">"</span>;
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-mono text-gray-600">
            {profile.email && settings.visibleProfile.email && (
              <div className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors">
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
              <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <Globe size={14} className="block" />
                </span>
                <span className="leading-none">{profile.website}</span>
              </a>
            )}
            {profile.github && settings.visibleProfile.github && (
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors">
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
