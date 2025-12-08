/* eslint-disable no-unused-vars */
// components/ContactManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Add,
  Edit,
  Delete,
  Refresh,
  Person,
  MoreVert,
  ViewHeadline,
  Email as EmailIcon,
  Menu,
  Phone,
  Message,
  Business,
  Schedule,
  AccountCircle,
  Warning,
  Info,
  ArrowBack,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebar/Sidebar";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Helper function to get email from cookies
const getEmailFromCookies = () => {
  const possibleCookieNames = [
    'userEmail',
    'email',
    'user_email',
    'auth_email',
    'login_email',
    'userData',
    'user',
    'currentUser'
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
  
  // Also check localStorage as fallback
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.email) return parsed.email;
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  return null;
};

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://ndizmusicprojectbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service using Axios - Filtered by current user's email
const contactService = {
  // Get contacts for current user only
  async getMyContacts() {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("No email found in cookies. Please log in again.");
    }

    try {
      const response = await api.get("/contacts");
      const data = response.data;

      if (data.success) {
        // Filter contacts by current user's email
        const myContacts = data.data
          .filter(contact => 
            contact.email === userEmail || 
            contact.userEmail === userEmail
          )
          .map((contact) => ({
            id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            phone: contact.phone,
            company: contact.company,
            status: contact.status || "new",
            createdAt: contact.createdAt,
            isCurrentUser: true
          }));

        return myContacts;
      }
      throw new Error(data.message || "Failed to fetch contacts");
    } catch (error) {
      // If API fails, return mock data for current user
      return getMockContacts(userEmail);
    }
  },

  // Create new contact - only for current user
  async createContact(contactData) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to create a contact");
    }

    const response = await api.post("/contacts", {
      ...contactData,
      email: userEmail // Always use logged-in user's email
    });
    const data = response.data;

    if (data.success) {
      const contact = data.data;
      return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status || "new",
        createdAt: contact.createdAt,
        isCurrentUser: true
      };
    }
    throw new Error(data.message || "Failed to create contact");
  },

  // Update contact - only for current user
  async updateContact(id, contactData) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to update a contact");
    }

    const response = await api.put(`/contacts/${id}`, {
      ...contactData,
      email: userEmail // Ensure email stays as current user
    });
    const data = response.data;

    if (data.success) {
      const contact = data.data;
      return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status,
        createdAt: contact.createdAt,
        isCurrentUser: true
      };
    }
    throw new Error(data.message || "Failed to update contact");
  },

  // Delete contact - only for current user
  async deleteContact(id) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to delete a contact");
    }

    const response = await api.delete(`/contacts/${id}`);
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to delete contact");
    }
  },
};

// Mock contacts for current user
const getMockContacts = (userEmail) => {
  const userName = userEmail.split('@')[0];
  return [
    {
      id: 1,
      name: userName,
      email: userEmail,
      subject: "Inquiry about guitar lessons",
      message: "Hello, I'm interested in starting guitar lessons. Can you provide more information about available time slots and pricing?",
      phone: "+1 (555) 123-4567",
      company: "Self-employed",
      status: "new",
      createdAt: new Date().toISOString(),
      isCurrentUser: true
    },
    {
      id: 2,
      name: userName,
      email: userEmail,
      subject: "Follow-up on piano course",
      message: "I wanted to follow up on the advanced piano course we discussed last week. When does the next session start?",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      status: "in-progress",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isCurrentUser: true
    },
    {
      id: 3,
      name: userName,
      email: userEmail,
      subject: "Feedback on violin instructor",
      message: "I've been taking violin lessons for 3 months now and wanted to share my positive feedback about the instructor. They've been excellent!",
      phone: "+1 (555) 987-6543",
      company: "Music Enthusiast",
      status: "responded",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isCurrentUser: true
    },
    {
      id: 4,
      name: userName,
      email: userEmail,
      subject: "Request for drum workshop schedule",
      message: "Could you please share the schedule for the upcoming drum workshops? I'm particularly interested in the weekend sessions.",
      phone: "",
      company: "",
      status: "new",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isCurrentUser: true
    }
  ];
};

// Loading Spinner Component
const LoadingSpinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
      ></div>
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
};

