/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  ReferenceLine,
} from "recharts";
import {
  People as UsersIcon,
  TrendingUp,
  TrendingDown,
  MusicNote,
  Piano,
  VolumeUp,
  People,
  Subscriptions,
  Menu as MenuIcon,
  BookOnline,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  MusicVideo,
  School,
  AttachMoney,
  PersonAdd,
  Schedule,
  CheckCircle,
  Pending,
  ExpandMore,
  ExpandLess,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
  AccountCircle,
  ShowChart,
  Timeline,
  Equalizer,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Assessment,
} from "@mui/icons-material";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Helper function to get email from cookies
const getEmailFromCookies = () => {
  const possibleCookieNames = [
    "userEmail",
    "email",
    "user_email",
    "auth_email",
    "login_email",
    "userData",
    "user",
    "currentUser",
  ];

  for (const cookieName of possibleCookieNames) {
    const cookieValue = getCookie(cookieName);
    if (cookieValue) {
      try {
        const parsed = JSON.parse(cookieValue);
        if (parsed.email) return parsed.email;
        if (parsed.userEmail) return parsed.userEmail;
        if (parsed.user && parsed.user.email) return parsed.user.email;
      } catch (e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(cookieValue)) {
          return cookieValue;
        }
      }
    }
  }

  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.email) return parsed.email;
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return null;
};

