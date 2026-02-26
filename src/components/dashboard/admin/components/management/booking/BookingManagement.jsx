
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
//   Clear as ClearIcon,
//   Refresh,
//   ViewHeadline
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

// // Booking Card Component
// const BookingCard = ({ booking, onEdit, onDelete, onView, onQuickStatusUpdate }) => {
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

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   const statusInfo = getStatusInfo(booking.status);

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//       <div className="flex items-center">
//         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
//           <Person className="w-5 h-5 text-indigo-600" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <div className="text-sm font-medium text-gray-900 truncate">
//             {booking.name || 'N/A'}
//           </div>
//           <div className="text-sm text-gray-500 truncate">
//             {booking.email || 'N/A'}
//           </div>
//           <div className="flex items-center gap-2 mt-1">
//             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
//               {statusInfo.icon}
//               <span>{(booking.status || '').charAt(0).toUpperCase() + (booking.status || '').slice(1)}</span>
//             </span>
//             <span className="text-xs text-gray-600">
//               {formatDate(booking.preferredDate)}
//             </span>
//           </div>
//         </div>
//       </div>
      
//       <div className="mt-3 text-sm text-gray-600">
//         <div className="flex items-center gap-2">
//           <MusicNote className="w-4 h-4 text-gray-400" />
//           <span>{booking.instrument || 'N/A'}</span>
//         </div>
//       </div>
      
//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={() => onView(booking)}
//           className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//           title="View booking"
//         >
//           <ViewIcon className="w-3 h-3" />
//           <span className="hidden xs:inline">View</span>
//         </button>
//         <button
//           onClick={() => onEdit(booking)}
//           className="px-3 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-sm"
//           title="Edit booking"
//         >
//           <EditIcon className="w-3 h-3" />
//           <span className="hidden xs:inline">Edit</span>
//         </button>
//         <button
//           onClick={() => onDelete(booking)}
//           className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//           title="Delete booking"
//         >
//           <DeleteIcon className="w-3 h-3" />
//           <span className="hidden xs:inline">Delete</span>
//         </button>
//       </div>

//       {/* Quick Status Actions */}
//       <div className="mt-2 flex gap-1">
//         {booking.status === 'pending' && (
//           <button
//             onClick={() => onQuickStatusUpdate(booking.id, 'confirmed')}
//             className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-1 px-2 rounded-md transition-colors text-xs flex items-center justify-center space-x-1"
//           >
//             <CheckIcon className="w-3 h-3" />
//             <span>Confirm</span>
//           </button>
//         )}
//         {booking.status !== 'cancelled' && booking.status !== 'completed' && (
//           <button
//             onClick={() => onQuickStatusUpdate(booking.id, 'cancelled')}
//             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-1 px-2 rounded-md transition-colors text-xs flex items-center justify-center space-x-1"
//           >
//             <ClearIcon className="w-3 h-3" />
//             <span>Cancel</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  
//   // Modal states
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
//   const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [searchQuery, setSearchQuery] = useState('');
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
//       setError(null);
//       const response = await api.get('/api/bookings');
      
//       // Ensure we always have an array
//       let bookingsData = [];
      
//       if (response.status === 200 && response.data) {
//         // Handle different response formats
//         if (Array.isArray(response.data)) {
//           bookingsData = response.data;
//         } else if (response.data.bookings && Array.isArray(response.data.bookings)) {
//           bookingsData = response.data.bookings;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//           bookingsData = response.data.data;
//         } else {
//           console.warn('Unexpected response format, using mock data');
//           bookingsData = getMockData();
//         }
//       } else {
//         console.warn('Failed to fetch bookings, using mock data');
//         bookingsData = getMockData();
//       }
      
