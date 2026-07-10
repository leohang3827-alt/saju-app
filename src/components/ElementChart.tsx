import React, { useEffect, useState } from 'react';
import type { ElementDistribution } from '../models/saju';
import { getElementColor } from '../utils/sajuAnalyzer';

interface ElementChartProps {
  distribution: ElementDistribution;
}

export const ElementChart: React.FC<ElementChartProps> = ({ distribution }) => {
  const [animatedPercent, setAnimatedPercent] = useState<ElementDistribution>({
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  });

  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setAnimatedPercent(distribution);
    }, 100);
    return () => clearTimeout(timer);
  }, [distribution]);

  // Calculate percentages (ensure we handle division by zero)
  const getPercent = (count: number) => {
    return total > 0 ? (count / total) * 100 : 0;
  };

  const elements: { name: '목' | '화' | '토' | '금' | '수'; count: number; color: string }[] = [
    { name: '목', count: animatedPercent.목, color: getElementColor('목') },
    { name: '화', count: animatedPercent.화, color: getElementColor('화') },
    { name: '토', count: animatedPercent.토, color: getElementColor('토') },
    { name: '금', count: animatedPercent.금, color: getElementColor('금') },
    { name: '수', count: animatedPercent.수, color: getElementColor('수') },
  ];

  // Prepare sectors for rendering
  let cumulativePercent = 0;
  const sectors = elements.map(el => {
    const percent = getPercent(el.count);
    const dashArray = `${percent} ${100 - percent}`;
    // SVG stroke-dashoffset starts from 3 o'clock (0 degrees).
    // We want it to start from 12 o'clock (270 degrees), which means we start offsetting from 25 (25% of circumference).
    const dashOffset = 100 - cumulativePercent + 25;
    cumulativePercent += percent;

    return {
      ...el,
      percent,
      dashArray,
      dashOffset,
    };
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 0'
    }}>
      {/* SVG Doughnut Chart */}
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '20px' }}>
        <svg 
          viewBox="0 0 42 42" 
          width="100%" 
          height="100%"
          style={{ transform: 'rotate(-90deg)', borderRadius: '50%' }}
        >
          {/* Background circle */}
          <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F5EDE4" strokeWidth="4.5" />
          
          {/* Animated Element Sectors */}
          {sectors.map((sec, idx) => {
            if (sec.percent === 0) return null;
            return (
              <circle
                key={idx}
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke={sec.color}
                strokeWidth="4.5"
                strokeDasharray={sec.dashArray}
                strokeDashoffset={sec.dashOffset}
                style={{
                  transition: 'stroke-dasharray 1s cubic-bezier(0.16, 1, 0.3, 1), stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            );
          })}
        </svg>

        {/* Center lotus icon overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '74px',
          height: '74px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(166, 30, 34, 0.08)',
          border: '1px solid var(--color-accent-gold)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Traditional Lotus Flower SVG */}
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 2C12 2 9 6.5 9 10C9 13.5 12 18 12 18C12 18 15 13.5 15 10C15 6.5 12 2 12 2Z" 
              fill="#D4B68C" 
              opacity="0.3"
            />
            <path 
              d="M12 5C12 5 10 9 10 12C10 15 12 19 12 19C12 19 14 15 14 12C14 9 12 5 12 5Z" 
              fill="var(--color-accent-red)" 
              opacity="0.8"
            />
            <path 
              d="M12 21C6 17 6 12 8 9C9.5 7.5 12 10 12 10C12 10 14.5 7.5 16 9C18 12 18 17 12 21Z" 
              stroke="var(--color-accent-gold)" 
              strokeWidth="1.2"
            />
            <path 
              d="M3 15C3 15 7.5 14 10 15.5M21 15C21 15 16.5 14 14 15.5" 
              stroke="var(--color-accent-gold)" 
              strokeWidth="1.2" 
              strokeLinecap="round"
            />
            <circle cx="12" cy="13" r="1.5" fill="var(--color-accent-gold)" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default ElementChart;
