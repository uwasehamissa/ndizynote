// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
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
//   School,
//   Search,
//   FilterList,
//   Save,
//   Update,
//   Menu as MenuIcon,
//   CalendarToday,
//   ChevronLeft,
//   ChevronRight,
//   FirstPage,
//   LastPage,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   AccessTime,
//   ViewHeadline,
//   Refresh,
//   Close,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// // Create axios instance with better error handling
// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Add response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => {
//     // Check if response is JSON
//     const contentType = response.headers["content-type"];
//     if (contentType && contentType.includes("application/json")) {
//       return response;
//     } else {
//       console.warn("Server returned non-JSON response");
//       // Try to parse as JSON anyway, or return empty response
//       try {
//         if (
//           typeof response.data === "string" &&
//           response.data.trim().startsWith("<")
//         ) {
//           throw new Error("Server returned HTML instead of JSON");
//         }
//         return response;
//       } catch (error) {
//         throw new Error("Invalid response format from server");
//       }
//     }
//   },
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   },
// );

// // Experience level options - UPDATED to match model
// const experienceLevels = [
//   { value: "beginner", label: "Beginner" },
//   { value: "intermediate", label: "Intermediate" },
//   { value: "advanced", label: "Advanced" },
// ];

// // Common instruments
// const instruments = [
//   "Guitar",
//   "Piano",
//   "Violin",
//   "Drums",
//   "Flute",
//   "Saxophone",
//   "Trumpet",
//   "Cello",
//   "Clarinet",
//   "Voice",
// ];

// // Status options - UPDATED to match model
// const statusOptions = [
//   { value: "pending", label: "Pending" },
//   { value: "approved", label: "Approved" },
//   { value: "rejected", label: "Rejected" },
//   { value: "completed", label: "Completed" },
//   { value: "cancelled", label: "Cancelled" },
// ];

// // Booking Card Component for Grid View
// const BookingCard = ({ booking, onView, onEdit, onDelete }) => {
//   const getExperienceColor = (experience) => {
//     if (!experience) return "bg-gray-100 text-gray-800";
//     switch (experience.toLowerCase()) {
//       case "beginner":
//         return "bg-green-100 text-green-800";
//       case "intermediate":
//         return "bg-blue-100 text-blue-800";
//       case "advanced":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800";
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       case "completed":
//         return "bg-indigo-100 text-indigo-800";
//       case "cancelled":
//         return "bg-gray-300 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return "Invalid date";
//       }
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-3">
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900 truncate">
//               {booking.name || "Unnamed Booking"}
//             </h3>
//             <p className="text-xs text-gray-500 mt-1">
//               ID: #{booking._id?.slice(-6) || booking.id?.slice(-6) || "N/A"}
//             </p>
//           </div>
//           <div className="flex flex-col items-end space-y-1">
//             <span
//               className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
//             >
//               {booking.status?.charAt(0).toUpperCase() +
//                 booking.status?.slice(1)}
//             </span>
//             <span
//               className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}
//             >
//               {booking.experience?.charAt(0).toUpperCase() +
//                 booking.experience?.slice(1)}
//             </span>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center space-x-2">
//             <Email className="text-gray-400 w-4 h-4" />
//             <span className="text-xs text-gray-600 truncate">
//               {booking.email || "No email"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <MusicNote className="text-gray-400 w-4 h-4" />
//             <span className="text-xs text-gray-600">
//               {booking.instrument || "No instrument"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <CalendarToday className="text-gray-400 w-4 h-4" />
//             <span className="text-xs text-gray-500">
//               {formatDate(booking.scheduledDate)}
//             </span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => onView(booking)}
//             className="flex-1 px-2 py-1 bg-gradient-to-t from-blue-400 to-blue-600 text-white rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1 text-xs"
//             title="View booking"
//           >
//             <ViewIcon className="w-3 h-3" />
//           </button>
//           <button
//             onClick={() => onEdit(booking)}
//             className="flex-1 px-2 py-1 bg-gradient-to-t from-green-400 to-green-600 text-white rounded-md hover:bg-green-100 transition-colors flex items-center justify-center space-x-1 text-xs"
//             title="Edit booking"
//           >
//             <EditIcon className="w-3 h-3" />
//           </button>
//           <button
//             onClick={() => onDelete(booking)}
//             className="flex-1 px-2 py-1 bg-gradient-to-t from-red-400 to-red-600 text-white rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1 text-xs"
//             title="Delete booking"
//           >
//             <DeleteIcon className="w-3 h-3" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const RequestManagement = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
//   const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterExperience, setFilterExperience] = useState("all");
//   const [filterInstrument, setFilterInstrument] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [error, setError] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [viewMode, setViewMode] = useState("grid"); // "table" or "grid"

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // Changed to 6 items per page

//   const [bookingForm, setBookingForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     instrument: "",
//     experience: "beginner",
//     scheduledDate: "",
//     additionalInfo: "",
//     adminNotes: "",
//   });

