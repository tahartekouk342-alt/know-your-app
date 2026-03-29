import { juzs, surahs, toArabicNumber } from '@/data/quranData';

interface JuzListProps {
  onSelect: (juzNumber: number) => void;
}

const JuzList = ({ onSelect }: JuzListProps) => {
  return (
    <div className="flex flex-col gap-1 p-2">
      {juzs.map((juz) => {
        const startSurah = surahs.find(s => s.number === juz.startSurah);
        return (
          <button
            key={juz.number}
            onClick={() => onSelect(juz.number)}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-right transition-all hover:shadow-islamic hover:border-gold/50 active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-arabic text-sm font-bold text-primary">
              {toArabicNumber(juz.number)}
            </div>
            <div className="flex-1 text-right">
              <p className="font-quran text-base font-bold text-foreground">الجزء {toArabicNumber(juz.number)}</p>
              <p className="text-xs text-muted-foreground">
                {juz.name} • {startSurah?.name}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default JuzList;
