// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Close as CloseIcon,
//   CheckCircle,
//   Email as EmailIcon,
//   Person,
//   Phone,
//   Search,
//   FilterList,
//   Menu as MenuIcon,
//   Refresh,
//   MoreVert,
//   Check as CheckIcon,
//   Clear as ClearIcon,
//   Block,
//   Pause,
//   PlayArrow,
//   AccessTime,
//   Error as ErrorIcon,
//   Warning as WarningIcon,
//   CheckCircleOutline,
//   Mail,
//   ContentCopy,
//   Send,
//   Download
// } from '@mui/icons-material';

// const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// // Create axios instance with security features
// const api = axios.create({
//   baseURL: API_BASE_URL
// });

// // Add request interceptor
// api.interceptors.request.use(
//   (config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     config.headers['Accept'] = 'application/json';
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// api.interceptors.response.use(
//   (response) => {
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//   },
//   (error) => {
//     console.error('Response Error:', error);
    
//     if (error.code === 'ECONNABORTED') {
//       throw new Error('Request timeout. Please try again.');
//     }
    
//     if (!error.response) {
//       throw new Error('Network error. Please check your connection.');
//     }
    
//     if (error.response.status === 401) {
//       throw new Error('Unauthorized. Please login.');
//     }
    
//     if (error.response.status === 403) {
//       throw new Error('Access denied.');
//     }
    
//     if (error.response.status === 404) {
//       throw new Error('Resource not found.');
//     }
    
//     if (error.response.status === 500) {
//       throw new Error('Server error. Please try again later.');
//     }
    
//     const errorMessage = error.response?.data?.message || 
//                         error.response?.data?.error ||
//                         error.message ||
//                         'An unexpected error occurred';
    
//     throw new Error(errorMessage);
//   }
// );

// // Function to get user email from cookies
// const getUserEmailFromCookies = () => {
//   const cookies = document.cookie.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith('userEmail=')) {
//       return decodeURIComponent(cookie.substring('userEmail='.length));
//     }
//     // You might also check for other common cookie names
//     if (cookie.startsWith('email=')) {
//       return decodeURIComponent(cookie.substring('email='.length));
//     }
//     if (cookie.startsWith('user_email=')) {
//       return decodeURIComponent(cookie.substring('user_email='.length));
//     }
//   }
//   return null;
// };

// // Success/Fail Modal Component
// const FeedbackModal = ({ isOpen, onClose, type, title, message }) => {
//   const getIconAndColor = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />,
//           bgColor: "bg-green-100",
//           textColor: "text-green-800",
//           borderColor: "border-green-200",
//         };
//       case "error":
//         return {
//           icon: <ErrorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />,
//           bgColor: "bg-red-100",
//           textColor: "text-red-800",
//           borderColor: "border-red-200",
//         };
//       case "warning":
//         return {
//           icon: <WarningIcon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />,
//           bgColor: "bg-yellow-100",
//           textColor: "text-yellow-800",
//           borderColor: "border-yellow-200",
//         };
//       default:
//         return {
//           icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />,
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
//         <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[9999]">
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
//             className={`relative w-full max-w-xs sm:max-w-md rounded-lg shadow-xl ${bgColor} ${borderColor} border-2`}
//           >
//             {/* Close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>

//             <div className="p-4 sm:p-6">
//               <div className="flex flex-col items-center text-center">
//                 {/* Icon */}
//                 <div className="mb-3 sm:mb-4">
//                   {icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${textColor}`}>
//                   {title}
//                 </h3>

//                 {/* Message */}
//                 <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6 break-words">
//                   {message}
//                 </p>

//                 {/* OK Button for error/warning */}
//                 {(type === "error" || type === "warning") && (
//                   <button
//                     onClick={onClose}
//                     className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
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

// // Validation functions
// const validateEmailData = (data) => {
//   const errors = [];
  
//   if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//     errors.push('Valid email address is required');
//   }
  
//   return errors;
// };

// // Sanitize data function
// const sanitizeEmailData = (data) => {
//   const sanitized = { ...data };
  
//   // Trim and lowercase email
//   if (sanitized.email) {
//     sanitized.email = sanitized.email.trim().toLowerCase();
//   }
  
//   return sanitized;
// };

// // Status Options - Updated to match model
// const statusOptions = [
//   { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="text-xs" /> },
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <AccessTime className="text-xs" /> },
//   { value: 'unsubscribed', label: 'Unsubscribed', color: 'bg-red-100 text-red-800', icon: <ClearIcon className="text-xs" /> }
// ];

// export const UserSubscriptionManagement = () => {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
  
//   // Modal States
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showExportModal, setShowExportModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
  
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [exportFormat, setExportFormat] = useState('json');
  
//   // Feedback modal state
//   const [feedbackModal, setFeedbackModal] = useState({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchByUserEmail, setSearchByUserEmail] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     email: '',
//     status: 'pending'
//   });

//   // Bulk emails state
//   const [bulkEmails, setBulkEmails] = useState('');
//   const [bulkStatus, setBulkStatus] = useState('pending');

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

//   // Clear error
//   const clearError = () => {
//     setError(null);
//   };

//   // Get user email from cookies on component mount
//   useEffect(() => {
//     const emailFromCookie = getUserEmailFromCookies();
//     if (emailFromCookie) {
//       setUserEmail(emailFromCookie);
//       setSearchTerm(emailFromCookie);
//       setSearchByUserEmail(true);
//     }
//   }, []);

//   // Fetch all emails
//   const fetchEmails = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Fetching emails from API...');
//       const response = await api.get(`/newsletter/${encodeURIComponent(userEmail)}`);
      
//       let emailsData = [];
      
//       if (response.status === 200 && response.data) {
//         if (Array.isArray(response.data)) {
//           emailsData = response.data;
//         } else if (response.data.emails && Array.isArray(response.data.emails)) {
//           emailsData = response.data.emails;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//           emailsData = response.data.data;
//         } else if (response.data && typeof response.data === 'object') {
//           // Try to extract array from object
//           emailsData = Object.values(response.data).filter(item => 
//             item && typeof item === 'object' && item.email
//           );
//         }
//       }
      
//       // Sort by creation date, newest first
//       const sortedData = emailsData.sort((a, b) => {
//         const dateA = new Date(a.createdAt || 0);
//         const dateB = new Date(b.createdAt || 0);
//         return dateB - dateA;
//       });
      
//       setEmails(sortedData);
      
//     } catch (error) {
//       console.error('Error fetching emails:', error);
//       setError(error.message);
//       showFeedback("error", "Error!", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmails();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       email: '',
//       status: 'pending'
//     });
//   };

