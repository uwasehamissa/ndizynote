// /* eslint-disable no-dupe-else-if */
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
//   Email,
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
//   FormatQuote
// } from '@mui/icons-material';


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

// export const TestimonialManagement = () => {
//   // Initialize testimonials as empty array
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

//   // Fetch all testimonials using axios
//   const fetchTestimonials = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/testimonials');
      
//       // Handle different response formats
//       let data = [];
      
//       if (response.status === 200) {
//         // Check if response.data is an array
//         if (Array.isArray(response.data)) {
//           data = response.data;
//         } 
//         // Check if response.data.data exists and is an array (common API pattern)
//         else if (response.data && Array.isArray(response.data.data)) {
//           data = response.data.data;
//         }
//         // Check if response.data.testimonials exists and is an array
//         else if (response.data && Array.isArray(response.data.testimonials)) {
//           data = response.data.testimonials;
//         }
//         // If it's an object, convert it to array
//         else if (response.data && typeof response.data === 'object') {
//           data = Object.values(response.data);
//         }
//         // If it's a single object, wrap it in array
//         else if (response.data && typeof response.data === 'object') {
//           data = [response.data];
//         }
//         else {
//           console.error('Unexpected response format:', response.data);
//           data = getMockData();
//         }
//       } else {
//         console.error('Failed to fetch testimonials');
//         data = getMockData();
//       }
      
//       setTestimonials(data);
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       // Fallback to mock data
//       // setTestimonials(getMockData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function for mock data
//   const getMockData = () => {
//     return [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         instrument: "Piano",
//         duration: "2 years",
//         joinDate: "Jan 2023",
//         rating: 5,
//         testimonialText: "The piano lessons have been absolutely transformative! My teacher is incredibly patient and knowledgeable. I've improved so much in just two years.",
//         status: "published",
//         email: "sarah.johnson@email.com",
//         age: "28",
//         teacher: "Mr. Anderson",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 2,
//         name: "Michael Chen",
//         instrument: "Guitar",
//         duration: "6 months",
//         joinDate: "Jun 2023",
//         rating: 4,
//         testimonialText: "Great learning experience! The structured approach really helped me build a solid foundation.",
//         status: "published",
//         email: "michael.chen@email.com",
//         age: "22",
//         teacher: "Ms. Garcia",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 3,
//         name: "Emma Rodriguez",
//         instrument: "Violin",
//         duration: "1 year",
//         joinDate: "Mar 2023",
//         rating: 5,
//         testimonialText: "As an adult beginner, I was nervous about learning violin. But my teacher made it so accessible and fun! Highly recommended.",
//         status: "draft",
//         email: "emma.rodriguez@email.com",
//         age: "35",
//         teacher: "Mr. Thompson",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 4,
//         name: "David Kim",
//         instrument: "Drums",
//         duration: "3 years",
//         joinDate: "Aug 2022",
//         rating: 5,
//         testimonialText: "Three years of drumming and I'm still learning new things every week. The instructors are world-class!",
//         status: "published",
//         email: "david.kim@email.com",
//         age: "19",
//         teacher: "Mr. Wilson",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 5,
//         name: "Lisa Thompson",
//         instrument: "Voice",
//         duration: "8 months",
//         joinDate: "Apr 2023",
//         rating: 4,
//         testimonialText: "My vocal range has expanded tremendously. The breathing techniques alone were worth it!",
//         status: "archived",
//         email: "lisa.thompson@email.com",
//         age: "26",
//         teacher: "Ms. Davis",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//     ];
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

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
//   // const handleCreateSubmit = (e) => {
//   //   e.preventDefault();
//   //   setShowCreateConfirmModal(true);
//   // };






//   // Create new testimonial using axios
//   const handleCreateTestimonial = async () => {
//     setActionLoading(true);

//     try {
//       const response = await api.post('/testimonials', testimonialForm);

//       if (response.status === 201 || response.status === 200) {
//         const newTestimonial = response.data;
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
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
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
//       email: "",
//       age: "",
//       teacher: ""
//     });
//   };

//   // Open edit modal
//   const handleEditTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setEditForm({
//       name: testimonial.name || "",
//       instrument: testimonial.instrument || "",
//       duration: testimonial.duration || "",
//       joinDate: testimonial.joinDate || "",
//       rating: testimonial.rating || 5,
//       testimonialText: testimonial.testimonialText || "",
//       status: testimonial.status || "draft",
//       email: testimonial.email || "",
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

//   // Update testimonial using axios
//   const handleUpdateTestimonial = async () => {
//     if (!selectedTestimonial) return;

//     setActionLoading(true);
//     try {
//       const response = await api.put(`/testimonials/${selectedTestimonial.id}`, editForm);

//       if (response.status === 200) {
//         const updatedTestimonial = response.data;
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
//         updatedAt: new Date().toISOString()
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
//     setSelectedTestimonial(testimonial);
//     setShowDeleteModal(true);
//   };

//   // Delete testimonial using axios
//   const handleDeleteTestimonial = async () => {
//     if (!selectedTestimonial) return;

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
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
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
//     const validRating = rating || 0;
//     return (
//       <div className="flex items-center space-x-1">
//         {ratingOptions.map((star) => (
//           <span key={star} className={star <= validRating ? "text-yellow-400" : "text-gray-300"}>
//             {star <= validRating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
//           </span>
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({validRating})</span>
//       </div>
//     );
//   };

//   // Filter testimonials based on search and filters
//   const filteredTestimonials = Array.isArray(testimonials) 
//     ? testimonials.filter(testimonial => {
//         if (!testimonial) return false;
        
//         const name = testimonial.name || '';
//         const instrument = testimonial.instrument || '';
//         const testimonialText = testimonial.testimonialText || '';
//         const rating = testimonial.rating || 0;
//         const status = testimonial.status || '';
        
//         const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              testimonialText.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
//         const matchesRating = filterRating === 'all' || rating === parseInt(filterRating);
//         const matchesStatus = filterStatus === 'all' || status === filterStatus;
        
//         return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
//       })
//     : [];

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterInstrument('all');
//     setFilterRating('all');
//     setFilterStatus('all');
//   };

//   // Calculate statistics
//   const totalTestimonials = Array.isArray(testimonials) ? testimonials.length : 0;
//   const publishedTestimonials = Array.isArray(testimonials) 
//     ? testimonials.filter(t => t && t.status === 'published').length 
//     : 0;
//   const averageRating = Array.isArray(testimonials) && testimonials.length > 0 
//     ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
//     : 0;

//   if (loading) {
//     return (
//       <div className="flex bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex">
      
//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header with Menu Button */}
//         <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border-b border-gray-200 sticky top-0 z-40">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <MenuIcon className="text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Testimonial Management</h1>
//                 <p className="text-gray-100 mt-1">Manage student testimonials and reviews</p>
//               </div>
//             </div>
            
//             <motion.button
//               onClick={() => setShowCreateModal(true)}
//               className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <AddIcon />
//               <span className="hidden sm:inline">Add Testimonial</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-4 lg:p-6">
//           {/* Search and Filters */}
//           <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Search */}
//               <div className="relative lg:col-span-2">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search testimonials..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 />
//               </div>

//               {/* Instrument Filter */}
//               <select
//                 value={filterInstrument}
//                 onChange={(e) => setFilterInstrument(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Instruments</option>
//                 {instruments.map(instrument => (
//                   <option className='text-black' key={instrument} value={instrument}>
//                     {instrument}
//                   </option>
//                 ))}
//               </select>

//               {/* Rating Filter */}
//               <select
//                 value={filterRating}
//                 onChange={(e) => setFilterRating(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Ratings</option>
//                 {ratingOptions.map(rating => (
//                   <option className='text-black' key={rating} value={rating}>
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
//                 className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Status</option>
//                 {statusOptions.map(status => (
//                   <option className='text-black' key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>

