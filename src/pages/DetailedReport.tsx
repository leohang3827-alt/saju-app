import React from 'react';
import woodLarge from '../assets/characters/wood_large.png';
import type { SajuResultData } from '../models/saju';
import OrientalFrame from '../widgets/OrientalFrame';
import { FanDeco } from '../widgets/TraditionalDeco';
import { generateDetailedFortunes } from '../utils/sajuAnalyzer';
import DraggableWrapper from '../widgets/DraggableWrapper';

interface DetailedReportProps {
  result: SajuResultData;
  onBack: () => void;
}

export const DetailedReport: React.FC<DetailedReportProps> = ({ result, onBack }) => {
  const { name, fiveElements, pillarDetails, input } = result;
  
  // Calculate detailed fortunes
  const dayStemElement = pillarDetails.day?.element.stem || '';
  const fortunes = generateDetailedFortunes(dayStemElement, input.gender, fiveElements);

  return (
    <div className="scroll-content">
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '10px'
      }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: 'var(--color-accent-red)',
            cursor: 'pointer',
            padding: '4px 8px 4px 0',
            fontWeight: 'bold'
          }}
        >
          &lt;
        </button>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 700,
          margin: 0,
          color: 'var(--color-accent-red)',
          fontFamily: 'var(--font-oriental)'
        }}>
          종합 상세 사주 리포트 (프리미엄)
        </h2>
      </div>

      {/* Profile Header Card */}
      <DraggableWrapper id="detailed_header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '22px',
          gap: '12px'
        }}>
          <div style={{
            width: '74px',
            height: '86px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <img 
              src={woodLarge} 
              alt="목 캐릭터" 
              style={{ 
                maxHeight: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0px 4px 8px rgba(114, 155, 82, 0.15))' 
              }} 
            />
          </div>

          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-accent-gold)',
            borderRadius: '16px',
            padding: '12px 14px',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(42, 36, 33, 0.04)'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '-8px',
              transform: 'translateY(-50%) rotate(45deg)',
              width: '14px',
              height: '14px',
              backgroundColor: '#FFFFFF',
              borderLeft: '1px solid var(--color-accent-gold)',
              borderBottom: '1px solid var(--color-accent-gold)'
            }} />
            
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--color-accent-red)',
              marginBottom: '4px',
              fontFamily: 'var(--font-oriental)'
            }}>
              {name}님의 핵심 평생운
            </h3>
            <p style={{
              fontSize: '11px',
              color: 'var(--color-text-charcoal)',
              lineHeight: '1.4',
              margin: 0,
              wordBreak: 'keep-all'
            }}>
              명리학적 에너지 분석을 바탕으로 재물, 애정, 건강에 대해 상세한 풀이를 마련했습니다.
            </p>
          </div>
        </div>
      </DraggableWrapper>

      {/* Fortune Card 1: 금전운 (Wealth Luck) */}
      <DraggableWrapper id="detailed_card1">
        <OrientalFrame title="금전운 (財物運)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '24px' }}>🪙</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-accent-red)', fontFamily: 'var(--font-oriental)' }}>
                재물과 자산의 흐름
              </h4>
            </div>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: 'var(--color-text-charcoal)',
              margin: 0,
              textAlign: 'justify',
              wordBreak: 'keep-all',
              textIndent: '10px'
            }}>
              {fortunes.wealth}
            </p>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* Fortune Card 2: 연애운 (Love Luck) */}
      <DraggableWrapper id="detailed_card2">
        <OrientalFrame title="연애/배우자운 (配偶者運)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '24px' }}>💖</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-accent-red)', fontFamily: 'var(--font-oriental)' }}>
                이성 인연 및 배우자 관계
              </h4>
            </div>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: 'var(--color-text-charcoal)',
              margin: 0,
              textAlign: 'justify',
              wordBreak: 'keep-all',
              textIndent: '10px'
            }}>
              {fortunes.love}
            </p>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* Fortune Card 3: 건강운 (Health Luck) */}
      <DraggableWrapper id="detailed_card3">
        <OrientalFrame title="건강운 (健康運)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '24px' }}>🩺</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-accent-red)', fontFamily: 'var(--font-oriental)' }}>
                체질적 강약과 예방
              </h4>
            </div>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: 'var(--color-text-charcoal)',
              margin: 0,
              textAlign: 'justify',
              wordBreak: 'keep-all',
              textIndent: '10px'
            }}>
              {fortunes.health}
            </p>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* Back to Report Button */}
      <DraggableWrapper id="detailed_button" style={{ width: '100%' }}>
        <button 
          className="btn-primary" 
          onClick={onBack}
          style={{
            marginTop: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%'
          }}
        >
          <FanDeco size={28} />
          기본 분석 리포트로 돌아가기
        </button>
      </DraggableWrapper>
    </div>
  );
};
export default DetailedReport;