// Enhanced Notification Modal Component
const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return <BookOnline className="text-blue-500" />;
      case "user":
        return <PersonAdd className="text-green-500" />;
      case "payment":
        return <AttachMoney className="text-yellow-500" />;
      case "alert":
        return <ErrorIcon className="text-red-500" />;
      case "course":
        return <School className="text-purple-500" />;
      case "system":
        return <MusicVideo className="text-indigo-500" />;
      default:
        return <NotificationsIcon className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-white";
      case "medium":
        return "border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-white";
      case "low":
        return "border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white";
      default:
        return "border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-4 top-4 md:inset-x-auto md:right-4 md:top-16 md:left-auto z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full md:w-96"
          >
            <div className="flex flex-col h-full max-h-[80vh]">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <NotificationsIcon className="text-white" />
                    {notifications.filter((n) => n.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Notifications
                    </h3>
                    <p className="text-sm text-blue-100">
                      {notifications.filter((n) => n.unread).length} unread •{" "}
                      {notifications.length} total
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  aria-label="Close notifications"
                >
                  <CloseIcon className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-gray-50/50 transition-all duration-300 ${getPriorityColor(
                          notification.priority,
                        )} ${notification.unread ? "bg-blue-50/30" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-2 rounded-lg bg-white shadow-sm">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-bold text-gray-900">
                                {notification.title}
                              </h4>
                              {notification.priority === "high" && (
                                <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">
                                  Important
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            {notification.details && (
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.details}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {notification.time}
                                </span>
                                {notification.category && (
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {notification.category}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {notification.unread && (
                                  <button
                                    onClick={() =>
                                      onMarkAsRead(notification.id)
                                    }
                                    className="p-1.5 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                                    aria-label="Mark as read"
                                    title="Mark as read"
                                  >
                                    <MarkReadIcon className="text-blue-600 w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => onDelete(notification.id)}
                                  className="p-1.5 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                                  aria-label="Delete notification"
                                  title="Delete notification"
                                >
                                  <DeleteIcon className="text-red-600 w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-inner"
                    >
                      <NotificationsIcon className="text-blue-400 w-10 h-10" />
                    </motion.div>
                    <p className="text-gray-700 font-bold text-lg text-center">
                      No notifications yet
                    </p>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      You'll see important updates here
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-center">
                  <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => {
                      notifications.forEach((n) => {
                        if (n.unread) onMarkAsRead(n.id);
                      });
                    }}
                  >
                    <MarkReadIcon className="w-4 h-4" />
                    Mark all as read
                  </button>
                  <button
                    className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    onClick={() => {
                      notifications.forEach((n) => onDelete(n.id));
                    }}
                  >
                    <DeleteIcon className="w-4 h-4" />
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// API Configuration
const API_CONFIG = {
  BASE_URL: "https://ndizmusicprojectbackend.onrender.com",
  ENDPOINTS: {
    USERS: "/api/users",
    BOOKINGS: "/api/bookings",
    COURSES: "/api/courses",
    INSTRUCTORS: "/api/instructors",
    REVENUE: "/api/revenue",
    ACTIVITIES: "/api/activities",
    DASHBOARD_STATS: "/stats/dashboard",
    NOTIFICATIONS: "/api/notifications",
  },
};

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Get current user from cookies
const getCurrentUserFromCookies = async () => {
  try {
    const userEmail = getEmailFromCookies();

    if (!userEmail) {
      console.warn("No email found in cookies or localStorage");
      return null;
    }

    console.log("Found email from cookies:", userEmail);

    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
      if (response.data?.data) {
        const user = response.data.data.find(
          (u) =>
            u.email === userEmail ||
            u.userEmail === userEmail ||
            (u.email && u.email.toLowerCase() === userEmail.toLowerCase()),
        );

        if (user) {
          console.log("Found user from API:", user);
          return user;
        }
      }
    } catch (apiError) {
      console.warn("Could not fetch user from API:", apiError);
    }

    return {
      email: userEmail,
      name: userEmail.split("@")[0],
      status: "user",
      source: "cookie",
    };
  } catch (error) {
    console.error("Error getting current user from cookies:", error);
    return null;
  }
};

// API Service functions
const fetchUsersData = async (currentUserEmail) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
    let filteredData = response.data;

    if (currentUserEmail && response.data?.data) {
      const currentUser = response.data.data.find(
        (user) =>
          user.email === currentUserEmail ||
          user.userEmail === currentUserEmail,
      );

      if (currentUser) {
        filteredData = {
          ...response.data,
          data: [currentUser],
          total: 1,
          filteredByEmail: currentUserEmail,
        };
      } else {
        filteredData = {
          ...response.data,
          data: [],
          total: 0,
          filteredByEmail: currentUserEmail,
        };
      }
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const fetchBookingsData = async (currentUserEmail) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS);
    let filteredData = response.data;

    if (currentUserEmail && response.data?.data) {
      const userBookings = response.data.data.filter((booking) => {
        const bookingEmail =
          booking.email || booking.userEmail || booking.user?.email;
        return bookingEmail === currentUserEmail;
      });

      filteredData = {
        ...response.data,
        data: userBookings,
        total: userBookings.length,
        filteredByEmail: currentUserEmail,
      };
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Enhanced mock notifications
const getMockNotifications = (currentUser) => {
  const userName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "User";

  return [
    {
      id: 1,
      title: "🎸 Lesson Reminder",
      message: `Hi ${userName}, your guitar lesson starts in 30 minutes!`,
      type: "booking",
      category: "My Bookings",
      priority: "high",
      time: "2 min ago",
      unread: true,
      details: `Instructor: Michael | Studio A | Duration: 1 hour`,
    },
    {
      id: 2,
      title: "💰 Payment Confirmed",
      message: `Payment of $150 received for Piano Masterclass`,
      type: "payment",
      category: "My Payments",
      priority: "medium",
      time: "1 hour ago",
      unread: true,
      details: `Transaction ID: PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    },
    {
      id: 3,
      title: "🎵 Course Progress",
      message: `Great work! You've completed 75% of Guitar Basics`,
      type: "course",
      category: "My Progress",
      priority: "low",
      time: "Yesterday",
      unread: true,
      details: `Next milestone: Chord Transitions`,
    },
  ];
};

// Enhanced dummy data for charts
const getEnhancedChartData = (currentUser) => {
  const userName = currentUser?.name || "Student";

  // Enhanced monthly progress data
  const monthlyProgress = [
    { month: "Jan", progress: 65, practice: 12, lessons: 4, goal: 70 },
    { month: "Feb", progress: 72, practice: 15, lessons: 5, goal: 75 },
    { month: "Mar", progress: 78, practice: 18, lessons: 6, goal: 80 },
    { month: "Apr", progress: 82, practice: 20, lessons: 8, goal: 85 },
    { month: "May", progress: 87, practice: 22, lessons: 9, goal: 90 },
    { month: "Jun", progress: 91, practice: 25, lessons: 10, goal: 95 },
    { month: "Jul", progress: 94, practice: 28, lessons: 12, goal: 100 },
  ];

  // Enhanced instrument distribution
  const instrumentDistribution = [
    {
      name: "Guitar",
      value: 45,
      color: "#10B981",
      hours: 42,
      level: "Intermediate",
    },
    {
      name: "Piano",
      value: 30,
      color: "#3B82F6",
      hours: 28,
      level: "Beginner",
    },
    {
      name: "Violin",
      value: 15,
      color: "#F59E0B",
      hours: 18,
      level: "Beginner",
    },
    { name: "Drums", value: 10, color: "#EF4444", hours: 12, level: "Novice" },
  ];

  // Enhanced practice hours per day
  const dailyPractice = [
    { day: "Mon", hours: 1.5, efficiency: 85, focus: "Scales" },
    { day: "Tue", hours: 2.0, efficiency: 78, focus: "Chords" },
    { day: "Wed", hours: 1.2, efficiency: 82, focus: "Theory" },
    { day: "Thu", hours: 2.5, efficiency: 91, focus: "Songs" },
    { day: "Fri", hours: 1.8, efficiency: 76, focus: "Improvisation" },
    { day: "Sat", hours: 3.0, efficiency: 88, focus: "Performance" },
    { day: "Sun", hours: 2.2, efficiency: 84, focus: "Review" },
  ];

  // Enhanced skill progression
  const skillProgression = [
    { week: "W1", technique: 30, theory: 25, rhythm: 20, ear: 15 },
    { week: "W2", technique: 45, theory: 35, rhythm: 30, ear: 25 },
    { week: "W3", technique: 60, theory: 45, rhythm: 40, ear: 35 },
    { week: "W4", technique: 72, theory: 55, rhythm: 50, ear: 45 },
    { week: "W5", technique: 82, theory: 65, rhythm: 60, ear: 55 },
    { week: "W6", technique: 88, theory: 72, rhythm: 68, ear: 62 },
    { week: "W7", technique: 92, theory: 78, rhythm: 75, ear: 68 },
  ];

  // Enhanced learning goals
  const learningGoals = [
    { goal: "Master C Major Scale", progress: 90, deadline: "1 week" },
    { goal: "Learn 10 Jazz Chords", progress: 75, deadline: "2 weeks" },
    { goal: "Play 5 Songs Fluently", progress: 60, deadline: "1 month" },
    { goal: "Improve Sight Reading", progress: 45, deadline: "6 weeks" },
    { goal: "Perform 3-Minute Solo", progress: 30, deadline: "2 months" },
  ];

  return {
    monthlyProgress,
    instrumentDistribution,
    dailyPractice,
    skillProgression,
    learningGoals,
  };
};

export const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const email = getEmailFromCookies();
        if (email) {
          const user = await getCurrentUserFromCookies();
          setCurrentUser(user || { email, name: email.split("@")[0] });
          await processDashboardData(user || { email });
        } else {
          setError("Please log in to view your dashboard");
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const processDashboardData = async (user) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch actual user data
      const [usersData, bookingsData, coursesData] = await Promise.all([
        fetchUsersData(user?.email),
        fetchBookingsData(user?.email),
      ]);

      // Calculate actual statistics
      const actualStats = {
        users: {
          total: 1, // Always 1 for My Account (Me)
          data: usersData?.data || [],
        },
        bookings: {
          total: 1, // My Bookings = 1
          data: bookingsData?.data || [],
        },
        courses: {
          total: 1, // My Course = 1
          data: coursesData?.data || [],
        },
      };

      // Get enhanced chart data
      const enhancedCharts = getEnhancedChartData(user);

      // Format statistics with actual data
      const formattedStats = [
        {
          title: "My Account",
          value: "Me",
          change: "Active",
          trend: "up",
          icon: AccountCircle,
          color: "bg-gradient-to-br from-blue-500 to-cyan-400",
          description: user?.email || "Student Account",
          actualValue: actualStats.users.total,
          isPersonal: true,
        },
        {
          title: "My Bookings",
          value: "1",
          change: "+0%",
          trend: "neutral",
          icon: BookOnline,
          color: "bg-gradient-to-br from-green-500 to-emerald-400",
          description: "Active booking",
          actualValue: actualStats.bookings.total,
          isPersonal: true,
        },
        {
          title: "My Course",
          value: "1",
          change: "Enrolled",
          trend: "up",
          icon: School,
          color: "bg-gradient-to-br from-purple-500 to-violet-400",
          description: "Current course",
          actualValue: actualStats.courses.total,
          isPersonal: true,
        },
        {
          title: "Skill Level",
          value: "72%",
          change: "+8%",
          trend: "up",
          icon: ShowChart,
          color: "bg-gradient-to-br from-red-500 to-pink-400",
          description: "Intermediate",
          isDummy: true,
        },
      ];

      // Set mock notifications
      const mockNotifications = getMockNotifications(user);
      setNotifications(mockNotifications);
      setNotificationCount(mockNotifications.filter((n) => n.unread).length);

      setStats(formattedStats);
      setChartData(enhancedCharts);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error processing data:", err);
      setError("Failed to load data. Using demo data.");

      // Fallback with demo data
      const user = { email: "demo@student.com", name: "Demo Student" };
      setCurrentUser(user);
      setChartData(getEnhancedChartData(user));
      setStats([
        {
          title: "My Account",
          value: "Me",
          change: "Active",
          trend: "up",
          icon: AccountCircle,
          color: "bg-gradient-to-br from-blue-500 to-cyan-400",
          description: "demo@student.com",
          actualValue: 1,
          isPersonal: true,
        },
        {
          title: "My Bookings",
          value: "1",
          change: "+0%",
          trend: "neutral",
          icon: BookOnline,
          color: "bg-gradient-to-br from-green-500 to-emerald-400",
          description: "Active booking",
          actualValue: 1,
          isPersonal: true,
        },
        {
          title: "My Course",
          value: "1",
          change: "Enrolled",
          trend: "up",
          icon: School,
          color: "bg-gradient-to-br from-purple-500 to-violet-400",
          description: "Current course",
          actualValue: 1,
          isPersonal: true,
        },
        {
          title: "Practice Hours",
          value: "142",
          change: "+12%",
          trend: "up",
          icon: Timeline,
          color: "bg-gradient-to-br from-amber-500 to-orange-400",
          description: "This month",
          isDummy: true,
        },
        {
          title: "Skill Level",
          value: "72%",
          change: "+8%",
          trend: "up",
          icon: ShowChart,
          color: "bg-gradient-to-br from-red-500 to-pink-400",
          description: "Intermediate",
          isDummy: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const handleDeleteNotification = (id) => {
    const notificationToDelete = notifications.find((n) => n.id === id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
    if (notificationToDelete?.unread) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getInstrumentIcon = (instrument) => {
    const instrumentLower = instrument?.toLowerCase();
    switch (instrumentLower) {
      case "piano":
        return <Piano className="text-blue-500" />;
      case "guitar":
        return <MusicNote className="text-green-500" />;
      case "violin":
        return <MusicNote className="text-yellow-500" />;
      case "drums":
        return <VolumeUp className="text-red-500" />;
      default:
        return <MusicNote className="text-purple-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading && stats.length === 0) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <MusicNote className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 w-8 h-8" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your music dashboard...
          </p>
        </div>
      </div>
    );
  }

  const userName = currentUser?.name || "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <AccountCircle className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {userName}'s Music Hub
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Your personalized music learning dashboard
                  </p>
                </div>
              </div>
              {currentUser && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-800">
                      Student Account
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">
                    {currentUser.email}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleNotifications}
                className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Notifications"
              >
                <NotificationsIcon className="text-gray-600" />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse ring-2 ring-white"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => processDashboardData(currentUser)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <RefreshIcon className={`${loading ? "animate-spin" : ""}`} />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>

          {lastUpdated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-3"
            >
              Last updated:{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </motion.p>
          )}
        </motion.div>

        {/* Notification Modal */}
        <NotificationModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDeleteNotification}
        />

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
                  {/* Background accent */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full ${stat.color} opacity-10`}
                  ></div>

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                          {stat.value}
                        </p>
                        <div
                          className={`flex items-center gap-2 ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : stat.trend === "down"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          <div
                            className={`p-1 rounded-lg ${
                              stat.trend === "up"
                                ? "bg-green-100"
                                : stat.trend === "down"
                                  ? "bg-red-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {stat.trend === "up" ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : stat.trend === "down" ? (
                              <TrendingDown className="w-4 h-4" />
                            ) : (
                              <Timeline className="w-4 h-4" />
                            )}
                          </div>
                          <span className="text-sm font-semibold">
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          {stat.description}
                        </p>
                      </div>
                      <div
                        className={`${stat.color} p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* User Welcome Section */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <MusicNote className="w-full h-full text-white" />
            </div>

            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Welcome back, {userName}! 🎵
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Your personalized music journey is going strong. Keep
                    practicing and track your progress through this dashboard.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[120px]">
                      <p className="text-2xl font-bold text-white text-center">
                        1
                      </p>
                      <p className="text-xs text-blue-200 text-center">
                        Active Course
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[120px]">
                      <p className="text-2xl font-bold text-white text-center">
                        142
                      </p>
                      <p className="text-xs text-blue-200 text-center">
                        Practice Hours
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[120px]">
                      <p className="text-2xl font-bold text-white text-center">
                        72%
                      </p>
                      <p className="text-xs text-blue-200 text-center">
                        Skill Level
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-lg">
                        <AccountCircle className="text-blue-500 w-12 h-12" />
                      </div>
                      <p className="text-white font-bold">{userName}</p>
                      <p className="text-blue-200 text-sm">
                        {currentUser.email}
                      </p>
                      <div className="mt-3 px-3 py-1 bg-white/20 rounded-full inline-block">
                        <span className="text-xs text-white font-medium">
                          Student Account
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <ErrorIcon className="text-red-500" />
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">
                  Showing demo data. Actual data will load when connected.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
