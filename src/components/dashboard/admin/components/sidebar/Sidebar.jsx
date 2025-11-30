/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Settings
} from '@mui/icons-material';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loginTime, setLoginTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const navigate = useNavigate();

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

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
        setShowUserModal(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    }
  };

  const menuItems = [
    { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: PeopleIcon, label: 'Students', path: '/students' },
    { icon: MusicNote, label: 'Instructors', path: '/instructors' },
    { icon: LibraryMusic, label: 'Courses', path: '/courses' },
    { icon: MessageIcon, label: 'Messages', path: '/messages', badge: 3 },
    { icon: BookIcon, label: 'Bookings', path: '/bookings' },
    { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/subscriptions' },
    { icon: NotificationsIcon, label: 'Notifications', path: '/notifications', badge: 5 },
    { icon: GraphicEq, label: 'Instruments', path: '/instruments' },
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

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  // Updated responsive classes with very low z-index for slide under behavior
  const responsiveClasses = `
    sidebar-container
    fixed lg:static z-0  /* Very low z-index to ensure it goes under navbar */
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
          fixed top-4 left-4 z-50  /* High z-index to stay above navbar */
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

      {/* User Info Button for Mobile - Stays above navbar */}
      <motion.button
        className="
          lg:hidden
          fixed top-4 right-4 z-50  /* High z-index to stay above navbar */
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
            className="fixed inset-0 bg-black bg-opacity-60 z-0 lg:hidden backdrop-blur-sm"  /* Very low z-index */
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* User Modal Overlay - This can stay at normal z-index since it's separate */}
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

      {/* Sidebar with very low z-index to ensure it slides UNDER the navbar */}
      <motion.div
        variants={isMobile ? sidebarVariants : desktopSidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        className={responsiveClasses}
        style={{ zIndex: 0 }} // Ensure it goes under navbar
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
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700 rounded-lg"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseIcon />
            </motion.button>
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                >
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className="group relative flex items-center space-x-4 px-4 py-3 text-gray-300 rounded-xl 
                      hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white 
                      transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Icon className="text-xl text-gray-400 group-hover:text-primary-400 transition-colors duration-200" />
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                    <span className="font-medium text-sm group-hover:text-white transition-colors duration-200">
                      {item.label}
                    </span>
                    
                    {/* Hover effect line */}
                    <div className="absolute left-0 top-1/2 w-1 h-8 bg-primary-400 rounded-r transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                  </Link>
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


          </div>
        </div>
      </motion.div>
    </>
  );
};