//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     instrument: "",
//     experience: "beginner",
//     scheduledDate: "",
//     status: "pending",
//     additionalInfo: "",
//     adminNotes: "",
//   });

//   // Fetch all requests using axios
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // console.log("Fetching requests from API...");
//       const response = await api.get("/api/bookings");

//       // Log response for debugging
//       // console.log("API Response status:", response.status);
//       // console.log("API Response data:", response.data);

//       // Handle different response formats
//       let requestsData = [];

//       if (Array.isArray(response.data)) {
//         requestsData = response.data;
//       } else if (response.data && typeof response.data === "object") {
//         // If response is an object with a data property
//         if (Array.isArray(response.data.data)) {
//           requestsData = response.data.data;
//         } else if (Array.isArray(response.data.bookings)) {
//           requestsData = response.data.bookings;
//         } else if (Array.isArray(response.data.results)) {
//           requestsData = response.data.results;
//         } else {
//           // Try to convert object to array
//           requestsData = Object.values(response.data).filter(
//             (item) => item && typeof item === "object" && item.id !== undefined,
//           );
//         }
//       }

//       // console.log("Processed requests data:", requestsData);

//       if (Array.isArray(requestsData) && requestsData.length > 0) {
//         // Sort by creation date, newest first
//         const sortedData = requestsData.sort((a, b) => {
//           const dateA = new Date(a.createdAt || a.date || 0);
//           const dateB = new Date(b.createdAt || b.date || 0);
//           return dateB - dateA;
//         });
//         setRequests(sortedData);
//         setCurrentPage(1); // Reset to first page when data loads
//       } else {
//         setRequests([]);
//         setError("No requests found. Create your first request!");
//       }
//     } catch (error) {
//       // console.error("Error fetching requests:", error);

//       // Detailed error handling
//       let errorMessage = "Failed to fetch requests";

//       if (error.code === "ECONNABORTED") {
//         errorMessage =
//           "Request timeout. The server is taking too long to respond.";
//       } else if (error.response) {
//         // Server responded with error status
//         const status = error.response.status;
//         if (status === 404) {
//           errorMessage =
//             "API endpoint not found. Please check the backend is running.";
//         } else if (status === 500) {
//           errorMessage = "Server error. Please try again later.";
//         } else if (status === 401 || status === 403) {
//           errorMessage = "Authentication required. Please login.";
//         } else {
//           errorMessage = `Server error: ${status}`;
//         }

//         // Log response data for debugging
//         // console.error("Error response data:", error.response.data);
//       } else if (error.request) {
//         // No response received
//         errorMessage = "No response from server. Please check:";
//         errorMessage += "\n1. Is the backend server running?";
//         errorMessage += "\n2. Check the API URL: " + API_BASE_URL;
//         errorMessage += "\n3. Check CORS settings on the backend";
//       } else {
//         // Request setup error
//         errorMessage = `Request error: ${error.message}`;
//       }

//       setError(errorMessage);
//       setRequests([]); // Ensure it's always an array
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle edit form input changes
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Open create confirmation modal
//   const handleCreateSubmit = (e) => {
//     e.preventDefault();
//     setShowCreateConfirmModal(true);
//   };

//   // Create new request using axios - UPDATED to match model
//   const handleCreateRequest = async () => {
//     setActionLoading(true);
//     setError(null);

//     try {
//       // Format the date properly
//       const requestData = {
//         ...bookingForm,
//         scheduledDate: bookingForm.scheduledDate || new Date().toISOString(),
//       };

//       const { data } = await api.post("/api/bookings", requestData);

//       // Normalize response (backend may return data in different keys)
//       const newRequest = data?.data || data?.booking || data;

//       if (!newRequest) {
//         throw new Error("Invalid response from server");
//       }

//       // Update UI - add to beginning of array
//       setRequests((prev) => [newRequest, ...prev]);
//       setShowCreateModal(false);
//       setShowCreateConfirmModal(false);

//       // Reset form
//       setBookingForm({
//         name: "",
//         email: "",
//         phone: "",
//         instrument: "",
//         experience: "beginner",
//         scheduledDate: "",
//         additionalInfo: "",
//         adminNotes: "",
//       });
//     } catch (error) {
//       console.error("Create request error:", error.response?.data || error);

//       // Handle express-validator errors
//       if (error.response?.data?.errors) {
//         const messages = error.response.data.errors
//           .map((err) => err.msg)
//           .join(", ");

//         setError(messages);
//         return;
//       }

//       // Generic error fallback
//       setError(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to create request",
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open edit modal
//   const handleEditRequest = (request) => {
//     setSelectedRequest(request);
//     setEditForm({
//       name: request.name || "",
//       email: request.email || "",
//       phone: request.phone || "",
//       instrument: request.instrument || "",
//       experience: request.experience || "beginner",
//       scheduledDate: request.scheduledDate
//         ? new Date(request.scheduledDate).toISOString().split("T")[0]
//         : "",
//       status: request.status || "pending",
//       additionalInfo: request.additionalInfo || "",
//       adminNotes: request.adminNotes || "",
//     });
//     setShowEditModal(true);
//   };

