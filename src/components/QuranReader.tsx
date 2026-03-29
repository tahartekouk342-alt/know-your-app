import { useSurah, type Ayah } from '@/hooks/useQuranApi';
import { surahs, toArabicNumber } from '@/data/quranData';
import { Loader2 } from 'lucide-react';

interface QuranReaderProps {
  surahNumber: number;
}

const Bismillah = () => (
  <div className="text-center py-4 font-quran text-xl text-primary leading-loose">
    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
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
      {/* Surah Header */}
      <div className="mx-3 my-4 rounded-xl border-2 border-gold/40 bg-card p-4 text-center shadow-islamic">
        <div className="gradient-islamic bg-clip-text">
          <h2 className="font-quran text-2xl font-bold text-primary">
            سورة {surahInfo?.name}
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground font-arabic">
          {surahInfo?.revelationType === 'meccan' ? 'مكية' : 'مدنية'} • {toArabicNumber(surahInfo?.versesCount || 0)} آيات
        </p>
      </div>

      {/* Bismillah */}
      {surahNumber !== 9 && surahNumber !== 1 && <Bismillah />}

      {/* Ayahs */}
      <div className="mx-3 rounded-xl border border-border bg-card p-4">
        <p className="font-quran text-xl leading-[2.8] text-foreground text-right" dir="rtl">
          {surah.ayahs.map((ayah: Ayah) => (
            <span key={ayah.numberInSurah}>
              {surahNumber === 1 || ayah.numberInSurah > 1 || surahNumber === 9
                ? ayah.text
                : ayah.text.replace(/^بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ\s*/, '')
              }
              <AyahNumber num={ayah.numberInSurah} />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default QuranReader;
