import type { ElementDistribution, PillarDetails } from '../models/saju';

export interface ElementAnalysis {
  element: '목' | '화' | '토' | '금' | '수';
  count: number;
  status: '부족' | '약함' | '적절' | '강함' | '가장강함';
  description: string;
}

export function analyzeElements(dist: ElementDistribution): ElementAnalysis[] {
  const elements: ('목' | '화' | '토' | '금' | '수')[] = ['목', '화', '토', '금', '수'];
  
  // Find max and min values
  const counts = Object.values(dist);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  return elements.map(el => {
    const count = dist[el];
    let status: '부족' | '약함' | '적절' | '강함' | '가장강함' = '적절';
    let description = '';

    if (count === 0) {
      status = '부족';
      description = `${el}의 기운이 부족합니다. 일상에서 해당 색상이나 방향, 숫자 등을 활용해 보완해주시면 좋습니다.`;
    } else if (count === 1) {
      status = '약함';
      description = `${el}의 기운이 약하므로 적극적인 에너지를 보완할 필요가 있습니다.`;
    } else if (count === 2) {
      status = '적절';
      description = `${el}의 기운은 적절하고 평균적인 균형을 이루고 있습니다.`;
    } else if (count === 3) {
      status = '강함';
      description = `${el}의 기운이 강한 편으로, 행동이나 기질에서 해당 에너지가 돋보입니다.`;
    } else {
      status = '가장강함';
      description = `${el}의 기운이 매우 강합니다. 기운의 흐름이 한쪽으로 쏠리지 않도록 적절한 절제가 도움이 됩니다.`;
    }

    // Override status if it's the absolute maximum or minimum to make it dynamic
    if (count === maxCount && count >= 3) {
      status = '가장강함';
      description = `${el}의 기운이 가장 강합니다. 당신의 성향과 삶의 방식에서 핵심적인 원동력이 됩니다.`;
    } else if (count === minCount && count <= 1) {
      if (count === 0) {
        status = '부족';
        description = `${el}의 기운이 부족하여 기운의 불균형이 생길 수 있으니 보완이 시급합니다.`;
      } else {
        status = '약함';
        description = `${el}의 기운이 상대적으로 약하므로 보완이 권장됩니다.`;
      }
    }

    return {
      element: el,
      count,
      status,
      description,
    };
  });
}

export function generateSummarySentence(dist: ElementDistribution): string {
  const elements: { name: '목' | '화' | '토' | '금' | '수'; count: number }[] = [
    { name: '목', count: dist.목 },
    { name: '화', count: dist.화 },
    { name: '토', count: dist.토 },
    { name: '금', count: dist.금 },
    { name: '수', count: dist.수 },
  ];

  // Sort by count descending
  elements.sort((a, b) => b.count - a.count);

  const strongest = elements[0];
  const weakest = elements[elements.length - 1];

  let sentence = '';
  if (strongest.count === weakest.count) {
    sentence = '다섯 가지 오행의 기운이 매우 고르게 분포하여 최상의 음양오행 균형을 이루고 있습니다.';
  } else {
    sentence = `${strongest.name}의 기운이 가장 강하고, ${weakest.name}의 기운이 상대적으로 약합니다.`;
  }
  
  return sentence;
}

export function calculateYinYangBalance(pillarDetails: PillarDetails): {
  yinCount: number;
  yangCount: number;
  summary: string;
} {
  let yinCount = 0;
  let yangCount = 0;

  const pillars: ('year' | 'month' | 'day' | 'hour')[] = ['year', 'month', 'day', 'hour'];
  pillars.forEach(p => {
    const detail = pillarDetails[p];
    if (detail) {
      if (detail.yinYang.stem === '음') yinCount++; else yangCount++;
      if (detail.yinYang.branch === '음') yinCount++; else yangCount++;
    }
  });

  let summary = '음양 조화';
  if (yangCount >= 6) {
    summary = '양(陽) 기운 강함';
  } else if (yinCount >= 6) {
    summary = '음(陰) 기운 강함';
  } else {
    summary = '음양 조화로움';
  }

  return { yinCount, yangCount, summary };
}

