import React, { useState } from 'react';
import type { SajuInput } from '../models/saju';
import OrientalFrame from '../widgets/OrientalFrame';
import { FanDeco } from '../widgets/TraditionalDeco';

interface InputFormProps {
  onAnalyze: (name: string, input: SajuInput) => void;
  onBack: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, onBack }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState('12');
  const [birthMinute, setBirthMinute] = useState('0');
  const [calendar, setCalendar] = useState<'solar' | 'lunar'>('solar');
  const [knowTime, setKnowTime] = useState(true);

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

  const isFormValid = name.trim().length > 0 && birthDate.length > 0;

  // Generate hour options (0 to 23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const label = i < 12 ? `오전 ${i === 0 ? 12 : i}시` : `오후 ${i === 12 ? 12 : i - 12}시`;
    return { value: i.toString(), label };
  });

  // Generate minute options (0 to 59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i.toString(),
    label: `${i}분`,
  }));

  return (
    <div className="scroll-content">
      {/* Back button and page title */}
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

      <OrientalFrame>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Decorative Top */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-10px' }}>
            <FanDeco size={50} />
          </div>

          <h3 style={{
            fontSize: '16px',
            textAlign: 'center',
            color: 'var(--color-accent-red)',
            marginBottom: '10px',
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
    </div>
  );
};
export default InputForm;
