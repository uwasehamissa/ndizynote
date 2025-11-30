/* eslint-disable no-unused-vars */
// components/ContactManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Add,
  Edit,
  Delete,
  Refresh,
  Person,
  MoreVert,
  ViewHeadline,
  Email,
  Menu,
  Phone,
  Message,
  Business,
  Schedule,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebar/Sidebar";

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://ndizmusicprojectbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service using Axios
const contactService = {
  // Get all contacts
  async getContacts() {
    const response = await api.get("/contacts");
    const data = response.data;

    if (data.success) {
      return data.data.map((contact) => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status || "new",
        createdAt: contact.createdAt,
      }));
    }
    throw new Error(data.message || "Failed to fetch contacts");
  },

  // Create new contact
  async createContact(contactData) {
    const response = await api.post("/contacts", contactData);
    const data = response.data;

    if (data.success) {
      const contact = data.data;
      return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status || "new",
        createdAt: contact.createdAt,
      };
    }
    throw new Error(data.message || "Failed to create contact");
  },

  // Update contact
  async updateContact(id, contactData) {
    const response = await api.put(`/contacts/${id}`, contactData);
    const data = response.data;

    if (data.success) {
      const contact = data.data;
      return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        status: contact.status,
        createdAt: contact.createdAt,
      };
    }
    throw new Error(data.message || "Failed to update contact");
  },

  // Delete contact
  async deleteContact(id) {
    const response = await api.delete(`/contacts/${id}`);
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to delete contact");
    }
  },
};

// Loading Spinner Component
const LoadingSpinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`animate-spin rounded-full border-b-2 border-white ${sizeClasses[size]}`}
      ></div>
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
};

// Modal Components
const CreateContactModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onCreate(formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        company: "",
      });
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Create New Contact
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Enter message"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Creating..." : "Create Contact"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ViewContactModal = ({ isOpen, onClose, contact }) => {
  if (!contact) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Contact Details
              </h2>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900">{contact.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{contact.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {contact.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <p className="text-gray-900">
                    {contact.company || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <p className="text-gray-900">{contact.subject}</p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contact.status === "responded"
                        ? "bg-green-100 text-green-800"
                        : contact.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {contact.status.charAt(0).toUpperCase() +
                      contact.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Received
                  </label>
                  <p className="text-gray-900 text-sm">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contact }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && contact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg w-full max-w-md mx-4"
          >
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600">
                Delete Contact
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Are you sure you want to delete the contact from{" "}
                <strong>{contact.name}</strong>? This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Deleting..." : "Delete Contact"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Contact Card Component for Mobile View
const ContactCard = ({ contact, onView, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Person className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {contact.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  contact.status
                )}`}
              >
                {contact.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">{contact.email}</p>
            <p className="text-xs text-gray-600 truncate mt-1">
              {contact.subject}
            </p>
          </div>
        </div>

        {/* Mobile Actions Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVert className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onView(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Message className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(contact);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Delete className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <Phone className="w-3 h-3" />
          <span>{contact.phone || "No phone"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Schedule className="w-3 h-3" />
          <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action buttons for larger mobile screens */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onView(contact)}
          className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
        >
          <Message className="w-3 h-3" />
          <span>View</span>
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
        >
          <Delete className="w-3 h-3" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

// Main Contact Management Component
export const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

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

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts when search query changes
  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]);

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const contactData = await contactService.getContacts();
      setContacts(contactData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search query (name, email, subject, or company)
    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contact.company &&
            contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredContacts(filtered);
  };

  const handleCreateContact = async (contactData) => {
    const newContact = await contactService.createContact(contactData);
    setContacts((prev) => [...prev, newContact]);
    return newContact;
  };

  const handleDeleteContact = async (id) => {
    await contactService.deleteContact(id);
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Contact Management
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Manage and respond to customer inquiries
                    </p>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 hidden sm:block">
                      View:
                    </span>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "table"
                            ? "bg-white shadow-sm text-blue-600"
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
                            ? "bg-white shadow-sm text-blue-600"
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
                    <p className="text-red-600 text-sm">{error}</p>
                    <button
                      onClick={() => setError("")}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name, email, subject, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={loadContacts}
                        disabled={loading}
                        className="p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        title="Refresh"
                      >
                        <Refresh
                          className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Add className="w-4 h-4" />
                        <span className="hidden sm:inline">New Contact</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts Content */}
              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Loading contacts...
                  </p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Message className="mx-auto text-gray-400 mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {searchQuery
                      ? "No contacts match your search"
                      : "No contacts found"}
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search
                    </p>
                  )}
                </div>
              ) : viewMode === "table" ? (
                /* Table View for md screens and up */
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                            Subject
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                            Received
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredContacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <Person className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {contact.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {contact.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell">
                              <div className="text-sm text-gray-900 truncate max-w-[200px]">
                                {contact.subject}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  contact.status
                                )}`}
                              >
                                {contact.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden xl:table-cell">
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  contact.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setViewModalOpen(true);
                                  }}
                                  className="px-3 py-1 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
                                  title="View contact"
                                >
                                  <Message className="w-3 h-3" />
                                  <span className="hidden xs:inline">View</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setDeleteModalOpen(true);
                                  }}
                                  className="px-3 py-1 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-1 text-sm"
                                  title="Delete contact"
                                >
                                  <Delete className="w-3 h-3" />
                                  <span className="hidden xs:inline">
                                    Delete
                                  </span>
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
                  {filteredContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onView={(contact) => {
                        setSelectedContact(contact);
                        setViewModalOpen(true);
                      }}
                      onDelete={(contact) => {
                        setSelectedContact(contact);
                        setDeleteModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateContactModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateContact}
        />

        <ViewContactModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          contact={selectedContact}
        />

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() =>
            selectedContact && handleDeleteContact(selectedContact.id)
          }
          contact={selectedContact}
        />
      </div>
    </>
  );
};
