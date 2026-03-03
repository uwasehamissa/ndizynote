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
// import Cookies from "js-cookie";

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
// import logos from "../../assets/images/03_24_19 AM.png";

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
//   authenticated: [
//     { name: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
//   ],
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
//         { email },
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
//       const response = await axios.post(
//         `${API_BASE_URL}/api/users/reset-password`,
//         {
//           token,
//           password,
//         },
//       );
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
//       const response = await axios.post(
//         `${API_BASE_URL}/api/contacts/contact`,
//         formData,
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         error.response?.data?.message ||
//           "Message sending failed. Please try again.",
//       );
//     }
//   },
// };

// // =============================================
// // AUTH PROVIDER - Manages user authentication state
// // =============================================

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const userCookie = Cookies.get("user");
//       if (userCookie) return JSON.parse(userCookie);

//       const savedUser = localStorage.getItem("user");
//       if (savedUser) {
//         Cookies.set("user", savedUser, { expires: 7 });
//         return JSON.parse(savedUser);
//       }

//       return null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   });

//   const [isAuthenticated, setIsAuthenticated] = useState(!!user);
//   const [isLoading, setIsLoading] = useState(true);

//   // LOGIN
//   const login = async (email, password) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.login(email, password);

//       if (!response) throw new Error("No response from server");

//       const userData = response.data?.user || response.user || response;
//       const token = response.data?.token || response.token;

//       if (!userData || !token) throw new Error("Invalid login response");

//       const userStatus = userData.status || userData.role || "user";

//       const savedUser = {
//         email: userData.email,
//         status: userStatus,
//         token: token,
//       };

//       localStorage.setItem("user", JSON.stringify(savedUser));
//       localStorage.setItem("userEmail", savedUser.email);
//       localStorage.setItem("userRole", savedUser.status);
//       localStorage.setItem("token", token);
//       Cookies.set("user", JSON.stringify(savedUser), { expires: 1 });

//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       setUser(savedUser);
//       setIsAuthenticated(true);

//       return {
//         success: true,
//         user: savedUser,
//         message: response.message || "Login successful",
//       };
//     } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // REGISTER
//   const register = async (name, email, password, confirmPassword) => {
//     try {
//       setIsLoading(true);
//       const response = await apiService.register(
//         name,
//         email,
//         password,
//         confirmPassword,
//       );

//       const userData = response.data?.user || response.user || response;
//       const token = response.data?.token || response.token;

//       if (!userData || !token)
//         return { success: false, error: "Invalid registration response" };

//       const userStatus = userData.status || userData.role || "user";

//       const savedUser = {
//         email: userData.email || email,
//         status: userStatus,
//         token: token,
//       };

//       localStorage.setItem("user", JSON.stringify(savedUser));
//       localStorage.setItem("userEmail", savedUser.email);
//       localStorage.setItem("userRole", savedUser.status);
//       localStorage.setItem("token", token);
//       Cookies.set("user", JSON.stringify(savedUser), { expires: 7 });

//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       setUser(savedUser);
//       setIsAuthenticated(true);

//       return {
//         success: true,
//         user: savedUser,
//         message: response.message || "Registration successful",
//       };
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     const token = Cookies.get("token") || localStorage.getItem("token");

//     try {
//       if (token) {
//         await axios.post(
//           "https://ndizmusicprojectbackend.onrender.com/api/users/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           },
//         );
//       }
//     } catch (error) {
//       console.error("Backend logout failed:", error.response?.data || error);
//       // Do NOT block logout
//     }

//     // ✅ frontend cleanup ALWAYS
//     setUser(null);
//     setIsAuthenticated(false);

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");

//     Cookies.remove("user");
//     Cookies.remove("token");

//     delete axios.defaults.headers.common["Authorization"];

//     // ✅ redirect last
//     window.location.href = "/";
//   };

//   // INIT AUTH
//   useEffect(() => {
//     const userCookie = Cookies.get("user");
//     const token = localStorage.getItem("token");

