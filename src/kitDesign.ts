export type KitPattern = 'vertical' | 'hoops' | 'sash' | 'quarters' | 'pinstripe' | 'solid' | 'diagonal' | 'split' | 'chevrons' | 'central' | 'wave' | 'diamonds' | 'bars';

export type ClubKitDesign = {
  primary: string;
  secondary: string;
  pattern: KitPattern;
  symbol: string;
  detail: string;
};

const originalThemes: Record<string, Partial<ClubKitDesign>> = {
  'sl benfica': { primary: '#c51d30', secondary: '#f2cf84', pattern: 'pinstripe', symbol: '🦅', detail: '✿' },
  benfica: { primary: '#c51d30', secondary: '#f2cf84', pattern: 'pinstripe', symbol: '🦅', detail: '✿' },
  'sporting cp': { primary: '#13774c', secondary: '#ece7d8', pattern: 'hoops', symbol: '♌' },
  'fc porto': { primary: '#0754a2', secondary: '#f3eee3', pattern: 'vertical', symbol: '🐉' },
  'real madrid': { primary: '#eeeae2', secondary: '#b8a56b', pattern: 'pinstripe', symbol: '♛' },
  'fc barcelona': { primary: '#761c42', secondary: '#2d4c86', pattern: 'vertical', symbol: '✦' },
  'atlético de madrid': { primary: '#be1e37', secondary: '#f1eee4', pattern: 'vertical', symbol: '🐻', detail: '🌳' },
  'atletico madrid': { primary: '#be1e37', secondary: '#f1eee4', pattern: 'vertical', symbol: '🐻', detail: '🌳' },
  'manchester united': { primary: '#bd1527', secondary: '#e8c76f', pattern: 'quarters', symbol: '🔱' },
  arsenal: { primary: '#c41f35', secondary: '#f1eee4', pattern: 'split', symbol: '✦' },
  liverpool: { primary: '#b71e2d', secondary: '#e6c482', pattern: 'pinstripe', symbol: '🐦' },
  'manchester city': { primary: '#68b5d8', secondary: '#f2ede2', pattern: 'pinstripe', symbol: '✦' },
  'paris saint-germain': { primary: '#153d78', secondary: '#dc3548', pattern: 'central', symbol: '✦' },
  'bayern münchen': { primary: '#c51f32', secondary: '#f1eee4', pattern: 'hoops', symbol: '✦' },
  'borussia dortmund': { primary: '#e9cb18', secondary: '#222321', pattern: 'diagonal', symbol: '✦' },
  'juventus': { primary: '#ece9e0', secondary: '#202321', pattern: 'vertical', symbol: '✦' },
  'inter': { primary: '#1263a6', secondary: '#212321', pattern: 'vertical', symbol: '✦' },
  'ac milan': { primary: '#b91f31', secondary: '#242422', pattern: 'vertical', symbol: '✦' },
  'ajax': { primary: '#d52834', secondary: '#f1eee4', pattern: 'sash', symbol: '✦' },
  'tottenham hotspur': { primary: '#edf0ee', secondary: '#123b72', pattern: 'wave', symbol: '✦' },
  'newcastle united': { primary: '#232524', secondary: '#f1eee4', pattern: 'vertical', symbol: '✦' },
};

function keyOf(club: string) {
  return club.trim().toLocaleLowerCase('pt-PT').replace(/\s+/g, ' ');
}

function complement(primary: string): string {
  const value = Number.parseInt(primary.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 160 ? '#242522' : '#eee9de';
}

const patterns: KitPattern[] = ['vertical', 'hoops', 'sash', 'quarters', 'pinstripe', 'solid', 'diagonal', 'split', 'chevrons', 'central', 'wave', 'diamonds', 'bars'];

export function clubKitDesign(club: string, color = '#c7bd9e'): ClubKitDesign {
  const key = keyOf(club);
  const theme = originalThemes[key];
  let hash = 0;
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const primary = theme?.primary ?? color;
  return {
    primary,
    secondary: theme?.secondary ?? complement(primary),
    pattern: theme?.pattern ?? patterns[Math.abs(hash) % patterns.length],
    symbol: theme?.symbol ?? '✦',
    detail: theme?.detail ?? '',
  };
}

export function originalClubMark(club: string): { symbol: string; detail: string } {
  const { symbol, detail } = clubKitDesign(club);
  return { symbol, detail };
}
