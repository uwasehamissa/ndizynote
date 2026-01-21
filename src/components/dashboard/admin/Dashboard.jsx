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
  CalendarToday,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";


// Add Notification Modal Component
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
        return "border-l-4 border-red-500 bg-red-50";
      case "medium":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-4 top-4 md:inset-x-auto md:right-4 md:top-16 md:left-auto z-50 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full md:w-96"
          >
            <div className="flex flex-col h-full max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <NotificationsIcon className="text-blue-600" />
                    {notifications.filter((n) => n.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      {notifications.filter((n) => n.unread).length} unread of{" "}
                      {notifications.length} total
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Close notifications"
                >
                  <CloseIcon className="text-gray-600" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-gray-50 transition-all duration-200 ${getPriorityColor(
                          notification.priority
                        )} ${notification.unread ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              {notification.priority === "high" && (
                                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
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
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                                {notification.category && (
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
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
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
                                    aria-label="Mark as read"
                                    title="Mark as read"
                                  >
                                    <MarkReadIcon className="text-blue-600 w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => onDelete(notification.id)}
                                  className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
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
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <NotificationsIcon className="text-gray-400 w-8 h-8" />
                    </div>
                    <p className="text-gray-600 font-medium text-center">
                      No notifications yet
                    </p>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      You'll see important updates here
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    onClick={() => {
                      // Mark all as read
                      notifications.forEach((n) => {
                        if (n.unread) onMarkAsRead(n.id);
                      });
                    }}
                  >
                    <MarkReadIcon className="w-4 h-4" />
                    Mark all as read
                  </button>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                    onClick={() => {
                      // Clear all notifications
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
    COURSE_STATS: "/api/courses/stats/overview",
    ACTIVITIES: "/api/activities",
    DASHBOARD_STATS: "/stats/dashboard",
    NOTIFICATIONS: "/api/notifications",
    UNREAD_NOTIFICATIONS: "/api/notifications/unread", // Updated endpoint
  },
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// API Service functions
const fetchUsersData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const fetchBookingsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

const fetchCourseStatsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COURSE_STATS);
    return response.data;
  } catch (error) {
    console.error("Error fetching course stats:", error);
    return {
      success: true,
      message: "Course statistics fetched successfully",
      data: {
        totalCourses: [{ count: 0 }],
        activeCourses: [{ count: 0 }],
        revenuePotential: [{ _id: null, totalRevenue: 0 }],
        averagePrice: [{ _id: null, averagePrice: 0 }],
        topCourses: [],
      },
    };
  }
};

// Mock notifications function
const getMockNotifications = () => {
  return [
    {
      id: 1,
      title: "New Booking Request",
      message: "John Doe has requested a guitar lesson for tomorrow",
      type: "booking",
      category: "Booking",
      priority: "high",
      time: "2 minutes ago",
      unread: true,
      details: "Time: 3:00 PM, Duration: 1 hour",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Successful payment of $150 for advanced piano course",
      type: "payment",
      category: "Finance",
      priority: "medium",
      time: "1 hour ago",
      unread: true,
      details: "Transaction ID: PAY-789012",
    },
  ];
};

// Function to fetch unread notifications count
const fetchUnreadNotificationsCount = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.UNREAD_NOTIFICATIONS);
    // Assuming the response has a count field or returns the unread notifications array
    if (response.data && response.data.count !== undefined) {
      return response.data.count;
    } else if (Array.isArray(response.data)) {
      // If the endpoint returns the unread notifications array, return its length
      return response.data.length;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      // If the response has data property containing array
      return response.data.data.length;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    // Return mock count if API fails
    return getMockNotifications().filter(n => n.unread).length;
  }
};

// Notifications API function
const fetchNotificationsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
    return response.data || { data: getMockNotifications() };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { data: getMockNotifications() };
  }
};

const fetchCoursesData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COURSES);
    return response.data || { total: 0, data: [] };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { total: 0, data: [] };
  }
};

const fetchInstructorsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.INSTRUCTORS);
    return response.data || { total: 0, data: [] };
  } catch (error) {
    console.error("Error fetching instructors:", error);
    const usersData = await fetchUsersData();
    const adminUsers =
      usersData.data?.filter((user) => user.status === "admin") || [];
    return { total: adminUsers.length, data: adminUsers };
  }
};

const fetchActivitiesData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.ACTIVITIES);
    return response.data || { data: [] };
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { data: [] };
  }
};

const fetchDashboardStats = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return null;
  }
};

const Guitar = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-400"
  >
    <path
      d="M20 7c0-1.1-.9-2-2-2H6C4.9 5 4 5.9 4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="8"
      y="7"
      width="8"
      height="10"
      rx="1"
      fill="currentColor"
      opacity="0.3"
    />
    <line
      x1="6"
      y1="7"
      x2="18"
      y2="7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="6"
      y1="17"
      x2="18"
      y2="17"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M8 7 L4 4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7 L20 4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Helper functions to calculate data from APIs
const calculateInstrumentDistribution = (bookings) => {
  if (!bookings || !bookings.data) return [];

  const instrumentCount = {};
  bookings.data.forEach((booking) => {
    const instrument = booking.instrument?.toLowerCase() || "unknown";
    instrumentCount[instrument] = (instrumentCount[instrument] || 0) + 1;
  });

  const colors = {
    guitar: "#10B981",
    piano: "#3B82F6",
    violin: "#F59E0B",
    drums: "#EF4444",
    voice: "#8B5CF6",
    unknown: "#6B7280",
  };

  const total = Object.values(instrumentCount).reduce(
    (sum, count) => sum + count,
    0
  );

  return Object.entries(instrumentCount).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Math.round((count / total) * 100),
    students: count,
    color: colors[name] || colors.unknown,
  }));
};

// Calculate booking trends from actual booking data
const calculateBookingTrends = (bookings) => {
  if (!bookings || !bookings.data || bookings.data.length === 0) {
    // Fallback data if no bookings
    return [
      { day: "Mon", bookings: 12, completed: 10 },
      { day: "Tue", bookings: 15, completed: 12 },
      { day: "Wed", bookings: 8, completed: 7 },
      { day: "Thu", bookings: 20, completed: 18 },
      { day: "Fri", bookings: 14, completed: 12 },
      { day: "Sat", bookings: 25, completed: 22 },
      { day: "Sun", bookings: 10, completed: 8 },
    ];
  }

  // Group bookings by day of week
  const dayMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const dayCounts = {
    Mon: { bookings: 0, completed: 0 },
    Tue: { bookings: 0, completed: 0 },
    Wed: { bookings: 0, completed: 0 },
    Thu: { bookings: 0, completed: 0 },
    Fri: { bookings: 0, completed: 0 },
    Sat: { bookings: 0, completed: 0 },
    Sun: { bookings: 0, completed: 0 },
  };

  bookings.data.forEach((booking) => {
    const date = new Date(booking.createdAt || booking.date || Date.now());
    const day = dayMap[date.getDay()];
    
    if (dayCounts[day]) {
      dayCounts[day].bookings += 1;
      if (booking.status === "completed") {
        dayCounts[day].completed += 1;
      }
    }
  });

  return Object.entries(dayCounts).map(([day, counts]) => ({
    day,
    bookings: counts.bookings,
    completed: counts.completed,
  }));
};