//   // Create email subscription
//   const handleCreateEmail = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     setError(null);

//     try {
//       // Validate data
//       const validationErrors = validateEmailData(formData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       // Sanitize data
//       const sanitizedData = sanitizeEmailData(formData);
      
//       console.log('Creating email subscription with data:', sanitizedData);
      
//       // Send to API
//       const response = await api.post('/newsletter', sanitizedData);
      
//       // Handle response
//       let newEmail;
      
//       if (response.data && response.data.data) {
//         newEmail = response.data.data;
//       } else if (response.data && response.data.email) {
//         newEmail = response.data.email;
//       } else {
//         newEmail = response.data;
//       }

//       // Add to state (newest first)
//       setEmails(prev => [newEmail, ...prev]);
      
//       // Reset form and close modal
//       setShowCreateModal(false);
//       resetForm();
      
//       // Show success message
//       showFeedback("success", "Success!", "Email subscription created successfully!");
      
//     } catch (error) {
//       console.error('Error creating email subscription:', error);
//       const errorMessage = error.message || 'Failed to create email subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open edit modal
//   const handleEditEmail = (email) => {
//     setSelectedEmail(email);
//     setFormData({
//       email: email.email || '',
//       status: email.status || 'pending'
//     });
//     setShowEditModal(true);
//   };

//   // Update email subscription
//   const handleUpdateEmail = async (e) => {
//     e.preventDefault();
//     if (!selectedEmail) return;

//     setActionLoading(true);
//     setError(null);
    
//     try {
//       // Validate data
//       const validationErrors = validateEmailData(formData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       // Sanitize data
//       const sanitizedData = sanitizeEmailData(formData);
      
//       // Get email ID
//       const emailId = selectedEmail._id || selectedEmail.id;
      
//       if (!emailId) {
//         throw new Error('Email ID is required for update');
//       }

//       console.log('Updating email:', emailId, sanitizedData);
      
//       // Send to API
//       const response = await api.put(`/newsletter/${emailId}`, sanitizedData);
      
//       // Handle response
//       let updatedEmail;
      
//       if (response.data && response.data.data) {
//         updatedEmail = response.data.data;
//       } else if (response.data && response.data.email) {
//         updatedEmail = response.data.email;
//       } else {
//         updatedEmail = response.data;
//       }

//       // Update state
//       setEmails(prev => prev.map(email => 
//         (email._id === selectedEmail._id || email.id === selectedEmail.id) 
//           ? updatedEmail 
//           : email
//       ));
      
//       // Close modal
//       setShowEditModal(false);
//       setSelectedEmail(null);
//       resetForm();
      
//       // Show success message
//       showFeedback("success", "Success!", "Email subscription updated successfully!");
      
//     } catch (error) {
//       console.error('Error updating email:', error);
//       const errorMessage = error.message || 'Failed to update email subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Quick status update
//   const handleQuickStatusUpdate = async (emailId, newStatus) => {
//     setActionLoading(true);
//     setError(null);
    
//     try {
//       // Find email
//       const email = emails.find(e => 
//         (e._id === emailId || e.id === emailId)
//       );
      
//       if (!email) {
//         throw new Error('Email not found');
//       }

//       console.log('Updating status for email:', emailId, newStatus);
      
//       // Send to API
//       const response = await api.patch(`/newsletter/${emailId}`, { 
//         status: newStatus 
//       });
      
//       // Handle response
//       let updatedEmail;
      
//       if (response.data && response.data.data) {
//         updatedEmail = response.data.data;
//       } else if (response.data && response.data.email) {
//         updatedEmail = response.data.email;
//       } else {
//         updatedEmail = response.data;
//       }

//       // Update state
//       setEmails(prev => prev.map(email => 
//         (email._id === emailId || email.id === emailId) 
//           ? updatedEmail 
//           : email
//       ));
      
//       // Show success message
//       showFeedback("success", "Success!", `Email status updated to ${newStatus}!`);
      
//     } catch (error) {
//       console.error('Error updating status:', error);
//       const errorMessage = error.message || 'Failed to update status';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation
//   const handleDeleteClick = (email) => {
//     setSelectedEmail(email);
//     setShowDeleteModal(true);
//   };

//   // Delete email subscription
//   const handleDeleteEmail = async () => {
//     if (!selectedEmail) return;

//     setActionLoading(true);
//     setError(null);

//     try {
//       // Get email ID
//       const emailId = selectedEmail._id || selectedEmail.id;
      
//       if (!emailId) {
//         throw new Error('Email ID is required for deletion');
//       }

//       console.log('Deleting email:', emailId);
      
//       // Send to API
//       await api.delete(`/newsletter/${emailId}`);
      
//       // Update state
//       setEmails(prev => prev.filter(email => 
//         (email._id !== selectedEmail._id && email.id !== selectedEmail.id)
//       ));
      
//       // Close modal
//       setShowDeleteModal(false);
//       setSelectedEmail(null);
      
//       // Show success message
//       showFeedback("success", "Success!", "Email subscription deleted successfully!");
      
//     } catch (error) {
//       console.error('Error deleting email:', error);
//       const errorMessage = error.message || 'Failed to delete email subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewEmail = (email) => {
//     setSelectedEmail(email);
//     setShowViewModal(true);
//   };

//   // Copy email to clipboard
//   const copyToClipboard = async (email) => {
//     try {
//       await navigator.clipboard.writeText(email);
//       showFeedback("success", "Copied!", "Email copied to clipboard!");
//     } catch (error) {
//       showFeedback("error", "Error!", "Failed to copy email");
//     }
//   };

//   // Copy all emails to clipboard
//   const copyAllEmailsToClipboard = () => {
//     const emailList = filteredEmails.map(e => e.email).join(', ');
//     copyToClipboard(emailList);
//   };

//   // Export emails
//   const handleExportEmails = () => {
//     const filteredEmailsList = filteredEmails;
    
//     let content = '';
//     let filename = `email-subscriptions-${new Date().toISOString().split('T')[0]}`;
    
//     if (exportFormat === 'json') {
//       content = JSON.stringify(filteredEmailsList, null, 2);
//       filename += '.json';
//     } else if (exportFormat === 'csv') {
//       const headers = ['Email', 'Status', 'Created At'];
//       const rows = filteredEmailsList.map(email => [
//         email.email,
//         email.status,
//         new Date(email.createdAt).toLocaleString()
//       ]);
//       content = [headers, ...rows].map(row => row.join(',')).join('\n');
//       filename += '.csv';
//     } else if (exportFormat === 'txt') {
//       content = filteredEmailsList.map(email => 
//         `${email.email} - ${email.status} (${new Date(email.createdAt).toLocaleDateString()})`
//       ).join('\n');
//       filename += '.txt';
//     }
    
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
    
