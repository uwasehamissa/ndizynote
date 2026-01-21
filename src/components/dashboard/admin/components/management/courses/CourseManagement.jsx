/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
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
  }
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL
});

// API Service functions for Courses
const fetchCoursesData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COURSES);
    return response.data || { total: 0, data: [] };
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Return empty data if endpoint doesn't exist yet
    return { total: 0, data: [] };
  }
};

const createCourse = async (courseData) => {
  try {
    const response = await api.post("/api/courses", courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/api/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Other API functions (existing)
const fetchUsersData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const fetchBookingsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

const fetchInstructorsData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.INSTRUCTORS);
    return response.data || { total: 0, data: [] };
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return { total: 0, data: [] };
  }
};

const fetchRevenueData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.REVENUE);
    return response.data || { total: 0, monthlyData: [] };
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return { total: 0, monthlyData: [] };
  }
};

const fetchActivitiesData = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.ACTIVITIES);
    return response.data || { data: [] };
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { data: [] };
  }
};

const fetchDashboardStats = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

// Modal Components
const SuccessModal = ({ isOpen, onClose, message }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ErrorIcon className="text-red-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Warning className="text-yellow-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Course Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <Close />
            </button>
          </div>
          
          {course ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{course.courseName}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{course.duration} weeks</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">${course.price}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          course.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : course.status === 'inactive'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) || 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px]">
                        <p className="text-gray-900 whitespace-pre-wrap">{course.details}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px]">
                        <p className="text-gray-900 whitespace-pre-wrap">{course.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {course.createdAt && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-mono truncate">
                          {course._id || course.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No course data available</p>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CourseFormModal = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    duration: '',
    price: '',
    details: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        courseName: initialData.courseName || '',
        duration: initialData.duration || '',
        price: initialData.price || '',
        details: initialData.details || '',
        description: initialData.description || '',
        status: initialData.status || 'active'
      });
    } else {
      setFormData({
        courseName: '',
        duration: '',
        price: '',
        details: '',
        description: '',
        status: 'active'
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Name *
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter course name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (weeks) *
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      min="1"
                      max="52"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter duration in weeks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Details *
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter course details (short description)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter full course description"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <Save /> Update Course
                    </>
                  ) : (
                    <>
                      <Add /> Create Course
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter and sort courses when dependencies change
  useEffect(() => {
    // Ensure courses is an array before filtering
    if (!Array.isArray(courses)) {
      setFilteredCourses([]);
      return;
    }

    let result = [...courses];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course =>
        course.courseName?.toLowerCase().includes(term) ||
        course.details?.toLowerCase().includes(term) ||
        course.description?.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(course => course.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.courseName?.toLowerCase() || '';
          bValue = b.courseName?.toLowerCase() || '';
          break;
        case 'price':
          aValue = parseFloat(a.price) || 0;
          bValue = parseFloat(b.price) || 0;
          break;
        case 'duration':
          aValue = parseInt(a.duration) || 0;
          bValue = parseInt(b.duration) || 0;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          aValue = a.courseName?.toLowerCase() || '';
          bValue = b.courseName?.toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCourses(result);
  }, [courses, searchTerm, statusFilter, sortBy, sortOrder]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoursesData();
      // Ensure we have an array of courses
      const coursesArray = Array.isArray(data.data) ? data.data : [];
      setCourses(coursesArray);
      setFilteredCourses(coursesArray);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setShowCreateModal(false);
      setSuccessMessage('Course created successfully!');
      setShowSuccessModal(true);
      fetchCourses(); // Refresh the list
    } catch (err) {
      console.error('Error creating course:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to create course. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleUpdateCourse = async (courseData) => {
    if (!selectedCourse) return;
    
    try {
      await updateCourse(selectedCourse._id || selectedCourse.id, courseData);
      setShowEditModal(false);
      setSelectedCourse(null);
      setSuccessMessage('Course updated successfully!');
      setShowSuccessModal(true);
      fetchCourses(); // Refresh the list
    } catch (err) {
      console.error('Error updating course:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to update course. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;
    
    try {
      await deleteCourse(selectedCourse._id || selectedCourse.id);
      setShowDeleteConfirm(false);
      setSelectedCourse(null);
      setSuccessMessage('Course deleted successfully!');
      setShowSuccessModal(true);
      fetchCourses(); // Refresh the list
    } catch (err) {
      console.error('Error deleting course:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to delete course. Please try again.');
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
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Calculate stats safely
  const activeCoursesCount = Array.isArray(courses) 
    ? courses.filter(c => c && c.status === 'active').length 
    : 0;
  
  const averagePrice = Array.isArray(courses) && courses.length > 0 
    ? (courses.reduce((sum, c) => sum + (parseFloat(c?.price) || 0), 0) / courses.length).toFixed(2)
    : '0.00';
  
  const totalRevenue = Array.isArray(courses)
    ? courses.reduce((sum, c) => sum + (parseFloat(c?.price) || 0), 0).toFixed(2)
    : '0.00';

  return (
    <div className="flex min-h-screen bg-gray-50">
 
      
      <div className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Course Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage all music courses and programs
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Add /> Create Course
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <ErrorIcon className="text-red-500" />
                <div>
                  <p className="text-red-800 font-medium">Error loading courses</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
                <button
                  onClick={fetchCourses}
                  className="ml-auto text-sm text-red-700 hover:text-red-800"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {courses.length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MusicVideo className="text-blue-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {activeCoursesCount}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="text-green-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ${averagePrice}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <AttachMoney className="text-yellow-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ${totalRevenue}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <TrendingUp className="text-purple-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, details..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="duration">Duration</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Course Name
                        {sortBy === 'name' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('duration')}
                    >
                      <div className="flex items-center gap-2">
                        Duration
                        {sortBy === 'duration' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center gap-2">
                        Price
                        {sortBy === 'price' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortBy === 'status' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        {loading ? (
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <MusicVideo className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Get started by creating a new course.
                            </p>
                            <div className="mt-6">
                              <button
                                onClick={() => setShowCreateModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                              >
                                <Add className="mr-2 h-4 w-4" />
                                New Course
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr key={course._id || course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {course.courseName}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {course.details}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.duration} weeks</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${parseFloat(course.price).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                            {course.status?.charAt(0).toUpperCase() + course.status?.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewCourse(course)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View"
                            >
                              <Visibility />
                            </button>
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                              title="Edit"
                            >
                              <Edit />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(course)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <Delete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination/Info */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredCourses.length}</span> of{' '}
              <span className="font-medium">{courses.length}</span> courses
            </div>
            <button
              onClick={fetchCourses}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <RefreshIcon className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
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
    </div>
  );
};