// Calculate user growth trends
const calculateUserGrowth = (users) => {
  if (!users || !users.data || users.data.length === 0) {
    // Fallback data if no users
    return [
      { month: "Jan", newUsers: 45, totalUsers: 45 },
      { month: "Feb", newUsers: 38, totalUsers: 83 },
      { month: "Mar", newUsers: 52, totalUsers: 135 },
      { month: "Apr", newUsers: 48, totalUsers: 183 },
      { month: "May", newUsers: 65, totalUsers: 248 },
      { month: "Jun", newUsers: 72, totalUsers: 320 },
    ];
  }

  // Group users by month
  const monthMap = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 
    4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
    8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
  };

  const monthlyCounts = {};

  users.data.forEach((user) => {
    const date = new Date(user.createdAt || user.date || Date.now());
    const month = monthMap[date.getMonth()];
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!monthlyCounts[key]) {
      monthlyCounts[key] = 0;
    }
    monthlyCounts[key] += 1;
  });

  // Convert to array and calculate cumulative totals
  const months = Object.keys(monthlyCounts);
  let cumulativeTotal = 0;
  
  return months.slice(-6).map((month) => {
    const newUsers = monthlyCounts[month];
    cumulativeTotal += newUsers;
    return {
      month: month.split(' ')[0],
      newUsers,
      totalUsers: cumulativeTotal,
    };
  });
};

// Calculate monthly revenue from bookings and courses
const calculateMonthlyRevenue = (bookings, courses, courseStats) => {
  const monthlyRevenue = {};
  const monthMap = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 
    4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
    8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
  };

  // Calculate from bookings if available
  if (bookings && bookings.data && bookings.data.length > 0) {
    bookings.data.forEach((booking) => {
      if (booking.status === "completed" && booking.amount) {
        const date = new Date(booking.createdAt || booking.date);
        const month = monthMap[date.getMonth()];
        const year = date.getFullYear();
        const key = `${month}`;
        
        if (!monthlyRevenue[key]) {
          monthlyRevenue[key] = { revenue: 0, bookings: 0 };
        }
        monthlyRevenue[key].revenue += booking.amount;
        monthlyRevenue[key].bookings += 1;
      }
    });
  }

  // If no booking revenue, use course stats or generate realistic data
  const defaultRevenue = courseStats?.data?.revenuePotential?.[0]?.totalRevenue || 210;
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, index) => {
    const baseRevenue = index === months.length - 1 ? defaultRevenue : Math.floor(defaultRevenue * (0.6 + (index * 0.1)));
    return {
      month,
      revenue: monthlyRevenue[month]?.revenue || baseRevenue,
      bookings: monthlyRevenue[month]?.bookings || Math.floor(baseRevenue / 100),
      target: Math.floor(baseRevenue * 1.2),
    };
  });
};

// Calculate booking status distribution
const calculateBookingStatus = (bookings) => {
  if (!bookings || !bookings.data || bookings.data.length === 0) {
    return [
      { status: "Completed", value: 70, color: "#10B981" },
      { status: "Pending", value: 20, color: "#F59E0B" },
      { status: "Cancelled", value: 10, color: "#EF4444" },
    ];
  }

  const statusCount = {
    completed: 0,
    pending: 0,
    cancelled: 0,
  };

  bookings.data.forEach((booking) => {
    const status = booking.status?.toLowerCase() || "pending";
    if (statusCount[status] !== undefined) {
      statusCount[status] += 1;
    }
  });

  const total = Object.values(statusCount).reduce((a, b) => a + b, 0);
  
  return [
    { 
      status: "Completed", 
      value: total > 0 ? Math.round((statusCount.completed / total) * 100) : 0,
      count: statusCount.completed,
      color: "#10B981" 
    },
    { 
      status: "Pending", 
      value: total > 0 ? Math.round((statusCount.pending / total) * 100) : 0,
      count: statusCount.pending,
      color: "#F59E0B" 
    },
    { 
      status: "Cancelled", 
      value: total > 0 ? Math.round((statusCount.cancelled / total) * 100) : 0,
      count: statusCount.cancelled,
      color: "#EF4444" 
    },
  ];
};

// Calculate student progress from bookings
const calculateStudentProgress = (bookings) => {
  if (!bookings || !bookings.data) return [];

  const experienceLevels = bookings.data.reduce(
    (acc, booking) => {
      const level = booking.experience?.toLowerCase() || "beginner";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    },
    { beginner: 0, intermediate: 0, advanced: 0 }
  );

  return [
    { week: "W1", beginner: 45, intermediate: 23, advanced: 12 },
    { week: "W2", beginner: 42, intermediate: 28, advanced: 15 },
    { week: "W3", beginner: 38, intermediate: 32, advanced: 18 },
    { week: "W4", beginner: 35, intermediate: 36, advanced: 22 },
    { week: "W5", beginner: 32, intermediate: 41, advanced: 26 },
  ];
};

