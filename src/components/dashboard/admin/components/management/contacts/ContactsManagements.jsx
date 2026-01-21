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
} from "@mui/icons-material";

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://ndizmusicprojectbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service using Axios
const contactService = {
  // Get all contacts
  async getContacts() {
    const response = await api.get("/contacts");
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
// } from "@mui/icons-material";
// import { Sidebar } from "../../sidebar/Sidebar";

// // Axios instance with base configuration
// const api = axios.create({
//   baseURL: "https://ndizmusicprojectbackend.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API Service using Axios
// const contactService = {
//   // Get all contacts
//   async getContacts() {
//     const response = await api.get("/contacts");
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
// const CreateContactModal = ({ isOpen, onClose, onCreate }) => {
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
//       await onCreate(formData);
//       setFormData({
//         name: "",
//         email: "",
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
//             <div className="p-4 sm:p-6 border-b">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Create New Contact
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
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
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-blue-100 text-blue-800"
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

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact }) => {
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
//                   contact.status
//                 )}`}
//               >
//                 {contact.status}
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 truncate">{contact.email}</p>
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
//                   className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
//                 >
//                   <Message className="w-4 h-4" />
//                   <span>View</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(contact);
//                     setShowActions(false);
//                   }}
//                   className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                 >
//                   <Delete className="w-4 h-4" />
//                   <span>Delete</span>
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

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <div className="flex">
//           {/* Sidebar */}
//           <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//           {/* Main Content */}
//           <div className="flex-1 w-full">
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Header */}
//               <div className="mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                   <div className="mb-4 lg:mb-0">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                       Contact Management
//                     </h1>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       Manage and respond to customer inquiries
//                     </p>
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

//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                   <div className="flex items-center justify-between">
//                     <p className="text-red-600 text-sm">{error}</p>
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
//                                   title="View contact"
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
//                                   title="Delete contact"
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
//         />
//       </div>
//     </>
//   );
// };















































