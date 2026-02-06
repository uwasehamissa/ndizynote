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
//   Email as EmailIcon,
//   Person,
//   Email,
//   Phone,
//   CalendarToday,
//   Search,
//   FilterList,
//   Menu as MenuIcon,
//   Refresh,
//   MoreVert,
//   Check as CheckIcon,
//   Clear as ClearIcon,
//   Done,
//   Block,
//   Pause,
//   PlayArrow
// } from '@mui/icons-material';


// const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Subscription Plans
// const subscriptionPlans = [
//   { value: 'basic', label: 'Basic Plan', color: 'bg-blue-100 text-blue-800' },
//   { value: 'standard', label: 'Standard Plan', color: 'bg-green-100 text-green-800' },
//   { value: 'premium', label: 'Premium Plan', color: 'bg-purple-100 text-purple-800' },
//   { value: 'enterprise', label: 'Enterprise Plan', color: 'bg-orange-100 text-orange-800' }
// ];

// // Status Options
// const statusOptions = [
//   { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
//   { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
// ];

// export const SubscriptionManagement = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   // Modal States
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // Filter States
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterPlan, setFilterPlan] = useState('all');

//   // Form State
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     plan: 'basic',
//     status: 'active',
//     startDate: new Date().toISOString().split('T')[0],
//     endDate: '',
//     notes: ''
//   });

//   // Helper function for mock data
//   const getMockData = () => {
//     const today = new Date();
//     const nextMonth = new Date(today);
//     nextMonth.setMonth(today.getMonth() + 1);
    
//     return [
//       {
//         id: 1,
//         name: 'John Smith',
//         email: 'john.smith@example.com',
//         phone: '+1 (555) 123-4567',
//         plan: 'premium',
//         status: 'active',
//         startDate: today.toISOString().split('T')[0],
//         endDate: nextMonth.toISOString().split('T')[0],
//         notes: 'Loyal customer',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 2,
//         name: 'Emma Johnson',
//         email: 'emma.johnson@example.com',
//         phone: '+1 (555) 234-5678',
//         plan: 'enterprise',
//         status: 'active',
//         startDate: '2024-01-01',
//         endDate: '2024-12-31',
//         notes: 'Enterprise client',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 3,
//         name: 'Michael Chen',
//         email: 'michael.chen@example.com',
//         phone: '+1 (555) 345-6789',
//         plan: 'basic',
//         status: 'pending',
//         startDate: new Date().toISOString().split('T')[0],
//         endDate: '',
//         notes: 'New signup',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 4,
//         name: 'Sarah Williams',
//         email: 'sarah.williams@example.com',
//         phone: '+1 (555) 456-7890',
//         plan: 'standard',
//         status: 'inactive',
//         startDate: '2023-12-01',
//         endDate: '2024-01-31',
//         notes: 'Subscription expired',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 5,
//         name: 'David Brown',
//         email: 'david.brown@example.com',
//         phone: '+1 (555) 567-8901',
//         plan: 'premium',
//         status: 'cancelled',
//         startDate: '2023-11-01',
//         endDate: '2023-12-31',
//         notes: 'Cancelled subscription',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//     ];
//   };

//   // Fetch all subscriptions
//   const fetchSubscriptions = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/newsletter');
      
//       let subscriptionsData = [];
      
//       if (response.status === 200 && response.data) {
//         if (Array.isArray(response.data)) {
//           subscriptionsData = response.data;
//         } else if (response.data.subscriptions && Array.isArray(response.data.subscriptions)) {
//           subscriptionsData = response.data.subscriptions;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//           subscriptionsData = response.data.data;
//         } else {
//           subscriptionsData = getMockData();
//         }
//       } else {
//         subscriptionsData = getMockData();
//       }
      
//       setSubscriptions(subscriptionsData);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       setSubscriptions(getMockData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       plan: 'basic',
//       status: 'active',
//       startDate: new Date().toISOString().split('T')[0],
//       endDate: '',
//       notes: ''
//     });
//   };

//   // Create subscription
//   const handleCreateSubscription = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);

//     try {
//       const response = await api.post('/newsletter', formData);

//       if (response.status === 201 || response.status === 200) {
//         const newSubscription = response.data;
//         setSubscriptions(prev => [newSubscription, ...prev]);
//         setShowCreateModal(false);
//         resetForm();
//       } else {
//         alert('Failed to create subscription');
//       }
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       // For demo, add to local state
//       const newSubscription = {
//         id: Date.now(),
//         ...formData,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
//       setSubscriptions(prev => [newSubscription, ...prev]);
//       setShowCreateModal(false);
//       resetForm();
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open edit modal
//   const handleEditSubscription = (subscription) => {
//     setSelectedSubscription(subscription);
//     setFormData({
//       name: subscription.name || '',
//       email: subscription.email || '',
//       phone: subscription.phone || '',
//       plan: subscription.plan || 'basic',
//       status: subscription.status || 'active',
//       startDate: subscription.startDate || new Date().toISOString().split('T')[0],
//       endDate: subscription.endDate || '',
//       notes: subscription.notes || ''
//     });
//     setShowEditModal(true);
//   };

//   // Update subscription
//   const handleUpdateSubscription = async (e) => {
//     e.preventDefault();
//     if (!selectedSubscription) return;

//     setActionLoading(true);
//     try {
//       const response = await api.put(`/newsletter/${selectedSubscription.id}`, formData);

//       if (response.status === 200) {
//         const updatedSubscription = response.data;
//         setSubscriptions(prev => prev.map(sub => 
//           sub.id === selectedSubscription.id ? updatedSubscription : sub
//         ));
//         setShowEditModal(false);
//         setSelectedSubscription(null);
//         resetForm();
//       } else {
//         alert('Failed to update subscription');
//       }
//     } catch (error) {
//       console.error('Error updating subscription:', error);
//       // For demo, update local state
//       const updatedSubscription = {
//         ...selectedSubscription,
//         ...formData,
//         updatedAt: new Date().toISOString()
//       };
//       setSubscriptions(prev => prev.map(sub => 
//         sub.id === selectedSubscription.id ? updatedSubscription : sub
//       ));
//       setShowEditModal(false);
//       setSelectedSubscription(null);
//       resetForm();
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Quick status update
//   const handleQuickStatusUpdate = async (subscriptionId, newStatus) => {
//     setActionLoading(true);
//     try {
//       const response = await api.patch(`/newsletter/${subscriptionId}`, { status: newStatus });

//       if (response.status === 200) {
//         const updatedSubscription = response.data;
//         setSubscriptions(prev => prev.map(sub => 
//           sub.id === subscriptionId ? updatedSubscription : sub
//         ));
//       } else {
//         alert('Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       setSubscriptions(prev => prev.map(sub => 
//         sub.id === subscriptionId 
//           ? { ...sub, status: newStatus, updatedAt: new Date().toISOString() }
//           : sub
//       ));
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation
//   const handleDeleteClick = (subscription) => {
//     setSelectedSubscription(subscription);
//     setShowDeleteModal(true);
//   };

