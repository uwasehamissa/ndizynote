// /* eslint-disable no-unused-vars */
// // components/UserManagement.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Add,
//   Edit,
//   Delete,
//   Refresh,
//   Person,
//   MoreVert,
//   ViewHeadline,
//   Menu,
//   AccountCircle,
//   Email as EmailIcon,
//   Info,
//   Warning,
//   ArrowBack,
// } from "@mui/icons-material";


// // Helper function to get cookie value by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// };

// // Helper function to get email from cookies
// const getEmailFromCookies = () => {
//   const possibleCookieNames = [
//     'userEmail',
//     'email',
//     'user_email',
//     'auth_email',
//     'login_email',
//     'userData',
//     'user',
//     'currentUser'
//   ];
  
//   for (const cookieName of possibleCookieNames) {
//     const cookieValue = getCookie(cookieName);
//     if (cookieValue) {
//       try {
//         const parsed = JSON.parse(cookieValue);
//         if (parsed.email) return parsed.email;
//         if (parsed.userEmail) return parsed.userEmail;
//         if (parsed.user && parsed.user.email) return parsed.user.email;
//       } catch (e) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailRegex.test(cookieValue)) {
//           return cookieValue;
//         }
//       }
//     }
//   }
  
//   // Also check localStorage as fallback
//   try {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const parsed = JSON.parse(userData);
//       if (parsed.email) return parsed.email;
//     }
//   } catch (error) {
//     console.error('Error reading from localStorage:', error);
//   }
  
//   return null;
// };

// // Get current user from cookies
// const getCurrentUserFromCookies = async () => {
//   try {
//     const userEmail = getEmailFromCookies();
    
//     if (!userEmail) {
//       console.warn('No email found in cookies or localStorage');
//       return null;
//     }

//     console.log('Found email from cookies:', userEmail);
    
//     // Try to fetch user details from API
//     try {
//       const response = await axios.get("https://ndizmusicprojectbackend.onrender.com/api/users");
//       if (response.data?.data) {
//         const user = response.data.data.find(u => 
//           u.email === userEmail || 
//           u.userEmail === userEmail ||
//           (u.email && u.email.toLowerCase() === userEmail.toLowerCase())
//         );
        
//         if (user) {
//           console.log('Found user from API:', user);
//           return user;
//         }
//       }
//     } catch (apiError) {
//       console.warn('Could not fetch user from API, using cookie data only:', apiError);
//     }
    
//     // If API fails, create minimal user object from cookie data
//     return {
//       email: userEmail,
//       name: userEmail.split('@')[0],
//       status: 'user',
//       source: 'cookie'
//     };
    
//   } catch (error) {
//     console.error('Error getting current user from cookies:', error);
//     return null;
//   }
// };

// // Axios instance with base configuration
// const api = axios.create({
//   baseURL: "https://ndizmusicprojectbackend.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API Service using Axios - Filtered by current user's email
// const userService = {
//   // Get current user only
//   async getCurrentUser() {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("No email found in cookies. Please log in again.");
//     }

//     const response = await api.get("/api/users");
//     const data = response.data;

//     if (data.success) {
//       // Find current user by email
//       const currentUser = data.data.find(user => 
//         user.email === userEmail || user.userEmail === userEmail
//       );
      
//       if (currentUser) {
//         // Return only current user's data
//         return [{
//           id: currentUser._id,
//           name: currentUser.name,
//           email: currentUser.email,
//           status: currentUser.status,
//           phone: currentUser.phone,
//           createdAt: currentUser.createdAt,
//           source: 'api'
//         }];
//       } else {
//         throw new Error("User not found in database");
//       }
//     }
//     throw new Error(data.message || "Failed to fetch user data");
//   },

//   // Create new user (only for current user profile updates)
//   async createUser(userData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to create a profile");
//     }

//     const response = await api.post("/api/users", userData);
//     const data = response.data;

//     if (data.success) {
//       const user = data.data;
//       return {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         status: user.status,
//         source: 'new'
//       };
//     }
//     throw new Error(data.message || "Failed to create user");
//   },

//   // Update current user
//   async updateUser(id, userData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to update your profile");
//     }

//     const response = await api.put(`/api/users/${id}`, userData);
//     const data = response.data;

//     if (data.success) {
//       const user = data.data;
//       return {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         status: user.status,
//         updatedAt: new Date().toISOString()
//       };
//     }
//     throw new Error(data.message || "Failed to update user");
//   },

//   // Delete current user
//   async deleteUser(id) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to delete your account");
//     }

