
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
//   Cancel,
//   MusicNote,
//   Person,
//   Email as EmailIcon,
//   Star,
//   StarBorder,
//   CalendarToday,
//   Schedule,
//   Search,
//   FilterList,
//   Save,
//   Update,
//   Menu as MenuIcon,
//   ThumbUp,
//   FormatQuote,
//   AccountCircle,
//   Warning,
//   Info,
//   ChevronLeft,
//   ChevronRight,
//   ViewHeadline,
//   Refresh,
//   Verified,
//   LocationOn
// } from '@mui/icons-material';
// import { toast } from 'react-toastify';

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

// const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// // Create axios instance with interceptors for better error handling
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add response interceptor for better error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Instruments for selection
// const instruments = [
//   'Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 
//   'Saxophone', 'Trumpet', 'Cello', 'Clarinet', 'Voice',
//   'Bass Guitar', 'Keyboard', 'Harp', 'Ukulele', 'Mandolin'
// ];

// // Rating options
// const ratingOptions = [1, 2, 3, 4, 5];

// // Status options matching the schema
// const statusOptions = [
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
//   { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
// ];

// // Testimonial Card Component
// const TestimonialCard = ({ testimonial, onEdit, onDelete, onView }) => {
//   const statusInfo = statusOptions.find(opt => opt.value === testimonial.status) || statusOptions[0];
  
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center">
//           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//             <AccountCircle className="w-4 h-4 text-blue-600" />
//           </div>
//           <div>
//             <div className="flex items-center">
//               <h3 className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
//                 {testimonial.name || 'Anonymous'}
//               </h3>
//               {testimonial.isVerified && (
//                 <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
//               )}
//             </div>
//             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
//               {statusInfo.label}
//             </span>
//           </div>
//         </div>
        
//         <div className="flex space-x-1">
//           <button
//             onClick={() => onView(testimonial)}
//             className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
//             title="View details"
//           >
//             <ViewIcon className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => onEdit(testimonial)}
//             className="p-1 text-gray-400 hover:text-green-600 transition-colors"
//             title="Edit"
//           >
//             <EditIcon className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => onDelete(testimonial)}
//             className="p-1 text-gray-400 hover:text-red-600 transition-colors"
//             title="Delete"
//           >
//             <DeleteIcon className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
      
//       {/* Additional testimonial info */}
//       {testimonial.instrument && (
//         <div className="text-sm text-gray-700 mb-1 flex items-center">
//           <MusicNote className="w-3 h-3 mr-1 text-gray-500" />
//           <strong>Instrument:</strong> <span className="ml-1">{testimonial.instrument}</span>
//         </div>
//       )}
      
//       {testimonial.rating && (
//         <div className="flex items-center text-sm text-gray-700 mb-1">
//           <strong className="mr-1">Rating:</strong>
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
//             />
//           ))}
//         </div>
//       )}
      
//       {testimonial.text && (
//         <div className="text-xs text-gray-600 mb-2 line-clamp-2">
//           "{testimonial.text}"
//         </div>
//       )}
      
//       <div className="text-xs text-gray-500 mb-3">
//         Created: {new Date(testimonial.createdAt).toLocaleDateString()}
//       </div>
      
//       <div className="flex space-x-2">
//         <button
//           onClick={() => onView(testimonial)}
//           className="flex-1 px-2 py-1 text-xs bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <ViewIcon className="w-3 h-3" />
//           <span>View</span>
//         </button>
//         <button
//           onClick={() => onEdit(testimonial)}
//           className="flex-1 px-2 py-1 text-xs bg-green-50 border border-green-200 text-green-700 rounded hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
//         >
//           <EditIcon className="w-3 h-3" />
//           <span>Edit</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export const TestimonialManagement = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalCount: 0,
//     hasNextPage: false,
//     hasPrevPage: false
//   });
  
//   // Modal states
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
//   const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterInstrument, setFilterInstrument] = useState('all');
//   const [filterRating, setFilterRating] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // Form states - Updated to match schema
//   const [testimonialForm, setTestimonialForm] = useState({
//     name: "",
//     instrument: "",
//     duration: "",
//     joinDate: "",
//     rating: 5,
//     text: "",
//     status: "pending",
//     email: "",
//     ageGroup: "",
//     location: ""
//   });

//   const [editForm, setEditForm] = useState({
//     name: "",
//     instrument: "",
//     duration: "",
//     joinDate: "",
//     rating: 5,
//     text: "",
//     status: "pending",
//     email: "",
//     ageGroup: "",
//     location: ""
//   });

//   // Age group options
//   const ageGroupOptions = [
//     { value: '', label: 'Select age group' },
//     { value: 'child', label: 'Child (0-12)' },
//     { value: 'teen', label: 'Teen (13-19)' },
//     { value: 'adult', label: 'Adult (20-59)' },
//     { value: 'senior', label: 'Senior (60+)' }
//   ];

//   // Check login status on component mount
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const email = getEmailFromCookies();
//       if (email) {
//         setUserEmail(email);
//         setIsLoggedIn(true);
        
//         // Pre-fill email in form
//         setTestimonialForm(prev => ({
//           ...prev,
//           email: email
//         }));
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   // Format date safely
//   const formatDate = (dateString) => {
//     try {
//       if (!dateString) return 'Not specified';
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return 'Invalid date';
      
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid date';
//     }
//   };

//   // Fetch testimonials for current user from API
//   const fetchMyTestimonials = async (page = 1) => {
//     if (!userEmail) return;

//     try {
//       setLoading(true);
      
//       // Fetch testimonials by email from API
//       try {
//         const response = await api.get(`/testimonials?page=${page}&limit=10&email=${encodeURIComponent(userEmail)}`);
        
//         if (response.data && response.data.success) {
//           const testimonialsData = response.data.data || [];
//           setTestimonials(testimonialsData);
          
//           // Set pagination info
//           setPagination({
//             currentPage: response.data.currentPage || page,
//             totalPages: response.data.totalPages || 1,
//             totalCount: response.data.totalCount || 0,
//             hasNextPage: response.data.pagination?.hasNextPage || false,
//             hasPrevPage: response.data.pagination?.hasPrevPage || false
//           });
//         } else {
//           // Handle different response structure
//           let testimonialsData = [];
          
//           if (Array.isArray(response.data)) {
//             testimonialsData = response.data;
//           } else if (response.data && response.data.testimonials) {
//             testimonialsData = response.data.testimonials;
//           }
          
