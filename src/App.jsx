// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
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
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";

// // CONTEXT DEFINITIONS

// // eslint-disable-next-line react-refresh/only-export-components
// export const DarkModeContext = createContext();
// // eslint-disable-next-line react-refresh/only-export-components
// export const LanguageContext = createContext();
// // eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext();

// // LOADING COMPONENTS

// const PageLoadingSpinner = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
//     <div className="text-center">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4 mx-auto"></div>
//         <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
//       </div>
//       <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mt-4 animate-pulse">
//         Loading Amazing Content...
//       </p>
//       <div className="flex justify-center space-x-1 mt-2">
//         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//         <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//         <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//       </div>
//     </div>
//   </div>
// );

// // NOTIFICATION TOAST COMPONENT

// const NotificationToast = () => {
//   const { notifications, removeNotification } = useContext(AppContext);

//   if (!notifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 animate-slide-in-right ${
//             notification.type === 'success'
//               ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300'
//               : notification.type === 'warning'
//               ? 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
//               : notification.type === 'error'
//               ? 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300'
//               : 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {notification.type === 'success' && (
//                 <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//               )}
//               {notification.type === 'warning' && (
//                 <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">!</span>
//                 </div>
//               )}
//               {notification.type === 'error' && (
//                 <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✕</span>
//                 </div>
//               )}
//               {notification.type === 'info' && (
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">i</span>
//                 </div>
//               )}
//               <p className="text-sm font-medium">{notification.message}</p>
//             </div>
//             <button
//               onClick={() => removeNotification(notification.id)}
//               className="ml-4 text-gray-400 transition-colors text-lg"
//               aria-label="close notification"
//             >
//               ✕
//             </button>
//           </div>
//           {/* Progress bar */}
//           <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
//             <div
//               className={`h-1 rounded-full transition-all duration-100 ${
//                 notification.type === 'success' ? 'bg-green-500' :
//                 notification.type === 'warning' ? 'bg-yellow-500' :
//                 notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
//               }`}
//               style={{
//                 width: '100%',
//                 animation: `shrink ${notification.duration}ms linear forwards`
//               }}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ONLINE STATUS INDICATOR

// const OnlineStatusIndicator = () => {
//   const { onlineStatus } = useContext(AppContext);

//   return (
//     <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
//       onlineStatus ? 'translate-y-[-100px] opacity-0' : 'translate-y-0 opacity-100'
//     }`}>
//       <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 border-2 border-yellow-300">
//         <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm font-semibold">🔌 Offline Mode</span>
//           <span className="text-xs opacity-90">Some features may not work</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // APP PROVIDER FOR GLOBAL STATE

// const AppProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageTransition, setPageTransition] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

//   // addNotification and removeNotification stable via useCallback
//   const addNotification = useCallback((message, type = 'info', duration = 5000) => {
//     // Accept duration in ms or as small number in seconds
//     let dur = duration;
//     if (typeof dur === 'number' && dur < 1000) {
//       // treat as seconds
//       dur = dur * 1000;
//     }
//     const id = Date.now() + Math.floor(Math.random() * 1000);
//     const notification = { id, message, type, duration: dur };

//     setNotifications(prev => [...prev, notification]);

//     // Auto remove after duration
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== id));
//     }, dur);

//     return id;
//   }, []);

//   const removeNotification = useCallback((id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id));
//   }, []);

//   // Clear all notifications
//   const clearNotifications = useCallback(() => {
//     setNotifications([]);
//   }, []);

//   // Simulate initial app loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       // Welcome notification (4 seconds)
//       addNotification('Welcome to Ndizi Music! 🎵', 'success', 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Online/Offline detection with notifications
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       // treat 3 seconds as 3s, not 3ms
//       addNotification('Connection restored! You are back online 🌐', 'success', 3000);
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification('You are offline. Some features may not work.', 'warning', 5000);
//     };

//     // Add initial connectivity notification
//     if (!navigator.onLine) {
//       addNotification('You are currently offline. Some features may be limited.', 'warning', 5000);
//     }

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, [addNotification]);

