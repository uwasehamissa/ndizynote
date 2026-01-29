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
//   Phone,
//   Schedule,
//   CalendarToday,
//   AccessTime,
//   School,
//   Search,
//   FilterList,
//   Save,
//   Update,
//   Menu as MenuIcon,
//   EventAvailable,
//   EventBusy,
//   Pending,
//   Check as CheckIcon,
//   Clear as ClearIcon
// } from '@mui/icons-material';
// import { Sidebar } from '../../sidebar/Sidebar';

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

// // Experience levels
// const experienceLevels = [
//   { value: 'beginner', label: 'Beginner' },
//   { value: 'intermediate', label: 'Intermediate' },
//   { value: 'advanced', label: 'Advanced' },
//   { value: 'professional', label: 'Professional' }
// ];

// // Time slots
// const timeSlots = [
//   { value: 'morning', label: 'Morning (9AM-12PM)' },
//   { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
//   { value: 'evening', label: 'Evening (5PM-8PM)' }
// ];

// // Status options
// const statusOptions = [
//   { value: 'pending', label: 'Pending' },
//   { value: 'confirmed', label: 'Confirmed' },
//   { value: 'completed', label: 'Completed' },
//   { value: 'cancelled', label: 'Cancelled' },
//   { value: 'no_show', label: 'No Show' }
// ];

// // Lesson types
// const lessonTypes = [
//   { value: 'trial', label: 'Trial Lesson' },
//   { value: 'regular', label: 'Regular Lesson' },
//   { value: 'intensive', label: 'Intensive Course' },
//   { value: 'workshop', label: 'Workshop' }
// ];

// export const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   // Modal states
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
//   const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterInstrument, setFilterInstrument] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterDate, setFilterDate] = useState('');

//   // Form states
//   const [bookingForm, setBookingForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     instrument: "",
//     experience: "beginner",
//     preferredDate: "",
//     preferredTime: "morning",
//     lessonType: "trial",
//     message: "",
//     status: "pending",
//     age: "",
//     address: "",
//     emergencyContact: ""
//   });

//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     instrument: "",
//     experience: "beginner",
//     preferredDate: "",
//     preferredTime: "morning",
//     lessonType: "trial",
//     message: "",
//     status: "pending",
//     age: "",
//     address: "",
//     emergencyContact: ""
//   });

//   // Helper function for mock data
//   const getMockData = () => {
//     return [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         email: "sarah.johnson@email.com",
//         phone: "+1 (555) 123-4567",
//         instrument: "Piano",
//         experience: "beginner",
//         preferredDate: "2024-02-15",
//         preferredTime: "morning",
//         lessonType: "trial",
//         message: "I'm excited to start learning piano! I've always wanted to play classical music.",
//         status: "confirmed",
//         age: "28",
//         address: "123 Main St, New York, NY",
//         emergencyContact: "+1 (555) 987-6543",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 2,
//         name: "Michael Chen",
//         email: "michael.chen@email.com",
//         phone: "+1 (555) 234-5678",
//         instrument: "Guitar",
//         experience: "intermediate",
//         preferredDate: "2024-02-16",
//         preferredTime: "evening",
//         lessonType: "regular",
//         message: "Looking to improve my fingerstyle technique.",
//         status: "pending",
//         age: "22",
//         address: "456 Oak Ave, Los Angeles, CA",
//         emergencyContact: "+1 (555) 876-5432",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 3,
//         name: "Emma Rodriguez",
//         email: "emma.rodriguez@email.com",
//         phone: "+1 (555) 345-6789",
//         instrument: "Violin",
//         experience: "advanced",
//         preferredDate: "2024-02-14",
//         preferredTime: "afternoon",
//         lessonType: "intensive",
//         message: "Preparing for conservatory auditions.",
//         status: "completed",
//         age: "35",
//         address: "789 Pine St, Chicago, IL",
//         emergencyContact: "+1 (555) 765-4321",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 4,
//         name: "David Kim",
//         email: "david.kim@email.com",
//         phone: "+1 (555) 456-7890",
//         instrument: "Drums",
//         experience: "beginner",
//         preferredDate: "2024-02-17",
//         preferredTime: "morning",
//         lessonType: "trial",
//         message: "Always wanted to learn drums. Complete beginner.",
//         status: "cancelled",
//         age: "19",
//         address: "321 Elm St, Miami, FL",
//         emergencyContact: "+1 (555) 654-3210",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 5,
//         name: "Lisa Thompson",
//         email: "lisa.thompson@email.com",
//         phone: "+1 (555) 567-8901",
//         instrument: "Voice",
//         experience: "intermediate",
//         preferredDate: "2024-02-18",
//         preferredTime: "evening",
//         lessonType: "workshop",
//         message: "Interested in jazz vocal techniques.",
//         status: "pending",
//         age: "26",
//         address: "654 Maple Dr, Seattle, WA",
//         emergencyContact: "+1 (555) 543-2109",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//     ];
//   };

//   // Fetch all bookings using axios
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/api/bookings');
      
//       if (response.status === 200) {
//         setBookings(response.data);
//       } else {
//         console.error('Failed to fetch bookings');
//         // Mock data for demonstration
//         setBookings(getMockData());
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       // Fallback to mock data
//       setBookings(getMockData().slice(0, 1));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingForm(prev => ({
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

