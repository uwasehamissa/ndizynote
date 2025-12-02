// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Message as MessageIcon,
//   Notifications as NotificationsIcon,
//   BookOnline as BookIcon,
//   Subscriptions as SubscriptionsIcon,
//   Menu as MenuIcon,
//   Close as CloseIcon,
//   School as SchoolIcon,
//   MusicNote,
//   LibraryMusic,
//   GraphicEq,
//   Circle,
//   Schedule,
//   AccountCircle,
//   ExitToApp,
//   Settings
// } from '@mui/icons-material';

// export const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [loginTime, setLoginTime] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const navigate = useNavigate();

//   // Get user data from cache/localStorage when component mounts
//   useEffect(() => {
//     const cachedUserData = localStorage.getItem('userData');
//     const cachedLoginTime = localStorage.getItem('loginTime');

//     if (cachedUserData) {
//       setUserData(JSON.parse(cachedUserData));
//     } else {
//       // Fallback mock data if no cache exists
//       setUserData({
//         name: 'Alex Johnson',
//         status: 'Music Director',
//         email: 'alex.johnson@ndzynote.com',
//         onlineStatus: 'online',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&facepad=2'
//       });
//     }

//     if (cachedLoginTime) {
//       setLoginTime(cachedLoginTime);
//     } else {
//       // Set current time as login time if not cached
//       const now = new Date();
//       const timeString = now.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       });
//       setLoginTime(timeString);
//       localStorage.setItem('loginTime', timeString);
//     }

//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setIsOpen(false);
//         setShowUserModal(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobile && isOpen && !event.target.closest('.sidebar-container')) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMobile, isOpen]);

//   // Function to handle logout
//   const handleLogout = () => {
//     // Clear cached user data
//     localStorage.removeItem('userData');
//     localStorage.removeItem('loginTime');
    
//     // Redirect to login page or home page
//     navigate('/login');
    
//     // Close sidebar if mobile
//     if (isMobile) {
//       setIsOpen(false);
//       setShowUserModal(false);
//     }
//   };

//   const menuItems = [
//     { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
//     { icon: PeopleIcon, label: 'Students', path: '/students' },
//     { icon: MusicNote, label: 'Instructors', path: '/instructors' },
//     { icon: LibraryMusic, label: 'Courses', path: '/courses' },
//     { icon: MessageIcon, label: 'Messages', path: '/messages', badge: 3 },
//     { icon: BookIcon, label: 'Bookings', path: '/bookings' },
//     { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/subscriptions' },
//     { icon: NotificationsIcon, label: 'Notifications', path: '/notifications', badge: 5 },
//     { icon: GraphicEq, label: 'Instruments', path: '/instruments' },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'online': return 'text-green-400';
//       case 'away': return 'text-yellow-400';
//       case 'busy': return 'text-red-400';
//       case 'offline': return 'text-gray-400';
//       default: return 'text-green-400';
//     }
//   };

//   // Updated variants for slide under behavior
//   const sidebarVariants = {
//     open: { 
//       x: 0,
//       transition: { 
//         type: 'spring', 
//         stiffness: 400, 
//         damping: 40,
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       } 
//     },
//     closed: { 
//       x: '-100%',
//       transition: { 
//         type: 'spring', 
//         stiffness: 400, 
//         damping: 40 
//       } 
//     }
//   };

//   const desktopSidebarVariants = {
//     open: { 
//       x: 0, 
//       transition: { type: 'spring', stiffness: 300, damping: 30 } 
//     },
//     closed: { 
//       x: '-100%', 
//       transition: { type: 'spring', stiffness: 300, damping: 30 } 
//     }
//   };

//   const overlayVariants = {
//     open: { 
//       opacity: 1, 
//       pointerEvents: 'auto',
//       transition: { duration: 0.3 }
//     },
//     closed: { 
//       opacity: 0, 
//       pointerEvents: 'none',
//       transition: { duration: 0.3 }
//     }
//   };

