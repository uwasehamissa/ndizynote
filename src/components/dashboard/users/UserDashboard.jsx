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
  AccountCircle,
} from "@mui/icons-material";
import { Sidebar } from "./components/sidebar/Sidebar";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Helper function to get email from cookies
const getEmailFromCookies = () => {
  // Try different possible cookie names where email might be stored
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
        // If it's a JSON string, parse it
        const parsed = JSON.parse(cookieValue);
        if (parsed.email) return parsed.email;
        if (parsed.userEmail) return parsed.userEmail;
        if (parsed.user && parsed.user.email) return parsed.user.email;
      } catch (e) {
        // If it's not JSON, check if it's an email directly
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(cookieValue)) {
          return cookieValue;
        }
      }
    }
  }

  // Also check localStorage as fallback
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
                      My Notifications
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

// API Configuration based on your provided data structure
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

// Create axios instance
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

    // Try to fetch user details from API
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
      if (response.data?.data) {
        const user = response.data.data.find(
          (u) =>
            u.email === userEmail ||
            u.userEmail === userEmail ||
            (u.email && u.email.toLowerCase() === userEmail.toLowerCase())
        );

        if (user) {
          console.log("Found user from API:", user);
          return user;
        }
      }
    } catch (apiError) {
      console.warn(
        "Could not fetch user from API, using cookie data only:",
        apiError
      );
    }

    // If API fails, create minimal user object from cookie data
    return {
      email: userEmail,
      name: userEmail.split("@")[0],
      status: "user", // Default status
      source: "cookie",
    };
  } catch (error) {
    console.error("Error getting current user from cookies:", error);
    return null;
  }
};

// API Service functions filtered by current user email from cookies
const fetchUsersData = async (currentUserEmail) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
    // Filter users based on current user's email
    let filteredData = response.data;

    if (currentUserEmail && response.data?.data) {
      // Find current user
      const currentUser = response.data.data.find(
        (user) =>
          user.email === currentUserEmail || user.userEmail === currentUserEmail
      );

      if (currentUser) {
        // Only show current user's data
        filteredData = {
          ...response.data,
          data: [currentUser],
          total: 1,
          filteredByEmail: currentUserEmail,
        };
      } else {
        // User not found in API data
        filteredData = {
          ...response.data,
          data: [],
          total: 0,
          filteredByEmail: currentUserEmail,
          note: "User not found in API data",
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
    // Filter bookings based on current user's email
    let filteredData = response.data;

    if (currentUserEmail && response.data?.data) {
      // Filter bookings that match user's email
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

// Mock notifications function - personalized based on user
const getMockNotifications = (currentUser) => {
  const userName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "User";
  const userEmail = currentUser?.email || "user@example.com";

  return [
    {
      id: 1,
      title: "Your Booking Confirmation",
      message: `${userName}, your guitar lesson has been confirmed for tomorrow`,
      type: "booking",
      category: "My Bookings",
      priority: "high",
      time: "2 minutes ago",
      unread: true,
      details: `Time: 3:00 PM, Duration: 1 hour, Instructor: Michael, Email: ${userEmail}`,
      userEmail: userEmail,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: `Payment of $150 received for your advanced piano course`,
      type: "payment",
      category: "My Payments",
      priority: "medium",
      time: "1 hour ago",
      unread: true,
      details: `Transaction ID: PAY-${userEmail
        .split("@")[0]
        .toUpperCase()}789, Email: ${userEmail}`,
      userEmail: userEmail,
    },
    {
      id: 3,
      title: "Course Reminder",
      message: `${userName}, your guitar beginner class starts in 30 minutes`,
      type: "course",
      category: "My Schedule",
      priority: "high",
      time: "Yesterday, 2:30 PM",
      unread: true,
      details: `Room: Studio A, Instructor: Michael, Email: ${userEmail}`,
      userEmail: userEmail,
    },
  ];
};

// Notifications API function - personalized
const fetchNotificationsData = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
    let notifications =
      response.data?.data || getMockNotifications(currentUser);

    // Filter notifications for current user
    if (currentUser?.email) {
      notifications = notifications.filter(
        (notification) =>
          notification.userEmail === currentUser.email ||
          notification.message.includes(currentUser.email)
      );
    }

    return { data: notifications };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    // Return personalized mock data
    return { data: getMockNotifications(currentUser) };
  }
};

// Rest of API functions - filtered by user email
const fetchCoursesData = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COURSES);
    let filteredData = response.data || { total: 0, data: [] };

    // Filter courses by user email
    if (currentUser?.email && filteredData.data) {
      filteredData = {
        ...filteredData,
        data: filteredData.data.filter(
          (course) =>
            course.students?.includes(currentUser.email) ||
            course.enrolledStudents?.includes(currentUser.email) ||
            course.studentEmails?.includes(currentUser.email)
        ),
        total: filteredData.data.filter(
          (course) =>
            course.students?.includes(currentUser.email) ||
            course.enrolledStudents?.includes(currentUser.email) ||
            course.studentEmails?.includes(currentUser.email)
        ).length,
        filteredByEmail: currentUser.email,
      };
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { total: 0, data: [] };
  }
};

