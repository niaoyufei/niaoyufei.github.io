import React from 'react';

interface PhoneMockupProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ mediaUrl, mediaType }) => {
  return (
    <div className="relative mx-auto border-zinc-800 bg-zinc-800 border-[12px] rounded-[2.5rem] w-full aspect-[9/19] shadow-2xl transition-transform duration-500 hover:scale-[1.02] max-w-[320px]">
      {/* Notch and sensors */}
      <div className="w-[40%] h-[18px] bg-zinc-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
      
      {/* Side buttons */}
      <div className="h-[32px] w-[3px] bg-zinc-800 absolute -start-[15px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-zinc-800 absolute -start-[15px] top-[124px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-zinc-800 absolute -end-[15px] top-[142px] rounded-e-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[1.7rem] overflow-hidden w-full h-full bg-zinc-900 relative">
        {mediaType === 'video' ? (
           <video 
             key={mediaUrl} 
             src={mediaUrl} 
             className="w-full h-full object-cover animate-fadeIn" 
             autoPlay 
             muted 
             loop 
             playsInline
           />
        ) : (
           <img 
             key={mediaUrl} 
             src={mediaUrl} 
             className="w-full h-full object-cover animate-fadeIn" 
             alt="App Screen" 
           />
        )}
        
        {/* Screen Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;