//               <div className="flex justify-end">
//                 <button
//                   onClick={resetFilters}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <FilterList className="text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-white">Total Testimonials</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-100">{totalTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-white">Published</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-100">{publishedTestimonials}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <ThumbUp className="text-green-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-white">Average Rating</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-100">{averageRating}/5</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                   <Star className="text-yellow-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-white">Showing</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-100">{filteredTestimonials.length}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <FilterList className="text-blue-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Testimonials Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6">
//             {filteredTestimonials.map((testimonial) => (
//               <motion.div
//                 key={testimonial.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="p-4 lg:p-6">
//                   {/* Header */}
//                   <div className=" justify-between items-start mb-4">
//                     <div className="flex items-center space-x-3">
                    
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{testimonial.name || 'Unknown'}</h3>
//                         <p className="text-sm text-gray-500">ID: #{testimonial.id || 'N/A'}</p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end space-y-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
//                         {testimonial.status ? testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1) : 'Unknown'}
//                       </span>
//                       {renderStars(testimonial.rating || 0)}
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
//                       <span className="text-sm text-gray-600">Joined {testimonial.joinDate || 'Unknown'}</span>
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
//                       "{testimonial.testimonialText || 'No testimonial text provided.'}"
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
//               <p className="text-gray-600 mb-6">
//                 {totalTestimonials === 0 
//                   ? "Get started by adding your first student testimonial." 
//                   : "No testimonials match your current filters."}
//               </p>
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Add First Testimonial
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
//                 <h2 className="text-xl font-semibold text-gray-900">Add New Testimonial</h2>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateTestimonial} className="p-6 space-y-4 text-black">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Student Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={testimonialForm.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter student name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={testimonialForm.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter email address"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={testimonialForm.instrument}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                       Teacher
//                     </label>
//                     <input
//                       type="text"
//                       name="teacher"
//                       value={testimonialForm.teacher}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter teacher name"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={testimonialForm.duration}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="e.g., Jan 2023"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <input
//                       type="text"
//                       name="age"
//                       value={testimonialForm.age}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter age"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Rating *
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
//                     Testimonial Text *
//                   </label>
//                   <textarea
//                     name="testimonialText"
//                     value={testimonialForm.testimonialText}
//                     onChange={handleInputChange}
//                     required
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     placeholder="Enter the student's testimonial..."
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
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <AddIcon className="text-sm" />
//                     <span>Add Testimonial</span>
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
//                   Add New Testimonial?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to add a testimonial for <strong>{testimonialForm.name}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
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
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonialForm.status)}`}>
//                       {testimonialForm.status.charAt(0).toUpperCase() + testimonialForm.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowCreateConfirmModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateTestimonial}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
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
//                         <span>Confirm Add</span>
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
//                 <h2 className="text-xl font-semibold text-gray-900">Edit Testimonial</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="bg-gradient-to-t from-red-500 to-red-800 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-black">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Student Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Instrument *
//                     </label>
//                     <select
//                       name="instrument"
//                       value={editForm.instrument}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                       Teacher
//                     </label>
//                     <input
//                       type="text"
//                       name="teacher"
//                       value={editForm.teacher}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Duration *
//                     </label>
//                     <input
//                       type="text"
//                       name="duration"
//                       value={editForm.duration}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <input
//                       type="text"
//                       name="age"
//                       value={editForm.age}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Rating *
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
//                     Testimonial Text *
//                   </label>
//                   <textarea
//                     name="testimonialText"
//                     value={editForm.testimonialText}
//                     onChange={handleEditInputChange}
//                     required
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <Save className="text-sm" />
//                     <span>Update Testimonial</span>
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
//                   Update Testimonial?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to update the testimonial from <strong>{editForm.name}</strong>?
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
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTestimonial}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
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
//                         <span>Confirm Update</span>
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
//                 <h2 className="text-xl font-semibold text-gray-900">Testimonial Details</h2>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Header */}
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
//                     {selectedTestimonial.name?.split(' ').map(n => n[0]).join('') || '??'}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name || 'Unknown'}</h3>
//                     <div className="flex items-center space-x-4 mt-2">
//                       {renderStars(selectedTestimonial.rating || 0)}
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
//                         {selectedTestimonial.status ? selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1) : 'Unknown'}
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
//                         <span>{selectedTestimonial.joinDate || 'Unknown'}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     {selectedTestimonial.email && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Email</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <Email className="text-gray-400" />
//                           <span>{selectedTestimonial.email}</span>
//                         </p>
//                       </div>
//                     )}
//                     {selectedTestimonial.age && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Age</label>
//                         <p className="text-lg text-gray-900">{selectedTestimonial.age} years old</p>
//                       </div>
//                     )}
//                     {selectedTestimonial.teacher && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Teacher</label>
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
//                   <label className="block text-sm font-medium text-gray-500 mb-3">Testimonial</label>
//                   <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                     <FormatQuote className="text-gray-300 text-4xl mb-2" />
//                     <p className="text-gray-700 text-lg leading-relaxed italic">
//                       "{selectedTestimonial.testimonialText || 'No testimonial text provided.'}"
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
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200"
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
//                   Delete Testimonial?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete the testimonial from <strong>{selectedTestimonial.name}</strong>? 
//                   This action cannot be undone.
//                 </p>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                     disabled={actionLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteTestimonial}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
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
//                         <span>Delete</span>
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


























// /* eslint-disable no-dupe-else-if */
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
//   Email,
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
//   Error as ErrorIcon,
//   Warning as WarningIcon
// } from '@mui/icons-material';

// const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// // Create axios instance with security features
// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Add request interceptor for security
// api.interceptors.request.use(
//   (config) => {
//     // Add security headers
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     config.headers['Accept'] = 'application/json';
    
//     // Remove any potential sensitive data from logs
//     console.log('API Request:', {
//       url: config.url,
//       method: config.method,
//       // Don't log sensitive data
//     });
    
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for security
// api.interceptors.response.use(
//   (response) => {
//     // Validate response structure
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//   },
//   (error) => {
//     console.error('Response Error:', {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data
//     });
    
//     // Handle specific error cases
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
    
//     // Extract error message from response
//     const errorMessage = error.response?.data?.message || 
//                         error.response?.data?.error ||
//                         error.message ||
//                         'An unexpected error occurred';
    
//     throw new Error(errorMessage);
//   }
// );

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
//           icon: <WarningIcon className="w-16 h-16 text-yellow-500" />,
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
//               <CloseIcon className="w-5 h-5" />
//             </button>

//             <div className="p-6 sm:p-8">
//               <div className="flex flex-col items-center text-center">
//                 {/* Icon */}
//                 <div className="mb-4">
//                   {icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${textColor}`}>
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

// // Validation functions
// const validateTestimonialData = (data) => {
//   const errors = [];
  
//   if (!data.name || data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters');
//   }
  
//   if (!data.instrument || data.instrument.trim().length < 1) {
//     errors.push('Instrument is required');
//   }
  
//   if (!data.duration || data.duration.trim().length < 1) {
//     errors.push('Duration is required');
//   }
  
//   if (!data.joinDate || data.joinDate.trim().length < 1) {
//     errors.push('Join date is required');
//   }
  
//   if (data.rating < 1 || data.rating > 5) {
//     errors.push('Rating must be between 1 and 5');
//   }
  
//   if (!data.testimonialText || data.testimonialText.trim().length < 10) {
//     errors.push('Testimonial text must be at least 10 characters');
//   }
  
//   // Email validation (optional field)
//   if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//     errors.push('Invalid email format');
//   }
  
//   return errors;
// };

// // Sanitize data function
// const sanitizeTestimonialData = (data) => {
//   const sanitized = { ...data };
  
//   // Trim all string fields
//   Object.keys(sanitized).forEach(key => {
//     if (typeof sanitized[key] === 'string') {
//       sanitized[key] = sanitized[key].trim();
//     }
//   });
  