//   // Open create confirmation modal
//   const handleCreateSubmit = (e) => {
//     e.preventDefault();
//     setShowCreateConfirmModal(true);
//   };

//   // Create new booking using axios
//   const handleCreateBooking = async () => {
//     setActionLoading(true);

//     try {
//       const response = await api.post('/api/bookings', bookingForm);

//       if (response.status === 201 || response.status === 200) {
//         const newBooking = response.data;
//         setBookings(prev => [newBooking, ...prev]);
//         setShowCreateModal(false);
//         setShowCreateConfirmModal(false);
//         resetBookingForm();
//       } else {
//         alert('Failed to create booking');
//       }
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       // For demo, add to local state
//       const newBooking = {
//         id: Date.now(),
//         ...bookingForm,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
//       setBookings(prev => [newBooking, ...prev]);
//       setShowCreateModal(false);
//       setShowCreateConfirmModal(false);
//       resetBookingForm();
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Reset form helper
//   const resetBookingForm = () => {
//     setBookingForm({
//       name: "",
//       email: "",
//       phone: "",
//       instrument: "",
//       experience: "beginner",
//       preferredDate: "",
//       preferredTime: "morning",
//       lessonType: "trial",
//       message: "",
//       status: "pending",
//       age: "",
//       address: "",
//       emergencyContact: ""
//     });
//   };

//   // Open edit modal
//   const handleEditBooking = (booking) => {
//     setSelectedBooking(booking);
//     setEditForm({
//       name: booking.name,
//       email: booking.email,
//       phone: booking.phone,
//       instrument: booking.instrument,
//       experience: booking.experience,
//       preferredDate: booking.preferredDate,
//       preferredTime: booking.preferredTime,
//       lessonType: booking.lessonType,
//       message: booking.message,
//       status: booking.status,
//       age: booking.age || "",
//       address: booking.address || "",
//       emergencyContact: booking.emergencyContact || ""
//     });
//     setShowEditModal(true);
//   };

//   // Open update confirmation modal
//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     setShowUpdateConfirmModal(true);
//   };

//   // Update booking using axios
//   const handleUpdateBooking = async () => {
//     if (!selectedBooking) return;

//     setActionLoading(true);
//     try {
//       const response = await api.put(`/api/bookings/${selectedBooking.id}`, editForm);

//       if (response.status === 200) {
//         const updatedBooking = response.data;
//         setBookings(prev => prev.map(book => 
//           book.id === selectedBooking.id ? updatedBooking : book
//         ));
//         setShowEditModal(false);
//         setShowUpdateConfirmModal(false);
//         setSelectedBooking(null);
//       } else {
//         alert('Failed to update booking');
//       }
//     } catch (error) {
//       console.error('Error updating booking:', error);
//       // For demo, update local state
//       const updatedBooking = {
//         ...selectedBooking,
//         ...editForm,
//         updatedAt: new Date().toISOString()
//       };
//       setBookings(prev => prev.map(book => 
//         book.id === selectedBooking.id ? updatedBooking : book
//       ));
//       setShowEditModal(false);
//       setShowUpdateConfirmModal(false);
//       setSelectedBooking(null);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Quick status update using axios
//   const handleQuickStatusUpdate = async (bookingId, newStatus) => {
//     setActionLoading(true);
//     try {
//       const response = await api.patch(`/api/bookings/${bookingId}`, { status: newStatus });

