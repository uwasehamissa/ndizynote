// /* eslint-disable no-unused-vars */
// // App.jsx
// import React, { useState, useEffect, createContext, useContext } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import "./App.css";
// import {
//   AuthProvider,
//   Navbar,
//   useAuth,
// } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";

// // ============================
// // CONTEXT DEFINITIONS
// // ============================
// // eslint-disable-next-line react-refresh/only-export-components
// export const DarkModeContext = createContext();
// // eslint-disable-next-line react-refresh/only-export-components
// export const LanguageContext = createContext();

// // ============================
// // DARK MODE PROVIDER
// // ============================
// const DarkModeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     // Check for saved theme or system preference
//     if (savedTheme) {
//       return savedTheme === "dark";
//     }
//     return (
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//     );
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (isDarkMode) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       // Update meta theme color for mobile browsers
//       document
//         .querySelector('meta[name="theme-color"]')
//         ?.setAttribute("content", "#111827");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       document
//         .querySelector('meta[name="theme-color"]')
//         ?.setAttribute("content", "#ffffff");
//     }
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

//   const value = {
//     isDarkMode,
//     setIsDarkMode,
//     toggleDarkMode,
//   };

//   return (
//     <DarkModeContext.Provider value={value}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// // ============================
// // LANGUAGE PROVIDER
// // ============================
// const LanguageProvider = ({ children }) => {
//   const [currentLanguage, setCurrentLanguage] = useState(() => {
//     return localStorage.getItem("lang") || "english";
//   });

//   const translations = {
//     english: {
//       home: "Home",
//       about: "About",
//       services: "Services",
//       classes: "Classes",
//       backToTop: "Back to Top",
//       welcome: "Welcome",
//       today: "Today",
//     },
//     french: {
//       home: "Accueil",
//       about: "À propos",
//       services: "Services",
//       classes: "Cours",
//       backToTop: "Retour en haut",
//       welcome: "Bienvenue",
//       today: "Aujourd'hui",
//     },
//     kinyarwanda: {
//       home: "Ahabanza",
//       about: "Ibirebana",
//       services: "Serivisi",
//       classes: "Amasomo",
//       backToTop: "Subira Hejuru",
//       welcome: "Murakaza neza",
//       today: "Uyu munsi",
//     },
//   };

//   const changeLanguage = (lang) => {
//     setCurrentLanguage(lang);
//     localStorage.setItem("lang", lang);
//   };

//   const value = {
//     currentLanguage,
//     changeLanguage,
//     t: translations[currentLanguage],
//   };

//   return (
//     <LanguageContext.Provider value={value}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // ============================
// // RWANDA TIME COMPONENT - ENHANCED
// // ============================
// const RwandaTime = () => {
//   const [currentTime, setCurrentTime] = useState("");
//   const [currentDate, setCurrentDate] = useState("");
//   const [today, setToday] = useState("");

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();

//       // Get Rwanda time (CAT - Central Africa Time, UTC+2)
//       const rwandaTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

//       // Format time with AM/PM
//       const timeFormatter = new Intl.DateTimeFormat("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//         timeZone: "Africa/Kigali",
//       });

//       // Format full date
//       const dateFormatter = new Intl.DateTimeFormat("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         timeZone: "Africa/Kigali",
//       });

//       // Format compact date for mobile
//       const compactDateFormatter = new Intl.DateTimeFormat("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//         timeZone: "Africa/Kigali",
//       });

//       // Format today's date
//       const todayFormatter = new Intl.DateTimeFormat("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//         timeZone: "Africa/Kigali",
//       });

//       setCurrentTime(timeFormatter.format(rwandaTime));
//       setCurrentDate(dateFormatter.format(rwandaTime));
//       setToday(todayFormatter.format(rwandaTime));
//     };

//     updateDateTime();
//     const intervalId = setInterval(updateDateTime, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="flex flex-col items-end space-y-1">
//       {/* Main Time Display - Always visible */}
//       <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
//         🕒 {currentTime} CAT
//       </div>

//       {/* Full Date - Hidden on xsm, visible on md and up */}
//       <div className="hidden md:block text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
//         📅 {currentDate}
//       </div>

//       {/* Today's Date - Hidden on xsm, visible on sm */}
//       <div className="hidden sm:block md:hidden text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
//         📅 {today}
//       </div>

//       {/* Mobile Date - Compact version for xsm */}
//       <div className="sm:hidden text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
//         📅 {today}
//       </div>
//     </div>
//   );
// };

