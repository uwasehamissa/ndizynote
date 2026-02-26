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
//   Email,
//   Menu,
//   Phone,
//   Message,
//   Business,
//   Schedule,
//   CheckCircle,
//   Error as ErrorIcon,
//   Close,
//   RemoveRedEye,
// } from "@mui/icons-material";

// // Axios instance with base configuration
// const api = axios.create({
//   baseURL: "https://ndizmusicprojectbackend.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Success/Fail Modal Component
// const FeedbackModal = ({ isOpen, onClose, type, title, message }) => {
//   const getIconAndColor = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <CheckCircle className="w-16 h-16 text-green-500" />,
//           bgColor: "bg-green-100",
//           textColor: "text-green-800",
//           borderColor: "border-green-200",
//         };
//       case "error":
//         return {
//           icon: <ErrorIcon className="w-16 h-16 text-red-500" />,
//           bgColor: "bg-red-100",
//           textColor: "text-red-800",
//           borderColor: "border-red-200",
//         };
//       case "warning":
//         return {
//           icon: <ErrorIcon className="w-16 h-16 text-yellow-500" />,
//           bgColor: "bg-yellow-100",
//           textColor: "text-yellow-800",
//           borderColor: "border-yellow-200",
//         };
//       default:
//         return {
//           icon: <CheckCircle className="w-16 h-16 text-blue-500" />,
//           bgColor: "bg-blue-100",
//           textColor: "text-blue-800",
//           borderColor: "border-blue-200",
//         };
//     }
//   };

//   const { icon, bgColor, textColor, borderColor } = getIconAndColor();

//   // Auto-close after 3 seconds for success messages
//   useEffect(() => {
//     if (isOpen && type === "success") {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, type, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black bg-opacity-50"
//             onClick={onClose}
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className={`relative w-full max-w-md rounded-lg shadow-xl ${bgColor} ${borderColor} border-2`}
//           >
//             {/* Close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <Close className="w-5 h-5" />
//             </button>

//             <div className="p-6 sm:p-8">
//               <div className="flex flex-col items-center text-center">
//                 {/* Icon */}
//                 <div className="mb-4">{icon}</div>

//                 {/* Title */}
//                 <h3
//                   className={`text-lg sm:text-xl font-semibold mb-2 ${textColor}`}
//                 >
//                   {title}
//                 </h3>

//                 {/* Message */}
//                 <p className="text-gray-700 text-sm sm:text-base mb-6">
//                   {message}
//                 </p>

//                 {/* OK Button for error/warning */}
//                 {(type === "error" || type === "warning") && (
//                   <button
//                     onClick={onClose}
//                     className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                       type === "error"
//                         ? "bg-red-600 hover:bg-red-700 text-white"
//                         : "bg-yellow-600 hover:bg-yellow-700 text-white"
//                     }`}
//                   >
//                     OK
//                   </button>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
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
//         className={`animate-spin rounded-full border-b-2 border-white ${sizeClasses[size]}`}
//       ></div>
//       {text && <span className="text-sm">{text}</span>}
//     </div>
//   );
// };

// // Modal Components
// const CreateContactModal = ({
//   isOpen,
//   onClose,
//   onCreate,
//   onSuccess,
//   onError,
// }) => {
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "https://ndizmusicprojectbackend.onrender.com/api/contacts/contact",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("Contact sent:", res.data);

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//         phone: "",
//         company: "",
//       });

//       // Call success callback
//       if (onSuccess) {
//         onSuccess("Contact created successfully!");
//       }

//       onClose();
//     } catch (error) {
//       console.error("Contact error:", error.response?.data);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to send message";

//       setError(errorMessage);

//       // Call error callback
//       if (onError) {
//         onError(errorMessage);
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
//             <div className="p-4 sm:p-6 border-b">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Create New Contact
//               </h2>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="p-4 sm:p-6 space-y-4 text-black"
//             >
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter email address"
//                   />
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
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.company}
//                     onChange={(e) =>
//                       setFormData({ ...formData, company: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                     placeholder="Enter company name"
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
//                   placeholder="Enter subject"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message *
//                 </label>
//                 <textarea
//                   required
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
//                   placeholder="Enter message"
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
//                   {loading ? "Creating..." : "Create Contact"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// const ViewContactModal = ({ isOpen, onClose, contact }) => {
//   if (!contact) return null;

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
//             <div className="p-4 sm:p-6 border-b">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Contact Details
//               </h2>
//             </div>

