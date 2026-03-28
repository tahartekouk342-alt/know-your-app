import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { surahs, toArabicNumber } from '@/data/quranData';
import QuranReader from '@/components/QuranReader';
import AudioPlayer from '@/components/AudioPlayer';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const num = parseInt(surahNumber || '1');
  const surahInfo = surahs.find(s => s.number === num);

  if (!surahInfo) {
    navigate('/');
    return null;
  }

  const handleSurahChange = (newNum: number) => {
    navigate(`/surah/${newNum}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="gradient-header sticky top-0 z-50 flex items-center justify-between px-3 py-3 shadow-islamic">
        {/* Next surah (RTL so left arrow goes forward) */}
        <button
          onClick={() => num < 114 && navigate(`/surah/${num + 1}`)}
          className={`text-gold-light ${num >= 114 ? 'opacity-30' : ''}`}
          disabled={num >= 114}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button onClick={() => navigate('/')} className="text-center flex-1">
          <h1 className="font-quran text-lg font-bold text-gold-light">
            سورة {surahInfo.name}
          </h1>
          <p className="text-[10px] text-gold-light/60">{toArabicNumber(num)} / ١١٤</p>
        </button>

        {/* Prev surah / back */}
        <button
          onClick={() => num > 1 ? navigate(`/surah/${num - 1}`) : navigate('/')}
          className="text-gold-light"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </header>

      <QuranReader surahNumber={num} />
      <AudioPlayer surahNumber={num} onSurahChange={handleSurahChange} />
    </div>
  );
};

export default SurahPage;
