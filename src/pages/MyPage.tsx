import React from 'react';
import type { SajuResultData } from '../models/saju';
import woodLarge from '../assets/characters/wood_large.png';
import OrientalFrame from '../widgets/OrientalFrame';
import { FanDeco, LockIcon } from '../widgets/TraditionalDeco';
import { getElementColor, getElementIcon } from '../utils/sajuAnalyzer';

interface MyPageProps {
  result: SajuResultData | null;
  onOpenLockModal: () => void;
}

export const MyPage: React.FC<MyPageProps> = ({ result, onOpenLockModal }) => {
  const dayBranch = result?.pillarDetails.day?.element.stem || '';
  const elementIcon = result ? getElementIcon(dayBranch) : '';
  const elementColor = result ? getElementColor(dayBranch) : '';

  const menuItems = [
    { label: '내 사주 정보 수정', isLocked: true },
    { label: '프리미엄 리포트 구매', isLocked: true },
    { label: '동양 사주 알림 설정', isLocked: true },
    { label: '앱 정보 및 버전', isLocked: false, value: 'v1.0.0 (무료 MVP)' },
  ];

  return (
    <div className="scroll-content">
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '10px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 700,
          margin: 0,
          color: 'var(--color-accent-red)',
          fontFamily: 'var(--font-oriental)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '14px', color: 'var(--color-accent-gold)' }}>▩</span>
          마이페이지
        </h2>
      </div>

      {/* User Profile Card */}
      {result ? (
        <OrientalFrame>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '4px 0'
          }}>
            {/* Representative character */}
            <div style={{
              width: '74px',
              height: '84px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <img src={woodLarge} alt="목 캐릭터" style={{ maxHeight: '100%', objectFit: 'contain' }} />
            </div>

            {/* Profile Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--color-accent-red)',
                fontFamily: 'var(--font-oriental)',
                marginBottom: '4px'
              }}>
                {result.name}님
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'var(--color-text-charcoal)',
                lineHeight: '1.4',
                marginBottom: '6px'
              }}>
                생일: {result.input.year}.{result.input.month}.{result.input.day} ({result.input.calendar === 'solar' ? '양력' : '음력'})
              </p>
              
              {/* Guardian Element Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'white',
                  backgroundColor: elementColor,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  {elementIcon} 수호오행: {dayBranch}
                </span>
              </div>
            </div>
          </div>
        </OrientalFrame>
      ) : (
        <OrientalFrame>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '16px 0'
          }}>
            <FanDeco size={48} style={{ marginBottom: '12px' }} />
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-charcoal)',
              lineHeight: '1.5',
              margin: 0
            }}>
              분석된 사주 정보가 없습니다.<br />
              홈 화면에서 사주 분석을 완료해 주세요!
            </p>
          </div>
        </OrientalFrame>
      )}

      {/* Menu Options Card */}
      <div style={{
        backgroundColor: 'var(--color-cream-card)',
        border: '1px solid #EAE0D5',
        borderRadius: '16px',
        padding: '8px 0',
        boxShadow: '0 4px 12px rgba(42, 36, 33, 0.02)',
        marginBottom: '20px'
      }}>
        {menuItems.map((item, index) => {
          const clickHandler = item.isLocked ? onOpenLockModal : undefined;
          
          return (
            <div
              key={index}
              onClick={clickHandler}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: index === menuItems.length - 1 ? 'none' : '1px solid #F3EAE1',
                cursor: item.isLocked ? 'pointer' : 'default',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (item.isLocked) e.currentTarget.style.backgroundColor = '#FAF6F0';
              }}
              onMouseLeave={(e) => {
                if (item.isLocked) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text-charcoal)',
                fontFamily: 'var(--font-oriental)'
              }}>
                {item.label}
              </span>

              {item.isLocked ? (
                <span style={{
                  color: 'var(--color-text-light)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <LockIcon size={14} />
                </span>
              ) : (
                <span style={{
                  fontSize: '12px',
                  color: 'var(--color-accent-red)',
                  fontWeight: 600
                }}>
                  {item.value}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* App Team Info */}
      <div style={{
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '11px',
        color: 'var(--color-text-light)',
        lineHeight: '1.5'
      }}>
        © 2026 AI 사주 리포트. All rights reserved.<br />
        Designed for Premium Oriental Saju Service.
      </div>
    </div>
  );
};
export default MyPage;