//   const value = {
//     isLoading,
//     setIsLoading,
//     pageTransition,
//     setPageTransition,
//     notifications,
//     addNotification,
//     removeNotification,
//     clearNotifications,
//     onlineStatus
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // DARK MODE PROVIDER

// const DarkModeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     return savedTheme === "dark";
//   });

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode(prev => !prev);

//   const value = {
//     isDarkMode,
//     setIsDarkMode,
//     toggleDarkMode
//   };

//   return (
//     <DarkModeContext.Provider value={value}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// // LANGUAGE PROVIDER

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
//       today: "Today"
//     },
//     french: {
//       home: "Accueil",
//       about: "À propos",
//       services: "Services",
//       classes: "Cours",
//       backToTop: "Retour en haut",
//       welcome: "Bienvenue",
//       today: "Aujourd'hui"
//     },
//     kinyarwanda: {
//       home: "Ahabanza",
//       about: "Ibirebana",
//       services: "Serivisi",
//       classes: "Amasomo",
//       backToTop: "Subira Hejuru",
//       welcome: "Murakaza neza",
//       today: "Uyu munsi"
//     },
//   };

//   const changeLanguage = useCallback((lang) => {
//     setCurrentLanguage(lang);
//     try {
//       localStorage.setItem("lang", lang);
//     } catch (e) {
//       // localStorage may be disabled in strict environments — ignore safely
//       console.warn("Could not persist language selection", e);
//     }
//   }, []);

//   const value = {
//     currentLanguage,
//     changeLanguage,
//     t: translations[currentLanguage] || translations.english
//   };

//   return (
//     <LanguageContext.Provider value={value}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // RWANDA TIME COMPONENT
// // IMPORTANT: Uses UTC (Date.now()) as base, then applies Kigali offset (+2h).
// // This ensures we are NOT relying on user's local timezone.

// const RwandaTime = () => {
//   const [currentTime, setCurrentTime] = useState("");
//   const [currentDate, setCurrentDate] = useState("");
//   const [today, setToday] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const updateDateTime = () => {
//       // Base on UTC milliseconds
//       const nowUTCms = Date.now();

//       // Kigali is UTC+2 (no DST)
//       const rwandaMs = nowUTCms + (2 * 60 * 60 * 1000);
//       const rwandaTime = new Date(rwandaMs);

//       // Format using UTC locale so user's device TZ doesn't affect the string.
//       // Because we already applied +2h offset, format with timeZone: 'UTC'
//       const timeFormatter = new Intl.DateTimeFormat('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//         timeZone: 'UTC'
//       });

//       const dateFormatter = new Intl.DateTimeFormat('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         timeZone: 'UTC'
//       });

//       const todayFormatter = new Intl.DateTimeFormat('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//         timeZone: 'UTC'
//       });

//       if (!mounted) return;
//       setCurrentTime(timeFormatter.format(rwandaTime));
//       setCurrentDate(dateFormatter.format(rwandaTime));
//       setToday(todayFormatter.format(rwandaTime));
//     };

//     updateDateTime();
//     const intervalId = setInterval(updateDateTime, 1000);

//     return () => {
//       mounted = false;
//       clearInterval(intervalId);
//     };
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

// // DARK MODE TOGGLE COMPONENT

// const DarkModeToggle = () => {
//   const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

//   return (
//     <button
//       onClick={toggleDarkMode}
//       className="p-1 sm:p-2 rounded-full transition-all duration-300 bg-gradient-to-t from-indigo-400 to-violet-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//       aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//     >
//       <span className="text-lg sm:text-xl">
//         {isDarkMode ? "☀️" : "🌙"}
//       </span>
//     </button>
//   );
// };

// // LANGUAGE SELECTOR COMPONENT

// const LanguageSelector = () => {
//   const { currentLanguage, changeLanguage } = useContext(LanguageContext);

//   return (
//     <select
//       value={currentLanguage}
//       onChange={(e) => changeLanguage(e.target.value)}
//       className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
//     >
//       <option value="english">🇺🇸 English</option>
//       <option value="french">🇫🇷 Français</option>
//       <option value="kinyarwanda">🇷🇼 Kinyarwanda</option>
//     </select>
//   );
// };