//   // Ensure rating is a number
//   if (sanitized.rating) {
//     sanitized.rating = parseInt(sanitized.rating, 10);
//   }
  
//   return sanitized;
// };

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

// export const TestimonialManagement = () => {
//   // Initialize testimonials as empty array
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   // Modal states
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
//   const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterInstrument, setFilterInstrument] = useState('all');
//   const [filterRating, setFilterRating] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // Feedback modal state
//   const [feedbackModal, setFeedbackModal] = useState({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

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

//   // Fetch all testimonials using axios
//   const fetchTestimonials = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Fetching testimonials from API...');
//       const response = await api.get('/testimonials');
      
//       // Handle different response formats
//       let data = [];
      
//       if (response.status === 200) {
//         // Check if response.data is an array
//         if (Array.isArray(response.data)) {
//           data = response.data;
//         } 
//         // Check if response.data.data exists and is an array (common API pattern)
//         else if (response.data && Array.isArray(response.data.data)) {
//           data = response.data.data;
//         }
//         // Check if response.data.testimonials exists and is an array
//         else if (response.data && Array.isArray(response.data.testimonials)) {
//           data = response.data.testimonials;
//         }
//         // If it's an object, convert it to array
//         else if (response.data && typeof response.data === 'object') {
//           data = Object.values(response.data).filter(item => 
//             item && typeof item === 'object' && (item.id || item._id)
//           );
//         }
//       }
      
//       setTestimonials(data || []);
//       showFeedback("success", "Success!", "Testimonials loaded successfully!");
      
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       setError(error.message);
//       showFeedback("error", "Error!", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

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
    
//     // Validate data
//     const validationErrors = validateTestimonialData(testimonialForm);
//     if (validationErrors.length > 0) {
//       showFeedback("error", "Validation Error", validationErrors.join('. '));
//       return;
//     }
    
//     setShowCreateConfirmModal(true);
//   };

//   // Create new testimonial using axios - SECURE VERSION
//   const handleCreateTestimonial = async () => {
//     setActionLoading(true);
//     setError(null);

//     try {
//       // Sanitize data
//       const sanitizedData = sanitizeTestimonialData(testimonialForm);
      
//       // Validate again after sanitization
//       const validationErrors = validateTestimonialData(sanitizedData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       console.log('Creating testimonial with data:', sanitizedData);
      
//       // Send to API - using proper endpoint
//       const response = await api.post('/testimonials', sanitizedData);
      
//       // Handle response
//       let newTestimonial;
      
//       if (response.data && response.data.data) {
//         newTestimonial = response.data.data;
//       } else if (response.data && response.data.testimonial) {
//         newTestimonial = response.data.testimonial;
//       } else {
//         newTestimonial = response.data;
//       }

//       // Add to state
//       setTestimonials(prev => [newTestimonial, ...prev]);
      
//       // Reset form and close modals
//       setShowCreateModal(false);
//       setShowCreateConfirmModal(false);
//       resetTestimonialForm();
      
//       // Show success message
//       showFeedback("success", "Success!", "Testimonial created successfully!");
      
//     } catch (error) {
//       console.error('Error creating testimonial:', error);
//       const errorMessage = error.message || 'Failed to create testimonial';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
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
//       email: "",
//       age: "",
//       teacher: ""
//     });
//   };

//   // Open edit modal
//   const handleEditTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setEditForm({
//       name: testimonial.name || "",
//       instrument: testimonial.instrument || "",
//       duration: testimonial.duration || "",
//       joinDate: testimonial.joinDate || "",
//       rating: testimonial.rating || 5,
//       testimonialText: testimonial.testimonialText || "",
//       status: testimonial.status || "draft",
//       email: testimonial.email || "",
//       age: testimonial.age || "",
//       teacher: testimonial.teacher || ""
//     });
//     setShowEditModal(true);
//   };

//   // Open update confirmation modal
//   const handleEditSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate data
//     const validationErrors = validateTestimonialData(editForm);
//     if (validationErrors.length > 0) {
//       showFeedback("error", "Validation Error", validationErrors.join('. '));
//       return;
//     }
    
//     setShowUpdateConfirmModal(true);
//   };

//   // Update testimonial using axios - SECURE VERSION
//   const handleUpdateTestimonial = async () => {
//     if (!selectedTestimonial) return;

//     setActionLoading(true);
//     setError(null);
    
//     try {
//       // Sanitize data
//       const sanitizedData = sanitizeTestimonialData(editForm);
      
//       // Validate again after sanitization
//       const validationErrors = validateTestimonialData(sanitizedData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       // Get testimonial ID
//       const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      
//       if (!testimonialId) {
//         throw new Error('Testimonial ID is required for update');
//       }

//       console.log('Updating testimonial:', testimonialId, sanitizedData);
      
//       // Send to API
//       const response = await api.put(`/testimonials/${testimonialId}`, sanitizedData);
      
//       // Handle response
//       let updatedTestimonial;
      
//       if (response.data && response.data.data) {
//         updatedTestimonial = response.data.data;
//       } else if (response.data && response.data.testimonial) {
//         updatedTestimonial = response.data.testimonial;
//       } else {
//         updatedTestimonial = response.data;
//       }

//       // Update state
//       setTestimonials(prev => prev.map(test => 
//         (test._id === selectedTestimonial._id || test.id === selectedTestimonial.id) 
//           ? updatedTestimonial 
//           : test
//       ));
      
//       // Close modals
//       setShowEditModal(false);
//       setShowUpdateConfirmModal(false);
//       setSelectedTestimonial(null);
      
//       // Show success message
//       showFeedback("success", "Success!", "Testimonial updated successfully!");
      
//     } catch (error) {
//       console.error('Error updating testimonial:', error);
//       const errorMessage = error.message || 'Failed to update testimonial';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setShowDeleteModal(true);
//   };

//   // Delete testimonial using axios - SECURE VERSION
//   const handleDeleteTestimonial = async () => {
//     if (!selectedTestimonial) return;

//     setActionLoading(true);
//     setError(null);

//     try {
//       // Get testimonial ID
//       const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      
//       if (!testimonialId) {
//         throw new Error('Testimonial ID is required for deletion');
//       }

//       console.log('Deleting testimonial:', testimonialId);
      
//       // Send to API
//       await api.delete(`/testimonials/${testimonialId}`);
      
//       // Update state
//       setTestimonials(prev => prev.filter(test => 
//         (test._id !== selectedTestimonial._id && test.id !== selectedTestimonial.id)
//       ));
      
//       // Close modal
//       setShowDeleteModal(false);
//       setSelectedTestimonial(null);
      
//       // Show success message
//       showFeedback("success", "Success!", "Testimonial deleted successfully!");
      
//     } catch (error) {
//       console.error('Error deleting testimonial:', error);
//       const errorMessage = error.message || 'Failed to delete testimonial';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
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
//       return 'Invalid date';
//     }
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
//     const validRating = rating || 0;
//     return (
//       <div className="flex items-center space-x-1">
//         {ratingOptions.map((star) => (
//           <span key={star} className={star <= validRating ? "text-yellow-400" : "text-gray-300"}>
//             {star <= validRating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
//           </span>
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({validRating})</span>
//       </div>
//     );
//   };

//   // Filter testimonials based on search and filters
//   const filteredTestimonials = Array.isArray(testimonials) 
//     ? testimonials.filter(testimonial => {
//         if (!testimonial) return false;
        
//         const name = testimonial.name || '';
//         const instrument = testimonial.instrument || '';
//         const testimonialText = testimonial.testimonialText || '';
//         const rating = testimonial.rating || 0;
//         const status = testimonial.status || '';
        
//         const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              testimonialText.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
//         const matchesRating = filterRating === 'all' || rating === parseInt(filterRating);
//         const matchesStatus = filterStatus === 'all' || status === filterStatus;
        