//             <div className="p-4 sm:p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <p className="text-gray-900">{contact.name}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <p className="text-gray-900">{contact.email}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <p className="text-gray-900">
//                     {contact.phone || "Not provided"}
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Company
//                   </label>
//                   <p className="text-gray-900">
//                     {contact.company || "Not provided"}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subject
//                 </label>
//                 <p className="text-gray-900">{contact.subject}</p>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Message
//                 </label>
//                 <div className="bg-gray-50 rounded-lg p-4">
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
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       contact.status === "responded"
//                         ? "bg-green-100 text-green-800"
//                         : contact.status === "in-progress"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {contact.status.charAt(0).toUpperCase() +
//                       contact.status.slice(1)}
//                   </span>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Received
//                   </label>
//                   <p className="text-gray-900 text-sm">
//                     {new Date(contact.createdAt).toLocaleDateString()}
//                   </p>
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

// const DeleteConfirmationModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   contact,
//   onSuccess,
//   onError,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleConfirm = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await onConfirm();
//       if (onSuccess) {
//         onSuccess("Contact deleted successfully!");
//       }
//     } catch (error) {
//       const errorMessage = error.message || "Failed to delete contact";
//       setError(errorMessage);
//       if (onError) {
//         onError(errorMessage);
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
//             <div className="p-4 sm:p-6 border-b">
//               <h2 className="text-lg sm:text-xl font-semibold text-red-600">
//                 Delete Contact
//               </h2>
//             </div>

//             <div className="p-4 sm:p-6">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <p className="text-gray-700 mb-4 text-sm sm:text-base">
//                 Are you sure you want to delete the contact from{" "}
//                 <strong>{contact.name}</strong>? This action cannot be undone.
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
//                   {loading ? "Deleting..." : "Delete Contact"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Contact Card Component for Mobile View
// const ContactCard = ({ contact, onView, onDelete }) => {
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
//     <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//             <Person className="w-5 h-5 text-blue-600" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center space-x-2 mb-1">
//               <h3 className="text-sm font-semibold text-gray-900 truncate">
//                 {contact.name}
//               </h3>
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   contact.status,
//                 )}`}
//               >
//                 {contact.status}
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 truncate">{contact.email}</p>
//             <p className="text-xs text-gray-600 truncate mt-1">
//               {contact.subject?.slice(0, 30)}
//             </p>
//           </div>
//         </div>

//         {/* Mobile Actions Dropdown */}
//         <div className="relative flex-shrink-0">
//           <div
//             onClick={() => setShowActions(!showActions)}
//             className="p-1 bg-gradient-to-t from-green-400 to-green-500 text-white transition-colors"
//           >
//             <MoreVert className="w-5 h-5" />
//           </div>

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
//                   className="w-full px-3 py-2 text-left text-sm bg-gradient-to-t from-blue-400 to-indigo-500 text-white flex items-center space-x-2"
//                 >
//                   <RemoveRedEye className="w-4 h-4" />

//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm bg-gradient-to-t from-red-500 to-red-600 text-white flex items-center space-x-2"
//                 >
//                   <Delete className="w-4 h-4" />

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
//           className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-blue-400 to-indigo-500 text-white border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <RemoveRedEye className="w-3 h-3" />

//         </button>
//         <button
//           onClick={() => onDelete(contact)}
//           className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-red-500 to-red-600 text-white border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <Delete className="w-3 h-3" />

//         </button>
//       </div>
//     </div>
//   );
// };

// // API Service using Axios
// const contactService = {
//   // Get all contacts
//   async getContacts() {
//     const response = await api.get("/api/contacts/contacts");
//     const data = response.data;

//     if (data.success) {
//       return data.data.map((contact) => ({
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         message: contact.message,
//         phone: contact.phone,
//         company: contact.company,
//         status: contact.status || "new",
//         createdAt: contact.createdAt,
//       }));
//     }
//     throw new Error(data.message || "Failed to fetch contacts");
//   },

//   // Create new contact
//   async createContact(contactData) {
//     const response = await api.post("/contacts", contactData);
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
//       };
//     }
//     throw new Error(data.message || "Failed to create contact");
//   },

