/* eslint-disable no-unused-vars */
// // App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import "./App.css";
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";

// function App() {
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   // Handle scroll event to show/hide back to top button
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowBackToTop(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="w-full">
//       <Navbar />
//       {/* Routes */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />\
//         <Route path="/classes" element={<Classes />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;








// App.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import "./App.css";
import { AuthProvider, Navbar } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Classes } from "./pages/classes/Classes";

// ============================
// CONTEXT DEFINITIONS
// ============================
// eslint-disable-next-line react-refresh/only-export-components
export const DarkModeContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();

// ============================
// DARK MODE PROVIDER
// ============================
const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

// ============================
// LANGUAGE PROVIDER
// ============================
const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("lang") || "english";
  });

  const translations = {
    english: {
      home: "Home",
      about: "About",
      services: "Services",
      classes: "Classes",
      backToTop: "Back to Top",
      welcome: "Welcome",
      today: "Today"
    },
    french: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      classes: "Cours",
      backToTop: "Retour en haut",
      welcome: "Bienvenue",
      today: "Aujourd'hui"
    },
    kinyarwanda: {
      home: "Ahabanza",
      about: "Ibirebana",
      services: "Serivisi",
      classes: "Amasomo",
      backToTop: "Subira Hejuru",
      welcome: "Murakaza neza",
      today: "Uyu munsi"
    },
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t: translations[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// ============================
// RWANDA TIME COMPONENT - ENHANCED
// ============================
const RwandaTime = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Get Rwanda time (CAT - Central Africa Time, UTC+2)
      const rwandaTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
      
      // Format time with AM/PM
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      // Format full date
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Format compact date for mobile
      const compactDateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Format today's date
      const todayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      setCurrentTime(timeFormatter.format(rwandaTime));
      setCurrentDate(dateFormatter.format(rwandaTime));
      setToday(todayFormatter.format(rwandaTime));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-end space-y-1">
      {/* Main Time Display - Always visible */}
      <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
        🕒 {currentTime} CAT
      </div>
      
      {/* Full Date - Hidden on xsm, visible on md and up */}
      <div className="hidden md:block text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {currentDate}
      </div>
      
      {/* Today's Date - Hidden on xsm, visible on sm */}
      <div className="hidden sm:block md:hidden text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {today}
      </div>
      
      {/* Mobile Date - Compact version for xsm */}
      <div className="sm:hidden text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {today}
      </div>
    </div>
  );
};

// ============================
// DARK MODE TOGGLE COMPONENT
// ============================
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-1 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gradient-to-t from-indigo-400 to-violet-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-lg sm:text-xl">
        {isDarkMode ? "☀️" : "🌙"}
      </span>
    </button>
  );
};

// ============================
// LANGUAGE SELECTOR COMPONENT
// ============================
const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
    >
      <option value="english">🇺🇸 English</option>
      <option value="french">🇫🇷 Français</option>
      <option value="kinyarwanda">🇷🇼 Kinyarwanda</option>
    </select>
  );
};

// ============================
// BACK TO TOP COMPONENT
// ============================
const BackToTop = () => {
  const { t } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-t from-blue-400 to-indigo-400 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
      aria-label={t.backToTop}
    >
      <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
        ↑
      </span>
    </button>
  );
};

// ============================
// TODAY'S DATE COMPONENT
// ============================
const TodaysDate = () => {
  const { t } = useContext(LanguageContext);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const updateTodayDate = () => {
      const now = new Date();
      const rwandaTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
      
      const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      setTodayDate(formatter.format(rwandaTime));
    };

    updateTodayDate();
    // Update daily at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      updateTodayDate();
      setInterval(updateTodayDate, 24 * 60 * 60 * 1000); // Update every 24 hours
    }, timeUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <span className="font-medium">{t.today}:</span>
      <span>{todayDate}</span>
    </div>
  );
};

// ============================
// ENHANCED NAVBAR WRAPPER
// ============================
const EnhancedNavbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col xsm:flex-row justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 gap-2 xsm:gap-0">
        {/* Navigation */}
        <div className="w-full xsm:w-auto flex justify-center xsm:justify-start">
          <Navbar />
        </div>
        
        {/* Today's Date - Visible on large screens */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
          <TodaysDate />
        </div>
        
        {/* Controls Container */}
        <div className="w-full xsm:w-auto flex items-center justify-between xsm:justify-end space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Rwanda Time & Date */}
          <div className="flex-shrink-0">
            <RwandaTime />
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <LanguageSelector />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

// ============================
// MAIN APP COMPONENT
// ============================
function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <EnhancedNavbar />
            
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/classes" element={<Classes />} />
              </Routes>
            </main>

            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;