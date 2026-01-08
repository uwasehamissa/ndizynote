// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
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
//   Settings,
//   ArrowForward,
//   CheckCircle,
//   Error as ErrorIcon,
//   Info,
//   Warning,
//   MarkEmailRead,
//   Delete,
//   NotificationAdd,
//   ChevronRight,
//   ArrowBack,
//   Edit,
//   Save,
//   Cancel,
//   Visibility,
//   Person,
//   Email
// } from '@mui/icons-material';
// import axios from 'axios';

// // API Configuration
// const API_CONFIG = {
//   BASE_URL: 'https://ndizmusicprojectbackend.onrender.com',
//   ENDPOINTS: {
//     NOTIFICATIONS: '/api/notifications',
//     USERS: '/api/users',
//     MARK_READ: '/api/notifications/mark-read',
//     MARK_ALL_READ: '/api/notifications/mark-all-read'
//   }
// };

// // Create axios instance
// const api = axios.create({
//   baseURL: API_CONFIG.BASE_URL
// });

// export const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [loginTime, setLoginTime] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);
//   const [showNotificationDetailModal, setShowNotificationDetailModal] = useState(false);
//   const [badgeCounts, setBadgeCounts] = useState({
//     messages: 0,
//     notifications: 0
//   });
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState({
//     messages: false,
//     notifications: false,
//     notificationList: false
//   });
//   const [error, setError] = useState(null);
//   const [notificationPage, setNotificationPage] = useState(1);
//   const [totalNotificationPages, setTotalNotificationPages] = useState(1);
//   const [totalNotifications, setTotalNotifications] = useState(0);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const notificationsPerPage = 6;

//   // Function to get cookies properly
//   const getCookies = () => {
//     const cookies = {};
//     if (document.cookie) {
//       document.cookie.split(';').forEach(cookie => {
//         const [key, value] = cookie.trim().split('=');
//         if (key && value) {
//           try {
//             cookies[key] = decodeURIComponent(value);
//           } catch (e) {
//             cookies[key] = value;
//           }
//         }
//       });
//     }
//     return cookies;
//   };

//   // Get user data from cache/cookies
//   const getUserDataFromCache = () => {
//     console.log('Attempting to get user data from cache...');
    
//     // Check localStorage first
//     try {
//       const localStorageData = localStorage.getItem('userData');
//       if (localStorageData) {
//         console.log('Found user data in localStorage:', localStorageData);
//         return JSON.parse(localStorageData);
//       }
//     } catch (error) {
//       console.error('Error reading from localStorage:', error);
//     }

//     // Check sessionStorage
//     try {
//       const sessionStorageData = sessionStorage.getItem('userData');
//       if (sessionStorageData) {
//         console.log('Found user data in sessionStorage:', sessionStorageData);
//         return JSON.parse(sessionStorageData);
//       }
//     } catch (error) {
//       console.error('Error reading from sessionStorage:', error);
//     }

//     // Check cookies
//     try {
//       const cookies = getCookies();
//       console.log('All cookies:', cookies);
      
//       // Check for user data in cookies
//       if (cookies.userData) {
//         console.log('Found userData cookie:', cookies.userData);
//         return JSON.parse(cookies.userData);
//       }
      
//       // Check for auth tokens or user info
//       const possibleKeys = ['user', 'userInfo', 'authUser', 'currentUser', 'user_profile', 'auth_token'];
//       for (const key of possibleKeys) {
//         if (cookies[key]) {
//           console.log(`Found ${key} cookie:`, cookies[key]);
//           return JSON.parse(cookies[key]);
//         }
//       }
//     } catch (error) {
//       console.error('Error reading cookies:', error);
//     }

//     console.log('No user data found in cache/cookies');
//     return null;
//   };

//   // Get login time from cache
//   const getLoginTimeFromCache = () => {
//     try {
//       // Check localStorage
//       const cachedLoginTime = localStorage.getItem('loginTime');
//       if (cachedLoginTime) return cachedLoginTime;
      
//       // Check sessionStorage
//       const sessionLoginTime = sessionStorage.getItem('loginTime');
//       if (sessionLoginTime) return sessionLoginTime;
      
//       // Check cookies
//       const cookies = getCookies();
//       if (cookies.loginTime) return cookies.loginTime;
      
//       // If no cached time, set current time
//       const now = new Date();
//       const timeString = now.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       });
      
//       // Save to localStorage for future use
//       localStorage.setItem('loginTime', timeString);
//       return timeString;
//     } catch (error) {
//       console.error('Error getting login time:', error);
//       return new Date().toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       });
//     }
//   };

//   // API call for notifications
//   const fetchNotificationsFromAPI = async (page = 1) => {
//     try {
//       setLoading(prev => ({ ...prev, notificationList: true }));
      
//       const response = await api.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS, {
//         params: {
//           page: page,
//           limit: notificationsPerPage,
//           sort: '-createdAt'
//         }
//       });
      
//       if (response.data && response.data.success) {
//         const notificationsData = response.data.data || [];
//         const total = response.data.total || 0;
//         const totalPages = Math.ceil(total / notificationsPerPage);
        
//         // Transform API data to match our format
//         const formattedNotifications = notificationsData.map(notification => ({
//           id: notification._id || notification.id,
//           type: notification.type || 'info',
//           title: notification.title || 'Notification',
//           message: notification.message || '',
//           details: notification.details || notification.description || '',
//           time: formatTime(notification.createdAt),
//           read: notification.read || false,
//           icon: getIconForType(notification.type),
//           date: notification.createdAt,
//           priority: notification.priority || 'medium'
//         }));
        
//         setNotifications(formattedNotifications);
//         setTotalNotifications(total);
//         setTotalNotificationPages(totalPages);
//         setLoading(prev => ({ ...prev, notificationList: false }));
        
//         return { 
//           notifications: formattedNotifications, 
//           totalPages,
//           total
//         };
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (err) {
//       console.error('Error fetching notifications from API:', err);
//       setLoading(prev => ({ ...prev, notificationList: false }));
//       setError('Failed to load notifications');
//       return { notifications: [], totalPages: 1, total: 0 };
//     }
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     if (!dateString) return 'Just now';
    
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);
    
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
//     if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
//     return date.toLocaleDateString();
//   };

//   // Get icon based on notification type
//   const getIconForType = (type) => {
//     switch (type) {
//       case 'success': return CheckCircle;
//       case 'error': return ErrorIcon;
//       case 'warning': return Warning;
//       case 'info': return Info;
//       case 'message': return MessageIcon;
//       default: return Info;
//     }
//   };

//   // Fetch badge counts from API
//   const fetchBadgeCounts = async () => {
//     try {
//       setLoading(prev => ({ ...prev, notifications: true }));
      
//       // Fetch unread notifications count
//       const response = await api.get(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/unread-count`);
      
//       if (response.data && response.data.success) {
//         setBadgeCounts(prev => ({ 
//           ...prev, 
//           notifications: response.data.count || 0 
//         }));
//       }
      
//       setLoading(prev => ({ ...prev, notifications: false }));
//     } catch (err) {
//       console.error('Error fetching badge counts:', err);
//       // Use fallback values if API fails
//       setBadgeCounts(prev => ({ 
//         ...prev, 
//         notifications: notifications.filter(n => !n.read).length 
//       }));
//       setLoading(prev => ({ ...prev, notifications: false }));
//     }
//   };

//   // Fetch notifications list with pagination
//   const fetchNotifications = async (page = 1) => {
//     try {
//       const data = await fetchNotificationsFromAPI(page);
//       setNotifications(data.notifications);
//       setTotalNotificationPages(data.totalPages);
//       setTotalNotifications(data.total);
//       setNotificationPage(page);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   };

//   // Mark notification as read via API
//   const markAsRead = async (notificationId) => {
//     try {
//       const response = await api.post(`${API_CONFIG.ENDPOINTS.MARK_READ}/${notificationId}`);
      
//       if (response.data && response.data.success) {
//         // Update local state
//         setNotifications(prev => 
//           prev.map(notif => 
//             notif.id === notificationId ? { ...notif, read: true } : notif
//           )
//         );
        
//         // Update badge count
//         if (badgeCounts.notifications > 0) {
//           setBadgeCounts(prev => ({ ...prev, notifications: prev.notifications - 1 }));
//         }
        
//         return true;
//       }
//     } catch (err) {
//       console.error('Error marking notification as read:', err);
//       // Fallback: update locally even if API fails
//       setNotifications(prev => 
//         prev.map(notif => 
//           notif.id === notificationId ? { ...notif, read: true } : notif
//         )
//       );
//       if (badgeCounts.notifications > 0) {
//         setBadgeCounts(prev => ({ ...prev, notifications: prev.notifications - 1 }));
//       }
//       return false;
//     }
//   };

//   // Mark all notifications as read via API
//   const markAllAsRead = async () => {
//     try {
//       const response = await api.post(API_CONFIG.ENDPOINTS.MARK_ALL_READ);
      
//       if (response.data && response.data.success) {
//         // Update local state
//         setNotifications(prev => 
//           prev.map(notif => ({ ...notif, read: true }))
//         );
        
//         // Reset badge count
//         setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
        
//         return true;
//       }
//     } catch (err) {
//       console.error('Error marking all as read:', err);
//       // Fallback: update locally
//       setNotifications(prev => 
//         prev.map(notif => ({ ...notif, read: true }))
//       );
//       setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
//       return false;
//     }
//   };

//   // Delete notification via API
//   const deleteNotification = async (notificationId) => {
//     try {
//       const response = await api.delete(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/${notificationId}`);
      
//       if (response.data && response.data.success) {
//         // Remove from local state
//         setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
        
//         // Update total count
//         setTotalNotifications(prev => prev - 1);
        
//         // Close detail modal if it's open for this notification
//         if (selectedNotification && selectedNotification.id === notificationId) {
//           setShowNotificationDetailModal(false);
//           setSelectedNotification(null);
//         }
        
//         return true;
//       }
//     } catch (err) {
//       console.error('Error deleting notification:', err);
//       // Fallback: remove locally
//       setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
//       setTotalNotifications(prev => prev - 1);
//       if (selectedNotification && selectedNotification.id === notificationId) {
//         setShowNotificationDetailModal(false);
//         setSelectedNotification(null);
//       }
//       return false;
//     }
//   };

//   // View notification details
//   const viewNotificationDetails = (notification) => {
//     setSelectedNotification(notification);
//     setShowNotificationDetailModal(true);
    
//     // Mark as read when viewing details
//     if (!notification.read) {
//       markAsRead(notification.id);
//     }
//   };

//   // Handle pagination
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalNotificationPages) {
//       fetchNotifications(page);
//     }
//   };

//   // Open notifications modal
//   const openNotificationsModal = () => {
//     console.log('Opening notifications modal...');
//     fetchNotifications(1);
//     setShowNotificationsModal(true);
    
//     // Close sidebar if mobile
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   // Initialize component
//   useEffect(() => {
//     console.log('Sidebar component mounting...');
    
//     // Get user data from cache/cookies
//     const cachedUserData = getUserDataFromCache();
//     console.log('Retrieved user data:', cachedUserData);
    
//     if (cachedUserData) {
//       setUserData(cachedUserData);
//     } else {
//       // Fallback to default data
//       console.log('Using fallback user data');
//       setUserData({
//         name: 'User Name',
//         status: 'Music Director',
//         email: 'user@example.com',
//         onlineStatus: 'online',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&facepad=2'
//       });
//     }

//     // Get login time
//     const loginTimeStr = getLoginTimeFromCache();
//     setLoginTime(loginTimeStr);
//     console.log('Login time:', loginTimeStr);

//     // Fetch initial data
//     fetchBadgeCounts();
//     fetchNotifications(1);

//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setIsOpen(false);
//         setShowUserModal(false);
//         setShowNotificationsModal(false);
//         setShowNotificationDetailModal(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
    
//     // Poll for updates every 30 seconds
//     const pollInterval = setInterval(() => {
//       fetchBadgeCounts();
//       fetchNotifications(notificationPage);
//     }, 30000);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       clearInterval(pollInterval);
//     };
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
//     sessionStorage.removeItem('userData');
//     localStorage.removeItem('loginTime');
    
//     // Clear cookies
//     document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie = 'loginTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
//     // Redirect to login page
//     navigate('/login');
    
//     // Close all modals
//     if (isMobile) {
//       setIsOpen(false);
//       setShowUserModal(false);
//       setShowNotificationsModal(false);
//       setShowNotificationDetailModal(false);
//     }
//   };

//   // Menu items
//   const menuItems = [
//     { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard/user' },
//     { icon: PeopleIcon, label: 'Students', path: '/dashboard/me' },
//     { icon: MusicNote, label: 'Request', path: '/dashboard/me/contacts' },
//     { icon: LibraryMusic, label: 'Courses', path: '/dashboard/courses' },
//     { icon: BookIcon, label: 'Bookings', path: '/dashboard/booking' },
//     { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/dashboard/subscriptions' },
//     { icon: GraphicEq, label: 'Testimony', path: '/dashboard//me/testimony' },
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

//   const getNotificationColor = (type) => {
//     switch (type) {
//       case 'success': return 'bg-green-500';
//       case 'error': return 'bg-red-500';
//       case 'warning': return 'bg-yellow-500';
//       case 'info': return 'bg-blue-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getNotificationIconColor = (type) => {
//     switch (type) {
//       case 'success': return 'text-green-400';
//       case 'error': return 'text-red-400';
//       case 'warning': return 'text-yellow-400';
//       case 'info': return 'text-blue-400';
//       default: return 'text-gray-400';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-500';
//       case 'medium': return 'bg-yellow-500';
//       case 'low': return 'bg-green-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   // Sidebar variants
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

//   const notificationsModalVariants = {
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

//   const notificationDetailModalVariants = {
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

//   const handleLinkClick = (item) => {
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   const toggleUserModal = () => {
//     setShowUserModal(!showUserModal);
//   };

//   // Responsive classes
//   const responsiveClasses = `
//     sidebar-container
//     fixed lg:static z-0
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
//       {/* Mobile Menu Button */}
//       <motion.button
//         className="
//           lg:hidden 
//           fixed top-4 left-4 z-50
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

//       {/* Overlay */}
//       <AnimatePresence>
//         {(isOpen && isMobile) && (
//           <motion.div
//             variants={overlayVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 bg-black bg-opacity-60 z-0 lg:hidden backdrop-blur-sm"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* User Modal Overlay */}
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
//                       alt=""
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

//       {/* Notifications Modal Overlay */}
//       <AnimatePresence>
//         {showNotificationsModal && isMobile && (
//           <motion.div
//             variants={overlayVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
//             onClick={() => {
//               setShowNotificationsModal(false);
//               setNotificationPage(1);
//               setSelectedNotification(null);
//             }}
//           >
//             {/* Notifications Modal */}
//             <motion.div
//               variants={notificationsModalVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <NotificationsIcon className="text-primary-400" />
//                   <h2 className="text-lg font-bold text-white">Notifications</h2>
//                   {badgeCounts.notifications > 0 && (
//                     <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                       {badgeCounts.notifications} new
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={markAllAsRead}
//                     className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                     title="Mark all as read"
//                   >
//                     <MarkEmailRead />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowNotificationsModal(false);
//                       setNotificationPage(1);
//                       setSelectedNotification(null);
//                     }}
//                     className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>
//               </div>

//               {/* Notifications List */}
//               <div className="flex-1 overflow-y-auto p-4">
//                 {loading.notificationList ? (
//                   <div className="space-y-4">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="animate-pulse bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
//                           <div className="flex-1 space-y-2">
//                             <div className="h-4 bg-gray-600 rounded w-3/4"></div>
//                             <div className="h-3 bg-gray-600 rounded w-1/2"></div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : notifications.length > 0 ? (
//                   <div className="space-y-3">
//                     {notifications.map((notification) => {
//                       const Icon = notification.icon;
                      
//                       return (
//                         <motion.div
//                           key={notification.id}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className={`p-3 rounded-xl border ${notification.read ? 'border-gray-700 bg-gray-800' : 'border-primary-500 bg-gray-800 bg-opacity-50'}`}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)} bg-opacity-20`}>
//                               <Icon className={`text-lg ${getNotificationIconColor(notification.type)}`} />
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center justify-between mb-1">
//                                 <h3 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
//                                   {notification.title}
//                                 </h3>
//                                 <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)} bg-opacity-20 text-white`}>
//                                   {notification.priority}
//                                 </span>
//                               </div>
//                               <p className="text-sm text-gray-400 mb-2 truncate">{notification.message}</p>
//                               <div className="flex items-center justify-between">
//                                 <span className="text-xs text-gray-500">{notification.time}</span>
//                                 <div className="flex items-center space-x-2">
//                                   <button
//                                     onClick={() => viewNotificationDetails(notification)}
//                                     className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
//                                   >
//                                     <Visibility className="w-3 h-3" />
//                                     <span>View</span>
//                                   </button>
//                                   <button
//                                     onClick={() => deleteNotification(notification.id)}
//                                     className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
//                                   >
//                                     <Delete className="w-3 h-3" />
//                                     <span>Delete</span>
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-full text-center p-8">
//                     <NotificationsIcon className="text-gray-600 text-4xl mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-400 mb-2">No Notifications</h3>
//                     <p className="text-gray-500">You're all caught up!</p>
//                   </div>
//                 )}
//               </div>

//               {/* Pagination Controls */}
//               {notifications.length > 0 && totalNotificationPages > 1 && (
//                 <div className="p-4 border-t border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={() => handlePageChange(notificationPage - 1)}
//                       disabled={notificationPage === 1}
//                       className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
//                         notificationPage === 1
//                           ? 'text-gray-500 cursor-not-allowed'
//                           : 'text-gray-300 hover:text-white hover:bg-gray-700'
//                       }`}
//                     >
//                       <ArrowBack className="w-4 h-4" />
//                       <span>Previous</span>
//                     </button>
                    
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-gray-400">
//                         Page {notificationPage} of {totalNotificationPages}
//                       </span>
//                     </div>
                    
//                     <button
//                       onClick={() => handlePageChange(notificationPage + 1)}
//                       disabled={notificationPage === totalNotificationPages}
//                       className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
//                         notificationPage === totalNotificationPages
//                           ? 'text-gray-500 cursor-not-allowed'
//                           : 'text-gray-300 hover:text-white hover:bg-gray-700'
//                       }`}
//                     >
//                       <span>Next</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Info about total notifications */}
//               <div className="p-4 border-t border-gray-700">
//                 <div className="text-center text-sm text-gray-400">
//                   Showing {notifications.length} of {totalNotifications} notifications
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Notification Detail Modal */}
//       <AnimatePresence>
//         {showNotificationDetailModal && selectedNotification && (
//           <motion.div
//             variants={overlayVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
//             onClick={() => {
//               setShowNotificationDetailModal(false);
//               setSelectedNotification(null);
//             }}
//           >
//             <motion.div
//               variants={notificationDetailModalVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className={`p-2 rounded-lg ${getNotificationColor(selectedNotification.type)} bg-opacity-20`}>
//                     {(() => {
//                       const Icon = selectedNotification.icon;
//                       return <Icon className={`text-lg ${getNotificationIconColor(selectedNotification.type)}`} />;
//                     })()}
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-white">{selectedNotification.title}</h2>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <span className="text-xs text-gray-400">{selectedNotification.time}</span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedNotification.priority)}`}>
//                         {selectedNotification.priority}
//                       </span>
//                       {!selectedNotification.read && (
//                         <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white">
//                           New
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => deleteNotification(selectedNotification.id)}
//                     className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors duration-200"
//                     title="Delete"
//                   >
//                     <Delete />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowNotificationDetailModal(false);
//                       setSelectedNotification(null);
//                     }}
//                     className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>
//               </div>

//               {/* Notification Details */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-400 mb-2">Message</h3>
//                     <p className="text-white bg-gray-700 p-4 rounded-lg">{selectedNotification.message}</p>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-400 mb-2">Details</h3>
//                     <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-line text-gray-200">
//                       {selectedNotification.details || 'No additional details available.'}
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-700 p-3 rounded-lg">
//                       <h4 className="text-xs text-gray-400 mb-1">Type</h4>
//                       <span className={`text-sm font-medium ${getNotificationIconColor(selectedNotification.type)}`}>
//                         {selectedNotification.type.charAt(0).toUpperCase() + selectedNotification.type.slice(1)}
//                       </span>
//                     </div>
//                     <div className="bg-gray-700 p-3 rounded-lg">
//                       <h4 className="text-xs text-gray-400 mb-1">Status</h4>
//                       <span className={`text-sm font-medium ${selectedNotification.read ? 'text-green-400' : 'text-yellow-400'}`}>
//                         {selectedNotification.read ? 'Read' : 'Unread'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="p-4 border-t border-gray-700">
//                 <button
//                   onClick={() => {
//                     setShowNotificationDetailModal(false);
//                     setSelectedNotification(null);
//                   }}
//                   className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
//                 >
//                   <span>Close Details</span>
//                   <ArrowForward className="w-4 h-4 transform rotate-180" />
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <motion.div
//         variants={isMobile ? sidebarVariants : desktopSidebarVariants}
//         initial={isMobile ? "closed" : "open"}
//         animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
//         className={responsiveClasses}
//         style={{ zIndex: 0 }}
//       >
//         <div className="flex flex-col h-full overflow-y-auto">
//           {/* Logo Section */}
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
//               className="lg:hidden p-2 text-gray-400 bg-gradient-to-t from-red-400 to-red-600 transition-colors duration-200 rounded-lg"
//               onClick={() => setIsOpen(false)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <CloseIcon />
//             </motion.button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.path;
              
//               return (
//                 <motion.div key={item.label}>
//                   <Link
//                     to={item.path}
//                     onClick={() => handleLinkClick(item)}
//                     className={`group relative flex items-center space-x-4 px-4 py-3 rounded-xl 
//                       ${isActive 
//                         ? 'bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-white border border-primary-500/30' 
//                         : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white'
//                       }
//                       transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Icon className={`text-xl ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'} transition-colors duration-200`} />
//                     </motion.div>
//                     <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
//                       {item.label}
//                     </span>
                    
//                     {/* Hover effect line */}
//                     {!isActive && (
//                       <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
//                     )}
//                     {isActive && (
//                       <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2" />
//                     )}
//                   </Link>
//                 </motion.div>
//               );
//             })}

//             {/* Notification Button in Sidebar Navigation - Opens modal */}
//             <motion.div>
//               <button
//                 onClick={openNotificationsModal}
//                 className={`group relative flex items-center space-x-4 px-4 py-3 w-full text-left rounded-xl 
//                   text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white
//                   transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="relative"
//                 >
//                   <NotificationsIcon className="text-xl text-gray-400 group-hover:text-primary-400 transition-colors duration-200" />
//                   {badgeCounts.notifications > 0 && (
//                     <motion.span 
//                       className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: 'spring', stiffness: 500, damping: 20 }}
//                       whileHover={{ scale: 1.2 }}
//                     >
//                       {loading.notifications ? (
//                         <div className="animate-pulse bg-red-400 w-3 h-3 rounded-full"></div>
//                       ) : (
//                         Math.min(badgeCounts.notifications, 99)
//                       )}
//                     </motion.span>
//                   )}
//                 </motion.div>
//                 <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
//                   Notifications
//                 </span>
                
//                 {/* Hover effect line */}
//                 <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
//               </button>
//             </motion.div>
//           </nav>

//           {/* User Profile Section */}
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
//                 <div className="flex items-center space-x-2 mb-1">
//                   <Person className="w-3 h-3 text-gray-400" />
//                   <p className="text-sm font-semibold text-white truncate">
//                     {userData.name}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Email className="w-3 h-3 text-gray-400" />
//                   <p className="text-xs text-gray-400 truncate">
//                     {userData.email}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-500 truncate mt-1">
//                   {userData.status}
//                 </p>
//               </div>
//             </div>

//             {/* Login Time */}
//             <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-xl mb-4">
//               <Schedule className="text-primary-400 text-lg" />
//               <div>
//                 <p className="text-xs text-gray-400">Logged in at</p>
//                 <p className="text-sm font-semibold text-white">{loginTime}</p>
//               </div>
//             </div>

//             {/* Notification Badge */}
//             {badgeCounts.notifications > 0 && (
//               <button
//                 onClick={openNotificationsModal}
//                 className="w-full flex items-center justify-between p-3 bg-red-900 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200 mb-2"
//               >
//                 <span className="text-xs text-gray-400">Unread Notifications</span>
//                 <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                   {badgeCounts.notifications}
//                 </span>
//               </button>
//             )}
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
  Delete,
  NotificationAdd,
  ChevronRight,
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Visibility,
  Person,
  Email,
  Badge,
  Phone,
  LocationOn,
  CalendarToday
} from '@mui/icons-material';
import axios from 'axios';

// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://ndizmusicprojectbackend.onrender.com',
  ENDPOINTS: {
    NOTIFICATIONS: '/api/notifications',
    USERS: '/api/users',
    PROFILE: '/api/users/profile',
    MARK_READ: '/api/notifications/mark-read',
    MARK_ALL_READ: '/api/notifications/mark-all-read'
  }
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true
});

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loginTime, setLoginTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showNotificationDetailModal, setShowNotificationDetailModal] = useState(false);
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
  const [notificationPage, setNotificationPage] = useState(1);
  const [totalNotificationPages, setTotalNotificationPages] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const notificationsPerPage = 6;

  // Function to get cookies properly
  const getCookies = () => {
    const cookies = {};
    if (document.cookie) {
      document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) {
          try {
            cookies[key] = decodeURIComponent(value);
          } catch (e) {
            cookies[key] = value;
          }
        }
      });
    }
    return cookies;
  };

  const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  // Format user data function
  const formatUserData = (data) => {
    console.log('Formatting user data:', data);
    
    // Handle different API response formats
    const userObj = data.data || data.user || data;
    
    return {
      id: userObj._id || userObj.id || 'N/A',
      name: userObj.name || userObj.username || userObj.fullName || 'User Name',
      email: userObj.email || 'user@example.com',
      phone: userObj.phone || userObj.phoneNumber || 'Not provided',
      status: userObj.role || userObj.position || userObj.status || 'Music Director',
      onlineStatus: 'online',
      avatar: userObj.avatar || userObj.profileImage || userObj.image || 
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      joinDate: userObj.createdAt || userObj.joinDate || new Date().toISOString(),
      location: userObj.location || userObj.address || 'Not specified',
      bio: userObj.bio || userObj.description || 'No bio available',
      preferences: userObj.preferences || {},
      verified: userObj.verified || userObj.emailVerified || false
    };
  };

  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  // Get icon based on notification type
  const getIconForType = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return ErrorIcon;
      case 'warning': return Warning;
      case 'info': return Info;
      case 'message': return MessageIcon;
      case 'booking': return BookIcon;
      case 'subscription': return SubscriptionsIcon;
      default: return Info;
    }
  };

  // Get user data from cache/cookies
  const getUserDataFromCache = () => {
    console.log('Checking for cached user data...');
    
    const storageKeys = [
      'userData', 'user', 'userInfo', 'authUser', 'currentUser', 
      'user_profile', 'ndizy_user', 'music_app_user'
    ];
    
    // Check localStorage
    for (const key of storageKeys) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          console.log(`Found user data in localStorage: ${key}`);
          const parsed = JSON.parse(data);
          return formatUserData(parsed);
        }
      } catch (e) {
        console.warn(`Error parsing localStorage key ${key}:`, e);
      }
    }
    
    // Check sessionStorage
    for (const key of storageKeys) {
      try {
        const data = sessionStorage.getItem(key);
        if (data) {
          console.log(`Found user data in sessionStorage: ${key}`);
          const parsed = JSON.parse(data);
          return formatUserData(parsed);
        }
      } catch (e) {
        console.warn(`Error parsing sessionStorage key ${key}:`, e);
      }
    }
    
    // Check cookies
    const cookies = getCookies();
    const cookieKeys = [
      'userData', 'user', 'userInfo', 'auth_user', 'current_user',
      'ndizy_user_data', 'music_app_user_data'
    ];
    
    for (const key of cookieKeys) {
      if (cookies[key]) {
        console.log(`Found user data in cookie: ${key}`);
        try {
          const parsed = JSON.parse(cookies[key]);
          return formatUserData(parsed);
        } catch (e) {
          console.warn(`Error parsing cookie ${key}:`, e);
        }
      }
    }
    
    console.log('No user data found in cache/cookies');
    return null;
  };

  // Fetch user data from API
  const fetchUserDataFromAPI = async () => {
    try {
      console.log('Fetching user data from API...');
      setLoadingUser(true);
      
      // Try to get profile data
      const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json'
        },
        validateStatus: (status) => status < 500
      });
      
      console.log('API Response:', response.data);
      
      if (response.data && (response.data.success || response.data.user || response.data.data)) {
        const userData = formatUserData(response.data);
        
        // Cache the data
        localStorage.setItem('userData', JSON.stringify(userData));
        setCookie('userData', JSON.stringify(userData));
        
        console.log('User data fetched from API:', userData);
        return userData;
      }
      
      throw new Error('Invalid API response format');
      
    } catch (error) {
      console.error('Error fetching user data from API:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Authentication error - user might need to login');
      }
      
      return null;
    } finally {
      setLoadingUser(false);
    }
  };

  // Get login time from cache
  const getLoginTimeFromCache = () => {
    try {
      // Check localStorage
      const cachedLoginTime = localStorage.getItem('loginTime');
      if (cachedLoginTime) {
        console.log('Using cached login time:', cachedLoginTime);
        return cachedLoginTime;
      }
      
      // Check sessionStorage
      const sessionLoginTime = sessionStorage.getItem('loginTime');
      if (sessionLoginTime) return sessionLoginTime;
      
      // Check cookies
      const cookies = getCookies();
      if (cookies.loginTime) return cookies.loginTime;
      
      // If no cached time, set current time
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      // Save to localStorage for future use
      localStorage.setItem('loginTime', timeString);
      setCookie('loginTime', timeString);
      return timeString;
    } catch (error) {
      console.error('Error getting login time:', error);
      return new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }
  };

  // Load user data - tries API first, then cache
  const loadUserData = async () => {
    console.log('Loading user data...');
    
    // First try to get from API (most up-to-date)
    const apiUserData = await fetchUserDataFromAPI();
    if (apiUserData) {
      setUserData(apiUserData);
      return;
    }
    
    // If API fails, try cache
    const cachedUserData = getUserDataFromCache();
    if (cachedUserData) {
      console.log('Using cached user data');
      setUserData(cachedUserData);
      return;
    }
    
    // Fallback to default data
    console.log('Using fallback user data');

  };  

  // API call for notifications
  const fetchNotificationsFromAPI = async (page = 1) => {
    try {
      setLoading(prev => ({ ...prev, notificationList: true }));
      
      const response = await api.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS, {
        params: {
          page: page,
          limit: notificationsPerPage,
          sort: '-createdAt',
          userId: userData?.id
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      
      if (response.data && response.data.success) {
        const notificationsData = response.data.data || [];
        const total = response.data.total || 0;
        const totalPages = Math.ceil(total / notificationsPerPage);
        
        // Transform API data to match our format
        const formattedNotifications = notificationsData.map(notification => ({
          id: notification._id || notification.id,
          type: notification.type || 'info',
          title: notification.title || 'Notification',
          message: notification.message || '',
          details: notification.details || notification.description || '',
          time: formatTime(notification.createdAt),
          read: notification.read || false,
          icon: getIconForType(notification.type),
          date: notification.createdAt,
          priority: notification.priority || 'medium',
          userId: notification.userId,
          actionUrl: notification.actionUrl
        }));
        
        setNotifications(formattedNotifications);
        setTotalNotifications(total);
        setTotalNotificationPages(totalPages);
        setLoading(prev => ({ ...prev, notificationList: false }));
        
        return { 
          notifications: formattedNotifications, 
          totalPages,
          total
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching notifications from API:', err);
      setLoading(prev => ({ ...prev, notificationList: false }));
      setError('Failed to load notifications');
      return { notifications: [], totalPages: 1, total: 0 };
    }
  };

  // Fetch badge counts from API
  const fetchBadgeCounts = async () => {
    try {
      setLoading(prev => ({ ...prev, notifications: true }));
      
      // Fetch unread notifications count
      const response = await api.get(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/unread`, {
        params: { userId: userData?.id }
      });
      
      if (response.data && response.data.success) {
        setBadgeCounts(prev => ({ 
          ...prev, 
          notifications: response.data.count || 0 
        }));
      }
      
      setLoading(prev => ({ ...prev, notifications: false }));
    } catch (err) {
      console.error('Error fetching badge counts:', err);
      // Use fallback values if API fails
      setBadgeCounts(prev => ({ 
        ...prev, 
        notifications: notifications.filter(n => !n.read).length 
      }));
      setLoading(prev => ({ ...prev, notifications: false }));
    }
  };

  // Fetch notifications list with pagination
  const fetchNotifications = async (page = 1) => {
    try {
      const data = await fetchNotificationsFromAPI(page);
      setNotifications(data.notifications);
      setTotalNotificationPages(data.totalPages);
      setTotalNotifications(data.total);
      setNotificationPage(page);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  // Mark notification as read via API
  const markAsRead = async (notificationId) => {
    try {
      const response = await api.post(`${API_CONFIG.ENDPOINTS.MARK_READ}/${notificationId}`);
      
      if (response.data && response.data.success) {
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
        
        return true;
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Fallback: update locally even if API fails
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      if (badgeCounts.notifications > 0) {
        setBadgeCounts(prev => ({ ...prev, notifications: prev.notifications - 1 }));
      }
      return false;
    }
  };

  // Mark all notifications as read via API
  const markAllAsRead = async () => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.MARK_ALL_READ);
      
      if (response.data && response.data.success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        );
        
        // Reset badge count
        setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
        
        return true;
      }
    } catch (err) {
      console.error('Error marking all as read:', err);
      // Fallback: update locally
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
      setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
      return false;
    }
  };

  // Delete notification via API
  const deleteNotification = async (notificationId) => {
    try {
      const response = await api.delete(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/${notificationId}`);
      
      if (response.data && response.data.success) {
        // Remove from local state
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
        
        // Update total count
        setTotalNotifications(prev => prev - 1);
        
        // Close detail modal if it's open for this notification
        if (selectedNotification && selectedNotification.id === notificationId) {
          setShowNotificationDetailModal(false);
          setSelectedNotification(null);
        }
        
        return true;
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
      // Fallback: remove locally
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      setTotalNotifications(prev => prev - 1);
      if (selectedNotification && selectedNotification.id === notificationId) {
        setShowNotificationDetailModal(false);
        setSelectedNotification(null);
      }
      return false;
    }
  };

  // View notification details
  const viewNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetailModal(true);
    
    // Mark as read when viewing details
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalNotificationPages) {
      fetchNotifications(page);
    }
  };

  // Open notifications modal
  const openNotificationsModal = () => {
    console.log('Opening notifications modal...');
    fetchNotifications(1);
    setShowNotificationsModal(true);
    
    // Close sidebar if mobile
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Initialize component
  useEffect(() => {
    console.log('Sidebar component mounting...');
    
    const init = async () => {
      await loadUserData();
      const loginTimeStr = getLoginTimeFromCache();
      setLoginTime(loginTimeStr);
      console.log('Login time:', loginTimeStr);

      if (userData) {
        fetchBadgeCounts();
        fetchNotifications(1);
      }
    };
    
    init();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
        setShowUserModal(false);
        setShowNotificationsModal(false);
        setShowNotificationDetailModal(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Poll for updates every 30 seconds
    const pollInterval = setInterval(() => {
      if (userData) {
        fetchBadgeCounts();
        fetchNotifications(notificationPage);
      }
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
  const handleLogout = async () => {
    try {
      // Try API logout if available
      try {
        await api.post('/api/auth/logout');
      } catch (apiError) {
        console.warn('Logout API call failed, proceeding with local cleanup');
      }
      
      // Clear cached user data
      const storageKeys = [
        'userData', 'user', 'userInfo', 'authUser', 'currentUser',
        'user_profile', 'ndizy_user', 'music_app_user', 'token',
        'access_token', 'refresh_token', 'loginTime'
      ];
      
      storageKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Clear cookies
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.trim().split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      
      // Redirect to login page
      navigate('/login');
      
      // Close all modals
      if (isMobile) {
        setIsOpen(false);
        setShowUserModal(false);
        setShowNotificationsModal(false);
        setShowNotificationDetailModal(false);
      }
      
      // Force reload to clear any state
      window.location.reload();
      
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/login');
    }
  };

  // Menu items
  const menuItems = [
    { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard/user' },
    { icon: PeopleIcon, label: 'Students', path: '/dashboard/me' },
    { icon: MusicNote, label: 'Request', path: '/dashboard/me/contacts' },
    { icon: LibraryMusic, label: 'Courses', path: '/dashboard/courses' },
    { icon: BookIcon, label: 'Bookings', path: '/dashboard/booking' },
    { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/dashboard/subscriptions' },
    { icon: GraphicEq, label: 'Testimony', path: '/dashboard//me/testimony' },
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Sidebar variants
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

  const notificationDetailModalVariants = {
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
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  // Responsive classes
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

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
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

      {/* Overlay */}
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
              className="absolute top-20 right-4 w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Header */}
              <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-16 h-16 rounded-xl border-4 border-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      <Circle className={`w-5 h-5 ${getStatusColor(userData.onlineStatus)} bg-white rounded-full`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                      {userData.verified && (
                        <Badge className="text-blue-400" title="Verified" />
                      )}
                    </div>
                    <p className="text-sm text-white/90">{userData.status}</p>
                    <p className="text-xs text-white/70 mt-1">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <Phone className="text-primary-400 text-sm" />
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-sm font-semibold text-white">{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <LocationOn className="text-primary-400 text-sm" />
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm font-semibold text-white">{userData.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Schedule className="text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400">Logged in at</p>
                    <p className="text-sm font-semibold text-white">{loginTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <CalendarToday className="text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400">Member since</p>
                    <p className="text-sm font-semibold text-white">
                      {new Date(userData.joinDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Circle className={`w-3 h-3 ${getStatusColor(userData.onlineStatus)}`} />
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm font-semibold text-white capitalize">{userData.onlineStatus}</p>
                  </div>
                </div>

                {userData.bio && (
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Bio</p>
                    <p className="text-sm text-gray-300">{userData.bio}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-700 space-y-2">
                <button className="w-full flex items-center justify-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Settings className="text-lg" />
                  <span>Account Settings</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 p-3 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 rounded-lg transition-all duration-200"
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
            onClick={() => {
              setShowNotificationsModal(false);
              setNotificationPage(1);
              setSelectedNotification(null);
            }}
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
                    onClick={() => {
                      setShowNotificationsModal(false);
                      setNotificationPage(1);
                      setSelectedNotification(null);
                    }}
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
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                                  {notification.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)} bg-opacity-20 text-white`}>
                                  {notification.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2 truncate">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{notification.time}</span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => viewNotificationDetails(notification)}
                                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                                  >
                                    <Visibility className="w-3 h-3" />
                                    <span>View</span>
                                  </button>
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
                                  >
                                    <Delete className="w-3 h-3" />
                                    <span>Delete</span>
                                  </button>
                                </div>
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

              {/* Pagination Controls */}
              {notifications.length > 0 && totalNotificationPages > 1 && (
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePageChange(notificationPage - 1)}
                      disabled={notificationPage === 1}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        notificationPage === 1
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <ArrowBack className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        Page {notificationPage} of {totalNotificationPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(notificationPage + 1)}
                      disabled={notificationPage === totalNotificationPages}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        notificationPage === totalNotificationPages
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Info about total notifications */}
              <div className="p-4 border-t border-gray-700">
                <div className="text-center text-sm text-gray-400">
                  Showing {notifications.length} of {totalNotifications} notifications
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Detail Modal */}
      <AnimatePresence>
        {showNotificationDetailModal && selectedNotification && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
            onClick={() => {
              setShowNotificationDetailModal(false);
              setSelectedNotification(null);
            }}
          >
            <motion.div
              variants={notificationDetailModalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getNotificationColor(selectedNotification.type)} bg-opacity-20`}>
                    {(() => {
                      const Icon = selectedNotification.icon;
                      return <Icon className={`text-lg ${getNotificationIconColor(selectedNotification.type)}`} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedNotification.title}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">{selectedNotification.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedNotification.priority)}`}>
                        {selectedNotification.priority}
                      </span>
                      {!selectedNotification.read && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Delete />
                  </button>
                  <button
                    onClick={() => {
                      setShowNotificationDetailModal(false);
                      setSelectedNotification(null);
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Notification Details */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Message</h3>
                    <p className="text-white bg-gray-700 p-4 rounded-lg">{selectedNotification.message}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Details</h3>
                    <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-line text-gray-200">
                      {selectedNotification.details || 'No additional details available.'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 mb-1">Type</h4>
                      <span className={`text-sm font-medium ${getNotificationIconColor(selectedNotification.type)}`}>
                        {selectedNotification.type.charAt(0).toUpperCase() + selectedNotification.type.slice(1)}
                      </span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 mb-1">Status</h4>
                      <span className={`text-sm font-medium ${selectedNotification.read ? 'text-green-400' : 'text-yellow-400'}`}>
                        {selectedNotification.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    setShowNotificationDetailModal(false);
                    setSelectedNotification(null);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
                >
                  <span>Close Details</span>
                  <ArrowForward className="w-4 h-4 transform rotate-180" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={isMobile ? sidebarVariants : desktopSidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        className={responsiveClasses}
        style={{ zIndex: 0 }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
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

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div key={item.label}>
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
                    >
                      <Icon className={`text-xl ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'} transition-colors duration-200`} />
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
                </motion.div>
              );
            })}

            {/* Notification Button in Sidebar Navigation - Opens modal */}
            <motion.div>
              <button
                onClick={openNotificationsModal}
                className={`group relative flex items-center space-x-4 px-4 py-3 w-full text-left rounded-xl 
                  text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <NotificationsIcon className="text-xl text-gray-400 group-hover:text-primary-400 transition-colors duration-200" />
                  {badgeCounts.notifications > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {loading.notifications ? (
                        <div className="animate-pulse bg-red-400 w-3 h-3 rounded-full"></div>
                      ) : (
                        Math.min(badgeCounts.notifications, 99)
                      )}
                    </motion.span>
                  )}
                </motion.div>
                <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
                  Notifications
                </span>
                
                {/* Hover effect line */}
                <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              </button>
            </motion.div>
          </nav>

          {/* User Profile Section */}
          <div className={`p-4 border-t border-gray-700 bg-gradient-to-t from-gray-800 to-gray-900 
            ${isMobile ? 'lg:block hidden' : 'block'}`}>
            <motion.div 
              className="flex items-center space-x-3 mb-4 cursor-pointer"
              onClick={toggleUserModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
                  <Circle className={`w-4 h-4 ${getStatusColor(userData.onlineStatus)} bg-gray-900 rounded-full p-0.5`} />
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge className="w-3 h-3 text-primary-400" />
                  <p className="text-sm font-semibold text-white truncate">
                    {userData.name}
                  </p>
                  {userData.verified && (
                    <span className="text-xs bg-blue-500 text-white px-1 rounded" title="Verified">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Email className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-400 truncate">
                    {userData.email}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-primary-300 truncate">
                    {userData.status}
                  </p>
                  <span className="text-xs text-gray-500">
                    {userData.role}
                  </span>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </motion.div>

            {/* Login Time */}
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-xl mb-4">
              <Schedule className="text-primary-400 text-lg" />
              <div>
                <p className="text-xs text-gray-400">Logged in at</p>
                <p className="text-sm font-semibold text-white">{loginTime}</p>
              </div>
            </div>

            {/* Notification Badge */}
            {badgeCounts.notifications > 0 && (
              <button
                onClick={openNotificationsModal}
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-lg hover:from-red-900/30 hover:to-pink-900/30 transition-all duration-200 mb-2 border border-red-500/20"
              >
                <div className="flex items-center space-x-2">
                  <NotificationsIcon className="text-red-400 text-sm" />
                  <span className="text-xs text-gray-300">Unread Notifications</span>
                </div>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {badgeCounts.notifications}
                </span>
              </button>
            )}
            
            {/* User Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400">Role</p>
                <p className="text-sm font-semibold text-primary-300">{userData.role}</p>
              </div>
              <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400">Status</p>
                <p className={`text-sm font-semibold ${getStatusColor(userData.onlineStatus)}`}>
                  {userData.onlineStatus}
                </p>
              </div>
              <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400">ID</p>
                <p className="text-xs font-mono text-gray-300 truncate" title={userData.id}>
                  {userData.id.substring(0, 4)}...
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};