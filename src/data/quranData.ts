export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  versesCount: number;
  revelationType: 'meccan' | 'medinan';
}

export const surahs: SurahInfo[] = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fatiha', versesCount: 7, revelationType: 'meccan' },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', versesCount: 286, revelationType: 'medinan' },
  { number: 3, name: 'آل عمران', englishName: 'Aal Imran', versesCount: 200, revelationType: 'medinan' },
  { number: 4, name: 'النساء', englishName: 'An-Nisa', versesCount: 176, revelationType: 'medinan' },
  { number: 5, name: 'المائدة', englishName: 'Al-Maidah', versesCount: 120, revelationType: 'medinan' },
  { number: 6, name: 'الأنعام', englishName: 'Al-An\'am', versesCount: 165, revelationType: 'meccan' },
  { number: 7, name: 'الأعراف', englishName: 'Al-A\'raf', versesCount: 206, revelationType: 'meccan' },
  { number: 8, name: 'الأنفال', englishName: 'Al-Anfal', versesCount: 75, revelationType: 'medinan' },
  { number: 9, name: 'التوبة', englishName: 'At-Tawbah', versesCount: 129, revelationType: 'medinan' },
  { number: 10, name: 'يونس', englishName: 'Yunus', versesCount: 109, revelationType: 'meccan' },
  { number: 11, name: 'هود', englishName: 'Hud', versesCount: 123, revelationType: 'meccan' },
  { number: 12, name: 'يوسف', englishName: 'Yusuf', versesCount: 111, revelationType: 'meccan' },
  { number: 13, name: 'الرعد', englishName: 'Ar-Ra\'d', versesCount: 43, revelationType: 'medinan' },
  { number: 14, name: 'إبراهيم', englishName: 'Ibrahim', versesCount: 52, revelationType: 'meccan' },
  { number: 15, name: 'الحجر', englishName: 'Al-Hijr', versesCount: 99, revelationType: 'meccan' },
  { number: 16, name: 'النحل', englishName: 'An-Nahl', versesCount: 128, revelationType: 'meccan' },
  { number: 17, name: 'الإسراء', englishName: 'Al-Isra', versesCount: 111, revelationType: 'meccan' },
  { number: 18, name: 'الكهف', englishName: 'Al-Kahf', versesCount: 110, revelationType: 'meccan' },
  { number: 19, name: 'مريم', englishName: 'Maryam', versesCount: 98, revelationType: 'meccan' },
  { number: 20, name: 'طه', englishName: 'Ta-Ha', versesCount: 135, revelationType: 'meccan' },
  { number: 21, name: 'الأنبياء', englishName: 'Al-Anbiya', versesCount: 112, revelationType: 'meccan' },
  { number: 22, name: 'الحج', englishName: 'Al-Hajj', versesCount: 78, revelationType: 'medinan' },
  { number: 23, name: 'المؤمنون', englishName: 'Al-Mu\'minun', versesCount: 118, revelationType: 'meccan' },
  { number: 24, name: 'النور', englishName: 'An-Nur', versesCount: 64, revelationType: 'medinan' },
  { number: 25, name: 'الفرقان', englishName: 'Al-Furqan', versesCount: 77, revelationType: 'meccan' },
  { number: 26, name: 'الشعراء', englishName: 'Ash-Shu\'ara', versesCount: 227, revelationType: 'meccan' },
  { number: 27, name: 'النمل', englishName: 'An-Naml', versesCount: 93, revelationType: 'meccan' },
  { number: 28, name: 'القصص', englishName: 'Al-Qasas', versesCount: 88, revelationType: 'meccan' },
  { number: 29, name: 'العنكبوت', englishName: 'Al-Ankabut', versesCount: 69, revelationType: 'meccan' },
  { number: 30, name: 'الروم', englishName: 'Ar-Rum', versesCount: 60, revelationType: 'meccan' },
  { number: 31, name: 'لقمان', englishName: 'Luqman', versesCount: 34, revelationType: 'meccan' },
  { number: 32, name: 'السجدة', englishName: 'As-Sajdah', versesCount: 30, revelationType: 'meccan' },
  { number: 33, name: 'الأحزاب', englishName: 'Al-Ahzab', versesCount: 73, revelationType: 'medinan' },
  { number: 34, name: 'سبأ', englishName: 'Saba', versesCount: 54, revelationType: 'meccan' },
  { number: 35, name: 'فاطر', englishName: 'Fatir', versesCount: 45, revelationType: 'meccan' },
  { number: 36, name: 'يس', englishName: 'Ya-Sin', versesCount: 83, revelationType: 'meccan' },
  { number: 37, name: 'الصافات', englishName: 'As-Saffat', versesCount: 182, revelationType: 'meccan' },
  { number: 38, name: 'ص', englishName: 'Sad', versesCount: 88, revelationType: 'meccan' },
  { number: 39, name: 'الزمر', englishName: 'Az-Zumar', versesCount: 75, revelationType: 'meccan' },
  { number: 40, name: 'غافر', englishName: 'Ghafir', versesCount: 85, revelationType: 'meccan' },
  { number: 41, name: 'فصلت', englishName: 'Fussilat', versesCount: 54, revelationType: 'meccan' },
  { number: 42, name: 'الشورى', englishName: 'Ash-Shura', versesCount: 53, revelationType: 'meccan' },
  { number: 43, name: 'الزخرف', englishName: 'Az-Zukhruf', versesCount: 89, revelationType: 'meccan' },
  { number: 44, name: 'الدخان', englishName: 'Ad-Dukhan', versesCount: 59, revelationType: 'meccan' },
  { number: 45, name: 'الجاثية', englishName: 'Al-Jathiyah', versesCount: 37, revelationType: 'meccan' },
  { number: 46, name: 'الأحقاف', englishName: 'Al-Ahqaf', versesCount: 35, revelationType: 'meccan' },
  { number: 47, name: 'محمد', englishName: 'Muhammad', versesCount: 38, revelationType: 'medinan' },
  { number: 48, name: 'الفتح', englishName: 'Al-Fath', versesCount: 29, revelationType: 'medinan' },
  { number: 49, name: 'الحجرات', englishName: 'Al-Hujurat', versesCount: 18, revelationType: 'medinan' },
  { number: 50, name: 'ق', englishName: 'Qaf', versesCount: 45, revelationType: 'meccan' },
  { number: 51, name: 'الذاريات', englishName: 'Az-Zariyat', versesCount: 60, revelationType: 'meccan' },
  { number: 52, name: 'الطور', englishName: 'At-Tur', versesCount: 49, revelationType: 'meccan' },
  { number: 53, name: 'النجم', englishName: 'An-Najm', versesCount: 62, revelationType: 'meccan' },
  { number: 54, name: 'القمر', englishName: 'Al-Qamar', versesCount: 55, revelationType: 'meccan' },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', versesCount: 78, revelationType: 'medinan' },
  { number: 56, name: 'الواقعة', englishName: 'Al-Waqi\'ah', versesCount: 96, revelationType: 'meccan' },
  { number: 57, name: 'الحديد', englishName: 'Al-Hadid', versesCount: 29, revelationType: 'medinan' },
  { number: 58, name: 'المجادلة', englishName: 'Al-Mujadilah', versesCount: 22, revelationType: 'medinan' },
  { number: 59, name: 'الحشر', englishName: 'Al-Hashr', versesCount: 24, revelationType: 'medinan' },
  { number: 60, name: 'الممتحنة', englishName: 'Al-Mumtahanah', versesCount: 13, revelationType: 'medinan' },
  { number: 61, name: 'الصف', englishName: 'As-Saff', versesCount: 14, revelationType: 'medinan' },
  { number: 62, name: 'الجمعة', englishName: 'Al-Jumu\'ah', versesCount: 11, revelationType: 'medinan' },
  { number: 63, name: 'المنافقون', englishName: 'Al-Munafiqun', versesCount: 11, revelationType: 'medinan' },
  { number: 64, name: 'التغابن', englishName: 'At-Taghabun', versesCount: 18, revelationType: 'medinan' },
  { number: 65, name: 'الطلاق', englishName: 'At-Talaq', versesCount: 12, revelationType: 'medinan' },
  { number: 66, name: 'التحريم', englishName: 'At-Tahrim', versesCount: 12, revelationType: 'medinan' },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', versesCount: 30, revelationType: 'meccan' },
  { number: 68, name: 'القلم', englishName: 'Al-Qalam', versesCount: 52, revelationType: 'meccan' },
  { number: 69, name: 'الحاقة', englishName: 'Al-Haqqah', versesCount: 52, revelationType: 'meccan' },
  { number: 70, name: 'المعارج', englishName: 'Al-Ma\'arij', versesCount: 44, revelationType: 'meccan' },
  { number: 71, name: 'نوح', englishName: 'Nuh', versesCount: 28, revelationType: 'meccan' },
  { number: 72, name: 'الجن', englishName: 'Al-Jinn', versesCount: 28, revelationType: 'meccan' },
  { number: 73, name: 'المزمل', englishName: 'Al-Muzzammil', versesCount: 20, revelationType: 'meccan' },
  { number: 74, name: 'المدثر', englishName: 'Al-Muddathir', versesCount: 56, revelationType: 'meccan' },
  { number: 75, name: 'القيامة', englishName: 'Al-Qiyamah', versesCount: 40, revelationType: 'meccan' },
  { number: 76, name: 'الإنسان', englishName: 'Al-Insan', versesCount: 31, revelationType: 'medinan' },
  { number: 77, name: 'المرسلات', englishName: 'Al-Mursalat', versesCount: 50, revelationType: 'meccan' },
  { number: 78, name: 'النبأ', englishName: 'An-Naba', versesCount: 40, revelationType: 'meccan' },
  { number: 79, name: 'النازعات', englishName: 'An-Nazi\'at', versesCount: 46, revelationType: 'meccan' },
  { number: 80, name: 'عبس', englishName: 'Abasa', versesCount: 42, revelationType: 'meccan' },
  { number: 81, name: 'التكوير', englishName: 'At-Takwir', versesCount: 29, revelationType: 'meccan' },
  { number: 82, name: 'الانفطار', englishName: 'Al-Infitar', versesCount: 19, revelationType: 'meccan' },
  { number: 83, name: 'المطففين', englishName: 'Al-Mutaffifin', versesCount: 36, revelationType: 'meccan' },
  { number: 84, name: 'الانشقاق', englishName: 'Al-Inshiqaq', versesCount: 25, revelationType: 'meccan' },
  { number: 85, name: 'البروج', englishName: 'Al-Buruj', versesCount: 22, revelationType: 'meccan' },
  { number: 86, name: 'الطارق', englishName: 'At-Tariq', versesCount: 17, revelationType: 'meccan' },
  { number: 87, name: 'الأعلى', englishName: 'Al-A\'la', versesCount: 19, revelationType: 'meccan' },
  { number: 88, name: 'الغاشية', englishName: 'Al-Ghashiyah', versesCount: 26, revelationType: 'meccan' },
  { number: 89, name: 'الفجر', englishName: 'Al-Fajr', versesCount: 30, revelationType: 'meccan' },
  { number: 90, name: 'البلد', englishName: 'Al-Balad', versesCount: 20, revelationType: 'meccan' },
  { number: 91, name: 'الشمس', englishName: 'Ash-Shams', versesCount: 15, revelationType: 'meccan' },
  { number: 92, name: 'الليل', englishName: 'Al-Lail', versesCount: 21, revelationType: 'meccan' },
  { number: 93, name: 'الضحى', englishName: 'Ad-Duha', versesCount: 11, revelationType: 'meccan' },
  { number: 94, name: 'الشرح', englishName: 'Ash-Sharh', versesCount: 8, revelationType: 'meccan' },
  { number: 95, name: 'التين', englishName: 'At-Tin', versesCount: 8, revelationType: 'meccan' },
  { number: 96, name: 'العلق', englishName: 'Al-Alaq', versesCount: 19, revelationType: 'meccan' },
  { number: 97, name: 'القدر', englishName: 'Al-Qadr', versesCount: 5, revelationType: 'meccan' },
  { number: 98, name: 'البينة', englishName: 'Al-Bayyinah', versesCount: 8, revelationType: 'medinan' },
  { number: 99, name: 'الزلزلة', englishName: 'Az-Zalzalah', versesCount: 8, revelationType: 'medinan' },
  { number: 100, name: 'العاديات', englishName: 'Al-Adiyat', versesCount: 11, revelationType: 'meccan' },
  { number: 101, name: 'القارعة', englishName: 'Al-Qari\'ah', versesCount: 11, revelationType: 'meccan' },
  { number: 102, name: 'التكاثر', englishName: 'At-Takathur', versesCount: 8, revelationType: 'meccan' },
  { number: 103, name: 'العصر', englishName: 'Al-Asr', versesCount: 3, revelationType: 'meccan' },
  { number: 104, name: 'الهمزة', englishName: 'Al-Humazah', versesCount: 9, revelationType: 'meccan' },
  { number: 105, name: 'الفيل', englishName: 'Al-Fil', versesCount: 5, revelationType: 'meccan' },
  { number: 106, name: 'قريش', englishName: 'Quraysh', versesCount: 4, revelationType: 'meccan' },
  { number: 107, name: 'الماعون', englishName: 'Al-Ma\'un', versesCount: 7, revelationType: 'meccan' },
  { number: 108, name: 'الكوثر', englishName: 'Al-Kawthar', versesCount: 3, revelationType: 'meccan' },
  { number: 109, name: 'الكافرون', englishName: 'Al-Kafirun', versesCount: 6, revelationType: 'meccan' },
  { number: 110, name: 'النصر', englishName: 'An-Nasr', versesCount: 3, revelationType: 'medinan' },
  { number: 111, name: 'المسد', englishName: 'Al-Masad', versesCount: 5, revelationType: 'meccan' },
  { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', versesCount: 4, revelationType: 'meccan' },
  { number: 113, name: 'الفلق', englishName: 'Al-Falaq', versesCount: 5, revelationType: 'meccan' },
  { number: 114, name: 'الناس', englishName: 'An-Nas', versesCount: 6, revelationType: 'meccan' },
];