//       setBookings(bookingsData);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       setError(error.message);
//       // Fallback to mock data
//       setBookings(getMockData());
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
//         setBookings(prev => {
//           const currentBookings = Array.isArray(prev) ? prev : [];
//           return [newBooking, ...currentBookings];
//         });
//         setShowCreateModal(false);
//         setShowCreateConfirmModal(false);
//         resetBookingForm();
//       } else {
//         setError('Failed to create booking');
//       }
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       setError(error.message);
//       // For demo, add to local state
//       const newBooking = {
//         id: Date.now(),
//         ...bookingForm,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
//       setBookings(prev => {
//         const currentBookings = Array.isArray(prev) ? prev : [];
//         return [newBooking, ...currentBookings];
//       });
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
//       name: booking.name || "",
//       email: booking.email || "",
//       phone: booking.phone || "",
//       instrument: booking.instrument || "",
//       experience: booking.experience || "beginner",
//       preferredDate: booking.preferredDate || "",
//       preferredTime: booking.preferredTime || "morning",
//       lessonType: booking.lessonType || "trial",
//       message: booking.message || "",
//       status: booking.status || "pending",
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
//         setBookings(prev => {
//           const currentBookings = Array.isArray(prev) ? prev : [];
//           return currentBookings.map(book => 
//             book.id === selectedBooking.id ? updatedBooking : book
//           );
//         });
//         setShowEditModal(false);
//         setShowUpdateConfirmModal(false);
//         setSelectedBooking(null);
//       } else {
//         setError('Failed to update booking');
//       }
//     } catch (error) {
//       console.error('Error updating booking:', error);
//       setError(error.message);
//       // For demo, update local state
//       const updatedBooking = {
//         ...selectedBooking,
//         ...editForm,
//         updatedAt: new Date().toISOString()
//       };
//       setBookings(prev => {
//         const currentBookings = Array.isArray(prev) ? prev : [];
//         return currentBookings.map(book => 
//           book.id === selectedBooking.id ? updatedBooking : book
//         );
//       });
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
//         setBookings(prev => {
//           const currentBookings = Array.isArray(prev) ? prev : [];
//           return currentBookings.map(book => 
//             book.id === bookingId ? updatedBooking : book
//           );
//         });
//       } else {
//         setError('Failed to update booking status');
//       }
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//       setError(error.message);
//       // For demo, update local state
//       setBookings(prev => {
//         const currentBookings = Array.isArray(prev) ? prev : [];
//         return currentBookings.map(book => 
//           book.id === bookingId 
//             ? { ...book, status: newStatus, updatedAt: new Date().toISOString() }
//             : book
//         );
//       });
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
//         setBookings(prev => {
//           const currentBookings = Array.isArray(prev) ? prev : [];
//           return currentBookings.filter(book => book.id !== selectedBooking.id);
//         });
//         setShowDeleteModal(false);
//         setSelectedBooking(null);
//       } else {
//         setError('Failed to delete booking');
//       }
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//       setError(error.message);
//       // For demo, remove from local state
//       setBookings(prev => {
//         const currentBookings = Array.isArray(prev) ? prev : [];
//         return currentBookings.filter(book => book.id !== selectedBooking.id);
//       });
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
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         weekday: 'short'
//       });
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   // Format time for display
//   const formatTime = (time) => {
//     if (!time) return 'N/A';
//     return timeSlots.find(slot => slot.value === time)?.label || time;
//   };

//   // Format lesson type
//   const formatLessonType = (type) => {
//     if (!type) return 'N/A';
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
//     if (!experience) return 'bg-gray-100 text-gray-800';
//     switch (experience) {
//       case 'beginner': return 'bg-green-100 text-green-800';
//       case 'intermediate': return 'bg-blue-100 text-blue-800';
//       case 'advanced': return 'bg-purple-100 text-purple-800';
//       case 'professional': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Filter bookings based on search and filters
//   const filteredBookings = (Array.isArray(bookings) ? bookings : []).filter(booking => {
//     // Ensure booking is an object
//     if (!booking || typeof booking !== 'object') return false;
    
//     const name = booking.name || '';
//     const email = booking.email || '';
//     const instrument = booking.instrument || '';
//     const status = booking.status || '';
//     const preferredDate = booking.preferredDate || '';
    
//     const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          instrument.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesInstrument = filterInstrument === 'all' || instrument === filterInstrument;
//     const matchesStatus = filterStatus === 'all' || status === filterStatus;
//     const matchesDate = !filterDate || preferredDate === filterDate;
    
//     return matchesSearch && matchesInstrument && matchesStatus && matchesDate;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchQuery('');
//     setFilterInstrument('all');
//     setFilterStatus('all');
//     setFilterDate('');
//   };

//   // Clear error
//   const clearError = () => {
//     setError(null);
//   };

//   // Calculate statistics - ensure bookings is an array
//   const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
//   const pendingBookings = Array.isArray(bookings) ? bookings.filter(b => b?.status === 'pending').length : 0;
//   const confirmedBookings = Array.isArray(bookings) ? bookings.filter(b => b?.status === 'confirmed').length : 0;
//   const today = new Date().toISOString().split('T')[0];
//   const todayBookings = Array.isArray(bookings) ? bookings.filter(b => b?.preferredDate === today).length : 0;

