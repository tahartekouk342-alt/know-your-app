import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="gradient-header sticky top-0 z-50 shadow-islamic">
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-gold-light" />
          <div className="text-center">
            <h1 className="font-quran text-lg font-bold text-gold-light leading-tight">
              القرآن الكريم
            </h1>
            <p className="text-xs text-gold-light/70">رواية ورش عن نافع</p>
          </div>
          <BookOpen className="h-6 w-6 text-gold-light" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