//   // Update contact
//   async updateContact(id, contactData) {
//     const response = await api.put(`/contacts/${id}`, contactData);
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
//       };
//     }
//     throw new Error(data.message || "Failed to update contact");
//   },

//   // Delete contact
//   async deleteContact(id) {
//     const response = await api.delete(`/contacts/${id}`);
//     const data = response.data;

//     if (!data.success) {
//       throw new Error(data.message || "Failed to delete contact");
//     }
//   },
// };

// // Main Contact Management Component
// export const ContactManagement = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [error, setError] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);

//   // Feedback modal state
//   const [feedbackModal, setFeedbackModal] = useState({
//     isOpen: false,
//     type: "success", // "success", "error", "warning"
//     title: "",
//     message: "",
//   });

//   const showFeedback = (type, title, message) => {
//     setFeedbackModal({
//       isOpen: true,
//       type,
//       title,
//       message,
//     });
//   };

//   const hideFeedback = () => {
//     setFeedbackModal({
//       ...feedbackModal,
//       isOpen: false,
//     });
//   };

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

//   // Load contacts on component mount
//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // Filter contacts when search query changes
//   useEffect(() => {
//     filterContacts();
//   }, [contacts, searchQuery]);

//   const loadContacts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const contactData = await contactService.getContacts();
//       setContacts(contactData);
//       showFeedback("success", "Success!", "Contacts loaded successfully!");
//     } catch (error) {
//       const errorMessage = error.message || "Failed to load contacts";
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
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
//             contact.company.toLowerCase().includes(searchQuery.toLowerCase())),
//       );
//     }

//     setFilteredContacts(filtered);
//   };

//   const handleCreateContact = async (contactData) => {
//     try {
//       const newContact = await contactService.createContact(contactData);
//       setContacts((prev) => [...prev, newContact]);
//       showFeedback("success", "Success!", "Contact created successfully!");
//       return newContact;
//     } catch (error) {
//       const errorMessage = error.message || "Failed to create contact";
//       showFeedback("error", "Error!", errorMessage);
//       throw error;
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     try {
//       await contactService.deleteContact(id);
//       setContacts((prev) => prev.filter((contact) => contact.id !== id));
//       showFeedback("success", "Success!", "Contact deleted successfully!");
//     } catch (error) {
//       const errorMessage = error.message || "Failed to delete contact";
//       showFeedback("error", "Error!", errorMessage);
//       throw error;
//     }
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

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
//         <div className="flex">
//           {/* Main Content */}
//           <div className="flex-1 w-full">
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Header */}
//               <div className="mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                   <div className="mb-4 lg:mb-0">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                       Contact Management
//                     </h1>
//                     <p className="text-gray-100 text-sm sm:text-base">
//                       Manage and respond to customer inquiries
//                     </p>
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

//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                   <div className="flex items-center justify-between">
//                     <p className="text-red-600 text-sm">{error}</p>
//                     <button
//                       onClick={() => setError("")}
//                       className="bg-gradient-to-t from-red-500 to-red-700 text-white text-lg"
//                     >
//                       <Close className="w-4 h-4" />
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
//                         placeholder="Search by name, email, subject, or company..."
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
//                         className="p-2 bg-gradient-to-t from-blue-400 to-blue-500 text-white rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                         title="Refresh"
//                       >
//                         <Refresh
//                           className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                         />
//                       </button>

