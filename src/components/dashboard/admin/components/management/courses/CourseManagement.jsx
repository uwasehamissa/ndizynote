// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   People as UsersIcon,
//   TrendingUp,
//   TrendingDown,
//   MusicNote,
//   Piano,
//   VolumeUp,
//   People,
//   Subscriptions,
//   Menu as MenuIcon,
//   BookOnline,
//   Refresh as RefreshIcon,
//   Error as ErrorIcon,
//   MusicVideo,
//   School,
//   AttachMoney,
//   PersonAdd,
//   Schedule,
//   CheckCircle,
//   Pending,
//   ExpandMore,
//   ExpandLess,
//   Add,
//   Edit,
//   Delete,
//   Visibility,
//   Search,
//   FilterList,
//   Sort,
//   Close,
//   Save,
//   Cancel,
//   CheckCircleOutline,
//   Warning,
//   Info,
//   Category,
//   Grade,
//   Group,
//   Star,
//   ViewHeadline
// } from "@mui/icons-material";

// // API Configuration based on your provided data structure
// const API_CONFIG = {
//   BASE_URL: "https://ndizmusicprojectbackend.onrender.com",
//   ENDPOINTS: {
//     USERS: "/api/users",
//     BOOKINGS: "/api/bookings",
//     COURSES: "/api/courses",
//     INSTRUCTORS: "/api/instructors",
//     REVENUE: "/api/revenue",
//     ACTIVITIES: "/api/activities",
//     DASHBOARD_STATS: "/stats/dashboard",
//   }
// };

// // Create axios instance
// const api = axios.create({
//   baseURL: API_CONFIG.BASE_URL
// });

// // API Service functions for Courses
// const fetchCoursesData = async () => {
//   try {
//     const response = await api.get(API_CONFIG.ENDPOINTS.COURSES);
//     return response.data || { total: 0, data: [] };
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     return { total: 0, data: [] };
//   }
// };

// const createCourse = async (courseData) => {
//   try {
//     const response = await api.post("/api/courses", courseData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating course:', error);
//     throw error;
//   }
// };

// const updateCourse = async (courseId, courseData) => {
//   try {
//     const response = await api.put(`/api/courses/${courseId}`, courseData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating course:', error);
//     throw error;
//   }
// };

// const deleteCourse = async (courseId) => {
//   try {
//     const response = await api.delete(`/api/courses/${courseId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting course:', error);
//     throw error;
//   }
// };

// // Course Card Component
// const CourseCard = ({ course, onView, onEdit, onDelete }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'inactive': return 'bg-red-100 text-red-800';
//       case 'draft': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//       <div className="flex items-center">
//         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
//           <MusicVideo className="w-5 h-5 text-indigo-600" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <div className="text-sm font-medium text-gray-900 truncate">
//             {course.courseName || 'Untitled Course'}
//           </div>
//           <div className="text-sm text-gray-500 truncate">
//             {course.category ? course.category.charAt(0).toUpperCase() + course.category.slice(1).replace('-', ' ') : 'Uncategorized'}
//           </div>
//           <div className="flex items-center gap-2 mt-1">
//             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
//               {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) || 'Draft'}
//             </span>
//             <span className="text-xs text-gray-600">
//               ${parseFloat(course.price || 0).toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-3 text-sm text-gray-600 line-clamp-2">
//         {course.details || 'No description available.'}
//       </div>

