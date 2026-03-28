import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { reciters, getAudioUrl, type ReciterInfo } from '@/data/quranData';

interface AudioPlayerProps {
  surahNumber: number;
  onSurahChange?: (surahNumber: number) => void;
}

const AudioPlayer = ({ surahNumber, onSurahChange }: AudioPlayerProps) => {
  const [selectedReciter, setSelectedReciter] = useState<ReciterInfo>(reciters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = getAudioUrl(selectedReciter, surahNumber);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const ct = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(ct);
    setDuration(dur);
    setProgress(dur ? (ct / dur) * 100 : 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const goNext = () => {
    if (surahNumber < 114) onSurahChange?.(surahNumber + 1);
  };

  const goPrev = () => {
    if (surahNumber > 1) onSurahChange?.(surahNumber - 1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/30 bg-card/95 backdrop-blur-md shadow-islamic">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => { setIsPlaying(false); goNext(); }}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Progress bar */}
      <div className="h-1 w-full cursor-pointer bg-muted" onClick={handleSeek}>
        <div
          className="h-full gradient-islamic transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-3 py-2">
        {/* Reciter selector */}
        <div className="mb-2 flex gap-1">
          {reciters.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReciter(r)}
              className={`flex-1 rounded-md px-2 py-1 text-xs font-arabic transition-all ${
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground min-w-[40px]">{formatTime(currentTime)}</span>

          <div className="flex items-center gap-4">
            <button onClick={goPrev} className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-islamic transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button onClick={goNext} className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
          </div>

          <span className="text-xs text-muted-foreground min-w-[40px] text-left">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