// // ============================
// // DARK MODE TOGGLE COMPONENT
// // ============================
// const DarkModeToggle = () => {
//   const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

//   return (
//     <button
//       onClick={toggleDarkMode}
//       className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gradient-to-t from-indigo-200 to-violet-300 dark:from-indigo-600 dark:to-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//       aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//     >
//       <span className="text-lg sm:text-xl">{isDarkMode ? "☀️" : "🌙"}</span>
//     </button>
//   );
// };

// // ============================
// // LANGUAGE SELECTOR COMPONENT
// // ============================
// const LanguageSelector = () => {
//   const { currentLanguage, changeLanguage } = useContext(LanguageContext);

//   return (
//     <select
//       value={currentLanguage}
//       onChange={(e) => changeLanguage(e.target.value)}
//       className="px-4 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-lg border bg-gradient-to-l from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
//     >
//       <option value="english">🇺🇸 English</option>
//       <option value="french">🇫🇷 Français</option>
//       <option value="kinyarwanda">🇷🇼 Kinyarwanda</option>
//     </select>
//   );
// };

// // ============================
// // BACK TO TOP COMPONENT
// // ============================
// const BackToTop = () => {
//   const { t } = useContext(LanguageContext);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   if (!isVisible) return null;

//   return (
//     <button
//       onClick={scrollToTop}
//       className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-t from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
//       aria-label={t.backToTop}
//     >
//       <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
//         ↑
//       </span>
//     </button>
//   );
// };

// // ============================
// // TODAY'S DATE COMPONENT
// // ============================
// const TodaysDate = () => {
//   const { t } = useContext(LanguageContext);
//   const [todayDate, setTodayDate] = useState("");

//   useEffect(() => {
//     const updateTodayDate = () => {
//       const now = new Date();
//       const rwandaTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

//       const formatter = new Intl.DateTimeFormat("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         timeZone: "Africa/Kigali",
//       });

//       setTodayDate(formatter.format(rwandaTime));
//     };

//     updateTodayDate();
//     // Update daily at midnight
//     const now = new Date();
//     const midnight = new Date(now);
//     midnight.setHours(24, 0, 0, 0);
//     const timeUntilMidnight = midnight.getTime() - now.getTime();

//     const timeoutId = setTimeout(() => {
//       updateTodayDate();
//       setInterval(updateTodayDate, 24 * 60 * 60 * 1000); // Update every 24 hours
//     }, timeUntilMidnight);

//     return () => clearTimeout(timeoutId);
//   }, []);

//   return (
//     <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//       <span className="font-medium">{t.today}:</span>
//       <span>{todayDate}</span>
//     </div>
//   );
// };

// // ============================
// // ENHANCED NAVBAR WRAPPER
// // ============================
// const EnhancedNavbar = () => {
//   return (
//     <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto flex flex-col xsm:flex-row justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 gap-2 xsm:gap-0">
//         {/* Navigation */}
//         <div className="w-full xsm:w-auto flex justify-center xsm:justify-start">
//           <Navbar />
//         </div>

//         {/* Today's Date - Visible on large screens */}
//         <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
//           <TodaysDate />
//         </div>

//         {/* Controls Container */}
//         <div className="w-full xsm:w-auto flex items-center justify-between xsm:justify-end space-x-2 sm:space-x-3 lg:space-x-4">
//           {/* Rwanda Time & Date */}
//           <div className="flex-shrink-0">
//             <RwandaTime />
//           </div>

//           {/* Controls */}
//           <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
//             <LanguageSelector />
//             <DarkModeToggle />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // ============================
// // PRIVATE ROUTE COMPONENT
// // ============================
// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// // ============================
// // MAIN APP COMPONENT
// // ============================
// function App() {
//   return (
//     <AuthProvider>
//       <DarkModeProvider>
//         <LanguageProvider>
//           <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
//             <EnhancedNavbar />

//             <main className="min-h-screen">
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/services" element={<Services />} />
//                 <Route path="/classes" element={<Classes />} />
//                 <Route path="/faq" element={<FAQ />} />

//                 {/* Private Routes */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     // <PrivateRoute>
//                     <Dashboard />
//                     // </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/users"
//                   element={
//                     // <PrivateRoute>
//                     <UserManagement />
//                     // </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/contacts"
//                   element={
//                     // <PrivateRoute>
//                     <ContactManagement />
//                     // </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/request"
//                   element={
//                     // <PrivateRoute>
//                     <RequestManagement />
//                     // </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/testimony"
//                   element={
//                     // <PrivateRoute>
//                     <TestimonialManagement />
//                     // </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/booking"
//                   element={
//                     // <PrivateRoute>
//                     <BookingManagement />
//                     // </PrivateRoute>
//                   }
//                 />