//   // Delete subscription
//   const handleDeleteSubscription = async () => {
//     if (!selectedSubscription) return;

//     setActionLoading(true);
//     try {
//       const response = await api.delete(`/newsletter/${selectedSubscription.id}`);

//       if (response.status === 200 || response.status === 204) {
//         setSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscription.id));
//         setShowDeleteModal(false);
//         setSelectedSubscription(null);
//       } else {
//         alert('Failed to delete subscription');
//       }
//     } catch (error) {
//       console.error('Error deleting subscription:', error);
//       setSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscription.id));
//       setShowDeleteModal(false);
//       setSelectedSubscription(null);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewSubscription = (subscription) => {
//     setSelectedSubscription(subscription);
//     setShowViewModal(true);
//   };

//   // Format date
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

//   // Get status info
//   const getStatusInfo = (status) => {
//     const option = statusOptions.find(opt => opt.value === status);
//     return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
//   };

//   // Get plan info
//   const getPlanInfo = (plan) => {
//     const planOption = subscriptionPlans.find(p => p.value === plan);
//     return planOption || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
//   };

//   // Filter subscriptions
//   const filteredSubscriptions = (Array.isArray(subscriptions) ? subscriptions : []).filter(subscription => {
//     if (!subscription || typeof subscription !== 'object') return false;
    
//     const name = subscription.name || '';
//     const email = subscription.email || '';
//     const status = subscription.status || '';
//     const plan = subscription.plan || '';
    
//     const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' || status === filterStatus;
//     const matchesPlan = filterPlan === 'all' || plan === filterPlan;
    
//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterStatus('all');
//     setFilterPlan('all');
//   };

//   // Calculate statistics
//   const totalSubscriptions = Array.isArray(subscriptions) ? subscriptions.length : 0;
//   const activeSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.status === 'active').length : 0;
//   const premiumSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.plan === 'premium' || s?.plan === 'enterprise').length : 0;

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header */}
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
//                 <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
//                 <p className="text-gray-600 mt-1">Manage your subscribers</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={fetchSubscriptions}
//                 className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
//                 title="Refresh"
//               >
//                 <Refresh />
//               </button>
//               <motion.button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <AddIcon />
//                 <span className="hidden sm:inline">Add Subscriber</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-4 lg:p-6">
//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalSubscriptions}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <Person className="text-indigo-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Active</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <CheckCircle className="text-green-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Premium</p>
//                   <p className="text-xl lg:text-2xl font-bold text-gray-900">{premiumSubscriptions}</p>
//                 </div>
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                   <Done className="text-purple-600 text-lg lg:text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//               {/* Search */}
//               <div className="lg:col-span-2">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by name or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>

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

//               {/* Plan Filter */}
//               <select
//                 value={filterPlan}
//                 onChange={(e) => setFilterPlan(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               >
//                 <option value="all">All Plans</option>
//                 {subscriptionPlans.map(plan => (
//                   <option key={plan.value} value={plan.value}>
//                     {plan.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Filter Actions */}
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={resetFilters}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
//               >
//                 <FilterList className="text-sm" />
//                 <span>Reset Filters</span>
//               </button>
//             </div>
//           </div>

