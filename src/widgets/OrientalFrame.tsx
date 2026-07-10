import React from 'react';

interface OrientalFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const OrientalFrame: React.FC<OrientalFrameProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`oriental-card ${className}`}>
      {/* Corner Ornaments */}
      <div className="corner-decor corner-top-left" />
      <div className="corner-decor corner-top-right" />
      <div className="corner-decor corner-bottom-left" />
      <div className="corner-decor corner-bottom-right" />

      {/* Frame Border Line */}
      <div style={{
        position: 'absolute',
        top: '4px',
        bottom: '4px',
        left: '4px',
        right: '4px',
        border: '1px solid rgba(192, 157, 91, 0.3)', // gold border
        pointerEvents: 'none',
        borderRadius: '12px'
      }} />

      {title && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          marginTop: '4px'
        }}>
          {/* Traditional decorative left line */}
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--color-accent-gold))',
            marginRight: '12px'
          }} />
          
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            margin: 0,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--color-accent-gold)' }}>◆</span>
            {title}
            <span style={{ fontSize: '12px', color: 'var(--color-accent-gold)' }}>◆</span>
          </h3>

          {/* Traditional decorative right line */}
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, var(--color-accent-gold))',
            marginLeft: '12px'
          }} />
        </div>
      )}

      {/* Children content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
export default OrientalFrame;
