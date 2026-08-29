import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ===== بيانات الساعة الكوكبية =====
const planetaryData = {
  title: "الساعة الكوكبية",
  subtitle: "الحدود التسعة لسلامة الأرض",
  description: "مفهوم علمي يوضح الحدود الآمنة التي يجب أن يحافظ عليها البشر لضمان استقرار الحياة على كوكب الأرض.",
  image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
  boundaries: [
    { name: "تغير المناخ", value: "تجاوز", status: "danger", detail: "ارتفاع درجة الحرارة 1.2°C" },
    { name: "فقدان التنوع البيولوجي", value: "تجاوز", status: "danger", detail: "فقدان 1 مليون نوع" },
    { name: "دورات النيتروجين", value: "تجاوز", status: "danger", detail: "زيادة 120% عن المستوى الآمن" },
    { name: "دورات الفوسفور", value: "تجاوز", status: "danger", detail: "زيادة 200% عن المستوى الآمن" },
    { name: "تغير استخدام الأراضي", value: "حدودي", status: "warning", detail: "فقدان 40% من الغابات" },
    { name: "المياه العذبة", value: "آمن", status: "safe", detail: "ضمن الحدود الآمنة" },
    { name: "تحمض المحيطات", value: "حدودي", status: "warning", detail: "قرب الحد الآمن" },
    { name: "تلوث الهباء الجوي", value: "آمن", status: "safe", detail: "ضمن الحدود الآمنة" },
    { name: "التلوث الكيميائي", value: "غير محدد", status: "unknown", detail: "بحاجة لدراسة" }
  ]
};