// // BACK TO TOP COMPONENT

// const BackToTop = () => {
//   const { t } = useContext(LanguageContext);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     // initial check
//     handleScroll();

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
//       className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-t from-blue-400 to-indigo-400 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
//       aria-label={t.backToTop}
//     >
//       <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
//         ↑
//       </span>
//     </button>
//   );
// };

// // TODAY'S DATE COMPONENT

// const TodaysDate = () => {
//   const { t } = useContext(LanguageContext);
//   const [todayDate, setTodayDate] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const updateTodayDate = () => {
//       const nowUTCms = Date.now();
//       const rwandaMs = nowUTCms + (2 * 60 * 60 * 1000);
//       const rwandaTime = new Date(rwandaMs);

//       const formatter = new Intl.DateTimeFormat('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         timeZone: 'UTC'
//       });

//       if (!mounted) return;
//       setTodayDate(formatter.format(rwandaTime));
//     };

//     updateTodayDate();
//     // check once a minute to catch midnight changes reliably
//     const intervalId = setInterval(updateTodayDate, 60 * 1000);

//     return () => {
//       mounted = false;
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//       <span className="font-medium">{t.today}:</span>
//       <span>{todayDate}</span>
//     </div>
//   );
// };

// // PRIVATE ROUTE COMPONENT

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// // DASHBOARD LAYOUT COMPONENT

// const DashboardLayout = () => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/users" element={<UserManagement />} />
//         <Route path="/contacts" element={<ContactManagement />} />
//         <Route path="/request" element={<RequestManagement />} />
//         <Route path="/testimony" element={<TestimonialManagement />} />
//         <Route path="/booking" element={<BookingManagement />} />
//         <Route path="/courses" element={<CourseManagementDashboard />} />
//         {/* user dashboard */}
//         <Route path="/user" element={<UserDashboard />} />
//         <Route path="/me" element={<MeManagement />} />
//         <Route path="/me/testimony" element={<MyTestimonialManagement />} />
//         <Route path="/me/contacts" element={<MyContactManagement />} />
//         {/* <Route path="/me" element={<MeManagement />} /> */}
//         {/* not found pages */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// };

// // ENHANCED NAVBAR WRAPPER

// const EnhancedNavbar = () => {
//   const { isLoading } = useContext(AppContext);

//   if (isLoading) return null;

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

// // MAIN APP COMPONENT

// function App() {
//   const { isLoading } = useContext(AppContext);

//   if (isLoading) {
//     return <PageLoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
//       <EnhancedNavbar />

//       <main className="min-h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/classes" element={<Classes />} />
//           <Route path="/faq" element={<FAQ />} />

//           {/* Dashboard Routes - Protected */}
//           <Route
//             path="/dashboard/*"
//             element={
//               <PrivateRoute>
//                 <DashboardLayout />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Not Found Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       <Footer />
//       <BackToTop />
//       <NotificationToast />
//       <OnlineStatusIndicator />
//     </div>
//   );
// }

// // ROOT WRAPPER COMPONENT

// function RootApp() {
//   return (
//     <AppProvider>
//       <AuthProvider>
//         <DarkModeProvider>
//           <LanguageProvider>
//             <App />
//           </LanguageProvider>
//         </DarkModeProvider>
//       </AuthProvider>
//     </AppProvider>
//   );
// }

// export default RootApp;

/* eslint-disable react-hooks/set-state-in-effect */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
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
import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
import { UserDashboard } from "./components/dashboard/users/UserDashboard";
import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";
import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// CONTEXT DEFINITIONS
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// LOADING COMPONENTS

const PageLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
      </div>
      <p className="text-gray-600 text-lg font-medium mt-4 animate-pulse">
        Loading Amazing Content...
      </p>
      <div className="flex justify-center space-x-1 mt-2">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  </div>
);

// NOTIFICATION TOAST COMPONENT

