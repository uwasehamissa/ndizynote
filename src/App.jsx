/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
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

// /* eslint-disable react-hooks/set-state-in-effect */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
// } from "react";
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
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // CONTEXT DEFINITIONS
// // eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext();

// // LOADING COMPONENTS

// const PageLoadingSpinner = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//     <div className="text-center">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4 mx-auto"></div>
//         <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
//       </div>
//       <p className="text-gray-600 text-lg font-medium mt-4 animate-pulse">
//         Loading Amazing Content...
//       </p>
//       <div className="flex justify-center space-x-1 mt-2">
//         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//         <div
//           className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//           style={{ animationDelay: "0.1s" }}
//         ></div>
//         <div
//           className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//           style={{ animationDelay: "0.2s" }}
//         ></div>
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
//             notification.type === "success"
//               ? "bg-green-50 border-green-500 text-green-800"
//               : notification.type === "warning"
//               ? "bg-yellow-50 border-yellow-500 text-yellow-800"
//               : notification.type === "error"
//               ? "bg-red-50 border-red-500 text-red-800"
//               : "bg-blue-50 border-blue-500 text-blue-800"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {notification.type === "success" && (
//                 <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//               )}
//               {notification.type === "warning" && (
//                 <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">!</span>
//                 </div>
//               )}
//               {notification.type === "error" && (
//                 <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✕</span>
//                 </div>
//               )}
//               {notification.type === "info" && (
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
//                 notification.type === "success"
//                   ? "bg-green-500"
//                   : notification.type === "warning"
//                   ? "bg-yellow-500"
//                   : notification.type === "error"
//                   ? "bg-red-500"
//                   : "bg-blue-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
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
//     <div
//       className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
//         onlineStatus
//           ? "translate-y-[-100px] opacity-0"
//           : "translate-y-0 opacity-100"
//       }`}
//     >
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
//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       // Accept duration in ms or as small number in seconds
//       let dur = duration;
//       if (typeof dur === "number" && dur < 1000) {
//         // treat as seconds
//         dur = dur * 1000;
//       }
//       const id = Date.now() + Math.floor(Math.random() * 1000);
//       const notification = { id, message, type, duration: dur };

//       setNotifications((prev) => [...prev, notification]);

//       // Auto remove after duration
//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, dur);