// ===== الترجمات =====
const translations = {
  ar: {
    badge: "مراقبة كوكبية حية",
    title: "نبض الأرض",
    tagline: "منصة لمراقبة نبض كوكبنا — الغابات والمحيطات والقطب",
    langBtn: "EN",
    back: "← رجوع",
    exploreBtn: "استكشف البيئة (360°)",
    watchVideo: "شاهد التقرير",
    stats: "إحصائيات علمية",
    planetaryClock: "الساعة الكوكبية",
    nav: { home: "الرئيسية", clock: "الساعة الكوكبية", help: "المساعدة", about: "من نحن" },
    helpTitle: "المساعدة",
    helpText: "نبض الأرض منصة تفاعلية تأخذك في رحلة استكشاف لثلاث بيئات مهددة حول العالم.",
    aboutTitle: "من نحن",
    aboutText: "نبض الأرض مشروع تعليمي يهدف لتوعية المستخدمين بالتحديات البيئية الحقيقية.",
    forest: {
      name: "الغابة",
      desc: "الرئة الخضراء للأرض",
      explore: "استكشف",
      detail: "الغابات المطيرة تنتج أكثر من 20% من أكسجين الأرض.",
      report: "تغطي الغابات المطيرة حوالي 6% من سطح الأرض، وهي موطن لأكثر من 50% من التنوع البيولوجي العالمي.",
      stats: {
        "المساحة المتبقية": "~4 مليار هكتار",
        "معدل الفقد السنوي": "10 ملايين هكتار",
        "نسبة الأكسجين المنتج": "20%",
        "التنوع البيولوجي": "50% من الأنواع"
      },
      videoUrl: "https://www.youtube.com/embed/JkaxUblCGz0"
    },
    ocean: {
      name: "المحيط",
      desc: "قلب الحياة الأزرق",
      explore: "استكشف",
      detail: "المحيطات تغطي 70% من سطح الأرض وتنتج نصف الأكسجين.",
      report: "تغطي المحيطات 71% من سطح الأرض وتحتوي على 97% من مياه الكوكب.",
      stats: {
        "المساحة": "361 مليون كم²",
        "نسبة الأكسجين المنتج": "50%",
        "ارتفاع الحموضة": "30% منذ 1850",
        "الشعاب المرجانية المهددة": "75%"
      },
      videoUrl: "https://www.youtube.com/embed/2SVs0R8opGg"
    },
    arctic: {
      name: "القطب",
      desc: "حارس التوازن المناخي",
      explore: "استكشف",
      detail: "الجليد القطبي يعكس أشعة الشمس ويحافظ على استقرار مناخ الأرض.",
      report: "فقدت القارة القطبية الجنوبية أكثر من 3 تريليون طن من الجليد بين عامي 1992 و2017.",
      stats: {
        "فقدان الجليد": "3 تريليون طن",
        "ارتفاع درجة الحرارة": "+3°C في القطب",
        "ارتفاع مستوى البحر المتوقع": "7 أمتار",
        "ذوبان الجليد السنوي": "~280 مليار طن"
      },
      videoUrl: "https://www.youtube.com/embed/0vHcV0Fk4eE"
    }
  },
  en: {
    badge: "Live planetary monitoring",
    title: "EARTH'S PULSE",
    tagline: "A platform for monitoring the pulse of our planet",
    langBtn: "AR",
    back: "← Back",
    exploreBtn: "Explore Environment (360°)",
    watchVideo: "Watch Report",
    stats: "Scientific Statistics",
    planetaryClock: "Planetary Clock",
    nav: { home: "Home", clock: "Planetary Clock", help: "Help", about: "About Us" },
    helpTitle: "Help",
    helpText: "Earth's Pulse is an interactive platform exploring three endangered environments.",
    aboutTitle: "About Us",
    aboutText: "Earth's Pulse is an educational project about environmental challenges.",
    forest: {
      name: "Forest",
      desc: "The green lungs of Earth",
      explore: "Explore",
      detail: "Rainforests produce over 20% of Earth's oxygen.",
      report: "Rainforests cover about 6% of Earth's surface, home to over 50% of global biodiversity.",
      stats: {
        "Remaining Area": "~4 billion ha",
        "Annual Loss Rate": "10 million ha",
        "Oxygen Produced": "20%",
        "Biodiversity": "50% of species"
      },
      videoUrl: "https://www.youtube.com/embed/JkaxUblCGz0"
    },
    ocean: {
      name: "Ocean",
      desc: "The blue heart of life",
      explore: "Explore",
      detail: "Oceans cover 70% of Earth's surface and produce half the oxygen.",
      report: "Oceans cover 71% of Earth's surface and contain 97% of the planet's water.",
      stats: {
        "Area": "361 million km²",
        "Oxygen Produced": "50%",
        "Acidity Increase": "30% since 1850",
        "Coral Reefs Threatened": "75%"
      },
      videoUrl: "https://www.youtube.com/embed/2SVs0R8opGg"
    },
    arctic: {
      name: "Arctic",
      desc: "Guardian of climate balance",
      explore: "Explore",
      detail: "Arctic ice reflects sunlight and stabilizes Earth's climate.",
      report: "Antarctica has lost more than 3 trillion tons of ice between 1992 and 2017.",
      stats: {
        "Ice Loss": "3 trillion tons",
        "Temperature Rise": "+3°C in Arctic",
        "Sea Level Rise": "7 meters",
        "Annual Ice Melt": "~280 billion tons"
      },
      videoUrl: "https://www.youtube.com/embed/0vHcV0Fk4eE"
    }
  }
};

const images = {
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80',
  ocean: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1600&q=80',
  arctic: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=1600&q=80'
};