const NotificationToast = () => {
  const { notifications, removeNotification } = useContext(AppContext);

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 animate-slide-in-right ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : notification.type === "warning"
              ? "bg-yellow-50 border-yellow-500 text-yellow-800"
              : notification.type === "error"
              ? "bg-red-50 border-red-500 text-red-800"
              : "bg-blue-50 border-blue-500 text-blue-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notification.type === "success" && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
              {notification.type === "warning" && (
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
              )}
              {notification.type === "error" && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✕</span>
                </div>
              )}
              {notification.type === "info" && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">i</span>
                </div>
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 transition-colors text-lg"
              aria-label="close notification"
            >
              ✕
            </button>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
            <div
              className={`h-1 rounded-full transition-all duration-100 ${
                notification.type === "success"
                  ? "bg-green-500"
                  : notification.type === "warning"
                  ? "bg-yellow-500"
                  : notification.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
              style={{
                width: "100%",
                animation: `shrink ${notification.duration}ms linear forwards`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ONLINE STATUS INDICATOR

const OnlineStatusIndicator = () => {
  const { onlineStatus } = useContext(AppContext);

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        onlineStatus
          ? "translate-y-[-100px] opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 border-2 border-yellow-300">
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">🔌 Offline Mode</span>
          <span className="text-xs opacity-90">Some features may not work</span>
        </div>
      </div>
    </div>
  );
};

// APP PROVIDER FOR GLOBAL STATE

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  // addNotification and removeNotification stable via useCallback
  const addNotification = useCallback(
    (message, type = "info", duration = 5000) => {
      // Accept duration in ms or as small number in seconds
      let dur = duration;
      if (typeof dur === "number" && dur < 1000) {
        // treat as seconds
        dur = dur * 1000;
      }
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const notification = { id, message, type, duration: dur };

      setNotifications((prev) => [...prev, notification]);

      // Auto remove after duration
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, dur);

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Welcome notification (4 seconds)
      addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  // Online/Offline detection with notifications
  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      // treat 3 seconds as 3s, not 3ms
      addNotification(
        "Connection restored! You are back online 🌐",
        "success",
        3000
      );
    };

    const handleOffline = () => {
      setOnlineStatus(false);
      addNotification(
        "You are offline. Some features may not work.",
        "warning",
        5000
      );
    };

    // Add initial connectivity notification
    if (!navigator.onLine) {
      addNotification(
        "You are currently offline. Some features may be limited.",
        "warning",
        5000
      );
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [addNotification]);

  const value = {
    isLoading,
    setIsLoading,
    pageTransition,
    setPageTransition,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    onlineStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// BACK TO TOP COMPONENT

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    // initial check
    handleScroll();

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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-t from-blue-400 to-indigo-400 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
      aria-label="Back to Top"
    >
      <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
        ↑
      </span>
    </button>
  );
};

// PRIVATE ROUTE COMPONENT

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// DASHBOARD LAYOUT COMPONENT

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/contacts" element={<ContactManagement />} />
        <Route path="/request" element={<RequestManagement />} />
        <Route path="/testimony" element={<TestimonialManagement />} />
        <Route path="/booking" element={<BookingManagement />} />
        <Route path="/courses" element={<CourseManagementDashboard />} />
        <Route path="/subscriptions" element={<SubscriptionManagement />} />
        {/* user dashboard */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/me" element={<MeManagement />} />
        <Route path="/me/testimony" element={<MyTestimonialManagement />} />
        <Route path="/me/contacts" element={<MyContactManagement />} />
        {/* not found pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// ENHANCED NAVBAR WRAPPER

const EnhancedNavbar = () => {
  const { isLoading } = useContext(AppContext);

  if (isLoading) return null;

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 transition-colors duration-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col xsm:flex-row justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 gap-2 xsm:gap-0">
        {/* Navigation */}
        <div className="w-full xsm:w-auto flex justify-center xsm:justify-start">
          <Navbar />
        </div>
      </div>
    </nav>
  );
};

// MAIN APP COMPONENT

function App() {
  const { isLoading } = useContext(AppContext);

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200">
      <EnhancedNavbar />

      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
      <NotificationToast />
      <OnlineStatusIndicator />
    </div>
  );
}

// ROOT WRAPPER COMPONENT

function RootApp() {
  return (
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  );
}

export default RootApp;
