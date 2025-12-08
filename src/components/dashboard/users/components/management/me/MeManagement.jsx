/* eslint-disable no-unused-vars */
// components/UserManagement.js
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
  Menu,
  AccountCircle,
  Email as EmailIcon,
  Info,
  Warning,
  ArrowBack,
} from "@mui/icons-material";
import { Sidebar } from '../../sidebar/Sidebar'

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

// Get current user from cookies
const getCurrentUserFromCookies = async () => {
  try {
    const userEmail = getEmailFromCookies();
    
    if (!userEmail) {
      console.warn('No email found in cookies or localStorage');
      return null;
    }

    console.log('Found email from cookies:', userEmail);
    
    // Try to fetch user details from API
    try {
      const response = await axios.get("https://ndizmusicprojectbackend.onrender.com/api/users");
      if (response.data?.data) {
        const user = response.data.data.find(u => 
          u.email === userEmail || 
          u.userEmail === userEmail ||
          (u.email && u.email.toLowerCase() === userEmail.toLowerCase())
        );
        
        if (user) {
          console.log('Found user from API:', user);
          return user;
        }
      }
    } catch (apiError) {
      console.warn('Could not fetch user from API, using cookie data only:', apiError);
    }
    
    // If API fails, create minimal user object from cookie data
    return {
      email: userEmail,
      name: userEmail.split('@')[0],
      status: 'user',
      source: 'cookie'
    };
    
  } catch (error) {
    console.error('Error getting current user from cookies:', error);
    return null;
  }
};

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://ndizmusicprojectbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service using Axios - Filtered by current user's email
const userService = {
  // Get current user only
  async getCurrentUser() {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("No email found in cookies. Please log in again.");
    }

    const response = await api.get("/api/users");
    const data = response.data;

    if (data.success) {
      // Find current user by email
      const currentUser = data.data.find(user => 
        user.email === userEmail || user.userEmail === userEmail
      );
      
      if (currentUser) {
        // Return only current user's data
        return [{
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          status: currentUser.status,
          phone: currentUser.phone,
          createdAt: currentUser.createdAt,
          source: 'api'
        }];
      } else {
        throw new Error("User not found in database");
      }
    }
    throw new Error(data.message || "Failed to fetch user data");
  },

  // Create new user (only for current user profile updates)
  async createUser(userData) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to create a profile");
    }

    const response = await api.post("/api/users", userData);
    const data = response.data;

    if (data.success) {
      const user = data.data;
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        source: 'new'
      };
    }
    throw new Error(data.message || "Failed to create user");
  },

  // Update current user
  async updateUser(id, userData) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to update your profile");
    }

    const response = await api.put(`/api/users/${id}`, userData);
    const data = response.data;

    if (data.success) {
      const user = data.data;
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        updatedAt: new Date().toISOString()
      };
    }
    throw new Error(data.message || "Failed to update user");
  },

  // Delete current user
  async deleteUser(id) {
    const userEmail = getEmailFromCookies();
    if (!userEmail) {
      throw new Error("You must be logged in to delete your account");
    }

    const response = await api.delete(`/api/users/${id}`);
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to delete user");
    }
  },
};

