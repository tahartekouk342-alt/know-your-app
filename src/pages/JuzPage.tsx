import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { juzs, toArabicNumber } from '@/data/quranData';
import JuzReader from '@/components/JuzReader';

const JuzPage = () => {
  const { juzNumber } = useParams();
  const navigate = useNavigate();
  const num = parseInt(juzNumber || '1');
  const juzInfo = juzs.find(j => j.number === num);

  if (!juzInfo) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-header sticky top-0 z-50 flex items-center justify-between px-3 py-3 shadow-islamic">
        <div className="w-8" />
        <h1 className="font-quran text-lg font-bold text-gold-light">
          الجزء {toArabicNumber(num)}
        </h1>
        <button onClick={() => navigate('/')} className="text-gold-light">
          <ArrowRight className="h-6 w-6" />
        </button>
      </header>

      <JuzReader juzNumber={num} />
    </div>
  );
};

export default JuzPage;