//     const response = await api.delete(`/api/users/${id}`);
//     const data = response.data;

//     if (!data.success) {
//       throw new Error(data.message || "Failed to delete user");
//     }
//   },
// };

// // Modal Components - Updated for personal profile management
// const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const email = getEmailFromCookies();
//     if (email) {
//       setUserEmail(email);
//       setFormData(prev => ({
//         ...prev,
//         email: email
//       }));
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     // Validate password length
//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { confirmPassword, ...userData } = formData;
//       await onCreate(userData);
//       setFormData({ name: "", email: userEmail, password: "", confirmPassword: "" });
//       onClose();
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-lg w-full max-w-md mx-4"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Complete Your Profile
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Found your email from cookies: {userEmail}
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="p-4 sm:p-6 space-y-4"
//             >
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                 <div className="flex items-center gap-2">
//                   <Info className="w-4 h-4 text-yellow-600" />
//                   <p className="text-sm text-yellow-700">
//                     You're creating a profile with your logged-in email
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address *
//                 </label>
//                 <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
//                   <EmailIcon className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm text-gray-700">{userEmail}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Email is read from your login cookies
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Set Password *
//                 </label>
//                 <input
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Enter new password"
//                   minLength="6"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password *
//                 </label>
//                 <input
//                   type="password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={(e) =>
//                     setFormData({ ...formData, confirmPassword: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Confirm password"
//                   minLength="6"
//                 />
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   {loading ? "Creating..." : "Create Profile"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const EditUserModal = ({ isOpen, onClose, onUpdate, user }) => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const email = getEmailFromCookies();
//     setUserEmail(email || "Not found in cookies");
    
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || email || "",
//       });
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     setError("");
//     try {
//       await onUpdate(user.id, formData);
//       onClose();
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-lg w-full max-w-md mx-4"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Edit My Profile
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Updating profile for: {userEmail}
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="p-4 sm:p-6 space-y-4"
//             >
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                 <div className="flex items-center gap-2">
//                   <Info className="w-4 h-4 text-blue-600" />
//                   <p className="text-sm text-blue-700">
//                     You're editing your own profile
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
//                   <EmailIcon className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm text-gray-700">{userEmail}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Email cannot be changed (from cookies)
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   {loading ? "Updating..." : "Update Profile"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, user }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const email = getEmailFromCookies();
//     setUserEmail(email || "Not found");
//   }, []);

//   const handleConfirm = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await onConfirm();
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && user && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-lg w-full max-w-md mx-4"
//           >
//             <div className="p-4 sm:p-6 border-b bg-red-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-red-600">
//                 Delete My Account
//               </h2>
//               <p className="text-sm text-red-600 mt-1">
//                 This will delete your profile: {userEmail}
//               </p>
//             </div>

//             <div className="p-4 sm:p-6">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//                 <div className="flex items-start gap-2">
//                   <Warning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium text-red-800">
//                       Warning: This is a permanent action
//                     </p>
//                     <p className="text-sm text-red-700 mt-1">
//                       You're about to delete your own account ({userEmail}).
//                       This action cannot be undone.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-4 text-sm sm:text-base">
//                 Are you absolutely sure you want to delete <strong>your own account</strong> (<strong>{user.name}</strong>)? 
//                 All your data will be permanently removed.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                 <button
//                   onClick={onClose}
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
//                 >
//                   {loading ? "Deleting..." : "Delete My Account"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // User Card Component for Mobile View
// const UserCard = ({ user, onEdit, onDelete }) => {
//   const [showActions, setShowActions] = useState(false);
//   const userEmail = getEmailFromCookies();

//   return (
//     <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//             <AccountCircle className="w-5 h-5 text-blue-600" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <h3 className="text-sm font-semibold text-gray-900 truncate">
//                 {user.name}
//               </h3>
//               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                 Me
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 truncate">
//               {user.email}
//             </p>
//             {user.status && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Status: <span className="font-medium">{user.status}</span>
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Actions Dropdown */}
//         <div className="relative flex-shrink-0">
//           <button
//             onClick={() => setShowActions(!showActions)}
//             className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <MoreVert className="w-5 h-5" />
//           </button>