//   const itemVariants = {
//     open: { 
//       opacity: 1, 
//       x: 0,
//       transition: { type: 'spring', stiffness: 300, damping: 24 }
//     },
//     closed: { 
//       opacity: 0, 
//       x: -20,
//       transition: { duration: 0.2 }
//     }
//   };

//   const userModalVariants = {
//     open: {
//       scale: 1,
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 400, damping: 30 }
//     },
//     closed: {
//       scale: 0.8,
//       opacity: 0,
//       transition: { duration: 0.2 }
//     }
//   };

//   const handleLinkClick = () => {
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   const toggleUserModal = () => {
//     setShowUserModal(!showUserModal);
//   };

//   // Updated responsive classes with very low z-index for slide under behavior
//   const responsiveClasses = `
//     sidebar-container
//     fixed lg:static z-0  /* Very low z-index to ensure it goes under navbar */
//     bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
//     shadow-2xl lg:shadow-xl
//     border-r border-gray-700
    
//     /* Mobile styles */
//     inset-y-0 left-0 w-80 max-w-[85vw]
    
//     /* Desktop styles */
//     lg:inset-y-0 lg:left-0 lg:w-64 lg:h-full
    
//     /* Extra large devices */
//     xl:w-72
//   `;

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Mobile Menu Button - This stays above navbar */}
//       <motion.button
//         className="
//           lg:hidden 
//           fixed top-4 left-4 z-50  /* High z-index to stay above navbar */
//           p-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white 
//           rounded-xl shadow-lg hover:shadow-xl
//           transition-all duration-300
//           backdrop-blur-sm
//         "
//         onClick={() => setIsOpen(!isOpen)}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {isOpen ? <CloseIcon /> : <MenuIcon />}
//         </motion.div>
//       </motion.button>

//       {/* User Info Button for Mobile - Stays above navbar */}
//       <motion.button
//         className="
//           lg:hidden
//           fixed top-4 right-4 z-50  /* High z-index to stay above navbar */
//           p-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white
//           rounded-xl shadow-lg hover:shadow-xl
//           border border-gray-600
//           transition-all duration-300
//           backdrop-blur-sm
//         "
//         onClick={toggleUserModal}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <AccountCircle />
//       </motion.button>

//       {/* Overlay with very low z-index to ensure sidebar goes under navbar */}
//       <AnimatePresence>
//         {(isOpen && isMobile) && (
//           <motion.div
//             variants={overlayVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 bg-black bg-opacity-60 z-0 lg:hidden backdrop-blur-sm"  /* Very low z-index */
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* User Modal Overlay - This can stay at normal z-index since it's separate */}
//       <AnimatePresence>
//         {showUserModal && isMobile && (
//           <motion.div
//             variants={overlayVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden backdrop-blur-sm"
//             onClick={() => setShowUserModal(false)}
//           >
//             {/* User Modal */}
//             <motion.div
//               variants={userModalVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               className="absolute top-20 right-4 w-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* User Header */}
//               <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600">
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     <img
//                       src={userData.avatar}
//                       alt="Profile"
//                       className="w-14 h-14 rounded-xl border-2 border-primary-400 shadow-lg"
//                     />
//                     <div className="absolute -bottom-1 -right-1">
//                       <Circle className={`w-4 h-4 ${getStatusColor(userData.onlineStatus)}`} />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-white">{userData.name}</h3>
//                     <p className="text-sm text-gray-300">{userData.status}</p>
//                     <p className="text-xs text-gray-400 mt-1">{userData.email}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* User Details */}
//               <div className="p-4 space-y-4">
//                 <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
//                   <Schedule className="text-primary-400" />
//                   <div>
//                     <p className="text-xs text-gray-400">Logged in at</p>
//                     <p className="text-sm font-semibold text-white">{loginTime}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
//                   <Circle className={`w-3 h-3 ${getStatusColor(userData.onlineStatus)}`} />
//                   <div>
//                     <p className="text-xs text-gray-400">Status</p>
//                     <p className="text-sm font-semibold text-white capitalize">{userData.onlineStatus}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 border-t border-gray-700 space-y-2">
//                 <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
//                   <Settings className="text-lg" />
//                   <span>Settings</span>
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors duration-200"
//                 >
//                   <ExitToApp className="text-lg" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Sidebar with very low z-index to ensure it slides UNDER the navbar */}
//       <motion.div
//         variants={isMobile ? sidebarVariants : desktopSidebarVariants}
//         initial={isMobile ? "closed" : "open"}
//         animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
//         className={responsiveClasses}
//         style={{ zIndex: 0 }} // Ensure it goes under navbar
//       >
//         <div className="flex flex-col h-full overflow-y-auto">
//           {/* Enhanced Logo Section */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
//             <div className="flex items-center space-x-3">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <SchoolIcon className="text-3xl text-primary-400" />
//               </motion.div>
//               <motion.span 
//                 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 NdzyNote
//               </motion.span>
//             </div>
            