//       return id;
//     },
//     []
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
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
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Online/Offline detection with notifications
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       // treat 3 seconds as 3s, not 3ms
//       addNotification(
//         "Connection restored! You are back online 🌐",
//         "success",
//         3000
//       );
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification(
//         "You are offline. Some features may not work.",
//         "warning",
//         5000
//       );
//     };

//     // Add initial connectivity notification
//     if (!navigator.onLine) {
//       addNotification(
//         "You are currently offline. Some features may be limited.",
//         "warning",
//         5000
//       );
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
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
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // BACK TO TOP COMPONENT

// const BackToTop = () => {
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
//       aria-label="Back to Top"
//     >
//       <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
//         ↑
//       </span>
//     </button>
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
//     <div className="min-h-screen bg-gray-50">
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/users" element={<UserManagement />} />
//         <Route path="/contacts" element={<ContactManagement />} />
//         <Route path="/request" element={<RequestManagement />} />
//         <Route path="/testimony" element={<TestimonialManagement />} />
//         <Route path="/booking" element={<BookingManagement />} />
//         <Route path="/courses" element={<CourseManagementDashboard />} />
//         <Route path="/subscriptions" element={<SubscriptionManagement />} />
//         {/* user dashboard */}
//         <Route path="/user" element={<UserDashboard />} />
//         <Route path="/me" element={<MeManagement />} />
//         <Route path="/me/testimony" element={<MyTestimonialManagement />} />
//         <Route path="/me/contacts" element={<MyContactManagement />} />
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
//     <nav className="w-full bg-white shadow-md border-b border-gray-200 transition-colors duration-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto flex flex-col xsm:flex-row justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 gap-2 xsm:gap-0">
//         {/* Navigation */}
//         <div className="w-full xsm:w-auto flex justify-center xsm:justify-start">
//           <Navbar />
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
//     <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200">
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
//         <App />
//       </AuthProvider>
//     </AppProvider>
//   );
// }

// export default RootApp;

// /* eslint-disable react-hooks/set-state-in-effect */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
// } from "react";
// import { Routes, Route, Navigate, useLocation, NavLink, Outlet, useNavigate } from "react-router-dom";
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
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // CONTEXT DEFINITIONS
// // eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext();

// // LOADING COMPONENTS

// const PageLoadingSpinner = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//     <div className="text-center">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4 mx-auto"></div>
//         <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
//       </div>
//       <p className="text-gray-600 text-lg font-medium mt-4 animate-pulse">
//         Loading Amazing Content...
//       </p>
//       <div className="flex justify-center space-x-1 mt-2">
//         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//         <div
//           className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//           style={{ animationDelay: "0.1s" }}
//         ></div>
//         <div
//           className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//           style={{ animationDelay: "0.2s" }}
//         ></div>
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
//             notification.type === "success"
//               ? "bg-green-50 border-green-500 text-green-800"
//               : notification.type === "warning"
//               ? "bg-yellow-50 border-yellow-500 text-yellow-800"
//               : notification.type === "error"
//               ? "bg-red-50 border-red-500 text-red-800"
//               : "bg-blue-50 border-blue-500 text-blue-800"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {notification.type === "success" && (
//                 <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//               )}
//               {notification.type === "warning" && (
//                 <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">!</span>
//                 </div>
//               )}
//               {notification.type === "error" && (
//                 <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✕</span>
//                 </div>
//               )}
//               {notification.type === "info" && (
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
//                 notification.type === "success"
//                   ? "bg-green-500"
//                   : notification.type === "warning"
//                   ? "bg-yellow-500"
//                   : notification.type === "error"
//                   ? "bg-red-500"
//                   : "bg-blue-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
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
//     <div
//       className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
//         onlineStatus
//           ? "translate-y-[-100px] opacity-0"
//           : "translate-y-0 opacity-100"
//       }`}
//     >
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
//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       // Accept duration in ms or as small number in seconds
//       let dur = duration;
//       if (typeof dur === "number" && dur < 1000) {
//         // treat as seconds
//         dur = dur * 1000;
//       }
//       const id = Date.now() + Math.floor(Math.random() * 1000);
//       const notification = { id, message, type, duration: dur };

//       setNotifications((prev) => [...prev, notification]);

//       // Auto remove after duration
//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, dur);

//       return id;
//     },
//     []
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
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
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Online/Offline detection with notifications
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       // treat 3 seconds as 3s, not 3ms
//       addNotification(
//         "Connection restored! You are back online 🌐",
//         "success",
//         3000
//       );
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification(
//         "You are offline. Some features may not work.",
//         "warning",
//         5000
//       );
//     };

//     // Add initial connectivity notification
//     if (!navigator.onLine) {
//       addNotification(
//         "You are currently offline. Some features may be limited.",
//         "warning",
//         5000
//       );
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
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
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // BACK TO TOP COMPONENT

// const BackToTop = () => {
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
//       aria-label="Back to Top"
//     >
//       <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 font-bold text-xs sm:text-base">
//         ↑
//       </span>
//     </button>
//   );
// };

// // PRIVATE ROUTE COMPONENT

// const PrivateRoute = ({ children, adminOnly = false }) => {
//   const { isAuthenticated, user } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   if (adminOnly && user?.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// // SIDEBAR ICONS COMPONENT (Using Unicode as fallback)
// const SidebarIcons = {
//   dashboard: "📊",
//   users: "👥",
//   contacts: "📞",
//   request: "📋",
//   testimony: "⭐",
//   booking: "📅",
//   courses: "📚",
//   subscriptions: "💎",
//   profile: "👤",
//   logout: "🚪",
//   menu: "☰",
//   close: "✕",
//   bell: "🔔",
//   search: "🔍",
//   chevronRight: "›"
// };

// // DASHBOARD LAYOUT COMPONENT (Combined inside App.jsx)
// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   // Check screen size and set initial state
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const adminRoutes = [
//     {
//       path: "/dashboard",
//       label: "Dashboard",
//       icon: SidebarIcons.dashboard,
//       exact: true
//     },
//     {
//       path: "/dashboard/users",
//       label: "Users Management",
//       icon: SidebarIcons.users
//     },
//     {
//       path: "/dashboard/contacts",
//       label: "Contacts",
//       icon: SidebarIcons.contacts
//     },
//     {
//       path: "/dashboard/request",
//       label: "Requests",
//       icon: SidebarIcons.request
//     },
//     {
//       path: "/dashboard/testimony",
//       label: "Testimonials",
//       icon: SidebarIcons.testimony
//     },
//     {
//       path: "/dashboard/booking",
//       label: "Bookings",
//       icon: SidebarIcons.booking
//     },
//     {
//       path: "/dashboard/courses",
//       label: "Courses",
//       icon: SidebarIcons.courses
//     },
//     {
//       path: "/dashboard/subscriptions",
//       label: "Subscriptions",
//       icon: SidebarIcons.subscriptions
//     },
//   ];

//   const userRoutes = [
//     {
//       path: "/dashboard/user",
//       label: "Dashboard",
//       icon: SidebarIcons.dashboard,
//       exact: true
//     },
//     {
//       path: "/dashboard/me",
//       label: "My Profile",
//       icon: SidebarIcons.profile
//     },
//     {
//       path: "/dashboard/me/testimony",
//       label: "My Testimonials",
//       icon: SidebarIcons.testimony
//     },
//     {
//       path: "/dashboard/me/contacts",
//       label: "My Contacts",
//       icon: SidebarIcons.contacts
//     },
//   ];

//   const routes = user?.role === "admin" ? adminRoutes : userRoutes;

//   // Function to check if a route is active
//   const isRouteActive = (routePath, exact = false) => {
//     if (exact) {
//       return location.pathname === routePath;
//     }
//     return location.pathname.startsWith(routePath);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Mobile Header */}
//       <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="px-4 py-3 flex items-center justify-between">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//             aria-label="Toggle sidebar"
//           >
//             <span className="text-xl">{SidebarIcons.menu}</span>
//           </button>

//           <div className="flex items-center space-x-4">
//             <div className="text-center">
//               <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Ndizi Music
//               </h1>
//               <p className="text-xs text-gray-600 capitalize">{user?.role || "user"}</p>
//             </div>

//             <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
//               {user?.name?.charAt(0) || "U"}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Desktop Header */}
//       <header className="hidden lg:block bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-40">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-6">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Ndizi Music Dashboard
//             </h1>

//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <span className="absolute left-3 top-2.5 text-gray-400">{SidebarIcons.search}</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-6">
//             <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
//               <span className="text-xl">{SidebarIcons.bell}</span>
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             <div className="flex items-center space-x-3">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
//                 <p className="text-xs text-gray-500 capitalize">{user?.role || "user"}</p>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
//                 {user?.name?.charAt(0) || "U"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div className="flex">
//         {/* Sidebar Overlay */}
//         {sidebarOpen && isMobile && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <aside
//           className={`fixed lg:relative top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 transition-all duration-300 ease-in-out transform ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } lg:translate-x-0 w-64 lg:w-72 shadow-2xl`}
//         >
//           <div className="h-full flex flex-col">
//             {/* Sidebar Header */}
//             <div className="p-6 border-b border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                     <span className="text-lg font-bold">NM</span>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                       {user?.role === "admin" ? "Admin Panel" : "My Dashboard"}
//                     </h2>
//                     <p className="text-sm text-gray-400">Ndizi Music Studio</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="lg:hidden text-gray-400 hover:text-white transition-colors"
//                 >
//                   <span className="text-xl">{SidebarIcons.close}</span>
//                 </button>
//               </div>

//               {/* User Info */}
//               <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="font-semibold">
//                       {user?.name?.charAt(0) || "U"}
//                     </span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
//                     <p className="text-xs text-gray-400 capitalize">{user?.role || "user"}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar Menu */}
//             <nav className="flex-1 overflow-y-auto p-4">
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wider text-gray-500 px-3 mb-2">
//                   Navigation
//                 </p>
//                 {routes.map((route) => {
//                   const isActive = isRouteActive(route.path, route.exact);

//                   return (
//                     <NavLink
//                       key={route.path}
//                       to={route.path}
//                       end={route.exact}
//                       onClick={() => {
//                         if (isMobile) {
//                           setSidebarOpen(false);
//                         }
//                       }}
//                       className={`
//                         flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-all duration-200
//                         ${isActive
//                           ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-400 shadow-md"
//                           : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-l-4 hover:border-gray-600"
//                         }
//                       `}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <span className={`text-lg ${isActive ? "text-blue-400" : "text-gray-400"}`}>
//                           {route.icon}
//                         </span>
//                         <span className="font-medium">{route.label}</span>
//                       </div>
//                       {isActive && <span className="text-blue-400">{SidebarIcons.chevronRight}</span>}
//                     </NavLink>
//                   );
//                 })}
//               </div>

//               {/* Logout Button */}
//               <div className="mt-8 px-4">
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-300 hover:text-white hover:bg-red-700/30 rounded-lg border border-red-700/30 transition-all duration-200 hover:scale-[1.02]"
//                 >
//                   <span className="text-lg">{SidebarIcons.logout}</span>
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </nav>

//             {/* Sidebar Footer */}
//             <div className="p-4 border-t border-gray-700">
//               <div className="text-center">
//                 <p className="text-sm text-gray-400">Version 1.0.0</p>
//                 <p className="text-xs text-gray-500 mt-1">© 2024 Ndizi Music</p>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className={`flex-1 transition-all duration-300 ${sidebarOpen && !isMobile ? 'lg:ml-72' : ''}`}>
//           <div className="p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//               {/* Breadcrumb */}
//               <div className="mb-6">
//                 <nav className="flex" aria-label="Breadcrumb">
//                   <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                     <li className="inline-flex items-center">
//                       <NavLink to="/dashboard" className="text-gray-700 hover:text-blue-600">
//                         Dashboard
//                       </NavLink>
//                     </li>
//                     <li>
//                       <div className="flex items-center">
//                         <span className="mx-2 text-gray-400">/</span>
//                         <span className="text-gray-500">
//                           {routes.find(r => isRouteActive(r.path, r.exact))?.label || "Current Page"}
//                         </span>
//                       </div>
//                     </li>
//                   </ol>
//                 </nav>
//               </div>

//               {/* Page Content */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
//                 <Outlet />
//               </div>

//               {/* Dashboard Stats */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
//                   <h3 className="text-lg font-semibold">Welcome Back!</h3>
//                   <p className="text-sm opacity-90 mt-1">You're doing great today</p>
//                 </div>
//                 <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
//                   <h3 className="text-lg font-semibold">Quick Actions</h3>
//                   <p className="text-sm opacity-90 mt-1">Manage your content easily</p>
//                 </div>
//                 <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
//                   <h3 className="text-lg font-semibold">Need Help?</h3>
//                   <p className="text-sm opacity-90 mt-1">Check our documentation</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Mobile sidebar toggle button */}
//       {isMobile && !sidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed bottom-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl lg:hidden animate-pulse"
//         >
//           <span className="text-xl">{SidebarIcons.menu}</span>
//         </button>
//       )}
//     </div>
//   );
// };

// // ENHANCED NAVBAR WRAPPER

// const EnhancedNavbar = () => {
//   const { isLoading } = useContext(AppContext);
//   const location = useLocation();

//   // Hide navbar on dashboard routes
//   if (isLoading || location.pathname.startsWith('/dashboard')) return null;

//   return (
//     <nav className="w-full bg-white shadow-md border-b border-gray-200 transition-colors duration-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto flex flex-col xsm:flex-row justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 gap-2 xsm:gap-0">
//         {/* Navigation */}
//         <div className="w-full xsm:w-auto flex justify-center xsm:justify-start">
//           <Navbar />
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
//     <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200">
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
//           <Route path="/dashboard" element={
//             <PrivateRoute>
//               <DashboardLayout />
//             </PrivateRoute>
//           }>
//             {/* Admin Routes */}
//             <Route index element={
//               <PrivateRoute adminOnly>
//                 <Dashboard />
//               </PrivateRoute>
//             } />
//             <Route path="users" element={
//               <PrivateRoute adminOnly>
//                 <UserManagement />
//               </PrivateRoute>
//             } />
//             <Route path="contacts" element={
//               <PrivateRoute adminOnly>
//                 <ContactManagement />
//               </PrivateRoute>
//             } />
//             <Route path="request" element={
//               <PrivateRoute adminOnly>
//                 <RequestManagement />
//               </PrivateRoute>
//             } />
//             <Route path="testimony" element={
//               <PrivateRoute adminOnly>
//                 <TestimonialManagement />
//               </PrivateRoute>
//             } />
//             <Route path="booking" element={
//               <PrivateRoute adminOnly>
//                 <BookingManagement />
//               </PrivateRoute>
//             } />
//             <Route path="courses" element={
//               <PrivateRoute adminOnly>
//                 <CourseManagementDashboard />
//               </PrivateRoute>
//             } />
//             <Route path="subscriptions" element={
//               <PrivateRoute adminOnly>
//                 <SubscriptionManagement />
//               </PrivateRoute>
//             } />

//             {/* User Routes */}
//             <Route path="user" element={
//               <PrivateRoute>
//                 <UserDashboard />
//               </PrivateRoute>
//             } />
//             <Route path="me" element={
//               <PrivateRoute>
//                 <MeManagement />
//               </PrivateRoute>
//             } />
//             <Route path="me/testimony" element={
//               <PrivateRoute>
//                 <MyTestimonialManagement />
//               </PrivateRoute>
//             } />
//             <Route path="me/contacts" element={
//               <PrivateRoute>
//                 <MyContactManagement />
//               </PrivateRoute>
//             } />

//             {/* Catch-all route for dashboard */}
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Route>

//           {/* 404 Not Found Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       {/* Hide footer on dashboard routes */}
//       {!window.location.pathname.startsWith('/dashboard') && <Footer />}
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
//         <App />
//       </AuthProvider>
//     </AppProvider>
//   );
// }

// export default RootApp;

// /* eslint-disable react-hooks/set-state-in-effect */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";

// // Pages
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";

// // Dashboard Components
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // User Dashboard Components
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";

// // Navigation & UI Components
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";

// // Icons
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import BuildIcon from "@mui/icons-material/Build";
// import SchoolIcon from "@mui/icons-material/School";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ErrorIcon from "@mui/icons-material/Error";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import BookIcon from "@mui/icons-material/Book";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PaymentIcon from "@mui/icons-material/Payment";
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import { Check, Warning } from "@mui/icons-material";

// // CONTEXT DEFINITIONS
// export const AppContext = createContext();
// export const AuthContext = createContext();

// // Custom hook for auth
// export const useAuth = () => useContext(AuthContext);

// // RESPONSIVE UTILITY COMPONENTS
// const ResponsiveContainer = ({
//   children,
//   className = "",
//   fullWidth = false,
//   padding = true,
// }) => {
//   const paddingClass = padding
//     ? "px-3 xsm:px-4 sm:px-5 md:px-6 lg:px-8"
//     : "";

//   if (fullWidth) {
//     return <div className={`w-full ${paddingClass} ${className}`}>{children}</div>;
//   }

//   return (
//     <div
//       className={`w-full mx-auto max-w-7xl ${paddingClass} ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// const ResponsiveText = ({ children, className = "", size = "base" }) => {
//   const sizeClasses = {
//     xs: "text-xs xsm:text-sm",
//     sm: "text-sm xsm:text-base",
//     base: "text-base xsm:text-lg sm:text-xl",
//     lg: "text-lg xsm:text-xl sm:text-2xl md:text-3xl",
//     xl: "text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//     "2xl": "text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
//   };

//   return (
//     <div className={`${sizeClasses[size]} ${className}`}>
//       {children}
//     </div>
//   );
// };

// // ENHANCED BUTTON COMPONENT WITH GRADIENTS
// const GradientButton = ({
//   children,
//   onClick,
//   type = "button",
//   variant = "primary",
//   size = "md",
//   icon: Icon = null,
//   iconPosition = "left",
//   className = "",
//   disabled = false,
//   fullWidth = false,
// }) => {
//   const gradientClasses = {
//     primary: "bg-gradient-to-t from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
//     secondary: "bg-gradient-to-t from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
//     success: "bg-gradient-to-t from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
//     warning: "bg-gradient-to-t from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
//     danger: "bg-gradient-to-t from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
//     info: "bg-gradient-to-t from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
//     dark: "bg-gradient-to-t from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
//     music: "bg-gradient-to-t from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
//   };

//   const sizeClasses = {
//     xs: "px-2 py-1 text-xs",
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//     xl: "px-8 py-4 text-xl",
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         ${gradientClasses[variant]}
//         ${sizeClasses[size]}
//         ${fullWidth ? "w-full" : ""}
//         text-white font-medium rounded-lg
//         shadow-md hover:shadow-lg
//         transition-all duration-300
//         transform hover:-translate-y-0.5
//         active:translate-y-0
//         focus:outline-none focus:ring-2 focus:ring-offset-2
//         ${variant === "primary" ? "focus:ring-blue-500" : ""}
//         ${variant === "secondary" ? "focus:ring-green-500" : ""}
//         ${variant === "music" ? "focus:ring-purple-500" : ""}
//         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
//         ${className}
//       `}
//     >
//       <div className="flex items-center justify-center gap-2">
//         {Icon && iconPosition === "left" && (
//           <Icon className={size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base"} />
//         )}
//         {children}
//         {Icon && iconPosition === "right" && (
//           <Icon className={size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base"} />
//         )}
//       </div>
//     </button>
//   );
// };

// // PAGE TRANSITION COMPONENT
// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{
//         type: "spring",
//         damping: 20,
//         stiffness: 100,
//         duration: 0.3,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // PAGE LOADER COMPONENT
// const PageLoader = ({ pageName = "", routeType = "public" }) => {
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//     about: { displayName: "About", color: "from-green-500 to-teal-500", icon: InfoIcon },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500", icon: BuildIcon },
//     classes: { displayName: "Classes", color: "from-orange-500 to-red-500", icon: SchoolIcon },
//     faq: { displayName: "FAQ", color: "from-yellow-500 to-orange-500", icon: HelpIcon },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//       icon: DashboardIcon,
//       subColors: {
//         admin: "from-purple-600 to-red-600",
//         user: "from-blue-600 to-cyan-600",
//       },
//     },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//   };

//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");
//   let config = pageConfig[normalizedPageName] || pageConfig.default;
//   const Icon = config.icon;

//   let gradientColor = config.color;
//   if (routeType.includes("dashboard") && config.subColors) {
//     const dashType = routeType.includes("admin") ? "admin" : "user";
//     gradientColor = config.subColors[dashType] || config.color;
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-6"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         <div
//           className={`w-16 h-16 xsm:w-20 xsm:h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
//         >
//           <Icon className="text-white text-2xl xsm:text-3xl sm:text-4xl" />
//         </div>
//       </motion.div>

//       <div className="text-center mb-6 max-w-xs xsm:max-w-sm sm:max-w-md">
//         <motion.h2
//           className="text-2xl xsm:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading {config.displayName}
//         </motion.h2>

//         <motion.div
//           className="px-4 py-2 bg-white/50 rounded-lg border border-gray-200 mb-3"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <p className="text-sm xsm:text-base font-medium text-gray-700">
//             Route Type:{" "}
//             <span className="font-bold text-blue-600">
//               {routeType.toUpperCase()}
//             </span>
//           </p>
//         </motion.div>

//         <div className="flex justify-center space-x-1">
//           <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>

//       <div className="w-48 xsm:w-56 sm:w-64 h-1.5 rounded-full overflow-hidden">
//         <motion.div
//           className={`h-full bg-gradient-to-r ${gradientColor}`}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
// const DashboardLayout = ({ children, user, pageTitle }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { setUser } = useAuth();

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Admin Menu Items with gradient buttons
//   const adminMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard",
//           name: "Overview",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "User Management",
//       items: [
//         {
//           path: "/dashboard/users",
//           name: "Users",
//           icon: PeopleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/contacts",
//           name: "Contacts",
//           icon: ContactMailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Content Management",
//       items: [
//         {
//           path: "/dashboard/request",
//           name: "Requests",
//           icon: RequestQuoteIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/testimony",
//           name: "Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/booking",
//           name: "Bookings",
//           icon: CalendarTodayIcon,
//           buttonVariant: "secondary",
//         },
//       ],
//     },
//     {
//       category: "Academic",
//       items: [
//         {
//           path: "/dashboard/courses",
//           name: "Courses",
//           icon: BookIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/subscriptions",
//           name: "Subscriptions",
//           icon: SubscriptionsIcon,
//           buttonVariant: "danger",
//         },
//       ],
//     },
//   ];

//   // User Menu Items with gradient buttons
//   const userMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard/user",
//           name: "My Dashboard",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "My Profile",
//       items: [
//         {
//           path: "/dashboard/me",
//           name: "Profile",
//           icon: AccountCircleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/me/testimony",
//           name: "My Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/me/contacts",
//           name: "My Contacts",
//           icon: EmailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Music",
//       items: [
//         {
//           path: "/dashboard/classes",
//           name: "My Classes",
//           icon: SchoolIcon,
//           buttonVariant: "secondary",
//         },
//         {
//           path: "/dashboard/schedule",
//           name: "Schedule",
//           icon: CalendarMonthIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/payments",
//           name: "Payments",
//           icon: PaymentIcon,
//           buttonVariant: "dark",
//         },
//       ],
//     },
//   ];

//   const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userData");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     if (pageTitle) {
//       document.title = `${pageTitle} | Ndizi Music`;
//     }
//   }, [pageTitle, location.pathname]);

//   // Quick Action Buttons for Dashboard
//   const quickActions = [
//     { label: "Notifications", icon: NotificationsIcon, variant: "primary", count: 3 },
//     { label: "Settings", icon: SettingsIcon, variant: "secondary" },
//     { label: "Help", icon: HelpIcon, variant: "info" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Mobile Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         className={`fixed md:relative h-full bg-white shadow-xl z-40 ${
//           sidebarOpen ? "w-64" : "w-20"
//         } transition-all duration-300 ease-in-out`}
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         <div className="flex flex-col h-full border-r border-gray-200">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-2"
//               >
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-sm" />
//                 </div>
//                 <span className="font-bold text-lg text-gray-800">
//                   Ndizi Music
//                 </span>
//               </motion.div>
//             ) : (
//               <div className="rounded-lg flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-base" />
//                 </div>
//               </div>
//             )}
//             <GradientButton
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               variant="dark"
//               size="xs"
//               icon={sidebarOpen ? ChevronLeftIcon : ChevronRightIcon}
//               className="!p-1"
//             />
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-200">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-lg">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 truncate">
//                     {user?.name || "User"}
//                   </p>
//                   <div className="flex items-center space-x-1">
//                     <GradientButton
//                       variant={user?.role === "admin" ? "danger" : "success"}
//                       size="xs"
//                       className="!px-2 !py-0.5 !text-xs"
//                     >
//                       {user?.role?.toUpperCase() || "USER"}
//                     </GradientButton>
//                     <span className="text-xs text-gray-500">
//                       {user?.email?.split('@')[0]}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-md">
//                 <span className="font-bold text-white text-sm">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions - Only show when sidebar is open */}
//           {sidebarOpen && (
//             <div className="px-4 py-3 border-b border-gray-200">
//               <div className="grid grid-cols-3 gap-2">
//                 {quickActions.map((action, index) => (
//                   <GradientButton
//                     key={index}
//                     variant={action.variant}
//                     size="xs"
//                     icon={action.icon}
//                     className="!p-2"
//                   >
//                     {action.count && (
//                       <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                         {action.count}
//                       </span>
//                     )}
//                   </GradientButton>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-4 px-2">
//               {menuItems.map((category, categoryIndex) => (
//                 <li key={`category-${categoryIndex}-${category.category}`}>
//                   {sidebarOpen && (
//                     <div className="mb-2 px-3">
//                       <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                         {category.category}
//                       </span>
//                       <div className="mt-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     </div>
//                   )}
//                   <ul className="space-y-1">
//                     {category.items.map((item, itemIndex) => {
//                       const Icon = item.icon;
//                       const isActive = item.exact
//                         ? location.pathname === item.path
//                         : location.pathname.startsWith(item.path);

//                       return (
//                         <li key={`${item.path}-${itemIndex}`}>
//                           <Link to={item.path}>
//                             <div className="w-full">
//                               <GradientButton
//                                 variant={isActive ? item.buttonVariant : "dark"}
//                                 size="sm"
//                                 icon={Icon}
//                                 iconPosition="left"
//                                 fullWidth
//                                 className={`
//                                   !justify-start
//                                   ${sidebarOpen ? "" : "!px-2"}
//                                   ${isActive
//                                     ? "shadow-lg transform scale-[1.02]"
//                                     : "opacity-80 hover:opacity-100"
//                                   }
//                                 `}
//                               >
//                                 {sidebarOpen && (
//                                   <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: "auto" }}
//                                     className="ml-2 text-sm font-medium truncate"
//                                   >
//                                     {item.name}
//                                   </motion.span>
//                                 )}
//                               </GradientButton>
//                             </div>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout Button */}
//           <div className="p-4 border-t border-gray-200">
//             <GradientButton
//               onClick={handleLogout}
//               variant="danger"
//               size="md"
//               icon={LogoutIcon}
//               iconPosition="left"
//               fullWidth
//             >
//               {sidebarOpen && "Logout"}
//             </GradientButton>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="bg-white border-b border-gray-200 px-4 xsm:px-6 py-3 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {isMobile && (
//                 <GradientButton
//                   onClick={() => setSidebarOpen(true)}
//                   variant="music"
//                   size="sm"
//                   icon={MenuOpenIcon}
//                   className="!p-2"
//                 />
//               )}
//               <div>
//                 <h1 className="text-lg xsm:text-xl font-bold text-gray-800">
//                   {pageTitle}
//                 </h1>
//                 <p className="text-xs xsm:text-sm text-gray-500">
//                   {location.pathname.replace(/\//g, ' • ')}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3 xsm:space-x-4">
//               <div className="hidden xsm:flex items-center space-x-3">
//                 <GradientButton
//                   variant="info"
//                   size="sm"
//                   icon={NotificationsIcon}
//                   className="relative"
//                 >
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     3
//                   </span>
//                 </GradientButton>
//                 <GradientButton
//                   variant="secondary"
//                   size="sm"
//                   icon={SettingsIcon}
//                 />
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="text-right hidden xsm:block">
//                   <p className="text-sm font-medium text-gray-800">{user?.name}</p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-sm">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 xsm:p-6 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50">
//           <ResponsiveContainer>
//             <div className="space-y-6">{children}</div>
//           </ResponsiveContainer>
//         </main>
//       </div>
//     </div>
//   );
// };

// // PRIVATE ROUTE COMPONENT
// const PrivateRoute = ({ children, requiredRole = null, pageTitle = "" }) => {
//   const { user } = useAuth();

//   // if (!user || !user.token) {
//   //   return <Navigate to="/" replace />;
//   // }

//   if (requiredRole && user.role !== requiredRole) {
//     switch (user.role?.toLowerCase()) {
//       case "admin":
//         return <Navigate to="/dashboard" replace />;
//       case "user":
//         return <Navigate to="/dashboard/user" replace />;
//       default:
//         return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   return (
//     <DashboardLayout user={user} pageTitle={pageTitle}>
//       {children}
//     </DashboardLayout>
//   );
// };

// // NOTIFICATION TOAST COMPONENT
// const NotificationToast = () => {
//   const { notifications, removeNotification } = useContext(AppContext);

//   if (!notifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-3 xsm:right-4 sm:right-6 z-50 space-y-2 max-w-xs xsm:max-w-sm">
//       {notifications.map((notification) => (
//         <motion.div
//           key={notification.id}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           className={`p-3 xsm:p-4 rounded-lg shadow-lg border-l-4 ${
//             notification.type === "success"
//               ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
//               : notification.type === "warning"
//               ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-500"
//               : notification.type === "error"
//               ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
//               : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 xsm:space-x-3">
//               <GradientButton
//                 variant={notification.type}
//                 size="xs"
//                 icon={
//                   notification.type === "success" ? Check :
//                   notification.type === "warning" ? Warning :
//                   notification.type === "error" ? ErrorIcon :
//                   InfoIcon
//                 }
//                 className="!p-1 !w-6 !h-6"
//               />
//               <p className="text-sm xsm:text-base font-medium text-gray-800">
//                 {notification.message}
//               </p>
//             </div>
//             <GradientButton
//               onClick={() => removeNotification(notification.id)}
//               variant="dark"
//               size="xs"
//               className="!p-1 !w-6 !h-6"
//             >
//               ✕
//             </GradientButton>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
//             <div
//               className={`h-1 rounded-full ${
//                 notification.type === "success"
//                   ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                   : notification.type === "warning"
//                   ? "bg-gradient-to-r from-yellow-500 to-orange-500"
//                   : notification.type === "error"
//                   ? "bg-gradient-to-r from-red-500 to-pink-500"
//                   : "bg-gradient-to-r from-blue-500 to-cyan-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
//               }}
//             />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // ONLINE STATUS INDICATOR
// const OnlineStatusIndicator = () => {
//   const { onlineStatus } = useContext(AppContext);

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: onlineStatus ? -100 : 0 }}
//       className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
//     >
//       <GradientButton
//         variant="warning"
//         icon={onlineStatus ? Check : Warning}
//         className="!px-4 !py-2"
//       >
//         <span className="flex items-center space-x-2">
//           <span>{onlineStatus ? "Online" : "Offline"}</span>
//           <span className="text-xs opacity-90">
//             {onlineStatus ? "✓ Connected" : "Limited connectivity"}
//           </span>
//         </span>
//       </GradientButton>
//     </motion.div>
//   );
// };

// // BACK TO TOP COMPONENT
// const BackToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
//       className="fixed bottom-4 right-3 xsm:bottom-6 xsm:right-4 sm:right-6 z-40"
//     >
//       <GradientButton
//         onClick={scrollToTop}
//         variant="music"
//         size="lg"
//         icon={ArrowUpwardIcon}
//         className="!p-3 shadow-xl"
//       />
//     </motion.div>
//   );
// };

// // MOBILE MENU COMPONENT
// const MobileMenu = ({ isOpen, onClose, user }) => {
//   const location = useLocation();

//   const mobileMenuItems = [
//     {
//       path: "/",
//       label: "Home",
//       icon: HomeIcon,
//       buttonVariant: "primary"
//     },
//     {
//       path: "/about",
//       label: "About",
//       icon: InfoIcon,
//       buttonVariant: "info"
//     },
//     {
//       path: "/services",
//       label: "Services",
//       icon: BuildIcon,
//       buttonVariant: "secondary"
//     },
//     {
//       path: "/classes",
//       label: "Classes",
//       icon: SchoolIcon,
//       buttonVariant: "success"
//     },
//     {
//       path: "/faq",
//       label: "FAQ",
//       icon: HelpIcon,
//       buttonVariant: "warning"
//     },
//   ];

//   if (user && user.token) {
//     const dashboardPath =
//       user.role === "admin" ? "/dashboard" : "/dashboard/user";
//     mobileMenuItems.unshift({
//       path: dashboardPath,
//       label: user.role === "admin" ? "Admin Dashboard" : "My Dashboard",
//       icon: DashboardIcon,
//       buttonVariant: "music",
//       type: "private",
//     });
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-purple-50 md:hidden"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Ndizi Music</h2>
//               </div>
//               <GradientButton
//                 onClick={onClose}
//                 variant="danger"
//                 size="sm"
//                 icon={CloseIcon}
//                 className="!p-2"
//               />
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {mobileMenuItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.div
//                     key={`mobile-${item.path}-${index}`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Link to={item.path}>
//                       <GradientButton
//                         variant={isActive ? item.buttonVariant : "dark"}
//                         size="md"
//                         icon={Icon}
//                         iconPosition="left"
//                         fullWidth
//                         className={isActive ? "shadow-lg" : ""}
//                       >
//                         <div className="flex items-center justify-between w-full">
//                           <span>{item.label}</span>
//                           {item.type === "private" && (
//                             <span className="text-xs px-2 py-1 bg-white/20 rounded">
//                               PRIVATE
//                             </span>
//                           )}
//                         </div>
//                       </GradientButton>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {user && user.token && (
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center">
//                       <span className="text-white font-bold text-lg">
//                         {user.name?.charAt(0) || "U"}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-gray-800 font-medium">{user.name}</p>
//                       <GradientButton
//                         variant={user.role === "admin" ? "danger" : "success"}
//                         size="xs"
//                         className="!px-2 !py-0.5 !mt-1"
//                       >
//                         {user.role.toUpperCase()}
//                       </GradientButton>
//                     </div>
//                   </div>
//                   <GradientButton
//                     variant="danger"
//                     size="sm"
//                     icon={LogoutIcon}
//                     onClick={() => {
//                       localStorage.removeItem("authToken");
//                       localStorage.removeItem("userData");
//                       window.location.href = "/";
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // AUTH PROVIDER
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const userData = localStorage.getItem("userData");
//       return token && userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   });

//   const value = useMemo(
//     () => ({
//       user,
//       setUser: (newUser) => {
//         setUser(newUser);
//         if (newUser) {
//           localStorage.setItem("authToken", newUser.token);
//           localStorage.setItem("userData", JSON.stringify(newUser));
//         } else {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userData");
//         }
//       },
//     }),
//     [user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // APP PROVIDER
// const AppProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
//   const location = useLocation();

//   // Add missing icon components
//   const CheckIcon = () => <span>✓</span>;
//   const WarningIcon = () => <span>!</span>;
//   const InfoIcon = () => <span>i</span>;

//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       const id = Date.now() + Math.random();
//       const notification = {
//         id,
//         message,
//         type,
//         duration: duration < 1000 ? duration * 1000 : duration,
//       };

//       setNotifications((prev) => [...prev, notification]);

//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, notification.duration);

//       return id;
//     },
//     []
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   }, []);