//           <AnimatePresence>
//             {showActions && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   onClick={() => {
//                     onEdit(user);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
//                 >
//                   <Edit className="w-4 h-4" />
//                   <span>Edit Profile</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(user);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                 >
//                   <Delete className="w-4 h-4" />
//                   <span>Delete Account</span>
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="mt-3 pt-3 border-t border-gray-200">
//         <div className="text-xs text-gray-600">
//           <span className="font-medium">ID:</span> {user.id.slice(0, 8)}...
//         </div>
//         <div className="text-xs text-gray-500 mt-1">
//           <span className="font-medium">Matched by:</span> {userEmail === user.email ? "Email from cookies" : "API data"}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main User Management Component
// export const MeManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [error, setError] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Check login status on component mount
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const email = getEmailFromCookies();
//       if (email) {
//         setUserEmail(email);
//         setIsLoggedIn(true);
//         console.log('User logged in with email:', email);
//       } else {
//         setIsLoggedIn(false);
//         setError('No email found in cookies. Please log in first.');
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   // Auto-detect view mode based on screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       if (window.innerWidth < 768) {
//         setViewMode("grid");
//       } else {
//         setViewMode("table");
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Load current user on component mount
//   useEffect(() => {
//     if (isLoggedIn) {
//       loadUsers();
//     }
//   }, [isLoggedIn]);

//   // Filter users when search query changes
//   useEffect(() => {
//     filterUsers();
//   }, [users, searchQuery]);

//   const loadUsers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const userData = await userService.getCurrentUser();
//       setUsers(userData);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = users;

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (user) =>
//           user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleCreateUser = async (userData) => {
//     const newUser = await userService.createUser(userData);
//     setUsers((prev) => [...prev, newUser]);
//     return newUser;
//   };

//   const handleUpdateUser = async (id, userData) => {
//     const updatedUser = await userService.updateUser(id, userData);
//     setUsers((prev) =>
//       prev.map((user) => (user.id === id ? updatedUser : user))
//     );
//     return updatedUser;
//   };

//   const handleDeleteUser = async (id) => {
//     await userService.deleteUser(id);
//     setUsers([]);
//     setUserEmail("");
//     setIsLoggedIn(false);
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Warning className="w-8 h-8 text-red-600" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
//             <p className="text-gray-600 mb-6">
//               You need to be logged in to view and manage your profile.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => window.location.href = '/login'}
//                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Go to Login Page
//               </button>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Reload Page
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">

        
//         {/* Main Content */}
//         <div className="flex-1 lg:ml-8">
//           <div className="p-4 sm:p-6 lg:p-8">
//             {/* Mobile Header with Menu Button */}
//             <div className="lg:hidden mb-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
//               >
//                 <Menu className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Header */}
//             <div className="mb-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                 <div className="mb-4 lg:mb-0">
//                   <div className="flex items-center gap-2 mb-2">
//                     <AccountCircle className="w-6 h-6 text-blue-600" />
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                       My Profile
//                     </h1>
//                   </div>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     Manage your personal profile information
//                   </p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <p className="text-sm text-gray-500">
//                       Logged in as: <span className="font-medium">{userEmail}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* View Mode Toggle */}
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-600 hidden sm:block">
//                     View:
//                   </span>
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setViewMode("table")}
//                       className={`p-2 rounded-md transition-colors ${
//                         viewMode === "table"
//                           ? "bg-white shadow-sm text-blue-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                       title="Table View"
//                     >
//                       <ViewHeadline className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`p-2 rounded-md transition-colors ${
//                         viewMode === "grid"
//                           ? "bg-white shadow-sm text-blue-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                       title="Grid View"
//                     >
//                       <Person className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Cookie Information Banner */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                   <div>
//                     <p className="text-sm font-medium text-blue-800">
//                       Personal Profile Mode
//                     </p>
//                     <p className="text-xs text-blue-600">
//                       Showing only your profile data from cookies: {userEmail}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="text-xs text-blue-700 hover:text-blue-900"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Warning className="w-5 h-5 text-red-600" />
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                   <button
//                     onClick={() => setError("")}
//                     className="text-red-400 hover:text-red-600 text-lg"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Controls */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//               <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                 {/* Search */}
//                 <div className="flex-1 max-w-2xl">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                       type="text"
//                       placeholder="Search in your profile..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     />
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={loadUsers}
//                       disabled={loading}
//                       className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                       title="Refresh"
//                     >
//                       <Refresh
//                         className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                       />
//                     </button>

