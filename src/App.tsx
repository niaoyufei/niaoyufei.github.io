import React, { useEffect, useRef } from 'react';

// Enhanced tools data with color themes
const TOOLS = [
  { id: 1, title: "自定义清单", description: "微信小程序", icon: "📋", link: "/checklist.html", theme: "red", isActive: true, isCompleted: true },
  { id: 2, title: "Endless Walk", description: "无尽迷宫", icon: "🚶", link: "#", theme: "blue", isActive: true, isCompleted: false },
  { id: 3, title: "图框记", description: "图+框+文字", icon: "🖼️", link: "#", theme: "yellow", isActive: true, isCompleted: false },
  { id: 4, title: "", description: "", icon: "", link: "#", theme: "red", isActive: false, isCompleted: false }, // 装饰块
  { id: 5, title: "图片拼贴", description: "网页工具", icon: "🎨", link: "/gridcollage-app/index.html", theme: "blue", isActive: true, isCompleted: true },
  { id: 6, title: "Stitch & Play", description: "管理拼接与播放", icon: "🧩", link: "#", theme: "yellow", isActive: true, isCompleted: false },
  { id: 7, title: "", description: "", icon: "", link: "#", theme: "red", isActive: false, isCompleted: false }, // 装饰块
  { id: 8, title: "XX传", description: "您的传记故事", icon: "📡", link: "#", theme: "blue", isActive: true, isCompleted: false },
  { id: 9, title: "事事计时器", description: "了解时间去哪了", icon: "⏱️", link: "#", theme: "yellow", isActive: true, isCompleted: false },
  { id: 10, title: "英语场景听说", description: "尚雯婕学习法", icon: "🎧", link: "#", theme: "yellow", isActive: true, isCompleted: false },
  { id: 11, title: "日记本", description: "Web网页工具", icon: "📔", link: "#", theme: "blue", isActive: true, isCompleted: false },
  { id: 12, title: "", description: "", icon: "", link: "#", theme: "red", isActive: false, isCompleted: false }, // 装饰块
];

// Frequency visualizer component
const FrequencyBar: React.FC<{ delay: number }> = ({ delay }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (barRef.current) {
        const height = Math.random() * 100;
        barRef.current.style.height = `${height}%`;
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={barRef}
      className="w-1 bg-[#ffcc00] transition-all duration-300 ease-in-out"
      style={{ animationDelay: `${delay}s` }}
    />
  );
};

// Mondrian Blog Index Component
interface MondrianBlogIndexProps {
  onNavigate: () => void;
}