//           setTestimonials(testimonialsData);
//           setPagination({
//             currentPage: 1,
//             totalPages: 1,
//             totalCount: testimonialsData.length,
//             hasNextPage: false,
//             hasPrevPage: false
//           });
//         }
        
//       } catch (apiError) {
//         console.error('Error fetching testimonials from API:', apiError);
//         // Fallback to empty array
//         setTestimonials([]);
//       }
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       setTestimonials([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn && userEmail) {
//       fetchMyTestimonials();
//     }
//   }, [isLoggedIn, userEmail]);

//   // Handle pagination
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchMyTestimonials(newPage);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTestimonialForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle edit form input changes
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle rating change
//   const handleRatingChange = (rating) => {
//     setTestimonialForm(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   // Handle edit rating change
//   const handleEditRatingChange = (rating) => {
//     setEditForm(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   // Open create confirmation modal
//   const handleCreateSubmit = (e) => {
//     e.preventDefault();
//     setShowCreateConfirmModal(true);
//   };

//   // Create new testimonial using axios - for current user only
//   const handleCreateTestimonial = async () => {
//     if (!userEmail) {
//       toast.warning('You must be logged in to create a testimonial');
//       return;
//     }

//     setActionLoading(true);

//     try {
//       // Prepare data for API (matching the schema)
//       const testimonialData = {
//         name: testimonialForm.name,
//         instrument: testimonialForm.instrument,
//         duration: testimonialForm.duration,
//         joinDate: testimonialForm.joinDate,
//         rating: testimonialForm.rating,
//         text: testimonialForm.text,
//         status: testimonialForm.status,
//         email: userEmail, // Always use logged-in user's email
//         ageGroup: testimonialForm.ageGroup || undefined,
//         location: testimonialForm.location || undefined
//       };

//       // Send POST request to create testimonial
//       const response = await api.post('/testimonials', testimonialData);

//       if (response.status === 201 || response.status === 200) {
//         const newTestimonial = response.data;
        
//         // Refresh the list
//         fetchMyTestimonials(pagination.currentPage);
//         setShowCreateModal(false);
//         setShowCreateConfirmModal(false);
//         resetTestimonialForm();
        
//         // Show success message
//         toast.success('Testimonial created successfully!');
//       } else {
//         throw new Error(`Failed to create testimonial: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error('Error creating testimonial:', error);
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           error.message;
//       toast.warning(`Error creating testimonial: ${errorMessage}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Reset form helper
//   const resetTestimonialForm = () => {
//     setTestimonialForm({
//       name: "",
//       instrument: "",
//       duration: "",
//       joinDate: "",
//       rating: 5,
//       text: "",
//       status: "pending",
//       email: userEmail,
//       ageGroup: "",
//       location: ""
//     });
//   };

//   // Open edit modal
//   const handleEditTestimonial = (testimonial) => {
//     if (testimonial.email !== userEmail) {
//       toast.warning('You can only edit your own testimonials');
//       return;
//     }
    
//     setSelectedTestimonial(testimonial);
//     setEditForm({
//       name: testimonial.name || "",
//       instrument: testimonial.instrument || "",
//       duration: testimonial.duration || "",
//       joinDate: testimonial.joinDate || "",
//       rating: testimonial.rating || 5,
//       text: testimonial.text || "",
//       status: testimonial.status || "pending",
//       email: testimonial.email || userEmail,
//       ageGroup: testimonial.ageGroup || "",
//       location: testimonial.location || ""
//     });
//     setShowEditModal(true);
//   };

//   // Open update confirmation modal
//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     setShowUpdateConfirmModal(true);
//   };

//   // Update testimonial using axios - only for current user
//   const handleUpdateTestimonial = async () => {
//     if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
//       toast.warning('You can only update your own testimonials');
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
//       if (!testimonialId) {
//         throw new Error('Testimonial ID not found');
//       }

//       // Prepare update data
//       const updateData = {
//         name: editForm.name,
//         instrument: editForm.instrument,
//         duration: editForm.duration,
//         joinDate: editForm.joinDate,
//         rating: editForm.rating,
//         text: editForm.text,
//         status: editForm.status,
//         email: userEmail, // Ensure email stays the same
//         ageGroup: editForm.ageGroup || undefined,
//         location: editForm.location || undefined
//       };

//       // Send PUT request to update testimonial
//       const response = await api.put(`/testimonials/${testimonialId}`, updateData);

//       if (response.status === 200) {
//         const updatedTestimonial = response.data;
        
//         // Update in state
//         setTestimonials(prev => prev.map(test => 
//           (test._id || test.id) === testimonialId ? updatedTestimonial : test
//         ));
//         setShowEditModal(false);
//         setShowUpdateConfirmModal(false);
//         setSelectedTestimonial(null);
        
//         // Show success message
//         toast.success('Testimonial updated successfully!');
//       } else {
//         throw new Error(`Failed to update testimonial: ${response.statusText}`);
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           error.message;
//       toast.warning(`Error updating testimonial: ${errorMessage}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = (testimonial) => {
//     if (testimonial.email !== userEmail) {
//       toast.warning('You can only delete your own testimonials');
//       return;
//     }
    
//     setSelectedTestimonial(testimonial);
//     setShowDeleteModal(true);
//   };

//   // Delete testimonial using axios - only for current user
//   const handleDeleteTestimonial = async () => {
//     if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
//       toast.warning('You can only delete your own testimonials');
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
//       if (!testimonialId) {
//         throw new Error('Testimonial ID not found');
//       }

//       // Send DELETE request
//       const response = await api.delete(`/testimonials/${testimonialId}`);

//       if (response.status === 200 || response.status === 204) {
//         // Remove from state
//         setTestimonials(prev => prev.filter(test => 
//           (test._id || test.id) !== testimonialId
//         ));
//         setShowDeleteModal(false);
//         setSelectedTestimonial(null);
        
//         // Update total count
//         setPagination(prev => ({
//           ...prev,
//           totalCount: prev.totalCount - 1
//         }));
        
//         // Show success message
//         toast.success('Testimonial deleted successfully!');
//       } else {
//         throw new Error(`Failed to delete testimonial: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error('Error deleting testimonial:', error);
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           error.message;
//       toast.warning(`Error deleting testimonial: ${errorMessage}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setShowViewModal(true);
//   };

//   // Get status info
//   const getStatusInfo = (status) => {
//     const option = statusOptions.find(opt => opt.value === status);
//     return option || statusOptions[0];
//   };

//   // Get rating stars
//   const renderStars = (rating) => {
//     const safeRating = rating || 0;
//     return (
//       <div className="flex items-center space-x-1">
//         {ratingOptions.map((star) => (
//           <span key={star} className={star <= safeRating ? "text-yellow-400" : "text-gray-300"}>
//             {star <= safeRating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
//           </span>
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({safeRating})</span>
//       </div>
//     );
//   };

//   // Filter testimonials based on search and filters with safety checks
//   const filteredTestimonials = testimonials.filter(testimonial => {
//     if (!testimonial || typeof testimonial !== 'object') return false;
    
//     const name = testimonial?.name || '';
//     const instrument = testimonial?.instrument || '';
//     const text = testimonial?.text || '';
//     const rating = testimonial?.rating || 0;
//     const status = testimonial?.status || '';
    
//     // Convert search term to lowercase for case-insensitive search
//     const searchLower = searchTerm.toLowerCase();
    
//     const matchesSearch = name.toLowerCase().includes(searchLower) ||
//                          instrument.toLowerCase().includes(searchLower) ||
//                          text.toLowerCase().includes(searchLower);
    
//     const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
//     const matchesRating = filterRating === 'all' || rating === parseInt(filterRating);
//     const matchesStatus = filterStatus === 'all' || status === filterStatus;
    
//     return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterInstrument('all');
//     setFilterRating('all');
//     setFilterStatus('all');
//   };

//   // Calculate statistics for current user only
//   const totalTestimonials = pagination.totalCount || testimonials.length;
//   const approvedTestimonials = testimonials.filter(t => t.status === 'approved').length;
//   const pendingTestimonials = testimonials.filter(t => t.status === 'pending').length;
//   const rejectedTestimonials = testimonials.filter(t => t.status === 'rejected').length;
//   const averageRating = testimonials.length > 0 
//     ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
//     : 0;

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Warning className="w-8 h-8 text-red-600" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
//             <p className="text-gray-600 mb-6">
//               You need to be logged in to view and manage your testimonials.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => window.location.href = '/'}
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

//   if (loading && testimonials.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
//           <p className="mt-2 text-white">Loading your testimonials...</p>
//           {userEmail && (
//             <p className="mt-2 text-sm text-gray-300">
//               For: {userEmail}
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
//         <div className="flex">
//           {/* Main Content */}
//           <div className="flex-1 lg:ml-8">
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Mobile Header with Menu Button */}
//               <div className="lg:hidden mb-4">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <MenuIcon className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>

//               {/* Header */}
//               <div className="mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                   <div className="mb-4 lg:mb-0">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                       My Testimonials
//                     </h1>
//                     <p className="text-gray-100 text-sm sm:text-base">
//                       Manage your personal testimonials and reviews
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

//               {/* Controls */}
//               <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//                 <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                   {/* Search */}
//                   <div className="flex-1 max-w-2xl">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="text"
//                         placeholder="Search your testimonials by name, instrument, or text..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                       />
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => fetchMyTestimonials(pagination.currentPage)}
//                         disabled={loading}
//                         className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                         title="Refresh"
//                       >
//                         <Refresh
//                           className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                         />
//                       </button>

