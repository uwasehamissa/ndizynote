

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */

// // =============================================
// // IMPORT SECTION - All necessary dependencies
// // =============================================
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import axios from "axios";

// import { Close, Dashboard, Logout } from "@mui/icons-material";
// import Button from "@mui/material/Button";

// // =============================================
// // CONFIGURATION SECTION - Easy to modify settings
// // =============================================

// // API Configuration - Change this to your actual backend URL
// const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// // Navigation Menu Configuration - Easy to update menu items
// const navigationConfig = {
//   main: [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Classes", path: "/classes" },
//     { name: "FAQ", path: "/faq" },
//   ],
//   authenticated: [{ name: "Dashboard", path: "/dashboard" }],
// };

// // =============================================
// // SVG ICONS COMPONENT - All visual icons in one place
// // =============================================
// const SvgIcons = {
//   // App Logo with gradient
//   Logo: () => (
//     <svg
//       width="32"
//       height="32"
//       viewBox="0 0 32 32"
//       fill="none"
//       className="flex-shrink-0"
//     >
//       <defs>
//         <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#3B82F6" />
//           <stop offset="100%" stopColor="#8B5CF6" />
//         </linearGradient>
//       </defs>
//       <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
//       <path d="M16 8L22 12L16 16L10 12L16 8Z" fill="white" fillOpacity="0.9" />
//       <path
//         d="M16 16L22 20L16 24L10 20L16 16Z"
//         fill="white"
//         fillOpacity="0.7"
//       />
//       <path
//         d="M22 12L28 16L22 20L16 16L22 12Z"
//         fill="white"
//         fillOpacity="0.5"
//       />
//     </svg>
//   ),

//   // Menu icon for mobile navigation
//   Menu: () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path
//         d="M3 12h18M3 6h18M3 18h18"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   ),

//   // Close icon for modals
//   Close: () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//       <path
//         d="M18 6L6 18M6 6l12 12"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   ),

//   // User profile icon
//   User: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   ),

//   // Email icon for forms
//   Email: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//     </svg>
//   ),

//   // Message icon for contact
//   Message: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//     </svg>
//   ),

//   // Phone icon
//   Phone: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   ),

//   // Lock icon for security
//   Lock: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//     </svg>
//   ),

//   // Key icon for password reset
//   Key: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
//     </svg>
//   ),

//   // Success checkmark icon
//   Success: () => (
//     <svg
//       width="64"
//       height="64"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//       <path d="m9 11 3 3L22 4" />
//     </svg>
//   ),

//   // Error X icon
//   Error: () => (
//     <svg
//       width="64"
//       height="64"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="m15 9-6 6" />
//       <path d="m9 9 6 6" />
//     </svg>
//   ),
// };

// // =============================================
// // LOADING SPINNER COMPONENT
// // =============================================
// const LoadingSpinner = ({ size = "md", text = "" }) => {
//   const sizeClasses = {
//     sm: "w-5 h-5",
//     md: "w-8 h-8",
//     lg: "w-12 h-12",
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div
//         className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
//       />
//       {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
//     </div>
//   );
// };

// // =============================================
// // AUTHENTICATION CONTEXT - Global user state management
// // =============================================

// // Create context for authentication
// const AuthContext = createContext();

// // Custom hook to easily access auth functions and state
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // =============================================
// // API SERVICE FUNCTIONS - All backend communications
// // =============================================
// const apiService = {
//   /**
//    * Login user with email and password
//    */
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
//         email,
//         password,
//       });
      
//       // Debug: Log response structure
//       console.log("Login API Response:", response.data);
      
//       return response.data;
//     } catch (error) {
//       console.error("Login API Error:", error.response?.data || error.message);
//       const errorMessage =
//         error.response?.data?.message || 
//         error.response?.data?.error ||
//         error.message || 
//         "Login failed. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Register new user with all required details
//    */
//   register: async (name, email, password, confirmPassword) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Registration failed. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Request password reset email
//    */
//   forgotPassword: async (email) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/users/forgot-password`,
//         { email }
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to send reset email. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Reset password with token and new password
//    */
//   resetPassword: async (token, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/reset-password`, {
//         token,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to reset password. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Submit contact form data
//    */
//   contact: async (formData) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/contacts/contact`, formData);
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         error.response?.data?.message ||
//           "Message sending failed. Please try again."
//       );
//     }
//   },
// };

// // =============================================
// // AUTH PROVIDER - Manages user authentication state
// // =============================================
// export const AuthProvider = ({ children }) => {
//   // State variables for user management
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   /**
//    * Login function - handles user authentication
//    */
//   const login = async (email, password) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.login(email, password);

//       // Debug: Log response for troubleshooting
//       console.log("Login response:", response);

//       // Handle successful login
//       if (response && (response.success || response.token)) {
//         // Try different possible response structures
//         const userData = response.data?.user || response.user || response;
//         const token = response.data?.token || response.token;
        
//         if (!userData) {
//           console.error("User data not found in response:", response);
//           return { 
//             success: false, 
//             error: "Server error: User information not found." 
//           };
//         }

//         // Validate user status with fallback to 'user'
//         const validStatuses = ["admin", "user", "manager"];
//         const userStatus = (userData.status && validStatuses.includes(
//           String(userData.status).toLowerCase()
//         ))
//           ? String(userData.status).toLowerCase()
//           : (userData.role && validStatuses.includes(String(userData.role).toLowerCase()))
//           ? String(userData.role).toLowerCase()
//           : "user";

//         // Create complete user profile with defaults
//         const userProfile = {
//           email: userData.email || email,
//           status: userStatus,
//           id: userData.id || userData._id || Date.now().toString(),
//           name: userData.name || userData.username || email.split('@')[0] || "User",
//           ...userData,
//         };

//         // Update state and localStorage
//         setUser(userProfile);
//         setIsAuthenticated(true);
//         localStorage.setItem("user", JSON.stringify(userProfile));
        
//         if (token) {
//           localStorage.setItem("token", token);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         }
        
//         localStorage.setItem("userEmail", userProfile.email);
//         localStorage.setItem("userRole", userProfile.status);

//         return { 
//           success: true, 
//           user: userProfile,
//           message: response.message || "Login successful" 
//         };
//       } else {
//         return { 
//           success: false, 
//           error: response?.message || response?.error || "Login failed" 
//         };
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Login failed. Please try again." 
//       };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Register function - creates new user account
//    */
//   const register = async (name, email, password, confirmPassword) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.register(
//         name,
//         email,
//         password,
//         confirmPassword
//       );

//       console.log("Register response:", response);

//       if (response) {
//         if (response.success || response.token) {
//           // Check if auto-login occurred
//           const userData = response.data?.user || response.user || response;
//           const token = response.data?.token || response.token;
          
//           if (userData && token) {
//             // Create user profile
//             const userProfile = {
//               email: userData.email || email,
//               status: userData.status || userData.role || "user",
//               id: userData.id || userData._id || Date.now().toString(),
//               name: userData.name || name,
//               ...userData,
//             };
            
//             setUser(userProfile);
//             setIsAuthenticated(true);
//             localStorage.setItem("user", JSON.stringify(userProfile));
//             localStorage.setItem("token", token);
            
//             if (token) {
//               axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             }

//             return { 
//               success: true, 
//               user: userProfile, 
//               autoLoggedIn: true,
//               message: response.message || "Registration successful" 
//             };
//           } else {
//             // Registration successful but no auto-login
//             return {
//               success: true,
//               autoLoggedIn: false,
//               message: response.message || "Registration successful. Please login.",
//             };
//           }
//         } else {
//           return {
//             success: false,
//             error: response?.message || response?.error || "Registration failed",
//           };
//         }
//       } else {
//         return { success: false, error: "No response from server" };
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Logout function - clears user data
//    */
//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     delete axios.defaults.headers.common["Authorization"];
//     toast.info("You have been logged out");
//   };