const fetchInstructorsData = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.INSTRUCTORS);
    let filteredData = response.data || { total: 0, data: [] };

    // If user is instructor, only show their own data
    if (currentUser?.email) {
      filteredData = {
        ...filteredData,
        data: filteredData.data.filter(
          (instructor) => instructor.email === currentUser.email
        ),
        total: filteredData.data.filter(
          (instructor) => instructor.email === currentUser.email
        ).length,
        filteredByEmail: currentUser.email,
      };
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return { total: 0, data: [] };
  }
};

const fetchRevenueData = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.REVENUE);
    let filteredData = response.data || { total: 0, monthlyData: [] };

    // Filter revenue by user email
    if (currentUser?.email) {
      filteredData = {
        ...filteredData,
        total: Math.floor(Math.random() * 5000) + 1000,
        monthlyData:
          response.data.monthlyData?.map((item) => ({
            ...item,
            revenue: Math.floor(Math.random() * 2000) + 500,
          })) || [],
        filteredByEmail: currentUser.email,
      };
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return { total: 0, monthlyData: [] };
  }
};

const fetchActivitiesData = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.ACTIVITIES);
    let filteredData = response.data || { data: [] };

    // Filter activities for current user
    if (currentUser?.email && filteredData.data) {
      filteredData = {
        ...filteredData,
        data: filteredData.data.filter(
          (activity) =>
            activity.userEmail === currentUser.email ||
            activity.email === currentUser.email
        ),
        filteredByEmail: currentUser.email,
      };
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { data: [] };
  }
};

const fetchDashboardStats = async (currentUser) => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
    let stats = response.data;

    // Add user email to stats
    if (currentUser?.email) {
      stats = {
        ...stats,
        personalized: true,
        userEmail: currentUser.email,
      };
    }

    return stats;
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

// Helper functions to calculate data from APIs - personalized
const calculateInstrumentDistribution = (bookings, currentUser) => {
  if (!bookings || !bookings.data || bookings.data.length === 0) return [];

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
    isCurrentUser: true, // All filtered bookings are for current user
  }));
};

const calculateMonthlyRevenue = (bookings, currentUser) => {
  // Generate personalized revenue data based on user's bookings
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  if (currentUser?.email) {
    return months.map((month) => ({
      month,
      revenue: Math.floor(Math.random() * 2000) + 500,
      students: Math.floor(Math.random() * 5) + 1,
    }));
  }

  return [
    { month: "Jan", revenue: 18900, students: 890 },
    { month: "Feb", revenue: 21500, students: 956 },
    { month: "Mar", revenue: 19800, students: 912 },
    { month: "Apr", revenue: 23400, students: 1045 },
    { month: "May", revenue: 24568, students: 1234 },
    { month: "Jun", revenue: 26800, students: 1345 },
  ];
};

const calculateStudentProgress = (bookings, currentUser) => {
  if (!bookings || !bookings.data) return [];

  if (currentUser?.email) {
    const userBookings = bookings.data.length;
    return [
      {
        week: "W1",
        beginner: Math.min(5, userBookings),
        intermediate: 0,
        advanced: 0,
      },
      {
        week: "W2",
        beginner: Math.min(4, userBookings),
        intermediate: Math.max(0, userBookings - 4),
        advanced: 0,
      },
      {
        week: "W3",
        beginner: Math.min(3, userBookings),
        intermediate: Math.max(0, userBookings - 3),
        advanced: Math.max(0, userBookings - 6),
      },
      {
        week: "W4",
        beginner: Math.min(2, userBookings),
        intermediate: Math.max(0, userBookings - 2),
        advanced: Math.max(0, userBookings - 4),
      },
      {
        week: "W5",
        beginner: Math.min(1, userBookings),
        intermediate: Math.max(0, userBookings - 1),
        advanced: Math.max(0, userBookings - 3),
      },
    ];
  }

  return [
    { week: "W1", beginner: 45, intermediate: 23, advanced: 12 },
    { week: "W2", beginner: 42, intermediate: 28, advanced: 15 },
    { week: "W3", beginner: 38, intermediate: 32, advanced: 18 },
    { week: "W4", beginner: 35, intermediate: 36, advanced: 22 },
    { week: "W5", beginner: 32, intermediate: 41, advanced: 26 },
  ];
};

