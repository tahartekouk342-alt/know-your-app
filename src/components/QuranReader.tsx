import { useSurah, type Ayah } from '@/hooks/useQuranApi';
import { surahs, toArabicNumber } from '@/data/quranData';
import { Loader2 } from 'lucide-react';

interface QuranReaderProps {
  surahNumber: number;
}

const Bismillah = () => (
  <div className="mx-auto my-4 max-w-xs rounded-lg border-2 border-gold/30 bg-card py-3 text-center shadow-islamic">
    <p className="font-quran text-xl text-primary leading-loose">
      بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
    </p>
  </div>
);

const AyahNumber = ({ num }: { num: number }) => (
  <span className="ayah-divider">{toArabicNumber(num)}</span>
);

const QuranReader = ({ surahNumber }: QuranReaderProps) => {
  const { data: surah, isLoading, error } = useSurah(surahNumber);
  const surahInfo = surahs.find(s => s.number === surahNumber);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-arabic">جاري تحميل السورة...</p>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-destructive font-arabic">حدث خطأ في تحميل السورة</p>
        <p className="text-sm text-muted-foreground">يرجى المحاولة مرة أخرى</p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Surah Header - ornamental frame */}
      <div className="mx-3 my-4 overflow-hidden rounded-xl border-2 border-gold/50 bg-card shadow-islamic">
        <div className="gradient-islamic px-4 py-1">
          <div className="flex items-center justify-between text-xs text-primary-foreground/80">
            <span>{surahInfo?.revelationType === 'meccan' ? 'مكية' : 'مدنية'}</span>
            <span>آياتها {toArabicNumber(surahInfo?.versesCount || 0)}</span>
          </div>
        </div>
        <div className="py-4 text-center">
          <h2 className="font-quran text-3xl font-bold text-primary">
            سُورَةُ {surahInfo?.name}
          </h2>
        </div>
        <div className="gradient-islamic h-1" />
      </div>

      {/* Bismillah */}
      {surahNumber !== 9 && <Bismillah />}

      {/* Ayahs - traditional Mushaf style */}
      <div className="mx-2 rounded-xl border-2 border-gold/30 bg-card overflow-hidden">
        <div className="border-b border-gold/20 gradient-islamic px-3 py-1.5 text-center">
          <span className="text-xs text-primary-foreground/80 font-arabic">
            رواية ورش عن نافع
          </span>
        </div>
        <div className="p-4">
          <p className="font-quran text-[1.4rem] leading-[3] text-foreground text-right" dir="rtl">
            {surah.ayahs.map((ayah: Ayah) => (
              <span key={ayah.numberInSurah}>
                {ayah.text}
                {' '}
                <AyahNumber num={ayah.numberInSurah} />
                {' '}
              </span>
            ))}
          </p>
        </div>
        <div className="gradient-islamic h-1" />
      </div>
    </div>
  );
};

export default QuranReader;