//             {/* Close button for mobile */}
//             <motion.button
//               className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700 rounded-lg"
//               onClick={() => setIsOpen(false)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <CloseIcon />
//             </motion.button>
//           </div>

//           {/* Enhanced Navigation */}
//           <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             {menuItems.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <motion.div
//                   key={item.label}
//                   variants={itemVariants}
//                 >
//                   <Link
//                     to={item.path}
//                     onClick={handleLinkClick}
//                     className="group relative flex items-center space-x-4 px-4 py-3 text-gray-300 rounded-xl 
//                       hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white 
//                       transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="relative"
//                     >
//                       <Icon className="text-xl text-gray-400 group-hover:text-primary-400 transition-colors duration-200" />
//                       {item.badge && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                           {item.badge}
//                         </span>
//                       )}
//                     </motion.div>
//                     <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
//                       {item.label}
//                     </span>
                    
//                     {/* Hover effect line */}
//                     <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </nav>

//           {/* Enhanced User Profile Section - Hidden on mobile when modal is available */}
//           <div className={`p-4 border-t border-gray-700 bg-gradient-to-t from-gray-800 to-gray-900 
//             ${isMobile ? 'lg:block hidden' : 'block'}`}>
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="relative">
//                 <motion.img
//                   src={userData.avatar}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-xl border-2 border-primary-400 shadow-lg"
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                 />
//                 <motion.div 
//                   className="absolute -bottom-1 -right-1"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Circle className={`w-4 h-4 ${getStatusColor(userData.onlineStatus)}`} />
//                 </motion.div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-white truncate">
//                   {userData.name}
//                 </p>
//                 <p className="text-xs text-gray-400 truncate">
//                   {userData.status}
//                 </p>
//                 <div className="flex items-center space-x-1 mt-1">
//                   <Circle className={`w-2 h-2 ${getStatusColor(userData.onlineStatus)}`} />
//                   <span className="text-xs text-gray-400 capitalize">
//                     {userData.onlineStatus}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Login Time */}
//             <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-xl mb-4">
//               <Schedule className="text-primary-400 text-lg" />
//               <div>
//                 <p className="text-xs text-gray-400">Logged in at</p>
//                 <p className="text-sm font-semibold text-white">{loginTime}</p>
//               </div>
//             </div>


//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };













