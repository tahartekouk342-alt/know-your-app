import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, GraduationCap } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import SurahList from '@/components/SurahList';
import JuzList from '@/components/JuzList';
import { getSurahStartPage, getJuzStartPage } from '@/hooks/useQuranApi';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz'>('surahs');
  const navigate = useNavigate();

  const handleSurahSelect = useCallback(async (surahNumber: number) => {
    const page = await getSurahStartPage(surahNumber);
    navigate(`/mushaf/${page}`);
  }, [navigate]);

  const handleJuzSelect = useCallback(async (juzNumber: number) => {
    const page = await getJuzStartPage(juzNumber);
    navigate(`/mushaf/${page}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Feature buttons */}
      <div className="flex gap-2 px-3 py-3">
        <button
          onClick={() => navigate('/memorize')}
          className="flex-1 flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-islamic hover:border-gold/50"
        >
          <Mic className="h-5 w-5 text-primary" />
          <span className="font-arabic text-xs text-foreground">الحفظ</span>
        </button>
        <button
          onClick={() => navigate('/tajweed')}
          className="flex-1 flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-islamic hover:border-gold/50"
        >
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="font-arabic text-xs text-foreground">التجويد</span>
        </button>
        <button
          onClick={() => navigate('/mushaf/1')}
          className="flex-1 flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-islamic hover:border-gold/50"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-arabic text-xs text-foreground">المصحف</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="sticky top-[60px] z-40 flex border-b border-border bg-card/95 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('surahs')}
          className={`flex-1 py-3 text-center font-arabic text-sm font-semibold transition-all ${
            activeTab === 'surahs'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          السور
        </button>
        <button
          onClick={() => setActiveTab('juz')}
          className={`flex-1 py-3 text-center font-arabic text-sm font-semibold transition-all ${
            activeTab === 'juz'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          الأجزاء
        </button>
      </div>

      {/* Content */}
      <main>
        {activeTab === 'surahs' 
          ? <SurahList onSelect={handleSurahSelect} /> 
          : <JuzList onSelect={handleJuzSelect} />
        }
      </main>
    </div>
  );
};

export default Index;