//   const clearNotifications = useCallback(() => {
//     setNotifications([]);
//   }, []);

//   // Initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Page loading effect
//   useEffect(() => {
//     if (!isLoading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, isLoading]);

//   // Online/Offline detection
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       addNotification("Connection restored! 🌐", "success", 3000);
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification("You are offline.", "warning", 5000);
//     };

//     if (!navigator.onLine) {
//       addNotification("You are offline.", "warning", 5000);
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, [addNotification]);

//   const value = {
//     isLoading,
//     setIsLoading,
//     pageLoading,
//     setPageLoading,
//     mobileMenuOpen,
//     setMobileMenuOpen,
//     notifications,
//     addNotification,
//     removeNotification,
//     clearNotifications,
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // MAIN APP COMPONENT
// function App() {
//   const { isLoading, pageLoading } = useContext(AppContext);
//   const location = useLocation();

//   const getPageInfo = (pathname) => {
//     const routes = {
//       "/": { name: "home", type: "public" },
//       "/about": { name: "about", type: "public" },
//       "/services": { name: "services", type: "public" },
//       "/classes": { name: "classes", type: "public" },
//       "/faq": { name: "faq", type: "public" },
//       "/dashboard": { name: "dashboard", type: "admin dashboard" },
//       "/dashboard/user": { name: "dashboard", type: "user dashboard" },
//     };

//     return routes[pathname] || { name: "page", type: "public" };
//   };

//   const currentPageInfo = getPageInfo(location.pathname);

//   if (isLoading) {
//     return <PageLoader pageName="app" routeType="loading" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {pageLoading && (
//         <PageLoader
//           pageName={currentPageInfo.name}
//           routeType={currentPageInfo.type}
//         />
//       )}

//       {/* Show navbar and footer only for public routes */}
//       {!location.pathname.includes("/dashboard") ? (
//         <>
//            <Navbar />
//           <main className="min-h-screen">
//             <ResponsiveContainer>
//               <AnimatePresence mode="wait">
//                 <Routes location={location} key={location.pathname}>
//                   <Route
//                     path="/"
//                     element={
//                       <PageTransition>
//                         <Home />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/about"
//                     element={
//                       <PageTransition>
//                         <About />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/services"
//                     element={
//                       <PageTransition>
//                         <Services />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/classes"
//                     element={
//                       <PageTransition>
//                         <Classes />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/faq"
//                     element={
//                       <PageTransition>
//                         <FAQ />
//                       </PageTransition>
//                     }
//                   />
//                   {/* Add login/register routes if needed */}
//                   <Route path="/login" element={<div>Login Page</div>} />
//                   <Route path="/register" element={<div>Register Page</div>} />
//                 </Routes>
//               </AnimatePresence>
//             </ResponsiveContainer>
//           </main>
//           <Footer />
//         </>
//       ) : (
//         <Routes>
//           {/* Dashboard Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Admin Dashboard">
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/users"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="User Management">
//                 <UserManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/contacts"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Contact Management">
//                 <ContactManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/request"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Request Management">
//                 <RequestManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/testimony"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Testimonial Management"
//               >
//                 <TestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/booking"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Booking Management">
//                 <BookingManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/courses"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Course Management">
//                 <CourseManagementDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/subscriptions"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Subscription Management"
//               >
//                 <SubscriptionManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* User Dashboard Routes */}
//           <Route
//             path="/dashboard/user"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Dashboard">
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Profile">
//                 <MeManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/testimony"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Testimonials">
//                 <MyTestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/contacts"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Contacts">
//                 <MyContactManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Route */}
//           <Route
//             path="*"
//             element={
//               <PageTransition>
//                 <NotFound />
//               </PageTransition>
//             }
//           />
//         </Routes>
//       )}

//       <BackToTop />
//       <NotificationToast />
//       <OnlineStatusIndicator />
//     </div>
//   );
// }

// // ROOT APP COMPONENT - ONLY ONE ROUTER HERE
// function RootApp() {
//   return (

//       <AppProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </AppProvider>

//   );
// }

// export default RootApp;
























































































// /* eslint-disable react-hooks/set-state-in-effect */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";
// import Cookies from "js-cookie";

// // Pages
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";

// // Dashboard Components
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // User Dashboard Components
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";

// // Navigation & UI Components
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";

// // Icons
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import BuildIcon from "@mui/icons-material/Build";
// import SchoolIcon from "@mui/icons-material/School";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ErrorIcon from "@mui/icons-material/Error";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import BookIcon from "@mui/icons-material/Book";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PaymentIcon from "@mui/icons-material/Payment";
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import { Check, Warning } from "@mui/icons-material";

// // CONTEXT DEFINITIONS
// export const AppContext = createContext();
// export const AuthContext = createContext();

// // Custom hook for auth
// export const useAuth = () => useContext(AuthContext);

// // RESPONSIVE UTILITY COMPONENTS
// const ResponsiveContainer = ({
//   children,
//   className = "",
//   fullWidth = false,
//   padding = true,
// }) => {
//   const paddingClass = padding ? "px-3 xsm:px-4 sm:px-5 md:px-6 lg:px-8" : "";

//   if (fullWidth) {
//     return (
//       <div className={`w-full ${paddingClass} ${className}`}>{children}</div>
//     );
//   }

//   return (
//     <div className={`w-full mx-auto max-w-7xl ${paddingClass} ${className}`}>
//       {children}
//     </div>
//   );
// };

// const ResponsiveText = ({ children, className = "", size = "base" }) => {
//   const sizeClasses = {
//     xs: "text-xs xsm:text-sm",
//     sm: "text-sm xsm:text-base",
//     base: "text-base xsm:text-lg sm:text-xl",
//     lg: "text-lg xsm:text-xl sm:text-2xl md:text-3xl",
//     xl: "text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//     "2xl": "text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
//   };

//   return <div className={`${sizeClasses[size]} ${className}`}>{children}</div>;
// };

// // ENHANCED BUTTON COMPONENT WITH GRADIENTS
// const GradientButton = ({
//   children,
//   onClick,
//   type = "button",
//   variant = "primary",
//   size = "md",
//   icon: Icon = null,
//   iconPosition = "left",
//   className = "",
//   disabled = false,
//   fullWidth = false,
// }) => {
//   const gradientClasses = {
//     primary:
//       "bg-gradient-to-t from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
//     secondary:
//       "bg-gradient-to-t from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
//     success:
//       "bg-gradient-to-t from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
//     warning:
//       "bg-gradient-to-t from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
//     danger:
//       "bg-gradient-to-t from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
//     info: "bg-gradient-to-t from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
//     dark: "bg-gradient-to-t from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
//     music:
//       "bg-gradient-to-t from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
//   };

//   const sizeClasses = {
//     xs: "px-2 py-1 text-xs",
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//     xl: "px-8 py-4 text-xl",
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         ${gradientClasses[variant]}
//         ${sizeClasses[size]}
//         ${fullWidth ? "w-full" : ""}
//         text-white font-medium rounded-lg
//         shadow-md hover:shadow-lg
//         transition-all duration-300
//         transform hover:-translate-y-0.5
//         active:translate-y-0
//         focus:outline-none focus:ring-2 focus:ring-offset-2
//         ${variant === "primary" ? "focus:ring-blue-500" : ""}
//         ${variant === "secondary" ? "focus:ring-green-500" : ""}
//         ${variant === "music" ? "focus:ring-purple-500" : ""}
//         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
//         ${className}
//       `}
//     >
//       <div className="flex items-center justify-center gap-2">
//         {Icon && iconPosition === "left" && (
//           <Icon
//             className={
//               size === "xs"
//                 ? "text-xs"
//                 : size === "sm"
//                   ? "text-sm"
//                   : "text-base"
//             }
//           />
//         )}
//         {children}
//         {Icon && iconPosition === "right" && (
//           <Icon
//             className={
//               size === "xs"
//                 ? "text-xs"
//                 : size === "sm"
//                   ? "text-sm"
//                   : "text-base"
//             }
//           />
//         )}
//       </div>
//     </button>
//   );
// };

// // PAGE TRANSITION COMPONENT
// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{
//         type: "spring",
//         damping: 20,
//         stiffness: 100,
//         duration: 0.3,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // PAGE LOADER COMPONENT
// const PageLoader = ({ pageName = "", routeType = "public" }) => {
//   const pageConfig = {
//     home: {
//       displayName: "Home",
//       color: "from-blue-500 to-purple-500",
//       icon: HomeIcon,
//     },
//     about: {
//       displayName: "About",
//       color: "from-green-500 to-teal-500",
//       icon: InfoIcon,
//     },
//     services: {
//       displayName: "Services",
//       color: "from-indigo-500 to-pink-500",
//       icon: BuildIcon,
//     },
//     classes: {
//       displayName: "Classes",
//       color: "from-orange-500 to-red-500",
//       icon: SchoolIcon,
//     },
//     faq: {
//       displayName: "FAQ",
//       color: "from-yellow-500 to-orange-500",
//       icon: HelpIcon,
//     },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//       icon: DashboardIcon,
//       subColors: {
//         admin: "from-purple-600 to-red-600",
//         user: "from-blue-600 to-cyan-600",
//       },
//     },
//     default: {
//       displayName: "Page",
//       color: "from-blue-500 to-purple-500",
//       icon: HomeIcon,
//     },
//   };

//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");
//   let config = pageConfig[normalizedPageName] || pageConfig.default;
//   const Icon = config.icon;

//   let gradientColor = config.color;
//   if (routeType.includes("dashboard") && config.subColors) {
//     const dashType = routeType.includes("admin") ? "admin" : "user";
//     gradientColor = config.subColors[dashType] || config.color;
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-6"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         <div
//           className={`w-16 h-16 xsm:w-20 xsm:h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
//         >
//           <Icon className="text-white text-2xl xsm:text-3xl sm:text-4xl" />
//         </div>
//       </motion.div>

//       <div className="text-center mb-6 max-w-xs xsm:max-w-sm sm:max-w-md">
//         <motion.h2
//           className="text-2xl xsm:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading {config.displayName}
//         </motion.h2>

//         <motion.div
//           className="px-4 py-2 bg-white/50 rounded-lg border border-gray-200 mb-3"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <p className="text-sm xsm:text-base font-medium text-gray-700">
//             Route Type:{" "}
//             <span className="font-bold text-blue-600">
//               {routeType.toUpperCase()}
//             </span>
//           </p>
//         </motion.div>

//         <div className="flex justify-center space-x-1">
//           <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>

//       <div className="w-48 xsm:w-56 sm:w-64 h-1.5 rounded-full overflow-hidden">
//         <motion.div
//           className={`h-full bg-gradient-to-r ${gradientColor}`}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
// const DashboardLayout = ({ children, user, pageTitle }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { setUser } = useAuth();

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Admin Menu Items with gradient buttons
//   const adminMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard",
//           name: "Overview",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "User Management",
//       items: [
//         {
//           path: "/dashboard/users",
//           name: "Users",
//           icon: PeopleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/contacts",
//           name: "Contacts",
//           icon: ContactMailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Content Management",
//       items: [
//         {
//           path: "/dashboard/request",
//           name: "Requests",
//           icon: RequestQuoteIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/testimony",
//           name: "Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/booking",
//           name: "Bookings",
//           icon: CalendarTodayIcon,
//           buttonVariant: "secondary",
//         },
//       ],
//     },
//     {
//       category: "Academic",
//       items: [
//         {
//           path: "/dashboard/courses",
//           name: "Courses",
//           icon: BookIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/subscriptions",
//           name: "Subscriptions",
//           icon: SubscriptionsIcon,
//           buttonVariant: "danger",
//         },
//       ],
//     },
//   ];

