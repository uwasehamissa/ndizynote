import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// SVG Icons
const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HomeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const PianoIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z"/>
  </svg>
);

const GuitarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
  </svg>
);

const MicIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const DrumsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
  </svg>
);

// Floating Music Notes Animation Component
const FloatingMusicNotes = () => {
  const notes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 4 + Math.random() * 3,
    left: Math.random() * 100,
    size: 20 + Math.random() * 30
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          initial={{ 
            opacity: 0,
            y: '100vh',
            x: `${note.left}%`,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: ['100vh', '-100vh'],
            x: `${note.left}%`,
            scale: [0, 1, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: note.duration,
            delay: note.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          className="absolute"
          style={{
            width: note.size,
            height: note.size
          }}
        >
          <MusicNoteIcon className="w-full h-full text-purple-400/30" />
        </motion.div>
      ))}
    </div>
  );
};

// Animated 404 Text Component
const Animated404 = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 100,
          damping: 10,
          duration: 1
        }}
        className="text-8xl xsm:text-9xl sm:text-10xl lg:text-12xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-center"
      >
        404
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-3xl opacity-20 -z-10"
      />
    </div>
  );
};

// Quick Links Component
const QuickLinks = () => {
  const links = [
    {
      icon: <HomeIcon className="w-5 h-5 xsm:w-6 xsm:h-6" />,
      text: 'Home',
      href: '/',
      description: 'Return to homepage'
    },
    {
      icon: <PianoIcon className="w-5 h-5 xsm:w-6 xsm:h-6" />,
      text: 'Classes',
      href: '/classes',
      description: 'Browse music classes'
    },
    {
      icon: <GuitarIcon className="w-5 h-5 xsm:w-6 xsm:h-6" />,
      text: 'Services',
      href: '/services',
      description: 'View our services'
    },
    {
      icon: <MicIcon className="w-5 h-5 xsm:w-6 xsm:h-6" />,
      text: 'Testimonials',
      href: '/testimonials',
      description: 'Read student stories'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xsm:gap-6 max-w-4xl mx-auto">
      {links.map((link, index) => (
        <Link
          key={link.text}
          to={link.href}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            y: -5
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-2xl p-4 xsm:p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 xsm:gap-4 mb-3">
            <div className="w-10 h-10 xsm:w-12 xsm:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
              {link.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base xsm:text-lg group-hover:text-purple-600 transition-colors duration-300">
                {link.text}
              </h3>
              <p className="text-gray-500 text-xs xsm:text-sm">
                {link.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <FloatingMusicNotes />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center relative z-10">
          {/* Main Content */}
          <div className="mb-8 xsm:mb-12 sm:mb-16">
            <Animated404 />
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 xsm:mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="inline-block bg-white rounded-2xl px-6 xsm:px-8 py-4 xsm:py-5 shadow-lg border border-gray-100 mb-6"
            >
              <h1 className="text-2xl xsm:text-3xl sm:text-4xl font-bold text-gray-800 mb-3 xsm:mb-4">
                Oops! Lost the Rhythm
              </h1>
              <p className="text-gray-600 text-base xsm:text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off beat. 
                Don't worry - even the best musicians sometimes hit a wrong note!
              </p>
            </motion.div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 xsm:p-6 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 xsm:gap-4">
                <SearchIcon className="w-6 h-6 xsm:w-8 xsm:h-8 text-yellow-600 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-800 text-sm xsm:text-base mb-1">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-yellow-700 text-xs xsm:text-sm">
                    Try using the search feature or check out our popular pages below.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-8 xsm:mb-12 sm:mb-16"
          >
            <h2 className="text-xl xsm:text-2xl sm:text-3xl font-bold text-gray-800 mb-6 xsm:mb-8">
              Find Your Way Back to the Music
            </h2>
            <QuickLinks />
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 xsm:gap-6 justify-center items-center"
          >
            <Link
              to="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 xsm:py-5 px-8 xsm:px-12 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-base xsm:text-lg"
            >
              <HomeIcon className="w-5 h-5 xsm:w-6 xsm:h-6" />
              Return to Homepage
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="bg-white text-gray-800 font-bold py-4 xsm:py-5 px-8 xsm:px-12 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-base xsm:text-lg"
            >
              <svg className="w-5 h-5 xsm:w-6 xsm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </motion.button>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 xsm:mt-12 text-center"
          >
            <p className="text-gray-500 text-sm xsm:text-base mb-4">
              Still lost? We're here to help you find your way.
            </p>
            <Link
              to="/contact"
              whileHover={{ scale: 1.02 }}
              className="text-purple-600 hover:text-purple-700 font-semibold text-base xsm:text-lg underline underline-offset-4 transition-colors duration-300"
            >
              Contact Support ›
            </Link>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

// Alternative Simple Version for Modal/Drawer use
export const NotFoundMini = ({ onClose }) => {
  return (
    <div className="text-center p-6 xsm:p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6"
      >
        <div className="text-6xl xsm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          404
        </div>
        <h2 className="text-xl xsm:text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-sm xsm:text-base mb-6">
          The requested page couldn't be found.
        </p>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row gap-3 xsm:gap-4 justify-center">
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Close
          </motion.button>
        )}
        <motion.Link
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
        >
          Go Home
        </motion.Link>
      </div>
    </div>
  );
};