//     setShowExportModal(false);
//     showFeedback("success", "Exported!", `Emails exported as ${exportFormat.toUpperCase()}!`);
//   };

//   // Bulk add emails
//   const handleBulkAddEmails = async () => {
//     if (!bulkEmails.trim()) {
//       showFeedback("error", "Error!", "Please enter email addresses");
//       return;
//     }

//     setActionLoading(true);
    
//     const emailList = bulkEmails
//       .split(/[\n,;]/)
//       .map(email => email.trim().toLowerCase())
//       .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    
//     if (emailList.length === 0) {
//       showFeedback("error", "Error!", "No valid email addresses found");
//       setActionLoading(false);
//       return;
//     }

//     try {
//       // Create each email subscription
//       const promises = emailList.map(email => 
//         api.post('/newsletter', { email, status: bulkStatus })
//       );
      
//       await Promise.all(promises);
      
//       // Refresh the list
//       fetchEmails();
//       setBulkEmails('');
//       setShowBulkModal(false);
      
//       showFeedback("success", "Success!", `${emailList.length} emails added successfully!`);
      
//     } catch (error) {
//       console.error('Error bulk adding emails:', error);
//       showFeedback("error", "Error!", "Failed to add some emails. Please check for duplicates.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not available';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   // Get status info
//   const getStatusInfo = (status) => {
//     const option = statusOptions.find(opt => opt.value === status);
//     return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown', icon: null };
//   };

//   // Filter emails
//   const filteredEmails = (Array.isArray(emails) ? emails : []).filter(email => {
//     if (!email || typeof email !== 'object') return false;
    
//     const emailAddress = email.email || '';
//     const status = email.status || '';
    
//     let matchesSearch = true;
//     let matchesStatus = true;
    
//     // If search by user email is enabled, only show exact match
//     if (searchByUserEmail && userEmail) {
//       matchesSearch = emailAddress.toLowerCase() === userEmail.toLowerCase();
//     } else if (searchTerm) {
//       matchesSearch = emailAddress.toLowerCase().includes(searchTerm.toLowerCase());
//     }
    
//     matchesStatus = filterStatus === 'all' || status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterStatus('all');
//     setSearchByUserEmail(false);
//   };

//   // Toggle search by user email
//   const toggleSearchByUserEmail = () => {
//     if (userEmail) {
//       if (searchByUserEmail) {
//         setSearchByUserEmail(false);
//         setSearchTerm('');
//       } else {
//         setSearchByUserEmail(true);
//         setSearchTerm(userEmail);
//       }
//     } else {
//       showFeedback("warning", "No User Email", "No user email found in cookies.");
//     }
//   };

//   // Retry fetching emails
//   const retryFetch = () => {
//     fetchEmails();
//   };

//   // Calculate statistics
//   const totalEmails = Array.isArray(emails) ? emails.length : 0;
//   const activeEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'active').length : 0;
//   const pendingEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'pending').length : 0;
//   const unsubscribedEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'unsubscribed').length : 0;

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         <p className="text-gray-600">Loading email subscriptions...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 flex">
//         {/* Main Content */}
//         <div className="flex-1 w-full">
//           {/* Header */}
//           <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3 sm:gap-0">
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <MenuIcon className="text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Email Subscriptions</h1>
//                   <p className="text-sm sm:text-base text-gray-600 mt-1">
//                     {userEmail ? `User Email: ${userEmail}` : 'Manage newsletter subscribers'}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
//                 <button
//                   onClick={fetchEmails}
//                   className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
//                   title="Refresh"
//                 >
//                   <Refresh />
//                 </button>
//                 <button
//                   onClick={() => setShowBulkModal(true)}
//                   className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200"
//                   title="Bulk Add"
//                 >
//                   <AddIcon />
//                 </button>
//                 <motion.button
//                   onClick={() => setShowCreateModal(true)}
//                   className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <AddIcon className="text-sm sm:text-base" />
//                   <span className="hidden xs:inline">Add Email</span>
//                 </motion.button>
//               </div>
//             </div>
//           </div>

//           {/* Page Content */}
//           <div className="p-3 sm:p-4 md:p-6">
//             {/* Error Message */}
//             {error && (
//               <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
//                   <div className="flex-1">
//                     <h3 className="text-red-800 font-semibold mb-1 text-sm sm:text-base">Error</h3>
//                     <p className="text-red-700 whitespace-pre-line text-xs sm:text-sm">{error}</p>
//                   </div>
//                   <div className="flex space-x-2 ml-0 sm:ml-4">
//                     <button
//                       onClick={retryFetch}
//                       className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 sm:px-3 sm:py-1 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
//                     >
//                       Retry
//                     </button>
//                     <button
//                       onClick={clearError}
//                       className="text-red-400 hover:text-red-600 text-lg"
//                     >
//                       <CloseIcon className="text-sm" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Stats */}
//             <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium text-gray-600">Total Emails</p>
//                     <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{totalEmails}</p>
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center">
//                     <Mail className="text-indigo-600 text-base sm:text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
//                     <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{activeEmails}</p>
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
//                     <CheckCircle className="text-green-600 text-base sm:text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
//                     <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{pendingEmails}</p>
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg sm:rounded-xl flex items-center justify-center">
//                     <AccessTime className="text-yellow-600 text-base sm:text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium text-gray-600">Unsubscribed</p>
//                     <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{unsubscribedEmails}</p>
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
//                     <ClearIcon className="text-red-600 text-base sm:text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
//                 {/* Search */}
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
//                     <input
//                       type="text"
//                       placeholder={searchByUserEmail ? `Searching by user email: ${userEmail}` : "Search by email..."}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       disabled={searchByUserEmail}
//                       className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${searchByUserEmail ? 'bg-gray-100' : ''}`}
//                     />
//                     {userEmail && (
//                       <button
//                         onClick={toggleSearchByUserEmail}
//                         className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors duration-200 ${searchByUserEmail ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                         title={searchByUserEmail ? "Clear user email search" : "Search by your email"}
//                       >
//                         <Person className="text-xs sm:text-sm" />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <div>
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     <option value="all">All Status</option>
//                     {statusOptions.map(status => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Filter Actions */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0">
//                 <button
//                   onClick={resetFilters}
//                   className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-xs sm:text-sm"
//                 >
//                   <FilterList className="text-xs sm:text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
                
