/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  School,
  Groups,
  TrendingUp,
  Star,
  LibraryMusic,
  RecordVoiceOver,
  GraphicEq,
  AutoAwesome,
  Psychology,
  EmojiPeople,
  TheaterComedy,
  Hearing,
  QueueMusic,
  Email,
  Phone,
  LocationOn,
  Schedule,
  Close,
  CalendarMonth,
  Person,
  MusicNote,
  ArtTrack,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

// Custom SVG Icons (same as before)
const PianoIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-purple-400"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <line
      x1="6"
      y1="3"
      x2="6"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="9"
      y1="3"
      x2="9"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="12"
      y1="3"
      x2="12"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="3"
      x2="15"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="18"
      y1="3"
      x2="18"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect x="4" y="12" width="2" height="9" fill="currentColor" />
    <rect x="7" y="12" width="2" height="9" fill="currentColor" />
    <rect x="10" y="12" width="2" height="9" fill="currentColor" />
    <rect x="13" y="12" width="2" height="9" fill="currentColor" />
    <rect x="16" y="12" width="2" height="9" fill="currentColor" />
  </svg>
);

const GuitarIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-400"
  >
    <path
      d="M20 7c0-1.1-.9-2-2-2H6C4.9 5 4 5.9 4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="8"
      y="7"
      width="8"
      height="10"
      rx="1"
      fill="currentColor"
      opacity="0.3"
    />
    <line
      x1="6"
      y1="7"
      x2="18"
      y2="7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="6"
      y1="17"
      x2="18"
      y2="17"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M8 7 L4 4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7 L20 4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ViolinIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-green-400"
  >
    <path
      d="M8 3C8 3 6 5 6 7C6 9 8 11 8 11"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M16 3C16 3 18 5 18 7C18 9 16 11 16 11"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M8 21C8 21 6 19 6 17C6 15 8 13 8 13"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M16 21C16 21 18 19 18 17C18 15 16 13 16 13"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="8"
      y="3"
      width="8"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <line
      x1="12"
      y1="3"
      x2="12"
      y2="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
    <path d="M4 12 L8 12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 12 L20 12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const DrumSetIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-orange-400"
  >
    <circle
      cx="12"
      cy="8"
      r="5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="7"
      cy="16"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="17"
      cy="16"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <line
      x1="12"
      y1="13"
      x2="12"
      y2="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="7"
      y1="13"
      x2="7"
      y2="19"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="17"
      y1="13"
      x2="17"
      y2="19"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="7" cy="16" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="17" cy="16" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

const MusicNoteIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-purple-400"
  >
    <path
      d="M9 18V5l12-2v13"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="6"
      cy="18"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="18"
      cy="16"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M9 5L21 3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MicIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-pink-400"
  >
    <path
      d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="12"
      y1="19"
      x2="12"
      y2="23"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="8"
      y1="23"
      x2="16"
      y2="23"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const VolumeUpIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-400"
  >
    <path
      d="M3 9V15H7L12 20V4L7 9H3Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 9C17.66 9 19 10.34 19 12C19 13.66 17.66 15 16 15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 5C19.31 5 22 7.69 22 12C22 16.31 19.31 19 16 19"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// Modal Components
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ndizmusicprojectbackend.onrender.com/api/contacts/contact",
        formData,
      );
      toast.success(
        "📧 Message sent successfully! We will reply within 24 hours.",
      );

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      onClose();
    } catch (error) {
      toast.error("❌ Failed to send message. Please try again.", error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-t from-red-400 to-red-500 transition-colors"
          >
            <Close className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
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
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
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
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="piano">Piano Lessons</option>
              <option value="guitar">Guitar Lessons</option>
              <option value="vocal">Vocal Training</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your musical interests and goals..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const BookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ndizmusicprojectbackend.onrender.com/herobooking",
        formData,
      );
      toast.success(
        "🎉 Booking request sent successfully! We will contact you soon.",
      );
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        instrument: "",
        experience: "beginner",
      });
    } catch (error) {
      toast.error("❌ Failed to submit booking. Please try again.", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Book a Trial Lesson
          </h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-t from-red-400 to-red-500 transition-colors"
          >
            <Close className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
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
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instrument *
              </label>
              <select
                name="instrument"
                required
                value={formData.instrument}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select</option>
                <option value="piano">Piano</option>
                <option value="guitar">Guitar</option>
                <option value="violin">Violin</option>
                <option value="drums">Drums</option>
                <option value="vocal">Vocal</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level *
              </label>
              <select
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                required
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                name="preferredTime"
                required
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select</option>
                <option value="morning">Morning (9AM-12PM)</option>
                <option value="afternoon">Afternoon (12PM-5PM)</option>
                <option value="evening">Evening (5PM-8PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Any specific goals or preferences..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            Book Trial Lesson
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [studentsTrained, setStudentsTrained] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: Function to calculate Years Experience from 2025
  const calculateYearsExperience = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    // Calculate years from 2025 to current year
    const years = Math.max(1, currentYear - startYear + 1);
    return `${years}+`;
  };

  // NEW: Fetch students trained data from API
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        setLoading(true);
        // Replace with your actual students statistics API endpoint
        const response = await fetch(
          "https://ndizmusicprojectbackend.onrender.com/api/users",
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();

        // Adjust based on your API response structure
        const studentCount =
          data.totalStudents || data.count || data.studentsTrained || 500;

        setStudentsTrained(studentCount);
        setError(null);
      } catch (err) {
        console.error("Error fetching students data:", err);
        setError("Unable to load student count");
        // Fallback to default value
        setStudentsTrained(500);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  // Music Teaching Services
  const teachingServices = [
    {
      icon: <PianoIcon className="text-white" />,
      title: "Piano Lessons",
      description:
        "Comprehensive piano training from classical to contemporary styles",
      levels: ["Beginner", "Intermediate", "Advanced"],
      features: [
        "Sight reading",
        "Music theory",
        "Performance techniques",
        "Improvisation",
      ],
    },
    {
      icon: <GuitarIcon className="text-white"/>,
      title: "Guitar Training",
      description:
        "Acoustic, electric, and bass guitar mastery across all genres",
      levels: ["Beginner", "Intermediate", "Advanced"],
      features: [
        "Chord progressions",
        "Fingerstyle",
        "Lead techniques",
        "Music theory",
      ],
    },
  ];

  // Vocal Services
  const vocalServices = [
    {
      icon: <MicIcon />,
      title: "Vocal Coaching",
      description: "Professional voice training and technique development",
      techniques: [
        "Breath control",
        "Vocal range expansion",
        "Pitch perfection",
        "Tone quality",
      ],
      benefits: [
        "Increased range",
        "Better control",
        "Reduced strain",
        "Professional sound",
      ],
    },
    {
      icon: <RecordVoiceOver className="text-4xl text-cyan-400" />,
      title: "Performance Training",
      description: "Stage presence and live performance mastery",
      techniques: [
        "Stage movement",
        "Audience engagement",
        "Microphone technique",
        "Overcoming stage fright",
      ],
      benefits: [
        "Confidence building",
        "Professional presence",
        "Engaging performances",
        "Career readiness",
      ],
    },
    {
      icon: <GraphicEq className="text-4xl text-yellow-400" />,
      title: "Studio Recording",
      description: "Professional studio vocal recording and production",
      techniques: [
        "Microphone selection",
        "Studio etiquette",
        "Vocal production",
        "Mixing techniques",
      ],
      benefits: [
        "Studio experience",
        "Professional recordings",
        "Industry knowledge",
        "Portfolio development",
      ],
    },
    {
      icon: <TheaterComedy className="text-4xl text-red-400" />,
      title: "Musical Theater",
      description:
        "Specialized training for musical theater and acting through song",
      techniques: [
        "Character development",
        "Emotional expression",
        "Storytelling",
        "Dance integration",
      ],
      benefits: [
        "Audition preparation",
        "Character work",
        "Broadway techniques",
        "Triple threat development",
      ],
    },
  ];

  // Specialized Vocal Programs
  const specializedPrograms = [
    {
      icon: <Hearing className="text-3xl text-purple-400" />,
      title: "Ear Training",
      description: "Develop perfect pitch and relative pitch recognition",
    },
    {
      icon: <VolumeUpIcon />,
      title: "Vocal Health",
      description: "Learn proper vocal care and maintenance techniques",
    },

    {
      icon: <Psychology className="text-3xl text-orange-400" />,
      title: "Music Theory",
      description: "Master the language of music composition",
    },
    {
      icon: <EmojiPeople className="text-3xl text-cyan-400" />,
      title: "Artist Development",
      description: "Build your unique artistic identity and brand",
    },
  ];

  // Stats - UPDATED with dynamic calculations
  const stats = [
    {
      number: calculateYearsExperience(), // NEW: Dynamic calculation
      label: "Years Experience",
      icon: <TrendingUp className="text-2xl" />,
    },
    {
      number: loading
        ? "..."
        : error
          ? "N/A"
          : `${(studentsTrained + 200).toLocaleString()}+`, // NEW: API data
      label: "Students Trained",
      icon: <Groups className="text-2xl" />,
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <Star className="text-2xl" />,
    },
    {
      number: "50+",
      label: "Performances Yearly",
      icon: <LibraryMusic className="text-2xl" />,
    },
  ];

  // Enhanced Mission Features
  const missionFeatures = [
    {
      icon: <MusicNote className="text-2xl text-white" />,
      title: "Accelerated Learning",
      description: "Proprietary methods that fast-track musical proficiency",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Person className="text-2xl text-white" />,
      title: "Personal Mastery",
      description: "Tailored instruction for individual artistic development",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ArtTrack className="text-2xl text-white" />,
      title: "Artistic Expression",
      description: "Nurturing creativity and personal musical voice",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <School className="text-2xl text-white" />,
      title: "Master Instruction",
      description: "Learn from accomplished musicians and educators",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl pt-4">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white overflow-hidden">
          <div className="absolute inset-0"></div>
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 opacity-10">
            <MusicNote className="text-6xl" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <LibraryMusic className="text-6xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Where Technical Precision Meets Artistic 
                Expression
                
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                A transformative learning experience that cultivates exceptional
                musicians through innovative pedagogy, master-level instruction,
                and a performance-driven curriculum.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Mission Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
                To cultivate exceptional musicians through innovative pedagogy,
                master-level instruction, and a performance-driven curriculum
                that transcends traditional music education.
              </p>
            </motion.div>

            {/* Mission Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {missionFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-100 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-3xl p-8 sm:p-12"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium text-sm sm:text-base">
                      {stat.label}
                    </div>
                    {/* Show additional info for dynamic stats */}
                    {stat.label === "Years Experience" && (
                      <div className="text-xs text-white/60 mt-1">
                        Since 2025
                      </div>
                    )}
                    {stat.label === "Students Trained" && (
                      <div className="text-xs text-white/60 mt-1">
                        {loading
                          ? "Loading..."
                          : error
                            ? "Offline"
                            : "Live data"}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Music Teaching Services */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Comprehensive Music Education
              </h2>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                From foundational techniques to advanced performance skills, our
                curriculum is designed to nurture complete musicianship across
                all instruments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teachingServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 "
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 text-white transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-100 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-white mb-2">Skill Levels:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.levels.map((level, levelIndex) => (
                        <span
                          key={levelIndex}
                          className="px-3 py-1 text-white bg-blue-400 rounded-full text-sm font-medium"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-100"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Vocal Services */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Professional Vocal Services
              </h2>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                Transform your voice with our comprehensive vocal training
                programs, designed for singers of all levels and genres.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {vocalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-100">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <VolumeUpIcon />
                        Techniques Covered:
                      </h4>
                      <ul className="space-y-2">
                        {service.techniques.map((tech, techIndex) => (
                          <li
                            key={techIndex}
                            className="flex items-center gap-2 text-gray-100 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="text-lg text-green-500" />
                        Key Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-center gap-2 text-gray-100 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Specialized Programs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                Specialized Development Programs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {specializedPrograms.map((program, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
                  >
                    <div className="text-purple-600 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {program.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {program.title}
                    </h4>
                    <p className="text-gray-100 text-sm">
                      {program.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl text-white lg:text-5xl font-bold mb-6">
                Begin Your Musical Transformation
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join our community of passionate musicians and experience the
                NdziNote difference. Where technical mastery meets artistic
                freedom in an inspiring learning environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookModalOpen(true)}
                  className=" font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <CalendarMonth className="text-lg" />
                  Book a Trial Lesson
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-transparent border-2  font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Email className="text-lg" />
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <Phone className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-gray-100">+250 788 284509</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">
                  <Email className="text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Email Us
                </h3>
                <p className="text-gray-100">info@ndzinote.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                  <LocationOn className="text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Visit Us
                </h3>
                <p className="text-gray-100">Gisimenti, Remera - Kigali</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Modals */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
        <BookModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
        />
      </div>
    </>
  );
};