//         return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
//       })
//     : [];

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterInstrument('all');
//     setFilterRating('all');
//     setFilterStatus('all');
//   };

//   // Calculate statistics
//   const totalTestimonials = Array.isArray(testimonials) ? testimonials.length : 0;
//   const publishedTestimonials = Array.isArray(testimonials) 
//     ? testimonials.filter(t => t && t.status === 'published').length 
//     : 0;
//   const averageRating = Array.isArray(testimonials) && testimonials.length > 0 
//     ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
//     : 0;

//   // Retry fetching testimonials
//   const retryFetch = () => {
//     fetchTestimonials();
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         <p className="text-gray-100">Loading testimonials...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex">
        
//         {/* Main Content */}
//         <div className="flex-1 w-full">
//           {/* Header with Menu Button */}
//           <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border-b border-gray-200 sticky top-0 z-40">
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <MenuIcon className="text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-white">Testimonial Management</h1>
//                   <p className="text-gray-100 mt-1">Manage student testimonials and reviews</p>
//                 </div>
//               </div>
              
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <AddIcon />
//                 <span className="hidden sm:inline">Add Testimonial</span>
//               </motion.button>
//             </div>
//           </div>

//           {/* Page Content */}
//           <div className="p-4 lg:p-6">
//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border border-red-200 rounded-xl">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <h3 className="text-red-800 font-semibold mb-1">Error</h3>
//                     <p className="text-red-700 whitespace-pre-line">{error}</p>
//                   </div>
//                   <div className="flex space-x-2 ml-4">
//                     <button
//                       onClick={retryFetch}
//                       className="bg-gradient-to-t from-red-500 to-red-700 font-medium px-3 py-1 bg-red-100 rounded-lg transition-colors duration-200"
//                     >
//                       Retry
//                     </button>
//                     <button
//                       onClick={clearError}
//                       className="bg-gradient-to-b from-red-500 to-red-800"
//                     >
//                       <CloseIcon className="text-sm" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Search and Filters */}
//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {/* Search */}
//                 <div className="relative lg:col-span-2">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search testimonials..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 {/* Instrument Filter */}
//                 <select
//                   value={filterInstrument}
//                   onChange={(e) => setFilterInstrument(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 >
//                   <option value="all">All Instruments</option>
//                   {instruments.map(instrument => (
//                     <option className='text-black' key={instrument} value={instrument}>
//                       {instrument}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Rating Filter */}
//                 <select
//                   value={filterRating}
//                   onChange={(e) => setFilterRating(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 >
//                   <option value="all">All Ratings</option>
//                   {ratingOptions.map(rating => (
//                     <option className='text-black' key={rating} value={rating}>
//                       {rating} Star{rating !== 1 ? 's' : ''}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Status Filter and Reset */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 >
//                   <option value="all">All Status</option>
//                   {statusOptions.map(status => (
//                     <option className='text-black' key={status.value} value={status.value}>
//                       {status.label}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={resetFilters}
//                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
//                   >
//                     <FilterList className="text-sm" />
//                     <span>Reset Filters</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
//               <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-white">Total Testimonials</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-100">{totalTestimonials}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                     <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-white">Published</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-100">{publishedTestimonials}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                     <ThumbUp className="text-green-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-white">Average Rating</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-100">{averageRating}/5</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                     <Star className="text-yellow-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-white">Showing</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-100">{filteredTestimonials.length}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <FilterList className="text-blue-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Testimonials Grid */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6">
//               {filteredTestimonials.map((testimonial) => (
//                 <motion.div
//                   key={testimonial._id || testimonial.id || Math.random()}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="p-4 lg:p-6">
//                     {/* Header */}
//                     <div className="justify-between items-start mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-900">{testimonial.name || 'Unknown'}</h3>
//                           <p className="text-sm text-gray-500">ID: #{testimonial._id?.slice(-6) || testimonial.id?.slice(-6) || 'N/A'}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end space-y-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
//                           {testimonial.status ? testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1) : 'Unknown'}
//                         </span>
//                         {renderStars(testimonial.rating || 0)}
//                       </div>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 mb-4">
//                       <div className="flex items-center space-x-3">
//                         <MusicNote className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{testimonial.instrument || 'Not specified'}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Schedule className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{testimonial.duration || 'Not specified'}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CalendarToday className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">Joined {testimonial.joinDate || 'Unknown'}</span>
//                       </div>
//                       {testimonial.teacher && (
//                         <div className="flex items-center space-x-3">
//                           <Person className="text-gray-400 text-sm" />
//                           <span className="text-sm text-gray-600">Teacher: {testimonial.teacher}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Testimonial Text */}
//                     <div className="mb-4">
//                       <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
//                         "{testimonial.testimonialText || 'No testimonial text provided.'}"
//                       </p>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex space-x-2 pt-4 border-t border-gray-100">
//                       <motion.button
//                         onClick={() => handleViewTestimonial(testimonial)}
//                         className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <ViewIcon className="text-sm" />
//                         <span>View</span>
//                       </motion.button>
//                       <motion.button
//                         onClick={() => handleEditTestimonial(testimonial)}
//                         className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <EditIcon className="text-sm" />
//                         <span>Edit</span>
//                       </motion.button>
//                       <motion.button
//                         onClick={() => handleDeleteClick(testimonial)}
//                         className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <DeleteIcon className="text-sm" />
//                         <span>Delete</span>
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Empty State */}
//             {filteredTestimonials.length === 0 && (
//               <div className="text-center py-12">
//                 <FormatQuote className="mx-auto text-gray-400 text-6xl mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
//                 <p className="text-gray-600 mb-6">
//                   {totalTestimonials === 0 
//                     ? error 
//                       ? "There was an error loading testimonials. Please check your connection and try again."
//                       : "Get started by adding your first student testimonial." 
//                     : "No testimonials match your current filters."}
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <motion.button
//                     onClick={() => setShowCreateModal(true)}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Add First Testimonial
//                   </motion.button>
//                   {error && (
//                     <motion.button
//                       onClick={retryFetch}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Retry Loading
//                     </motion.button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* All Modal Components */}
//         {/* Create Testimonial Modal */}
//         <AnimatePresence>
//           {showCreateModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowCreateModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                   <h2 className="text-xl font-semibold text-gray-900">Add New Testimonial</h2>
//                   <button
//                     onClick={() => setShowCreateModal(false)}
//                     className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-black">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Student Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={testimonialForm.name}
//                         onChange={handleInputChange}
//                         required
//                         minLength="2"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="Enter student name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={testimonialForm.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="Enter email address"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Instrument *
//                       </label>
//                       <select
//                         name="instrument"
//                         value={testimonialForm.instrument}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         <option value="">Select an instrument</option>
//                         {instruments.map(instrument => (
//                           <option key={instrument} value={instrument}>
//                             {instrument}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Teacher
//                       </label>
//                       <input
//                         type="text"
//                         name="teacher"
//                         value={testimonialForm.teacher}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="Enter teacher name"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Duration *
//                       </label>
//                       <input
//                         type="text"
//                         name="duration"
//                         value={testimonialForm.duration}
//                         onChange={handleInputChange}
//                         required
//                         minLength="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="e.g., 2 years"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Join Date *
//                       </label>
//                       <input
//                         type="text"
//                         name="joinDate"
//                         value={testimonialForm.joinDate}
//                         onChange={handleInputChange}
//                         required
//                         minLength="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="e.g., Jan 2023"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Age
//                       </label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={testimonialForm.age}
//                         onChange={handleInputChange}
//                         min="1"
//                         max="120"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                         placeholder="Enter age"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rating *
//                     </label>
//                     <div className="flex items-center space-x-2">
//                       {ratingOptions.map((rating) => (
//                         <button
//                           key={rating}
//                           type="button"
//                           onClick={() => handleRatingChange(rating)}
//                           className={`p-2 rounded-lg transition-all duration-200 ${
//                             rating <= testimonialForm.rating
//                               ? 'bg-yellow-100 text-yellow-600'
//                               : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Star className="text-xl" />
//                         </button>
//                       ))}
//                       <span className="ml-2 text-sm text-gray-600">
//                         {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Testimonial Text *
//                     </label>
//                     <textarea
//                       name="testimonialText"
//                       value={testimonialForm.testimonialText}
//                       onChange={handleInputChange}
//                       required
//                       minLength="10"
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                       placeholder="Enter the student's testimonial..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       value={testimonialForm.status}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex space-x-3 pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowCreateModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     >
//                       <AddIcon className="text-sm" />
//                       <span>Add Testimonial</span>
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
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowCreateConfirmModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-6 text-center">
//                   <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <AddIcon className="text-indigo-600 text-2xl" />
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     Add New Testimonial?
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6">
//                     Are you sure you want to add a testimonial for <strong>{testimonialForm.name}</strong>?
//                   </p>