//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={() => onView(course)}
//           className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//           title="View course"
//         >
//           <Visibility className="w-3 h-3" />
//           <span className="hidden xs:inline">View</span>
//         </button>
//         <button
//           onClick={() => onEdit(course)}
//           className="px-3 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-sm"
//           title="Edit course"
//         >
//           <Edit className="w-3 h-3" />
//           <span className="hidden xs:inline">Edit</span>
//         </button>
//         <button
//           onClick={() => onDelete(course)}
//           className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//           title="Delete course"
//         >
//           <Delete className="w-3 h-3" />
//           <span className="hidden xs:inline">Delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Modal Components
// const SuccessModal = ({ isOpen, onClose, message }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-xs xsm:max-w-sm sm:max-w-md w-full mx-2 sm:mx-4"
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
//               <CheckCircle className="text-green-600 text-2xl sm:text-3xl" />
//             </div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Success!</h3>
//             <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{message}</p>
//             <button
//               onClick={onClose}
//               className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
//             >
//               OK
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const ErrorModal = ({ isOpen, onClose, message }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-xs xsm:max-w-sm sm:max-w-md w-full mx-2 sm:mx-4"
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
//               <ErrorIcon className="text-red-600 text-2xl sm:text-3xl" />
//             </div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Error</h3>
//             <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{message}</p>
//             <button
//               onClick={onClose}
//               className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
//             >
//               OK
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-xs xsm:max-w-sm sm:max-w-md w-full mx-2 sm:mx-4"
//         >
//           <div className="text-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
//               <Warning className="text-yellow-600 text-2xl sm:text-3xl" />
//             </div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
//             <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{message}</p>
//             <div className="flex gap-3 sm:gap-4 justify-center">
//               <button
//                 onClick={onClose}
//                 className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const ViewModal = ({ isOpen, onClose, course }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-[95vw] xsm:max-w-[90vw] sm:max-w-[85vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
//         >
//           <div className="flex justify-between items-center mb-4 sm:mb-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Course Details</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <Close className="text-xl sm:text-2xl" />
//             </button>
//           </div>

//           {course ? (
//             <div className="space-y-4 sm:space-y-6">
//               {/* Basic Information Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="space-y-3 sm:space-y-4">
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Info className="text-lg sm:text-xl" /> Basic Information
//                   </h3>
//                   <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Course Name</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900 font-medium truncate">{course.courseName}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
//                           course.status === 'active'
//                             ? 'bg-green-100 text-green-800'
//                             : course.status === 'inactive'
//                             ? 'bg-red-100 text-red-800'
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) || 'Draft'}
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Duration</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900">{course.duration} weeks</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900">${course.price?.toFixed(2)}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900 capitalize">{course.category || 'Other'}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Level</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900 capitalize">{course.level || 'Beginner'}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Enrollment & Rating */}
//                 <div className="space-y-3 sm:space-y-4">
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Group className="text-lg sm:text-xl" /> Enrollment & Rating
//                   </h3>
//                   <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Enrolled</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <p className="text-sm sm:text-base text-gray-900">{course.enrolledStudents || 0} / {course.maxStudents || 20}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rating</label>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <div className="flex items-center gap-1">
//                           <Star className="text-yellow-500 text-sm sm:text-base" />
//                           <span className="text-sm sm:text-base text-gray-900">{course.rating || 0}/5</span>
//                           <span className="text-xs text-gray-500 ml-1">({course.reviewsCount || 0} reviews)</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <p className="text-sm sm:text-base text-gray-900 whitespace-pre-wrap">{course.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Details */}
//               <div className="pt-3 sm:pt-4 border-t border-gray-200">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Additional Information</h3>
//                 <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Created At</label>
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs sm:text-sm text-gray-600">
//                         {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Last Updated</label>
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs sm:text-sm text-gray-600">
//                         {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Never'}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Course ID</label>
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs sm:text-sm text-gray-600 font-mono truncate">
//                         {course._id || course.id || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Featured</label>
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                         course.isFeatured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {course.isFeatured ? 'Yes' : 'No'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-6 sm:py-8">
//               <p className="text-gray-500">No course data available</p>
//             </div>
//           )}

//           <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//             >
//               Close
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const CourseFormModal = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
//   const [formData, setFormData] = useState({
//     courseName: '',
//     duration: '',
//     price: '',
//     details: '',
//     description: '',
//     status: 'draft',
//     category: 'other',
//     level: 'beginner',
//     maxStudents: 20,
//     tags: [],
//     isFeatured: false,
//     isPopular: false,
//     rating: 0,
//     reviewsCount: 0,
//     enrolledStudents: 0
//   });

//   const [tagInput, setTagInput] = useState('');

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         courseName: initialData.courseName || '',
//         duration: initialData.duration || '',
//         price: initialData.price || '',
//         details: initialData.details || '',
//         description: initialData.description || '',
//         status: initialData.status || 'draft',
//         category: initialData.category || 'other',
//         level: initialData.level || 'beginner',
//         maxStudents: initialData.maxStudents || 20,
//         tags: Array.isArray(initialData.tags) ? initialData.tags : [],
//         isFeatured: initialData.isFeatured || false,
//         isPopular: initialData.isPopular || false,
//         rating: initialData.rating || 0,
//         reviewsCount: initialData.reviewsCount || 0,
//         enrolledStudents: initialData.enrolledStudents || 0
//       });
//     } else {
//       setFormData({
//         courseName: '',
//         duration: '',
//         price: '',
//         details: '',
//         description: '',
//         status: 'draft',
//         category: 'other',
//         level: 'beginner',
//         maxStudents: 20,
//         tags: [],
//         isFeatured: false,
//         isPopular: false,
//         rating: 0,
//         reviewsCount: 0,
//         enrolledStudents: 0
//       });
//     }
//   }, [initialData, isOpen]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked :
//               (type === 'number' ? parseFloat(value) || 0 : value)
//     }));
//   };

//   const handleTagAdd = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleTagKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleTagAdd();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.courseName || !formData.duration || !formData.price || !formData.description) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (formData.duration < 1 || formData.duration > 52) {
//       alert('Duration must be between 1 and 52 weeks');
//       return;
//     }

//     if (formData.price < 0) {
//       alert('Price cannot be negative');
//       return;
//     }

//     if (formData.details.length > 500) {
//       alert('Details cannot exceed 500 characters');
//       return;
//     }

//     if (formData.description.length > 2000) {
//       alert('Description cannot exceed 2000 characters');
//       return;
//     }

//     try {
//       let response;
//       if (isEditing && initialData?._id) {
//         response = await updateCourse(initialData._id, formData);
//       } else {
//         response = await createCourse(formData);
//       }

//       if (typeof onSubmit === 'function') {
//         onSubmit(response);
//       }

//     } catch (error) {
//       console.error('Course submit error:', error);
//       alert(error.response?.data?.message || error.message || 'Failed to submit course');
//     }
//   };

// const categories = [
//   'guitar', 'piano', 'violin', 'drums', 'voice',
//   'music-theory', 'composition', 'production', 'other'
// ];

//   const levels = ['beginner', 'intermediate', 'advanced', 'all-levels'];

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
//         >
//           <motion.div
//             initial={{ scale: 0.9, y: 20 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.9, y: 20 }}
//             className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-[95vw] xsm:max-w-[90vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-4 sm:mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//                 {isEditing ? 'Edit Course' : 'Create New Course'}
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="bg-gradient-to-t from-red-500 to-red-700 transition-colors"
//               >
//                 <Close className="text-xl sm:text-2xl" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 text-black sm:space-y-6">
//               {/* Basic Information Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 {/* Left Column */}
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Course Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="courseName"
//                       value={formData.courseName}
//                       onChange={handleChange}
//                       required
//                       maxLength={100}
//                       className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="Enter course name"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                         Duration (weeks) *
//                       </label>
//                       <input
//                         type="number"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         required
//                         min="1"
//                         max="52"
//                         className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Weeks"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                         Price ($) *
//                       </label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="0.00"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                         Category *
//                       </label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       >
//                         {categories.map(cat => (
//                           <option key={cat} value={cat}>
//                             {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                         Level *
//                       </label>
//                       <select
//                         name="level"
//                         value={formData.level}
//                         onChange={handleChange}
//                         className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       >
//                         {levels.map(level => (
//                           <option key={level} value={level}>
//                             {level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Max Students
//                     </label>
//                     <input
//                       type="number"
//                       name="maxStudents"
//                       value={formData.maxStudents}
//                       onChange={handleChange}
//                       min="1"
//                       className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Tags
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={tagInput}
//                         onChange={(e) => setTagInput(e.target.value)}
//                         onKeyPress={handleTagKeyPress}
//                         className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Add a tag and press Enter"
//                       />
//                       <button
//                         type="button"
//                         onClick={handleTagAdd}
//                         className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                       >
//                         Add
//                       </button>
//                     </div>
//                     {formData.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {formData.tags.map(tag => (
//                           <span
//                             key={tag}
//                             className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
//                           >
//                             {tag}
//                             <button
//                               type="button"
//                               onClick={() => handleTagRemove(tag)}
//                               className="text-blue-600 hover:text-blue-800"
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     >
//                       <option value="draft">Draft</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Details *
//                     </label>
//                     <textarea
//                       name="details"
//                       value={formData.details}
//                       onChange={handleChange}
//                       required
//                       maxLength={500}
//                       rows="3"
//                       className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
//                       placeholder="Short course details (max 500 chars)"
//                     />
//                     <div className="text-right text-xs text-gray-500 mt-1">
//                       {formData.details.length}/500
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                       Description *
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                       maxLength={2000}
//                       rows="4"
//                       className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
//                       placeholder="Full course description (max 2000 chars)"
//                     />
//                     <div className="text-right text-xs text-gray-500 mt-1">
//                       {formData.description.length}/2000
//                     </div>
//                   </div>

//                   <div className="flex gap-4 sm:gap-6">
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="isFeatured"
//                         checked={formData.isFeatured}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="text-xs sm:text-sm text-gray-700">Featured</span>
//                     </label>
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="isPopular"
//                         checked={formData.isPopular}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="text-xs sm:text-sm text-gray-700">Popular</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex items-center justify-center gap-2 order-1 sm:order-2"
//                 >
//                   {isEditing ? (
//                     <>
//                       <Save className="text-lg sm:text-xl" /> Update Course
//                     </>
//                   ) : (
//                     <>
//                       <Add className="text-lg sm:text-xl" /> Create Course
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Course Management Dashboard Component
// export const CourseManagementDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [levelFilter, setLevelFilter] = useState('all');

//   // Modal states
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);