//                 {/* 404 Not Found Route */}
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </main>

//             <Footer />
//             <BackToTop />
//           </div>
//         </LanguageProvider>
//       </DarkModeProvider>
//     </AuthProvider>
//   );
// }

// export default App;


/* eslint-disable no-unused-vars */
// App.jsx
import React, { useState, useEffect, createContext, useContext, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home } from "./pages/home/Home";
import "./App.css";
import {
  AuthProvider,
  Navbar,
  useAuth,
} from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Classes } from "./pages/classes/Classes";
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
import { NotFound } from "./pages/notfound/Notfound";
import { FAQ } from "./pages/faq/Faq";
import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";

// ============================
// LAZY LOADED COMPONENTS FOR BETTER PERFORMANCE
// ============================
// const Home = lazy(() => import("./pages/home/Home"));
// const About = lazy(() => import("./pages/about/About"));
// const Services = lazy(() => import("./pages/services/Services"));
// const Classes = lazy(() => import("./pages/classes/Classes"));
// const Dashboard = lazy(() => import("./components/dashboard/admin/Dashboard"));
// const FAQ = lazy(() => import("./pages/faq/Faq"));
// const NotFound = lazy(() => import("./pages/notfound/Notfound"));

// ============================
// CONTEXT DEFINITIONS
// ============================
// eslint-disable-next-line react-refresh/only-export-components
export const DarkModeContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// ============================
// LOADING COMPONENTS
// ============================
const PageLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mt-4 animate-pulse">
        Loading Amazing Content...
      </p>
      <div className="flex justify-center space-x-1 mt-2">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

const RouteLoadingSpinner = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3 mx-auto"></div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Loading page...</p>
    </div>
  </div>
);

