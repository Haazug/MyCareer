import type { Gender, Player } from './model';

export type CatalogClub = { name: string; league: string; color: string; gender: Gender; country?: string };
export type CatalogPlayer = Omit<Player, 'id'> & {
  sourceId?: string;
  shortName?: string;
  club: string;
  league: string;
  gender?: Gender;
  potential?: number;
  value: number;
  positions: string[];
  preferredFoot?: string;
  weakFoot?: number;
  skillMoves?: number;
  heightCm?: number;
  weightKg?: number;
  attributes?: Record<string, number>;
};
export type CatalogManager = { name: string; club: string; nationality?: string; gender?: Gender };
export type CatalogSource = { title: string; author: string; url: string; license: string; licenseUrl: string };
export type CatalogPackage = {
  schemaVersion: number;
  edition: string;
  clubs: CatalogClub[];
  players: CatalogPlayer[];
  managers: CatalogManager[];
  source?: CatalogSource;
  sources?: CatalogSource[];
};

const positionMap: Record<string, string> = {
  ATA: 'PL', AT: 'PL', EXT: 'ED', EI: 'EE', MCD: 'MDC', MDC: 'MDC', MC: 'MC', MCO: 'MCO', LD: 'DD', LI: 'DE', DFC: 'DC', GK: 'GR', RB: 'DD', CB: 'DC', LB: 'DE', CDM: 'MDC', CM: 'MC', CAM: 'MCO',
  RM: 'MD', LM: 'ME', RW: 'ED', LW: 'EE', ST: 'PL', RWB: 'DD', LWB: 'DE',
  CF: 'PL', RF: 'ED', LF: 'EE', GR: 'GR', DD: 'DD', DC: 'DC', DE: 'DE',
  MD: 'MD', ME: 'ME', ED: 'ED', EE: 'EE', PL: 'PL',
};
const femaleLeagueTerms = ['women', 'woman', 'frau', 'feminin', 'liga f', 'arkema', 'nwsl', 'a-league women'];

function text(value: unknown, fallback = ''): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim();
  return fallback;
}