//       if (response.status === 200) {
//         const updatedBooking = response.data;
//         setBookings(prev => prev.map(book => 
//           book.id === bookingId ? updatedBooking : book
//         ));
//       } else {
//         alert('Failed to update booking status');
//       }
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//       // For demo, update local state
//       setBookings(prev => prev.map(book => 
//         book.id === bookingId 
//           ? { ...book, status: newStatus, updatedAt: new Date().toISOString() }
//           : book
//       ));
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = (booking) => {
//     setSelectedBooking(booking);
//     setShowDeleteModal(true);
//   };

//   // Delete booking using axios
//   const handleDeleteBooking = async () => {
//     if (!selectedBooking) return;

//     setActionLoading(true);
//     try {
//       const response = await api.delete(`/api/bookings/${selectedBooking.id}`);

//       if (response.status === 200 || response.status === 204) {
//         setBookings(prev => prev.filter(book => book.id !== selectedBooking.id));
//         setShowDeleteModal(false);
//         setSelectedBooking(null);
//       } else {
//         alert('Failed to delete booking');
//       }
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//       // For demo, remove from local state
//       setBookings(prev => prev.filter(book => book.id !== selectedBooking.id));
//       setShowDeleteModal(false);
//       setSelectedBooking(null);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowViewModal(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       weekday: 'short'
//     });
//   };

//   // Format time for display
//   const formatTime = (time) => {
//     return timeSlots.find(slot => slot.value === time)?.label || time;
//   };

//   // Format lesson type
//   const formatLessonType = (type) => {
//     return lessonTypes.find(lesson => lesson.value === type)?.label || type;
//   };

//   // Get status badge color and icon
//   const getStatusInfo = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return { 
//           color: 'bg-green-100 text-green-800',
//           icon: <CheckCircle className="text-sm" />
//         };
//       case 'pending':
//         return { 
//           color: 'bg-yellow-100 text-yellow-800',
//           icon: <Pending className="text-sm" />
//         };
//       case 'completed':
//         return { 
//           color: 'bg-blue-100 text-blue-800',
//           icon: <EventAvailable className="text-sm" />
//         };
//       case 'cancelled':
//         return { 
//           color: 'bg-red-100 text-red-800',
//           icon: <EventBusy className="text-sm" />
//         };
//       case 'no_show':
//         return { 
//           color: 'bg-gray-100 text-gray-800',
//           icon: <ClearIcon className="text-sm" />
//         };
//       default:
//         return { 
//           color: 'bg-gray-100 text-gray-800',
//           icon: <Pending className="text-sm" />
//         };
//     }
//   };

//   // Get experience badge color
//   const getExperienceColor = (experience) => {
//     switch (experience) {
//       case 'beginner': return 'bg-green-100 text-green-800';
//       case 'intermediate': return 'bg-blue-100 text-blue-800';
//       case 'advanced': return 'bg-purple-100 text-purple-800';
//       case 'professional': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Filter bookings based on search and filters
//   // FIXED: Changed from testimonials. Filter to testimonials.filter in your original code
//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.instrument.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesInstrument = filterInstrument === 'all' || booking.instrument === filterInstrument;
//     const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
//     const matchesDate = !filterDate || booking.preferredDate === filterDate;
    
//     return matchesSearch && matchesInstrument && matchesStatus && matchesDate;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterInstrument('all');
//     setFilterStatus('all');
//     setFilterDate('');
//   };

//   // Calculate statistics
//   const totalBookings = bookings.length;
//   const pendingBookings = bookings.filter(b => b.status === 'pending').length;
//   const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
//   const today = new Date().toISOString().split('T')[0];
//   const todayBookings = bookings.filter(b => b.preferredDate === today).length;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <Sidebar 
//         isOpen={sidebarOpen} 
//         onClose={() => setSidebarOpen(false)} 
//       />
      
//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header with Menu Button */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <MenuIcon className="text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
//                 <p className="text-gray-600 mt-1">Manage music lesson bookings and schedules</p>
//               </div>
//             </div>
            
//             <motion.button
//               onClick={() => setShowCreateModal(true)}
//               className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <AddIcon />
//               <span className="hidden sm:inline">New Booking</span>
//             </motion.button>
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
//                   placeholder="Search bookings..."
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
//                   <option key={instrument} value={instrument}>
//                     {instrument}
//                   </option>
//                 ))}
//               </select>

//               {/* Status Filter */}
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Status</option>
//                 {statusOptions.map(status => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Date Filter and Reset */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Filter by Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 />
//               </div>

//               <div className="flex justify-end items-end">
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
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Bookings</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalBookings}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <CalendarToday className="text-indigo-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Pending</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{pendingBookings}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                   <Pending className="text-yellow-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Confirmed</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{confirmedBookings}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <CheckCircle className="text-green-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Today</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{todayBookings}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <Schedule className="text-blue-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bookings Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
//             {filteredBookings.map((booking) => {
//               const statusInfo = getStatusInfo(booking.status);
//               return (
//                 <motion.div
//                   key={booking.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="p-4 lg:p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
//                         <p className="text-sm text-gray-500">ID: #{booking.id}</p>
//                       </div>
//                       <div className="flex flex-col items-end space-y-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
//                           {statusInfo.icon}
//                           <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
//                         </span>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}>
//                           {booking.experience.charAt(0).toUpperCase() + booking.experience.slice(1)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 mb-4">
//                       <div className="flex items-center space-x-3">
//                         <Email className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600 truncate">{booking.email}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Phone className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{booking.phone}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <MusicNote className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{booking.instrument}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CalendarToday className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{formatDate(booking.preferredDate)}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <AccessTime className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{formatTime(booking.preferredTime)}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <School className="text-gray-400 text-sm" />
//                         <span className="text-sm text-gray-600">{formatLessonType(booking.lessonType)}</span>
//                       </div>
//                     </div>

//                     {/* Notes Preview */}
//                     {booking.message && (
//                       <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           "{booking.message}"
//                         </p>
//                       </div>
//                     )}

//                     {/* Quick Actions and Main Actions */}
//                     <div className="space-y-3">
//                       {/* Quick Status Actions */}
//                       <div className="flex space-x-2">
//                         {booking.status === 'pending' && (
//                           <motion.button
//                             onClick={() => handleQuickStatusUpdate(booking.id, 'confirmed')}
//                             className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center space-x-1"
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                           >
//                             <CheckIcon className="text-xs" />
//                             <span>Confirm</span>
//                           </motion.button>
//                         )}
//                         {booking.status !== 'cancelled' && (
//                           <motion.button
//                             onClick={() => handleQuickStatusUpdate(booking.id, 'cancelled')}
//                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center space-x-1"
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                           >
//                             <ClearIcon className="text-xs" />
//                             <span>Cancel</span>
//                           </motion.button>
//                         )}
//                       </div>

