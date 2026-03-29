import { useState, useRef, useCallback, useEffect } from 'react';
import { reciters, getAyahAudioUrl, type ReciterInfo } from '@/data/quranData';
import type { Ayah } from '@/hooks/useQuranApi';

interface UseAudioPlayerOptions {
  ayahs: Ayah[];
  onAyahChange?: (ayah: Ayah) => void;
}

export function useAudioPlayer({ ayahs, onAyahChange }: UseAudioPlayerOptions) {
  const [selectedReciter, setSelectedReciter] = useState<ReciterInfo>(reciters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    
    const onEnded = () => {
      // Play next ayah
      setCurrentAyahIndex(prev => {
        const next = prev + 1;
        if (next < ayahs.length) {
          playAyahAtIndex(next);
          return next;
        }
        setIsPlaying(false);
        return -1;
      });
    };

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [ayahs]);

  const playAyahAtIndex = useCallback((index: number) => {
    if (!audioRef.current || index < 0 || index >= ayahs.length) return;
    const ayah = ayahs[index];
    const url = getAyahAudioUrl(selectedReciter, ayah.surahNumber, ayah.numberInSurah);
    audioRef.current.src = url;
    audioRef.current.play().catch(console.error);
    setIsPlaying(true);
    setCurrentAyahIndex(index);
    onAyahChange?.(ayah);
  }, [ayahs, selectedReciter, onAyahChange]);

  const playAyah = useCallback((ayah: Ayah) => {
    const index = ayahs.findIndex(a => 
      a.surahNumber === ayah.surahNumber && a.numberInSurah === ayah.numberInSurah
    );
    if (index >= 0) playAyahAtIndex(index);
  }, [ayahs, playAyahAtIndex]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentAyahIndex < 0 && ayahs.length > 0) {
        playAyahAtIndex(0);
      } else {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  }, [isPlaying, currentAyahIndex, ayahs, playAyahAtIndex]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAyahIndex(-1);
  }, []);

  const nextAyah = useCallback(() => {
    const next = currentAyahIndex + 1;
    if (next < ayahs.length) playAyahAtIndex(next);
  }, [currentAyahIndex, ayahs, playAyahAtIndex]);

  const prevAyah = useCallback(() => {
    const prev = currentAyahIndex - 1;
    if (prev >= 0) playAyahAtIndex(prev);
  }, [currentAyahIndex, playAyahAtIndex]);

  const changeReciter = useCallback((reciter: ReciterInfo) => {
    setSelectedReciter(reciter);
    if (isPlaying && currentAyahIndex >= 0 && audioRef.current) {
      const ayah = ayahs[currentAyahIndex];
      const url = getAyahAudioUrl(reciter, ayah.surahNumber, ayah.numberInSurah);
      audioRef.current.src = url;
      audioRef.current.play().catch(console.error);
    }
  }, [isPlaying, currentAyahIndex, ayahs]);

  const currentAyah = currentAyahIndex >= 0 ? ayahs[currentAyahIndex] : null;

  return {
    selectedReciter,
    changeReciter,
    isPlaying,
    currentAyah,
    currentAyahIndex,
    progress,
    togglePlay,
    stop,
    playAyah,
    nextAyah,
    prevAyah,
  };
}
