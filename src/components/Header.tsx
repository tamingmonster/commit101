import { useRef, useState, useMemo, useEffect } from 'react';
import { ChevronDown, Printer, Image as ImageIcon, Download, Upload, Trash2, FileText, Check } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onExportImage: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
  onImportJSON: (file: File) => void;
  importError: string;
}

import { PixelRobot } from './ui/PixelRobot';

export const Header = ({
  onExportImage,
  onExportPDF,
  isExporting,
  onImportJSON,
  importError,
}: HeaderProps) => {
  const { resumes, activeResumeId, setActiveResume, addResume, removeResume, renameResume } = useResumeStore();
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false);
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const resumeMenuRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.id === activeResumeId) ?? resumes[0],
    [resumes, activeResumeId]
  );

  const handleCreateResume = (mode: 'blank' | 'template' | 'duplicate') => {
    addResume(mode);
  };

  const handleDeleteResume = () => {
    if (!activeResume) return;
    removeResume(activeResume.id);
  };

  const handleExportJSON = () => {
    const payload = JSON.stringify({ resumes, activeResumeId }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'resumes.json';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(target)) {
        setIsResumeMenuOpen(false);
      }
      if (modeMenuRef.current && !modeMenuRef.current.contains(target)) {
        setIsModeMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(target)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring" as const, stiffness: 400, damping: 30 } 
    },
    exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-4 mb-6 rounded-2xl glass px-4 h-14 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="group flex items-center gap-3 px-3 py-1.5 rounded-xl cursor-default">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-sm rounded-full opacity-0" />
            <PixelRobot 
              className="w-6 h-6 transition-colors relative z-10" 
              color="#ec4899" 
              accentColor="#60A5FA"
            />
          </div>
          <span className="font-bold font-mono text-gray-200 tracking-tight hidden sm:block">
            <span className="text-blue-400">&lt;</span>
            <span className="text-gray-100">Commit101</span>
            <span className="text-blue-400"> /&gt;</span>
          </span>
        </div>
        
        <div className="h-6 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3">
          {/* Resume Selector */}
          <div className="relative" ref={resumeMenuRef}>
            <button
              onClick={() => {
                setIsResumeMenuOpen((prev) => !prev);
                setIsModeMenuOpen(false);
                setIsToolsMenuOpen(false);
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-gray-200"
            >
              <span className="max-w-[120px] truncate">{activeResume?.name ?? 'Select resume'}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isResumeMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isResumeMenuOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-0 top-[calc(100%+8px)] w-72 rounded-xl glass-card overflow-hidden p-1.5 z-50 flex flex-col shadow-2xl ring-1 ring-white/10"
                >
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-1 py-1 space-y-1">
                    {resumes.map((resume) => (
                      <motion.button
                        key={resume.id}
                        layout
                        onClick={() => {
                          setActiveResume(resume.id);
                          setIsResumeMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 group relative ${
                          resume.id === activeResumeId
                            ? 'bg-blue-500/20 text-blue-100'
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md transition-colors ${
                          resume.id === activeResumeId 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-white/5 text-gray-500 group-hover:text-gray-400 group-hover:bg-white/10'
                        }`}>
                          <FileText size={14} />
                        </div>
                        
                        <span className="truncate flex-1 font-medium">{resume.name}</span>
                        
                        {resume.id === activeResumeId && (
                          <motion.div
                            layoutId="active-check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-blue-400"
                          >
                            <Check size={14} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            value={activeResume?.name ?? ''}
            onChange={(e) => activeResume && renameResume(activeResume.id, e.target.value)}
            placeholder="Name your resume..."
            className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-blue-500 px-2 py-1 text-sm text-gray-200 focus:outline-none transition-colors w-32 sm:w-48 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* New Resume Button */}
        <div className="relative" ref={modeMenuRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsModeMenuOpen((prev) => !prev);
              setIsResumeMenuOpen(false);
              setIsToolsMenuOpen(false);
            }}
            className="h-9 px-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all"
          >
            New
            <ChevronDown size={14} className={`transition-transform duration-200 ${isModeMenuOpen ? 'rotate-180' : ''}`} />
          </motion.button>
          <AnimatePresence>
            {isModeMenuOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl glass-card overflow-hidden py-1 z-50"
              >
                {(['blank', 'template', 'duplicate'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      handleCreateResume(mode);
                      setIsModeMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors capitalize"
                  >
                    {mode === 'duplicate' ? 'Duplicate current' : `${mode} resume`}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-white/10" />

        {/* Tools Menu */}
        <div className="relative" ref={toolsMenuRef}>
          <button
            onClick={() => {
              setIsToolsMenuOpen((prev) => !prev);
              setIsResumeMenuOpen(false);
              setIsModeMenuOpen(false);
            }}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors"
            title="Tools"
          >
            <ChevronDown size={16} className={`transition-transform duration-200 ${isToolsMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isToolsMenuOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl glass-card overflow-hidden py-1 z-50"
              >
                <button
                  onClick={() => {
                    importInputRef.current?.click();
                    setIsToolsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Upload size={14} /> Import JSON
                </button>
                {importError && <div className="px-4 py-1 text-xs text-red-400">{importError}</div>}
                <button
                  onClick={() => {
                    handleExportJSON();
                    setIsToolsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Download size={14} /> Export JSON
                </button>
                <div className="h-px bg-white/5 my-1" />
                <button
                  onClick={() => {
                    handleDeleteResume();
                    setIsToolsMenuOpen(false);
                  }}
                  disabled={resumes.length <= 1}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2 pl-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExportImage}
            disabled={isExporting}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-colors disabled:opacity-50"
            title="Export Image"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
            ) : (
              <ImageIcon size={18} />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExportPDF}
            disabled={isExporting}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-colors disabled:opacity-50"
            title="Export PDF"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            ) : (
              <Printer size={18} />
            )}
          </motion.button>
        </div>
      </div>

      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onImportJSON(e.target.files[0])}
      />
    </motion.header>
  );
};
