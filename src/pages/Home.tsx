import React, { useState } from 'react';
import woodLarge from '../assets/characters/wood_large.png';
import fireSmall from '../assets/characters/fire_small.png';
import earthSmall from '../assets/characters/earth_small.png';
import metalSmall from '../assets/characters/metal_small.png';
import waterSmall from '../assets/characters/water_small.png';
import woodSmall from '../assets/characters/wood_small.png';
import { BellIcon, LockIcon, FanDeco } from '../widgets/TraditionalDeco';
import OrientalFrame from '../widgets/OrientalFrame';
import DraggableWrapper from '../widgets/DraggableWrapper';
import type { SajuInput } from '../models/saju';

interface HomeProps {
  onSelectReport: (index: number) => void;
  onOpenLockModal: () => void;
  onAnalyze: (name: string, input: SajuInput) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectReport, onOpenLockModal, onAnalyze }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState('12');
  const [birthMinute, setBirthMinute] = useState('0');
  const [calendar, setCalendar] = useState<'solar' | 'lunar'>('solar');
  const [knowTime, setKnowTime] = useState(true);

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const label = i < 12 ? `오전 ${i === 0 ? 12 : i}시` : `오후 ${i === 12 ? 12 : i - 12}시`;
    return { value: i.toString(), label };
  });

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i.toString(),
    label: `${i}분`,
  }));

  const isFormValid = name.trim().length > 0 && birthDate.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;

    const [yearStr, monthStr, dayStr] = birthDate.split('-');
    const inputData: SajuInput = {
      year: parseInt(yearStr, 10),
      month: parseInt(monthStr, 10),
      day: parseInt(dayStr, 10),
      hour: knowTime ? parseInt(birthHour, 10) : 12,
      minute: knowTime ? parseInt(birthMinute, 10) : 0,
      gender,
      calendar,
      knowTime
    };

    onAnalyze(name, inputData);
  };

  const characters = [
    { name: '화(火)', image: fireSmall, color: '#D34848' },
    { name: '토(土)', image: earthSmall, color: '#CBB084' },
    { name: '금(金)', image: metalSmall, color: '#9EB1B9' },
    { name: '수(水)', image: waterSmall, color: '#5B8EA3' },
    { name: '목(木)', image: woodSmall, color: '#729B52' },
  ];

  const reports = [
    { id: 1, title: '1. 사주의 기본 구조 및 오행 분석', desc: '내 사주의 기본 구조와 오행의 분포, 강약, 균형을 확인해보세요.', isFree: true, char: woodSmall },
    { id: 2, title: '2. 기질 및 성향 분석', desc: '타고난 성격과 기질, 강점과 약점을 자세히 분석해드립니다.', isFree: false, char: fireSmall },
    { id: 3, title: '3. 용신(用神)과 희신(喜神) 분석', desc: '나에게 필요한 기운과 보완해야 할 기운을 정확히 짚어드립니다.', isFree: false, char: metalSmall },
    { id: 4, title: '4. 실생활 맞춤 개운법 (행운의 요소)', desc: '운을 끌어당기는 색상, 숫자, 방향, 물건 등 정운의 요소를 알려드려요.', isFree: false, char: earthSmall },
    { id: 5, title: '5. 공간 개운법 (풍수 및 인테리어)', desc: '집안의 기운을 바꾸는 풍수 인테리어와 공간 개운법을 제안해드립니다.', isFree: false, char: waterSmall },
    { id: 6, title: '6. 2026년 하반기 총운', desc: '2026년 하반기 전체 운세 흐름과 주요 이슈를 미리 확인해보세요.', isFree: false, char: woodSmall },
  ];

  return (
    <div className="scroll-content">
      {/* Top Header Section */}
      <DraggableWrapper id="home_header">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          marginBottom: '28px',
          marginTop: '10px'
        }}>
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <h1 style={{
              fontSize: '26px',
              fontWeight: 800,
              lineHeight: '1.4',
              color: 'var(--color-accent-red)',
              marginBottom: '8px',
              fontFamily: 'var(--font-oriental)'
            }}>
              오늘도<br />당신의 하루를<br />응원해요
            </h1>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-light)',
              lineHeight: '1.5'
            }}>
              내 사주를 통해<br />더 나은 내일을 설계해보세요.
            </p>
          </div>

          {/* Main Wood Character */}
          <div style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img 
              src={woodLarge} 
              alt="목 캐릭터" 
              style={{ 
                maxHeight: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0px 8px 16px rgba(166, 30, 34, 0.12))'
              }} 
            />
          </div>

          {/* Notification Bell */}
          <button 
            onClick={onOpenLockModal}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <BellIcon size={24} />
          </button>
        </div>
      </DraggableWrapper>

      {/* Five Elements Characters Row */}
      <DraggableWrapper id="home_elements">
        <OrientalFrame title="오행의 기운" className="character-row-card">
          <div 
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '16px',
              padding: '4px 0 10px 0',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none'
            }}
            className="hide-scrollbar"
          >
            {characters.map((c, i) => (
              <div 
                key={i} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  width: '68px',
                  scrollSnapAlign: 'start'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '64px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <img src={c.image} alt={c.name} style={{ maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: c.color,
                  fontFamily: 'var(--font-oriental)'
                }}>
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </OrientalFrame>
      </DraggableWrapper>

      {/* Reports List Section */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '16px',
          color: 'var(--color-accent-red)',
          fontFamily: 'var(--font-oriental)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '14px', color: 'var(--color-accent-gold)' }}>▩</span>
          나의 사주 리포트
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reports.map((r) => {
            const clickHandler = () => {
              if (!r.isFree) {
                onOpenLockModal();
                return;
              }

              // If it's a free report (item 1), go to report form/result
              onSelectReport(1);
            };

            return (
              <DraggableWrapper key={r.id} id={`home_card_${r.id}`}>
                <div 
                  onClick={clickHandler}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-cream-card)',
                    border: '1px solid #EAE0D5',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(42, 36, 33, 0.03)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE0D5'; }}
                >
                  {/* Character Thumbnail */}
                  <div style={{
                    width: '42px',
                    height: '46px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '14px',
                    flexShrink: 0
                  }}>
                    <img src={r.char} alt="" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                  </div>

                  {/* Report Info */}
                  <div style={{ flex: 1, paddingRight: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--color-text-charcoal)',
                        margin: 0,
                        fontFamily: 'var(--font-oriental)',
                        lineHeight: '1.2'
                      }}>
                        {r.title}
                      </h4>
                      
                      {r.isFree ? (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          color: 'white',
                          backgroundColor: 'var(--color-accent-red)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em'
                        }}>
                          FREE
                        </span>
                      ) : (
                        <span style={{
                          color: 'var(--color-text-light)',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <LockIcon size={12} />
                        </span>
                      )}
                    </div>
                    
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--color-text-light)',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      {r.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator (only for free/active item) */}
                  {r.isFree && (
                    <div style={{
                      color: 'var(--color-accent-red)',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '4px'
                    }}>
                      &gt;
                    </div>
                  )}
                </div>
              </DraggableWrapper>
            );
          })}
        </div>
      </div>

      {/* Saju Analysis Input Form */}
      <div style={{ marginTop: '28px', marginBottom: '28px' }}>
        <DraggableWrapper id="home_input_form">
          <OrientalFrame>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-10px' }}>
                <FanDeco size={50} />
              </div>

              <h3 style={{
                fontSize: '16px',
                textAlign: 'center',
                color: 'var(--color-accent-red)',
                marginBottom: '4px',
                fontFamily: 'var(--font-oriental)'
              }}>
                사주 분석 정보 입력
              </h3>

              {/* Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>이름</label>
                <input 
                  type="text" 
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={10}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-accent-gold)',
                    backgroundColor: '#FCF9F5',
                    fontSize: '14px',
                    outline: 'none',
                    color: 'var(--color-text-charcoal)',
                    fontFamily: 'var(--font-sans)'
                  }}
                  required
                />
              </div>

              {/* Gender Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>성별</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {(['남', '여'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: gender === g ? 'var(--color-accent-red)' : 'var(--color-accent-gold)',
                        backgroundColor: gender === g ? 'var(--color-accent-red-light)' : '#FCF9F5',
                        color: gender === g ? 'var(--color-accent-red)' : 'var(--color-text-charcoal)',
                        fontWeight: gender === g ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-oriental)'
                      }}
                    >
                      {g}자
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Type Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>음양 선택</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {(['solar', 'lunar'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCalendar(c)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: calendar === c ? 'var(--color-accent-red)' : 'rgba(192, 157, 91, 0.5)',
                        backgroundColor: calendar === c ? 'var(--color-accent-red-light)' : '#FCF9F5',
                        color: calendar === c ? 'var(--color-accent-red)' : 'var(--color-text-charcoal)',
                        fontWeight: calendar === c ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-oriental)'
                      }}
                    >
                      {c === 'solar' ? '양력' : '음력'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Birth Date Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>생년월일</label>
                <input 
                  type="date" 
                  value={birthDate}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-accent-gold)',
                    backgroundColor: '#FCF9F5',
                    fontSize: '14px',
                    outline: 'none',
                    color: 'var(--color-text-charcoal)',
                    fontFamily: 'var(--font-sans)',
                    width: '100%'
                  }}
                  required
                />
              </div>

              {/* Birth Time Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>태어난 시간</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={birthHour}
                    disabled={!knowTime}
                    onChange={(e) => setBirthHour(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-accent-gold)',
                      backgroundColor: knowTime ? '#FCF9F5' : '#EADBC8',
                      fontSize: '14px',
                      color: knowTime ? 'var(--color-text-charcoal)' : 'var(--color-text-light)',
                      outline: 'none',
                      cursor: knowTime ? 'pointer' : 'not-allowed',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {hourOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>

                  <select
                    value={birthMinute}
                    disabled={!knowTime}
                    onChange={(e) => setBirthMinute(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-accent-gold)',
                      backgroundColor: knowTime ? '#FCF9F5' : '#EADBC8',
                      fontSize: '14px',
                      color: knowTime ? 'var(--color-text-charcoal)' : 'var(--color-text-light)',
                      outline: 'none',
                      cursor: knowTime ? 'pointer' : 'not-allowed',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {minuteOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Unknown time checkbox */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: 'var(--color-text-charcoal)',
                  marginTop: '6px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  gap: '6px'
                }}>
                  <input 
                    type="checkbox" 
                    checked={!knowTime}
                    onChange={(e) => setKnowTime(!e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--color-accent-red)',
                      cursor: 'pointer'
                    }}
                  />
                  태어난 시간을 모르겠습니다.
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary"
                disabled={!isFormValid}
                style={{ marginTop: '10px' }}
              >
                사주 분석하기
              </button>
            </form>
          </OrientalFrame>
        </DraggableWrapper>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default Home;
