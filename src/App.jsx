// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";
// import Cookies from "js-cookie";
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Classes } from "./pages/classes/Classes";
// import { NotFound } from "./pages/notfound/Notfound";
// import { FAQ } from "./pages/faq/Faq";
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/management/users/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactsManagements";
// import { RequestManagement } from "./components/dashboard/admin/components/management/request/RequestManagement";
// import { TestimonialManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/management/booking/BookingManagement";
// import { CourseManagementDashboard } from "./components/dashboard/admin/components/management/courses/CourseManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/management/subscription/SubscriptionManagement";
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { MeManagement } from "./components/dashboard/users/components/management/me/MeManagement";
// import { MyTestimonialManagement } from "./components/dashboard/users/components/management/testimony/MyTestimony";
// import { MyContactManagement } from "./components/dashboard/users/components/management/contacts/Mycontacts";
// import { Navbar } from "./components/navigation/Navigation";
// import { Footer } from "./components/footer/Footer";
// import { useAuth } from "./components/navigation/Navigation";
// import {
//   ArrowUpward,
//   Home as HomeIcon,
//   Info,
//   Article,
//   Build,
//   Dashboard as DashboardIcon,
//   Error,
//   Menu,
//   Close,
//   People,
//   ContactMail,
//   School,
//   Hotel,
//   AirportShuttle,
//   RateReview,
//   Description,
//   Book,
//   CalendarToday,
//   Logout,
//   ChevronLeft,
//   ChevronRight,
//   MenuOpen,
//   Subscript,
//   Subscriptions,
//   MailLock,
//   Help,
//   AccountCircle,
//   Email,
//   CalendarMonth,
//   Payment,
//   RequestQuote,
// } from "@mui/icons-material";

// // RESPONSIVE CONTAINER COMPONENT - REMOVED ALL PADDING
// const ResponsiveContainer = ({
//   children,
//   className = "",
//   fullWidth = false,
// }) => {
//   if (fullWidth) {
//     return <div className={`w-full ${className}`}>{children}</div>;
//   }

//   return (
//     <div className={`w-full mx-auto max-w-7xl ${className}`}>{children}</div>
//   );
// };

// // RESPONSIVE UTILITY COMPONENTS
// const ResponsiveText = ({ children, className = "", size = "base" }) => {
//   const sizeClasses = {
//     xs: "text-xs sm:text-sm",
//     sm: "text-sm sm:text-base",
//     base: "text-base sm:text-lg",
//     lg: "text-lg sm:text-xl md:text-2xl",
//     xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
//     "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//   };

//   return <div className={`${sizeClasses[size]} ${className}`}>{children}</div>;
// };

// // PAGE TRANSITION COMPONENT - APPLIES TO EVERY PAGE
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

// // DASHBOARD LAYOUT COMPONENT WITH RESPONSIVE SIDEBAR
// const DashboardLayout = ({ children, user, pageTitle }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { setUser } = useAuth();

//   // Check if mobile screen
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // ADMIN DASHBOARD MENU ITEMS
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
//           icon: People,
//         },
//         {
//           path: "/dashboard/contacts",
//           name: "Contacts",
//           icon: ContactMail,
//         },
//       ],
//     },
//     {
//       category: "Content Management",
//       items: [
//         {
//           path: "/dashboard/request",
//           name: "Requests",
//           icon: RequestQuote,
//         },
//         {
//           path: "/dashboard/testimony",
//           name: "Testimonials",
//           icon: RateReview,
//         },
//         {
//           path: "/dashboard/booking",
//           name: "Bookings",
//           icon: CalendarToday,
//         },
//       ],
//     },
//     {
//       category: "Academic",
//       items: [
//         {
//           path: "/dashboard/courses",
//           name: "Courses",
//           icon: Book,
//         },
//         {
//           path: "/dashboard/subscriptions",
//           name: "Subscriptions",
//           icon: Subscriptions,
//         },
//       ],
//     },
//   ];

