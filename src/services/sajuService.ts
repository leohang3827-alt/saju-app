import { calculateSaju } from 'ssaju';
import type { SajuInput, SajuResultData, ElementDistribution } from '../models/saju';

export function analyzeSaju(name: string, input: SajuInput): SajuResultData {
  const { year, month, day, hour, minute, gender, calendar, knowTime } = input;

  // If time is unknown, we default to 12:00 for the core calculation, 
  // but we will flag in the UI that the hour pillar is unknown.
  const calcHour = knowTime ? hour : 12;
  const calcMinute = knowTime ? minute : 0;

  try {
    const rawResult = calculateSaju({
      year,
      month,
      day,
      hour: calcHour,
      minute: calcMinute,
      gender,
      calendar,
    });

    // Extract values and construct clean response structure matching SajuResultData interface
    const fiveElements = {
      목: rawResult.fiveElements.목 || 0,
      화: rawResult.fiveElements.화 || 0,
      토: rawResult.fiveElements.토 || 0,
      금: rawResult.fiveElements.금 || 0,
      수: rawResult.fiveElements.수 || 0,
    };

    // If time is unknown, we subtract the hour pillar elements from the total count to keep it accurate for 3 pillars!
    // In traditional Saju, if time is unknown, it becomes 3 pillars (6 characters).
    if (!knowTime && rawResult.pillarDetails.hour) {
      const hourStemEl = rawResult.pillarDetails.hour.element.stem as keyof ElementDistribution;
      const hourBranchEl = rawResult.pillarDetails.hour.element.branch as keyof ElementDistribution;
      if (fiveElements[hourStemEl] > 0) fiveElements[hourStemEl]--;
      if (fiveElements[hourBranchEl] > 0) fiveElements[hourBranchEl]--;
    }

    const result: SajuResultData = {
      input,
      name,
      analyzedAt: new Date().toISOString(),
      pillars: {
        year: rawResult.pillars?.year || '',
        month: rawResult.pillars?.month || '',
        day: rawResult.pillars?.day || '',
        hour: knowTime ? (rawResult.pillars?.hour || '') : '모름',
      },
      pillarDetails: {
        year: rawResult.pillarDetails.year as any,
        month: rawResult.pillarDetails.month as any,
        day: rawResult.pillarDetails.day as any,
        hour: rawResult.pillarDetails.hour as any,
      },
      dayStem: rawResult.dayStem || '',
      dayBranch: rawResult.dayBranch || '',
      gongmang: {
        branches: rawResult.gongmang?.branches || [],
        branchesKo: rawResult.gongmang?.branchesKo || [],
      },
      fiveElements,
      currentAge: rawResult.currentAge || 0,
      advanced: {
        dayStrength: {
          strength: rawResult.advanced?.dayStrength?.strength || 'neutral',
          score: rawResult.advanced?.dayStrength?.score || 0,
        },
        geukguk: rawResult.advanced?.geukguk || '일반격',
        yongsin: rawResult.advanced?.yongsin || [],
        sinsal: {
          gilsin: rawResult.advanced?.sinsal?.gilsin || [],
          hyungsin: rawResult.advanced?.sinsal?.hyungsin || [],
        },
        interpretation: rawResult.advanced?.interpretation || '',
      },
    };

    return result;
  } catch (error) {
    console.error('Saju calculation failed:', error);
    throw new Error('사주 분석 중 오류가 발생했습니다. 입력 정보를 확인해 주세요.');
  }
}
