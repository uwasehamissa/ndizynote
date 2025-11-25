// pages/Classes.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const VolumeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const LockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const UnlockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const PaymentIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
  </svg>
);

const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const LibraryIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
  </svg>
);

const PianoIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z"/>
  </svg>
);

const GuitarIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
  </svg>
);

const MicIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const DrumsIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
  </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
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

const LoadingSpinner = ({ className = "w-8 h-8" }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Video Player Component
const VideoPlayer = ({ src, isLocked, onUnlock }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (isLocked) {
      onUnlock();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center text-white">
            <LockIcon className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Premium Content</h3>
            <p className="text-gray-300 mb-4">Subscribe to access this video</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnlock}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 mx-auto"
            >
              <PaymentIcon className="w-5 h-5" />
              Unlock Video
            </motion.button>
          </div>
        </div>
      ) : null}
      
      <video
        src={src}
        className="w-full h-full object-cover"
        controls={!isLocked && isPlaying}
        autoPlay={isPlaying && !isLocked}
        muted={isMuted}
        onClick={togglePlay}
      />
      
      {!isPlaying && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <PlayIcon className="text-white w-8 h-8" />
          </motion.div>
        </div>
      )}
      
      {!isLocked && isPlaying && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
          >
            <VolumeIcon className="text-white w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Class Detail Modal
const ClassDetailModal = ({ isOpen, onClose, classItem, onPurchase }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoLocked, setIsVideoLocked] = useState(true);

  // Reset video locked state when classItem changes
  useEffect(() => {
    if (classItem) {
      setIsVideoLocked(!classItem.isPurchased);
    }
  }, [classItem]);

  // Safety check - don't render if not open or no class item
  if (!isOpen) return null;

  // Show loading state if classItem is null
  if (!classItem) {
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
          className="bg-white rounded-2xl p-8 text-center max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <LoadingSpinner className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Class...</h3>
          <p className="text-gray-600">Please wait while we load the class details.</p>
        </motion.div>
      </motion.div>
    );
  }

  const handleUnlock = () => {
    onPurchase(classItem);
  };

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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">{classItem.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Video Section */}
          <div className="lg:w-1/2 p-6">
            <VideoPlayer
              src={classItem.videoUrl}
              isLocked={isVideoLocked}
              onUnlock={handleUnlock}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-purple-600">${classItem.price}</span>
                {classItem.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">${classItem.originalPrice}</span>
                )}
              </div>
              {!classItem.isPurchased && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUnlock}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Purchase Class
                </motion.button>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 border-l border-gray-200">
            <div className="flex gap-4 mb-6">
              {['overview', 'curriculum', 'instructor'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-h-96 overflow-y-auto"
              >
                {activeTab === 'overview' && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Class Overview</h4>
                    <p className="text-gray-600 mb-4">{classItem.fullDescription}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-semibold">{classItem.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Level:</span>
                        <p className="font-semibold">{classItem.level}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Students:</span>
                        <p className="font-semibold">{classItem.students}+ enrolled</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Language:</span>
                        <p className="font-semibold">{classItem.language}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {classItem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Curriculum</h4>
                    <div className="space-y-3">
                      {classItem.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          {item.isLocked && !classItem.isPurchased ? (
                            <LockIcon className="text-gray-400 w-5 h-5" />
                          ) : (
                            <CheckIcon className="text-green-500 w-5 h-5" />
                          )}
                          <div className="flex-1">
                            <p className={`font-medium ${item.isLocked && !classItem.isPurchased ? 'text-gray-400' : 'text-gray-800'}`}>
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500">{item.duration}</p>
                          </div>
                          {item.isLocked && !classItem.isPurchased ? (
                            <LockIcon className="text-gray-400 w-4 h-4" />
                          ) : (
                            <span className="text-sm text-gray-500">{item.type}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Instructor</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={classItem.instructor.avatar}
                        alt={classItem.instructor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-gray-800">{classItem.instructor.name}</h5>
                        <p className="text-gray-600">{classItem.instructor.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <StarIcon className="text-yellow-400 w-4 h-4" />
                          <span className="text-sm text-gray-600">
                            {classItem.instructor.rating} ({classItem.instructor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{classItem.instructor.bio}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Purchase Modal
const PurchaseModal = ({ isOpen, onClose, classItem, onConfirmPurchase }) => {
  const [selectedPlan, setSelectedPlan] = useState('single');

  // Safety check - don't render if not open or no class item
  if (!isOpen) return null;

  // Show loading state if classItem is null
  if (!classItem) {
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
          className="bg-white rounded-2xl p-8 text-center max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <LoadingSpinner className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Purchase...</h3>
          <p className="text-gray-600">Please wait while we prepare your purchase.</p>
        </motion.div>
      </motion.div>
    );
  }

  const plans = [
    {
      id: 'single',
      name: 'Single Class',
      price: classItem.price,
      description: 'Lifetime access to this class only',
      features: ['Full video access', 'Downloadable materials', 'Certificate of completion']
    },
    {
      id: 'monthly',
      name: 'Monthly Subscription',
      price: '49',
      description: 'Access all classes for one month',
      features: ['All classes unlocked', 'New content monthly', 'Cancel anytime']
    },
    {
      id: 'annual',
      name: 'Annual Subscription',
      price: '399',
      description: 'Best value - access all classes for one year',
      features: ['All classes unlocked', 'Save 30%', 'Priority support', 'Free updates']
    }
  ];

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
        className="bg-white rounded-2xl max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Purchase Class</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={classItem.thumbnail}
              alt={classItem.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-bold text-gray-800">{classItem.title}</h4>
              <p className="text-gray-600 text-sm">{classItem.instructor.name}</p>
              <p className="text-2xl font-bold text-purple-600">${classItem.price}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-4">Choose Your Plan</h4>
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold text-gray-800">{plan.name}</h5>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-purple-600">${plan.price}</span>
                      {plan.id !== 'single' && (
                        <p className="text-gray-500 text-sm">per {plan.id === 'monthly' ? 'month' : 'year'}</p>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckIcon className="text-green-500 w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirmPurchase(classItem, selectedPlan)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <PaymentIcon className="w-5 h-5" />
            Complete Purchase
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Classes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchasedClasses, setPurchasedClasses] = useState(['class1', 'class3']);

  // Sample classes data
  const classes = [
    {
      id: 'class1',
      title: 'Piano Fundamentals for Beginners',
      shortDescription: 'Learn the basics of piano playing with proper technique and foundational skills.',
      fullDescription: 'This comprehensive beginner piano course will take you from never touching a piano to playing your first songs with confidence. We cover proper hand positioning, basic music theory, reading sheet music, and essential techniques that every pianist needs.',
      instructor: {
        name: 'Sarah Chen',
        title: 'Concert Pianist & Educator',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviews: 1274,
        bio: 'Sarah has been teaching piano for over 15 years and has performed in prestigious venues worldwide.'
      },
      category: 'piano',
      level: 'Beginner',
      duration: '8 hours',
      price: 89,
      originalPrice: 129,
      students: 2347,
      language: 'English',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=200&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['Music Theory', 'Hand Positioning', 'Sight Reading'],
      curriculum: [
        { title: 'Introduction to Piano', duration: '15 min', type: 'Video', isLocked: false },
        { title: 'Proper Hand Position', duration: '20 min', type: 'Video', isLocked: false },
        { title: 'Reading Sheet Music', duration: '30 min', type: 'Video', isLocked: true },
        { title: 'Basic Scales', duration: '25 min', type: 'Video', isLocked: true },
        { title: 'Your First Song', duration: '40 min', type: 'Video', isLocked: true }
      ],
      isPurchased: true
    },
    {
      id: 'class2',
      title: 'Advanced Guitar Soloing Techniques',
      shortDescription: 'Master lead guitar and improvisation with professional soloing techniques.',
      fullDescription: 'Take your guitar playing to the next level with advanced soloing techniques used by professional musicians. Learn scales, modes, phrasing, and improvisation strategies that will make you stand out as a lead guitarist.',
      instructor: {
        name: 'Marcus Johnson',
        title: 'Studio Musician & Guitar Virtuoso',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviews: 892,
        bio: 'Marcus has recorded with major artists and brings 20 years of professional experience.'
      },
      category: 'guitar',
      level: 'Advanced',
      duration: '12 hours',
      price: 149,
      students: 1563,
      language: 'English',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1558098329-a11cff621064?w=300&h=200&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['Improvisation', 'Scales', 'Music Theory'],
      curriculum: [
        { title: 'Scale Mastery', duration: '45 min', type: 'Video', isLocked: false },
        { title: 'Modes Explained', duration: '35 min', type: 'Video', isLocked: true },
        { title: 'Phrasing Techniques', duration: '50 min', type: 'Video', isLocked: true }
      ],
      isPurchased: false
    },
    {
      id: 'class3',
      title: 'Vocal Range Expansion Masterclass',
      shortDescription: 'Expand your vocal range safely and effectively with proven techniques.',
      fullDescription: 'Discover the secrets to expanding your vocal range without straining your voice. This masterclass covers proper breathing, vocal exercises, and techniques used by professional singers to achieve impressive range and control.',
      instructor: {
        name: 'Elena Rodriguez',
        title: 'Vocal Coach & Opera Singer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviews: 2103,
        bio: 'Elena has trained Grammy-winning artists and specializes in vocal health and technique.'
      },
      category: 'vocal',
      level: 'All Levels',
      duration: '6 hours',
      price: 99,
      students: 3189,
      language: 'English',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['Vocal Health', 'Breathing', 'Range Expansion'],
      curriculum: [
        { title: 'Vocal Anatomy', duration: '20 min', type: 'Video', isLocked: false },
        { title: 'Breathing Techniques', duration: '25 min', type: 'Video', isLocked: false },
        { title: 'Range Expansion Exercises', duration: '40 min', type: 'Video', isLocked: true }
      ],
      isPurchased: true
    },
    {
      id: 'class4',
      title: 'Drumming Fundamentals & Rhythms',
      shortDescription: 'Build solid drumming foundations and master essential rhythms.',
      fullDescription: 'Start your drumming journey with proper technique and essential rhythms. This course covers everything from basic stick control to complex rhythmic patterns used in various music genres.',
      instructor: {
        name: 'David Kim',
        title: 'Session Drummer & Educator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        reviews: 745,
        bio: 'David has toured internationally and brings practical experience from the music industry.'
      },
      category: 'drums',
      level: 'Beginner',
      duration: '10 hours',
      price: 79,
      originalPrice: 99,
      students: 1892,
      language: 'English',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1519892300165-cb5542fb8c43?w=300&h=200&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['Rhythm', 'Stick Control', 'Coordination'],
      curriculum: [
        { title: 'Drum Set Basics', duration: '30 min', type: 'Video', isLocked: false },
        { title: 'Basic Rhythms', duration: '35 min', type: 'Video', isLocked: true }
      ],
      isPurchased: false
    },
    {
      id: 'class5',
      title: 'Music Theory Essentials',
      shortDescription: 'Master the fundamentals of music theory in a practical, easy-to-understand way.',
      fullDescription: 'This course breaks down complex music theory concepts into simple, practical lessons. Learn scales, chords, progressions, and harmony that you can immediately apply to your instrument.',
      instructor: {
        name: 'Dr. Michael Roberts',
        title: 'Music Professor & Composer',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviews: 1567,
        bio: 'Dr. Roberts has taught music theory for 20 years and composed for major film productions.'
      },
      category: 'theory',
      level: 'Beginner',
      duration: '10 hours',
      price: 119,
      students: 2890,
      language: 'English',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['Scales', 'Chords', 'Harmony', 'Ear Training'],
      curriculum: [
        { title: 'Introduction to Notes', duration: '20 min', type: 'Video', isLocked: false },
        { title: 'Major & Minor Scales', duration: '30 min', type: 'Video', isLocked: true },
        { title: 'Chord Construction', duration: '35 min', type: 'Video', isLocked: true }
      ],
      isPurchased: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Classes', icon: <LibraryIcon className="w-5 h-5" />, count: classes.length },
    { id: 'piano', name: 'Piano', icon: <PianoIcon className="w-5 h-5" />, count: classes.filter(c => c.category === 'piano').length },
    { id: 'guitar', name: 'Guitar', icon: <GuitarIcon className="w-5 h-5" />, count: classes.filter(c => c.category === 'guitar').length },
    { id: 'vocal', name: 'Vocal', icon: <MicIcon className="w-5 h-5" />, count: classes.filter(c => c.category === 'vocal').length },
    { id: 'drums', name: 'Drums', icon: <DrumsIcon className="w-5 h-5" />, count: classes.filter(c => c.category === 'drums').length },
    { id: 'theory', name: 'Theory', icon: <MusicNoteIcon className="w-5 h-5" />, count: classes.filter(c => c.category === 'theory').length }
  ];

  const filteredClasses = selectedCategory === 'all' 
    ? classes 
    : classes.filter(c => c.category === selectedCategory);

  const handleClassClick = (classItem) => {
    if (!classItem) return;
    
    const isPurchased = purchasedClasses.includes(classItem.id);
    setSelectedClass({ ...classItem, isPurchased });
    setIsDetailModalOpen(true);
  };

  const handlePurchaseClick = (classItem) => {
    if (!classItem) return;
    
    setSelectedClass(classItem);
    setIsPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = (classItem, plan) => {
    setPurchasedClasses(prev => [...prev, classItem.id]);
    setIsPurchaseModalOpen(false);
    setIsDetailModalOpen(false);
    
    console.log(`Purchased ${classItem.title} with ${plan} plan`);
    // In a real app, you would call your payment API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-10 left-10 opacity-10">
          <MusicNoteIcon className="w-16 h-16" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <LibraryIcon className="w-16 h-16" />
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
              Online <span className="text-cyan-300">Music Classes</span>
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Learn from world-class instructors with our comprehensive video courses. 
              Master your instrument at your own pace with professional guidance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
                <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredClasses.map((classItem) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleClassClick(classItem)}
              >
                {/* Class Thumbnail with Lock Badge */}
                <div className="relative">
                  <img
                    src={classItem.thumbnail}
                    alt={classItem.title}
                    className="w-full h-48 object-cover"
                  />
                  {!classItem.isPurchased && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      <LockIcon className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                  {classItem.isPurchased && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      <CheckIcon className="w-3 h-3" />
                      Purchased
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${classItem.price}
                  </div>
                </div>

                {/* Class Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      classItem.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      classItem.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {classItem.level}
                    </span>
                    <span className="text-gray-500 text-sm">{classItem.duration}</span>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                    {classItem.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {classItem.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="text-yellow-400 w-4 h-4" />
                      <span className="text-sm text-gray-600">{classItem.rating}</span>
                      <span className="text-gray-400 text-sm">({classItem.students})</span>
                    </div>
                    <span className="text-gray-500 text-sm">{classItem.instructor.name}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClassClick(classItem);
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </motion.button>
                    {!classItem.isPurchased && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchaseClick(classItem);
                        }}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        Buy
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredClasses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <LibraryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No classes found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Musical Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students learning music with our expert-led video courses. 
              Transform your skills from anywhere, at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Browse All Classes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Subscription Plans
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">
                <EmailIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">info@ndzinote.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                <LocationIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Music Avenue, Creative City</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ClassDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        classItem={selectedClass}
        onPurchase={handlePurchaseClick}
      />

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        classItem={selectedClass}
        onConfirmPurchase={handleConfirmPurchase}
      />
    </div>
  );
};