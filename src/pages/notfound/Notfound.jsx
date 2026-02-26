/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  ArrowBack,
  Search,
  SentimentDissatisfied,
  Email,
  Person,
  Message,
  Close,
  Send,
  Warning,
} from "@mui/icons-material";

// Admin Contact Modal Component
const AdminContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    urgency: "medium",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to admin
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          urgency: "medium",
        });
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl w-full max-w-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between overflow-y-auto p-6 mt-10 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Email className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Admin
                  </h3>
                  <p className="text-sm text-gray-500">
                    Report this issue to administrators
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-gradient-to-t from-red-400 to-red-500 rounded-lg transition-colors"
              >
                <Close className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            {!success ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-4 text-black overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low - Minor Issue</option>
                    <option value="medium">Medium - Needs Attention</option>
                    <option value="high">High - Urgent Issue</option>
                    <option value="critical">Critical - System Down</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe the issue you encountered in detail..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Warning className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Our admin team will review your message and get back to
                      you within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Send className="w-8 h-8 text-green-600" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-600">
                  Your message has been delivered to the admin team. We'll
                  contact you soon.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const NotFound = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const quickActions = [
    {
      label: "Go Back",

      onClick: () => window.history.back(),
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                  <SentimentDissatisfied className="w-16 h-16 text-red-500" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg"
                >
                  404
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-6xl font-bold text-white mb-4 sm:text-7xl md:text-8xl">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-red-800 mb-4 sm:text-3xl md:text-4xl">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8 sm:text-xl">
                Oops! The page you're looking for seems to have wandered off
                into the digital wilderness. Don't worry, let's get you back on
                track.
              </p>

              {/* Error Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto mb-8 shadow-sm">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-800 mb-2">
                  <Warning className="w-4 h-4" />
                  <span>Error Details</span>
                </div>
                <p className="text-gray-700 font-mono text-sm bg-gray-50 p-3 rounded border">
                  Route:{" "}
                  <span className="text-red-500">
                    {window.location.pathname}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.path ? (
                    <Link
                      to={action.path}
                      className={`block p-6 text-white rounded-xl shadow-lg transition-all duration-200 ${action.color} group`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {action.label}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={action.onClick}
                      className={`w-full p-6 text-white rounded-xl shadow-lg transition-all duration-200 ${action.color} group`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {action.label}
                          </h3>
                        </div>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Need More Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Message className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-100">Live Chat</h4>
                  <p className="text-sm text-gray-100">
                    Get instant help from our team
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Email className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-white">Email Support</h4>
                  <p className="text-sm text-gray-100">support@example.com</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Person className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-white">Admin Help</h4>
                  <p className="text-sm text-gray-100">
                    Contact system administrators
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Email className="w-5 h-5" />
                  <span className="font-semibold">Contact Admin Team</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Admin Contact Modal */}
          <AdminContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};