//   // USER DASHBOARD MENU ITEMS
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
//           icon: AccountCircle,
//         },
//         {
//           path: "/dashboard/me/testimony",
//           name: "My Testimonials",
//           icon: RateReview,
//         },
//         {
//           path: "/dashboard/me/contacts",
//           name: "My Contacts",
//           icon: Email,
//         },
//       ],
//     },
//     {
//       category: "Music",
//       items: [
//         {
//           path: "/dashboard/classes",
//           name: "My Classes",
//           icon: School,
//         },
//         {
//           path: "/dashboard/schedule",
//           name: "Schedule",
//           icon: CalendarMonth,
//         },
//         {
//           path: "/dashboard/payments",
//           name: "Payments",
//           icon: Payment,
//         },
//       ],
//     },
//   ];

//   // Get menu based on user role (admin or user)
//   const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

//   const handleLogout = () => {
//     setUser(null);
//     Cookies.remove("user");
//     window.location.href = "/";
//   };

//   // Set page title on mount and route change
//   useEffect(() => {
//     if (pageTitle) {
//       document.title = `${pageTitle} | Ndizy Note`;
//     }
//   }, [pageTitle, location.pathname]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c]">
//       {/* Sidebar Overlay for Mobile */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         className={`fixed md:relative h-full bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white z-40 ${
//           sidebarOpen ? "w-64" : "w-20"
//         } transition-all duration-300 ease-in-out`}
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-blue-700 flex items-center justify-between">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-2"
//               >
//                 <span className="font-bold text-sm">Dashboard</span>
//               </motion.div>
//             ) : (
//               <div className=" rounded-lg flex items-center justify-center"></div>
//             )}
//             <div
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-1 rounded-lg bg-gradient-to-t from-blue-500 to-indigo-500 transition-colors"
//             >
//               {sidebarOpen ? (
//                 <ChevronLeft className="text-sm" />
//               ) : (
//                 <ChevronRight className="text-sm" />
//               )}
//             </div>
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-blue-700">
//             {sidebarOpen ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
//                   <span className="font-bold text-white">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm truncate">{user?.name}</p>
//                   <p className="text-xs font-bold text-blue-700 capitalize">
//                     {user?.role}
//                   </p>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mx-auto">
//                 <span className="font-bold text-white text-xs">
//                   {user?.name?.charAt(0) || "U"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-6 px-2">
//               {menuItems.map((category, categoryIndex) => (
//                 <li key={`category-${categoryIndex}-${category.category}`}>
//                   {/* Category Header (only shown when sidebar is open) */}
//                   {sidebarOpen && (
//                     <div className="mb-2 px-3">
//                       <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
//                         {category.category}
//                       </span>
//                       <div className="mt-1 h-px bg-blue-700/50"></div>
//                     </div>
//                   )}

//                   {/* Menu Items */}
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
//                               className={`flex w-full items-center px-3 py-2.5 rounded-lg my-4 transition-all ${
//                                 isActive
//                                   ? "bg-blue-800 text-white shadow-md"
//                                   : "hover:bg-blue-800/50 text-blue-100"
//                               }`}
//                             >
//                               <Icon className="text-lg" />
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
//           <div className="p-4 border-t border-blue-700">
//             <button
//               onClick={handleLogout}
//               className={`flex items-center justify-center w-full px-3 py-2.5 rounded-lg bg-gradient-to-t from-red-600 to-red-400  text-white transition-colors ${
//                 !sidebarOpen && "justify-center"
//               }`}
//             >
//               <Logout className="text-lg" />
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
//         <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               {isMobile && (
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="p-2 rounded-lg bg-gradient-to-t from-blue-400 to-indigo-400 transition-colors"
//                 >
//                   <MenuOpen />
//                 </button>
//               )}
//               <h1 className="text-lg sm:text-xl font-bold text-gray-800">
//                 {pageTitle}
//               </h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
//                 <span>Welcome back,</span>
//                 <span className="font-bold text-blue-600">{user?.name}</span>
//               </div>
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
//                   <span className="font-bold text-white text-sm">
//                     {user?.name?.charAt(0) || "U"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c]">
//           <div className="max-w-7xl mx-auto">
//             <div className="space-y-8">{children}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// // PRIVATE ROUTE COMPONENT WITH STATUS-BASED NAVIGATION
// const PrivateRoute = ({ children, requiredStatus = null, pageTitle = "" }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   // If user is not authenticated, redirect to home
//   if (!user || !user.token) {
//     return <Navigate to="/" replace />;
//   }

