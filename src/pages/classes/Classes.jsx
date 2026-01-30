/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icons (All previous icons remain the same)
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

const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
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

const LoadingIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Video Thumbnail Component with Play Button
const VideoThumbnail = ({
  thumbnail,
  title,
  onClick,
  showPlayButton = true,
}) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
          }}
        />
        
        {/* Play Button Overlay */}
        {showPlayButton && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <PlayIcon className="text-white w-8 h-8" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Video Player Component with Full Controls
const CustomVideoPlayer = ({
  videoId,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const playerRef = useRef(null);
  const settingsRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // YouTube Player API
  useEffect(() => {
    if (window.YT) {
      loadYouTubePlayer();
    } else {
      loadYouTubeAPI();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoId]);

  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = loadYouTubePlayer;
    }
  };

  const loadYouTubePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: autoPlay ? 1 : 0,
        controls: 0,
        disablekb: 0,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        playsinline: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  };

  const onPlayerReady = (event) => {
    setDuration(event.target.getDuration());
    if (autoPlay) {
      event.target.playVideo();
      setIsPlaying(true);
      startTimeUpdateInterval();
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startTimeUpdateInterval();
      setShowControls(true);
      hideControlsAfterDelay();
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowControls(true);
    }
  };

  const onPlayerError = (event) => {
    console.error('YouTube Player Error:', event.data);
  };

  const startTimeUpdateInterval = () => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
        startTimeUpdateInterval();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setVolume(1);
      } else {
        playerRef.current.mute();
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const changePlaybackRate = (rate) => {
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      playerRef.current.setPlaybackRate(rate);
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div 
      ref={containerRef}
      className={`video-player-container relative bg-black rounded-xl overflow-hidden aspect-video ${
        isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen rounded-none' : ''
      }`}
      onMouseMove={() => {
        setShowControls(true);
        if (isPlaying) {
          hideControlsAfterDelay();
        }
      }}
    >
      {/* YouTube Player */}
      <div id="youtube-player" className="w-full h-full"></div>

      {/* Custom Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <h3 className="text-white font-semibold text-lg">Now Playing</h3>
          <div className="flex gap-2">
            {/* Settings Button for Playback Speed */}
            <div className="relative" ref={settingsRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(!showSettings)}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                title="Playback Speed"
              >
                <SettingsIcon className="text-white w-5 h-5" />
              </motion.button>
              
              {/* Playback Speed Dropdown */}
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 min-w-[120px] shadow-xl z-10"
                >
                  <p className="text-white text-sm font-semibold mb-2 px-2">Playback Speed</p>
                  <div className="space-y-1">
                    {playbackRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          playbackRate === rate
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {rate === 1 ? 'Normal' : rate + 'x'}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

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
        {!isPlaying && showControls && (
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
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-transform duration-300 ${
          showControls ? 'translate-y-0' : 'translate-y-full'
        }`}>
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white text-sm font-mono min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleTimeChange}
              className="flex-1 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
            />
            <span className="text-white text-sm font-mono min-w-[40px]">
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
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
                />
              </div>

              {/* Current Playback Speed Display */}
              <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                {playbackRate}x
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
    </div>
  );
};

// Video Modal Component
const VideoModal = ({
  isOpen,
  onClose,
  videoId,
  title,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-black rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white truncate pr-4">{title}</h3>
              <button
                onClick={onClose}
                className="bg-red-600 text-white p-2 rounded-lg transition-colors hover:bg-red-700 flex-shrink-0"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <CustomVideoPlayer
                videoId={videoId}
                autoPlay={true}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
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

// YouTube API Service
class YouTubeService {
  static async searchVideos(query, maxResults = 50) {
    try {
      // For production, you would use YouTube Data API v3
      // const response = await fetch(
      //   `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=YOUR_API_KEY&type=video&order=date`
      // );
      
      // For development/demo purposes, we'll use a simulated response
      // since YouTube API requires an API key
      return this.getMockVideos();
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return this.getMockVideos();
    }
  }

  static getMockVideos() {
    // Mock data for Ndizy note music videos
    const mockVideos = [
      {
        id: { videoId: "U95BLuBzHUI" },
        snippet: {
          title: "Ndizy Music Tutorial - Learn Traditional Notes",
          description: "Complete guide to playing Ndizy music with traditional notes and rhythms",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/U95BLuBzHUI/hqdefault.jpg" }
          },
          channelTitle: "Traditional Music Academy",
          publishedAt: new Date().toISOString()
        }
      },
      {
        id: { videoId: "MWAsMF8-MYU" },
        snippet: {
          title: "Ndizy Note Patterns for Beginners",
          description: "Learn basic Ndizy note patterns and finger techniques",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/MWAsMF8-MYU/hqdefault.jpg" }
          },
          channelTitle: "World Music Lessons",
          publishedAt: new Date(Date.now() - 86400000).toISOString()
        }
      },
      {
        id: { videoId: "4govYaK6uhE" },
        snippet: {
          title: "Advanced Ndizy Music Techniques",
          description: "Master advanced Ndizy playing techniques and complex rhythms",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/4govYaK6uhE/hqdefault.jpg" }
          },
          channelTitle: "Music Masters",
          publishedAt: new Date(Date.now() - 172800000).toISOString()
        }
      },
      {
        id: { videoId: "wSmkugkRxRM" },
        snippet: {
          title: "Ndizy Music for Meditation",
          description: "Soothing Ndizy music compositions for relaxation and meditation",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/wSmkugkRxRM/hqdefault.jpg" }
          },
          channelTitle: "Zen Music Studio",
          publishedAt: new Date(Date.now() - 259200000).toISOString()
        }
      },
      {
        id: { videoId: "YLKKSbvm4PM" },
        snippet: {
          title: "Traditional Ndizy Folk Songs",
          description: "Learn traditional Ndizy folk songs and their cultural significance",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/YLKKSbvm4PM/hqdefault.jpg" }
          },
          channelTitle: "Cultural Heritage Music",
          publishedAt: new Date(Date.now() - 345600000).toISOString()
        }
      },
      {
        id: { videoId: "VuY_IPH5cfg" },
        snippet: {
          title: "Ndizy Note Improvisation Workshop",
          description: "Learn to improvise with Ndizy notes in different musical styles",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/VuY_IPH5cfg/hqdefault.jpg" }
          },
          channelTitle: "Improvisation Masters",
          publishedAt: new Date(Date.now() - 432000000).toISOString()
        }
      },
      {
        id: { videoId: "_pMbamlX0l4" },
        snippet: {
          title: "Modern Ndizy Music Fusion",
          description: "Blending traditional Ndizy music with modern genres",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/_pMbamlX0l4/hqdefault.jpg" }
          },
          channelTitle: "Fusion Music Lab",
          publishedAt: new Date(Date.now() - 518400000).toISOString()
        }
      },
      {
        id: { videoId: "zZAB5EbkbTQ" },
        snippet: {
          title: "Ndizy Music Theory Basics",
          description: "Understanding the music theory behind Ndizy compositions",
          thumbnails: {
            high: { url: "https://img.youtube.com/vi/zZAB5EbkbTQ/hqdefault.jpg" }
          },
          channelTitle: "Music Theory Explained",
          publishedAt: new Date(Date.now() - 604800000).toISOString()
        }
      }
    ];

    return {
      items: mockVideos.sort((a, b) => 
        new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      )
    };
  }
}

export const Classes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const itemsPerPage = 8;

  // Fetch YouTube videos on component mount
  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchQuery = "Ndizy note music";
      const response = await YouTubeService.searchVideos(searchQuery, 50);
      
      if (response && response.items) {
        // Transform YouTube API response to match our class structure
        const transformedVideos = response.items.map((item, index) => ({
          id: `video-${index}`,
          youtubeId: item.id.videoId,
          title: item.snippet.title,
          shortDescription: item.snippet.description || "Watch this Ndizy note music video",
          fullDescription: item.snippet.description || "A beautiful Ndizy note music performance. Learn traditional Ndizy music techniques and enjoy authentic performances.",
          category: "Ndizy",
          level: index % 3 === 0 ? "Beginner" : index % 3 === 1 ? "Intermediate" : "Advanced",
          duration: `${Math.floor(Math.random() * 60) + 5} min`,
          students: Math.floor(Math.random() * 10000) + 1000,
          language: "English",
          rating: (Math.random() * 0.5 + 4.5).toFixed(1),
          thumbnail: item.snippet.thumbnails.high.url,
          tags: ["Ndizy", "Traditional Music", "World Music", "Instrumental"],
          instructor: {
            name: item.snippet.channelTitle,
            title: "Music Educator",
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.snippet.channelTitle)}&background=random`,
            rating: (Math.random() * 0.5 + 4.5).toFixed(1),
            reviews: Math.floor(Math.random() * 1000) + 100,
            bio: "Specialized in traditional Ndizy music with years of teaching experience."
          },
          curriculum: [
            {
              title: "Introduction to Ndizy Music",
              duration: "10 min",
              type: "Video"
            },
            {
              title: "Basic Techniques",
              duration: "15 min",
              type: "Video"
            },
            {
              title: "Practice Exercises",
              duration: "20 min",
              type: "Video"
            }
          ],
          publishedAt: item.snippet.publishedAt
        }));
        
        // Sort by published date (newest first)
        transformedVideos.sort((a, b) => 
          new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        
        setVideos(transformedVideos);
      } else {
        throw new Error('No videos found');
      }
    } catch (err) {
      console.error('Error loading videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Videos", icon: <LibraryIcon className="w-5 h-5" />, count: videos.length },
    { id: "Ndizy", name: "Ndizy Music", icon: <MusicNoteIcon className="w-5 h-5" />, count: videos.length },
    { id: "tutorial", name: "Tutorials", icon: <PlayIcon className="w-5 h-5" />, count: videos.filter(v => v.title.toLowerCase().includes('tutorial')).length },
    { id: "performance", name: "Performances", icon: <MicIcon className="w-5 h-5" />, count: videos.filter(v => v.title.toLowerCase().includes('performance') || v.title.toLowerCase().includes('music')).length }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : selectedCategory === "tutorial"
    ? videos.filter(v => v.title.toLowerCase().includes('tutorial'))
    : selectedCategory === "performance"
    ? videos.filter(v => v.title.toLowerCase().includes('performance') || v.title.toLowerCase().includes('music'))
    : videos;

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVideoThumbnailClick = (videoItem) => {
    if (!videoItem) return;
    setSelectedClass(videoItem);
    setIsVideoModalOpen(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-10 lg:py-14 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white overflow-hidden">
          <div className="absolute inset-0"></div>
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
                className="text-4xl sm:text-5xl text-white lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Latest <span className="text-cyan-300">Ndizy Note Music</span> Videos
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Explore the latest Ndizy note music videos, tutorials, and performances from YouTube. 
                Discover traditional Ndizy music techniques and modern interpretations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center items-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <PlayIcon className="w-5 h-5" />
                    <span className="font-semibold">{videos.length} Videos</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <MusicNoteIcon className="w-5 h-5" />
                    <span className="font-semibold">Traditional & Modern</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white sticky top-20 z-30 shadow-sm">
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
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchYouTubeVideos}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
                Refresh Videos
              </motion.button>
            </div>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <LoadingIcon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Loading Videos...</h3>
                <p className="text-white/70">Fetching latest Ndizy note music videos from YouTube</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-2">Error Loading Videos</h3>
                  <p className="text-white/70 mb-4">{error}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={fetchYouTubeVideos}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Try Again
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {currentVideos.map((video) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Video Thumbnail with Play Button */}
                      <div className="p-4">
                        <VideoThumbnail
                          thumbnail={video.thumbnail}
                          title={video.title}
                          onClick={() => handleVideoThumbnailClick(video)}
                          showPlayButton={true}
                        />
                      </div>

                      {/* Video Content */}
                      <div className="p-4 pt-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              video.level === "Beginner"
                                ? "bg-green-100 text-green-800"
                                : video.level === "Intermediate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {video.level}
                          </span>
                          <span className="text-gray-100 text-sm">
                            {video.duration}
                          </span>
                          {video.publishedAt && (
                            <span className="text-gray-100 text-sm ml-auto">
                              {new Date(video.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-white mb-2 line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-gray-100 text-sm mb-3 line-clamp-2">
                          {video.shortDescription}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <StarIcon className="text-yellow-400 w-4 h-4" />
                            <span className="text-sm text-gray-100">
                              {video.rating}
                            </span>
                            <span className="text-gray-100 text-sm">
                              ({video.students})
                            </span>
                          </div>
                          <span className="text-gray-100 text-sm truncate max-w-[120px]">
                            {video.instructor.name}
                          </span>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleVideoThumbnailClick(video)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                        >
                          Watch Now
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {currentVideos.length === 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <LibraryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">
                      No videos found
                    </h3>
                    <p className="text-gray-500">
                      Try selecting a different category or refresh the videos
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
              </>
            )}
          </div>
        </section>

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId={selectedClass?.youtubeId}
          title={selectedClass?.title}
        />
      </div>
    </>
  );
};