const MondrianBlogIndex: React.FC<MondrianBlogIndexProps> = ({ onNavigate }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) rotate(-1deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg) rotate(-1deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800&family=Space+Mono:wght@400;700&display=swap');
        
        .mondrian-paper {
          --bg-paper: #f9f7f2;
          --m-red: #d9432f;
          --m-blue: #2a52be;
          --m-yellow: #ffcc00;
          --m-black: #1a1a1a;
          --grid-line: 4px;
        }
        
        .texture-noise {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.04;
          z-index: 10;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .mondrian-index {
          width: 340px;
          background: var(--m-black);
          padding: var(--grid-line);
          display: flex;
          flex-direction: column;
          gap: var(--grid-line);
          box-shadow: 20px 20px 60px rgba(0,0,0,0.15);
          position: relative;
          transform: rotate(-1deg);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .mondrian-index:hover {
          transform: rotate(0deg) scale(1.01);
        }
        
        /* Binding Strip */
        .mondrian-index::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 20px;
          bottom: 20px;
          width: 24px;
          background: repeating-linear-gradient(
            0deg,
            var(--m-black),
            var(--m-black) 10px,
            transparent 10px,
            transparent 20px
          );
          z-index: -1;
        }
        
        .paper-block {
          background: var(--bg-paper);
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .header-block {
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        
        .header-block h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          line-height: 0.85;
          text-transform: uppercase;
          letter-spacing: -2px;
          color: var(--m-black);
          font-weight: 800;
        }
        
        .header-meta {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--m-black);
        }
        
        .post-block {
          cursor: pointer;
          min-height: 110px;
          display: grid;
          grid-template-rows: auto 1fr;
        }
        
        .post-num {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          margin-bottom: 8px;
          display: block;
          color: var(--m-black);
        }
        
        .post-block h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          line-height: 1.2;
          color: var(--m-black);
          z-index: 2;
          font-weight: 800;
        }
        
        .post-gist {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          line-height: 1.4;
          margin-top: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease;
          color: #555;
        }
        
        .post-block:hover {
          background: white;
        }
        
        .post-block:hover .post-gist {
          opacity: 1;
          transform: translateY(0);
        }
        
        .color-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0%;
          height: 100%;
          z-index: 0;
          transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .post-block:hover .accent-red { width: 12px; background: var(--m-red); }
        .post-block:hover .accent-blue { width: 12px; background: var(--m-blue); }
        .post-block:hover .accent-yellow { width: 12px; background: var(--m-yellow); }
        
        .row-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--grid-line);
          background: var(--m-black);
        }
        
        .small-square {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        
        .bg-red { background: var(--m-red); color: white; }
        .bg-blue { background: var(--m-blue); color: white; }
        
        .ticker {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          background: var(--m-black);
          color: white;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          padding: 6px 0;
        }
        
        .ticker-inner {
          display: inline-block;
          animation: ticker 15s linear infinite;
        }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .footer-block {
          padding: 12px 20px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          text-align: justify;
          line-height: 1.4;
          color: var(--m-black);
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .mondrian-index > * {
          animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        
        .mondrian-index > *:nth-child(1) { animation-delay: 0.1s; }
        .mondrian-index > *:nth-child(2) { animation-delay: 0.2s; }
        .mondrian-index > *:nth-child(3) { animation-delay: 0.3s; }
        .mondrian-index > *:nth-child(4) { animation-delay: 0.4s; }
        .mondrian-index > *:nth-child(5) { animation-delay: 0.5s; }
      `}</style>

      <div className="mondrian-paper">
        <div className="texture-noise"></div>
        <nav ref={cardRef} className="mondrian-index">
          {/* Header Block */}
          <header className="paper-block header-block">
            <div className="header-meta">博客日志 · Vol 01 // 2026</div>
            <h1>Read<br />Index</h1>
          </header>

          {/* Post 2 - Latest */}
          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-blue"></div>
            <span className="post-num">002 / 产品更新</span>
            <h2>宝藏小程序：截图拼图打勾，三步搞定图片清单！</h2>
            <p className="post-gist">从碎片到整合，从计划到执行——拼图助手+图片清单，效率提升何止一倍！</p>
          </article>

          {/* Split Section */}
          <div className="row-split">
            <div className="paper-block small-square bg-red">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 7h10v10M7 17L17 7" />
              </svg>
            </div>
            <div className="paper-block small-square">
              <span className="post-num" style={{ fontSize: '0.6rem' }}>阅读量</span>
              <div style={{ fontWeight: 800, fontSize: '1.4rem', fontFamily: 'Outfit' }}>1.2k</div>
            </div>
          </div>

          {/* Post 1 */}
          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-red"></div>
            <span className="post-num">001 / 产品开发</span>
            <h2>告别繁琐输入！支持图片勾选、文本秒转，清单还能这样玩？</h2>
            <p className="post-gist">在谷歌Gemini的帮助下，开发了一款轻量化清单小程序——简化输入、方便分享。</p>
          </article>

          {/* Ticker */}
          <div className="ticker">
            <div className="ticker-inner">
              系统状态：运行中 — 文章更新中 — 追求本质 — 无重复 — 无填充 —&nbsp;
              系统状态：运行中 — 文章更新中 — 追求本质 — 无重复 — 无填充 —&nbsp;
            </div>
          </div>

          {/* Footer */}
          <footer className="paper-block footer-block">
            <div className="flex justify-between items-end">
              <span>产品思考与实践的记录。此索引记录了 2 章探索之旅。</span>
              <a href="/privacy.html" className="text-[0.55rem] text-gray-500 hover:text-black underline decoration-gray-400">隐私政策</a>
            </div>
          </footer>
        </nav>
      </div>
    </>
  );
};

function App() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleToolClick = (link: string) => {
    console.log(`Maps to ${link}`);
    window.location.href = link;
  };

  const handleBlogClick = () => {
    console.log("Navigate to Blog");
    window.location.href = "/blog.html";
  };


  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!viewportRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      viewportRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'red': return 'rgba(217, 45, 32, 0.35)';
      case 'blue': return 'rgba(0, 71, 171, 0.3)';
      case 'yellow': return 'rgba(255, 204, 0, 0.25)';
      default: return 'rgba(255, 255, 255, 0.08)';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-4 lg:p-8 font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&family=JetBrains+Mono:wght@300;500&display=swap');
        
        :root {
          --primary-red: #e63946;
          --primary-blue: #1d3557;
          --primary-yellow: #ffc300;
        }
        
        .vitreous-pane {
          position: relative;
          backdrop-filter: blur(12px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        /* 为活跃工具添加半透明遮罩来减少纹理干扰 */
        .vitreous-pane.active-tool::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          opacity: 0.6;
          z-index: 0;
        }
        
        .vitreous-pane::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        
        .vitreous-pane:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateZ(10px);
          z-index: 10;
        }
        
        /* 确保内容在遮罩之上 */
        .vitreous-pane > * {
          position: relative;
          z-index: 2;
        }
        
        .tag-label {
          display: inline-block;
          padding: 4px 8px;
          background: white;
          color: black;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 0.65rem;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        
        .mono-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
        }
        
        .control-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 15px rgba(255,255,255,0.5);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .grid-reveal {
          animation: grid-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes grid-reveal {
          from { opacity: 0; transform: scale(0.98) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

        {/* 左侧：Mondrian Grid Tool Blocks */}
        <div
          ref={viewportRef}
          className="lg:col-span-8 grid-reveal transition-transform duration-200 ease-out"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 auto-rows-fr bg-black p-3">
            {TOOLS.map((tool, index) => (
              <div
                key={tool.id}
                onClick={() => tool.isActive && handleToolClick(tool.link)}
                className={`vitreous-pane ${tool.isActive ? 'active-tool' : ''} relative flex flex-col items-center justify-center text-center rounded-sm ${tool.isActive ? 'cursor-pointer' : ''}`}
                style={{
                  background: tool.isActive ? getThemeColor(tool.theme) :
                    tool.theme === 'red' ? 'var(--primary-red)' :
                      tool.theme === 'blue' ? 'var(--primary-blue)' :
                        'var(--primary-yellow)',
                  aspectRatio: '1/1',
                  padding: '1.5rem'
                }}
              >
                {tool.isActive ? (
                  <>
                    {/* Checkbox - Calligraphic Style - Positioned in top-left corner */}
                    <div
                      className="absolute w-4 h-4 min-w-[16px] min-h-[16px] rounded-sm border-[2px] border-white flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{
                        backgroundColor: tool.isCompleted ? 'white' : 'transparent',
                        zIndex: 10,
                        position: 'absolute',
                        top: '15%',
                        left: 'calc(25% - 16px)'
                      }}
                    >
                      {tool.isCompleted && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>

                    {/* Content - centered in the card */}
                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
                      {/* Icon & Title */}
                      <div className="flex flex-col items-center gap-2">
                        {tool.id === 1 ? (
                          <img src="/checklist_icon.png" alt={tool.title} className="w-14 h-14 object-contain" />
                        ) : (
                          <span className="text-4xl">{tool.icon}</span>
                        )}
                        <h3 className="font-bold text-white text-sm uppercase tracking-tight leading-tight">
                          {tool.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="mono-text text-[0.6rem] line-clamp-2 px-2">
                        {tool.description}
                      </p>

                      {/* Visual indicator based on theme */}
                      {index % 3 === 0 && (
                        <div className="control-dot mt-1"></div>
                      )}

                      {index % 3 === 1 && (
                        <div className="flex gap-1 items-end h-5 mt-1">
                          <FrequencyBar delay={0.1} />
                          <FrequencyBar delay={0.3} />
                          <FrequencyBar delay={0.2} />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // Decorative block - empty with just color
                  <div className="w-full h-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom status bar */}
          <div className="vitreous-pane mt-3 p-4 rounded-sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <div className="flex justify-between items-center">
              <div>
                <span className="mono-text text-[0.65rem]">黄小桃（zeze）</span>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">开发计划表</h2>
              </div>
              <div className="text-right">
                <span className="mono-text text-[0.65rem]">在线状态</span><br />
                <span className="mono-text text-white">99.2% 运行中</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：Mondrian 纸质笔记本区域 */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <MondrianBlogIndex onNavigate={handleBlogClick} />
        </div>
      </div>
    </div >
  );
}

export default App;