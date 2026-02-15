import { useCallback, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { isValidResumeData } from '../utils/validation';
import type { ResumeDocument } from '../types/resume';

export const useResumeImport = () => {
  const { importResumes } = useResumeStore();
  const [importError, setImportError] = useState('');

  const applyImportedData = useCallback((payload: unknown) => {
    if (!payload || typeof payload !== 'object') return false;
    const data = payload as Record<string, unknown>;
    const importedResumes = data.resumes as Array<Record<string, unknown>> | undefined;
    if (!importedResumes || !Array.isArray(importedResumes) || importedResumes.length === 0) return false;
    const normalized: ResumeDocument[] = [];
    importedResumes.forEach((resume) => {
      if (!resume || typeof resume !== 'object') return;
      const id = resume.id;
      const name = resume.name;
      const data = resume.data;
      if (typeof id !== 'string' || typeof name !== 'string' || !isValidResumeData(data)) return;
      normalized.push({ id, name, data });
    });
    if (normalized.length === 0) return false;
    const nextActiveId =
      typeof data.activeResumeId === 'string' && normalized.some((resume) => resume.id === data.activeResumeId)
        ? data.activeResumeId
        : normalized[0].id;
    importResumes(normalized, nextActiveId);
    return true;
  }, [importResumes]);

  return { applyImportedData, importError, setImportError };
};
