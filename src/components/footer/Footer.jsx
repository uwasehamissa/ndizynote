// components/Footer.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// SVG Icons
const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const EmailIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LocationIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const LoadingSpinner = ({ className = "w-6 h-6" }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Newsletter Component
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 xsm:p-8 sm:p-10 text-white">
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
              Subscribe to our newsletter for exclusive music tips, course updates, 
              performance opportunities, and special offers delivered to your inbox.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-sm xsm:text-base"
            >
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-300" />
                <span>Weekly music tips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-300" />
                <span>Exclusive offers</span>
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
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center"
                >
                  <CheckIcon className="w-8 h-8 text-green-300 mx-auto mb-2" />
                  <h4 className="font-bold text-green-100 mb-1">Welcome to the Music Family!</h4>
                  <p className="text-green-200 text-sm">
                    Thank you for subscribing. Check your email for a welcome gift!
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="relative">
                    <EmailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 xsm:py-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-purple-600 font-bold py-4 xsm:py-5 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner className="w-5 h-5" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <EmailIcon className="w-5 h-5" />
                        Subscribe Now
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

  // Quick Links
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Music Classes', href: '/classes' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact Us', href: '/contact' }
  ];

  // Music Programs
  const programs = [
    { name: 'Piano Lessons', href: '/classes?instrument=piano' },
    { name: 'Guitar Training', href: '/classes?instrument=guitar' },
    { name: 'Vocal Coaching', href: '/classes?instrument=vocal' },
    { name: 'Drum Classes', href: '/classes?instrument=drums' },
    { name: 'Music Theory', href: '/classes?category=theory' }
  ];

  // Support Links
  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Payment Methods', href: '/payment' }
  ];

  // Social Media Links
  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon className="w-5 h-5" />, href: 'https://facebook.com' },
    { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5" />, href: 'https://instagram.com' },
    { name: 'Twitter', icon: <TwitterIcon className="w-5 h-5" />, href: 'https://twitter.com' },
    { name: 'YouTube', icon: <YoutubeIcon className="w-5 h-5" />, href: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
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
                <MusicNoteIcon className="w-6 h-6 xsm:w-7 xsm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl xsm:text-2xl font-bold">NdziNote Academy</h3>
                <p className="text-gray-400 text-sm xsm:text-base">Music Excellence</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm xsm:text-base mb-6 leading-relaxed">
              Transforming musical dreams into reality through expert instruction, 
              innovative teaching methods, and a passion for musical excellence since 2010.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 xsm:space-y-4">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm xsm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <EmailIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm xsm:text-base">info@ndzinote.com</span>
              </div>
              <div className="flex items-center gap-3">
                <LocationIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm xsm:text-base">123 Music Avenue, Creative City</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 xsm:space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
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
            <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white">Music Programs</h4>
            <ul className="space-y-3 xsm:space-y-4">
              {programs.map((program, index) => (
                <li key={index}>
                  <a 
                    href={program.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {program.name}
                  </a>
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
            <h4 className="text-lg xsm:text-xl font-bold mb-4 xsm:mb-6 text-white">Support</h4>
            <ul className="space-y-3 xsm:space-y-4 mb-6 xsm:mb-8">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm xsm:text-base flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-lg xsm:text-xl font-bold mb-4 text-white">Follow Us</h5>
              <div className="flex gap-3 xsm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
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
              © {currentYear} NdziNote Academy. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm xsm:text-base">
              <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Standalone Newsletter Component for use in other pages
export const NewsletterSignup = ({ className = "" }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className={`bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 xsm:p-8 text-white ${className}`}>
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl xsm:text-3xl font-bold mb-3 xsm:mb-4">
          Join Our Music Community
        </h3>
        <p className="text-white/90 text-base xsm:text-lg mb-6 xsm:mb-8">
          Get weekly music tips, exclusive offers, and performance opportunities delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center"
            >
              <CheckIcon className="w-8 h-8 text-green-300 mx-auto mb-2" />
              <h4 className="font-bold text-green-100 mb-1">Welcome Aboard!</h4>
              <p className="text-green-200 text-sm">
                Thank you for joining our music community!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <EmailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-purple-600 font-bold py-4 px-6 xsm:px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="w-5 h-5" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <EmailIcon className="w-5 h-5" />
                    Subscribe
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