//   // Open update confirmation modal
//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     setShowUpdateConfirmModal(true);
//   };

//   // Update request using axios
//   const handleUpdateRequest = async () => {
//     if (!selectedRequest) return;

//     setActionLoading(true);
//     setError(null);

//     try {
//       const response = await api.put(
//         `/api/bookings/${selectedRequest._id || selectedRequest.id}`,
//         editForm,
//       );

//       let updatedRequest = response.data;

//       // Handle different response formats
//       if (response.data && response.data.data) {
//         updatedRequest = response.data.data;
//       } else if (response.data && response.data.booking) {
//         updatedRequest = response.data.booking;
//       }

//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === selectedRequest._id || req.id === selectedRequest.id
//             ? updatedRequest
//             : req,
//         ),
//       );
//       setShowEditModal(false);
//       setShowUpdateConfirmModal(false);
//       setSelectedRequest(null);
//     } catch (error) {
//       console.error("Error updating request:", error);

//       let errorMessage = "Failed to update request";
//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//       }
//       setError(errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = (request) => {
//     setSelectedRequest(request);
//     setShowDeleteModal(true);
//   };

//   // Delete request using axios
//   const handleDeleteRequest = async () => {
//     if (!selectedRequest) return;

//     setActionLoading(true);
//     setError(null);

//     try {
//       await api.delete(
//         `/api/bookings/${selectedRequest._id || selectedRequest.id}`,
//       );
//       setRequests((prev) =>
//         prev.filter(
//           (req) =>
//             req._id !== selectedRequest._id && req.id !== selectedRequest.id,
//         ),
//       );
//       setShowDeleteModal(false);
//       setSelectedRequest(null);
//     } catch (error) {
//       console.error("Error deleting request:", error);

//       let errorMessage = "Failed to delete request";
//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//       }
//       setError(errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewRequest = (request) => {
//     setSelectedRequest(request);
//     setShowViewModal(true);
//   };

//   // Format date safely
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return "Invalid date";
//       }
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "N/A";
//     }
//   };

//   // Format date for input field (YYYY-MM-DD)
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";

//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return "";
//       }
//       return date.toISOString().split("T")[0];
//     } catch (error) {
//       console.error("Error formatting date for input:", error);
//       return "";
//     }
//   };

//   // Get experience badge color
//   const getExperienceColor = (experience) => {
//     if (!experience) return "bg-gray-100 text-gray-800";

//     switch (experience.toLowerCase()) {
//       case "beginner":
//         return "bg-green-100 text-green-800";
//       case "intermediate":
//         return "bg-blue-100 text-blue-800";
//       case "advanced":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status badge color
//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800";

//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       case "completed":
//         return "bg-indigo-100 text-indigo-800";
//       case "cancelled":
//         return "bg-gray-300 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     if (!status) return null;

//     switch (status.toLowerCase()) {
//       case "approved":
//         return <CheckCircleIcon className="w-3 h-3" />;
//       case "pending":
//         return <AccessTime className="w-3 h-3" />;
//       case "rejected":
//       case "cancelled":
//         return <CancelIcon className="w-3 h-3" />;
//       case "completed":
//         return <CheckCircleIcon className="w-3 h-3" />;
//       default:
//         return null;
//     }
//   };

//   // Filter requests based on search and filters - SAFE VERSION
//   const filteredRequests = Array.isArray(requests)
//     ? requests.filter((request) => {
//         if (!request || typeof request !== "object") return false;

//         // Safely get properties with defaults
//         const name = String(request.name || "").toLowerCase();
//         const email = String(request.email || "").toLowerCase();
//         const instrument = String(request.instrument || "").toLowerCase();
//         const experience = request.experience || "";
//         const status = request.status || "";

//         const matchesSearch =
//           name.includes(searchTerm.toLowerCase()) ||
//           email.includes(searchTerm.toLowerCase()) ||
//           instrument.includes(searchTerm.toLowerCase());

//         const matchesExperience =
//           filterExperience === "all" || experience === filterExperience;
//         const matchesInstrument =
//           filterInstrument === "all" || instrument === filterInstrument;
//         const matchesStatus = filterStatus === "all" || status === filterStatus;

//         return (
//           matchesSearch &&
//           matchesExperience &&
//           matchesInstrument &&
//           matchesStatus
//         );
//       })
//     : [];

//   // Calculate pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRequests = filteredRequests.slice(
//     indexOfFirstItem,
//     indexOfLastItem,
//   );
//   const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

//   // Pagination handlers
//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // Reset filters and pagination
//   const resetFilters = () => {
//     setSearchTerm("");
//     setFilterExperience("all");
//     setFilterInstrument("all");
//     setFilterStatus("all");
//     setCurrentPage(1);
//   };

//   // Retry fetching requests
//   const retryFetch = () => {
//     fetchRequests();
//   };

