import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, QrCode, Play } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-y-auto flex flex-col md:flex-row animate-fadeIn">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full text-zinc-800 dark:text-white transition-all"
        >
          <X size={20} />
        </button>

        {/* Media Section */}
        <div className="w-full md:w-3/5 bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-8 flex flex-col gap-6">
          {project.demoVideoUrl ? (
            <div className="rounded-xl overflow-hidden shadow-sm aspect-video bg-black relative group">
              <video 
                src={project.demoVideoUrl} 
                poster={project.thumbnailUrl}
                controls 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
             <div className="rounded-xl overflow-hidden shadow-sm aspect-video">
                <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover"/>
             </div>
          )}
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
             {project.gallery.map((img, idx) => (
               <div key={idx} className="rounded-lg overflow-hidden aspect-[3/4] cursor-pointer hover:opacity-90 transition-opacity">
                 <img src={img} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-2/5 p-6 sm:p-10 flex flex-col border-l border-zinc-100 dark:border-zinc-800">
          <div className="mb-6">
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide text-xs uppercase mb-2 block">
              {project.category}
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
              {project.fullDescription}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              项目链接
            </h4>
            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  <ExternalLink size={18} />
                  访问应用
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-medium transition-colors border border-zinc-200 dark:border-zinc-700"
                >
                  <Github size={18} />
                  查看源码
                </a>
              )}
              {project.qrCodeUrl && (
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center gap-4">
                  <img src={project.qrCodeUrl} alt="QR Code" className="w-16 h-16 rounded-md mix-blend-multiply dark:mix-blend-normal" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm">扫描体验</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">请使用微信扫描二维码</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
