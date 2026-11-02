import type { AssetCredit } from './model';

export type CommonsPortrait = {
  title: string;
  thumbUrl: string;
  credit: AssetCredit;
};

type CommonsPage = {
  title?: string;
  imageinfo?: Array<{
    thumburl?: string;
    url?: string;
    descriptionurl?: string;
    extmetadata?: Record<string, { value?: string }>;
  }>;
};

function plain(value = '') {
  const node = document.createElement('div');
  node.innerHTML = value;
  return (node.textContent || '').replace(/\s+/g, ' ').trim();
}

function linkedUrl(value = '') {
  const node = document.createElement('div');
  node.innerHTML = value;
  const href = node.querySelector('a')?.getAttribute('href');
  if (!href) return '';
  try { return new URL(href, 'https://commons.wikimedia.org').toString(); } catch { return ''; }
}

function reusableLicense(value = '') {
  const license = value.toLowerCase();
  return license.includes('cc0') || /cc\s*by(?:-sa)?\s*(?:1\.0|2\.0|2\.5|3\.0|4\.0)/i.test(value) || license.includes('public domain');
}

export async function searchCommonsPortraits(name: string, nation = ''): Promise<CommonsPortrait[]> {
  const cleanName = name.trim().replace(/["']/g, '');
  if (cleanName.length < 3) return [];
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrnamespace: '6', gsrwhat: 'text', gsrsearch: `"${cleanName}" football ${nation}`.trim(),
    gsrlimit: '20', prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '360',
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) throw new Error('O Wikimedia Commons não respondeu à pesquisa.');
  const data = await response.json() as { query?: { pages?: Record<string, CommonsPage> } };
  const exact = cleanName.toLocaleLowerCase().split(/\s+/).filter(part => part.length > 2);
  return Object.values(data.query?.pages ?? []).flatMap(page => {
    const info = page.imageinfo?.[0];
    const meta = info?.extmetadata;
    const license = plain(meta?.LicenseShortName?.value);
    const artist = plain(meta?.Artist?.value || meta?.Credit?.value || 'Autor não indicado');
    const title = plain(page.title || '');
    const searchable = `${title} ${plain(meta?.ImageDescription?.value)} ${artist}`.toLocaleLowerCase();
    const isRelevant = exact.filter(part => searchable.includes(part)).length >= Math.min(2, exact.length);
    if (!info?.thumburl || !info.descriptionurl || !info.url || !license || !reusableLicense(license) || !isRelevant) return [];
    const licenseUrl = linkedUrl(meta?.LicenseUrl?.value) || (license.toLowerCase().includes('cc0') ? 'https://creativecommons.org/publicdomain/zero/1.0/' : license.toLowerCase().includes('public domain') ? 'https://commons.wikimedia.org/wiki/Commons:Licensing#Public_domain' : 'https://creativecommons.org/licenses/');
    return [{
      title,
      thumbUrl: info.thumburl,
      credit: { author: artist, sourceUrl: info.descriptionurl, fileUrl: info.url, license, licenseUrl },
    }];
  }).slice(0, 6);
}
