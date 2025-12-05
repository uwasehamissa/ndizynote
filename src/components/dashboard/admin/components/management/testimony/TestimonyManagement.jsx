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
  FormatQuote
} from '@mui/icons-material';
import { Sidebar } from '../../sidebar/Sidebar';

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

// Rating options
const ratingOptions = [1, 2, 3, 4, 5];

// Status options
const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
];

export const TestimonialManagement = () => {
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
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    testimonialText: "",
    status: "draft",
    email: "",
    age: "",
    teacher: ""
  });

  const [editForm, setEditForm] = useState({
    name: "",
    instrument: "",
    duration: "",
    joinDate: "",
    rating: 5,
    testimonialText: "",
    status: "draft",
    email: "",
    age: "",
    teacher: ""
  });

  // Fetch all testimonials using axios
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/testimonials');
      
      if (response.status === 200) {
        setTestimonials(response.data);
      } else {
        console.error('Failed to fetch testimonials');
        // Mock data for demonstration
        setTestimonials(getMockData());
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback to mock data
      setTestimonials(getMockData().slice(0, 1));
    } finally {
      setLoading(false);
    }
  };

  // Helper function for mock data
  const getMockData = () => {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        instrument: "Piano",
        duration: "2 years",
        joinDate: "Jan 2023",
        rating: 5,
        testimonialText: "The piano lessons have been absolutely transformative! My teacher is incredibly patient and knowledgeable. I've improved so much in just two years.",
        status: "published",
        email: "sarah.johnson@email.com",
        age: "28",
        teacher: "Mr. Anderson",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Michael Chen",
        instrument: "Guitar",
        duration: "6 months",
        joinDate: "Jun 2023",
        rating: 4,
        testimonialText: "Great learning experience! The structured approach really helped me build a solid foundation.",
        status: "published",
        email: "michael.chen@email.com",
        age: "22",
        teacher: "Ms. Garcia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        instrument: "Violin",
        duration: "1 year",
        joinDate: "Mar 2023",
        rating: 5,
        testimonialText: "As an adult beginner, I was nervous about learning violin. But my teacher made it so accessible and fun! Highly recommended.",
        status: "draft",
        email: "emma.rodriguez@email.com",
        age: "35",
        teacher: "Mr. Thompson",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: "David Kim",
        instrument: "Drums",
        duration: "3 years",
        joinDate: "Aug 2022",
        rating: 5,
        testimonialText: "Three years of drumming and I'm still learning new things every week. The instructors are world-class!",
        status: "published",
        email: "david.kim@email.com",
        age: "19",
        teacher: "Mr. Wilson",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: "Lisa Thompson",
        instrument: "Voice",
        duration: "8 months",
        joinDate: "Apr 2023",
        rating: 4,
        testimonialText: "My vocal range has expanded tremendously. The breathing techniques alone were worth it!",
        status: "archived",
        email: "lisa.thompson@email.com",
        age: "26",
        teacher: "Ms. Davis",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm(prev => ({
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
    setShowCreateConfirmModal(true);
  };

  // Create new testimonial using axios
  const handleCreateTestimonial = async () => {
    setActionLoading(true);

    try {
      const response = await api.post('/testimonials', testimonialForm);

      if (response.status === 201 || response.status === 200) {
        const newTestimonial = response.data;
        setTestimonials(prev => [newTestimonial, ...prev]);
        setShowCreateModal(false);
        setShowCreateConfirmModal(false);
        resetTestimonialForm();
      } else {
        alert('Failed to create testimonial');
      }
    } catch (error) {
      console.error('Error creating testimonial:', error);
      // For demo, add to local state
      const newTestimonial = {
        id: Date.now(),
        ...testimonialForm,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTestimonials(prev => [newTestimonial, ...prev]);
      setShowCreateModal(false);
      setShowCreateConfirmModal(false);
      resetTestimonialForm();
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
      testimonialText: "",
      status: "draft",
      email: "",
      age: "",
      teacher: ""
    });
  };

  // Open edit modal
  const handleEditTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditForm({
      name: testimonial.name,
      instrument: testimonial.instrument,
      duration: testimonial.duration,
      joinDate: testimonial.joinDate,
      rating: testimonial.rating,
      testimonialText: testimonial.testimonialText,
      status: testimonial.status,
      email: testimonial.email || "",
      age: testimonial.age || "",
      teacher: testimonial.teacher || ""
    });
    setShowEditModal(true);
  };

  // Open update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  // Update testimonial using axios
  const handleUpdateTestimonial = async () => {
    if (!selectedTestimonial) return;

    setActionLoading(true);
    try {
      const response = await api.put(`/testimonials/${selectedTestimonial.id}`, editForm);

      if (response.status === 200) {
        const updatedTestimonial = response.data;
        setTestimonials(prev => prev.map(test => 
          test.id === selectedTestimonial.id ? updatedTestimonial : test
        ));
        setShowEditModal(false);
        setShowUpdateConfirmModal(false);
        setSelectedTestimonial(null);
      } else {
        alert('Failed to update testimonial');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      // For demo, update local state
      const updatedTestimonial = {
        ...selectedTestimonial,
        ...editForm,
        updatedAt: new Date().toISOString()
      };
      setTestimonials(prev => prev.map(test => 
        test.id === selectedTestimonial.id ? updatedTestimonial : test
      ));
      setShowEditModal(false);
      setShowUpdateConfirmModal(false);
      setSelectedTestimonial(null);
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
    try {
      const response = await api.delete(`/testimonials/${selectedTestimonial.id}`);

      if (response.status === 200 || response.status === 204) {
        setTestimonials(prev => prev.filter(test => test.id !== selectedTestimonial.id));
        setShowDeleteModal(false);
        setSelectedTestimonial(null);
      } else {
        alert('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      // For demo, remove from local state
      setTestimonials(prev => prev.filter(test => test.id !== selectedTestimonial.id));
      setShowDeleteModal(false);
      setSelectedTestimonial(null);
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get rating stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {ratingOptions.map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
            {star <= rating ? <Star className="text-sm" /> : <StarBorder className="text-sm" />}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  // Filter testimonials based on search and filters
  // FIXED: Changed from testimonials. Filter to testimonials.filter
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.testimonialText.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInstrument = filterInstrument === 'all' || testimonial.instrument === filterInstrument;
    const matchesRating = filterRating === 'all' || testimonial.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === 'all' || testimonial.status === filterStatus;
    
    return matchesSearch && matchesInstrument && matchesRating && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterInstrument('all');
    setFilterRating('all');
    setFilterStatus('all');
  };

  // Calculate statistics
  const totalTestimonials = testimonials.length;
  const publishedTestimonials = testimonials.filter(t => t.status === 'published').length;
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header with Menu Button */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <MenuIcon className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Testimonial Management</h1>
                <p className="text-gray-600 mt-1">Manage student testimonials and reviews</p>
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
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option key={instrument} value={instrument}>
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
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter and Reset */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

              <div className="flex justify-end">
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Testimonials</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalTestimonials}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FormatQuote className="text-indigo-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{publishedTestimonials}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ThumbUp className="text-green-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageRating}/5</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="text-yellow-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Showing</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{filteredTestimonials.length}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FilterList className="text-blue-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4 lg:p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">ID: #{testimonial.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                        {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                      </span>
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <MusicNote className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">{testimonial.instrument}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Schedule className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">{testimonial.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CalendarToday className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">Joined {testimonial.joinDate}</span>
                    </div>
                    {testimonial.teacher && (
                      <div className="flex items-center space-x-3">
                        <Person className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">Teacher: {testimonial.teacher}</span>
                      </div>
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      "{testimonial.testimonialText}"
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
                {testimonials.length === 0 
                  ? "Get started by adding your first student testimonial." 
                  : "No testimonials match your current filters."}
              </p>
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add First Testimonial
              </motion.button>
            </div>
          )}
        </div>
      </div>

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
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={testimonialForm.email}
                      onChange={handleInputChange}
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
                      Teacher
                    </label>
                    <input
                      type="text"
                      name="teacher"
                      value={testimonialForm.teacher}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter teacher name"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="e.g., Jan 2023"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={testimonialForm.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter age"
                    />
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
                    name="testimonialText"
                    value={testimonialForm.testimonialText}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Enter the student's testimonial..."
                  />
                </div>

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
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
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
                      Teacher
                    </label>
                    <input
                      type="text"
                      name="teacher"
                      value={editForm.teacher}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={editForm.age}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
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
                    name="testimonialText"
                    value={editForm.testimonialText}
                    onChange={handleEditInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
                    {selectedTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      {renderStars(selectedTestimonial.rating)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTestimonial.status)}`}>
                        {selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1)}
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
                        <span>{selectedTestimonial.instrument}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Duration</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <Schedule className="text-gray-400" />
                        <span>{selectedTestimonial.duration}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Join Date</label>
                      <p className="text-lg text-gray-900 flex items-center space-x-2">
                        <CalendarToday className="text-gray-400" />
                        <span>{selectedTestimonial.joinDate}</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {selectedTestimonial.email && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <Email className="text-gray-400" />
                          <span>{selectedTestimonial.email}</span>
                        </p>
                      </div>
                    )}
                    {selectedTestimonial.age && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Age</label>
                        <p className="text-lg text-gray-900">{selectedTestimonial.age} years old</p>
                      </div>
                    )}
                    {selectedTestimonial.teacher && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Teacher</label>
                        <p className="text-lg text-gray-900 flex items-center space-x-2">
                          <Person className="text-gray-400" />
                          <span>{selectedTestimonial.teacher}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Testimonial Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-3">Testimonial</label>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <FormatQuote className="text-gray-300 text-4xl mb-2" />
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      "{selectedTestimonial.testimonialText}"
                    </p>
                  </div>
                </div>

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
  );
};