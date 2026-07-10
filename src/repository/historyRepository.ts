import type { HistoryItem, SajuResultData } from '../models/saju';

const STORAGE_KEY = 'ai_saju_report_history_v1';

export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function saveToHistory(
  name: string,
  gender: '남' | '여',
  birthDate: string,
  birthTime: string,
  calendar: 'solar' | 'lunar',
  result: SajuResultData
): HistoryItem {
  const history = getHistory();
  
  const newItem: HistoryItem = {
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    gender,
    birthDate,
    birthTime,
    calendar,
    analyzedAt: new Date().toISOString(),
    result,
  };

  // Add to start of list so it's sorted by newest
  history.unshift(newItem);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }

  return newItem;
}

export function deleteFromHistory(id: string): void {
  const history = getHistory();
  const updated = history.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete history item:', error);
  }
}

export function getLatestHistoryItem(): HistoryItem | null {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
}
