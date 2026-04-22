import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// APP DATA — add new apps here, everything else auto-updates
// ============================================================
interface AppEntry {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  typeColor: string;   // accent color for the type badge
  tagline: string;
  features: string[];
  mediaUrl: string | string[]; // gif / image URL(s) for the phone mockup
  link: string;
  qrCodeUrl?: string; // QR code for mini programs
  accentColor: string; // tab active color + button
  accentDark: string;  // darker shade for hover
}

const APPS: AppEntry[] = [
  {
    id: 'tujianji',
    name: '图框计 MemoFrame',
    nameEn: 'MemoFrame',
    type: 'iOS App',
    typeColor: '#f59e0b',
    tagline: '让影像自带时间的重量 | Give weight to time',
    features: [
      '七重美学分身： 一次导入，同步显示 7 种模框效果。',
      '快门时间校准： 无需翻日历，精准计算并打上真实时间戳。',
      '批量排版引擎： 一键将精心调校的版面逻辑同步至多张照片。',
      '沙盒断网运行： 100% 本地运算，全方位保护您的隐私安全。',
      'Aesthetic Variations: Preview 7 framing effects instantly.',
      'Time Calibration: Automatically calculate and apply timestamps.',
      'Batch Layout Engine: Sync layout settings to multiple photos.',
      'Offline Environment: 100% local processing to keep photos secure.',
    ],
    mediaUrl: [
      '/images/中1.png',
      '/images/中2.png',
      '/images/中3.png',
      '/images/中4.png'
    ],
    link: '#',
    accentColor: '#f59e0b',
    accentDark: '#d97706',
  },
  {
    id: 'checklist',
    name: '自定义清单',
    nameEn: 'Custom List',
    type: '微信小程序',
    typeColor: '#22c55e',
    tagline: '条理生活，您的中长期清单',
    features: [
      'AI 一键脱水：粘贴文章将长文转为可直接打卡的行动清单。',
      '图片清单视觉打卡：多宫格自由排版 + 悬浮勾选框。',
      '极速录入：支持自定义分隔符批量导入，一行文字即可瞬间拆解为带评分、带地点的多维条目。',
      '零延迟云端协作：情侣、室友或团队实时共享账本与任务，让所有协作在秒级同步中达成。',
      '外挂式大脑提醒：单条清单直连系统日历与微信订阅消息，用双重强提醒终结你的健忘。',
      '决策灵感盲盒：内置“聚光灯”骰子专治选择困难，配合每日话题，让记录不再无从下笔。',
    ],
    mediaUrl: [
      '/images/frame1.png',
      '/images/frame2.png',
      '/images/frame3.png',
      '/images/frame4.png',
      '/images/frame5.png'
    ],
    qrCodeUrl: '/images/qingdan.png',
    link: '/checklist.html',
    accentColor: '#4ade80',
    accentDark: '#16a34a',
  },
];

