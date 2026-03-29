import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, BookOpen, Loader2 } from 'lucide-react';
import { surahs, toArabicNumber } from '@/data/quranData';
import { useSurah, type Ayah } from '@/hooks/useQuranApi';

// Tajweed rules analysis (local, no AI needed)
interface TajweedRule {
  name: string;
  description: string;
  color: string;
  examples: string[];
}

const tajweedRules: TajweedRule[] = [
  { name: 'إدغام بغنة', description: 'إدغام النون الساكنة أو التنوين في حروف (ينمو) مع غنة', color: 'hsl(150 40% 40%)', examples: ['من يعمل', 'عملاً نكراً'] },
  { name: 'إدغام بلا غنة', description: 'إدغام النون الساكنة أو التنوين في اللام والراء بدون غنة', color: 'hsl(200 60% 45%)', examples: ['من ربهم', 'هدىً لّلمتقين'] },
  { name: 'إخفاء', description: 'إخفاء النون الساكنة أو التنوين عند حروف الإخفاء الخمسة عشر', color: 'hsl(38 55% 45%)', examples: ['من ذا', 'عليماً حكيماً'] },
  { name: 'إقلاب', description: 'قلب النون الساكنة أو التنوين ميماً عند الباء', color: 'hsl(280 40% 50%)', examples: ['من بعد', 'سميعاً بصيراً'] },
  { name: 'إظهار', description: 'إظهار النون الساكنة أو التنوين عند حروف الحلق (ء هـ ع ح غ خ)', color: 'hsl(0 60% 50%)', examples: ['من آمن', 'عليمٌ حكيمٌ'] },
  { name: 'مد طبيعي', description: 'مد بمقدار حركتين عند وجود حرف مد بدون سبب', color: 'hsl(45 70% 50%)', examples: ['قالوا', 'فيها'] },
  { name: 'مد متصل', description: 'مد واجب عند اجتماع حرف المد والهمزة في كلمة واحدة (4-5 حركات)', color: 'hsl(320 50% 45%)', examples: ['جاء', 'سوء'] },
  { name: 'مد منفصل', description: 'مد جائز عند اجتماع حرف المد والهمزة في كلمتين', color: 'hsl(180 40% 40%)', examples: ['يا أيها', 'إنا أنزلناه'] },
  { name: 'غنة', description: 'صوت أغن يخرج من الخيشوم مقدار حركتين', color: 'hsl(100 50% 40%)', examples: ['إنّ', 'ثمّ'] },
  { name: 'قلقلة', description: 'اضطراب الصوت عند النطق بحروف (قطب جد) الساكنة', color: 'hsl(25 70% 45%)', examples: ['يخلقْ', 'أحدْ'] },
];

const TajweedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSurah = parseInt(searchParams.get('surah') || '1');
  const initialAyah = parseInt(searchParams.get('ayah') || '1');

  const [selectedSurah, setSelectedSurah] = useState(initialSurah);
  const [selectedAyahNum, setSelectedAyahNum] = useState(initialAyah);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{ rule: TajweedRule; positions: string[] }[]>([]);

  const { data: surah } = useSurah(selectedSurah);
  const selectedAyah = surah?.ayahs.find(a => a.numberInSurah === selectedAyahNum);

  const analyzeAyah = () => {
    if (!selectedAyah) return;
    setAnalyzing(true);

    // Simulate analysis (in real app, this would use AI or detailed tajweed DB)
    setTimeout(() => {
      const text = selectedAyah.text;
      const foundRules: { rule: TajweedRule; positions: string[] }[] = [];

      // Simple heuristic-based detection
      tajweedRules.forEach(rule => {
        const positions: string[] = [];
        
        if (rule.name === 'غنة') {
          const matches = text.match(/[نم]ّ/g);
          if (matches) positions.push(...matches);
        }
        if (rule.name === 'مد طبيعي') {
          const matches = text.match(/[اوي](?![ء])/g);
          if (matches && matches.length > 0) positions.push(...matches.slice(0, 3));
        }
        if (rule.name === 'إخفاء') {
          const matches = text.match(/ن[ًٌٍْ]?\s*[تثدذسشصضطظفقك]/g);
          if (matches) positions.push(...matches);
        }
        if (rule.name === 'إدغام بغنة') {
          const matches = text.match(/ن[ًٌٍْ]?\s*[ينمو]/g);
          if (matches) positions.push(...matches);
        }
        if (rule.name === 'قلقلة') {
          const matches = text.match(/[قطبجد]ْ/g);
          if (matches) positions.push(...matches);
        }
        if (rule.name === 'مد متصل') {
          const matches = text.match(/[اوي]ء/g);
          if (matches) positions.push(...matches);
        }

        if (positions.length > 0) {
          foundRules.push({ rule, positions });
        }
      });

      // Always show at least some rules for educational purposes
      if (foundRules.length === 0) {
        foundRules.push({ rule: tajweedRules[5], positions: ['مد طبيعي موجود في معظم الآيات'] });
      }

      setAnalysisResults(foundRules);
      setAnalyzing(false);
    }, 800);
  };

  const surahInfo = surahs.find(s => s.number === selectedSurah);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header sticky top-0 z-50 flex items-center justify-between px-3 py-3 shadow-islamic">
        <div className="w-8" />
        <div className="text-center">
          <h1 className="font-quran text-lg font-bold text-gold-light">تعلم التجويد</h1>
          <p className="text-[10px] text-gold-light/60">تحليل أحكام التجويد</p>
        </div>
        <button onClick={() => navigate(-1)} className="text-gold-light">
          <ArrowRight className="h-5 w-5" />
        </button>
      </header>

      <div className="p-3 space-y-4">
        {/* Surah & Ayah selector */}
        <div className="rounded-xl border border-border bg-card p-3 space-y-2">
          <select
            value={selectedSurah}
            onChange={(e) => { setSelectedSurah(Number(e.target.value)); setSelectedAyahNum(1); setAnalysisResults([]); }}
            className="w-full rounded-lg border border-input bg-background p-2 text-sm font-arabic text-right"
            dir="rtl"
          >
            {surahs.map(s => (
              <option key={s.number} value={s.number}>
                {toArabicNumber(s.number)} - {s.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-xs font-arabic text-muted-foreground shrink-0">الآية:</span>
            <input
              type="number"
              min={1}
              max={surahInfo?.versesCount || 1}
              value={selectedAyahNum}
              onChange={(e) => { setSelectedAyahNum(Number(e.target.value)); setAnalysisResults([]); }}
              className="w-16 rounded border border-input bg-background px-2 py-1 text-sm text-center"
            />
            <span className="text-xs text-muted-foreground font-arabic">/ {toArabicNumber(surahInfo?.versesCount || 0)}</span>
          </div>
        </div>

        {/* Selected Ayah display */}
        {selectedAyah && (
          <div className="mushaf-page rounded-xl p-4">
            <p className="font-quran text-xl text-foreground text-center leading-[2.8]" dir="rtl">
              {selectedAyah.text}
            </p>
            <div className="text-center mt-3">
              <span className="ayah-divider text-sm">{toArabicNumber(selectedAyahNum)}</span>
            </div>
          </div>
        )}

        {/* Analyze button */}
        <button
          onClick={analyzeAyah}
          disabled={!selectedAyah || analyzing}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 font-arabic text-sm font-bold shadow-islamic transition-all hover:scale-[1.01] disabled:opacity-50"
        >
          {analyzing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          تحليل أحكام التجويد
        </button>

        {/* Analysis results */}
        {analysisResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-arabic text-sm font-bold text-foreground">أحكام التجويد في الآية:</h3>
            {analysisResults.map((result, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: result.rule.color }} />
                  <h4 className="font-arabic text-sm font-bold text-foreground">{result.rule.name}</h4>
                </div>
                <p className="text-xs font-arabic text-muted-foreground mb-2">{result.rule.description}</p>
                <div className="flex flex-wrap gap-1">
                  {result.positions.map((pos, j) => (
                    <span key={j} className="inline-block rounded px-2 py-0.5 text-xs font-quran" style={{ backgroundColor: result.rule.color + '20', color: result.rule.color }}>
                      {pos}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tajweed rules reference */}
        <div className="rounded-xl border border-border bg-card p-3">
          <h3 className="font-arabic text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            مرجع أحكام التجويد
          </h3>
          <div className="space-y-2">
            {tajweedRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 py-1 border-b border-border/50 last:border-0">
                <div className="w-3 h-3 rounded-full shrink-0 mt-1" style={{ backgroundColor: rule.color }} />
                <div>
                  <p className="text-xs font-arabic font-bold text-foreground">{rule.name}</p>
                  <p className="text-[10px] font-arabic text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TajweedPage;