//   // If user tries to access /dashboard directly, check their role
//   if (location.pathname === "/dashboard") {
//     if (user.role === "admin") {
//       // Admin can access /dashboard
//       return (
//         <DashboardLayout user={user} pageTitle={pageTitle}>
//           {children}
//         </DashboardLayout>
//       );
//     } else {
//       // Regular users should go to their dashboard
//       return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   // For other dashboard routes, check required status
//   if (requiredStatus && user.role !== requiredStatus) {
//     // Redirect based on user role
//     if (user.role === "admin") {
//       return <Navigate to="/dashboard" replace />;
//     } else {
//       return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   return (
//     <DashboardLayout user={user} pageTitle={pageTitle}>
//       {children}
//     </DashboardLayout>
//   );
// };

// // Dashboard route configurations
// const dashboardRoutes = [
//   // Admin dashboard routes
//   {
//     path: "/dashboard",
//     name: "Dashboard Overview",
//     element: <Dashboard />,
//     icon: DashboardIcon,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/users",
//     name: "User Management",
//     element: <UserManagement />,
//     icon: People,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/contacts",
//     name: "Contact Management",
//     element: <ContactManagement />,
//     icon: ContactMail,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/request",
//     name: "Request Management",
//     element: <RequestManagement />,
//     icon: RequestQuote,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/testimony",
//     name: "Testimony Management",
//     element: <TestimonialManagement />,
//     icon: RateReview,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/booking",
//     name: "Booking Management",
//     element: <BookingManagement />,
//     icon: CalendarToday,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/courses",
//     name: "Course Management",
//     element: <CourseManagementDashboard />,
//     icon: Book,
//     requiredStatus: "admin",
//     role: "admin",
//   },
//   {
//     path: "/dashboard/subscriptions",
//     name: "Subscription Management",
//     element: <SubscriptionManagement />,
//     icon: Subscriptions,
//     requiredStatus: "admin",
//     role: "admin",
//   },

//   // User dashboard routes
//   {
//     path: "/dashboard/user",
//     name: "User Dashboard",
//     element: <UserDashboard />,
//     icon: DashboardIcon,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/me",
//     name: "My Profile",
//     element: <MeManagement />,
//     icon: AccountCircle,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/me/testimony",
//     name: "My Testimonials",
//     element: <MyTestimonialManagement />,
//     icon: RateReview,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/me/contacts",
//     name: "My Contacts",
//     element: <MyContactManagement />,
//     icon: Email,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/classes",
//     name: "My Classes",
//     element: <Classes />,
//     icon: School,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/schedule",
//     name: "My Schedule",
//     element: <Classes />,
//     icon: CalendarMonth,
//     requiredStatus: "user",
//     role: "user",
//   },
//   {
//     path: "/dashboard/payments",
//     name: "My Payments",
//     element: <Classes />,
//     icon: Payment,
//     requiredStatus: "user",
//     role: "user",
//   },
// ];

// // Public route configurations
// const publicRoutes = [
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
//   { path: "/services", element: <Services /> },
//   { path: "/classes", element: <Classes /> },
//   { path: "/faq", element: <FAQ /> },
//   { path: "*", element: <NotFound /> },
// ];

// // ENHANCED PAGE LOADER COMPONENT
// const PageLoader = ({
//   pageName = "",
//   routeName = "",
//   icon: Icon = null,
//   routeType = "public",
// }) => {
//   // Map page names to display names and colors
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500" },
//     about: { displayName: "About", color: "from-green-500 to-teal-500" },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500" },
//     classes: { displayName: "Classes", color: "from-purple-500 to-indigo-500" },
//     faq: { displayName: "FAQ", color: "from-orange-500 to-red-500" },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//       subColors: {
//         admin: "from-purple-600 to-red-600",
//         user: "from-blue-600 to-cyan-600",
//       },
//     },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500" },
//   };