//   if (loading) {
//     return (
//       <div className="flex flex-col bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         <p className="text-gray-100">Loading bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
//         <div className="p-4 sm:p-6 lg:p-8">
//           {/* Header */}
//           <div className="mb-6">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//               <div className="mb-4 lg:mb-0">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                   Booking Management
//                 </h1>
//                 <p className="text-gray-100 text-sm sm:text-base">
//                   Manage music lesson bookings and schedules
//                 </p>
//               </div>

//               {/* View Mode Toggle */}
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-100 hidden sm:block">
//                   View:
//                 </span>
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setViewMode("table")}
//                     className={`p-2 rounded-md transition-colors ${
//                       viewMode === "table"
//                         ? "bg-white shadow-sm text-blue-600"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                     title="Table View"
//                   >
//                     <ViewHeadline className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 rounded-md transition-colors ${
//                       viewMode === "grid"
//                         ? "bg-white shadow-sm text-blue-600"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                     title="Grid View"
//                   >
//                     <Person className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-between">
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <button
//                   onClick={clearError}
//                   className="text-red-400 hover:text-red-600 text-lg"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Controls */}
//           <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               {/* Search */}
//               <div className="flex-1 max-w-2xl">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search by name, email, or instrument..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-black"
//                   />
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={fetchBookings}
//                     disabled={loading}
//                     className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                     title="Refresh"
//                   >
//                     <Refresh
//                       className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                     />
//                   </button>