//   // User Menu Items with gradient buttons
//   const userMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard/user",
//           name: "My Dashboard",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "My Profile",
//       items: [
//         {
//           path: "/dashboard/me",
//           name: "Profile",
//           icon: AccountCircleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/me/testimony",
//           name: "My Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/me/contacts",
//           name: "My Contacts",
//           icon: EmailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Music",
//       items: [
//         {
//           path: "/dashboard/classes",
//           name: "My Classes",
//           icon: SchoolIcon,
//           buttonVariant: "secondary",
//         },
//         {
//           path: "/dashboard/schedule",
//           name: "Schedule",
//           icon: CalendarMonthIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/payments",
//           name: "Payments",
//           icon: PaymentIcon,
//           buttonVariant: "dark",
//         },
//       ],
//     },
//   ];

//   const menuItems = user?.status === "admin" ? adminMenuItems : userMenuItems;

//   const handleLogout = () => {
//     setUser(null);
//     Cookies.remove("user");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     if (pageTitle) {
//       document.title = `${pageTitle} | Ndizi Music`;
//     }
//   }, [pageTitle, location.pathname]);

//   // Quick Action Buttons for Dashboard
//   const quickActions = [
//     {
//       label: "Notifications",
//       icon: NotificationsIcon,
//       variant: "primary",
//       count: 3,
//     },
//     { label: "Settings", icon: SettingsIcon, variant: "secondary" },
//     { label: "Help", icon: HelpIcon, variant: "info" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Mobile Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         className={`fixed md:relative h-full bg-white shadow-xl z-40 ${
//           sidebarOpen ? "w-64" : "w-20"
//         } transition-all duration-300 ease-in-out`}
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         <div className="flex flex-col h-full border-r border-gray-200">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-2"
//               >
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-sm" />
//                 </div>
//                 <span className="font-bold text-lg text-gray-800">
//                   Ndizi Music
//                 </span>
//               </motion.div>
//             ) : (
//               <div className="rounded-lg flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-base" />
//                 </div>
//               </div>
//             )}
//             <GradientButton
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               variant="dark"
//               size="xs"
//               icon={sidebarOpen ? ChevronLeftIcon : ChevronRightIcon}
//               className="!p-1"
//             />
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-200">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-lg">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 truncate">
//                     {user?.name || "User"}
//                   </p>
//                   <div className="flex items-center space-x-1">
//                     <GradientButton
//                       variant={user?.status === "admin" ? "danger" : "success"}
//                       size="xs"
//                       className="!px-2 !py-0.5 !text-xs"
//                     >
//                       {user?.status?.toUpperCase() || "USER"}
//                     </GradientButton>
//                     <span className="text-xs text-gray-500">
//                       {user?.email?.split("@")[0]}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-md">
//                 <span className="font-bold text-white text-sm">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions - Only show when sidebar is open */}
//           {sidebarOpen && (
//             <div className="px-4 py-3 border-b border-gray-200">
//               <div className="grid grid-cols-3 gap-2">
//                 {quickActions.map((action, index) => (
//                   <GradientButton
//                     key={index}
//                     variant={action.variant}
//                     size="xs"
//                     icon={action.icon}
//                     className="!p-2"
//                   >
//                     {action.count && (
//                       <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                         {action.count}
//                       </span>
//                     )}
//                   </GradientButton>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-4 px-2">
//               {menuItems.map((category, categoryIndex) => (
//                 <li key={`category-${categoryIndex}-${category.category}`}>
//                   {sidebarOpen && (
//                     <div className="mb-2 px-3">
//                       <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                         {category.category}
//                       </span>
//                       <div className="mt-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     </div>
//                   )}
//                   <ul className="space-y-1">
//                     {category.items.map((item, itemIndex) => {
//                       const Icon = item.icon;
//                       const isActive = item.exact
//                         ? location.pathname === item.path
//                         : location.pathname.startsWith(item.path);

//                       return (
//                         <li key={`${item.path}-${itemIndex}`}>
//                           <Link to={item.path}>
//                             <div className="w-full">
//                               <GradientButton
//                                 variant={isActive ? item.buttonVariant : "dark"}
//                                 size="sm"
//                                 icon={Icon}
//                                 iconPosition="left"
//                                 fullWidth
//                                 className={`
//                                   !justify-start
//                                   ${sidebarOpen ? "" : "!px-2"}
//                                   ${
//                                     isActive
//                                       ? "shadow-lg transform scale-[1.02]"
//                                       : "opacity-80 hover:opacity-100"
//                                   }
//                                 `}
//                               >
//                                 {sidebarOpen && (
//                                   <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: "auto" }}
//                                     className="ml-2 text-sm font-medium truncate"
//                                   >
//                                     {item.name}
//                                   </motion.span>
//                                 )}
//                               </GradientButton>
//                             </div>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout Button */}
//           <div className="p-4 border-t border-gray-200">
//             <GradientButton
//               onClick={handleLogout}
//               variant="danger"
//               size="md"
//               icon={LogoutIcon}
//               iconPosition="left"
//               fullWidth
//             >
//               {sidebarOpen && "Logout"}
//             </GradientButton>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="bg-white border-b border-gray-200 px-4 xsm:px-6 py-3 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {isMobile && (
//                 <GradientButton
//                   onClick={() => setSidebarOpen(true)}
//                   variant="music"
//                   size="sm"
//                   icon={MenuOpenIcon}
//                   className="!p-2"
//                 />
//               )}
//               <div>
//                 <h1 className="text-lg xsm:text-xl font-bold text-gray-800">
//                   {pageTitle}
//                 </h1>
//                 <p className="text-xs xsm:text-sm text-gray-500">
//                   {location.pathname.replace(/\//g, " • ")}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3 xsm:space-x-4">
//               <div className="hidden xsm:flex items-center space-x-3">
//                 <GradientButton
//                   variant="info"
//                   size="sm"
//                   icon={NotificationsIcon}
//                   className="relative"
//                 >
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     3
//                   </span>
//                 </GradientButton>
//                 <GradientButton
//                   variant="secondary"
//                   size="sm"
//                   icon={SettingsIcon}
//                 />
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="text-right hidden xsm:block">
//                   <p className="text-sm font-medium text-gray-800">
//                     {user?.name}
//                   </p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-sm">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 xsm:p-6 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50">
//           <ResponsiveContainer>
//             <div className="space-y-6">{children}</div>
//           </ResponsiveContainer>
//         </main>
//       </div>
//     </div>
//   );
// };

// // FIXED PRIVATE ROUTE COMPONENT
// const PrivateRoute = ({ children, requiredRole = null, pageTitle = "" }) => {
//   const { user } = useAuth();

//   // Check if user exists first
//   if (!user || !user.status) {
//     return <Navigate to="/" replace />;
//   }

//   // Check if user has the required role
//   if (requiredRole && user.status !== requiredRole) {
//     // Redirect based on user's actual role
//     switch (user.status.toLowerCase()) {
//       case "admin":
//         return <Navigate to="/dashboard" replace />;
//       case "user":
//         return <Navigate to="/dashboard/user" replace />;
//       default:
//         return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   return (
//     <DashboardLayout user={user} pageTitle={pageTitle}>
//       {children}
//     </DashboardLayout>
//   );
// };

// // NOTIFICATION TOAST COMPONENT
// const NotificationToast = () => {
//   const { notifications, removeNotification } = useContext(AppContext);

//   if (!notifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-3 xsm:right-4 sm:right-6 z-50 space-y-2 max-w-xs xsm:max-w-sm">
//       {notifications.map((notification) => (
//         <motion.div
//           key={notification.id}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           className={`p-3 xsm:p-4 rounded-lg shadow-lg border-l-4 ${
//             notification.type === "success"
//               ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
//               : notification.type === "warning"
//                 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-500"
//                 : notification.type === "error"
//                   ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
//                   : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 xsm:space-x-3">
//               <GradientButton
//                 variant={notification.type}
//                 size="xs"
//                 icon={
//                   notification.type === "success"
//                     ? Check
//                     : notification.type === "warning"
//                       ? Warning
//                       : notification.type === "error"
//                         ? ErrorIcon
//                         : InfoIcon
//                 }
//                 className="!p-1 !w-6 !h-6"
//               />
//               <p className="text-sm xsm:text-base font-medium text-gray-800">
//                 {notification.message}
//               </p>
//             </div>
//             <GradientButton
//               onClick={() => removeNotification(notification.id)}
//               variant="dark"
//               size="xs"
//               className="!p-1 !w-6 !h-6"
//             >
//               ✕
//             </GradientButton>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
//             <div
//               className={`h-1 rounded-full ${
//                 notification.type === "success"
//                   ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                   : notification.type === "warning"
//                     ? "bg-gradient-to-r from-yellow-500 to-orange-500"
//                     : notification.type === "error"
//                       ? "bg-gradient-to-r from-red-500 to-pink-500"
//                       : "bg-gradient-to-r from-blue-500 to-cyan-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
//               }}
//             />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // ONLINE STATUS INDICATOR
// const OnlineStatusIndicator = () => {
//   const { onlineStatus } = useContext(AppContext);

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: onlineStatus ? -100 : 0 }}
//       className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
//     >
//       <GradientButton
//         variant="warning"
//         icon={onlineStatus ? Check : Warning}
//         className="!px-4 !py-2"
//       >
//         <span className="flex items-center space-x-2">
//           <span>{onlineStatus ? "Online" : "Offline"}</span>
//           <span className="text-xs opacity-90">
//             {onlineStatus ? "✓ Connected" : "Limited connectivity"}
//           </span>
//         </span>
//       </GradientButton>
//     </motion.div>
//   );
// };

// // BACK TO TOP COMPONENT
// const BackToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
//       className="fixed bottom-4 right-3 xsm:bottom-6 xsm:right-4 sm:right-6 z-40"
//     >
//       <GradientButton
//         onClick={scrollToTop}
//         variant="music"
//         size="lg"
//         icon={ArrowUpwardIcon}
//         className="!p-3 shadow-xl"
//       />
//     </motion.div>
//   );
// };

// // MOBILE MENU COMPONENT
// const MobileMenu = ({ isOpen, onClose, user }) => {
//   const location = useLocation();

//   const mobileMenuItems = [
//     {
//       path: "/",
//       label: "Home",
//       icon: HomeIcon,
//       buttonVariant: "primary",
//     },
//     {
//       path: "/about",
//       label: "About",
//       icon: InfoIcon,
//       buttonVariant: "info",
//     },
//     {
//       path: "/services",
//       label: "Services",
//       icon: BuildIcon,
//       buttonVariant: "secondary",
//     },
//     {
//       path: "/classes",
//       label: "Classes",
//       icon: SchoolIcon,
//       buttonVariant: "success",
//     },
//     {
//       path: "/faq",
//       label: "FAQ",
//       icon: HelpIcon,
//       buttonVariant: "warning",
//     },
//   ];

//   if (user && user.status) {
//     const dashboardPath =
//       user.status === "admin" ? "/dashboard" : "/dashboard/user";
//     mobileMenuItems.unshift({
//       path: dashboardPath,
//       label: user.status === "admin" ? "Admin Dashboard" : "My Dashboard",
//       icon: DashboardIcon,
//       buttonVariant: "music",
//       type: "private",
//     });
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-purple-50 md:hidden"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Ndizi Music</h2>
//               </div>
//               <GradientButton
//                 onClick={onClose}
//                 variant="danger"
//                 size="sm"
//                 icon={CloseIcon}
//                 className="!p-2"
//               />
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {mobileMenuItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.div
//                     key={`mobile-${item.path}-${index}`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Link to={item.path}>
//                       <GradientButton
//                         variant={isActive ? item.buttonVariant : "dark"}
//                         size="md"
//                         icon={Icon}
//                         iconPosition="left"
//                         fullWidth
//                         className={isActive ? "shadow-lg" : ""}
//                       >
//                         <div className="flex items-center justify-between w-full">
//                           <span>{item.label}</span>
//                           {item.type === "private" && (
//                             <span className="text-xs px-2 py-1 bg-white/20 rounded">
//                               PRIVATE
//                             </span>
//                           )}
//                         </div>
//                       </GradientButton>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {user && user.status && (
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center">
//                       <span className="text-white font-bold text-lg">
//                         {user.name?.charAt(0) || "U"}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-gray-800 font-medium">{user.name}</p>
//                       <GradientButton
//                         variant={user.status === "admin" ? "danger" : "success"}
//                         size="xs"
//                         className="!px-2 !py-0.5 !mt-1"
//                       >
//                         {user.status.toUpperCase()}
//                       </GradientButton>
//                     </div>
//                   </div>
//                   <GradientButton
//                     variant="danger"
//                     size="sm"
//                     icon={LogoutIcon}
//                     onClick={() => {
//                       Cookies.remove("user");
//                       window.location.href = "/";
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // AUTH PROVIDER
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const userData = Cookies.get("user");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   });

//   const value = useMemo(
//     () => ({
//       user,
//       setUser: (newUser) => {
//         setUser(newUser);
//         if (newUser) {
//           Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
//         } else {
//           Cookies.remove("user");
//         }
//       },
//     }),
//     [user],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // APP PROVIDER
// const AppProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
//   const location = useLocation();

//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       const id = Date.now() + Math.random();
//       const notification = {
//         id,
//         message,
//         type,
//         duration: duration < 1000 ? duration * 1000 : duration,
//       };

//       setNotifications((prev) => [...prev, notification]);

//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, notification.duration);

//       return id;
//     },
//     [],
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   }, []);

//   const clearNotifications = useCallback(() => {
//     setNotifications([]);
//   }, []);

//   // Initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Page loading effect
//   useEffect(() => {
//     if (!isLoading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, isLoading]);

//   // Online/Offline detection
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       addNotification("Connection restored! 🌐", "success", 3000);
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification("You are offline.", "warning", 5000);
//     };

//     if (!navigator.onLine) {
//       addNotification("You are offline.", "warning", 5000);
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, [addNotification]);

//   const value = {
//     isLoading,
//     setIsLoading,
//     pageLoading,
//     setPageLoading,
//     mobileMenuOpen,
//     setMobileMenuOpen,
//     notifications,
//     addNotification,
//     removeNotification,
//     clearNotifications,
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // Helper function to get page info
// const getPageInfo = (pathname) => {
//   const routes = {
//     "/": { name: "home", type: "public" },
//     "/about": { name: "about", type: "public" },
//     "/services": { name: "services", type: "public" },
//     "/classes": { name: "classes", type: "public" },
//     "/faq": { name: "faq", type: "public" },
//     "/dashboard": { name: "dashboard", type: "admin dashboard" },
//     "/dashboard/user": { name: "dashboard", type: "user dashboard" },
//   };

//   return routes[pathname] || { name: "page", type: "public" };
// };

// // MAIN APP COMPONENT
// function App() {
//   const { isLoading, pageLoading } = useContext(AppContext);
//   const location = useLocation();

//   const currentPageInfo = getPageInfo(location.pathname);

//   if (isLoading) {
//     return <PageLoader pageName="app" routeType="loading" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {pageLoading && (
//         <PageLoader
//           pageName={currentPageInfo.name}
//           routeType={currentPageInfo.type}
//         />
//       )}

//       {/* Show navbar and footer only for public routes */}
//       {!location.pathname.includes("/dashboard") ? (
//         <>
//           <Navbar />
//           <main className="min-h-screen">
//             <ResponsiveContainer>
//               <AnimatePresence mode="wait">
//                 <Routes location={location} key={location.pathname}>
//                   <Route
//                     path="/"
//                     element={
//                       <PageTransition>
//                         <Home />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/about"
//                     element={
//                       <PageTransition>
//                         <About />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/services"
//                     element={
//                       <PageTransition>
//                         <Services />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/classes"
//                     element={
//                       <PageTransition>
//                         <Classes />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/faq"
//                     element={
//                       <PageTransition>
//                         <FAQ />
//                       </PageTransition>
//                     }
//                   />
       
//                 </Routes>
//               </AnimatePresence>
//             </ResponsiveContainer>
//           </main>
//           <Footer />
//         </>
//       ) : (
//         <Routes>
//           {/* Dashboard Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Admin Dashboard">
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/users"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="User Management">
//                 <UserManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/contacts"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Contact Management">
//                 <ContactManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/request"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Request Management">
//                 <RequestManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/testimony"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Testimonial Management"
//               >
//                 <TestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/booking"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Booking Management">
//                 <BookingManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/courses"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Course Management">
//                 <CourseManagementDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/subscriptions"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Subscription Management"
//               >
//                 <SubscriptionManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* User Dashboard Routes */}
//           <Route
//             path="/dashboard/user"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Dashboard">
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Profile">
//                 <MeManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/testimony"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Testimonials">
//                 <MyTestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/contacts"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Contacts">
//                 <MyContactManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Route */}
//           <Route
//             path="*"
//             element={
//               <PageTransition>
//                 <NotFound />
//               </PageTransition>
//             }
//           />
//         </Routes>
//       )}