export interface JuzInfo {
  number: number;
  name: string;
  startSurah: number;
  startAyah: number;
}

export const juzs: JuzInfo[] = [
  { number: 1, name: 'الم', startSurah: 1, startAyah: 1 },
  { number: 2, name: 'سيقول', startSurah: 2, startAyah: 142 },
  { number: 3, name: 'تلك الرسل', startSurah: 2, startAyah: 253 },
  { number: 4, name: 'لن تنالوا', startSurah: 3, startAyah: 92 },
  { number: 5, name: 'والمحصنات', startSurah: 4, startAyah: 24 },
  { number: 6, name: 'لا يحب الله', startSurah: 4, startAyah: 148 },
  { number: 7, name: 'وإذا سمعوا', startSurah: 5, startAyah: 82 },
  { number: 8, name: 'ولو أننا', startSurah: 6, startAyah: 111 },
  { number: 9, name: 'قال الملأ', startSurah: 7, startAyah: 88 },
  { number: 10, name: 'واعلموا', startSurah: 8, startAyah: 41 },
  { number: 11, name: 'يعتذرون', startSurah: 9, startAyah: 93 },
  { number: 12, name: 'وما من دابة', startSurah: 11, startAyah: 6 },
  { number: 13, name: 'وما أبرئ', startSurah: 12, startAyah: 53 },
  { number: 14, name: 'ربما', startSurah: 15, startAyah: 1 },
  { number: 15, name: 'سبحان الذي', startSurah: 17, startAyah: 1 },
  { number: 16, name: 'قال ألم', startSurah: 18, startAyah: 75 },
  { number: 17, name: 'اقترب للناس', startSurah: 21, startAyah: 1 },
  { number: 18, name: 'قد أفلح', startSurah: 23, startAyah: 1 },
  { number: 19, name: 'وقال الذين', startSurah: 25, startAyah: 21 },
  { number: 20, name: 'أمن خلق', startSurah: 27, startAyah: 56 },
  { number: 21, name: 'اتل ما أوحي', startSurah: 29, startAyah: 46 },
  { number: 22, name: 'ومن يقنت', startSurah: 33, startAyah: 31 },
  { number: 23, name: 'وما أنزلنا', startSurah: 36, startAyah: 28 },
  { number: 24, name: 'فمن أظلم', startSurah: 39, startAyah: 32 },
  { number: 25, name: 'إليه يرد', startSurah: 41, startAyah: 47 },
  { number: 26, name: 'حم', startSurah: 46, startAyah: 1 },
  { number: 27, name: 'قال فما خطبكم', startSurah: 51, startAyah: 31 },
  { number: 28, name: 'قد سمع', startSurah: 58, startAyah: 1 },
  { number: 29, name: 'تبارك', startSurah: 67, startAyah: 1 },
  { number: 30, name: 'عم', startSurah: 78, startAyah: 1 },
];

