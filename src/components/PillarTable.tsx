import React from 'react';
import type { PillarDetails } from '../models/saju';
import { getElementBgColor, getElementColor } from '../utils/sajuAnalyzer';

interface PillarTableProps {
  pillarDetails: PillarDetails;
  knowTime: boolean;
}

export const PillarTable: React.FC<PillarTableProps> = ({ pillarDetails, knowTime }) => {
  const pillarsList = [
    { key: 'hour', name: '시주', detail: pillarDetails.hour, isKnown: knowTime },
    { key: 'day', name: '일주 (나)', detail: pillarDetails.day, isKnown: true },
    { key: 'month', name: '월주', detail: pillarDetails.month, isKnown: true },
    { key: 'year', name: '년주', detail: pillarDetails.year, isKnown: true },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: '#FAF5EF',
      border: '1px solid var(--color-accent-gold)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 6px rgba(42, 36, 33, 0.03)'
    }}>
      {/* Header Row */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-accent-gold)',
        backgroundColor: '#F5EDE4'
      }}>
        {pillarsList.map((p) => (
          <div 
            key={p.key} 
            style={{
              flex: 1,
              padding: '10px 0',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'var(--font-oriental)',
              color: p.key === 'day' ? 'var(--color-accent-red)' : 'var(--color-text-charcoal)',
              borderRight: p.key === 'year' ? 'none' : '1px solid var(--color-accent-gold)'
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* Heavenly Stems (천간) Row */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-accent-gold)'
      }}>
        {pillarsList.map((p) => {
          const stem = p.isKnown ? p.detail?.stem : '?';
          const stemKo = p.isKnown ? p.detail?.stemKo : '모름';
          const element = p.isKnown ? p.detail?.element.stem : '';
          const color = p.isKnown ? getElementColor(element) : 'var(--color-text-light)';
          const bgColor = p.isKnown ? getElementBgColor(element) : '#F5EDE4';

          return (
            <div 
              key={p.key} 
              style={{
                flex: 1,
                padding: '16px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor,
                borderRight: p.key === 'year' ? 'none' : '1px solid var(--color-accent-gold)',
                outline: p.key === 'day' ? '2px solid var(--color-accent-red)' : 'none',
                outlineOffset: '-2px',
                zIndex: p.key === 'day' ? 2 : 1
              }}
            >
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 900, 
                color: color,
                fontFamily: 'var(--font-oriental)',
                lineHeight: '1.2'
              }}>
                {stem}
              </span>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 500, 
                color: 'var(--color-text-charcoal)',
                marginTop: '4px'
              }}>
                {stemKo}
              </span>
              {p.isKnown && (
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 600, 
                  color: color,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  marginTop: '3px'
                }}>
                  {element}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Earthly Branches (지지) Row */}
      <div style={{ display: 'flex' }}>
        {pillarsList.map((p) => {
          const branch = p.isKnown ? p.detail?.branch : '?';
          const branchKo = p.isKnown ? p.detail?.branchKo : '모름';
          const element = p.isKnown ? p.detail?.element.branch : '';
          const color = p.isKnown ? getElementColor(element) : 'var(--color-text-light)';
          const bgColor = p.isKnown ? getElementBgColor(element) : '#F5EDE4';

          return (
            <div 
              key={p.key} 
              style={{
                flex: 1,
                padding: '16px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor,
                borderRight: p.key === 'year' ? 'none' : '1px solid var(--color-accent-gold)',
                outline: p.key === 'day' ? '2px solid var(--color-accent-red)' : 'none',
                outlineOffset: '-2px',
                zIndex: p.key === 'day' ? 2 : 1
              }}
            >
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 900, 
                color: color,
                fontFamily: 'var(--font-oriental)',
                lineHeight: '1.2'
              }}>
                {branch}
              </span>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 500, 
                color: 'var(--color-text-charcoal)',
                marginTop: '4px'
              }}>
                {branchKo}
              </span>
              {p.isKnown && (
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 600, 
                  color: color,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  marginTop: '3px'
                }}>
                  {element}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PillarTable;
