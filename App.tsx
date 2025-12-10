import React, { useState } from 'react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, APP_FEATURES, MYSTERY_TEASER } from './constants';
import PhoneMockup from './components/PhoneMockup';
import GeminiChat from './components/GeminiChat';
import { 
  List, 
  SortDesc, 
  Share2, 
  Cloud, 
  Zap, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';

const App: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const activeFeature = APP_FEATURES[activeFeatureIndex];

  // Helper to map string icon names to components
  const getIcon = (iconName: string, active: boolean) => {
    const className = `w-6 h-6 ${active ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`;
    switch (iconName) {
      case 'List': return <List className={className} />;
      case 'SortDesc': return <SortDesc className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      default: return <Zap className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-green-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
             <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <List size={20} />
             </div>
            <span>Alex.Dev</span>
          </div>
          <a 
            href="mailto:alex@example.com"
            className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            联系我
          </a>
        </div>
      </nav>

      {/* Main Content Area: Split View */}
      <main className="pt-24 pb-12 min-h-[90vh] flex flex-col items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Phone Mockup (Sticky on desktop) */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1 relative">
              <div className="relative z-10">
                 <PhoneMockup 
                   mediaUrl={activeFeature.mediaUrl} 
                   mediaType={activeFeature.mediaType} 
                 />
              </div>
              {/* Background decorative blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -z-0 pointer-events-none" />
            </div>

            {/* Right: Features List */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2 flex flex-col space-y-8">
              <div className="text-center lg:text-left space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold tracking-wide uppercase">
                  WeChat Mini Program
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {APP_NAME}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light">
                  {APP_TAGLINE}
                </p>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {APP_DESCRIPTION}
                </p>
              </div>

              {/* Interactive Feature List */}
              <div className="space-y-4 mt-8">
                {APP_FEATURES.map((feature, index) => {
                  const isActive = activeFeatureIndex === index;
                  return (
                    <div 
                      key={feature.id}
                      onClick={() => setActiveFeatureIndex(index)}
                      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 border
                        ${isActive 
                          ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 shadow-xl scale-[1.02]' 
                          : 'bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300
                            ${isActive ? 'bg-green-600 shadow-lg shadow-green-600/20' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                        >
                          {getIcon(feature.iconName, isActive)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                              {feature.title}
                            </h3>
                            {isActive && <ChevronRight className="text-green-600 w-5 h-5 animate-pulse" />}
                          </div>
                          <p className={`text-sm mb-2 ${isActive ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                            {feature.subtitle}
                          </p>
                          <div 
                            className={`grid transition-all duration-300 ease-in-out
                              ${isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <p className="overflow-hidden text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                              {feature.description}
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

      {/* Teaser Section */}
      <section className="py-24 bg-zinc-900 dark:bg-zinc-950 text-white relative overflow-hidden">
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
      <footer className="py-8 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Alex Dev. All rights reserved.</p>
        <p className="mt-2 text-xs">Powered by Gemini AI</p>
      </footer>

      {/* AI Assistant */}
      <GeminiChat />

    </div>
  );
};

export default App;