//                 <div className="flex space-x-2">
//                   {userEmail && (
//                     <button
//                       onClick={toggleSearchByUserEmail}
//                       className={`flex items-center space-x-1 sm:space-x-2 transition-colors duration-200 text-xs sm:text-sm ${searchByUserEmail ? 'text-indigo-600 hover:text-indigo-800' : 'text-gray-600 hover:text-gray-800'}`}
//                     >
//                       <Person className="text-xs sm:text-sm" />
//                       <span>{searchByUserEmail ? 'Show All' : 'My Email'}</span>
//                     </button>
//                   )}
//                   <button
//                     onClick={copyAllEmailsToClipboard}
//                     className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-xs sm:text-sm"
//                   >
//                     <ContentCopy className="text-xs sm:text-sm" />
//                     <span>Copy All</span>
//                   </button>
//                   <button
//                     onClick={() => setShowExportModal(true)}
//                     className="flex items-center space-x-1 sm:space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200 text-xs sm:text-sm"
//                   >
//                     <Download className="text-xs sm:text-sm" />
//                     <span>Export</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Emails Table */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Email Address
//                       </th>
//                       <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
//                         Created
//                       </th>
//                       <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredEmails.length > 0 ? filteredEmails.map((email) => {
//                       const statusInfo = getStatusInfo(email.status);
//                       const emailId = email._id || email.id;
//                       const isUserEmail = userEmail && email.email.toLowerCase() === userEmail.toLowerCase();
                      
//                       return (
//                         <tr key={emailId} className={`hover:bg-gray-50 transition-colors duration-150 ${isUserEmail ? 'bg-indigo-50' : ''}`}>
//                           {/* Email Info */}
//                           <td className="px-3 sm:px-4 md:px-6 py-3">
//                             <div className="flex items-center">
//                               <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 ${isUserEmail ? 'bg-indigo-100' : 'bg-gray-100'}`}>
//                                 <EmailIcon className={`text-sm sm:text-base ${isUserEmail ? 'text-indigo-600' : 'text-gray-600'}`} />
//                               </div>
//                               <div className="min-w-0 flex-1">
//                                 <div className="flex items-center">
//                                   <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                                     {email.email || 'N/A'}
//                                   </span>
//                                   {isUserEmail && (
//                                     <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
//                                       You
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="sm:hidden text-xs text-gray-500 mt-1">
//                                   {formatDate(email.createdAt)}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Status */}
//                           <td className="px-3 sm:px-4 md:px-6 py-3">
//                             <div className="flex flex-col gap-1">
//                               <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1 w-fit`}>
//                                 {statusInfo.icon}
//                                 <span>{statusInfo.label}</span>
//                               </span>
//                               <div className="flex flex-wrap gap-1">
//                                 {email.status !== 'active' && email.status !== 'unsubscribed' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(emailId, 'active')}
//                                     className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <CheckIcon className="text-xs" />
//                                     <span>Activate</span>
//                                   </button>
//                                 )}
//                                 {email.status === 'active' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(emailId, 'unsubscribed')}
//                                     className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <ClearIcon className="text-xs" />
//                                     <span>Unsubscribe</span>
//                                   </button>
//                                 )}
//                                 {email.status === 'pending' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(emailId, 'unsubscribed')}
//                                     className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <ClearIcon className="text-xs" />
//                                     <span>Unsubscribe</span>
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Created Date - Hidden on mobile */}
//                           <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap hidden sm:table-cell">
//                             <div className="text-xs sm:text-sm text-gray-900">
//                               {formatDate(email.createdAt)}
//                             </div>
//                           </td>

//                           {/* Actions */}
//                           <td className="px-3 sm:px-4 md:px-6 py-3">
//                             <div className="flex space-x-1 sm:space-x-2">
//                               <button
//                                 onClick={() => copyToClipboard(email.email)}
//                                 className="p-1 sm:p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
//                                 title="Copy"
//                               >
//                                 <ContentCopy className="text-xs sm:text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => handleViewEmail(email)}
//                                 className="p-1 sm:p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors duration-200"
//                                 title="View"
//                               >
//                                 <ViewIcon className="text-xs sm:text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => handleEditEmail(email)}
//                                 className="p-1 sm:p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors duration-200"
//                                 title="Edit"
//                               >
//                                 <EditIcon className="text-xs sm:text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(email)}
//                                 className="p-1 sm:p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
//                                 title="Delete"
//                               >
//                                 <DeleteIcon className="text-xs sm:text-sm" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     }) : (
//                       <tr>
//                         <td colSpan="4" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
//                           <EmailIcon className="mx-auto text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4" />
//                           <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                             {searchByUserEmail ? "Your Email Not Found" : "No Email Subscriptions Found"}
//                           </h3>
//                           <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
//                             {searchByUserEmail 
//                               ? `No subscription found for ${userEmail}.`
//                               : totalEmails === 0 
//                                 ? error 
//                                   ? "There was an error loading emails. Please check your connection and try again."
//                                   : "Get started by adding your first email subscription." 
//                                 : "No emails match your current filters."}
//                           </p>
//                           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
//                             {!searchByUserEmail && (
//                               <motion.button
//                                 onClick={() => setShowCreateModal(true)}
//                                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 {searchByUserEmail ? 'Add Your Email' : 'Add First Email'}
//                               </motion.button>
//                             )}
//                             {searchByUserEmail && (
//                               <motion.button
//                                 onClick={toggleSearchByUserEmail}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 Show All Emails
//                               </motion.button>
//                             )}
//                             {error && (
//                               <motion.button
//                                 onClick={retryFetch}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 Retry Loading
//                               </motion.button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
//               Showing <span className="font-medium">{filteredEmails.length}</span> of{' '}
//               <span className="font-medium">{totalEmails}</span> email subscriptions
//               {userEmail && (
//                 <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
//                   Your email: {userEmail}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Create Modal */}
//         <AnimatePresence>
//           {showCreateModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowCreateModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Email</h2>
//                   <button
//                     onClick={() => setShowCreateModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleCreateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter email address"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       required
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowCreateModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={actionLoading}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Adding...</span>
//                         </>
//                       ) : (
//                         <>
//                           <AddIcon className="text-xs sm:text-sm" />
//                           <span>Add Email</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Edit Modal */}
//         <AnimatePresence>
//           {showEditModal && selectedEmail && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowEditModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Email</h2>
//                   <button
//                     onClick={() => setShowEditModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleUpdateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       required
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowEditModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={actionLoading}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Updating...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="text-xs sm:text-sm" />
//                           <span>Update Email</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* View Modal */}
//         <AnimatePresence>
//           {showViewModal && selectedEmail && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowViewModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Email Details</h2>
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Email Address</label>
//                     <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">{selectedEmail.email}</p>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Status</label>
//                     <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedEmail.status).color}`}>
//                       {getStatusInfo(selectedEmail.status).label}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</label>
//                     <p className="text-sm sm:text-base text-gray-900">{formatDate(selectedEmail.createdAt)}</p>
//                   </div>