//   // Clear error
//   const clearError = () => {
//     setError(null);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
//           <p className="text-gray-100 mt-4">Loading requests...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
//       <div className="flex">
//         {/* Main Content */}
//         <div className="flex-1 lg:ml-8">
//           <div className="p-4 sm:p-6 lg:p-8">
//             {/* Mobile Header with Menu Button */}
//             <div className="lg:hidden mb-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
//               >
//                 <MenuIcon className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Header */}
//             <div className="mb-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                 <div className="mb-4 lg:mb-0">
//                   <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                     Booking Management
//                   </h1>
//                   <p className="text-gray-100 text-sm sm:text-base">
//                     Manage music lesson bookings and requests
//                   </p>
//                 </div>

//                 {/* View Mode Toggle */}
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-100 hidden sm:block">
//                     View:
//                   </span>
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setViewMode("table")}
//                       className={`p-2 rounded-md transition-colors ${
//                         viewMode === "table"
//                           ? "bg-white shadow-sm text-indigo-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                       title="Table View"
//                     >
//                       <ViewHeadline className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`p-2 rounded-md transition-colors ${
//                         viewMode === "grid"
//                           ? "bg-white shadow-sm text-indigo-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                       title="Grid View"
//                     >
//                       <Person className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <p className="text-red-600 text-sm whitespace-pre-line">
//                     {error}
//                   </p>
//                   <button
//                     onClick={() => setError("")}
//                     className="bg-gradient-to-t from-red-500 to-red-700 text-white text-lg ml-4"
//                   >
//                     <Close />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Controls */}
//             <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//               <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                 {/* Search */}
//                 <div className="flex-1 max-w-2xl">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                       type="text"
//                       placeholder="Search bookings..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//                     />
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={fetchRequests}
//                       disabled={loading}
//                       className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                       title="Refresh"
//                     >
//                       <Refresh
//                         className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                       />
//                     </button>