//   // Normalize the page name
//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");

//   let config = pageConfig["default"];
//   if (pageConfig[normalizedPageName]) {
//     config = pageConfig[normalizedPageName];
//   } else {
//     const matchedKey = Object.keys(pageConfig).find(
//       (key) =>
//         normalizedPageName.includes(key) ||
//         pageName.toLowerCase().includes(key),
//     );
//     if (matchedKey) config = pageConfig[matchedKey];
//   }

//   // For dashboard routes, use specific colors
//   let gradientColor = config.color;
//   if (routeType.includes("dashboard") && config.subColors) {
//     const dashType = routeType.includes("admin") ? "admin" : "user";
//     gradientColor = config.subColors[dashType] || config.color;
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] z-50 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-3 sm:mb-4 md:mb-6 lg:mb-8"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         {Icon ? (
//           <motion.div
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
//             animate={{
//               rotate: 360,
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               rotate: { duration: 2, repeat: Infinity, ease: "linear" },
//               scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
//             }}
//           >
//             <Icon
//               className={`bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
//             />
//           </motion.div>
//         ) : (
//           <div
//             className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
//           >
//             <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
//               {config.displayName.charAt(0)}
//             </span>
//           </div>
//         )}
//       </motion.div>

//       <div className="h-10 w-10 rounded-full overflow-hidden">
//         <motion.div
//           className="h-10 w-10 rounded-full border-4 border-transparent border-t-blue-500"
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1,
//             ease: "linear",
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // Helper function to get page info and route type
// const getPageInfoHelper = (pathname) => {
//   // Check public routes
//   const publicRoute = publicRoutes.find((route) => route.path === pathname);
//   if (publicRoute) {
//     // Extract name from path
//     const name = pathname === "/" ? "Home" : pathname.replace("/", "");
//     return {
//       name: name.toLowerCase(),
//       icon: DashboardIcon,
//       routeType: "public",
//       fullName: name,
//     };
//   }

//   // Check dashboard routes
//   const dashboardRoute = dashboardRoutes.find(
//     (route) => route.path === pathname,
//   );
//   if (dashboardRoute) {
//     return {
//       name: dashboardRoute.name.toLowerCase().split(" ")[0],
//       icon: dashboardRoute.icon,
//       routeType: `${dashboardRoute.role} dashboard`,
//       fullName: dashboardRoute.name,
//     };
//   }

//   return {
//     name: "404",
//     icon: Error,
//     routeType: "public",
//     fullName: "Not Found",
//   };
// };

// // RESPONSIVE MOBILE MENU (For Small Screens)
// function MobileMenu({ isOpen, onClose, user }) {
//   const location = useLocation();

//   // Simple mobile menu items for public pages
//   const mobileMenuItems = [
//     { path: "/", label: "Home", icon: HomeIcon, type: "public" },
//     { path: "/about", label: "About", icon: Info, type: "public" },
//     { path: "/services", label: "Services", icon: Build, type: "public" },
//     { path: "/classes", label: "Classes", icon: School, type: "public" },
//     { path: "/faq", label: "FAQ", icon: Help, type: "public" },
//   ];

//   // Add dashboard links if user is authenticated
//   if (user && user.token) {
//     let dashboardItem;
//     if (user.role === "admin") {
//       dashboardItem = {
//         path: "/dashboard",
//         label: "Admin Dashboard",
//         icon: DashboardIcon,
//         type: "private",
//       };
//     } else {
//       dashboardItem = {
//         path: "/dashboard/user",
//         label: "My Dashboard",
//         icon: DashboardIcon,
//         type: "private",
//       };
//     }