function normalizePlayerName(value:string):string {
  const name=value.trim();
  const latin=name.match(/^[\p{Script=Latin}\p{M}\s.'’\-]+/u)?.[0].trim()??'';
  if(!latin||latin.length===name.length)return name;
  const alternate=name.slice(name.indexOf(latin)+latin.length).trim();
  if(!alternate||!/\p{L}/u.test(alternate))return name;
  return `${latin} (${alternate})`;
}

function number(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number(String(value ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}
function pick(row: Record<string, unknown>, names: string[]): unknown {
  for (const name of names) {
    const found = row[name] ?? row[name.toLowerCase()] ?? row[name.toUpperCase()];
    if (found !== undefined && found !== null && String(found).trim() !== '') return found;
  }
  return undefined;
}
function normalizePosition(value: unknown): string[] {
  const list = Array.isArray(value) ? value : text(value).split(/[,;/|\s]+/);
  const normalized = list.map((item) => positionMap[text(item).trim().toUpperCase()]).filter(Boolean);
  return normalized.length ? [...new Set(normalized)] : ['MC'];
}
function normalizeGender(league: string, value: unknown): Gender {
  const raw = text(value).toLowerCase();
  if (raw === 'female' || raw === 'women' || raw === "women's football" || raw === 'feminino') return 'female';
  if (raw === 'male' || raw === 'men' || raw === "men's football" || raw === 'masculino') return 'male';
  return femaleLeagueTerms.some((term) => league.toLowerCase().includes(term)) ? 'female' : 'male';
}
function defaultColor(name: string): string {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  const palette = ['#b84b42', '#347aa6', '#28795b', '#94633b', '#77569b', '#b85c83', '#627b42', '#a17e2e', '#427c7d', '#8b4d62', '#4f67a1', '#a65637'];
  return palette[Math.abs(hash) % palette.length];
}
function parseCsv(content: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [], value = '', quoted = false;
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (quoted && char === '"' && content[i + 1] === '"') { value += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { row.push(value); value = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && content[i + 1] === '\n') i++;
      row.push(value); rows.push(row); row = []; value = '';
    } else value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const headers = (rows.shift() ?? []).map((header) => header.replace(/^\uFEFF/, '').trim());
  return rows.filter((cells) => cells.some((cell) => cell.trim())).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
}
function normalizeCatalog(input: Record<string, unknown>, filename: string): CatalogPackage {
  const editionValue = text(input.edition ?? input.game ?? input.fifa_version, filename.match(/fc\s?2[67]/i)?.[0]?.replace(/\s/g, ' ').toUpperCase() ?? 'FC 27');
  const edition = /27/.test(editionValue) ? 'FC 27' : 'FC 26';
  const playerContainer = input.players && typeof input.players === 'object' && !Array.isArray(input.players) ? input.players as Record<string, unknown> : undefined;
  const props = input.props && typeof input.props === 'object' ? input.props as Record<string, unknown> : undefined;
  const propsPlayers = props?.players && typeof props.players === 'object' ? props.players as Record<string, unknown> : undefined;
  const rows = Array.isArray(input.players) ? input.players : Array.isArray(playerContainer?.data) ? playerContainer.data : Array.isArray(propsPlayers?.data) ? propsPlayers.data : Array.isArray(input.data) ? input.data : [];
  const players: CatalogPlayer[] = rows.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    const nested = (value: unknown): Record<string, unknown> => value && typeof value === 'object' ? value as Record<string, unknown> : {};
    const stats = nested(row.stats); const contractData = nested(row.contract); const valueData = nested(contractData.value);
    const clubData = nested(row.club); const leagueData = nested(clubData.league);
    const name = normalizePlayerName(text(pick(row, ['name', 'long_name', 'longName', 'player', 'full_name', 'fullName', 'known_as', 'jersey_name'])));
    const club = text(typeof row.club === 'string' ? row.club : pick(clubData, ['name', 'full_name', 'short_name']));
    const league = text(typeof row.league === 'string' ? row.league : pick(row, ['league_name', 'leagueName', 'competition'])) || text(pick(leagueData, ['name', 'full_name']));
    const mainPosition = nested(row.main_position);
    const rawPositions = Array.isArray(row.positions) ? row.positions.map((entry) => { if (typeof entry === 'string') return entry; const item = nested(entry); return text(pick(item, ['name', 'clean_name'])); }) : pick(row, ['player_positions', 'position', 'playerPosition']);
    const positions = normalizePosition(rawPositions ?? pick(mainPosition, ['name', 'clean_name']));
    const birthDate = text(pick(row, ['birthdate', 'date_of_birth', 'dob']));
    const snapshotDate = text(pick(row, ['snapshot_date', 'snapshotDate']));
    const derivedAge = (() => { const parseDate = (value: string) => { const parts = value.split('-').map(Number); if (parts.length !== 3 || parts.some(Number.isNaN)) return null; return parts[0] > 31 ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(parts[2], parts[1] - 1, parts[0]); }; const birth = parseDate(birthDate); const snapshot = parseDate(snapshotDate) ?? new Date(); if (!birth || Number.isNaN(birth.getTime())) return 18; let years = snapshot.getFullYear() - birth.getFullYear(); if (snapshot.getMonth() < birth.getMonth() || snapshot.getMonth() === birth.getMonth() && snapshot.getDate() < birth.getDate()) years--; return years; })();
    const age = Math.max(14, Math.min(99, number(pick(row, ['age']), derivedAge)));
    const rawContract = text(typeof row.contract === 'string' ? row.contract : pick(contractData, ['end_date']));
    const contractYear = number(pick(row, ['contract_year', 'club_contract_valid_until_year']) ?? pick(contractData, ['end_date']), 2027);
    const contract = /^\d{4}-\d\d-\d\d$/.test(rawContract) ? rawContract : `${Math.max(2025, Math.min(2100, contractYear))}-06-30`;
    return {
      sourceId: text(pick(row, ['player_id', 'sourceId', 'id'])), name,
      shortName: text(pick(row, ['short_name', 'shortName'])), club, league,
      gender: normalizeGender(league, pick(row, ['gender', 'team_gender'])), positions,
      position: positions[0], overall: Math.max(1, Math.min(99, number(pick(row, ['overall', 'overall_rating', 'ovr', 'rating']) ?? stats.overall, 60))),
      ...(pick(row, ['potential', 'pot']) !== undefined || stats.potential !== undefined ? { potential: Math.max(1, Math.min(99, number(pick(row, ['potential', 'pot']) ?? stats.potential, 60))) } : {}),
      age, nation: text(pick(row, ['nation', 'nationality_name', 'nationality', 'country'])),
      number: Math.max(0, Math.min(99, number(pick(row, ['number', 'club_jersey_number', 'shirt_number'])))),
      salary: Math.max(0, number(pick(row, ['salary', 'wage_eur', 'wage']) ?? pick(contractData, ['wage_eur']))),
      contract, value: Math.max(0, number(pick(row, ['value', 'value_eur', 'market_value']) ?? pick(contractData, ['value_eur']) ?? valueData.eur)),
      preferredFoot: text(pick(row, ['preferredFoot', 'preferred_foot'])),
      weakFoot: number(pick(row, ['weakFoot', 'weak_foot'])), skillMoves: number(pick(row, ['skillMoves', 'skill_moves'])),
      heightCm: number(pick(row, ['heightCm', 'height_cm'])), weightKg: number(pick(row, ['weightKg', 'weight_kg'])),
      attributes: (row.attributes && typeof row.attributes === 'object' ? Object.fromEntries(Object.entries(row.attributes as Record<string, unknown>).filter(([, value]) => typeof value === 'number')) : undefined) as Record<string, number> | undefined,
    };
  }).filter((player) => player.name);
  const clubsContainer = input.clubs && typeof input.clubs === 'object' && !Array.isArray(input.clubs) ? input.clubs as Record<string, unknown> : undefined;
  const suppliedClubs = Array.isArray(input.clubs) ? input.clubs : Array.isArray(clubsContainer?.data) ? clubsContainer.data : Array.isArray(input.teams) ? input.teams : Array.isArray(props?.clubs) ? props.clubs : [];
  const clubMap = new Map<string, CatalogClub>();
  for (const entry of suppliedClubs) {
    const item = (entry ?? {}) as Record<string, unknown>;
    const name = text(pick(item, ['name', 'club', 'club_name', 'team']));
    if (!name) continue;
    const league = text(pick(item, ['league', 'league_name', 'competition']));
    const suppliedColor = text(pick(item, ['color', 'primaryColor', 'primary_color']));
    clubMap.set(name, { name, league, color: /^#[\da-f]{6}$/i.test(suppliedColor) ? suppliedColor : defaultColor(name), gender: normalizeGender(league, pick(item, ['gender'])) });
  }
  for (const player of players) if (player.club && !clubMap.has(player.club)) clubMap.set(player.club, { name: player.club, league: player.league, color: defaultColor(player.club), gender: player.gender ?? 'male' });
  const managerContainer = input.managers && typeof input.managers === 'object' && !Array.isArray(input.managers) ? input.managers as Record<string, unknown> : undefined;
  const propsManagers = props?.managers && typeof props.managers === 'object' ? props.managers as Record<string, unknown> : undefined;
  const managerRows = Array.isArray(input.managers) ? input.managers : Array.isArray(managerContainer?.data) ? managerContainer.data : Array.isArray(props?.managers) ? props.managers : Array.isArray(propsManagers?.data) ? propsManagers.data : []; 
  const managers = managerRows.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    return { name: text(pick(row, ['name', 'manager', 'manager_name', 'full_name'])), club: text(pick(row, ['club', 'club_name', 'clubName', 'team'])), nationality: text(pick(row, ['nationality', 'nation', 'country'])), gender: normalizeGender('', pick(row, ['gender', 'team_gender', 'teamGender'])) };
  }).filter((manager) => manager.name);
  const sourceInput = input.source && typeof input.source === 'object' ? input.source as Record<string, unknown> : undefined;
  const source = sourceInput ? {
    title: text(sourceInput.title, 'FC Tools Hub'), author: text(sourceInput.author, 'FC Tools Hub'),
    url: text(sourceInput.url, 'https://fctoolshub.com/pt/database/fc27/players'),
    license: text(sourceInput.license, 'Crédito da fonte; licença adicional não indicada'),
    licenseUrl: text(sourceInput.licenseUrl, 'https://fctoolshub.com/pt/database/fc27/players'),
  } : undefined;
  return { schemaVersion: 1, edition, clubs: [...clubMap.values()].sort((a, b) => a.name.localeCompare(b.name)), players, managers, source, sources: source ? [source] : [] };
}

export function mergeCatalogs(existing: CatalogPackage | undefined, incoming: CatalogPackage): CatalogPackage {
  if (!existing) return incoming;
  const clubMap = new Map(existing.clubs.map((club) => [club.name, club]));
  for (const club of incoming.clubs) clubMap.set(club.name, club);
  const playerMap = new Map(existing.players.map((player) => [`${player.sourceId || player.name}|${player.club}|${player.league}`, player]));
  for (const player of incoming.players) playerMap.set(`${player.sourceId || player.name}|${player.club}|${player.league}`, player);
  const managerMap = new Map(existing.managers.map((manager) => [`${manager.name}|${manager.club}`, manager]));
  for (const manager of incoming.managers) managerMap.set(`${manager.name}|${manager.club}`, manager);
  const sources = [...(existing.sources ?? (existing.source ? [existing.source] : [])), ...(incoming.sources ?? (incoming.source ? [incoming.source] : []))];
  const uniqueSources = [...new Map(sources.map((source) => [`${source.title}|${source.author}|${source.url}`, source])).values()];
  return {
    schemaVersion: 1,
    edition: incoming.edition,
    clubs: [...clubMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
    players: [...playerMap.values()].sort((a, b) => a.club.localeCompare(b.club) || b.overall - a.overall),
    managers: [...managerMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
    source: incoming.source ?? existing.source,
    sources: uniqueSources,
  };
}

async function loadBundledCatalog(path: string, label: string): Promise<CatalogPackage> {
  const response = await fetch(path);
  if (!response.ok || !response.body) throw new Error(`Não foi possível carregar o catálogo ${label} incluído.`);
  const data = await response.json() as Record<string, unknown>;
  return normalizeCatalog(data, label);
}
const legacyManagerSource: CatalogSource = {
  title: 'FC 26 Managers directory (reused for FC 27)', author: 'FIFPlay',
  url: 'https://www.fifplay.com/fc-26-managers/',
  license: 'Atribuição; licença Creative Commons não declarada. Base anterior reutilizada para este rascunho pessoal.',
  licenseUrl: 'https://www.fifplay.com/fc-26-managers/',
};
async function loadCatalogWithManagerFallback(path: string, edition: string): Promise<CatalogPackage> {
  const [catalog, response] = await Promise.all([
    loadBundledCatalog(path, edition), fetch('/data/fc26-managers.json'),
  ]);
  if (!response.ok) throw new Error('Não foi possível carregar a lista de treinadores reutilizada do FC 26.');
  const data = await response.json() as { managers?: unknown[] };
  const legacy = normalizeCatalog({ edition: 'FC 26', managers: data.managers ?? [] }, 'FC 26 managers');
  return { ...catalog, managers: legacy.managers, sources: [...(catalog.sources ?? (catalog.source ? [catalog.source] : [])), legacyManagerSource] };
}
export const loadFc26Catalog = () => loadCatalogWithManagerFallback('/data/fc26-catalog.json', 'FC 26');
export const loadFc27Catalog = () => loadCatalogWithManagerFallback('/data/fc27-catalog.json', 'FC 27');

export async function importCatalogFile(file: File, credit: CatalogSource): Promise<CatalogPackage> {
  const content = await file.text();
  let data: Record<string, unknown>;
  if (file.name.toLowerCase().endsWith('.csv')) data = { players: parseCsv(content), edition: file.name };
  else {
    const parsed = JSON.parse(content) as unknown;
    if (Array.isArray(parsed)) data = { players: parsed, edition: file.name };
    else if (parsed && typeof parsed === 'object') data = parsed as Record<string, unknown>;
    else throw new Error('O ficheiro tem de conter um JSON ou CSV de jogadores.');
  }
  const catalog = normalizeCatalog(data, file.name);
  return { ...catalog, source: credit, sources: [credit] };
}

export function careerPlayersFromCatalog(catalog: CatalogPackage | null, clubName: string): Player[] {
  if (!catalog) return [];
  const order: Record<string, number> = { GR: 0, DD: 1, DC: 2, DE: 3, MDC: 4, MC: 5, MCO: 6, MD: 7, ME: 8, ED: 9, EE: 10, PL: 11 };
  const players = catalog.players.filter((player) => player.club === clubName)
    .sort((a, b) => (order[a.position] - order[b.position]) || b.overall - a.overall || a.name.localeCompare(b.name))
    .slice(0, 36);
  return players.map((player, index) => ({
    id: crypto.randomUUID(), name: player.name, number: player.number || (index % 99) + 1, position: player.position,
    overall: player.overall, age: player.age, nation: player.nation || '—', salary: player.salary,
    contract: player.contract, potential: player.potential, marketValue: player.value,
    ...(player.attributes ? { attributes: player.attributes } : {}), catalogManaged:true, ...(player.sourceId ? { portraitUrl: `/faces/${player.sourceId}.png` } : {}),
  }));
}

export function playersForCatalogClub(catalog: CatalogPackage | null, clubName: string): CatalogPlayer[] {
  return catalog?.players.filter((player) => player.club === clubName) ?? [];
}

export function teamColor(catalog: CatalogPackage | null, clubName: string): string | undefined {
  return catalog?.clubs.find((club) => club.name === clubName)?.color;
}