//                     <button
//                       onClick={() => setShowCreateModal(true)}
//                       className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
//                     >
//                       <AddIcon className="w-4 h-4" />
//                       <span className="hidden sm:inline">New Booking</span>
//                       <span className="sm:hidden">Add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Filters */}
//               <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {/* Experience Filter */}
//                 <select
//                   value={filterExperience}
//                   onChange={(e) => setFilterExperience(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
//                 >
//                   <option value="all">All Experience</option>
//                   {experienceLevels.map((level) => (
//                     <option
//                       className="text-black"
//                       key={level.value}
//                       value={level.value}
//                     >
//                       {level.label}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Instrument Filter */}
//                 <select
//                   value={filterInstrument}
//                   onChange={(e) => setFilterInstrument(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
//                 >
//                   <option value="all">All Instruments</option>
//                   {instruments.map((instrument) => (
//                     <option
//                       className="text-black"
//                       key={instrument}
//                       value={instrument}
//                     >
//                       {instrument}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Status Filter */}
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
//                 >
//                   <option value="all">All Status</option>
//                   {statusOptions.map((status) => (
//                     <option
//                       className="text-black"
//                       key={status.value}
//                       value={status.value}
//                     >
//                       {status.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Filter Controls */}
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={resetFilters}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm"
//                 >
//                   <FilterList className="text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">
//                       Total Bookings
//                     </p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {requests.length}
//                     </p>
//                   </div>
//                   <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                     <Person className="text-indigo-600 text-lg" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Pending</p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {
//                         requests.filter((req) => req?.status === "pending")
//                           .length
//                       }
//                     </p>
//                   </div>
//                   <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
//                     <AccessTime className="text-yellow-600 text-lg" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">
//                       Approved
//                     </p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {
//                         requests.filter((req) => req?.status === "approved")
//                           .length
//                       }
//                     </p>
//                   </div>
//                   <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                     <CheckCircle className="text-green-600 text-lg" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Showing</p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {currentRequests.length}
//                     </p>
//                   </div>
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <FilterList className="text-blue-600 text-lg" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bookings Content */}
//             {currentRequests.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                 <MusicNote className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   {searchTerm ||
//                   filterExperience !== "all" ||
//                   filterInstrument !== "all" ||
//                   filterStatus !== "all"
//                     ? "No bookings match your search"
//                     : "No bookings found"}
//                 </p>
//                 {searchTerm && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Try adjusting your search
//                   </p>
//                 )}
//               </div>
//             ) : viewMode === "table" ? (
//               /* Table View for md screens and up */
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50 border-b border-gray-200">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                           Booking Details
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                           Instrument & Experience
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {currentRequests.map((booking) => (
//                         <tr
//                           key={booking._id || booking.id || Math.random()}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
//                                 <Person className="w-4 h-4 text-indigo-600" />
//                               </div>
//                               <div className="min-w-0">
//                                 <div className="text-sm font-medium text-gray-900 truncate">
//                                   {booking.name || "Unnamed Booking"}
//                                 </div>
//                                 <div className="text-sm text-gray-500 truncate">
//                                   {booking.email}
//                                 </div>
//                                 <div className="text-xs text-gray-400 mt-1">
//                                   {formatDate(booking.scheduledDate)}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="space-y-1">
//                               <div className="text-sm text-gray-900 font-medium">
//                                 {booking.instrument || "No instrument"}
//                               </div>
//                               <span
//                                 className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(booking.experience)}`}
//                               >
//                                 {booking.experience?.charAt(0).toUpperCase() +
//                                   booking.experience?.slice(1)}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
//                             >
//                               {booking.status?.charAt(0).toUpperCase() +
//                                 booking.status?.slice(1)}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap sm:px-6">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewRequest(booking)}
//                                 className="px-3 py-1 bg-gradient-to-t from-blue-400 to-blue-600 text-white rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="View booking"
//                               >
//                                 <ViewIcon className="w-3 h-3" />
//                               </button>
//                               <button
//                                 onClick={() => handleEditRequest(booking)}
//                                 className="px-3 py-1 bg-gradient-to-t from-green-400 to-green-600 text-white rounded-md hover:bg-green-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Edit booking"
//                               >
//                                 <EditIcon className="w-3 h-3" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(booking)}
//                                 className="px-3 py-1 bg-gradient-to-t from-red-400 to-red-600 text-white rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
//                                 title="Delete booking"
//                               >
//                                 <DeleteIcon className="w-3 h-3" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               /* Grid/Card View for mobile and when in grid mode */
//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {currentRequests.map((booking) => (
//                   <BookingCard
//                     key={booking._id || booking.id || Math.random()}
//                     booking={booking}
//                     onView={handleViewRequest}
//                     onEdit={handleEditRequest}
//                     onDelete={handleDeleteClick}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
//                 <div className="text-sm text-gray-700 mb-4 sm:mb-0">
//                   Showing{" "}
//                   <span className="font-semibold">{indexOfFirstItem + 1}</span>{" "}
//                   to{" "}
//                   <span className="font-semibold">
//                     {Math.min(indexOfLastItem, filteredRequests.length)}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-semibold">
//                     {filteredRequests.length}
//                   </span>{" "}
//                   results
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   {/* First Page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     disabled={currentPage === 1}
//                     className={`p-2 rounded-lg ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                     } transition-colors duration-200`}
//                   >
//                     <FirstPage className="w-5 h-5" />
//                   </button>

//                   {/* Previous Page */}
//                   <button
//                     onClick={goToPreviousPage}
//                     disabled={currentPage === 1}
//                     className={`p-2 rounded-lg ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                     } transition-colors duration-200`}
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>

//                   {/* Page Numbers */}
//                   <div className="flex items-center space-x-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => goToPage(pageNumber)}
//                           className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
//                             currentPage === pageNumber
//                               ? "bg-indigo-600 text-white"
//                               : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                           }`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Next Page */}
//                   <button
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}
//                     className={`p-2 rounded-lg ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                     } transition-colors duration-200`}
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>

//                   {/* Last Page */}
//                   <button
//                     onClick={() => goToPage(totalPages)}
//                     disabled={currentPage === totalPages}
//                     className={`p-2 rounded-lg ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                     } transition-colors duration-200`}
//                   >
//                     <LastPage className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* All Modal Components */}
//       {/* Create Modal - UPDATED to match model */}
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
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Create New Booking
//                 </h2>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="bg-gradient-to-t from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form
//                 onSubmit={handleCreateSubmit}
//                 className="p-6 space-y-4 text-black"
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={bookingForm.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={bookingForm.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter email address"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={bookingForm.phone}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Instrument *
//                   </label>
//                   <select
//                     name="instrument"
//                     value={bookingForm.instrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     <option value="">Select an instrument</option>
//                     {instruments.map((instrument) => (
//                       <option key={instrument} value={instrument}>
//                         {instrument}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Experience Level *
//                   </label>
//                   <select
//                     name="experience"
//                     value={bookingForm.experience}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {experienceLevels.map((level) => (
//                       <option key={level.value} value={level.value}>
//                         {level.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Scheduled Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="scheduledDate"
//                     value={bookingForm.scheduledDate}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Additional Information
//                   </label>
//                   <textarea
//                     name="additionalInfo"
//                     value={bookingForm.additionalInfo}
//                     onChange={handleInputChange}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Any additional information..."
//                   />
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
//                     <span>Create Booking</span>
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
//                   Create New Booking?
//                 </h3>

//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to create a new booking for{" "}
//                   <strong>{bookingForm.name}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Email:</span>
//                     <span className="text-sm font-medium">
//                       {bookingForm.email}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Phone:</span>
//                     <span className="text-sm font-medium">
//                       {bookingForm.phone}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">
//                       {bookingForm.instrument}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Experience:</span>
//                     <span className="text-sm font-medium capitalize">
//                       {bookingForm.experience}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Scheduled:</span>
//                     <span className="text-sm font-medium">
//                       {bookingForm.scheduledDate}
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
//                     onClick={handleCreateRequest}
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

//       {/* Edit Request Modal - UPDATED to match model */}
//       <AnimatePresence>
//         {showEditModal && selectedRequest && (
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
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Edit Booking
//                 </h2>
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
//                     value={editForm.name}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={editForm.email}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={editForm.phone}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Instrument *
//                   </label>
//                   <select
//                     name="instrument"
//                     value={editForm.instrument}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {instruments.map((instrument) => (
//                       <option key={instrument} value={instrument}>
//                         {instrument}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Experience Level *
//                   </label>
//                   <select
//                     name="experience"
//                     value={editForm.experience}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   >
//                     {experienceLevels.map((level) => (
//                       <option key={level.value} value={level.value}>
//                         {level.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Scheduled Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="scheduledDate"
//                     value={editForm.scheduledDate}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
//                     {statusOptions.map((status) => (
//                       <option key={status.value} value={status.value}>
//                         {status.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Admin Notes
//                   </label>
//                   <textarea
//                     name="adminNotes"
//                     value={editForm.adminNotes}
//                     onChange={handleEditInputChange}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Add admin notes..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Additional Information
//                   </label>
//                   <textarea
//                     name="additionalInfo"
//                     value={editForm.additionalInfo}
//                     onChange={handleEditInputChange}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Any additional information..."
//                   />
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
//         {showUpdateConfirmModal && selectedRequest && (
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
//                   Are you sure you want to update the booking for{" "}
//                   <strong>{editForm.name}</strong>?
//                 </p>

//                 <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Email:</span>
//                     <span className="text-sm font-medium">
//                       {editForm.email}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Phone:</span>
//                     <span className="text-sm font-medium">
//                       {editForm.phone}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Instrument:</span>
//                     <span className="text-sm font-medium">
//                       {editForm.instrument}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Experience:</span>
//                     <span className="text-sm font-medium capitalize">
//                       {editForm.experience}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Scheduled:</span>
//                     <span className="text-sm font-medium">
//                       {editForm.scheduledDate}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-600">Status:</span>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         editForm.status,
//                       )}`}
//                     >
//                       {editForm.status.charAt(0).toUpperCase() +
//                         editForm.status.slice(1)}
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
//                     onClick={handleUpdateRequest}
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

//       {/* View Request Modal - UPDATED to match model */}
//       <AnimatePresence>
//         {showViewModal && selectedRequest && (
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
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Booking Details
//                 </h2>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="bg-gradient-to-t from-red-400 to-red-600 text-white transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Booking ID
//                     </label>
//                     <p className="text-lg font-semibold text-gray-900">
//                       #
//                       {selectedRequest._id?.slice(-6) ||
//                         selectedRequest.id?.slice(-6) ||
//                         "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Status
//                     </label>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                         selectedRequest.status,
//                       )} flex items-center space-x-1`}
//                     >
//                       {getStatusIcon(selectedRequest.status)}
//                       <span>
//                         {selectedRequest.status.charAt(0).toUpperCase() +
//                           selectedRequest.status.slice(1)}
//                       </span>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Experience
//                     </label>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(
//                         selectedRequest.experience,
//                       )}`}
//                     >
//                       {selectedRequest.experience.charAt(0).toUpperCase() +
//                         selectedRequest.experience.slice(1)}
//                     </span>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Instrument
//                     </label>
//                     <p className="text-lg text-gray-900">
//                       {selectedRequest.instrument || "Not specified"}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">
//                     Full Name
//                   </label>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {selectedRequest.name || "Unnamed"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">
//                     Email
//                   </label>
//                   <p className="text-lg text-gray-900">
//                     {selectedRequest.email || "No email"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">
//                     Phone
//                   </label>
//                   <p className="text-lg text-gray-900">
//                     {selectedRequest.phone || "No phone"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">
//                     Scheduled Date
//                   </label>
//                   <p className="text-lg text-gray-900">
//                     {selectedRequest.scheduledDate
//                       ? formatDate(selectedRequest.scheduledDate)
//                       : "Not scheduled"}
//                   </p>
//                 </div>

//                 {selectedRequest.adminNotes && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Admin Notes
//                     </label>
//                     <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
//                       {selectedRequest.adminNotes}
//                     </p>
//                   </div>
//                 )}

//                 {selectedRequest.additionalInfo && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Additional Information
//                     </label>
//                     <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
//                       {selectedRequest.additionalInfo}
//                     </p>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Created At
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {formatDate(selectedRequest.createdAt)}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">
//                       Updated At
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {formatDate(selectedRequest.updatedAt)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="w-full bg-gradient-to-t from-red-400 to-red-600 text-white py-3 px-4 rounded-xl transition-colors duration-200"
//                 >
//                  <Close/>
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteModal && selectedRequest && (
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
//                   Are you sure you want to delete the booking from{" "}
//                   <strong>{selectedRequest.name || "this user"}</strong>? This
//                   action cannot be undone.
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
//                     onClick={handleDeleteRequest}
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
  Email,
  Phone,
  School,
  Search,
  FilterList,
  Save,
  Update,
  Menu as MenuIcon,
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime,
  ViewHeadline,
  Refresh,
  Close,
} from "@mui/icons-material";

const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Check if response is JSON
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes("application/json")) {
      return response;
    } else {
      console.warn("Server returned non-JSON response");
      // Try to parse as JSON anyway, or return empty response
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

// Experience level options - UPDATED to match model
const experienceLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Common instruments
const instruments = [
  "Guitar",
  "Piano",
  "Violin",
  "Drums",
  "Flute",
  "Saxophone",
  "Trumpet",
  "Cello",
  "Clarinet",
  "Voice",
];

// Status options - UPDATED to match model
const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
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
            <MusicNote className="w-5 h-5 text-blue-600" />
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
            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
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
            {formatDate(booking.scheduledDate)}
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

export const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateConfirmModal, setShowCreateConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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
    grid: 12,
  });

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
    scheduledDate: "",
    additionalInfo: "",
    adminNotes: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
    scheduledDate: "",
    status: "pending",
    additionalInfo: "",
    adminNotes: "",
  });

  // Filter requests - MOVED UP BEFORE ANY useEffect THAT REFERENCES IT
  const filteredRequests = Array.isArray(requests)
    ? requests.filter((request) => {
        if (!request || typeof request !== "object") return false;

        const name = String(request.name || "").toLowerCase();
        const email = String(request.email || "").toLowerCase();
        const instrument = String(request.instrument || "").toLowerCase();
        const experience = request.experience || "";
        const status = request.status || "";

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

  // Fetch all requests using axios
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/bookings");

      // Handle different response formats
      let requestsData = [];

      if (Array.isArray(response.data)) {
        requestsData = response.data;
      } else if (response.data && typeof response.data === "object") {
        // If response is an object with a data property
        if (Array.isArray(response.data.data)) {
          requestsData = response.data.data;
        } else if (Array.isArray(response.data.bookings)) {
          requestsData = response.data.bookings;
        } else if (Array.isArray(response.data.results)) {
          requestsData = response.data.results;
        } else {
          // Try to convert object to array
          requestsData = Object.values(response.data).filter(
            (item) => item && typeof item === "object" && item.id !== undefined,
          );
        }
      }

      if (Array.isArray(requestsData) && requestsData.length > 0) {
        // Sort by creation date, newest first
        const sortedData = requestsData.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        });
        setRequests(sortedData);
        setCurrentPage(1); // Reset to first page when data loads
      } else {
        setRequests([]);
        setError("No requests found. Create your first request!");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);

      let errorMessage = "Failed to fetch requests";

      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timeout. The server is taking too long to respond.";
      } else if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          errorMessage =
            "API endpoint not found. Please check the backend is running.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (status === 401 || status === 403) {
          errorMessage = "Authentication required. Please login.";
        } else {
          errorMessage = `Server error: ${status}`;
        }
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check if the backend server is running.";
      } else {
        errorMessage = `Request error: ${error.message}`;
      }

      setError(errorMessage);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
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

  // Filter requests when search or filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterExperience, filterInstrument, filterStatus]);

  // Check if we need to move to next page when items per page changes
  useEffect(() => {
    const currentItemsPerPage =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const totalPages = Math.ceil(filteredRequests.length / currentItemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredRequests.length, viewMode, itemsPerPage, currentPage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
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

  // Open create confirmation modal
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setShowCreateConfirmModal(true);
  };

  // Create new request using axios
  const handleCreateRequest = async () => {
    setActionLoading(true);
    setError(null);

    try {
      const requestData = {
        ...bookingForm,
        scheduledDate: bookingForm.scheduledDate || new Date().toISOString(),
      };

      const { data } = await api.post("/api/bookings", requestData);

      const newRequest = data?.data || data?.booking || data;

      if (!newRequest) {
        throw new Error("Invalid response from server");
      }

      setRequests((prev) => [newRequest, ...prev]);
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);

      setBookingForm({
        name: "",
        email: "",
        phone: "",
        instrument: "",
        experience: "beginner",
        scheduledDate: "",
        additionalInfo: "",
        adminNotes: "",
      });
    } catch (error) {
      console.error("Create request error:", error.response?.data || error);

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
          "Failed to create request",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setEditForm({
      name: request.name || "",
      email: request.email || "",
      phone: request.phone || "",
      instrument: request.instrument || "",
      experience: request.experience || "beginner",
      scheduledDate: request.scheduledDate
        ? new Date(request.scheduledDate).toISOString().split("T")[0]
        : "",
      status: request.status || "pending",
      additionalInfo: request.additionalInfo || "",
      adminNotes: request.adminNotes || "",
    });
    setShowEditModal(true);
  };

  // Open update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  // Update request using axios
  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    setActionLoading(true);
    setError(null);

    try {
      const response = await api.put(
        `/api/bookings/${selectedRequest._id || selectedRequest.id}`,
        editForm,
      );

      let updatedRequest = response.data;

      if (response.data && response.data.data) {
        updatedRequest = response.data.data;
      } else if (response.data && response.data.booking) {
        updatedRequest = response.data.booking;
      }

      setRequests((prev) =>
        prev.map((req) =>
          req._id === selectedRequest._id || req.id === selectedRequest.id
            ? updatedRequest
            : req,
        ),
      );
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating request:", error);

      let errorMessage = "Failed to update request";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (request) => {
    setSelectedRequest(request);
    setShowDeleteModal(true);
  };

  // Delete request using axios
  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setActionLoading(true);
    setError(null);

    try {
      await api.delete(
        `/api/bookings/${selectedRequest._id || selectedRequest.id}`,
      );
      setRequests((prev) =>
        prev.filter(
          (req) =>
            req._id !== selectedRequest._id && req.id !== selectedRequest.id,
        ),
      );
      setShowDeleteModal(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error deleting request:", error);

      let errorMessage = "Failed to delete request";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
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

  // Pagination functions
  const getCurrentItems = () => {
    const itemsPerPageCurrent =
      viewMode === "table" ? itemsPerPage.table : itemsPerPage.grid;
    const indexOfLastItem = currentPage * itemsPerPageCurrent;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCurrent;
    return filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(
    filteredRequests.length /
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
                  filteredRequests.length,
                )}
              </span>{" "}
              of <span className="font-medium">{filteredRequests.length}</span>{" "}
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

  // Get current items based on pagination
  const currentRequests = getCurrentItems();

  // Reset filters and pagination
  const resetFilters = () => {
    setSearchTerm("");
    setFilterExperience("all");
    setFilterInstrument("all");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  // Retry fetching requests
  const retryFetch = () => {
    fetchRequests();
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
          <p className="text-gray-100 mt-4">Loading requests...</p>
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
                      onClick={fetchRequests}
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
                      {requests.length}
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
                        requests.filter((req) => req?.status === "pending")
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
                        requests.filter((req) => req?.status === "approved")
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
                      {currentRequests.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FilterList className="text-purple-600 text-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings Content */}
            {currentRequests.length === 0 ? (
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
                  /* Table View for md screens and up */
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
                              Scheduled
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentRequests.map((booking) => (
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
                                    {booking.experience
                                      ?.charAt(0)
                                      .toUpperCase() +
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
                                <div className="text-sm text-gray-500">
                                  {formatDate(booking.scheduledDate)}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleViewRequest(booking)}
                                    className="px-3 py-1 bg-gradient-to-t from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-1 text-sm"
                                    title="View booking"
                                  >
                                    <ViewIcon className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleEditRequest(booking)}
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
                  /* Grid/Card View for mobile and when in grid mode */
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentRequests.map((booking) => (
                      <BookingCard
                        key={booking._id || booking.id || Math.random()}
                        booking={booking}
                        onView={handleViewRequest}
                        onEdit={handleEditRequest}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredRequests.length > 0 && <PaginationControls />}
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
              className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={bookingForm.scheduledDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={bookingForm.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                    placeholder="Any additional information..."
                  />
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
                    onClick={handleCreateRequest}
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

      {/* Edit Request Modal */}
      <AnimatePresence>
        {showEditModal && selectedRequest && (
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
              className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Edit Booking
                </h2>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className="p-4 sm:p-6 text-black space-y-4"
              >
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={editForm.scheduledDate}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Notes
                  </label>
                  <textarea
                    name="adminNotes"
                    value={editForm.adminNotes}
                    onChange={handleEditInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                    placeholder="Add admin notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={editForm.additionalInfo}
                    onChange={handleEditInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                    placeholder="Any additional information..."
                  />
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
        {showUpdateConfirmModal && selectedRequest && (
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
                    onClick={handleUpdateRequest}
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

      {/* View Request Modal */}
      <AnimatePresence>
        {showViewModal && selectedRequest && (
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
              className="bg-white rounded-lg w-full max-w-md"
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
                      {selectedRequest._id?.slice(-6) ||
                        selectedRequest.id?.slice(-6) ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedRequest.status,
                      )}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      <span className="ml-1">
                        {selectedRequest.status?.charAt(0).toUpperCase() +
                          selectedRequest.status?.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedRequest.name || "Unnamed"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedRequest.email || "No email"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedRequest.phone || "No phone"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Instrument
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRequest.instrument || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Experience
                    </label>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(
                        selectedRequest.experience,
                      )}`}
                    >
                      {selectedRequest.experience?.charAt(0).toUpperCase() +
                        selectedRequest.experience?.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Scheduled Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedRequest.scheduledDate
                      ? formatDate(selectedRequest.scheduledDate)
                      : "Not scheduled"}
                  </p>
                </div>

                {selectedRequest.adminNotes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Admin Notes
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                      {selectedRequest.adminNotes}
                    </p>
                  </div>
                )}

                {selectedRequest.additionalInfo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Additional Information
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                      {selectedRequest.additionalInfo}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Created
                    </label>
                    <p className="text-xs text-gray-500">
                      {formatDate(selectedRequest.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Updated
                    </label>
                    <p className="text-xs text-gray-500">
                      {formatDate(selectedRequest.updatedAt)}
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
        {showDeleteModal && selectedRequest && (
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
                  <strong>{selectedRequest.name || "this user"}</strong>? This
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
                    onClick={handleDeleteRequest}
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