//     if (dashboardItem) {
//       mobileMenuItems.unshift(dashboardItem);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-40 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] md:hidden"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
//               <ResponsiveText size="lg" className="font-bold text-white">
//                 Menu
//               </ResponsiveText>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-t from-red-500 to-red-600 text-white"
//                 aria-label="Close menu"
//               >
//                 <Close className="text-base sm:text-lg" />
//               </button>
//             </div>

//             <div className="flex-1 space-y-1.5 sm:space-y-2 md:space-y-4">
//               {mobileMenuItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.a
//                     key={`mobile-${item.path}-${index}`}
//                     href={item.path}
//                     className={`flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg transition-all ${
//                       isActive
//                         ? "bg-white/25 shadow-lg backdrop-blur-sm text-white"
//                         : "hover:bg-white/15 text-gray-200 hover:text-white"
//                     }`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Icon className="text-base sm:text-lg" />
//                     <ResponsiveText size="sm" className="flex-1">
//                       {item.label}
//                     </ResponsiveText>
//                     <span
//                       className={`text-xs px-1 sm:px-1.5 py-0.5 rounded ${
//                         item.type === "private"
//                           ? "bg-red-500/20 text-red-200 border border-red-500/30"
//                           : "bg-green-500/20 text-green-200 border border-green-500/30"
//                       }`}
//                     >
//                       {item.type.toUpperCase()}
//                     </span>
//                   </motion.a>
//                 );
//               })}
//             </div>

//             <div className="pt-3 sm:pt-4 md:pt-6 border-t border-white/20">
//               {user && user.token ? (
//                 <div className="space-y-2 sm:space-y-3 md:space-y-4">
//                   <div className="flex items-center space-x-2 sm:space-x-3">
//                     <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">
//                         {user.name?.charAt(0) || "U"}
//                       </span>
//                     </div>
//                     <div>
//                       <ResponsiveText
//                         size="sm"
//                         className="text-white font-medium"
//                       >
//                         {user.name}
//                       </ResponsiveText>
//                       <p className="text-xs text-gray-300 capitalize">
//                         {user.role}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // MAIN APP COMPONENT
// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { user, setUser } = useAuth();
//   const location = useLocation();

//   // Update user state from cookies on component mount
//   useEffect(() => {
//     const savedUser = Cookies.get("user");
//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);
//         // Only update if user is different
//         if (!user || JSON.stringify(parsedUser) !== JSON.stringify(user)) {
//           setUser(parsedUser);
//         }
//       } catch (error) {
//         console.error("Error parsing user cookie:", error);
//       }
//     }
//   }, []);

//   // Get current page info
//   const currentPageInfo = useMemo(() => {
//     return getPageInfoHelper(location.pathname);
//   }, [location.pathname]);

//   // Set page title on initial load and route change
//   useEffect(() => {
//     const updatePageTitle = () => {
//       let title = "Ndizy Note";

//       if (
//         currentPageInfo.fullName &&
//         currentPageInfo.fullName !== "Not Found"
//       ) {
//         if (currentPageInfo.routeType.includes("dashboard")) {
//           title = `${currentPageInfo.fullName} | Dashboard | Ndizy Note`;
//         } else {
//           title = `${currentPageInfo.fullName} | Ndizy Note`;
//         }
//       }

//       document.title = title;
//     };

//     updatePageTitle();
//   }, [currentPageInfo.fullName, currentPageInfo.routeType]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);

//   // Page loading effect
//   useEffect(() => {
//     if (!loading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 800);

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, loading]);

//   // Initial app loading
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-gray-900 transition-colors duration-300 overflow-x-hidden">
//       {/* Initial App Loading */}
//       {loading ? (
//         <PageLoader
//           pageName={currentPageInfo.name}
//           routeName={currentPageInfo.fullName}
//           routeType={currentPageInfo.routeType}
//           icon={currentPageInfo.icon}
//         />
//       ) : (
//         <>
//           {/* Page Transition Loading */}
//           {pageLoading && (
//             <PageLoader
//               pageName={currentPageInfo.name}
//               routeName={currentPageInfo.fullName}
//               routeType={currentPageInfo.routeType}
//               icon={currentPageInfo.icon}
//             />
//           )}

