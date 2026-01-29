/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
  CheckCircle,
  PlayArrow,
  Pause,
  VolumeUp,
  Mic,
  Piano,
} from "@mui/icons-material";

// Custom SVG Icons (reused from About page)
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

// Modal Components (same as About page)
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    onClose();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    onClose();
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

export const Services = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("instruments");

  // Instrument Services
  const instrumentServices = [
    {
      icon: <PianoIcon />,
      title: "Piano & Keyboard",
      description:
        "Master the piano with comprehensive training from classical to contemporary styles",
      levels: ["Beginner", "Intermediate", "Advanced", "Professional"],
      duration: "30, 45, or 60 minute sessions",
      features: [
        "Sight reading and music theory",
        "Technical exercises and scales",
        "Repertoire development",
        "Improvisation and composition",
        "Performance preparation",
      ],
    },
    {
      icon: <GuitarIcon />,
      title: "Guitar & Bass",
      description:
        "Comprehensive guitar training covering acoustic, electric, and bass guitar across all genres",
      levels: ["Beginner", "Intermediate", "Advanced", "Professional"],
      duration: "30, 45, or 60 minute sessions",
      features: [
        "Chord progressions and theory",
        "Fingerstyle and picking techniques",
        "Lead guitar and soloing",
        "Music reading and tablature",
        "Recording and performance skills",
      ],
    },
  ];

  // Vocal Services
  const vocalServices = [
    {
      icon: <Mic className="text-4xl text-pink-500" />,
      title: "Vocal Coaching",
      description:
        "Professional voice training to develop your unique vocal style and technique",
      levels: ["Beginner", "Intermediate", "Advanced", "Professional"],
      duration: "45 or 60 minute sessions",
      features: [
        "Breath control and support",
        "Vocal range expansion",
        "Pitch perfection and ear training",
        "Tone quality development",
        "Vocal health and maintenance",
      ],
    },
    {
      icon: <TheaterComedy className="text-4xl text-purple-500" />,
      title: "Performance Training",
      description:
        "Master stage presence, audience engagement, and live performance skills",
      levels: ["Intermediate", "Advanced", "Professional"],
      duration: "60 minute sessions",
      features: [
        "Stage movement and presence",
        "Microphone technique",
        "Overcoming stage fright",
        "Audience connection",
        "Professional rehearsal techniques",
      ],
    },
    {
      icon: <GraphicEq className="text-4xl text-blue-500" />,
      title: "Studio Recording",
      description:
        "Professional studio vocal recording, production, and post-production training",
      levels: ["Intermediate", "Advanced", "Professional"],
      duration: "2-4 hour sessions",
      features: [
        "Microphone selection and technique",
        "Studio etiquette and workflow",
        "Vocal production and effects",
        "Mixing and mastering basics",
        "Home studio setup guidance",
      ],
    },
    {
      icon: <RecordVoiceOver className="text-4xl text-green-500" />,
      title: "Musical Theater",
      description:
        "Specialized training for musical theater performance and acting through song",
      levels: ["Beginner", "Intermediate", "Advanced", "Professional"],
      duration: "60 minute sessions",
      features: [
        "Character development and analysis",
        "Emotional expression through song",
        "Storytelling and narrative",
        "Dance and movement integration",
        "Audition preparation and techniques",
      ],
    },
  ];

  // Specialized Programs
  const specializedPrograms = [
    {
      icon: <QueueMusic className="text-3xl text-purple-500" />,
      title: "Songwriting & Composition",
      description:
        "Learn to compose and arrange your own original music across all genres",
      duration: "8-week program",
      features: [
        "Music theory",
        "Lyric writing",
        "Arrangement",
        "Demo production",
      ],
    },
    {
      icon: <Psychology className="text-3xl text-blue-500" />,
      title: "Music Theory Mastery",
      description:
        "Comprehensive music theory from fundamentals to advanced harmony",
      duration: "12-week program",
      features: ["Ear training", "Harmony", "Counterpoint", "Analysis"],
    },
    {
      icon: <Hearing className="text-3xl text-green-500" />,
      title: "Ear Training Intensive",
      description:
        "Develop perfect pitch and advanced aural skills for professional musicians",
      duration: "6-week program",
      features: [
        "Interval recognition",
        "Chord progressions",
        "Rhythm dictation",
        "Melodic transcription",
      ],
    },
    {
      icon: <AutoAwesome className="text-3xl text-orange-500" />,
      title: "Artist Development",
      description:
        "Build your artistic identity, brand, and professional music career",
      duration: "10-week program",
      features: [
        "Brand development",
        "Marketing",
        "Networking",
        "Career planning",
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
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
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Our <span className="text-cyan-300">Services</span>
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Comprehensive music education programs designed to transform
                beginners into confident performers and professionals into
                masters of their craft.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Service Tabs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {[
                {
                  id: "instruments",
                  label: "Instrument Lessons",
                  icon: <Piano />,
                },
                { id: "vocal", label: "Vocal Training", icon: <Mic /> },
                {
                  id: "specialized",
                  label: "Specialized Programs",
                  icon: <AutoAwesome />,
                },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-l from-blue-400 to-indigo-300  shadow-lg"
                      : "bg-gradient-to-t from-indigo-300 to-violet-400"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Instrument Services */}
        {activeTab === "instruments" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Instrument <span className="text-purple-600">Lessons</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Master your instrument with personalized instruction from
                  world-class educators. From foundational techniques to
                  advanced performance skills.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {instrumentServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Skill Levels
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.levels.map((level, levelIndex) => (
                            <span
                              key={levelIndex}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Session Duration
                        </h4>
                        <p className="text-gray-600">{service.duration}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        What You'll Learn
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle className="text-green-500 text-lg" />
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
        )}

        {/* Vocal Services */}
        {activeTab === "vocal" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Professional <span className="text-pink-600">Vocal</span>{" "}
                  Training
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transform your voice with our comprehensive vocal programs.
                  From basic technique to professional performance and
                  recording.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {vocalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Skill Levels
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.levels.map((level, levelIndex) => (
                            <span
                              key={levelIndex}
                              className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Session Duration
                        </h4>
                        <p className="text-gray-600">{service.duration}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Program Features
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle className="text-green-500 text-lg" />
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
        )}

        {/* Specialized Programs */}
        {activeTab === "specialized" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Specialized <span className="text-purple-600">Programs</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Intensive programs designed to take your musical skills to the
                  next level. Perfect for serious students and aspiring
                  professionals.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {specializedPrograms.map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {program.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      {program.duration}
                    </div>
                    <ul className="space-y-2 text-left">
                      {program.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-600 text-sm"
                        >
                          <CheckCircle className="text-green-500 text-sm" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

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