//   // Initialize authentication on app start
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const savedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       if (savedUser && token) {
//         try {
//           const userData = JSON.parse(savedUser);
          
//           // Validate token and user data if needed (could add an API call here)
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
//           setUser(userData);
//           setIsAuthenticated(true);
//         } catch (error) {
//           console.error("Error initializing auth:", error);
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("userRole");
//           delete axios.defaults.headers.common["Authorization"];
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   // Value provided to all components using this context
//   const value = {
//     user,
//     isAuthenticated,
//     isLoading,
//     login,
//     register,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // =============================================
// // PROTECTED ROUTE COMPONENT - Secures pages
// // =============================================
// export const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { isAuthenticated, user, isLoading } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if not authenticated or not admin
//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       navigate("/");
//     }
//     if (!isLoading && adminOnly && user?.status !== "admin") {
//       navigate("/dashboard/user");
//     }
//   }, [isAuthenticated, user, isLoading, navigate]);

//   // Show loading while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
//         <LoadingSpinner text="Checking authentication..." />
//       </div>
//     );
//   }

//   // Don't render if not authenticated or not authorized
//   if (!isAuthenticated) return null;
//   if (adminOnly && user?.status !== "admin") return null;

//   return children;
// };

// // =============================================
// // REUSABLE MODAL COMPONENTS
// // =============================================

// /**
//  * Modal Overlay - Background for all modals
//  */
// const ModalOverlay = ({ children, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto flex items-start justify-center z-50 p-4"
//     onClick={(e) => {
//       if (e.target === e.currentTarget) onClose();
//     }}
//   >
//     {children}
//   </motion.div>
// );

// /**
//  * Close Button for Modals
//  */
// const ModalCloseButton = ({ onClose }) => (
//   <button
//     onClick={onClose}
//     className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-pink-600 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
//   >
//     <Close className="size-4" />
//   </button>
// );

// /**
//  * Success Modal - Shows when actions complete successfully
//  */
// const SuccessModal = ({ onClose }) => (
//   <motion.div
//     initial={{ scale: 0.9, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.9, opacity: 0 }}
//     transition={{ type: "spring", damping: 25 }}
//     className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
//     onClick={(e) => e.stopPropagation()}
//   >
//     <ModalCloseButton onClose={onClose} />
//     <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//       <SvgIcons.Success />
//     </div>
//     <h3 className="text-2xl font-bold text-gray-800 mb-4">
//       Message Sent Successfully!
//     </h3>
//     <p className="text-gray-600 mb-6">
//       Thank you for contacting us. We'll get back to you within 24 hours.
//     </p>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClose}
//       className="bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
//     >
//       Close
//     </motion.button>
//   </motion.div>
// );

// /**
//  * Fail Modal - Shows when actions fail
//  */
// const FailModal = ({ onClose, errorMessage }) => (
//   <motion.div
//     initial={{ scale: 0.9, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.9, opacity: 0 }}
//     transition={{ type: "spring", damping: 25 }}
//     className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
//     onClick={(e) => e.stopPropagation()}
//   >
//     <ModalCloseButton onClose={onClose} />
//     <div className="w-20 h-20 bg-gradient-to-tr from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//       <SvgIcons.Error />
//     </div>
//     <h3 className="text-2xl font-bold text-gray-800 mb-4">
//       Message Failed to Send
//     </h3>
//     <p className="text-gray-600 mb-4">
//       {errorMessage ||
//         "There was an error sending your message. Please try again."}
//     </p>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClose}
//       className="bg-gradient-to-tr from-red-500 to-pink-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-200"
//     >
//       Try Again
//     </motion.button>
//   </motion.div>
// );

// // =============================================
// // FORM COMPONENTS - Reusable form templates
// // =============================================

// /**
//  * Login Form Component
//  */
// const LoginForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onForgotPassword,
//   onSwitchToRegister,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your password"
//         required
//       />
//     </div>

//     <div className="text-right">
//       <button
//         type="button"
//         onClick={onForgotPassword}
//         className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//       >
//         Forgot Password?
//       </button>
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white py-4 px-4 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         "Sign In"
//       )}
//     </motion.button>

//     <div className="mt-8 text-center">
//       <p className="text-gray-600">
//         Don't have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToRegister}
//           className="bg-gradient-to-br from-blue-800 to-indigo-800 px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//         >
//           Create one here
//         </button>
//       </p>
//     </div>
//   </form>
// );

// /**
//  * Register Form Component
//  */
// const RegisterForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onSwitchToLogin,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Full Name
//       </label>
//       <input
//         type="text"
//         name="name"
//         value={form.name}
//         onChange={(e) => onChange({ ...form, name: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your full name"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your password"
//         required
//         minLength={6}
//       />
//       <p className="text-xs text-gray-500 mt-2">
//         Must be at least 6 characters
//       </p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Confirm Password
//       </label>
//       <input
//         type="password"
//         name="confirmPassword"
//         value={form.confirmPassword}
//         onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Confirm your password"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-green-500 via-emerald-500 to-teal-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         "Create Account"
//       )}
//     </motion.button>

//     <div className="mt-8 text-center">
//       <p className="text-gray-600">
//         Already have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToLogin}
//           className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//         >
//           Sign in here
//         </button>
//       </p>
//     </div>
//   </form>
// );

// /**
//  * Forgot Password Form Component
//  */
// const ForgotPasswordForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onSwitchToLogin,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="text-center mb-6">
//       <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//         <SvgIcons.Key />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
//       <p className="text-gray-600">
//         Enter your email to receive reset instructions
//       </p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isSubmitting ? "Sending Instructions..." : "Send Reset Link"}
//     </motion.button>

//     <div className="text-center">
//       <button
//         type="button"
//         onClick={onSwitchToLogin}
//         className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//       >
//         Back to Sign In
//       </button>
//     </div>
//   </form>
// );

// /**
//  * Reset Password Form Component
//  */
// const ResetPasswordForm = ({ form, onChange, onSubmit, isSubmitting }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="text-center mb-6">
//       <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//         <SvgIcons.Lock />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">
//         Set New Password
//       </h3>
//       <p className="text-gray-600">Enter your new password below</p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         New Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter new password"
//         required
//         minLength={6}
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Confirm New Password
//       </label>
//       <input
//         type="password"
//         name="confirmPassword"
//         value={form.confirmPassword}
//         onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Confirm new password"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isSubmitting ? "Resetting Password..." : "Reset Password"}
//     </motion.button>
//   </form>
// );

// /**
//  * Contact Form Component
//  */
// const ContactForm = ({ form, onChange, onSubmit, isSubmitting }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-3">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={(e) => onChange({ ...form, name: e.target.value })}
//           className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//           placeholder="Enter your full name"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-3">
//           Email Address
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={(e) => onChange({ ...form, email: e.target.value })}
//           className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//           placeholder="Enter your email"
//           required
//         />
//       </div>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Subject
//       </label>
//       <input
//         type="text"
//         name="subject"
//         value={form.subject}
//         onChange={(e) => onChange({ ...form, subject: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter the subject"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Message
//       </label>
//       <textarea
//         name="message"
//         value={form.message}
//         onChange={(e) => onChange({ ...form, message: e.target.value })}
//         rows={6}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm resize-none"
//         placeholder="Enter your message..."
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-orange-500 via-red-500 to-pink-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         "Send Message"
//       )}
//     </motion.button>

//     <div className="text-center text-sm text-gray-500">
//       <p>We'll get back to you within 24 hours</p>
//     </div>
//   </form>
// );

// // =============================================
// // HELPER FUNCTIONS - Utility functions
// // =============================================

// /**
//  * Get the correct dashboard path based on user role
//  */
// const getDashboardPath = (user) => {
//   const userStatus = user?.status || user?.role;
//   switch (userStatus) {
//     case "admin":
//       return "/dashboard";
//     case "manager":
//       return "/dashboard/manager";
//     case "user":
//       return "/dashboard/user";
//     default:
//       return "/dashboard";
//   }
// };

// /**
//  * Get display-friendly user status
//  */
// const getUserDisplayStatus = (user) => {
//   return user?.status || user?.role || "user";
// };

// // =============================================
// // MAIN NAVBAR COMPONENT - Complete navigation system
// // =============================================
// export const Navbar = () => {
//   // State for managing modal visibility
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
//   const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
//   const [isContactOpen, setIsContactOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [isFailModalOpen, setIsFailModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Form state management
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [registerForm, setRegisterForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
//   const [resetPasswordForm, setResetPasswordForm] = useState({
//     password: "",
//     confirmPassword: "",
//     token: "",
//   });
//   const [contactForm, setContactForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   // Authentication hooks
//   const { isAuthenticated, user, login, register: registerUser, logout } = useAuth();
//   const navigate = useNavigate();

//   // =============================================
//   // MODAL MANAGEMENT FUNCTIONS
//   // =============================================

//   const openLogin = () => {
//     closeAllModals();
//     setIsLoginOpen(true);
//   };

//   const openRegister = () => {
//     closeAllModals();
//     setIsRegisterOpen(true);
//   };

//   const openForgotPassword = () => {
//     closeAllModals();
//     setIsForgotPasswordOpen(true);
//   };

//   const openContact = () => {
//     closeAllModals();
//     setIsContactOpen(true);
//   };

//   const closeAllModals = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(false);
//     setIsForgotPasswordOpen(false);
//     setIsResetPasswordOpen(false);
//     setIsContactOpen(false);
//     setIsSuccessModalOpen(false);
//     setIsFailModalOpen(false);
//     setErrorMessage("");
//   };

//   const closeModals = () => {
//     closeAllModals();
//     // Reset all forms
//     setLoginForm({ email: "", password: "" });
//     setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
//     setForgotPasswordForm({ email: "" });
//     setResetPasswordForm({ password: "", confirmPassword: "", token: "" });
//     setContactForm({ name: "", email: "", subject: "", message: "" });
//   };

//   // Switch between login and register modals
//   const switchToRegister = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(true);
//     if (loginForm.email) {
//       setRegisterForm((prev) => ({ ...prev, email: loginForm.email }));
//     }
//   };

//   const switchToLogin = () => {
//     setIsRegisterOpen(false);
//     setIsLoginOpen(true);
//     if (registerForm.email) {
//       setLoginForm((prev) => ({ ...prev, email: registerForm.email }));
//     }
//   };

//   // =============================================
//   // FORM SUBMISSION HANDLERS
//   // =============================================

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const result = await login(loginForm.email, loginForm.password);
//     if (result.success) {
//       toast.success(`Welcome to NdizNote Musics hub, ${result.user.name}! 🎉`);
//       setTimeout(() => {
//         closeModals();
//         const dashboardPath = getDashboardPath(result.user);
//         navigate(dashboardPath);
//       }, 1500);
//     } else {
//       toast.error(result.error || "Login failed! Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     // Password validation
//     if (registerForm.password !== registerForm.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (registerForm.password.length < 6) {
//       toast.error("Password must be at least 6 characters long!");
//       return;
//     }

//     setIsSubmitting(true);
//     const result = await registerUser(
//       registerForm.name,
//       registerForm.email,
//       registerForm.password,
//       registerForm.confirmPassword
//     );

//     if (result.success) {
//       if (result.autoLoggedIn) {
//         // Auto-login successful
//         toast.success(
//           `Welcome to NdizNote Musics hub, ${result.user.name}! 🚀`
//         );
//         setTimeout(() => {
//           closeModals();
//           const dashboardPath = getDashboardPath(result.user);
//           navigate(dashboardPath);
//         }, 1500);
//       } else {
//         // Registration successful, need to login
//         toast.success(
//           "Account created successfully! Please login with your credentials. ✅"
//         );
//         setTimeout(() => {
//           setIsRegisterOpen(false);
//           setIsLoginOpen(true);
//           setLoginForm({ email: registerForm.email, password: "" });
//           setRegisterForm({
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//           });
//         }, 1000);
//       }
//     } else {
//       toast.error(result.error || "Registration failed! Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const result = await apiService.forgotPassword(forgotPasswordForm.email);
//       if (result.success) {
//         toast.success("Password reset instructions sent to your email! 📧");
//         setTimeout(() => {
//           setIsForgotPasswordOpen(false);
//           setIsLoginOpen(true);
//         }, 2000);
//       } else {
//         toast.error(
//           result.error || "Failed to send reset email. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to send reset email. Please try again."
//       );
//     }
//     setIsSubmitting(false);
//   };

//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const result = await apiService.resetPassword(
//         resetPasswordForm.token,
//         resetPasswordForm.password
//       );
//       if (result.success) {
//         toast.success("Password reset successfully! ✅");
//         setTimeout(() => {
//           setIsResetPasswordOpen(false);
//           setIsLoginOpen(true);
//         }, 2000);
//       } else {
//         toast.error(
//           result.error || "Failed to reset password. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to reset password. Please try again."
//       );
//     }
//     setIsSubmitting(false);
//   };

//   const handleContactSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const result = await apiService.contact(contactForm);
//       if (result.success) {
//         setIsContactOpen(false);
//         setIsSuccessModalOpen(true);
//         setContactForm({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setErrorMessage(
//           result.error || "Failed to send message. Please try again."
//         );
//         setIsContactOpen(false);
//         setIsFailModalOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.message || "Failed to send message. Please try again."
//       );
//       setIsContactOpen(false);
//       setIsFailModalOpen(true);
//     }
//     setIsSubmitting(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsMobileMenuOpen(false);
//     navigate("/");
//   };

//   const handleDashboardNavigation = () => {
//     if (user) {
//       const dashboardPath = getDashboardPath(user);
//       navigate(dashboardPath);
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <>
//       {/* Navigation Bar */}
//       <nav className="bg-gradient-to-t from-gray-300 to-white backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 overflow-visible">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="flex justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center">
//               <Link to="/" className="flex-shrink-0 flex items-center">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   className="flex items-center space-x-3"
//                 >
//                   <SvgIcons.Logo />
//                   <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     NdizNote
//                   </span>
//                 </motion.div>
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center lg:px-12 space-x-8">
//               {/* Main Navigation Links */}
//               {navigationConfig.main.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className="flex items-center space-x-2 transition-all duration-200 font-medium group"
//                 >
//                   <Button className="bg-gradient-to-t from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 transition-all duration-300">
//                     <span className="relative">
//                       {item.name}
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
//                     </span>
//                   </Button>
//                 </Link>
//               ))}

//               {/* Contact Button */}
//               <button
//                 onClick={openContact}
//                 className="flex items-center  rounded-sm space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 font-medium group"
//               >
//                 <span className="relative text-white px-4 py-2">
//                   Contact
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
//                 </span>
//               </button>

//               {/* Dashboard Button for Logged-in Users */}
//               {isAuthenticated && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleDashboardNavigation}
//                   className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
//                 >
//                   <Dashboard/>
//                 </motion.button>
//               )}
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {isAuthenticated ? (
//                 <div className="flex items-center space-x-4 pl-2 border-l border-gray-200">
//                   {/* User Profile Display */}
//                   <div className="flex items-center space-x-3 min-w-0 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50">
//                     <img
//                       src={
//                         user?.avatar ||
//                         `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
//                       }
//                       alt=""
//                       className="w-8 h-8 rounded-full border-2 border-blue-500 flex-shrink-0"
//                     />
//                     <div className="text-right min-w-0">
//                       <p className="text-sm font-medium text-indigo-900 truncate max-w-32">
//                         {user?.name?.slice(0, 4) || "User"}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                         {getUserDisplayStatus(user)}
//                       </p>
//                     </div>
//                   </div>
//                   {/* Logout Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleLogout}
//                     className="bg-gradient-to-tr from-gray-600 via-green-700 to-blue-800 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:via-gray-800 hover:to-green-900 transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2"
//                   >
//                     <Logout/>
//                   </motion.button>
//                 </div>
//               ) : (
//                 /* Login and Register Buttons */
//                 <div className="flex items-center space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={openLogin}
//                     className="border-2 border-blue-600 bg-transparent text-blue-600 px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
//                   >
//                     <span>LogIn</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={openRegister}
//                     className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
//                   >
//                     <span>Register</span>
//                   </motion.button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center">
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="bg-gradient-to-tr from-blue-500 to-purple-600 text-white p-2.5 rounded-xl shadow-lg"
//               >
//                 {isMobileMenuOpen ? <SvgIcons.Close /> : <SvgIcons.Menu />}
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-xl absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto"
//             >
//               <div className="px-4 py-6 space-y-4">
//                 {/* Mobile Navigation Links */}
//                 {navigationConfig.main.map((item) => (
//                   <Link
//                     to={item.path}
//                     key={item.name}
//                     onClick={() => {
//                       navigate(item.path);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium"
//                   >
//                     <Button className="w-full bg-gradient-to-r from-blue-200 to-violet-200">
//                       <span>{item.name}</span>
//                     </Button>
//                   </Link>
//                 ))}

//                 {/* Mobile Contact Button */}
//                 <button
//                   onClick={() => {
//                     openContact();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="w-full flex items-center bg-gradient-to-r from-blue-600 to-purple-600 space-x-3 px-4 py-3 text-left text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium"
//                 >
//                   <span>Contact</span>
//                 </button>

//                 {/* Mobile Dashboard Button */}
//                 {isAuthenticated && (
//                   <button
//                     onClick={() => {
//                       handleDashboardNavigation();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
//                   >
//                     <span>Dashboard</span>
//                   </button>
//                 )}

//                 {/* Mobile Auth Buttons */}
//                 {!isAuthenticated ? (
//                   <div className="pt-4 border-t border-gray-200 space-y-3">
//                     <button
//                       onClick={() => {
//                         openLogin();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center border-2 border-blue-600 bg-transparent text-blue-600 rounded-xl font-semibold"
//                     >
//                       <span>Sign In</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         openRegister();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
//                     >
//                       <span>Register</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="pt-4 border-t border-gray-200 space-y-3">
//                     {/* Mobile User Info */}
//                     <div className="flex items-center space-x-3 px-4 py-3 bg-white/50 rounded-xl border border-gray-200/50">
//                       <img
//                         src={
//                           user?.avatar ||
//                           `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
//                         }
//                         alt="User avatar"
//                         className="w-10 h-10 rounded-full border-2 border-blue-500"
//                       />
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm text-green-500 font-medium text-gray-900 truncate">
//                           {user?.name || "User"}
//                         </p>
//                         <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                           {getUserDisplayStatus(user)}
//                         </p>
//                       </div>
//                     </div>
//                     {/* Mobile Logout Button */}
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-green-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg"
//                     >
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* ============================================= */}
//       {/* MODAL COMPONENTS - All popup dialogs */}
//       {/* ============================================= */}

//       {/* Login Modal */}
//       <AnimatePresence>
//         {isLoginOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <SvgIcons.User />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Welcome Back
//                 </h2>
//                 <p className="text-gray-600">
//                   Sign in to your NdizNote Musics hub account
//                 </p>
//               </div>
//               <LoginForm
//                 form={loginForm}
//                 onChange={setLoginForm}
//                 onSubmit={handleLoginSubmit}
//                 isSubmitting={isSubmitting}
//                 onForgotPassword={openForgotPassword}
//                 onSwitchToRegister={switchToRegister}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Register Modal */}
//       <AnimatePresence>
//         {isRegisterOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <span className="text-white font-bold text-xl">+</span>
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Join NdizNote Musics hub
//                 </h2>
//                 <p className="text-gray-600">
//                   Create your account and get started
//                 </p>
//               </div>
//               <RegisterForm
//                 form={registerForm}
//                 onChange={setRegisterForm}
//                 onSubmit={handleRegisterSubmit}
//                 isSubmitting={isSubmitting}
//                 onSwitchToLogin={switchToLogin}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Forgot Password Modal */}
//       <AnimatePresence>
//         {isForgotPasswordOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <ForgotPasswordForm
//                 form={forgotPasswordForm}
//                 onChange={setForgotPasswordForm}
//                 onSubmit={handleForgotPasswordSubmit}
//                 isSubmitting={isSubmitting}
//                 onSwitchToLogin={() => {
//                   setIsForgotPasswordOpen(false);
//                   setIsLoginOpen(true);
//                 }}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Reset Password Modal */}
//       <AnimatePresence>
//         {isResetPasswordOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <ResetPasswordForm
//                 form={resetPasswordForm}
//                 onChange={setResetPasswordForm}
//                 onSubmit={handleResetPasswordSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Contact Modal */}
//       <AnimatePresence>
//         {isContactOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <SvgIcons.Message />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Contact Us
//                 </h2>
//                 <p className="text-gray-600">Get in touch with our team</p>
//               </div>
//               <ContactForm
//                 form={contactForm}
//                 onChange={setContactForm}
//                 onSubmit={handleContactSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {isSuccessModalOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <SuccessModal onClose={closeModals} />
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Fail Modal */}
//       <AnimatePresence>
//         {isFailModalOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <FailModal onClose={closeModals} errorMessage={errorMessage} />
//           </ModalOverlay>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };



















































































// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */

// // =============================================
// // IMPORT SECTION - All necessary dependencies
// // =============================================
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import axios from "axios";

// // Material UI Icons
// import {
//   Close,
//   Dashboard,
//   Logout,
//   Menu as MenuIcon,
//   Person,
//   Email,
//   Message,
//   Phone,
//   Lock,
//   VpnKey,
//   CheckCircle,
//   Error as ErrorIcon,
//   Home,
//   Info,
//   School,
//   Help,
//   Add,
//   Send,
// } from "@mui/icons-material";
// import Button from "@mui/material/Button";

// // =============================================
// // CONFIGURATION SECTION - Easy to modify settings
// // =============================================

// // API Configuration - Change this to your actual backend URL
// const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// // Navigation Menu Configuration - Easy to update menu items
// const navigationConfig = {
//   main: [
//     { name: "Home", path: "/", icon: <Home /> },
//     { name: "About", path: "/about", icon: <Info /> },
//     { name: "Services", path: "/services", icon: <Dashboard /> },
//     { name: "Classes", path: "/classes", icon: <School /> },
//     { name: "FAQ", path: "/faq", icon: <Help /> },
//   ],
//   authenticated: [{ name: "Dashboard", path: "/dashboard", icon: <Dashboard /> }],
// };

// // =============================================
// // ICONS COMPONENT - All Material UI icons in one place
// // =============================================
// const MaterialIcons = {
//   // App Logo with gradient (using a div with gradient background)
//   Logo: () => (
//     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//       <span className="text-white font-bold text-sm">N</span>
//     </div>
//   ),

//   // Menu icon for mobile navigation
//   Menu: () => <MenuIcon className="w-6 h-6" />,

//   // Close icon for modals
//   Close: () => <Close className="w-6 h-6" />,

//   // User profile icon
//   User: () => <Person className="w-5 h-5" />,

//   // Email icon for forms
//   Email: () => <Email className="w-5 h-5" />,

//   // Message icon for contact
//   Message: () => <Message className="w-5 h-5" />,

//   // Phone icon
//   Phone: () => <Phone className="w-5 h-5" />,

//   // Lock icon for security
//   Lock: () => <Lock className="w-5 h-5" />,

//   // Key icon for password reset
//   Key: () => <VpnKey className="w-5 h-5" />,

//   // Success checkmark icon
//   Success: () => <CheckCircle className="w-16 h-16" />,

//   // Error X icon
//   Error: () => <ErrorIcon className="w-16 h-16" />,
// };

// // =============================================
// // LOADING SPINNER COMPONENT
// // =============================================
// const LoadingSpinner = ({ size = "md", text = "" }) => {
//   const sizeClasses = {
//     sm: "w-5 h-5",
//     md: "w-8 h-8",
//     lg: "w-12 h-12",
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div
//         className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
//       />
//       {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
//     </div>
//   );
// };

// // =============================================
// // AUTHENTICATION CONTEXT - Global user state management
// // =============================================

// // Create context for authentication
// const AuthContext = createContext();

// // Custom hook to easily access auth functions and state
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // =============================================
// // API SERVICE FUNCTIONS - All backend communications
// // =============================================
// const apiService = {
//   /**
//    * Login user with email and password
//    */
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
//         email,
//         password,
//       });
      
//       // Debug: Log response structure
//       console.log("Login API Response:", response.data);
      
//       return response.data;
//     } catch (error) {
//       console.error("Login API Error:", error.response?.data || error.message);
//       const errorMessage =
//         error.response?.data?.message || 
//         error.response?.data?.error ||
//         error.message || 
//         "Login failed. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Register new user with all required details
//    */
//   register: async (name, email, password, confirmPassword) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Registration failed. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Request password reset email
//    */
//   forgotPassword: async (email) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/users/forgot-password`,
//         { email }
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to send reset email. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Reset password with token and new password
//    */
//   resetPassword: async (token, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/reset-password`, {
//         token,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to reset password. Please try again.";
//       throw new Error(errorMessage);
//     }
//   },

//   /**
//    * Submit contact form data
//    */
//   contact: async (formData) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/contacts/contact`, formData);
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         error.response?.data?.message ||
//           "Message sending failed. Please try again."
//       );
//     }
//   },
// };

// // =============================================
// // AUTH PROVIDER - Manages user authentication state
// // =============================================
// export const AuthProvider = ({ children }) => {
//   // State variables for user management
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   /**
//    * Login function - handles user authentication
//    */
//   const login = async (email, password) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.login(email, password);

//       // Debug: Log response for troubleshooting
//       console.log("Login response:", response);

//       // Handle successful login
//       if (response && (response.success || response.token)) {
//         // Try different possible response structures
//         const userData = response.data?.user || response.user || response;
//         const token = response.data?.token || response.token;
        
//         if (!userData) {
//           console.error("User data not found in response:", response);
//           return { 
//             success: false, 
//             error: "Server error: User information not found." 
//           };
//         }

//         // Validate user status with fallback to 'user'
//         const validStatuses = ["admin", "user", "manager"];
//         const userStatus = (userData.status && validStatuses.includes(
//           String(userData.status).toLowerCase()
//         ))
//           ? String(userData.status).toLowerCase()
//           : (userData.role && validStatuses.includes(String(userData.role).toLowerCase()))
//           ? String(userData.role).toLowerCase()
//           : "user";

//         // Create complete user profile with defaults
//         const userProfile = {
//           email: userData.email || email,
//           status: userStatus,
//           id: userData.id || userData._id || Date.now().toString(),
//           name: userData.name || userData.username || email.split('@')[0] || "User",
//           ...userData,
//         };

//         // Update state and localStorage
//         setUser(userProfile);
//         setIsAuthenticated(true);
//         localStorage.setItem("user", JSON.stringify(userProfile));
        
//         if (token) {
//           localStorage.setItem("token", token);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         }
        
//         localStorage.setItem("userEmail", userProfile.email);
//         localStorage.setItem("userRole", userProfile.status);

//         return { 
//           success: true, 
//           user: userProfile,
//           message: response.message || "Login successful" 
//         };
//       } else {
//         return { 
//           success: false, 
//           error: response?.message || response?.error || "Login failed" 
//         };
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Login failed. Please try again." 
//       };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Register function - creates new user account
//    */
//   const register = async (name, email, password, confirmPassword) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.register(
//         name,
//         email,
//         password,
//         confirmPassword
//       );

//       console.log("Register response:", response);

//       if (response) {
//         if (response.success || response.token) {
//           // Check if auto-login occurred
//           const userData = response.data?.user || response.user || response;
//           const token = response.data?.token || response.token;
          
//           if (userData && token) {
//             // Create user profile
//             const userProfile = {
//               email: userData.email || email,
//               status: userData.status || userData.role || "user",
//               id: userData.id || userData._id || Date.now().toString(),
//               name: userData.name || name,
//               ...userData,
//             };
            
//             setUser(userProfile);
//             setIsAuthenticated(true);
//             localStorage.setItem("user", JSON.stringify(userProfile));
//             localStorage.setItem("token", token);
            
//             if (token) {
//               axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             }

//             return { 
//               success: true, 
//               user: userProfile, 
//               autoLoggedIn: true,
//               message: response.message || "Registration successful" 
//             };
//           } else {
//             // Registration successful but no auto-login
//             return {
//               success: true,
//               autoLoggedIn: false,
//               message: response.message || "Registration successful. Please login.",
//             };
//           }
//         } else {
//           return {
//             success: false,
//             error: response?.message || response?.error || "Registration failed",
//           };
//         }
//       } else {
//         return { success: false, error: "No response from server" };
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Logout function - clears user data
//    */
//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     delete axios.defaults.headers.common["Authorization"];
//     toast.info("You have been logged out");
//   };

//   // Initialize authentication on app start
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const savedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       if (savedUser && token) {
//         try {
//           const userData = JSON.parse(savedUser);
          
//           // Validate token and user data if needed (could add an API call here)
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
//           setUser(userData);
//           setIsAuthenticated(true);
//         } catch (error) {
//           console.error("Error initializing auth:", error);
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("userRole");
//           delete axios.defaults.headers.common["Authorization"];
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   // Value provided to all components using this context
//   const value = {
//     user,
//     isAuthenticated,
//     isLoading,
//     login,
//     register,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // =============================================
// // PROTECTED ROUTE COMPONENT - Secures pages
// // =============================================
// export const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { isAuthenticated, user, isLoading } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if not authenticated or not admin
//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       navigate("/");
//     }
//     if (!isLoading && adminOnly && user?.status !== "admin") {
//       navigate("/dashboard/user");
//     }
//   }, [isAuthenticated, user, isLoading, navigate]);

//   // Show loading while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
//         <LoadingSpinner text="Checking authentication..." />
//       </div>
//     );
//   }

//   // Don't render if not authenticated or not authorized
//   if (!isAuthenticated) return null;
//   if (adminOnly && user?.status !== "admin") return null;

//   return children;
// };

// // =============================================
// // REUSABLE MODAL COMPONENTS
// // =============================================

// /**
//  * Modal Overlay - Background for all modals
//  */
// const ModalOverlay = ({ children, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto flex items-start justify-center z-50 p-4"
//     onClick={(e) => {
//       if (e.target === e.currentTarget) onClose();
//     }}
//   >
//     {children}
//   </motion.div>
// );

// /**
//  * Close Button for Modals
//  */
// const ModalCloseButton = ({ onClose }) => (
//   <button
//     onClick={onClose}
//     className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-pink-600 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
//   >
//     <Close className="size-4" />
//   </button>
// );

// /**
//  * Success Modal - Shows when actions complete successfully
//  */
// const SuccessModal = ({ onClose }) => (
//   <motion.div
//     initial={{ scale: 0.9, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.9, opacity: 0 }}
//     transition={{ type: "spring", damping: 25 }}
//     className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
//     onClick={(e) => e.stopPropagation()}
//   >
//     <ModalCloseButton onClose={onClose} />
//     <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//       <CheckCircle className="w-12 h-12 text-white" />
//     </div>
//     <h3 className="text-2xl font-bold text-gray-800 mb-4">
//       Message Sent Successfully!
//     </h3>
//     <p className="text-gray-600 mb-6">
//       Thank you for contacting us. We'll get back to you within 24 hours.
//     </p>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClose}
//       className="bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
//     >
//       Close
//     </motion.button>
//   </motion.div>
// );

// /**
//  * Fail Modal - Shows when actions fail
//  */
// const FailModal = ({ onClose, errorMessage }) => (
//   <motion.div
//     initial={{ scale: 0.9, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.9, opacity: 0 }}
//     transition={{ type: "spring", damping: 25 }}
//     className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
//     onClick={(e) => e.stopPropagation()}
//   >
//     <ModalCloseButton onClose={onClose} />
//     <div className="w-20 h-20 bg-gradient-to-tr from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//       <ErrorIcon className="w-12 h-12 text-white" />
//     </div>
//     <h3 className="text-2xl font-bold text-gray-800 mb-4">
//       Message Failed to Send
//     </h3>
//     <p className="text-gray-600 mb-4">
//       {errorMessage ||
//         "There was an error sending your message. Please try again."}
//     </p>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClose}
//       className="bg-gradient-to-tr from-red-500 to-pink-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-200"
//     >
//       Try Again
//     </motion.button>
//   </motion.div>
// );

// // =============================================
// // FORM COMPONENTS - Reusable form templates
// // =============================================

// /**
//  * Login Form Component
//  */
// const LoginForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onForgotPassword,
//   onSwitchToRegister,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your password"
//         required
//       />
//     </div>

//     <div className="text-right">
//       <button
//         type="button"
//         onClick={onForgotPassword}
//         className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//       >
//         Forgot Password?
//       </button>
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white py-4 px-4 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         "Sign In"
//       )}
//     </motion.button>

//     <div className="mt-8 text-center">
//       <p className="text-gray-600">
//         Don't have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToRegister}
//           className="bg-gradient-to-br from-blue-800 to-indigo-800 px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//         >
//           Create one here
//         </button>
//       </p>
//     </div>
//   </form>
// );

// /**
//  * Register Form Component
//  */
// const RegisterForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onSwitchToLogin,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Full Name
//       </label>
//       <input
//         type="text"
//         name="name"
//         value={form.name}
//         onChange={(e) => onChange({ ...form, name: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your full name"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your password"
//         required
//         minLength={6}
//       />
//       <p className="text-xs text-gray-500 mt-2">
//         Must be at least 6 characters
//       </p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Confirm Password
//       </label>
//       <input
//         type="password"
//         name="confirmPassword"
//         value={form.confirmPassword}
//         onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Confirm your password"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-green-500 via-emerald-500 to-teal-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         "Create Account"
//       )}
//     </motion.button>

//     <div className="mt-8 text-center">
//       <p className="text-gray-600">
//         Already have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToLogin}
//           className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//         >
//           Sign in here
//         </button>
//       </p>
//     </div>
//   </form>
// );

// /**
//  * Forgot Password Form Component
//  */
// const ForgotPasswordForm = ({
//   form,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onSwitchToLogin,
// }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="text-center mb-6">
//       <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//         <VpnKey className="w-8 h-8 text-white" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
//       <p className="text-gray-600">
//         Enter your email to receive reset instructions
//       </p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Email Address
//       </label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={(e) => onChange({ ...form, email: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter your email"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isSubmitting ? "Sending Instructions..." : "Send Reset Link"}
//     </motion.button>

//     <div className="text-center">
//       <button
//         type="button"
//         onClick={onSwitchToLogin}
//         className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
//       >
//         Back to Sign In
//       </button>
//     </div>
//   </form>
// );

// /**
//  * Reset Password Form Component
//  */
// const ResetPasswordForm = ({ form, onChange, onSubmit, isSubmitting }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="text-center mb-6">
//       <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//         <Lock className="w-8 h-8 text-white" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">
//         Set New Password
//       </h3>
//       <p className="text-gray-600">Enter your new password below</p>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         New Password
//       </label>
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={(e) => onChange({ ...form, password: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter new password"
//         required
//         minLength={6}
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Confirm New Password
//       </label>
//       <input
//         type="password"
//         name="confirmPassword"
//         value={form.confirmPassword}
//         onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Confirm new password"
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isSubmitting ? "Resetting Password..." : "Reset Password"}
//     </motion.button>
//   </form>
// );

// /**
//  * Contact Form Component
//  */
// const ContactForm = ({ form, onChange, onSubmit, isSubmitting }) => (
//   <form onSubmit={onSubmit} className="space-y-6 text-black">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-3">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={(e) => onChange({ ...form, name: e.target.value })}
//           className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//           placeholder="Enter your full name"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-3">
//           Email Address
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={(e) => onChange({ ...form, email: e.target.value })}
//           className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//           placeholder="Enter your email"
//           required
//         />
//       </div>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Subject
//       </label>
//       <input
//         type="text"
//         name="subject"
//         value={form.subject}
//         onChange={(e) => onChange({ ...form, subject: e.target.value })}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
//         placeholder="Enter the subject"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">
//         Message
//       </label>
//       <textarea
//         name="message"
//         value={form.message}
//         onChange={(e) => onChange({ ...form, message: e.target.value })}
//         rows={6}
//         className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm resize-none"
//         placeholder="Enter your message..."
//         required
//       />
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       type="submit"
//       disabled={isSubmitting}
//       className="w-full bg-gradient-to-tr from-orange-500 via-red-500 to-pink-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {isSubmitting ? (
//         <LoadingSpinner size="sm" />
//       ) : (
//         <>
//           <Send className="w-5 h-5 mr-2" />
//           Send Message
//         </>
//       )}
//     </motion.button>

//     <div className="text-center text-sm text-gray-500">
//       <p>We'll get back to you within 24 hours</p>
//     </div>
//   </form>
// );

// // =============================================
// // HELPER FUNCTIONS - Utility functions
// // =============================================

// /**
//  * Get the correct dashboard path based on user role
//  */
// const getDashboardPath = (user) => {
//   const userStatus = user?.status || user?.role;
//   switch (userStatus) {
//     case "admin":
//       return "/dashboard";
//     case "manager":
//       return "/dashboard/manager";
//     case "user":
//       return "/dashboard/user";
//     default:
//       return "/dashboard";
//   }
// };

// /**
//  * Get display-friendly user status
//  */
// const getUserDisplayStatus = (user) => {
//   return user?.status || user?.role || "user";
// };

// // =============================================
// // MAIN NAVBAR COMPONENT - Complete navigation system
// // =============================================
// export const Navbar = () => {
//   // State for managing modal visibility
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
//   const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
//   const [isContactOpen, setIsContactOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [isFailModalOpen, setIsFailModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Form state management
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [registerForm, setRegisterForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
//   const [resetPasswordForm, setResetPasswordForm] = useState({
//     password: "",
//     confirmPassword: "",
//     token: "",
//   });
//   const [contactForm, setContactForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   // Authentication hooks
//   const { isAuthenticated, user, login, register: registerUser, logout } = useAuth();
//   const navigate = useNavigate();

//   // =============================================
//   // MODAL MANAGEMENT FUNCTIONS
//   // =============================================

//   const openLogin = () => {
//     closeAllModals();
//     setIsLoginOpen(true);
//   };

//   const openRegister = () => {
//     closeAllModals();
//     setIsRegisterOpen(true);
//   };

//   const openForgotPassword = () => {
//     closeAllModals();
//     setIsForgotPasswordOpen(true);
//   };

//   const openContact = () => {
//     closeAllModals();
//     setIsContactOpen(true);
//   };

//   const closeAllModals = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(false);
//     setIsForgotPasswordOpen(false);
//     setIsResetPasswordOpen(false);
//     setIsContactOpen(false);
//     setIsSuccessModalOpen(false);
//     setIsFailModalOpen(false);
//     setErrorMessage("");
//   };

//   const closeModals = () => {
//     closeAllModals();
//     // Reset all forms
//     setLoginForm({ email: "", password: "" });
//     setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
//     setForgotPasswordForm({ email: "" });
//     setResetPasswordForm({ password: "", confirmPassword: "", token: "" });
//     setContactForm({ name: "", email: "", subject: "", message: "" });
//   };

//   // Switch between login and register modals
//   const switchToRegister = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(true);
//     if (loginForm.email) {
//       setRegisterForm((prev) => ({ ...prev, email: loginForm.email }));
//     }
//   };

//   const switchToLogin = () => {
//     setIsRegisterOpen(false);
//     setIsLoginOpen(true);
//     if (registerForm.email) {
//       setLoginForm((prev) => ({ ...prev, email: registerForm.email }));
//     }
//   };

//   // =============================================
//   // FORM SUBMISSION HANDLERS
//   // =============================================

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const result = await login(loginForm.email, loginForm.password);
//     if (result.success) {
//       toast.success(`Welcome to NdizNote Musics hub, ${result.user.name}! 🎉`);
//       setTimeout(() => {
//         closeModals();
//         const dashboardPath = getDashboardPath(result.user);
//         navigate(dashboardPath);
//       }, 1500);
//     } else {
//       toast.error(result.error || "Login failed! Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     // Password validation
//     if (registerForm.password !== registerForm.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (registerForm.password.length < 6) {
//       toast.error("Password must be at least 6 characters long!");
//       return;
//     }

//     setIsSubmitting(true);
//     const result = await registerUser(
//       registerForm.name,
//       registerForm.email,
//       registerForm.password,
//       registerForm.confirmPassword
//     );

//     if (result.success) {
//       if (result.autoLoggedIn) {
//         // Auto-login successful
//         toast.success(
//           `Welcome to NdizNote Musics hub, ${result.user.name}! 🚀`
//         );
//         setTimeout(() => {
//           closeModals();
//           const dashboardPath = getDashboardPath(result.user);
//           navigate(dashboardPath);
//         }, 1500);
//       } else {
//         // Registration successful, need to login
//         toast.success(
//           "Account created successfully! Please login with your credentials. ✅"
//         );
//         setTimeout(() => {
//           setIsRegisterOpen(false);
//           setIsLoginOpen(true);
//           setLoginForm({ email: registerForm.email, password: "" });
//           setRegisterForm({
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//           });
//         }, 1000);
//       }
//     } else {
//       toast.error(result.error || "Registration failed! Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const result = await apiService.forgotPassword(forgotPasswordForm.email);
//       if (result.success) {
//         toast.success("Password reset instructions sent to your email! 📧");
//         setTimeout(() => {
//           setIsForgotPasswordOpen(false);
//           setIsLoginOpen(true);
//         }, 2000);
//       } else {
//         toast.error(
//           result.error || "Failed to send reset email. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to send reset email. Please try again."
//       );
//     }
//     setIsSubmitting(false);
//   };

//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const result = await apiService.resetPassword(
//         resetPasswordForm.token,
//         resetPasswordForm.password
//       );
//       if (result.success) {
//         toast.success("Password reset successfully! ✅");
//         setTimeout(() => {
//           setIsResetPasswordOpen(false);
//           setIsLoginOpen(true);
//         }, 2000);
//       } else {
//         toast.error(
//           result.error || "Failed to reset password. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to reset password. Please try again."
//       );
//     }
//     setIsSubmitting(false);
//   };

//   const handleContactSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const result = await apiService.contact(contactForm);
//       if (result.success) {
//         setIsContactOpen(false);
//         setIsSuccessModalOpen(true);
//         setContactForm({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setErrorMessage(
//           result.error || "Failed to send message. Please try again."
//         );
//         setIsContactOpen(false);
//         setIsFailModalOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.message || "Failed to send message. Please try again."
//       );
//       setIsContactOpen(false);
//       setIsFailModalOpen(true);
//     }
//     setIsSubmitting(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsMobileMenuOpen(false);
//     navigate("/");
//   };

//   const handleDashboardNavigation = () => {
//     if (user) {
//       const dashboardPath = getDashboardPath(user);
//       navigate(dashboardPath);
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <>
//       {/* Navigation Bar */}
//       <nav className="bg-gradient-to-t from-gray-300 to-white backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 overflow-visible">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="flex justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center">
//               <Link to="/" className="flex-shrink-0 flex items-center">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   className="flex items-center space-x-3"
//                 >
//                   <MaterialIcons.Logo />
//                   <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     NdizNote
//                   </span>
//                 </motion.div>
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center lg:px-12 space-x-8">
//               {/* Main Navigation Links */}
//               {navigationConfig.main.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className="flex items-center space-x-2 transition-all duration-200 font-medium group"
//                 >
//                   <Button className="bg-gradient-to-t from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 transition-all duration-300">
//                     <span className="relative">
//                       {item.name}
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
//                     </span>
//                   </Button>
//                 </Link>
//               ))}

//               {/* Contact Button */}
//               <button
//                 onClick={openContact}
//                 className="flex items-center rounded-sm space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 font-medium group"
//               >
//                 <span className="relative text-white px-4 py-2">
//                   Contact
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
//                 </span>
//               </button>

//               {/* Dashboard Button for Logged-in Users */}
//               {isAuthenticated && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleDashboardNavigation}
//                   className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
//                 >
//                   <Dashboard className="w-5 h-5" />
//                 </motion.button>
//               )}
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {isAuthenticated ? (
//                 <div className="flex items-center space-x-4 pl-2 border-l border-gray-200">
//                   {/* User Profile Display */}
//                   <div className="flex items-center space-x-3 min-w-0 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50">
//                     <img
//                       src={
//                         user?.avatar ||
//                         `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
//                       }
//                       alt=""
//                       className="w-8 h-8 rounded-full border-2 border-blue-500 flex-shrink-0"
//                     />
//                     <div className="text-right min-w-0">
//                       <p className="text-sm font-medium text-indigo-900 truncate max-w-32">
//                         {user?.name?.slice(0, 4) || "User"}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                         {getUserDisplayStatus(user)}
//                       </p>
//                     </div>
//                   </div>
//                   {/* Logout Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleLogout}
//                     className="bg-gradient-to-tr from-gray-600 via-green-700 to-blue-800 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:via-gray-800 hover:to-green-900 transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2"
//                   >
//                     <Logout className="w-5 h-5" />
//                   </motion.button>
//                 </div>
//               ) : (
//                 /* Login and Register Buttons */
//                 <div className="flex items-center space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={openLogin}
//                     className="border-2 border-blue-600 bg-transparent text-blue-600 px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
//                   >
//                     <span>LogIn</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={openRegister}
//                     className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
//                   >
//                     <span>Register</span>
//                   </motion.button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center">
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="bg-gradient-to-tr from-blue-500 to-purple-600 text-white p-2.5 rounded-xl shadow-lg"
//               >
//                 {isMobileMenuOpen ? <MaterialIcons.Close /> : <MaterialIcons.Menu />}
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-xl absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto"
//             >
//               <div className="px-4 py-6 space-y-4">
//                 {/* Mobile Navigation Links */}
//                 {navigationConfig.main.map((item) => (
//                   <Link
//                     to={item.path}
//                     key={item.name}
//                     onClick={() => {
//                       navigate(item.path);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium"
//                   >
//                     {item.icon && <span className="text-blue-500">{item.icon}</span>}
//                     <Button className="w-full bg-gradient-to-r from-blue-200 to-violet-200 justify-start">
//                       <span>{item.name}</span>
//                     </Button>
//                   </Link>
//                 ))}

//                 {/* Mobile Contact Button */}
//                 <button
//                   onClick={() => {
//                     openContact();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="w-full flex items-center bg-gradient-to-r from-blue-600 to-purple-600 space-x-3 px-4 py-3 text-left text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium"
//                 >
//                   <Message className="w-5 h-5" />
//                   <span>Contact</span>
//                 </button>

//                 {/* Mobile Dashboard Button */}
//                 {isAuthenticated && (
//                   <button
//                     onClick={() => {
//                       handleDashboardNavigation();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
//                   >
//                     <Dashboard className="w-5 h-5" />
//                     <span>Dashboard</span>
//                   </button>
//                 )}

//                 {/* Mobile Auth Buttons */}
//                 {!isAuthenticated ? (
//                   <div className="pt-4 border-t border-gray-200 space-y-3">
//                     <button
//                       onClick={() => {
//                         openLogin();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center border-2 border-blue-600 bg-transparent text-blue-600 rounded-xl font-semibold"
//                     >
//                       <Person className="w-5 h-5" />
//                       <span>Sign In</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         openRegister();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
//                     >
//                       <Add className="w-5 h-5" />
//                       <span>Register</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="pt-4 border-t border-gray-200 space-y-3">
//                     {/* Mobile User Info */}
//                     <div className="flex items-center space-x-3 px-4 py-3 bg-white/50 rounded-xl border border-gray-200/50">
//                       <img
//                         src={
//                           user?.avatar ||
//                           `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
//                         }
//                         alt="User avatar"
//                         className="w-10 h-10 rounded-full border-2 border-blue-500"
//                       />
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm text-green-500 font-medium text-gray-900 truncate">
//                           {user?.name || "User"}
//                         </p>
//                         <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                           {getUserDisplayStatus(user)}
//                         </p>
//                       </div>
//                     </div>
//                     {/* Mobile Logout Button */}
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-green-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg"
//                     >
//                       <Logout className="w-5 h-5" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* ============================================= */}
//       {/* MODAL COMPONENTS - All popup dialogs */}
//       {/* ============================================= */}

//       {/* Login Modal */}
//       <AnimatePresence>
//         {isLoginOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Person className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Welcome Back
//                 </h2>
//                 <p className="text-gray-600">
//                   Sign in to your NdizNote Musics hub account
//                 </p>
//               </div>
//               <LoginForm
//                 form={loginForm}
//                 onChange={setLoginForm}
//                 onSubmit={handleLoginSubmit}
//                 isSubmitting={isSubmitting}
//                 onForgotPassword={openForgotPassword}
//                 onSwitchToRegister={switchToRegister}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Register Modal */}
//       <AnimatePresence>
//         {isRegisterOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Add className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Join NdizNote Musics hub
//                 </h2>
//                 <p className="text-gray-600">
//                   Create your account and get started
//                 </p>
//               </div>
//               <RegisterForm
//                 form={registerForm}
//                 onChange={setRegisterForm}
//                 onSubmit={handleRegisterSubmit}
//                 isSubmitting={isSubmitting}
//                 onSwitchToLogin={switchToLogin}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Forgot Password Modal */}
//       <AnimatePresence>
//         {isForgotPasswordOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <ForgotPasswordForm
//                 form={forgotPasswordForm}
//                 onChange={setForgotPasswordForm}
//                 onSubmit={handleForgotPasswordSubmit}
//                 isSubmitting={isSubmitting}
//                 onSwitchToLogin={() => {
//                   setIsForgotPasswordOpen(false);
//                   setIsLoginOpen(true);
//                 }}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Reset Password Modal */}
//       <AnimatePresence>
//         {isResetPasswordOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <ResetPasswordForm
//                 form={resetPasswordForm}
//                 onChange={setResetPasswordForm}
//                 onSubmit={handleResetPasswordSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Contact Modal */}
//       <AnimatePresence>
//         {isContactOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ModalCloseButton onClose={closeModals} />
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Message className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Contact Us
//                 </h2>
//                 <p className="text-gray-600">Get in touch with our team</p>
//               </div>
//               <ContactForm
//                 form={contactForm}
//                 onChange={setContactForm}
//                 onSubmit={handleContactSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </motion.div>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {isSuccessModalOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <SuccessModal onClose={closeModals} />
//           </ModalOverlay>
//         )}
//       </AnimatePresence>

//       {/* Fail Modal */}
//       <AnimatePresence>
//         {isFailModalOpen && (
//           <ModalOverlay onClose={closeModals}>
//             <FailModal onClose={closeModals} errorMessage={errorMessage} />
//           </ModalOverlay>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };




















































/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

// =============================================
// IMPORT SECTION - All necessary dependencies
// =============================================
import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

// Material UI Icons
import {
  Close,
  Dashboard,
  Logout,
  Menu as MenuIcon,
  Person,
  Email,
  Message,
  Phone,
  Lock,
  VpnKey,
  CheckCircle,
  Error as ErrorIcon,
  Home,
  Info,
  School,
  Help,
  Add,
  Send,
} from "@mui/icons-material";
import Button from "@mui/material/Button";

// =============================================
// CONFIGURATION SECTION - Easy to modify settings
// =============================================

// API Configuration - Change this to your actual backend URL
const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// Navigation Menu Configuration - Easy to update menu items
const navigationConfig = {
  main: [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "About", path: "/about", icon: <Info /> },
    { name: "Services", path: "/services", icon: <Dashboard /> },
    { name: "Classes", path: "/classes", icon: <School /> },
    { name: "FAQ", path: "/faq", icon: <Help /> },
  ],
  authenticated: [{ name: "Dashboard", path: "/dashboard", icon: <Dashboard /> }],
};

// =============================================
// ICONS COMPONENT - All Material UI icons in one place
// =============================================
const MaterialIcons = {
  // App Logo with gradient (using a div with gradient background)
  Logo: () => (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">N</span>
    </div>
  ),

  // Menu icon for mobile navigation
  Menu: () => <MenuIcon className="w-6 h-6" />,

  // Close icon for modals
  Close: () => <Close className="w-6 h-6" />,

  // User profile icon
  User: () => <Person className="w-5 h-5" />,

  // Email icon for forms
  Email: () => <Email className="w-5 h-5" />,

  // Message icon for contact
  Message: () => <Message className="w-5 h-5" />,

  // Phone icon
  Phone: () => <Phone className="w-5 h-5" />,

  // Lock icon for security
  Lock: () => <Lock className="w-5 h-5" />,

  // Key icon for password reset
  Key: () => <VpnKey className="w-5 h-5" />,

  // Success checkmark icon
  Success: () => <CheckCircle className="w-16 h-16" />,

  // Error X icon
  Error: () => <ErrorIcon className="w-16 h-16" />,
};

// =============================================
// LOADING SPINNER COMPONENT
// =============================================
const LoadingSpinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

// =============================================
// AUTHENTICATION CONTEXT - Global user state management
// =============================================

// Create context for authentication
const AuthContext = createContext();

// Custom hook to easily access auth functions and state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// =============================================
// API SERVICE FUNCTIONS - All backend communications
// =============================================
const apiService = {
  /**
   * Login user with email and password
   */
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      
      // Debug: Log response structure
      // console.log("Login API Response:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message || 
        "Login failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  /**
   * Register new user with all required details
   */
  register: async (name, email, password, confirmPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/forgot-password`,
        { email }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to send reset email. Please try again.";
      throw new Error(errorMessage);
    }
  },

  /**
   * Reset password with token and new password
   */
  resetPassword: async (token, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/reset-password`, {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to reset password. Please try again.";
      throw new Error(errorMessage);
    }
  },

  /**
   * Submit contact form data
   */
  contact: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contacts/contact`, formData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Message sending failed. Please try again."
      );
    }
  },
};

// =============================================
// AUTH PROVIDER - Manages user authentication state
// =============================================
export const AuthProvider = ({ children }) => {
  // State variables for user management
  const [user, setUser] = useState(() => {
    try {
      // Check cookies first (for compatibility with App.jsx)
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const parsed = JSON.parse(userCookie);
        // console.log("Loaded user from cookie:", parsed);
        return parsed;
      }
      // Fallback to localStorage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // console.log("Loaded user from localStorage:", parsed);
        // Sync to cookies
        Cookies.set("user", savedUser, { expires: 7 });
        return parsed;
      }
      return null;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Login function - handles user authentication
   */
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await apiService.login(email, password);

      // Debug: Log response for troubleshooting
      // console.log("Login response:", response);

      // Handle successful login
      if (response && (response.success || response.token)) {
        // Try different possible response structures
        const userData = response.data?.user || response.user || response;
        const token = response.data?.token || response.token;
        
        if (!userData) {
          console.error("User data not found in response:", response);
          return { 
            success: false, 
            error: "Server error: User information not found." 
          };
        }

        // Validate user status with fallback to 'user'
        const validStatuses = ["admin", "user", "manager"];
        const userStatus = (userData.status && validStatuses.includes(
          String(userData.status).toLowerCase()
        ))
          ? String(userData.status).toLowerCase()
          : (userData.role && validStatuses.includes(String(userData.role).toLowerCase()))
          ? String(userData.role).toLowerCase()
          : "user";

        // Create complete user profile with defaults
        const userProfile = {
          email: userData.email || email,
          status: userStatus,
          id: userData.id || userData._id || Date.now().toString(),
          name: userData.name || userData.username || email.split('@')[0] || "User",
          token: token,
          ...userData,
        };

        // Update state
        setUser(userProfile);
        setIsAuthenticated(true);
        
        // Store in localStorage (for AuthProvider)
        localStorage.setItem("user", JSON.stringify(userProfile));
        
        // ALSO store in cookies (for App.jsx)
        Cookies.set("user", JSON.stringify(userProfile), { expires: 7 });
        
        if (token) {
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        
        localStorage.setItem("userEmail", userProfile.email);
        localStorage.setItem("userRole", userProfile.status);

        return { 
          success: true, 
          user: userProfile,
          message: response.message || "Login successful" 
        };
      } else {
        return { 
          success: false, 
          error: response?.message || response?.error || "Login failed" 
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error.message || "Login failed. Please try again." 
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function - creates new user account
   */
  const register = async (name, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      const response = await apiService.register(
        name,
        email,
        password,
        confirmPassword
      );

      console.log("Register response:", response);

      if (response) {
        if (response.success || response.token) {
          // Check if auto-login occurred
          const userData = response.data?.user || response.user || response;
          const token = response.data?.token || response.token;
          
          if (userData && token) {
            // Create user profile
            const userProfile = {
              email: userData.email || email,
              status: userData.status || userData.role || "user",
              id: userData.id || userData._id || Date.now().toString(),
              name: userData.name || name,
              token: token,
              ...userData,
            };
            
            setUser(userProfile);
            setIsAuthenticated(true);
            
            // Store in localStorage (for AuthProvider)
            localStorage.setItem("user", JSON.stringify(userProfile));
            
            // ALSO store in cookies (for App.jsx)
            Cookies.set("user", JSON.stringify(userProfile), { expires: 7 });
            
            if (token) {
              localStorage.setItem("token", token);
              axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }

            return { 
              success: true, 
              user: userProfile, 
              autoLoggedIn: true,
              message: response.message || "Registration successful" 
            };
          } else {
            // Registration successful but no auto-login
            return {
              success: true,
              autoLoggedIn: false,
              message: response.message || "Registration successful. Please login.",
            };
          }
        } else {
          return {
            success: false,
            error: response?.message || response?.error || "Registration failed",
          };
        }
      } else {
        return { success: false, error: "No response from server" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function - clears user data
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    
    // ALSO clear cookies
    Cookies.remove("user");
    
    delete axios.defaults.headers.common["Authorization"];
    toast.info("You have been logged out");
  };

  // Initialize authentication on app start
  useEffect(() => {
    const initializeAuth = async () => {
      // Check cookies first
      const userCookie = Cookies.get("user");
      const token = localStorage.getItem("token");

      if (userCookie && token) {
        try {
          const userData = JSON.parse(userCookie);
          
          // Validate token and user data if needed
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          setUser(userData);
          setIsAuthenticated(true);
          
          // Sync to localStorage
          localStorage.setItem("user", userCookie);
        } catch (error) {
          console.error("Error initializing auth:", error);
          // Clear all storage
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRole");
          Cookies.remove("user");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Value provided to all components using this context
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    setUser: (newUser) => {
      // Update state
      setUser(newUser);
      setIsAuthenticated(!!newUser);
      
      if (newUser) {
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(newUser));
        // ALSO update cookies
        Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
      } else {
        // Clear storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        Cookies.remove("user");
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =============================================
// PROTECTED ROUTE COMPONENT - Secures pages
// =============================================
export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
    if (!isLoading && adminOnly && user?.status !== "admin") {
      navigate("/dashboard/user");
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
        <LoadingSpinner text="Checking authentication..." />
      </div>
    );
  }

  // Don't render if not authenticated or not authorized
  if (!isAuthenticated) return null;
  if (adminOnly && user?.status !== "admin") return null;

  return children;
};

// =============================================
// REUSABLE MODAL COMPONENTS
// =============================================

/**
 * Modal Overlay - Background for all modals
 */
const ModalOverlay = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto flex items-start justify-center z-50 p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    {children}
  </motion.div>
);

/**
 * Close Button for Modals
 */
const ModalCloseButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-pink-600 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
  >
    <Close className="size-4" />
  </button>
);

/**
 * Success Modal - Shows when actions complete successfully
 */
const SuccessModal = ({ onClose }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <ModalCloseButton onClose={onClose} />
    <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <CheckCircle className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Message Sent Successfully!
    </h3>
    <p className="text-gray-600 mb-6">
      Thank you for contacting us. We'll get back to you within 24 hours.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      className="bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
    >
      Close
    </motion.button>
  </motion.div>
);

/**
 * Fail Modal - Shows when actions fail
 */
const FailModal = ({ onClose, errorMessage }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <ModalCloseButton onClose={onClose} />
    <div className="w-20 h-20 bg-gradient-to-tr from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <ErrorIcon className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Message Failed to Send
    </h3>
    <p className="text-gray-600 mb-4">
      {errorMessage ||
        "There was an error sending your message. Please try again."}
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      className="bg-gradient-to-tr from-red-500 to-pink-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-200"
    >
      Try Again
    </motion.button>
  </motion.div>
);

// =============================================
// FORM COMPONENTS - Reusable form templates
// =============================================

/**
 * Login Form Component
 */
const LoginForm = ({
  form,
  onChange,
  onSubmit,
  isSubmitting,
  onForgotPassword,
  onSwitchToRegister,
}) => (
  <form onSubmit={onSubmit} className="space-y-6 text-black">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your email"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={(e) => onChange({ ...form, password: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your password"
        required
      />
    </div>

    <div className="text-right">
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
      >
        Forgot Password?
      </button>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white py-4 px-4 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isSubmitting ? (
        <LoadingSpinner size="sm" />
      ) : (
        "Sign In"
      )}
    </motion.button>

    <div className="mt-8 text-center">
      <p className="text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="bg-gradient-to-br from-blue-800 to-indigo-800 px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
        >
          Create one here
        </button>
      </p>
    </div>
  </form>
);

/**
 * Register Form Component
 */
const RegisterForm = ({
  form,
  onChange,
  onSubmit,
  isSubmitting,
  onSwitchToLogin,
}) => (
  <form onSubmit={onSubmit} className="space-y-6 text-black">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Full Name
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={(e) => onChange({ ...form, name: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your full name"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your email"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={(e) => onChange({ ...form, password: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your password"
        required
        minLength={6}
      />
      <p className="text-xs text-gray-500 mt-2">
        Must be at least 6 characters
      </p>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Confirm your password"
        required
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-tr from-green-500 via-emerald-500 to-teal-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isSubmitting ? (
        <LoadingSpinner size="sm" />
      ) : (
        "Create Account"
      )}
    </motion.button>

    <div className="mt-8 text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
        >
          Sign in here
        </button>
      </p>
    </div>
  </form>
);

/**
 * Forgot Password Form Component
 */
const ForgotPasswordForm = ({
  form,
  onChange,
  onSubmit,
  isSubmitting,
  onSwitchToLogin,
}) => (
  <form onSubmit={onSubmit} className="space-y-6 text-black">
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <VpnKey className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
      <p className="text-gray-600">
        Enter your email to receive reset instructions
      </p>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter your email"
        required
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Sending Instructions..." : "Send Reset Link"}
    </motion.button>

    <div className="text-center">
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="text-sm bg-gradient-to-br from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
      >
        Back to Sign In
      </button>
    </div>
  </form>
);

/**
 * Reset Password Form Component
 */
const ResetPasswordForm = ({ form, onChange, onSubmit, isSubmitting }) => (
  <form onSubmit={onSubmit} className="space-y-6 text-black">
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Set New Password
      </h3>
      <p className="text-gray-600">Enter your new password below</p>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        New Password
      </label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={(e) => onChange({ ...form, password: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter new password"
        required
        minLength={6}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Confirm New Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Confirm new password"
        required
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white py-4 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Resetting Password..." : "Reset Password"}
    </motion.button>
  </form>
);

/**
 * Contact Form Component
 */
const ContactForm = ({ form, onChange, onSubmit, isSubmitting }) => (
  <form onSubmit={onSubmit} className="space-y-6 text-black">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
          placeholder="Enter your email"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Subject
      </label>
      <input
        type="text"
        name="subject"
        value={form.subject}
        onChange={(e) => onChange({ ...form, subject: e.target.value })}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
        placeholder="Enter the subject"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Message
      </label>
      <textarea
        name="message"
        value={form.message}
        onChange={(e) => onChange({ ...form, message: e.target.value })}
        rows={6}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm resize-none"
        placeholder="Enter your message..."
        required
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-tr from-orange-500 via-red-500 to-pink-600 text-white py-4 px-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isSubmitting ? (
        <LoadingSpinner size="sm" />
      ) : (
        <>
          <Send className="w-5 h-5 mr-2" />
          Send Message
        </>
      )}
    </motion.button>

    <div className="text-center text-sm text-gray-500">
      <p>We'll get back to you within 24 hours</p>
    </div>
  </form>
);

// =============================================
// HELPER FUNCTIONS - Utility functions
// =============================================

/**
 * Get the correct dashboard path based on user role
 */
const getDashboardPath = (user) => {
  const userStatus = user?.status || user?.role;
  switch (userStatus) {
    case "admin":
      return "/dashboard";
    case "manager":
      return "/dashboard/manager";
    case "user":
      return "/dashboard/user";
    default:
      return "/dashboard";
  }
};

/**
 * Get display-friendly user status
 */
const getUserDisplayStatus = (user) => {
  return user?.status || user?.role || "user";
};

// =============================================
// MAIN NAVBAR COMPONENT - Complete navigation system
// =============================================
export const Navbar = () => {
  // State for managing modal visibility
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form state management
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Authentication hooks
  const { isAuthenticated, user, login, register: registerUser, logout } = useAuth();
  const navigate = useNavigate();

  // =============================================
  // MODAL MANAGEMENT FUNCTIONS
  // =============================================

  const openLogin = () => {
    closeAllModals();
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    closeAllModals();
    setIsRegisterOpen(true);
  };

  const openForgotPassword = () => {
    closeAllModals();
    setIsForgotPasswordOpen(true);
  };

  const openContact = () => {
    closeAllModals();
    setIsContactOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
    setIsResetPasswordOpen(false);
    setIsContactOpen(false);
    setIsSuccessModalOpen(false);
    setIsFailModalOpen(false);
    setErrorMessage("");
  };

  const closeModals = () => {
    closeAllModals();
    // Reset all forms
    setLoginForm({ email: "", password: "" });
    setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
    setForgotPasswordForm({ email: "" });
    setResetPasswordForm({ password: "", confirmPassword: "", token: "" });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  // Switch between login and register modals
  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    if (loginForm.email) {
      setRegisterForm((prev) => ({ ...prev, email: loginForm.email }));
    }
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
    if (registerForm.email) {
      setLoginForm((prev) => ({ ...prev, email: registerForm.email }));
    }
  };

  // =============================================
  // FORM SUBMISSION HANDLERS
  // =============================================

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(loginForm.email, loginForm.password);
    if (result.success) {
      toast.success(`Welcome to NdizNote Musics hub, ${result.user.name}! 🎉`);
      setTimeout(() => {
        closeModals();
        const dashboardPath = getDashboardPath(result.user);
        navigate(dashboardPath);
      }, 1500);
    } else {
      toast.error(result.error || "Login failed! Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (registerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsSubmitting(true);
    const result = await registerUser(
      registerForm.name,
      registerForm.email,
      registerForm.password,
      registerForm.confirmPassword
    );

    if (result.success) {
      if (result.autoLoggedIn) {
        // Auto-login successful
        toast.success(
          `Welcome to NdizNote Musics hub, ${result.user.name}! 🚀`
        );
        setTimeout(() => {
          closeModals();
          const dashboardPath = getDashboardPath(result.user);
          navigate(dashboardPath);
        }, 1500);
      } else {
        // Registration successful, need to login
        toast.success(
          "Account created successfully! Please login with your credentials. ✅"
        );
        setTimeout(() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
          setLoginForm({ email: registerForm.email, password: "" });
          setRegisterForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }, 1000);
      }
    } else {
      toast.error(result.error || "Registration failed! Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiService.forgotPassword(forgotPasswordForm.email);
      if (result.success) {
        toast.success("Password reset instructions sent to your email! 📧");
        setTimeout(() => {
          setIsForgotPasswordOpen(false);
          setIsLoginOpen(true);
        }, 2000);
      } else {
        toast.error(
          result.error || "Failed to send reset email. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to send reset email. Please try again."
      );
    }
    setIsSubmitting(false);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await apiService.resetPassword(
        resetPasswordForm.token,
        resetPasswordForm.password
      );
      if (result.success) {
        toast.success("Password reset successfully! ✅");
        setTimeout(() => {
          setIsResetPasswordOpen(false);
          setIsLoginOpen(true);
        }, 2000);
      } else {
        toast.error(
          result.error || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    }
    setIsSubmitting(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiService.contact(contactForm);
      if (result.success) {
        setIsContactOpen(false);
        setIsSuccessModalOpen(true);
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(
          result.error || "Failed to send message. Please try again."
        );
        setIsContactOpen(false);
        setIsFailModalOpen(true);
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to send message. Please try again."
      );
      setIsContactOpen(false);
      setIsFailModalOpen(true);
    }
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleDashboardNavigation = () => {
    if (user) {
      const dashboardPath = getDashboardPath(user);
      navigate(dashboardPath);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <MaterialIcons.Logo />
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">
                    NdizyNote
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center lg:px-12 space-x-8">
              {/* Main Navigation Links */}
              {navigationConfig.main.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 transition-all duration-200 font-medium group"
                >
                  <Button className="bg-gradient-to-t from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 transition-all duration-300">
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Button>
                </Link>
              ))}

              {/* Contact Button */}
              <button
                onClick={openContact}
                className="flex items-center p-2 rounded-sm space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 font-medium group"
              >  
                  Contact
              </button>

              {/* Dashboard Button for Logged-in Users */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDashboardNavigation}
                  className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                >
                  <Dashboard className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 pl-2 border-l border-gray-200">
                  {/* User Profile Display */}
                  <div className="flex items-center space-x-3 min-w-0 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50">
                    <img
                      src={
                        user?.avatar ||
                        `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
                      }
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-blue-500 flex-shrink-0"
                    />
                    <div className="text-right min-w-0">
                      <p className="text-sm font-medium text-indigo-900 truncate max-w-32">
                        {user?.name?.slice(0, 4) || "User"}
                      </p>
                      <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        {getUserDisplayStatus(user)}
                      </p>
                    </div>
                  </div>
                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-gradient-to-tr from-gray-600 via-green-700 to-blue-800 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:via-gray-800 hover:to-green-900 transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2"
                  >
                    <Logout className="w-5 h-5" />
                  </motion.button>
                </div>
              ) : (
                /* Login and Register Buttons */
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openLogin}
                    className="border-2 border-blue-600 bg-transparent text-blue-600 px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
                  >
                    <span>LogIn</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openRegister}
                    className="bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                  >
                    <span>Register</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-gradient-to-tr from-blue-500 to-purple-600 text-white p-2.5 rounded-xl shadow-lg"
              >
                {isMobileMenuOpen ? <MaterialIcons.Close /> : <MaterialIcons.Menu />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-xl absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                {navigationConfig.main.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium"
                  >
                    {item.icon && <span className="text-blue-500">{item.icon}</span>}
                    <Button className="w-full bg-gradient-to-r from-blue-200 to-violet-200 justify-start">
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                ))}

                {/* Mobile Contact Button */}
                <button
                  onClick={() => {
                    openContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center bg-gradient-to-r from-blue-600 to-purple-600 space-x-3 px-4 py-3 text-left text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium"
                >
                  <Message className="w-5 h-5" />
                  <span>Contact</span>
                </button>

                {/* Mobile Dashboard Button */}
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      handleDashboardNavigation();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Dashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                )}

                {/* Mobile Auth Buttons */}
                {!isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button
                      onClick={() => {
                        openLogin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-center border-2 border-blue-600 bg-transparent text-blue-600 rounded-xl font-semibold"
                    >
                      <Person className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        openRegister();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Add className="w-5 h-5" />
                      <span>Register</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    {/* Mobile User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/50 rounded-xl border border-gray-200/50">
                      <img
                        src={
                          user?.avatar ||
                          `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
                        }
                        alt="User avatar"
                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-green-500 font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                          {getUserDisplayStatus(user)}
                        </p>
                      </div>
                    </div>
                    {/* Mobile Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-center bg-gradient-to-tr from-green-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Logout className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================================= */}
      {/* MODAL COMPONENTS - All popup dialogs */}
      {/* ============================================= */}

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <ModalOverlay onClose={closeModals}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={closeModals} />
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Person className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to your NdizNote Musics hub account
                </p>
              </div>
              <LoginForm
                form={loginForm}
                onChange={setLoginForm}
                onSubmit={handleLoginSubmit}
                isSubmitting={isSubmitting}
                onForgotPassword={openForgotPassword}
                onSwitchToRegister={switchToRegister}
              />
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {isRegisterOpen && (
          <ModalOverlay onClose={closeModals}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={closeModals} />
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Add className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Join NdizNote Musics hub
                </h2>
                <p className="text-gray-600">
                  Create your account and get started
                </p>
              </div>
              <RegisterForm
                form={registerForm}
                onChange={setRegisterForm}
                onSubmit={handleRegisterSubmit}
                isSubmitting={isSubmitting}
                onSwitchToLogin={switchToLogin}
              />
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <ModalOverlay onClose={closeModals}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={closeModals} />
              <ForgotPasswordForm
                form={forgotPasswordForm}
                onChange={setForgotPasswordForm}
                onSubmit={handleForgotPasswordSubmit}
                isSubmitting={isSubmitting}
                onSwitchToLogin={() => {
                  setIsForgotPasswordOpen(false);
                  setIsLoginOpen(true);
                }}
              />
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {isResetPasswordOpen && (
          <ModalOverlay onClose={closeModals}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={closeModals} />
              <ResetPasswordForm
                form={resetPasswordForm}
                onChange={setResetPasswordForm}
                onSubmit={handleResetPasswordSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ModalOverlay onClose={closeModals}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={closeModals} />
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Message className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Contact Us
                </h2>
                <p className="text-gray-600">Get in touch with our team</p>
              </div>
              <ContactForm
                form={contactForm}
                onChange={setContactForm}
                onSubmit={handleContactSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <ModalOverlay onClose={closeModals}>
            <SuccessModal onClose={closeModals} />
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Fail Modal */}
      <AnimatePresence>
        {isFailModalOpen && (
          <ModalOverlay onClose={closeModals}>
            <FailModal onClose={closeModals} errorMessage={errorMessage} />
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};