//                       {/* Main Actions */}
//                       <div className="flex space-x-2 pt-2 border-t border-gray-100">
//                         <motion.button
//                           onClick={() => handleViewBooking(booking)}
//                           className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <ViewIcon className="text-sm" />
//                           <span>View</span>
//                         </motion.button>
//                         <motion.button
//                           onClick={() => handleEditBooking(booking)}
//                           className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <EditIcon className="text-sm" />
//                           <span>Edit</span>
//                         </motion.button>
//                         <motion.button
//                           onClick={() => handleDeleteClick(booking)}
//                           className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <DeleteIcon className="text-sm" />
//                           <span>Delete</span>
//                         </motion.button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Empty State */}
//           {filteredBookings.length === 0 && (
//             <div className="text-center py-12">
//               <CalendarToday className="mx-auto text-gray-400 text-6xl mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
//               <p className="text-gray-600 mb-6">
//                 {bookings.length === 0 
//                   ? "Get started by creating your first music lesson booking." 
//                   : "No bookings match your current filters."}
//               </p>
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Create First Booking
//               </motion.button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Booking Modal */}
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
//                 <h2 className="text-xl font-semibold text-gray-900">Create New Booking</h2>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={bookingForm.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter full name"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={bookingForm.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter email address"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       value={bookingForm.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter phone number"
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
//                       required
//                       value={bookingForm.instrument}
//                       onChange={handleInputChange}
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
//                       Experience Level *
//                     </label>
//                     <select
//                       name="experience"
//                       required
//                       value={bookingForm.experience}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {experienceLevels.map(level => (
//                         <option key={level.value} value={level.value}>
//                           {level.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="preferredDate"
//                       required
//                       value={bookingForm.preferredDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred Time *
//                     </label>
//                     <select
//                       name="preferredTime"
//                       required
//                       value={bookingForm.preferredTime}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {timeSlots.map(slot => (
//                         <option key={slot.value} value={slot.value}>
//                           {slot.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Lesson Type *
//                     </label>
//                     <select
//                       name="lessonType"
//                       required
//                       value={bookingForm.lessonType}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {lessonTypes.map(lesson => (
//                         <option key={lesson.value} value={lesson.value}>
//                           {lesson.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={bookingForm.age}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter age"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Emergency Contact
//                     </label>
//                     <input
//                       type="tel"
//                       name="emergencyContact"
//                       value={bookingForm.emergencyContact}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Emergency contact number"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={bookingForm.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter full address"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Additional Notes
//                   </label>
//                   <textarea
//                     name="message"
//                     rows="3"
//                     value={bookingForm.message}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     placeholder="Any specific goals, preferences, or special requirements..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     required
//                     value={bookingForm.status}
//                     onChange={handleInputChange}
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
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
//                   >
//                     <AddIcon className="text-sm" />
//                     <span>Create Booking</span>
//                   </motion.button>
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
//                   Create New Booking?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to create a booking for <strong>{bookingForm.name}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{bookingForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Date:</span>
//                     <span className="text-sm font-medium">{formatDate(bookingForm.preferredDate)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Time:</span>
//                     <span className="text-sm font-medium">{formatTime(bookingForm.preferredTime)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Type:</span>
//                     <span className="text-sm font-medium">{formatLessonType(bookingForm.lessonType)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(bookingForm.status).color}`}>
//                       {bookingForm.status.charAt(0).toUpperCase() + bookingForm.status.slice(1)}
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
//                     onClick={handleCreateBooking}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Creating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Confirm Create</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Booking Modal - Similar structure to Create but with edit data */}
//       <AnimatePresence>
//         {showEditModal && selectedBooking && (
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
//                 <h2 className="text-xl font-semibold text-gray-900">Edit Booking</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={editForm.name}
//                     onChange={handleEditInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={editForm.email}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       value={editForm.phone}
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
//                       required
//                       value={editForm.instrument}
//                       onChange={handleEditInputChange}
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
//                       Experience Level *
//                     </label>
//                     <select
//                       name="experience"
//                       required
//                       value={editForm.experience}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {experienceLevels.map(level => (
//                         <option key={level.value} value={level.value}>
//                           {level.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="preferredDate"
//                       required
//                       value={editForm.preferredDate}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred Time *
//                     </label>
//                     <select
//                       name="preferredTime"
//                       required
//                       value={editForm.preferredTime}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {timeSlots.map(slot => (
//                         <option key={slot.value} value={slot.value}>
//                           {slot.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Lesson Type *
//                     </label>
//                     <select
//                       name="lessonType"
//                       required
//                       value={editForm.lessonType}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {lessonTypes.map(lesson => (
//                         <option key={lesson.value} value={lesson.value}>
//                           {lesson.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={editForm.age}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Emergency Contact
//                     </label>
//                     <input
//                       type="tel"
//                       name="emergencyContact"
//                       value={editForm.emergencyContact}
//                       onChange={handleEditInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={editForm.address}
//                     onChange={handleEditInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Additional Notes
//                   </label>
//                   <textarea
//                     name="message"
//                     rows="3"
//                     value={editForm.message}
//                     onChange={handleEditInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status *
//                   </label>
//                   <select
//                     name="status"
//                     required
//                     value={editForm.status}
//                     onChange={handleEditInputChange}
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
//                     <span>Update Booking</span>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Update Confirmation Modal */}
//       <AnimatePresence>
//         {showUpdateConfirmModal && selectedBooking && (
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
//                   Update Booking?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to update the booking for <strong>{editForm.name}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">{editForm.instrument}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Date:</span>
//                     <span className="text-sm font-medium">{formatDate(editForm.preferredDate)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Time:</span>
//                     <span className="text-sm font-medium">{formatTime(editForm.preferredTime)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(editForm.status).color}`}>
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
//                     onClick={handleUpdateBooking}
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

