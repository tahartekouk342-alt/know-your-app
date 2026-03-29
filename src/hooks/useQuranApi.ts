import { useQuery } from '@tanstack/react-query';

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surahNumber: number;
}

export interface PageData {
  pageNumber: number;
  ayahs: Ayah[];
}

export interface SurahResponse {
  number: number;
  ayahs: Ayah[];
}

// Cache for Warsh text
let warshCache: Record<string, string[]> | null = null;

async function loadWarshData(): Promise<Record<string, string[]>> {
  if (warshCache) return warshCache;
  const res = await fetch('/warsh-quran.json');
  if (!res.ok) throw new Error('Failed to load Warsh Quran data');
  warshCache = await res.json();
  return warshCache!;
}

// Cache for page mapping
interface PageAyahRef { s: number; a: number; }
let pagesCache: Record<string, PageAyahRef[]> | null = null;

async function loadPagesData(): Promise<Record<string, PageAyahRef[]>> {
  if (pagesCache) return pagesCache;
  const res = await fetch('/quran-pages.json');
  if (!res.ok) throw new Error('Failed to load page data');
  pagesCache = await res.json();
  return pagesCache!;
}

async function fetchPage(pageNumber: number): Promise<PageData> {
  const [warshData, pagesData] = await Promise.all([loadWarshData(), loadPagesData()]);
  const pageRefs = pagesData[String(pageNumber)];
  if (!pageRefs) throw new Error(`Page ${pageNumber} not found`);

  const ayahs: Ayah[] = pageRefs.map((ref, i) => {
    const surahAyahs = warshData[String(ref.s)];
    const text = surahAyahs?.[ref.a - 1] || '';
    return {
      number: ref.s * 1000 + ref.a,
      text,
      numberInSurah: ref.a,
      surahNumber: ref.s,
    };
  });

  return { pageNumber, ayahs };
}

export function usePage(pageNumber: number) {
  return useQuery({
    queryKey: ['page-warsh', pageNumber],
    queryFn: () => fetchPage(pageNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
}

async function fetchSurah(surahNumber: number): Promise<SurahResponse> {
  const data = await loadWarshData();
  const ayahTexts = data[String(surahNumber)];
  if (!ayahTexts) throw new Error(`Surah ${surahNumber} not found`);

  return {
    number: surahNumber,
    ayahs: ayahTexts.map((text, i) => ({
      number: surahNumber * 1000 + i + 1,
      text,
      numberInSurah: i + 1,
      surahNumber,
    })),
  };
}

export function useSurah(surahNumber: number) {
  return useQuery({
    queryKey: ['surah-warsh', surahNumber],
    queryFn: () => fetchSurah(surahNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
}

// Get the first page of a surah
export async function getSurahStartPage(surahNumber: number): Promise<number> {
  const pagesData = await loadPagesData();
  for (let p = 1; p <= 604; p++) {
    const refs = pagesData[String(p)];
    if (refs?.some(r => r.s === surahNumber && r.a === 1)) {
      return p;
    }
  }
  return 1;
}

export function useSurahStartPage(surahNumber: number) {
  return useQuery({
    queryKey: ['surah-start-page', surahNumber],
    queryFn: () => getSurahStartPage(surahNumber),
    staleTime: Infinity,
  });
}

// Get page for a juz
export async function getJuzStartPage(juzNumber: number): Promise<number> {
  const juzPageMap: Record<number, number> = {
    1:1, 2:22, 3:42, 4:62, 5:82, 6:102, 7:121, 8:142, 9:162, 10:182,
    11:201, 12:222, 13:242, 14:262, 15:282, 16:302, 17:322, 18:342,
    19:362, 20:382, 21:402, 22:422, 23:442, 24:462, 25:482, 26:502,
    27:522, 28:542, 29:562, 30:582,
  };
  return juzPageMap[juzNumber] || 1;
}
