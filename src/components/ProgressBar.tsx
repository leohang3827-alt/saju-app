import React, { useEffect, useState } from 'react';
import type { ElementDistribution } from '../models/saju';
import { getElementColor, getElementIcon } from '../utils/sajuAnalyzer';

interface ProgressBarProps {
  distribution: ElementDistribution;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ distribution }) => {
  const [animatedPercent, setAnimatedPercent] = useState<ElementDistribution>({
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  });

  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(distribution);
    }, 100);
    return () => clearTimeout(timer);
  }, [distribution]);

  const getPercent = (count: number) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const elements: ('목' | '화' | '토' | '금' | '수')[] = ['목', '화', '토', '금', '수'];

  const getElementFullName = (el: string) => {
    switch (el) {
      case '목': return '목(木)';
      case '화': return '화(火)';
      case '토': return '토(土)';
      case '금': return '금(金)';
      case '수': return '수(水)';
      default: return el;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', padding: '4px 0' }}>
      {elements.map((el) => {
        const count = distribution[el];
        const animCount = animatedPercent[el];
        const percent = getPercent(count);
        const animPercent = getPercent(animCount);
        const color = getElementColor(el);
        const icon = getElementIcon(el);

        return (
          <div key={el} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Element Icon and Label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '74px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-text-charcoal)',
              gap: '6px'
            }}>
              <span style={{ fontSize: '15px' }}>{icon}</span>
              <span>{getElementFullName(el)}</span>
            </div>

            {/* Track and Bar */}
            <div style={{
              flex: 1,
              height: '8px',
              backgroundColor: '#F3EAE1',
              borderRadius: '4px',
              overflow: 'hidden',
              margin: '0 12px',
              position: 'relative'
            }}>
              <div style={{
                width: `${animPercent}%`,
                height: '100%',
                backgroundColor: color,
                borderRadius: '4px',
                transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>

            {/* Value Display */}
            <div style={{
              width: '60px',
              textAlign: 'right',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-charcoal)'
            }}>
              <span style={{ fontSize: '13px' }}>{percent}%</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', marginLeft: '4px' }}>
                ({count}개)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProgressBar;
