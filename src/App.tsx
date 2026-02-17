import { useRef, useState } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { DesignEditor } from './components/DesignEditor';
import { ResumePreview } from './components/ResumePreview';
import { useResumeExport } from './hooks/useResumeExport';
import { useResumeImport } from './hooks/useResumeImport';
import { Header } from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from './store/useResumeStore';
import { PenTool, LayoutTemplate } from 'lucide-react';

function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const { isExporting, handleExportImage, handleExportPDF } = useResumeExport(hiddenRef);
  const { applyImportedData, importError, setImportError } = useResumeImport();
  const activeResumeId = useResumeStore((state) => state.activeResumeId);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result ?? ''));
        const success = applyImportedData(parsed);
        setImportError(success ? '' : 'Invalid import file format');
      } catch {
        setImportError('Failed to parse import file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen w-full bg-slate-900 text-gray-100 flex flex-col relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <Header
          onExportImage={handleExportImage}
          onExportPDF={handleExportPDF}
          isExporting={isExporting}
          onImportJSON={handleImportJSON}
          importError={importError}
        />
        
        <main className="flex-1 flex gap-6 px-4 pb-4 overflow-hidden">
          {/* Editor Sidebar */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-1/2 max-w-xl glass rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Tab Bar */}
            <div className="mx-1 mt-3 mb-2 p-1 bg-black/20 rounded-xl flex gap-1 border border-white/5">
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all relative z-0 overflow-hidden group ${
                  activeTab === 'content' ? 'text-blue-200' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeTab === 'content' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 shadow-sm border border-white/5 rounded-lg z-[-1]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <PenTool size={16} className={`transition-colors ${activeTab === 'content' ? 'text-blue-400' : 'group-hover:text-blue-400/70'}`} />
                <span className="relative z-10">Content</span>
              </button>
              
              <button
                onClick={() => setActiveTab('design')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all relative z-0 overflow-hidden group ${
                  activeTab === 'design' ? 'text-purple-200' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeTab === 'design' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 shadow-sm border border-white/5 rounded-lg z-[-1]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <LayoutTemplate size={16} className={`transition-colors ${activeTab === 'design' ? 'text-purple-400' : 'group-hover:text-purple-400/70'}`} />
                <span className="relative z-10">Design</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#1e1e1e]/40 relative mx-1 mb-1 rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeResumeId + activeTab}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="h-full"
                >
                  {activeTab === 'content' ? <ResumeEditor /> : <DesignEditor />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Preview Area */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-1 glass rounded-3xl overflow-hidden flex flex-col relative bg-white/5"
          >
            <div className="absolute inset-0 flex justify-center preview-scrollbar pt-8">
              {/* Visible scaled preview for user */}
              <div className="scale-[0.8] origin-top">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  ref={componentRef} 
                  className="print-container pb-8 shadow-2xl relative"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeResumeId}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="origin-top w-full h-full"
                    >
                      <ResumePreview />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Hidden unscaled preview for export */}
          <div className="fixed left-0 top-0 opacity-0 pointer-events-none -z-10">
             <div ref={hiddenRef} className="w-[210mm] min-h-[297mm] bg-white">
                <ResumePreview />
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