//                   <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Instrument:</span>
//                       <span className="text-sm font-medium">{testimonialForm.instrument}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Duration:</span>
//                       <span className="text-sm font-medium">{testimonialForm.duration}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Rating:</span>
//                       <span className="text-sm font-medium">{renderStars(testimonialForm.rating)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Status:</span>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonialForm.status)}`}>
//                         {testimonialForm.status.charAt(0).toUpperCase() + testimonialForm.status.slice(1)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => setShowCreateConfirmModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                       disabled={actionLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCreateTestimonial}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Adding...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="text-sm" />
//                           <span>Confirm Add</span>
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
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowEditModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                   <h2 className="text-xl font-semibold text-gray-900">Edit Testimonial</h2>
//                   <button
//                     onClick={() => setShowEditModal(false)}
//                     className="bg-gradient-to-t from-red-500 to-red-800 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-black">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Student Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editForm.name}
//                         onChange={handleEditInputChange}
//                         required
//                         minLength="2"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={editForm.email}
//                         onChange={handleEditInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Instrument *
//                       </label>
//                       <select
//                         name="instrument"
//                         value={editForm.instrument}
//                         onChange={handleEditInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         {instruments.map(instrument => (
//                           <option key={instrument} value={instrument}>
//                             {instrument}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Teacher
//                       </label>
//                       <input
//                         type="text"
//                         name="teacher"
//                         value={editForm.teacher}
//                         onChange={handleEditInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Duration *
//                       </label>
//                       <input
//                         type="text"
//                         name="duration"
//                         value={editForm.duration}
//                         onChange={handleEditInputChange}
//                         required
//                         minLength="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Join Date *
//                       </label>
//                       <input
//                         type="text"
//                         name="joinDate"
//                         value={editForm.joinDate}
//                         onChange={handleEditInputChange}
//                         required
//                         minLength="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Age
//                       </label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={editForm.age}
//                         onChange={handleEditInputChange}
//                         min="1"
//                         max="120"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rating *
//                     </label>
//                     <div className="flex items-center space-x-2">
//                       {ratingOptions.map((rating) => (
//                         <button
//                           key={rating}
//                           type="button"
//                           onClick={() => handleEditRatingChange(rating)}
//                           className={`p-2 rounded-lg transition-all duration-200 ${
//                             rating <= editForm.rating
//                               ? 'bg-yellow-100 text-yellow-600'
//                               : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Star className="text-xl" />
//                         </button>
//                       ))}
//                       <span className="ml-2 text-sm text-gray-600">
//                         {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Testimonial Text *
//                     </label>
//                     <textarea
//                       name="testimonialText"
//                       value={editForm.testimonialText}
//                       onChange={handleEditInputChange}
//                       required
//                       minLength="10"
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       value={editForm.status}
//                       onChange={handleEditInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex space-x-3 pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowEditModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     >
//                       <Save className="text-sm" />
//                       <span>Update Testimonial</span>
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
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowUpdateConfirmModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-6 text-center">
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Update className="text-green-600 text-2xl" />
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     Update Testimonial?
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6">
//                     Are you sure you want to update the testimonial from <strong>{editForm.name}</strong>?
//                   </p>

//                   <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Instrument:</span>
//                       <span className="text-sm font-medium">{editForm.instrument}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Duration:</span>
//                       <span className="text-sm font-medium">{editForm.duration}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Rating:</span>
//                       <span className="text-sm font-medium">{renderStars(editForm.rating)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Status:</span>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(editForm.status)}`}>
//                         {editForm.status.charAt(0).toUpperCase() + editForm.status.slice(1)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => setShowUpdateConfirmModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                       disabled={actionLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleUpdateTestimonial}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Updating...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="text-sm" />
//                           <span>Confirm Update</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* View Testimonial Modal */}
//         <AnimatePresence>
//           {showViewModal && selectedTestimonial && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowViewModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">Testimonial Details</h2>
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Header */}
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
//                       {selectedTestimonial.name?.split(' ').map(n => n[0]).join('') || '??'}
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name || 'Unknown'}</h3>
//                       <div className="flex items-center space-x-4 mt-2">
//                         {renderStars(selectedTestimonial.rating || 0)}
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
//                           {selectedTestimonial.status ? selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1) : 'Unknown'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Details Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Instrument</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <MusicNote className="text-gray-400" />
//                           <span>{selectedTestimonial.instrument || 'Not specified'}</span>
//                         </p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Duration</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <Schedule className="text-gray-400" />
//                           <span>{selectedTestimonial.duration || 'Not specified'}</span>
//                         </p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Join Date</label>
//                         <p className="text-lg text-gray-900 flex items-center space-x-2">
//                           <CalendarToday className="text-gray-400" />
//                           <span>{selectedTestimonial.joinDate || 'Unknown'}</span>
//                         </p>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       {selectedTestimonial.email && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Email</label>
//                           <p className="text-lg text-gray-900 flex items-center space-x-2">
//                             <Email className="text-gray-400" />
//                             <span>{selectedTestimonial.email}</span>
//                           </p>
//                         </div>
//                       )}
//                       {selectedTestimonial.age && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Age</label>
//                           <p className="text-lg text-gray-900">{selectedTestimonial.age} years old</p>
//                         </div>
//                       )}
//                       {selectedTestimonial.teacher && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Teacher</label>
//                           <p className="text-lg text-gray-900 flex items-center space-x-2">
//                             <Person className="text-gray-400" />
//                             <span>{selectedTestimonial.teacher}</span>
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Testimonial Text */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-3">Testimonial</label>
//                     <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                       <FormatQuote className="text-gray-300 text-4xl mb-2" />
//                       <p className="text-gray-700 text-lg leading-relaxed italic">
//                         "{selectedTestimonial.testimonialText || 'No testimonial text provided.'}"
//                       </p>
//                     </div>
//                   </div>

//                   {/* Dates */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Created At</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Updated At</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.updatedAt)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6 border-t border-gray-200">
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200"
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
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowDeleteModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-6 text-center">
//                   <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <DeleteIcon className="text-red-600 text-2xl" />
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     Delete Testimonial?
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6">
//                     Are you sure you want to delete the testimonial from <strong>{selectedTestimonial.name}</strong>? 
//                     This action cannot be undone.
//                   </p>

//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => setShowDeleteModal(false)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
//                       disabled={actionLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleDeleteTestimonial}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Deleting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <DeleteIcon className="text-sm" />
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




















/* eslint-disable no-dupe-else-if */
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
  Email,
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
  Error as ErrorIcon,
  Warning as WarningIcon,
  LocationOn,
  Verified
} from '@mui/icons-material';