// ============================================================
// Mondrian Blog Index (右侧，完全不变)
// ============================================================
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
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; opacity: 0.04; z-index: 10;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .mondrian-index {
          width: 340px;
          background: var(--m-black);
          padding: var(--grid-line);
          display: flex; flex-direction: column; gap: var(--grid-line);
          box-shadow: 20px 20px 60px rgba(0,0,0,0.15);
          position: relative;
          transform: rotate(-1deg);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .mondrian-index:hover { transform: rotate(0deg) scale(1.01); }
        
        .mondrian-index::before {
          content: '';
          position: absolute; left: -12px; top: 20px; bottom: 20px; width: 24px;
          background: repeating-linear-gradient(0deg, var(--m-black), var(--m-black) 10px, transparent 10px, transparent 20px);
          z-index: -1;
        }
        
        .paper-block {
          background: var(--bg-paper);
          padding: 20px; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .header-block {
          height: 140px; display: flex; flex-direction: column; justify-content: flex-end;
        }
        
        .header-block h1 {
          font-family: 'Outfit', sans-serif; font-size: 3.2rem; line-height: 0.85;
          text-transform: uppercase; letter-spacing: -2px; color: var(--m-black); font-weight: 800;
        }
        
        .header-meta {
          font-family: 'Space Mono', monospace; font-size: 0.7rem; margin-top: 10px;
          text-transform: uppercase; letter-spacing: 2px; color: var(--m-black);
        }
        
        .post-block { cursor: pointer; min-height: 110px; display: grid; grid-template-rows: auto 1fr; }
        
        .post-num {
          font-family: 'Space Mono', monospace; font-size: 0.65rem; font-weight: 700;
          margin-bottom: 8px; display: block; color: var(--m-black);
        }
        
        .post-block h2 {
          font-family: 'Outfit', sans-serif; font-size: 1.1rem; line-height: 1.2;
          color: var(--m-black); z-index: 2; font-weight: 800;
        }
        
        .post-gist {
          font-family: 'Space Mono', monospace; font-size: 0.7rem; line-height: 1.4;
          margin-top: 12px; opacity: 0; transform: translateY(10px);
          transition: all 0.4s ease; color: #555;
        }
        
        .post-block:hover { background: white; }
        .post-block:hover .post-gist { opacity: 1; transform: translateY(0); }
        
        .color-accent {
          position: absolute; bottom: 0; right: 0; width: 0%; height: 100%;
          z-index: 0; transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .post-block:hover .accent-red { width: 12px; background: var(--m-red); }
        .post-block:hover .accent-blue { width: 12px; background: var(--m-blue); }
        .post-block:hover .accent-yellow { width: 12px; background: var(--m-yellow); }
        
        .row-split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--grid-line); background: var(--m-black); }
        
        .small-square {
          aspect-ratio: 1; display: flex; align-items: center; justify-content: center; flex-direction: column;
        }
        
        .bg-red { background: var(--m-red); color: white; }
        .bg-blue { background: var(--m-blue); color: white; }
        
        .ticker {
          width: 100%; overflow: hidden; white-space: nowrap;
          background: var(--m-black); color: white;
          font-family: 'Space Mono', monospace; font-size: 0.65rem; padding: 6px 0;
        }
        
        .ticker-inner { display: inline-block; animation: ticker 15s linear infinite; }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .footer-block {
          padding: 12px 20px; font-family: 'Space Mono', monospace;
          font-size: 0.58rem; text-align: justify; line-height: 1.4; color: var(--m-black);
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .mondrian-index > * { animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both; }
        .mondrian-index > *:nth-child(1) { animation-delay: 0.1s; }
        .mondrian-index > *:nth-child(2) { animation-delay: 0.2s; }
        .mondrian-index > *:nth-child(3) { animation-delay: 0.3s; }
        .mondrian-index > *:nth-child(4) { animation-delay: 0.4s; }
        .mondrian-index > *:nth-child(5) { animation-delay: 0.5s; }
        .mondrian-index > *:nth-child(6) { animation-delay: 0.6s; }
        .mondrian-index > *:nth-child(7) { animation-delay: 0.7s; }
        .mondrian-index > *:nth-child(8) { animation-delay: 0.8s; }
      `}</style>

      <div className="mondrian-paper">
        <div className="texture-noise"></div>
        <nav ref={cardRef} className="mondrian-index">
          <header className="paper-block header-block">
            <div className="header-meta">博客日志 · Vol 01 // 2026</div>
            <h1>Read<br />Index</h1>
          </header>

          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-yellow"></div>
            <span className="post-num">006 / 新品发布</span>
            <h2>自带时间计算的高级相框：图框计</h2>
            <p className="post-gist">自动读取照片EXIF时间并计算相恋/出生天数，支持高定相框批量导出。</p>
          </article>

          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-blue"></div>
            <span className="post-num">005 / 产品更新</span>
            <h2>高自由度图志：如何让你一站搞定排版与打卡？</h2>
            <p className="post-gist">支持自定义网格、多页画板、批量文字填入与自动勾选框，三种模式一键导出高清图。</p>
          </article>

          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-red"></div>
            <span className="post-num">004 / 春节限定</span>
            <h2>🧨 春节拜年神器：既有"玄学"又有"科技感"？</h2>
            <p className="post-gist">能量加油站日历春节限定版上线！指尖烟花、AR抓金币，用黑科技重新定义拜年仪式感。</p>
          </article>

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

          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-yellow"></div>
            <span className="post-num">003 / 产品发布</span>
            <h2>能量加油站日历 ⚡️ 让每一天都充满力量</h2>
            <p className="post-gist">把温暖写进日历，让能量准时送达——治愈系小程序正式上线</p>
          </article>

          <article className="paper-block post-block" onClick={onNavigate}>
            <div className="color-accent accent-blue"></div>
            <span className="post-num">002 / 产品更新</span>
            <h2>宝藏小程序：截图拼图打勾，三步搞定图片清单！</h2>
            <p className="post-gist">从碎片到整合，从计划到执行——拼图助手+图片清单，效率提升何止一倍！</p>
          </article>

          <div className="ticker">
            <div className="ticker-inner">
              系统状态：运行中 — 文章更新中 — 追求本质 — 无重复 — 无填充 —&nbsp;
              系统状态：运行中 — 文章更新中 — 追求本质 — 无重复 — 无填充 —&nbsp;
            </div>
          </div>

          <footer className="paper-block footer-block">
            <p>产品思考与实践的记录。<br />此索引记录了 3 章探索之旅。</p>
          </footer>
        </nav>
      </div>
    </>
  );
};

// ============================================================
// iPhone Mockup Component
// ============================================================
interface PhoneMockupProps {
  mediaUrl: string | string[];
  isTransitioning: boolean;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ mediaUrl, isTransitioning }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Slideshow logic
  useEffect(() => {
    if (Array.isArray(mediaUrl) && mediaUrl.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaUrl.length);
      }, 3000); // Crossfade every 3 seconds
      return () => clearInterval(interval);
    }
  }, [mediaUrl]);

  // Reset index when app switches
  useEffect(() => {
    setCurrentIndex(0);
  }, [mediaUrl]);

  const images = Array.isArray(mediaUrl) ? mediaUrl : [mediaUrl];

  return (
    <div
      style={{
        position: 'relative',
        width: '260px',
        flexShrink: 0,
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Phone body */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '40px',
        padding: '12px',
        boxShadow: '0 0 0 2px #333, 0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
      }}>
        {/* Side buttons scaled */}
        <div style={{ position: 'absolute', left: '-3px', top: '80px', width: '3px', height: '32px', background: '#333', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: '-3px', top: '130px', width: '3px', height: '50px', background: '#333', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: '-3px', top: '190px', width: '3px', height: '50px', background: '#333', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', right: '-3px', top: '150px', width: '3px', height: '70px', background: '#333', borderRadius: '0 2px 2px 0' }} />

        {/* Screen */}
        <div style={{
          borderRadius: '32px',
          overflow: 'hidden',
          background: '#000',
          width: '236px',
          height: '510px',
          position: 'relative',
        }}>
          {/* Media content (Slideshow) */}
          {images.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`App demo ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: isTransitioning ? 0 : (index === currentIndex ? 1 : 0),
                transition: 'opacity 0.6s ease-in-out',
                zIndex: index === currentIndex ? 2 : 1,
                // Image Clarity Optimizations
                imageRendering: 'high-quality',
              }}
            />
          ))}

          {/* Home bar */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
            width: '110px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '9999px',
          }} />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// App Showcase (左侧主体，Mondrian 风格容器)
