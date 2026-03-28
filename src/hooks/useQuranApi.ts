import { useQuery } from '@tanstack/react-query';

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

export interface SurahResponse {
  number: number;
  ayahs: Ayah[];
}

let warshCache: Record<string, string[]> | null = null;

async function loadWarshData(): Promise<Record<string, string[]>> {
  if (warshCache) return warshCache;
  const res = await fetch('/warsh-quran.json');
  if (!res.ok) throw new Error('Failed to load Warsh Quran data');
  warshCache = await res.json();
  return warshCache!;
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

async function fetchJuz(juzNumber: number): Promise<{ ayahs: Ayah[] }> {
  // For juz view, we use the alquran.cloud API for structure info, but text from local Warsh data
  const metaRes = await fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`);
  if (!metaRes.ok) throw new Error('Failed to fetch juz metadata');
  const metaData = await metaRes.json();
  const warshData = await loadWarshData();

  const ayahs: Ayah[] = metaData.data.ayahs.map((ayah: any) => {
    const surahNum = ayah.surah.number;
    const ayahNum = ayah.numberInSurah;
    const surahAyahs = warshData[String(surahNum)];
    const warshText = surahAyahs && surahAyahs[ayahNum - 1] ? surahAyahs[ayahNum - 1] : ayah.text;

    return {
      number: ayah.number,
      text: warshText,
      numberInSurah: ayahNum,
    };
  });

  return { ayahs };
}

export function useJuz(juzNumber: number) {
  return useQuery({
    queryKey: ['juz-warsh', juzNumber],
    queryFn: () => fetchJuz(juzNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
}