//                     <button
//                       onClick={() => setCreateModalOpen(true)}
//                       className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                     >
//                       <Add className="w-4 h-4" />
//                       <span className="hidden sm:inline">Complete Profile</span>
//                       <span className="sm:hidden">Complete</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Users Content */}
//             {loading ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//                 <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                   Loading your profile...
//                 </p>
//               </div>
//             ) : filteredUsers.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                 <AccountCircle className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No Profile Found
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-base mb-4">
//                   We found your email ({userEmail}) but no profile exists yet.
//                 </p>
//                 <button
//                   onClick={() => setCreateModalOpen(true)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Create Your Profile
//                 </button>
//               </div>
//             ) : viewMode === "table" ? (
//               /* Table View for md screens and up */
//               <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-blue-50 border-b border-blue-200">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                           My Profile
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
//                           ID
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredUsers.map((user) => (
//                         <tr
//                           key={user.id}
//                           className="hover:bg-blue-50 transition-colors"
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
//                                 <AccountCircle className="w-4 h-4 text-blue-600" />
//                               </div>
//                               <div className="min-w-0">
//                                 <div className="flex items-center gap-2">
//                                   <div className="text-sm font-medium text-gray-900 truncate">
//                                     {user.name}
//                                   </div>
//                                   <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                                     Me
//                                   </span>
//                                 </div>
//                                 <div className="text-sm text-gray-500 truncate">
//                                   {user.email}
//                                 </div>
//                                 {user.status && (
//                                   <div className="text-xs text-gray-500 mt-1">
//                                     Status: {user.status}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden sm:table-cell">
//                             <div className="text-sm text-gray-900 font-mono truncate max-w-[120px] lg:max-w-[200px]">
//                               {user.id}
//                             </div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               Matched by email from cookies
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => {
//                                   setSelectedUser(user);
//                                   setEditModalOpen(true);
//                                 }}
//                                 className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Edit profile"
//                               >
//                                 <Edit className="w-3 h-3" />
//                                 <span className="hidden xs:inline">Edit</span>
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setSelectedUser(user);
//                                   setDeleteModalOpen(true);
//                                 }}
//                                 className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Delete account"
//                               >
//                                 <Delete className="w-3 h-3" />
//                                 <span className="hidden xs:inline">Delete</span>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               /* Grid/Card View for mobile and when in grid mode */
//               <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {filteredUsers.map((user) => (
//                   <UserCard
//                     key={user.id}
//                     user={user}
//                     onEdit={(user) => {
//                       setSelectedUser(user);
//                       setEditModalOpen(true);
//                     }}
//                     onDelete={(user) => {
//                       setSelectedUser(user);
//                       setDeleteModalOpen(true);
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <CreateUserModal
//         isOpen={createModalOpen}
//         onClose={() => setCreateModalOpen(false)}
//         onCreate={handleCreateUser}
//       />

//       <EditUserModal
//         isOpen={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         onUpdate={handleUpdateUser}
//         user={selectedUser}
//       />

//       <DeleteConfirmationModal
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         onConfirm={() => selectedUser && handleDeleteUser(selectedUser.id)}
//         user={selectedUser}
//       />
//     </div>
//   );
// };























/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import {
  Person,
  Email,
  Phone,
  Verified,
  AdminPanelSettings,
  HowToReg,
  Edit,
  Delete,
  Refresh,
  CheckCircle,
  Cancel,
  Shield,
  CalendarToday,
  Fingerprint,
  Lock,
  Security,
  AccountCircle,
  Password,
  Visibility,
  VisibilityOff,
  Key,
  Send,
  VerifiedUser,
  Warning,
  Settings,
  Save,
  History,
  Devices,
  Storage,
  Wifi
} from '@mui/icons-material';

// Create axios instance
const api = axios.create({
  baseURL: 'https://ndizmusicprojectbackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Helper function to get ALL possible email cookies
const getEmailFromCookies = () => {
  // Get all cookies as a string
  const cookies = document.cookie;
  console.log('All cookies:', cookies);
  
  // List of possible cookie names that might contain email
  const possibleEmailKeys = [
    'userEmail',
    'email',
    'user_email',
    'UserEmail',
    'Email',
    'USER_EMAIL',
    'user.email',
    'user',
    'auth_email',
    'login_email'
  ];
  
  // Try to get email from each possible key
  for (const key of possibleEmailKeys) {
    const value = Cookies.get(key);
    if (value) {
      console.log(`Found value in cookie "${key}":`, value);
      // Check if it looks like an email (contains @)
      if (value.includes('@')) {
        console.log(`Found email in cookie "${key}":`, value);
        return value;
      }
    }
  }
  
  // Also try to parse any cookie that might contain user object
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      if (userData.email) {
        console.log('Found email in user cookie object:', userData.email);
        return userData.email;
      }
    } catch (e) {
      console.log('Failed to parse user cookie');
    }
  }
  
  // Try to get from localStorage as fallback
  try {
    const localEmail = localStorage.getItem('userEmail') || 
                      localStorage.getItem('email') || 
                      localStorage.getItem('user_email');
    if (localEmail) {
      console.log('Found email in localStorage:', localEmail);
      return localEmail;
    }
  } catch (e) {
    console.log('Failed to read localStorage');
  }
  
  console.log('No email found in any cookie or storage');
  return null;
};

// Function to fetch user data by email
const fetchUserByEmail = async (email) => {
  try {
    console.log(`Fetching user data for email: ${email}`);
    
    // Fetch all users from the API
    const response = await api.get('/users');
    
    if (response.data && response.data.success && response.data.data) {
      // Log the first user to see structure
      if (response.data.data.length > 0) {
        console.log('Sample user data structure:', response.data.data[0]);
      }
      
      // Find user with matching email (case-insensitive)
      const foundUser = response.data.data.find(user => 
        user.email && user.email.toLowerCase() === email.toLowerCase()
      );
      
      if (foundUser) {
        console.log('User found:', foundUser);
        return foundUser;
      } else {
        console.log('No user found with email:', email);
        // Log all available emails for debugging
        const availableEmails = response.data.data.map(u => u.email);
        console.log('Available emails in database:', availableEmails);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, title, message, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4">
            <CheckCircle className="text-3xl text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-4">{message}</p>
          {details && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 text-center">{details}</p>
            </div>
          )}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-white font-medium transition-all bg-gradient-to-t from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Error Modal Component
const ErrorModal = ({ isOpen, onClose, title, message, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full mx-auto mb-4">
            <Cancel className="text-3xl text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-4">{message}</p>
          {details && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 text-center">{details}</p>
            </div>
          )}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-white font-medium transition-all bg-gradient-to-t from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Confirm Modal Component
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = "warning", 
  isLoading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (type === "error") return <Cancel className="text-2xl text-red-600" />;
    if (type === "warning") return <Warning className="text-2xl text-yellow-600" />;
    if (type === "info") return <Verified className="text-2xl text-blue-600" />;
    return <Shield className="text-2xl text-purple-600" />;
  };

  const getBgColor = () => {
    if (type === "error") return "bg-red-100";
    if (type === "warning") return "bg-yellow-100";
    if (type === "info") return "bg-blue-100";
    return "bg-purple-100";
  };

  const getButtonColor = () => {
    if (type === "error") return "bg-gradient-to-t from-red-500 to-red-700 hover:from-red-600 hover:to-red-800";
    if (type === "warning") return "bg-gradient-to-t from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800";
    if (type === "info") return "bg-gradient-to-t from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800";
    return "bg-gradient-to-t from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <div className="p-6">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 ${getBgColor()}`}>
            {getIcon()}
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-4">{message}</p>
          {children}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 bg-gradient-to-t from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300"
            >
              {cancelText}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${getButtonColor()} disabled:opacity-50`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                confirmText
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const MeManagement = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  
  // Modal states
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [verifyEmailDialog, setVerifyEmailDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  
  // Success/Error modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  
  // Edit data state
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeVerificationStep, setActiveVerificationStep] = useState(0);

  // Toggle states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Activity stats
  const [activityStats, setActivityStats] = useState({
    lastLogin: null,
    lastLoginIp: '',
    totalLogins: 0,
    devices: 2,
    storageUsed: '1.2 GB'
  });

  // API loading states
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Show success modal
  const showSuccess = useCallback((title, message, details = "") => {
    setModalTitle(title);
    setModalMessage(message);
    setModalDetails(details);
    setShowSuccessModal(true);
  }, []);

  // Show error modal
  const showError = useCallback((title, message, details = "") => {
    setModalTitle(title);
    setModalMessage(message);
    setModalDetails(details);
    setShowErrorModal(true);
  }, []);

  // Get email from cookies on component mount
  useEffect(() => {
    const email = getEmailFromCookies();
    setUserEmail(email || '');
    
    if (!email) {
      setError('No email found in cookies. Please make sure you are logged in.');
      setDebugInfo('Cookies available: ' + document.cookie);
    }
    setLoading(false);
  }, []);

  // Load user data when email is available
  useEffect(() => {
    const loadUserData = async () => {
      if (!userEmail) return;
      
      setLoading(true);
      try {
        const userData = await fetchUserByEmail(userEmail);
        
        if (userData) {
          setUser(userData);
          setEditData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
          });
          
          // Update activity stats
          setActivityStats({
            lastLogin: userData.lastLogin || userData.createdAt || null,
            lastLoginIp: userData.lastLoginIp || '',
            totalLogins: userData.lastLogin ? 1 : 0,
            devices: 2,
            storageUsed: '1.2 GB'
          });
          
          showSuccess("Profile Loaded", "Your profile has been loaded successfully!");
        } else {
          setError(`No user found with email: ${userEmail}`);
          showError("Load Failed", `No user found with email: ${userEmail}`);
        }
      } catch (err) {
        setError(err.message);
        showError("Load Failed", "Failed to load your profile data");
        console.error('Failed to load user data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      loadUserData();
    }
  }, [userEmail]);

  // Manual email input for debugging
  const handleManualEmailSubmit = (e) => {
    e.preventDefault();
    const email = prompt("Enter your email address manually:");
    if (email && email.includes('@')) {
      setUserEmail(email);
    }
  };

  // Update user profile
  const handleUpdateUser = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      // Update user via API
      const response = await api.put(`/users/${user._id || user.id}`, editData);
      
      if (response.data && response.data.success) {
        // Update local state
        setUser(prevUser => ({
          ...prevUser,
          ...editData
        }));
        
        // Update email in cookies if changed
        if (editData.email && editData.email !== user.email) {
          document.cookie = `userEmail=${editData.email}; path=/`;
          document.cookie = `userSearchEmail=${editData.email}; path=/`;
        }
        
        showSuccess("Profile Updated", "Your profile has been updated successfully!", "Changes have been saved to our database.");
        setEditModal(false);
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      showError("Update Failed", err.response?.data?.message || 'Failed to update your profile');
    } finally {
      setIsUpdating(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("Validation Error", "New passwords do not match!");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showError("Validation Error", "Password must be at least 6 characters long!");
      return;
    }
    
    try {
      setIsChangingPassword(true);
      // Change password via API
      const response = await api.put(`/users/${user._id || user.id}/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response.data && response.data.success) {
        showSuccess("Password Changed", "Your password has been changed successfully!", "You can now use your new password to log in.");
        setPasswordModal(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error('Password change failed');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      showError("Password Change Failed", err.response?.data?.message || 'Failed to change your password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Send verification email
  const handleSendVerificationEmail = async () => {
    if (!user?.email) {
      showError("Validation Error", "No email address found");
      return;
    }
    
    try {
      setIsSendingVerification(true);
      // Send verification via API
      const response = await api.post("/auth/send-verification", {
        email: user.email
      });
      
      if (response.data && response.data.success) {
        showSuccess("Verification Sent", "Verification email sent successfully!", "Please check your inbox for the verification code.");
        setActiveVerificationStep(1);
      } else {
        throw new Error('Failed to send verification');
      }
    } catch (err) {
      console.error('Error sending verification:', err);
      showError("Verification Failed", err.response?.data?.message || 'Failed to send verification email');
    } finally {
      setIsSendingVerification(false);
    }
  };

  // Verify email with code
  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      showError("Validation Error", "Please enter verification code");
      return;
    }
    
    try {
      setIsVerifying(true);
      // Verify email via API
      const response = await api.post("/auth/verify-email", {
        email: user.email,
        code: verificationCode
      });
      
      if (response.data && response.data.success) {
        showSuccess("Email Verified", "Email verified successfully!", "Your email address is now verified.");
        
        // Refresh user data
        const updatedUser = await fetchUserByEmail(user.email);
        setUser(updatedUser);
        
        setVerifyEmailDialog(false);
        setVerificationCode('');
        setActiveVerificationStep(0);
      } else {
        throw new Error('Verification failed');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      showError("Verification Failed", err.response?.data?.message || 'Failed to verify your email');
    } finally {
      setIsVerifying(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!user) return;
    
    if (deleteConfirmation !== 'DELETE') {
      showError("Confirmation Required", "Please type DELETE to confirm");
      return;
    }
    
    try {
      setIsDeleting(true);
      // Delete user via API
      const response = await api.delete(`/users/${user._id || user.id}`);
      
      if (response.data && response.data.success) {
        showSuccess("Account Deleted", "Your account has been deleted successfully!", "All your data has been removed from our servers.");
        
        // Clear user email from cookies
        document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        setUser(null);
        setDeleteDialog(false);
        setDeleteConfirmation('');
        
        // Redirect to home page
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      showError("Delete Failed", err.response?.data?.message || 'Failed to delete your account');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full"
            ></motion.div>
            <AccountCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Profile</h3>
          <p className="text-gray-600 mb-4">Fetching your account information...</p>
          {userEmail && <p className="text-sm text-blue-600">Email: {userEmail}</p>}
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cancel className="text-4xl text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Profile Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          
          {debugInfo && (
            <div className="bg-gray-100 p-3 rounded-lg mb-4 text-left">
              <p className="text-xs text-gray-700 font-mono break-all">{debugInfo}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={handleManualEmailSubmit}
              className="bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              Enter Email Manually
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AccountCircle className="text-4xl text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No User Found</h3>
          <p className="text-gray-600 mb-4">No user found with email: {userEmail || 'unknown'}</p>
          
          <div className="space-y-3">
            <button
              onClick={handleManualEmailSubmit}
              className="bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              Try Different Email
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#2f7ede] to-[#2f7ede] text-white p-4 md:p-6 lg:p-8">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: '60px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-2xl shadow-lg"
                >
                  <AccountCircle className="text-white text-3xl" />
                </motion.div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    My Profile
                  </h1>
                  <p className="text-gray-100 mt-1">Welcome back, {user?.name}!</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Refresh />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-t from-[#2f7ede] to-[#2f7ede] text-white rounded-3xl shadow-2xl overflow-hidden border-0"
            >
              <div className="p-6 lg:p-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      <div className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-2xl rounded-full bg-white flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      {user?.isVerified && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                          <Verified className="text-sm" />
                        </div>
                      )}
                    </motion.div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{user?.name || 'No Name'}</h2>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Email className="text-sm text-blue-100" />
                        <p className="text-blue-100 opacity-90 text-sm sm:text-base">{user?.email}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${user?.isVerified ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
                          {user?.isVerified ? <CheckCircle className="text-xs" /> : <Cancel className="text-xs" />}
                          {user?.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white flex items-center gap-1">
                          {user?.status === 'admin' ? <Shield className="text-xs" /> : <Person className="text-xs" />}
                          {user?.status === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditModal(true)}
                      title="Edit profile"
                      className="bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 transition-colors duration-200"
                    >
                      <Edit className="text-blue-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personal Information Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-xl">
                    <Person className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                </div>
                <div className="h-px bg-gray-200 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Fingerprint className="text-blue-500 text-sm" />
                        <span className="text-xs font-medium text-gray-600">USER ID</span>
                      </div>
                      <p className="font-mono text-sm bg-white text-black p-2 rounded-lg break-all">
                        {user?._id || user?.id}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Email className="text-blue-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email Address</p>
                            <p className="font-semibold text-black truncate">{user?.email}</p>
                          </div>
                        </div>
                        {!user?.isVerified && (
                          <motion.div
                            animate={{
                              scale: [1, 1.05, 1],
                              transition: { 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          >
                            <button
                              onClick={() => setVerifyEmailDialog(true)}
                              className="bg-gradient-to-t from-orange-500 to-orange-400 text-white text-xs px-3 py-1 rounded-lg"
                            >
                              Verify
                            </button>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Phone className="text-green-600 text-sm" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="font-semibold text-black">{user?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {user?.status === 'admin' ? (
                            <AdminPanelSettings className="text-purple-600 text-sm" />
                          ) : (
                            <HowToReg className="text-purple-600 text-sm" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Account Type</p>
                          <p className="font-semibold text-blue-500">{user?.status === 'admin' ? 'Administrator' : 'Standard User'}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user?.status === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                        {user?.status === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarToday className="text-purple-500 text-sm" />
                          <span className="text-xs font-medium text-gray-600">ACCOUNT AGE</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Created On</p>
                          <p className="text-sm font-medium bg-gray-50 text-black p-2 rounded-lg">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                          <p className="text-sm font-medium bg-gray-50 text-black p-2 rounded-lg">
                            {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Stats Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-t from-green-500 to-green-400 rounded-xl">
                    <History className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Activity Statistics</h3>
                </div>
                <div className="h-px bg-gray-200 mb-6"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                    <History className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{activityStats.totalLogins}</p>
                    <p className="text-sm text-gray-600">Total Logins</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                    <Devices className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{activityStats.devices}</p>
                    <p className="text-sm text-gray-600">Active Devices</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                    <Storage className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{activityStats.storageUsed}</p>
                    <p className="text-sm text-gray-600">Storage Used</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
                    <Wifi className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-amber-600">Online</p>
                    <p className="text-sm text-gray-600">Status</p>
                  </div>
                </div>
                
                {activityStats.lastLogin && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarToday className="h-4 w-4" />
                      <span>Last login: {new Date(activityStats.lastLogin).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                {activityStats.lastLoginIp && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Fingerprint className="h-4 w-4" />
                      <span>Last login IP: {activityStats.lastLoginIp}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Actions & Settings */}
          <div className="space-y-8">
            {/* Quick Actions Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-t from-green-500 to-green-400 rounded-xl">
                    <Settings className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
                </div>
                <div className="h-px bg-gray-200 mb-6"></div>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditModal(true)}
                    className="bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                  >
                    <Edit />
                    Edit Profile
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPasswordModal(true)}
                    className="bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                  >
                    <Password />
                    Change Password
                  </motion.button>
                  
                  {!user?.isVerified && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVerifyEmailDialog(true)}
                      className="bg-gradient-to-t from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                    >
                      <VerifiedUser />
                      Verify Email
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDeleteDialog(true)}
                    className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold py-3 rounded-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                  >
                    <Delete />
                    Delete Account
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Security Settings Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-t from-red-500 to-red-400 rounded-xl">
                    <Security className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
                </div>
                <div className="h-px bg-gray-200 mb-6"></div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-black">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Enhanced account security</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={twoFactorEnabled}
                          onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600">Email Status</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${user?.isVerified ? 'bg-green-100' : 'bg-red-100'}`}>
                          {user?.isVerified ? (
                            <Verified className="text-green-600" />
                          ) : (
                            <Warning className="text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-blue-400">{user?.isVerified ? 'Verified' : 'Unverified'}</p>
                          <p className="text-sm text-gray-600">Email address</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setVerifyEmailDialog(true)}
                        className={`font-semibold text-white px-3 py-1 rounded-lg ${user?.isVerified ? 'bg-gradient-to-t from-red-500 to-red-400' : 'bg-gradient-to-t from-green-500 to-green-400'}`}
                      >
                        {user?.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={modalTitle}
        message={modalMessage}
        details={modalDetails}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={modalTitle}
        message={modalMessage}
        details={modalDetails}
      />

      {/* Edit Profile Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Edit className="text-2xl" />
                <h3 className="text-xl font-bold">Edit Profile</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 text-black py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                disabled={isUpdating}
                className="bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Lock className="text-2xl" />
                <h3 className="text-xl font-bold">Change Password</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                      placeholder="Enter current password"
                    />
                    <div
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showCurrentPassword ? <VisibilityOff className="h-5 w-5 text-gray-400" /> : <Visibility className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 text-black py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                      placeholder="Enter new password"
                    />
                    <div
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showNewPassword ? <VisibilityOff className="h-5 w-5 text-gray-400" /> : <Visibility className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters long</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 text-black bg-gray-50 border rounded-xl focus:ring-2 focus:border-transparent pr-10 ${
                        passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showConfirmPassword ? <VisibilityOff className="h-5 w-5 text-gray-400" /> : <Visibility className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                  {passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setPasswordModal(false)}
                className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={passwordData.newPassword !== passwordData.confirmPassword || passwordData.newPassword.length < 6 || isChangingPassword}
                className="bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isChangingPassword ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Verify Email Modal */}
      {verifyEmailDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6">
              <div className="flex items-center gap-3">
                <VerifiedUser className="text-2xl" />
                <h3 className="text-xl font-bold">Verify Email Address</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6 mt-4">
                {/* Stepper */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeVerificationStep >= 0 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      1
                    </div>
                    <div className={`w-16 h-1 ${activeVerificationStep >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeVerificationStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      2
                    </div>
                  </div>
                </div>
                
                {activeVerificationStep === 0 && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-sm text-blue-700">We'll send a verification code to {user?.email}</p>
                    </div>
                    <button
                      onClick={handleSendVerificationEmail}
                      disabled={isSendingVerification}
                      className="bg-gradient-to-t from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingVerification ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send />
                          Send Verification Code
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                {activeVerificationStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <p className="text-sm text-green-700">Verification code sent to {user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter 6-digit code"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveVerificationStep(0)}
                        className="border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 w-full"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleVerifyEmail}
                        disabled={isVerifying || !verificationCode}
                        className="bg-gradient-to-t from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isVerifying ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Verified />
                            Verify Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Account Confirm Modal */}
      <ConfirmModal
        isOpen={deleteDialog}
        onClose={() => {
          setDeleteDialog(false);
          setDeleteConfirmation('');
        }}
        onConfirm={handleDeleteUser}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
        type="error"
        isLoading={isDeleting}
        confirmText="Delete Account"
        cancelText="Cancel"
      >
        <div className="mt-4">
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
          />
        </div>
      </ConfirmModal>
    </div>
  );
};