//       <BackToTop />
//       <NotificationToast />
//       <OnlineStatusIndicator />
//     </div>
//   );
// }

// // ROOT APP COMPONENT
// function RootApp() {
//   return (
//     <AppProvider>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </AppProvider>
//   );
// }

// export default RootApp;












































































// /* eslint-disable react-hooks/set-state-in-effect */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";
// import Cookies from "js-cookie";

// // Pages
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";

// // Dashboard Components
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // User Dashboard Components
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";

// // Navigation & UI Components
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";

// // Icons
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import BuildIcon from "@mui/icons-material/Build";
// import SchoolIcon from "@mui/icons-material/School";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ErrorIcon from "@mui/icons-material/Error";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import BookIcon from "@mui/icons-material/Book";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PaymentIcon from "@mui/icons-material/Payment";
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import { Check, Warning } from "@mui/icons-material";

// // CONTEXT DEFINITIONS
// export const AppContext = createContext();
// export const AuthContext = createContext();

// // Custom hook for auth
// export const useAuth = () => useContext(AuthContext);

// // RESPONSIVE UTILITY COMPONENTS
// const ResponsiveContainer = ({
//   children,
//   className = "",
//   fullWidth = false,
//   padding = true,
// }) => {
//   const paddingClass = padding
//     ? "px-3 xsm:px-4 sm:px-5 md:px-6 lg:px-8"
//     : "";

//   if (fullWidth) {
//     return <div className={`w-full ${paddingClass} ${className}`}>{children}</div>;
//   }

//   return (
//     <div
//       className={`w-full mx-auto max-w-7xl ${paddingClass} ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// const ResponsiveText = ({ children, className = "", size = "base" }) => {
//   const sizeClasses = {
//     xs: "text-xs xsm:text-sm",
//     sm: "text-sm xsm:text-base",
//     base: "text-base xsm:text-lg sm:text-xl",
//     lg: "text-lg xsm:text-xl sm:text-2xl md:text-3xl",
//     xl: "text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//     "2xl": "text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
//   };

//   return (
//     <div className={`${sizeClasses[size]} ${className}`}>
//       {children}
//     </div>
//   );
// };

// // ENHANCED BUTTON COMPONENT WITH GRADIENTS
// const GradientButton = ({
//   children,
//   onClick,
//   type = "button",
//   variant = "primary",
//   size = "md",
//   icon: Icon = null,
//   iconPosition = "left",
//   className = "",
//   disabled = false,
//   fullWidth = false,
// }) => {
//   const gradientClasses = {
//     primary: "bg-gradient-to-t from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
//     secondary: "bg-gradient-to-t from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
//     success: "bg-gradient-to-t from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
//     warning: "bg-gradient-to-t from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
//     danger: "bg-gradient-to-t from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
//     info: "bg-gradient-to-t from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
//     dark: "bg-gradient-to-t from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
//     music: "bg-gradient-to-t from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
//   };

//   const sizeClasses = {
//     xs: "px-2 py-1 text-xs",
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//     xl: "px-8 py-4 text-xl",
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         ${gradientClasses[variant]}
//         ${sizeClasses[size]}
//         ${fullWidth ? "w-full" : ""}
//         text-white font-medium rounded-lg
//         shadow-md hover:shadow-lg
//         transition-all duration-300
//         transform hover:-translate-y-0.5
//         active:translate-y-0
//         focus:outline-none focus:ring-2 focus:ring-offset-2
//         ${variant === "primary" ? "focus:ring-blue-500" : ""}
//         ${variant === "secondary" ? "focus:ring-green-500" : ""}
//         ${variant === "music" ? "focus:ring-purple-500" : ""}
//         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
//         ${className}
//       `}
//     >
//       <div className="flex items-center justify-center gap-2">
//         {Icon && iconPosition === "left" && (
//           <Icon className={size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base"} />
//         )}
//         {children}
//         {Icon && iconPosition === "right" && (
//           <Icon className={size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base"} />
//         )}
//       </div>
//     </button>
//   );
// };

// // PAGE TRANSITION COMPONENT
// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{
//         type: "spring",
//         damping: 20,
//         stiffness: 100,
//         duration: 0.3,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // PAGE LOADER COMPONENT
// const PageLoader = ({ pageName = "", routeType = "public" }) => {
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//     about: { displayName: "About", color: "from-green-500 to-teal-500", icon: InfoIcon },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500", icon: BuildIcon },
//     classes: { displayName: "Classes", color: "from-orange-500 to-red-500", icon: SchoolIcon },
//     faq: { displayName: "FAQ", color: "from-yellow-500 to-orange-500", icon: HelpIcon },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//       icon: DashboardIcon,
//       subColors: {
//         admin: "from-purple-600 to-red-600",
//         user: "from-blue-600 to-cyan-600",
//       },
//     },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//   };

//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");
//   let config = pageConfig[normalizedPageName] || pageConfig.default;
//   const Icon = config.icon;

//   let gradientColor = config.color;
//   if (routeType.includes("dashboard") && config.subColors) {
//     const dashType = routeType.includes("admin") ? "admin" : "user";
//     gradientColor = config.subColors[dashType] || config.color;
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-6"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         <div
//           className={`w-16 h-16 xsm:w-20 xsm:h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
//         >
//           <Icon className="text-white text-2xl xsm:text-3xl sm:text-4xl" />
//         </div>
//       </motion.div>

//       <div className="text-center mb-6 max-w-xs xsm:max-w-sm sm:max-w-md">
//         <motion.h2
//           className="text-2xl xsm:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading {config.displayName}
//         </motion.h2>

//         <motion.div
//           className="px-4 py-2 bg-white/50 rounded-lg border border-gray-200 mb-3"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <p className="text-sm xsm:text-base font-medium text-gray-700">
//             Route Type:{" "}
//             <span className="font-bold text-blue-600">
//               {routeType.toUpperCase()}
//             </span>
//           </p>
//         </motion.div>

//         <div className="flex justify-center space-x-1">
//           <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>

//       <div className="w-48 xsm:w-56 sm:w-64 h-1.5 rounded-full overflow-hidden">
//         <motion.div
//           className={`h-full bg-gradient-to-r ${gradientColor}`}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
// const DashboardLayout = ({ children, user, pageTitle }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { setUser } = useAuth();

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Admin Menu Items with gradient buttons
//   const adminMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard",
//           name: "Overview",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "User Management",
//       items: [
//         {
//           path: "/dashboard/users",
//           name: "Users",
//           icon: PeopleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/contacts",
//           name: "Contacts",
//           icon: ContactMailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Content Management",
//       items: [
//         {
//           path: "/dashboard/request",
//           name: "Requests",
//           icon: RequestQuoteIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/testimony",
//           name: "Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/booking",
//           name: "Bookings",
//           icon: CalendarTodayIcon,
//           buttonVariant: "secondary",
//         },
//       ],
//     },
//     {
//       category: "Academic",
//       items: [
//         {
//           path: "/dashboard/courses",
//           name: "Courses",
//           icon: BookIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/subscriptions",
//           name: "Subscriptions",
//           icon: SubscriptionsIcon,
//           buttonVariant: "danger",
//         },
//       ],
//     },
//   ];

//   // User Menu Items with gradient buttons
//   const userMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard/user",
//           name: "My Dashboard",
//           icon: DashboardIcon,
//           exact: true,
//           buttonVariant: "music",
//         },
//       ],
//     },
//     {
//       category: "My Profile",
//       items: [
//         {
//           path: "/dashboard/me",
//           name: "Profile",
//           icon: AccountCircleIcon,
//           buttonVariant: "primary",
//         },
//         {
//           path: "/dashboard/me/testimony",
//           name: "My Testimonials",
//           icon: RateReviewIcon,
//           buttonVariant: "success",
//         },
//         {
//           path: "/dashboard/me/contacts",
//           name: "My Contacts",
//           icon: EmailIcon,
//           buttonVariant: "info",
//         },
//       ],
//     },
//     {
//       category: "Music",
//       items: [
//         {
//           path: "/dashboard/classes",
//           name: "My Classes",
//           icon: SchoolIcon,
//           buttonVariant: "secondary",
//         },
//         {
//           path: "/dashboard/schedule",
//           name: "Schedule",
//           icon: CalendarMonthIcon,
//           buttonVariant: "warning",
//         },
//         {
//           path: "/dashboard/payments",
//           name: "Payments",
//           icon: PaymentIcon,
//           buttonVariant: "dark",
//         },
//       ],
//     },
//   ];

//   const menuItems = user?.status === "admin" ? adminMenuItems : userMenuItems;

//   const handleLogout = () => {
//     setUser(null);
//     Cookies.remove("user");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     if (pageTitle) {
//       document.title = `${pageTitle} | Ndizi Music`;
//     }
//   }, [pageTitle, location.pathname]);

//   // Quick Action Buttons for Dashboard
//   const quickActions = [
//     { label: "Notifications", icon: NotificationsIcon, variant: "primary", count: 3 },
//     { label: "Settings", icon: SettingsIcon, variant: "secondary" },
//     { label: "Help", icon: HelpIcon, variant: "info" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Mobile Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         className={`fixed md:relative h-full bg-white shadow-xl z-40 ${
//           sidebarOpen ? "w-64" : "w-20"
//         } transition-all duration-300 ease-in-out`}
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         <div className="flex flex-col h-full border-r border-gray-200">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-2"
//               >
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-sm" />
//                 </div>
//                 <span className="font-bold text-lg text-gray-800">
//                   Ndizi Music
//                 </span>
//               </motion.div>
//             ) : (
//               <div className="rounded-lg flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-base" />
//                 </div>
//               </div>
//             )}
//             <GradientButton
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               variant="dark"
//               size="xs"
//               icon={sidebarOpen ? ChevronLeftIcon : ChevronRightIcon}
//               className="!p-1"
//             />
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-200">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-lg">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 truncate">
//                     {user?.name || "User"}
//                   </p>
//                   <div className="flex items-center space-x-1">
//                     <GradientButton
//                       variant={user?.status === "admin" ? "danger" : "success"}
//                       size="xs"
//                       className="!px-2 !py-0.5 !text-xs"
//                     >
//                       {user?.status?.toUpperCase() || "USER"}
//                     </GradientButton>
//                     <span className="text-xs text-gray-500">
//                       {user?.email?.split('@')[0]}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-md">
//                 <span className="font-bold text-white text-sm">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions - Only show when sidebar is open */}
//           {sidebarOpen && (
//             <div className="px-4 py-3 border-b border-gray-200">
//               <div className="grid grid-cols-3 gap-2">
//                 {quickActions.map((action, index) => (
//                   <GradientButton
//                     key={index}
//                     variant={action.variant}
//                     size="xs"
//                     icon={action.icon}
//                     className="!p-2"
//                   >
//                     {action.count && (
//                       <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                         {action.count}
//                       </span>
//                     )}
//                   </GradientButton>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-4 px-2">
//               {menuItems.map((category, categoryIndex) => (
//                 <li key={`category-${categoryIndex}-${category.category}`}>
//                   {sidebarOpen && (
//                     <div className="mb-2 px-3">
//                       <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                         {category.category}
//                       </span>
//                       <div className="mt-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     </div>
//                   )}
//                   <ul className="space-y-1">
//                     {category.items.map((item, itemIndex) => {
//                       const Icon = item.icon;
//                       const isActive = item.exact
//                         ? location.pathname === item.path
//                         : location.pathname.startsWith(item.path);

//                       return (
//                         <li key={`${item.path}-${itemIndex}`}>
//                           <Link to={item.path}>
//                             <div className="w-full">
//                               <GradientButton
//                                 variant={isActive ? item.buttonVariant : "dark"}
//                                 size="sm"
//                                 icon={Icon}
//                                 iconPosition="left"
//                                 fullWidth
//                                 className={`
//                                   !justify-start
//                                   ${sidebarOpen ? "" : "!px-2"}
//                                   ${isActive 
//                                     ? "shadow-lg transform scale-[1.02]" 
//                                     : "opacity-80 hover:opacity-100"
//                                   }
//                                 `}
//                               >
//                                 {sidebarOpen && (
//                                   <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: "auto" }}
//                                     className="ml-2 text-sm font-medium truncate"
//                                   >
//                                     {item.name}
//                                   </motion.span>
//                                 )}
//                               </GradientButton>
//                             </div>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout Button */}
//           <div className="p-4 border-t border-gray-200">
//             <GradientButton
//               onClick={handleLogout}
//               variant="danger"
//               size="md"
//               icon={LogoutIcon}
//               iconPosition="left"
//               fullWidth
//             >
//               {sidebarOpen && "Logout"}
//             </GradientButton>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="bg-white border-b border-gray-200 px-4 xsm:px-6 py-3 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {isMobile && (
//                 <GradientButton
//                   onClick={() => setSidebarOpen(true)}
//                   variant="music"
//                   size="sm"
//                   icon={MenuOpenIcon}
//                   className="!p-2"
//                 />
//               )}
//               <div>
//                 <h1 className="text-lg xsm:text-xl font-bold text-gray-800">
//                   {pageTitle}
//                 </h1>
//                 <p className="text-xs xsm:text-sm text-gray-500">
//                   {location.pathname.replace(/\//g, ' • ')}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3 xsm:space-x-4">
//               <div className="hidden xsm:flex items-center space-x-3">
//                 <GradientButton
//                   variant="info"
//                   size="sm"
//                   icon={NotificationsIcon}
//                   className="relative"
//                 >
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     3
//                   </span>
//                 </GradientButton>
//                 <GradientButton
//                   variant="secondary"
//                   size="sm"
//                   icon={SettingsIcon}
//                 />
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="text-right hidden xsm:block">
//                   <p className="text-sm font-medium text-gray-800">{user?.name}</p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-sm">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 xsm:p-6 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50">
//           <ResponsiveContainer>
//             <div className="space-y-6">{children}</div>
//           </ResponsiveContainer>
//         </main>
//       </div>
//     </div>
//   );
// };

// // FIXED PRIVATE ROUTE COMPONENT
// const PrivateRoute = ({ children, requiredRole = null, pageTitle = "" }) => {
//   const { user } = useAuth();

//   // Check if user exists first
//   if (!user || !user.status) {
//     return <Navigate to="/" replace />;
//   }

//   // Check if user has the required role
//   if (requiredRole && user.status !== requiredRole) {
//     // Redirect based on user's actual role
//     switch (user.status.toLowerCase()) {
//       case "admin":
//         return <Navigate to="/dashboard" replace />;
//       case "user":
//         return <Navigate to="/dashboard/user" replace />;
//       default:
//         return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   return (
//     <DashboardLayout user={user} pageTitle={pageTitle}>
//       {children}
//     </DashboardLayout>
//   );
// };

// // NOTIFICATION TOAST COMPONENT
// const NotificationToast = () => {
//   const { notifications, removeNotification } = useContext(AppContext);

//   if (!notifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-3 xsm:right-4 sm:right-6 z-50 space-y-2 max-w-xs xsm:max-w-sm">
//       {notifications.map((notification) => (
//         <motion.div
//           key={notification.id}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           className={`p-3 xsm:p-4 rounded-lg shadow-lg border-l-4 ${
//             notification.type === "success"
//               ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
//               : notification.type === "warning"
//               ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-500"
//               : notification.type === "error"
//               ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
//               : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 xsm:space-x-3">
//               <GradientButton
//                 variant={notification.type}
//                 size="xs"
//                 icon={
//                   notification.type === "success" ? Check :
//                   notification.type === "warning" ? Warning :
//                   notification.type === "error" ? ErrorIcon :
//                   InfoIcon
//                 }
//                 className="!p-1 !w-6 !h-6"
//               />
//               <p className="text-sm xsm:text-base font-medium text-gray-800">
//                 {notification.message}
//               </p>
//             </div>
//             <GradientButton
//               onClick={() => removeNotification(notification.id)}
//               variant="dark"
//               size="xs"
//               className="!p-1 !w-6 !h-6"
//             >
//               ✕
//             </GradientButton>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
//             <div
//               className={`h-1 rounded-full ${
//                 notification.type === "success"
//                   ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                   : notification.type === "warning"
//                   ? "bg-gradient-to-r from-yellow-500 to-orange-500"
//                   : notification.type === "error"
//                   ? "bg-gradient-to-r from-red-500 to-pink-500"
//                   : "bg-gradient-to-r from-blue-500 to-cyan-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
//               }}
//             />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // ONLINE STATUS INDICATOR
// const OnlineStatusIndicator = () => {
//   const { onlineStatus } = useContext(AppContext);

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: onlineStatus ? -100 : 0 }}
//       className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
//     >
//       <GradientButton
//         variant="warning"
//         icon={onlineStatus ? Check : Warning}
//         className="!px-4 !py-2"
//       >
//         <span className="flex items-center space-x-2">
//           <span>{onlineStatus ? "Online" : "Offline"}</span>
//           <span className="text-xs opacity-90">
//             {onlineStatus ? "✓ Connected" : "Limited connectivity"}
//           </span>
//         </span>
//       </GradientButton>
//     </motion.div>
//   );
// };

