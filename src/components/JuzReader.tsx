import { useJuz, type Ayah } from '@/hooks/useQuranApi';
import { juzs, surahs, toArabicNumber } from '@/data/quranData';
import { Loader2 } from 'lucide-react';

interface JuzReaderProps {
  juzNumber: number;
}

const AyahNumber = ({ num }: { num: number }) => (
  <span className="ayah-divider">{toArabicNumber(num)}</span>
);

const JuzReader = ({ juzNumber }: JuzReaderProps) => {
  const { data: juz, isLoading, error } = useJuz(juzNumber);
  const juzInfo = juzs.find(j => j.number === juzNumber);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-arabic">جاري تحميل الجزء...</p>
      </div>
    );
  }

  if (error || !juz) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-destructive font-arabic">حدث خطأ في تحميل الجزء</p>
      </div>
    );
  }

  // Group ayahs by surah
  const ayahsBySurah: Record<number, Ayah[]> = {};
  juz.ayahs.forEach((ayah: any) => {
    const surahNum = ayah.surah?.number || Math.floor(ayah.number / 1000);
    if (!ayahsBySurah[surahNum]) ayahsBySurah[surahNum] = [];
    ayahsBySurah[surahNum].push(ayah);
  });

  return (
    <div className="pb-28">
      <div className="mx-3 my-4 rounded-xl border-2 border-gold/40 bg-card p-4 text-center shadow-islamic">
        <h2 className="font-quran text-2xl font-bold text-primary">
          الجزء {toArabicNumber(juzNumber)}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground font-arabic">{juzInfo?.name}</p>
      </div>

      <div className="mx-3 rounded-xl border border-border bg-card p-4">
        <p className="font-quran text-xl leading-[2.8] text-foreground text-right" dir="rtl">
          {juz.ayahs.map((ayah: Ayah, i: number) => (
            <span key={i}>
              {ayah.text}
              <AyahNumber num={ayah.numberInSurah} />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default JuzReader;