//           {/* Subscriptions Table */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Subscriber
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Plan & Status
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Subscription Dates
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredSubscriptions.length > 0 ? filteredSubscriptions.map((subscription) => {
//                     const statusInfo = getStatusInfo(subscription.status);
//                     const planInfo = getPlanInfo(subscription.plan);
//                     return (
//                       <tr key={subscription.id} className="hover:bg-gray-50 transition-colors duration-150">
//                         {/* Subscriber Info */}
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                               <Person className="text-indigo-600" />
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {subscription.name || 'N/A'}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {subscription.email || 'N/A'}
//                               </div>
//                               {subscription.phone && (
//                                 <div className="text-xs text-gray-400">
//                                   {subscription.phone}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </td>

//                         {/* Plan & Status */}
//                         <td className="px-6 py-4">
//                           <div className="space-y-2">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${planInfo.color}`}>
//                               {planInfo.label}
//                             </span>
//                             <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
//                               {subscription.status === 'active' && <CheckCircle className="text-xs" />}
//                               {subscription.status === 'pending' && <Pending className="text-xs" />}
//                               {subscription.status === 'cancelled' && <ClearIcon className="text-xs" />}
//                               <span>{statusInfo.label}</span>
//                             </div>
//                           </div>
//                         </td>

//                         {/* Dates */}
//                         <td className="px-6 py-4">
//                           <div className="space-y-1">
//                             <div className="text-sm text-gray-900">
//                               <span className="font-medium">Start:</span> {formatDate(subscription.startDate)}
//                             </div>
//                             <div className="text-sm text-gray-900">
//                               <span className="font-medium">End:</span> {formatDate(subscription.endDate) || 'N/A'}
//                             </div>
//                           </div>
//                         </td>

//                         {/* Actions */}
//                         <td className="px-6 py-4">
//                           <div className="flex space-x-2">
//                             {/* Quick Status Actions */}
//                             <div className="flex flex-wrap gap-2 mb-2">
//                               {subscription.status !== 'active' && subscription.status !== 'cancelled' && (
//                                 <button
//                                   onClick={() => handleQuickStatusUpdate(subscription.id, 'active')}
//                                   className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
//                                 >
//                                   <CheckIcon className="text-xs" />
//                                   <span>Activate</span>
//                                 </button>
//                               )}
//                               {subscription.status === 'active' && (
//                                 <button
//                                   onClick={() => handleQuickStatusUpdate(subscription.id, 'inactive')}
//                                   className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
//                                 >
//                                   <Pause className="text-xs" />
//                                   <span>Pause</span>
//                                 </button>
//                               )}
//                             </div>

//                             {/* Main Actions */}
//                             <div className="flex space-x-2">
//                               <motion.button
//                                 onClick={() => handleViewSubscription(subscription)}
//                                 className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 title="View"
//                               >
//                                 <ViewIcon className="text-sm" />
//                               </motion.button>
//                               <motion.button
//                                 onClick={() => handleEditSubscription(subscription)}
//                                 className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 title="Edit"
//                               >
//                                 <EditIcon className="text-sm" />
//                               </motion.button>
//                               <motion.button
//                                 onClick={() => handleDeleteClick(subscription)}
//                                 className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 title="Delete"
//                               >
//                                 <DeleteIcon className="text-sm" />
//                               </motion.button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   }) : (
//                     <tr>
//                       <td colSpan="4" className="px-6 py-12 text-center">
//                         <Person className="mx-auto text-gray-400 text-6xl mb-4" />
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subscriptions Found</h3>
//                         <p className="text-gray-600 mb-6">
//                           {totalSubscriptions === 0 
//                             ? "Get started by adding your first subscriber." 
//                             : "No subscriptions match your current filters."}
//                         </p>
//                         <motion.button
//                           onClick={() => setShowCreateModal(true)}
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           Add First Subscriber
//                         </motion.button>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Modal */}
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
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900">Add New Subscriber</h2>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateSubscription} className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
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
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter email address"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Plan *
//                     </label>
//                     <select
//                       name="plan"
//                       required
//                       value={formData.plan}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {subscriptionPlans.map(plan => (
//                         <option key={plan.value} value={plan.value}>
//                           {plan.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       required
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       required
//                       value={formData.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Notes
//                   </label>
//                   <textarea
//                     name="notes"
//                     rows="3"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     placeholder="Any notes or comments..."
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
//                     disabled={actionLoading}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Adding...</span>
//                       </>
//                     ) : (
//                       <>
//                         <AddIcon className="text-sm" />
//                         <span>Add Subscriber</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Modal */}
//       <AnimatePresence>
//         {showEditModal && selectedSubscription && (
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
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900">Edit Subscriber</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <form onSubmit={handleUpdateSubscription} className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
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
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Plan *
//                     </label>
//                     <select
//                       name="plan"
//                       required
//                       value={formData.plan}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {subscriptionPlans.map(plan => (
//                         <option key={plan.value} value={plan.value}>
//                           {plan.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       required
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     >
//                       {statusOptions.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       required
//                       value={formData.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Notes
//                   </label>
//                   <textarea
//                     name="notes"
//                     rows="3"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
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
//                     disabled={actionLoading}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     {actionLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Updating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="text-sm" />
//                         <span>Update Subscriber</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* View Modal */}
//       <AnimatePresence>
//         {showViewModal && selectedSubscription && (
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
//                 <h2 className="text-xl font-semibold text-gray-900">Subscriber Details</h2>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <CloseIcon />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
//                   <p className="text-lg font-semibold text-gray-900">{selectedSubscription.name}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
//                   <p className="text-lg text-gray-900">{selectedSubscription.email}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
//                   <p className="text-lg text-gray-900">{selectedSubscription.phone || 'N/A'}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Plan</label>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanInfo(selectedSubscription.plan).color}`}>
//                       {getPlanInfo(selectedSubscription.plan).label}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedSubscription.status).color}`}>
//                       {getStatusInfo(selectedSubscription.status).label}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
//                     <p className="text-lg text-gray-900">{formatDate(selectedSubscription.startDate)}</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
//                     <p className="text-lg text-gray-900">{formatDate(selectedSubscription.endDate) || 'N/A'}</p>
//                   </div>
//                 </div>

//                 {selectedSubscription.notes && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Notes</label>
//                     <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{selectedSubscription.notes}</p>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedSubscription.createdAt)}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Updated</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedSubscription.updatedAt)}</p>
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
//         {showDeleteModal && selectedSubscription && (
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
//                   Delete Subscriber?
//                 </h3>
                
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete <strong>{selectedSubscription.name}</strong>?
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
//                     onClick={handleDeleteSubscription}
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
//   Email as EmailIcon,
//   Person,
//   Email,
//   Phone,
//   CalendarToday,
//   Search,
//   FilterList,
//   Menu as MenuIcon,
//   Refresh,
//   MoreVert,
//   Check as CheckIcon,
//   Clear as ClearIcon,
//   Done,
//   Block,
//   Pause,
//   PlayArrow,
//   AccessTime, // Added for pending status
//   Error as ErrorIcon,
//   Warning as WarningIcon
// } from '@mui/icons-material';

// const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// // Create axios instance with security features
// const api = axios.create({
//   baseURL: API_BASE_URL
// });

// // Add request interceptor
// api.interceptors.request.use(
//   (config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     config.headers['Accept'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// api.interceptors.response.use(
//   (response) => {
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//   },
//   (error) => {
//     console.error('Response Error:', error);
    
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
// const validateSubscriptionData = (data) => {
//   const errors = [];
  
//   if (!data.name || data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters');
//   }
  
//   if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//     errors.push('Valid email is required');
//   }
  
//   if (data.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(data.phone)) {
//     errors.push('Invalid phone number format');
//   }
  
//   if (!data.startDate) {
//     errors.push('Start date is required');
//   }
  
//   return errors;
// };

// // Sanitize data function
// const sanitizeSubscriptionData = (data) => {
//   const sanitized = { ...data };
  
//   // Trim all string fields
//   Object.keys(sanitized).forEach(key => {
//     if (typeof sanitized[key] === 'string') {
//       sanitized[key] = sanitized[key].trim();
//     }
//   });
  
//   return sanitized;
// };

// // Subscription Plans
// const subscriptionPlans = [
//   { value: 'basic', label: 'Basic Plan', color: 'bg-blue-100 text-blue-800' },
//   { value: 'standard', label: 'Standard Plan', color: 'bg-green-100 text-green-800' },
//   { value: 'premium', label: 'Premium Plan', color: 'bg-purple-100 text-purple-800' },
//   { value: 'enterprise', label: 'Enterprise Plan', color: 'bg-orange-100 text-orange-800' }
// ];

// // Status Options - Added icons for each status
// const statusOptions = [
//   { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="text-xs" /> },
//   { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: <Pause className="text-xs" /> },
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <AccessTime className="text-xs" /> },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: <ClearIcon className="text-xs" /> }
// ];

// export const SubscriptionManagement = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Modal States
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // Feedback modal state
//   const [feedbackModal, setFeedbackModal] = useState({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterPlan, setFilterPlan] = useState('all');

//   // Form State
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     plan: 'basic',
//     status: 'active',
//     startDate: new Date().toISOString().split('T')[0],
//     endDate: '',
//     notes: ''
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

//   // Fetch all subscriptions - SECURE VERSION
//   const fetchSubscriptions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Fetching subscriptions from API...');
//       const response = await api.get('/newsletter');
      
//       let subscriptionsData = [];
      
//       if (response.status === 200 && response.data) {
//         if (Array.isArray(response.data)) {
//           subscriptionsData = response.data;
//         } else if (response.data.subscriptions && Array.isArray(response.data.subscriptions)) {
//           subscriptionsData = response.data.subscriptions;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//           subscriptionsData = response.data.data;
//         } else if (response.data && typeof response.data === 'object') {
//           subscriptionsData = Object.values(response.data).filter(item => 
//             item && typeof item === 'object' && (item.id || item._id)
//           );
//         }
//       }
      
//       // Sort by creation date, newest first
//       const sortedData = subscriptionsData.sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.date || 0);
//         const dateB = new Date(b.createdAt || b.date || 0);
//         return dateB - dateA;
//       });
      
//       setSubscriptions(sortedData);
//       showFeedback("success", "Success!", "Subscriptions loaded successfully!");
      
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       setError(error.message);
//       showFeedback("error", "Error!", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       plan: 'basic',
//       status: 'active',
//       startDate: new Date().toISOString().split('T')[0],
//       endDate: '',
//       notes: ''
//     });
//   };

//   // Create subscription - SECURE VERSION
//   const handleCreateSubscription = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     setError(null);

//     try {
//       // Validate data
//       const validationErrors = validateSubscriptionData(formData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       // Sanitize data
//       const sanitizedData = sanitizeSubscriptionData(formData);
      
//       console.log('Creating subscription with data:', sanitizedData);
      