//     if (userCookie && token) {
//       try {
//         const savedUser = JSON.parse(userCookie);
//         setUser(savedUser);
//         setIsAuthenticated(true);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       } catch (error) {
//         console.error("Auth initialization error:", error);
//         logout();
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         register,
//         logout,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
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
//       {isSubmitting ? <LoadingSpinner size="sm" /> : "Sign In"}
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
//       {isSubmitting ? <LoadingSpinner size="sm" /> : "Create Account"}
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
// // const getDashboardPath = (user) => {
// //   const userStatus = user?.status || user?.role;
// //   switch (userStatus) {
// //     case "admin":
// //       return "/dashboard";
// //     case "manager":
// //       return "/dashboard/manager";
// //     case "user":
// //       return "/dashboard/user";
// //     default:
// //       return "/dashboard";
// //   }
// // };

// const getDashboardPath = (user) => {
//   const status = user?.status || user?.role;

//   if (status === "admin") return "/dashboard";
//   if (status === "user") return "/dashboard/user";
//   if (status === "manager") return "/dashboard/manager";

//   return "/";
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
//   const {
//     isAuthenticated,
//     user,
//     login,
//     register: registerUser,
//     logout,
//   } = useAuth();
//   const [User, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userCookie = Cookies.get("user");
//     if (!userCookie) {
//       setUser(null);
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userCookie);

//       // optional safety check
//       if (parsedUser?.status || parsedUser?.role) {
//         setUser(parsedUser);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       console.error("Invalid user cookie", err);
//       setUser(null);
//     }
//   }, []);

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
//       registerForm.confirmPassword,
//     );

//     if (result.success) {
//       if (result.autoLoggedIn) {
//         // Auto-login successful
//         toast.success(
//           `Welcome to NdizNote Musics hub, ${result.user.name}! 🚀`,
//         );
//         setTimeout(() => {
//           closeModals();
//           const dashboardPath = getDashboardPath(result.user);
//           navigate(dashboardPath);
//         }, 1500);
//       } else {
//         // Registration successful, need to login
//         toast.success(
//           "Account created successfully! Please login with your credentials. ✅",
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
//           result.error || "Failed to send reset email. Please try again.",
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to send reset email. Please try again.",
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
//         resetPasswordForm.password,
//       );
//       if (result.success) {
//         toast.success("Password reset successfully! ✅");
//         setTimeout(() => {
//           setIsResetPasswordOpen(false);
//           setIsLoginOpen(true);
//         }, 2000);
//       } else {
//         toast.error(
//           result.error || "Failed to reset password. Please try again.",
//         );
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to reset password. Please try again.",
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
//           result.error || "Failed to send message. Please try again.",
//         );
//         setIsContactOpen(false);
//         setIsFailModalOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.message || "Failed to send message. Please try again.",
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
//     const userCookie = Cookies.get("user");

//     if (!userCookie) {
//       navigate("/");
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userCookie);
//       navigate(getDashboardPath(parsedUser));
//     } catch (err) {
//       console.error("Invalid user cookie", err);
//       navigate("/");
//     }
//   };

//   return (
//     <>
//       {/* Navigation Bar */}
//       <nav className="w-full bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white backdrop-blur-md shadow-lg sticky top-0 border-b border-gray-200 overflow-visible">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="flex justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center">
//               <Link to="/" className="flex-shrink-0 flex items-center">
//                 <img src={logos} alt="" className="w-24 h-20 rounded-2xl" />
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
//                   <button className=" transition-all duration-300">
//                     <span className="relative">
//                       {item.name}
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5  group-hover:w-full transition-all duration-300"></span>
//                     </span>
//                   </button>
//                 </Link>
//               ))}

//               {/* Contact Button */}
//               <button
//                 onClick={openContact}
//                 className="flex items-center p-2 rounded-sm space-x-2 transition-all duration-200 font-medium group"
//               >
//                 Contact
//               </button>