export function getElementColor(el: '목' | '화' | '토' | '금' | '수' | string): string {
  switch (el) {
    case '목': return '#729B52'; // Green
    case '화': return '#D34848'; // Red
    case '토': return '#CBB084'; // Yellow/Brown
    case '금': return '#A8B8C0'; // White/Grey (Use a slightly darker steel grey for readability)
    case '수': return '#5B8EA3'; // Blue
    default: return '#777777';
  }
}

export function getElementBgColor(el: '목' | '화' | '토' | '금' | '수' | string): string {
  switch (el) {
    case '목': return '#EBF2E8';
    case '화': return '#FCEBEB';
    case '토': return '#F7F2E9';
    case '금': return '#F0F4F6';
    case '수': return '#EBF2F5';
    default: return '#F5F5F5';
  }
}

export function getElementIcon(el: '목' | '화' | '토' | '금' | '수' | string): string {
  switch (el) {
    case '목': return '🌱';
    case '화': return '🔥';
    case '토': return '⛰️';
    case '금': return '💎';
    case '수': return '💧';
    default: return '❓';
  }
}

export interface DetailedFortunes {
  wealth: string;
  love: string;
  health: string;
}

export function generateDetailedFortunes(
  dayStemElement: string,
  gender: '남' | '여',
  fiveElements: ElementDistribution
): DetailedFortunes {
  // 1. Wealth Element (재성)
  let wealthElement = '토';
  if (dayStemElement === '목') wealthElement = '토';
  else if (dayStemElement === '화') wealthElement = '금';
  else if (dayStemElement === '토') wealthElement = '수';
  else if (dayStemElement === '금') wealthElement = '화';
  else if (dayStemElement === '수') wealthElement = '목';

  const wealthCount = fiveElements[wealthElement as keyof ElementDistribution] || 0;
  let wealthText = '';
  if (wealthCount === 0) {
    wealthText = `귀하의 사주에서 재물에 해당하는 ${wealthElement}(${getElementIcon(wealthElement)}) 기운이 다소 부족한 편입니다. 이는 돈을 버는 것보다 지키는 것이 중요한 사주임을 뜻합니다. 무리한 투자나 확장보다는 저축과 연금 등 안정 자산 위주로 자산을 관리하는 것이 매우 유리합니다. 평소 지갑이나 인테리어에 ${wealthElement}을 보완하는 색상을 활용하고, 꼼꼼한 가계부 작성을 통해 새는 돈을 막으면 큰 재물 안정감을 얻을 수 있습니다.`;
  } else if (wealthCount === 1) {
    wealthText = `귀하의 사주는 재물을 뜻하는 ${wealthElement}(${getElementIcon(wealthElement)}) 기운이 1개로, 안정적이고 실속 있는 재물운을 가지고 있습니다. 횡재수보다는 성실한 근로와 정기적인 소득을 통해 차곡차곡 재산을 증식해 나가는 것이 적합합니다. 큰 모험을 피하고 확실한 적금이나 안정적인 채권 등에 투자할 때 자산이 견고하게 늘어납니다. 계획적인 소비 습관을 유지한다면 중년 이후에는 매우 풍요롭고 안정된 생활을 누릴 수 있습니다.`;
  } else if (wealthCount === 2) {
    wealthText = `귀하의 사주는 재물의 기운인 ${wealthElement}(${getElementIcon(wealthElement)}) 에너지가 평균적으로 조화롭게 분포되어 있습니다. 노력한 만큼 결실을 거두는 정직하고 건강한 재물 흐름을 보입니다. 돈 관리에 탁월한 감각이 있어 큰 부침 없이 자산을 굴려 나갈 수 있습니다. 무리수만 두지 않는다면 사업이나 재테크 모두에서 순조로운 이익을 보게 되며, 주변에 귀인의 도움을 받아 재테크 기회를 잡을 가능성도 높습니다. 저축과 투자의 황금 비율을 지키세요.`;
  } else {
    wealthText = `귀하의 사주에는 재물을 상징하는 ${wealthElement}(${getElementIcon(wealthElement)}) 기운이 3개 이상으로 매우 강력합니다. 이는 재물을 벌어들이는 추진력과 기회가 남들보다 월등히 많음을 의미합니다. 다만 재물의 힘이 너무 강하면 오히려 재물 관리에 스트레스를 받거나 예상치 못한 지출이 생길 수 있으니, 동업이나 보증은 절대 금물입니다. 전문적인 자산 관리사의 도움을 받거나 분산 투자를 통해 리스크를 분산시킬 때 진정한 부를 이룰 수 있습니다.`;
  }

  // 2. Love/Spouse Element
  let loveElement = '금';
  if (gender === '남') {
    loveElement = wealthElement; // Men use Wealth (재성)
  } else {
    // Women use Officer (관성)
    if (dayStemElement === '목') loveElement = '금';
    else if (dayStemElement === '화') loveElement = '수';
    else if (dayStemElement === '토') loveElement = '목';
    else if (dayStemElement === '금') loveElement = '화';
    else if (dayStemElement === '수') loveElement = '토';
  }

  const loveCount = fiveElements[loveElement as keyof ElementDistribution] || 0;
  let loveText = '';
  if (loveCount === 0) {
    loveText = `사주상 배우자 및 연애를 의미하는 ${loveElement}(${getElementIcon(loveElement)}) 기운이 나타나지 않아 연애의 시작 단계에서 다소 소극적이거나 인연이 천천히 찾아올 수 있습니다. 조급해하기보다 본인의 내면을 가꾸고 취미 활동이나 동호회 등을 통해 자연스럽게 인연을 넓혀가는 것이 좋습니다. 상대방에게 먼저 다가가 따뜻한 표현을 아끼지 않는 적극성을 발휘한다면, 늦게 시작하더라도 훨씬 깊고 흔들림 없는 결실을 맺을 수 있습니다.`;
  } else if (loveCount === 1) {
    loveText = `배우자 및 연애의 기운인 ${loveElement}(${getElementIcon(loveElement)}) 에너지가 1개로 예쁘고 깔끔하게 자리 잡고 있습니다. 일생에 한 명의 소중한 인연을 만나 깊은 신뢰를 바탕으로 진중한 사랑을 키워가는 순애보형 연애에 적합합니다. 연인 간에 서로 배려하고 작은 약속을 소중히 여길 때 애정 전선이 매우 견고해집니다. 화려함보다는 서로의 성격과 내면이 닮은 사람을 만날 때 오랜 기간 편안하고 평화로운 결혼 생활을 영위하게 됩니다.`;
  } else if (loveCount === 2) {
    loveText = `연애와 배우자 운을 관장하는 ${loveElement}(${getElementIcon(loveElement)}) 에너지가 조화롭게 분포되어 이성 관계가 매우 원만하고 매력적입니다. 상대방과 소통하는 능력이 뛰어나며 연애 중 발생하는 갈등을 유연하게 해결할 수 있는 지혜가 있습니다. 서로에게 든든한 동반자가 되어주는 이상적인 결합을 이룰 확률이 높습니다. 연인과 함께 공동의 목표나 취미를 가질 때 애정이 더욱 두터워지며, 결혼 후 서로의 운세를 상승시켜주는 상생의 관계가 됩니다.`;
  } else {
    loveText = `이성을 뜻하는 ${loveElement}(${getElementIcon(loveElement)}) 기운이 사주에 3개 이상으로 넘치고 있어, 이성에게 어필하는 매력과 인기가 대단히 높습니다. 연애 기회가 풍부하지만, 오히려 선택지가 많아 진지한 만남으로 이어지기까지 고민이 많을 수 있습니다. 삼각관계나 일시적인 감정 기복으로 인한 오해를 조심해야 합니다. 애정 관계에서 확실한 선을 긋고 한 사람에게 온전히 집중할 때 불안 요소를 지우고 평안한 연애와 가정을 지켜낼 수 있습니다.`;
  }

  // 3. Health Element (Weakest or lacking element)
  const elements = Object.entries(fiveElements).map(([key, value]) => ({ name: key, count: value }));
  elements.sort((a, b) => a.count - b.count);
  const weakest = elements[0];

  let healthText = '';
  if (weakest.name === '목') {
    healthText = `사주에서 목(木) 기운이 약하여 간, 담낭, 그리고 근육이나 뼈 건강에 유의하셔야 합니다. 스트레스가 간 피로로 직결되기 쉬우므로 충분한 휴식과 해독에 신경 쓰셔야 합니다. 평소 아침 시간에 가벼운 스트레칭이나 등산을 통해 나무의 푸른 기운을 쐬는 것이 좋으며, 녹색 채소나 비타민B군 섭취가 면역력을 높여 줍니다. 무리한 운동보다는 관절에 무리가 가지 않는 걷기 운동이 적극 권장됩니다.`;
  } else if (weakest.name === '화') {
    healthText = `사주에서 화(火) 기운이 상대적으로 약하여 심장, 소장, 혈액 순환 및 저혈압과 같은 심혈관계 건강 관리가 필요합니다. 체온이 낮아지면 면역력이 약해지기 쉬우므로 항상 몸을 따뜻하게 유지하고 반신욕이나 족욕을 생활화하는 것이 좋습니다. 붉은색 계열의 음식(토마토, 비트 등)이 이로우며, 심장에 무리가 가지 않는 유산소 운동을 꾸준히 수행하여 전신의 혈액 순환과 활력을 유지해 주는 것이 핵심입니다.`;
  } else if (weakest.name === '토') {
    healthText = `사주에서 토(土) 기운이 부족하여 위장, 비장 등 소화기 계통의 건강에 주의가 필요합니다. 규칙적인 식습관이 무엇보다 중요하며, 자극적이거나 기름진 음식을 피하고 소화가 잘 되는 익힌 음식을 섭취하는 것이 좋습니다. 평소 따뜻한 황차나 인삼차 등을 자주 마시고, 흙을 밟는 맨발 걷기나 원예 활동을 통해 토의 안정감을 얻으면 위장 건강과 정서적인 균형을 동시에 지킬 수 있습니다.`;
  } else if (weakest.name === '금') {
    healthText = `사주에서 금(金) 기운이 약해 폐, 대장, 호흡기 및 피부 면역력 관리에 힘쓰셔야 합니다. 환절기 감기나 호흡기 질환에 취약할 수 있으니 실내 습도 조절과 도라지, 배 등 호흡기에 좋은 음식을 자주 드시는 것이 좋습니다. 유산소 운동과 깊은 복식 호흡을 통해 폐 기능을 강화하고, 몸속 노폐물이 원활히 배출되도록 충분한 수분을 섭취해 대장 건강을 유지하는 것이 질병 예방의 지름길입니다.`;
  } else {
    healthText = `사주에서 수(水) 기운이 부족하여 신장, 방광, 비뇨기 계통 및 신진대사와 수분 조절에 각별히 유의해야 합니다. 쉽게 피로를 느끼거나 안구 건조증, 만성 탈수 현상이 생길 수 있으니 하루 2리터 이상의 맑은 물을 섭취하는 습관이 중요합니다. 검은콩, 검은깨 등 블랙 푸드가 신장 기능을 보완하는 데 큰 도움을 주며, 격렬한 활동 뒤에는 물소리를 듣거나 명상을 하며 신체를 차분히 이완해야 합니다.`;
  }

  return { wealth: wealthText, love: loveText, health: healthText };
}