// Modal Components - Updated for personal profile management
const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = getEmailFromCookies();
    if (email) {
      setUserEmail(email);
      setFormData(prev => ({
        ...prev,
        email: email
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await onCreate(userData);
      setFormData({ name: "", email: userEmail, password: "", confirmPassword: "" });
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
            className="bg-white rounded-lg w-full max-w-md mx-4"
          >
            <div className="p-4 sm:p-6 border-b bg-blue-50">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Complete Your Profile
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Found your email from cookies: {userEmail}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    You're creating a profile with your logged-in email
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <EmailIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{userEmail}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email is read from your login cookies
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Set Password *
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter new password"
                  minLength="6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Confirm password"
                  minLength="6"
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
                  {loading ? "Creating..." : "Create Profile"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const EditUserModal = ({ isOpen, onClose, onUpdate, user }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = getEmailFromCookies();
    setUserEmail(email || "Not found in cookies");
    
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");
    try {
      await onUpdate(user.id, formData);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-md mx-4"
          >
            <div className="p-4 sm:p-6 border-b bg-blue-50">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Edit My Profile
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Updating profile for: {userEmail}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-700">
                    You're editing your own profile
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <EmailIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{userEmail}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed (from cookies)
                </p>
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
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = getEmailFromCookies();
    setUserEmail(email || "Not found");
  }, []);

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
      {isOpen && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-md mx-4"
          >
            <div className="p-4 sm:p-6 border-b bg-red-50">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600">
                Delete My Account
              </h2>
              <p className="text-sm text-red-600 mt-1">
                This will delete your profile: {userEmail}
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
                      Warning: This is a permanent action
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      You're about to delete your own account ({userEmail}).
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Are you absolutely sure you want to delete <strong>your own account</strong> (<strong>{user.name}</strong>)? 
                All your data will be permanently removed.
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
                  {loading ? "Deleting..." : "Delete My Account"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// User Card Component for Mobile View
const UserCard = ({ user, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const userEmail = getEmailFromCookies();

  return (
    <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <AccountCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Me
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
            {user.status && (
              <p className="text-xs text-gray-500 mt-1">
                Status: <span className="font-medium">{user.status}</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions Dropdown */}
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
                    onEdit(user);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(user);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Delete className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <span className="font-medium">ID:</span> {user.id.slice(0, 8)}...
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <span className="font-medium">Matched by:</span> {userEmail === user.email ? "Email from cookies" : "API data"}
        </div>
      </div>
    </div>
  );
};

// Main User Management Component
export const MeManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  // Load current user on component mount
  useEffect(() => {
    if (isLoggedIn) {
      loadUsers();
    }
  }, [isLoggedIn]);

  // Filter users when search query changes
  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const userData = await userService.getCurrentUser();
      setUsers(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = async (userData) => {
    const newUser = await userService.createUser(userData);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const handleUpdateUser = async (id, userData) => {
    const updatedUser = await userService.updateUser(id, userData);
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? updatedUser : user))
    );
    return updatedUser;
  };

  const handleDeleteUser = async (id) => {
    await userService.deleteUser(id);
    setUsers([]);
    setUserEmail("");
    setIsLoggedIn(false);
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
              You need to be logged in to view and manage your profile.
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-8">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Mobile Header with Menu Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <AccountCircle className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      My Profile
                    </h1>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Manage your personal profile information
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
                      Personal Profile Mode
                    </p>
                    <p className="text-xs text-blue-600">
                      Showing only your profile data from cookies: {userEmail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.location.reload()}
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
                      placeholder="Search in your profile..."
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
                      onClick={loadUsers}
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
                      <span className="hidden sm:inline">Complete Profile</span>
                      <span className="sm:hidden">Complete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Content */}
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Loading your profile...
                </p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <AccountCircle className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Profile Found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  We found your email ({userEmail}) but no profile exists yet.
                </p>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your Profile
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
                          My Profile
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                <AccountCircle className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {user.name}
                                  </div>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                    Me
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {user.email}
                                </div>
                                {user.status && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Status: {user.status}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden sm:table-cell">
                            <div className="text-sm text-gray-900 font-mono truncate max-w-[120px] lg:max-w-[200px]">
                              {user.id}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Matched by email from cookies
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditModalOpen(true);
                                }}
                                className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
                                title="Edit profile"
                              >
                                <Edit className="w-3 h-3" />
                                <span className="hidden xs:inline">Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDeleteModalOpen(true);
                                }}
                                className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
                                title="Delete account"
                              >
                                <Delete className="w-3 h-3" />
                                <span className="hidden xs:inline">Delete</span>
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
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={(user) => {
                      setSelectedUser(user);
                      setEditModalOpen(true);
                    }}
                    onDelete={(user) => {
                      setSelectedUser(user);
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
      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleUpdateUser}
        user={selectedUser}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => selectedUser && handleDeleteUser(selectedUser.id)}
        user={selectedUser}
      />
    </div>
  );
};