// // BACK TO TOP COMPONENT
// const BackToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
//       className="fixed bottom-4 right-3 xsm:bottom-6 xsm:right-4 sm:right-6 z-40"
//     >
//       <GradientButton
//         onClick={scrollToTop}
//         variant="music"
//         size="lg"
//         icon={ArrowUpwardIcon}
//         className="!p-3 shadow-xl"
//       />
//     </motion.div>
//   );
// };

// // MOBILE MENU COMPONENT
// const MobileMenu = ({ isOpen, onClose, user }) => {
//   const location = useLocation();

//   const mobileMenuItems = [
//     { 
//       path: "/", 
//       label: "Home", 
//       icon: HomeIcon,
//       buttonVariant: "primary" 
//     },
//     { 
//       path: "/about", 
//       label: "About", 
//       icon: InfoIcon,
//       buttonVariant: "info" 
//     },
//     { 
//       path: "/services", 
//       label: "Services", 
//       icon: BuildIcon,
//       buttonVariant: "secondary" 
//     },
//     { 
//       path: "/classes", 
//       label: "Classes", 
//       icon: SchoolIcon,
//       buttonVariant: "success" 
//     },
//     { 
//       path: "/faq", 
//       label: "FAQ", 
//       icon: HelpIcon,
//       buttonVariant: "warning" 
//     },
//   ];

//   if (user && user.status) {
//     const dashboardPath =
//       user.status === "admin" ? "/dashboard" : "/dashboard/user";
//     mobileMenuItems.unshift({
//       path: dashboardPath,
//       label: user.status === "admin" ? "Admin Dashboard" : "My Dashboard",
//       icon: DashboardIcon,
//       buttonVariant: "music",
//       type: "private",
//     });
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-purple-50 md:hidden"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Ndizi Music</h2>
//               </div>
//               <GradientButton
//                 onClick={onClose}
//                 variant="danger"
//                 size="sm"
//                 icon={CloseIcon}
//                 className="!p-2"
//               />
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {mobileMenuItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.div
//                     key={`mobile-${item.path}-${index}`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Link to={item.path}>
//                       <GradientButton
//                         variant={isActive ? item.buttonVariant : "dark"}
//                         size="md"
//                         icon={Icon}
//                         iconPosition="left"
//                         fullWidth
//                         className={isActive ? "shadow-lg" : ""}
//                       >
//                         <div className="flex items-center justify-between w-full">
//                           <span>{item.label}</span>
//                           {item.type === "private" && (
//                             <span className="text-xs px-2 py-1 bg-white/20 rounded">
//                               PRIVATE
//                             </span>
//                           )}
//                         </div>
//                       </GradientButton>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {user && user.status && (
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center">
//                       <span className="text-white font-bold text-lg">
//                         {user.name?.charAt(0) || "U"}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-gray-800 font-medium">{user.name}</p>
//                       <GradientButton
//                         variant={user.status === "admin" ? "danger" : "success"}
//                         size="xs"
//                         className="!px-2 !py-0.5 !mt-1"
//                       >
//                         {user.status.toUpperCase()}
//                       </GradientButton>
//                     </div>
//                   </div>
//                   <GradientButton
//                     variant="danger"
//                     size="sm"
//                     icon={LogoutIcon}
//                     onClick={() => {
//                       Cookies.remove("user");
//                       window.location.href = "/";
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // AUTH PROVIDER
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const userData = Cookies.get("user");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   });

//   const value = useMemo(
//     () => ({
//       user,
//       setUser: (newUser) => {
//         setUser(newUser);
//         if (newUser) {
//           Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
//         } else {
//           Cookies.remove("user");
//         }
//       },
//     }),
//     [user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // APP PROVIDER
// const AppProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
//   const location = useLocation();

//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       const id = Date.now() + Math.random();
//       const notification = {
//         id,
//         message,
//         type,
//         duration: duration < 1000 ? duration * 1000 : duration,
//       };

//       setNotifications((prev) => [...prev, notification]);

//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, notification.duration);

//       return id;
//     },
//     []
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   }, []);

//   const clearNotifications = useCallback(() => {
//     setNotifications([]);
//   }, []);

//   // Initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Page loading effect
//   useEffect(() => {
//     if (!isLoading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, isLoading]);

//   // Online/Offline detection
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       addNotification("Connection restored! 🌐", "success", 3000);
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification("You are offline.", "warning", 5000);
//     };

//     if (!navigator.onLine) {
//       addNotification("You are offline.", "warning", 5000);
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, [addNotification]);

//   const value = {
//     isLoading,
//     setIsLoading,
//     pageLoading,
//     setPageLoading,
//     mobileMenuOpen,
//     setMobileMenuOpen,
//     notifications,
//     addNotification,
//     removeNotification,
//     clearNotifications,
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // Helper function to get page info
// const getPageInfo = (pathname) => {
//   const routes = {
//     "/": { name: "home", type: "public" },
//     "/about": { name: "about", type: "public" },
//     "/services": { name: "services", type: "public" },
//     "/classes": { name: "classes", type: "public" },
//     "/faq": { name: "faq", type: "public" },
//     "/dashboard": { name: "dashboard", type: "admin dashboard" },
//     "/dashboard/user": { name: "dashboard", type: "user dashboard" },
//   };

//   return routes[pathname] || { name: "page", type: "public" };
// };

// // MAIN APP COMPONENT
// function App() {
//   const { isLoading, pageLoading } = useContext(AppContext);
//   const location = useLocation();

//   const currentPageInfo = getPageInfo(location.pathname);

//   if (isLoading) {
//     return <PageLoader pageName="app" routeType="loading" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {pageLoading && (
//         <PageLoader
//           pageName={currentPageInfo.name}
//           routeType={currentPageInfo.type}
//         />
//       )}

//       {/* Show navbar and footer only for public routes */}
//       {!location.pathname.includes("/dashboard") ? (
//         <>
//           <Navbar />
//           <main className="min-h-screen">
//             <ResponsiveContainer>
//               <AnimatePresence mode="wait">
//                 <Routes location={location} key={location.pathname}>
//                   <Route
//                     path="/"
//                     element={
//                       <PageTransition>
//                         <Home />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/about"
//                     element={
//                       <PageTransition>
//                         <About />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/services"
//                     element={
//                       <PageTransition>
//                         <Services />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/classes"
//                     element={
//                       <PageTransition>
//                         <Classes />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/faq"
//                     element={
//                       <PageTransition>
//                         <FAQ />
//                       </PageTransition>
//                     }
//                   />
//                   {/* Removed login/register routes */}
//                 </Routes>
//               </AnimatePresence>
//             </ResponsiveContainer>
//           </main>
//           <Footer />
//         </>
//       ) : (
//         <Routes>
//           {/* Dashboard Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               // <PrivateRoute requiredRole="admin" pageTitle="Admin Dashboard">
//                 <Dashboard />
//               // </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/users"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="User Management">
//                 <UserManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/contacts"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Contact Management">
//                 <ContactManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/request"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Request Management">
//                 <RequestManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/testimony"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Testimonial Management"
//               >
//                 <TestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/booking"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Booking Management">
//                 <BookingManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/courses"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Course Management">
//                 <CourseManagementDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/subscriptions"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Subscription Management"
//               >
//                 <SubscriptionManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* User Dashboard Routes */}
//           <Route
//             path="/dashboard/user"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Dashboard">
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Profile">
//                 <MeManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/testimony"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Testimonials">
//                 <MyTestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/contacts"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Contacts">
//                 <MyContactManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Route */}
//           <Route
//             path="*"
//             element={
//               <PageTransition>
//                 <NotFound />
//               </PageTransition>
//             }
//           />
//         </Routes>
//       )}

//       <BackToTop />
//       <NotificationToast />
//       <OnlineStatusIndicator />
//     </div>
//   );
// }

// // ROOT APP COMPONENT
// function RootApp() {
//   return (
   
//       <AppProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </AppProvider>
   
//   );
// }

// export default RootApp;



















































// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-refresh/only-export-components */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
//   useNavigate,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";

// // Pages
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";

// // Dashboard Components
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";

// // User Dashboard Components
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";

// // Navigation & UI Components
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";

// // Icons
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import BuildIcon from "@mui/icons-material/Build";
// import SchoolIcon from "@mui/icons-material/School";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ErrorIcon from "@mui/icons-material/Error";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import BookIcon from "@mui/icons-material/Book";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PaymentIcon from "@mui/icons-material/Payment";
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import { Check, Warning } from "@mui/icons-material";

// // CONTEXT DEFINITIONS
// export const AppContext = createContext();
// export const AuthContext = createContext();

// // Custom hook for auth
// export const useAuth = () => useContext(AuthContext);

// // RESPONSIVE UTILITY COMPONENTS
// const ResponsiveContainer = ({
//   children,
//   className = "",
//   fullWidth = false,
//   padding = true,
// }) => {
//   const paddingClass = padding
//     ? "px-3 xsm:px-4 sm:px-5 md:px-6 lg:px-8"
//     : "";

//   if (fullWidth) {
//     return <div className={`w-full ${paddingClass} ${className}`}>{children}</div>;
//   }

//   return (
//     <div
//       className={`w-full mx-auto max-w-7xl ${paddingClass} ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// const ResponsiveText = ({ children, className = "", size = "base" }) => {
//   const sizeClasses = {
//     xs: "text-xs xsm:text-sm",
//     sm: "text-sm xsm:text-base",
//     base: "text-base xsm:text-lg sm:text-xl",
//     lg: "text-lg xsm:text-xl sm:text-2xl md:text-3xl",
//     xl: "text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//     "2xl": "text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
//   };

//   return (
//     <div className={`${sizeClasses[size]} ${className}`}>
//       {children}
//     </div>
//   );
// };

// // PAGE TRANSITION COMPONENT
// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{
//         type: "spring",
//         damping: 20,
//         stiffness: 100,
//         duration: 0.3,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // PAGE LOADER COMPONENT
// const PageLoader = ({ pageName = "", routeType = "public" }) => {
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//     about: { displayName: "About", color: "from-green-500 to-teal-500", icon: InfoIcon },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500", icon: BuildIcon },
//     classes: { displayName: "Classes", color: "from-orange-500 to-red-500", icon: SchoolIcon },
//     faq: { displayName: "FAQ", color: "from-yellow-500 to-orange-500", icon: HelpIcon },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//       icon: DashboardIcon,
//       subColors: {
//         admin: "from-purple-600 to-red-600",
//         user: "from-blue-600 to-cyan-600",
//       },
//     },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500", icon: HomeIcon },
//   };

//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");
//   let config = pageConfig[normalizedPageName] || pageConfig.default;
//   const Icon = config.icon;

//   let gradientColor = config.color;
//   if (routeType.includes("dashboard") && config.subColors) {
//     const dashType = routeType.includes("admin") ? "admin" : "user";
//     gradientColor = config.subColors[dashType] || config.color;
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-6"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         <div
//           className={`w-16 h-16 xsm:w-20 xsm:h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
//         >
//           <Icon className="text-white text-2xl xsm:text-3xl sm:text-4xl" />
//         </div>
//       </motion.div>

//       <div className="text-center mb-6 max-w-xs xsm:max-w-sm sm:max-w-md">
//         <motion.h2
//           className="text-2xl xsm:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading {config.displayName}
//         </motion.h2>

//         <motion.div
//           className="px-4 py-2 bg-white/50 rounded-lg border border-gray-200 mb-3"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <p className="text-sm xsm:text-base font-medium text-gray-700">
//             Route Type:{" "}
//             <span className="font-bold text-blue-600">
//               {routeType.toUpperCase()}
//             </span>
//           </p>
//         </motion.div>

//         <div className="flex justify-center space-x-1">
//           <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>

//       <div className="w-48 xsm:w-56 sm:w-64 h-1.5 rounded-full overflow-hidden">
//         <motion.div
//           className={`h-full bg-gradient-to-r ${gradientColor}`}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
// const DashboardLayout = ({ children, user, pageTitle }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { setUser } = useAuth();

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Admin Menu Items
//   const adminMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard",
//           name: "Overview",
//           icon: DashboardIcon,
//           exact: true,
//         },
//       ],
//     },
//     {
//       category: "User Management",
//       items: [
//         {
//           path: "/dashboard/users",
//           name: "Users",
//           icon: PeopleIcon,
//         },
//         {
//           path: "/dashboard/contacts",
//           name: "Contacts",
//           icon: ContactMailIcon,
//         },
//       ],
//     },
//     {
//       category: "Content Management",
//       items: [
//         {
//           path: "/dashboard/request",
//           name: "Requests",
//           icon: RequestQuoteIcon,
//         },
//         {
//           path: "/dashboard/testimony",
//           name: "Testimonials",
//           icon: RateReviewIcon,
//         },
//         {
//           path: "/dashboard/booking",
//           name: "Bookings",
//           icon: CalendarTodayIcon,
//         },
//       ],
//     },
//     {
//       category: "Academic",
//       items: [
//         {
//           path: "/dashboard/courses",
//           name: "Courses",
//           icon: BookIcon,
//         },
//         {
//           path: "/dashboard/subscriptions",
//           name: "Subscriptions",
//           icon: SubscriptionsIcon,
//         },
//       ],
//     },
//   ];

//   // User Menu Items
//   const userMenuItems = [
//     {
//       category: "Dashboard",
//       items: [
//         {
//           path: "/dashboard/user",
//           name: "My Dashboard",
//           icon: DashboardIcon,
//           exact: true,
//         },
//       ],
//     },
//     {
//       category: "My Profile",
//       items: [
//         {
//           path: "/dashboard/me",
//           name: "Profile",
//           icon: AccountCircleIcon,
//         },
//         {
//           path: "/dashboard/me/testimony",
//           name: "My Testimonials",
//           icon: RateReviewIcon,
//         },
//         {
//           path: "/dashboard/me/contacts",
//           name: "My Contacts",
//           icon: EmailIcon,
//         },
//       ],
//     },
//     {
//       category: "Music",
//       items: [
//         {
//           path: "/dashboard/classes",
//           name: "My Classes",
//           icon: SchoolIcon,
//         },
//         {
//           path: "/dashboard/schedule",
//           name: "Schedule",
//           icon: CalendarMonthIcon,
//         },
//         {
//           path: "/dashboard/payments",
//           name: "Payments",
//           icon: PaymentIcon,
//         },
//       ],
//     },
//   ];

//   const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userData");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     if (pageTitle) {
//       document.title = `${pageTitle} | Ndizi Music`;
//     }
//   }, [pageTitle, location.pathname]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Mobile Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         className={`fixed md:relative h-full bg-white shadow-xl z-40 ${
//           sidebarOpen ? "w-64" : "w-20"
//         } transition-all duration-300 ease-in-out`}
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         <div className="flex flex-col h-full border-r border-gray-200">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-2"
//               >
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-sm" />
//                 </div>
//                 <span className="font-bold text-lg text-gray-800">
//                   Ndizi Music
//                 </span>
//               </motion.div>
//             ) : (
//               <div className="rounded-lg flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-t from-purple-500 to-indigo-600 flex items-center justify-center">
//                   <MusicNoteIcon className="text-white text-base" />
//                 </div>
//               </div>
//             )}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {sidebarOpen ? (
//                 <ChevronLeftIcon className="text-gray-600" />
//               ) : (
//                 <ChevronRightIcon className="text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-200">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-lg">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 truncate">
//                     {user?.name || "User"}
//                   </p>
//                   <p className="text-xs font-bold text-blue-600 capitalize">
//                     {user?.role || "User"}
//                   </p>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-md">
//                 <span className="font-bold text-white text-sm">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-4 px-2">
//               {menuItems.map((category, categoryIndex) => (
//                 <li key={`category-${categoryIndex}-${category.category}`}>
//                   {sidebarOpen && (
//                     <div className="mb-2 px-3">
//                       <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                         {category.category}
//                       </span>
//                       <div className="mt-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     </div>
//                   )}
//                   <ul className="space-y-1">
//                     {category.items.map((item, itemIndex) => {
//                       const Icon = item.icon;
//                       const isActive = item.exact
//                         ? location.pathname === item.path
//                         : location.pathname.startsWith(item.path);

