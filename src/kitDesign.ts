import clubColors from './data/club-colors.json';

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
  'atletico de madrid': { primary: '#be1e37', secondary: '#f1eee4', pattern: 'vertical', symbol: '🐻', detail: '🌳' },
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
  'chelsea': { primary: '#034694', secondary: '#f1eee4', pattern: 'central', symbol: '🦁', detail: 'LONDON' },
  'aston villa': { primary: '#7a263a', secondary: '#8fd8f7', pattern: 'quarters', symbol: '🦁', detail: 'VILLA' },
  'everton': { primary: '#003399', secondary: '#f1eee4', pattern: 'diagonal', symbol: '🗼', detail: '1878' },
  'west ham united': { primary: '#7a263a', secondary: '#8fd8f7', pattern: 'quarters', symbol: '⚒', detail: 'HAMMERS' },
  'leicester city': { primary: '#003090', secondary: '#f1eee4', pattern: 'central', symbol: '🦊', detail: 'FOXES' },
  'crystal palace': { primary: '#1b458f', secondary: '#c4122e', pattern: 'sash', symbol: '🦅', detail: 'EAGLES' },
  'wolverhampton wanderers': { primary: '#fdb913', secondary: '#242522', pattern: 'chevrons', symbol: '🐺', detail: 'WOLVES' },
  'nottingham forest': { primary: '#dd0000', secondary: '#f1eee4', pattern: 'vertical', symbol: '🌳', detail: 'FOREST' },
  'fulham': { primary: '#f1eee4', secondary: '#242522', pattern: 'quarters', symbol: '⚫', detail: 'LONDON' },
  'sl benfica b': { primary: '#c51d30', secondary: '#f2cf84', pattern: 'pinstripe', symbol: '🦅', detail: 'SEIXAL' },
  'as roma': { primary: '#8e1f2f', secondary: '#e5bd55', pattern: 'quarters', symbol: '🐺', detail: 'ROMA' },
  'ss lazio': { primary: '#8fd8f7', secondary: '#f1eee4', pattern: 'diagonal', symbol: '🦅', detail: 'AQUILA' },
  'ssc napoli': { primary: '#00a6df', secondary: '#f1eee4', pattern: 'central', symbol: '🐴', detail: 'NAPOLI' },
  'bayer 04 leverkusen': { primary: '#e32219', secondary: '#242522', pattern: 'diagonal', symbol: '🦁', detail: '1904' },
  'rb leipzig': { primary: '#e32219', secondary: '#f1eee4', pattern: 'split', symbol: '🐂', detail: 'LEIPZIG' },
  'vfl wolfsburg': { primary: '#65b32e', secondary: '#f1eee4', pattern: 'hoops', symbol: '🐺', detail: 'WOLFSBURG' },
  'borussia mönchengladbach': { primary: '#111111', secondary: '#f1eee4', pattern: 'central', symbol: '🐎', detail: 'BORUSSIA' },
  'paris fc': { primary: '#003f87', secondary: '#e2231a', pattern: 'sash', symbol: '⚓', detail: 'PARIS' },
  'olympique de marseille': { primary: '#19a5dc', secondary: '#f1eee4', pattern: 'wave', symbol: '⭐', detail: 'DROIT AU BUT' },
  'olympique lyonnais': { primary: '#d71920', secondary: '#1d428a', pattern: 'quarters', symbol: '🦁', detail: 'LYON' },
  'celtic': { primary: '#008a4b', secondary: '#f1eee4', pattern: 'hoops', symbol: '☘', detail: 'CELTIC' },
  'rangers': { primary: '#0c3c8c', secondary: '#f1eee4', pattern: 'quarters', symbol: '🦁', detail: 'RANGERS' },
  'feyenoord': { primary: '#e2231a', secondary: '#f1eee4', pattern: 'split', symbol: '⚓', detail: 'ROTTERDAM' },
  'psv': { primary: '#ed1c24', secondary: '#f1eee4', pattern: 'hoops', symbol: '💡', detail: 'EINDHOVEN' },
  'galatasaray': { primary: '#a90432', secondary: '#f9a602', pattern: 'split', symbol: '🦁', detail: '1905' },
  'fenerbahçe': { primary: '#002d72', secondary: '#f5d20a', pattern: 'vertical', symbol: '🐤', detail: '1907' },
  'beşiktaş': { primary: '#171717', secondary: '#f1eee4', pattern: 'quarters', symbol: '🦅', detail: '1903' },
  'boca juniors': { primary: '#003f87', secondary: '#f4c900', pattern: 'hoops', symbol: '⭐', detail: 'LA MITAD' },
  'river plate': { primary: '#f1eee4', secondary: '#e2231a', pattern: 'sash', symbol: '🛶', detail: 'CARP' },
  'flamengo': { primary: '#c8102e', secondary: '#171717', pattern: 'hoops', symbol: '🦅', detail: 'MENGÃO' },
  'corinthians': { primary: '#f1eee4', secondary: '#171717', pattern: 'vertical', symbol: '⚓', detail: '1910' },
  'palmeiras': { primary: '#006437', secondary: '#f1eee4', pattern: 'hoops', symbol: '🌴', detail: '1914' },
  'santos': { primary: '#f1eee4', secondary: '#171717', pattern: 'vertical', symbol: '🐋', detail: 'PEIXE' },
  'al nassr': { primary: '#f4c900', secondary: '#164734', pattern: 'diagonal', symbol: '🐎', detail: 'RIYADH' },
  'al hilal': { primary: '#0057b8', secondary: '#f1eee4', pattern: 'central', symbol: '🌙', detail: 'RIYADH' },
};

function keyOf(club: string) {
  return club.trim().toLocaleLowerCase('pt-PT').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ');
}

const normalizedThemes = Object.fromEntries(Object.entries(originalThemes).map(([name, theme]) => [keyOf(name), theme]));

function complement(primary: string): string {
  const value = Number.parseInt(primary.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 160 ? '#242522' : '#eee9de';
}

const patterns: KitPattern[] = ['vertical', 'hoops', 'sash', 'quarters', 'pinstripe', 'solid', 'diagonal', 'split', 'chevrons', 'central', 'wave', 'diamonds', 'bars'];
const motifs = ['🦅','🦁','🐺','🐉','🐻','🐂','🦊','🐎','🦈','🦌','🦉','🐍','⚓','🌿','🗼','☀'];
const trimMarks = ['✦','◆','✚','✧','◈','✺','⬟','●','✣','▰','⌁','✥','◉','✢','▲','◌'];
const clubColorMap = Object.fromEntries(Object.entries(clubColors).map(([name, value]) => [keyOf(name), value]));

export function clubKitDesign(club: string, color = '#c7bd9e'): ClubKitDesign {
  const key = keyOf(club);
  const theme = normalizedThemes[key];
  let hash = 0;
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const primary = theme?.primary ?? clubColorMap[key] ?? color;
  const motifIndex = Math.abs(hash) % motifs.length;
  return {
    primary,
    secondary: theme?.secondary ?? complement(primary),
    pattern: theme?.pattern ?? patterns[Math.abs(hash) % patterns.length],
    symbol: theme?.symbol ?? motifs[motifIndex],
    detail: theme?.detail ?? trimMarks[(motifIndex * 7 + Math.abs(hash >> 5)) % trimMarks.length],
  };
}

export function originalClubMark(club: string): { symbol: string; detail: string } {
  const { symbol, detail } = clubKitDesign(club);
  return { symbol, detail };
}