//           {/* Mobile Menu */}
//           <MobileMenu
//             isOpen={mobileMenuOpen}
//             onClose={() => setMobileMenuOpen(false)}
//             user={user}
//           />

//           {/* Routes for all pages */}
//           <Routes location={location} key={location.pathname}>
//             {/* Public routes */}
//             {publicRoutes.map((route) => (
//               <Route
//                 key={`public-${route.path}`}
//                 path={route.path}
//                 element={
//                   <>
//                     <Navbar />
//                     <main className="w-full pt-12 sm:pt-14 md:pt-16 bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
//                       <ResponsiveContainer>
//                         <PageTransition>{route.element}</PageTransition>
//                       </ResponsiveContainer>
//                     </main>
//                     <Footer />
//                   </>
//                 }
//               />
//             ))}

//             {/* Dashboard routes */}
//             {dashboardRoutes.map((route) => (
//               <Route
//                 key={`dashboard-${route.path}`}
//                 path={route.path}
//                 element={
//                   <PrivateRoute
//                     requiredStatus={route.requiredStatus}
//                     pageTitle={route.name}
//                   >
//                     {route.element}
//                   </PrivateRoute>
//                 }
//               />
//             ))}
//           </Routes>
//         </>
//       )}
//     </div>
//   );
// }
















/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
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
import { useAuth } from "./components/navigation/Navigation";
import axios from "axios";
import {
  ArrowUpward,
  Home as HomeIcon,
  Info,
  Article,
  Build,
  Dashboard as DashboardIcon,
  Error,
  Menu,
  Close,
  People,
  ContactMail,
  School,
  Hotel,
  AirportShuttle,
  RateReview,
  Description,
  Book,
  CalendarToday,
  Logout,
  ChevronLeft,
  ChevronRight,
  MenuOpen,
  Subscript,
  Subscriptions,
  MailLock,
  Help,
  AccountCircle,
  Email,
  CalendarMonth,
  Payment,
  RequestQuote,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { UserClassesManagement } from "./components/dashboard/users/components/classes/UserClassesManagement";
import { UserSubscriptionManagement } from "./components/dashboard/users/components/management/subscription/UserSubscriptionManagement";
import { UserRequestManagement } from "./components/dashboard/users/components/management/request/UserRequestManagement";

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
const { logout } = useAuth();
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
          path: "/dashboard/me/classes",
          name: "My Classes",
          icon: School,
        },
        {
          path: "/dashboard/me/subscription",
          name: "My Subscription",
          icon: CalendarMonth,
        },
        {
          path: "/dashboard/me/request", // Consistent with profile routes
          name: "My Request",
          icon: Payment,
        },
      ],
    },
  ];

  // Get menu based on user status (admin or user)
  const menuItems = user?.status === "admin" ? adminMenuItems : userMenuItems;

  // const handleLogout = async () => {
  //   const token = Cookies.get("token");

  //   if (!token) {
  //     // No token, just clear frontend and redirect
  //     setUser(null);
  //     Cookies.remove("user");
  //     Cookies.remove("token");
  //     return;
  //   }

  //   try {
  //     // Send logout request to backend
  //     const response = await axios.post(
  //       "https://ndizmusicprojectbackend.onrender.com/api/users/logout",
  //       {}, // no body
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true, // IMPORTANT if backend uses cookies for session
  //       },
  //     );

  //     // Check backend response
  //     if (response.status === 200 || response.status === 204) {
  //       // Backend successfully invalidated session
  //       setUser(null);
  //       Cookies.remove("user");
  //       Cookies.remove("token");

  //       toast.success("Logged out successfully!");

  //       // Navigate to home AFTER session cleared
  //       window.location.href = "/";
  //     } else {
  //       throw new Error("Logout failed on server");
  //     }
  //   } catch (error) {
  //     console.error("Logout failed:", error.response?.data || error);

  //     // Always clear frontend as a fallback
  //     setUser(null);
  //     Cookies.remove("user");
  //     Cookies.remove("token");

  //     toast.warning(
  //       error.response?.data?.message ||
  //         "Logout failed on server. Session cleared locally.",
  //     );

  //     // Navigate home
  //     window.location.href = "/";
  //   }
  // };

  // Set page title on mount and route change
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | Ndizy Note`;
    }
  }, [pageTitle, location.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c]">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:relative h-full bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white z-40 ${
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
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center md:mt-6 space-x-2"
                >
                  <span className="font-bold text-sm">Dashboard</span>
                </motion.div>
              </>
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
                  <p className="text-xs font-bold text-white capitalize">
                    {user?.status || "user"}
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
            <ul className="space-y-8 px-2">
              {menuItems.map((category, categoryIndex) => (
                <li
                  className="space-y-8"
                  key={`category-${categoryIndex}-${category.category}`}
                >
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
                              className={`flex w-full bg-blue-600/10 items-center px-3 py-2.5 rounded-lg my-4 transition-all ${
                                isActive
                                  ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-md"
                                  : "hover:bg-blue-500/50 text-blue-100"
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
          <div className="p-4 md:mt-10 sm:mt-4 border-t border-blue-700">
            <button
              // onClick={handleLogout}
              onClick={logout}
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
                <span className="font-bold text-blue-600">{user?.name}</span>
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c]">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ENHANCED PRIVATE ROUTE COMPONENT WITH STATUS-BASED ROUTING

