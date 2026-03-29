import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BookOpen, Menu, X } from 'lucide-react';
import { surahs, toArabicNumber } from '@/data/quranData';
import { usePage, type Ayah } from '@/hooks/useQuranApi';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import MushafPageComponent from '@/components/MushafPage';
import AudioPlayerBar from '@/components/AudioPlayerBar';

const MushafPageView = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(pageNumber || searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showMenu, setShowMenu] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { data: page } = usePage(currentPage);

  const audioPlayer = useAudioPlayer({
    ayahs: page?.ayahs || [],
    onAyahChange: (ayah) => {
      // Auto scroll to ayah could be added here
    },
  });

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    // Update URL without navigation
    window.history.replaceState(null, '', `/mushaf/${currentPage}`);
  }, [currentPage]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= 604) {
      setCurrentPage(page);
      audioPlayer.stop();
    }
  }, [audioPlayer]);

  // Swipe handling (RTL: swipe left = next page, swipe right = prev page)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        // Swiped left → next page (RTL: forward)
        goToPage(currentPage + 1);
      } else {
        // Swiped right → prev page (RTL: back)
        goToPage(currentPage - 1);
      }
    }
  };

  const handleAyahTap = (ayah: Ayah) => {
    audioPlayer.playAyah(ayah);
  };

  const handleAyahLongPress = (ayah: Ayah) => {
    // Navigate to tajweed analysis
    navigate(`/tajweed?surah=${ayah.surahNumber}&ayah=${ayah.numberInSurah}`);
  };

  // Get current surah name from page data
  const currentSurahName = page?.ayahs?.[0]
    ? surahs.find(s => s.number === page.ayahs[0].surahNumber)?.name || ''
    : '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="gradient-header sticky top-0 z-50 flex items-center justify-between px-3 py-2 shadow-islamic">
        <button
          onClick={() => goToPage(currentPage + 1)}
          className={`text-gold-light p-1 ${currentPage >= 604 ? 'opacity-30' : ''}`}
          disabled={currentPage >= 604}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button onClick={() => setShowMenu(!showMenu)} className="flex-1 text-center">
          <h1 className="font-quran text-base font-bold text-gold-light leading-tight">
            {currentSurahName}
          </h1>
          <p className="text-[9px] text-gold-light/60">
            صفحة {toArabicNumber(currentPage)} / ٦٠٤
          </p>
        </button>

        <button
          onClick={() => goToPage(currentPage - 1)}
          className={`text-gold-light p-1 ${currentPage <= 1 ? 'opacity-30' : ''}`}
          disabled={currentPage <= 1}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </header>

      {/* Quick navigation menu */}
      {showMenu && (
        <div className="absolute top-12 left-0 right-0 z-40 bg-card border-b border-border shadow-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => { setShowMenu(false); navigate('/'); }} className="text-xs text-primary font-arabic underline">
              الرئيسية
            </button>
            <span className="text-muted-foreground">|</span>
            <button onClick={() => { setShowMenu(false); navigate('/memorize'); }} className="text-xs text-primary font-arabic underline">
              الحفظ
            </button>
            <span className="text-muted-foreground">|</span>
            <button onClick={() => { setShowMenu(false); navigate('/tajweed'); }} className="text-xs text-primary font-arabic underline">
              التجويد
            </button>
          </div>
          {/* Page jump */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-arabic text-muted-foreground">انتقل إلى صفحة:</span>
            <input
              type="number"
              min={1}
              max={604}
              defaultValue={currentPage}
              className="w-16 rounded border border-input bg-background px-2 py-1 text-sm text-center"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt((e.target as HTMLInputElement).value);
                  if (val >= 1 && val <= 604) {
                    goToPage(val);
                    setShowMenu(false);
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Mushaf page content */}
      <div
        className="flex-1 overflow-y-auto pb-32"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <MushafPageComponent
          pageNumber={currentPage}
          currentAyah={audioPlayer.currentAyah}
          onAyahTap={handleAyahTap}
          onAyahLongPress={handleAyahLongPress}
        />
      </div>

      {/* Audio Player */}
      <AudioPlayerBar
        selectedReciter={audioPlayer.selectedReciter}
        onReciterChange={audioPlayer.changeReciter}
        isPlaying={audioPlayer.isPlaying}
        currentAyah={audioPlayer.currentAyah}
        progress={audioPlayer.progress}
        onTogglePlay={audioPlayer.togglePlay}
        onStop={audioPlayer.stop}
        onNext={audioPlayer.nextAyah}
        onPrev={audioPlayer.prevAyah}
      />
    </div>
  );
};

export default MushafPageView;
