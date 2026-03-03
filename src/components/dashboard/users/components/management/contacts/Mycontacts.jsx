/* eslint-disable no-useless-catch */
// /* eslint-disable no-unused-vars */
// // components/ContactManagement.jsx
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
//   Email as EmailIcon,
//   Menu,
//   Phone,
//   Message,
//   Business,
//   Schedule,
//   AccountCircle,
//   Warning,
//   Info,
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

// // Axios instance with base configuration
// const api = axios.create({
//   baseURL: "https://ndizmusicprojectbackend.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API Service using Axios - Filtered by current user's email
// const contactService = {
//   // Get contacts for current user only
//   async getMyContacts() {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("No email found in cookies. Please log in again.");
//     }

//     try {
//       const response = await api.get("/contacts");
//       const data = response.data;

//       if (data.success) {
//         // Filter contacts by current user's email
//         const myContacts = data.data
//           .filter(contact => 
//             contact.email === userEmail || 
//             contact.userEmail === userEmail
//           )
//           .map((contact) => ({
//             id: contact._id,
//             name: contact.name,
//             email: contact.email,
//             subject: contact.subject,
//             message: contact.message,
//             phone: contact.phone,
//             company: contact.company,
//             status: contact.status || "new",
//             createdAt: contact.createdAt,
//             isCurrentUser: true
//           }));

//         return myContacts;
//       }
//       throw new Error(data.message || "Failed to fetch contacts");
//     } catch (error) {
//       // If API fails, return mock data for current user
//       return getMockContacts(userEmail);
//     }
//   },

//   // Create new contact - only for current user
//   async createContact(contactData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to create a contact");
//     }

//     const response = await api.post("/contacts", {
//       ...contactData,
//       email: userEmail // Always use logged-in user's email
//     });
//     const data = response.data;

//     if (data.success) {
//       const contact = data.data;
//       return {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         message: contact.message,
//         phone: contact.phone,
//         company: contact.company,
//         status: contact.status || "new",
//         createdAt: contact.createdAt,
//         isCurrentUser: true
//       };
//     }
//     throw new Error(data.message || "Failed to create contact");
//   },

//   // Update contact - only for current user
//   async updateContact(id, contactData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to update a contact");
//     }

//     const response = await api.put(`/contacts/${id}`, {
//       ...contactData,
//       email: userEmail // Ensure email stays as current user
//     });
//     const data = response.data;

//     if (data.success) {
//       const contact = data.data;
//       return {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         message: contact.message,
//         phone: contact.phone,
//         company: contact.company,
//         status: contact.status,
//         createdAt: contact.createdAt,
//         isCurrentUser: true
//       };
//     }
//     throw new Error(data.message || "Failed to update contact");
//   },

//   // Delete contact - only for current user
//   async deleteContact(id) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to delete a contact");
//     }

//     const response = await api.delete(`/contacts/${id}`);
//     const data = response.data;

//     if (!data.success) {
//       throw new Error(data.message || "Failed to delete contact");
//     }
//   },
// };

// // Mock contacts for current user
// const getMockContacts = (userEmail) => {
//   const userName = userEmail.split('@')[0];
//   return [
//     {
//       id: 1,
//       name: userName,
//       email: userEmail,
//       subject: "Inquiry about guitar lessons",
//       message: "Hello, I'm interested in starting guitar lessons. Can you provide more information about available time slots and pricing?",
//       phone: "+1 (555) 123-4567",
//       company: "Self-employed",
//       status: "new",
//       createdAt: new Date().toISOString(),
//       isCurrentUser: true
//     },
//     {
//       id: 2,
//       name: userName,
//       email: userEmail,
//       subject: "Follow-up on piano course",
//       message: "I wanted to follow up on the advanced piano course we discussed last week. When does the next session start?",
//       phone: "+1 (555) 123-4567",
//       company: "Tech Corp",
//       status: "in-progress",
//       createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
//       isCurrentUser: true
//     },
//     {
//       id: 3,
//       name: userName,
//       email: userEmail,
//       subject: "Feedback on violin instructor",
//       message: "I've been taking violin lessons for 3 months now and wanted to share my positive feedback about the instructor. They've been excellent!",
//       phone: "+1 (555) 987-6543",
//       company: "Music Enthusiast",
//       status: "responded",
//       createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
//       isCurrentUser: true
//     },
//     {
//       id: 4,
//       name: userName,
//       email: userEmail,
//       subject: "Request for drum workshop schedule",
//       message: "Could you please share the schedule for the upcoming drum workshops? I'm particularly interested in the weekend sessions.",
//       phone: "",
//       company: "",
//       status: "new",
//       createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//       isCurrentUser: true
//     }
//   ];
// };

// // Loading Spinner Component
// const LoadingSpinner = ({ size = "md", text = "" }) => {
//   const sizeClasses = {
//     sm: "h-4 w-4",
//     md: "h-6 w-6",
//     lg: "h-8 w-8",
//   };

//   return (
//     <div className="flex items-center justify-center space-x-2">
//       <div
//         className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
//       ></div>
//       {text && <span className="text-sm">{text}</span>}
//     </div>
//   );
// };

// // Modal Components - Updated for personal use
// const CreateContactModal = ({ isOpen, onClose, onCreate, userEmail }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     phone: "",
//     company: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (userEmail) {
//       setFormData(prev => ({
//         ...prev,
//         email: userEmail
//       }));
//     }
//   }, [userEmail]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await onCreate(formData);
//       setFormData({
//         name: "",
//         email: userEmail,
//         subject: "",
//         message: "",
//         phone: "",
//         company: "",
//       });
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
//             className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Submit Your Inquiry
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Creating inquiry with your email: {userEmail}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Info className="w-4 h-4 text-blue-600" />
//                   <p className="text-sm text-blue-700">
//                     You're submitting an inquiry with your logged-in email
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Your Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Your Email
//                   </label>
//                   <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
//                     <EmailIcon className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-700">{userEmail}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Email is read from your login cookies
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.company}
//                     onChange={(e) =>
//                       setFormData({ ...formData, company: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your company name"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.subject}
//                   onChange={(e) =>
//                     setFormData({ ...formData, subject: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Enter inquiry subject"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Message *
//                 </label>
//                 <textarea
//                   required
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
//                   placeholder="Enter your inquiry message..."
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
//                   {loading ? "Submitting..." : "Submit Inquiry"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const ViewContactModal = ({ isOpen, onClose, contact, userEmail }) => {
//   if (!contact) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-blue-100 text-blue-800";
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
//             className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Your Inquiry Details
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Viewing inquiry from: {contact.email || userEmail}
//               </p>
//             </div>

//             <div className="p-4 sm:p-6 space-y-6">
//               {/* User Info */}
//               <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                   <AccountCircle className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-blue-800">Your Inquiry</p>
//                   <p className="text-xs text-blue-600">
//                     Submitted with your logged-in email
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Your Name
//                   </label>
//                   <p className="text-gray-900">{contact.name}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Your Email
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <EmailIcon className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">{contact.email || userEmail}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">
//                       {contact.phone || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Company
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Business className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">
//                       {contact.company || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subject
//                 </label>
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <p className="text-gray-900 font-medium">{contact.subject}</p>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Your Message
//                 </label>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <p className="text-gray-900 whitespace-pre-wrap">
//                     {contact.message}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Status
//                   </label>
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                       contact.status
//                     )}`}
//                   >
//                     {contact.status.charAt(0).toUpperCase() +
//                       contact.status.slice(1)}
//                   </span>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Current status of your inquiry
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Submitted On
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Schedule className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900 text-sm">
//                       {new Date(contact.createdAt).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact, userEmail }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

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
//       {isOpen && contact && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-lg w-full max-w-md mx-4"
//           >
//             <div className="p-4 sm:p-6 border-b bg-red-50">
//               <h2 className="text-lg sm:text-xl font-semibold text-red-600">
//                 Delete Your Inquiry
//               </h2>
//               <p className="text-sm text-red-600 mt-1">
//                 This will delete your inquiry: {contact.subject}
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
//                       You're deleting your own inquiry
//                     </p>
//                     <p className="text-sm text-red-700 mt-1">
//                       Submitted with: {userEmail}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-4 text-sm sm:text-base">
//                 Are you sure you want to delete your inquiry about <strong>"{contact.subject}"</strong>? 
//                 This action cannot be undone.
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
//                   {loading ? "Deleting..." : "Delete My Inquiry"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Contact Card Component for Mobile View - Updated for personal use
// const ContactCard = ({ contact, onView, onDelete, userEmail }) => {
//   const [showActions, setShowActions] = useState(false);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 relative">
//             <AccountCircle className="w-5 h-5 text-blue-600" />
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center space-x-2 mb-1">
//               <h3 className="text-sm font-semibold text-gray-900 truncate">
//                 {contact.name}
//               </h3>
//               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                 Me
//               </span>
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   contact.status
//                 )}`}
//               >
//                 {contact.status}
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 truncate">{contact.email || userEmail}</p>
//             <p className="text-xs text-gray-600 truncate mt-1">
//               {contact.subject}
//             </p>
//           </div>
//         </div>

//         {/* Mobile Actions Dropdown */}
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
//                     onView(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
//                 >
//                   <Message className="w-4 h-4" />
//                   <span>View Inquiry</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                 >
//                   <Delete className="w-4 h-4" />
//                   <span>Delete Inquiry</span>
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
//         <div className="flex items-center space-x-1">
//           <Phone className="w-3 h-3" />
//           <span>{contact.phone || "No phone"}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Schedule className="w-3 h-3" />
//           <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Action buttons for larger mobile screens */}
//       <div className="flex gap-2 mt-3">
//         <button
//           onClick={() => onView(contact)}
//           className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <Message className="w-3 h-3" />
//           <span>View</span>
//         </button>
//         <button
//           onClick={() => onDelete(contact)}
//           className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <Delete className="w-3 h-3" />
//           <span>Delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Contact Management Component
// export const MyContactManagement = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [error, setError] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);

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

//   // Load contacts for current user
//   useEffect(() => {
//     if (isLoggedIn && userEmail) {
//       loadContacts();
//     }
//   }, [isLoggedIn, userEmail]);

