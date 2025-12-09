import React from 'react';
import { Project } from '../types';
import { ExternalLink, Smartphone, Globe, Monitor } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getIcon = () => {
    switch (project.category) {
      case '微信小程序': return <Smartphone className="w-4 h-4" />;
      case '移动端 App': return <Smartphone className="w-4 h-4" />;
      case 'Web 应用': return <Globe className="w-4 h-4" />;
      case '桌面应用': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium flex items-center gap-2">
            查看详情 <ExternalLink size={14} />
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-800 dark:text-zinc-200 text-xs px-2 py-1 rounded-md font-semibold shadow-sm flex items-center gap-1">
            {getIcon()}
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
