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
//   Info
// } from '@mui/icons-material';

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

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Instruments for selection
// const instruments = [
//   'Piano', 'Guitar', 'Violin', 'Drums', 'Flute',
//   'Saxophone', 'Trumpet', 'Cello', 'Clarinet', 'Voice',
//   'Bass Guitar', 'Keyboard', 'Harp', 'Ukulele', 'Mandolin'
// ];

// // Rating options
// const ratingOptions = [1, 2, 3, 4, 5];

// // Status options
// const statusOptions = [
//   { value: 'draft', label: 'Draft' },
//   { value: 'published', label: 'Published' },
//   { value: 'archived', label: 'Archived' }
// ];

// export const MyTestimonialManagement = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

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

//   // Form states
//   const [testimonialForm, setTestimonialForm] = useState({
//     name: "",
//     instrument: "",
//     duration: "",
//     joinDate: "",
//     rating: 5,
//     testimonialText: "",
//     status: "draft",
//     email: "",
//     age: "",
//     teacher: ""
//   });

//   const [editForm, setEditForm] = useState({
//     name: "",
//     instrument: "",
//     duration: "",
//     joinDate: "",
//     rating: 5,
//     testimonialText: "",
//     status: "draft",
//     email: "",
//     age: "",
//     teacher: ""
//   });

//   // Check login status on component mount
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const email = getEmailFromCookies();
//       if (email) {
//         setUserEmail(email);
//         setIsLoggedIn(true);
//         console.log('User logged in with email:', email);

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

//   // Fetch testimonials for current user
//   const fetchMyTestimonials = async () => {
//     if (!userEmail) return;

//     try {
//       setLoading(true);

//       // Try to get user's name from API first
//       let userName = userEmail.split('@')[0]; // Default to email prefix

//       try {
//         const userResponse = await api.get(`/api/users?email=${encodeURIComponent(userEmail)}`);
//         if (userResponse.data?.data?.[0]?.name) {
//           userName = userResponse.data.data[0].name;
//         }
//       } catch (userError) {
//         console.log('Could not fetch user details, using email prefix:', userError);
//       }

//       // Try to fetch testimonials from API
//       try {
//         const response = await api.get('/testimonials');

//         if (response.status === 200) {
//           // Filter testimonials by current user's email
//           const myTestimonials = response.data.filter(testimonial =>
//             testimonial.email === userEmail ||
//             testimonial.userEmail === userEmail
//           );

//           if (myTestimonials.length > 0) {
//             setTestimonials(myTestimonials);
//           } else {
//             // If no testimonials found, create mock data for current user
//             const mockTestimonials = [
//               {
//                 id: 1,
//                 name: userName,
//                 instrument: "Guitar",
//                 duration: "1 year",
//                 joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//                 rating: 5,
//                 testimonialText: "As a guitar student, I've had an amazing learning journey. The personalized lessons really helped me progress faster than I expected!",
//                 status: "published",
//                 email: userEmail,
//                 age: "25",
//                 teacher: "Mr. Johnson",
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//                 isCurrentUser: true
//               },
//               {
//                 id: 2,
//                 name: userName,
//                 instrument: "Piano",
//                 duration: "6 months",
//                 joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//                 rating: 4,
//                 testimonialText: "Started piano lessons and the structured approach has been fantastic. Learning proper technique has made all the difference.",
//                 status: "draft",
//                 email: userEmail,
//                 age: "25",
//                 teacher: "Ms. Williams",
//                 createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
//                 updatedAt: new Date().toISOString(),
//                 isCurrentUser: true
//               }
//             ];
//             setTestimonials(mockTestimonials);
//           }
//         }
//       } catch (apiError) {
//         console.log('Could not fetch testimonials from API, using mock data:', apiError);
//         // Use mock data for current user
//         const mockTestimonials = getMockData(userEmail, userName);
//         setTestimonials(mockTestimonials);
//       }
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       // Fallback to mock data
//       const mockTestimonials = getMockData(userEmail, userEmail.split('@')[0]);
//       setTestimonials(mockTestimonials);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function for mock data - personalized for current user
//   const getMockData = (email, name) => {
//     const userName = name || email.split('@')[0];
//     return [
//       {
//         id: 1,
//         name: userName,
//         instrument: "Guitar",
//         duration: "1 year",
//         joinDate: "Jan 2023",
//         rating: 5,
//         testimonialText: "The guitar lessons have been absolutely transformative! My teacher is incredibly patient and knowledgeable. I've improved so much in just one year.",
//         status: "published",
//         email: email,
//         age: "25",
//         teacher: "Mr. Johnson",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         isCurrentUser: true
//       },
//       {
//         id: 2,
//         name: userName,
//         instrument: "Piano",
//         duration: "6 months",
//         joinDate: "Jun 2023",
//         rating: 4,
//         testimonialText: "Great learning experience! The structured approach really helped me build a solid foundation in piano.",
//         status: "published",
//         email: email,
//         age: "25",
//         teacher: "Ms. Williams",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         isCurrentUser: true
//       },
//       {
//         id: 3,
//         name: userName,
//         instrument: "Violin",
//         duration: "3 months",
//         joinDate: "Sep 2023",
//         rating: 5,
//         testimonialText: "As a beginner in violin, I was nervous about learning. But my teacher made it so accessible and fun! Highly recommended.",
//         status: "draft",
//         email: email,
//         age: "25",
//         teacher: "Mr. Thompson",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         isCurrentUser: true
//       }
//     ];
//   };

//   useEffect(() => {
//     if (isLoggedIn && userEmail) {
//       fetchMyTestimonials();
//     }
//   }, [isLoggedIn, userEmail]);

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
//       alert('You must be logged in to create a testimonial');
//       return;
//     }

//     setActionLoading(true);

//     try {
//       // Always include current user's email
//       const testimonialData = {
//         ...testimonialForm,
//         email: userEmail
//       };

//       const response = await api.post('/testimonials', testimonialData);

//       if (response.status === 201 || response.status === 200) {
//         const newTestimonial = {
//           ...response.data,
//           isCurrentUser: true
//         };
//         setTestimonials(prev => [newTestimonial, ...prev]);
//         setShowCreateModal(false);
//         setShowCreateConfirmModal(false);
//         resetTestimonialForm();
//       } else {
//         alert('Failed to create testimonial');
//       }
//     } catch (error) {
//       console.error('Error creating testimonial:', error);
//       // For demo, add to local state
//       const newTestimonial = {
//         id: Date.now(),
//         ...testimonialForm,
//         email: userEmail,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         isCurrentUser: true
//       };
//       setTestimonials(prev => [newTestimonial, ...prev]);
//       setShowCreateModal(false);
//       setShowCreateConfirmModal(false);
//       resetTestimonialForm();
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
//       testimonialText: "",
//       status: "draft",
//       email: userEmail, // Keep user email
//       age: "",
//       teacher: ""
//     });
//   };

//   // Open edit modal
//   const handleEditTestimonial = (testimonial) => {
//     if (testimonial.email !== userEmail) {
//       alert('You can only edit your own testimonials');
//       return;
//     }