//                   <button
//                     onClick={() => setShowCreateModal(true)}
//                     className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                   >
//                     <AddIcon className="w-4 h-4" />
//                     <span className="hidden sm:inline">New Booking</span>
//                     <span className="sm:hidden">Add</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bookings Content */}
//           {loading ? (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                 Loading bookings...
//               </p>
//             </div>
//           ) : filteredBookings.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <CalendarToday className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//               <p className="text-gray-600 text-sm sm:text-base">
//                 {searchQuery
//                   ? "No bookings match your search"
//                   : "No bookings found"}
//               </p>
//               {searchQuery && (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Try adjusting your search
//                 </p>
//               )}
//             </div>
//           ) : viewMode === "table" ? (
//             /* Table View for md screens and up */
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                         Student
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
//                         Instrument
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                         Date & Status
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredBookings.map((booking) => {
//                       const statusInfo = getStatusInfo(booking.status);
//                       return (
//                         <tr
//                           key={booking.id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
//                                 <Person className="w-4 h-4 text-indigo-600" />
//                               </div>
//                               <div className="min-w-0">
//                                 <div className="text-sm font-medium text-gray-900 truncate">
//                                   {booking.name || 'N/A'}
//                                 </div>
//                                 <div className="text-sm text-gray-500 truncate">
//                                   {booking.email || 'N/A'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden sm:table-cell">
//                             <div className="text-sm text-gray-900 truncate max-w-[120px] lg:max-w-[200px]">
//                               {booking.instrument || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex flex-col space-y-1">
//                               <div className="text-sm text-gray-900">
//                                 {formatDate(booking.preferredDate)}
//                               </div>
//                               <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1 w-fit`}>
//                                 {statusInfo.icon}
//                                 <span>{(booking.status || '').charAt(0).toUpperCase() + (booking.status || '').slice(1)}</span>
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewBooking(booking)}
//                                 className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="View booking"
//                               >
//                                 <ViewIcon className="w-3 h-3" />
//                                 <span className="hidden xs:inline">View</span>
//                               </button>
//                               <button
//                                 onClick={() => handleEditBooking(booking)}
//                                 className="px-3 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Edit booking"
//                               >
//                                 <EditIcon className="w-3 h-3" />
//                                 <span className="hidden xs:inline">Edit</span>
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(booking)}
//                                 className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Delete booking"
//                               >
//                                 <DeleteIcon className="w-3 h-3" />
//                                 <span className="hidden xs:inline">Delete</span>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             /* Grid/Card View for mobile and when in grid mode */
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredBookings.map((booking) => (
//                 <BookingCard
//                   key={booking.id}
//                   booking={booking}
//                   onEdit={handleEditBooking}
//                   onDelete={handleDeleteClick}
//                   onView={handleViewBooking}
//                   onQuickStatusUpdate={handleQuickStatusUpdate}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* All Modal Components */}
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

//               <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-black">
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

//       {/* Edit Booking Modal */}
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

//               <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-black">
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
//                     <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.name || 'N/A'}</h3>
//                     <p className="text-gray-600 mt-1">ID: #{selectedBooking.id || 'N/A'}</p>
//                   </div>
//                   <div className="flex flex-col items-end space-y-2">
//                     <span className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusInfo(selectedBooking.status).color} flex items-center space-x-2`}>
//                       {getStatusInfo(selectedBooking.status).icon}
//                       <span>{(selectedBooking.status || '').charAt(0).toUpperCase() + (selectedBooking.status || '').slice(1)}</span>
//                     </span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(selectedBooking.experience)}`}>
//                       {(selectedBooking.experience || '').charAt(0).toUpperCase() + (selectedBooking.experience || '').slice(1)}
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
//                         <span>{selectedBooking.email || 'N/A'}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500">Phone</label>
//                       <p className="text-lg text-gray-900 flex items-center space-x-2">
//                         <Phone className="text-gray-400" />
//                         <span>{selectedBooking.phone || 'N/A'}</span>
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
//                         <span>{selectedBooking.instrument || 'N/A'}</span>
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
  Clear as ClearIcon,
  Refresh,
  ViewHeadline,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes("application/json")) {
      return response;
    } else {
      console.warn("Server returned non-JSON response");
      try {
        if (
          typeof response.data === "string" &&
          response.data.trim().startsWith("<")
        ) {
          throw new Error("Server returned HTML instead of JSON");
        }
        return response;
      } catch (error) {
        throw new Error("Invalid response format from server");
      }
    }
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

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
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

// Lesson types
const lessonTypes = [
  { value: 'trial', label: 'Trial Lesson' },
  { value: 'regular', label: 'Regular Lesson' },
  { value: 'intensive', label: 'Intensive Course' },
  { value: 'workshop', label: 'Workshop' }
];

// Booking Card Component for Grid View
const BookingCard = ({ booking, onView, onEdit, onDelete }) => {
  const getExperienceColor = (experience) => {
    if (!experience) return "bg-gray-100 text-gray-800";
    switch (experience.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      case "professional":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Person className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {booking.name || "Unnamed Booking"}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              ID: #{booking._id?.slice(-6) || booking.id?.slice(-6) || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
          >
            {booking.status?.charAt(0).toUpperCase() +
              booking.status?.slice(1)}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}
          >
            {booking.experience?.charAt(0).toUpperCase() +
              booking.experience?.slice(1)}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Email className="text-gray-400 w-4 h-4" />
          <span className="text-xs text-gray-600 truncate">
            {booking.email || "No email"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="text-gray-400 w-4 h-4" />
          <span className="text-xs text-gray-600 truncate">
            {booking.phone || "No phone"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MusicNote className="text-gray-400 w-4 h-4" />
          <span className="text-xs text-gray-600 truncate">
            {booking.instrument || "No instrument"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarToday className="text-gray-400 w-4 h-4" />
          <span className="text-xs text-gray-500">
            {formatDate(booking.preferredDate)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <AccessTime className="text-gray-400 w-4 h-4" />
          <span className="text-xs text-gray-500">
            {booking.preferredTime || "N/A"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(booking)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1"
          title="View booking"
        >
          <ViewIcon className="w-3 h-3" />
        
        </button>
        <button
          onClick={() => onEdit(booking)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-1"
          title="Edit booking"
        >
          <EditIcon className="w-3 h-3" />
         
        </button>
        <button
          onClick={() => onDelete(booking)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-1"
          title="Delete booking"
        >
          <DeleteIcon className="w-3 h-3" />
        
        </button>
      </div>
    </div>
  );
};

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExperience, setFilterExperience] = useState("all");
  const [filterInstrument, setFilterInstrument] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({
    table: 7,
    grid: 12
  });

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
        status: "approved",
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
      setError(null);

      const response = await api.get("/api/bookings");

      // Handle different response formats
      let bookingsData = [];

      if (Array.isArray(response.data)) {
        bookingsData = response.data;
      } else if (response.data && typeof response.data === "object") {
        if (Array.isArray(response.data.data)) {
          bookingsData = response.data.data;
        } else if (Array.isArray(response.data.bookings)) {
          bookingsData = response.data.bookings;
        } else if (Array.isArray(response.data.results)) {
          bookingsData = response.data.results;
        } else {
          bookingsData = Object.values(response.data).filter(
            (item) => item && typeof item === "object" && item.id !== undefined,
          );
        }
      }

      if (Array.isArray(bookingsData) && bookingsData.length > 0) {
        const sortedData = bookingsData.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        });
        setBookings(sortedData);
        setCurrentPage(1);
      } else {
        setBookings([]);
        setError("No bookings found. Create your first booking!");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);

      let errorMessage = "Failed to fetch bookings";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. The server is taking too long to respond.";
      } else if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          errorMessage = "API endpoint not found. Please check the backend is running.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (status === 401 || status === 403) {
          errorMessage = "Authentication required. Please login.";
        } else {
          errorMessage = `Server error: ${status}`;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check if the backend server is running.";
      } else {
        errorMessage = `Request error: ${error.message}`;
      }

      setError(errorMessage);
      setBookings(getMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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

  // Filter bookings
  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((booking) => {
        if (!booking || typeof booking !== "object") return false;

        const name = String(booking.name || "").toLowerCase();
        const email = String(booking.email || "").toLowerCase();
        const instrument = String(booking.instrument || "").toLowerCase();
        const experience = booking.experience || "";
        const status = booking.status || "";

        const matchesSearch =
          name.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase()) ||
          instrument.includes(searchTerm.toLowerCase());

        const matchesExperience =
          filterExperience === "all" || experience === filterExperience;
        const matchesInstrument =
          filterInstrument === "all" || instrument === filterInstrument;
        const matchesStatus = filterStatus === "all" || status === filterStatus;

        return (
          matchesSearch &&
          matchesExperience &&
          matchesInstrument &&
          matchesStatus
        );
      })
    : [];

  // Filter when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterExperience, filterInstrument, filterStatus]);

  // Check if we need to move to next page when items per page changes
  useEffect(() => {
    const currentItemsPerPage = viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const totalPages = Math.ceil(filteredBookings.length / currentItemsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredBookings.length, viewMode, itemsPerPage, currentPage]);

  // Pagination functions
  const getCurrentItems = () => {
    const itemsPerPageCurrent = viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const indexOfLastItem = currentPage * itemsPerPageCurrent;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCurrent;
    return filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(
    filteredBookings.length / (viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid)
  );

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

  // Pagination component
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
                {Math.min(currentPage * itemsPerPageCurrent, filteredBookings.length)}
              </span>{" "}
              of <span className="font-medium">{filteredBookings.length}</span> results
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
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
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

  const currentBookings = getCurrentItems();

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
    setError(null);

    try {
      const requestData = {
        ...bookingForm,
        preferredDate: bookingForm.preferredDate || new Date().toISOString(),
      };

      const { data } = await api.post("/api/bookings", requestData);

      const newBooking = data?.data || data?.booking || data;

      if (!newBooking) {
        throw new Error("Invalid response from server");
      }

      setBookings((prev) => [newBooking, ...prev]);
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);

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
    } catch (error) {
      console.error("Create booking error:", error.response?.data || error);

      if (error.response?.data?.errors) {
        const messages = error.response.data.errors
          .map((err) => err.msg)
          .join(", ");
        setError(messages);
        return;
      }

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking",
      );
    } finally {
      setActionLoading(false);
    }
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
    setError(null);

    try {
      const response = await api.put(
        `/api/bookings/${selectedBooking._id || selectedBooking.id}`,
        editForm,
      );

      let updatedBooking = response.data;

      if (response.data && response.data.data) {
        updatedBooking = response.data.data;
      } else if (response.data && response.data.booking) {
        updatedBooking = response.data.booking;
      }

      setBookings((prev) =>
        prev.map((book) =>
          book._id === selectedBooking._id || book.id === selectedBooking.id
            ? updatedBooking
            : book,
        ),
      );
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);

      let errorMessage = "Failed to update booking";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      setError(errorMessage);
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
    setError(null);

    try {
      await api.delete(
        `/api/bookings/${selectedBooking._id || selectedBooking.id}`,
      );
      setBookings((prev) =>
        prev.filter(
          (book) =>
            book._id !== selectedBooking._id && book.id !== selectedBooking.id,
        ),
      );
      setShowDeleteModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error deleting booking:", error);

      let errorMessage = "Failed to delete booking";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "N/A";
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

  // Get experience badge color
  const getExperienceColor = (experience) => {
    if (!experience) return "bg-gray-100 text-gray-800";

    switch (experience.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      case "professional":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    if (!status) return null;

    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircleIcon className="w-3 h-3" />;
      case "pending":
        return <AccessTime className="w-3 h-3" />;
      case "rejected":
      case "cancelled":
        return <CancelIcon className="w-3 h-3" />;
      case "completed":
        return <CheckCircleIcon className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // Reset filters and pagination
  const resetFilters = () => {
    setSearchTerm("");
    setFilterExperience("all");
    setFilterInstrument("all");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-gray-100 mt-4">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
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
                    Booking Management
                  </h1>
                  <p className="text-gray-100 text-sm sm:text-base">
                    Manage music lesson bookings and requests
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
                  <p className="text-red-600 text-sm whitespace-pre-line">
                    {error}
                  </p>
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
                      placeholder="Search by name, email, or instrument..."
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
                      onClick={fetchBookings}
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
                      <span className="hidden sm:inline">New Booking</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Experience Filter */}
                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Experience</option>
                  {experienceLevels.map((level) => (
                    <option
                      className="text-black"
                      key={level.value}
                      value={level.value}
                    >
                      {level.label}
                    </option>
                  ))}
                </select>

                {/* Instrument Filter */}
                <select
                  value={filterInstrument}
                  onChange={(e) => setFilterInstrument(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Instruments</option>
                  {instruments.map((instrument) => (
                    <option
                      className="text-black"
                      key={instrument}
                      value={instrument}
                    >
                      {instrument}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map((status) => (
                    <option
                      className="text-black"
                      key={status.value}
                      value={status.value}
                    >
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Controls */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-t from-gray-500 to-gray-600 text-white px-3 py-1 rounded-lg transition-colors hover:from-gray-600 hover:to-gray-700 flex items-center space-x-2 text-sm"
                >
                  <FilterList className="text-sm" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {bookings.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MusicNote className="text-blue-600 text-lg" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-gray-900">
                      {
                        bookings.filter((req) => req?.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AccessTime className="text-yellow-600 text-lg" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Approved
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {
                        bookings.filter((req) => req?.status === "approved")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-green-600 text-lg" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Showing</p>
                    <p className="text-xl font-bold text-gray-900">
                      {currentBookings.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FilterList className="text-purple-600 text-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings Content */}
            {currentBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <MusicNote className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                <p className="text-gray-600 text-sm sm:text-base">
                  {searchTerm ||
                  filterExperience !== "all" ||
                  filterInstrument !== "all" ||
                  filterStatus !== "all"
                    ? "No bookings match your search"
                    : "No bookings found"}
                </p>
                {searchTerm && (
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search
                  </p>
                )}
              </div>
            ) : (
              <>
                {viewMode === "table" ? (
                  /* Table View */
                  <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Booking Details
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                              Instrument & Experience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                              Date & Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentBookings.map((booking) => (
                            <tr
                              key={booking._id || booking.id || Math.random()}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                    <Person className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                      {booking.name || "Unnamed Booking"}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                      {booking.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                                <div className="space-y-1">
                                  <div className="text-sm text-gray-900 font-medium">
                                    {booking.instrument || "No instrument"}
                                  </div>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}
                                  >
                                    {booking.experience?.charAt(0).toUpperCase() +
                                      booking.experience?.slice(1)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                                >
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1">
                                    {booking.status?.charAt(0).toUpperCase() +
                                      booking.status?.slice(1)}
                                  </span>
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                                <div className="text-sm text-gray-900">
                                  {formatDate(booking.preferredDate)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatTime(booking.preferredTime)}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleViewBooking(booking)}
                                    className="px-3 py-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-1 text-sm"
                                    title="View booking"
                                  >
                                    <ViewIcon className="w-3 h-3" />
                                    
                                  </button>
                                  <button
                                    onClick={() => handleEditBooking(booking)}
                                    className="px-3 py-1 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-1 text-sm"
                                    title="Edit booking"
                                  >
                                    <EditIcon className="w-3 h-3" />
                                    
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(booking)}
                                    className="px-3 py-1 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-1 text-sm"
                                    title="Delete booking"
                                  >
                                    <DeleteIcon className="w-3 h-3" />
                                    
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
                  /* Grid/Card View */
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentBookings.map((booking) => (
                      <BookingCard
                        key={booking._id || booking.id || Math.random()}
                        booking={booking}
                        onView={handleViewBooking}
                        onEdit={handleEditBooking}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredBookings.length > 0 && <PaginationControls />}
              </>
            )}
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Create New Booking
                </h2>
              </div>

              <form
                onSubmit={handleCreateSubmit}
                className="p-4 sm:p-6 space-y-4 text-black"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instrument *
                    </label>
                    <select
                      name="instrument"
                      value={bookingForm.instrument}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select an instrument</option>
                      {instruments.map((instrument) => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={bookingForm.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={bookingForm.preferredDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={bookingForm.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lesson Type *
                    </label>
                    <select
                      name="lessonType"
                      value={bookingForm.lessonType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {lessonTypes.map((lesson) => (
                        <option key={lesson.value} value={lesson.value}>
                          {lesson.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={bookingForm.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={bookingForm.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                    placeholder="Any additional information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={bookingForm.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Create Booking
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
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confirm Create
                </h3>
                <p className="text-gray-700 mb-4">
                  Are you sure you want to create this booking for{" "}
                  <strong>{bookingForm.name}</strong>?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowCreateConfirmModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={handleCreateBooking}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? "Creating..." : "Yes, Create"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
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
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Edit Booking
                </h2>
              </div>

              <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instrument *
                    </label>
                    <select
                      name="instrument"
                      value={editForm.instrument}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {instruments.map((instrument) => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={editForm.experience}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={editForm.preferredDate}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={editForm.preferredTime}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lesson Type *
                    </label>
                    <select
                      name="lessonType"
                      value={editForm.lessonType}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {lessonTypes.map((lesson) => (
                        <option key={lesson.value} value={lesson.value}>
                          {lesson.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={editForm.age}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={editForm.emergencyContact}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={editForm.message}
                    onChange={handleEditInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors"
                  >
                    Update Booking
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
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confirm Update
                </h3>
                <p className="text-gray-700 mb-4">
                  Are you sure you want to update the booking for{" "}
                  <strong>{editForm.name}</strong>?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowUpdateConfirmModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={handleUpdateBooking}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? "Updating..." : "Yes, Update"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
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
              className="bg-white rounded-lg w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Booking Details
                </h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Booking ID
                    </label>
                    <p className="text-sm font-semibold text-gray-900">
                      #
                      {selectedBooking._id?.slice(-6) ||
                        selectedBooking.id?.slice(-6) ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedBooking.status,
                      )}`}
                    >
                      {getStatusIcon(selectedBooking.status)}
                      <span className="ml-1">
                        {selectedBooking.status?.charAt(0).toUpperCase() +
                          selectedBooking.status?.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedBooking.name || "Unnamed"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedBooking.email || "No email"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedBooking.phone || "No phone"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Instrument
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedBooking.instrument || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Experience
                    </label>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(
                        selectedBooking.experience,
                      )}`}
                    >
                      {selectedBooking.experience?.charAt(0).toUpperCase() +
                        selectedBooking.experience?.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Preferred Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedBooking.preferredDate
                        ? formatDate(selectedBooking.preferredDate)
                        : "Not scheduled"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Preferred Time
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatTime(selectedBooking.preferredTime)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Lesson Type
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatLessonType(selectedBooking.lessonType)}
                  </p>
                </div>

                {selectedBooking.age && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Age
                    </label>
                    <p className="text-sm text-gray-900">{selectedBooking.age} years</p>
                  </div>
                )}

                {selectedBooking.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="text-sm text-gray-900">{selectedBooking.address}</p>
                  </div>
                )}

                {selectedBooking.emergencyContact && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Emergency Contact
                    </label>
                    <p className="text-sm text-gray-900">{selectedBooking.emergencyContact}</p>
                  </div>
                )}

                {selectedBooking.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Additional Notes
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                      {selectedBooking.message}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Created
                    </label>
                    <p className="text-xs text-gray-500">
                      {formatDate(selectedBooking.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Updated
                    </label>
                    <p className="text-xs text-gray-500">
                      {formatDate(selectedBooking.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full px-4 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors"
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
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  Delete Booking
                </h3>
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete the booking from{" "}
                  <strong>{selectedBooking.name || "this user"}</strong>? This
                  action cannot be undone.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBooking}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? "Deleting..." : "Delete"}
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