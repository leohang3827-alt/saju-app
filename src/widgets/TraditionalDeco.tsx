import React from 'react';

// Traditional Oriental Cloud SVG Component
export const CloudDeco: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className }) => {
  return (
    <svg 
      width="64" 
      height="32" 
      viewBox="0 0 64 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.15, ...style }}
      className={className}
    >
      <path 
        d="M24 16C24 11.58 27.58 8 32 8C36.42 8 40 11.58 40 16H24Z" 
        stroke="var(--color-accent-red)" 
        strokeWidth="1.5"
      />
      <path 
        d="M12 22C12 17.58 15.58 14 20 14C24.42 14 28 17.58 28 22H12Z" 
        stroke="var(--color-accent-red)" 
        strokeWidth="1.5"
      />
      <path 
        d="M36 22C36 17.58 39.58 14 44 14C48.42 14 52 17.58 52 22H36Z" 
        stroke="var(--color-accent-red)" 
        strokeWidth="1.5"
      />
      <path 
        d="M4 26C4 23.79 5.79 22 8 22C10.21 22 12 23.79 12 26H4Z" 
        stroke="var(--color-accent-red)" 
        strokeWidth="1.5"
      />
      <path 
        d="M52 26C52 23.79 53.79 22 56 22C58.21 22 60 23.79 60 26H52Z" 
        stroke="var(--color-accent-red)" 
        strokeWidth="1.5"
      />
      <line x1="8" y1="26" x2="56" y2="26" stroke="var(--color-accent-red)" strokeWidth="1.5" />
    </svg>
  );
};

// Traditional Fan SVG Component
export const FanDeco: React.FC<{ size?: number; style?: React.CSSProperties; className?: string }> = ({ 
  size = 48, 
  style, 
  className 
}) => {
  return (
    <svg 
      width={size} 
      height={size / 2} 
      viewBox="0 0 100 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0px 2px 4px rgba(166, 30, 34, 0.15))', ...style }}
      className={className}
    >
      {/* Fan Background */}
      <path 
        d="M50 45 C30 45, 10 35, 5 15 C20 5, 80 5, 95 15 C90 35, 70 45, 50 45 Z" 
        fill="var(--color-accent-red)" 
      />
      
      {/* Inner Cutout */}
      <path 
        d="M50 45 C42 45, 30 40, 25 32 C35 25, 65 25, 75 32 C70 40, 58 45, 50 45 Z" 
        fill="var(--color-cream-bg)" 
      />
      
      {/* Fan Spokes (Gold) */}
      <line x1="50" y1="45" x2="5" y2="15" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="20" y2="8" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="35" y2="4" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="50" y2="3" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="65" y2="4" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="80" y2="8" stroke="var(--color-accent-gold)" strokeWidth="1" />
      <line x1="50" y1="45" x2="95" y2="15" stroke="var(--color-accent-gold)" strokeWidth="1" />

      {/* Fan Outer Rim Decor */}
      <path 
        d="M5 15 C20 5, 80 5, 95 15" 
        stroke="var(--color-accent-gold)" 
        strokeWidth="1.5" 
      />
      
      {/* Center Pivot */}
      <circle cx="50" cy="43" r="3" fill="var(--color-accent-gold)" />
    </svg>
  );
};

// Notification Bell SVG Icon
export const BellIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 24, style }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="var(--color-accent-red)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
};

// Lock SVG Icon
export const LockIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};
export default CloudDeco;
