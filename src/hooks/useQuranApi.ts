import { useQuery } from '@tanstack/react-query';

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  hizbQuarter: number;
}

export interface SurahResponse {
  number: number;
  name: string;
  englishName: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

async function fetchSurah(surahNumber: number): Promise<SurahResponse> {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
  if (!res.ok) throw new Error('Failed to fetch surah');
  const data = await res.json();
  return data.data;
}

export function useSurah(surahNumber: number) {
  return useQuery({
    queryKey: ['surah', surahNumber],
    queryFn: () => fetchSurah(surahNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
}

async function fetchJuz(juzNumber: number): Promise<{ ayahs: Ayah[] }> {
  const res = await fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`);
  if (!res.ok) throw new Error('Failed to fetch juz');
  const data = await res.json();
  return data.data;
}

export function useJuz(juzNumber: number) {
  return useQuery({
    queryKey: ['juz', juzNumber],
    queryFn: () => fetchJuz(juzNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
}
