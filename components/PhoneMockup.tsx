// src/components/PhoneMockup.tsx
import React from 'react';

interface PhoneMockupProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ mediaUrl, mediaType }) => {
  return (
    <div className="relative mx-auto border-zinc-800 bg-zinc-950 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      {/* 手机听筒/刘海区域 */}
      <div className="h-[32px] w-[3px] bg-zinc-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-zinc-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-zinc-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-zinc-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      
      {/* 屏幕内容区域 */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-zinc-900 relative">
        {mediaType === 'video' ? (
          <video 
            src={mediaUrl} 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          />
        ) : (
          <img 
            src={mediaUrl} 
            alt="App Screenshot" 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* 模拟底部 Home Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;