//     setSelectedTestimonial(testimonial);
//     setEditForm({
//       name: testimonial.name,
//       instrument: testimonial.instrument,
//       duration: testimonial.duration,
//       joinDate: testimonial.joinDate,
//       rating: testimonial.rating,
//       testimonialText: testimonial.testimonialText,
//       status: testimonial.status,
//       email: testimonial.email || userEmail,
//       age: testimonial.age || "",
//       teacher: testimonial.teacher || ""
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
//       alert('You can only update your own testimonials');
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const response = await api.put(`/testimonials/${selectedTestimonial.id}`, {
//         ...editForm,
//         email: userEmail // Ensure email stays as current user
//       });

//       if (response.status === 200) {
//         const updatedTestimonial = {
//           ...response.data,
//           isCurrentUser: true
//         };
//         setTestimonials(prev => prev.map(test =>
//           test.id === selectedTestimonial.id ? updatedTestimonial : test
//         ));
//         setShowEditModal(false);
//         setShowUpdateConfirmModal(false);
//         setSelectedTestimonial(null);
//       } else {
//         alert('Failed to update testimonial');
//       }
//     } catch (error) {
//       console.error('Error updating testimonial:', error);
//       // For demo, update local state
//       const updatedTestimonial = {
//         ...selectedTestimonial,
//         ...editForm,
//         email: userEmail,
//         updatedAt: new Date().toISOString(),
//         isCurrentUser: true
//       };
//       setTestimonials(prev => prev.map(test =>
//         test.id === selectedTestimonial.id ? updatedTestimonial : test
//       ));
//       setShowEditModal(false);
//       setShowUpdateConfirmModal(false);
//       setSelectedTestimonial(null);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = (testimonial) => {
//     if (testimonial.email !== userEmail) {
//       alert('You can only delete your own testimonials');
//       return;
//     }

//     setSelectedTestimonial(testimonial);
//     setShowDeleteModal(true);
//   };

//   // Delete testimonial using axios - only for current user
//   const handleDeleteTestimonial = async () => {
//     if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
//       alert('You can only delete your own testimonials');
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const response = await api.delete(`/testimonials/${selectedTestimonial.id}`);

//       if (response.status === 200 || response.status === 204) {
//         setTestimonials(prev => prev.filter(test => test.id !== selectedTestimonial.id));
//         setShowDeleteModal(false);
//         setSelectedTestimonial(null);
//       } else {
//         alert('Failed to delete testimonial');
//       }
//     } catch (error) {
//       console.error('Error deleting testimonial:', error);
//       // For demo, remove from local state
//       setTestimonials(prev => prev.filter(test => test.id !== selectedTestimonial.id));
//       setShowDeleteModal(false);
//       setSelectedTestimonial(null);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setShowViewModal(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'published': return 'bg-green-100 text-green-800';
//       case 'draft': return 'bg-yellow-100 text-yellow-800';
//       case 'archived': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Get rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex items-center space-x-1">
//         {ratingOptions.map((star) => (
//           <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
//             {star <= rating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
//           </span>
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({rating})</span>
//       </div>
//     );
//   };

//   // Filter testimonials based on search and filters
//   const filteredTestimonials = testimonials.filter(testimonial => {
//     const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          testimonial.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          testimonial.testimonialText.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesInstrument = filterInstrument === 'all' || testimonial.instrument === filterInstrument;
//     const matchesRating = filterRating === 'all' || testimonial.rating === parseInt(filterRating);
//     const matchesStatus = filterStatus === 'all' || testimonial.status === filterStatus;

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
//   const totalTestimonials = testimonials.length;
//   const publishedTestimonials = testimonials.filter(t => t.status === 'published').length;
//   const averageRating = testimonials.length > 0
//     ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
//     : 0;

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
//               You need to be logged in to view and manage your testimonials.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => window.location.href = '/'}
//                 className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Go to Login Page
//               </button>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">
//             Loading your testimonials...
//           </p>
//           {userEmail && (
//             <p className="mt-2 text-sm text-gray-500">
//               For: {userEmail}
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header with Menu Button */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <MenuIcon className="text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">My Testimonials</h1>
//                 <p className="text-gray-600 mt-1">Manage your personal testimonials and reviews</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <p className="text-sm text-gray-500">
//                     Logged in as: <span className="font-medium">{userEmail}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               onClick={() => setShowCreateModal(true)}
//               className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <AddIcon />
//               <span className="hidden sm:inline">Add My Testimonial</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Cookie Information Banner */}
//         <div className="bg-blue-50 border border-blue-200 m-4 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//               <div>
//                 <p className="text-sm font-medium text-blue-800">
//                   Personal Testimonial Mode
//                 </p>
//                 <p className="text-xs text-blue-600">
//                   Showing only your testimonials from email: {userEmail}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={fetchMyTestimonials}
//               className="text-xs text-blue-700 hover:text-blue-900"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-4 lg:p-6">
//           {/* Search and Filters */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Search */}
//               <div className="relative lg:col-span-2">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search your testimonials..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 />
//               </div>

//               {/* Instrument Filter */}
//               <select
//                 value={filterInstrument}
//                 onChange={(e) => setFilterInstrument(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Instruments</option>
//                 {instruments.map(instrument => (
//                   <option key={instrument} value={instrument}>
//                     {instrument}
//                   </option>
//                 ))}
//               </select>

//               {/* Rating Filter */}
//               <select
//                 value={filterRating}
//                 onChange={(e) => setFilterRating(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Ratings</option>
//                 {ratingOptions.map(rating => (
//                   <option key={rating} value={rating}>
//                     {rating} Star{rating !== 1 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Status Filter and Reset */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Status</option>
//                 {statusOptions.map(status => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>

//               <div className="flex justify-end">
//                 <button
//                   onClick={resetFilters}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <FilterList className="text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Testimonials</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Published</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{publishedTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <ThumbUp className="text-green-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Average Rating</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageRating}/5</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                   <Star className="text-yellow-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Showing</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{filteredTestimonials.length}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <FilterList className="text-blue-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Testimonials Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
//             {filteredTestimonials.map((testimonial) => (
//               <motion.div
//                 key={testimonial.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="p-4 lg:p-6">
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg relative">
//                         {testimonial.name.split(' ').map(n => n[0]).join('')}
//                         <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                           <AccountCircle className="text-white text-xs" />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                             Me
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500">ID: #{testimonial.id}</p>
//                         <p className="text-xs text-gray-400">Email: {testimonial.email || userEmail}</p>
//                       </div>
//                     </div>
//                     <div className="items-end space-y-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
//                         {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
//                       </span>

//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center space-x-3">
//                       <MusicNote className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">{testimonial.instrument}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Schedule className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">{testimonial.duration}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <CalendarToday className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">Joined {testimonial.joinDate}</span>
//                     </div>
//                     {testimonial.teacher && (
//                       <div className="flex items-center space-x-3">
//                         <Person className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">Teacher: {testimonial.teacher}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Testimonial Text */}
//                   <div className="mb-4">
//                     <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
//                       "{testimonial.testimonialText}"
//                     </p>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex space-x-2 pt-4 border-t border-gray-100">
//                     <motion.button
//                       onClick={() => handleViewTestimonial(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <ViewIcon className="text-sm" />
//                       <span>View</span>
//                     </motion.button>
//                     <motion.button
//                       onClick={() => handleEditTestimonial(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <EditIcon className="text-sm" />
//                       <span>Edit</span>
//                     </motion.button>
//                     <motion.button
//                       onClick={() => handleDeleteClick(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <DeleteIcon className="text-sm" />
//                       <span>Delete</span>
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredTestimonials.length === 0 && (
//             <div className="text-center py-12">
//               <FormatQuote className="mx-auto text-gray-400 text-6xl mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
//               <p className="text-gray-600 mb-4">
//                 {testimonials.length === 0
//                   ? "You haven't created any testimonials yet."
//                   : "No testimonials match your current filters."}
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 Your email: {userEmail}
//               </p>
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Add Your First Testimonial
//               </motion.button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Testimonial Modal - Updated for personal use */}
//       <AnimatePresence>
//         {showCreateModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowCreateModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Add Your Testimonial</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Creating testimonial for: {userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="bg-gradient-to-t from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
//                 {/* User Info Banner */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-3">
//                     <Info className="w-5 h-5 text-blue-600" />
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">Personal Testimonial</p>
//                       <p className="text-sm text-blue-600">
//                         You're creating a testimonial with your logged-in email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={testimonialForm.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Email
//                     </label>
//                     <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-xl bg-gray-50">
//                       <EmailIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-700">{userEmail}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Email is read from your login cookies
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={testimonialForm.instrument}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       <option value="">Select an instrument</option>
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Teacher
//                     </label>
//                     <input
//                       type="text"
//                       name="teacher"
//                       value={testimonialForm.teacher}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your teacher's name"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Learning Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={testimonialForm.duration}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="e.g., 2 years"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Join Date *
//                     </label>
//                     <input
//                       type="text"
//                       name="joinDate"
//                       value={testimonialForm.joinDate}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="e.g., Jan 2023"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Age
//                     </label>
//                     <input
//                       type="text"
//                       name="age"
//                       value={testimonialForm.age}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your age"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Rating *
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     {ratingOptions.map((rating) => (
//                       <button
//                         key={rating}
//                         type="button"
//                         onClick={() => handleRatingChange(rating)}
//                         className={`p-2 rounded-lg transition-all duration-200 ${
//                           rating <= testimonialForm.rating
//                             ? 'bg-yellow-100 text-yellow-600'
//                             : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                         }`}
//                       >
//                         <Star className="text-xl" />
//                       </button>
//                     ))}
//                     <span className="ml-2 text-sm text-gray-600">
//                       {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Testimonial Text *
//                   </label>
//                   <textarea
//                     name="testimonialText"
//                     value={testimonialForm.testimonialText}
//                     onChange={handleInputChange}
//                     required
//                     rows={4}
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     placeholder="Share your learning experience..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     value={testimonialForm.status}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {statusOptions.map(status => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <AddIcon className="text-sm" />
//                     <span>Add My Testimonial</span>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Create Confirmation Modal */}
//       <AnimatePresence>
//         {showCreateConfirmModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowCreateConfirmModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <AddIcon className="text-indigo-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Add Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to add a testimonial with your email <strong>{userEmail}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Name:</span>
//                     <span className="text-sm font-medium">{testimonialForm.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{testimonialForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Duration:</span>
//                     <span className="text-sm font-medium">{testimonialForm.duration}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Rating:</span>
//                     <span className="text-sm font-medium">{renderStars(testimonialForm.rating)}</span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowCreateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateTestimonial}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Adding...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Add My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Testimonial Modal - Updated for personal use */}
//       <AnimatePresence>
//         {showEditModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowEditModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Edit Your Testimonial</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Editing testimonial for: {userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
//                 {/* User Info Banner */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-3">
//                     <Info className="w-5 h-5 text-blue-600" />
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">Your Testimonial</p>
//                       <p className="text-sm text-blue-600">
//                         You're editing your testimonial created with email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Email
//                     </label>
//                     <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-xl bg-gray-50">
//                       <EmailIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-700">{userEmail}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Email cannot be changed
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={editForm.instrument}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Teacher
//                     </label>
//                     <input
//                       type="text"
//                       name="teacher"
//                       value={editForm.teacher}
//                       onChange={handleEditInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Learning Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={editForm.duration}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Join Date *
//                     </label>
//                     <input
//                       type="text"
//                       name="joinDate"
//                       value={editForm.joinDate}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Age
//                     </label>
//                     <input
//                       type="text"
//                       name="age"
//                       value={editForm.age}
//                       onChange={handleEditInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Rating *
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     {ratingOptions.map((rating) => (
//                       <button
//                         key={rating}
//                         type="button"
//                         onClick={() => handleEditRatingChange(rating)}
//                         className={`p-2 rounded-lg transition-all duration-200 ${
//                           rating <= editForm.rating
//                             ? 'bg-yellow-100 text-yellow-600'
//                             : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                         }`}
//                       >
//                         <Star className="text-xl" />
//                       </button>
//                     ))}
//                     <span className="ml-2 text-sm text-gray-600">
//                       {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Testimonial Text *
//                   </label>
//                   <textarea
//                     name="testimonialText"
//                     value={editForm.testimonialText}
//                     onChange={handleEditInputChange}
//                     required
//                     rows={4}
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     value={editForm.status}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {statusOptions.map(status => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <Save className="text-sm" />
//                     <span>Update My Testimonial</span>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Update Confirmation Modal */}
//       <AnimatePresence>
//         {showUpdateConfirmModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowUpdateConfirmModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Update className="text-green-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Update Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to update your testimonial for <strong>{editForm.instrument}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{editForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Duration:</span>
//                     <span className="text-sm font-medium">{editForm.duration}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Rating:</span>
//                     <span className="text-sm font-medium">{renderStars(editForm.rating)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(editForm.status)}`}>
//                       {editForm.status.charAt(0).toUpperCase() + editForm.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowUpdateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTestimonial}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Updating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Update My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* View Testimonial Modal */}
//       <AnimatePresence>
//         {showViewModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowViewModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Your Testimonial Details</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Viewing your testimonial created with: {selectedTestimonial.email || userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Header */}
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl relative">
//                     {selectedTestimonial.name.split(' ').map(n => n[0]).join('')}
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                       <AccountCircle className="text-white text-xs" />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name}</h3>
//                       <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                         My Testimonial
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-4 mt-2">
//                       {renderStars(selectedTestimonial.rating)}
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
//                         {selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Details Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Instrument</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <MusicNote className="text-gray-400" />
//                         <span>{selectedTestimonial.instrument}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Duration</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <Schedule className="text-gray-400" />
//                         <span>{selectedTestimonial.duration}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Join Date</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <CalendarToday className="text-gray-400" />
//                         <span>{selectedTestimonial.joinDate}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     {selectedTestimonial.email && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Your Email</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <EmailIcon className="text-gray-400" />
//                           <span>{selectedTestimonial.email}</span>
//                         </p>
//                       </div>
//                     )}
//                     {selectedTestimonial.age && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Your Age</label>
//                         <p className="text-lg text-gray-900">{selectedTestimonial.age} years old</p>
//                       </div>
//                     )}
//                     {selectedTestimonial.teacher && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Your Teacher</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <Person className="text-gray-400" />
//                           <span>{selectedTestimonial.teacher}</span>
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Testimonial Text */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-3">Your Testimonial</label>
//                   <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                     <FormatQuote className="text-gray-300 text-4xl mb-2" />
//                     <p className="text-gray-700 text-lg leading-relaxed italic">
//                       "{selectedTestimonial.testimonialText}"
//                     </p>
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Created At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Updated At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.updatedAt)}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal - Updated for personal use */}
//       <AnimatePresence>
//         {showDeleteModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowDeleteModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Delete Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete your testimonial for <strong>{selectedTestimonial.instrument}</strong>?
//                   This action cannot be undone.
//                 </p>

//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-2">
//                     <Warning className="w-5 h-5 text-red-600" />
//                     <p className="text-sm text-red-700">
//                       This will permanently delete your testimonial from the system.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteTestimonial}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Deleting...</span>
//                       </>
//                     ) : (
//                       <>
//                         <DeleteIcon className="text-sm" />
//                         <span>Delete My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

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
//   ChevronRight
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
//   { value: 'pending', label: 'Pending' },
//   { value: 'approved', label: 'Approved' },
//   { value: 'rejected', label: 'Rejected' }
// ];

// export const MyTestimonialManagement = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

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

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);

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
//         // console.log('User logged in with email:', email);

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
//   const fetchMyTestimonials = async () => {
//     if (!userEmail) return;

//     try {
//       setLoading(true);

//       // Fetch testimonials by email from API
//       try {
//         const response = await api.get(`/testimonials/email/${encodeURIComponent(userEmail)}`);

//         // console.log('API Response:', response.data);

//         if (response.status === 200 && response.data) {
//           // Handle different response structures
//           let apiTestimonials = [];

//           if (Array.isArray(response.data)) {
//             apiTestimonials = response.data;
//           } else if (response.data.data && Array.isArray(response.data.data)) {
//             apiTestimonials = response.data.data;
//           } else if (response.data.testimonials && Array.isArray(response.data.testimonials)) {
//             apiTestimonials = response.data.testimonials;
//           }

//           // Clean up data - ensure required fields exist
//           const cleanedTestimonials = apiTestimonials.map(testimonial => ({
//             _id: testimonial._id || testimonial.id || Date.now().toString(),
//             name: testimonial.name || 'Anonymous',
//             instrument: testimonial.instrument || 'Not specified',
//             duration: testimonial.duration || 'Not specified',
//             joinDate: testimonial.joinDate || 'Not specified',
//             rating: testimonial.rating || 0,
//             text: testimonial.text || testimonial.testimonialText || '',
//             status: testimonial.status || 'pending',
//             email: testimonial.email || userEmail,
//             ageGroup: testimonial.ageGroup || '',
//             location: testimonial.location || '',
//             createdAt: testimonial.createdAt || new Date().toISOString(),
//             updatedAt: testimonial.updatedAt || new Date().toISOString()
//           }));

//           setTestimonials(cleanedTestimonials);
//           console.log('Loaded testimonials:', cleanedTestimonials.length);
//         } else {
//           console.log('No testimonials found for this email');
//           setTestimonials([]);
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
//       alert('You must be logged in to create a testimonial');
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

//       // console.log('Sending testimonial data:', testimonialData);

//       // Send POST request to create testimonial
//       const response = await api.post('/testimonials', testimonialData);

//       // console.log('Create response:', response);

//       if (response.status === 201 || response.status === 200) {
//         const newTestimonial = response.data;
//         // console.log('Created testimonial:', newTestimonial);

//         // Add to state
//         setTestimonials(prev => [newTestimonial, ...prev]);
//         setShowCreateModal(false);
//         setShowCreateConfirmModal(false);
//         resetTestimonialForm();
//         setCurrentPage(1); // Reset to first page

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
//       alert('You can only edit your own testimonials');
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
//       toast.success('You can only update your own testimonials');
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
//       toast.success('You can only delete your own testimonials');
//       return;
//     }

//     setSelectedTestimonial(testimonial);
//     setShowDeleteModal(true);
//   };

//   // Delete testimonial using axios - only for current user
//   const handleDeleteTestimonial = async () => {
//     if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
//       toast.success('You can only delete your own testimonials');
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

//         // Adjust page if needed
//         const totalPages = Math.ceil((testimonials.length - 1) / itemsPerPage);
//         if (currentPage > totalPages && totalPages > 0) {
//           setCurrentPage(totalPages);
//         }

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
//       alert(`Error deleting testimonial: ${errorMessage}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setShowViewModal(true);
//   };

//   // Get status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
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
//     // Safeguard against undefined/null values
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
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTestimonials = filteredTestimonials.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Calculate statistics for current user only
//   const totalTestimonials = testimonials.length;
//   const approvedTestimonials = testimonials.filter(t => t.status === 'approved').length;
//   const averageRating = testimonials.length > 0
//     ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
//     : 0;

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
//               You need to be logged in to view and manage your testimonials.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => window.location.href = '/'}
//                 className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Go to Login Page
//               </button>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">
//             Loading your testimonials...
//           </p>
//           {userEmail && (
//             <p className="mt-2 text-sm text-gray-500">
//               For: {userEmail}
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header with Menu Button */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <MenuIcon className="text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">My Testimonials</h1>
//                 <p className="text-gray-600 mt-1">Manage your personal testimonials and reviews</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <p className="text-sm text-gray-500">
//                     Logged in as: <span className="font-medium">{userEmail}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               onClick={() => setShowCreateModal(true)}
//               className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <AddIcon />
//               <span className="hidden sm:inline">Add My Testimonial</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Cookie Information Banner */}
//         <div className="bg-blue-50 border border-blue-200 m-4 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//               <div>
//                 <p className="text-sm font-medium text-blue-800">
//                   Personal Testimonial Mode
//                 </p>
//                 <p className="text-xs text-blue-600">
//                   Showing only your testimonials from email: {userEmail}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={fetchMyTestimonials}
//               className="text-xs text-blue-700 hover:text-blue-900"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-4 lg:p-6">
//           {/* Search and Filters */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Search */}
//               <div className="relative lg:col-span-2">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search your testimonials..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 />
//               </div>

//               {/* Instrument Filter */}
//               <select
//                 value={filterInstrument}
//                 onChange={(e) => setFilterInstrument(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Instruments</option>
//                 {instruments.map(instrument => (
//                   <option key={instrument} value={instrument}>
//                     {instrument}
//                   </option>
//                 ))}
//               </select>

//               {/* Rating Filter */}
//               <select
//                 value={filterRating}
//                 onChange={(e) => setFilterRating(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Ratings</option>
//                 {ratingOptions.map(rating => (
//                   <option key={rating} value={rating}>
//                     {rating} Star{rating !== 1 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Status Filter and Reset */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Status</option>
//                 {statusOptions.map(status => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>

//               <div className="flex justify-end">
//                 <button
//                   onClick={resetFilters}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <FilterList className="text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Testimonials</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Approved</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{approvedTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <ThumbUp className="text-green-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Average Rating</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageRating}/5</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                   <Star className="text-yellow-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Showing</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">
//                     {currentTestimonials.length} of {filteredTestimonials.length}
//                   </p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <FilterList className="text-blue-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Testimonials Grid - Showing 3 per page */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
//             {currentTestimonials.map((testimonial) => (
//               <motion.div
//                 key={testimonial._id || testimonial.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="p-4 lg:p-6">
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg relative">
//                         {(testimonial.name || '').split(' ').map(n => n?.[0] || '').join('') || 'U'}
//                         <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                           <AccountCircle className="text-white text-xs" />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <h3 className="text-lg font-semibold text-gray-900">{testimonial.name || 'Anonymous'}</h3>
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                             Me
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500">ID: #{testimonial._id?.substring(0, 8) || testimonial.id?.substring(0, 8) || 'N/A'}</p>
//                         <p className="text-xs text-gray-400">Email: {testimonial.email || userEmail}</p>
//                       </div>
//                     </div>
//                     <div className="items-end space-y-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
//                         {(testimonial.status || 'pending').charAt(0).toUpperCase() + (testimonial.status || 'pending').slice(1)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center space-x-3">
//                       <MusicNote className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">{testimonial.instrument || 'Not specified'}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Schedule className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">{testimonial.duration || 'Not specified'}</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <CalendarToday className="text-gray-400 text-sm" />
//                       <span className="text-sm text-gray-600">Joined {testimonial.joinDate || 'Not specified'}</span>
//                     </div>
//                     {testimonial.location && (
//                       <div className="flex items-center space-x-3">
//                         <Person className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">Location: {testimonial.location}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Testimonial Text */}
//                   <div className="mb-4">
//                     <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
//                       "{testimonial.text || 'No testimonial text provided'}"
//                     </p>
//                   </div>

//                   {/* Rating */}
//                   <div className="mb-4">
//                     {renderStars(testimonial.rating)}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex space-x-2 pt-4 border-t border-gray-100">
//                     <motion.button
//                       onClick={() => handleViewTestimonial(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <ViewIcon className="text-sm" />
//                       <span>View</span>
//                     </motion.button>
//                     <motion.button
//                       onClick={() => handleEditTestimonial(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <EditIcon className="text-sm" />
//                       <span>Edit</span>
//                     </motion.button>
//                     <motion.button
//                       onClick={() => handleDeleteClick(testimonial)}
//                       className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <DeleteIcon className="text-sm" />
//                       <span>Delete</span>
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center space-x-4 mt-6">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
//                   currentPage === 1
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 <ChevronLeft className="text-sm" />
//                 <span>Previous</span>
//               </button>

//               <div className="flex items-center space-x-2">
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => paginate(index + 1)}
//                     className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
//                       currentPage === index + 1
//                         ? 'bg-indigo-600 text-white'
//                         : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
//                   currentPage === totalPages
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 <span>Next</span>
//                 <ChevronRight className="text-sm" />
//               </button>
//             </div>
//           )}

//           {/* Empty State */}
//           {filteredTestimonials.length === 0 && (
//             <div className="text-center py-12">
//               <FormatQuote className="mx-auto text-gray-400 text-6xl mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
//               <p className="text-gray-600 mb-4">
//                 {testimonials.length === 0
//                   ? "You haven't created any testimonials yet."
//                   : "No testimonials match your current filters."}
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 Your email: {userEmail}
//               </p>
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Add Your First Testimonial
//               </motion.button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Testimonial Modal */}
//       <AnimatePresence>
//         {showCreateModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowCreateModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Add Your Testimonial</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Creating testimonial for: {userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="bg-gradient-to-t from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
//                 {/* User Info Banner */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-3">
//                     <Info className="w-5 h-5 text-blue-600" />
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">Personal Testimonial</p>
//                       <p className="text-sm text-blue-600">
//                         You're creating a testimonial with your logged-in email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={testimonialForm.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Email
//                     </label>
//                     <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-xl bg-gray-50">
//                       <EmailIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-700">{userEmail}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Email is read from your login cookies
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={testimonialForm.instrument}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       <option value="">Select an instrument</option>
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Location
//                     </label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={testimonialForm.location}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter your city/country"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Learning Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={testimonialForm.duration}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="e.g., 2 years"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Join Date *
//                     </label>
//                     <input
//                       type="text"
//                       name="joinDate"
//                       value={testimonialForm.joinDate}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="e.g., Jan 2023"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age Group
//                     </label>
//                     <select
//                       name="ageGroup"
//                       value={testimonialForm.ageGroup}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {ageGroupOptions.map(group => (
//                         <option key={group.value} value={group.value}>
//                           {group.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Rating *
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     {ratingOptions.map((rating) => (
//                       <button
//                         key={rating}
//                         type="button"
//                         onClick={() => handleRatingChange(rating)}
//                         className={`p-2 rounded-lg transition-all duration-200 ${
//                           rating <= testimonialForm.rating
//                             ? 'bg-yellow-100 text-yellow-600'
//                             : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                         }`}
//                       >
//                         <Star className="text-xl" />
//                       </button>
//                     ))}
//                     <span className="ml-2 text-sm text-gray-600">
//                       {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Testimonial Text * (max 500 characters)
//                   </label>
//                   <textarea
//                     name="text"
//                     value={testimonialForm.text}
//                     onChange={handleInputChange}
//                     required
//                     maxLength={500}
//                     rows={4}
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     placeholder="Share your learning experience..."
//                   />
//                   <div className="text-right text-sm text-gray-500 mt-1">
//                     {testimonialForm.text.length}/500 characters
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     value={testimonialForm.status}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {statusOptions.map(status => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <AddIcon className="text-sm" />
//                     <span>Add My Testimonial</span>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Create Confirmation Modal */}
//       <AnimatePresence>
//         {showCreateConfirmModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowCreateConfirmModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <AddIcon className="text-indigo-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Add Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to add a testimonial with your email <strong>{userEmail}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Name:</span>
//                     <span className="text-sm font-medium">{testimonialForm.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{testimonialForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Duration:</span>
//                     <span className="text-sm font-medium">{testimonialForm.duration}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Rating:</span>
//                     <span className="text-sm font-medium">{renderStars(testimonialForm.rating)}</span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowCreateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateTestimonial}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Adding...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Add My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Testimonial Modal */}
//       <AnimatePresence>
//         {showEditModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowEditModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Edit Your Testimonial</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Editing testimonial for: {userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
//                 {/* User Info Banner */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-3">
//                     <Info className="w-5 h-5 text-blue-600" />
//                     <div>
//                       <p className="text-sm font-medium text-blue-800">Your Testimonial</p>
//                       <p className="text-sm text-blue-600">
//                         You're editing your testimonial created with email: {userEmail}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Email
//                     </label>
//                     <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-xl bg-gray-50">
//                       <EmailIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-700">{userEmail}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Email cannot be changed
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument You Learned *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={editForm.instrument}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {instruments.map(instrument => (
//                         <option key={instrument} value={instrument}>
//                           {instrument}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Location
//                     </label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={editForm.location}
//                       onChange={handleEditInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Learning Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={editForm.duration}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Join Date *
//                     </label>
//                     <input
//                       type="text"
//                       name="joinDate"
//                       value={editForm.joinDate}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age Group
//                     </label>
//                     <select
//                       name="ageGroup"
//                       value={editForm.ageGroup}
//                       onChange={handleEditInputChange}
//                       className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {ageGroupOptions.map(group => (
//                         <option key={group.value} value={group.value}>
//                           {group.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Rating *
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     {ratingOptions.map((rating) => (
//                       <button
//                         key={rating}
//                         type="button"
//                         onClick={() => handleEditRatingChange(rating)}
//                         className={`p-2 rounded-lg transition-all duration-200 ${
//                           rating <= editForm.rating
//                             ? 'bg-yellow-100 text-yellow-600'
//                             : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                         }`}
//                       >
//                         <Star className="text-xl" />
//                       </button>
//                     ))}
//                     <span className="ml-2 text-sm text-gray-600">
//                       {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Testimonial Text * (max 500 characters)
//                   </label>
//                   <textarea
//                     name="text"
//                     value={editForm.text}
//                     onChange={handleEditInputChange}
//                     required
//                     maxLength={500}
//                     rows={4}
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                   />
//                   <div className="text-right text-sm text-gray-500 mt-1">
//                     {editForm.text.length}/500 characters
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     value={editForm.status}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {statusOptions.map(status => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <Save className="text-sm" />
//                     <span>Update My Testimonial</span>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Update Confirmation Modal */}
//       <AnimatePresence>
//         {showUpdateConfirmModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowUpdateConfirmModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Update className="text-green-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Update Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to update your testimonial for <strong>{editForm.instrument}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{editForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Duration:</span>
//                     <span className="text-sm font-medium">{editForm.duration}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Rating:</span>
//                     <span className="text-sm font-medium">{renderStars(editForm.rating)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(editForm.status)}`}>
//                       {editForm.status.charAt(0).toUpperCase() + editForm.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowUpdateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTestimonial}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Updating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Update My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* View Testimonial Modal */}
//       <AnimatePresence>
//         {showViewModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowViewModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Your Testimonial Details</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Viewing your testimonial created with: {selectedTestimonial.email || userEmail}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Header */}
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl relative">
//                     {(selectedTestimonial.name || '').split(' ').map(n => n?.[0] || '').join('') || 'U'}
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                       <AccountCircle className="text-white text-xs" />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name || 'Anonymous'}</h3>
//                       <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                         My Testimonial
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-4 mt-2">
//                       {renderStars(selectedTestimonial.rating)}
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
//                         {(selectedTestimonial.status || 'pending').charAt(0).toUpperCase() + (selectedTestimonial.status || 'pending').slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Details Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Instrument</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <MusicNote className="text-gray-400" />
//                         <span>{selectedTestimonial.instrument || 'Not specified'}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Duration</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <Schedule className="text-gray-400" />
//                         <span>{selectedTestimonial.duration || 'Not specified'}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Join Date</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <CalendarToday className="text-gray-400" />
//                         <span>{selectedTestimonial.joinDate || 'Not specified'}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     {selectedTestimonial.email && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Your Email</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <EmailIcon className="text-gray-400" />
//                           <span>{selectedTestimonial.email}</span>
//                         </p>
//                       </div>
//                     )}
//                     {selectedTestimonial.ageGroup && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Age Group</label>
//                         <p className="text-lg text-gray-900">
//                           {ageGroupOptions.find(g => g.value === selectedTestimonial.ageGroup)?.label || selectedTestimonial.ageGroup}
//                         </p>
//                       </div>
//                     )}
//                     {selectedTestimonial.location && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Location</label>
//                         <p className="text-lg text-gray-900">
//                           {selectedTestimonial.location}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Testimonial Text */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-3">Your Testimonial</label>
//                   <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                     <FormatQuote className="text-gray-300 text-4xl mb-2" />
//                     <p className="text-gray-700 text-lg leading-relaxed italic">
//                       "{selectedTestimonial.text || 'No testimonial text provided'}"
//                     </p>
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Created At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Updated At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.updatedAt)}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-3 rounded-xl transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteModal && selectedTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowDeleteModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-2xl" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Delete Your Testimonial?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete your testimonial for <strong>{selectedTestimonial.instrument}</strong>?
//                   This action cannot be undone.
//                 </p>

//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
//                   <div className="flex items-center gap-2">
//                     <Warning className="w-5 h-5 text-red-600" />
//                     <p className="text-sm text-red-700">
//                       This will permanently delete your testimonial from the system.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-3 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteTestimonial}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Deleting...</span>
//                       </>
//                     ) : (
//                       <>
//                         <DeleteIcon className="text-sm" />
//                         <span>Delete My Testimonial</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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
  LocationOn,
} from "@mui/icons-material";
import { toast } from "react-toastify";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Helper function to get email from cookies
const getEmailFromCookies = () => {
  const possibleCookieNames = [
    "userEmail",
    "email",
    "user_email",
    "auth_email",
    "login_email",
    "userData",
    "user",
    "currentUser",
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
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.email) return parsed.email;
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return null;
};

const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// Create axios instance with interceptors for better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// Instruments for selection
const instruments = [
  "Piano",
  "Guitar",
  "Violin",
  "Drums",
  "Flute",
  "Saxophone",
  "Trumpet",
  "Cello",
  "Clarinet",
  "Voice",
  "Bass Guitar",
  "Keyboard",
  "Harp",
  "Ukulele",
  "Mandolin",
];

// Rating options
const ratingOptions = [1, 2, 3, 4, 5];

// Status options matching the schema
const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "approved",
    label: "Approved",
    color: "bg-green-100 text-green-800",
  },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial, onEdit, onDelete, onView }) => {
  const statusInfo =
    statusOptions.find((opt) => opt.value === testimonial.status) ||
    statusOptions[0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <AccountCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                {testimonial.name || "Anonymous"}
              </h3>
              {testimonial.isVerified && (
                <Verified
                  className="w-4 h-4 text-green-500 ml-1"
                  title="Verified"
                />
              )}
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
          </div>
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => onView(testimonial)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="View details"
          >
            <ViewIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(testimonial)}
            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            title="Edit"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(testimonial)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <DeleteIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Additional testimonial info */}
      {testimonial.instrument && (
        <div className="text-sm text-gray-700 mb-1 flex items-center">
          <MusicNote className="w-3 h-3 mr-1 text-gray-500" />
          <strong>Instrument:</strong>{" "}
          <span className="ml-1">{testimonial.instrument}</span>
        </div>
      )}

      {testimonial.rating && (
        <div className="flex items-center text-sm text-gray-700 mb-1">
          <strong className="mr-1">Rating:</strong>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
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

      <div className="flex space-x-2">
        <button
          onClick={() => onView(testimonial)}
          className="flex-1 px-2 py-1 text-xs bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
        >
          <ViewIcon className="w-3 h-3" />
          <span>View</span>
        </button>
        <button
          onClick={() => onEdit(testimonial)}
          className="flex-1 px-2 py-1 text-xs bg-green-50 border border-green-200 text-green-700 rounded hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
        >
          <EditIcon className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export const MyTestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInstrument, setFilterInstrument] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
    location: "",
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
    location: "",
  });

  // Age group options
  const ageGroupOptions = [
    { value: "", label: "Select age group" },
    { value: "child", label: "Child (0-12)" },
    { value: "teen", label: "Teen (13-19)" },
    { value: "adult", label: "Adult (20-59)" },
    { value: "senior", label: "Senior (60+)" },
  ];

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const email = getEmailFromCookies();
      if (email) {
        setUserEmail(email);
        setIsLoggedIn(true);

        // Pre-fill email in form
        setTestimonialForm((prev) => ({
          ...prev,
          email: email,
        }));
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Format date safely
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Not specified";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Fetch testimonials for current user from API
  const fetchMyTestimonials = async (page = 1) => {
    if (!userEmail) return;

    try {
      setLoading(true);

      // Fetch testimonials by email from API
      try {
        const response = await api.get(
          `/testimonials?page=${page}&limit=10&email=${encodeURIComponent(userEmail)}`,
        );

        if (response.data && response.data.success) {
          const testimonialsData = response.data.data || [];
          setTestimonials(testimonialsData);

          // Set pagination info
          setPagination({
            currentPage: response.data.currentPage || page,
            totalPages: response.data.totalPages || 1,
            totalCount: response.data.totalCount || 0,
            hasNextPage: response.data.pagination?.hasNextPage || false,
            hasPrevPage: response.data.pagination?.hasPrevPage || false,
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
            hasPrevPage: false,
          });
        }
      } catch (apiError) {
        console.error("Error fetching testimonials from API:", apiError);
        // Fallback to empty array
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      fetchMyTestimonials();
    }
  }, [isLoggedIn, userEmail]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMyTestimonials(newPage);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setTestimonialForm((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Handle edit rating change
  const handleEditRatingChange = (rating) => {
    setEditForm((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Create new testimonial using axios - for current user only
  const handleCreateTestimonial = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.warning("You must be logged in to create a testimonial");
      return;
    }

    setActionLoading(true);

    try {
      // Prepare data for API (matching the schema)
      const testimonialData = {
        name: testimonialForm.name,
        instrument: testimonialForm.instrument,
        duration: testimonialForm.duration,
        joinDate: testimonialForm.joinDate,
        rating: testimonialForm.rating,
        text: testimonialForm.text,
        status: testimonialForm.status,
        email: userEmail, // Always use logged-in user's email
        ageGroup: testimonialForm.ageGroup || undefined,
        location: testimonialForm.location || undefined,
      };

      // Send POST request to create testimonial
      const response = await api.post("/testimonials", testimonialData);

      if (response.status === 201 || response.status === 200) {
        const newTestimonial = response.data;

        // Refresh the list
        fetchMyTestimonials(pagination.currentPage);
        setShowCreateModal(false);
        resetTestimonialForm();

        // Show success message
        toast.success("Testimonial created successfully!");
      } else {
        throw new Error(`Failed to create testimonial: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating testimonial:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      toast.warning(`Error creating testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Reset form helper
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
      location: "",
    });
  };

  // Open edit modal
  const handleEditTestimonial = (testimonial) => {
    if (testimonial.email !== userEmail) {
      toast.warning("You can only edit your own testimonials");
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
      location: testimonial.location || "",
    });
    setShowEditModal(true);
  };

  // Update testimonial using axios - only for current user
  const handleUpdateTestimonial = async (e) => {
    e.preventDefault();

    if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
      toast.warning("You can only update your own testimonials");
      return;
    }

    setActionLoading(true);
    try {
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      if (!testimonialId) {
        throw new Error("Testimonial ID not found");
      }

      // Prepare update data
      const updateData = {
        name: editForm.name,
        instrument: editForm.instrument,
        duration: editForm.duration,
        joinDate: editForm.joinDate,
        rating: editForm.rating,
        text: editForm.text,
        status: editForm.status,
        email: userEmail, // Ensure email stays the same
        ageGroup: editForm.ageGroup || undefined,
        location: editForm.location || undefined,
      };

      // Send PUT request to update testimonial
      const response = await api.put(
        `/testimonials/${testimonialId}`,
        updateData,
      );

      if (response.status === 200) {
        const updatedTestimonial = response.data;

        // Update in state
        setTestimonials((prev) =>
          prev.map((test) =>
            (test._id || test.id) === testimonialId ? updatedTestimonial : test,
          ),
        );
        setShowEditModal(false);
        setSelectedTestimonial(null);

        // Show success message
        toast.success("Testimonial updated successfully!");
      } else {
        throw new Error(`Failed to update testimonial: ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      toast.warning(`Error updating testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (testimonial) => {
    if (testimonial.email !== userEmail) {
      toast.warning("You can only delete your own testimonials");
      return;
    }

    setSelectedTestimonial(testimonial);
    setShowDeleteModal(true);
  };

  // Delete testimonial using axios - only for current user
  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial || selectedTestimonial.email !== userEmail) {
      toast.warning("You can only delete your own testimonials");
      return;
    }

    setActionLoading(true);
    try {
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      if (!testimonialId) {
        throw new Error("Testimonial ID not found");
      }

      // Send DELETE request
      const response = await api.delete(`/testimonials/${testimonialId}`);

      if (response.status === 200 || response.status === 204) {
        // Remove from state
        setTestimonials((prev) =>
          prev.filter((test) => (test._id || test.id) !== testimonialId),
        );
        setShowDeleteModal(false);
        setSelectedTestimonial(null);

        // Update total count
        setPagination((prev) => ({
          ...prev,
          totalCount: prev.totalCount - 1,
        }));

        // Show success message
        toast.success("Testimonial deleted successfully!");
      } else {
        throw new Error(`Failed to delete testimonial: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      toast.warning(`Error deleting testimonial: ${errorMessage}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowViewModal(true);
  };

  // Get status info
  const getStatusInfo = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option || statusOptions[0];
  };

  // Get rating stars
  const renderStars = (rating) => {
    const safeRating = rating || 0;
    return (
      <div className="flex items-center space-x-1">
        {ratingOptions.map((star) => (
          <span
            key={star}
            className={star <= safeRating ? "text-yellow-400" : "text-gray-300"}
          >
            {star <= safeRating ? (
              <Star className="text-sm" />
            ) : (
              <StarBorder className="text-sm" />
            )}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({safeRating})</span>
      </div>
    );
  };

  // Filter testimonials based on search and filters with safety checks
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (!testimonial || typeof testimonial !== "object") return false;

    const name = testimonial?.name || "";
    const instrument = testimonial?.instrument || "";
    const text = testimonial?.text || "";
    const rating = testimonial?.rating || 0;
    const status = testimonial?.status || "";

    // Convert search term to lowercase for case-insensitive search
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(searchLower) ||
      instrument.toLowerCase().includes(searchLower) ||
      text.toLowerCase().includes(searchLower);

    const matchesInstrument =
      filterInstrument === "all" || instrument === filterInstrument;
    const matchesRating =
      filterRating === "all" || rating === parseInt(filterRating);
    const matchesStatus = filterStatus === "all" || status === filterStatus;

    return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterInstrument("all");
    setFilterRating("all");
    setFilterStatus("all");
  };

  // Calculate statistics for current user only
  const totalTestimonials = pagination.totalCount || testimonials.length;
  const approvedTestimonials = testimonials.filter(
    (t) => t.status === "approved",
  ).length;
  const pendingTestimonials = testimonials.filter(
    (t) => t.status === "pending",
  ).length;
  const rejectedTestimonials = testimonials.filter(
    (t) => t.status === "rejected",
  ).length;
  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
          testimonials.length
        ).toFixed(1)
      : 0;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Warning className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view and manage your testimonials.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Login Page
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
          {userEmail && (
            <p className="mt-2 text-sm text-gray-300">For: {userEmail}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
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
                      My Testimonials
                    </h1>
                    <p className="text-gray-100 text-sm sm:text-base">
                      Manage your personal testimonials and reviews
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-100">
                        Logged in as:{" "}
                        <span className="font-medium">{userEmail}</span>
                      </p>
                    </div>
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
                        <Person className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 mb-6">
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
                        onClick={() =>
                          fetchMyTestimonials(pagination.currentPage)
                        }
                        disabled={loading}
                        className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <AddIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          New Testimonial
                        </span>
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
                      {instruments.map((instrument) => (
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
                      {ratingOptions.map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      {statusOptions.map((status) => (
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
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Total</p>
                      <p className="text-xl font-bold text-white">
                        {totalTestimonials}
                      </p>
                    </div>
                    <FormatQuote className="text-white/50" />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Approved</p>
                      <p className="text-xl font-bold text-white">
                        {approvedTestimonials}
                      </p>
                    </div>
                    <ThumbUp className="text-green-400" />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Average Rating</p>
                      <p className="text-xl font-bold text-white">
                        {averageRating}/5
                      </p>
                    </div>
                    <Star className="text-yellow-400" />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-100">Pending</p>
                      <p className="text-xl font-bold text-white">
                        {pendingTestimonials}
                      </p>
                    </div>
                    <Warning className="text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Testimonials Content */}
              {filteredTestimonials.length === 0 ? (
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
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Add Your First Testimonial
                    </button>
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
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Testimonial
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Instrument
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Rating
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                              Created
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredTestimonials.map((testimonial) => {
                            const statusInfo = getStatusInfo(
                              testimonial.status,
                            );

                            return (
                              <tr
                                key={testimonial._id || testimonial.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <AccountCircle className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                          {testimonial.name || "Anonymous"}
                                        </div>
                                        {testimonial.isVerified && (
                                          <Verified
                                            className="w-4 h-4 text-green-500 ml-1"
                                            title="Verified"
                                          />
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                        {testimonial.text
                                          ? `"${testimonial.text.substring(0, 50)}..."`
                                          : "No text"}
                                      </div>
                                      <div className="lg:hidden text-xs text-gray-500 mt-1">
                                        {testimonial.createdAt.slice(0, 10)}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                                  <div className="text-sm text-gray-900">
                                    {testimonial.instrument}
                                  </div>
                                </td>
                                <td className="px-1 py-4 whitespace-nowrap sm:px-1">
                                  {/* {renderStars(testimonial.rating)} */}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                                  >
                                    {statusInfo.label}
                                  </span>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                                  <div className="text-sm text-gray-900">
                                    {testimonial.createdAt.slice(0, 10)}
                                  </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() =>
                                        handleViewTestimonial(testimonial)
                                      }
                                      className="px-2 py-1 bg-gradient-to-t from-blue-500 to-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 text-xs text-white"
                                      title="View"
                                    >
                                      <ViewIcon className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleEditTestimonial(testimonial)
                                      }
                                      className="px-2 py-1 bg-gradient-to-t from-green-500 to-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1 text-xs text-white"
                                      title="Edit"
                                    >
                                      <EditIcon className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteClick(testimonial)
                                      }
                                      className="px-2 py-1 bg-gradient-to-t from-red-500 to-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-1 text-xs text-white"
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

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="text-sm text-gray-700">
                        Showing page {pagination.currentPage} of{" "}
                        {pagination.totalPages}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handlePageChange(pagination.currentPage - 1)
                          }
                          disabled={!pagination.hasPrevPage}
                          className={`px-3 py-1 rounded-md text-sm ${
                            pagination.hasPrevPage
                              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            handlePageChange(pagination.currentPage + 1)
                          }
                          disabled={!pagination.hasNextPage}
                          className={`px-3 py-1 rounded-md text-sm ${
                            pagination.hasNextPage
                              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
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
                  {filteredTestimonials.map((testimonial) => (
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

              {/* Summary */}
              <div className="mt-4 text-sm text-gray-100">
                Showing{" "}
                <span className="font-medium">
                  {filteredTestimonials.length}
                </span>{" "}
                of <span className="font-medium">{totalTestimonials}</span>{" "}
                testimonials
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
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Add Your Testimonial
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gradient-to-t from-red-400 to-red-600 text-white transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form
                  onSubmit={handleCreateTestimonial}
                  className="p-4 sm:p-6 space-y-3 sm:space-y-4"
                >
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Your Email
                    </label>
                    <div className="flex items-center gap-2 px-3 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl bg-gray-50">
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      <option value="">Select an instrument</option>
                      {instruments.map((instrument) => (
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
                        className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                        className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          <Star className="text-sm sm:text-base" />
                        </button>
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                        {testimonialForm.rating} Star
                        {testimonialForm.rating !== 1 ? "s" : ""}
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map((status) => (
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
                      className="flex-1 bg-gradient-to-t from-red-400 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-gradient-to-t from-indigo-400 to-indigo-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <AddIcon className="text-xs sm:text-sm" />
                          <span>Add My Testimonial</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
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
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Edit Your Testimonial
                  </h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full hover:opacity-80 transition-opacity duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form
                  onSubmit={handleUpdateTestimonial}
                  className="p-4 sm:p-6 text-black space-y-3 sm:space-y-4"
                >
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {instruments.map((instrument) => (
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
                        className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                        className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          <Star className="text-sm sm:text-base" />
                        </button>
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                        {editForm.rating} Star{editForm.rating !== 1 ? "s" : ""}
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
                      className="w-full px-3 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map((status) => (
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
                      className="flex-1 bg-gradient-to-t from-red-400 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-gradient-to-t from-green-400 to-green-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="text-xs sm:text-sm" />
                          <span>Update My Testimonial</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
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
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Testimonial Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Name
                    </label>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">
                      {selectedTestimonial.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Instrument
                    </label>
                    <p className="text-sm sm:text-base text-gray-900">
                      {selectedTestimonial.instrument}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Status
                    </label>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedTestimonial.status).color}`}
                    >
                      {getStatusInfo(selectedTestimonial.status).label}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < selectedTestimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-700">
                        ({selectedTestimonial.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Testimonial Text
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 italic">
                      "{selectedTestimonial.text}"
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Created
                    </label>
                    <p className="text-sm sm:text-base text-gray-900">
                      {formatDate(selectedTestimonial.createdAt)}
                    </p>
                  </div>

                  {selectedTestimonial._id && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                        ID
                      </label>
                      <p className="text-xs text-gray-900 font-mono break-all">
                        {selectedTestimonial._id}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full bg-gradient-to-t from-red-400 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
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
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <DeleteIcon className="text-red-600 text-xl sm:text-2xl" />
                  </div>

                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    Delete Your Testimonial?
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to delete your testimonial for{" "}
                    <strong>{selectedTestimonial.instrument}</strong>? This
                    action cannot be undone.
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gradient-to-t from-red-400 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteTestimonial}
                      className="flex-1 bg-gradient-to-t from-red-500 to-red-700 text-white py-2 sm:py-3 px-3 sm:px-3 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
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
