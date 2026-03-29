import { usePage, type Ayah } from '@/hooks/useQuranApi';
import { surahs, toArabicNumber } from '@/data/quranData';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';

interface MushafPageProps {
  pageNumber: number;
  currentAyah?: Ayah | null;
  onAyahTap?: (ayah: Ayah) => void;
  onAyahLongPress?: (ayah: Ayah) => void;
}

const AyahNumber = ({ num }: { num: number }) => (
  <span className="ayah-divider">{toArabicNumber(num)}</span>
);

const SurahHeader = ({ surahNumber }: { surahNumber: number }) => {
  const surahInfo = surahs.find(s => s.number === surahNumber);
  if (!surahInfo) return null;

  return (
    <div className="my-3 mx-auto max-w-[95%]">
      <div className="mushaf-frame rounded-lg overflow-hidden">
        <div className="gradient-islamic px-4 py-2 text-center">
          <h3 className="font-quran text-lg text-primary-foreground leading-relaxed">
            سُورَةُ {surahInfo.name}
          </h3>
          <div className="flex justify-between text-[10px] text-primary-foreground/70 mt-0.5">
            <span>{surahInfo.revelationType === 'meccan' ? 'مكية' : 'مدنية'}</span>
            <span>آياتها {toArabicNumber(surahInfo.versesCount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Bismillah = () => (
  <div className="text-center my-2">
    <p className="font-quran text-base text-primary leading-loose">
      بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
    </p>
  </div>
);

const MushafPage = ({ pageNumber, currentAyah, onAyahTap, onAyahLongPress }: MushafPageProps) => {
  const { data: page, isLoading, error } = usePage(pageNumber);
  
  const longPressTimer = useCallback((ayah: Ayah) => {
    let timer: ReturnType<typeof setTimeout>;
    return {
      onTouchStart: () => {
        timer = setTimeout(() => onAyahLongPress?.(ayah), 600);
      },
      onTouchEnd: () => clearTimeout(timer),
      onTouchMove: () => clearTimeout(timer),
    };
  }, [onAyahLongPress]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive font-arabic text-sm">خطأ في تحميل الصفحة</p>
      </div>
    );
  }

  // Group ayahs and detect surah transitions
  const elements: React.ReactNode[] = [];
  let prevSurah = 0;

  page.ayahs.forEach((ayah, i) => {
    // Surah header when surah changes
    if (ayah.surahNumber !== prevSurah) {
      if (ayah.numberInSurah === 1) {
        elements.push(<SurahHeader key={`header-${ayah.surahNumber}`} surahNumber={ayah.surahNumber} />);
        // Bismillah for all surahs except At-Tawbah (9) and Al-Fatiha (already included in text)
        if (ayah.surahNumber !== 9 && ayah.surahNumber !== 1) {
          elements.push(<Bismillah key={`bism-${ayah.surahNumber}`} />);
        }
      }
      prevSurah = ayah.surahNumber;
    }
  });

  const isCurrentAyah = (ayah: Ayah) =>
    currentAyah && currentAyah.surahNumber === ayah.surahNumber && currentAyah.numberInSurah === ayah.numberInSurah;

  // Build the text content with surah headers inline
  let prevSurah2 = 0;
  const renderContent: React.ReactNode[] = [];
  
  page.ayahs.forEach((ayah, i) => {
    if (ayah.surahNumber !== prevSurah2 && ayah.numberInSurah === 1) {
      // Close previous text block if any, insert header, then continue
      renderContent.push(
        <React.Fragment key={`sh-${ayah.surahNumber}`}>
          <SurahHeader surahNumber={ayah.surahNumber} />
          {ayah.surahNumber !== 9 && ayah.surahNumber !== 1 && <Bismillah />}
        </React.Fragment>
      );
      prevSurah2 = ayah.surahNumber;
    } else if (ayah.surahNumber !== prevSurah2) {
      prevSurah2 = ayah.surahNumber;
    }
  });

  return (
    <div className="mushaf-page rounded-xl mx-1 my-2 min-h-[calc(100vh-140px)] flex flex-col">
      {/* Page header */}
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-gold/20">
        <span className="text-[10px] text-muted-foreground font-arabic">
          {toArabicNumber(pageNumber)}
        </span>
        <span className="text-[10px] text-muted-foreground font-arabic">
          الجزء {toArabicNumber(Math.ceil(pageNumber / 20.13))}
        </span>
      </div>

      {/* Page content */}
      <div className="flex-1 px-3 py-2">
        <PageContent 
          ayahs={page.ayahs} 
          currentAyah={currentAyah} 
          onAyahTap={onAyahTap}
          onAyahLongPress={onAyahLongPress}
        />
      </div>

      {/* Page footer */}
      <div className="gradient-islamic h-0.5" />
    </div>
  );
};

// Separate component to handle rendering
import React from 'react';

function PageContent({ 
  ayahs, 
  currentAyah, 
  onAyahTap,
  onAyahLongPress 
}: { 
  ayahs: Ayah[]; 
  currentAyah?: Ayah | null; 
  onAyahTap?: (ayah: Ayah) => void;
  onAyahLongPress?: (ayah: Ayah) => void;
}) {
  const result: React.ReactNode[] = [];
  let currentTextAyahs: Ayah[] = [];
  let prevSurah = 0;

  const flushText = () => {
    if (currentTextAyahs.length === 0) return;
    const ayahsCopy = [...currentTextAyahs];
    result.push(
      <p key={`text-${ayahsCopy[0].number}`} className="font-quran text-[1.25rem] leading-[2.8] text-foreground text-justify" dir="rtl">
        {ayahsCopy.map((ayah) => {
          const isCurrent = currentAyah && 
            currentAyah.surahNumber === ayah.surahNumber && 
            currentAyah.numberInSurah === ayah.numberInSurah;
          
          return (
            <AyahSpan 
              key={ayah.number} 
              ayah={ayah} 
              isCurrent={!!isCurrent}
              onTap={onAyahTap}
              onLongPress={onAyahLongPress}
            />
          );
        })}
      </p>
    );
    currentTextAyahs = [];
  };

  ayahs.forEach((ayah) => {
    if (ayah.surahNumber !== prevSurah && ayah.numberInSurah === 1) {
      flushText();
      result.push(<SurahHeader key={`header-${ayah.surahNumber}`} surahNumber={ayah.surahNumber} />);
      if (ayah.surahNumber !== 9 && ayah.surahNumber !== 1) {
        result.push(<Bismillah key={`bism-${ayah.surahNumber}`} />);
      }
      prevSurah = ayah.surahNumber;
    } else if (ayah.surahNumber !== prevSurah) {
      prevSurah = ayah.surahNumber;
    }
    currentTextAyahs.push(ayah);
  });
  flushText();

  return <>{result}</>;
}

function AyahSpan({ 
  ayah, 
  isCurrent, 
  onTap,
  onLongPress 
}: { 
  ayah: Ayah; 
  isCurrent: boolean; 
  onTap?: (ayah: Ayah) => void;
  onLongPress?: (ayah: Ayah) => void;
}) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const wasLongPress = React.useRef(false);

  const handleTouchStart = () => {
    wasLongPress.current = false;
    timerRef.current = setTimeout(() => {
      wasLongPress.current = true;
      onLongPress?.(ayah);
    }, 600);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerRef.current);
    if (!wasLongPress.current) {
      onTap?.(ayah);
    }
  };

  const handleTouchMove = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <span
      className={`transition-colors duration-200 cursor-pointer select-none ${
        isCurrent ? 'ayah-playing' : ''
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={() => onTap?.(ayah)}
    >
      {ayah.text}
      {' '}
      <AyahNumber num={ayah.numberInSurah} />
      {' '}
    </span>
  );
}

export default MushafPage;
