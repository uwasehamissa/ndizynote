
/* eslint-disable no-unused-vars */
// components/Footer.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Material Icons
import {
  MusicNote,
  Email,
  Phone,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  CheckCircle,
  Send,
  AccessTime,
  School,
  Help,
  Payment,
  Cookie,
  PrivacyTip,
  MenuBook,
  HeadsetMic,
  LibraryMusic,
  Piano,
  GraphicEq,
  Mic,
  Audiotrack,
  Error,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

// API Configuration
const API_CONFIG = {
  BASE_URL: "https://ndizmusicprojectbackend.onrender.com",
 
};

// Create Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Utility function to handle API requests with Axios
// const apiRequest = async (endpoint, method = "POST", data = null) => {
//   try {
//     const config = {
//       method,
//       url: endpoint,
//       ...(data && { data }),
//     };

//     const response = await apiClient(config);
//     return response.data;
//   } catch (error) {
//     console.error("API Request Error:", error);
    
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       const errorData = error.response.data || {};
//       throw new Error(errorData.message || `API Error: ${error.response.status}`);
//     } else if (error.request) {
//       // The request was made but no response was received
//       throw new Error("No response received from server. Please check your connection.");
//     } else {
//       // Something happened in setting up the request
//       throw new Error(error.message || "Request setup error");
//     }
//   }
// };
 const apiRequest = async (
  endpoint,
  method = "POST",
  data = null
) => {
  try {
    const response = await apiClient({
      url: endpoint,
      method,
      data,
    });

    return {
      success: true,
      message: response.data?.message || "Request successful",
      data: response.data?.data || response.data,
    };
  } catch (error) {
    let message = "Something went wrong";

    if (error.response) {
      message =
        error.response.data?.message ||
        `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      message = "No response from server. Check your internet connection.";
    } else {
      message = error.message;
    }

    return {
      success: false,
      message,
    };
  }
};

// // Newsletter subscription API call
// const subscribeToNewsletter = async (email, metadata = {}) => {
//   const data = {
//     email,
//     timestamp: new Date().toISOString(),
//     userAgent: navigator.userAgent,
//     ...metadata,
//   };

//   return apiRequest(API_CONFIG.NEWSLETTER_ENDPOINT, "POST", data);
// };
 const subscribeToNewsletter = async (email, metadata = {}) => {
  const payload = {
    email,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ...metadata,
  };

  return apiRequest("/newsletter/newsletter", "POST", payload);
};

// Back to Top Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 xsm:w-14 xsm:h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <KeyboardArrowUp className="w-6 h-6 xsm:w-8 xsm:h-8" />
    </motion.button>
  );
};

// Newsletter Component
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Send data to API using Axios
      const response = await subscribeToNewsletter(email);

      setIsSubmitting(false);

      if (response.success) {
        setIsSubscribed(true);
        setEmail("");

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        setError(response.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err.message ||
          "Failed to subscribe. Please check your connection and try again."
      );

      // Auto-clear error after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl p-6 xsm:p-8 sm:p-10 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 xsm:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl xsm:text-3xl sm:text-4xl font-bold mb-3 xsm:mb-4"
            >
              Stay in Tune with Music Updates
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-base xsm:text-lg mb-4 xsm:mb-6 max-w-2xl"
            >
              Subscribe to our newsletter for exclusive music tips, course
              updates, performance opportunities, and special offers delivered
              to your inbox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm xsm:text-base"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Weekly music tips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Exclusive offers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Early access to events</span>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Form */}
          <div className="flex-1 w-full max-w-md">
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-400 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Error className="w-5 h-5 text-red-300" />
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-2" />
                  <h4 className="font-bold text-green-100 mb-1">
                    Welcome to the Music Family!
                  </h4>
                  <p className="text-green-200 text-sm">
                    Thank you for subscribing. Check your email for a welcome
                    gift!
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="relative">
                    <Email className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 xsm:py-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full bg-white text-purple-600 font-bold py-4 xsm:py-5 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress
                          size={20}
                          className="text-purple-600"
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-xs xsm:text-sm text-center mt-4"
            >
              No spam ever. Unsubscribe anytime with one click.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick Links with icons
  const quickLinks = [
    { name: "About Us", href: "/about", icon: <School className="w-4 h-4" /> },
    {
      name: "Our Services",
      href: "/services",
      icon: <HeadsetMic className="w-4 h-4" />,
    },
    {
      name: "Music Classes",
      href: "/classes",
      icon: <LibraryMusic className="w-4 h-4" />,
    },
    {
      name: "Testimonials",
      href: "/testimonials",
      icon: <MenuBook className="w-4 h-4" />,
    },
    {
      name: "Contact Us",
      href: "/contact",
      icon: <Email className="w-4 h-4" />,
    },
  ];

  // Music Programs with icons
  const programs = [
    { name: "Piano Lessons", icon: <Piano className="w-4 h-4" /> },
    { name: "Guitar Training", icon: <GraphicEq className="w-4 h-4" /> },
    { name: "Vocal Coaching", icon: <Mic className="w-4 h-4" /> },
    { name: "Drum Classes", icon: <Audiotrack className="w-4 h-4" /> },
    { name: "Music Theory", icon: <MusicNote className="w-4 h-4" /> },
  ];

  // Support Links with icons
  const supportLinks = [
    { name: "Help Center", href: "/help", icon: <Help className="w-4 h-4" /> },
    { name: "FAQs", href: "/faqs", icon: <Help className="w-4 h-4" /> },
    {
      name: "Privacy Policy",
      href: "/privacy",
      icon: <PrivacyTip className="w-4 h-4" />,
    },
    {
      name: "Terms of Service",
      href: "/terms",
      icon: <MenuBook className="w-4 h-4" />,
    },
    {
      name: "Payment Methods",
      href: "/payment",
      icon: <Payment className="w-4 h-4" />,
    },
  ];

  // Social Media Links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com",
    },
    {
      name: "YouTube",
      icon: <YouTube className="w-6 h-6" />,
      href: "https://youtube.com",
    },
  ];

  return (
    <>
      {/* Back to Top Button */}
      <BackToTopButton />
      
      <footer className="bg-gradient-to-t from-[#123675] to-[#071734] text-white">
        {/* Newsletter Section */}
        <section className="border-b border-gray-800">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 py-12 xsm:py-16 sm:py-20">
            <NewsletterSection />
          </div>
        </section>

        {/* Main Footer Content */}
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6 py-12 xsm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xsm:gap-10 sm:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4 xsm:mb-6">
                <div className="w-10 h-10 xsm:w-12 xsm:h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <MusicNote className="w-6 h-6 xsm:w-7 xsm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white xsm:text-2xl font-bold">
                    NdizyNote Academy
                  </h3>
                  <p className="text-gray-100 text-sm xsm:text-base">
                    Music Excellence
                  </p>
                </div>
              </div>

              <p className="text-gray-100 text-sm xsm:text-base mb-6 leading-relaxed">
                Transforming musical dreams into reality through expert
                instruction, innovative teaching methods, and a passion for
                musical excellence since 2010.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 xsm:space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-100 text-sm xsm:text-base">
                    +250 788 284509
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Email className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-100 text-sm xsm:text-base">
                    info@ndzinote.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <LocationOn className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-100 text-sm xsm:text-base">
                    Gisimenti, Remera - Kigali
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white flex items-center gap-2">
                <MenuBook className="w-5 h-5" />
                Quick Links
              </h4>
              <ul className="space-y-3 xsm:space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group"
                    >
                      <button className="w-full">
                        <span className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Music Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white flex items-center gap-2">
                <LibraryMusic className="w-5 h-5" />
                Music Programs
              </h4>
              <ul className="space-y-3 xsm:space-y-4">
                {programs.map((program, index) => (
                  <li key={index}>
                    <Link
                      to={program.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group"
                    >
                      <span className="flex items-center gap-2">
                        {program.icon}
                        {program.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white flex items-center gap-2">
                <Help className="w-5 h-5" />
                Support
              </h4>
              <ul className="space-y-3 xsm:space-y-4 mb-6 xsm:mb-8">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group">
                      <span className="flex items-center gap-2">
                        {link.icon}
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div>
                <h5 className="text-lg xsm:text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <AccessTime className="w-5 h-5" />
                  Follow Us
                </h5>
                <div className="flex gap-3 xsm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 xsm:w-12 xsm:h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 py-6 xsm:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm xsm:text-base text-center md:text-left">
               <span className="font-bold text-amber-200"> © {currentYear}</span> NdziNote Academy. All rights reserved.
              </p>

              <div className="flex items-center gap-6 text-sm xsm:text-base">
                <Link
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                >
                  <PrivacyTip className="w-4 h-4" />
                  Privacy Policy
                </Link>
                <Link
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                >
                  <MenuBook className="w-4 h-4" />
                  Terms of Service
                </Link>
                <Link
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                >
                  <Cookie className="w-4 h-4" />
                  Cookie Policy
                </Link>
              </div>
            </div>
            {/* Designer Credit - Added to original design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t bg-gradient-to-t from-[#123675] to-[#071734] rounded-2xl text-white"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xs text-white">Designed by</span>
                <span className="text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Leon & Hamissa
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};

// Standalone Newsletter Component for use in other pages
export const NewsletterSignup = ({ className = "", compact = false }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await subscribeToNewsletter(email, {
        campaign: compact ? "compact_newsletter" : "standalone_newsletter",
        page: window.location.pathname,
      });

      setIsSubmitting(false);

      if (response.success) {
        setIsSubscribed(true);
        setEmail("");

        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        setError(response.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || "Failed to subscribe. Please try again.");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div
      className={` rounded-2xl p-6 xsm:p-8 text-white ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl xsm:text-3xl font-bold mb-3 xsm:mb-4">
          Join Our Music Community
        </h3>
        <p className="text-white/90 text-base xsm:text-lg mb-6 xsm:mb-8">
          Get weekly music tips, exclusive offers, and performance opportunities
          delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400 rounded-xl p-3 mb-4 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Error className="w-4 h-4 text-red-300" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center"
            >
              <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-2" />
              <h4 className="font-bold text-green-100 mb-1">Welcome Aboard!</h4>
              <p className="text-green-200 text-sm">
                Thank you for joining our music community!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Email className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !email}
                className="bg-gradient-to-t from-blue-500 to-indigo-500 font-bold py-4 px-6 xsm:px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} className="text-purple-600" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </form>

        <p className="text-white/60 text-xs xsm:text-sm mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};