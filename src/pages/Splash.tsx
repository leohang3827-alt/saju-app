import React from 'react';
import fireLarge from '../assets/characters/fire_large.png';
import { FanDeco } from '../widgets/TraditionalDeco';
import DraggableWrapper from '../widgets/DraggableWrapper';

interface SplashProps {
  onStart: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onStart }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #B22227 0%, #7E1316 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
      color: '#FFFFFF'
    }}>
      {/* Corner Ornaments in Gold */}
      <div className="corner-decor corner-top-left" style={{ borderColor: 'var(--color-accent-gold)', top: '16px', left: '16px', width: '20px', height: '20px', borderWidth: '2px 0 0 2px' }} />
      <div className="corner-decor corner-top-right" style={{ borderColor: 'var(--color-accent-gold)', top: '16px', right: '16px', width: '20px', height: '20px', borderWidth: '2px 2px 0 0' }} />
      <div className="corner-decor corner-bottom-left" style={{ borderColor: 'var(--color-accent-gold)', bottom: '16px', left: '16px', width: '20px', height: '20px', borderWidth: '0 0 2px 2px' }} />
      <div className="corner-decor corner-bottom-right" style={{ borderColor: 'var(--color-accent-gold)', bottom: '16px', right: '16px', width: '20px', height: '20px', borderWidth: '0 2px 2px 0' }} />

      {/* Outer Traditional Gold Double Border */}
      <div style={{
        position: 'absolute',
        top: '12px',
        bottom: '12px',
        left: '12px',
        right: '12px',
        border: '1px solid rgba(192, 157, 91, 0.4)',
        pointerEvents: 'none',
        borderRadius: '16px'
      }} />
      <div style={{
        position: 'absolute',
        top: '8px',
        bottom: '8px',
        left: '8px',
        right: '8px',
        border: '1px solid rgba(192, 157, 91, 0.2)',
        pointerEvents: 'none',
        borderRadius: '18px'
      }} />

      {/* Cloud Decoration (Background Pattern Overlay) */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-20px',
        opacity: 0.08,
        transform: 'scale(2)',
        pointerEvents: 'none'
      }}>
        {/* Cloud vector */}
        <svg width="200" height="100" viewBox="0 0 100 50" fill="none" stroke="#FFFFFF" strokeWidth="1">
          <path d="M30 25 C30 18, 40 10, 50 10 C60 10, 70 18, 70 25 M15 35 C15 28, 25 20, 35 20 C45 20, 55 28, 55 35" />
        </svg>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '-40px',
        opacity: 0.08,
        transform: 'scale(2) rotate(180deg)',
        pointerEvents: 'none'
      }}>
        <svg width="200" height="100" viewBox="0 0 100 50" fill="none" stroke="#FFFFFF" strokeWidth="1">
          <path d="M30 25 C30 18, 40 10, 50 10 C60 10, 70 18, 70 25 M15 35 C15 28, 25 20, 35 20 C45 20, 55 28, 55 35" />
        </svg>
      </div>

      {/* Top Section: App Title */}
      <DraggableWrapper id="splash_title" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '20px',
          zIndex: 5
        }}>
          <FanDeco size={54} style={{ marginBottom: '14px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
          
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-accent-gold)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            fontFamily: 'var(--font-oriental)'
          }}>
            AI 명리학 분석
          </span>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            fontFamily: 'var(--font-oriental)',
            letterSpacing: '0.05em'
          }}>
            사주 리포트
          </h1>

          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-accent-gold)',
            margin: '12px 0'
          }} />

          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            fontFamily: 'var(--font-oriental)',
            wordBreak: 'keep-all'
          }}>
            오행의 기운으로 풀어내는<br />
            당신의 오늘과 타고난 성향
          </p>
        </div>
      </DraggableWrapper>

      {/* Middle Section: Main Wood Character with Gold Halo */}
      <DraggableWrapper id="splash_char">
        <div style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5
        }}>
          {/* Background Traditional Circle Border */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px dashed rgba(192, 157, 91, 0.4)',
            animation: 'spinSlow 40s linear infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(192, 157, 91, 0.15)'
          }} />

          {/* Character Image */}
          <img 
            src={fireLarge} 
            alt="메인 화 캐릭터" 
            style={{
              maxHeight: '85%',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.35))',
              transform: 'scale(1.1)'
            }}
          />
        </div>
      </DraggableWrapper>

      {/* Bottom Section: Action Button */}
      <DraggableWrapper id="splash_footer" style={{ width: '100%' }}>
        <div style={{
          width: '100%',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '10px'
        }}>
          <button
            onClick={onStart}
            style={{
              backgroundColor: '#FCF9F5',
              color: 'var(--color-accent-red)',
              border: '2px solid var(--color-accent-gold)',
              padding: '16px 36px',
              borderRadius: '14px',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'var(--font-oriental)',
              cursor: 'pointer',
              width: '100%',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF2EB';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FCF9F5';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            시작하기
          </button>

          <span style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.05em'
          }}>
            본 서비스는 무료 MVP 버전입니다.
          </span>
        </div>
      </DraggableWrapper>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
export default Splash;