//                       <button
//                         onClick={() => setCreateModalOpen(true)}
//                         className="px-3 py-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
//                       >
//                         <Add className="w-4 h-4" />
//                         <span className="hidden sm:inline">New Contact</span>
//                         <span className="sm:hidden">Add</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contacts Content */}
//               {loading ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//                   <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                     Loading contacts...
//                   </p>
//                 </div>
//               ) : filteredContacts.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     {searchQuery
//                       ? "No contacts match your search"
//                       : "No contacts found"}
//                   </p>
//                   {searchQuery && (
//                     <p className="text-sm text-gray-500 mt-1">
//                       Try adjusting your search
//                     </p>
//                   )}
//                 </div>
//               ) : viewMode === "table" ? (
//                 /* Table View for md screens and up */
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-gray-50 border-b border-gray-200">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                             Contact
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
//                             Subject
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
//                             Status
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
//                             Received
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredContacts.map((contact) => (
//                           <tr
//                             key={contact.id}
//                             className="hover:bg-gray-50 transition-colors"
//                           >
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                               <div className="flex items-center">
//                                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
//                                   <Person className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <div className="min-w-0">
//                                   <div className="text-sm font-medium text-gray-900 truncate">
//                                     {contact.name}
//                                   </div>
//                                   <div className="text-sm text-gray-500 truncate">
//                                     {contact.email}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
//                               <div className="text-sm text-gray-900 truncate max-w-[200px]">
//                                 {contact.subject?.slice(0, 30)}
//                                 {contact.subject && contact.subject.length > 30
//                                   ? "..."
//                                   : ""}
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
//                               <span
//                                 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                                   contact.status,
//                                 )}`}
//                               >
//                                 {contact.status}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
//                               <div className="text-sm text-gray-500">
//                                 {new Date(
//                                   contact.createdAt,
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
//                                   className="px-3 py-1 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                   title="View contact"
//                                 >
//                                   <RemoveRedEye className="w-3 h-3" />
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedContact(contact);
//                                     setDeleteModalOpen(true);
//                                   }}
//                                   className="px-3 py-1 bg-gradient-to-t from-red-500 to-red-600 text-white transition-colors flex items-center space-x-1 text-sm"
//                                   title="Delete contact"
//                                 >
//                                   <Delete className="w-3 h-3" />
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
//           onSuccess={(message) => showFeedback("success", "Success!", message)}
//           onError={(message) => showFeedback("error", "Error!", message)}
//         />

//         <ViewContactModal
//           isOpen={viewModalOpen}
//           onClose={() => setViewModalOpen(false)}
//           contact={selectedContact}
//         />

//         <DeleteConfirmationModal
//           isOpen={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={() =>
//             selectedContact && handleDeleteContact(selectedContact.id)
//           }
//           contact={selectedContact}
//           onSuccess={(message) => showFeedback("success", "Success!", message)}
//           onError={(message) => showFeedback("error", "Error!", message)}
//         />

//         {/* Feedback Modal */}
//         <FeedbackModal
//           isOpen={feedbackModal.isOpen}
//           onClose={hideFeedback}
//           type={feedbackModal.type}
//           title={feedbackModal.title}
//           message={feedbackModal.message}
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
  Email,
  Menu,
  Phone,
  Message,
  Business,
  Schedule,
  CheckCircle,
  Error as ErrorIcon,
  Close,
  RemoveRedEye,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://ndizmusicprojectbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Success/Fail Modal Component
const FeedbackModal = ({ isOpen, onClose, type, title, message }) => {
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <ErrorIcon className="w-16 h-16 text-red-500" />,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: <ErrorIcon className="w-16 h-16 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: <CheckCircle className="w-16 h-16 text-blue-500" />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
        };
    }
  };

  const { icon, bgColor, textColor, borderColor } = getIconAndColor();

  // Auto-close after 3 seconds for success messages
  useEffect(() => {
    if (isOpen && type === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md rounded-lg shadow-xl ${bgColor} ${borderColor} border-2`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-gradient-to-t from-red-500 to-red-700 text-white transition-colors"
            >
              <Close className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4">{icon}</div>

                {/* Title */}
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-2 ${textColor}`}
                >
                  {title}
                </h3>

                {/* Message */}
                <p className="text-gray-700 text-sm sm:text-base mb-6">
                  {message}
                </p>

                {/* OK Button for error/warning */}
                {(type === "error" || type === "warning") && (
                  <button
                    onClick={onClose}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      type === "error"
                        ? "bg-gradient-to-t from-red-500 to-red-600 text-white"
                        : "bg-gradient-to-t from-yellow-500 to-yellow-600 text-white"
                    }`}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
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
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

// Modal Components
const CreateContactModal = ({
  isOpen,
  onClose,
  onCreate,
  onSuccess,
  onError,
}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://ndizmusicprojectbackend.onrender.com/api/contacts/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Contact sent:", res.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        company: "",
      });

      // Call success callback
      if (onSuccess) {
        onSuccess("Contact created successfully!");
      }

      onClose();
    } catch (error) {
      console.error("Contact error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to send message";

      setError(errorMessage);

      // Call error callback
      if (onError) {
        onError(errorMessage);
      }
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
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Create New Contact
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4 text-black"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter email address"
                  />
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
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter company name"
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
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Enter message"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Creating..." : "Create Contact"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ViewContactModal = ({ isOpen, onClose, contact }) => {
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
            <div className="p-4 sm:p-6 border-b flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Contact Details
              </h2>
              <button
                onClick={onClose}
                className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
              >
                <Close className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900 font-medium">{contact.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{contact.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {contact.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <p className="text-gray-900">
                    {contact.company || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <p className="text-gray-900 font-medium">{contact.subject}</p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Message
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
                      contact.status,
                    )}`}
                  >
                    {contact.status.charAt(0).toUpperCase() +
                      contact.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Received
                  </label>
                  <p className="text-gray-900 text-sm">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
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

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  contact,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      if (onSuccess) {
        onSuccess("Contact deleted successfully!");
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to delete contact";
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
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
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600">
                Delete Contact
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Are you sure you want to delete the contact from{" "}
                <strong>{contact.name}</strong>? This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Deleting..." : "Delete Contact"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Contact Card Component for Mobile View
const ContactCard = ({ contact, onView, onDelete }) => {
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Person className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {contact.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  contact.status,
                )}`}
              >
                {contact.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">{contact.email}</p>
            <p className="text-xs text-gray-600 truncate mt-1">
              {contact.subject?.slice(0, 30)}
              {contact.subject && contact.subject.length > 30 ? "..." : ""}
            </p>
          </div>
        </div>

        {/* Mobile Actions Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-lg transition-colors"
          >
            <MoreVert className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onView(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm bg-gradient-to-t from-blue-500 to-blue-600 text-white flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700"
                >
                  <RemoveRedEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onDelete(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm bg-gradient-to-t from-red-500 to-red-600 text-white flex items-center space-x-2 hover:from-red-600 hover:to-red-700"
                >
                  <Delete className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <Phone className="w-3 h-3" />
          <span className="truncate">{contact.phone || "No phone"}</span>
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
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1"
        >
          <RemoveRedEye className="w-3 h-3" />
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-1"
        >
          <Delete className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// API Service using Axios
const contactService = {
  // Get all contacts
  async getContacts() {
    const response = await api.get("/api/contacts/contacts");
    const data = response.data;

    if (data.success) {
      return data.data.map((contact) => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status || "new",
        createdAt: contact.createdAt,
      }));
    }
    throw new Error(data.message || "Failed to fetch contacts");
  },

  // Create new contact
  async createContact(contactData) {
    const response = await api.post("/contacts", contactData);
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
      };
    }
    throw new Error(data.message || "Failed to create contact");
  },

  // Update contact
  async updateContact(id, contactData) {
    const response = await api.put(`/contacts/${id}`, contactData);
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
      };
    }
    throw new Error(data.message || "Failed to update contact");
  },

  // Delete contact
  async deleteContact(id) {
    const response = await api.delete(`/contacts/${id}`);
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to delete contact");
    }
  },
};

// Main Contact Management Component
export const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({
    table: 7,
    grid: 12,
  });

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Feedback modal state
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const showFeedback = (type, title, message) => {
    setFeedbackModal({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const hideFeedback = () => {
    setFeedbackModal({
      ...feedbackModal,
      isOpen: false,
    });
  };

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

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts when search query changes
  useEffect(() => {
    filterContacts();
    setCurrentPage(1); // Reset to first page when search changes
  }, [contacts, searchQuery]);

  // Check if we need to move to next page when items per page changes
  useEffect(() => {
    const currentItemsPerPage =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const totalPages = Math.ceil(filteredContacts.length / currentItemsPerPage);

    // If current page is greater than total pages, go to last page
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredContacts.length, viewMode, itemsPerPage, currentPage]);

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const contactData = await contactService.getContacts();
      setContacts(contactData);
      showFeedback("success", "Success!", "Contacts loaded successfully!");
    } catch (error) {
      const errorMessage = error.message || "Failed to load contacts";
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
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
            contact.company.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    setFilteredContacts(filtered);
  };

  const handleCreateContact = async (contactData) => {
    try {
      const newContact = await contactService.createContact(contactData);
      setContacts((prev) => [...prev, newContact]);
      showFeedback("success", "Success!", "Contact created successfully!");
      return newContact;
    } catch (error) {
      const errorMessage = error.message || "Failed to create contact";
      showFeedback("error", "Error!", errorMessage);
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      showFeedback("success", "Success!", "Contact deleted successfully!");
    } catch (error) {
      const errorMessage = error.message || "Failed to delete contact";
      showFeedback("error", "Error!", errorMessage);
      throw error;
    }
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

  // Pagination functions
  const getCurrentItems = () => {
    const itemsPerPageCurrent =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const indexOfLastItem = currentPage * itemsPerPageCurrent;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCurrent;
    return filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(
    filteredContacts.length /
      (viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid),
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination component
  const PaginationControls = () => {
    const itemsPerPageCurrent =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-gradient-to-t from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-gradient-to-t from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPageCurrent + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * itemsPerPageCurrent,
                  filteredContacts.length,
                )}
              </span>{" "}
              of <span className="font-medium">{filteredContacts.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400"
                    : "bg-gradient-to-t from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;

                // Show first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        isCurrentPage
                          ? "z-10 bg-gradient-to-t from-blue-600 to-blue-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                // Show ellipsis
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={pageNumber}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400"
                    : "bg-gradient-to-t from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  // Get current items based on pagination
  const currentItems = getCurrentItems();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Contact Management
                    </h1>
                    <p className="text-gray-100 text-sm sm:text-base">
                      Manage and respond to customer inquiries
                    </p>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-100 hidden sm:block">
                      View:
                    </span>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "table"
                            ? "bg-gradient-to-t from-blue-500 to-blue-600 text-white"
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
                            ? "bg-gradient-to-t from-blue-500 to-blue-600 text-white"
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

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 text-sm">{error}</p>
                    <button
                      onClick={() => setError("")}
                      className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
                    >
                      <Close className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name, email, subject, or company..."
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
                        className="p-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-3 py-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Add className="w-4 h-4" />
                        <span className="hidden sm:inline">New Contact</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts Content */}
              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Loading contacts...
                  </p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {searchQuery
                      ? "No contacts match your search"
                      : "No contacts found"}
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {viewMode === "table" ? (
                    /* Table View for md screens and up */
                    <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Contact
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                                Subject
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                                Received
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((contact) => (
                              <tr
                                key={contact.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <Person className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-medium text-gray-900 truncate">
                                        {contact.name}
                                      </div>
                                      <div className="text-sm text-gray-500 truncate">
                                        {contact.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                                  <div className="text-sm text-gray-900 truncate max-w-[200px]">
                                    {contact.subject?.slice(0, 30)}
                                    {contact.subject &&
                                    contact.subject.length > 30
                                      ? "..."
                                      : ""}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      contact.status,
                                    )}`}
                                  >
                                    {contact.status}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                                  <div className="text-sm text-gray-500">
                                    {new Date(
                                      contact.createdAt,
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
                                      className="px-3 py-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-1 text-sm"
                                      title="View contact"
                                    >
                                      <RemoveRedEye className="w-3 h-3" />
                                   
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedContact(contact);
                                        setDeleteModalOpen(true);
                                      }}
                                      className="px-3 py-1 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-1 text-sm"
                                      title="Delete contact"
                                    >
                                      <Delete className="w-3 h-3" />
                                     
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
                      {currentItems.map((contact) => (
                        <ContactCard
                          key={contact.id}
                          contact={contact}
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

                  {/* Pagination Controls */}
                  {filteredContacts.length > 0 && <PaginationControls />}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateContactModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateContact}
          onSuccess={(message) => showFeedback("success", "Success!", message)}
          onError={(message) => showFeedback("error", "Error!", message)}
        />

        <ViewContactModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          contact={selectedContact}
        />

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() =>
            selectedContact && handleDeleteContact(selectedContact.id)
          }
          contact={selectedContact}
          onSuccess={(message) => showFeedback("success", "Success!", message)}
          onError={(message) => showFeedback("error", "Error!", message)}
        />

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackModal.isOpen}
          onClose={hideFeedback}
          type={feedbackModal.type}
          title={feedbackModal.title}
          message={feedbackModal.message}
        />
      </div>
    </>
  );
};