//                   {selectedEmail._id && (
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">ID</label>
//                       <p className="text-xs text-gray-900 font-mono break-all">{selectedEmail._id}</p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-4 sm:p-6 border-t border-gray-200">
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {showDeleteModal && selectedEmail && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowDeleteModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-4 sm:p-6 text-center">
//                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                     <DeleteIcon className="text-red-600 text-xl sm:text-2xl" />
//                   </div>
                  
//                   <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                     Delete Email?
//                   </h3>
                  
//                   <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
//                     Are you sure you want to delete <strong>{selectedEmail.email}</strong>?
//                     This action cannot be undone.
//                   </p>

//                   <div className="flex space-x-2 sm:space-x-3">
//                     <button
//                       onClick={() => setShowDeleteModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                       disabled={actionLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleDeleteEmail}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Deleting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <DeleteIcon className="text-xs sm:text-sm" />
//                           <span>Delete</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Export Modal */}
//         <AnimatePresence>
//           {showExportModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowExportModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Export Emails</h2>
//                   <button
//                     onClick={() => setShowExportModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Export Format
//                     </label>
//                     <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                       {['json', 'csv', 'txt'].map(format => (
//                         <button
//                           key={format}
//                           type="button"
//                           onClick={() => setExportFormat(format)}
//                           className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm ${
//                             exportFormat === format
//                               ? 'bg-indigo-600 text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {format.toUpperCase()}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="text-xs sm:text-sm text-gray-600">
//                     Exporting {filteredEmails.length} email(s)
//                   </div>

//                   <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
//                     <button
//                       onClick={() => setShowExportModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleExportEmails}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       <Download className="text-xs sm:text-sm" />
//                       <span>Export</span>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bulk Add Modal */}
//         <AnimatePresence>
//           {showBulkModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowBulkModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Bulk Add Emails</h2>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Email Addresses *
//                     </label>
//                     <textarea
//                       value={bulkEmails}
//                       onChange={(e) => setBulkEmails(e.target.value)}
//                       rows="4"
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                       placeholder="Enter email addresses (separated by commas, spaces, or new lines)"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Separate emails with commas, spaces, or new lines
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Status for All
//                     </label>
//                     <select
//                       value={bulkStatus}
//                       onChange={(e) => setBulkStatus(e.target.value)}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
//                     <button
//                       onClick={() => setShowBulkModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleBulkAddEmails}
//                       disabled={actionLoading}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Adding...</span>
//                         </>
//                       ) : (
//                         <>
//                           <AddIcon className="text-xs sm:text-sm" />
//                           <span>Bulk Add</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Feedback Modal */}
//       <FeedbackModal
//         isOpen={feedbackModal.isOpen}
//         onClose={hideFeedback}
//         type={feedbackModal.type}
//         title={feedbackModal.title}
//         message={feedbackModal.message}
//       />
//     </>
//   );
// };






























/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  CheckCircle,
  Email as EmailIcon,
  Person,
  Phone,
  Search,
  FilterList,
  Menu as MenuIcon,
  Refresh,
  MoreVert,
  Check as CheckIcon,
  Clear as ClearIcon,
  Block,
  Pause,
  PlayArrow,
  AccessTime,
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircleOutline,
  Mail,
  ContentCopy,
  Send,
  Download,
  ViewHeadline,
  Person as PersonIcon,
  Verified,
  Star,
  LocationOn
} from '@mui/icons-material';

const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance with security features
const api = axios.create({
  baseURL: API_BASE_URL
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  },
  (error) => {
    console.error('Response Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    if (error.response.status === 401) {
      throw new Error('Unauthorized. Please login.');
    }
    
    if (error.response.status === 403) {
      throw new Error('Access denied.');
    }
    
    if (error.response.status === 404) {
      throw new Error('Resource not found.');
    }
    
    if (error.response.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        error.message ||
                        'An unexpected error occurred';
    
    throw new Error(errorMessage);
  }
);

// Function to get user email from cookies
const getUserEmailFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('userEmail=')) {
      return decodeURIComponent(cookie.substring('userEmail='.length));
    }
    // You might also check for other common cookie names
    if (cookie.startsWith('email=')) {
      return decodeURIComponent(cookie.substring('email='.length));
    }
    if (cookie.startsWith('user_email=')) {
      return decodeURIComponent(cookie.substring('user_email='.length));
    }
  }
  return null;
};