//               {/* Dashboard Button for Logged-in Users */}
//               {isAuthenticated && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleDashboardNavigation}
//                   className="bg-gradient-to-tr from-blue-400 via-purple-400 to-indigo-400 text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
//                 >
//                   <Dashboard className="w-5 h-5 text-white" />
//                 </motion.button>
//               )}
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {isAuthenticated ? (
//                 <div className="flex items-center space-x-4 pl-2 border-l border-gray-200">
//                   {/* User Profile Display */}
//                   <div className="flex items-center space-x-3 min-w-0 bg-white backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50">
//                     <img
//                       src={
//                         user?.avatar
//                           ? user.avatar // Use custom avatar if available
//                           : user?.status === "admin"
//                             ? `https://getdrawings.com/free-icon-bw/admin-icon-8.png` // Default admin image
//                             : `https://getdrawings.com/free-icon-bw/red-person-icon-8.png` // Default user image
//                       }
//                       alt=""
//                       className="w-8 h-8 rounded-full border-2 border-blue-500 flex-shrink-0"
//                     />
//                     <div className="text-right min-w-0">
//                       <p className="text-xs text-purple-600 capitalize font-semibold bg-clip-text">
//                         {getUserDisplayStatus(user)}
//                       </p>
//                     </div>
//                   </div>
//                   {/* Logout Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleLogout}
//                     className="bg-gradient-to-tr from-red-600 via-red-500 to-red-700 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:via-gray-800 hover:to-green-900 transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2"
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
//                 {isMobileMenuOpen ? (
//                   <MaterialIcons.Close />
//                 ) : (
//                   <MaterialIcons.Menu />
//                 )}
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
//                     {item.icon && (
//                       <span className="text-blue-500">{item.icon}</span>
//                     )}
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
//                   className="w-full flex items-center  space-x-3 px-4 py-3 text-left text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium"
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
//                     <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-xl border border-gray-200/50">
//                       <img
//                         src={
//                           user?.avatar ||
//                           `https://getdrawings.com/free-icon-bw/red-person-icon-8.png`
//                         }
//                         alt="User avatar"
//                         className="w-10 h-10 rounded-full border-2 border-blue-500"
//                       />
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm text-green-500 font-medium text-gray-100 truncate">
//                           {user?.name || "User"}
//                         </p>
//                         <p className="text-xs text-gray-300 capitalize font-semibold  bg-clip-text">
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
//                   Join NdizyNote Musics hub
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
  Visibility,
  VisibilityOff,
  ArrowDownward,
  Hotel,
  RoomService,
  Event,
  Star,
  AccessTime,
  LocationOn,
  Logout,
  Key,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import logos from "../../assets/images/ChatGPT Image Mar 3, 2026, 02_09_55 PM.png";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

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
    { name: "Services", path: "/services", icon: <RoomService /> },
    { name: "Classes", path: "/classes", icon: <School /> },
    { name: "FAQ", path: "/faq", icon: <Help /> },
  ],
  authenticated: [
    { name: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  ],
  pages: [
    { name: "Booking", path: "/B-7839-283/34", icon: <Event /> },
    { name: "Testimonial", path: "/T-8732-452/34", icon: <Star /> },
  ],
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
  register: async (name, email, password, confirmPassword, phone) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
        confirmPassword,
        phone,
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
        { email },
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
      const response = await axios.post(
        `${API_BASE_URL}/api/users/reset-password`,
        {
          token,
          password,
        },
      );
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
      const response = await axios.post(
        `${API_BASE_URL}/api/contacts/contact`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Message sending failed. Please try again.",
      );
    }
  },
};