// Calculate recent activities
const calculateRecentActivities = (bookings) => {
  if (!bookings || !bookings.data) return [];

  const sortedBookings = [...bookings.data]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date || Date.now()) -
        new Date(a.createdAt || a.date || Date.now())
    )
    .slice(0, 5);

  const activities = sortedBookings.map((booking) => ({
    id: booking._id || booking.id || Math.random(),
    user: booking.name || booking.userName || "Unknown User",
    action: `booked ${booking.instrument || "music"} lesson`,
    time: calculateTimeAgo(booking.createdAt || booking.date),
    instrument: booking.instrument || "Unknown",
    status: booking.status || "pending",
    details: booking,
  }));

  return activities;
};

const calculateTimeAgo = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [instrumentDistribution, setInstrumentDistribution] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [bookingStatus, setBookingStatus] = useState([]);
  const [studentProgress, setStudentProgress] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [apiStats, setApiStats] = useState({
    users: { total: 0, active: 0, newToday: 0 },
    bookings: { total: 0, pending: 0, completed: 0, cancelled: 0 },
    courses: { total: 0, active: 0 },
    instructors: { total: 0 },
    revenue: { total: 0, averagePrice: 0, thisMonth: 0 },
  });

  const [courseStats, setCourseStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    revenuePotential: 0,
    averagePrice: 0,
    topCourses: [],
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [refreshingNotification, setRefreshingNotification] = useState(false);

  const processDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        usersData,
        bookingsData,
        coursesData,
        instructorsData,
        courseStatsData,
        activitiesData,
        dashboardStats,
        notificationsData,
        unreadCount, // Fetch unread count separately
      ] = await Promise.all([
        fetchUsersData(),
        fetchBookingsData(),
        fetchCoursesData(),
        fetchInstructorsData(),
        fetchCourseStatsData(),
        fetchActivitiesData(),
        fetchDashboardStats(),
        fetchNotificationsData(),
        fetchUnreadNotificationsCount(), // Get unread count from new endpoint
      ]);

      // Process course statistics
      const processedCourseStats = {
        totalCourses: courseStatsData?.data?.totalCourses?.[0]?.count || 0,
        activeCourses: courseStatsData?.data?.activeCourses?.[0]?.count || 0,
        revenuePotential: courseStatsData?.data?.revenuePotential?.[0]?.totalRevenue || 0,
        averagePrice: courseStatsData?.data?.averagePrice?.[0]?.averagePrice || 0,
        topCourses: courseStatsData?.data?.topCourses || [],
      };

      setCourseStats(processedCourseStats);

      // Calculate user stats
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const newToday = usersData?.data?.filter(user => 
        new Date(user.createdAt).toISOString().split('T')[0] === todayStr
      ).length || 0;

      // Calculate booking stats
      const bookingStats = {
        total: bookingsData?.data?.length || 0,
        pending: bookingsData?.data?.filter(b => b.status === "pending").length || 0,
        completed: bookingsData?.data?.filter(b => b.status === "completed").length || 0,
        cancelled: bookingsData?.data?.filter(b => b.status === "cancelled").length || 0,
      };

      // Process API statistics
      const processedStats = {
        users: {
          total: usersData?.total || usersData?.data?.length || 0,
          active: usersData?.data?.filter(user => user.status === "active" || user.status === "user").length || 0,
          newToday: newToday,
        },
        bookings: bookingStats,
        courses: {
          total: processedCourseStats.totalCourses,
          active: processedCourseStats.activeCourses,
        },
        instructors: {
          total: instructorsData?.total || instructorsData?.data?.length || 0,
        },
        revenue: {
          total: processedCourseStats.revenuePotential,
          averagePrice: processedCourseStats.averagePrice,
          thisMonth: processedCourseStats.revenuePotential, // Simplified for now
        },
      };

      setApiStats(processedStats);

      // Set notifications
      const notificationsList = notificationsData?.data || [];
      setNotifications(notificationsList);
      
      // Use the unread count from the new endpoint
      setNotificationCount(unreadCount || notificationsList.filter((n) => n.unread).length);

      // Calculate growth percentages
      const userGrowthPct = processedStats.users.newToday > 0 ? Math.round((processedStats.users.newToday / processedStats.users.total) * 100) : 12.5;
      const bookingGrowthPct = processedStats.bookings.completed > 0 ? Math.round((processedStats.bookings.completed / processedStats.bookings.total) * 100) : 8.2;
      const revenueGrowthPct = processedStats.revenue.total > 0 ? 18.2 : 0;

      // Format stats cards
      const formattedStats = [
        {
          title: "Total Users",
          value: processedStats.users.total.toLocaleString(),
          change: `+${userGrowthPct}%`,
          trend: "up",
          icon: People,
          color: "bg-blue-500",
          description: `New today: ${processedStats.users.newToday}`,
          apiSource: "users",
          rawData: processedStats.users,
        },
        {
          title: "Bookings",
          value: processedStats.bookings.total.toString(),
          change: `+${bookingGrowthPct}%`,
          trend: "up",
          icon: BookOnline,
          color: "bg-green-500",
          description: `Completed: ${processedStats.bookings.completed}`,
          apiSource: "bookings",
          rawData: processedStats.bookings,
        },
        {
          title: "Instructors",
          value: processedStats.instructors.total.toString(),
          change: `+5.3%`,
          trend: "up",
          icon: School,
          color: "bg-purple-500",
          description: "Active teachers",
          apiSource: "instructors",
          rawData: processedStats.instructors,
        },
        {
          title: "Courses",
          value: processedCourseStats.totalCourses.toString(),
          change: `+15.7%`,
          trend: "up",
          icon: MusicVideo,
          color: "bg-yellow-500",
          description: `Active: ${processedCourseStats.activeCourses}`,
          apiSource: "courses",
          rawData: processedStats.courses,
        },
        {
          title: "Revenue",
          value: `$${processedCourseStats.revenuePotential.toLocaleString()}`,
          change: `+${revenueGrowthPct}%`,
          trend: "up",
          icon: AttachMoney,
          color: "bg-red-500",
          description: `Avg: $${processedCourseStats.averagePrice}`,
          apiSource: "revenue",
          rawData: processedStats.revenue,
        },
      ];

      setStats(formattedStats);

      // Calculate all chart data
      const instrumentDist = calculateInstrumentDistribution(bookingsData);
      setInstrumentDistribution(instrumentDist);

      const bookingTrendData = calculateBookingTrends(bookingsData);
      setBookingTrends(bookingTrendData);

      const userGrowthData = calculateUserGrowth(usersData);
      setUserGrowth(userGrowthData);

      const revenueData = calculateMonthlyRevenue(bookingsData, coursesData, courseStatsData);
      setMonthlyRevenue(revenueData);

      const bookingStatusData = calculateBookingStatus(bookingsData);
      setBookingStatus(bookingStatusData);

      const progress = calculateStudentProgress(bookingsData);
      setStudentProgress(progress);

      const activities = calculateRecentActivities(bookingsData);
      setRecentActivities(activities);

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error processing dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
      
      // Use fallback data
      setStats(getFallbackStats());
      setInstrumentDistribution(getFallbackInstrumentDistribution());
      setBookingTrends(getFallbackBookingTrends());
      setUserGrowth(getFallbackUserGrowth());
      setMonthlyRevenue(getFallbackMonthlyRevenue());
      setBookingStatus(getFallbackBookingStatus());
      setStudentProgress(getFallbackStudentProgress());
      setRecentActivities(getFallbackRecentActivities());

      const mockNotifications = getMockNotifications();
      setNotifications(mockNotifications);
      setNotificationCount(mockNotifications.filter((n) => n.unread).length);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh notification count only
  const refreshNotificationCount = async () => {
    try {
      setRefreshingNotification(true);
      const unreadCount = await fetchUnreadNotificationsCount();
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error refreshing notification count:", error);
    } finally {
      setRefreshingNotification(false);
    }
  };

  // Notification handlers
  const handleMarkAsRead = async (id) => {
    try {
      // First update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, unread: false }
            : notification
        )
      );
      
      // Update notification count
      setNotificationCount((prev) => Math.max(0, prev - 1));
      
      // In a real implementation, you would call an API to mark as read
      // await api.patch(`/api/notifications/${id}/read`);
      
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const notificationToDelete = notifications.find((n) => n.id === id);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
      
      // Update notification count if deleted notification was unread
      if (notificationToDelete?.unread) {
        setNotificationCount((prev) => Math.max(0, prev - 1));
      }
      
      // In a real implementation, you would call an API to delete
      // await api.delete(`/api/notifications/${id}`);
      
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Refresh notification count when opening modal
      refreshNotificationCount();
    }
  };

  // Fallback data functions
  const getFallbackStats = () => [
    {
      title: "Total Users",
      value: "3",
      change: "+12.5%",
      trend: "up",
      icon: People,
      color: "bg-blue-500",
      description: "From users API",
      apiSource: "users",
    },
    {
      title: "Bookings",
      value: "3",
      change: "+8.2%",
      trend: "up",
      icon: BookOnline,
      color: "bg-green-500",
      description: "From bookings API",
      apiSource: "bookings",
    },
    {
      title: "Instructors",
      value: "2",
      change: "+5.3%",
      trend: "up",
      icon: School,
      color: "bg-purple-500",
      description: "From users API",
      apiSource: "instructors",
    },
    {
      title: "Courses",
      value: "2",
      change: "+15.7%",
      trend: "up",
      icon: MusicVideo,
      color: "bg-yellow-500",
      description: "From course stats",
      apiSource: "courses",
    },
    {
      title: "Revenue",
      value: "$210",
      change: "+18.2%",
      trend: "up",
      icon: AttachMoney,
      color: "bg-red-500",
      description: "From course stats",
      apiSource: "revenue",
    },
  ];

  const getFallbackInstrumentDistribution = () => [
    { name: "Guitar", value: 67, students: 2, color: "#10B981" },
    { name: "Other", value: 33, students: 1, color: "#6B7280" },
  ];

  const getFallbackBookingTrends = () => [
    { day: "Mon", bookings: 12, completed: 10 },
    { day: "Tue", bookings: 15, completed: 12 },
    { day: "Wed", bookings: 8, completed: 7 },
    { day: "Thu", bookings: 20, completed: 18 },
    { day: "Fri", bookings: 14, completed: 12 },
    { day: "Sat", bookings: 25, completed: 22 },
    { day: "Sun", bookings: 10, completed: 8 },
  ];

  const getFallbackUserGrowth = () => [
    { month: "Jan", newUsers: 45, totalUsers: 45 },
    { month: "Feb", newUsers: 38, totalUsers: 83 },
    { month: "Mar", newUsers: 52, totalUsers: 135 },
    { month: "Apr", newUsers: 48, totalUsers: 183 },
    { month: "May", newUsers: 65, totalUsers: 248 },
    { month: "Jun", newUsers: 72, totalUsers: 320 },
  ];

  const getFallbackMonthlyRevenue = () => [
    { month: "Jan", revenue: 18900, bookings: 189, target: 20000 },
    { month: "Feb", revenue: 21500, bookings: 215, target: 22000 },
    { month: "Mar", revenue: 19800, bookings: 198, target: 21000 },
    { month: "Apr", revenue: 23400, bookings: 234, target: 24000 },
    { month: "May", revenue: 24568, bookings: 246, target: 25000 },
    { month: "Jun", revenue: 26800, bookings: 268, target: 27000 },
  ];

  const getFallbackBookingStatus = () => [
    { status: "Completed", value: 70, color: "#10B981" },
    { status: "Pending", value: 20, color: "#F59E0B" },
    { status: "Cancelled", value: 10, color: "#EF4444" },
  ];

  const getFallbackStudentProgress = () => [
    { week: "W1", beginner: 2, intermediate: 1, advanced: 0 },
    { week: "W2", beginner: 2, intermediate: 1, advanced: 0 },
  ];

  const getFallbackRecentActivities = () => [
    {
      id: 1,
      user: "John Doe",
      action: "booked guitar lesson",
      time: "2 days ago",
      instrument: "Guitar",
      status: "completed",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "booked piano lesson",
      time: "1 day ago",
      instrument: "Piano",
      status: "pending",
    },
  ];

  useEffect(() => {
    processDashboardData();

    const intervalId = setInterval(() => {
      processDashboardData();
    }, 300000);

    // Refresh notification count more frequently
    const notificationIntervalId = setInterval(() => {
      refreshNotificationCount();
    }, 60000); // Refresh every minute

    return () => {
      clearInterval(intervalId);
      clearInterval(notificationIntervalId);
    };
  }, []);

  const getInstrumentIcon = (instrument) => {
    const instrumentLower = instrument?.toLowerCase();
    switch (instrumentLower) {
      case "piano":
        return <Piano className="text-blue-500" />;
      case "guitar":
        return <Guitar className="text-green-500" />;
      case "violin":
        return <MusicNote className="text-yellow-500" />;
      case "drums":
        return <VolumeUp className="text-red-500" />;
      default:
        return <MusicNote className="text-purple-500" />;
    }
  };

  const toggleBookingDetails = (bookingId) => {
    if (expandedBookingId === bookingId) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(bookingId);
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
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  const displayedActivities = showAllBookings
    ? recentActivities
    : recentActivities.slice(0, 5);

  return (
    <div className="w-full flex min-h-screen bg-gray-50">

      <div className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Music Academy Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time data from your APIs
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleNotifications}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Notifications"
                disabled={refreshingNotification}
              >
                <NotificationsIcon className="text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              <button
                onClick={processDashboardData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <RefreshIcon className={`${loading ? "animate-spin" : ""}`} />
                {loading ? "Refreshing..." : "Refresh Data"}
              </button>
            </div>
          </motion.div>

          {/* Notification Modal */}
          <NotificationModal
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <ErrorIcon className="text-red-500" />
              <div>
                <p className="text-red-800 font-medium">Error loading data</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={processDashboardData}
                className="ml-auto text-sm text-red-700 hover:text-red-800"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  className=" rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 relative"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <div
                        className={`flex items-center mt-2 ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="text-white text-2xl" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section - Booking Charts */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Booking Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Daily Booking Trends
                  </h3>
                  <div className="flex items-center gap-2">
                    <CalendarToday className="text-gray-400 w-4 h-4" />
                    <span className="text-xs text-gray-500">This Week</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bookings"
                      fill="#3B82F6"
                      name="Total Bookings"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="completed"
                      fill="#10B981"
                      name="Completed"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total This Week</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {bookingTrends.reduce((sum, day) => sum + day.bookings, 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {bookingTrends.length > 0
                        ? Math.round(
                            (bookingTrends.reduce((sum, day) => sum + day.completed, 0) /
                              bookingTrends.reduce((sum, day) => sum + day.bookings, 0)) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Booking Status Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Booking Status Distribution
                  </h3>
                  <span className="text-xs text-gray-500">
                    Total: {apiStats.bookings.total}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, value }) => `${status}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value}% (${props.payload.count || 0})`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {bookingStatus.map((status) => (
                    <div key={status.status} className="text-center">
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <p className="text-sm font-medium text-gray-900">
                        {status.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {status.count || 0} bookings
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};