// Modal Components - Updated for personal use
const CreateContactModal = ({ isOpen, onClose, onCreate, userEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({
        ...prev,
        email: userEmail
      }));
    }
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onCreate(formData);
      setFormData({
        name: "",
        email: userEmail,
        subject: "",
        message: "",
        phone: "",
        company: "",
      });
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b bg-blue-50">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Submit Your Inquiry
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Creating inquiry with your email: {userEmail}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-700">
                    You're submitting an inquiry with your logged-in email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <EmailIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{userEmail}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email is read from your login cookies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter inquiry subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Enter your inquiry message..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ViewContactModal = ({ isOpen, onClose, contact, userEmail }) => {
  if (!contact) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b bg-blue-50">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Your Inquiry Details
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Viewing inquiry from: {contact.email || userEmail}
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <AccountCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Your Inquiry</p>
                  <p className="text-xs text-blue-600">
                    Submitted with your logged-in email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <p className="text-gray-900">{contact.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <div className="flex items-center gap-2">
                    <EmailIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{contact.email || userEmail}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">
                      {contact.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <div className="flex items-center gap-2">
                    <Business className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">
                      {contact.company || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">{contact.subject}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      contact.status
                    )}`}
                  >
                    {contact.status.charAt(0).toUpperCase() +
                      contact.status.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Current status of your inquiry
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Submitted On
                  </label>
                  <div className="flex items-center gap-2">
                    <Schedule className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 text-sm">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && contact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-md mx-4"
          >
            <div className="p-4 sm:p-6 border-b bg-red-50">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600">
                Delete Your Inquiry
              </h2>
              <p className="text-sm text-red-600 mt-1">
                This will delete your inquiry: {contact.subject}
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Warning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      You're deleting your own inquiry
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      Submitted with: {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Are you sure you want to delete your inquiry about <strong>"{contact.subject}"</strong>? 
                This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Deleting..." : "Delete My Inquiry"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Contact Card Component for Mobile View - Updated for personal use
const ContactCard = ({ contact, onView, onDelete, userEmail }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 relative">
            <AccountCircle className="w-5 h-5 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {contact.name}
              </h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Me
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  contact.status
                )}`}
              >
                {contact.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">{contact.email || userEmail}</p>
            <p className="text-xs text-gray-600 truncate mt-1">
              {contact.subject}
            </p>
          </div>
        </div>

        {/* Mobile Actions Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVert className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onView(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
                >
                  <Message className="w-4 h-4" />
                  <span>View Inquiry</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Delete className="w-4 h-4" />
                  <span>Delete Inquiry</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <Phone className="w-3 h-3" />
          <span>{contact.phone || "No phone"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Schedule className="w-3 h-3" />
          <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action buttons for larger mobile screens */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onView(contact)}
          className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
        >
          <Message className="w-3 h-3" />
          <span>View</span>
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
        >
          <Delete className="w-3 h-3" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

// Main Contact Management Component
export const MyContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const email = getEmailFromCookies();
      if (email) {
        setUserEmail(email);
        setIsLoggedIn(true);
        console.log('User logged in with email:', email);
      } else {
        setIsLoggedIn(false);
        setError('No email found in cookies. Please log in first.');
      }
    };

    checkLoginStatus();
  }, []);

  // Auto-detect view mode based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      } else {
        setViewMode("table");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Load contacts for current user
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      loadContacts();
    }
  }, [isLoggedIn, userEmail]);

  // Filter contacts when search query changes
  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]);

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const contactData = await contactService.getMyContacts();
      setContacts(contactData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search query (name, email, subject, or company)
    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contact.company &&
            contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredContacts(filtered);
  };

  const handleCreateContact = async (contactData) => {
    const newContact = await contactService.createContact(contactData);
    setContacts((prev) => [...prev, newContact]);
    return newContact;
  };

  const handleDeleteContact = async (id) => {
    await contactService.deleteContact(id);
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Warning className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view and manage your inquiries.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Login Page
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Message className="w-6 h-6 text-blue-600" />
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        My Inquiries
                      </h1>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Manage your personal inquiries and messages
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-500">
                        Logged in as: <span className="font-medium">{userEmail}</span>
                      </p>
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 hidden sm:block">
                      View:
                    </span>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "table"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        title="Table View"
                      >
                        <ViewHeadline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "grid"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        title="Grid View"
                      >
                        <Person className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Information Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Personal Inquiry Mode
                      </p>
                      <p className="text-xs text-blue-600">
                        Showing only your inquiries from email: {userEmail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={loadContacts}
                    className="text-xs text-blue-700 hover:text-blue-900"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Warning className="w-5 h-5 text-red-600" />
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                    <button
                      onClick={() => setError("")}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search your inquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={loadContacts}
                        disabled={loading}
                        className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Add className="w-4 h-4" />
                        <span className="hidden sm:inline">New Inquiry</span>
                        <span className="sm:hidden">Inquiry</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts Content */}
              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <LoadingSpinner size="lg" text="Loading your inquiries..." />
                  {userEmail && (
                    <p className="text-sm text-gray-500 mt-2">
                      For: {userEmail}
                    </p>
                  )}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Inquiries Found
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {contacts.length === 0 
                      ? "You haven't submitted any inquiries yet." 
                      : "No inquiries match your current search."}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Your email: {userEmail}
                  </p>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Your First Inquiry
                  </button>
                </div>
              ) : viewMode === "table" ? (
                /* Table View for md screens and up */
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50 border-b border-blue-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
                            My Inquiry
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                            Subject
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                            Submitted
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredContacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 relative">
                                  <AccountCircle className="w-4 h-4 text-blue-600" />
                                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                      {contact.name}
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                      Me
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {contact.email || userEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                              <div className="text-sm text-gray-900 truncate max-w-[200px]">
                                {contact.subject}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  contact.status
                                )}`}
                              >
                                {contact.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  contact.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setViewModalOpen(true);
                                  }}
                                  className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
                                  title="View inquiry"
                                >
                                  <Message className="w-3 h-3" />
                                  <span className="hidden xs:inline">View</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setDeleteModalOpen(true);
                                  }}
                                  className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
                                  title="Delete inquiry"
                                >
                                  <Delete className="w-3 h-3" />
                                  <span className="hidden xs:inline">
                                    Delete
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Grid/Card View for mobile and when in grid mode */
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      userEmail={userEmail}
                      onView={(contact) => {
                        setSelectedContact(contact);
                        setViewModalOpen(true);
                      }}
                      onDelete={(contact) => {
                        setSelectedContact(contact);
                        setDeleteModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateContactModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateContact}
          userEmail={userEmail}
        />

        <ViewContactModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          contact={selectedContact}
          userEmail={userEmail}
        />

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() =>
            selectedContact && handleDeleteContact(selectedContact.id)
          }
          contact={selectedContact}
          userEmail={userEmail}
        />
      </div>
    </>
  );
};