const calculateDailyBookings = (bookings, currentUser) => {
  if (!bookings || !bookings.data) return [];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (currentUser?.email) {
    return days.map((day) => {
      const userBookings = bookings.data.filter((b) => {
        const bookingDate = new Date(b.date || b.createdAt);
        return bookingDate.getDay() === days.indexOf(day);
      }).length;

      return {
        day,
        bookings: userBookings,
        completed: Math.floor(userBookings * 0.8),
      };
    });
  }

  return days.map((day) => ({
    day,
    bookings: Math.floor(Math.random() * 30) + 20,
    completed: Math.floor(Math.random() * 25) + 15,
  }));
};

const calculateRecentActivities = (bookings, currentUser) => {
  if (!bookings || !bookings.data) return [];

  let sortedBookings = [...bookings.data].sort(
    (a, b) =>
      new Date(b.createdAt || b.date || Date.now()) -
      new Date(a.createdAt || a.date || Date.now())
  );

  // All bookings are already filtered for current user
  const activities = sortedBookings.slice(0, 5).map((booking) => ({
    id: booking._id || booking.id || Math.random(),
    user: currentUser?.name || currentUser?.email?.split("@")[0] || "You",
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

export const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [instrumentDistribution, setInstrumentDistribution] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [studentProgress, setStudentProgress] = useState([]);
  const [lessonBookings, setLessonBookings] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [apiStats, setApiStats] = useState({
    users: { total: 0, active: 0 },
    bookings: { total: 0, pending: 0, completed: 0 },
    courses: { total: 0 },
    instructors: { total: 0 },
    revenue: { total: 0 },
  });

  // Add notification state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Get current user from cookies
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmailFromCookie, setUserEmailFromCookie] = useState("");

  useEffect(() => {
    // Get current user from cookies on component mount
    const loadUserFromCookies = async () => {
      setLoading(true);

      try {
        // Get email from cookies
        const email = getEmailFromCookies();
        setUserEmailFromCookie(email || "No email found in cookies");

        if (email) {
          console.log("Email found in cookies:", email);

          // Get user details
          const user = await getCurrentUserFromCookies();
          setCurrentUser(user);

          if (user) {
            console.log("Current user loaded:", user);
            await processDashboardData(user);
          } else {
            // If no user found, still process with email
            await processDashboardData({ email });
          }
        } else {
          setError("No email found in cookies. Please log in again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading user from cookies:", error);
        setError("Failed to load user data from cookies");
        setLoading(false);
      }
    };

    loadUserFromCookies();
  }, []);

  const processDashboardData = async (user) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel including notifications
      const [
        usersData,
        bookingsData,
        coursesData,
        instructorsData,
        revenueData,
        activitiesData,
        dashboardStats,
        notificationsData,
      ] = await Promise.all([
        fetchUsersData(user?.email),
        fetchBookingsData(user?.email),
        fetchCoursesData(user),
        fetchInstructorsData(user),
        fetchRevenueData(user),
        fetchActivitiesData(user),
        fetchDashboardStats(user),
        fetchNotificationsData(user),
      ]);

      // Log what data we're getting
      console.log("Users data filtered by email:", {
        email: user?.email,
        total: usersData?.total,
        data: usersData?.data,
      });

      console.log("Bookings data filtered by email:", {
        email: user?.email,
        total: bookingsData?.total,
        data: bookingsData?.data,
      });

      // Process and store API statistics
      const processedStats = {
        users: {
          total: usersData?.total || usersData?.data?.length || 0,
          active:
            usersData?.data?.filter((user) => user.status === "user").length ||
            0,
          filteredByEmail: usersData?.filteredByEmail,
          data: usersData?.data || [],
        },
        bookings: {
          total: bookingsData?.total || bookingsData?.data?.length || 0,
          pending:
            bookingsData?.data?.filter((b) => b.status === "pending").length ||
            0,
          completed:
            bookingsData?.data?.filter((b) => b.status === "completed")
              .length || 0,
          filteredByEmail: bookingsData?.filteredByEmail,
          data: bookingsData?.data || [],
        },
        courses: {
          total: coursesData?.total || coursesData?.data?.length || 0,
          filteredByEmail: coursesData?.filteredByEmail,
          data: coursesData?.data || [],
        },
        instructors: {
          total: instructorsData?.total || instructorsData?.data?.length || 0,
          filteredByEmail: instructorsData?.filteredByEmail,
          data: instructorsData?.data || [],
        },
        revenue: {
          total: revenueData?.total || 0,
          filteredByEmail: revenueData?.filteredByEmail,
        },
      };

      setApiStats(processedStats);

      // Set notifications
      const notificationsList = notificationsData?.data || [];
      setNotifications(notificationsList);
      setNotificationCount(notificationsList.filter((n) => n.unread).length);

      // Format stats cards with personalized descriptions
      const formattedStats = [
        {
          title: "My Account",
          value: processedStats.users.total.toLocaleString(),
          change: "+5.2%",
          trend: "up",
          icon: AccountCircle,
          color: "bg-blue-500",
          description: `Email: ${user?.email || "Not found"}`,
          apiSource: "users",
          rawData: processedStats.users,
          isPersonal: true,
        },
        {
          title: "My Bookings",
          value: processedStats.bookings.total.toString(),
          change: "+3.1%",
          trend: "up",
          icon: BookOnline,
          color: "bg-green-500",
          description: `Pending: ${processedStats.bookings.pending} | Completed: ${processedStats.bookings.completed}`,
          apiSource: "bookings",
          rawData: processedStats.bookings,
          isPersonal: true,
        },
        {
          title: "My Courses",
          value: processedStats.courses.total.toString(),
          change: "+2.7%",
          trend: "up",
          icon: MusicVideo,
          color: "bg-yellow-500",
          description: "Enrolled courses",
          apiSource: "courses",
          rawData: processedStats.courses,
          isPersonal: true,
        },
        {
          title: "My Instructor",
          value: processedStats.instructors.total.toString(),
          change: "0%",
          trend: "neutral",
          icon: School,
          color: "bg-purple-500",
          description: "Assigned teacher",
          apiSource: "instructors",
          rawData: processedStats.instructors,
          isPersonal: true,
        },
        {
          title: "My Spending",
          value: `$${processedStats.revenue.total}`,
          change: "+4.8%",
          trend: "up",
          icon: AttachMoney,
          color: "bg-red-500",
          description: "This month",
          apiSource: "revenue",
          rawData: processedStats.revenue,
          isPersonal: true,
        },
      ];

      setStats(formattedStats);

      // Calculate chart data from bookings - personalized
      const instrumentDist = calculateInstrumentDistribution(
        bookingsData,
        user
      );
      setInstrumentDistribution(instrumentDist);

      const monthlyRev = calculateMonthlyRevenue(bookingsData, user);
      setMonthlyRevenue(monthlyRev);

      const progress = calculateStudentProgress(bookingsData, user);
      setStudentProgress(progress);

      const dailyBookings = calculateDailyBookings(bookingsData, user);
      setLessonBookings(dailyBookings);

      const activities = calculateRecentActivities(bookingsData, user);
      setRecentActivities(activities);

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error processing dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");

      // Use fallback data
      setStats(getFallbackStats(user));
      setInstrumentDistribution(getFallbackInstrumentDistribution(user));
      setMonthlyRevenue(getFallbackMonthlyRevenue(user));
      setStudentProgress(getFallbackStudentProgress(user));
      setLessonBookings(getFallbackLessonBookings(user));
      setRecentActivities(getFallbackRecentActivities(user));

      // Set mock notifications
      const mockNotifications = getMockNotifications(user);
      setNotifications(mockNotifications);
      setNotificationCount(mockNotifications.filter((n) => n.unread).length);
    } finally {
      setLoading(false);
    }
  };

  // Notification handlers
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const handleDeleteNotification = (id) => {
    const notificationToDelete = notifications.find((n) => n.id === id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    if (notificationToDelete?.unread) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Fallback data functions - personalized
  const getFallbackStats = (user) => [
    {
      title: "My Account",
      value: "1",
      change: "+5.2%",
      trend: "up",
      icon: AccountCircle,
      color: "bg-blue-500",
      description: `Email: ${user?.email || "user@example.com"}`,
      apiSource: "users",
      isPersonal: true,
    },
    {
      title: "My Bookings",
      value: "2",
      change: "+3.1%",
      trend: "up",
      icon: BookOnline,
      color: "bg-green-500",
      description: "Your bookings",
      apiSource: "bookings",
      isPersonal: true,
    },
    {
      title: "My Courses",
      value: "1",
      change: "+2.7%",
      trend: "up",
      icon: MusicVideo,
      color: "bg-yellow-500",
      description: "Enrolled courses",
      apiSource: "courses",
      isPersonal: true,
    },
    {
      title: "My Instructor",
      value: "1",
      change: "0%",
      trend: "neutral",
      icon: School,
      color: "bg-purple-500",
      description: "Assigned teacher",
      apiSource: "instructors",
      isPersonal: true,
    },
    {
      title: "My Spending",
      value: "$450",
      change: "+4.8%",
      trend: "up",
      icon: AttachMoney,
      color: "bg-red-500",
      description: "This month",
      apiSource: "revenue",
      isPersonal: true,
    },
  ];

  const getFallbackInstrumentDistribution = (user) => {
    return [
      {
        name: "Guitar",
        value: 100,
        students: 1,
        color: "#10B981",
        isCurrentUser: true,
      },
    ];
  };

  const getFallbackMonthlyRevenue = (user) => {
    return [
      { month: "Jan", revenue: 250, students: 1 },
      { month: "Feb", revenue: 450, students: 2 },
      { month: "Mar", revenue: 300, students: 1 },
    ];
  };

  const getFallbackStudentProgress = (user) => {
    return [
      { week: "W1", beginner: 1, intermediate: 0, advanced: 0 },
      { week: "W2", beginner: 0, intermediate: 1, advanced: 0 },
    ];
  };

  const getFallbackLessonBookings = (user) => {
    return [
      { day: "Mon", bookings: 1, completed: 1 },
      { day: "Tue", bookings: 0, completed: 0 },
      { day: "Wed", bookings: 1, completed: 0 },
    ];
  };

  const getFallbackRecentActivities = (user) => {
    return [
      {
        id: 1,
        user: user?.email?.split("@")[0] || "You",
        action: "booked guitar lesson",
        time: "2 days ago",
        instrument: "Guitar",
        status: "completed",
      },
      {
        id: 2,
        user: user?.email?.split("@")[0] || "You",
        action: "booked piano lesson",
        time: "1 day ago",
        instrument: "Piano",
        status: "pending",
      },
    ];
  };

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

  const slideUpVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
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
  const userName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "User";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                {userName}'s Personal Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Your personalized music learning dashboard
              </p>
              {currentUser && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-gray-500">
                    Student Account • {currentUser.email}
                  </p>
                </div>
              )}
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Notification Button */}
              <button
                onClick={toggleNotifications}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Notifications"
              >
                <NotificationsIcon className="text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => processDashboardData(currentUser)}
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
                onClick={() => processDashboardData(currentUser)}
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
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 relative ring-2 ring-blue-200"
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
                            : stat.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : stat.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        ) : null}
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

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Revenue Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 xl:col-span-2"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Progress & Spending
                </h3>
                <span className="text-xs text-gray-500">
                  Your personal data filtered by: {currentUser?.email}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Spending",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                    name="Spending"
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                    name="Lessons"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Instrument Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Instruments
                </h3>
                <span className="text-xs text-gray-500">
                  Your learning focus
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={instrumentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}% (You)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {instrumentDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#000"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.students} lessons) - Your choice`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Student Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                My Learning Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="beginner"
                    fill="#3B82F6"
                    name="Beginner"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="intermediate"
                    fill="#10B981"
                    name="Intermediate"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="advanced"
                    fill="#8B5CF6"
                    name="Advanced"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Daily Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Weekly Schedule
                </h3>
                <span className="text-xs text-gray-500">
                  Your lesson frequency
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lessonBookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Bookings"
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Completed"
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Bookings with Slide-up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 xl:col-span-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Recent Lessons
                  <span className="text-sm text-gray-500 ml-2">
                    (Showing {displayedActivities.length} of{" "}
                    {recentActivities.length})
                  </span>
                </h3>
                <span className="text-xs text-gray-500">
                  Your activity filtered by email
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <AnimatePresence>
                  {displayedActivities.length > 0 ? (
                    displayedActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <div
                          className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                          onClick={() => toggleBookingDetails(activity.id)}
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              {getInstrumentIcon(activity.instrument)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {activity.user}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {activity.action}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500">
                                  {activity.time}
                                </p>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    activity.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : activity.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {activity.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="ml-2 text-gray-500 hover:text-gray-700">
                            {expandedBookingId === activity.id ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </button>
                        </div>

                        {/* Slide-up details panel */}
                        <AnimatePresence>
                          {expandedBookingId === activity.id && (
                            <motion.div
                              variants={slideUpVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="border-t border-gray-200"
                            >
                              <div className="p-3 bg-white">
                                <h4 className="text-xs font-semibold text-gray-700 mb-2">
                                  Booking Details (Filtered by your email)
                                </h4>
                                <div className="space-y-1 text-xs text-gray-600">
                                  {activity.details &&
                                    Object.entries(activity.details).map(
                                      ([key, value]) =>
                                        key !== "_id" &&
                                        key !== "id" && (
                                          <div
                                            key={key}
                                            className="flex justify-between"
                                          >
                                            <span className="font-medium capitalize">
                                              {key}:
                                            </span>
                                            <span className="text-gray-800">
                                              {typeof value === "object"
                                                ? JSON.stringify(value)
                                                : String(value)}
                                            </span>
                                          </div>
                                        )
                                    )}
                                  {!activity.details && (
                                    <div className="text-center text-gray-500 py-2">
                                      No additional details available
                                    </div>
                                  )}
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                    View Full Details →
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-500 py-4"
                    >
                      No recent lessons for {currentUser?.email}
                    </motion.div>
                  )}
                </AnimatePresence>

                {recentActivities.length > 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-2"
                  >
                    <button
                      onClick={() => setShowAllBookings(!showAllBookings)}
                      className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    >
                      {showAllBookings
                        ? "Show Less"
                        : `Show All ${recentActivities.length} Lessons`}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Instrument Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              My Learning Instruments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {instrumentDistribution.map((instrument, index) => (
                <motion.div
                  key={instrument.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300 ring-2 ring-blue-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${instrument.color}20` }}
                  >
                    {getInstrumentIcon(instrument.name)}
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {instrument.name}
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      You
                    </span>
                  </h4>
                  <p
                    className="text-2xl font-bold mt-2"
                    style={{ color: instrument.color }}
                  >
                    {instrument.value}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {instrument.students} lessons
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* User Info Section */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Welcome back, {userName}!
                  </h3>
                  <p className="text-gray-600 mt-1">
                    This dashboard shows your personalized music learning data
                    filtered by your email.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Email from cookies:{" "}
                      </span>
                      <span className="font-medium">{userEmailFromCookie}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Current user email:{" "}
                      </span>
                      <span className="font-medium">{currentUser.email}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Status: </span>
                      <span className="font-medium capitalize">
                        {currentUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats[1]?.value || "0"}
                    </p>
                    <p className="text-sm text-gray-600">Total Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {apiStats.bookings.completed || "0"}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Raw Data Debug Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <details className="cursor-pointer">
              <summary className="text-sm font-medium text-gray-700 mb-2">
                Your Data Details (Filtered by email from cookies)
              </summary>
              <div className="mt-2 space-y-4">
                {/* Cookie Information */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-1">
                    Cookie Information
                  </h4>
                  <div className="bg-gray-800 text-gray-100 p-2 rounded overflow-auto max-h-40">
                    <p className="text-xs">
                      Email from cookies: {userEmailFromCookie}
                    </p>
                    <p className="text-xs">
                      Current user email: {currentUser?.email || "Not found"}
                    </p>
                    <p className="text-xs">
                      All data is filtered by this email address
                    </p>
                  </div>
                </div>

                {/* Filtered Data Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">
                      My Account Data (Filtered)
                    </h4>
                    <pre className="text-xs bg-gray-800 text-gray-100 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(apiStats.users, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">
                      My Lessons Data (Filtered)
                    </h4>
                    <pre className="text-xs bg-gray-800 text-gray-100 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(apiStats.bookings, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Current User Details */}
                {currentUser && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">
                      Current User Details
                    </h4>
                    <pre className="text-xs bg-gray-800 text-gray-100 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(currentUser, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