//   // Filter contacts when search query changes
//   useEffect(() => {
//     filterContacts();
//   }, [contacts, searchQuery]);

//   const loadContacts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const contactData = await contactService.getMyContacts();
//       setContacts(contactData);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterContacts = () => {
//     let filtered = contacts;

//     // Filter by search query (name, email, subject, or company)
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (contact) =>
//           contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (contact.company &&
//             contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//     }

//     setFilteredContacts(filtered);
//   };

//   const handleCreateContact = async (contactData) => {
//     const newContact = await contactService.createContact(contactData);
//     setContacts((prev) => [...prev, newContact]);
//     return newContact;
//   };

//   const handleDeleteContact = async (id) => {
//     await contactService.deleteContact(id);
//     setContacts((prev) => prev.filter((contact) => contact.id !== id));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
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
//               You need to be logged in to view and manage your inquiries.
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
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <div className="flex">

//           {/* Main Content */}
//           <div className="flex-1 w-full">
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Header */}
//               <div className="mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                   <div className="mb-4 lg:mb-0">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Message className="w-6 h-6 text-blue-600" />
//                       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                         My Inquiries
//                       </h1>
//                     </div>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       Manage your personal inquiries and messages
//                     </p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <p className="text-sm text-gray-500">
//                         Logged in as: <span className="font-medium">{userEmail}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* View Mode Toggle */}
//                   <div className="flex items-center space-x-4">
//                     <span className="text-sm text-gray-600 hidden sm:block">
//                       View:
//                     </span>
//                     <div className="flex bg-gray-100 rounded-lg p-1">
//                       <button
//                         onClick={() => setViewMode("table")}
//                         className={`p-2 rounded-md transition-colors ${
//                           viewMode === "table"
//                             ? "bg-white shadow-sm text-blue-600"
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                         title="Table View"
//                       >
//                         <ViewHeadline className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode("grid")}
//                         className={`p-2 rounded-md transition-colors ${
//                           viewMode === "grid"
//                             ? "bg-white shadow-sm text-blue-600"
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                         title="Grid View"
//                       >
//                         <Person className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Cookie Information Banner */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">
//                         Personal Inquiry Mode
//                       </p>
//                       <p className="text-xs text-blue-600">
//                         Showing only your inquiries from email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={loadContacts}
//                     className="text-xs text-blue-700 hover:text-blue-900"
//                   >
//                     Refresh
//                   </button>
//                 </div>
//               </div>

//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Warning className="w-5 h-5 text-red-600" />
//                       <p className="text-red-600 text-sm">{error}</p>
//                     </div>
//                     <button
//                       onClick={() => setError("")}
//                       className="text-red-400 hover:text-red-600 text-lg"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Controls */}
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//                 <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                   {/* Search */}
//                   <div className="flex-1 max-w-2xl">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="text"
//                         placeholder="Search your inquiries..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                       />
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={loadContacts}
//                         disabled={loading}
//                         className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                         title="Refresh"
//                       >
//                         <Refresh
//                           className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                         />
//                       </button>