//                       return (
//                         <li key={`${item.path}-${itemIndex}`}>
//                           <Link to={item.path}>
//                             <button
//                               className={`flex w-full items-center px-3 py-2.5 rounded-lg transition-all ${
//                                 isActive
//                                   ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
//                                   : "hover:bg-gray-50 text-gray-700"
//                               }`}
//                             >
//                               <Icon
//                                 className={`text-lg ${
//                                   isActive ? "text-blue-600" : "text-gray-500"
//                                 }`}
//                               />
//                               {sidebarOpen && (
//                                 <motion.span
//                                   initial={{ opacity: 0, width: 0 }}
//                                   animate={{ opacity: 1, width: "auto" }}
//                                   className="ml-3 text-sm font-medium truncate"
//                                 >
//                                   {item.name}
//                                 </motion.span>
//                               )}
//                             </button>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout Button */}
//           <div className="p-4 border-t border-gray-200">
//             <button
//               onClick={handleLogout}
//               className={`flex items-center w-full px-3 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition-all ${
//                 !sidebarOpen && "justify-center"
//               }`}
//             >
//               <LogoutIcon className="text-lg" />
//               {sidebarOpen && (
//                 <motion.span
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="ml-3 text-sm font-medium"
//                 >
//                   Logout
//                 </motion.span>
//               )}
//             </button>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="bg-white border-b border-gray-200 px-4 xsm:px-6 py-3 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {isMobile && (
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="p-2 rounded-lg hover:bg-gray-100"
//                 >
//                   <MenuOpenIcon className="text-gray-600" />
//                 </button>
//               )}
//               <h1 className="text-lg xsm:text-xl font-bold text-gray-800">
//                 {pageTitle}
//               </h1>
//             </div>
//             <div className="flex items-center space-x-3 xsm:space-x-4">
//               <div className="hidden xsm:flex items-center space-x-2 text-sm text-gray-600">
//                 <span>Welcome,</span>
//                 <span className="font-bold text-blue-600">{user?.name}</span>
//               </div>
//               <div className="w-8 h-8 xsm:w-9 xsm:h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
//                 <span className="font-bold text-white text-sm">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 xsm:p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//           <ResponsiveContainer>
//             <div className="space-y-6">{children}</div>
//           </ResponsiveContainer>
//         </main>
//       </div>
//     </div>
//   );
// };

// // PRIVATE ROUTE COMPONENT - FIXED NULL CHECK
// const PrivateRoute = ({ children, requiredRole = null, pageTitle = "" }) => {
//   const { user } = useAuth();

//   // First check if user exists and has token


//   // Then check if user has role property
//   if (!user.role) {
//     console.warn("User object missing role property:", user);
//     return <Navigate to="/" replace />;
//   }

//   // Then check role permissions if required
//   if (requiredRole && user.role !== requiredRole) {
//     switch (user.role?.toLowerCase()) {
//       case "admin":
//         return <Navigate to="/dashboard" replace />;
//       case "user":
//         return <Navigate to="/dashboard/user" replace />;
//       default:
//         return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   return (
//     <DashboardLayout user={user} pageTitle={pageTitle}>
//       {children}
//     </DashboardLayout>
//   );
// };

// // NOTIFICATION TOAST COMPONENT
// const NotificationToast = () => {
//   const { notifications, removeNotification } = useContext(AppContext);

//   if (!notifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-3 xsm:right-4 sm:right-6 z-50 space-y-2 max-w-xs xsm:max-w-sm">
//       {notifications.map((notification) => (
//         <motion.div
//           key={notification.id}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           className={`p-3 xsm:p-4 rounded-lg shadow-lg border-l-4 ${
//             notification.type === "success"
//               ? "bg-green-50 border-green-500 text-green-800"
//               : notification.type === "warning"
//               ? "bg-yellow-50 border-yellow-500 text-yellow-800"
//               : notification.type === "error"
//               ? "bg-red-50 border-red-500 text-red-800"
//               : "bg-blue-50 border-blue-500 text-blue-800"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 xsm:space-x-3">
//               {notification.type === "success" && (
//                 <div className="w-5 h-5 xsm:w-6 xsm:h-6 bg-green-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs xsm:text-sm">✓</span>
//                 </div>
//               )}
//               {notification.type === "warning" && (
//                 <div className="w-5 h-5 xsm:w-6 xsm:h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs xsm:text-sm">!</span>
//                 </div>
//               )}
//               {notification.type === "error" && (
//                 <div className="w-5 h-5 xsm:w-6 xsm:h-6 bg-red-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs xsm:text-sm">✕</span>
//                 </div>
//               )}
//               {notification.type === "info" && (
//                 <div className="w-5 h-5 xsm:w-6 xsm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs xsm:text-sm">i</span>
//                 </div>
//               )}
//               <p className="text-sm xsm:text-base font-medium">
//                 {notification.message}
//               </p>
//             </div>
//             <button
//               onClick={() => removeNotification(notification.id)}
//               className="ml-2 xsm:ml-4 text-gray-400 hover:text-gray-600 text-lg"
//               aria-label="close notification"
//             >
//               ✕
//             </button>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
//             <div
//               className={`h-1 rounded-full ${
//                 notification.type === "success"
//                   ? "bg-green-500"
//                   : notification.type === "warning"
//                   ? "bg-yellow-500"
//                   : notification.type === "error"
//                   ? "bg-red-500"
//                   : "bg-blue-500"
//               }`}
//               style={{
//                 width: "100%",
//                 animation: `shrink ${notification.duration}ms linear forwards`,
//               }}
//             />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // ONLINE STATUS INDICATOR
// const OnlineStatusIndicator = () => {
//   const { onlineStatus } = useContext(AppContext);

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: onlineStatus ? -100 : 0 }}
//       className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
//     >
//       <div className="bg-yellow-500 text-white px-4 xsm:px-6 py-2 xsm:py-3 rounded-full shadow-lg flex items-center space-x-2 xsm:space-x-3 border-2 border-yellow-300">
//         <div className="w-2 h-2 xsm:w-3 xsm:h-3 bg-white rounded-full animate-ping"></div>
//         <div className="flex items-center space-x-1 xsm:space-x-2">
//           <span className="text-xs xsm:text-sm font-semibold">🔌 Offline</span>
//           <span className="text-xs opacity-90 hidden xsm:inline">
//             Some features limited
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // BACK TO TOP COMPONENT
// const BackToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
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
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       onClick={scrollToTop}
//       className="fixed bottom-4 right-3 xsm:bottom-6 xsm:right-4 sm:right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 xsm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-40"
//       aria-label="Back to Top"
//     >
//       <span className="flex items-center justify-center w-4 h-4 xsm:w-5 xsm:h-5 font-bold">
//         ↑
//       </span>
//     </motion.button>
//   );
// };

// // MOBILE MENU COMPONENT
// const MobileMenu = ({ isOpen, onClose, user }) => {
//   const location = useLocation();

//   const mobileMenuItems = [
//     { path: "/", label: "Home", icon: HomeIcon },
//     { path: "/about", label: "About", icon: InfoIcon },
//     { path: "/services", label: "Services", icon: BuildIcon },
//     { path: "/classes", label: "Classes", icon: SchoolIcon },
//     { path: "/faq", label: "FAQ", icon: HelpIcon },
//   ];

//   if (user && user.token) {
//     const dashboardPath =
//       user.role === "admin" ? "/dashboard" : "/dashboard/user";
//     mobileMenuItems.unshift({
//       path: dashboardPath,
//       label: user.role === "admin" ? "Admin Dashboard" : "My Dashboard",
//       icon: DashboardIcon,
//       type: "private",
//     });
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-50 bg-white md:hidden"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800">Menu</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//                 aria-label="Close menu"
//               >
//                 <CloseIcon className="text-gray-600" />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {mobileMenuItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.a
//                     key={`mobile-${item.path}-${index}`}
//                     href={item.path}
//                     className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
//                         : "hover:bg-gray-50 text-gray-700"
//                     }`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Icon className="text-lg" />
//                     <span className="flex-1 text-base font-medium">
//                       {item.label}
//                     </span>
//                     {item.type === "private" && (
//                       <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
//                         PRIVATE
//                       </span>
//                     )}
//                   </motion.a>
//                 );
//               })}
//             </div>

//             {user && user.token && (
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//                     <span className="text-white font-bold">
//                       {user.name?.charAt(0) || "U"}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 font-medium">{user.name}</p>
//                     <p className="text-sm text-gray-600 capitalize">
//                       {user.role}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // AUTH PROVIDER - FIXED WITH BETTER INITIAL STATE
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const userData = localStorage.getItem("userData");
//       if (token && userData) {
//         const parsedUser = JSON.parse(userData);
//         // Ensure user has required properties
//         return {
//           ...parsedUser,
//           token,
//           role: parsedUser.role || "user",
//           name: parsedUser.name || "User"
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   });

//   const value = useMemo(
//     () => ({
//       user,
//       setUser: (newUser) => {
//         if (newUser) {
//           // Ensure user object has all required properties
//           const completeUser = {
//             ...newUser,
//             role: newUser.role || "user",
//             token: newUser.token || Date.now().toString(),
//             name: newUser.name || "User"
//           };
//           setUser(completeUser);
//           localStorage.setItem("authToken", completeUser.token);
//           localStorage.setItem("userData", JSON.stringify(completeUser));
//         } else {
//           setUser(null);
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userData");
//         }
//       },
//       // Helper function to login (call this after successful signup)
//       login: (userData) => {
//         const completeUser = {
//           ...userData,
//           role: userData.role || "user",
//           token: userData.token || Date.now().toString(),
//           name: userData.name || "User"
//         };
//         setUser(completeUser);
//         localStorage.setItem("authToken", completeUser.token);
//         localStorage.setItem("userData", JSON.stringify(completeUser));
//       }
//     }),
//     [user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // APP PROVIDER
// const AppProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
//   const location = useLocation();

//   const addNotification = useCallback(
//     (message, type = "info", duration = 5000) => {
//       const id = Date.now() + Math.random();
//       const notification = {
//         id,
//         message,
//         type,
//         duration: duration < 1000 ? duration * 1000 : duration,
//       };

//       setNotifications((prev) => [...prev, notification]);

//       setTimeout(() => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       }, notification.duration);

//       return id;
//     },
//     []
//   );

//   const removeNotification = useCallback((id) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   }, []);

//   const clearNotifications = useCallback(() => {
//     setNotifications([]);
//   }, []);

//   // Initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       addNotification("Welcome to Ndizi Music! 🎵", "success", 4000);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   // Page loading effect
//   useEffect(() => {
//     if (!isLoading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, isLoading]);

//   // Online/Offline detection
//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineStatus(true);
//       addNotification("Connection restored! 🌐", "success", 3000);
//     };

//     const handleOffline = () => {
//       setOnlineStatus(false);
//       addNotification("You are offline.", "warning", 5000);
//     };

//     if (!navigator.onLine) {
//       addNotification("You are offline.", "warning", 5000);
//     }

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, [addNotification]);

//   const value = {
//     isLoading,
//     setIsLoading,
//     pageLoading,
//     setPageLoading,
//     mobileMenuOpen,
//     setMobileMenuOpen,
//     notifications,
//     addNotification,
//     removeNotification,
//     clearNotifications,
//     onlineStatus,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };



// // MAIN APP COMPONENT
// function App() {
//   const { isLoading, pageLoading } = useContext(AppContext);
//   const location = useLocation();

//   const getPageInfo = (pathname) => {
//     const routes = {
//       "/": { name: "home", type: "public" },
//       "/about": { name: "about", type: "public" },
//       "/services": { name: "services", type: "public" },
//       "/classes": { name: "classes", type: "public" },
//       "/faq": { name: "faq", type: "public" },
//       "/dashboard": { name: "dashboard", type: "admin dashboard" },
//       "/dashboard/user": { name: "dashboard", type: "user dashboard" },
//     };

//     return routes[pathname] || { name: "page", type: "public" };
//   };

//   const currentPageInfo = getPageInfo(location.pathname);

//   if (isLoading) {
//     return <PageLoader pageName="app" routeType="loading" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {pageLoading && (
//         <PageLoader
//           pageName={currentPageInfo.name}
//           routeType={currentPageInfo.type}
//         />
//       )}

//       {/* Show navbar and footer only for public routes */}
//       {!location.pathname.includes("/dashboard") ? (
//         <>
//           <Navbar />
//           <main className="min-h-screen">
//             <ResponsiveContainer>
//               <AnimatePresence mode="wait">
//                 <Routes location={location} key={location.pathname}>
//                   <Route
//                     path="/"
//                     element={
//                       <PageTransition>
//                         {/* Pass handleLogin function to Home component if needed */}
//                         <Home />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/about"
//                     element={
//                       <PageTransition>
//                         <About />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/services"
//                     element={
//                       <PageTransition>
//                         <Services />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/classes"
//                     element={
//                       <PageTransition>
//                         <Classes />
//                       </PageTransition>
//                     }
//                   />
//                   <Route
//                     path="/faq"
//                     element={
//                       <PageTransition>
//                         <FAQ />
//                       </PageTransition>
//                     }
//                   />
//                   {/* Login/Register routes removed as requested */}
//                 </Routes>
//               </AnimatePresence>
//             </ResponsiveContainer>
//           </main>
//           <Footer />
//         </>
//       ) : (
//         <Routes>
//           {/* Dashboard Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Admin Dashboard">
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/users"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="User Management">
//                 <UserManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/contacts"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Contact Management">
//                 <ContactManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/request"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Request Management">
//                 <RequestManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/testimony"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Testimonial Management"
//               >
//                 <TestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/booking"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Booking Management">
//                 <BookingManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/courses"
//             element={
//               <PrivateRoute requiredRole="admin" pageTitle="Course Management">
//                 <CourseManagementDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/subscriptions"
//             element={
//               <PrivateRoute
//                 requiredRole="admin"
//                 pageTitle="Subscription Management"
//               >
//                 <SubscriptionManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* User Dashboard Routes */}
//           <Route
//             path="/dashboard/user"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Dashboard">
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Profile">
//                 <MeManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/testimony"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Testimonials">
//                 <MyTestimonialManagement />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/dashboard/me/contacts"
//             element={
//               <PrivateRoute requiredRole="user" pageTitle="My Contacts">
//                 <MyContactManagement />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Route */}
//           <Route
//             path="*"
//             element={
//               <PageTransition>
//                 <NotFound />
//               </PageTransition>
//             }
//           />
//         </Routes>
//       )}

//       <BackToTop />
//       <NotificationToast />
//       <OnlineStatusIndicator />
//     </div>
//   );
// }

// // ROOT APP COMPONENT
// function RootApp() {
//   return (
   
//       <AppProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </AppProvider>
  
//   );
// }

// export default RootApp;

































































/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Cookies from "js-cookie";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Classes } from "./pages/classes/Classes";
import { NotFound } from "./pages/notfound/Notfound";
import { FAQ } from "./pages/faq/Faq";
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";
import { UserDashboard } from "./components/dashboard/users/UserDashboard";
import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";
import { Navbar } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { ArrowUpward, Home as HomeIcon, Info, Article, Build, Dashboard as DashboardIcon, Error, Menu, Close, People, ContactMail, School, Hotel, AirportShuttle, RateReview, Description, Book, CalendarToday, Logout, ChevronLeft, ChevronRight, MenuOpen, Subscript, Subscriptions, MailLock, Help, AccountCircle, Email, CalendarMonth, Payment, RequestQuote } from "@mui/icons-material";

// AUTH CONTEXT for managing authentication state
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// RESPONSIVE CONTAINER COMPONENT - REMOVED ALL PADDING
const ResponsiveContainer = ({
  children,
  className = "",
  fullWidth = false,
}) => {
  if (fullWidth) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`w-full mx-auto max-w-7xl ${className}`}>{children}</div>
  );
};

// RESPONSIVE UTILITY COMPONENTS
const ResponsiveText = ({ children, className = "", size = "base" }) => {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl md:text-2xl",
    xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  };

  return <div className={`${sizeClasses[size]} ${className}`}>{children}</div>;
};

// PAGE TRANSITION COMPONENT - APPLIES TO EVERY PAGE
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

// DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
const DashboardLayout = ({ children, user, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { setUser } = useAuth();

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ADMIN DASHBOARD MENU ITEMS
  const adminMenuItems = [
    {
      category: "Dashboard",
      items: [
        {
          path: "/dashboard",
          name: "Overview",
          icon: DashboardIcon,
          exact: true,
        },
      ],
    },
    {
      category: "User Management",
      items: [
        {
          path: "/dashboard/users",
          name: "Users",
          icon: People,
        },
        {
          path: "/dashboard/contacts",
          name: "Contacts",
          icon: ContactMail,
        },
      ],
    },
    {
      category: "Content Management",
      items: [
        {
          path: "/dashboard/request",
          name: "Requests",
          icon: RequestQuote,
        },
        {
          path: "/dashboard/testimony",
          name: "Testimonials",
          icon: RateReview,
        },
        {
          path: "/dashboard/booking",
          name: "Bookings",
          icon: CalendarToday,
        },
      ],
    },
    {
      category: "Academic",
      items: [
        {
          path: "/dashboard/courses",
          name: "Courses",
          icon: Book,
        },
        {
          path: "/dashboard/subscriptions",
          name: "Subscriptions",
          icon: Subscriptions,
        },
      ],
    },
  ];

  // USER DASHBOARD MENU ITEMS
  const userMenuItems = [
    {
      category: "Dashboard",
      items: [
        {
          path: "/dashboard/user",
          name: "My Dashboard",
          icon: DashboardIcon,
          exact: true,
        },
      ],
    },
    {
      category: "My Profile",
      items: [
        {
          path: "/dashboard/me",
          name: "Profile",
          icon: AccountCircle,
        },
        {
          path: "/dashboard/me/testimony",
          name: "My Testimonials",
          icon: RateReview,
        },
        {
          path: "/dashboard/me/contacts",
          name: "My Contacts",
          icon: Email,
        },
      ],
    },
    {
      category: "Music",
      items: [
        {
          path: "/dashboard/classes",
          name: "My Classes",
          icon: School,
        },
        {
          path: "/dashboard/schedule",
          name: "Schedule",
          icon: CalendarMonth,
        },
        {
          path: "/dashboard/payments",
          name: "Payments",
          icon: Payment,
        },
      ],
    },
  ];

  // Get menu based on user status (admin or user)
  const menuItems = user?.status === "admin" ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("user");
    window.location.href = "/";
  };

  // Set page title on mount and route change
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | Ruziga Consult`;
    }
  }, [pageTitle, location.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-t from-[#102a58] to-[#0c2658]">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:relative h-full bg-gradient-to-t from-[#102a58] to-[#0c2658] text-white z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out`}
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-blue-700 flex items-center justify-between">
            {sidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <span className="font-bold text-sm">Dashboard</span>
              </motion.div>
            ) : (
              <div className=" rounded-lg flex items-center justify-center"></div>
            )}
            <div
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg bg-gradient-to-t from-blue-500 to-indigo-500 transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="text-sm" />
              ) : (
                <ChevronRight className="text-sm" />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-blue-700">
            {sidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="font-bold text-white">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user?.name}</p>
                  <p className="text-xs font-bold text-blue-700 capitalize">
                    {user?.status}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mx-auto">
                <span className="font-bold text-white text-xs">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-6 px-2">
              {menuItems.map((category, categoryIndex) => (
                <li key={`category-${categoryIndex}-${category.category}`}>
                  {/* Category Header (only shown when sidebar is open) */}
                  {sidebarOpen && (
                    <div className="mb-2 px-3">
                      <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                        {category.category}
                      </span>
                      <div className="mt-1 h-px bg-blue-700/50"></div>
                    </div>
                  )}

                  {/* Menu Items */}
                  <ul className="space-y-1">
                    {category.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      const isActive = item.exact
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);

                      return (
                        <li key={`${item.path}-${itemIndex}`}>
                          <Link to={item.path}>
                            <button
                              className={`flex w-full items-center px-3 py-2.5 rounded-lg my-4 transition-all ${
                                isActive
                                  ? "bg-blue-800 text-white shadow-md"
                                  : "hover:bg-blue-800/50 text-blue-100"
                              }`}
                            >
                              <Icon className="text-lg" />
                              {sidebarOpen && (
                                <motion.span
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: "auto" }}
                                  className="ml-3 text-sm font-medium truncate"
                                >
                                  {item.name}
                                </motion.span>
                              )}
                            </button>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-blue-700">
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center w-full px-3 py-2.5 rounded-lg bg-gradient-to-t from-red-600 to-red-400  text-white transition-colors ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <Logout className="text-lg" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 text-sm font-medium"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg bg-gradient-to-t from-blue-400 to-indigo-400 transition-colors"
                >
                  <MenuOpen />
                </button>
              )}
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <span>Welcome back,</span>
                <span className="font-bold text-blue-600">
                  {user?.name}
                </span>
              </div>
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                  <span className="font-bold text-white text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-t from-[#102a58] to-[#0c2658]">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

// PRIVATE ROUTE COMPONENT WITH STATUS-BASED NAVIGATION
const PrivateRoute = ({ children, requiredStatus = null, pageTitle = "" }) => {
  const { user } = useAuth();

  // If user is not authenticated, redirect to home
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  // If status is required but user doesn't have it, redirect to appropriate dashboard
  if (requiredStatus && user.status !== requiredStatus) {
    if (user.status === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard/user" replace />;
    }
  }

  return (
    <DashboardLayout user={user} pageTitle={pageTitle}>
      {children}
    </DashboardLayout>
  );
};

// Dashboard route configurations
const dashboardRoutes = [
  // Admin dashboard routes
  {
    path: "/dashboard",
    name: "Dashboard Overview",
    element: <Dashboard />,
    icon: DashboardIcon,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/users",
    name: "User Management",
    element: <UserManagement />,
    icon: People,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/contacts",
    name: "Contact Management",
    element: <ContactManagement />,
    icon: ContactMail,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/request",
    name: "Request Management",
    element: <RequestManagement />,
    icon: RequestQuote,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/testimony",
    name: "Testimony Management",
    element: <TestimonialManagement />,
    icon: RateReview,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/booking",
    name: "Booking Management",
    element: <BookingManagement />,
    icon: CalendarToday,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/courses",
    name: "Course Management",
    element: <CourseManagementDashboard />,
    icon: Book,
    requiredStatus: "admin",
    userStatus: "admin",
  },
  {
    path: "/dashboard/subscriptions",
    name: "Subscription Management",
    element: <SubscriptionManagement />,
    icon: Subscriptions,
    requiredStatus: "admin",
    userStatus: "admin",
  },

  // User dashboard routes
  {
    path: "/dashboard/user",
    name: "User Dashboard",
    element: <UserDashboard />,
    icon: DashboardIcon,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/me",
    name: "My Profile",
    element: <MeManagement />,
    icon: AccountCircle,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/me/testimony",
    name: "My Testimonials",
    element: <MyTestimonialManagement />,
    icon: RateReview,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/me/contacts",
    name: "My Contacts",
    element: <MyContactManagement />,
    icon: Email,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/classes",
    name: "My Classes",
    element: <Classes />,
    icon: School,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/schedule",
    name: "My Schedule",
    element: <Classes />,
    icon: CalendarMonth,
    requiredStatus: "user",
    userStatus: "user",
  },
  {
    path: "/dashboard/payments",
    name: "My Payments",
    element: <Classes />,
    icon: Payment,
    requiredStatus: "user",
    userStatus: "user",
  },
];

// Public route configurations
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/classes", element: <Classes /> },
  { path: "/faq", element: <FAQ /> },
  { path: "*", element: <NotFound /> },
];

// ENHANCED PAGE LOADER COMPONENT
const PageLoader = ({
  pageName = "",
  routeName = "",
  icon: Icon = null,
  routeType = "public",
}) => {
  // Map page names to display names and colors
  const pageConfig = {
    home: { displayName: "Home", color: "from-blue-500 to-purple-500" },
    about: { displayName: "About", color: "from-green-500 to-teal-500" },
    services: { displayName: "Services", color: "from-indigo-500 to-pink-500" },
    classes: { displayName: "Classes", color: "from-purple-500 to-indigo-500" },
    faq: { displayName: "FAQ", color: "from-orange-500 to-red-500" },
    dashboard: {
      displayName: "Dashboard",
      color: "from-purple-500 to-blue-500",
      subColors: {
        admin: "from-purple-600 to-red-600",
        user: "from-blue-600 to-cyan-600",
      },
    },
    default: { displayName: "Page", color: "from-blue-500 to-purple-500" },
  };

  // Normalize the page name
  const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");

  let config = pageConfig["default"];
  if (pageConfig[normalizedPageName]) {
    config = pageConfig[normalizedPageName];
  } else {
    const matchedKey = Object.keys(pageConfig).find(
      (key) =>
        normalizedPageName.includes(key) || pageName.toLowerCase().includes(key)
    );
    if (matchedKey) config = pageConfig[matchedKey];
  }

  // For dashboard routes, use specific colors
  let gradientColor = config.color;
  if (routeType.includes("dashboard") && config.subColors) {
    const dashType = routeType.includes("admin")
      ? "admin"
      : "user";
    gradientColor = config.subColors[dashType] || config.color;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-t from-[#102a58] to-[#0c2658] z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative mb-3 sm:mb-4 md:mb-6 lg:mb-8"
        initial={{ scale: 0.5, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        {Icon ? (
          <motion.div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            <Icon
              className={`bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
            />
          </motion.div>
        ) : (
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
          >
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
              {config.displayName.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      <div className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading {config.displayName}
        </motion.h2>

        {/* Display route info */}
        <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
          <motion.div
            className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-100">
              Route: <span className="font-bold text-white">{routeName}</span>
            </p>
          </motion.div>

          <motion.div
            className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg border ${
              routeType.includes("private") || routeType.includes("dashboard")
                ? "bg-red-50/50 border-red-200"
                : "bg-green-50/50 border-green-200"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-700">
              Type:{" "}
              <span
                className={`font-bold ${
                  routeType.includes("private") ||
                  routeType.includes("dashboard")
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {routeType.toUpperCase()}
              </span>
            </p>
          </motion.div>
        </div>

      </div>

      <div className="w-40 sm:w-48 md:w-56 lg:w-64 h-1 sm:h-1.5 md:h-2 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradientColor}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

// Helper function to get page info and route type
const getPageInfoHelper = (pathname) => {
  // Check public routes
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  if (publicRoute) {
    // Extract name from path
    const name = pathname === "/" ? "Home" : pathname.replace("/", "");
    return {
      name: name.toLowerCase(),
      icon: DashboardIcon,
      routeType: "public",
      fullName: name,
    };
  }

  // Check dashboard routes
  const dashboardRoute = dashboardRoutes.find(
    (route) => route.path === pathname
  );
  if (dashboardRoute) {
    return {
      name: dashboardRoute.name.toLowerCase().split(" ")[0],
      icon: dashboardRoute.icon,
      routeType: `${dashboardRoute.userStatus} dashboard`,
      fullName: dashboardRoute.name,
    };
  }

  return {
    name: "404",
    icon: Error,
    routeType: "public",
    fullName: "Not Found",
  };
};

// RESPONSIVE MOBILE MENU (For Small Screens)
function MobileMenu({ isOpen, onClose, user }) {
  const location = useLocation();

  // Simple mobile menu items for public pages
  const mobileMenuItems = [
    { path: "/", label: "Home", icon: HomeIcon, type: "public" },
    { path: "/about", label: "About", icon: Info, type: "public" },
    { path: "/services", label: "Services", icon: Build, type: "public" },
    { path: "/classes", label: "Classes", icon: School, type: "public" },
    { path: "/faq", label: "FAQ", icon: Help, type: "public" },
  ];

  // Add dashboard links if user is authenticated
  if (user && user.token) {
    let dashboardItem;
    if (user.status === "admin") {
      dashboardItem = {
        path: "/dashboard",
        label: "Admin Dashboard",
        icon: DashboardIcon,
        type: "private",
      };
    } else {
      dashboardItem = {
        path: "/dashboard/user",
        label: "My Dashboard",
        icon: DashboardIcon,
        type: "private",
      };
    }

    if (dashboardItem) {
      mobileMenuItems.unshift(dashboardItem);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 z-40 bg-gradient-to-t from-[#102a58] to-[#0c2658] md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
              <ResponsiveText size="lg" className="font-bold text-white">
                Menu
              </ResponsiveText>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-t from-red-500 to-red-600 text-white"
                aria-label="Close menu"
              >
                <Close className="text-base sm:text-lg" />
              </button>
            </div>

            <div className="flex-1 space-y-1.5 sm:space-y-2 md:space-y-4">
              {mobileMenuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.a
                    key={`mobile-${item.path}-${index}`}
                    href={item.path}
                    className={`flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/25 shadow-lg backdrop-blur-sm text-white"
                        : "hover:bg-white/15 text-gray-200 hover:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                    onClick={onClose}
                  >
                    <Icon className="text-base sm:text-lg" />
                    <ResponsiveText size="sm" className="flex-1">
                      {item.label}
                    </ResponsiveText>
                    <span
                      className={`text-xs px-1 sm:px-1.5 py-0.5 rounded ${
                        item.type === "private"
                          ? "bg-red-500/20 text-red-200 border border-red-500/30"
                          : "bg-green-500/20 text-green-200 border border-green-500/30"
                      }`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-3 sm:pt-4 md:pt-6 border-t border-white/20">
              {user && user.token ? (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <ResponsiveText
                        size="sm"
                        className="text-white font-medium"
                      >
                        {user.name}
                      </ResponsiveText>
                      <p className="text-xs text-gray-300 capitalize">
                        {user.status}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// MAIN APP COMPONENT
export default function App() {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = Cookies.get("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return null;
    }
  });

  const location = useLocation();

  // Update user state when cookies change
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const savedUser = Cookies.get("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Get current page info
  const currentPageInfo = useMemo(() => {
    return getPageInfoHelper(location.pathname);
  }, [location.pathname]);

  // Set page title on initial load and route change
  useEffect(() => {
    const updatePageTitle = () => {
      let title = "Ruziga Consult";

      if (
        currentPageInfo.fullName &&
        currentPageInfo.fullName !== "Not Found"
      ) {
        if (currentPageInfo.routeType.includes("dashboard")) {
          title = `${currentPageInfo.fullName} | Dashboard | Ruziga Consult`;
        } else {
          title = `${currentPageInfo.fullName} | Ruziga Consult`;
        }
      }

      document.title = title;
    };

    updatePageTitle();
  }, [currentPageInfo.fullName, currentPageInfo.routeType]);

  // Auth context value
  const authContextValue = useMemo(
    () => ({
      user,
      setUser: (newUser) => {
        setUser(newUser);
        if (newUser) {
          Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
        } else {
          Cookies.remove("user");
        }
      },
    }),
    [user]
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Page loading effect
  useEffect(() => {
    if (!loading) {
      setPageLoading(true);
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, loading]);

  // Initial app loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen bg-gradient-to-t from-[#102a58] to-[#0c2658] text-gray-900 transition-colors duration-300 overflow-x-hidden">
        {/* Initial App Loading */}
        {loading ? (
          <PageLoader
            pageName={currentPageInfo.name}
            routeName={currentPageInfo.fullName}
            routeType={currentPageInfo.routeType}
            icon={currentPageInfo.icon}
          />
        ) : (
          <>
            {/* Page Transition Loading */}
            {pageLoading && (
              <PageLoader
                pageName={currentPageInfo.name}
                routeName={currentPageInfo.fullName}
                routeType={currentPageInfo.routeType}
                icon={currentPageInfo.icon}
              />
            )}

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              user={user}
            />

            {/* Only show Navbar and Footer for public routes */}
            {!location.pathname.includes("/dashboard") && (
              <>
                <Navbar />
                <main className="w-full pt-12 sm:pt-14 md:pt-16 bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
                  <ResponsiveContainer>
                    <AnimatePresence mode="wait">
                      <Routes location={location} key={location.pathname}>
                        {publicRoutes.map((route) => (
                          <Route
                            key={`public-${route.path}`}
                            path={route.path}
                            element={
                              <PageTransition>{route.element}</PageTransition>
                            }
                          />
                        ))}
                        {dashboardRoutes.map((route) => (
                          <Route
                            key={`dashboard-${route.path}`}
                            path={route.path}
                            element={
                              <PrivateRoute
                                requiredStatus={route.requiredStatus}
                                pageTitle={route.name}
                              >
                                {route.element}
                              </PrivateRoute>
                            }
                          />
                        ))}
                      </Routes>
                    </AnimatePresence>
                  </ResponsiveContainer>
                </main>
                <Footer />
              </>
            )}

            {/* For dashboard routes, the DashboardLayout handles the layout */}
            {location.pathname.includes("/dashboard") && (
              <Routes location={location} key={location.pathname}>
                {dashboardRoutes.map((route) => (
                  <Route
                    key={`private-${route.path}`}
                    path={route.path}
                    element={
                      <PrivateRoute
                        requiredStatus={route.requiredStatus}
                        pageTitle={route.name}
                      >
                        {route.element}
                      </PrivateRoute>
                    }
                  />
                ))}
              </Routes>
            )}
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}