// ============================
// APP PROVIDER FOR GLOBAL STATE
// ============================
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      addNotification('You are back online!', 'success');
    };

    const handleOffline = () => {
      setOnlineStatus(false);
      addNotification('You are offline. Some features may not work.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Notification system
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const value = {
    isLoading,
    setIsLoading,
    pageTransition,
    setPageTransition,
    notifications,
    addNotification,
    removeNotification,
    onlineStatus
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ============================
// NOTIFICATION TOAST COMPONENT
// ============================
const NotificationToast = () => {
  const { notifications, removeNotification } = useContext(AppContext);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
              : notification.type === 'warning'
              ? 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
              : notification.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300'
              : 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
          } animate-slide-in-right`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================
// ONLINE STATUS INDICATOR
// ============================
const OnlineStatusIndicator = () => {
  const { onlineStatus } = useContext(AppContext);

  if (onlineStatus) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span className="text-sm font-medium">Offline Mode</span>
      </div>
    </div>
  );
};

// ============================
// DARK MODE PROVIDER
// ============================
const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    // Check for saved theme or system preference
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      // Update meta theme color for mobile browsers
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#111827");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffffff");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
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
      today: "Today",
      loading: "Loading...",
      online: "Online",
      offline: "Offline"
    },
    french: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      classes: "Cours",
      backToTop: "Retour en haut",
      welcome: "Bienvenue",
      today: "Aujourd'hui",
      loading: "Chargement...",
      online: "En ligne",
      offline: "Hors ligne"
    },
    kinyarwanda: {
      home: "Ahabanza",
      about: "Ibirebana",
      services: "Serivisi",
      classes: "Amasomo",
      backToTop: "Subira Hejuru",
      welcome: "Murakaza neza",
      today: "Uyu munsi",
      loading: "Iyegerana...",
      online: "Kumurongo",
      offline: "Ntawuhande"
    },
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t: translations[currentLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// ============================
// ENHANCED RWANDA TIME COMPONENT
// ============================
const RwandaTime = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [today, setToday] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Get Rwanda time (CAT - Central Africa Time, UTC+2)
      const rwandaTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      // Format time with AM/PM
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Africa/Kigali",
      });

      // Format full date
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Africa/Kigali",
      });

      // Format compact date for mobile
      const compactDateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Africa/Kigali",
      });

      // Format today's date
      const todayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "Africa/Kigali",
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
    <div 
      className="flex flex-col items-end space-y-1 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Time Display */}
      <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap transition-all duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        🕒 {currentTime} CAT
      </div>

      {/* Full Date */}
      <div className="hidden md:block text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {currentDate}
      </div>

      {/* Today's Date */}
      <div className="hidden sm:block md:hidden text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {today}
      </div>

      {/* Mobile Date */}
      <div className="sm:hidden text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
        📅 {today}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute top-full right-0 mt-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 shadow-xl z-50 animate-fade-in">
          <div className="font-semibold">Rwanda Time</div>
          <div className="text-gray-300">Central Africa Time (UTC+2)</div>
        </div>
      )}
    </div>
  );
};

// ============================
// ENHANCED DARK MODE TOGGLE
// ============================
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleDarkMode();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gradient-to-t from-indigo-200 to-violet-300 dark:from-indigo-600 dark:to-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${
        isAnimating ? 'animate-pulse' : ''
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={`text-lg sm:text-xl transition-transform duration-300 ${
        isAnimating ? 'scale-125' : ''
      }`}>
        {isDarkMode ? "☀️" : "🌙"}
      </span>
    </button>
  );
};

// ============================
// ENHANCED LANGUAGE SELECTOR
// ============================
const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: "english", label: "🇺🇸 English", short: "EN" },
    { value: "french", label: "🇫🇷 Français", short: "FR" },
    { value: "kinyarwanda", label: "🇷🇼 Kinyarwanda", short: "RW" }
  ];

  const currentLang = languages.find(lang => lang.value === currentLanguage);

  return (
    <div className="relative">
      {/* Desktop Dropdown */}
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="hidden sm:block px-4 py-2 text-sm rounded-lg border bg-gradient-to-l from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm cursor-pointer"
      >
        {languages.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      {/* Mobile Compact */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 text-xs rounded-lg bg-gradient-to-l from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
        >
          {currentLang?.short}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
            {languages.map(lang => (
              <button
                key={lang.value}
                onClick={() => {
                  changeLanguage(lang.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentLanguage === lang.value 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================
// ENHANCED BACK TO TOP
// ============================
const BackToTop = () => {
  const { t } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
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
      className="fixed bottom-6 right-6 bg-gradient-to-t from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50 group"
      aria-label={t.backToTop}
    >
      <div className="relative">
        <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        
        {/* Progress Circle */}
        <svg className="w-8 h-8 absolute -top-1 -left-1 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/30"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-white/70"
            strokeWidth="2"
            strokeDasharray="100, 100"
            stroke="currentColor"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeDashoffset={100 - scrollProgress}
          />
        </svg>
      </div>
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
      const rwandaTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Africa/Kigali",
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
    <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
      <span className="font-medium">{t.today}:</span>
      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{todayDate}</span>
    </div>
  );
};

// ============================
// ENHANCED NAVBAR WRAPPER
// ============================
const EnhancedNavbar = () => {
  const { isLoading } = useContext(AppContext);

  if (isLoading) return null;

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 sticky top-0 z-40 shadow-sm">
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
// PRIVATE ROUTE COMPONENT
// ============================
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// ============================
// PAGE TRANSITION WRAPPER
// ============================
const PageTransition = ({ children }) => {
  const { pageTransition } = useContext(AppContext);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      pageTransition ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
    }`}>
      {children}
    </div>
  );
};

// ============================
// MAIN APP COMPONENT
// ============================
function App() {
  const { isLoading } = useContext(AppContext);

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <EnhancedNavbar />

      <main className="min-h-screen">
        <Suspense fallback={<RouteLoadingSpinner />}>
          <PageTransition>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/faq" element={<FAQ />} />

              {/* Private Routes */}
              <Route
                path="/dashboard"
                element={
                  // <PrivateRoute>
                  <Dashboard />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  // <PrivateRoute>
                  <UserManagement />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/contacts"
                element={
                  // <PrivateRoute>
                  <ContactManagement />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/request"
                element={
                  // <PrivateRoute>
                  <RequestManagement />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/testimony"
                element={
                  // <PrivateRoute>
                  <TestimonialManagement />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/booking"
                element={
                  // <PrivateRoute>
                  <BookingManagement />
                  // </PrivateRoute>
                }
              />

              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <NotificationToast />
      <OnlineStatusIndicator />
    </div>
  );
}

// ============================
// ROOT WRAPPER COMPONENT
// ============================
function RootApp() {
  return (
    <AppProvider>
      <AuthProvider>
        <DarkModeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </DarkModeProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default RootApp;
