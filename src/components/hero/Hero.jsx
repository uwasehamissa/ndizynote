/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MusicNote,
  School,
  Groups,
  TrendingUp,
  Person,
  Analytics,
  Star,
  ContactMail,
  CalendarMonth,
  Close,
} from "@mui/icons-material";
import axios from "axios";

export const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "beginner",
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Background images for slideshow
  const backgroundSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      image:
        "https://www.yamaha.com/en/musical_instrument_guide/common/images/piano/parts_viewer01.jpg",
    },
    {
      id: 3,
      image:
        "https://assets.classicfm.com/2017/01/guitar-v4r-1483624555-editorial-long-form-0.jpg",
    },
    {
      id: 4,
      image:
        "https://www.yamaha.com/en/musical_instrument_guide/common/images/drums/parts_viewer01.jpg",
    },
  ];

  // Auto-advance background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundSlides.length]);

  const features = [
    {
      id: 1,
      title: "Personalized Learning",
      description:
        "Customized lesson plans tailored to your musical goals and skill level",
      icon: <Person className="text-3xl xs:text-4xl text-purple-400" />,
      features: [
        "One-on-one sessions",
        "Progress tracking",
        "Flexible scheduling",
      ],
      color: "from-purple-500/30 to-purple-600/30",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 2,
      title: "Expert Instructors",
      description:
        "Learn from professionally trained musicians with years of teaching experience",
      icon: <School className="text-3xl xs:text-4xl text-blue-400" />,
      features: [
        "Certified professionals",
        "Performance experience",
        "Patient mentoring",
      ],
      color: "from-blue-500/30 to-blue-600/30",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 3,
      title: "Modern Facilities",
      description:
        "State-of-the-art studios equipped with the latest music technology",
      icon: <Analytics className="text-3xl xs:text-4xl text-cyan-400" />,
      features: [
        "Digital recording",
        "Quality instruments",
        "Comfortable environment",
      ],
      color: "from-cyan-500/30 to-cyan-600/30",
      bgColor: "bg-cyan-500/10",
    },
  ];

  const instruments = [
    {
      name: "Piano",
      icon: "🎹",
      description: "Classical to contemporary piano techniques",
    },
    {
      name: "Guitar",
      icon: "🎸",
      description: "Acoustic, electric, and bass guitar mastery",
    },
    {
      name: "Vocals",
      icon: "🎤",
      description: "Vocal training and performance techniques",
    },
    {
      name: "Violin",
      icon: "🎻",
      description: "String instruments and orchestral training",
    },
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ndizmusicprojectbackend.onrender.com/herobooking", bookingForm);
      toast.success(
        "🎉 Booking request sent successfully! We will contact you soon."
      );
      setIsBookingModalOpen(false);
      setBookingForm({
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ndizmusicprojectbackend.onrender.com/api/contacts/contact", contactForm);
      toast.success(
        "📧 Message sent successfully! We will reply within 24 hours."
      );
      setIsContactModalOpen(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("❌ Failed to send message. Please try again.", error);
    }
  };

  // Enhanced floating elements with better visibility
  const floatingElements = [
    {
      icon: "🎹",
      delay: 0,
      size: "text-4xl xs:text-5xl",
      color: "text-white/30",
    },
    {
      icon: "🎸",
      delay: 1,
      size: "text-5xl xs:text-6xl",
      color: "text-white/25",
    },
    {
      icon: "🎤",
      delay: 2,
      size: "text-3xl xs:text-4xl",
      color: "text-white/30",
    },
    {
      icon: "🎻",
      delay: 3,
      size: "text-4xl xs:text-5xl",
      color: "text-white/25",
    },
    {
      icon: "🥁",
      delay: 4,
      size: "text-5xl xs:text-6xl",
      color: "text-white/30",
    },
    {
      icon: "🎼",
      delay: 5,
      size: "text-3xl xs:text-4xl",
      color: "text-white/25",
    },
    {
      icon: "🎧",
      delay: 6,
      size: "text-4xl xs:text-5xl",
      color: "text-white/30",
    },
    {
      icon: "📱",
      delay: 7,
      size: "text-3xl xs:text-4xl",
      color: "text-white/25",
    },
  ];

  return (
    <>
      <section className="w-full relative min-h-screen flex items-center justify-center overflow-hidden">
        <ToastContainer position="top-right" autoClose={5000} />

        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img
                src={backgroundSlides[currentBgIndex].image}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Overlay with gradient */}
              <div
                className={`absolute inset-0 ${backgroundSlides[currentBgIndex].overlay}`}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className={`absolute ${element.color} ${element.size} filter blur-[1px]`}
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{
                y: [-50, 150, -50],
                x: [0, 30, 0],
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + index * 2,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + index * 12}%`,
                top: `${20 + ((index * 8) % 60)}%`,
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10">
          {/* Main Hero Content */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Badge */}

              {/* Main Heading */}
              <motion.h2
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Master Music with{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                  NdizyNote
                </span>{" "}
                Academy
              </motion.h2>

              <motion.p
                className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Transform your musical journey with professional guidance. Learn
                piano, guitar, and vocals from world-class instructors in a
                supportive, innovative learning environment.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="grid grid-cols-2 xs:flex-row gap-3 xs:gap-4 justify-center mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 text-sm xs:text-base"
                >
                  <CalendarMonth className="text-lg" />
                  Start Learning Today
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white/20 backdrop-blur-md border bg-gradient-to-r from-indigo-400 to-violet-300 font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm xs:text-base"
                >
                  <ContactMail className="text-lg" />
                  Contact Us
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Grid with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4 xs:gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-md border border-white/30 rounded-xl xs:rounded-2xl p-4 xs:p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${feature.bgColor}`}
                onMouseEnter={() => setActiveSlide(index)}
              >
                <div className="mb-3 xs:mb-4">{feature.icon}</div>
                <h3 className="text-lg xs:text-xl font-bold text-white mb-2 xs:mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/90 mb-3 xs:mb-4 leading-relaxed text-sm xs:text-base">
                  {feature.description}
                </p>
                <div className="space-y-1 xs:space-y-2">
                  {feature.features.map((item, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-2 text-white/80 text-xs xs:text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-cyan-300 rounded-full"></div>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl xs:rounded-2xl max-w-md w-full p-4 xs:p-6 mx-2"
            >
              <div className="flex justify-between items-center mb-4 xs:mb-6">
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900">
                  Start Your Musical Journey
                </h3>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="bg-gradient-to-r from-red-400 to-red-500"
                >
                  <Close />
                </button>
              </div>

              <form
                onSubmit={handleBookingSubmit}
                className="space-y-3 xs:space-y-4 text-black"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={bookingForm.name}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, name: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={bookingForm.email}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, email: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, phone: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <select
                  value={bookingForm.instrument}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      instrument: e.target.value,
                    })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                >
                  <option value="">Select Instrument</option>
                  {instruments.map((instrument, index) => (
                    <option key={index} value={instrument.name}>
                      {instrument.icon} {instrument.name}
                    </option>
                  ))}
                </select>

                <select
                  value={bookingForm.experience}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      experience: e.target.value,
                    })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                >
                  <option value="beginner">🎵 Beginner</option>
                  <option value="intermediate">🎵 Intermediate</option>
                  <option value="advanced">🎵 Advanced</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-2 xs:py-3 px-4 xs:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm xs:text-base"
                >
                  <CalendarMonth className="text-lg" />
                  Book Trial Lesson
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Modal */}
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl xs:rounded-2xl max-w-md w-full p-4 xs:p-6 mx-2"
            >
              <div className="flex justify-between items-center mb-4 xs:mb-6">
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900">
                  Contact Us
                </h3>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="bg-gradient-to-t from-red-400 to-red-600"
                >
                  <Close />
                </button>
              </div>

              <form
                onSubmit={handleContactSubmit}
                className="space-y-3 text-black xs:space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <input
                  type="text"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base"
                  required
                />

                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full p-2 xs:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm xs:text-base resize-none"
                  required
                ></textarea>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-2 xs:py-3 px-4 xs:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm xs:text-base"
                >
                  <ContactMail className="text-lg" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  );
};