//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Fetch courses on component mount
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Filter courses when dependencies change
//   useEffect(() => {
//     if (!Array.isArray(courses)) {
//       setFilteredCourses([]);
//       return;
//     }

//     let result = [...courses];

//     // Apply search filter
//     if (searchQuery) {
//       const term = searchQuery.toLowerCase();
//       result = result.filter(course =>
//         course.courseName?.toLowerCase().includes(term) ||
//         course.details?.toLowerCase().includes(term) ||
//         course.description?.toLowerCase().includes(term) ||
//         course.tags?.some(tag => tag.toLowerCase().includes(term))
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== 'all') {
//       result = result.filter(course => course.status === statusFilter);
//     }

//     // Apply category filter
//     if (categoryFilter !== 'all') {
//       result = result.filter(course => course.category === categoryFilter);
//     }

//     // Apply level filter
//     if (levelFilter !== 'all') {
//       result = result.filter(course => course.level === levelFilter);
//     }

//     setFilteredCourses(result);
//   }, [courses, searchQuery, statusFilter, categoryFilter, levelFilter]);

//   const fetchCourses = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchCoursesData();
//       const coursesArray = Array.isArray(data.data) ? data.data : [];
//       setCourses(coursesArray);
//       setFilteredCourses(coursesArray);
//     } catch (err) {
//       console.error('Error fetching courses:', err);
//       setError('Failed to load courses. Please try again.');
//       setCourses([]);
//       setFilteredCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateCourse = async (courseData) => {
//     try {
//       await createCourse(courseData);
//       setShowCreateModal(false);
//       setSuccessMessage('Course created successfully!');
//       setShowSuccessModal(true);
//       fetchCourses();
//     } catch (err) {
//       console.error('Error creating course:', err);
//       setErrorMessage(err.response?.data?.message || 'Failed to create course. Please try again.');
//       setShowErrorModal(true);
//     }
//   };

//   const handleUpdateCourse = async (courseData) => {
//     if (!selectedCourse) return;

//     try {
//       await updateCourse(selectedCourse._id || selectedCourse.id, courseData);
//       setShowEditModal(false);
//       setSelectedCourse(null);
//       setSuccessMessage('Course updated successfully!');
//       setShowSuccessModal(true);
//       fetchCourses();
//     } catch (err) {
//       console.error('Error updating course:', err);
//       setErrorMessage(err.response?.data?.message || 'Failed to update course. Please try again.');
//       setShowErrorModal(true);
//     }
//   };

//   const handleDeleteCourse = async () => {
//     if (!selectedCourse) return;

//     try {
//       await deleteCourse(selectedCourse._id || selectedCourse.id);
//       setShowDeleteConfirm(false);
//       setSelectedCourse(null);
//       setSuccessMessage('Course deleted successfully!');
//       setShowSuccessModal(true);
//       fetchCourses();
//     } catch (err) {
//       console.error('Error deleting course:', err);
//       setErrorMessage(err.response?.data?.message || 'Failed to delete course. Please try again.');
//       setShowErrorModal(true);
//     }
//   };

//   const handleViewCourse = (course) => {
//     setSelectedCourse(course);
//     setShowViewModal(true);
//   };

//   const handleEditCourse = (course) => {
//     setSelectedCourse(course);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (course) => {
//     setSelectedCourse(course);
//     setShowDeleteConfirm(true);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'inactive': return 'bg-red-100 text-red-800';
//       case 'draft': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   // Calculate stats safely
//   const activeCoursesCount = Array.isArray(courses)
//     ? courses.filter(c => c && c.status === 'active').length
//     : 0;

//   const totalRevenue = Array.isArray(courses)
//     ? courses.reduce((sum, c) => sum + (parseFloat(c?.price) || 0), 0).toFixed(2)
//     : '0.00';

//   const totalEnrolled = Array.isArray(courses)
//     ? courses.reduce((sum, c) => sum + (parseInt(c?.enrolledStudents) || 0), 0)
//     : 0;

//   if (loading && courses.length === 0) {
//     return (
//       <div className="flex flex-col bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         <p className="text-gray-100">Loading courses...</p>
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
//                   Course Management
//                 </h1>
//                 <p className="text-gray-100 text-sm sm:text-base">
//                   Manage all music courses and programs
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
//                     <MusicVideo className="w-4 h-4" />
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
//                     placeholder="Search by course name or description..."
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
//                     onClick={fetchCourses}
//                     disabled={loading}
//                     className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                     title="Refresh"
//                   >
//                     <RefreshIcon
//                       className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                     />
//                   </button>

//                   <button
//                     onClick={() => setShowCreateModal(true)}
//                     className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                   >
//                     <Add className="w-4 h-4" />
//                     <span className="hidden sm:inline">New Course</span>
//                     <span className="sm:hidden">Add</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Courses Content */}
//           {loading ? (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                 Loading courses...
//               </p>
//             </div>
//           ) : filteredCourses.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <MusicVideo className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//               <p className="text-gray-600 text-sm sm:text-base">
//                 {searchQuery
//                   ? "No courses match your search"
//                   : "No courses found"}
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
//                         Course
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
//                         Category
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                         Status & Price
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredCourses.map((course) => (
//                       <tr
//                         key={course._id || course.id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                           <div className="flex items-center">
//                             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
//                               <MusicVideo className="w-4 h-4 text-indigo-600" />
//                             </div>
//                             <div className="min-w-0">
//                               <div className="text-sm font-medium text-gray-900 truncate">
//                                 {course.courseName || 'Untitled Course'}
//                               </div>
//                               <div className="text-sm text-gray-500 truncate">
//                                 {course.details ? course.details.substring(0, 50) + '...' : 'No description'}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden sm:table-cell">
//                           <div className="text-sm text-gray-900 truncate max-w-[120px] lg:max-w-[200px]">
//                             {course.category ? course.category.charAt(0).toUpperCase() + course.category.slice(1).replace('-', ' ') : 'Uncategorized'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                           <div className="flex flex-col space-y-1">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)} w-fit`}>
//                               {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) || 'Draft'}
//                             </span>
//                             <div className="text-sm text-gray-900 font-medium">
//                               ${parseFloat(course.price || 0).toFixed(2)}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleViewCourse(course)}
//                               className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                               title="View course"
//                             >
//                               <Visibility className="w-3 h-3" />
//                               <span className="hidden xs:inline">View</span>
//                             </button>
//                             <button
//                               onClick={() => handleEditCourse(course)}
//                               className="px-3 py-1 text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-sm"
//                               title="Edit course"
//                             >
//                               <Edit className="w-3 h-3" />
//                               <span className="hidden xs:inline">Edit</span>
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(course)}
//                               className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                               title="Delete course"
//                             >
//                               <Delete className="w-3 h-3" />
//                               <span className="hidden xs:inline">Delete</span>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             /* Grid/Card View for mobile and when in grid mode */
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredCourses.map((course) => (
//                 <CourseCard
//                   key={course._id || course.id}
//                   course={course}
//                   onView={handleViewCourse}
//                   onEdit={handleEditCourse}
//                   onDelete={handleDeleteClick}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <CourseFormModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateCourse}
//         isEditing={false}
//       />

//       <CourseFormModal
//         isOpen={showEditModal}
//         onClose={() => {
//           setShowEditModal(false);
//           setSelectedCourse(null);
//         }}
//         onSubmit={handleUpdateCourse}
//         initialData={selectedCourse}
//         isEditing={true}
//       />

//       <ViewModal
//         isOpen={showViewModal}
//         onClose={() => {
//           setShowViewModal(false);
//           setSelectedCourse(null);
//         }}
//         course={selectedCourse}
//       />

//       <ConfirmModal
//         isOpen={showDeleteConfirm}
//         onClose={() => {
//           setShowDeleteConfirm(false);
//           setSelectedCourse(null);
//         }}
//         onConfirm={handleDeleteCourse}
//         title="Delete Course"
//         message={`Are you sure you want to delete "${selectedCourse?.courseName}"? This action cannot be undone.`}
//       />

//       <SuccessModal
//         isOpen={showSuccessModal}
//         onClose={() => setShowSuccessModal(false)}
//         message={successMessage}
//       />

//       <ErrorModal
//         isOpen={showErrorModal}
//         onClose={() => setShowErrorModal(false)}
//         message={errorMessage}
//       />
//     </>
//   );
// };

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  People as UsersIcon,
  TrendingUp,
  TrendingDown,
  MusicNote,
  Piano,
  VolumeUp,
  People,
  Subscriptions,
  Menu as MenuIcon,
  BookOnline,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  MusicVideo,
  School,
  AttachMoney,
  PersonAdd,
  Schedule,
  CheckCircle,
  Pending,
  ExpandMore,
  ExpandLess,
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Sort,
  Close,
  Save,
  Cancel,
  CheckCircleOutline,
  Warning,
  Info,
  Category,
  Grade,
  Group,
  Star,
  ViewHeadline,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// API Configuration based on your provided data structure
const API_CONFIG = {
  BASE_URL: "https://ndizmusicprojectbackend.onrender.com",
  ENDPOINTS: {
    USERS: "/api/users",
    BOOKINGS: "/api/bookings",
    COURSES: "/api/courses",
    INSTRUCTORS: "/api/instructors",
    REVENUE: "/api/revenue",
    ACTIVITIES: "/api/activities",
    DASHBOARD_STATS: "/stats/dashboard",
  },
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// API Service functions for Courses
const fetchCoursesData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COURSES);
    return response.data || { total: 0, data: [] };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { total: 0, data: [] };
  }
};

const createCourse = async (courseData) => {
  try {
    const response = await api.post("/api/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/api/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Course Card Component
const CourseCard = ({ course, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
          <MusicVideo className="w-5 h-5 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 truncate">
            {course.courseName || "Untitled Course"}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {course.category
              ? course.category.charAt(0).toUpperCase() +
                course.category.slice(1).replace("-", " ")
              : "Uncategorized"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}
        >
          {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) ||
            "Draft"}
        </span>
        <span className="text-xs font-medium text-gray-900">
          ${parseFloat(course.price || 0).toFixed(2)}
        </span>
        <span className="text-xs text-gray-500">{course.duration} weeks</span>
      </div>

      <div className="text-xs text-gray-600 mb-3 line-clamp-2">
        {course.details || "No description available."}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView(course)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1"
        >
          <Visibility className="w-3 h-3" />
         
        </button>
        <button
          onClick={() => onEdit(course)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-1"
        >
          <Edit className="w-3 h-3" />
          
        </button>
        <button
          onClick={() => onDelete(course)}
          className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-1"
        >
          <Delete className="w-3 h-3" />
         
        </button>
      </div>
    </div>
  );
};

// Modal Components with responsive design
const SuccessModal = ({ isOpen, onClose, message }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg w-full max-w-xs xsm:max-w-sm sm:max-w-md mx-2 sm:mx-4"
        >
          <div className="p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="text-green-600 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              Success!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
              {message}
            </p>
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors text-xs sm:text-sm"
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ErrorModal = ({ isOpen, onClose, message }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg w-full max-w-xs xsm:max-w-sm sm:max-w-md mx-2 sm:mx-4"
        >
          <div className="p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <ErrorIcon className="text-red-600 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              Error
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
              {message}
            </p>
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors text-xs sm:text-sm"
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg w-full max-w-xs xsm:max-w-sm sm:max-w-md mx-2 sm:mx-4"
        >
          <div className="p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Warning className="text-yellow-600 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
              {message}
            </p>
            <div className="flex flex-col xsm:flex-row gap-2 xsm:gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm order-2 xsm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 sm:px-6 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors text-xs sm:text-sm order-1 xsm:order-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ViewModal = ({ isOpen, onClose, course }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg w-full max-w-[95vw] xsm:max-w-[90vw] sm:max-w-[85vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-3 sm:p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              Course Details
            </h2>
            <button
              onClick={onClose}
              className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full hover:from-red-600 hover:to-red-700 transition-colors"
            >
              <Close className="text-base sm:text-lg md:text-xl" />
            </button>
          </div>

          {course ? (
            <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Left Column */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="text-base sm:text-lg md:text-xl" /> Basic
                    Information
                  </h3>
                  <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Course Name
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900 font-medium truncate">
                          {course.courseName}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span
                          className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                            course.status === "active"
                              ? "bg-green-100 text-green-800"
                              : course.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {course.status?.charAt(0).toUpperCase() +
                            course.status?.slice(1) || "Draft"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900">
                          {course.duration} weeks
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900">
                          ${course.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900 capitalize">
                          {course.category || "Other"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Level
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900 capitalize">
                          {course.level || "Beginner"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Enrollment & Rating */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Group className="text-base sm:text-lg md:text-xl" />{" "}
                    Enrollment & Rating
                  </h3>
                  <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Enrolled
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm md:text-base text-gray-900">
                          {course.enrolledStudents || 0} /{" "}
                          {course.maxStudents || 20}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 text-xs sm:text-sm md:text-base" />
                          <span className="text-xs sm:text-sm md:text-base text-gray-900">
                            {course.rating || 0}/5
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({course.reviewsCount || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                      <p className="text-xs sm:text-sm md:text-base text-gray-900 whitespace-pre-wrap">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="pt-3 md:pt-4 border-t border-gray-200">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Created At
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        {course.createdAt
                          ? new Date(course.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Last Updated
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        {course.updatedAt
                          ? new Date(course.updatedAt).toLocaleDateString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Course ID
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-mono truncate">
                        {course._id || course.id || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Featured
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          course.isFeatured
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.isFeatured ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No course data available</p>
            </div>
          )}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 md:p-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors text-xs sm:text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CourseFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    price: "",
    details: "",
    description: "",
    status: "draft",
    category: "other",
    level: "beginner",
    maxStudents: 20,
    tags: [],
    isFeatured: false,
    isPopular: false,
    rating: 0,
    reviewsCount: 0,
    enrolledStudents: 0,
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        courseName: initialData.courseName || "",
        duration: initialData.duration || "",
        price: initialData.price || "",
        details: initialData.details || "",
        description: initialData.description || "",
        status: initialData.status || "draft",
        category: initialData.category || "other",
        level: initialData.level || "beginner",
        maxStudents: initialData.maxStudents || 20,
        tags: Array.isArray(initialData.tags) ? initialData.tags : [],
        isFeatured: initialData.isFeatured || false,
        isPopular: initialData.isPopular || false,
        rating: initialData.rating || 0,
        reviewsCount: initialData.reviewsCount || 0,
        enrolledStudents: initialData.enrolledStudents || 0,
      });
    } else {
      setFormData({
        courseName: "",
        duration: "",
        price: "",
        details: "",
        description: "",
        status: "draft",
        category: "other",
        level: "beginner",
        maxStudents: 20,
        tags: [],
        isFeatured: false,
        isPopular: false,
        rating: 0,
        reviewsCount: 0,
        enrolledStudents: 0,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.courseName ||
      !formData.duration ||
      !formData.price ||
      !formData.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.duration < 1 || formData.duration > 52) {
      alert("Duration must be between 1 and 52 weeks");
      return;
    }

    if (formData.price < 0) {
      alert("Price cannot be negative");
      return;
    }

    if (formData.details.length > 500) {
      alert("Details cannot exceed 500 characters");
      return;
    }

    if (formData.description.length > 2000) {
      alert("Description cannot exceed 2000 characters");
      return;
    }

    try {
      let response;
      if (isEditing && initialData?._id) {
        response = await updateCourse(initialData._id, formData);
      } else {
        response = await createCourse(formData);
      }

      if (typeof onSubmit === "function") {
        onSubmit(response);
      }
    } catch (error) {
      console.error("Course submit error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit course",
      );
    }
  };

  const categories = [
    "guitar",
    "piano",
    "violin",
    "drums",
    "voice",
    "music-theory",
    "composition",
    "production",
    "other",
  ];

  const levels = ["beginner", "intermediate", "advanced", "all-levels"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg w-full max-w-[95vw] xsm:max-w-[90vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-3 sm:p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Course" : "Create New Course"}
              </h2>
              <button
                onClick={onClose}
                className="bg-gradient-to-t from-red-500 to-red-700 text-white p-1 rounded-full hover:from-red-600 hover:to-red-700 transition-colors"
              >
                <Close className="text-base sm:text-lg md:text-xl" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 text-black"
            >
              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Left Column */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    Course Details
                  </h3>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Course Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter course name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Duration (weeks) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        min="1"
                        max="52"
                        className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Weeks"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() +
                              cat.slice(1).replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Level
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        {levels.map((level) => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() +
                              level.slice(1).replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Max Students
                    </label>
                    <input
                      type="number"
                      name="maxStudents"
                      value={formData.maxStudents}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Add a tag and press Enter"
                      />
                      <button
                        type="button"
                        onClick={handleTagAdd}
                        className="px-3 sm:px-4 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm"
                      >
                        Add
                      </button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                              className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    Additional Information
                  </h3>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Short Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows="3"
                      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Short course details (max 500 chars)"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formData.details.length}/500
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Full Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      maxLength={2000}
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Full course description (max 2000 chars)"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formData.description.length}/2000
                    </div>
                  </div>

                  <div className="flex flex-col xsm:flex-row gap-3 xsm:gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700">
                        Featured Course
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPopular"
                        checked={formData.isPopular}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700">
                        Popular Course
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-3 sm:pt-4 md:pt-6 flex flex-col xsm:flex-row gap-2 xsm:gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-t from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors text-xs sm:text-sm order-2 xsm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 order-1 xsm:order-2"
                >
                  {isEditing ? (
                    <>
                      <Save className="text-sm sm:text-base" /> Update Course
                    </>
                  ) : (
                    <>
                      <Add className="text-sm sm:text-base" /> Create Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Course Management Dashboard Component
export const CourseManagementDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'grid' or 'table'
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({
    table: 7,
    grid: 12,
  });

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses when dependencies change
  useEffect(() => {
    if (!Array.isArray(courses)) {
      setFilteredCourses([]);
      return;
    }

    let result = [...courses];

    // Apply search filter
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.courseName?.toLowerCase().includes(term) ||
          course.details?.toLowerCase().includes(term) ||
          course.description?.toLowerCase().includes(term) ||
          course.tags?.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((course) => course.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((course) => course.category === categoryFilter);
    }

    // Apply level filter
    if (levelFilter !== "all") {
      result = result.filter((course) => course.level === levelFilter);
    }

    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [courses, searchQuery, statusFilter, categoryFilter, levelFilter]);

  // Check pagination bounds
  useEffect(() => {
    const currentItemsPerPage =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const totalPages = Math.ceil(filteredCourses.length / currentItemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredCourses.length, viewMode, itemsPerPage, currentPage]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoursesData();
      const coursesArray = Array.isArray(data.data) ? data.data : [];
      setCourses(coursesArray);
      setFilteredCourses(coursesArray);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again.");
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Pagination functions
  const getCurrentItems = () => {
    const itemsPerPageCurrent =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const indexOfLastItem = currentPage * itemsPerPageCurrent;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCurrent;
    return filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(
    filteredCourses.length /
      (viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid),
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

  // Pagination Controls Component
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
                {Math.min(
                  currentPage * itemsPerPageCurrent,
                  filteredCourses.length,
                )}
              </span>{" "}
              of <span className="font-medium">{filteredCourses.length}</span>{" "}
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

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
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

  const currentItems = getCurrentItems();

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setShowCreateModal(false);
      setSuccessMessage("Course created successfully!");
      setShowSuccessModal(true);
      fetchCourses();
    } catch (err) {
      console.error("Error creating course:", err);
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to create course. Please try again.",
      );
      setShowErrorModal(true);
    }
  };

  const handleUpdateCourse = async (courseData) => {
    if (!selectedCourse) return;

    try {
      await updateCourse(selectedCourse._id || selectedCourse.id, courseData);
      setShowEditModal(false);
      setSelectedCourse(null);
      setSuccessMessage("Course updated successfully!");
      setShowSuccessModal(true);
      fetchCourses();
    } catch (err) {
      console.error("Error updating course:", err);
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to update course. Please try again.",
      );
      setShowErrorModal(true);
    }
  };
  const categories = [
    "guitar",
    "piano",
    "violin",
    "drums",
    "voice",
    "music-theory",
    "composition",
    "production",
    "other",
  ];

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    try {
      await deleteCourse(selectedCourse._id || selectedCourse.id);
      setShowDeleteConfirm(false);
      setSelectedCourse(null);
      setSuccessMessage("Course deleted successfully!");
      setShowSuccessModal(true);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to delete course. Please try again.",
      );
      setShowErrorModal(true);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeleteConfirm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearError = () => {
    setError(null);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setLevelFilter("all");
    setCurrentPage(1);
  };

  // Calculate stats safely
  const activeCoursesCount = Array.isArray(courses)
    ? courses.filter((c) => c && c.status === "active").length
    : 0;

  const totalRevenue = Array.isArray(courses)
    ? courses
        .reduce((sum, c) => sum + (parseFloat(c?.price) || 0), 0)
        .toFixed(2)
    : "0.00";

  const totalEnrolled = Array.isArray(courses)
    ? courses.reduce((sum, c) => sum + (parseInt(c?.enrolledStudents) || 0), 0)
    : 0;

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-gray-100 mt-4">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Course Management
                </h1>
                <p className="text-gray-100 text-sm sm:text-base">
                  Manage all music courses and programs
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
                    <MusicVideo className="w-4 h-4" />
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
                    placeholder="Search by course name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-black"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={fetchCourses}
                    disabled={loading}
                    className="p-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors disabled:opacity-50"
                    title="Refresh"
                  >
                    <RefreshIcon
                      className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                    />
                  </button>

                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-3 py-2 bg-gradient-to-t from-blue-500 to-indigo-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Add className="w-4 h-4" />
                    <span className="hidden sm:inline">New Course</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() +
                        cat.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>

                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all-levels">All Levels</option>
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

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-100">Total Courses</p>
                  <p className="text-xl font-bold text-white">
                    {courses.length}
                  </p>
                </div>
                <MusicVideo className="text-white/50" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-100">Active</p>
                  <p className="text-xl font-bold text-white">
                    {activeCoursesCount}
                  </p>
                </div>
                <CheckCircle className="text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-100">Enrolled</p>
                  <p className="text-xl font-bold text-white">
                    {totalEnrolled}
                  </p>
                </div>
                <Group className="text-blue-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-100">Revenue</p>
                  <p className="text-xl font-bold text-white">
                    ${totalRevenue}
                  </p>
                </div>
                <AttachMoney className="text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Courses Content */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Loading courses...
              </p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <MusicVideo className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
              <p className="text-gray-600 text-sm sm:text-base">
                {searchQuery
                  ? "No courses match your search"
                  : "No courses found"}
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
                            Course
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                            Status & Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                            Students
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((course) => (
                          <tr
                            key={course._id || course.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <MusicVideo className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                    {course.courseName || "Untitled Course"}
                                  </div>
                                  <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                    {course.details
                                      ? course.details.substring(0, 50) + "..."
                                      : "No description"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                              <div className="text-sm text-gray-900 truncate max-w-[120px]">
                                {course.category
                                  ? course.category.charAt(0).toUpperCase() +
                                    course.category.slice(1).replace("-", " ")
                                  : "Uncategorized"}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex flex-col space-y-1">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)} w-fit`}
                                >
                                  {course.status?.charAt(0).toUpperCase() +
                                    course.status?.slice(1) || "Draft"}
                                </span>
                                <div className="text-sm text-gray-900 font-medium">
                                  ${parseFloat(course.price || 0).toFixed(2)}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                              <div className="text-sm text-gray-900">
                                {course.enrolledStudents || 0} /{" "}
                                {course.maxStudents || 20}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewCourse(course)}
                                  className="px-3 py-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-1 text-sm"
                                  title="View course"
                                >
                                  <Visibility className="w-3 h-3" />
                              
                                </button>
                                <button
                                  onClick={() => handleEditCourse(course)}
                                  className="px-3 py-1 bg-gradient-to-t from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-1 text-sm"
                                  title="Edit course"
                                >
                                  <Edit className="w-3 h-3" />
                                 
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(course)}
                                  className="px-3 py-1 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-1 text-sm"
                                  title="Delete course"
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
                  {currentItems.map((course) => (
                    <CourseCard
                      key={course._id || course.id}
                      course={course}
                      onView={handleViewCourse}
                      onEdit={handleEditCourse}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {filteredCourses.length > 0 && <PaginationControls />}
            </>
          )}

          {/* Summary */}
          <div className="mt-4 text-sm text-gray-100">
            Showing <span className="font-medium">{currentItems.length}</span>{" "}
            of <span className="font-medium">{filteredCourses.length}</span>{" "}
            courses
          </div>
        </div>
      </div>

      {/* Modals */}
      <CourseFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCourse}
        isEditing={false}
      />

      <CourseFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCourse(null);
        }}
        onSubmit={handleUpdateCourse}
        initialData={selectedCourse}
        isEditing={true}
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedCourse(null);
        }}
        onConfirm={handleDeleteCourse}
        title="Delete Course"
        message={`Are you sure you want to delete "${selectedCourse?.courseName}"? This action cannot be undone.`}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </>
  );
};
