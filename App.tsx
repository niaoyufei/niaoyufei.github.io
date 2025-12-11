// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  APP_NAME, 
  APP_TAGLINE, 
  APP_DESCRIPTION, 
  APP_FEATURES, 
  TARGET_AUDIENCE, // 引入新的受众数据
  MYSTERY_TEASER 
} from './constants';
import PhoneMockup from './components/PhoneMockup';
import { 
  List, SortDesc, Share2, Cloud, Zap, ChevronRight, HelpCircle, Mail,
  PenTool, Map, Library
} from 'lucide-react';

const App: React.FC = () => {
  // --- 状态管理 ---
  const [activeTab, setActiveTab] = useState<'features' | 'audience'>('features'); // 当前选中的 Tab
  const [activeIndex, setActiveIndex] = useState(0); // 当前选中的条目索引
  const [isPaused, setIsPaused] = useState(false); // 鼠标悬停时暂停轮播
  
  // 决定当前显示哪个列表数据
  const currentList = activeTab === 'features' ? APP_FEATURES : TARGET_AUDIENCE;
  const activeItem = currentList[activeIndex] || currentList[0];

  // --- 自动化轮播逻辑 (核心) ---
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // 如果当前列表还没播完，播下一个
        if (prevIndex < currentList.length - 1) {
          return prevIndex + 1;
        } 
        // 如果当前列表播完了，切换到另一个 Tab，并从 0 开始
        else {
          setActiveTab((prevTab) => prevTab === 'features' ? 'audience' : 'features');
          return 0;
        }
      });
    }, 4000); // 每 4 秒切换一次

    return () => clearInterval(timer);
  }, [activeTab, currentList.length, isPaused]);

  // --- 手动切换 Tab 时重置索引 ---
  const handleTabChange = (tab: 'features' | 'audience') => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  // --- 图标渲染辅助函数 ---
  const renderIcon = (iconName: string, active: boolean) => {
    const className = `w-6 h-6 ${active ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`;
    switch (iconName) {
      case 'List': return <List className={className} />;
      case 'SortDesc': return <SortDesc className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'PenTool': return <PenTool className={className} />;
      case 'Map': return <Map className={className} />;
      case 'Library': return <Library className={className} />;
      default: return <Zap className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-green-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
             <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <List size={20} />
             </div>
            <span>{APP_NAME}</span>
          </div>
          <a 
            href="mailto:huangzeze@example.com" 
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={16} />
            联系我
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 min-h-[90vh] flex flex-col items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-16 lg:gap-24">
            
            {/* Left: Phone Mockup (Sticky) */}
            <div className="w-full md:w-5/12 lg:w-1/3 flex justify-center order-1 md:sticky md:top-32 self-start">
              <div className="relative z-10 w-full max-w-[320px]">
                 {/* 手机屏幕内容会根据 activeItem 自动变化 */}
                 <PhoneMockup 
                   mediaUrl={activeItem.mediaUrl} 
                   mediaType={activeItem.mediaType as 'image' | 'video'} 
                 />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[80px] -z-0 pointer-events-none" />
            </div>

            {/* Right: Content Area (Tabs + List) */}
            <div className="w-full md:w-7/12 lg:w-1/2 order-2 flex flex-col pt-4 md:pt-10">
              
              {/* Header Info */}
              <div className="mb-8 text-center md:text-left">
                <span className="inline-block px-3 py-1 mb-4 rounded-full bg-green-900/30 text-green-300 text-xs font-bold tracking-wide uppercase border border-green-900/50">
                  WeChat Mini Program
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                  {APP_NAME}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 font-light mb-4">
                  {APP_TAGLINE}
                </p>
                <p className="text-base text-zinc-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                  {APP_DESCRIPTION}
                </p>
              </div>

              {/* --- Tab Switcher (选项卡) --- */}
              <div className="flex items-center gap-6 border-b border-zinc-800 mb-6">
                <button
                  onClick={() => handleTabChange('features')}
                  className={`pb-3 text-sm font-medium transition-all relative ${
                    activeTab === 'features' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  核心功能
                  {activeTab === 'features' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('audience')}
                  className={`pb-3 text-sm font-medium transition-all relative ${
                    activeTab === 'audience' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  适用人群
                  {activeTab === 'audience' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t-full" />
                  )}
                </button>
              </div>

              {/* Dynamic List (根据 Tab 显示内容) */}
              <div 
                className="space-y-4"
                onMouseEnter={() => setIsPaused(true)} // 鼠标移入暂停轮播
                onMouseLeave={() => setIsPaused(false)} // 鼠标移出继续轮播
              >
                {currentList.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-500 border
                        ${isActive 
                          ? 'bg-zinc-900 border-zinc-700 shadow-xl translate-x-2' 
                          : 'bg-transparent border-transparent hover:bg-zinc-900/50'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300
                            ${isActive ? 'bg-green-600 shadow-lg shadow-green-600/20' : 'bg-zinc-800'}`}
                        >
                          {renderIcon(item.iconName, isActive)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                              {item.title}
                            </h3>
                            {isActive && <ChevronRight className="text-green-600 w-5 h-5 animate-pulse" />}
                          </div>
                          {item.subtitle && (
                            <p className={`text-sm mb-2 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
                              {item.subtitle}
                            </p>
                          )}
                          <div 
                            className={`grid transition-all duration-300 ease-in-out
                              ${isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <p className="overflow-hidden text-sm text-zinc-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Teaser Section (迷宫预告) */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-2xl">
            <HelpCircle size={32} className="text-zinc-500" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500">
            {MYSTERY_TEASER.title}
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-lg">
            {MYSTERY_TEASER.description}
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            预计发布: {MYSTERY_TEASER.releaseDate}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-sm text-zinc-600">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default App;