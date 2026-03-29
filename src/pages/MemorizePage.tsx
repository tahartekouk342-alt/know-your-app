import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Mic, MicOff, RotateCcw, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { surahs, toArabicNumber } from '@/data/quranData';
import { useSurah, type Ayah } from '@/hooks/useQuranApi';

interface WordResult {
  word: string;
  correct: boolean;
}

const MemorizePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const surahNum = parseInt(searchParams.get('surah') || '1');
  const startAyah = parseInt(searchParams.get('ayah') || '1');

  const [selectedSurah, setSelectedSurah] = useState(surahNum);
  const [currentAyahNum, setCurrentAyahNum] = useState(startAyah);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState<WordResult[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const { data: surah } = useSurah(selectedSurah);
  const currentAyah = surah?.ayahs.find(a => a.numberInSurah === currentAyahNum);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('متصفحك لا يدعم التعرف على الصوت. جرب Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let t = '';
      for (let i = 0; i < event.results.length; i++) {
        t += event.results[i][0].transcript;
      }
      setTranscript(t);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setResults([]);
    setScore(null);
    setShowAnswer(false);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    
    // Compare transcript with actual ayah text
    if (currentAyah && transcript) {
      compareTexts(transcript, currentAyah.text);
    }
  }, [transcript, currentAyah]);

  const compareTexts = (spoken: string, original: string) => {
    // Clean and normalize texts
    const cleanText = (t: string) => t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '').replace(/\s+/g, ' ').trim();
    
    const spokenWords = cleanText(spoken).split(' ').filter(Boolean);
    const originalWords = cleanText(original).split(' ').filter(Boolean);
    
    const wordResults: WordResult[] = [];
    let correctCount = 0;

    originalWords.forEach((origWord, i) => {
      const spokenWord = spokenWords[i] || '';
      const isCorrect = spokenWord === origWord || 
        origWord.includes(spokenWord) || 
        spokenWord.includes(origWord) ||
        levenshteinDistance(spokenWord, origWord) <= 2;
      
      wordResults.push({ word: origWord, correct: isCorrect });
      if (isCorrect) correctCount++;
    });

    setResults(wordResults);
    setScore(originalWords.length > 0 ? Math.round((correctCount / originalWords.length) * 100) : 0);
  };

  const levenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i-1] === a[j-1]
          ? matrix[i-1][j-1]
          : Math.min(matrix[i-1][j-1] + 1, matrix[i][j-1] + 1, matrix[i-1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  };

  const nextAyah = () => {
    if (surah && currentAyahNum < surah.ayahs.length) {
      setCurrentAyahNum(currentAyahNum + 1);
      setTranscript('');
      setResults([]);
      setScore(null);
      setShowAnswer(false);
    }
  };

  const resetAttempt = () => {
    setTranscript('');
    setResults([]);
    setScore(null);
    setShowAnswer(false);
  };

  const surahInfo = surahs.find(s => s.number === selectedSurah);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header sticky top-0 z-50 flex items-center justify-between px-3 py-3 shadow-islamic">
        <div className="w-8" />
        <div className="text-center">
          <h1 className="font-quran text-lg font-bold text-gold-light">حفظ القرآن</h1>
          <p className="text-[10px] text-gold-light/60">اختبر حفظك</p>
        </div>
        <button onClick={() => navigate(-1)} className="text-gold-light">
          <ArrowRight className="h-5 w-5" />
        </button>
      </header>

      <div className="p-3 space-y-4">
        {/* Surah selector */}
        <div className="rounded-xl border border-border bg-card p-3">
          <label className="text-xs font-arabic text-muted-foreground mb-2 block">اختر السورة</label>
          <select
            value={selectedSurah}
            onChange={(e) => { setSelectedSurah(Number(e.target.value)); setCurrentAyahNum(1); resetAttempt(); }}
            className="w-full rounded-lg border border-input bg-background p-2 text-sm font-arabic text-right"
            dir="rtl"
          >
            {surahs.map(s => (
              <option key={s.number} value={s.number}>
                {toArabicNumber(s.number)} - {s.name}
              </option>
            ))}
          </select>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-arabic">
              الآية: {toArabicNumber(currentAyahNum)} / {toArabicNumber(surahInfo?.versesCount || 0)}
            </span>
            <button onClick={nextAyah} className="text-xs text-primary font-arabic underline">
              الآية التالية ←
            </button>
          </div>
        </div>

        {/* Blank area - user must recite from memory */}
        <div className="mushaf-page rounded-xl p-4 min-h-[200px] flex flex-col items-center justify-center">
          {!isRecording && results.length === 0 && !showAnswer && (
            <div className="text-center space-y-3">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="font-arabic text-sm text-muted-foreground">
                {surahInfo?.name} - الآية {toArabicNumber(currentAyahNum)}
              </p>
              <p className="font-arabic text-xs text-muted-foreground/70">
                اضغط على الميكروفون لتسميع الآية
              </p>
            </div>
          )}

          {/* Live transcript */}
          {isRecording && (
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="text-xs font-arabic text-destructive">جاري التسجيل...</span>
              </div>
              <p className="font-quran text-lg text-foreground text-center leading-[2.5]" dir="rtl">
                {transcript || '...'}
              </p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="w-full space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                {score !== null && score >= 80 ? (
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive" />
                )}
                <span className="font-arabic text-sm font-bold">
                  النتيجة: {score !== null ? `${toArabicNumber(score)}٪` : ''}
                </span>
              </div>
              <p className="font-quran text-lg text-center leading-[2.8]" dir="rtl">
                {results.map((r, i) => (
                  <span key={i} className={r.correct ? 'text-accent' : 'ayah-error font-bold'}>
                    {r.word}{' '}
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Show answer */}
          {showAnswer && currentAyah && (
            <div className="w-full mt-3 p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs font-arabic text-muted-foreground mb-1">الإجابة الصحيحة:</p>
              <p className="font-quran text-base text-foreground text-center leading-[2.5]" dir="rtl">
                {currentAyah.text}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetAttempt}
            className="flex items-center gap-1 rounded-lg bg-muted px-4 py-2 text-xs font-arabic text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            إعادة
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex h-16 w-16 items-center justify-center rounded-full shadow-islamic transition-all ${
              isRecording 
                ? 'bg-destructive text-destructive-foreground animate-pulse scale-110' 
                : 'bg-primary text-primary-foreground hover:scale-105'
            }`}
          >
            {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </button>

          <button
            onClick={() => setShowAnswer(true)}
            className="flex items-center gap-1 rounded-lg bg-muted px-4 py-2 text-xs font-arabic text-muted-foreground"
          >
            <BookOpen className="h-4 w-4" />
            الإجابة
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemorizePage;
