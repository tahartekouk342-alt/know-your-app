import { Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import { reciters, toArabicNumber, type ReciterInfo } from '@/data/quranData';
import { surahs } from '@/data/quranData';
import type { Ayah } from '@/hooks/useQuranApi';

interface AudioPlayerBarProps {
  selectedReciter: ReciterInfo;
  onReciterChange: (reciter: ReciterInfo) => void;
  isPlaying: boolean;
  currentAyah: Ayah | null;
  progress: number;
  onTogglePlay: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const AudioPlayerBar = ({
  selectedReciter,
  onReciterChange,
  isPlaying,
  currentAyah,
  progress,
  onTogglePlay,
  onStop,
  onNext,
  onPrev,
}: AudioPlayerBarProps) => {
  const surahName = currentAyah 
    ? surahs.find(s => s.number === currentAyah.surahNumber)?.name || '' 
    : '';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/30 bg-card/95 backdrop-blur-md shadow-islamic">
      {/* Progress bar */}
      <div className="h-1 w-full bg-muted">
        <div className="h-full gradient-islamic transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      <div className="px-3 py-2">
        {/* Current ayah info */}
        {currentAyah && (
          <div className="text-center mb-1">
            <span className="text-xs text-muted-foreground font-arabic">
              {surahName} - الآية {toArabicNumber(currentAyah.numberInSurah)}
            </span>
          </div>
        )}

        {/* Reciter selector */}
        <div className="mb-2 flex gap-1 overflow-x-auto">
          {reciters.map((r) => (
            <button
              key={r.id}
              onClick={() => onReciterChange(r)}
              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-arabic transition-all ${
                selectedReciter.id === r.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={onPrev} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="h-5 w-5" />
          </button>
          <button onClick={onStop} className="text-muted-foreground hover:text-foreground transition-colors">
            <Square className="h-4 w-4" />
          </button>
          <button
            onClick={onTogglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-islamic transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <button onClick={onNext} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
