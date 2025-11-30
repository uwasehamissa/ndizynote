/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Message as MessagesIcon,
  Notifications as NotificationsIcon,
  BookOnline as BookingsIcon,
  Subscriptions as SubscriptionsIcon,
  TrendingUp,
  TrendingDown,
  MusicNote,
  Piano,
  VolumeUp,
  People,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Sidebar } from "./components/sidebar/Sidebar";

// Data models for music teaching platform
const musicStats = {
  totalUsers: 2847,
  activeStudents: 1234,
  instructors: 156,
  courses: 89,
  revenue: 24568,
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

const instrumentDistribution = [
  { name: "Piano", value: 35, students: 432, color: "#3B82F6" },
  { name: "Guitar", value: 28, students: 346, color: "#10B981" },
  { name: "Violin", value: 15, students: 185, color: "#F59E0B" },
  { name: "Drums", value: 12, students: 148, color: "#EF4444" },
  { name: "Voice", value: 10, students: 123, color: "#8B5CF6" },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 18900, students: 890 },
  { month: "Feb", revenue: 21500, students: 956 },
  { month: "Mar", revenue: 19800, students: 912 },
  { month: "Apr", revenue: 23400, students: 1045 },
  { month: "May", revenue: 24568, students: 1234 },
  { month: "Jun", revenue: 26800, students: 1345 },
];

const studentProgress = [
  { week: "W1", beginner: 45, intermediate: 23, advanced: 12 },
  { week: "W2", beginner: 42, intermediate: 28, advanced: 15 },
  { week: "W3", beginner: 38, intermediate: 32, advanced: 18 },
  { week: "W4", beginner: 35, intermediate: 36, advanced: 22 },
  { week: "W5", beginner: 32, intermediate: 41, advanced: 26 },
];

const lessonBookings = [
  { day: "Mon", bookings: 45, completed: 38 },
  { day: "Tue", bookings: 52, completed: 45 },
  { day: "Wed", bookings: 48, completed: 42 },
  { day: "Thu", bookings: 56, completed: 48 },
  { day: "Fri", bookings: 61, completed: 52 },
  { day: "Sat", bookings: 78, completed: 65 },
  { day: "Sun", bookings: 42, completed: 35 },
];

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Users",
      value: musicStats.totalUsers.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: UsersIcon,
      color: "bg-blue-500",
      description: "Registered users",
    },
    {
      title: "Active Students",
      value: musicStats.activeStudents.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: MusicNote,
      color: "bg-green-500",
      description: "Currently learning",
    },
    {
      title: "Instructors",
      value: musicStats.instructors.toString(),
      change: "+5.3%",
      trend: "up",
      icon: People,
      color: "bg-purple-500",
      description: "Active teachers",
    },
    {
      title: "Courses",
      value: musicStats.courses.toString(),
      change: "+15.7%",
      trend: "up",
      icon: BookingsIcon,
      color: "bg-yellow-500",
      description: "Available courses",
    },
    {
      title: "Revenue",
      value: `$${musicStats.revenue.toLocaleString()}`,
      change: "+18.2%",
      trend: "up",
      icon: SubscriptionsIcon,
      color: "bg-red-500",
      description: "This month",
    },
  ];

  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "started piano lessons",
      time: "2 min ago",
      instrument: "Piano",
    },
    {
      user: "Mike Chen",
      action: "completed guitar course",
      time: "15 min ago",
      instrument: "Guitar",
    },
    {
      user: "Emma Wilson",
      action: "booked violin session",
      time: "1 hour ago",
      instrument: "Violin",
    },
    {
      user: "Alex Rodriguez",
      action: "renewed subscription",
      time: "2 hours ago",
      instrument: "Drums",
    },
    {
      user: "Lisa Kim",
      action: "sent message to instructor",
      time: "3 hours ago",
      instrument: "Voice",
    },
  ];

  const getInstrumentIcon = (instrument) => {
    switch (instrument) {
      case "Piano":
        return <Piano className="text-blue-500" />;
      case "Guitar":
        return <Guitar className="text-green-500" />;
      case "Violin":
        return <MusicNote className="text-yellow-500" />;
      case "Drums":
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
 

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Music Academy Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to NdzyNote - Track your music teaching progress
            </p>
          </motion.div>

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
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <div
                        className={`flex items-center mt-2 ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">{stat.change}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue & Student Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                    name="Students"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Instrument Popularity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={instrumentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {instrumentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
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
                Student Progress Levels
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Daily Lesson Bookings
              </h3>
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

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 xl:col-span-1"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Student Activity
              </h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex-shrink-0">
                      {getInstrumentIcon(activity.instrument)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {activity.instrument}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              Instrument Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {instrumentDistribution.map((instrument, index) => (
                <motion.div
                  key={instrument.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${instrument.color}20` }}
                  >
                    {getInstrumentIcon(instrument.name)}
                  </div>
                  <h4 className="font-semibold text-gray-900">{instrument.name}</h4>
                  <p
                    className="text-2xl font-bold mt-2"
                    style={{ color: instrument.color }}
                  >
                    {instrument.value}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {instrument.students} students
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};