export interface ElementDistribution {
  목: number;
  화: number;
  토: number;
  금: number;
  수: number;
}

export interface YinYang {
  stem: '음' | '양';
  branch: '음' | '양';
}

export interface ElementPair {
  stem: string;
  branch: string;
}

export interface HiddenStems {
  여기: string | null;
  중기: string | null;
  정기: string | null;
}

export interface PillarDetail {
  stem: string;
  branch: string;
  stemKo: string;
  branchKo: string;
  stemIdx: number;
  branchIdx: number;
  element: ElementPair;
  yinYang: YinYang;
  hiddenStems: HiddenStems;
}

export interface PillarDetails {
  year: PillarDetail;
  month: PillarDetail;
  day: PillarDetail;
  hour: PillarDetail;
}

export interface DayStrength {
  strength: 'strong' | 'weak' | 'neutral' | string;
  score: number;
}

export interface SinSal {
  gilsin: string[];
  hyungsin: string[];
}

export interface AdvancedAnalysis {
  dayStrength: DayStrength;
  geukguk: string;
  yongsin: string[];
  sinsal: SinSal;
  interpretation: string;
}

export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: '남' | '여';
  calendar: 'solar' | 'lunar';
  knowTime: boolean;
}

export interface SajuResultData {
  input: SajuInput;
  name: string;
  analyzedAt: string;
  pillars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  pillarDetails: PillarDetails;
  dayStem: string;
  dayBranch: string;
  gongmang: {
    branches: string[];
    branchesKo: string[];
  };
  fiveElements: ElementDistribution;
  currentAge: number;
  advanced: AdvancedAnalysis;
}

export interface HistoryItem {
  id: string;
  name: string;
  gender: '남' | '여';
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM or '모름'
  calendar: 'solar' | 'lunar';
  analyzedAt: string;
  result: SajuResultData;
}
