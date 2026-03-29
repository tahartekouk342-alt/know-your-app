import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { surahs } from '@/data/quranData';
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
        <div className="w-8" />
        <h1 className="font-quran text-lg font-bold text-gold-light">
          سورة {surahInfo.name}
        </h1>
        <button onClick={() => navigate('/')} className="text-gold-light">
          <ArrowRight className="h-6 w-6" />
        </button>
      </header>

      <QuranReader surahNumber={num} />
      <AudioPlayer surahNumber={num} onSurahChange={handleSurahChange} />
    </div>
  );
};

export default SurahPage;