import React,{ useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FilterList,
  Mail,
  Visibility,
  VisibilityOff,
  Delete,
  CheckCircle,
  Cancel,
  Archive,
  Reply,
  AccessTime,
  Person,
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVert,
  Email,
  Phone,
  Subject,
  Message,
  ClearAll,
  MarkEmailRead,
  MarkEmailUnread,
  Send,
  Refresh,
  Dashboard,
  Menu,
  Close,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { Sidebar } from '../../sidebar/Sidebar';

export const ContactManagement = () => {
  // Initial sample data
  const initialMessages = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      subject: "piano",
      message: "I'm interested in beginner piano lessons for my 8-year-old daughter. We're looking for a patient instructor who can teach classical fundamentals while keeping it fun. Do you offer trial lessons? What's your availability on weekends?",
      timestamp: "2024-01-15T10:30:00",
      read: true,
      archived: false,
      replied: true,
      status: "replied"
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.j@email.com",
      phone: "+1 (555) 987-6543",
      subject: "guitar",
      message: "Looking for advanced guitar lessons. I have 3 years of experience with acoustic guitar and want to transition to electric. Need help with improvisation and music theory. Prefer evening sessions after 6 PM.",
      timestamp: "2024-01-16T14:20:00",
      read: true,
      archived: false,
      replied: false,
      status: "new"
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "r.chen@work.com",
      phone: "",
      subject: "vocal",
      message: "Need vocal training for upcoming performance in 3 months. I'm a beginner with no formal training. Available weekends only. Looking for breathing techniques and range expansion exercises.",
      timestamp: "2024-01-16T09:15:00",
      read: false,
      archived: false,
      replied: false,
      status: "new"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarahw@gmail.com",
      phone: "+1 (555) 456-7890",
      subject: "general",
      message: "General inquiry about group lesson rates and schedules for family of 3 (two adults, one teen). Interested in piano and guitar. Also curious about studio policies, cancellation terms, and package discounts.",
      timestamp: "2024-01-14T16:45:00",
      read: true,
      archived: true,
      replied: true,
      status: "archived"
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "mike.b@outlook.com",
      phone: "+1 (555) 321-0987",
      subject: "other",
      message: "Wondering if you offer songwriting classes alongside instrument lessons. I have basic guitar skills but want to learn song structure, lyric writing, and arrangement. Also interested in recording basics.",
      timestamp: "2024-01-17T11:00:00",
      read: false,
      archived: false,
      replied: false,
      status: "new"
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      email: "lisa.music@yahoo.com",
      phone: "+1 (555) 654-3210",
      subject: "piano",
      message: "Intermediate piano student looking to prepare for grade 5 ABRSM exams. Need help with sight-reading and aural tests specifically. Can do weekday mornings.",
      timestamp: "2024-01-17T15:45:00",
      read: false,
      archived: false,
      replied: false,
      status: "new"
    },
    {
      id: 7,
      name: "David Kim",
      email: "davidk@protonmail.com",
      phone: "+1 (555) 789-0123",
      subject: "guitar",
      message: "Complete beginner wanting to learn guitar for personal enjoyment. 40-year-old professional with no music background. Looking for patient teacher who works with adult beginners.",
      timestamp: "2024-01-16T18:30:00",
      read: true,
      archived: false,
      replied: true,
      status: "replied"
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [filteredMessages, setFilteredMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(initialMessages[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [replyForm, setReplyForm] = useState({
    subject: `Re: ${initialMessages[0].subject}`,
    message: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMessageList, setShowMessageList] = useState(true);
  const messagesPerPage = 5;

  // Breakpoint detection
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXSmall = windowWidth < 480;   // xsm: < 480px
  const isSmall = windowWidth < 640;    // sm: 480-639px
  const isMedium = windowWidth < 768;   // md: 640-767px
  const isLarge = windowWidth < 1024;   // lg: 768-1023px
  const isXLarge = windowWidth >= 1024; // xl: >= 1024px

  // Stats calculation
  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.read).length,
    new: messages.filter(m => m.status === 'new').length,
    archived: messages.filter(m => m.archived).length,
    replied: messages.filter(m => m.replied).length
  };

  // Filter and search messages
  useEffect(() => {
    let result = messages;
    
    // Apply status filter
    if (filter === 'unread') result = result.filter(m => !m.read);
    if (filter === 'new') result = result.filter(m => m.status === 'new');
    if (filter === 'archived') result = result.filter(m => m.archived);
    if (filter === 'replied') result = result.filter(m => m.replied);
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.message.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term)
      );
    }
    
    setFilteredMessages(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filter, messages]);

  // Responsive behavior for message selection
  useEffect(() => {
    if (isXLarge) {
      setShowMessageList(true);
    } else if (selectedMessage && !isXLarge) {
      setShowMessageList(false);
    }
  }, [selectedMessage, isXLarge]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // Mark as read when selected
    if (!message.read) {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, read: true, status: 'read' } : m
      ));
    }
    setReplyForm({
      subject: `Re: ${message.subject}`,
      message: ''
    });
    
    // On mobile, switch to message detail view
    if (!isXLarge) {
      setShowMessageList(false);
    }
  };

  const handleReplyChange = (e) => {
    setReplyForm({
      ...replyForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    alert(`Reply sent to ${selectedMessage.email}`);
    setMessages(prev => prev.map(m => 
      m.id === selectedMessage.id ? { ...m, replied: true } : m
    ));
    setReplyForm({ ...replyForm, message: '' });
  };

  const toggleArchive = (id) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, archived: !m.archived } : m
    ));
  };

  const toggleRead = (id) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, read: !m.read } : m
    ));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage.id === id && filteredMessages.length > 1) {
        setSelectedMessage(filteredMessages.find(m => m.id !== id));
      }
    }
  };

  const getSubjectLabel = (subject) => {
    const labels = {
      general: 'General Inquiry',
      piano: 'Piano Lessons',
      guitar: 'Guitar Lessons',
      vocal: 'Vocal Training',
      other: 'Other'
    };
    return labels[subject] || subject;
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      general: <Email className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      piano: <Dashboard className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      guitar: <Dashboard className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      vocal: <Person className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      other: <Subject className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
    };
    return icons[subject] || <Subject className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isXSmall) {
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric'
      });
    } else if (isSmall) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportMessages = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'messages-export.json';
    link.click();
  };

  // Mobile navigation
  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-md border-b">
      <div className="flex items-center justify-between p-3">
        <button
          onClick={() => setShowMessageList(!showMessageList)}
          className="p-2 rounded-lg bg-gray-100"
        >
          {showMessageList ? <ArrowForward /> : <ArrowBack />}
        </button>
        
        <h1 className="text-lg font-bold text-gray-900 truncate">
          {showMessageList ? 'Messages' : selectedMessage?.name || 'Message'}
        </h1>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-100"
        >
          {mobileMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-b z-40"
          >
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm"
                />
              </div>
              
              <div className="flex flex-wrap gap-1">
                {['all', 'unread', 'new', 'archived', 'replied'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => {
                      setFilter(filterType);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium capitalize ${
                      filter === filterType
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Contact Management
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Manage and respond to customer inquiries
                    </p>
                  </div>
    <div className="min-h-screen flex bg-gray-50 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">
      {/* Mobile Header */}
      <Sidebar/>
      <MobileHeader />
      
      {/* Main Content - Adjust padding top for mobile header */}
      <div className={`max-w-7xl mx-auto ${!isXLarge ? 'pt-16' : 'pt-0'}`}>
        {/* Desktop Header */}
        <div className={`${isXLarge ? 'mb-6 lg:mb-8' : 'hidden lg:block'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                <Mail className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-xl sm:text-2xl lg:text-3xl">Messages Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage and respond to customer inquiries
              </p>
            </div>
            <button
              onClick={exportMessages}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          {[
            { key: 'total', label: 'Total', value: stats.total, icon: Mail, color: 'purple' },
            { key: 'unread', label: 'Unread', value: stats.unread, icon: VisibilityOff, color: 'blue' },
            { key: 'new', label: 'New', value: stats.new, icon: AccessTime, color: 'green' },
            { key: 'archived', label: 'Archived', value: stats.archived, icon: Archive, color: 'gray' },
            { key: 'replied', label: 'Replied', value: stats.replied, icon: CheckCircle, color: 'purple' }
          ].map((stat) => (
            <div key={stat.key} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{stat.label}</p>
                  <p className={`text-lg sm:text-xl md:text-2xl font-bold text-${stat.color}-600 truncate`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`text-${stat.color}-600`} style={{ fontSize: isXSmall ? 20 : isSmall ? 24 : 32 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-6">
          {/* Messages List Column - Responsive Width */}
          <AnimatePresence>
            {(showMessageList || isXLarge) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`${
                  isXLarge 
                    ? 'w-full lg:w-1/3 xl:w-1/4' 
                    : 'fixed inset-0 z-40 bg-white pt-16'
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg border overflow-hidden h-full">
                  {/* Search and Filter - Desktop Only */}
                  <div className={`p-3 sm:p-4 border-b bg-gradient-to-r from-gray-50 to-white ${isXLarge ? '' : 'hidden lg:block'}`}>
                    <div className="relative mb-3 sm:mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FilterList className="text-gray-600 w-4 h-4" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Filter:</span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {filteredMessages.length} messages
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {[
                        { key: 'all', label: 'All', icon: <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> },
                        { key: 'unread', label: 'Unread', icon: <VisibilityOff className="w-3 h-3 sm:w-4 sm:h-4" /> },
                        { key: 'new', label: 'New', icon: <AccessTime className="w-3 h-3 sm:w-4 sm:h-4" /> },
                        { key: 'archived', label: 'Archived', icon: <Archive className="w-3 h-3 sm:w-4 sm:h-4" /> },
                        { key: 'replied', label: 'Replied', icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> }
                      ].map((filterType) => (
                        <button
                          key={filterType.key}
                          onClick={() => setFilter(filterType.key)}
                          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
                            filter === filterType.key
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filterType.icon}
                          <span className="hidden xs:inline">{filterType.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages List */}
                  <div className={`max-h-[calc(100vh-250px)] sm:max-h-[600px] overflow-y-auto ${!isXLarge ? 'pb-20' : ''}`}>
                    {currentMessages.length === 0 ? (
                      <div className="p-6 sm:p-8 text-center text-gray-500">
                        <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                        <p className="text-gray-600 text-sm sm:text-base">No messages found</p>
                        <button
                          onClick={() => { setSearchTerm(''); setFilter('all'); }}
                          className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-purple-600 hover:text-purple-700 flex items-center gap-1 sm:gap-2 mx-auto text-sm"
                        >
                          <Refresh className="w-3 h-3 sm:w-4 sm:h-4" />
                          Clear filters
                        </button>
                      </div>
                    ) : (
                      currentMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleSelectMessage(message)}
                          className={`p-3 sm:p-4 border-b cursor-pointer transition-all hover:bg-gray-50 ${
                            selectedMessage?.id === message.id 
                              ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-l-purple-600' 
                              : ''
                          } ${!message.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                <div className="flex items-center gap-1">
                                  <Person className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                  <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                                    {message.name}
                                  </h3>
                                </div>
                                {!message.read && (
                                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center gap-0.5">
                                    <VisibilityOff className="w-2 h-2 sm:w-3 sm:h-3" />
                                    <span className="hidden xs:inline">New</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                                <Email className="w-3 h-3" />
                                <span className="truncate">{message.email}</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full flex items-center truncate">
                                  {getSubjectIcon(message.subject)}
                                  <span className="truncate hidden xs:inline">
                                    {isXSmall ? message.subject.charAt(0).toUpperCase() : 
                                     isSmall ? getSubjectLabel(message.subject).split(' ')[0] : 
                                     getSubjectLabel(message.subject)}
                                  </span>
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                                {!isXSmall && <Message className="w-3 h-3 inline mr-1 text-gray-400" />}
                                {message.message}
                              </p>
                            </div>
                            <div className="text-right ml-1 sm:ml-2">
                              <span className="text-xs text-gray-500 flex items-center gap-0.5 sm:gap-1">
                                {!isXSmall && <CalendarToday className="w-3 h-3" />}
                                {formatDate(message.timestamp)}
                              </span>
                              <div className="flex gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleRead(message.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title={message.read ? "Mark as unread" : "Mark as read"}
                                >
                                  {message.read ? (
                                    <MarkEmailUnread className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                  ) : (
                                    <MarkEmailRead className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleArchive(message.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title={message.archived ? "Unarchive" : "Archive"}
                                >
                                  <Archive className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                    message.archived ? 'text-purple-600' : 'text-gray-500'
                                  }`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="p-2 sm:p-4 border-t bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="text-xs sm:text-sm text-gray-600">
                          {indexOfFirstMessage + 1}-{Math.min(indexOfLastMessage, filteredMessages.length)} of {filteredMessages.length}
                        </div>
                        <div className="flex gap-0.5 sm:gap-1">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1 sm:p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage === 1) {
                              pageNum = i + 1;
                            } else if (currentPage === totalPages) {
                              pageNum = totalPages - 2 + i;
                            } else {
                              pageNum = currentPage - 1 + i;
                            }
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm ${
                                  currentPage === pageNum
                                    ? 'bg-purple-600 text-white'
                                    : 'hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          {totalPages > 3 && (
                            <span className="px-1 sm:px-2 flex items-center text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-1 sm:p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message Detail & Reply Column */}
          <AnimatePresence>
            {(!showMessageList || isXLarge) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`${
                  isXLarge 
                    ? 'w-full lg:w-2/3 xl:w-3/4' 
                    : 'w-full'
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg border overflow-hidden h-full">
                  {selectedMessage ? (
                    <>
                      {/* Message Header */}
                      <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                        {/* Mobile Back Button */}
                        {!isXLarge && (
                          <button
                            onClick={() => setShowMessageList(true)}
                            className="mb-3 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2 text-sm"
                          >
                            <ArrowBack className="w-4 h-4" />
                            Back to messages
                          </button>
                        )}
                        
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-xl flex-shrink-0">
                                {selectedMessage.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1 sm:gap-2 truncate">
                                  {selectedMessage.name}
                                  {selectedMessage.replied && (
                                    <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                  )}
                                </h2>
                                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 mt-1">
                                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                                    <Email className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="truncate">{selectedMessage.email}</span>
                                  </div>
                                  {selectedMessage.phone && (
                                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                      <span className="truncate">{selectedMessage.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                              <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                                <Subject className="w-3 h-3 sm:w-4 sm:h-4" />
                                {getSubjectLabel(selectedMessage.subject)}
                              </span>
                              {!selectedMessage.read && (
                                <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                                  <VisibilityOff className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Unread
                                </span>
                              )}
                              {selectedMessage.replied && (
                                <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Replied
                                </span>
                              )}
                              <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                                <CalendarToday className="w-3 h-3 sm:w-4 sm:h-4" />
                                {formatDate(selectedMessage.timestamp)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 self-start">
                            <button
                              onClick={() => toggleArchive(selectedMessage.id)}
                              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
                              title={selectedMessage.archived ? "Unarchive" : "Archive"}
                            >
                              <Archive className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                selectedMessage.archived ? 'text-purple-600' : 'text-gray-500'
                              }`} />
                            </button>
                            <button
                              onClick={() => deleteMessage(selectedMessage.id)}
                              className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Delete className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="p-4 sm:p-6 border-b">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                          <Message className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                          Original Message
                        </h3>
                        <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-xl border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>

                      {/* Reply Form */}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                          <Reply className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                          Reply to {selectedMessage.name}
                        </h3>
                        <form onSubmit={handleSendReply} className="space-y-4 sm:space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1 sm:gap-2">
                              <Subject className="w-3 h-3 sm:w-4 sm:h-4" />
                              Subject
                            </label>
                            <input
                              type="text"
                              name="subject"
                              value={replyForm.subject}
                              onChange={handleReplyChange}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1 sm:gap-2">
                              <Message className="w-3 h-3 sm:w-4 sm:h-4" />
                              Your Response *
                            </label>
                            <textarea
                              name="message"
                              value={replyForm.message}
                              onChange={handleReplyChange}
                              rows={isXSmall ? 4 : 6}
                              required
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                              placeholder="Type your detailed response here..."
                            />
                          </div>

                          <div className="flex flex-col xs:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                            <button
                              type="button"
                              onClick={() => setReplyForm({ ...replyForm, message: '' })}
                              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base order-2 xs:order-1"
                            >
                              <ClearAll className="w-3 h-3 sm:w-4 sm:h-4" />
                              Clear
                            </button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="submit"
                              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base order-1 xs:order-2"
                            >
                              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                              Send Reply
                            </motion.button>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 sm:p-12 text-center">
                      <Mail className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 text-gray-300" />
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Message Selected</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Select a message from the list to view details and reply
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            <button
              onClick={() => setMessages(prev => prev.map(m => ({ ...m, read: true })))}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg sm:rounded-xl hover:from-blue-200 hover:to-blue-100 transition-all flex items-center gap-1 sm:gap-2 border border-blue-200 text-xs sm:text-sm md:text-base"
            >
              <MarkEmailRead className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              Mark All as Read
            </button>
            <button
              onClick={() => setMessages(prev => prev.filter(m => !m.archived))}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-lg sm:rounded-xl hover:from-purple-200 hover:to-purple-100 transition-all flex items-center gap-1 sm:gap-2 border border-purple-200 text-xs sm:text-sm md:text-base"
            >
              <Archive className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              Clear Archived
            </button>
          </div>
          
          {!isXSmall && (
            <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap gap-2 sm:gap-4 justify-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Unread messages</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-100 border border-purple-300 rounded"></div>
                <span>Selected message</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

