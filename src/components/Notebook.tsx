import React from 'react';

interface NotebookProps {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'spiral' | 'stitched'; // 螺旋装订或胶装
}

const Notebook: React.FC<NotebookProps> = ({ 
  title, 
  children, 
  onClick, 
  className = '',
  type = 'stitched' 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden ${className}`}
      style={{
        // 笔记本横线背景效果
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
        backgroundSize: '100% 2rem',
        lineHeight: '2rem'
      }}
    >
      {/* 侧边装订效果 */}
      <div className={`absolute top-0 bottom-0 left-0 w-8 flex flex-col justify-evenly items-center ${type === 'spiral' ? 'bg-transparent' : 'bg-gray-800 border-r border-gray-600'}`}>
        {type === 'spiral' && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-gray-300 border border-gray-400 shadow-inner mb-4 -ml-2"></div>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="pl-12 pr-4 py-6 h-full flex flex-col">
        {title && (
          <h2 className="text-2xl font-handwriting font-bold text-gray-800 mb-4 border-b-2 border-red-300 pb-1" style={{ fontFamily: 'cursive' }}>
            {title}
          </h2>
        )}
        <div className="flex-grow font-handwriting text-gray-700" style={{ fontFamily: 'cursive' }}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Notebook;