//       {/* View Booking Modal */}
//       <AnimatePresence>
//         {showViewModal && selectedBooking && (
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
//                 <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.name}</h3>
//                     <p className="text-gray-600 mt-1">ID: #{selectedBooking.id}</p>
//                   </div>
//                   <div className="flex flex-col items-end space-y-2">
//                     <span className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusInfo(selectedBooking.status).color} flex items-center space-x-2`}>
//                       {getStatusInfo(selectedBooking.status).icon}
//                       <span>{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</span>
//                     </span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(selectedBooking.experience)}`}>
//                       {selectedBooking.experience.charAt(0).toUpperCase() + selectedBooking.experience.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Email</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <Email className="text-gray-400" />
//                         <span>{selectedBooking.email}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Phone</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <Phone className="text-gray-400" />
//                         <span>{selectedBooking.phone}</span>
//                       </p>
//                     </div>
//                     {selectedBooking.age && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Age</label>
//                         <p className="text-lg text-gray-900">{selectedBooking.age} years old</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Instrument</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <MusicNote className="text-gray-400" />
//                         <span>{selectedBooking.instrument}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Lesson Type</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <School className="text-gray-400" />
//                         <span>{formatLessonType(selectedBooking.lessonType)}</span>
//                       </p>
//                     </div>
//                     {selectedBooking.emergencyContact && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
//                         <p className="text-lg text-gray-900">{selectedBooking.emergencyContact}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Schedule Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Preferred Date</label>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
//                       <CalendarToday className="text-gray-400" />
//                       <span>{formatDate(selectedBooking.preferredDate)}</span>
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Preferred Time</label>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
//                       <AccessTime className="text-gray-400" />
//                       <span>{formatTime(selectedBooking.preferredTime)}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Address */}
//                 {selectedBooking.address && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
//                     <p className="text-gray-900">{selectedBooking.address}</p>
//                   </div>
//                 )}

//                 {/* Notes */}
//                 {selectedBooking.message && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-3">Additional Notes</label>
//                     <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                       <p className="text-gray-700 leading-relaxed">{selectedBooking.message}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Created At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Updated At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedBooking.updatedAt)}</p>
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
//         {showDeleteModal && selectedBooking && (
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
//                   Delete Booking?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete the booking from <strong>{selectedBooking.name}</strong>? 
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
//                     onClick={handleDeleteBooking}
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
  Phone,
  Schedule,
  CalendarToday,
  AccessTime,
  School,
  Search,
  FilterList,
  Save,
  Update,
  Menu as MenuIcon,
  EventAvailable,
  EventBusy,
  Pending,
  Check as CheckIcon,
  Clear as ClearIcon
} from '@mui/icons-material';


const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instruments for selection
const instruments = [
  'Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 
  'Saxophone', 'Trumpet', 'Cello', 'Clarinet', 'Voice',
  'Bass Guitar', 'Keyboard', 'Harp', 'Ukulele', 'Mandolin'
];

// Experience levels
const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'professional', label: 'Professional' }
];

// Time slots
const timeSlots = [
  { value: 'morning', label: 'Morning (9AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
  { value: 'evening', label: 'Evening (5PM-8PM)' }
];

// Status options
const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'no_show', label: 'No Show' }
];