const PrivateRoute = ({ children, allowedStatuses = [], pageTitle = "" }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If no user or no token, redirect to home
  if (!user || !user.token) {
    toast.warning("No user token, redirecting to home");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Check if user's status is allowed
  const hasAllowedStatus =
    allowedStatuses.length === 0 || allowedStatuses.includes(user.status);

  if (!hasAllowedStatus) {
    toast.warning(`User status "${user.status}" not allowed, redirecting...`);

    // Redirect based on status
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

// SIMPLIFIED DASHBOARD ROUTE CONFIGURATION
const dashboardRoutes = [
  // =========== ADMIN ROUTES (status: "admin") ===========
  // Main admin dashboard
  {
    path: "/dashboard",
    name: "Dashboard Overview",
    element: <Dashboard />,
    icon: DashboardIcon,
    allowedStatuses: ["admin"],
  },
  // Admin management routes
  {
    path: "/dashboard/users",
    name: "User Management",
    element: <UserManagement />,
    icon: People,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/contacts",
    name: "Contact Management",
    element: <ContactManagement />,
    icon: ContactMail,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/request",
    name: "Request Management",
    element: <RequestManagement />,
    icon: RequestQuote,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/testimony",
    name: "Testimony Management",
    element: <TestimonialManagement />,
    icon: RateReview,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/booking",
    name: "Booking Management",
    element: <BookingManagement />,
    icon: CalendarToday,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/courses",
    name: "Course Management",
    element: <CourseManagementDashboard />,
    icon: Book,
    allowedStatuses: ["admin"],
  },
  {
    path: "/dashboard/subscriptions",
    name: "Subscription Management",
    element: <SubscriptionManagement />,
    icon: Subscriptions,
    allowedStatuses: ["admin"],
  },

  // =========== USER ROUTES (status: "user") ===========
  // Main user dashboard
  {
    path: "/dashboard/user",
    name: "My Dashboard",
    element: <UserDashboard />,
    icon: DashboardIcon,
    allowedStatuses: ["user"],
  },
  // User profile routes
  {
    path: "/dashboard/me",
    name: "My Profile",
    element: <MeManagement />,
    icon: AccountCircle,
    allowedStatuses: ["user"],
  },
  {
    path: "/dashboard/me/testimony",
    name: "My Testimonials",
    element: <MyTestimonialManagement />,
    icon: RateReview,
    allowedStatuses: ["user"],
  },
  {
    path: "/dashboard/me/contacts",
    name: "My Contacts",
    element: <MyContactManagement />,
    icon: Email,
    allowedStatuses: ["user"],
  },
  // User music routes
  {
    path: "/dashboard/me/classes",
    name: "My Classes",
    element: <UserClassesManagement />,
    icon: School,
    allowedStatuses: ["user"],
  },
  {
    path: "/dashboard/me/subscription",
    name: "My Subscription",
    element: <UserSubscriptionManagement />,
    icon: CalendarMonth,
    allowedStatuses: ["user"],
  },
  {
    path: "/dashboard/me/request",
    name: "My Request",
    element: <UserRequestManagement />,
    icon: Payment,
    allowedStatuses: ["user"],
  },
  {
    path: "/dashboard/me/request",
    name: "My Request",
    element: <UserRequestManagement />,
    icon: Payment,
    allowedStatuses: ["user"],
  },
];

// Public route configurations
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/classes", element: <Classes /> },
  { path: "/faq", element: <FAQ /> },
  // Catch-all route should be last
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
        normalizedPageName.includes(key) ||
        pageName.toLowerCase().includes(key),
    );
    if (matchedKey) config = pageConfig[matchedKey];
  }

  // For dashboard routes, use specific colors
  let gradientColor = config.color;
  if (routeType.includes("dashboard") && config.subColors) {
    const dashType = routeType.includes("admin") ? "admin" : "user";
    gradientColor = config.subColors[dashType] || config.color;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] z-50 flex flex-col items-center justify-center"
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

      <div className="h-10 w-10 rounded-full overflow-hidden">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-transparent border-t-blue-500"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
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
    (route) => route.path === pathname,
  );
  if (dashboardRoute) {
    return {
      name: dashboardRoute.name.toLowerCase().split(" ")[0],
      icon: dashboardRoute.icon,
      routeType: `${dashboardRoute.allowedStatuses[0]} dashboard`,
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
          className="fixed inset-0 z-40 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] md:hidden"
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
                  <Link
                    key={`mobile-${item.path}-${index}`}
                    to={item.path}
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
                  </Link>
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
                        {user.status || "user"}
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
  const { user, setUser } = useAuth();
  const location = useLocation();

  // Update user state from cookies on component mount
  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Only update if user is different
        if (!user || JSON.stringify(parsedUser) !== JSON.stringify(user)) {
          // console.log("Setting user from cookie:", parsedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  // Get current page info
  const currentPageInfo = useMemo(() => {
    return getPageInfoHelper(location.pathname);
  }, [location.pathname]);

  // Set page title on initial load and route change
  useEffect(() => {
    const updatePageTitle = () => {
      let title = "Ndizy Note";

      if (
        currentPageInfo.fullName &&
        currentPageInfo.fullName !== "Not Found"
      ) {
        if (currentPageInfo.routeType.includes("dashboard")) {
          title = `${currentPageInfo.fullName} | Dashboard | Ndizy Note`;
        } else {
          title = `${currentPageInfo.fullName} | Ndizy Note`;
        }
      }

      document.title = title;
    };

    updatePageTitle();
  }, [currentPageInfo.fullName, currentPageInfo.routeType]);

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
    <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white transition-colors duration-300 overflow-x-hidden">
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

          {/* Routes for all pages */}
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            {publicRoutes.map((route) => (
              <Route
                key={`public-${route.path}`}
                path={route.path}
                element={
                  <>
                    <Navbar />
                    <main className="w-full pt-12 sm:pt-14 md:pt-16 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c]">
                      <ResponsiveContainer>
                        <PageTransition>{route.element}</PageTransition>
                      </ResponsiveContainer>
                    </main>
                    <Footer />
                  </>
                }
              />
            ))}

            {/* Dashboard routes - IMPORTANT: Order matters! */}
            {dashboardRoutes.map((route) => (
              <Route
                key={`dashboard-${route.path}`}
                path={route.path}
                element={
                  <PrivateRoute
                    allowedStatuses={route.allowedStatuses}
                    pageTitle={route.name}
                  >
                    {route.element}
                  </PrivateRoute>
                }
              />
            ))}
          </Routes>
        </>
      )}
    </div>
  );
}