// Success/Fail Modal Component
const FeedbackModal = ({ isOpen, onClose, type, title, message }) => {
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <ErrorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: <WarningIcon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />,
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
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[9999]">
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
            className={`relative w-full max-w-xs sm:max-w-md rounded-lg shadow-xl ${bgColor} ${borderColor} border-2`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-3 sm:mb-4">
                  {icon}
                </div>

                {/* Title */}
                <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${textColor}`}>
                  {title}
                </h3>

                {/* Message */}
                <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6 break-words">
                  {message}
                </p>

                {/* OK Button for error/warning */}
                {(type === "error" || type === "warning") && (
                  <button
                    onClick={onClose}
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      type === "error"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white"
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

// Validation functions
const validateEmailData = (data) => {
  const errors = [];
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  return errors;
};

// Sanitize data function
const sanitizeEmailData = (data) => {
  const sanitized = { ...data };
  
  // Trim and lowercase email
  if (sanitized.email) {
    sanitized.email = sanitized.email.trim().toLowerCase();
  }
  
  return sanitized;
};

// Status Options - Updated to match model
const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="text-xs" /> },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <AccessTime className="text-xs" /> },
  { value: 'unsubscribed', label: 'Unsubscribed', color: 'bg-red-100 text-red-800', icon: <ClearIcon className="text-xs" /> }
];

export const UserSubscriptionManagement = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  
  // Feedback modal state
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchByUserEmail, setSearchByUserEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    status: 'pending'
  });

  // Bulk emails state
  const [bulkEmails, setBulkEmails] = useState('');
  const [bulkStatus, setBulkStatus] = useState('pending');

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

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Get user email from cookies on component mount
  useEffect(() => {
    const emailFromCookie = getUserEmailFromCookies();
    if (emailFromCookie) {
      setUserEmail(emailFromCookie);
      setSearchTerm(emailFromCookie);
      setSearchByUserEmail(true);
    }
  }, []);

  // Fetch all emails
  const fetchEmails = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching emails from API...');
      const response = await api.get(`/newsletter?page=${page}&limit=10`);
      
      console.log('API Response:', response.data);
      
      if (response.data && response.data.success) {
        const emailsData = response.data.data || [];
        setEmails(emailsData);
        
        // Set pagination info
        setPagination({
          currentPage: response.data.currentPage || page,
          totalPages: response.data.totalPages || 1,
          totalCount: response.data.totalCount || 0,
          hasNextPage: response.data.pagination?.hasNextPage || false,
          hasPrevPage: response.data.pagination?.hasPrevPage || false
        });
      } else {
        // Handle different response structure
        let emailsData = [];
        
        if (Array.isArray(response.data)) {
          emailsData = response.data;
        } else if (response.data && response.data.emails) {
          emailsData = response.data.emails;
        }
        
        setEmails(emailsData);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCount: emailsData.length,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
      
    } catch (error) {
      console.error('Error fetching emails:', error);
      setError(error.message);
      showFeedback("error", "Error!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchEmails(newPage);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: '',
      status: 'pending'
    });
  };

  // Create email subscription
  const handleCreateEmail = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      // Validate data
      const validationErrors = validateEmailData(formData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeEmailData(formData);
      
      // console.log('Creating email subscription with data:', sanitizedData);
      
      // Send to API
      const response = await api.post('/newsletter', sanitizedData);
      
      // console.log('Create response:', response.data);
      
      // Handle response
      let newEmail;
      
      if (response.data && response.data.data) {
        newEmail = response.data.data;
      } else if (response.data && response.data.email) {
        newEmail = response.data.email;
      } else {
        newEmail = response.data;
      }

      // Refresh the list
      fetchEmails(pagination.currentPage);
      
      // Reset form and close modal
      setShowCreateModal(false);
      resetForm();
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription created successfully!");
      
    } catch (error) {
      // console.error('Error creating email subscription:', error);
      const errorMessage = error.message || 'Failed to create email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleEditEmail = (email) => {
    setSelectedEmail(email);
    setFormData({
      email: email.email || '',
      status: email.status || 'pending'
    });
    setShowEditModal(true);
  };

  // Update email subscription
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!selectedEmail) return;

    setActionLoading(true);
    setError(null);
    
    try {
      // Validate data
      const validationErrors = validateEmailData(formData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeEmailData(formData);
      
      // Get email ID
      const emailId = selectedEmail._id || selectedEmail.id;
      
      if (!emailId) {
        throw new Error('Email ID is required for update');
      }

      // console.log('Updating email:', emailId, sanitizedData);
      
      // Send to API
      const response = await api.put(`/newsletter/${emailId}`, sanitizedData);
      
      // console.log('Update response:', response.data);
      
      // Handle response
      let updatedEmail;
      
      if (response.data && response.data.data) {
        updatedEmail = response.data.data;
      } else if (response.data && response.data.email) {
        updatedEmail = response.data.email;
      } else {
        updatedEmail = response.data;
      }

      // Update state
      setEmails(prev => prev.map(email => 
        (email._id === selectedEmail._id || email.id === selectedEmail.id) 
          ? { ...email, ...updatedEmail } 
          : email
      ));
      
      // Close modal
      setShowEditModal(false);
      setSelectedEmail(null);
      resetForm();
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription updated successfully!");
      
    } catch (error) {
      console.error('Error updating email:', error);
      const errorMessage = error.message || 'Failed to update email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Quick status update
  const handleQuickStatusUpdate = async (emailId, newStatus) => {
    setActionLoading(true);
    setError(null);
    
    try {
      // Find email
      const email = emails.find(e => 
        (e._id === emailId || e.id === emailId)
      );
      
      if (!email) {
        throw new Error('Email not found');
      }

      console.log('Updating status for email:', emailId, newStatus);
      
      // Send to API
      const response = await api.patch(`/newsletter/${emailId}`, { 
        status: newStatus 
      });
      
      console.log('Status update response:', response.data);
      
      // Handle response
      let updatedEmail;
      
      if (response.data && response.data.data) {
        updatedEmail = response.data.data;
      } else if (response.data && response.data.email) {
        updatedEmail = response.data.email;
      } else {
        updatedEmail = response.data;
      }

      // Update state
      setEmails(prev => prev.map(email => 
        (email._id === emailId || email.id === emailId) 
          ? { ...email, ...updatedEmail } 
          : email
      ));
      
      // Show success message
      showFeedback("success", "Success!", `Email status updated to ${newStatus}!`);
      
    } catch (error) {
      console.error('Error updating status:', error);
      const errorMessage = error.message || 'Failed to update status';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (email) => {
    setSelectedEmail(email);
    setShowDeleteModal(true);
  };

  // Delete email subscription
  const handleDeleteEmail = async () => {
    if (!selectedEmail) return;

    setActionLoading(true);
    setError(null);

    try {
      // Get email ID
      const emailId = selectedEmail._id || selectedEmail.id;
      
      if (!emailId) {
        throw new Error('Email ID is required for deletion');
      }

      console.log('Deleting email:', emailId);
      
      // Send to API
      await api.delete(`/newsletter/${emailId}`);
      
      // Update state
      setEmails(prev => prev.filter(email => 
        (email._id !== selectedEmail._id && email.id !== selectedEmail.id)
      ));
      
      // Update total count
      setPagination(prev => ({
        ...prev,
        totalCount: prev.totalCount - 1
      }));
      
      // Close modal
      setShowDeleteModal(false);
      setSelectedEmail(null);
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription deleted successfully!");
      
    } catch (error) {
      console.error('Error deleting email:', error);
      const errorMessage = error.message || 'Failed to delete email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewEmail = (email) => {
    setSelectedEmail(email);
    setShowViewModal(true);
  };

  // Copy email to clipboard
  const copyToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      showFeedback("success", "Copied!", "Email copied to clipboard!");
    } catch (error) {
      showFeedback("error", "Error!", "Failed to copy email");
    }
  };

  // Copy all emails to clipboard
  const copyAllEmailsToClipboard = () => {
    const emailList = filteredEmails.map(e => e.email).join(', ');
    copyToClipboard(emailList);
  };

  // Export emails
  const handleExportEmails = () => {
    const filteredEmailsList = filteredEmails;
    
    let content = '';
    let filename = `email-subscriptions-${new Date().toISOString().split('T')[0]}`;
    
    if (exportFormat === 'json') {
      content = JSON.stringify(filteredEmailsList, null, 2);
      filename += '.json';
    } else if (exportFormat === 'csv') {
      const headers = ['Email', 'Status', 'Created At'];
      const rows = filteredEmailsList.map(email => [
        email.email,
        email.status,
        new Date(email.createdAt).toLocaleString()
      ]);
      content = [headers, ...rows].map(row => row.join(',')).join('\n');
      filename += '.csv';
    } else if (exportFormat === 'txt') {
      content = filteredEmailsList.map(email => 
        `${email.email} - ${email.status} (${new Date(email.createdAt).toLocaleDateString()})`
      ).join('\n');
      filename += '.txt';
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(false);
    showFeedback("success", "Exported!", `Emails exported as ${exportFormat.toUpperCase()}!`);
  };

  // Bulk add emails
  const handleBulkAddEmails = async () => {
    if (!bulkEmails.trim()) {
      showFeedback("error", "Error!", "Please enter email addresses");
      return;
    }

    setActionLoading(true);
    
    const emailList = bulkEmails
      .split(/[\n,;]/)
      .map(email => email.trim().toLowerCase())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    
    if (emailList.length === 0) {
      showFeedback("error", "Error!", "No valid email addresses found");
      setActionLoading(false);
      return;
    }

    try {
      // Create each email subscription
      const promises = emailList.map(email => 
        api.post('/newsletter', { email, status: bulkStatus })
      );
      
      await Promise.all(promises);
      
      // Refresh the list
      fetchEmails(pagination.currentPage);
      setBulkEmails('');
      setShowBulkModal(false);
      
      showFeedback("success", "Success!", `${emailList.length} emails added successfully!`);
      
    } catch (error) {
      console.error('Error bulk adding emails:', error);
      showFeedback("error", "Error!", "Failed to add some emails. Please check for duplicates.");
    } finally {
      setActionLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown', icon: null };
  };

  // Filter emails
  const filteredEmails = (Array.isArray(emails) ? emails : []).filter(email => {
    if (!email || typeof email !== 'object') return false;
    
    const emailAddress = email.email || '';
    const status = email.status || '';
    
    let matchesSearch = true;
    let matchesStatus = true;
    
    // If search by user email is enabled, only show exact match
    if (searchByUserEmail && userEmail) {
      matchesSearch = emailAddress.toLowerCase() === userEmail.toLowerCase();
    } else if (searchTerm) {
      matchesSearch = emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     (email.name && email.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    matchesStatus = filterStatus === 'all' || status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setSearchByUserEmail(false);
  };

  // Toggle search by user email
  const toggleSearchByUserEmail = () => {
    if (userEmail) {
      if (searchByUserEmail) {
        setSearchByUserEmail(false);
        setSearchTerm('');
      } else {
        setSearchByUserEmail(true);
        setSearchTerm(userEmail);
      }
    } else {
      showFeedback("warning", "No User Email", "No user email found in cookies.");
    }
  };

  // Retry fetching emails
  const retryFetch = () => {
    fetchEmails(pagination.currentPage);
  };

  // Calculate statistics
  const totalEmails = pagination.totalCount || (Array.isArray(emails) ? emails.length : 0);
  const activeEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'active').length : 0;
  const pendingEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'pending').length : 0;
  const unsubscribedEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'unsubscribed').length : 0;

  // Email Card Component
  const EmailCard = ({ email, onEdit, onDelete, onView }) => {
    const statusInfo = getStatusInfo(email.status);
    const isUserEmail = userEmail && email.email.toLowerCase() === userEmail.toLowerCase();
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${isUserEmail ? 'bg-blue-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
              <EmailIcon className={`w-4 h-4 ${isUserEmail ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                  {email.email}
                </h3>
                {isUserEmail && (
                  <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    You
                  </span>
                )}
                {email.isVerified && (
                  <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
                )}
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => onView(email)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="View details"
            >
              <ViewIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(email)}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
              title="Edit"
            >
              <EditIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(email)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <DeleteIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Additional email info if available */}
        {email.name && (
          <div className="text-sm text-gray-700 mb-1">
            <strong>Name:</strong> {email.name}
          </div>
        )}
        
        {email.instrument && (
          <div className="text-sm text-gray-700 mb-1">
            <strong>Instrument:</strong> {email.instrument}
          </div>
        )}
        
        {email.rating && (
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <strong className="mr-1">Rating:</strong>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < email.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-500 mb-3">
          Created: {formatDate(email.createdAt)}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => copyToClipboard(email.email)}
            className="flex-1 px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1"
          >
            <ContentCopy className="w-3 h-3" />
            <span>Copy</span>
          </button>
          {email.status === 'active' && (
            <button
              onClick={() => handleQuickStatusUpdate(email._id || email.id, 'unsubscribed')}
              className="flex-1 px-2 py-1 text-xs bg-red-50 border border-red-200 text-red-700 rounded hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
              disabled={actionLoading}
            >
              <ClearIcon className="w-3 h-3" />
              <span>Unsubscribe</span>
            </button>
          )}
          {email.status !== 'active' && email.status !== 'unsubscribed' && (
            <button
              onClick={() => handleQuickStatusUpdate(email._id || email.id, 'active')}
              className="flex-1 px-2 py-1 text-xs bg-green-50 border border-green-200 text-green-700 rounded hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
              disabled={actionLoading}
            >
              <CheckIcon className="w-3 h-3" />
              <span>Activate</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2">Loading email subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 lg:ml-8">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Mobile Header with Menu Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <MenuIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Email Subscriptions
                    </h1>
                    <p className="text-gray-100 text-sm sm:text-base">
                      {userEmail ? `User Email: ${userEmail}` : 'Manage newsletter subscribers'}
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
                        <PersonIcon className="w-4 h-4" />
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
                      onClick={clearError}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      ×
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
                        placeholder={searchByUserEmail ? `Searching by user email: ${userEmail}` : "Search by name or email..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={searchByUserEmail}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                      {userEmail && (
                        <button
                          onClick={toggleSearchByUserEmail}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
                            searchByUserEmail ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={searchByUserEmail ? "Clear user email search" : "Search by your email"}
                        >
                          <Person className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchEmails(pagination.currentPage)}
                        disabled={loading}
                        className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>
                      
                      <button
                        onClick={() => setShowBulkModal(true)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-gray-300 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Bulk Add"
                      >
                        <AddIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <AddIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">New Email</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Filter Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                  <div className="flex items-center space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    
                    <button
                      onClick={resetFilters}
                      className="flex items-center space-x-1 text-sm text-gray-100 hover:text-white transition-colors"
                    >
                      <FilterList className="w-4 h-4" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={copyAllEmailsToClipboard}
                      className="flex items-center space-x-1 text-sm text-gray-100 hover:text-white transition-colors"
                    >
                      <ContentCopy className="w-4 h-4" />
                      <span>Copy All</span>
                    </button>
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="flex items-center space-x-1 text-sm text-gray-100 hover:text-white transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Total</p>
                      <p className="text-xl font-bold text-white">{totalEmails}</p>
                    </div>
                    <Mail className="text-white/50" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Active</p>
                      <p className="text-xl font-bold text-white">{activeEmails}</p>
                    </div>
                    <CheckCircle className="text-green-400" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Pending</p>
                      <p className="text-xl font-bold text-white">{pendingEmails}</p>
                    </div>
                    <AccessTime className="text-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Unsubscribed</p>
                      <p className="text-xl font-bold text-white">{unsubscribedEmails}</p>
                    </div>
                    <ClearIcon className="text-red-400" />
                  </div>
                </div>
              </div>

              {/* Emails Content */}
              {filteredEmails.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <EmailIcon className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {searchTerm
                      ? "No emails match your search"
                      : "No email subscriptions found"}
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search
                    </p>
                  )}
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                    {!searchByUserEmail && (
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add First Email
                      </button>
                    )}
                    {searchByUserEmail && (
                      <button
                        onClick={toggleSearchByUserEmail}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        Show All Emails
                      </button>
                    )}
                  </div>
                </div>
              ) : viewMode === "table" ? (
                /* Table View for md screens and up */
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                              Created
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredEmails.map((email) => {
                            const statusInfo = getStatusInfo(email.status);
                            const isUserEmail = userEmail && email.email.toLowerCase() === userEmail.toLowerCase();
                            
                            return (
                              <tr
                                key={email._id || email.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <EmailIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                          {email.email}
                                        </div>
                                        {isUserEmail && (
                                          <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            You
                                          </span>
                                        )}
                                        {email.isVerified && (
                                          <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
                                        )}
                                      </div>
                                      <div className="lg:hidden text-xs text-gray-500 mt-1">
                                        {formatDate(email.createdAt)}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                  <div className="text-sm text-gray-900">
                                    {email.name || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                    {statusInfo.label}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                                  <div className="text-sm text-gray-900">
                                    {formatDate(email.createdAt)}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => copyToClipboard(email.email)}
                                      className="px-2 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-xs"
                                      title="Copy"
                                    >
                                      <ContentCopy className="w-3 h-3" />
                                      <span className="hidden xs:inline">Copy</span>
                                    </button>
                                    <button
                                      onClick={() => handleViewEmail(email)}
                                      className="px-2 py-1 text-purple-600 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors flex items-center space-x-1 text-xs"
                                      title="View"
                                    >
                                      <ViewIcon className="w-3 h-3" />
                                      <span className="hidden xs:inline">View</span>
                                    </button>
                                    <button
                                      onClick={() => handleEditEmail(email)}
                                      className="px-2 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-xs"
                                      title="Edit"
                                    >
                                      <EditIcon className="w-3 h-3" />
                                      <span className="hidden xs:inline">Edit</span>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClick(email)}
                                      className="px-2 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-xs"
                                      title="Delete"
                                    >
                                      <DeleteIcon className="w-3 h-3" />
                                      <span className="hidden xs:inline">Delete</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="text-sm text-gray-700">
                        Showing page {pagination.currentPage} of {pagination.totalPages}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={!pagination.hasPrevPage}
                          className={`px-3 py-1 rounded-md text-sm ${
                            pagination.hasPrevPage
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={!pagination.hasNextPage}
                          className={`px-3 py-1 rounded-md text-sm ${
                            pagination.hasNextPage
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Grid/Card View for mobile and when in grid mode */
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredEmails.map((email) => (
                    <EmailCard
                      key={email._id || email.id}
                      email={email}
                      onEdit={handleEditEmail}
                      onDelete={handleDeleteClick}
                      onView={handleViewEmail}
                    />
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="mt-4 text-sm text-gray-100">
                Showing <span className="font-medium">{filteredEmails.length}</span> of{' '}
                <span className="font-medium">{totalEmails}</span> email subscriptions
                {userEmail && (
                  <span className="ml-2 px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                    Your email: {userEmail}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Email</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <AddIcon className="text-xs sm:text-sm" />
                          <span>Add Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {showEditModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Email</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleUpdateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-xs sm:text-sm" />
                          <span>Update Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Modal */}
        <AnimatePresence>
          {showViewModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowViewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Email Details</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">{selectedEmail.email}</p>
                  </div>

                  {selectedEmail.name && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Name</label>
                      <p className="text-sm sm:text-base text-gray-900">{selectedEmail.name}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedEmail.status).color}`}>
                      {getStatusInfo(selectedEmail.status).label}
                    </span>
                  </div>

                  {selectedEmail.instrument && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Instrument</label>
                      <p className="text-sm sm:text-base text-gray-900">{selectedEmail.instrument}</p>
                    </div>
                  )}

                  {selectedEmail.rating && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Rating</label>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < selectedEmail.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-700">({selectedEmail.rating}/5)</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p className="text-sm sm:text-base text-gray-900">{formatDate(selectedEmail.createdAt)}</p>
                  </div>

                  {selectedEmail._id && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">ID</label>
                      <p className="text-xs text-gray-900 font-mono break-all">{selectedEmail._id}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <DeleteIcon className="text-red-600 text-xl sm:text-2xl" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    Delete Email?
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to delete <strong>{selectedEmail.email}</strong>?
                    This action cannot be undone.
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteEmail}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <DeleteIcon className="text-xs sm:text-sm" />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Export Emails</h2>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {['json', 'csv', 'txt'].map(format => (
                        <button
                          key={format}
                          type="button"
                          onClick={() => setExportFormat(format)}
                          className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm ${
                            exportFormat === format
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600">
                    Exporting {filteredEmails.length} email(s)
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExportEmails}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <Download className="text-xs sm:text-sm" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Add Modal */}
        <AnimatePresence>
          {showBulkModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowBulkModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Bulk Add Emails</h2>
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Addresses *
                    </label>
                    <textarea
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                      placeholder="Enter email addresses (separated by commas, spaces, or new lines)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate emails with commas, spaces, or new lines
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status for All
                    </label>
                    <select
                      value={bulkStatus}
                      onChange={(e) => setBulkStatus(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      onClick={() => setShowBulkModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkAddEmails}
                      disabled={actionLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <AddIcon className="text-xs sm:text-sm" />
                          <span>Bulk Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={hideFeedback}
        type={feedbackModal.type}
        title={feedbackModal.title}
        message={feedbackModal.message}
      />
    </>
  );
};