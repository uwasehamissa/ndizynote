/* eslint-disable react-hooks/set-state-in-effect */
// components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  School as SchoolIcon,
  LibraryMusic as LibraryMusicIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  People as UsersIcon,
} from "@mui/icons-material";
import { DarkModeContext } from "../../App";
import { LanguageContext } from "../../App";
import { useAuth } from "../navigation/Navigation";
import { RwandaTime } from "../../App";

// ============================
// SIDEBAR COMPONENT
// ============================
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData(user);
  }, []);

  const menuItems = [
    { name: t.dashboard, icon: DashboardIcon, path: "/dashboard" },
    { name: t.userManagement, icon: UsersIcon, path: "/dashboard/users" },
    { name: t.instructors, icon: SchoolIcon, path: "/dashboard/instructors" },
    { name: t.courses, icon: LibraryMusicIcon, path: "/dashboard/courses" },
    { name: t.schedule, icon: ScheduleIcon, path: "/dashboard/schedule" },
    { name: t.payments, icon: PaymentIcon, path: "/dashboard/payments" },
    { name: t.analytics, icon: AnalyticsIcon, path: "/dashboard/analytics" },
    { name: t.settings, icon: SettingsIcon, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">NdzyNote</h2>
              <p className="text-xs text-gray-400">Music Academy</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <span className="sr-only">Close sidebar</span>
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => onClose()}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
                  isActive(item.path)
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className={`text-lg ${
                  isActive(item.path) 
                    ? "text-white" 
                    : "text-gray-400 group-hover:text-purple-400"
                }`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700 space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userData?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userData?.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {userData?.email || 'user@example.com'}
              </p>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  userData?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-xs text-gray-400 capitalize">
                  {userData?.status || 'active'}
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <LogoutIcon className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

// ============================
// DASHBOARD LAYOUT COMPONENT
// ============================
export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  // eslint-disable-next-line no-unused-vars
  const { currentLanguage, changeLanguage, t } = useContext(LanguageContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData(user);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <MenuIcon className="text-2xl" />
              </button>

              {/* Welcome Message */}
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome back, {userData?.name || 'User'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {userData?.role ? `Role: ${userData.role}` : 'Music Academy Dashboard'}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Rwanda Time */}
              <div className="hidden sm:block">
                <RwandaTime />
              </div>

              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="hidden sm:block px-3 py-1 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="english">🇺🇸 EN</option>
                <option value="french">🇫🇷 FR</option>
                <option value="kinyarwanda">🇷🇼 KN</option>
              </select>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="text-lg">
                  {isDarkMode ? "☀️" : "🌙"}
                </span>
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 relative">
                <NotificationsIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Status */}
              <div className="hidden sm:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <div className={`w-2 h-2 rounded-full ${
                  userData?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {userData?.status || 'active'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;