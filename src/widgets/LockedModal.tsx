import React from 'react';
import OrientalFrame from './OrientalFrame';
import { FanDeco } from './TraditionalDeco';

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedModal: React.FC<LockedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePurchaseClick = () => {
    window.open('https://gusdud3827.cafe24.com', '_blank');
  };

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
              프리미엄 리포트 구매
            </h2>
            
            <p style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--color-text-charcoal)',
              marginBottom: '20px',
              wordBreak: 'keep-all'
            }}>
              기질 및 성향 분석, 용신/희신 비책, 실생활 맞춤 개운법, 공간 풍수 인테리어, 2026년 하반기 신수 총운까지 모든 상세 리포트를 무제한 감상해 보세요!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
              <button 
                className="btn-primary" 
                onClick={handlePurchaseClick}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  width: '100%',
                  fontWeight: 'bold'
                }}
              >
                프리미엄 구매하러 가기
              </button>
              
              <button 
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-light)',
                  padding: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                돌아가기
              </button>
            </div>
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
