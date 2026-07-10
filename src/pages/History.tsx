import React, { useState, useEffect } from 'react';
import type { HistoryItem } from '../models/saju';
import { getHistory, deleteFromHistory } from '../repository/historyRepository';
import OrientalFrame from '../widgets/OrientalFrame';

interface HistoryProps {
  onSelectHistory: (item: HistoryItem) => void;
  onGoToInput: () => void;
}

export const History: React.FC<HistoryProps> = ({ onSelectHistory, onGoToInput }) => {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistoryList(getHistory());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent selecting the item
    deleteFromHistory(id);
    setHistoryList(getHistory());
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

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
          <span style={{ fontSize: '14px', color: 'var(--color-accent-gold)' }}>▤</span>
          사주 분석 기록
        </h2>
      </div>

      {historyList.length === 0 ? (
        <OrientalFrame>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '24px 0'
          }}>
            <span style={{ fontSize: '32px', marginBottom: '12px' }}>📭</span>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-text-charcoal)',
              lineHeight: '1.6',
              marginBottom: '20px',
              wordBreak: 'keep-all'
            }}>
              저장된 사주 분석 기록이 없습니다.<br />
              첫 사주를 분석해 보세요!
            </p>
            <button 
              className="btn-primary" 
              onClick={onGoToInput}
              style={{ padding: '10px 24px', fontSize: '14px', width: 'auto' }}
            >
              사주 분석하러 가기
            </button>
          </div>
        </OrientalFrame>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{
            fontSize: '12px',
            color: 'var(--color-text-light)',
            marginBottom: '4px'
          }}>
            총 {historyList.length}개의 분석 기록이 저장되어 있습니다. 기록을 선택하면 다시 분석 결과를 볼 수 있습니다.
          </p>

          {historyList.map((item) => {
            const timeText = item.result.input.knowTime 
              ? `${item.result.input.hour.toString().padStart(2, '0')}:${item.result.input.minute.toString().padStart(2, '0')}`
              : '시간모름';
            const calendarKo = item.calendar === 'solar' ? '양력' : '음력';
            
            return (
              <div
                key={item.id}
                onClick={() => onSelectHistory(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-cream-card)',
                  border: '1px solid #EAE0D5',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(42, 36, 33, 0.02)',
                  position: 'relative',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE0D5'; }}
              >
                {/* Left side: User Profile and Info */}
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--color-accent-red)',
                      fontFamily: 'var(--font-oriental)'
                    }}>
                      {item.name}님
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--color-accent-gold)',
                      border: '1px solid var(--color-accent-gold)',
                      borderRadius: '4px',
                      padding: '0px 4px',
                      lineHeight: '1.4'
                    }}>
                      {item.gender}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--color-text-charcoal)',
                    lineHeight: '1.4',
                    marginBottom: '4px'
                  }}>
                    {item.birthDate} ({calendarKo}) {timeText}생
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--color-text-light)'
                  }}>
                    분석일: {formatDate(item.analyzedAt)}
                  </div>
                </div>

                {/* Right side: Delete button */}
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#C86B6D',
                    cursor: 'pointer',
                    padding: '8px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-red-light)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  title="기록 삭제"
                >
                  {/* Delete Trash Can Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default History;