//       // Send to API
//       const response = await api.post('/newsletter/newsletter', sanitizedData);
      
//       // Handle response
//       let newSubscription;
      
//       if (response.data && response.data.data) {
//         newSubscription = response.data.data;
//       } else if (response.data && response.data.subscription) {
//         newSubscription = response.data.subscription;
//       } else {
//         newSubscription = response.data;
//       }

//       // Add to state (newest first)
//       setSubscriptions(prev => [newSubscription, ...prev]);
      
//       // Reset form and close modal
//       setShowCreateModal(false);
//       resetForm();
      
//       // Show success message
//       showFeedback("success", "Success!", "Subscription created successfully!");
      
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       const errorMessage = error.message || 'Failed to create subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open edit modal
//   const handleEditSubscription = (subscription) => {
//     setSelectedSubscription(subscription);
//     setFormData({
//       name: subscription.name || '',
//       email: subscription.email || '',
//       phone: subscription.phone || '',
//       plan: subscription.plan || 'basic',
//       status: subscription.status || 'active',
//       startDate: subscription.startDate || new Date().toISOString().split('T')[0],
//       endDate: subscription.endDate || '',
//       notes: subscription.notes || ''
//     });
//     setShowEditModal(true);
//   };

//   // Update subscription - SECURE VERSION
//   const handleUpdateSubscription = async (e) => {
//     e.preventDefault();
//     if (!selectedSubscription) return;

//     setActionLoading(true);
//     setError(null);
    
//     try {
//       // Validate data
//       const validationErrors = validateSubscriptionData(formData);
//       if (validationErrors.length > 0) {
//         showFeedback("error", "Validation Error", validationErrors.join('. '));
//         setActionLoading(false);
//         return;
//       }

//       // Sanitize data
//       const sanitizedData = sanitizeSubscriptionData(formData);
      
//       // Get subscription ID
//       const subscriptionId = selectedSubscription._id || selectedSubscription.id;
      
//       if (!subscriptionId) {
//         throw new Error('Subscription ID is required for update');
//       }

//       console.log('Updating subscription:', subscriptionId, sanitizedData);
      
//       // Send to API
//       const response = await api.put(`/newsletter/${subscriptionId}`, sanitizedData);
      
//       // Handle response
//       let updatedSubscription;
      
//       if (response.data && response.data.data) {
//         updatedSubscription = response.data.data;
//       } else if (response.data && response.data.subscription) {
//         updatedSubscription = response.data.subscription;
//       } else {
//         updatedSubscription = response.data;
//       }

//       // Update state
//       setSubscriptions(prev => prev.map(sub => 
//         (sub._id === selectedSubscription._id || sub.id === selectedSubscription.id) 
//           ? updatedSubscription 
//           : sub
//       ));
      
//       // Close modal
//       setShowEditModal(false);
//       setSelectedSubscription(null);
//       resetForm();
      
//       // Show success message
//       showFeedback("success", "Success!", "Subscription updated successfully!");
      
//     } catch (error) {
//       console.error('Error updating subscription:', error);
//       const errorMessage = error.message || 'Failed to update subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Quick status update - SECURE VERSION
//   const handleQuickStatusUpdate = async (subscriptionId, newStatus) => {
//     setActionLoading(true);
//     setError(null);
    
//     try {
//       // Find subscription
//       const subscription = subscriptions.find(sub => 
//         (sub._id === subscriptionId || sub.id === subscriptionId)
//       );
      
//       if (!subscription) {
//         throw new Error('Subscription not found');
//       }

//       console.log('Updating status for subscription:', subscriptionId, newStatus);
      
//       // Send to API
//       const response = await api.patch(`/newsletter/${subscriptionId}`, { 
//         status: newStatus 
//       });
      
//       // Handle response
//       let updatedSubscription;
      
//       if (response.data && response.data.data) {
//         updatedSubscription = response.data.data;
//       } else if (response.data && response.data.subscription) {
//         updatedSubscription = response.data.subscription;
//       } else {
//         updatedSubscription = response.data;
//       }

//       // Update state
//       setSubscriptions(prev => prev.map(sub => 
//         (sub._id === subscriptionId || sub.id === subscriptionId) 
//           ? updatedSubscription 
//           : sub
//       ));
      
//       // Show success message
//       showFeedback("success", "Success!", `Subscription status updated to ${newStatus}!`);
      
//     } catch (error) {
//       console.error('Error updating status:', error);
//       const errorMessage = error.message || 'Failed to update status';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open delete confirmation
//   const handleDeleteClick = (subscription) => {
//     setSelectedSubscription(subscription);
//     setShowDeleteModal(true);
//   };

//   // Delete subscription - SECURE VERSION
//   const handleDeleteSubscription = async () => {
//     if (!selectedSubscription) return;

//     setActionLoading(true);
//     setError(null);

//     try {
//       // Get subscription ID
//       const subscriptionId = selectedSubscription._id || selectedSubscription.id;
      
//       if (!subscriptionId) {
//         throw new Error('Subscription ID is required for deletion');
//       }

//       console.log('Deleting subscription:', subscriptionId);
      
//       // Send to API
//       await api.delete(`/newsletter/${subscriptionId}`);
      
//       // Update state
//       setSubscriptions(prev => prev.filter(sub => 
//         (sub._id !== selectedSubscription._id && sub.id !== selectedSubscription.id)
//       ));
      
//       // Close modal
//       setShowDeleteModal(false);
//       setSelectedSubscription(null);
      
//       // Show success message
//       showFeedback("success", "Success!", "Subscription deleted successfully!");
      
//     } catch (error) {
//       console.error('Error deleting subscription:', error);
//       const errorMessage = error.message || 'Failed to delete subscription';
//       setError(errorMessage);
//       showFeedback("error", "Error!", errorMessage);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Open view modal
//   const handleViewSubscription = (subscription) => {
//     setSelectedSubscription(subscription);
//     setShowViewModal(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not available';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   // Get status info
//   const getStatusInfo = (status) => {
//     const option = statusOptions.find(opt => opt.value === status);
//     return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown', icon: null };
//   };

//   // Get plan info
//   const getPlanInfo = (plan) => {
//     const planOption = subscriptionPlans.find(p => p.value === plan);
//     return planOption || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
//   };

//   // Filter subscriptions
//   const filteredSubscriptions = (Array.isArray(subscriptions) ? subscriptions : []).filter(subscription => {
//     if (!subscription || typeof subscription !== 'object') return false;
    
//     const name = subscription.name || '';
//     const email = subscription.email || '';
//     const status = subscription.status || '';
//     const plan = subscription.plan || '';
    
//     const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' || status === filterStatus;
//     const matchesPlan = filterPlan === 'all' || plan === filterPlan;
    
//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterStatus('all');
//     setFilterPlan('all');
//   };

//   // Retry fetching subscriptions
//   const retryFetch = () => {
//     fetchSubscriptions();
//   };

