/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { Sidebar } from "../../sidebar/Sidebar";

const API_BASE_URL = "https://ndizmusicprojectbackend.onrender.com";

// Experience level options
const experienceLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "professional", label: "Professional" },
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

// Status options
const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
    status: "pending",
  });

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/requests`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error("Failed to fetch requests");
        // For demo purposes, using mock data
        setRequests([
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            instrument: "Guitar",
            experience: "intermediate",
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+0987654321",
            instrument: "Piano",
            experience: "beginner",
            status: "approved",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1122334455",
            instrument: "Violin",
            experience: "advanced",
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      // Fallback to mock data
      setRequests([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          instrument: "Guitar",
          experience: "intermediate",
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+0987654321",
          instrument: "Piano",
          experience: "beginner",
          status: "approved",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
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

  // Create new request
  const handleCreateRequest = async () => {
    setActionLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        const newRequest = await response.json();
        setRequests((prev) => [newRequest, ...prev]);
        setShowCreateModal(false);
        setShowCreateConfirmModal(false);
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          instrument: "",
          experience: "beginner",
        });
      } else {
        alert("Failed to create request");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      // For demo, add to local state
      const newRequest = {
        id: Date.now(),
        ...bookingForm,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRequests((prev) => [newRequest, ...prev]);
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        instrument: "",
        experience: "beginner",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setEditForm({
      name: request.name,
      email: request.email,
      phone: request.phone,
      instrument: request.instrument,
      experience: request.experience,
      status: request.status,
    });
    setShowEditModal(true);
  };

  // Open update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  // Update request
  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    setActionLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/requests/${selectedRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        const updatedRequest = await response.json();
        setRequests((prev) =>
          prev.map((req) =>
            req.id === selectedRequest.id ? updatedRequest : req
          )
        );
        setShowEditModal(false);
        setShowUpdateConfirmModal(false);
        setSelectedRequest(null);
      } else {
        alert("Failed to update request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      // For demo, update local state
      const updatedRequest = {
        ...selectedRequest,
        ...editForm,
        updatedAt: new Date().toISOString(),
      };
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id ? updatedRequest : req
        )
      );
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedRequest(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (request) => {
    setSelectedRequest(request);
    setShowDeleteModal(true);
  };

  // Delete request
  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setActionLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/requests/${selectedRequest.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRequests((prev) =>
          prev.filter((req) => req.id !== selectedRequest.id)
        );
        setShowDeleteModal(false);
        setSelectedRequest(null);
      } else {
        alert("Failed to delete request");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      // For demo, remove from local state
      setRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequest.id)
      );
      setShowDeleteModal(false);
      setSelectedRequest(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get experience badge color
  const getExperienceColor = (experience) => {
    switch (experience) {
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
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter requests based on search and filters
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.instrument.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExperience =
      filterExperience === "all" || request.experience === filterExperience;
    const matchesInstrument =
      filterInstrument === "all" || request.instrument === filterInstrument;
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;

    return (
      matchesSearch && matchesExperience && matchesInstrument && matchesStatus
    );
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterExperience("all");
    setFilterInstrument("all");
    setFilterStatus("all");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header with Menu Button */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
       
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Request Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage music lesson requests and bookings
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AddIcon />
                <span className="hidden sm:inline">Create Request</span>
              </motion.button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                {/* Experience Filter */}
                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="all">All Experience</option>
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
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
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div className="flex justify-end mt-4">
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
                      Total Requests
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
                      {
                        requests.filter((req) => req.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-yellow-600 text-lg lg:text-xl" />
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
                      {
                        requests.filter((req) => req.status === "approved")
                          .length
                      }
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
                      {filteredRequests.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FilterList className="text-blue-600 text-lg lg:text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4 lg:p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: #{request.id}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(
                            request.experience
                          )}`}
                        >
                          {request.experience.charAt(0).toUpperCase() +
                            request.experience.slice(1)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <Email className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600 truncate">
                          {request.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">
                          {request.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MusicNote className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">
                          {request.instrument}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <School className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-500">
                          {formatDate(request.updatedAt)}
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
              ))}
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <MusicNote className="mx-auto text-gray-400 text-6xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Requests Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {requests.length === 0
                    ? "Get started by creating your first music lesson request."
                    : "No requests match your current filters."}
                </p>
                <motion.button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create First Request
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* All Modal Components (unchanged from your original code) */}
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
                    Create New Request
                  </h2>
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
                      <span>Create Request</span>
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
                    Create New Request?
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to create a new request for{" "}
                    <strong>{bookingForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {bookingForm.email}
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Request
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
                      <span>Update Request</span>
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
                    Update Request?
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to update the request for{" "}
                    <strong>{editForm.name}</strong>?
                  </p>

                  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {editForm.email}
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Request Details
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
                        Request ID
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        #{selectedRequest.id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedRequest.status
                        )}`}
                      >
                        {selectedRequest.status.charAt(0).toUpperCase() +
                          selectedRequest.status.slice(1)}
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
                        {selectedRequest.experience.charAt(0).toUpperCase() +
                          selectedRequest.experience.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Instrument
                      </label>
                      <p className="text-lg text-gray-900">
                        {selectedRequest.instrument}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedRequest.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedRequest.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedRequest.phone}
                    </p>
                  </div>

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
                    Delete Request?
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the request from{" "}
                    <strong>{selectedRequest.name}</strong>? This action cannot
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
