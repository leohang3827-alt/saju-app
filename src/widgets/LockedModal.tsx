import React from 'react';
import OrientalFrame from './OrientalFrame';
import { FanDeco } from './TraditionalDeco';

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedModal: React.FC<LockedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(42, 36, 33, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      backdropFilter: 'blur(4px)',
      padding: '24px'
    }}>
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '320px',
          animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <OrientalFrame>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '8px 0'
          }}>
            {/* Traditional Deco Fan */}
            <FanDeco size={60} style={{ marginBottom: '16px' }} />
            
            <h2 style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '12px',
              color: 'var(--color-accent-red)',
              fontFamily: 'var(--font-oriental)'
            }}>
              정식 출시 예정입니다
            </h2>
            
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--color-text-charcoal)',
              marginBottom: '20px',
              wordBreak: 'keep-all'
            }}>
              현재는 무료 사주 기본 분석만<br />
              이용 가능합니다.
            </p>

            <button 
              className="btn-primary" 
              onClick={onClose}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                borderRadius: '8px',
                width: '100%'
              }}
            >
              확인
            </button>
          </div>
        </OrientalFrame>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default LockedModal;
