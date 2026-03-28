import { useNavigate } from 'react-router-dom';
import { surahs, toArabicNumber } from '@/data/quranData';
import { BookOpen } from 'lucide-react';

const SurahList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-1 p-2">
      {surahs.map((surah) => (
        <button
          key={surah.number}
          onClick={() => navigate(`/surah/${surah.number}`)}
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-right transition-all hover:shadow-islamic hover:border-gold/50 active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-quran text-sm font-bold text-primary">
            {toArabicNumber(surah.number)}
          </div>
          <div className="flex-1 text-right">
            <p className="font-quran text-base font-bold text-foreground">{surah.name}</p>
            <p className="text-xs text-muted-foreground">
              {surah.revelationType === 'meccan' ? 'مكية' : 'مدنية'} • {toArabicNumber(surah.versesCount)} آيات
            </p>
          </div>
          <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
};

export default SurahList;