// ===== عارض 360 درجة =====
function PanoramaViewer({ imageUrl, title, onBack, isRTL }) {
  const viewerRef = useRef(null);
  const psvRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const loadViewer = async () => {
      try {
        const { Viewer } = await import('@photo-sphere-viewer/core');
        const { GyroscopePlugin } = await import('@photo-sphere-viewer/gyroscope-plugin');
        const { MarkersPlugin } = await import('@photo-sphere-viewer/markers-plugin');

        if (!isMounted || !viewerRef.current) return;
        if (psvRef.current) { psvRef.current.destroy(); psvRef.current = null; }

        psvRef.current = new Viewer({
          container: viewerRef.current,
          panorama: imageUrl,
          caption: title,
          defaultYaw: 0,
          defaultPitch: 0,
          defaultZoomLvl: 0,
          minFov: 30,
          maxFov: 120,
          plugins: [
            new GyroscopePlugin(),
            new MarkersPlugin({
              markers: [{
                id: 'center',
                position: { yaw: 0, pitch: 0 },
                content: '🌍',
                size: { width: 40, height: 40 },
                style: {
                  background: 'rgba(34,197,94,0.3)',
                  borderRadius: '50%',
                  border: '2px solid #22c55e',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                },
                tooltip: {
                  content: isRTL ? 'مرحباً في هذه البيئة!' : 'Welcome to this environment!',
                  position: 'top',
                },
              }],
            }),
          ],
        });
      } catch (error) {
        console.error('خطأ في تحميل العارض:', error);
      }
    };
    loadViewer();
    return () => { isMounted = false; if (psvRef.current) { psvRef.current.destroy(); psvRef.current = null; } };
  }, [imageUrl, title, isRTL]);

  return (
    <motion.div className="panorama-container" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
      <button className="back-btn" onClick={onBack}>← {isRTL ? 'رجوع' : 'Back'}</button>
      <h2 className="panorama-title">{title} - {isRTL ? 'عرض كروي 360°' : 'Spherical 360° View'}</h2>
      <div ref={viewerRef} className="panorama-viewer" style={{ width: '100%', height: '500px', borderRadius: '20px', overflow: 'hidden', background: '#000' }} />
      <div className="panorama-controls-hint">
        <p>🖱️ {isRTL ? 'اسحب للتحريك في جميع الاتجاهات' : 'Drag to move in all directions'} | 🔍 {isRTL ? 'استخدم العجلة للتكبير' : 'Use scroll to zoom'}</p>
      </div>
    </motion.div>
  );
}

