/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add Download Icon
const DownloadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

// SVG Icons
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeOffIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const FullscreenIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const LockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z" />
  </svg>
);

const UnlockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const PaymentIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const LibraryIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const PianoIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z" />
  </svg>
);

const GuitarIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" />
  </svg>
);

const MicIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </svg>
);

const DrumsIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
  </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const LoadingSpinner = ({ className = "w-8 h-8" }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const ChevronLeftIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

// Video Thumbnail Component with Play Button
const VideoThumbnail = ({
  thumbnail,
  title,
  onClick,
  isLocked,
  showPlayButton = true,
}) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Play Button Overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <PlayIcon className="text-white w-8 h-8" />
          </motion.div>
        </div>
      )}

      {/* Lock Overlay for Premium Content */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <LockIcon className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-semibold">Premium</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Video Player Component with Full Controls
const CustomVideoPlayer = ({
  videoId,
  isLocked,
  onUnlock,
  autoPlay = false,
  onDownload,
  canDownload = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!isLocked && autoPlay) {
      setIsPlaying(true);
    }
  }, [isLocked, autoPlay]);

  const getYouTubeUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams({
      autoplay: isPlaying && !isLocked ? "1" : "0",
      mute: isMuted ? "1" : "0",
      controls: "0", // We're using custom controls
      modestbranding: "1",
      rel: "0",
      showinfo: "0",
      enablejsapi: "1",
    });

    return `${baseUrl}?${params.toString()}`;
  };

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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleDownload = () => {
    if (canDownload && onDownload) {
      onDownload();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`relative bg-black rounded-xl overflow-hidden aspect-video ${
      isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen rounded-none' : ''
    }`}>
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

      <iframe
        ref={iframeRef}
        src={getYouTubeUrl()}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />

      {/* Custom Controls Overlay */}
      {!isLocked && (
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : ''
          }`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">Now Playing</h3>
            <div className="flex gap-2">
              {canDownload && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDownload}
                  className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                  title="Download Video"
                >
                  <DownloadIcon className="text-white w-5 h-5" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                title="Fullscreen"
              >
                <FullscreenIcon className="text-white w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <PlayIcon className="text-white w-10 h-10" />
              </motion.button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleTimeChange}
                className="flex-1 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-white text-sm font-mono">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <PauseIcon className="text-white w-5 h-5" />
                  ) : (
                    <PlayIcon className="text-white w-5 h-5" />
                  )}
                </motion.button>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    {isMuted ? (
                      <VolumeOffIcon className="text-white w-4 h-4" />
                    ) : (
                      <VolumeIcon className="text-white w-4 h-4" />
                    )}
                  </motion.button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-white text-sm">
                <span>HD</span>
                <span>•</span>
                <span>1080p</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Video Modal Component with Enhanced Controls
const VideoModal = ({
  isOpen,
  onClose,
  videoId,
  title,
  isLocked,
  onUnlock,
  canDownload = false,
  onDownload,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="flex gap-2">
            {canDownload && !isLocked && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
              >
                <DownloadIcon className="w-4 h-4" />
                Download
              </motion.button>
            )}
            <button
              onClick={onClose}
              className="bg-red-600 text-white p-2 rounded-lg transition-colors hover:bg-red-700"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <CustomVideoPlayer
            videoId={videoId}
            isLocked={isLocked}
            onUnlock={onUnlock}
            autoPlay={true}
            onDownload={onDownload}
            canDownload={canDownload}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pricing Modal with Vertical Scroll
const PricingModal = ({ isOpen, onClose, classItem, onConfirmPurchase }) => {
  const [selectedPlan, setSelectedPlan] = useState("single");

  if (!isOpen || !classItem) return null;

  const plans = [
    {
      id: "single",
      name: "Single Class",
      price: classItem.price,
      description: "Lifetime access to this class only",
      features: [
        "Full video access",
        "Downloadable materials",
        "Certificate of completion",
        "Lifetime access to this class",
        "720p video quality",
      ],
      popular: false,
    },
    {
      id: "monthly",
      name: "Monthly Subscription",
      price: "29",
      description: "Access all classes for one month",
      features: [
        "All classes unlocked",
        "New content monthly",
        "Download all videos",
        "Cancel anytime",
        "Priority support",
        "1080p HD video",
      ],
      popular: true,
    },
    {
      id: "annual",
      name: "Annual Subscription",
      price: "299",
      description: "Best value - access all classes for one year",
      features: [
        "All classes unlocked",
        "Save 60%",
        "Download all videos",
        "Priority support",
        "Free updates",
        "Exclusive content",
        "4K video quality",
      ],
      popular: false,
    },
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Choose Your Plan</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-6">
            {/* Class Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
              <img
                src={classItem.thumbnail}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{classItem.title}</h4>
                <p className="text-gray-600 text-sm">
                  {classItem.instructor.name}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  ${classItem.price}
                </p>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 mb-6 text-center text-xl">
                Select Your Subscription Plan
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? "border-purple-600 bg-purple-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h5 className="font-bold text-gray-800 text-lg mb-2">{plan.name}</h5>
                      <p className="text-gray-600 text-sm mb-3">
                        {plan.description}
                      </p>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-purple-600">
                          ${plan.price}
                        </span>
                        {plan.id !== "single" && (
                          <p className="text-gray-500 text-sm">
                            per {plan.id === "monthly" ? "month" : "year"}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <CheckIcon className="text-green-500 w-4 h-4 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className={`text-center p-2 rounded-lg font-semibold ${
                      selectedPlan === plan.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 mb-3">What's Included:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" />
                  High-quality video lessons
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" />
                  Downloadable resources
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" />
                  Certificate of completion
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" />
                  Mobile and TV access
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirmPurchase(classItem, selectedPlan)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-lg"
          >
            <PaymentIcon className="w-5 h-5" />
            Complete Purchase - ${selectedPlan === 'single' ? classItem.price : plans.find(p => p.id === selectedPlan)?.price}
          </motion.button>
          <p className="text-center text-gray-500 text-sm mt-3">
            30-day money-back guarantee • Secure payment
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Class Detail Modal
const ClassDetailModal = ({ isOpen, onClose, classItem, onPurchase }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoLocked, setIsVideoLocked] = useState(true);

  useEffect(() => {
    if (classItem && isOpen) {
      setIsVideoLocked(!classItem.isPurchased);
    }
  }, [classItem, isOpen]);

  if (!isOpen || !classItem) return null;

  const handleUnlock = () => {
    onPurchase(classItem);
  };

  const handleVideoThumbnailClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleDownload = () => {
    alert(`Downloading "${classItem.title}"...`);
  };

  return (
    <>
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
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800">
              {classItem.title}
            </h3>
            <button
              onClick={onClose}
              className="bg-red-600 text-white p-2 rounded-lg transition-colors hover:bg-red-700"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Video Section */}
            <div className="lg:w-1/2 p-6 border-r border-gray-200">
              <VideoThumbnail
                thumbnail={classItem.thumbnail}
                title={classItem.title}
                onClick={handleVideoThumbnailClick}
                isLocked={isVideoLocked}
                showPlayButton={true}
              />

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-purple-600">
                    ${classItem.price}
                  </span>
                  {classItem.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">
                      ${classItem.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {classItem.isPurchased && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                      className="bg-green-600 text-white font-bold py-3 px-4 rounded-xl flex items-center gap-2"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      Download
                    </motion.button>
                  )}
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
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 overflow-y-auto">
              <div className="flex gap-4 mb-6">
                {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                >
                  {activeTab === "overview" && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Class Overview
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {classItem.fullDescription}
                      </p>
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
                          <p className="font-semibold">
                            {classItem.students}+ enrolled
                          </p>
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

                  {activeTab === "curriculum" && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Curriculum
                      </h4>
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
                              <p
                                className={`font-medium ${
                                  item.isLocked && !classItem.isPurchased
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                }`}
                              >
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.duration}
                              </p>
                            </div>
                            {item.isLocked && !classItem.isPurchased ? (
                              <LockIcon className="text-gray-400 w-4 h-4" />
                            ) : (
                              <span className="text-sm text-gray-500">
                                {item.type}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Instructor
                      </h4>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={classItem.instructor.avatar}
                          alt={classItem.instructor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-gray-800">
                            {classItem.instructor.name}
                          </h5>
                          <p className="text-gray-600">
                            {classItem.instructor.title}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <StarIcon className="text-yellow-400 w-4 h-4" />
                            <span className="text-sm text-gray-600">
                              {classItem.instructor.rating} (
                              {classItem.instructor.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {classItem.instructor.bio}
                      </p>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Student Reviews
                      </h4>
                      <div className="space-y-4">
                        {classItem.reviews.map((review, index) => (
                          <div key={index} className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-3 mb-2">
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h5 className="font-semibold">{review.name}</h5>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                            <p className="text-gray-400 text-xs mt-2">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={classItem.youtubeId}
        title={classItem.title}
        isLocked={isVideoLocked}
        onUnlock={handleUnlock}
        canDownload={classItem.isPurchased}
        onDownload={handleDownload}
      />
    </>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
            currentPage === i
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </motion.button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Previous
      </motion.button>

      {renderPageNumbers()}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
      >
        Next
        <ChevronRightIcon className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export const Classes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [purchasedClasses, setPurchasedClasses] = useState(["class1", "class3"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Complete Class Objects with Real YouTube Videos
  const classes = [
    {
      id: "class1",
      title: "Piano Fundamentals for Beginners",
      shortDescription:
        "Learn the basics of piano playing with proper technique and foundational skills.",
      fullDescription:
        "This comprehensive beginner piano course will take you from never touching a piano to playing your first songs with confidence. We cover proper hand positioning, basic music theory, reading sheet music, and essential techniques that every pianist needs.",
      instructor: {
        name: "Sarah Chen",
        title: "Concert Pianist & Educator",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 1274,
        bio: "Sarah has been teaching piano for over 15 years and has performed in prestigious venues worldwide.",
      },
      category: "piano",
      level: "Beginner",
      duration: "8 hours",
      price: 89,
      originalPrice: 129,
      students: 2347,
      language: "English",
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=200&fit=crop",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Music Theory", "Hand Positioning", "Sight Reading"],
      curriculum: [
        {
          title: "Introduction to Piano",
          duration: "15 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Proper Hand Position",
          duration: "20 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Reading Sheet Music",
          duration: "30 min",
          type: "Video",
          isLocked: true,
        },
        {
          title: "Basic Scales",
          duration: "25 min",
          type: "Video",
          isLocked: true,
        },
        {
          title: "Your First Song",
          duration: "40 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: true,
    },
    {
      id: "class2",
      title: "Advanced Guitar Soloing Techniques",
      shortDescription:
        "Master lead guitar and improvisation with professional soloing techniques.",
      fullDescription:
        "Take your guitar playing to the next level with advanced soloing techniques used by professional musicians. Learn scales, modes, phrasing, and improvisation strategies that will make you stand out as a lead guitarist.",
      instructor: {
        name: "Marcus Johnson",
        title: "Studio Musician & Guitar Virtuoso",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 892,
        bio: "Marcus has recorded with major artists and brings 20 years of professional experience.",
      },
      category: "guitar",
      level: "Advanced",
      duration: "12 hours",
      price: 149,
      students: 1563,
      language: "English",
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1558098329-a11cff621064?w=300&h=200&fit=crop",
      youtubeId: "9bZkp7q19f0",
      tags: ["Improvisation", "Scales", "Music Theory"],
      curriculum: [
        {
          title: "Scale Mastery",
          duration: "45 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Modes Explained",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
        {
          title: "Phrasing Techniques",
          duration: "50 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class3",
      title: "Vocal Range Expansion Masterclass",
      shortDescription:
        "Expand your vocal range safely and effectively with proven techniques.",
      fullDescription:
        "Discover the secrets to expanding your vocal range without straining your voice. This masterclass covers proper breathing, vocal exercises, and techniques used by professional singers to achieve impressive range and control.",
      instructor: {
        name: "Elena Rodriguez",
        title: "Vocal Coach & Opera Singer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 2103,
        bio: "Elena has trained Grammy-winning artists and specializes in vocal health and technique.",
      },
      category: "vocal",
      level: "All Levels",
      duration: "6 hours",
      price: 99,
      students: 3189,
      language: "English",
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop",
      youtubeId: "JGwWNGJdvx8",
      tags: ["Vocal Health", "Breathing", "Range Expansion"],
      curriculum: [
        {
          title: "Vocal Anatomy",
          duration: "20 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Breathing Techniques",
          duration: "25 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Range Expansion Exercises",
          duration: "40 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: true,
    },
    {
      id: "class4",
      title: "Drumming Fundamentals & Rhythms",
      shortDescription:
        "Build solid drumming foundations and master essential rhythms.",
      fullDescription:
        "Start your drumming journey with proper technique and essential rhythms. This course covers everything from basic stick control to complex rhythmic patterns used in various music genres.",
      instructor: {
        name: "David Kim",
        title: "Session Drummer & Educator",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 745,
        bio: "David has toured internationally and brings practical experience from the music industry.",
      },
      category: "drums",
      level: "Beginner",
      duration: "10 hours",
      price: 79,
      originalPrice: 99,
      students: 1892,
      language: "English",
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1519892300165-cb5542fb8c43?w=300&h=200&fit=crop",
      youtubeId: "L_jWHffIx5E",
      tags: ["Rhythm", "Stick Control", "Coordination"],
      curriculum: [
        {
          title: "Drum Set Basics",
          duration: "30 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Basic Rhythms",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class5",
      title: "Music Theory Essentials",
      shortDescription:
        "Master the fundamentals of music theory in a practical, easy-to-understand way.",
      fullDescription:
        "This course breaks down complex music theory concepts into simple, practical lessons. Learn scales, chords, progressions, and harmony that you can immediately apply to your instrument.",
      instructor: {
        name: "Dr. Michael Roberts",
        title: "Music Professor & Composer",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 1567,
        bio: "Dr. Roberts has taught music theory for 20 years and composed for major film productions.",
      },
      category: "theory",
      level: "Beginner",
      duration: "10 hours",
      price: 119,
      students: 2890,
      language: "English",
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop",
      youtubeId: "oyEuk8j8imI",
      tags: ["Scales", "Chords", "Harmony", "Ear Training"],
      curriculum: [
        {
          title: "Introduction to Notes",
          duration: "20 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Major & Minor Scales",
          duration: "30 min",
          type: "Video",
          isLocked: true,
        },
        {
          title: "Chord Construction",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    // Adding more classes to demonstrate pagination
    {
      id: "class6",
      title: "Jazz Piano Improvisation",
      shortDescription:
        "Learn the art of jazz improvisation on piano with advanced techniques.",
      fullDescription:
        "Dive deep into jazz piano improvisation with this comprehensive course covering chord voicings, scales, and rhythmic concepts used by jazz masters.",
      instructor: {
        name: "Robert Davis",
        title: "Jazz Pianist & Composer",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 892,
        bio: "Robert has performed at major jazz festivals worldwide and released multiple acclaimed albums.",
      },
      category: "piano",
      level: "Intermediate",
      duration: "15 hours",
      price: 159,
      students: 1245,
      language: "English",
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Jazz", "Improvisation", "Chord Voicings"],
      curriculum: [
        {
          title: "Jazz Harmony Basics",
          duration: "25 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Walking Bass Lines",
          duration: "30 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class7",
      title: "Classical Guitar Mastery",
      shortDescription:
        "Master classical guitar techniques and repertoire from beginner to advanced.",
      fullDescription:
        "This comprehensive classical guitar course covers everything from basic fingerpicking to advanced repertoire and performance techniques.",
      instructor: {
        name: "Maria Gonzalez",
        title: "Classical Guitarist",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 678,
        bio: "Maria has won international guitar competitions and teaches at the conservatory level.",
      },
      category: "guitar",
      level: "All Levels",
      duration: "20 hours",
      price: 179,
      students: 956,
      language: "English",
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1564186763535-ebb21c52731e?w=300&h=200&fit=crop",
      youtubeId: "9bZkp7q19f0",
      tags: ["Classical", "Fingerstyle", "Repertoire"],
      curriculum: [
        {
          title: "Right Hand Technique",
          duration: "20 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Basic Repertoire",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class8",
      title: "Electronic Music Production",
      shortDescription:
        "Create professional electronic music with modern production techniques.",
      fullDescription:
        "Learn electronic music production from the ground up, covering synthesis, mixing, mastering, and arrangement for various electronic genres.",
      instructor: {
        name: "Alex Thompson",
        title: "Electronic Music Producer",
        avatar:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 1342,
        bio: "Alex has produced tracks for major labels and teaches music production at the university level.",
      },
      category: "production",
      level: "Beginner",
      duration: "18 hours",
      price: 199,
      students: 2876,
      language: "English",
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=200&fit=crop",
      youtubeId: "JGwWNGJdvx8",
      tags: ["Production", "Synthesis", "Mixing"],
      curriculum: [
        {
          title: "DAW Basics",
          duration: "30 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Sound Design",
          duration: "45 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class9",
      title: "Songwriting & Composition",
      shortDescription:
        "Learn the craft of songwriting and composition across various genres.",
      fullDescription:
        "This course covers the complete songwriting process from inspiration to finished composition, including melody, harmony, lyrics, and arrangement.",
      instructor: {
        name: "Lisa Morgan",
        title: "Songwriter & Composer",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 923,
        bio: "Lisa has written songs for major artists and her compositions have been featured in films and TV.",
      },
      category: "composition",
      level: "Intermediate",
      duration: "14 hours",
      price: 149,
      students: 1678,
      language: "English",
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=200&fit=crop",
      youtubeId: "L_jWHffIx5E",
      tags: ["Songwriting", "Composition", "Lyrics"],
      curriculum: [
        {
          title: "Melody Writing",
          duration: "25 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Lyric Crafting",
          duration: "30 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class10",
      title: "Music Business & Marketing",
      shortDescription:
        "Navigate the music industry and learn effective marketing strategies.",
      fullDescription:
        "Learn how to build your music career with practical business knowledge, marketing strategies, and industry insights from experienced professionals.",
      instructor: {
        name: "James Wilson",
        title: "Music Industry Executive",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.6,
        reviews: 756,
        bio: "James has worked with major record labels and helps artists build sustainable careers.",
      },
      category: "business",
      level: "All Levels",
      duration: "12 hours",
      price: 129,
      students: 1987,
      language: "English",
      rating: 4.5,
      thumbnail:
        "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=300&h=200&fit=crop",
      youtubeId: "oyEuk8j8imI",
      tags: ["Business", "Marketing", "Industry"],
      curriculum: [
        {
          title: "Building Your Brand",
          duration: "20 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Digital Marketing",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class11",
      title: "Orchestration Techniques",
      shortDescription:
        "Learn professional orchestration techniques for film and concert music.",
      fullDescription:
        "Master the art of orchestration with this comprehensive course covering instrument ranges, combinations, and scoring techniques used in professional productions.",
      instructor: {
        name: "Dr. Emily Chen",
        title: "Orchestrator & Composer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 543,
        bio: "Dr. Chen has orchestrated for major film scores and teaches at a prestigious music conservatory.",
      },
      category: "composition",
      level: "Advanced",
      duration: "16 hours",
      price: 219,
      students: 876,
      language: "English",
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1571974599782-87624638275f?w=300&h=200&fit=crop",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Orchestration", "Scoring", "Arrangement"],
      curriculum: [
        {
          title: "String Section",
          duration: "40 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Woodwind Combinations",
          duration: "35 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
    {
      id: "class12",
      title: "Live Sound Engineering",
      shortDescription:
        "Master the art of live sound engineering for concerts and events.",
      fullDescription:
        "Learn professional live sound engineering techniques including system setup, mixing, and troubleshooting for various types of live events.",
      instructor: {
        name: "Mike Rodriguez",
        title: "Live Sound Engineer",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 634,
        bio: "Mike has engineered live sound for major touring acts and large-scale music festivals.",
      },
      category: "production",
      level: "Intermediate",
      duration: "13 hours",
      price: 169,
      students: 1123,
      language: "English",
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=200&fit=crop",
      youtubeId: "9bZkp7q19f0",
      tags: ["Live Sound", "Mixing", "Audio Engineering"],
      curriculum: [
        {
          title: "PA System Setup",
          duration: "30 min",
          type: "Video",
          isLocked: false,
        },
        {
          title: "Live Mixing Techniques",
          duration: "45 min",
          type: "Video",
          isLocked: true,
        },
      ],
      isPurchased: false,
    },
  ];

  const categories = [
    { id: "all", name: "All Classes", icon: <LibraryIcon className="w-5 h-5" />, count: classes.length },
    { id: "piano", name: "Piano", icon: <PianoIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "piano").length },
    { id: "guitar", name: "Guitar", icon: <GuitarIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "guitar").length },
    { id: "vocal", name: "Vocal", icon: <MicIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "vocal").length },
    { id: "drums", name: "Drums", icon: <DrumsIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "drums").length },
    { id: "theory", name: "Theory", icon: <MusicNoteIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "theory").length },
    { id: "production", name: "Production", icon: <MusicNoteIcon className="w-5 h-5" />, count: classes.filter((c) => c.category === "production").length },
  ];

  const filteredClasses = selectedCategory === "all" ? classes : classes.filter((c) => c.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // For first page, show all classes as free preview
  const currentClasses = filteredClasses.slice(startIndex, startIndex + itemsPerPage).map((classItem) => {
    if (currentPage === 1) {
      return { ...classItem, isPurchased: true }; // Free preview on first page
    } else {
      return { 
        ...classItem, 
        isPurchased: purchasedClasses.includes(classItem.id) 
      };
    }
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClassClick = (classItem) => {
    if (!classItem) return;
    const isPurchased = currentPage === 1 ? true : purchasedClasses.includes(classItem.id);
    setSelectedClass({ ...classItem, isPurchased });
    setIsDetailModalOpen(true);
  };

  const handlePurchaseClick = (classItem) => {
    if (!classItem) return;
    setSelectedClass(classItem);
    setIsPricingModalOpen(true);
  };

  const handleVideoThumbnailClick = (classItem) => {
    if (!classItem) return;
    const isPurchased = currentPage === 1 ? true : purchasedClasses.includes(classItem.id);
    setSelectedClass({ ...classItem, isPurchased });
    setIsVideoModalOpen(true);
  };

  const handleConfirmPurchase = (classItem, plan) => {
    setPurchasedClasses((prev) => [...prev, classItem.id]);
    setIsPricingModalOpen(false);
    setIsDetailModalOpen(false);
    setIsVideoModalOpen(false);
    console.log(`Purchased ${classItem.title} with ${plan} plan`);
  };

  const handleDownload = (classItem) => {
    if (!classItem) return;
    alert(`Starting download for: ${classItem.title}\n\nThis would typically download the video file in a real application.`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
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
                {currentPage === 1 
                  ? "Free Preview - Explore our classes! Page 2+ requires subscription for full access and downloads."
                  : "Premium Content - Subscribe to access all videos and download features."
                }
              </motion.p>
              {currentPage > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-semibold inline-block"
                >
                  🔒 Premium Content - Subscription Required
                </motion.div>
              )}
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
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

        {/* Page Indicator */}
        <section className="py-4 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <span className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === 1 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {currentPage === 1 ? '🎵 Free Preview Page' : '⭐ Premium Content Page'} 
                (Page {currentPage} of {totalPages})
              </span>
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
              {currentClasses.map((classItem) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Premium Badge for Page 2+ */}
                  {currentPage > 1 && !classItem.isPurchased && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                        PREMIUM
                      </span>
                    </div>
                  )}

                  {/* Video Thumbnail with Play Button */}
                  <div className="p-4">
                    <VideoThumbnail
                      thumbnail={classItem.thumbnail}
                      title={classItem.title}
                      onClick={() => handleVideoThumbnailClick(classItem)}
                      isLocked={!classItem.isPurchased}
                      showPlayButton={true}
                    />
                  </div>

                  {/* Class Content */}
                  <div className="p-4 pt-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          classItem.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : classItem.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {classItem.level}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {classItem.duration}
                      </span>
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
                        <span className="text-sm text-gray-600">
                          {classItem.rating}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({classItem.students})
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {classItem.instructor.name}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClassClick(classItem)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                      >
                        View Details
                      </motion.button>
                      {!classItem.isPurchased && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePurchaseClick(classItem)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingCartIcon className="w-4 h-4" />
                          Subscribe
                        </motion.button>
                      )}
                      {classItem.isPurchased && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownload(classItem)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <DownloadIcon className="w-4 h-4" />
                          Download
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {currentClasses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <LibraryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  No classes found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category
                </p>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>

        {/* Modals */}
        <ClassDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          classItem={selectedClass}
          onPurchase={handlePurchaseClick}
        />

        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          classItem={selectedClass}
          onConfirmPurchase={handleConfirmPurchase}
        />

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId={selectedClass?.youtubeId}
          title={selectedClass?.title}
          isLocked={!selectedClass?.isPurchased}
          onUnlock={() => selectedClass && handlePurchaseClick(selectedClass)}
          canDownload={selectedClass?.isPurchased}
          onDownload={() => selectedClass && handleDownload(selectedClass)}
        />
      </div>
    </>
  );
};