/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  BookOnline as BookIcon,
  Subscriptions as SubscriptionsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  MusicNote,
  LibraryMusic,
  GraphicEq,
  Circle,
  Schedule,
  AccountCircle,
  ExitToApp,
  Settings,
  ArrowForward,
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Warning,
  MarkEmailRead,
  Delete
} from '@mui/icons-material';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loginTime, setLoginTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState({
    messages: 0,
    notifications: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({
    messages: false,
    notifications: false,
    notificationList: false
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock recent notifications data
  const mockNotifications = [
    { id: 1, type: 'success', title: 'New Student Enrolled', message: 'John Doe has enrolled in Piano Basics', time: '5 min ago', read: false, icon: CheckCircle },
    { id: 2, type: 'info', title: 'Lesson Reminder', message: 'You have a lesson with Sarah in 2 hours', time: '1 hour ago', read: false, icon: Info },
    { id: 3, type: 'warning', title: 'Subscription Expiring', message: 'Your premium subscription expires in 3 days', time: '2 hours ago', read: true, icon: Warning },
    { id: 4, type: 'error', title: 'Payment Failed', message: 'Payment for monthly subscription failed', time: '3 hours ago', read: false, icon: ErrorIcon },
    { id: 5, type: 'success', title: 'Course Completed', message: 'Student completed Advanced Guitar Techniques', time: '5 hours ago', read: true, icon: CheckCircle },
    { id: 6, type: 'info', title: 'New Message', message: 'You have a new message from Alex', time: '1 day ago', read: true, icon: MessageIcon },
    { id: 7, type: 'warning', title: 'Low Balance', message: 'Your account balance is running low', time: '2 days ago', read: true, icon: Warning },
    { id: 8, type: 'success', title: 'Review Received', message: 'New 5-star review from a student', time: '3 days ago', read: true, icon: CheckCircle },
  ];

  // Fetch badge counts from API
  const fetchBadgeCounts = async () => {
    try {
      // Fetch messages count
      setLoading(prev => ({ ...prev, messages: true }));
      const messagesResponse = await fetch('/api/messages/unread-count');
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setBadgeCounts(prev => ({ ...prev, messages: messagesData.count }));
      }
      setLoading(prev => ({ ...prev, messages: false }));

      // Fetch notifications count
      setLoading(prev => ({ ...prev, notifications: true }));
      const notificationsResponse = await fetch('/api/notifications/unread-count');
      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json();
        setBadgeCounts(prev => ({ ...prev, notifications: notificationsData.count }));
      }
      setLoading(prev => ({ ...prev, notifications: false }));
      
      setError(null);
    } catch (err) {
      console.error('Error fetching badge counts:', err);
      setError('Failed to load notifications');
      setLoading({ messages: false, notifications: false });
      
      // Use fallback values if API fails
      setBadgeCounts({
        messages: 3,
        notifications: 5
      });
    }
  };

  // Fetch notifications list
  const fetchNotifications = async () => {
    try {
      setLoading(prev => ({ ...prev, notificationList: true }));
      const response = await fetch('/api/notifications/recent?limit=8');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      } else {
        // Use mock data if API fails
        setNotifications(mockNotifications);
      }
      setLoading(prev => ({ ...prev, notificationList: false }));
    } catch (err) {
      console.error('Error fetching notifications:', err);
      // Use mock data as fallback
      setNotifications(mockNotifications);
      setLoading(prev => ({ ...prev, notificationList: false }));
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update local state
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId ? { ...notif, read: true } : notif
          )
        );
        
        // Update badge count
        if (badgeCounts.notifications > 0) {
          setBadgeCounts(prev => ({ ...prev, notifications: prev.notifications - 1 }));
        }
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update local state
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        );
        
        // Reset badge count
        setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
      }
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Get user data from cache/localStorage when component mounts
  useEffect(() => {
    const cachedUserData = localStorage.getItem('userData');
    const cachedLoginTime = localStorage.getItem('loginTime');

    if (cachedUserData) {
      setUserData(JSON.parse(cachedUserData));
    } else {
      // Fallback mock data if no cache exists
      setUserData({
        name: 'Alex Johnson',
        status: 'Music Director',
        email: 'alex.johnson@ndzynote.com',
        onlineStatus: 'online',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&facepad=2'
      });
    }

    if (cachedLoginTime) {
      setLoginTime(cachedLoginTime);
    } else {
      // Set current time as login time if not cached
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setLoginTime(timeString);
      localStorage.setItem('loginTime', timeString);
    }

    // Fetch initial badge counts
    fetchBadgeCounts();
    fetchNotifications();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
        setShowUserModal(false);
        setShowNotificationsModal(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Set up polling for real-time updates (every 30 seconds)
    const pollInterval = setInterval(() => {
      fetchBadgeCounts();
      fetchNotifications();
    }, 30000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(pollInterval);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('.sidebar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  // Function to handle logout
  const handleLogout = () => {
    // Clear cached user data
    localStorage.removeItem('userData');
    localStorage.removeItem('loginTime');
    
    // Redirect to login page or home page
    navigate('/login');
    
    // Close sidebar if mobile
    if (isMobile) {
      setIsOpen(false);
      setShowUserModal(false);
      setShowNotificationsModal(false);
    }
  };

  const menuItems = [
    { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: PeopleIcon, label: 'Students', path: '/dashboard/users' },
    { icon: MusicNote, label: 'Request', path: '/dashboard/request' },
    { icon: LibraryMusic, label: 'Courses', path: '/courses' },
    { 
      icon: MessageIcon, 
      label: 'Messages', 
      path: '/dashboard/contacts', 
      badge: badgeCounts.messages,
      loading: loading.messages,
      badgeKey: 'messages'
    },
    { icon: BookIcon, label: 'Bookings', path: '/dashboard/booking' },
    { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/dashboard/subscriptions' },
    { 
      icon: NotificationsIcon, 
      label: 'Notifications', 
      path: '#',
      badge: badgeCounts.notifications,
      loading: loading.notifications,
      badgeKey: 'notifications',
      onClick: () => {
        if (isMobile) {
          setShowNotificationsModal(true);
          setIsOpen(false);
        } else {
          navigate('/dashboard/notifications');
        }
      }
    },
    { icon: GraphicEq, label: 'Testimony', path: '/dashboard/testimony' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'busy': return 'text-red-400';
      case 'offline': return 'text-gray-400';
      default: return 'text-green-400';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  // Handle badge click to mark as read
  const handleBadgeClick = async (type, item) => {
    if (type === 'notifications') {
      if (isMobile) {
        setShowNotificationsModal(true);
      } else {
        navigate('/dashboard/notifications');
      }
    } else if (type === 'messages') {
      navigate('/dashboard/contacts');
    }
  };

  // Updated variants for slide under behavior
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    closed: { 
      x: '-100%',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40 
      } 
    }
  };

  const desktopSidebarVariants = {
    open: { 
      x: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    },
    closed: { 
      x: '-100%', 
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    }
  };

  const overlayVariants = {
    open: { 
      opacity: 1, 
      pointerEvents: 'auto',
      transition: { duration: 0.3 }
    },
    closed: { 
      opacity: 0, 
      pointerEvents: 'none',
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const userModalVariants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    closed: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const notificationsModalVariants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    closed: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const handleLinkClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.badgeKey && badgeCounts[item.badgeKey] > 0) {
      handleBadgeClick(item.badgeKey, item);
    }
    
    if (isMobile && !item.onClick) {
      setIsOpen(false);
    }
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  const toggleNotificationsModal = () => {
    if (showNotificationsModal) {
      setShowNotificationsModal(false);
    } else {
      fetchNotifications();
      setShowNotificationsModal(true);
    }
  };

  // Updated responsive classes with very low z-index for slide under behavior
  const responsiveClasses = `
    sidebar-container
    fixed lg:static z-0
    bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
    shadow-2xl lg:shadow-xl
    border-r border-gray-700
    
    /* Mobile styles */
    inset-y-0 left-0 w-80 max-w-[85vw]
    
    /* Desktop styles */
    lg:inset-y-0 lg:left-0 lg:w-64 lg:h-full
    
    /* Extra large devices */
    xl:w-72
  `;

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Menu Button - This stays above navbar */}
      <motion.button
        className="
          lg:hidden 
          fixed top-4 left-4 z-50
          p-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white 
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-300
          backdrop-blur-sm
        "
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </motion.div>
      </motion.button>

      {/* Mobile Notifications Button */}
      <motion.button
        className="
          lg:hidden
          fixed top-4 right-16 z-50
          p-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white
          rounded-xl shadow-lg hover:shadow-xl
          border border-gray-600
          transition-all duration-300
          backdrop-blur-sm
          relative
        "
        onClick={toggleNotificationsModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NotificationsIcon />
        {badgeCounts.notifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {Math.min(badgeCounts.notifications, 99)}
          </span>
        )}
      </motion.button>

      {/* Mobile User Info Button */}
      <motion.button
        className="
          lg:hidden
          fixed top-4 right-4 z-50
          p-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white
          rounded-xl shadow-lg hover:shadow-xl
          border border-gray-600
          transition-all duration-300
          backdrop-blur-sm
        "
        onClick={toggleUserModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AccountCircle />
      </motion.button>

      {/* Overlay with very low z-index to ensure sidebar goes under navbar */}
      <AnimatePresence>
        {(isOpen && isMobile) && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-60 z-0 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* User Modal Overlay */}
      <AnimatePresence>
        {showUserModal && isMobile && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setShowUserModal(false)}
          >
            {/* User Modal */}
            <motion.div
              variants={userModalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-20 right-4 w-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Header */}
              <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-14 h-14 rounded-xl border-2 border-primary-400 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      <Circle className={`w-4 h-4 ${getStatusColor(userData.onlineStatus)}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{userData.name}</h3>
                    <p className="text-sm text-gray-300">{userData.status}</p>
                    <p className="text-xs text-gray-400 mt-1">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <Schedule className="text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400">Logged in at</p>
                    <p className="text-sm font-semibold text-white">{loginTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <Circle className={`w-3 h-3 ${getStatusColor(userData.onlineStatus)}`} />
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm font-semibold text-white capitalize">{userData.onlineStatus}</p>
                  </div>
                </div>

                {/* Notification Badge Summary */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-900 bg-opacity-30 rounded-lg">
                    <MessageIcon className="text-blue-400 text-sm" />
                    <div>
                      <p className="text-xs text-gray-400">Unread Messages</p>
                      <p className="text-sm font-semibold text-white">
                        {loading.messages ? (
                          <div className="animate-pulse bg-gray-600 h-4 w-6 rounded"></div>
                        ) : (
                          badgeCounts.messages
                        )}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="flex items-center space-x-3 p-3 bg-red-900 bg-opacity-30 rounded-lg cursor-pointer"
                    onClick={() => {
                      setShowUserModal(false);
                      setShowNotificationsModal(true);
                    }}
                  >
                    <NotificationsIcon className="text-red-400 text-sm" />
                    <div>
                      <p className="text-xs text-gray-400">Notifications</p>
                      <p className="text-sm font-semibold text-white">
                        {loading.notifications ? (
                          <div className="animate-pulse bg-gray-600 h-4 w-6 rounded"></div>
                        ) : (
                          badgeCounts.notifications
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-700 space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Settings className="text-lg" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                >
                  <ExitToApp className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Modal Overlay */}
      <AnimatePresence>
        {showNotificationsModal && isMobile && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
            onClick={() => setShowNotificationsModal(false)}
          >
            {/* Notifications Modal */}
            <motion.div
              variants={notificationsModalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <NotificationsIcon className="text-primary-400" />
                  <h2 className="text-lg font-bold text-white">Notifications</h2>
                  {badgeCounts.notifications > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {badgeCounts.notifications} new
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={markAllAsRead}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Mark all as read"
                  >
                    <MarkEmailRead />
                  </button>
                  <button
                    onClick={() => setShowNotificationsModal(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4">
                {loading.notificationList ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-xl border ${notification.read ? 'border-gray-700 bg-gray-800' : 'border-primary-500 bg-gray-800 bg-opacity-50'}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)} bg-opacity-20`}>
                              <Icon className={`text-lg ${getNotificationIconColor(notification.type)}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                                  {notification.title}
                                </h3>
                                <div className="flex items-center space-x-1">
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="p-1 text-gray-400 hover:text-green-400 transition-colors duration-200"
                                      title="Mark as read"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                                    title="Delete"
                                  >
                                    <Delete className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">{notification.time}</span>
                                {!notification.read && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${getNotificationColor(notification.type)} bg-opacity-20 ${getNotificationIconColor(notification.type)}`}>
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <NotificationsIcon className="text-gray-600 text-4xl mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No Notifications</h3>
                    <p className="text-gray-500">You're all caught up!</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-700">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => {
                    setShowNotificationsModal(false);
                    if (isMobile) setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
                >
                  <span>View All Notifications</span>
                  <ArrowForward className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar with very low z-index to ensure it slides UNDER the navbar */}
      <motion.div
        variants={isMobile ? sidebarVariants : desktopSidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        className={responsiveClasses}
        style={{ zIndex: 0 }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Enhanced Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <SchoolIcon className="text-3xl text-primary-400" />
              </motion.div>
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                NdzyNote
              </motion.span>
            </div>
            
            {/* Close button for mobile */}
            <motion.button
              className="lg:hidden p-2 text-gray-400 bg-gradient-to-t from-red-400 to-red-600 transition-colors duration-200 rounded-lg"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseIcon />
            </motion.button>
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                >
                  {item.onClick ? (
                    <button
                      onClick={() => handleLinkClick(item)}
                      className={`group relative flex items-center space-x-4 px-4 py-3 w-full text-left rounded-xl 
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-white border border-primary-500/30' 
                          : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white'
                        }
                        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <Icon className={`text-xl ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'} transition-colors duration-200`} />
                        {item.badge > 0 && (
                          <motion.span 
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                            whileHover={{ scale: 1.2 }}
                          >
                            {item.loading ? (
                              <div className="animate-pulse bg-red-400 w-3 h-3 rounded-full"></div>
                            ) : (
                              Math.min(item.badge, 99)
                            )}
                          </motion.span>
                        )}
                      </motion.div>
                      <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </span>
                      
                      {/* Hover effect line */}
                      {!isActive && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                      )}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2" />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => handleLinkClick(item)}
                      className={`group relative flex items-center space-x-4 px-4 py-3 rounded-xl 
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-white border border-primary-500/30' 
                          : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white'
                        }
                        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <Icon className={`text-xl ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'} transition-colors duration-200`} />
                        {item.badge > 0 && (
                          <motion.span 
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                            whileHover={{ scale: 1.2 }}
                          >
                            {item.loading ? (
                              <div className="animate-pulse bg-red-400 w-3 h-3 rounded-full"></div>
                            ) : (
                              Math.min(item.badge, 99)
                            )}
                          </motion.span>
                        )}
                      </motion.div>
                      <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </span>
                      
                      {/* Hover effect line */}
                      {!isActive && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                      )}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2" />
                      )}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Enhanced User Profile Section - Hidden on mobile when modal is available */}
          <div className={`p-4 border-t border-gray-700 bg-gradient-to-t from-gray-800 to-gray-900 
            ${isMobile ? 'lg:block hidden' : 'block'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <motion.img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-xl border-2 border-primary-400 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <motion.div 
                  className="absolute -bottom-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Circle className={`w-4 h-4 ${getStatusColor(userData.onlineStatus)}`} />
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {userData.status}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Circle className={`w-2 h-2 ${getStatusColor(userData.onlineStatus)}`} />
                  <span className="text-xs text-gray-400 capitalize">
                    {userData.onlineStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Login Time */}
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-xl mb-4">
              <Schedule className="text-primary-400 text-lg" />
              <div>
                <p className="text-xs text-gray-400">Logged in at</p>
                <p className="text-sm font-semibold text-white">{loginTime}</p>
              </div>
            </div>

            {/* Badge Summary */}
            <div className="space-y-2">
              {badgeCounts.messages > 0 && (
                <Link
                  to="/dashboard/contacts"
                  className="flex items-center justify-between p-2 bg-blue-900 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-xs text-gray-400">Unread Messages</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {badgeCounts.messages}
                  </span>
                </Link>
              )}
              {badgeCounts.notifications > 0 && (
                <Link
                  to="/dashboard/notifications"
                  className="flex items-center justify-between p-2 bg-red-900 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-xs text-gray-400">Notifications</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {badgeCounts.notifications}
                  </span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};