// Lesson types
const lessonTypes = [
  { value: 'trial', label: 'Trial Lesson' },
  { value: 'regular', label: 'Regular Lesson' },
  { value: 'intensive', label: 'Intensive Course' },
  { value: 'workshop', label: 'Workshop' }
];

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Form states
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
    preferredDate: "",
    preferredTime: "morning",
    lessonType: "trial",
    message: "",
    status: "pending",
    age: "",
    address: "",
    emergencyContact: ""
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
    preferredDate: "",
    preferredTime: "morning",
    lessonType: "trial",
    message: "",
    status: "pending",
    age: "",
    address: "",
    emergencyContact: ""
  });

  // Helper function for mock data
  const getMockData = () => {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        instrument: "Piano",
        experience: "beginner",
        preferredDate: "2024-02-15",
        preferredTime: "morning",
        lessonType: "trial",
        message: "I'm excited to start learning piano! I've always wanted to play classical music.",
        status: "confirmed",
        age: "28",
        address: "123 Main St, New York, NY",
        emergencyContact: "+1 (555) 987-6543",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-5678",
        instrument: "Guitar",
        experience: "intermediate",
        preferredDate: "2024-02-16",
        preferredTime: "evening",
        lessonType: "regular",
        message: "Looking to improve my fingerstyle technique.",
        status: "pending",
        age: "22",
        address: "456 Oak Ave, Los Angeles, CA",
        emergencyContact: "+1 (555) 876-5432",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        email: "emma.rodriguez@email.com",
        phone: "+1 (555) 345-6789",
        instrument: "Violin",
        experience: "advanced",
        preferredDate: "2024-02-14",
        preferredTime: "afternoon",
        lessonType: "intensive",
        message: "Preparing for conservatory auditions.",
        status: "completed",
        age: "35",
        address: "789 Pine St, Chicago, IL",
        emergencyContact: "+1 (555) 765-4321",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: "David Kim",
        email: "david.kim@email.com",
        phone: "+1 (555) 456-7890",
        instrument: "Drums",
        experience: "beginner",
        preferredDate: "2024-02-17",
        preferredTime: "morning",
        lessonType: "trial",
        message: "Always wanted to learn drums. Complete beginner.",
        status: "cancelled",
        age: "19",
        address: "321 Elm St, Miami, FL",
        emergencyContact: "+1 (555) 654-3210",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        phone: "+1 (555) 567-8901",
        instrument: "Voice",
        experience: "intermediate",
        preferredDate: "2024-02-18",
        preferredTime: "evening",
        lessonType: "workshop",
        message: "Interested in jazz vocal techniques.",
        status: "pending",
        age: "26",
        address: "654 Maple Dr, Seattle, WA",
        emergencyContact: "+1 (555) 543-2109",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  };

  // Fetch all bookings using axios
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/bookings');
      
      // Ensure we always have an array
      let bookingsData = [];
      
      if (response.status === 200 && response.data) {
        // Handle different response formats
        if (Array.isArray(response.data)) {
          bookingsData = response.data;
        } else if (response.data.bookings && Array.isArray(response.data.bookings)) {
          bookingsData = response.data.bookings;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          bookingsData = response.data.data;
        } else {
          console.warn('Unexpected response format, using mock data');
          bookingsData = getMockData();
        }
      } else {
        console.warn('Failed to fetch bookings, using mock data');
        bookingsData = getMockData();
      }
      
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to mock data
      setBookings(getMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open create confirmation modal
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setShowCreateConfirmModal(true);
  };

  // Create new booking using axios
  const handleCreateBooking = async () => {
    setActionLoading(true);

    try {
      const response = await api.post('/api/bookings', bookingForm);

      if (response.status === 201 || response.status === 200) {
        const newBooking = response.data;
        setBookings(prev => {
          const currentBookings = Array.isArray(prev) ? prev : [];
          return [newBooking, ...currentBookings];
        });
        setShowCreateModal(false);
        setShowCreateConfirmModal(false);
        resetBookingForm();
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // For demo, add to local state
      const newBooking = {
        id: Date.now(),
        ...bookingForm,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setBookings(prev => {
        const currentBookings = Array.isArray(prev) ? prev : [];
        return [newBooking, ...currentBookings];
      });
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);
      resetBookingForm();
    } finally {
      setActionLoading(false);
    }
  };

  // Reset form helper
  const resetBookingForm = () => {
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      instrument: "",
      experience: "beginner",
      preferredDate: "",
      preferredTime: "morning",
      lessonType: "trial",
      message: "",
      status: "pending",
      age: "",
      address: "",
      emergencyContact: ""
    });
  };

  // Open edit modal
  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setEditForm({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      instrument: booking.instrument || "",
      experience: booking.experience || "beginner",
      preferredDate: booking.preferredDate || "",
      preferredTime: booking.preferredTime || "morning",
      lessonType: booking.lessonType || "trial",
      message: booking.message || "",
      status: booking.status || "pending",
      age: booking.age || "",
      address: booking.address || "",
      emergencyContact: booking.emergencyContact || ""
    });
    setShowEditModal(true);
  };

  // Open update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  // Update booking using axios
  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    setActionLoading(true);
    try {
      const response = await api.put(`/api/bookings/${selectedBooking.id}`, editForm);

      if (response.status === 200) {
        const updatedBooking = response.data;
        setBookings(prev => {
          const currentBookings = Array.isArray(prev) ? prev : [];
          return currentBookings.map(book => 
            book.id === selectedBooking.id ? updatedBooking : book
          );
        });
        setShowEditModal(false);
        setShowUpdateConfirmModal(false);
        setSelectedBooking(null);
      } else {
        alert('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      // For demo, update local state
      const updatedBooking = {
        ...selectedBooking,
        ...editForm,
        updatedAt: new Date().toISOString()
      };
      setBookings(prev => {
        const currentBookings = Array.isArray(prev) ? prev : [];
        return currentBookings.map(book => 
          book.id === selectedBooking.id ? updatedBooking : book
        );
      });
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedBooking(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Quick status update using axios
  const handleQuickStatusUpdate = async (bookingId, newStatus) => {
    setActionLoading(true);
    try {
      const response = await api.patch(`/api/bookings/${bookingId}`, { status: newStatus });

      if (response.status === 200) {
        const updatedBooking = response.data;
        setBookings(prev => {
          const currentBookings = Array.isArray(prev) ? prev : [];
          return currentBookings.map(book => 
            book.id === bookingId ? updatedBooking : book
          );
        });
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      // For demo, update local state
      setBookings(prev => {
        const currentBookings = Array.isArray(prev) ? prev : [];
        return currentBookings.map(book => 
          book.id === bookingId 
            ? { ...book, status: newStatus, updatedAt: new Date().toISOString() }
            : book
        );
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  // Delete booking using axios
  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    setActionLoading(true);
    try {
      const response = await api.delete(`/api/bookings/${selectedBooking.id}`);

      if (response.status === 200 || response.status === 204) {
        setBookings(prev => {
          const currentBookings = Array.isArray(prev) ? prev : [];
          return currentBookings.filter(book => book.id !== selectedBooking.id);
        });
        setShowDeleteModal(false);
        setSelectedBooking(null);
      } else {
        alert('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      // For demo, remove from local state
      setBookings(prev => {
        const currentBookings = Array.isArray(prev) ? prev : [];
        return currentBookings.filter(book => book.id !== selectedBooking.id);
      });
      setShowDeleteModal(false);
      setSelectedBooking(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Format time for display
  const formatTime = (time) => {
    if (!time) return 'N/A';
    return timeSlots.find(slot => slot.value === time)?.label || time;
  };

  // Format lesson type
  const formatLessonType = (type) => {
    if (!type) return 'N/A';
    return lessonTypes.find(lesson => lesson.value === type)?.label || type;
  };

  // Get status badge color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'confirmed':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="text-sm" />
        };
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Pending className="text-sm" />
        };
      case 'completed':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <EventAvailable className="text-sm" />
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <EventBusy className="text-sm" />
        };
      case 'no_show':
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <ClearIcon className="text-sm" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <Pending className="text-sm" />
        };
    }
  };

  // Get experience badge color
  const getExperienceColor = (experience) => {
    if (!experience) return 'bg-gray-100 text-gray-800';
    switch (experience) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'professional': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter bookings based on search and filters
  const filteredBookings = (Array.isArray(bookings) ? bookings : []).filter(booking => {
    // Ensure booking is an object
    if (!booking || typeof booking !== 'object') return false;
    
    const name = booking.name || '';
    const email = booking.email || '';
    const instrument = booking.instrument || '';
    const status = booking.status || '';
    const preferredDate = booking.preferredDate || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    const matchesDate = !filterDate || preferredDate === filterDate;
    
    return matchesSearch && matchesInstrument && matchesStatus && matchesDate;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterInstrument('all');
    setFilterStatus('all');
    setFilterDate('');
  };

  // Calculate statistics - ensure bookings is an array
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const pendingBookings = Array.isArray(bookings) ? bookings.filter(b => b?.status === 'pending').length : 0;
  const confirmedBookings = Array.isArray(bookings) ? bookings.filter(b => b?.status === 'confirmed').length : 0;
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = Array.isArray(bookings) ? bookings.filter(b => b?.preferredDate === today).length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex">
      
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header with Menu Button */}
        <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border-b border-gray-200 sticky top-0 z-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <MenuIcon className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Booking Management</h1>
                <p className="text-gray-100 mt-1">Manage music lesson bookings and schedules</p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AddIcon />
              <span className="hidden sm:inline">New Booking</span>
            </motion.button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Search and Filters */}
          <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
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
                  <option key={instrument} value={instrument}>
                    {instrument}
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
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter and Reset */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Filter by Date
                </label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div className="flex justify-end items-end">
                <button
                  onClick={resetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  <FilterList className="text-sm" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Total Bookings</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-100">{totalBookings}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <CalendarToday className="text-indigo-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Pending</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-100">{pendingBookings}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Pending className="text-yellow-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Confirmed</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-100">{confirmedBookings}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-green-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Today</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-100">{todayBookings}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Schedule className="text-blue-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredBookings.length > 0 ? filteredBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4 lg:p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.name || 'N/A'}</h3>
                        <p className="text-sm text-gray-500">ID: #{booking.id || 'N/A'}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
                          {statusInfo.icon}
                          <span>{(booking.status || '').charAt(0).toUpperCase() + (booking.status || '').slice(1)}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}>
                          {(booking.experience || '').charAt(0).toUpperCase() + (booking.experience || '').slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <Email className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600 truncate">{booking.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{booking.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MusicNote className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{booking.instrument || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CalendarToday className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{formatDate(booking.preferredDate)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <AccessTime className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{formatTime(booking.preferredTime)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <School className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{formatLessonType(booking.lessonType)}</span>
                      </div>
                    </div>

                    {/* Notes Preview */}
                    {booking.message && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          "{booking.message}"
                        </p>
                      </div>
                    )}

                    {/* Quick Actions and Main Actions */}
                    <div className="space-y-3">
                      {/* Quick Status Actions */}
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <motion.button
                            onClick={() => handleQuickStatusUpdate(booking.id, 'confirmed')}
                            className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center space-x-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <CheckIcon className="text-xs" />
                            <span>Confirm</span>
                          </motion.button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <motion.button
                            onClick={() => handleQuickStatusUpdate(booking.id, 'cancelled')}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center space-x-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ClearIcon className="text-xs" />
                            <span>Cancel</span>
                          </motion.button>
                        )}
                      </div>

                      {/* Main Actions */}
                      <div className="flex space-x-2 pt-2 border-t border-gray-100">
                        <motion.button
                          onClick={() => handleViewBooking(booking)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ViewIcon className="text-sm" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleEditBooking(booking)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <EditIcon className="text-sm" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteClick(booking)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <DeleteIcon className="text-sm" />
                          <span>Delete</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-full text-center py-12">
                <CalendarToday className="mx-auto text-gray-400 text-6xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                <p className="text-gray-600 mb-6">
                  {totalBookings === 0 
                    ? "Get started by creating your first music lesson booking." 
                    : "No bookings match your current filters."}
                </p>
                <motion.button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create First Booking
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Booking Modal */}
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
                <h2 className="text-xl font-semibold text-gray-900">Create New Booking</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter phone number"
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
                      required
                      value={bookingForm.instrument}
                      onChange={handleInputChange}
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
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      required
                      value={bookingForm.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={bookingForm.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      required
                      value={bookingForm.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Type *
                    </label>
                    <select
                      name="lessonType"
                      required
                      value={bookingForm.lessonType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {lessonTypes.map(lesson => (
                        <option key={lesson.value} value={lesson.value}>
                          {lesson.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={bookingForm.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={bookingForm.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Any specific goals, preferences, or special requirements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    required
                    value={bookingForm.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <AddIcon className="text-sm" />
                    <span>Create Booking</span>
                  </motion.button>
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
                  Create New Booking?
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to create a booking for <strong>{bookingForm.name}</strong>?
                </p>

                <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Instrument:</span>
                    <span className="text-sm font-medium">{bookingForm.instrument}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="text-sm font-medium">{formatDate(bookingForm.preferredDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="text-sm font-medium">{formatTime(bookingForm.preferredTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="text-sm font-medium">{formatLessonType(bookingForm.lessonType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(bookingForm.status).color}`}>
                      {bookingForm.status.charAt(0).toUpperCase() + bookingForm.status.slice(1)}
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
                    onClick={handleCreateBooking}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="text-sm" />
                        <span>Confirm Create</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Booking Modal - Similar structure to Create but with edit data */}
      <AnimatePresence>
        {showEditModal && selectedBooking && (
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
                <h2 className="text-xl font-semibold text-gray-900">Edit Booking</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editForm.name}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={editForm.email}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={editForm.phone}
                      onChange={handleEditInputChange}
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
                      required
                      value={editForm.instrument}
                      onChange={handleEditInputChange}
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
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      required
                      value={editForm.experience}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={editForm.preferredDate}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      required
                      value={editForm.preferredTime}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Type *
                    </label>
                    <select
                      name="lessonType"
                      required
                      value={editForm.lessonType}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {lessonTypes.map(lesson => (
                        <option key={lesson.value} value={lesson.value}>
                          {lesson.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={editForm.age}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={editForm.emergencyContact}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={editForm.message}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    required
                    value={editForm.status}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
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
                    <span>Update Booking</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Confirmation Modal */}
      <AnimatePresence>
        {showUpdateConfirmModal && selectedBooking && (
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
                  Update Booking?
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to update the booking for <strong>{editForm.name}</strong>?
                </p>

                <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Instrument:</span>
                    <span className="text-sm font-medium">{editForm.instrument}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="text-sm font-medium">{formatDate(editForm.preferredDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="text-sm font-medium">{formatTime(editForm.preferredTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(editForm.status).color}`}>
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
                    onClick={handleUpdateBooking}
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

      {/* View Booking Modal */}
      <AnimatePresence>
        {showViewModal && selectedBooking && (
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
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.name || 'N/A'}</h3>
                    <p className="text-gray-600 mt-1">ID: #{selectedBooking.id || 'N/A'}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusInfo(selectedBooking.status).color} flex items-center space-x-2`}>
                      {getStatusInfo(selectedBooking.status).icon}
                      <span>{(selectedBooking.status || '').charAt(0).toUpperCase() + (selectedBooking.status || '').slice(1)}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(selectedBooking.experience)}`}>
                      {(selectedBooking.experience || '').charAt(0).toUpperCase() + (selectedBooking.experience || '').slice(1)}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <Email className="text-gray-400" />
                        <span>{selectedBooking.email || 'N/A'}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <Phone className="text-gray-400" />
                        <span>{selectedBooking.phone || 'N/A'}</span>
                      </p>
                    </div>
                    {selectedBooking.age && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Age</label>
                        <p className="text-lg text-gray-900">{selectedBooking.age} years old</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Instrument</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <MusicNote className="text-gray-400" />
                        <span>{selectedBooking.instrument || 'N/A'}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Lesson Type</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <School className="text-gray-400" />
                        <span>{formatLessonType(selectedBooking.lessonType)}</span>
                      </p>
                    </div>
                    {selectedBooking.emergencyContact && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
                        <p className="text-lg text-gray-900">{selectedBooking.emergencyContact}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Preferred Date</label>
                    <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <CalendarToday className="text-gray-400" />
                      <span>{formatDate(selectedBooking.preferredDate)}</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Preferred Time</label>
                    <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <AccessTime className="text-gray-400" />
                      <span>{formatTime(selectedBooking.preferredTime)}</span>
                    </p>
                  </div>
                </div>

                {/* Address */}
                {selectedBooking.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                    <p className="text-gray-900">{selectedBooking.address}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedBooking.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-3">Additional Notes</label>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{selectedBooking.message}</p>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Updated At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedBooking.updatedAt)}</p>
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
        {showDeleteModal && selectedBooking && (
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
                  Delete Booking?
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete the booking from <strong>{selectedBooking.name}</strong>? 
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
                    onClick={handleDeleteBooking}
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
  );
};