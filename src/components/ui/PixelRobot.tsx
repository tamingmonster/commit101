import React from 'react';

export const PixelRobot = ({ 
  className = "w-6 h-6", 
  color = "currentColor",
  accentColor = "currentColor"
}: { 
  className?: string; 
  color?: string;
  accentColor?: string;
}) => {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      {/* Background shape to give it volume/shadow if needed, but let's stick to flat pixel art */}
      
      {/* Body Parts - Main Color */}
      <g fill={color}>
        {/* Head */}
        <rect x="3" y="4" width="10" height="8" />
        {/* Neck/Body hint */}
        <rect x="5" y="13" width="6" height="2" />
      </g>
      
      {/* Accents - Secondary Color */}
      <g fill={accentColor}>
        {/* Antenna */}
        <rect x="7" y="1" width="2" height="2" />
        <rect x="7" y="3" width="2" height="1" />
        
        {/* Ears/Side bolts */}
        <rect x="2" y="6" width="1" height="4" />
        <rect x="13" y="6" width="1" height="4" />
      </g>
      
      {/* Face Features - Always White/Bright for contrast */}
      <g fill="white">
        {/* Eyes */}
        <rect x="5" y="6" width="2" height="2" />
        <rect x="9" y="6" width="2" height="2" />
        
        {/* Mouth */}
        <rect x="5" y="10" width="6" height="1" />
      </g>
    </svg>
  );
};
