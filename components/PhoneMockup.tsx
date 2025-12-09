import React from 'react';

interface PhoneMockupProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ mediaUrl, mediaType }) => {
  return (
    <div className="relative mx-auto border-gray-900 dark:border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
      {/* Notch and sensors */}
      <div className="w-[148px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
      
      {/* Side buttons */}
      <div className="h-[32px] w-[3px] bg-gray-900 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-900 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-900 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-900 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-zinc-800 relative">
        {mediaType === 'video' ? (
           <video 
             key={mediaUrl} // Force re-render on url change
             src={mediaUrl} 
             className="w-full h-full object-cover animate-fadeIn" 
             autoPlay 
             muted 
             loop 
             playsInline
           />
        ) : (
           <img 
             key={mediaUrl} // Force re-render on url change
             src={mediaUrl} 
             className="w-full h-full object-cover animate-fadeIn" 
             alt="App Screen" 
           />
        )}
        
        {/* Screen Glare/Overlay for realism */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;