const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance with security features
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor for security
api.interceptors.request.use(
  (config) => {
    // Add security headers
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Accept'] = 'application/json';
    
    // Remove any potential sensitive data from logs
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      // Don't log sensitive data
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for security
api.interceptors.response.use(
  (response) => {
    // Validate response structure
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Handle specific error cases
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
    
    // Extract error message from response
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        error.message ||
                        'An unexpected error occurred';
    
    throw new Error(errorMessage);
  }
);

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
          icon: <WarningIcon className="w-16 h-16 text-yellow-500" />,
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
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4">
                  {icon}
                </div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${textColor}`}>
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

// Validation functions - UPDATED TO MATCH SCHEMA
const validateTestimonialData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.instrument || data.instrument.trim().length < 1) {
    errors.push('Instrument is required');
  }
  
  if (!data.duration || data.duration.trim().length < 1) {
    errors.push('Duration is required');
  }
  
  if (!data.joinDate || data.joinDate.trim().length < 1) {
    errors.push('Join date is required');
  }
  
  if (data.rating < 1 || data.rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }
  
  if (!data.text || data.text.trim().length < 10) {
    errors.push('Testimonial text must be at least 10 characters');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  // Text max length validation
  if (data.text && data.text.trim().length > 500) {
    errors.push('Testimonial text cannot exceed 500 characters');
  }
  
  // Admin notes max length validation
  if (data.adminNotes && data.adminNotes.trim().length > 200) {
    errors.push('Admin notes cannot exceed 200 characters');
  }
  
  return errors;
};

// Sanitize data function
const sanitizeTestimonialData = (data) => {
  const sanitized = { ...data };
  
  // Trim all string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  });
  
  // Ensure rating is a number
  if (sanitized.rating) {
    sanitized.rating = parseInt(sanitized.rating, 10);
  }
  
  // Ensure boolean fields
  if (sanitized.emailSent !== undefined) {
    sanitized.emailSent = Boolean(sanitized.emailSent);
  }
  
  if (sanitized.featured !== undefined) {
    sanitized.featured = Boolean(sanitized.featured);
  }
  
  if (sanitized.isVerified !== undefined) {
    sanitized.isVerified = Boolean(sanitized.isVerified);
  }
  
  // Convert ageGroup to null if empty
  if (sanitized.ageGroup === '') {
    sanitized.ageGroup = null;
  }
  
  // Lowercase email
  if (sanitized.email) {
    sanitized.email = sanitized.email.toLowerCase();
  }
  
  return sanitized;
};

// Instruments for selection
const instruments = [
  'Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 
  'Saxophone', 'Trumpet', 'Cello', 'Clarinet', 'Voice',
  'Bass Guitar', 'Keyboard', 'Harp', 'Ukulele', 'Mandolin'
];

// Age group options
const ageGroupOptions = [
  { value: '', label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen' },
  { value: 'adult', label: 'Adult' },
  { value: 'senior', label: 'Senior' }
];

// Status options - UPDATED TO MATCH SCHEMA
const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

// Rating options
const ratingOptions = [1, 2, 3, 4, 5];

export const TestimonialManagement = () => {
  // Initialize testimonials as empty array
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAgeGroup, setFilterAgeGroup] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');

  // Feedback modal state
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  // Form states - UPDATED TO MATCH SCHEMA
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    text: "",
    email: "",
    status: "pending",
    location: "",
    ageGroup: "",
    featured: false,
    isVerified: false,
    adminNotes: ""
  });

  const [editForm, setEditForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    text: "",
    email: "",
    status: "pending",
    location: "",
    ageGroup: "",
    featured: false,
    isVerified: false,
    adminNotes: ""
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

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Fetch all testimonials using axios
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching testimonials from API...');
      const response = await api.get('/testimonials');
      
      // Handle different response formats
      let data = [];
      
      if (response.status === 200) {
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          data = response.data;
        } 
        // Check if response.data.data exists and is an array (common API pattern)
        else if (response.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        }
        // Check if response.data.testimonials exists and is an array
        else if (response.data && Array.isArray(response.data.testimonials)) {
          data = response.data.testimonials;
        }
        // If it's an object, convert it to array
        else if (response.data && typeof response.data === 'object') {
          data = Object.values(response.data).filter(item => 
            item && typeof item === 'object' && (item.id || item._id)
          );
        }
      }
      
      setTestimonials(data || []);
      showFeedback("success", "Success!", "Testimonials loaded successfully!");
      
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError(error.message);
      showFeedback("error", "Error!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setTestimonialForm(prev => ({
      ...prev,
      rating
    }));
  };

  // Handle edit rating change
  const handleEditRatingChange = (rating) => {
    setEditForm(prev => ({
      ...prev,
      rating
    }));
  };

  // Open create confirmation modal
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    
    // Validate data
    const validationErrors = validateTestimonialData(testimonialForm);
    if (validationErrors.length > 0) {
      showFeedback("error", "Validation Error", validationErrors.join('. '));
      return;
    }
    
    setShowCreateConfirmModal(true);
  };

  // Create new testimonial using axios - UPDATED FOR SCHEMA
  const handleCreateTestimonial = async () => {
    setActionLoading(true);
    setError(null);

    try {
      // Sanitize data
      const sanitizedData = sanitizeTestimonialData(testimonialForm);
      
      // Validate again after sanitization
      const validationErrors = validateTestimonialData(sanitizedData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // console.log('Creating testimonial with data:', sanitizedData);
      
      // Send to API - using proper endpoint
      const response = await api.post('/testimonials', sanitizedData);
      
      // Handle response
      let newTestimonial;
      
      if (response.data && response.data.data) {
        newTestimonial = response.data.data;
      } else if (response.data && response.data.testimonial) {
        newTestimonial = response.data.testimonial;
      } else {
        newTestimonial = response.data;
      }

      // Add to state
      setTestimonials(prev => [newTestimonial, ...prev]);
      
      // Reset form and close modals
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);
      resetTestimonialForm();
      
      // Show success message
      showFeedback("success", "Success!", "Testimonial created successfully!");
      
    } catch (error) {
      console.error('Error creating testimonial:', error);
      const errorMessage = error.message || 'Failed to create testimonial';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
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
      email: "",
      status: "pending",
      location: "",
      ageGroup: "",
      featured: false,
      isVerified: false,
      adminNotes: ""
    });
  };

  // Open edit modal
  const handleEditTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditForm({
      name: testimonial.name || "",
      instrument: testimonial.instrument || "",
      duration: testimonial.duration || "",
      joinDate: testimonial.joinDate || "",
      rating: testimonial.rating || 5,
      text: testimonial.text || "",
      email: testimonial.email || "",
      status: testimonial.status || "pending",
      location: testimonial.location || "",
      ageGroup: testimonial.ageGroup || "",
      featured: testimonial.featured || false,
      isVerified: testimonial.isVerified || false,
      adminNotes: testimonial.adminNotes || ""
    });
    setShowEditModal(true);
  };

  // Open update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    // Validate data
    const validationErrors = validateTestimonialData(editForm);
    if (validationErrors.length > 0) {
      showFeedback("error", "Validation Error", validationErrors.join('. '));
      return;
    }
    
    setShowUpdateConfirmModal(true);
  };

  // Update testimonial using axios - UPDATED FOR SCHEMA
  const handleUpdateTestimonial = async () => {
    if (!selectedTestimonial) return;

    setActionLoading(true);
    setError(null);
    
    try {
      // Sanitize data
      const sanitizedData = sanitizeTestimonialData(editForm);
      
      // Validate again after sanitization
      const validationErrors = validateTestimonialData(sanitizedData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // Get testimonial ID
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      
      if (!testimonialId) {
        throw new Error('Testimonial ID is required for update');
      }

      // console.log('Updating testimonial:', testimonialId, sanitizedData);
      
      // Send to API
      const response = await api.put(`/testimonials/${testimonialId}`, sanitizedData);
      
      // Handle response
      let updatedTestimonial;
      
      if (response.data && response.data.data) {
        updatedTestimonial = response.data.data;
      } else if (response.data && response.data.testimonial) {
        updatedTestimonial = response.data.testimonial;
      } else {
        updatedTestimonial = response.data;
      }

      // Update state
      setTestimonials(prev => prev.map(test => 
        (test._id === selectedTestimonial._id || test.id === selectedTestimonial.id) 
          ? updatedTestimonial 
          : test
      ));
      
      // Close modals
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedTestimonial(null);
      
      // Show success message
      showFeedback("success", "Success!", "Testimonial updated successfully!");
      
    } catch (error) {
      console.error('Error updating testimonial:', error);
      const errorMessage = error.message || 'Failed to update testimonial';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowDeleteModal(true);
  };

  // Delete testimonial using axios
  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial) return;

    setActionLoading(true);
    setError(null);

    try {
      // Get testimonial ID
      const testimonialId = selectedTestimonial._id || selectedTestimonial.id;
      
      if (!testimonialId) {
        throw new Error('Testimonial ID is required for deletion');
      }

      // console.log('Deleting testimonial:', testimonialId);
      
      // Send to API
      await api.delete(`/testimonials/${testimonialId}`);
      
      // Update state
      setTestimonials(prev => prev.filter(test => 
        (test._id !== selectedTestimonial._id && test.id !== selectedTestimonial.id)
      ));
      
      // Close modal
      setShowDeleteModal(false);
      setSelectedTestimonial(null);
      
      // Show success message
      showFeedback("success", "Success!", "Testimonial deleted successfully!");
      
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      const errorMessage = error.message || 'Failed to delete testimonial';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowViewModal(true);
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
      return 'Invalid date';
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get rating stars
  const renderStars = (rating) => {
    const validRating = rating || 0;
    return (
      <div className="flex items-center space-x-1">
        {ratingOptions.map((star) => (
          <span key={star} className={star <= validRating ? "text-yellow-400" : "text-gray-300"}>
            {star <= validRating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({validRating})</span>
      </div>
    );
  };

  // Get age group label
  const getAgeGroupLabel = (ageGroup) => {
    const option = ageGroupOptions.find(opt => opt.value === ageGroup);
    return option ? option.label : 'Not specified';
  };

  // Filter testimonials based on search and filters
  const filteredTestimonials = Array.isArray(testimonials) 
    ? testimonials.filter(testimonial => {
        if (!testimonial) return false;
        
        const name = testimonial.name || '';
        const instrument = testimonial.instrument || '';
        const text = testimonial.text || '';
        const email = testimonial.email || '';
        const rating = testimonial.rating || 0;
        const status = testimonial.status || '';
        const ageGroup = testimonial.ageGroup || '';
        const featured = testimonial.featured || false;
        
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
        const matchesRating = filterRating === 'all' || rating === parseInt(filterRating);
        const matchesStatus = filterStatus === 'all' || status === filterStatus;
        const matchesAgeGroup = filterAgeGroup === 'all' || ageGroup === filterAgeGroup;
        const matchesFeatured = filterFeatured === 'all' || 
                                (filterFeatured === 'featured' && featured) ||
                                (filterFeatured === 'not-featured' && !featured);
        
        return matchesSearch && matchesInstrument && matchesRating && 
               matchesStatus && matchesAgeGroup && matchesFeatured;
      })
    : [];

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterInstrument('all');
    setFilterRating('all');
    setFilterStatus('all');
    setFilterAgeGroup('all');
    setFilterFeatured('all');
  };

  // Calculate statistics
  const totalTestimonials = Array.isArray(testimonials) ? testimonials.length : 0;
  const approvedTestimonials = Array.isArray(testimonials) 
    ? testimonials.filter(t => t && t.status === 'approved').length 
    : 0;
  const featuredTestimonials = Array.isArray(testimonials)
    ? testimonials.filter(t => t && t.featured).length
    : 0;
  const averageRating = Array.isArray(testimonials) && testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
    : 0;

  // Retry fetching testimonials
  const retryFetch = () => {
    fetchTestimonials();
  };

  if (loading) {
    return (
      <div className="flex flex-col bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-100">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex">
        
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header with Menu Button */}
          <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <MenuIcon className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Testimonial Management</h1>
                  <p className="text-gray-100 mt-1">Manage student testimonials and reviews</p>
                </div>
              </div>
              
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AddIcon />
                <span className="hidden sm:inline">Add Testimonial</span>
              </motion.button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border border-red-200 rounded-xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                    <p className="text-red-700 whitespace-pre-line">{error}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={retryFetch}
                      className="bg-gradient-to-t from-red-500 to-red-700 font-medium px-3 py-1 bg-red-100 rounded-lg transition-colors duration-200"
                    >
                      Retry
                    </button>
                    <button
                      onClick={clearError}
                      className="bg-gradient-to-b from-red-500 to-red-800"
                    >
                      <CloseIcon className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search testimonials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                {/* Instrument Filter */}
                <select
                  value={filterInstrument}
                  onChange={(e) => setFilterInstrument(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Instruments</option>
                  {instruments.map(instrument => (
                    <option className='text-black' key={instrument} value={instrument}>
                      {instrument}
                    </option>
                  ))}
                </select>

                {/* Rating Filter */}
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Ratings</option>
                  {ratingOptions.map(rating => (
                    <option className='text-black' key={rating} value={rating}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(status => (
                    <option className='text-black' key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                {/* Age Group Filter */}
                <select
                  value={filterAgeGroup}
                  onChange={(e) => setFilterAgeGroup(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Age Groups</option>
                  {ageGroupOptions.map(group => (
                    <option className='text-black' key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </select>

                {/* Featured Filter */}
                <select
                  value={filterFeatured}
                  onChange={(e) => setFilterFeatured(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All</option>
                  <option className='text-black' value="featured">Featured</option>
                  <option className='text-black' value="not-featured">Not Featured</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  <FilterList className="text-sm" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Total Testimonials</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-100">{totalTestimonials}</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Approved</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-100">{approvedTestimonials}</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ThumbUp className="text-green-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Featured</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-100">{featuredTestimonials}</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="text-yellow-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Average Rating</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-100">{averageRating}/5</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Star className="text-blue-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6">
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial._id || testimonial.id || Math.random()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4 lg:p-6">
                    {/* Header */}
                    <div className="justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-500">ID: #{testimonial._id?.slice(-6) || testimonial.id?.slice(-6) || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                          {testimonial.status ? testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1) : 'Unknown'}
                        </span>
                        {renderStars(testimonial.rating || 0)}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <MusicNote className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{testimonial.instrument || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Schedule className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{testimonial.duration || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CalendarToday className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">Joined {testimonial.joinDate || 'Unknown'}</span>
                      </div>
                      {testimonial.location && (
                        <div className="flex items-center space-x-3">
                          <LocationOn className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600">{testimonial.location}</span>
                        </div>
                      )}
                      {testimonial.ageGroup && (
                        <div className="flex items-center space-x-3">
                          <Person className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600">{getAgeGroupLabel(testimonial.ageGroup)}</span>
                        </div>
                      )}
                      {testimonial.featured && (
                        <div className="flex items-center space-x-3">
                          <Star className="text-yellow-400 text-sm" />
                          <span className="text-sm text-yellow-600 font-medium">Featured</span>
                        </div>
                      )}
                      {testimonial.isVerified && (
                        <div className="flex items-center space-x-3">
                          <Verified className="text-green-400 text-sm" />
                          <span className="text-sm text-green-600 font-medium">Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Testimonial Text */}
                    <div className="mb-4">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        "{testimonial.text || 'No testimonial text provided.'}"
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <motion.button
                        onClick={() => handleViewTestimonial(testimonial)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ViewIcon className="text-sm" />
                        <span>View</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleEditTestimonial(testimonial)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EditIcon className="text-sm" />
                        <span>Edit</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteClick(testimonial)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <DeleteIcon className="text-sm" />
                        <span>Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTestimonials.length === 0 && (
              <div className="text-center py-12">
                <FormatQuote className="mx-auto text-gray-400 text-6xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
                <p className="text-gray-600 mb-6">
                  {totalTestimonials === 0 
                    ? error 
                      ? "There was an error loading testimonials. Please check your connection and try again."
                      : "Get started by adding your first student testimonial." 
                    : "No testimonials match your current filters."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add First Testimonial
                  </motion.button>
                  {error && (
                    <motion.button
                      onClick={retryFetch}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry Loading
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All Modal Components */}
        {/* Create Testimonial Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900">Add New Testimonial</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={testimonialForm.name}
                        onChange={handleInputChange}
                        required
                        minLength="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter student name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={testimonialForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instrument *
                      </label>
                      <select
                        name="instrument"
                        value={testimonialForm.instrument}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        <option value="">Select an instrument</option>
                        {instruments.map(instrument => (
                          <option key={instrument} value={instrument}>
                            {instrument}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={testimonialForm.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter location"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={testimonialForm.duration}
                        onChange={handleInputChange}
                        required
                        minLength="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g., 2 years"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join Date *
                      </label>
                      <input
                        type="text"
                        name="joinDate"
                        value={testimonialForm.joinDate}
                        onChange={handleInputChange}
                        required
                        minLength="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g., Jan 2023"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age Group
                      </label>
                      <select
                        name="ageGroup"
                        value={testimonialForm.ageGroup}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        {ageGroupOptions.map(group => (
                          <option key={group.value} value={group.value}>
                            {group.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(rating)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            rating <= testimonialForm.rating
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Star className="text-xl" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {testimonialForm.rating} Star{testimonialForm.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Testimonial Text *
                    </label>
                    <textarea
                      name="text"
                      value={testimonialForm.text}
                      onChange={handleInputChange}
                      required
                      minLength="10"
                      maxLength="500"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                      placeholder="Enter the student's testimonial (max 500 characters)..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {testimonialForm.text.length}/500 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={testimonialForm.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes
                      </label>
                      <input
                        type="text"
                        name="adminNotes"
                        value={testimonialForm.adminNotes}
                        onChange={handleInputChange}
                        maxLength="200"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Internal notes (max 200 chars)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={testimonialForm.featured}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-sm text-gray-700">Featured Testimonial</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isVerified"
                        checked={testimonialForm.isVerified}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-sm text-gray-700">Verified Student</label>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <AddIcon className="text-sm" />
                      <span>Add Testimonial</span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateConfirmModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AddIcon className="text-indigo-600 text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Add New Testimonial?
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to add a testimonial for <strong>{testimonialForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instrument:</span>
                      <span className="text-sm font-medium">{testimonialForm.instrument}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium">{testimonialForm.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <span className="text-sm font-medium">{renderStars(testimonialForm.rating)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonialForm.status)}`}>
                        {testimonialForm.status.charAt(0).toUpperCase() + testimonialForm.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCreateConfirmModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateTestimonial}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-sm" />
                          <span>Confirm Add</span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Testimonial</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-800 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditInputChange}
                        required
                        minLength="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instrument *
                      </label>
                      <select
                        name="instrument"
                        value={editForm.instrument}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        {instruments.map(instrument => (
                          <option key={instrument} value={instrument}>
                            {instrument}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={editForm.location}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={editForm.duration}
                        onChange={handleEditInputChange}
                        required
                        minLength="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join Date *
                      </label>
                      <input
                        type="text"
                        name="joinDate"
                        value={editForm.joinDate}
                        onChange={handleEditInputChange}
                        required
                        minLength="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age Group
                      </label>
                      <select
                        name="ageGroup"
                        value={editForm.ageGroup}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        {ageGroupOptions.map(group => (
                          <option key={group.value} value={group.value}>
                            {group.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleEditRatingChange(rating)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            rating <= editForm.rating
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Star className="text-xl" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {editForm.rating} Star{editForm.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Testimonial Text *
                    </label>
                    <textarea
                      name="text"
                      value={editForm.text}
                      onChange={handleEditInputChange}
                      required
                      minLength="10"
                      maxLength="500"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {editForm.text.length}/500 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes
                      </label>
                      <input
                        type="text"
                        name="adminNotes"
                        value={editForm.adminNotes}
                        onChange={handleEditInputChange}
                        maxLength="200"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Internal notes (max 200 chars)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={editForm.featured}
                        onChange={handleEditInputChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-sm text-gray-700">Featured Testimonial</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isVerified"
                        checked={editForm.isVerified}
                        onChange={handleEditInputChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-sm text-gray-700">Verified Student</label>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Save className="text-sm" />
                      <span>Update Testimonial</span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowUpdateConfirmModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Update className="text-green-600 text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Update Testimonial?
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to update the testimonial from <strong>{editForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instrument:</span>
                      <span className="text-sm font-medium">{editForm.instrument}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium">{editForm.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <span className="text-sm font-medium">{renderStars(editForm.rating)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(editForm.status)}`}>
                        {editForm.status.charAt(0).toUpperCase() + editForm.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowUpdateConfirmModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateTestimonial}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-sm" />
                          <span>Confirm Update</span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowViewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Testimonial Details</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
                      {selectedTestimonial.name?.split(' ').map(n => n[0]).join('') || '??'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name || 'Unknown'}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        {renderStars(selectedTestimonial.rating || 0)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
                          {selectedTestimonial.status ? selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1) : 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Instrument</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <MusicNote className="text-gray-400" />
                          <span>{selectedTestimonial.instrument || 'Not specified'}</span>
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Duration</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <Schedule className="text-gray-400" />
                          <span>{selectedTestimonial.duration || 'Not specified'}</span>
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Join Date</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <CalendarToday className="text-gray-400" />
                          <span>{selectedTestimonial.joinDate || 'Unknown'}</span>
                        </p>
                      </div>
                      {selectedTestimonial.location && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Location</label>
                          <p className="text-lg text-gray-900 flex items-center space-x-2">
                            <LocationOn className="text-gray-400" />
                            <span>{selectedTestimonial.location}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <Email className="text-gray-400" />
                          <span>{selectedTestimonial.email}</span>
                        </p>
                      </div>
                      {selectedTestimonial.ageGroup && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Age Group</label>
                          <p className="text-lg text-gray-900">{getAgeGroupLabel(selectedTestimonial.ageGroup)}</p>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Featured</label>
                        <p className="text-lg text-gray-900">
                          {selectedTestimonial.featured ? (
                            <span className="text-green-600 font-medium flex items-center space-x-2">
                              <Star className="text-yellow-400" />
                              <span>Yes</span>
                            </span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Verified</label>
                        <p className="text-lg text-gray-900">
                          {selectedTestimonial.isVerified ? (
                            <span className="text-green-600 font-medium flex items-center space-x-2">
                              <Verified className="text-green-400" />
                              <span>Yes</span>
                            </span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-3">Testimonial</label>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <FormatQuote className="text-gray-300 text-4xl mb-2" />
                      <p className="text-gray-700 text-lg leading-relaxed italic">
                        "{selectedTestimonial.text || 'No testimonial text provided.'}"
                      </p>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {selectedTestimonial.adminNotes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Admin Notes</label>
                      <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-700">{selectedTestimonial.adminNotes}</p>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Created At</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Updated At</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedTestimonial.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200"
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DeleteIcon className="text-red-600 text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Delete Testimonial?
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the testimonial from <strong>{selectedTestimonial.name}</strong>? 
                    This action cannot be undone.
                  </p>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteTestimonial}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <DeleteIcon className="text-sm" />
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