// ============================================================
const AppShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState(APPS[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedApp, setDisplayedApp] = useState(APPS[0]);
  const [showQR, setShowQR] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchApp = (id: string) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedApp(APPS.find(a => a.id === id) ?? APPS[0]);
      setActiveId(id);
      setIsTransitioning(false);
    }, 350);
  };

  // Parallax on the whole block
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      containerRef.current.style.transform = `perspective(1200px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
    };
    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = '';
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    el?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el?.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const app = displayedApp;

  return (
    <div
      ref={containerRef}
      style={{
        background: '#1a1a1a',           // Mondrian black border frame
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '20px 20px 60px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── TOP: App Selector Tabs ── */}
      <div style={{
        background: '#f9f7f2',
        padding: '16px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}>
        {/* Meta label */}
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#888',
          marginBottom: '12px',
        }}>
          产品展示 · Product Demo
        </span>

        {/* Tab row */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '3px solid #1a1a1a' }}>
          {APPS.map((a) => {
            const isActive = a.id === activeId;
            return (
              <button
                key={a.id}
                onClick={() => switchApp(a.id)}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '10px 20px',
                  background: isActive ? '#1a1a1a' : 'transparent',
                  color: isActive ? '#f9f7f2' : '#888',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  letterSpacing: '-0.5px',
                  borderBottom: isActive ? `3px solid ${a.accentColor}` : '3px solid transparent',
                  marginBottom: '-3px',
                }}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MIDDLE: Main Demo Area ── */}
      <div style={{
        background: '#f9f7f2',
        display: 'flex',
        gap: '0',
      }}>
        {/* Left: Phone Mockup block */}
        <div style={{
          background: '#1a1a1a',
          padding: '32px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '480px',
          position: 'relative',
        }}>
          <PhoneMockup mediaUrl={app.mediaUrl} isTransitioning={isTransitioning} />
        </div>

        {/* 4px black divider */}
        <div style={{ width: '4px', background: '#1a1a1a', flexShrink: 0 }} />

        {/* Right: Info block */}
        <div style={{
          background: '#f9f7f2',
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          minWidth: 0,
        }}>
          {/* Top info */}
          <div>
            {/* Type badge */}
            <span style={{
              display: 'inline-block',
              padding: '3px 10px',
              background: app.accentColor,
              color: '#000',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}>
              {app.type}
            </span>

            {/* App name */}
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              lineHeight: 0.9,
              color: '#1a1a1a',
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>
              {app.name}
            </h2>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              color: '#aaa',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              {app.nameEn}
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.05rem',
              lineHeight: 1.35,
              color: '#1a1a1a',
              borderLeft: `4px solid ${app.accentColor}`,
              paddingLeft: '12px',
              marginBottom: '24px',
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 0.4s ease 0.05s',
            }}>
              {app.tagline}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {app.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                    transition: `opacity 0.35s ease ${0.08 + i * 0.07}s, transform 0.35s ease ${0.08 + i * 0.07}s`,
                  }}
                >
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: app.accentColor,
                    flexShrink: 0, marginTop: '6px',
                  }} />
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.72rem',
                    lineHeight: 1.5,
                    color: '#444',
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ position: 'relative', marginTop: '28px' }}>
            {app.qrCodeUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setShowQR(!showQR)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    background: '#1a1a1a',
                    color: app.accentColor,
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    border: `2px solid ${app.accentColor}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = app.accentColor;
                    e.currentTarget.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#1a1a1a';
                    e.currentTarget.style.color = app.accentColor;
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>扫码立即体验</span>
                </button>
                
                {showQR && (
                  <div style={{
                    position: 'absolute', bottom: '60px', left: '0',
                    background: 'white', padding: '16px', border: '4px solid #1a1a1a',
                    boxShadow: '10px 10px 0 #1a1a1a', zIndex: 100,
                    animation: 'fadeInUp 0.3s ease-out'
                  }}>
                    <img src={app.qrCodeUrl} alt="QR Code" style={{ width: '140px', height: '140px', display: 'block' }} />
                    <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.6rem', color: '#888', fontFamily: "'Space Mono', monospace" }}>微信扫一扫</div>
                  </div>
                )}
              </div>
            ) : app.type === 'iOS App' ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: '#333',
                  color: '#999',
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '2px solid #444',
                  cursor: 'not-allowed',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.23-1.93 1.09-3.05-1.01.04-2.24.64-2.96 1.45-.64.71-1.2 1.83-1.05 2.93 1.13.09 2.22-.52 2.92-1.33z" />
                  </svg>
                  <span>App Store 即将上架</span>
                </div>
              </div>
            ) : (
              <a
                href={app.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: '#1a1a1a',
                  color: app.accentColor,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  border: `2px solid ${app.accentColor}`,
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = app.accentColor;
                  (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#1a1a1a';
                  (e.currentTarget as HTMLAnchorElement).style.color = app.accentColor;
                }}
              >
                <span>立即查看</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M7 7h10v10M7 17L17 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Status Bar ── */}
      <div style={{
        background: '#f9f7f2',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '4px solid #1a1a1a',
      }}>
        <div>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#888',
          }}>
            黄小桃开发实验中
          </span>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '1.3rem',
            color: '#1a1a1a',
            letterSpacing: '-1px',
            textTransform: 'uppercase',
          }}>
            Zeze Lab
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '4px', justifyContent: 'flex-end' }}>
            <a href="/privacy.html" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              color: '#888',
              textDecoration: 'underline'
            }}>隐私政策</a>
            <a href="/support.html" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              color: '#888',
              textDecoration: 'underline'
            }}>技术支持</a>
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.7rem',
            color: '#1a1a1a',
            fontWeight: 700,
          }}>
            99.2% 运行中
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main App
// ============================================================
function App() {
  const handleBlogClick = () => {
    window.location.href = '/blog.html';
  };

  return (
    <div
      className="min-h-screen p-4 lg:p-8 font-sans overflow-hidden"
      style={{ background: '#0a0a0c' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* 左侧：App 展示台 (8/12) */}
        <div className="lg:col-span-8">
          <AppShowcase />
        </div>

        {/* 右侧：Mondrian 博客笔记本 (4/12)，完全不变 */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <MondrianBlogIndex onNavigate={handleBlogClick} />
        </div>

      </div>
    </div>
  );
}

export default App;