//   // Calculate statistics
//   const totalSubscriptions = Array.isArray(subscriptions) ? subscriptions.length : 0;
//   const activeSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.status === 'active').length : 0;
//   const premiumSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s?.plan === 'premium' || s?.plan === 'enterprise').length : 0;

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         <p className="text-gray-600">Loading subscriptions...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 flex">

//         {/* Main Content */}
//         <div className="flex-1 w-full">
//           {/* Header */}
//           <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <MenuIcon className="text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
//                   <p className="text-gray-600 mt-1">Manage your subscribers</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={fetchSubscriptions}
//                   className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
//                   title="Refresh"
//                 >
//                   <Refresh />
//                 </button>
//                 <motion.button
//                   onClick={() => setShowCreateModal(true)}
//                   className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <AddIcon />
//                   <span className="hidden sm:inline">Add Subscriber</span>
//                 </motion.button>
//               </div>
//             </div>
//           </div>

//           {/* Page Content */}
//           <div className="p-4 lg:p-6">
//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <h3 className="text-red-800 font-semibold mb-1">Error</h3>
//                     <p className="text-red-700 whitespace-pre-line">{error}</p>
//                   </div>
//                   <div className="flex space-x-2 ml-4">
//                     <button
//                       onClick={retryFetch}
//                       className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg transition-colors duration-200"
//                     >
//                       Retry
//                     </button>
//                     <button
//                       onClick={clearError}
//                       className="text-red-400 hover:text-red-600 text-lg"
//                     >
//                       <CloseIcon className="text-sm" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalSubscriptions}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                     <Person className="text-indigo-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Active</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                     <CheckCircle className="text-green-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Premium</p>
//                     <p className="text-xl lg:text-2xl font-bold text-gray-900">{premiumSubscriptions}</p>
//                   </div>
//                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                     <Done className="text-purple-600 text-lg lg:text-xl" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                 {/* Search */}
//                 <div className="lg:col-span-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search by name or email..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 >
//                   <option value="all">All Status</option>
//                   {statusOptions.map(status => (
//                     <option key={status.value} value={status.value}>
//                       {status.label}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Plan Filter */}
//                 <select
//                   value={filterPlan}
//                   onChange={(e) => setFilterPlan(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                 >
//                   <option value="all">All Plans</option>
//                   {subscriptionPlans.map(plan => (
//                     <option key={plan.value} value={plan.value}>
//                       {plan.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Filter Actions */}
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={resetFilters}
//                   className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
//                 >
//                   <FilterList className="text-sm" />
//                   <span>Reset Filters</span>
//                 </button>
//               </div>
//             </div>

//             {/* Subscriptions Table */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Subscriber
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Plan & Status
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Subscription Dates
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredSubscriptions.length > 0 ? filteredSubscriptions.map((subscription) => {
//                       const statusInfo = getStatusInfo(subscription.status);
//                       const planInfo = getPlanInfo(subscription.plan);
//                       const subscriptionId = subscription._id || subscription.id;
                      
//                       return (
//                         <tr key={subscriptionId} className="hover:bg-gray-50 transition-colors duration-150">
//                           {/* Subscriber Info */}
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                                 <Person className="text-indigo-600" />
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {subscription.name || 'N/A'}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   {subscription.email || 'N/A'}
//                                 </div>
//                                 {subscription.phone && (
//                                   <div className="text-xs text-gray-400">
//                                     {subscription.phone}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Plan & Status */}
//                           <td className="px-6 py-4">
//                             <div className="space-y-2">
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${planInfo.color}`}>
//                                 {planInfo.label}
//                               </span>
//                               <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1`}>
//                                 {statusInfo.icon}
//                                 <span>{statusInfo.label}</span>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Dates */}
//                           <td className="px-6 py-4">
//                             <div className="space-y-1">
//                               <div className="text-sm text-gray-900">
//                                 <span className="font-medium">Start:</span> {formatDate(subscription.startDate)}
//                               </div>
//                               <div className="text-sm text-gray-900">
//                                 <span className="font-medium">End:</span> {formatDate(subscription.endDate) || 'N/A'}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Actions */}
//                           <td className="px-6 py-4">
//                             <div className="flex space-x-2">
//                               {/* Quick Status Actions */}
//                               <div className="flex flex-wrap gap-2 mb-2">
//                                 {subscription.status !== 'active' && subscription.status !== 'cancelled' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(subscriptionId, 'active')}
//                                     className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <CheckIcon className="text-xs" />
//                                     <span>Activate</span>
//                                   </button>
//                                 )}
//                                 {subscription.status === 'active' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(subscriptionId, 'inactive')}
//                                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <Pause className="text-xs" />
//                                     <span>Pause</span>
//                                   </button>
//                                 )}
//                                 {subscription.status === 'pending' && (
//                                   <button
//                                     onClick={() => handleQuickStatusUpdate(subscriptionId, 'cancelled')}
//                                     className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1"
//                                     disabled={actionLoading}
//                                   >
//                                     <ClearIcon className="text-xs" />
//                                     <span>Cancel</span>
//                                   </button>
//                                 )}
//                               </div>

//                               {/* Main Actions */}
//                               <div className="flex space-x-2">
//                                 <motion.button
//                                   onClick={() => handleViewSubscription(subscription)}
//                                   className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   title="View"
//                                 >
//                                   <ViewIcon className="text-sm" />
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={() => handleEditSubscription(subscription)}
//                                   className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors duration-200"
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   title="Edit"
//                                 >
//                                   <EditIcon className="text-sm" />
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={() => handleDeleteClick(subscription)}
//                                   className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   title="Delete"
//                                 >
//                                   <DeleteIcon className="text-sm" />
//                                 </motion.button>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     }) : (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-12 text-center">
//                           <Person className="mx-auto text-gray-400 text-6xl mb-4" />
//                           <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subscriptions Found</h3>
//                           <p className="text-gray-600 mb-6">
//                             {totalSubscriptions === 0 
//                               ? error 
//                                 ? "There was an error loading subscriptions. Please check your connection and try again."
//                                 : "Get started by adding your first subscriber." 
//                               : "No subscriptions match your current filters."}
//                           </p>
//                           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <motion.button
//                               onClick={() => setShowCreateModal(true)}
//                               className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                             >
//                               Add First Subscriber
//                             </motion.button>
//                             {error && (
//                               <motion.button
//                                 onClick={retryFetch}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 Retry Loading
//                               </motion.button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Create Modal */}
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
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">Add New Subscriber</h2>
//                   <button
//                     onClick={() => setShowCreateModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleCreateSubscription} className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       minLength="2"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter full name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter email address"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       placeholder="Enter phone number"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Plan *
//                       </label>
//                       <select
//                         name="plan"
//                         required
//                         value={formData.plan}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         {subscriptionPlans.map(plan => (
//                           <option key={plan.value} value={plan.value}>
//                             {plan.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Status *
//                       </label>
//                       <select
//                         name="status"
//                         required
//                         value={formData.status}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         {statusOptions.map(status => (
//                           <option key={status.value} value={status.value}>
//                             {status.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Start Date *
//                       </label>
//                       <input
//                         type="date"
//                         name="startDate"
//                         required
//                         value={formData.startDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         End Date
//                       </label>
//                       <input
//                         type="date"
//                         name="endDate"
//                         value={formData.endDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Notes
//                     </label>
//                     <textarea
//                       name="notes"
//                       rows="3"
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                       placeholder="Any notes or comments..."
//                     />
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
//                       disabled={actionLoading}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Adding...</span>
//                         </>
//                       ) : (
//                         <>
//                           <AddIcon className="text-sm" />
//                           <span>Add Subscriber</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Edit Modal */}
//         <AnimatePresence>
//           {showEditModal && selectedSubscription && (
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
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">Edit Subscriber</h2>
//                   <button
//                     onClick={() => setShowEditModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <form onSubmit={handleUpdateSubscription} className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       minLength="2"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Plan *
//                       </label>
//                       <select
//                         name="plan"
//                         required
//                         value={formData.plan}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         {subscriptionPlans.map(plan => (
//                           <option key={plan.value} value={plan.value}>
//                             {plan.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Status *
//                       </label>
//                       <select
//                         name="status"
//                         required
//                         value={formData.status}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       >
//                         {statusOptions.map(status => (
//                           <option key={status.value} value={status.value}>
//                             {status.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Start Date *
//                       </label>
//                       <input
//                         type="date"
//                         name="startDate"
//                         required
//                         value={formData.startDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         End Date
//                       </label>
//                       <input
//                         type="date"
//                         name="endDate"
//                         value={formData.endDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Notes
//                     </label>
//                     <textarea
//                       name="notes"
//                       rows="3"
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
//                     />
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
//                       disabled={actionLoading}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
//                     >
//                       {actionLoading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Updating...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="text-sm" />
//                           <span>Update Subscriber</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* View Modal */}
//         <AnimatePresence>
//           {showViewModal && selectedSubscription && (
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
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">Subscriber Details</h2>
//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
//                     <p className="text-lg font-semibold text-gray-900">{selectedSubscription.name}</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
//                     <p className="text-lg text-gray-900">{selectedSubscription.email}</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
//                     <p className="text-lg text-gray-900">{selectedSubscription.phone || 'N/A'}</p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Plan</label>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanInfo(selectedSubscription.plan).color}`}>
//                         {getPlanInfo(selectedSubscription.plan).label}
//                       </span>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedSubscription.status).color}`}>
//                         {getStatusInfo(selectedSubscription.status).label}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
//                       <p className="text-lg text-gray-900">{formatDate(selectedSubscription.startDate)}</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
//                       <p className="text-lg text-gray-900">{formatDate(selectedSubscription.endDate) || 'N/A'}</p>
//                     </div>
//                   </div>

//                   {selectedSubscription.notes && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Notes</label>
//                       <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{selectedSubscription.notes}</p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedSubscription.createdAt)}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Updated</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedSubscription.updatedAt)}</p>
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
//           {showDeleteModal && selectedSubscription && (
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
//                     Delete Subscriber?
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6">
//                     Are you sure you want to delete <strong>{selectedSubscription.name}</strong>?
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
//                       onClick={handleDeleteSubscription}
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
  Phone,
  Search,
  FilterList,
  Menu as MenuIcon,
  Refresh,
  MoreVert,
  Check as CheckIcon,
  Clear as ClearIcon,
  Block,
  Pause,
  PlayArrow,
  AccessTime,
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircleOutline,
  Mail,
  ContentCopy,
  Send,
  Download
} from '@mui/icons-material';