// =============================================
// AUTH PROVIDER - Manages user authentication state
// =============================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userCookie = Cookies.get("user");
      if (userCookie) return JSON.parse(userCookie);

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        Cookies.set("user", savedUser, { expires: 7 });
        return JSON.parse(savedUser);
      }

      return null;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(true);

  // LOGIN
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await apiService.login(email, password);

      if (!response) throw new Error("No response from server");

      const userData = response.data?.user || response.user || response;
      const token = response.data?.token || response.token;

      if (!userData || !token) throw new Error("Invalid login response");

      const userStatus = userData.status || userData.role || "user";

      const savedUser = {
        email: userData.email,
        name: userData.name || email.split("@")[0],
        status: userStatus,
        token: token,
      };

      localStorage.setItem("user", JSON.stringify(savedUser));
      localStorage.setItem("userEmail", savedUser.email);
      localStorage.setItem("userName", savedUser.name);
      localStorage.setItem("userRole", savedUser.status);
      localStorage.setItem("token", token);
      Cookies.set("user", JSON.stringify(savedUser), { expires: 1 });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(savedUser);
      setIsAuthenticated(true);

      return {
        success: true,
        user: savedUser,
        message: response.message || "Login successful",
      };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTER
  const register = async (name, email, password, confirmPassword, phone) => {
    try {
      setIsLoading(true);
      const response = await apiService.register(
        name,
        email,
        password,
        confirmPassword,
        phone,
      );

      const userData = response.data?.user || response.user || response;
      const token = response.data?.token || response.token;

      if (!userData || !token)
        return { success: false, error: "Invalid registration response" };

      const userStatus = userData.status || userData.role || "user";

      const savedUser = {
        email: userData.email || email,
        name: userData.name || name,
        status: userStatus,
        token: token,
      };

      localStorage.setItem("user", JSON.stringify(savedUser));
      localStorage.setItem("userEmail", savedUser.email);
      localStorage.setItem("userName", savedUser.name);
      localStorage.setItem("userRole", savedUser.status);
      localStorage.setItem("token", token);
      Cookies.set("user", JSON.stringify(savedUser), { expires: 7 });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(savedUser);
      setIsAuthenticated(true);

      return {
        success: true,
        user: savedUser,
        message: response.message || "Registration successful",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (navigate) => {
    const token = Cookies.get("token") || localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "https://ndizmusicprojectbackend.onrender.com/api/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
      }
    } catch (error) {
      console.error("Backend logout failed:", error.response?.data || error);
    }

    // ✅ frontend cleanup ALWAYS
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    Cookies.remove("user");
    Cookies.remove("token");

    delete axios.defaults.headers.common["Authorization"];

    // ✅ redirect
    if (navigate) {
      navigate("/");
    } else {
      window.location.href = "/";
    }
  };

  // INIT AUTH
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const token = localStorage.getItem("token");

    if (userCookie && token) {
      try {
        const savedUser = JSON.parse(userCookie);
        setUser(savedUser);
        setIsAuthenticated(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =============================================
// PROTECTED ROUTE COMPONENT - Secures pages
// =============================================
export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
    if (!isLoading && adminOnly && user?.status !== "admin") {
      navigate("/dashboard/user");
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
        <div className="flex flex-col items-center">
          <CircularProgress size={40} className="text-white" />
          <p className="mt-4 text-white">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (adminOnly && user?.status !== "admin") return null;

  return children;
};

// =============================================
// HELPER FUNCTIONS - Utility functions
// =============================================

const getDashboardPath = (user) => {
  const status = user?.status || user?.role;
  if (status === "admin") return "/dashboard";
  if (status === "user") return "/dashboard/user";
  if (status === "manager") return "/dashboard/manager";
  return "/";
};

const getUserDisplayStatus = (user) => {
  return user?.status || user?.role || "user";
};

const getUserName = (user) => {
  return user?.name || (user?.email ? user.email.split("@")[0] : "User");
};

// =============================================
// MODAL COMPONENTS
// =============================================

const ModalOverlay = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm overflow-y-auto flex items-start justify-center z-[100] p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    {children}
  </motion.div>
);

const ModalCloseButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-pink-600 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
  >
    <Close className="size-4" />
  </button>
);

const SuccessModal = ({ onClose, message }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    className="bg-gray-900 rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center border border-green-500"
    onClick={(e) => e.stopPropagation()}
  >
    <ModalCloseButton onClose={onClose} />
    <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <CheckCircle className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">Success!</h3>
    <p className="text-gray-400 mb-6">
      {message || "Operation completed successfully!"}
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

const FailModal = ({ onClose, errorMessage }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    className="bg-gray-900 rounded-2xl w-full max-w-md p-8 relative shadow-2xl mx-4 text-center border border-red-500"
    onClick={(e) => e.stopPropagation()}
  >
    <ModalCloseButton onClose={onClose} />
    <div className="w-20 h-20 bg-gradient-to-tr from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <ErrorIcon className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">Error!</h3>
    <p className="text-gray-400 mb-4">
      {errorMessage || "There was an error. Please try again."}
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
// MAIN NAVBAR COMPONENT
// =============================================
export const Navbar = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    login,
    register: registerUser,
    logout,
  } = useAuth();

  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Modal States
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // Form States
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowLoginModal(false);
        setShowRegisterModal(false);
        setShowForgotPassword(false);
        setShowContactModal(false);
        setShowSuccessModal(false);
        setShowFailModal(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Modal handlers
  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowForgotPassword(false);
    setShowContactModal(false);
    setShowSuccessModal(false);
    setShowFailModal(false);
    setContactErrors({});
    setResetMessage("");
  };

  // Form submission handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(loginData.email, loginData.password);

    if (result.success) {
      setShowLoginModal(false);
      setModalMessage(
        `Welcome ${result.user.name || result.user.email.split("@")[0]}!`,
      );
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        const dashboardPath = getDashboardPath(result.user);
        navigate(dashboardPath);
      }, 2000);
    } else {
      setModalMessage(result.error || "Login failed! Please try again.");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      setModalMessage("Passwords do not match");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
      return;
    }

    if (registerData.password.length < 6) {
      setModalMessage("Password must be at least 6 characters");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
      return;
    }

    setLoading(true);
    const result = await registerUser(
      registerData.name,
      registerData.email,
      registerData.password,
      registerData.confirmPassword,
      registerData.phone,
    );

    if (result.success) {
      setShowRegisterModal(false);
      setModalMessage(
        "Registration successful! Welcome to NdizNote Musics hub!",
      );
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        const dashboardPath = getDashboardPath(result.user);
        navigate(dashboardPath);
      }, 2000);
    } else {
      setModalMessage(result.error || "Registration failed! Please try again.");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
    }
    setLoading(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!forgotPasswordData.email) {
      setModalMessage("Please enter your email");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.forgotPassword(forgotPasswordData.email);
      setResetMessage(result.message || "Reset link sent to your email");
      setModalMessage("Reset link sent successfully!");
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordData({ email: "" });
        setResetMessage("");
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      setModalMessage(error.message || "Failed to send reset link");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!contactData.name.trim()) errors.name = "Name required";
    if (!contactData.email.trim()) errors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email))
      errors.email = "Invalid email";
    if (!contactData.subject.trim()) errors.subject = "Subject required";
    if (!contactData.message.trim()) errors.message = "Message required";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactSubmitting(true);
    try {
      const result = await apiService.contact(contactData);
      setContactData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setModalMessage("Message sent successfully!");
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowContactModal(false);
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      setModalMessage(error.message || "Failed to send message");
      setShowFailModal(true);
      setTimeout(() => setShowFailModal(false), 2000);
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout(navigate);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (isAuthenticated && user) {
      navigate(getDashboardPath(user));
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white opacity-95" />

        {/* Main Nav */}
        <motion.div
          className={`relative transition-all ${scrolled ? "bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white shadow-2xl" : "bg-transparent"}`}
        >
          <div className="flex items-center">
            {/* Logo */}
            <div className="hidden lg:flex w-1/4 h-24 items-center justify-center">
              <Link to="/">
                <img src={logos} alt="Logo" className="w-24 h-20 rounded-xl" />
              </Link>
            </div>

            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center h-24 px-4 lg:px-0">
                {/* Mobile Logo */}
                <Link to="/" className="lg:hidden">
                  <img src={logos} alt="Logo" className="w-20 h-18 rounded-xl" />
                </Link>

                {/* Mobile Time & Auth */}
                <div className="flex items-center space-x-3 lg:hidden">
                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center space-x-2  px-3 py-1.5 rounded-full text-white"
                      >
                        <Person className="text-white" />
                        <span>
                          {getUserName(user)?.length > 6
                            ? getUserName(user).slice(0, 6) + "..."
                            : getUserName(user) || "N/A"}
                        </span>
                      </button>

                      <AnimatePresence>
                        {userMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-xl shadow-2xl z-50 border border-gray-700"
                          >
                            <div className="p-3 border-b border-gray-700">
                              <p className="text-white text-sm font-medium truncate">
                                {getUserName(user)}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {user?.email}
                              </p>
                            </div>
                            <button
                              onClick={handleDashboardClick}
                              className="w-full px-4 py-2.5 text-left bg-gradient-to-b from-green-600 to-emerald-600 text-white transition flex items-center text-sm"
                            >
                              <Dashboard className="mr-2" /> Dashboard
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full px-4 py-2.5 text-left bg-gradient-to-b from-red-400 to-red-700 text-white transition flex items-center text-sm"
                            >
                              <Logout className="mr-2" /> Logout
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center"
                      >
                        <Person className="mr-1" />
                      </button>
                      <button
                        onClick={() => setShowRegisterModal(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center"
                      >
                        <Add className="mr-1" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg transition"
                >
                  {mobileMenuOpen ? (
                    <Close className="text-2xl text-red-700" />
                  ) : (
                    <MenuIcon className="text-2xl" />
                  )}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-4 flex-1">
                  {navigationConfig.main.map((link, i) => (
                    <div key={i} className="relative group">
                      <Link to={link.path}>
                        <button className="flex items-center px-3 py-2 rounded-lg transition">
                          <span className="ml-1">{link.name}</span>
                        </button>
                      </Link>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition" />
                    </div>
                  ))}

                  {/* Contact Button */}
                  <div className="relative group">
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="flex items-center px-3 py-2 rounded-lg transition"
                    >
                      Contact
                    </button>
                  </div>
                </nav>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center space-x-4 pr-6 ml-auto">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={handleDashboardClick}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        <Dashboard className="text-xl" />
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="flex items-center space-x-2  px-4 py-2 rounded-xl text-white hover:shadow-lg transition-all"
                        >
                          <Person className="text-xl" />
                          <span>
                            {getUserName(user)?.length > 8
                              ? getUserName(user).slice(0, 8) + "..."
                              : getUserName(user) || "N/A"}
                          </span>
                        </button>

                        <AnimatePresence>
                          {userMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 border border-gray-700"
                            >
                              <div className="p-4 border-b border-gray-700">
                                <p className="text-white font-medium truncate">
                                  {getUserName(user)}
                                </p>
                                <p className="text-gray-400 text-sm truncate">
                                  {user?.email}
                                </p>
                                <p className="text-gray-500 text-xs mt-1 capitalize">
                                  Role: {getUserDisplayStatus(user)}
                                </p>
                              </div>
                              <button
                                onClick={handleDashboardClick}
                                className="w-full px-4 py-3 text-left bg-gradient-to-r from-green-500 to-emerald-600 text-white transition flex items-center"
                              >
                                <Dashboard className="mr-2" /> Dashboard
                              </button>
                              <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 text-left bg-gradient-to-r from-red-500 to-red-600 text-white transition flex items-center"
                              >
                                <Logout className="mr-2" /> Logout
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all flex items-center"
                      >
                        <Person className="mr-2" />
                      </button>
                      <button
                        onClick={() => setShowRegisterModal(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all flex items-center"
                      >
                        <Add className="mr-2" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-gray-900 border-t border-gray-800 shadow-xl"
              style={{ position: "relative", zIndex: 40 }}
            >
              <div className="py-4 px-4 space-y-2">
                {/* Main Navigation Links */}
                {navigationConfig.main.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-all cursor-pointer">
                      <span className="ml-2">{link.name}</span>
                    </button>
                  </Link>
                ))}

                {/* Contact Button */}
                <button
                  onClick={() => {
                    setShowContactModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-all"
                >
                  <Message className="mr-2" /> Contact
                </button>


                {/* Mobile Auth Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  {isAuthenticated ? (
                    <div className="space-y-2 px-4">
                      <button
                        onClick={handleDashboardClick}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
                      >
                        <Dashboard className="mr-2" />Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
                      >
                        <Logout className="mr-2" />Logout
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 px-4">
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
                      >
                        <Person className="mr-2" />
                      </button>
                      <button
                        onClick={() => {
                          setShowRegisterModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
                      >
                        <Add className="mr-2" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Contact Info for Mobile */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="flex flex-col items-center space-y-3 px-4">
                    <div className="flex items-center text-gray-400">
                      <Phone className="text-blue-400 mr-3" />
                      <span className="text-sm">+250 (78) 794-4577</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Email className="text-blue-400 mr-3" />
                      <span className="text-sm">info@ndiznote.com</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaWhatsapp className="text-blue-400 mr-3" />
                      <span className="text-sm">+250 (72) 755-6145</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================= */}
      {/* MODAL COMPONENTS */}
      {/* ============================================= */}

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[100]"
              onClick={() => setShowLoginModal(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-gray-900 rounded-2xl shadow-2xl z-[101] border border-gray-700"
            >
              <div className="p-6">
                <ModalCloseButton onClose={() => setShowLoginModal(false)} />

                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4  rounded-full flex items-center justify-center">
                    <Person className="text-4xl text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Welcome Back
                  </h2>
                </div>

                <form onSubmit={handleLoginSubmit} className="text-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Email className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-white focus:border-blue-500"
                          placeholder="Enter password"
                          required
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={loginData.rememberMe}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              rememberMe: e.target.checked,
                            })
                          }
                          className="rounded border-gray-600 bg-gray-800 text-blue-600"
                        />
                        <span className="text-gray-300 text-sm">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowForgotPassword(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full  text-white font-semibold py-3 rounded-lg flex items-center justify-center"
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <>
                          <Person className="mr-2" /> Sign In
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowRegisterModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[100]"
              onClick={() => setShowRegisterModal(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-gray-900 rounded-2xl shadow-2xl z-[101] border border-gray-700"
            >
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <ModalCloseButton onClose={() => setShowRegisterModal(false)} />

                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Add className="text-4xl text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Create Account
                  </h2>
                </div>

                <form onSubmit={handleRegisterSubmit} className="text-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <Person className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              name: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-purple-500"
                          placeholder="Full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Email className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-purple-500"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-purple-500"
                          placeholder="+250..."
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-white focus:border-purple-500"
                          placeholder="Min. 6 characters"
                          required
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-purple-500"
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <>
                          <Add className="mr-2" /> Register
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowRegisterModal(false);
                          setShowLoginModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[100]"
              onClick={() => setShowForgotPassword(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-gray-900 rounded-2xl shadow-2xl z-[101] border border-gray-700"
            >
              <div className="p-6">
                <ModalCloseButton
                  onClose={() => setShowForgotPassword(false)}
                />

                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
                    <VpnKey className="text-4xl text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Forgot Password?
                  </h2>
                </div>

                {resetMessage && (
                  <div className="mb-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg">
                    <p className="text-green-400 text-sm text-center">
                      {resetMessage}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="text-white"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Email className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          value={forgotPasswordData.email}
                          onChange={(e) =>
                            setForgotPasswordData({ email: e.target.value })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-yellow-500"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold py-3 rounded-lg"
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                      Remember your password?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setShowLoginModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[100]"
              onClick={() => setShowContactModal(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-gray-900 rounded-2xl shadow-2xl z-[101] border border-gray-700"
            >
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <ModalCloseButton
                  onClose={() => {
                    setShowContactModal(false);
                    setContactErrors({});
                  }}
                />

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                  <p className="text-gray-400 text-sm">
                    We'd love to hear from you
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="text-white">
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={contactData.name}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          })
                        }
                        className={`w-full bg-gray-800 border ${contactErrors.name ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white focus:border-blue-500`}
                      />
                      {contactErrors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="email"
                          placeholder="Email *"
                          value={contactData.email}
                          onChange={(e) =>
                            setContactData({
                              ...contactData,
                              email: e.target.value,
                            })
                          }
                          className={`w-full bg-gray-800 border ${contactErrors.email ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white focus:border-blue-500`}
                        />
                        {contactErrors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={contactData.phone}
                          onChange={(e) =>
                            setContactData({
                              ...contactData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject *"
                        value={contactData.subject}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            subject: e.target.value,
                          })
                        }
                        className={`w-full bg-gray-800 border ${contactErrors.subject ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white focus:border-blue-500`}
                      />
                      {contactErrors.subject && (
                        <p className="text-red-500 text-xs mt-1">
                          {contactErrors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        rows="4"
                        placeholder="Message *"
                        value={contactData.message}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            message: e.target.value,
                          })
                        }
                        className={`w-full bg-gray-800 border ${contactErrors.message ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white focus:border-blue-500`}
                      />
                      {contactErrors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {contactErrors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full  text-white font-semibold py-3 rounded-lg flex items-center justify-center"
                    >
                      {contactSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <>
                          <Send className="mr-2" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Phone className="mr-2 text-blue-400" /> +250 787 944 577
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Email className="mr-2 text-blue-400" /> info@ndiznote.com
                    </div>
                    <div className="flex items-center text-gray-400">
                      <LocationOn className="mr-2 text-blue-400" /> Kigali,
                      Rwanda
                    </div>
                    <div className="flex items-center text-gray-400">
                      <AccessTime className="mr-2 text-blue-400" /> Mon-Fri:
                      9AM-6PM
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[200]"
              onClick={() => setShowSuccessModal(false)}
            />
            <SuccessModal
              onClose={() => setShowSuccessModal(false)}
              message={modalMessage}
            />
          </>
        )}
      </AnimatePresence>

      {/* Fail Modal */}
      <AnimatePresence>
        {showFailModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[200]"
              onClick={() => setShowFailModal(false)}
            />
            <FailModal
              onClose={() => setShowFailModal(false)}
              errorMessage={modalMessage}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