//                       <button
//                         onClick={() => setCreateModalOpen(true)}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                       >
//                         <Add className="w-4 h-4" />
//                         <span className="hidden sm:inline">New Inquiry</span>
//                         <span className="sm:hidden">Inquiry</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contacts Content */}
//               {loading ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <LoadingSpinner size="lg" text="Loading your inquiries..." />
//                   {userEmail && (
//                     <p className="text-sm text-gray-500 mt-2">
//                       For: {userEmail}
//                     </p>
//                   )}
//                 </div>
//               ) : filteredContacts.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No Inquiries Found
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base mb-4">
//                     {contacts.length === 0 
//                       ? "You haven't submitted any inquiries yet." 
//                       : "No inquiries match your current search."}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-6">
//                     Your email: {userEmail}
//                   </p>
//                   <button
//                     onClick={() => setCreateModalOpen(true)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Submit Your First Inquiry
//                   </button>
//                 </div>
//               ) : viewMode === "table" ? (
//                 /* Table View for md screens and up */
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-blue-50 border-b border-blue-200">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                             My Inquiry
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
//                             Subject
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden md:table-cell">
//                             Status
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
//                             Submitted
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredContacts.map((contact) => (
//                           <tr
//                             key={contact.id}
//                             className="hover:bg-blue-50 transition-colors"
//                           >
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                               <div className="flex items-center">
//                                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 relative">
//                                   <AccountCircle className="w-4 h-4 text-blue-600" />
//                                   <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                                 </div>
//                                 <div className="min-w-0">
//                                   <div className="flex items-center gap-2">
//                                     <div className="text-sm font-medium text-gray-900 truncate">
//                                       {contact.name}
//                                     </div>
//                                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                                       Me
//                                     </span>
//                                   </div>
//                                   <div className="text-sm text-gray-500 truncate">
//                                     {contact.email || userEmail}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
//                               <div className="text-sm text-gray-900 truncate max-w-[200px]">
//                                 {contact.subject}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
//                               <span
//                                 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                                   contact.status
//                                 )}`}
//                               >
//                                 {contact.status}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
//                               <div className="text-sm text-gray-500">
//                                 {new Date(
//                                   contact.createdAt
//                                 ).toLocaleDateString()}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedContact(contact);
//                                     setViewModalOpen(true);
//                                   }}
//                                   className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                   title="View inquiry"
//                                 >
//                                   <Message className="w-3 h-3" />
//                                   <span className="hidden xs:inline">View</span>
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedContact(contact);
//                                     setDeleteModalOpen(true);
//                                   }}
//                                   className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                                   title="Delete inquiry"
//                                 >
//                                   <Delete className="w-3 h-3" />
//                                   <span className="hidden xs:inline">
//                                     Delete
//                                   </span>
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ) : (
//                 /* Grid/Card View for mobile and when in grid mode */
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                   {filteredContacts.map((contact) => (
//                     <ContactCard
//                       key={contact.id}
//                       contact={contact}
//                       userEmail={userEmail}
//                       onView={(contact) => {
//                         setSelectedContact(contact);
//                         setViewModalOpen(true);
//                       }}
//                       onDelete={(contact) => {
//                         setSelectedContact(contact);
//                         setDeleteModalOpen(true);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         <CreateContactModal
//           isOpen={createModalOpen}
//           onClose={() => setCreateModalOpen(false)}
//           onCreate={handleCreateContact}
//           userEmail={userEmail}
//         />

//         <ViewContactModal
//           isOpen={viewModalOpen}
//           onClose={() => setViewModalOpen(false)}
//           contact={selectedContact}
//           userEmail={userEmail}
//         />

//         <DeleteConfirmationModal
//           isOpen={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={() =>
//             selectedContact && handleDeleteContact(selectedContact.id)
//           }
//           contact={selectedContact}
//           userEmail={userEmail}
//         />
//       </div>
//     </>
//   );
// };























// /* eslint-disable no-unused-vars */
// // components/ContactManagement.jsx
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
//   Email as EmailIcon,
//   Menu,
//   Phone,
//   Message,
//   Business,
//   Schedule,
//   AccountCircle,
//   Warning,
//   Info,
//   ArrowBack,
//   CheckCircle,
//   Close,
//   Error as ErrorIcon,
//   Archive,
//   Report
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

// // Axios instance with base configuration
// const api = axios.create({
//   baseURL: "https://ndizmusicprojectbackend.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API Service using Axios - Filtered by current user's email
// const contactService = {
//   // Get contacts for current user only
//   async getMyContacts() {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("No email found in cookies. Please log in again.");
//     }

//     try {
//       const response = await api.get("/api/contacts/contacts");
//       const data = response.data;

//       if (data.success) {
//         // Filter contacts by current user's email
//         const myContacts = data.data
//           .filter(contact => 
//             contact.email === userEmail
//           )
//           .map((contact) => ({
//             id: contact._id,
//             name: contact.name,
//             email: contact.email,
//             subject: contact.subject,
//             message: contact.message,
//             phone: contact.phone || "",
//             company: contact.company || "",
//             status: contact.status || "pending",
//             responseSent: contact.responseSent || false,
//             ipAddress: contact.ipAddress || "",
//             userAgent: contact.userAgent || "",
//             metadata: contact.metadata || {},
//             createdAt: contact.createdAt,
//             updatedAt: contact.updatedAt,
//             isCurrentUser: true
//           }));

//         return myContacts;
//       }
//       throw new Error(data.message || "Failed to fetch contacts");
//     } catch (error) {
//       console.error("API Error:", error);
//       // If API fails, return mock data for current user
//       return getMockContacts(userEmail);
//     }
//   },

//   // Create new contact - only for current user
//   async createContact(contactData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to create a contact");
//     }

//     // Validate data before sending
//     const validationErrors = validateContactData(contactData);
//     if (validationErrors.length > 0) {
//       throw new Error(validationErrors.join(', '));
//     }

//     const response = await api.post("/api/contacts/contact", {
//       ...contactData,
//       email: userEmail // Always use logged-in user's email
//     });
//     const data = response.data;

//     if (data.success) {
//       const contact = data.data;
//       return {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         message: contact.message,
//         phone: contact.phone || "",
//         company: contact.company || "",
//         status: contact.status || "pending",
//         responseSent: contact.responseSent || false,
//         ipAddress: contact.ipAddress || "",
//         userAgent: contact.userAgent || "",
//         metadata: contact.metadata || {},
//         createdAt: contact.createdAt,
//         updatedAt: contact.updatedAt,
//         isCurrentUser: true
//       };
//     }
//     throw new Error(data.message || "Failed to create contact");
//   },

//   // Update contact - only for current user
//   async updateContact(id, contactData) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to update a contact");
//     }

//     const response = await api.put(`/api/contacts/contacts/${id}`, {
//       ...contactData,
//       email: userEmail // Ensure email stays as current user
//     });
//     const data = response.data;

//     if (data.success) {
//       const contact = data.data;
//       return {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         message: contact.message,
//         phone: contact.phone || "",
//         company: contact.company || "",
//         status: contact.status,
//         responseSent: contact.responseSent || false,
//         ipAddress: contact.ipAddress || "",
//         userAgent: contact.userAgent || "",
//         metadata: contact.metadata || {},
//         createdAt: contact.createdAt,
//         updatedAt: contact.updatedAt,
//         isCurrentUser: true
//       };
//     }
//     throw new Error(data.message || "Failed to update contact");
//   },

//   // Delete contact - only for current user
//   async deleteContact(id) {
//     const userEmail = getEmailFromCookies();
//     if (!userEmail) {
//       throw new Error("You must be logged in to delete a contact");
//     }

//     const response = await api.delete(`/api/contacts/${id}`);
//     const data = response.data;

//     if (!data.success) {
//       throw new Error(data.message || "Failed to delete contact");
//     }
//     return data;
//   },
// };

// // Validation function matching the Mongoose schema
// const validateContactData = (contactData) => {
//   const errors = [];

//   // Validate name
//   if (!contactData.name || contactData.name.trim().length < 2) {
//     errors.push("Name must be at least 2 characters");
//   }
//   if (contactData.name && contactData.name.length > 100) {
//     errors.push("Name cannot exceed 100 characters");
//   }

//   // Validate subject
//   if (!contactData.subject || contactData.subject.trim().length < 5) {
//     errors.push("Subject must be at least 5 characters");
//   }
//   if (contactData.subject && contactData.subject.length > 200) {
//     errors.push("Subject cannot exceed 200 characters");
//   }

//   // Validate message
//   if (!contactData.message || contactData.message.trim().length < 10) {
//     errors.push("Message must be at least 10 characters");
//   }
//   if (contactData.message && contactData.message.length > 5000) {
//     errors.push("Message cannot exceed 5000 characters");
//   }

//   return errors;
// };

// // Mock contacts for current user
// const getMockContacts = (userEmail) => {
//   const userName = userEmail.split('@')[0];
//   return [
//     {
//       id: 1,
//       name: userName,
//       email: userEmail,
//       subject: "Inquiry about guitar lessons",
//       message: "Hello, I'm interested in starting guitar lessons. Can you provide more information about available time slots and pricing?",
//       phone: "+1 (555) 123-4567",
//       company: "Self-employed",
//       status: "pending",
//       responseSent: false,
//       ipAddress: "::1",
//       userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36",
//       metadata: {},
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       isCurrentUser: true
//     }
//   ];
// };

// // Loading Spinner Component
// const LoadingSpinner = ({ size = "md", text = "" }) => {
//   const sizeClasses = {
//     sm: "h-4 w-4",
//     md: "h-6 w-6",
//     lg: "h-8 w-8",
//   };

//   return (
//     <div className="flex items-center justify-center space-x-2">
//       <div
//         className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
//       ></div>
//       {text && <span className="text-sm">{text}</span>}
//     </div>
//   );
// };

// // Success Modal Component
// const SuccessModal = ({ isOpen, onClose, title, message }) => {
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
//             <div className="p-6 text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="text-green-600 text-2xl" />
//               </div>
              
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {title || "Success!"}
//               </h3>
              
//               <p className="text-gray-600 mb-6">
//                 {message || "Operation completed successfully."}
//               </p>

//               <button
//                 onClick={onClose}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
//               >
//                 Continue
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Error Modal Component
// const ErrorModal = ({ isOpen, onClose, title, message }) => {
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
//             <div className="p-6 text-center">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <ErrorIcon className="text-red-600 text-2xl" />
//               </div>
              
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {title || "Error!"}
//               </h3>
              
//               <p className="text-gray-600 mb-6">
//                 {message || "An error occurred. Please try again."}
//               </p>

//               <div className="flex space-x-3">
//                 <button
//                   onClick={onClose}
//                   className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
//                 >
//                   Reload Page
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Modal Components - Updated for personal use
// const CreateContactModal = ({ isOpen, onClose, onCreate, userEmail, onSuccess, onError }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     phone: "",
//     company: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [characterCount, setCharacterCount] = useState({
//     name: 0,
//     subject: 0,
//     message: 0
//   });

//   useEffect(() => {
//     if (userEmail) {
//       setFormData(prev => ({
//         ...prev,
//         email: userEmail
//       }));
//     }
//   }, [userEmail]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Update character count
//     if (name === 'name' || name === 'subject' || name === 'message') {
//       setCharacterCount(prev => ({
//         ...prev,
//         [name]: value.length
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Client-side validation
//       const validationErrors = validateContactData(formData);
//       if (validationErrors.length > 0) {
//         throw new Error(validationErrors.join(', '));
//       }

//       const newContact = await onCreate(formData);
//       setFormData({
//         name: "",
//         email: userEmail,
//         subject: "",
//         message: "",
//         phone: "",
//         company: "",
//       });
//       setCharacterCount({ name: 0, subject: 0, message: 0 });
//       onClose();
//       if (onSuccess) {
//         onSuccess(`Inquiry "${newContact.subject}" created successfully!`);
//       }
//     } catch (error) {
//       setError(error.message);
//       if (onError) {
//         onError(`Failed to create inquiry: ${error.message}`);
//       }
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
//             className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                     Submit Your Inquiry
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Creating inquiry with your email: {userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all duration-200"
//                 >
//                   <Close className="text-sm" />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Info className="w-4 h-4 text-blue-600" />
//                   <p className="text-sm text-blue-700">
//                     You're submitting an inquiry with your logged-in email
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Your Name * (2-100 characters)
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     maxLength={100}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your full name"
//                   />
//                   <div className="text-right text-xs text-gray-500 mt-1">
//                     {characterCount.name}/100 characters
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Your Email
//                   </label>
//                   <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
//                     <EmailIcon className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-700">{userEmail}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Email is read from your login cookies
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number (Optional)
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter your company name"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject * (5-200 characters)
//                 </label>
//                 <input
//                   type="text"
//                   name="subject"
//                   required
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   maxLength={200}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                   placeholder="Enter inquiry subject"
//                 />
//                 <div className="text-right text-xs text-gray-500 mt-1">
//                   {characterCount.subject}/200 characters
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Message * (10-5000 characters)
//                 </label>
//                 <textarea
//                   name="message"
//                   required
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   maxLength={5000}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
//                   placeholder="Enter your inquiry message..."
//                 />
//                 <div className="text-right text-xs text-gray-500 mt-1">
//                   {characterCount.message}/5000 characters
//                 </div>
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
//                   {loading ? "Submitting..." : "Submit Inquiry"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const ViewContactModal = ({ isOpen, onClose, contact, userEmail }) => {
//   if (!contact) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       case "spam":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "responded":
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case "archived":
//         return <Archive className="w-4 h-4 text-gray-600" />;
//       case "spam":
//         return <Report className="w-4 h-4 text-red-600" />;
//       default:
//         return <Schedule className="w-4 h-4 text-blue-600" />;
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
//             className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-4 sm:p-6 border-b bg-blue-50">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                     Your Inquiry Details
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Viewing inquiry from: {contact.email || userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all duration-200"
//                 >
//                   <Close className="text-sm" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6 space-y-6">
//               {/* User Info */}
//               <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                   <AccountCircle className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-blue-800">Your Inquiry</p>
//                   <p className="text-xs text-blue-600">
//                     Submitted with your logged-in email
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Your Name
//                   </label>
//                   <p className="text-gray-900">{contact.name}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Your Email
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <EmailIcon className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">{contact.email || userEmail}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">
//                       {contact.phone || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Company
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Business className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900">
//                       {contact.company || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subject
//                 </label>
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <p className="text-gray-900 font-medium">{contact.subject}</p>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Your Message
//                 </label>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <p className="text-gray-900 whitespace-pre-wrap">
//                     {contact.message}
//                   </p>
//                   <div className="text-right text-xs text-gray-500 mt-2">
//                     {contact.message.length}/5000 characters
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Status
//                   </label>
//                   <div className="flex items-center gap-2">
//                     {getStatusIcon(contact.status)}
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                         contact.status
//                       )}`}
//                     >
//                       {contact.status.charAt(0).toUpperCase() +
//                         contact.status.slice(1)}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {contact.responseSent ? "Response has been sent" : "Awaiting response"}
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Submitted On
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <Schedule className="w-4 h-4 text-gray-400" />
//                     <p className="text-gray-900 text-sm">
//                       {new Date(contact.createdAt).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Last updated: {new Date(contact.updatedAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Additional Information */}
//               {(contact.ipAddress || contact.userAgent || Object.keys(contact.metadata).length > 0) && (
//                 <div className="border-t pt-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h4>
//                   <div className="space-y-2">
//                     {contact.ipAddress && (
//                       <div className="text-xs text-gray-600">
//                         <span className="font-medium">IP Address:</span> {contact.ipAddress}
//                       </div>
//                     )}
//                     {contact.userAgent && (
//                       <div className="text-xs text-gray-600">
//                         <span className="font-medium">Browser:</span> {contact.userAgent.split(' ')[0]}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-end pt-4">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact, userEmail, onSuccess, onError }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleConfirm = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await onConfirm();
//       onClose();
//       if (onSuccess) {
//         onSuccess(`Inquiry "${contact.subject}" deleted successfully!`);
//       }
//     } catch (error) {
//       setError(error.message);
//       if (onError) {
//         onError(`Failed to delete inquiry: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && contact && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-lg w-full max-w-md mx-4"
//           >
//             <div className="p-4 sm:p-6 border-b bg-red-50">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-red-600">
//                     Delete Your Inquiry
//                   </h2>
//                   <p className="text-sm text-red-600 mt-1">
//                     This will delete your inquiry: {contact.subject}
//                   </p>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="bg-red-200 text-red-700 p-2 rounded-full hover:bg-red-300 transition-all duration-200"
//                   disabled={loading}
//                 >
//                   <Close className="text-sm" />
//                 </button>
//               </div>
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
//                       You're deleting your own inquiry
//                     </p>
//                     <p className="text-sm text-red-700 mt-1">
//                       Submitted with: {userEmail}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center gap-2">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     contact.status === 'responded' ? 'bg-green-100 text-green-800' :
//                     contact.status === 'archived' ? 'bg-gray-100 text-gray-800' :
//                     contact.status === 'spam' ? 'bg-red-100 text-red-800' :
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     Submitted: {new Date(contact.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-4 text-sm sm:text-base">
//                 Are you sure you want to delete your inquiry about <strong>"{contact.subject}"</strong>? 
//                 This action cannot be undone.
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
//                   {loading ? "Deleting..." : "Delete My Inquiry"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Contact Card Component for Mobile View - Updated for personal use
// const ContactCard = ({ contact, onView, onDelete, userEmail }) => {
//   const [showActions, setShowActions] = useState(false);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       case "spam":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "responded":
//         return <CheckCircle className="w-3 h-3 text-green-600" />;
//       case "archived":
//         return <Archive className="w-3 h-3 text-gray-600" />;
//       case "spam":
//         return <Report className="w-3 h-3 text-red-600" />;
//       default:
//         return <Schedule className="w-3 h-3 text-blue-600" />;
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 relative">
//             <AccountCircle className="w-5 h-5 text-blue-600" />
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center space-x-2 mb-1">
//               <h3 className="text-sm font-semibold text-gray-900 truncate">
//                 {contact.name}
//               </h3>
//               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                 Me
//               </span>
//             </div>
//             <div className="flex items-center gap-1 mb-1">
//               {getStatusIcon(contact.status)}
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   contact.status
//                 )}`}
//               >
//                 {contact.status}
//               </span>
//               {contact.responseSent && (
//                 <span className="text-xs text-green-600 flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" />
//                   Sent
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-500 truncate">{contact.email || userEmail}</p>
//             <p className="text-xs text-gray-600 truncate mt-1">
//               {contact.subject}
//             </p>
//           </div>
//         </div>

//         {/* Mobile Actions Dropdown */}
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
//                     onView(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
//                 >
//                   <Message className="w-4 h-4" />
//                   <span>View Inquiry</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                 >
//                   <Delete className="w-4 h-4" />
//                   <span>Delete Inquiry</span>
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
//         <div className="flex items-center space-x-1">
//           <Phone className="w-3 h-3" />
//           <span>{contact.phone || "No phone"}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Schedule className="w-3 h-3" />
//           <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Action buttons for larger mobile screens */}
//       <div className="flex gap-2 mt-3">
//         <button
//           onClick={() => onView(contact)}
//           className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <Message className="w-3 h-3" />
//           <span>View</span>
//         </button>
//         <button
//           onClick={() => onDelete(contact)}
//           className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <Delete className="w-3 h-3" />
//           <span>Delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Contact Management Component
// export const MyContactManagement = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [viewMode, setViewMode] = useState("table");
//   const [error, setError] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);

//   // Success/Error modal states
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [errorModalOpen, setErrorModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Statistics state
//   const [stats, setStats] = useState({
//     total: 0,
//     byStatus: {
//       pending: 0,
//       responded: 0,
//       archived: 0,
//       spam: 0
//     }
//   });

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

//   // Load contacts for current user
//   useEffect(() => {
//     if (isLoggedIn && userEmail) {
//       loadContacts();
//     }
//   }, [isLoggedIn, userEmail]);

//   // Calculate statistics when contacts change
//   useEffect(() => {
//     if (contacts.length > 0) {
//       const statusCount = {
//         pending: 0,
//         responded: 0,
//         archived: 0,
//         spam: 0
//       };
      
//       contacts.forEach(contact => {
//         if (statusCount[contact.status] !== undefined) {
//           statusCount[contact.status] += 1;
//         }
//       });
      
//       setStats({
//         total: contacts.length,
//         byStatus: statusCount
//       });
//     }
//   }, [contacts]);

//   // Filter contacts when search query or status filter changes
//   useEffect(() => {
//     filterContacts();
//   }, [contacts, searchQuery, statusFilter]);

//   const loadContacts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const contactData = await contactService.getMyContacts();
//       setContacts(contactData);
//     } catch (error) {
//       setError(error.message);
//       showError(`Failed to load inquiries: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterContacts = () => {
//     let filtered = contacts;

//     // Filter by search query (name, email, subject, or company)
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (contact) =>
//           contact.name.toLowerCase().includes(query) ||
//           contact.email.toLowerCase().includes(query) ||
//           contact.subject.toLowerCase().includes(query) ||
//           (contact.company && contact.company.toLowerCase().includes(query)) ||
//           contact.message.toLowerCase().includes(query)
//       );
//     }

//     // Filter by status
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((contact) => contact.status === statusFilter);
//     }

//     setFilteredContacts(filtered);
//   };

//   const handleCreateContact = async (contactData) => {
//     try {
//       const newContact = await contactService.createContact(contactData);
//       setContacts((prev) => [...prev, newContact]);
//       return newContact;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     try {
//       await contactService.deleteContact(id);
//       setContacts((prev) => prev.filter((contact) => contact.id !== id));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const showSuccess = (message) => {
//     setSuccessMessage(message);
//     setSuccessModalOpen(true);
//   };

//   const showError = (message) => {
//     setErrorMessage(message);
//     setErrorModalOpen(true);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "responded":
//         return "bg-green-100 text-green-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       case "spam":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "responded":
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case "archived":
//         return <Archive className="w-4 h-4 text-gray-600" />;
//       case "spam":
//         return <Report className="w-4 h-4 text-red-600" />;
//       default:
//         return <Schedule className="w-4 h-4 text-blue-600" />;
//     }
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
//               You need to be logged in to view and manage your inquiries.
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
//     <>
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
//         <div className="flex">

//           {/* Main Content */}
//           <div className="flex-1 w-full">
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Header */}
//               <div className="mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                   <div className="mb-4 lg:mb-0">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Message className="w-6 h-6 text-blue-600" />
//                       <h1 className="text-2xl sm:text-3xl font-bold text-white">
//                         My Inquiries
//                       </h1>
//                     </div>
//                     <p className="text-gray-100 text-sm sm:text-base">
//                       Manage your personal inquiries and messages
//                     </p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <p className="text-sm text-gray-100">
//                         Logged in as: <span className="font-medium">{userEmail}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* View Mode Toggle */}
//                   <div className="flex items-center space-x-4">
//                     <span className="text-sm text-gray-100 hidden sm:block">
//                       View:
//                     </span>
//                     <div className="flex bg-gray-100 rounded-lg p-1">
//                       <button
//                         onClick={() => setViewMode("table")}
//                         className={`p-2 rounded-md transition-colors ${
//                           viewMode === "table"
//                             ? "bg-white shadow-sm text-blue-600"
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                         title="Table View"
//                       >
//                         <ViewHeadline className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode("grid")}
//                         className={`p-2 rounded-md transition-colors ${
//                           viewMode === "grid"
//                             ? "bg-white shadow-sm text-blue-600"
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                         title="Grid View"
//                       >
//                         <Person className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Statistics */}
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
//                     <div className="text-sm text-gray-600">Total Inquiries</div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">{stats.byStatus.pending}</div>
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
//                       <Schedule className="w-3 h-3" />
//                       Pending
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-600">{stats.byStatus.responded}</div>
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
//                       <CheckCircle className="w-3 h-3" />
//                       Responded
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-600">{stats.byStatus.archived}</div>
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
//                       <Archive className="w-3 h-3" />
//                       Archived
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-red-600">{stats.byStatus.spam}</div>
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
//                       <Report className="w-3 h-3" />
//                       Spam
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Cookie Information Banner */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">
//                         Personal Inquiry Mode
//                       </p>
//                       <p className="text-xs text-blue-600">
//                         Showing only your inquiries from email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={loadContacts}
//                     className="text-xs text-blue-700 hover:text-blue-900"
//                   >
//                     Refresh
//                   </button>
//                 </div>
//               </div>

//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Warning className="w-5 h-5 text-red-600" />
//                       <p className="text-red-600 text-sm">{error}</p>
//                     </div>
//                     <button
//                       onClick={() => setError("")}
//                       className="text-red-400 hover:text-red-600 text-lg"
//                     >
//                       <Close className="text-white"/>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Controls */}
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//                 <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                   {/* Search */}
//                   <div className="flex-1 max-w-2xl">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="text"
//                         placeholder="Search your inquiries..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                       />
//                     </div>
//                   </div>

//                   {/* Status Filter */}
//                   <div className="flex gap-2">
//                     <select
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     >
//                       <option value="all">All Status</option>
//                       <option value="pending">Pending</option>
//                       <option value="responded">Responded</option>
//                       <option value="archived">Archived</option>
//                       <option value="spam">Spam</option>
//                     </select>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={loadContacts}
//                         disabled={loading}
//                         className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                         title="Refresh"
//                       >
//                         <Refresh
//                           className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                         />
//                       </button>

//                       <button
//                         onClick={() => setCreateModalOpen(true)}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                       >
//                         <Add className="w-4 h-4" />
//                         <span className="hidden sm:inline">New Inquiry</span>
//                         <span className="sm:hidden">Inquiry</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contacts Content */}
//               {loading ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <LoadingSpinner size="lg" text="Loading your inquiries..." />
//                   {userEmail && (
//                     <p className="text-sm text-gray-500 mt-2">
//                       For: {userEmail}
//                     </p>
//                   )}
//                 </div>
//               ) : filteredContacts.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No Inquiries Found
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base mb-4">
//                     {contacts.length === 0 
//                       ? "You haven't submitted any inquiries yet." 
//                       : "No inquiries match your current search or filter."}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-6">
//                     Your email: {userEmail}
//                   </p>
//                   <button
//                     onClick={() => setCreateModalOpen(true)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Submit Your First Inquiry
//                   </button>
//                 </div>
//               ) : viewMode === "table" ? (
//                 /* Table View for md screens and up */
//                 <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-blue-50 border-b border-blue-200">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                             My Inquiry
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
//                             Subject
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden md:table-cell">
//                             Status
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
//                             Submitted
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sm:px-6">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredContacts.map((contact) => (
//                           <tr
//                             key={contact.id}
//                             className="hover:bg-blue-50 transition-colors"
//                           >
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                               <div className="flex items-center">
//                                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 relative">
//                                   <AccountCircle className="w-4 h-4 text-blue-600" />
//                                   <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                                 </div>
//                                 <div className="min-w-0">
//                                   <div className="flex items-center gap-2">
//                                     <div className="text-sm font-medium text-gray-900 truncate">
//                                       {contact.name}
//                                     </div>
//                                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                                       Me
//                                     </span>
//                                   </div>
//                                   <div className="text-sm text-gray-500 truncate">
//                                     {contact.email || userEmail}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
//                               <div className="text-sm text-gray-900 truncate max-w-[200px]">
//                                 {contact.subject}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
//                               <div className="flex items-center gap-2">
//                                 {getStatusIcon(contact.status)}
//                                 <span
//                                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                                     contact.status
//                                   )}`}
//                                 >
//                                   {contact.status}
//                                 </span>
//                                 {contact.responseSent && (
//                                   <span className="text-xs text-green-600" title="Response sent">
//                                     <CheckCircle className="w-3 h-3" />
//                                   </span>
//                                 )}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
//                               <div className="text-sm text-gray-500">
//                                 {new Date(
//                                   contact.createdAt
//                                 ).toLocaleDateString()}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedContact(contact);
//                                     setViewModalOpen(true);
//                                   }}
//                                   className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                   title="View inquiry"
//                                 >
//                                   <Message className="w-3 h-3" />
//                                   <span className="hidden xs:inline">View</span>
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedContact(contact);
//                                     setDeleteModalOpen(true);
//                                   }}
//                                   className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                                   title="Delete inquiry"
//                                 >
//                                   <Delete className="w-3 h-3" />
//                                   <span className="hidden xs:inline">
//                                     Delete
//                                   </span>
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ) : (
//                 /* Grid/Card View for mobile and when in grid mode */
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                   {filteredContacts.map((contact) => (
//                     <ContactCard
//                       key={contact.id}
//                       contact={contact}
//                       userEmail={userEmail}
//                       onView={(contact) => {
//                         setSelectedContact(contact);
//                         setViewModalOpen(true);
//                       }}
//                       onDelete={(contact) => {
//                         setSelectedContact(contact);
//                         setDeleteModalOpen(true);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         <CreateContactModal
//           isOpen={createModalOpen}
//           onClose={() => setCreateModalOpen(false)}
//           onCreate={handleCreateContact}
//           userEmail={userEmail}
//           onSuccess={showSuccess}
//           onError={showError}
//         />

//         <ViewContactModal
//           isOpen={viewModalOpen}
//           onClose={() => setViewModalOpen(false)}
//           contact={selectedContact}
//           userEmail={userEmail}
//         />

//         <DeleteConfirmationModal
//           isOpen={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={() =>
//             selectedContact && handleDeleteContact(selectedContact.id)
//           }
//           contact={selectedContact}
//           userEmail={userEmail}
//           onSuccess={showSuccess}
//           onError={showError}
//         />

//         {/* Success and Error Modals */}
//         <SuccessModal
//           isOpen={successModalOpen}
//           onClose={() => setSuccessModalOpen(false)}
//           title="Success!"
//           message={successMessage}
//         />

//         <ErrorModal
//           isOpen={errorModalOpen}
//           onClose={() => setErrorModalOpen(false)}
//           title="Error!"
//           message={errorMessage}
//         />
//       </div>
//     </>
//   );
// };


























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
  CheckCircle,
  Close,
  Error as ErrorIcon,
  Archive,
  Report
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

// Responsive container classes
const containerClasses = {
  xsm: "px-2 py-2",
  sm: "sm:px-3 sm:py-3",
  md: "md:px-4 md:py-4",
  lg: "lg:px-6 lg:py-6",
  xl: "xl:px-8 xl:py-8",
};

// Responsive text classes
const textClasses = {
  xsm: "text-xs",
  sm: "sm:text-sm",
  md: "md:text-base",
  lg: "lg:text-lg",
  xl: "xl:text-xl",
};

// Responsive heading classes
const headingClasses = {
  xsm: "text-sm",
  sm: "sm:text-base",
  md: "md:text-lg",
  lg: "lg:text-xl",
  xl: "xl:text-2xl",
};

// Responsive button classes
const buttonClasses = {
  xsm: "px-2 py-1 text-xs",
  sm: "sm:px-3 sm:py-1.5 sm:text-sm",
  md: "md:px-4 md:py-2 md:text-base",
  lg: "lg:px-5 lg:py-2.5 lg:text-lg",
  xl: "xl:px-6 xl:py-3 xl:text-xl",
};

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
      const response = await api.get("/api/contacts/contacts");
      const data = response.data;

      if (data.success) {
        // Filter contacts by current user's email
        const myContacts = data.data
          .filter(contact => 
            contact.email === userEmail
          )
          .map((contact) => ({
            id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            phone: contact.phone || "",
            company: contact.company || "",
            status: contact.status || "pending",
            responseSent: contact.responseSent || false,
            ipAddress: contact.ipAddress || "",
            userAgent: contact.userAgent || "",
            metadata: contact.metadata || {},
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
            isCurrentUser: true
          }));

        return myContacts;
      }
      throw new Error(data.message || "Failed to fetch contacts");
    } catch (error) {
      console.error("API Error:", error);
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

    // Validate data before sending
    const validationErrors = validateContactData(contactData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    const response = await api.post("/api/contacts/contact", {
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
        phone: contact.phone || "",
        company: contact.company || "",
        status: contact.status || "pending",
        responseSent: contact.responseSent || false,
        ipAddress: contact.ipAddress || "",
        userAgent: contact.userAgent || "",
        metadata: contact.metadata || {},
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
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

    const response = await api.put(`/api/contacts/contacts/${id}`, {
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
        phone: contact.phone || "",
        company: contact.company || "",
        status: contact.status,
        responseSent: contact.responseSent || false,
        ipAddress: contact.ipAddress || "",
        userAgent: contact.userAgent || "",
        metadata: contact.metadata || {},
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
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

    const response = await api.delete(`/api/contacts/${id}`);
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to delete contact");
    }
    return data;
  },
};

// Validation function matching the Mongoose schema
const validateContactData = (contactData) => {
  const errors = [];

  // Validate name
  if (!contactData.name || contactData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  if (contactData.name && contactData.name.length > 100) {
    errors.push("Name cannot exceed 100 characters");
  }

  // Validate subject
  if (!contactData.subject || contactData.subject.trim().length < 5) {
    errors.push("Subject must be at least 5 characters");
  }
  if (contactData.subject && contactData.subject.length > 200) {
    errors.push("Subject cannot exceed 200 characters");
  }

  // Validate message
  if (!contactData.message || contactData.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }
  if (contactData.message && contactData.message.length > 5000) {
    errors.push("Message cannot exceed 5000 characters");
  }

  return errors;
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
      status: "pending",
      responseSent: false,
      ipAddress: "::1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36",
      metadata: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCurrentUser: true
    }
  ];
};

// Loading Spinner Component with responsive sizing
const LoadingSpinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "h-3 w-3 xsm:h-4 xsm:w-4 sm:h-5 sm:w-5",
    md: "h-4 w-4 xsm:h-5 xsm:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7",
    lg: "h-5 w-5 xsm:h-6 xsm:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
      ></div>
      {text && <span className="text-xs xsm:text-sm sm:text-base">{text}</span>}
    </div>
  );
};

// Success Modal Component - Centered and Responsive
const SuccessModal = ({ isOpen, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xsm:p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-[95%] xsm:max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto"
          >
            <div className="p-3 xsm:p-4 sm:p-5 md:p-6 text-center">
              <div className="w-12 h-12 xsm:w-14 xsm:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 xsm:mb-4">
                <CheckCircle className="text-green-600 text-xl xsm:text-2xl sm:text-3xl md:text-4xl" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2
                text-base xsm:text-lg sm:text-xl md:text-2xl">
                {title || "Success!"}
              </h3>
              
              <p className="text-gray-600 mb-4 xsm:mb-5 sm:mb-6
                text-xs xsm:text-sm sm:text-sm md:text-base">
                {message || "Operation completed successfully."}
              </p>

              <button
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200
                  py-2 xsm:py-2.5 sm:py-3
                  text-xs xsm:text-sm sm:text-sm md:text-base"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Error Modal Component - Centered and Responsive
const ErrorModal = ({ isOpen, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xsm:p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-[95%] xsm:max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto"
          >
            <div className="p-3 xsm:p-4 sm:p-5 md:p-6 text-center">
              <div className="w-12 h-12 xsm:w-14 xsm:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 xsm:mb-4">
                <ErrorIcon className="text-red-600 text-xl xsm:text-2xl sm:text-3xl md:text-4xl" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2
                text-base xsm:text-lg sm:text-xl md:text-2xl">
                {title || "Error!"}
              </h3>
              
              <p className="text-gray-600 mb-4 xsm:mb-5 sm:mb-6
                text-xs xsm:text-sm sm:text-sm md:text-base">
                {message || "An error occurred. Please try again."}
              </p>

              <div className="flex flex-col xsm:flex-row gap-2 xsm:gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200
                    py-2 xsm:py-2.5 sm:py-3
                    text-xs xsm:text-sm sm:text-sm md:text-base"
                >
                  Close
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200
                    py-2 xsm:py-2.5 sm:py-3
                    text-xs xsm:text-sm sm:text-sm md:text-base"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Modal Components - Updated for personal use - Centered and Responsive
const CreateContactModal = ({ isOpen, onClose, onCreate, userEmail, onSuccess, onError }) => {
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
  const [characterCount, setCharacterCount] = useState({
    name: 0,
    subject: 0,
    message: 0
  });

  useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({
        ...prev,
        email: userEmail
      }));
    }
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update character count
    if (name === 'name' || name === 'subject' || name === 'message') {
      setCharacterCount(prev => ({
        ...prev,
        [name]: value.length
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Client-side validation
      const validationErrors = validateContactData(formData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const newContact = await onCreate(formData);
      setFormData({
        name: "",
        email: userEmail,
        subject: "",
        message: "",
        phone: "",
        company: "",
      });
      setCharacterCount({ name: 0, subject: 0, message: 0 });
      onClose();
      if (onSuccess) {
        onSuccess(`Inquiry "${newContact.subject}" created successfully!`);
      }
    } catch (error) {
      setError(error.message);
      if (onError) {
        onError(`Failed to create inquiry: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xsm:p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-[95%] xsm:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto my-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-blue-50 z-10 p-3 xsm:p-4 sm:p-5 md:p-6 border-b">
              <div className="flex justify-between items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900 truncate
                    text-base xsm:text-lg sm:text-xl md:text-2xl">
                    Submit Your Inquiry
                  </h2>
                  <p className="text-gray-600 mt-1 truncate
                    text-xs xsm:text-xs sm:text-sm">
                    Creating inquiry with your email: {userEmail}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all duration-200 flex-shrink-0 ml-2
                    p-1 xsm:p-1.5 sm:p-2"
                >
                  <Close className="w-3 h-3 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 xsm:p-4 sm:p-5 md:p-6 space-y-3 xsm:space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 xsm:p-3">
                  <p className="text-red-600 text-xs xsm:text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 xsm:p-3">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3 xsm:w-4 xsm:h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-700 text-xs xsm:text-sm">
                    You're submitting an inquiry with your logged-in email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xsm:gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1
                    text-xs xsm:text-sm">
                    Your Name * (2-100 chars)
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      px-2 xsm:px-3 py-1.5 xsm:py-2
                      text-xs xsm:text-sm"
                    placeholder="Enter your full name"
                  />
                  <div className="text-right text-gray-500 mt-1
                    text-[10px] xsm:text-xs">
                    {characterCount.name}/100
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1
                    text-xs xsm:text-sm">
                    Your Email
                  </label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg bg-gray-50
                    px-2 xsm:px-3 py-1.5 xsm:py-2">
                    <EmailIcon className="text-gray-500 w-3 h-3 xsm:w-4 xsm:h-4 flex-shrink-0" />
                    <span className="text-gray-700 truncate text-xs xsm:text-sm">
                      {userEmail}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1 text-[10px] xsm:text-xs">
                    Email from your login
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xsm:gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1
                    text-xs xsm:text-sm">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      px-2 xsm:px-3 py-1.5 xsm:py-2
                      text-xs xsm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1
                    text-xs xsm:text-sm">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      px-2 xsm:px-3 py-1.5 xsm:py-2
                      text-xs xsm:text-sm"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1
                  text-xs xsm:text-sm">
                  Subject * (5-200 chars)
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  maxLength={200}
                  className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    px-2 xsm:px-3 py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
                  placeholder="Enter inquiry subject"
                />
                <div className="text-right text-gray-500 mt-1
                  text-[10px] xsm:text-xs">
                  {characterCount.subject}/200
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1
                  text-xs xsm:text-sm">
                  Your Message * (10-5000 chars)
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={5000}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
                    px-2 xsm:px-3 py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
                  placeholder="Enter your inquiry message..."
                />
                <div className="text-right text-gray-500 mt-1
                  text-[10px] xsm:text-xs">
                  {characterCount.message}/5000
                </div>
              </div>

              <div className="flex flex-col xsm:flex-row gap-2 xsm:gap-3 pt-3 xsm:pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50
                    py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50
                    py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
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
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "spam":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="w-3 h-3 xsm:w-4 xsm:h-4 text-green-600" />;
      case "archived":
        return <Archive className="w-3 h-3 xsm:w-4 xsm:h-4 text-gray-600" />;
      case "spam":
        return <Report className="w-3 h-3 xsm:w-4 xsm:h-4 text-red-600" />;
      default:
        return <Schedule className="w-3 h-3 xsm:w-4 xsm:h-4 text-blue-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xsm:p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-[95%] xsm:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto my-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-blue-50 z-10 p-3 xsm:p-4 sm:p-5 md:p-6 border-b">
              <div className="flex justify-between items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900 truncate
                    text-base xsm:text-lg sm:text-xl md:text-2xl">
                    Your Inquiry Details
                  </h2>
                  <p className="text-gray-600 mt-1 truncate
                    text-xs xsm:text-xs sm:text-sm">
                    Viewing inquiry from: {contact.email || userEmail}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all duration-200 flex-shrink-0 ml-2
                    p-1 xsm:p-1.5 sm:p-2"
                >
                  <Close className="w-3 h-3 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="p-3 xsm:p-4 sm:p-5 md:p-6 space-y-4 xsm:space-y-5 sm:space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-2 xsm:gap-3 p-2 xsm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex-shrink-0 w-8 h-8 xsm:w-10 xsm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <AccountCircle className="w-4 h-4 xsm:w-5 xsm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-blue-800 truncate
                    text-xs xsm:text-sm sm:text-base">
                    Your Inquiry
                  </p>
                  <p className="text-blue-600 truncate text-[10px] xsm:text-xs">
                    Submitted with your logged-in email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xsm:gap-4">
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Your Name
                  </label>
                  <p className="text-gray-900 break-words
                    text-sm xsm:text-base">
                    {contact.name}
                  </p>
                </div>
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Your Email
                  </label>
                  <div className="flex items-center gap-1 xsm:gap-2 min-w-0">
                    <EmailIcon className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4 flex-shrink-0" />
                    <p className="text-gray-900 truncate text-sm xsm:text-base">
                      {contact.email || userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xsm:gap-4">
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-1 xsm:gap-2">
                    <Phone className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4 flex-shrink-0" />
                    <p className="text-gray-900 text-sm xsm:text-base break-words">
                      {contact.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Company
                  </label>
                  <div className="flex items-center gap-1 xsm:gap-2">
                    <Business className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4 flex-shrink-0" />
                    <p className="text-gray-900 text-sm xsm:text-base break-words">
                      {contact.company || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-0.5 xsm:space-y-1">
                <label className="block font-medium text-gray-700
                  text-xs xsm:text-sm">
                  Subject
                </label>
                <div className="bg-gray-50 rounded-lg border border-gray-200
                  p-2 xsm:p-3">
                  <p className="text-gray-900 font-medium break-words
                    text-sm xsm:text-base">
                    {contact.subject}
                  </p>
                </div>
              </div>

              <div className="space-y-0.5 xsm:space-y-1">
                <label className="block font-medium text-gray-700
                  text-xs xsm:text-sm">
                  Your Message
                </label>
                <div className="bg-gray-50 rounded-lg border border-gray-200
                  p-2 xsm:p-3 sm:p-4">
                  <p className="text-gray-900 whitespace-pre-wrap break-words
                    text-xs xsm:text-sm sm:text-base">
                    {contact.message}
                  </p>
                  <div className="text-right text-gray-500 mt-1 xsm:mt-2
                    text-[10px] xsm:text-xs">
                    {contact.message.length}/5000 characters
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xsm:gap-4 pt-3 xsm:pt-4 border-t">
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Status
                  </label>
                  <div className="flex items-center gap-1 xsm:gap-2 flex-wrap">
                    {getStatusIcon(contact.status)}
                    <span
                      className={`inline-flex items-center px-1.5 xsm:px-2.5 py-0.5 rounded-full font-medium
                        text-[10px] xsm:text-xs ${getStatusColor(contact.status)}`}
                    >
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[10px] xsm:text-xs">
                    {contact.responseSent ? "Response has been sent" : "Awaiting response"}
                  </p>
                </div>
                <div className="space-y-0.5 xsm:space-y-1">
                  <label className="block font-medium text-gray-700
                    text-xs xsm:text-sm">
                    Submitted On
                  </label>
                  <div className="flex items-center gap-1 xsm:gap-2">
                    <Schedule className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4 flex-shrink-0" />
                    <p className="text-gray-900 text-[10px] xsm:text-xs sm:text-sm break-words">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <p className="text-gray-500 text-[10px] xsm:text-xs">
                    Last updated: {new Date(contact.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              {(contact.ipAddress || contact.userAgent || Object.keys(contact.metadata).length > 0) && (
                <div className="border-t pt-3 xsm:pt-4">
                  <h4 className="font-medium text-gray-700 mb-1 xsm:mb-2
                    text-xs xsm:text-sm">Additional Information</h4>
                  <div className="space-y-1 xsm:space-y-2">
                    {contact.ipAddress && (
                      <div className="text-[10px] xsm:text-xs text-gray-600 break-words">
                        <span className="font-medium">IP Address:</span> {contact.ipAddress}
                      </div>
                    )}
                    {contact.userAgent && (
                      <div className="text-[10px] xsm:text-xs text-gray-600 break-words">
                        <span className="font-medium">Browser:</span> {contact.userAgent.split(' ')[0]}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-3 xsm:pt-4">
                <button
                  onClick={onClose}
                  className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors
                    px-3 xsm:px-4 py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
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

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact, userEmail, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      onClose();
      if (onSuccess) {
        onSuccess(`Inquiry "${contact.subject}" deleted successfully!`);
      }
    } catch (error) {
      setError(error.message);
      if (onError) {
        onError(`Failed to delete inquiry: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && contact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xsm:p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-[95%] xsm:max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto"
          >
            <div className="p-3 xsm:p-4 sm:p-5 md:p-6 border-b bg-red-50">
              <div className="flex justify-between items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-red-600 truncate
                    text-base xsm:text-lg sm:text-xl md:text-2xl">
                    Delete Your Inquiry
                  </h2>
                  <p className="text-red-600 mt-1 truncate
                    text-xs xsm:text-xs sm:text-sm">
                    This will delete: {contact.subject}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-red-200 text-red-700 rounded-full hover:bg-red-300 transition-all duration-200 flex-shrink-0 ml-2
                    p-1 xsm:p-1.5 sm:p-2"
                  disabled={loading}
                >
                  <Close className="w-3 h-3 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="p-3 xsm:p-4 sm:p-5 md:p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 xsm:p-3 mb-3 xsm:mb-4">
                  <p className="text-red-600 text-xs xsm:text-sm">{error}</p>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-2 xsm:p-3 mb-3 xsm:mb-4">
                <div className="flex items-start gap-1 xsm:gap-2">
                  <Warning className="w-4 h-4 xsm:w-5 xsm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-medium text-red-800 text-xs xsm:text-sm">
                      You're deleting your own inquiry
                    </p>
                    <p className="text-red-700 mt-1 truncate text-[10px] xsm:text-xs">
                      Submitted with: {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1 xsm:space-y-2 mb-3 xsm:mb-4">
                <div className="flex items-center gap-1 xsm:gap-2 flex-wrap">
                  <span className={`px-1.5 xsm:px-2 py-0.5 rounded-full font-medium text-[10px] xsm:text-xs ${
                    contact.status === 'responded' ? 'bg-green-100 text-green-800' :
                    contact.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                    contact.status === 'spam' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                  <span className="text-gray-500 text-[10px] xsm:text-xs">
                    Submitted: {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 xsm:mb-5
                text-xs xsm:text-sm sm:text-base">
                Are you sure you want to delete your inquiry about <strong className="break-words">"{contact.subject}"</strong>? 
                This action cannot be undone.
              </p>

              <div className="flex flex-col xsm:flex-row gap-2 xsm:gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50
                    py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50
                    py-1.5 xsm:py-2
                    text-xs xsm:text-sm"
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

// Contact Card Component for Mobile View - Updated for personal use - Responsive
const ContactCard = ({ contact, onView, onDelete, userEmail }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "spam":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="w-2 h-2 xsm:w-3 xsm:h-3 text-green-600" />;
      case "archived":
        return <Archive className="w-2 h-2 xsm:w-3 xsm:h-3 text-gray-600" />;
      case "spam":
        return <Report className="w-2 h-2 xsm:w-3 xsm:h-3 text-red-600" />;
      default:
        return <Schedule className="w-2 h-2 xsm:w-3 xsm:h-3 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 shadow-sm
      p-2 xsm:p-3 sm:p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 xsm:space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 xsm:w-10 xsm:h-10 rounded-full bg-blue-100 flex items-center justify-center relative">
            <AccountCircle className="w-4 h-4 xsm:w-5 xsm:h-5 text-blue-600" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 xsm:w-3 xsm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 xsm:gap-2 mb-0.5 xsm:mb-1 flex-wrap">
              <h3 className="font-semibold text-gray-900 truncate max-w-[80px] xsm:max-w-[100px] sm:max-w-[120px]
                text-xs xsm:text-sm">
                {contact.name}
              </h3>
              <span className="bg-blue-100 text-blue-800 px-1.5 xsm:px-2 py-0.5 rounded-full
                text-[10px] xsm:text-xs">
                Me
              </span>
            </div>
            <div className="flex items-center gap-1 xsm:gap-2 mb-0.5 xsm:mb-1 flex-wrap">
              {getStatusIcon(contact.status)}
              <span
                className={`inline-flex items-center px-1.5 xsm:px-2 py-0.5 rounded-full font-medium
                  text-[10px] xsm:text-xs ${getStatusColor(contact.status)}`}
              >
                {contact.status}
              </span>
              {contact.responseSent && (
                <span className="text-green-600 flex items-center gap-0.5 xsm:gap-1 text-[10px] xsm:text-xs">
                  <CheckCircle className="w-2 h-2 xsm:w-3 xsm:h-3" />
                  Sent
                </span>
              )}
            </div>
            <p className="text-gray-500 truncate text-[10px] xsm:text-xs">
              {contact.email || userEmail}
            </p>
            <p className="text-gray-600 truncate mt-0.5 xsm:mt-1 text-[10px] xsm:text-xs">
              {contact.subject}
            </p>
          </div>
        </div>

        {/* Mobile Actions Dropdown */}
        <div className="relative flex-shrink-0 ml-1 xsm:ml-2">
          <button
            onClick={() => setShowActions(!showActions)}
            className="bg-gradient-to-t from-blue-400 to-blue-500 text-white transition-colors
              p-0.5 xsm:p-1"
          >
            <MoreVert className="w-3 h-3 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-6 xsm:top-7 sm:top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-24 xsm:min-w-28 sm:min-w-32"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onView(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-2 xsm:px-3 py-1.5 xsm:py-2 text-left bg-gradient-to-t from-green-400 to-green-500 text-white flex items-center space-x-1 xsm:space-x-2
                    text-[10px] xsm:text-xs"
                >
                  <FaEye className='text-white'/>
                </button>
                <button
                  onClick={() => {
                    onDelete(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-2 xsm:px-3 py-1.5 xsm:py-2 text-left bg-gradient-to-t from-red-400 to-red-500 text-white flex items-center space-x-1 xsm:space-x-2
                    text-[10px] xsm:text-xs"
                >
                  <Delete className="w-3 h-3 xsm:w-4 xsm:h-4" />
                 
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 xsm:mt-3 pt-2 xsm:pt-3 border-t border-gray-200 grid grid-cols-2 gap-1 xsm:gap-2 text-gray-600
        text-[10px] xsm:text-xs">
        <div className="flex items-center space-x-0.5 xsm:space-x-1 min-w-0">
          <Phone className="w-2.5 h-2.5 xsm:w-3 xsm:h-3 flex-shrink-0" />
          <span className="truncate">{contact.phone || "No phone"}</span>
        </div>
        <div className="flex items-center space-x-0.5 xsm:space-x-1 min-w-0">
          <Schedule className="w-2.5 h-2.5 xsm:w-3 xsm:h-3 flex-shrink-0" />
          <span className="truncate">{new Date(contact.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action buttons for larger mobile screens */}
      <div className="flex gap-1 xsm:gap-2 mt-2 xsm:mt-3">
        <button
          onClick={() => onView(contact)}
          className="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 text-white border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-0.5 xsm:space-x-1
            py-1 xsm:py-1.5
            text-[10px] xsm:text-xs"
        >
          <Message className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
      
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="flex-1 bg-gradient-to-t from-red-400 to-red-500 text-white border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-0.5 xsm:space-x-1
            py-1 xsm:py-1.5
            text-[10px] xsm:text-xs"
        >
          <Delete className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
          
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
  const [statusFilter, setStatusFilter] = useState("all");
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

  // Success/Error modal states
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Statistics state
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {
      pending: 0,
      responded: 0,
      archived: 0,
      spam: 0
    }
  });

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

  // Calculate statistics when contacts change
  useEffect(() => {
    if (contacts.length > 0) {
      const statusCount = {
        pending: 0,
        responded: 0,
        archived: 0,
        spam: 0
      };
      
      contacts.forEach(contact => {
        if (statusCount[contact.status] !== undefined) {
          statusCount[contact.status] += 1;
        }
      });
      
      setStats({
        total: contacts.length,
        byStatus: statusCount
      });
    }
  }, [contacts]);

  // Filter contacts when search query or status filter changes
  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, statusFilter]);

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const contactData = await contactService.getMyContacts();
      setContacts(contactData);
    } catch (error) {
      setError(error.message);
      showError(`Failed to load inquiries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search query (name, email, subject, or company)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.subject.toLowerCase().includes(query) ||
          (contact.company && contact.company.toLowerCase().includes(query)) ||
          contact.message.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  };

  const handleCreateContact = async (contactData) => {
    try {
      const newContact = await contactService.createContact(contactData);
      setContacts((prev) => [...prev, newContact]);
      return newContact;
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setSuccessModalOpen(true);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "spam":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="w-3 h-3 xsm:w-4 xsm:h-4 text-green-600" />;
      case "archived":
        return <Archive className="w-3 h-3 xsm:w-4 xsm:h-4 text-gray-600" />;
      case "spam":
        return <Report className="w-3 h-3 xsm:w-4 xsm:h-4 text-red-600" />;
      default:
        return <Schedule className="w-3 h-3 xsm:w-4 xsm:h-4 text-blue-600" />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center p-2 xsm:p-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-[90%] xsm:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          p-4 xsm:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
          <div className="text-center">
            <div className="w-12 h-12 xsm:w-14 xsm:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 xsm:mb-4 sm:mb-5 md:mb-6">
              <Warning className="w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-2
              text-base xsm:text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Login Required
            </h2>
            <p className="text-gray-600 mb-4 xsm:mb-5 sm:mb-6
              text-xs xsm:text-sm sm:text-sm md:text-base">
              You need to be logged in to view and manage your inquiries.
            </p>
            <div className="space-y-2 xsm:space-y-3">
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                  px-3 py-2 xsm:px-4 xsm:py-2.5 sm:px-5 sm:py-3
                  text-xs xsm:text-sm sm:text-sm md:text-base"
              >
                Go to Login Page
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors
                  px-3 py-2 xsm:px-4 xsm:py-2.5 sm:px-5 sm:py-3
                  text-xs xsm:text-sm sm:text-sm md:text-base"
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
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className={`
              ${containerClasses.xsm}
              ${containerClasses.sm}
              ${containerClasses.md}
              ${containerClasses.lg}
              ${containerClasses.xl}
            `}>
              {/* Header */}
              <div className="mb-4 xsm:mb-5 sm:mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-3 lg:mb-0">
                    <div className="flex items-center gap-1 xsm:gap-2 mb-1 xsm:mb-2">
                      <Message className="w-4 h-4 xsm:w-5 xsm:h-5 sm:w-6 sm:h-6 text-white" />
                      <h1 className="font-bold text-white
                        text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                        My Inquiries
                      </h1>
                    </div>
                    <p className="text-gray-100
                      text-xs xsm:text-sm sm:text-sm md:text-base lg:text-lg">
                      Manage your personal inquiries and messages
                    </p>
                    <div className="flex items-center gap-1 xsm:gap-2 mt-1 xsm:mt-2">
                      <div className="w-1.5 h-1.5 xsm:w-2 xsm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-gray-100 text-[10px] xsm:text-xs sm:text-sm">
                        Logged in as: <span className="font-medium">{userEmail}</span>
                      </p>
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2 xsm:space-x-3 sm:space-x-4">
                    <span className="text-gray-100 hidden sm:block text-sm md:text-base">
                      View:
                    </span>
                    <div className="flex bg-gray-100 rounded-lg p-0.5 xsm:p-1">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-1.5 xsm:p-2 rounded-md transition-colors ${
                          viewMode === "table"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        title="Table View"
                      >
                        <ViewHeadline className="w-3.5 h-3.5 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 xsm:p-2 rounded-md transition-colors ${
                          viewMode === "grid"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        title="Grid View"
                      >
                        <Person className="w-3.5 h-3.5 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics - Responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 xsm:gap-3 mb-4 xsm:mb-5 sm:mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 xsm:p-3 sm:p-4">
                  <div className="text-center">
                    <div className="font-bold text-blue-600
                      text-base xsm:text-lg sm:text-xl md:text-2xl">
                      {stats.total}
                    </div>
                    <div className="text-gray-600 text-[10px] xsm:text-xs sm:text-sm">
                      Total
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 xsm:p-3 sm:p-4">
                  <div className="text-center">
                    <div className="font-bold text-blue-600
                      text-base xsm:text-lg sm:text-xl md:text-2xl">
                      {stats.byStatus.pending}
                    </div>
                    <div className="text-gray-600 flex items-center justify-center gap-0.5 xsm:gap-1 text-[10px] xsm:text-xs sm:text-sm">
                      <Schedule className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                      Pending
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 xsm:p-3 sm:p-4">
                  <div className="text-center">
                    <div className="font-bold text-green-600
                      text-base xsm:text-lg sm:text-xl md:text-2xl">
                      {stats.byStatus.responded}
                    </div>
                    <div className="text-gray-600 flex items-center justify-center gap-0.5 xsm:gap-1 text-[10px] xsm:text-xs sm:text-sm">
                      <CheckCircle className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                      Responded
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 xsm:p-3 sm:p-4">
                  <div className="text-center">
                    <div className="font-bold text-gray-600
                      text-base xsm:text-lg sm:text-xl md:text-2xl">
                      {stats.byStatus.archived}
                    </div>
                    <div className="text-gray-600 flex items-center justify-center gap-0.5 xsm:gap-1 text-[10px] xsm:text-xs sm:text-sm">
                      <Archive className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                      Archived
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 xsm:p-3 sm:p-4">
                  <div className="text-center">
                    <div className="font-bold text-red-600
                      text-base xsm:text-lg sm:text-xl md:text-2xl">
                      {stats.byStatus.spam}
                    </div>
                    <div className="text-gray-600 flex items-center justify-center gap-0.5 xsm:gap-1 text-[10px] xsm:text-xs sm:text-sm">
                      <Report className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                      Spam
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Information Banner - Responsive */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 xsm:p-3 sm:p-4 mb-4 xsm:mb-5 sm:mb-6">
                <div className="flex flex-col xsm:flex-row items-start xsm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 xsm:gap-3">
                    <div className="w-1.5 h-1.5 xsm:w-2 xsm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="min-w-0">
                      <p className="font-medium text-blue-800 truncate
                        text-xs xsm:text-sm">
                        Personal Inquiry Mode
                      </p>
                      <p className="text-blue-600 truncate text-[10px] xsm:text-xs">
                        Showing only your inquiries from email: {userEmail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={loadContacts}
                    className="text-blue-700 hover:text-blue-900 text-[10px] xsm:text-xs"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Error Display - Responsive */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 xsm:p-3 sm:p-4 mb-4 xsm:mb-5 sm:mb-6">
                  <div className="flex items-start xsm:items-center justify-between gap-2">
                    <div className="flex items-start xsm:items-center gap-2 xsm:gap-3 min-w-0">
                      <Warning className="w-4 h-4 xsm:w-5 xsm:h-5 text-red-600 flex-shrink-0 mt-0.5 xsm:mt-0" />
                      <p className="text-red-600 text-xs xsm:text-sm break-words">
                        {error}
                      </p>
                    </div>
                    <button
                      onClick={() => setError("")}
                      className="text-red-400 hover:text-red-600 flex-shrink-0"
                    >
                      <Close className="w-3 h-3 xsm:w-4 xsm:h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Controls - Responsive */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 xsm:p-4 sm:p-5 mb-4 xsm:mb-5 sm:mb-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-2xl w-full">
                    <div className="relative">
                      <Search className="absolute left-2 xsm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400
                        w-3.5 h-3.5 xsm:w-4 xsm:h-4" />
                      <input
                        type="text"
                        placeholder="Search your inquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 xsm:pl-10 pr-3 xsm:pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          py-1.5 xsm:py-2
                          text-xs xsm:text-sm sm:text-sm text-black"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        px-2 xsm:px-3 py-1.5 xsm:py-2
                        text-xs xsm:text-sm sm:text-sm text-black"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                      <option value="spam">Spam</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 xsm:gap-3">
                    <button
                      onClick={loadContacts}
                      disabled={loading}
                      className="bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50
                        p-1.5 xsm:p-2"
                      title="Refresh"
                    >
                      <Refresh
                        className={`w-3.5 h-3.5 xsm:w-4 xsm:h-4 ${loading ? "animate-spin" : ""}`}
                      />
                    </button>

                    <button
                      onClick={() => setCreateModalOpen(true)}
                      className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 xsm:gap-2
                        px-2 xsm:px-3 py-1.5 xsm:py-2
                        text-xs xsm:text-sm"
                    >
                      <Add className="w-3.5 h-3.5 xsm:w-4 xsm:h-4" />
                      <span className="hidden xsm:inline">New Inquiry</span>
                      <span className="xsm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contacts Content */}
              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 xsm:p-6 sm:p-8 text-center">
                  <LoadingSpinner size="lg" text="Loading your inquiries..." />
                  {userEmail && (
                    <p className="text-gray-500 mt-2 text-xs xsm:text-sm">
                      For: {userEmail}
                    </p>
                  )}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center
                  p-4 xsm:p-6 sm:p-8 md:p-10 lg:p-12">
                  <Message className="mx-auto text-gray-400 mb-2
                    w-8 h-8 xsm:w-10 xsm:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                  <h3 className="font-medium text-gray-900 mb-2
                    text-sm xsm:text-base sm:text-lg md:text-xl">
                    No Inquiries Found
                  </h3>
                  <p className="text-gray-600 mb-3 xsm:mb-4
                    text-xs xsm:text-sm sm:text-sm md:text-base">
                    {contacts.length === 0 
                      ? "You haven't submitted any inquiries yet." 
                      : "No inquiries match your current search or filter."}
                  </p>
                  <p className="text-gray-500 mb-4 xsm:mb-5 sm:mb-6 text-[10px] xsm:text-xs sm:text-sm">
                    Your email: {userEmail}
                  </p>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                      px-3 xsm:px-4 py-1.5 xsm:py-2
                      text-xs xsm:text-sm"
                  >
                    Submit Your First Inquiry
                  </button>
                </div>
              ) : viewMode === "table" ? (
                /* Table View - Responsive */
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-blue-50 border-b border-blue-200">
                        <tr>
                          <th className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 text-left font-medium text-blue-700 uppercase tracking-wider
                            text-[10px] xsm:text-xs">
                            My Inquiry
                          </th>
                          <th className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 text-left font-medium text-blue-700 uppercase tracking-wider hidden lg:table-cell
                            text-[10px] xsm:text-xs">
                            Subject
                          </th>
                          <th className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 text-left font-medium text-blue-700 uppercase tracking-wider hidden md:table-cell
                            text-[10px] xsm:text-xs">
                            Status
                          </th>
                          <th className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 text-left font-medium text-blue-700 uppercase tracking-wider hidden xl:table-cell
                            text-[10px] xsm:text-xs">
                            Submitted
                          </th>
                          <th className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 text-left font-medium text-blue-700 uppercase tracking-wider
                            text-[10px] xsm:text-xs">
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
                            <td className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 sm:py-4 whitespace-nowrap">
                              <div className="flex items-center min-w-0">
                                <div className="flex-shrink-0 w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-1 xsm:mr-2 sm:mr-3 relative">
                                  <AccountCircle className="w-3 h-3 xsm:w-4 xsm:h-4 sm:w-5 sm:h-5 text-blue-600" />
                                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 xsm:w-2.5 xsm:h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1 xsm:gap-2 flex-wrap">
                                    <div className="font-medium text-gray-900 truncate max-w-[60px] xsm:max-w-[80px] sm:max-w-[100px]
                                      text-xs xsm:text-sm">
                                      {contact.name}
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 px-1 xsm:px-2 py-0.5 rounded-full
                                      text-[8px] xsm:text-[10px]">
                                      Me
                                    </span>
                                  </div>
                                  <div className="text-gray-500 truncate max-w-[80px] xsm:max-w-[100px] sm:max-w-[120px]
                                    text-[10px] xsm:text-xs">
                                    {contact.email || userEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                              <div className="text-gray-900 truncate max-w-[150px]
                                text-xs xsm:text-sm">
                                {contact.subject}
                              </div>
                            </td>
                            <td className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="flex items-center gap-1 xsm:gap-2">
                                {getStatusIcon(contact.status)}
                                <span
                                  className={`inline-flex items-center px-1.5 xsm:px-2.5 py-0.5 rounded-full font-medium
                                    text-[10px] xsm:text-xs ${getStatusColor(contact.status)}`}
                                >
                                  {contact.status}
                                </span>
                                {contact.responseSent && (
                                  <span className="text-green-600" title="Response sent">
                                    <CheckCircle className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 sm:py-4 whitespace-nowrap hidden xl:table-cell">
                              <div className="text-gray-500 text-[10px] xsm:text-xs">
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-2 xsm:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xsm:py-3 sm:py-4 whitespace-nowrap">
                              <div className="flex gap-1 xsm:gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setViewModalOpen(true);
                                  }}
                                  className=" bg-gradient-to-t from-blue-400 to-blue-500 text-white border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-0.5 xsm:space-x-1
                                    px-1.5 xsm:px-2 sm:px-3 py-0.5 xsm:py-1 sm:py-1.5
                                    text-[10px] xsm:text-xs"
                                  title="View inquiry"
                                >
                                  <Message className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                                 
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setDeleteModalOpen(true);
                                  }}
                                  className="bg-gradient-to-t from-red-500 to-red-700 text-white border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-0.5 xsm:space-x-1
                                    px-1.5 xsm:px-2 sm:px-3 py-0.5 xsm:py-1 sm:py-1.5
                                    text-[10px] xsm:text-xs"
                                  title="Delete inquiry"
                                >
                                  <Delete className="w-2.5 h-2.5 xsm:w-3 xsm:h-3" />
                                  
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
                /* Grid/Card View - Responsive grid */
                <div className="grid gap-2 xsm:gap-3 sm:gap-4 
                  grid-cols-1 xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        {/* Modals - All Centered and Responsive */}
        <CreateContactModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateContact}
          userEmail={userEmail}
          onSuccess={showSuccess}
          onError={showError}
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
          onSuccess={showSuccess}
          onError={showError}
        />

        {/* Success and Error Modals */}
        <SuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          title="Success!"
          message={successMessage}
        />

        <ErrorModal
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          title="Error!"
          message={errorMessage}
        />
      </div>
    </>
  );
};