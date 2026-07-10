import React from 'react';
import type { SajuResultData } from '../models/saju';
import woodLarge from '../assets/characters/wood_large.png';
import OrientalFrame from '../widgets/OrientalFrame';
import PillarTable from '../components/PillarTable';
import ElementChart from '../components/ElementChart';
import ProgressBar from '../components/ProgressBar';
import { generateSummarySentence, analyzeElements, calculateYinYangBalance, getElementColor } from '../utils/sajuAnalyzer';
import { FanDeco } from '../widgets/TraditionalDeco';
import DraggableWrapper from '../widgets/DraggableWrapper';

interface ReportResultProps {
  result: SajuResultData;
  onBack: () => void;
  onOpenLockModal: () => void;
}

export const ReportResult: React.FC<ReportResultProps> = ({ result, onBack, onOpenLockModal }) => {
  const { name, fiveElements, pillarDetails, input, advanced } = result;
  
  // Calculate dynamic outputs
  const summarySentence = generateSummarySentence(fiveElements);
  const elementAnalyses = analyzeElements(fiveElements);
  const yinYang = calculateYinYangBalance(pillarDetails);

  // Day Master info
  const dayStemKo = pillarDetails.day?.stemKo || '';
  const dayStemElement = pillarDetails.day?.element.stem || '';
  const dayMasterText = `${pillarDetails.day?.stem || ''}(${dayStemKo}) ${dayStemElement}`;

  // Strength text representation
  let strengthLabel = '중화';
  let strengthSliderPos = '50%';
  if (advanced.dayStrength.strength === 'strong') {
    strengthLabel = '신강 (강함)';
    strengthSliderPos = '80%';
  } else if (advanced.dayStrength.strength === 'weak') {
    strengthLabel = '신약 (약함)';
    strengthSliderPos = '20%';
  }

  // Find strongest and weakest for Card 4
  const sortedElements = Object.entries(fiveElements)
    .map(([key, value]) => ({ name: key, count: value }))
    .sort((a, b) => b.count - a.count);
  
  const strongestEl = sortedElements[0];
  const weakestEl = sortedElements[sortedElements.length - 1];

  // Formatted birth date display
  const birthTimeString = input.knowTime 
    ? `${input.hour.toString().padStart(2, '0')}:${input.minute.toString().padStart(2, '0')}`
    : '모름';
  
  const calendarKo = input.calendar === 'solar' ? '양력' : '음력';
  const subInfoText = `${input.year}년 ${input.month}월 ${input.day}일 (${calendarKo}) ${birthTimeString} 생`;

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
          1. 사주의 기본 구조 및 오행 분석
        </h2>
      </div>

      {/* Main Wood Character with Speech Bubble */}
      <DraggableWrapper id="result_header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '22px',
          gap: '12px'
        }}>
          {/* Wood Character */}
          <div style={{
            width: '86px',
            height: '100px',
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

          {/* Speech Bubble */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-accent-gold)',
            borderRadius: '16px',
            padding: '12px 14px',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(42, 36, 33, 0.04)'
          }}>
            {/* Bubble Arrow */}
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
              {name}님의 사주 분석 결과
            </h3>
            <p style={{
              fontSize: '11px',
              color: 'var(--color-text-charcoal)',
              lineHeight: '1.4',
              margin: 0,
              wordBreak: 'keep-all'
            }}>
              내 사주의 기본 구조와 오행의 분포를 정밀 분석했어요!
            </p>
          </div>
        </div>
      </DraggableWrapper>

      {/* User Info Header Badge */}
      <DraggableWrapper id="result_user_badge">
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(192, 157, 91, 0.4)',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(42, 36, 33, 0.02)'
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-accent-red)',
            fontFamily: 'var(--font-oriental)',
            marginBottom: '2px'
          }}>
            {name}님 ({input.gender === '남' ? '乾命/남성' : '坤命/여성'})
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--color-text-light)'
          }}>
            {subInfoText}
          </div>
        </div>
      </DraggableWrapper>

      {/* CARD 1: 사주의 기본 구조 */}
      <DraggableWrapper id="result_card1">
        <OrientalFrame title="사주의 기본 구조">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <PillarTable pillarDetails={pillarDetails} knowTime={input.knowTime} />
            <p style={{
              fontSize: '11px',
              color: 'var(--color-text-light)',
              textAlign: 'center',
              lineHeight: '1.4',
              marginTop: '4px'
            }}>
              * 일주(日柱)의 천간(일간)은 자기 자신(나)의 본질적 기운을 상징합니다.
            </p>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* CARD 2: 오행 분포 */}
      <DraggableWrapper id="result_card2">
        <OrientalFrame title="오행 분포">
          <ElementChart distribution={fiveElements} />
          <ProgressBar distribution={fiveElements} />
        </OrientalFrame>
      </DraggableWrapper>

      {/* CARD 3: 오행 균형 분석 */}
      <DraggableWrapper id="result_card3">
        <OrientalFrame title="오행 균형 분석">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Main summary text */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FCF9F5',
              borderLeft: '4px solid var(--color-accent-red)',
              padding: '10px 12px',
              borderRadius: '0 8px 8px 0'
            }}>
              <span style={{ fontSize: '13px', lineHeight: '1.5', fontWeight: 600, color: 'var(--color-text-charcoal)', wordBreak: 'keep-all' }}>
                {summarySentence}
              </span>
              <FanDeco size={36} style={{ flexShrink: 0 }} />
            </div>

            {/* Slider bar */}
            <div style={{ padding: '8px 0', marginTop: '4px' }}>
              {/* Slider track */}
              <div style={{
                height: '6px',
                backgroundColor: '#F3EAE1',
                borderRadius: '3px',
                position: 'relative',
                marginBottom: '10px'
              }}>
                {/* Slider cursor */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: strengthSliderPos,
                  transform: 'translate(-50%, -50%)',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--color-accent-red)',
                  border: '2px solid white',
                  borderRadius: '50%',
                  boxShadow: '0 2px 6px rgba(166, 30, 34, 0.4)',
                  transition: 'left 1s ease-in-out'
                }} />
                {/* Pointer indicator */}
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  left: strengthSliderPos,
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '6px solid var(--color-accent-red)',
                  transition: 'left 1s ease-in-out'
                }} />
              </div>
              {/* Slider labels */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--color-text-light)'
              }}>
                <span>약함</span>
                <span style={{ color: 'var(--color-accent-red)', fontWeight: 700 }}>균형 ({strengthLabel})</span>
                <span>강함</span>
              </div>
            </div>

            {/* Individual descriptions list */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              borderTop: '1px dashed var(--color-accent-gold)',
              paddingTop: '14px',
              marginTop: '4px'
            }}>
              {elementAnalyses.map(analysis => {
                const color = getElementColor(analysis.element);
                return (
                  <div key={analysis.element} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    fontSize: '12px',
                    lineHeight: '1.5'
                  }}>
                    <span style={{
                      fontWeight: 700,
                      color: color,
                      minWidth: '50px',
                      marginRight: '8px'
                    }}>
                      {analysis.element}({analysis.count}개):
                    </span>
                    <span style={{
                      color: 'var(--color-text-charcoal)',
                      flex: 1
                    }}>
                      {analysis.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* CARD 4: 한눈에 보는 내 사주 */}
      <DraggableWrapper id="result_card4">
        <OrientalFrame title="한눈에 보는 내 사주">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {/* Box 1: 일간 */}
            <div style={{
              backgroundColor: '#FCF9F5',
              border: '1px solid #EAE0D5',
              borderRadius: '12px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '18px', marginBottom: '4px' }}>☀️</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '2px' }}>일간(나의 기운)</span>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                color: getElementColor(dayStemElement),
                fontFamily: 'var(--font-oriental)'
              }}>
                {dayMasterText}
              </span>
            </div>

            {/* Box 2: 음양 */}
            <div style={{
              backgroundColor: '#FCF9F5',
              border: '1px solid #EAE0D5',
              borderRadius: '12px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '18px', marginBottom: '4px' }}>☯️</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '2px' }}>음양 비율</span>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                color: 'var(--color-text-charcoal)',
                fontFamily: 'var(--font-oriental)'
              }}>
                {yinYang.summary}
              </span>
            </div>

            {/* Box 3: 강약 */}
            <div style={{
              backgroundColor: '#FCF9F5',
              border: '1px solid #EAE0D5',
              borderRadius: '12px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '18px', marginBottom: '4px' }}>⚖️</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '2px' }}>사주 강약</span>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                color: 'var(--color-text-charcoal)',
                fontFamily: 'var(--font-oriental)'
              }}>
                {advanced.dayStrength.strength === 'strong' ? '신강 (신뢰감/주관)' : 
                 advanced.dayStrength.strength === 'weak' ? '신약 (유연성/친화력)' : '중화 (균형감/안정성)'}
              </span>
            </div>

            {/* Box 4: 특징 요약 */}
            <div style={{
              backgroundColor: '#FCF9F5',
              border: '1px solid #EAE0D5',
              borderRadius: '12px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '18px', marginBottom: '4px' }}>⭐</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '2px' }}>주요 오행</span>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 700, 
                color: 'var(--color-accent-red)',
                fontFamily: 'var(--font-oriental)',
                wordBreak: 'keep-all'
              }}>
                {strongestEl.name} 우세 / {weakestEl.name} 보완
              </span>
            </div>
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* Lock Button at Bottom */}
      <DraggableWrapper id="result_button" style={{ width: '100%' }}>
        <button 
          className="btn-primary" 
          onClick={onOpenLockModal}
          style={{
            marginTop: '8px',
            marginBottom: '20px',
            width: '100%'
          }}
        >
          자세한 리포트 보기
        </button>
      </DraggableWrapper>
    </div>
  );
};
export default ReportResult;