//                       <button
//                         onClick={() => setShowCreateModal(true)}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                       >
//                         <AddIcon className="w-4 h-4" />
//                         <span className="hidden sm:inline">New Testimonial</span>
//                         <span className="sm:hidden">Add</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Filter Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
//                   <div className="flex items-center space-x-3">
//                     <select
//                       value={filterInstrument}
//                       onChange={(e) => setFilterInstrument(e.target.value)}
//                       className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="all">All Instruments</option>
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
                    
//                     <select
//                       value={filterRating}
//                       onChange={(e) => setFilterRating(e.target.value)}
//                       className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="all">All Ratings</option>
//                       {ratingOptions.map(rating => (
//                         <option key={rating} value={rating}>
//                           {rating} Star{rating !== 1 ? 's' : ''}
//                         </option>
//                       ))}
//                     </select>
                    
//                     <select
//                       value={filterStatus}
//                       onChange={(e) => setFilterStatus(e.target.value)}
//                       className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="all">All Status</option>
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
                    
//                     <button
//                       onClick={resetFilters}
//                       className="flex items-center space-x-1 text-sm text-gray-100 hover:text-white transition-colors"
//                     >
//                       <FilterList className="w-4 h-4" />
//                       <span>Reset Filters</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-100">Total</p>
//                       <p className="text-xl font-bold text-white">{totalTestimonials}</p>
//                     </div>
//                     <FormatQuote className="text-white/50" />
//                   </div>
//                 </div>
                
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-100">Approved</p>
//                       <p className="text-xl font-bold text-white">{approvedTestimonials}</p>
//                     </div>
//                     <ThumbUp className="text-green-400" />
//                   </div>
//                 </div>
                
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-100">Average Rating</p>
//                       <p className="text-xl font-bold text-white">{averageRating}/5</p>
//                     </div>
//                     <Star className="text-yellow-400" />
//                   </div>
//                 </div>
                
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-100">Pending</p>
//                       <p className="text-xl font-bold text-white">{pendingTestimonials}</p>
//                     </div>
//                     <Warning className="text-yellow-400" />
//                   </div>
//                 </div>
//               </div>

