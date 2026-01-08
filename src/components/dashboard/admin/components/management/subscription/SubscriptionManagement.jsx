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
  Email as EmailIcon,
  Person,
  Email,
  Phone,
  CalendarToday,
  Search,
  FilterList,
  Menu as MenuIcon,
  Refresh,
  MoreVert,
  Check as CheckIcon,
  Clear as ClearIcon,
  Done,
  Block,
  Pause,
  PlayArrow
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

// Subscription Plans
const subscriptionPlans = [
  { value: 'basic', label: 'Basic Plan', color: 'bg-blue-100 text-blue-800' },
  { value: 'standard', label: 'Standard Plan', color: 'bg-green-100 text-green-800' },
  { value: 'premium', label: 'Premium Plan', color: 'bg-purple-100 text-purple-800' },
  { value: 'enterprise', label: 'Enterprise Plan', color: 'bg-orange-100 text-orange-800' }
];

// Status Options
const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'basic',
    status: 'active',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: ''
  });

  // Helper function for mock data
  const getMockData = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    return [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        plan: 'premium',
        status: 'active',
        startDate: today.toISOString().split('T')[0],
        endDate: nextMonth.toISOString().split('T')[0],
        notes: 'Loyal customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Emma Johnson',
        email: 'emma.johnson@example.com',
        phone: '+1 (555) 234-5678',
        plan: 'enterprise',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        notes: 'Enterprise client',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 345-6789',
        plan: 'basic',
        status: 'pending',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        notes: 'New signup',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
        phone: '+1 (555) 456-7890',
        plan: 'standard',
        status: 'inactive',
        startDate: '2023-12-01',
        endDate: '2024-01-31',
        notes: 'Subscription expired',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+1 (555) 567-8901',
        plan: 'premium',
        status: 'cancelled',
        startDate: '2023-11-01',
        endDate: '2023-12-31',
        notes: 'Cancelled subscription',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  };

  // Fetch all subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/subscriptions');
      
      let subscriptionsData = [];
      
      if (response.status === 200 && response.data) {
        if (Array.isArray(response.data)) {
          subscriptionsData = response.data;
        } else if (response.data.subscriptions && Array.isArray(response.data.subscriptions)) {
          subscriptionsData = response.data.subscriptions;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          subscriptionsData = response.data.data;
        } else {
          subscriptionsData = getMockData();
        }
      } else {
        subscriptionsData = getMockData();
      }
      
      setSubscriptions(subscriptionsData);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions(getMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: 'basic',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: ''
    });
  };

  // Create subscription
  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const response = await api.post('/api/subscriptions', formData);

      if (response.status === 201 || response.status === 200) {
        const newSubscription = response.data;
        setSubscriptions(prev => [newSubscription, ...prev]);
        setShowCreateModal(false);
        resetForm();
      } else {
        alert('Failed to create subscription');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      // For demo, add to local state
      const newSubscription = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setSubscriptions(prev => [newSubscription, ...prev]);
      setShowCreateModal(false);
      resetForm();
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setFormData({
      name: subscription.name || '',
      email: subscription.email || '',
      phone: subscription.phone || '',
      plan: subscription.plan || 'basic',
      status: subscription.status || 'active',
      startDate: subscription.startDate || new Date().toISOString().split('T')[0],
      endDate: subscription.endDate || '',
      notes: subscription.notes || ''
    });
    setShowEditModal(true);
  };

  // Update subscription
  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
    if (!selectedSubscription) return;

    setActionLoading(true);
    try {
      const response = await api.put(`/api/subscriptions/${selectedSubscription.id}`, formData);

      if (response.status === 200) {
        const updatedSubscription = response.data;
        setSubscriptions(prev => prev.map(sub => 
          sub.id === selectedSubscription.id ? updatedSubscription : sub
        ));
        setShowEditModal(false);
        setSelectedSubscription(null);
        resetForm();
      } else {
        alert('Failed to update subscription');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      // For demo, update local state
      const updatedSubscription = {
        ...selectedSubscription,
        ...formData,
        updatedAt: new Date().toISOString()
      };
      setSubscriptions(prev => prev.map(sub => 
        sub.id === selectedSubscription.id ? updatedSubscription : sub
      ));
      setShowEditModal(false);
      setSelectedSubscription(null);
      resetForm();
    } finally {
      setActionLoading(false);
    }
  };

  // Quick status update
  const handleQuickStatusUpdate = async (subscriptionId, newStatus) => {
    setActionLoading(true);
    try {
      const response = await api.patch(`/api/subscriptions/${subscriptionId}`, { status: newStatus });

      if (response.status === 200) {
        const updatedSubscription = response.data;
        setSubscriptions(prev => prev.map(sub => 
          sub.id === subscriptionId ? updatedSubscription : sub
        ));
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setSubscriptions(prev => prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: newStatus, updatedAt: new Date().toISOString() }
          : sub
      ));
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (subscription) => {
    setSelectedSubscription(subscription);
    setShowDeleteModal(true);
  };

  // Delete subscription
  const handleDeleteSubscription = async () => {
    if (!selectedSubscription) return;

    setActionLoading(true);
    try {
      const response = await api.delete(`/api/subscriptions/${selectedSubscription.id}`);

      if (response.status === 200 || response.status === 204) {
        setSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscription.id));
        setShowDeleteModal(false);
        setSelectedSubscription(null);
      } else {
        alert('Failed to delete subscription');
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      setSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscription.id));
      setShowDeleteModal(false);
      setSelectedSubscription(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setShowViewModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
  };

  // Get plan info
  const getPlanInfo = (plan) => {
    const planOption = subscriptionPlans.find(p => p.value === plan);
    return planOption || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
  };

  // Filter subscriptions
  const filteredSubscriptions = (Array.isArray(subscriptions) ? subscriptions : []).filter(subscription => {
    if (!subscription || typeof subscription !== 'object') return false;
    
    const name = subscription.name || '';
    const email = subscription.email || '';
    const status = subscription.status || '';
    const plan = subscription.plan || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    const matchesPlan = filterPlan === 'all' || plan === filterPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPlan('all');
  };

  // Calculate statistics
  const totalSubscriptions = Array.isArray(subscriptions) ? subscriptions.length : 0;
  const activeSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.status === 'active').length : 0;
  const premiumSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.plan === 'premium' || s?.plan === 'enterprise').length : 0;

  // Loading state
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <MenuIcon className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
                <p className="text-gray-600 mt-1">Manage your subscribers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchSubscriptions}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                title="Refresh"
              >
                <Refresh />
              </button>
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AddIcon />
                <span className="hidden sm:inline">Add Subscriber</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalSubscriptions}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Person className="text-indigo-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-green-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Premium</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{premiumSubscriptions}</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Done className="text-purple-600 text-lg lg:text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

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

              {/* Plan Filter */}
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="all">All Plans</option>
                {subscriptionPlans.map(plan => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <FilterList className="text-sm" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscriber
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan & Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscription Dates
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscriptions.length > 0 ? filteredSubscriptions.map((subscription) => {
                    const statusInfo = getStatusInfo(subscription.status);
                    const planInfo = getPlanInfo(subscription.plan);
                    return (
                      <tr key={subscription.id} className="hover:bg-gray-50 transition-colors duration-150">
                        {/* Subscriber Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                              <Person className="text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {subscription.name || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {subscription.email || 'N/A'}
                              </div>
                              {subscription.phone && (
                                <div className="text-xs text-gray-400">
                                  {subscription.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Plan & Status */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${planInfo.color}`}>
                              {planInfo.label}
                            </span>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
                              {subscription.status === 'active' && <CheckCircle className="text-xs" />}
                              {subscription.status === 'pending' && <Pending className="text-xs" />}
                              {subscription.status === 'cancelled' && <ClearIcon className="text-xs" />}
                              <span>{statusInfo.label}</span>
                            </div>
                          </div>
                        </td>

                        {/* Dates */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900">
                              <span className="font-medium">Start:</span> {formatDate(subscription.startDate)}
                            </div>
                            <div className="text-sm text-gray-900">
                              <span className="font-medium">End:</span> {formatDate(subscription.endDate) || 'N/A'}
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {/* Quick Status Actions */}
                            <div className="flex flex-wrap gap-2 mb-2">
                              {subscription.status !== 'active' && subscription.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleQuickStatusUpdate(subscription.id, 'active')}
                                  className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                                >
                                  <CheckIcon className="text-xs" />
                                  <span>Activate</span>
                                </button>
                              )}
                              {subscription.status === 'active' && (
                                <button
                                  onClick={() => handleQuickStatusUpdate(subscription.id, 'inactive')}
                                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                                >
                                  <Pause className="text-xs" />
                                  <span>Pause</span>
                                </button>
                              )}
                            </div>

                            {/* Main Actions */}
                            <div className="flex space-x-2">
                              <motion.button
                                onClick={() => handleViewSubscription(subscription)}
                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="View"
                              >
                                <ViewIcon className="text-sm" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleEditSubscription(subscription)}
                                className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Edit"
                              >
                                <EditIcon className="text-sm" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteClick(subscription)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Delete"
                              >
                                <DeleteIcon className="text-sm" />
                              </motion.button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <Person className="mx-auto text-gray-400 text-6xl mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subscriptions Found</h3>
                        <p className="text-gray-600 mb-6">
                          {totalSubscriptions === 0 
                            ? "Get started by adding your first subscriber." 
                            : "No subscriptions match your current filters."}
                        </p>
                        <motion.button
                          onClick={() => setShowCreateModal(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add First Subscriber
                        </motion.button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Add New Subscriber</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleCreateSubscription} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
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
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan *
                    </label>
                    <select
                      name="plan"
                      required
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {subscriptionPlans.map(plan => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
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
                      required
                      value={formData.status}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Any notes or comments..."
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
                    disabled={actionLoading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {actionLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <AddIcon className="text-sm" />
                        <span>Add Subscriber</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedSubscription && (
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Edit Subscriber</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleUpdateSubscription} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
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
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan *
                    </label>
                    <select
                      name="plan"
                      required
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {subscriptionPlans.map(plan => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
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
                      required
                      value={formData.status}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {actionLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="text-sm" />
                        <span>Update Subscriber</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedSubscription && (
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
                <h2 className="text-xl font-semibold text-gray-900">Subscriber Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSubscription.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-lg text-gray-900">{selectedSubscription.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="text-lg text-gray-900">{selectedSubscription.phone || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Plan</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanInfo(selectedSubscription.plan).color}`}>
                      {getPlanInfo(selectedSubscription.plan).label}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedSubscription.status).color}`}>
                      {getStatusInfo(selectedSubscription.status).label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
                    <p className="text-lg text-gray-900">{formatDate(selectedSubscription.startDate)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
                    <p className="text-lg text-gray-900">{formatDate(selectedSubscription.endDate) || 'N/A'}</p>
                  </div>
                </div>

                {selectedSubscription.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Notes</label>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{selectedSubscription.notes}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedSubscription.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Updated</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedSubscription.updatedAt)}</p>
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
        {showDeleteModal && selectedSubscription && (
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
                  Delete Subscriber?
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <strong>{selectedSubscription.name}</strong>?
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
                    onClick={handleDeleteSubscription}
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