// ===== الصفحة الرئيسية =====
function HomePage({ t }) {
  return (
    <>
      <header className="hero">
        <div className="badge fade-in delay-1"><span className="dot"></span> {t.badge}</div>
        <h1 className="fade-in delay-2">{t.title}</h1>
        <p className="fade-in delay-3">{t.tagline}</p>
      </header>
      <section className="cards">
        {['forest', 'ocean', 'arctic'].map((key, i) => (
          <Link key={key} to={`/environment/${key}`} className={`card ${key} fade-in delay-${4 + i}`}>
            <div className="overlay">
              <h3>{t[key].name}</h3>
              <p>{t[key].desc}</p>
              <span className="btn">{t[key].explore} →</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

// ===== الساعة الكوكبية =====
function PlanetaryClockPage({ t }) {
  return (
    <section className="planetary-clock-page fade-in delay-1">
      <h1 className="clock-title">{t.planetaryClock}</h1>
      <div className="clock-card">
        <img src={planetaryData.image} alt={planetaryData.title} className="clock-hero-image" />
        <h2 className="clock-subtitle">{planetaryData.subtitle}</h2>
        <p className="clock-description">{planetaryData.description}</p>
        <div className="boundaries-grid">
          {planetaryData.boundaries.map((boundary, index) => (
            <div key={index} className={`boundary-card ${boundary.status}`}>
              <h4>{boundary.name}</h4>
              <span className="boundary-status">{boundary.value}</span>
              <span className="boundary-detail">{boundary.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== صفحة تفاصيل البيئة =====
function EnvironmentPage({ envKey, t, isRTL }) {
  const [showPanorama, setShowPanorama] = useState(false);
  const navigate = useNavigate();
  const env = t[envKey];
  if (!env) return <div>البيئة غير موجودة</div>;

  if (showPanorama) {
    return <PanoramaViewer imageUrl={images[envKey]} title={env.name} onBack={() => setShowPanorama(false)} isRTL={isRTL} />;
  }

  return (
    <section className="env-detail fade-in delay-1">
      <button className="back-btn" onClick={() => navigate('/')}>{t.back}</button>
      <div className="env-hero-image">
        <img src={images[envKey]} alt={env.name} />
        <button className="explore-360-btn" onClick={() => setShowPanorama(true)}>
          <span>🔄</span> {t.exploreBtn}
        </button>
      </div>
      <div className="env-report">
        <h2>{env.name}</h2>
        <p className="env-desc">{env.desc}</p>
        <p className="env-report-text">{env.report}</p>
        <h3 className="stats-title">{t.stats}</h3>
        <div className="stats-grid">
          {Object.entries(env.stats).map(([label, value]) => (
            <div key={label} className="stat-card"><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>
          ))}
        </div>
        <div className="video-container">
          <h3>{t.watchVideo}</h3>
          <iframe src={env.videoUrl} title={env.name} frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </section>
  );
}

// ===== المساعدة =====
function HelpPage({ t }) {
  return (
    <section className="info-page fade-in delay-1">
      <h2>{t.helpTitle}</h2>
      <p>{t.helpText}</p>
    </section>
  );
}

// ===== من نحن =====
function AboutPage({ t }) {
  return (
    <section className="info-page fade-in delay-1">
      <h2>{t.aboutTitle}</h2>
      <p>{t.aboutText}</p>
    </section>
  );
}

// ===== المكون الرئيسي =====
function AppContent() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(true);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [nextDark, setNextDark] = useState(true);
  const [langTransitioning, setLangTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const t = translations[language];
  const isRTL = language === 'ar';

  const handleThemeToggle = () => {
    const goingToDark = !darkMode;
    setNextDark(goingToDark);
    setTransitioning(true);
    setTimeout(() => setDarkMode(goingToDark), 200);
    setTimeout(() => setTransitioning(false), 550);
  };

  const handleLanguageToggle = () => {
    setLangTransitioning(true);
    setTimeout(() => setLanguage(language === 'ar' ? 'en' : 'ar'), 250);
    setTimeout(() => setLangTransitioning(false), 500);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="pulse-circle"></div>
        <h1 className="loading-title">نبض الأرض</h1>
        <p className="loading-subtitle">EARTH'S PULSE</p>
        <div className="loading-dots"><span></span><span></span><span></span></div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>نبض الأرض | Earth's Pulse</title></Helmet>
      <div className={`app ${darkMode ? 'dark' : 'light'} ${visible ? 'visible' : ''}`}>
        {transitioning && <div className={`theme-transition-overlay ${nextDark ? 'to-dark' : 'to-light'}`}></div>}
        <nav className="navbar fade-in delay-0">
          <div className="nav-left">
            {['home', 'clock', 'help', 'about'].map((p) => (
              <button key={p} className={`nav-link ${location.pathname === (p === 'home' ? '/' : `/${p === 'clock' ? 'planetary-clock' : p}`) ? 'active' : ''}`} onClick={() => navigate(p === 'home' ? '/' : `/${p === 'clock' ? 'planetary-clock' : p}`)}>
                {t.nav[p]}
              </button>
            ))}
          </div>
          <div className="nav-controls">
            <button className="nav-btn lang-btn" onClick={handleLanguageToggle}>{t.langBtn}</button>
            <div className="theme-toggle-container">
              <input type="checkbox" id="theme-checkbox" checked={!darkMode} onChange={handleThemeToggle} />
              <label htmlFor="theme-checkbox" className="theme-label">
                <span className="theme-icon moon-icon">🌙</span>
                <span className="theme-icon sun-icon">☀️</span>
              </label>
            </div>
          </div>
        </nav>
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`content-wrap ${langTransitioning ? 'lang-fade' : ''}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage t={t} />} />
              <Route path="/planetary-clock" element={<PlanetaryClockPage t={t} />} />
              <Route path="/environment/:envKey" element={<EnvironmentPage t={t} isRTL={isRTL} />} />
              <Route path="/help" element={<HelpPage t={t} />} />
              <Route path="/about" element={<AboutPage t={t} />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// ===== التطبيق مع Router =====
function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
