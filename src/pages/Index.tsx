import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import SurahList from '@/components/SurahList';
import JuzList from '@/components/JuzList';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz'>('surahs');

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

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
        {activeTab === 'surahs' ? <SurahList /> : <JuzList />}
      </main>
    </div>
  );
};

export default Index;
