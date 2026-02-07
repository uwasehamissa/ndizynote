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
} from "@mui/icons-material";
import Cookies from "js-cookie";

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
        if (typeof response.data === 'string' && response.data.trim().startsWith('<')) {
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
    // Check for other common cookie names
    if (cookie.startsWith('email=')) {
      return decodeURIComponent(cookie.substring('email='.length));
    }
    if (cookie.startsWith('user_email=')) {
      return decodeURIComponent(cookie.substring('user_email='.length));
    }
    if (cookie.startsWith('user=')) {
      try {
        const userData = JSON.parse(decodeURIComponent(cookie.substring('user='.length)));
        return userData.email || userData.userEmail || null;
      } catch (e) {
        console.error('Error parsing user cookie:', e);
      }
    }
  }
  return null;
};

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

export const UserRequestManagement = () => {
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
  const [userEmail, setUserEmail] = useState(null);
  const [filterByUserEmail, setFilterByUserEmail] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Changed to 6 items per page

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

  // Get user email from cookies on component mount
//   useEffect(() => {
//     const emailFromCookie = getUserEmailFromCookies();
//     if (emailFromCookie) {
//       setUserEmail(emailFromCookie);
//       setBookingForm(prev => ({
//         ...prev,
//         email: emailFromCookie
//       }));
//       setFilterByUserEmail(true);
//     }
//   }, []);

useEffect(() => {
  const emailFromCookie = getUserEmailFromCookies();

  if (emailFromCookie) {
    setUserEmail(emailFromCookie);

    setBookingForm(prev => ({
      ...prev,
      email: emailFromCookie
    }));

    setFilterByUserEmail(true);
  }
}, []);


  // Fetch all requests using axios
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log("Fetching requests from API...");
//       const response = await api.get(`/api/booking/${encodeURIComponent(userEmail)}`);
      
//       // Log response for debugging
//       console.log("API Response status:", response.status);
//       console.log("API Response data:", response.data);
      
//       // Handle different response formats
//       let requestsData = [];
      
//       if (Array.isArray(response.data)) {
//         requestsData = response.data;
//       } else if (response.data && typeof response.data === 'object') {
//         // If response is an object with a data property
//         if (Array.isArray(response.data.data)) {
//           requestsData = response.data.data;
//         } else if (Array.isArray(response.data.bookings)) {
//           requestsData = response.data.bookings;
//         } else if (Array.isArray(response.data.results)) {
//           requestsData = response.data.results;
//         } else {
//           // Try to convert object to array
//           requestsData = Object.values(response.data).filter(item => 
//             item && typeof item === 'object' && item.id !== undefined
//           );
//         }
//       }
      
//       console.log("Processed requests data:", requestsData);
      
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
//       console.error("Error fetching requests:", error);
      
//       // Detailed error handling
//       let errorMessage = "Failed to fetch requests";
      
//       if (error.code === 'ECONNABORTED') {
//         errorMessage = "Request timeout. The server is taking too long to respond.";
//       } else if (error.response) {
//         // Server responded with error status
//         const status = error.response.status;
//         if (status === 404) {
//           errorMessage = "API endpoint not found. Please check the backend is running.";
//         } else if (status === 500) {
//           errorMessage = "Server error. Please try again later.";
//         } else if (status === 401 || status === 403) {
//           errorMessage = "Authentication required. Please login.";
//         } else {
//           errorMessage = `Server error: ${status}`;
//         }
        
//         // Log response data for debugging
//         console.error("Error response data:", error.response.data);
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
const fetchRequests = async () => {
  if (!userEmail) return;

  try {
    setLoading(true);
    setError(null);

    console.log("Fetching requests for:", userEmail);

    const response = await api.get(
      `/api/booking/${encodeURIComponent(userEmail)}`
    );

    console.log("API Response status:", response.status);
    console.log("API Response data:", response.data);

    let requestsData = [];

    if (Array.isArray(response.data)) {
      requestsData = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      requestsData = response.data.data;
    } else if (Array.isArray(response.data?.bookings)) {
      requestsData = response.data.bookings;
    } else if (Array.isArray(response.data?.results)) {
      requestsData = response.data.results;
    }

    if (requestsData.length > 0) {
      const sortedData = requestsData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0);
        const dateB = new Date(b.createdAt || b.date || 0);
        return dateB - dateA;
      });

      setRequests(sortedData);
      setCurrentPage(1);
    } else {
      setRequests([]);
      setError("No requests found for this email.");
    }

  } catch (error) {
    console.error("Error fetching requests:", error);

    let errorMessage = "Failed to fetch requests";

    if (error.response) {
      const status = error.response.status;

      if (status === 404) errorMessage = "No requests found.";
      else if (status === 401 || status === 403)
        errorMessage = "Authentication required. Please login.";
      else if (status === 500)
        errorMessage = "Server error. Please try again later.";
      else
        errorMessage = `Server error: ${status}`;

      console.error("Error response data:", error.response.data);
    } else if (error.request) {
      errorMessage =
        "No response from server. Check backend, API URL, or CORS.";
    } else {
      errorMessage = error.message;
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

  // Create new request using axios - UPDATED to match model
  const handleCreateRequest = async () => {
    setActionLoading(true);
    setError(null);

    try {
      // Format the date properly
      const requestData = {
        ...bookingForm,
        scheduledDate: bookingForm.scheduledDate || new Date().toISOString(),
      };

      const { data } = await api.post("/api/bookings", requestData);

      // Normalize response (backend may return data in different keys)
      const newRequest = data?.data || data?.booking || data;

      if (!newRequest) {
        throw new Error("Invalid response from server");
      }

      // Update UI - add to beginning of array
      setRequests((prev) => [newRequest, ...prev]);
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);

      // Reset form but keep user email
      setBookingForm({
        name: "",
        email: userEmail || "",
        phone: "",
        instrument: "",
        experience: "beginner",
        scheduledDate: "",
        additionalInfo: "",
        adminNotes: "",
      });

    } catch (error) {
      console.error("Create request error:", error.response?.data || error);

      // Handle express-validator errors
      if (error.response?.data?.errors) {
        const messages = error.response.data.errors
          .map(err => err.msg)
          .join(", ");

        setError(messages);
        return;
      }

      // Generic error fallback
      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to create request"
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
      scheduledDate: request.scheduledDate ? 
        new Date(request.scheduledDate).toISOString().split('T')[0] : "",
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
        editForm
      );
      
      let updatedRequest = response.data;
      
      // Handle different response formats
      if (response.data && response.data.data) {
        updatedRequest = response.data.data;
      } else if (response.data && response.data.booking) {
        updatedRequest = response.data.booking;
      }
      
      setRequests((prev) =>
        prev.map((req) =>
          (req._id === selectedRequest._id || req.id === selectedRequest.id) ? updatedRequest : req
        )
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
      await api.delete(`/api/bookings/${selectedRequest._id || selectedRequest.id}`);
      setRequests((prev) =>
        prev.filter((req) => (req._id !== selectedRequest._id && req.id !== selectedRequest.id))
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
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error("Error formatting date for input:", error);
      return "";
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

  // Toggle filter by user email
  const toggleFilterByUserEmail = () => {
    if (userEmail) {
      setFilterByUserEmail(!filterByUserEmail);
      setCurrentPage(1);
    } else {
      setError("No user email found in cookies.");
    }
  };

  // Filter requests based on search and filters - UPDATED to include user email filtering
  const filteredRequests = Array.isArray(requests) ? requests.filter((request) => {
    if (!request || typeof request !== 'object') return false;
    
    // Safely get properties with defaults
    const name = String(request.name || "").toLowerCase();
    const email = String(request.email || "").toLowerCase();
    const instrument = String(request.instrument || "").toLowerCase();
    const experience = request.experience || "";
    const status = request.status || "";

    // Check if filtering by user email
    if (filterByUserEmail && userEmail) {
      if (email !== userEmail.toLowerCase()) {
        return false;
      }
    }

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      instrument.includes(searchTerm.toLowerCase());

    const matchesExperience =
      filterExperience === "all" || experience === filterExperience;
    const matchesInstrument =
      filterInstrument === "all" || instrument === filterInstrument;
    const matchesStatus =
      filterStatus === "all" || status === filterStatus;

    return (
      matchesSearch && matchesExperience && matchesInstrument && matchesStatus
    );
  }) : [];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset filters and pagination
  const resetFilters = () => {
    setSearchTerm("");
    setFilterExperience("all");
    setFilterInstrument("all");
    setFilterStatus("all");
    setFilterByUserEmail(false);
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

  // Check if a request belongs to the current user
  const isUserRequest = (requestEmail) => {
    return userEmail && requestEmail && requestEmail.toLowerCase() === userEmail.toLowerCase();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-100">Loading requests...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white flex">
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header with Menu Button */}
          <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white border-b border-gray-200 sticky top-0 z-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 sm:gap-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <MenuIcon />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Booking Management
                  </h1>
                  <p className="text-gray-100 mt-1">
                    {userEmail ? `User Email: ${userEmail}` : "Manage music lesson bookings and requests"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {userEmail && (
                  <button
                    onClick={toggleFilterByUserEmail}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors duration-200 ${
                      filterByUserEmail 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Person className="text-sm" />
                    <span className="text-sm">{filterByUserEmail ? 'Show All' : 'My Bookings'}</span>
                  </button>
                )}
                <motion.button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AddIcon />
                  <span className="hidden sm:inline">Create Booking</span>
                </motion.button>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={filterByUserEmail ? `Searching your bookings...` : "Search bookings..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                {/* Experience Filter */}
                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="px-4 py-3 border  border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Experience</option>
                  {experienceLevels.map((level) => (
                    <option className='text-black' key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>

                {/* Instrument Filter */}
                <select
                  value={filterInstrument}
                  onChange={(e) => setFilterInstrument(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Instruments</option>
                  {instruments.map((instrument) => (
                    <option className='text-black' key={instrument} value={instrument}>
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
                  {statusOptions.map((status) => (
                    <option className="text-black" key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-sm text-white">
                  {filterByUserEmail && (
                    <div className="flex items-center space-x-1 bg-indigo-600 px-3 py-1 rounded-lg">
                      <Person className="text-sm" />
                      <span>Showing only your bookings</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={resetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <FilterList className="text-sm" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {requests.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Person className="text-indigo-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {requests.filter((req) => req?.status === "pending").length}
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <AccessTime className="text-yellow-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Approved
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {requests.filter((req) => req?.status === "approved").length}
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-green-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Showing</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {currentRequests.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FilterList className="text-blue-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Requests Grid */}
            {currentRequests.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">
                  {currentRequests.map((request) => {
                    const isUserOwnRequest = isUserRequest(request.email);
                    
                    return (
                      <motion.div
                        key={request._id || request.id || Math.random()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${
                          isUserOwnRequest ? 'border-l-4 border-l-indigo-500' : ''
                        }`}
                      >
                        <div className="p-4 lg:p-6">
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {request.name || "Unnamed Booking"}
                                </h3>
                                {isUserOwnRequest && (
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                    Your Booking
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                ID: #{request._id?.slice(-6) || request.id?.slice(-6) || "N/A"}
                              </p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(
                                  request.experience
                                )}`}
                              >
                                {(request.experience).charAt(0).toUpperCase() +
                                  (request.experience).slice(1)}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  request.status
                                )} flex items-center space-x-1`}
                              >
                                {getStatusIcon(request.status)}
                                <span>
                                  {(request.status).charAt(0).toUpperCase() +
                                    (request.status).slice(1)}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center space-x-3">
                              <Email className={`text-sm ${isUserOwnRequest ? 'text-indigo-500' : 'text-gray-400'}`} />
                              <span className={`text-sm ${isUserOwnRequest ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>
                                {request.email || "No email"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="text-gray-400 text-sm" />
                              <span className="text-sm text-gray-600">
                                {request.phone || "No phone"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <MusicNote className="text-gray-400 text-sm" />
                              <span className="text-sm text-gray-600">
                                {request.instrument || "No instrument"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <CalendarToday className="text-gray-400 text-sm" />
                              <span className="text-sm text-gray-500">
                                {request.scheduledDate ? 
                                  formatDate(request.scheduledDate) : "No date scheduled"}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 pt-4 border-t border-gray-100">
                            <motion.button
                              onClick={() => handleViewRequest(request)}
                              className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ViewIcon className="text-sm" />
                              <span>View</span>
                            </motion.button>
                            <motion.button
                              onClick={() => handleEditRequest(request)}
                              className="flex-1 flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-2 rounded-lg transition-colors duration-200 text-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <EditIcon className="text-sm" />
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteClick(request)}
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
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mt-6">
                    <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                      Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
                      <span className="font-semibold">
                        {Math.min(indexOfLastItem, filteredRequests.length)}
                      </span>{" "}
                      of <span className="font-semibold">{filteredRequests.length}</span> results
                      {userEmail && filterByUserEmail && (
                        <span className="ml-2 text-indigo-600">
                          (Your bookings only)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* First Page */}
                      <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        <FirstPage className="w-5 h-5" />
                      </button>

                      {/* Previous Page */}
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNumber;
                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => goToPage(pageNumber)}
                              className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
                                currentPage === pageNumber
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Page */}
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Last Page */}
                      <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        <LastPage className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <MusicNote className="mx-auto text-gray-400 text-6xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filterByUserEmail 
                    ? "No Bookings Found for Your Email"
                    : requests.length === 0
                      ? "No Bookings Available"
                      : "No Bookings Found"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {filterByUserEmail
                    ? userEmail 
                      ? `No bookings found for ${userEmail}. Create your first booking!`
                      : "No user email found in cookies."
                    : requests.length === 0
                      ? error 
                        ? "There was an error loading bookings. Please check your connection and try again."
                        : "Get started by creating your first music lesson booking."
                      : "No bookings match your current filters. Try adjusting your search or filters."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create First Booking
                  </motion.button>
                  {filterByUserEmail && (
                    <motion.button
                      onClick={toggleFilterByUserEmail}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Show All Bookings
                    </motion.button>
                  )}
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
        {/* Create Modal - UPDATED to match model */}
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Create New Booking
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gradient-to-t from-red-500 to-red-700 text-white p-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                      disabled={!!userEmail}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                        userEmail ? 'bg-gray-100' : ''
                      }`}
                      placeholder="Enter email address"
                    />
                    {userEmail && (
                      <p className="text-xs text-gray-500 mt-1">
                        Your email is automatically filled from cookies.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instrument *
                    </label>
                    <select
                      name="instrument"
                      value={bookingForm.instrument}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={bookingForm.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scheduled Date *
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={bookingForm.scheduledDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={bookingForm.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Any additional information..."
                    />
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
                      <span>Create Booking</span>
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
                    Create New Booking?
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to create a new booking for{" "}
                    <strong>{bookingForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {bookingForm.email}
                        {userEmail && bookingForm.email === userEmail && (
                          <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            Your Email
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">
                        {bookingForm.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instrument:</span>
                      <span className="text-sm font-medium">
                        {bookingForm.instrument}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Experience:</span>
                      <span className="text-sm font-medium capitalize">
                        {bookingForm.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Scheduled:</span>
                      <span className="text-sm font-medium">
                        {bookingForm.scheduledDate}
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
                      onClick={handleCreateRequest}
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

        {/* Edit Request Modal - UPDATED to match model */}
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Booking
                  </h2>
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
                      value={editForm.name}
                      onChange={handleEditInputChange}
                      required
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
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                        isUserRequest(editForm.email) ? 'border-indigo-300' : ''
                      }`}
                    />
                    {isUserRequest(editForm.email) && (
                      <p className="text-xs text-indigo-600 mt-1">
                        This is your email address
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

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
                      {instruments.map((instrument) => (
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
                      value={editForm.experience}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scheduled Date *
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={editForm.scheduledDate}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

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
                      {statusOptions.map((status) => (
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
                    <textarea
                      name="adminNotes"
                      value={editForm.adminNotes}
                      onChange={handleEditInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Add admin notes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={editForm.additionalInfo}
                      onChange={handleEditInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Any additional information..."
                    />
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
                    Are you sure you want to update the booking for{" "}
                    <strong>{editForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {editForm.email}
                        {isUserRequest(editForm.email) && (
                          <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            Your Email
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">
                        {editForm.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instrument:</span>
                      <span className="text-sm font-medium">
                        {editForm.instrument}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Experience:</span>
                      <span className="text-sm font-medium capitalize">
                        {editForm.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Scheduled:</span>
                      <span className="text-sm font-medium">
                        {editForm.scheduledDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          editForm.status
                        )}`}
                      >
                        {editForm.status.charAt(0).toUpperCase() +
                          editForm.status.slice(1)}
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
                      onClick={handleUpdateRequest}
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

        {/* View Request Modal - UPDATED to match model */}
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Booking Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Booking ID
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        #{selectedRequest._id?.slice(-6) || selectedRequest.id?.slice(-6) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedRequest.status
                        )} flex items-center space-x-1`}
                      >
                        {getStatusIcon(selectedRequest.status)}
                        <span>
                          {(selectedRequest.status).charAt(0).toUpperCase() +
                            (selectedRequest.status).slice(1)}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Experience
                      </label>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(
                          selectedRequest.experience
                        )}`}
                      >
                        {(selectedRequest.experience).charAt(0).toUpperCase() +
                          (selectedRequest.experience).slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Instrument
                      </label>
                      <p className="text-lg text-gray-900">
                        {selectedRequest.instrument || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedRequest.name || "Unnamed"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg text-gray-900">
                        {selectedRequest.email || "No email"}
                      </p>
                      {isUserRequest(selectedRequest.email) && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          Your Email
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedRequest.phone || "No phone"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Scheduled Date
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedRequest.scheduledDate ? 
                        formatDate(selectedRequest.scheduledDate) : "Not scheduled"}
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
                        Created At
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Updated At
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedRequest.updatedAt)}
                      </p>
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
                    Are you sure you want to delete the booking from{" "}
                    <strong>{selectedRequest.name || "this user"}</strong>? This action cannot
                    be undone.
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
                      onClick={handleDeleteRequest}
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
    </>
  );
};