//               {/* Testimonials Content */}
//               {filteredTestimonials.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                   <FormatQuote className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     {searchTerm
//                       ? "No testimonials match your search"
//                       : "No testimonials found"}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Your email: {userEmail}
//                   </p>
//                   <div className="mt-4">
//                     <button
//                       onClick={() => setShowCreateModal(true)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       Add Your First Testimonial
//                     </button>
//                   </div>
//                 </div>
//               ) : viewMode === "table" ? (
//                 /* Table View for md screens and up */
//                 <>
//                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead className="bg-gray-50 border-b border-gray-200">
//                           <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                               Testimonial
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                               Instrument
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                               Rating
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                               Status
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
//                               Created
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {filteredTestimonials.map((testimonial) => {
//                             const statusInfo = getStatusInfo(testimonial.status);
                            
//                             return (
//                               <tr
//                                 key={testimonial._id || testimonial.id}
//                                 className="hover:bg-gray-50 transition-colors"
//                               >
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                                   <div className="flex items-center">
//                                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
//                                       <AccountCircle className="w-4 h-4 text-blue-600" />
//                                     </div>
//                                     <div className="min-w-0">
//                                       <div className="flex items-center">
//                                         <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
//                                           {testimonial.name || 'Anonymous'}
//                                         </div>
//                                         {testimonial.isVerified && (
//                                           <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
//                                         )}
//                                       </div>
//                                       <div className="text-xs text-gray-500 truncate max-w-[200px]">
//                                         {testimonial.text ? `"${testimonial.text.substring(0, 50)}..."` : 'No text'}
//                                       </div>
//                                       <div className="lg:hidden text-xs text-gray-500 mt-1">
//                                         {formatDate(testimonial.createdAt)}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                                   <div className="text-sm text-gray-900">
//                                     {testimonial.instrument || 'N/A'}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                                   {renderStars(testimonial.rating)}
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
//                                     {statusInfo.label}
//                                   </span>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
//                                   <div className="text-sm text-gray-900">
//                                     {formatDate(testimonial.createdAt)}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                                   <div className="flex gap-2">
//                                     <button
//                                       onClick={() => handleViewTestimonial(testimonial)}
//                                       className="px-2 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-xs"
//                                       title="View"
//                                     >
//                                       <ViewIcon className="w-3 h-3" />
//                                       <span className="hidden xs:inline">View</span>
//                                     </button>
//                                     <button
//                                       onClick={() => handleEditTestimonial(testimonial)}
//                                       className="px-2 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-xs"
//                                       title="Edit"
//                                     >
//                                       <EditIcon className="w-3 h-3" />
//                                       <span className="hidden xs:inline">Edit</span>
//                                     </button>
//                                     <button
//                                       onClick={() => handleDeleteClick(testimonial)}
//                                       className="px-2 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-xs"
//                                       title="Delete"
//                                     >
//                                       <DeleteIcon className="w-3 h-3" />
//                                       <span className="hidden xs:inline">Delete</span>
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
                  
//                   {/* Pagination */}
//                   {pagination.totalPages > 1 && (
//                     <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                       <div className="text-sm text-gray-700">
//                         Showing page {pagination.currentPage} of {pagination.totalPages}
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handlePageChange(pagination.currentPage - 1)}
//                           disabled={!pagination.hasPrevPage}
//                           className={`px-3 py-1 rounded-md text-sm ${
//                             pagination.hasPrevPage
//                               ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
//                               : 'bg-gray-50 text-gray-400 cursor-not-allowed'
//                           }`}
//                         >
//                           Previous
//                         </button>
//                         <button
//                           onClick={() => handlePageChange(pagination.currentPage + 1)}
//                           disabled={!pagination.hasNextPage}
//                           className={`px-3 py-1 rounded-md text-sm ${
//                             pagination.hasNextPage
//                               ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
//                               : 'bg-gray-50 text-gray-400 cursor-not-allowed'
//                           }`}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 /* Grid/Card View for mobile and when in grid mode */
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                   {filteredTestimonials.map((testimonial) => (
//                     <TestimonialCard
//                       key={testimonial._id || testimonial.id}
//                       testimonial={testimonial}
//                       onEdit={handleEditTestimonial}
//                       onDelete={handleDeleteClick}
//                       onView={handleViewTestimonial}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Summary */}
//               <div className="mt-4 text-sm text-gray-100">
//                 Showing <span className="font-medium">{filteredTestimonials.length}</span> of{' '}
//                 <span className="font-medium">{totalTestimonials}</span> testimonials
//                 <span className="ml-2 px-2 py-1 bg-white/20 text-white text-xs rounded-full">
//                   Your email: {userEmail}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Create Testimonial Modal */}
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
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add Your Testimonial</h2>
//                   <button
//                     onClick={() => setShowCreateModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleCreateSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={testimonialForm.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Email
//                     </label>
//                     <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl bg-gray-50">
//                       <EmailIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-700">{userEmail}</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={testimonialForm.instrument}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       <option value="">Select an instrument</option>
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Learning Duration *
//                       </label>
//                       <input
//                         type="text"
//                         name="duration"
//                         value={testimonialForm.duration}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="e.g., 2 years"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Join Date *
//                       </label>
//                       <input
//                         type="text"
//                         name="joinDate"
//                         value={testimonialForm.joinDate}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="e.g., Jan 2023"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Rating *
//                     </label>
//                     <div className="flex items-center space-x-1 sm:space-x-2">
//                       {ratingOptions.map((rating) => (
//                         <button
//                           key={rating}
//                           type="button"
//                           onClick={() => handleRatingChange(rating)}
//                           className={`p-1 sm:p-2 rounded-lg transition-all duration-200 ${
//                             rating <= testimonialForm.rating
//                               ? 'bg-yellow-100 text-yellow-600'
//                               : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Star className="text-sm sm:text-base" />
//                         </button>
//                       ))}
//                       <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
//                         {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Testimonial Text * (max 500 characters)
//                     </label>
//                     <textarea
//                       name="text"
//                       value={testimonialForm.text}
//                       onChange={handleInputChange}
//                       required
//                       maxLength={500}
//                       rows={3}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                       placeholder="Share your learning experience..."
//                     />
//                     <div className="text-right text-xs sm:text-sm text-gray-500 mt-1">
//                       {testimonialForm.text.length}/500 characters
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       value={testimonialForm.status}
//                       onChange={handleInputChange}
//                       required
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
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       <AddIcon className="text-xs sm:text-sm" />
//                       <span>Add My Testimonial</span>
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Create Confirmation Modal */}
//         <AnimatePresence>
//           {showCreateConfirmModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowCreateConfirmModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-4 sm:p-6 text-center">
//                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                     <AddIcon className="text-indigo-600 text-xl sm:text-2xl" />
//                   </div>
                  
//                   <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                     Add Your Testimonial?
//                   </h3>
                  
//                   <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
//                     Are you sure you want to add a testimonial with your email <strong>{userEmail}</strong>?
//                   </p>

//                   <div className="flex space-x-2 sm:space-x-3">
//                     <button
//                       onClick={() => setShowCreateConfirmModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                       disabled={actionLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCreateTestimonial}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Adding...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="text-xs sm:text-sm" />
//                           <span>Add My Testimonial</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Edit Testimonial Modal */}
//         <AnimatePresence>
//           {showEditModal && selectedTestimonial && (
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
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Your Testimonial</h2>
//                   <button
//                     onClick={() => setShowEditModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={editForm.instrument}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Learning Duration *
//                       </label>
//                       <input
//                         type="text"
//                         name="duration"
//                         value={editForm.duration}
//                         onChange={handleEditInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Join Date *
//                       </label>
//                       <input
//                         type="text"
//                         name="joinDate"
//                         value={editForm.joinDate}
//                         onChange={handleEditInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Rating *
//                     </label>
//                     <div className="flex items-center space-x-1 sm:space-x-2">
//                       {ratingOptions.map((rating) => (
//                         <button
//                           key={rating}
//                           type="button"
//                           onClick={() => handleEditRatingChange(rating)}
//                           className={`p-1 sm:p-2 rounded-lg transition-all duration-200 ${
//                             rating <= editForm.rating
//                               ? 'bg-yellow-100 text-yellow-600'
//                               : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Star className="text-sm sm:text-base" />
//                         </button>
//                       ))}
//                       <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
//                         {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Your Testimonial Text * (max 500 characters)
//                     </label>
//                     <textarea
//                       name="text"
//                       value={editForm.text}
//                       onChange={handleEditInputChange}
//                       required
//                       maxLength={500}
//                       rows={3}
//                       className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     />
//                     <div className="text-right text-xs sm:text-sm text-gray-500 mt-1">
//                       {editForm.text.length}/500 characters
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       value={editForm.status}
//                       onChange={handleEditInputChange}
//                       required
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
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     >
//                       <Save className="text-xs sm:text-sm" />
//                       <span>Update My Testimonial</span>
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Update Confirmation Modal */}
//         <AnimatePresence>
//           {showUpdateConfirmModal && selectedTestimonial && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
//               onClick={() => setShowUpdateConfirmModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 sm:p-6 text-center">
//                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Update className="text-green-600 text-xl sm:text-2xl" />
//                 </div>
                
//                 <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                   Update Your Testimonial?
//                 </h3>
                
//                 <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
//                   Are you sure you want to update your testimonial for <strong>{editForm.instrument}</strong>?
//                 </p>

//                 <div className="flex space-x-2 sm:space-x-3">
//                   <button
//                     onClick={() => setShowUpdateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTestimonial}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Updating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-xs sm:text-sm" />
//                         <span>Update My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div> )}
//         </AnimatePresence> 
       

//         {/* View Testimonial Modal */}
//         <AnimatePresence>
//           {showViewModal && selectedTestimonial && (
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
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Testimonial Details</h2>
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Name</label>
//                     <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">{selectedTestimonial.name}</p>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Instrument</label>
//                     <p className="text-sm sm:text-base text-gray-900">{selectedTestimonial.instrument}</p>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Status</label>
//                     <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedTestimonial.status).color}`}>
//                       {getStatusInfo(selectedTestimonial.status).label}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Rating</label>
//                     <div className="flex items-center">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < selectedTestimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
//                         />
//                       ))}
//                       <span className="ml-2 text-sm text-gray-700">({selectedTestimonial.rating}/5)</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Testimonial Text</label>
//                     <p className="text-sm sm:text-base text-gray-900 italic">"{selectedTestimonial.text}"</p>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</label>
//                     <p className="text-sm sm:text-base text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
//                   </div>

//                   {selectedTestimonial._id && (
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">ID</label>
//                       <p className="text-xs text-gray-900 font-mono break-all">{selectedTestimonial._id}</p>
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
//           {showDeleteModal && selectedTestimonial && (
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
//                     Delete Your Testimonial?
//                   </h3>
                  
//                   <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
//                     Are you sure you want to delete your testimonial for <strong>{selectedTestimonial.instrument}</strong>?
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
//                       onClick={handleDeleteTestimonial}
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
//                           <span>Delete My Testimonial</span>
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
  Cancel,
  MusicNote,
  Person,
  Email as EmailIcon,
  Star,
  StarBorder,
  CalendarToday,
  Schedule,
  Search,
  FilterList,
  Save,
  Update,
  Menu as MenuIcon,
  ThumbUp,
  FormatQuote,
  AccountCircle,
  Warning,
  Info,
  ChevronLeft,
  ChevronRight,
  ViewHeadline,
  Refresh,
  Verified,
  LocationOn
} from '@mui/icons-material';
import { toast } from 'react-toastify';

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

const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance with interceptors for better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Instruments for selection
const instruments = [
  'Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 
  'Saxophone', 'Trumpet', 'Cello', 'Clarinet', 'Voice',
  'Bass Guitar', 'Keyboard', 'Harp', 'Ukulele', 'Mandolin'
];

// Rating options
const ratingOptions = [1, 2, 3, 4, 5];

// Status options matching the schema
const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
];

// Age group options
const ageGroupOptions = [
  { value: '', label: 'Select age group' },
  { value: 'child', label: 'Child (0-12)' },
  { value: 'teen', label: 'Teen (13-19)' },
  { value: 'adult', label: 'Adult (20-59)' },
  { value: 'senior', label: 'Senior (60+)' }
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial, onEdit, onDelete, onView }) => {
  const statusInfo = statusOptions.find(opt => opt.value === testimonial.status) || statusOptions[0];
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
            <AccountCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                {testimonial.name || 'Anonymous'}
              </h3>
              {testimonial.isVerified && (
                <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
              )}
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>
      
      {/* Additional testimonial info */}
      {testimonial.instrument && (
        <div className="text-sm text-gray-700 mb-1 flex items-center">
          <MusicNote className="w-3 h-3 mr-1 text-gray-500" />
          <strong>Instrument:</strong> <span className="ml-1">{testimonial.instrument}</span>
        </div>
      )}
      
      {testimonial.rating && (
        <div className="flex items-center text-sm text-gray-700 mb-1">
          <strong className="mr-1">Rating:</strong>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      )}
      
      {testimonial.text && (
        <div className="text-xs text-gray-600 mb-2 line-clamp-2">
          "{testimonial.text}"
        </div>
      )}
      
      <div className="text-xs text-gray-500 mb-3">
        Created: {new Date(testimonial.createdAt).toLocaleDateString()}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onView(testimonial)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1"
        >
          <ViewIcon className="w-3 h-3" />
    
        </button>
        <button
          onClick={() => onEdit(testimonial)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-1"
        >
          <EditIcon className="w-3 h-3" />
      
        </button>
        <button
          onClick={() => onDelete(testimonial)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-1"
        >
          <DeleteIcon className="w-3 h-3" />
     
        </button>
      </div>
    </div>
  );
};

export const TestimonialManagement = () => {
  // ===== 1. ALL useState HOOKS FIRST =====
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({
    table: 7,
    grid: 12
  });
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states - Updated to match schema
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    text: "",
    status: "pending",
    email: "",
    ageGroup: "",
    location: ""
  });

  const [editForm, setEditForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    text: "",
    status: "pending",
    email: "",
    ageGroup: "",
    location: ""
  });

  // ===== 2. DERIVED STATE (calculated from useState) =====
  const filteredTestimonials = testimonials.filter(testimonial => {
    if (!testimonial || typeof testimonial !== 'object') return false;
    
    const name = testimonial?.name || '';
    const instrument = testimonial?.instrument || '';
    const text = testimonial?.text || '';
    const rating = testimonial?.rating || 0;
    const status = testimonial?.status || '';
    
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = name.toLowerCase().includes(searchLower) ||
                         instrument.toLowerCase().includes(searchLower) ||
                         text.toLowerCase().includes(searchLower);
    
    const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
    const matchesRating = filterRating === 'all' || rating === parseInt(filterRating);
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    
    return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
  });

  const currentItems = (() => {
    const itemsPerPageCurrent = viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const indexOfLastItem = currentPage * itemsPerPageCurrent;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCurrent;
    return filteredTestimonials.slice(indexOfFirstItem, indexOfLastItem);
  })();

  const totalPages = Math.ceil(
    filteredTestimonials.length / (viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid)
  );

  // Calculate statistics for current user only
  const totalTestimonials = pagination.totalCount || testimonials.length;
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved').length;
  const pendingTestimonials = testimonials.filter(t => t.status === 'pending').length;
  const rejectedTestimonials = testimonials.filter(t => t.status === 'rejected').length;
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
    : 0;

  // ===== 3. ALL useEffect HOOKS =====
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

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const email = getEmailFromCookies();
      if (email) {
        setUserEmail(email);
        setIsLoggedIn(true);
        
        // Pre-fill email in form
        setTestimonialForm(prev => ({
          ...prev,
          email: email
        }));
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Fetch testimonials for current user from API
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      fetchMyTestimonials();
    }
  }, [isLoggedIn, userEmail]);

  // Filter testimonials when search or filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterInstrument, filterRating, filterStatus]);

  // Check if we need to move to next page when items per page changes
  useEffect(() => {
    const currentItemsPerPage = viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const totalPages = Math.ceil(filteredTestimonials.length / currentItemsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredTestimonials.length, viewMode, itemsPerPage, currentPage]);

  // ===== 4. API FUNCTIONS =====
  const fetchMyTestimonials = async (page = 1) => {
    if (!userEmail) return;

    try {
      setLoading(true);
      
      // Fetch testimonials by email from API
      try {
        const response = await api.get(`/testimonials`);
        
        if (response.data && response.data.success) {
          const testimonialsData = response.data.data || [];
          setTestimonials(testimonialsData);
          
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
          let testimonialsData = [];
          
          if (Array.isArray(response.data)) {
            testimonialsData = response.data;
          } else if (response.data && response.data.testimonials) {
            testimonialsData = response.data.testimonials;
          }
          
          setTestimonials(testimonialsData);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalCount: testimonialsData.length,
            hasNextPage: false,
            hasPrevPage: false
          });
        }
        
      } catch (apiError) {
        console.error('Error fetching testimonials from API:', apiError);
        // Fallback to empty array
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // ===== 5. PAGINATION HANDLERS =====
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMyTestimonials(newPage);
    }
  };

  // ===== 6. FORM HANDLERS =====
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setTestimonialForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleEditRatingChange = (rating) => {
    setEditForm(prev => ({
      ...prev,
      rating
    }));
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      name: "",
      instrument: "",
      duration: "",
      joinDate: "",
      rating: 5,
      text: "",
      status: "pending",
      email: userEmail,
      ageGroup: "",
      location: ""
    });
  };

  // ===== 7. CRUD OPERATIONS =====
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setShowCreateConfirmModal(true);
  };

  const handleCreateTestimonial = async () => {
    if (!userEmail) {
      toast.warning('You must be logged in to create a testimonial');
      return;
    }

    setActionLoading(true);

    try {
      const testimonialData = {
        name: testimonialForm.name,
        instrument: testimonialForm.instrument,
        duration: testimonialForm.duration,
        joinDate: testimonialForm.joinDate,
        rating: testimonialForm.rating,
        text: testimonialForm.text,
        status: testimonialForm.status,
        email: userEmail,
        ageGroup: testimonialForm.ageGroup || undefined,
        location: testimonialForm.location || undefined
      };

      const response = await api.post('/testimonials', testimonialData);

      if (response.status === 201 || response.status === 200) {
        const newTestimonial = response.data;
        
        fetchMyTestimonials(pagination.currentPage);
        setShowCreateModal(false);
        setShowCreateConfirmModal(false);
        resetTestimonialForm();
        toast.success('Testimonial created successfully!');
      } else {
        throw new Error(`Failed to create testimonial: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating testimonial:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message;
      toast.warning(`Error creating testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditTestimonial = (testimonial) => {
    if (testimonial.email !== userEmail) {
      toast.warning('You can only edit your own testimonials');
      return;
    }
    
    setSelectedTestimonial(testimonial);
    setEditForm({
      name: testimonial.name || "",
      instrument: testimonial.instrument || "",
      duration: testimonial.duration || "",
      joinDate: testimonial.joinDate || "",
      rating: testimonial.rating || 5,
      text: testimonial.text || "",
      status: testimonial.status || "pending",
      email: testimonial.email || userEmail,
      ageGroup: testimonial.ageGroup || "",
      location: testimonial.location || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  const handleUpdateTestimonial = async () => {
    if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
      toast.warning('You can only update your own testimonials');
      return;
    }

    setActionLoading(true);
    try {
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      if (!testimonialId) {
        throw new Error('Testimonial ID not found');
      }

      const updateData = {
        name: editForm.name,
        instrument: editForm.instrument,
        duration: editForm.duration,
        joinDate: editForm.joinDate,
        rating: editForm.rating,
        text: editForm.text,
        status: editForm.status,
        email: userEmail,
        ageGroup: editForm.ageGroup || undefined,
        location: editForm.location || undefined
      };

      const response = await api.put(`/testimonials/${testimonialId}`, updateData);

      if (response.status === 200) {
        const updatedTestimonial = response.data;
        
        setTestimonials(prev => prev.map(test => 
          (test._id || test.id) === testimonialId ? updatedTestimonial : test
        ));
        setShowEditModal(false);
        setShowUpdateConfirmModal(false);
        setSelectedTestimonial(null);
        toast.success('Testimonial updated successfully!');
      } else {
        throw new Error(`Failed to update testimonial: ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message;
      toast.warning(`Error updating testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (testimonial) => {
    if (testimonial.email !== userEmail) {
      toast.warning('You can only delete your own testimonials');
      return;
    }
    
    setSelectedTestimonial(testimonial);
    setShowDeleteModal(true);
  };

  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
      toast.warning('You can only delete your own testimonials');
      return;
    }

    setActionLoading(true);
    try {
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      if (!testimonialId) {
        throw new Error('Testimonial ID not found');
      }

      const response = await api.delete(`/testimonials/${testimonialId}`);

      if (response.status === 200 || response.status === 204) {
        setTestimonials(prev => prev.filter(test => 
          (test._id || test.id) !== testimonialId
        ));
        setShowDeleteModal(false);
        setSelectedTestimonial(null);
        
        setPagination(prev => ({
          ...prev,
          totalCount: prev.totalCount - 1
        }));
        
        toast.success('Testimonial deleted successfully!');
      } else {
        throw new Error(`Failed to delete testimonial: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message;
      toast.warning(`Error deleting testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowViewModal(true);
  };

  // ===== 8. UTILITY FUNCTIONS =====
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Not specified';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getStatusInfo = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option || statusOptions[0];
  };

  const renderStars = (rating) => {
    const safeRating = rating || 0;
    return (
      <div className="flex items-center space-x-1">
        {ratingOptions.map((star) => (
          <span key={star} className={star <= safeRating ? "text-yellow-400" : "text-gray-300"}>
            {star <= safeRating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({safeRating})</span>
      </div>
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterInstrument('all');
    setFilterRating('all');
    setFilterStatus('all');
    setCurrentPage(1);
  };

  // ===== 9. PAGINATION COMPONENT =====
  const PaginationControls = () => {
    const itemsPerPageCurrent = viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-white bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
                : "text-white bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
                {Math.min(currentPage * itemsPerPageCurrent, filteredTestimonials.length)}
              </span>{" "}
              of <span className="font-medium">{filteredTestimonials.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
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
                
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <div
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        isCurrentPage
                          ? "z-10 bg-gradient-to-t from-blue-600 to-blue-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {pageNumber}
                    </div>
                  );
                }
                
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
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

  // ===== 10. EARLY RETURNS (before main render) =====
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Warning className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view and manage your testimonials.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                Go to Login Page
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading && testimonials.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2 text-white">Loading your testimonials...</p>
        
        </div>
      </div>
    );
  }

  // ===== 11. MAIN RENDER =====
  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 lg:ml-8">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      My Testimonials
                    </h1>
                    <p className="text-gray-100 text-sm sm:text-base">
                      Manage your personal testimonials and reviews
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

              {/* Controls */}
              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search your testimonials by name, instrument, or text..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchMyTestimonials(pagination.currentPage)}
                        disabled={loading}
                        className="p-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-3 py-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <AddIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">New Testimonial</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Filter Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                  <div className="flex items-center space-x-3">
                    <select
                      value={filterInstrument}
                      onChange={(e) => setFilterInstrument(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Instruments</option>
                      {instruments.map(instrument => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Ratings</option>
                      {ratingOptions.map(rating => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    
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
                      className="flex items-center space-x-1 text-sm text-gray-100 hover:text-white transition-colors bg-gradient-to-t from-gray-500 to-gray-600 px-3 py-1 rounded-lg"
                    >
                      <FilterList className="w-4 h-4" />
                      <span>Reset Filters</span>
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
                      <p className="text-xl font-bold text-white">{totalTestimonials}</p>
                    </div>
                    <FormatQuote className="text-white/50" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Approved</p>
                      <p className="text-xl font-bold text-white">{approvedTestimonials}</p>
                    </div>
                    <ThumbUp className="text-green-400" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Average Rating</p>
                      <p className="text-xl font-bold text-white">{averageRating}/5</p>
                    </div>
                    <Star className="text-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Pending</p>
                      <p className="text-xl font-bold text-white">{pendingTestimonials}</p>
                    </div>
                    <Warning className="text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Testimonials Content */}
              {currentItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <FormatQuote className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {searchTerm
                      ? "No testimonials match your search"
                      : "No testimonials found"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your email: {userEmail}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors text-sm"
                    >
                      Add Your First Testimonial
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {viewMode === "table" ? (
                    /* Table View for md screens and up */
                    <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Testimonial
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                                Instrument
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                                Rating
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                                Created
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((testimonial) => {
                              const statusInfo = getStatusInfo(testimonial.status);
                              
                              return (
                                <tr
                                  key={testimonial._id || testimonial.id}
                                  className="hover:bg-gray-50 transition-colors"
                                >
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                        <AccountCircle className="w-4 h-4 text-blue-600" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center">
                                          <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                            {testimonial.name?.slice(0, 20) || 'Anonymous'}
                                          </div>
                                          {testimonial.isVerified && (
                                            <Verified className="w-4 h-4 text-green-500 ml-1" title="Verified" />
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                          {testimonial.text ? `"${testimonial.text.substring(0, 20)}..."` : 'No text'}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                                    <div className="text-sm text-gray-900">
                                      {testimonial.instrument?.slice(0, 20) || 'N/A'}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
                                    {renderStars(testimonial.rating)}
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                      {statusInfo.label}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                                    <div className="text-sm text-gray-500">
                                      {formatDate(testimonial.createdAt)}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleViewTestimonial(testimonial)}
                                        className="px-3 py-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-1 text-sm"
                                        title="View"
                                      >
                                        <ViewIcon className="w-3 h-3" />
                                        
                                      </button>
                                      <button
                                        onClick={() => handleEditTestimonial(testimonial)}
                                        className="px-3 py-1 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-1 text-sm"
                                        title="Edit"
                                      >
                                        <EditIcon className="w-3 h-3" />
                                       
                                      </button>
                                      <button
                                        onClick={() => handleDeleteClick(testimonial)}
                                        className="px-3 py-1 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-1 text-sm"
                                        title="Delete"
                                      >
                                        <DeleteIcon className="w-3 h-3" />
                                       
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
                  ) : (
                    /* Grid/Card View for mobile and when in grid mode */
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {currentItems.map((testimonial) => (
                        <TestimonialCard
                          key={testimonial._id || testimonial.id}
                          testimonial={testimonial}
                          onEdit={handleEditTestimonial}
                          onDelete={handleDeleteClick}
                          onView={handleViewTestimonial}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {filteredTestimonials.length > 0 && <PaginationControls />}
                </>
              )}

              {/* Summary */}
              <div className="mt-4 text-sm text-gray-100">
                Showing <span className="font-medium">{currentItems.length}</span> of{' '}
                <span className="font-medium">{filteredTestimonials.length}</span> testimonials
                <span className="ml-2 px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                  Your email: {userEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Create Testimonial Modal */}
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
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add Your Testimonial</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={testimonialForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Email
                    </label>
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50">
                      <EmailIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{userEmail}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Instrument You Learned *
                    </label>
                    <select
                      name="instrument"
                      value={testimonialForm.instrument}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select an instrument</option>
                      {instruments.map(instrument => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Learning Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={testimonialForm.duration}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 2 years"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Join Date *
                      </label>
                      <input
                        type="text"
                        name="joinDate"
                        value={testimonialForm.joinDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Jan 2023"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Rating *
                    </label>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(rating)}
                          className={`p-1 sm:p-2 rounded-lg transition-all duration-200 ${
                            rating <= testimonialForm.rating
                              ? 'bg-gradient-to-t from-yellow-500 to-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Star className="text-sm sm:text-base" />
                        </button>
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                        {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Testimonial Text * (max 500 characters)
                    </label>
                    <textarea
                      name="text"
                      value={testimonialForm.text}
                      onChange={handleInputChange}
                      required
                      maxLength={500}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Share your learning experience..."
                    />
                    <div className="text-right text-xs sm:text-sm text-gray-500 mt-1">
                      {testimonialForm.text.length}/500 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={testimonialForm.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="flex-1 bg-gradient-to-t from-gray-500 to-gray-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <AddIcon className="text-xs sm:text-sm" />
                      <span>Add My Testimonial</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Confirmation Modal */}
        <AnimatePresence>
          {showCreateConfirmModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowCreateConfirmModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <AddIcon className="text-blue-600 text-xl sm:text-2xl" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    Add Your Testimonial?
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to add a testimonial with your email <strong>{userEmail}</strong>?
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowCreateConfirmModal(false)}
                      className="flex-1 bg-gradient-to-t from-gray-500 to-gray-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateTestimonial}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-xs sm:text-sm" />
                          <span>Add My Testimonial</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Testimonial Modal */}
        <AnimatePresence>
          {showEditModal && selectedTestimonial && (
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
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Your Testimonial</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Instrument You Learned *
                    </label>
                    <select
                      name="instrument"
                      value={editForm.instrument}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {instruments.map(instrument => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Learning Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={editForm.duration}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Join Date *
                      </label>
                      <input
                        type="text"
                        name="joinDate"
                        value={editForm.joinDate}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Rating *
                    </label>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleEditRatingChange(rating)}
                          className={`p-1 sm:p-2 rounded-lg transition-all duration-200 ${
                            rating <= editForm.rating
                              ? 'bg-gradient-to-t from-yellow-500 to-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Star className="text-sm sm:text-base" />
                        </button>
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                        {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Testimonial Text * (max 500 characters)
                    </label>
                    <textarea
                      name="text"
                      value={editForm.text}
                      onChange={handleEditInputChange}
                      required
                      maxLength={500}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="text-right text-xs sm:text-sm text-gray-500 mt-1">
                      {editForm.text.length}/500 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="flex-1 bg-gradient-to-t from-gray-500 to-gray-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <Save className="text-xs sm:text-sm" />
                      <span>Update My Testimonial</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Confirmation Modal */}
        <AnimatePresence>
          {showUpdateConfirmModal && selectedTestimonial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowUpdateConfirmModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Update className="text-green-600 text-xl sm:text-2xl" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    Update Your Testimonial?
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to update your testimonial for <strong>{editForm.instrument}</strong>?
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowUpdateConfirmModal(false)}
                      className="flex-1 bg-gradient-to-t from-gray-500 to-gray-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateTestimonial}
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-xs sm:text-sm" />
                          <span>Update My Testimonial</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Testimonial Modal */}
        <AnimatePresence>
          {showViewModal && selectedTestimonial && (
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
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Testimonial Details</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">{selectedTestimonial.name}</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Instrument</label>
                    <p className="text-sm sm:text-base text-gray-900">{selectedTestimonial.instrument}</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedTestimonial.status).color}`}>
                      {getStatusInfo(selectedTestimonial.status).label}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Rating</label>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < selectedTestimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-700">({selectedTestimonial.rating}/5)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Testimonial Text</label>
                    <p className="text-sm sm:text-base text-gray-900 italic">"{selectedTestimonial.text}"</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p className="text-sm sm:text-base text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
                  </div>

                  {selectedTestimonial._id && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">ID</label>
                      <p className="text-xs text-gray-900 font-mono break-all">{selectedTestimonial._id}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full bg-gradient-to-t from-red-500 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors text-xs sm:text-sm"
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
          {showDeleteModal && selectedTestimonial && (
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
                className="bg-white rounded-lg w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <DeleteIcon className="text-red-600 text-xl sm:text-2xl" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-semibold text-red-600 mb-1 sm:mb-2">
                    Delete Your Testimonial?
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to delete your testimonial for <strong>{selectedTestimonial.instrument}</strong>?
                    This action cannot be undone.
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gradient-to-t from-gray-500 to-gray-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteTestimonial}
                      className="flex-1 bg-gradient-to-t from-red-500 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
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
                          <span>Delete My Testimonial</span>
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
    </>
  );
};