const API_BASE_URL = 'https://ndizmusicprojectbackend.onrender.com';

// Create axios instance with security features
const api = axios.create({
  baseURL: API_BASE_URL
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  },
  (error) => {
    console.error('Response Error:', error);
    
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
          icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <ErrorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: <WarningIcon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />,
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
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[9999]">
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
            className={`relative w-full max-w-xs sm:max-w-md rounded-lg shadow-xl ${bgColor} ${borderColor} border-2`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-3 sm:mb-4">
                  {icon}
                </div>

                {/* Title */}
                <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${textColor}`}>
                  {title}
                </h3>

                {/* Message */}
                <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6 break-words">
                  {message}
                </p>

                {/* OK Button for error/warning */}
                {(type === "error" || type === "warning") && (
                  <button
                    onClick={onClose}
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
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

// Validation functions
const validateEmailData = (data) => {
  const errors = [];
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  return errors;
};

// Sanitize data function
const sanitizeEmailData = (data) => {
  const sanitized = { ...data };
  
  // Trim and lowercase email
  if (sanitized.email) {
    sanitized.email = sanitized.email.trim().toLowerCase();
  }
  
  return sanitized;
};

// Status Options - Updated to match model
const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="text-xs" /> },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <AccessTime className="text-xs" /> },
  { value: 'unsubscribed', label: 'Unsubscribed', color: 'bg-red-100 text-red-800', icon: <ClearIcon className="text-xs" /> }
];

export const SubscriptionManagement = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  
  // Feedback modal state
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    status: 'pending'
  });

  // Bulk emails state
  const [bulkEmails, setBulkEmails] = useState('');
  const [bulkStatus, setBulkStatus] = useState('pending');

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

  // Fetch all emails
  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching emails from API...');
      const response = await api.get('/newsletter');
      
      let emailsData = [];
      
      if (response.status === 200 && response.data) {
        if (Array.isArray(response.data)) {
          emailsData = response.data;
        } else if (response.data.emails && Array.isArray(response.data.emails)) {
          emailsData = response.data.emails;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          emailsData = response.data.data;
        } else if (response.data && typeof response.data === 'object') {
          // Try to extract array from object
          emailsData = Object.values(response.data).filter(item => 
            item && typeof item === 'object' && item.email
          );
        }
      }
      
      // Sort by creation date, newest first
      const sortedData = emailsData.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      setEmails(sortedData);
      
    } catch (error) {
      console.error('Error fetching emails:', error);
      setError(error.message);
      showFeedback("error", "Error!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
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
      email: '',
      status: 'pending'
    });
  };

  // Create email subscription
  const handleCreateEmail = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      // Validate data
      const validationErrors = validateEmailData(formData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeEmailData(formData);
      
      console.log('Creating email subscription with data:', sanitizedData);
      
      // Send to API
      const response = await api.post('/newsletter', sanitizedData);
      
      // Handle response
      let newEmail;
      
      if (response.data && response.data.data) {
        newEmail = response.data.data;
      } else if (response.data && response.data.email) {
        newEmail = response.data.email;
      } else {
        newEmail = response.data;
      }

      // Add to state (newest first)
      setEmails(prev => [newEmail, ...prev]);
      
      // Reset form and close modal
      setShowCreateModal(false);
      resetForm();
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription created successfully!");
      
    } catch (error) {
      console.error('Error creating email subscription:', error);
      const errorMessage = error.message || 'Failed to create email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleEditEmail = (email) => {
    setSelectedEmail(email);
    setFormData({
      email: email.email || '',
      status: email.status || 'pending'
    });
    setShowEditModal(true);
  };

  // Update email subscription
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!selectedEmail) return;

    setActionLoading(true);
    setError(null);
    
    try {
      // Validate data
      const validationErrors = validateEmailData(formData);
      if (validationErrors.length > 0) {
        showFeedback("error", "Validation Error", validationErrors.join('. '));
        setActionLoading(false);
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeEmailData(formData);
      
      // Get email ID
      const emailId = selectedEmail._id || selectedEmail.id;
      
      if (!emailId) {
        throw new Error('Email ID is required for update');
      }

      console.log('Updating email:', emailId, sanitizedData);
      
      // Send to API
      const response = await api.put(`/newsletter/${emailId}`, sanitizedData);
      
      // Handle response
      let updatedEmail;
      
      if (response.data && response.data.data) {
        updatedEmail = response.data.data;
      } else if (response.data && response.data.email) {
        updatedEmail = response.data.email;
      } else {
        updatedEmail = response.data;
      }

      // Update state
      setEmails(prev => prev.map(email => 
        (email._id === selectedEmail._id || email.id === selectedEmail.id) 
          ? updatedEmail 
          : email
      ));
      
      // Close modal
      setShowEditModal(false);
      setSelectedEmail(null);
      resetForm();
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription updated successfully!");
      
    } catch (error) {
      console.error('Error updating email:', error);
      const errorMessage = error.message || 'Failed to update email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Quick status update
  const handleQuickStatusUpdate = async (emailId, newStatus) => {
    setActionLoading(true);
    setError(null);
    
    try {
      // Find email
      const email = emails.find(e => 
        (e._id === emailId || e.id === emailId)
      );
      
      if (!email) {
        throw new Error('Email not found');
      }

      console.log('Updating status for email:', emailId, newStatus);
      
      // Send to API
      const response = await api.patch(`/newsletter/${emailId}`, { 
        status: newStatus 
      });
      
      // Handle response
      let updatedEmail;
      
      if (response.data && response.data.data) {
        updatedEmail = response.data.data;
      } else if (response.data && response.data.email) {
        updatedEmail = response.data.email;
      } else {
        updatedEmail = response.data;
      }

      // Update state
      setEmails(prev => prev.map(email => 
        (email._id === emailId || email.id === emailId) 
          ? updatedEmail 
          : email
      ));
      
      // Show success message
      showFeedback("success", "Success!", `Email status updated to ${newStatus}!`);
      
    } catch (error) {
      console.error('Error updating status:', error);
      const errorMessage = error.message || 'Failed to update status';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (email) => {
    setSelectedEmail(email);
    setShowDeleteModal(true);
  };

  // Delete email subscription
  const handleDeleteEmail = async () => {
    if (!selectedEmail) return;

    setActionLoading(true);
    setError(null);

    try {
      // Get email ID
      const emailId = selectedEmail._id || selectedEmail.id;
      
      if (!emailId) {
        throw new Error('Email ID is required for deletion');
      }

      console.log('Deleting email:', emailId);
      
      // Send to API
      await api.delete(`/newsletter/${emailId}`);
      
      // Update state
      setEmails(prev => prev.filter(email => 
        (email._id !== selectedEmail._id && email.id !== selectedEmail.id)
      ));
      
      // Close modal
      setShowDeleteModal(false);
      setSelectedEmail(null);
      
      // Show success message
      showFeedback("success", "Success!", "Email subscription deleted successfully!");
      
    } catch (error) {
      console.error('Error deleting email:', error);
      const errorMessage = error.message || 'Failed to delete email subscription';
      setError(errorMessage);
      showFeedback("error", "Error!", errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Open view modal
  const handleViewEmail = (email) => {
    setSelectedEmail(email);
    setShowViewModal(true);
  };

  // Copy email to clipboard
  const copyToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      showFeedback("success", "Copied!", "Email copied to clipboard!");
    } catch (error) {
      showFeedback("error", "Error!", "Failed to copy email");
    }
  };

  // Copy all emails to clipboard
  const copyAllEmailsToClipboard = () => {
    const emailList = filteredEmails.map(e => e.email).join(', ');
    copyToClipboard(emailList);
  };

  // Export emails
  const handleExportEmails = () => {
    const filteredEmailsList = filteredEmails;
    
    let content = '';
    let filename = `email-subscriptions-${new Date().toISOString().split('T')[0]}`;
    
    if (exportFormat === 'json') {
      content = JSON.stringify(filteredEmailsList, null, 2);
      filename += '.json';
    } else if (exportFormat === 'csv') {
      const headers = ['Email', 'Status', 'Created At'];
      const rows = filteredEmailsList.map(email => [
        email.email,
        email.status,
        new Date(email.createdAt).toLocaleString()
      ]);
      content = [headers, ...rows].map(row => row.join(',')).join('\n');
      filename += '.csv';
    } else if (exportFormat === 'txt') {
      content = filteredEmailsList.map(email => 
        `${email.email} - ${email.status} (${new Date(email.createdAt).toLocaleDateString()})`
      ).join('\n');
      filename += '.txt';
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(false);
    showFeedback("success", "Exported!", `Emails exported as ${exportFormat.toUpperCase()}!`);
  };

  // Bulk add emails
  const handleBulkAddEmails = async () => {
    if (!bulkEmails.trim()) {
      showFeedback("error", "Error!", "Please enter email addresses");
      return;
    }

    setActionLoading(true);
    
    const emailList = bulkEmails
      .split(/[\n,;]/)
      .map(email => email.trim().toLowerCase())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    
    if (emailList.length === 0) {
      showFeedback("error", "Error!", "No valid email addresses found");
      setActionLoading(false);
      return;
    }

    try {
      // Create each email subscription
      const promises = emailList.map(email => 
        api.post('/newsletter', { email, status: bulkStatus })
      );
      
      await Promise.all(promises);
      
      // Refresh the list
      fetchEmails();
      setBulkEmails('');
      setShowBulkModal(false);
      
      showFeedback("success", "Success!", `${emailList.length} emails added successfully!`);
      
    } catch (error) {
      console.error('Error bulk adding emails:', error);
      showFeedback("error", "Error!", "Failed to add some emails. Please check for duplicates.");
    } finally {
      setActionLoading(false);
    }
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
      return 'Invalid Date';
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option || { color: 'bg-gray-100 text-gray-800', label: 'Unknown', icon: null };
  };

  // Filter emails
  const filteredEmails = (Array.isArray(emails) ? emails : []).filter(email => {
    if (!email || typeof email !== 'object') return false;
    
    const emailAddress = email.email || '';
    const status = email.status || '';
    
    const matchesSearch = emailAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  // Retry fetching emails
  const retryFetch = () => {
    fetchEmails();
  };

  // Calculate statistics
  const totalEmails = Array.isArray(emails) ? emails.length : 0;
  const activeEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'active').length : 0;
  const pendingEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'pending').length : 0;
  const unsubscribedEmails = Array.isArray(emails) ? emails.filter(e => e?.status === 'unsubscribed').length : 0;

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-600">Loading email subscriptions...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3 sm:gap-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <MenuIcon className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Email Subscriptions</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Manage newsletter subscribers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={fetchEmails}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  title="Refresh"
                >
                  <Refresh />
                </button>
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200"
                  title="Bulk Add"
                >
                  <AddIcon />
                </button>
                <motion.button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AddIcon className="text-sm sm:text-base" />
                  <span className="hidden xs:inline">Add Email</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-3 sm:p-4 md:p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="text-red-800 font-semibold mb-1 text-sm sm:text-base">Error</h3>
                    <p className="text-red-700 whitespace-pre-line text-xs sm:text-sm">{error}</p>
                  </div>
                  <div className="flex space-x-2 ml-0 sm:ml-4">
                    <button
                      onClick={retryFetch}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 sm:px-3 sm:py-1 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Retry
                    </button>
                    <button
                      onClick={clearError}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      <CloseIcon className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Emails</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{totalEmails}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Mail className="text-indigo-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{activeEmails}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-green-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{pendingEmails}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <AccessTime className="text-yellow-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Unsubscribed</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{unsubscribedEmails}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <ClearIcon className="text-red-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    <option value="all">All Status</option>
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0">
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-xs sm:text-sm"
                >
                  <FilterList className="text-xs sm:text-sm" />
                  <span>Reset Filters</span>
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={copyAllEmailsToClipboard}
                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <ContentCopy className="text-xs sm:text-sm" />
                    <span>Copy All</span>
                  </button>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center space-x-1 sm:space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <Download className="text-xs sm:text-sm" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Emails Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Created
                      </th>
                      <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmails.length > 0 ? filteredEmails.map((email) => {
                      const statusInfo = getStatusInfo(email.status);
                      const emailId = email._id || email.id;
                      
                      return (
                        <tr key={emailId} className="hover:bg-gray-50 transition-colors duration-150">
                          {/* Email Info */}
                          <td className="px-3 sm:px-4 md:px-6 py-3">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <EmailIcon className="text-indigo-600 text-sm sm:text-base" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                  {email.email || 'N/A'}
                                </div>
                                <div className="sm:hidden text-xs text-gray-500 mt-1">
                                  {formatDate(email.createdAt)}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-3 sm:px-4 md:px-6 py-3">
                            <div className="flex flex-col gap-1">
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center space-x-1 w-fit`}>
                                {statusInfo.icon}
                                <span>{statusInfo.label}</span>
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {email.status !== 'active' && email.status !== 'unsubscribed' && (
                                  <button
                                    onClick={() => handleQuickStatusUpdate(emailId, 'active')}
                                    className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
                                    disabled={actionLoading}
                                  >
                                    <CheckIcon className="text-xs" />
                                    <span>Activate</span>
                                  </button>
                                )}
                                {email.status === 'active' && (
                                  <button
                                    onClick={() => handleQuickStatusUpdate(emailId, 'unsubscribed')}
                                    className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
                                    disabled={actionLoading}
                                  >
                                    <ClearIcon className="text-xs" />
                                    <span>Unsubscribe</span>
                                  </button>
                                )}
                                {email.status === 'pending' && (
                                  <button
                                    onClick={() => handleQuickStatusUpdate(emailId, 'unsubscribed')}
                                    className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-0.5 rounded transition-colors duration-200 flex items-center space-x-1"
                                    disabled={actionLoading}
                                  >
                                    <ClearIcon className="text-xs" />
                                    <span>Unsubscribe</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Created Date - Hidden on mobile */}
                          <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-xs sm:text-sm text-gray-900">
                              {formatDate(email.createdAt)}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-3 sm:px-4 md:px-6 py-3">
                            <div className="flex space-x-1 sm:space-x-2">
                              <button
                                onClick={() => copyToClipboard(email.email)}
                                className="p-1 sm:p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                title="Copy"
                              >
                                <ContentCopy className="text-xs sm:text-sm" />
                              </button>
                              <button
                                onClick={() => handleViewEmail(email)}
                                className="p-1 sm:p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors duration-200"
                                title="View"
                              >
                                <ViewIcon className="text-xs sm:text-sm" />
                              </button>
                              <button
                                onClick={() => handleEditEmail(email)}
                                className="p-1 sm:p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors duration-200"
                                title="Edit"
                              >
                                <EditIcon className="text-xs sm:text-sm" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(email)}
                                className="p-1 sm:p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                title="Delete"
                              >
                                <DeleteIcon className="text-xs sm:text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="4" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
                          <EmailIcon className="mx-auto text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4" />
                          <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">No Email Subscriptions Found</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                            {totalEmails === 0 
                              ? error 
                                ? "There was an error loading emails. Please check your connection and try again."
                                : "Get started by adding your first email subscription." 
                              : "No emails match your current filters."}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                            <motion.button
                              onClick={() => setShowCreateModal(true)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add First Email
                            </motion.button>
                            {error && (
                              <motion.button
                                onClick={retryFetch}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Retry Loading
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
              Showing <span className="font-medium">{filteredEmails.length}</span> of{' '}
              <span className="font-medium">{totalEmails}</span> email subscriptions
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Email</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <AddIcon className="text-xs sm:text-sm" />
                          <span>Add Email</span>
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
          {showEditModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Email</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleUpdateEmail} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-xs sm:text-sm" />
                          <span>Update Email</span>
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
          {showViewModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowViewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Email Details</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">{selectedEmail.email}</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusInfo(selectedEmail.status).color}`}>
                      {getStatusInfo(selectedEmail.status).label}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p className="text-sm sm:text-base text-gray-900">{formatDate(selectedEmail.createdAt)}</p>
                  </div>

                  {selectedEmail._id && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">ID</label>
                      <p className="text-xs text-gray-900 font-mono break-all">{selectedEmail._id}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
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
          {showDeleteModal && selectedEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <DeleteIcon className="text-red-600 text-xl sm:text-2xl" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    Delete Email?
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 break-words">
                    Are you sure you want to delete <strong>{selectedEmail.email}</strong>?
                    This action cannot be undone.
                  </p>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteEmail}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <DeleteIcon className="text-xs sm:text-sm" />
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

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Export Emails</h2>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {['json', 'csv', 'txt'].map(format => (
                        <button
                          key={format}
                          type="button"
                          onClick={() => setExportFormat(format)}
                          className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm ${
                            exportFormat === format
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600">
                    Exporting {filteredEmails.length} email(s)
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExportEmails}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <Download className="text-xs sm:text-sm" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Add Modal */}
        <AnimatePresence>
          {showBulkModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setShowBulkModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Bulk Add Emails</h2>
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Addresses *
                    </label>
                    <textarea
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                      placeholder="Enter email addresses (separated by commas, spaces, or new lines)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate emails with commas, spaces, or new lines
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status for All
                    </label>
                    <select
                      value={bulkStatus}
                      onChange={(e) => setBulkStatus(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      onClick={() => setShowBulkModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkAddEmails}
                      disabled={actionLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <AddIcon className="text-xs sm:text-sm" />
                          <span>Bulk Add</span>
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