export interface ReciterInfo {
  id: string;
  name: string;
  // Full surah audio
  surahServerUrl: string;
  // Per-ayah audio (everyayah.com format: {base}{surahPadded}{ayahPadded}.mp3)
  ayahServerUrl: string;
}

export const reciters: ReciterInfo[] = [
  {
    id: 'abdul_basit_warsh',
    name: 'عبد الباسط عبد الصمد',
    surahServerUrl: 'https://server8.mp3quran.net/husary_warsh/',
    ayahServerUrl: 'https://everyayah.com/data/warsh/warsh_Abdul_Basit_128kbps/',
  },
  {
    id: 'yassin_jazaery',
    name: 'ياسين الجزائري',
    surahServerUrl: 'https://server11.mp3quran.net/yasser/',
    ayahServerUrl: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/',
  },
  {
    id: 'ibrahim_dosary',
    name: 'إبراهيم الدوسري',
    surahServerUrl: '',
    ayahServerUrl: 'https://everyayah.com/data/warsh/warsh_ibrahim_aldosary_128kbps/',
  },
];

export function getAyahAudioUrl(reciter: ReciterInfo, surahNumber: number, ayahNumber: number): string {
  const paddedSurah = surahNumber.toString().padStart(3, '0');
  const paddedAyah = ayahNumber.toString().padStart(3, '0');
  return `${reciter.ayahServerUrl}${paddedSurah}${paddedAyah}.mp3`;
}

export function getSurahAudioUrl(reciter: ReciterInfo, surahNumber: number): string {
  if (!reciter.surahServerUrl) return '';
  const paddedNumber = surahNumber.toString().padStart(3, '0');
  return `${reciter.surahServerUrl}${paddedNumber}.mp3`;
}

export function toArabicNumber(num: number): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicDigits[parseInt(d)]).join('');
}

// Page number to Surah mapping (which surah starts on each page)
export function getSurahForPage(pageNumber: number): number {
  // Approximate: page 1 = Al-Fatiha, page 2 = Al-Baqarah start, etc.
  // This will be refined by the actual page data
  if (pageNumber === 1) return 1;
  if (pageNumber <= 49) return 2;
  return Math.min(114, Math.floor(pageNumber / 5));
}
