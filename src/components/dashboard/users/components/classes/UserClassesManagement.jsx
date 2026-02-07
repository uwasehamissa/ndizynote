/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Close,
  DashboardCustomize,
  Delete,
  Download,
  Email,
  FaceUnlockOutlined,
  FilterList,
  FourGPlusMobiledata,
  LocalDining,
  Lock,
  Mic,
  MusicNote,
  Pause,
  People,
  PersonAdd,
  PlayArrow,
  Search,
  Settings,
  Star,
  SupervisedUserCircle,
  TimeToLeave,
  VideoCall,
  Visibility,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";

// Material Icons
const PlayIcon = () => (
  <span className="material-icons">
    <PlayArrow />{" "}
  </span>
);
const PauseIcon = () => (
  <span className="material-icons">
    <Pause />{" "}
  </span>
);
const VolumeIcon = () => (
  <span className="material-icons">
    <VolumeUp />{" "}
  </span>
);
const VolumeOffIcon = () => (
  <span className="material-icons">
    <VolumeOff />{" "}
  </span>
);
const FullscreenIcon = () => (
  <span className="material-icons">
    <Fullscreen />{" "}
  </span>
);
const SettingsIcon = () => (
  <span className="material-icons">
    <Settings />{" "}
  </span>
);
const CloseIcon = () => (
  <span className="material-icons">
    <Close />{" "}
  </span>
);
const StarIcon = () => (
  <span className="material-icons">
    <Star />{" "}
  </span>
);
const MusicNoteIcon = () => (
  <span className="material-icons">
    <MusicNote />{" "}
  </span>
);
const LibraryIcon = () => (
  <span className="material-icons">
    <VideoCall />{" "}
  </span>
);
const PianoIcon = () => (
  <span className="material-icons">
    <Piano />{" "}
  </span>
);
const GuitarIcon = () => (
  <span className="material-icons">
    <FourGPlusMobiledata />{" "}
  </span>
);
const MicIcon = () => (
  <span className="material-icons">
    <Mic />{" "}
  </span>
);
const DrumsIcon = () => (
  <span className="material-icons">
    <DashboardCustomize />{" "}
  </span>
);
const ChevronLeftIcon = () => (
  <span className="material-icons">
    <ChevronLeft />{" "}
  </span>
);
const ChevronRightIcon = () => (
  <span className="material-icons">
    <ChevronRight />{" "}
  </span>
);
const LoadingIcon = () => (
  <span className="material-icons animate-spin">
    <LocalDining />{" "}
  </span>
);
const AdminIcon = () => (
  <span className="material-icons">
    <Dashboard />{" "}
  </span>
);
const EmailIcon = () => (
  <span className="material-icons">
    <Email />{" "}
  </span>
);
const UserCheckIcon = () => (
  <span className="material-icons">
    <SupervisedUserCircle />{" "}
  </span>
);
const ViewIcon = () => (
  <span className="material-icons">
    <Visibility />{" "}
  </span>
);
const LockIcon = () => (
  <span className="material-icons">
    <Lock />{" "}
  </span>
);
const UnlockIcon = () => (
  <span className="material-icons">
    <FaceUnlockOutlined />{" "}
  </span>
);
const PeopleIcon = () => (
  <span className="material-icons">
    <People />{" "}
  </span>
);
const PersonAddIcon = () => (
  <span className="material-icons">
    <PersonAdd />{" "}
  </span>
);
const DeleteIcon = () => (
  <span className="material-icons">
    <Delete />{" "}
  </span>
);
const SearchIcon = () => (
  <span className="material-icons">
    <Search />{" "}
  </span>
);
const FilterListIcon = () => (
  <span className="material-icons">
    <FilterList />{" "}
  </span>
);
const DownloadIcon = () => (
  <span className="material-icons">
    <Download />{" "}
  </span>
);
const CalendarIcon = () => (
  <span className="material-icons">
    <CalendarMonth />{" "}
  </span>
);
const TimeIcon = () => (
  <span className="material-icons">
    <TimeToLeave />{" "}
  </span>
);

// Video Thumbnail Component with Play Button
const VideoThumbnail = ({
  thumbnail,
  title,
  onClick,
  showPlayButton = true,
  totalViews = 0,
}) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
          }}
        />

        {/* Play Button Overlay */}
        {showPlayButton && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <PlayIcon className="text-white text-3xl" />
            </motion.div>
          </div>
        )}

        {/* Views Count Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
          <div className="flex justify-end items-center text-white text-sm">
            <div className="flex items-center gap-2">
              <ViewIcon className="text-blue-400 text-sm" />
              <span>{totalViews} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Video Player Component with Full Controls
const CustomVideoPlayer = ({ videoId, autoPlay = false }) => {
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
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = loadYouTubePlayer;
    }
  };

  const loadYouTubePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
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
    console.error("YouTube Player Error:", event.data);
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
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className={`video-player-container relative bg-black rounded-xl overflow-hidden aspect-video ${
        isFullscreen ? "fixed inset-0 z-50 w-screen h-screen rounded-none" : ""
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
          showControls ? "opacity-100" : "opacity-0"
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
                <SettingsIcon className="text-white" />
              </motion.button>

              {/* Playback Speed Dropdown */}
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 min-w-[120px] shadow-xl z-10"
                >
                  <p className="text-white text-sm font-semibold mb-2 px-2">
                    Playback Speed
                  </p>
                  <div className="space-y-1">
                    {playbackRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          playbackRate === rate
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {rate === 1 ? "Normal" : rate + "x"}
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
              <FullscreenIcon />
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
              <PlayIcon className="text-white text-4xl" />
            </motion.button>
          </div>
        )}

        {/* Bottom Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-transform duration-300 ${
            showControls ? "translate-y-0" : "translate-y-full"
          }`}
        >
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
                  <PauseIcon className="text-white" />
                ) : (
                  <PlayIcon className="text-white" />
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
                    <VolumeOffIcon className="text-white text-sm" />
                  ) : (
                    <VolumeIcon className="text-white text-sm" />
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
const VideoModal = ({ isOpen, onClose, videoId, title }) => {
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
            className="bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white truncate pr-4">
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="bg-red-600 text-white p-2 rounded-lg transition-colors hover:bg-red-700 flex-shrink-0"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <CustomVideoPlayer videoId={videoId} autoPlay={true} />
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
        </motion.button>,
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
        <ChevronLeftIcon />
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
        <ChevronRightIcon />
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
      console.error("Error fetching YouTube videos:", error);
      return this.getMockVideos();
    }
  }

  static getMockVideos() {
    const mockVideos = [
      {
        id: { videoId: "U95BLuBzHUI" },
        snippet: {
          title: "Ndizy Music Tutorial - Learn Traditional Notes",
          description:
            "Complete guide to playing Ndizy music with traditional notes and rhythms",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/U95BLuBzHUI/hqdefault.jpg",
            },
          },
          channelTitle: "Traditional Music Academy",
          publishedAt: new Date().toISOString(),
        },
      },
      {
        id: { videoId: "MWAsMF8-MYU" },
        snippet: {
          title: "Ndizy Note Patterns for Beginners",
          description: "Learn basic Ndizy note patterns and finger techniques",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/MWAsMF8-MYU/hqdefault.jpg",
            },
          },
          channelTitle: "World Music Lessons",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      },
      {
        id: { videoId: "4govYaK6uhE" },
        snippet: {
          title: "Advanced Ndizy Music Techniques",
          description:
            "Master advanced Ndizy playing techniques and complex rhythms",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/4govYaK6uhE/hqdefault.jpg",
            },
          },
          channelTitle: "Music Masters",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
        },
      },
      {
        id: { videoId: "wSmkugkRxRM" },
        snippet: {
          title: "Ndizy Music for Meditation",
          description:
            "Soothing Ndizy music compositions for relaxation and meditation",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/wSmkugkRxRM/hqdefault.jpg",
            },
          },
          channelTitle: "Zen Music Studio",
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
        },
      },
      {
        id: { videoId: "YLKKSbvm4PM" },
        snippet: {
          title: "Traditional Ndizy Folk Songs",
          description:
            "Learn traditional Ndizy folk songs and their cultural significance",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/YLKKSbvm4PM/hqdefault.jpg",
            },
          },
          channelTitle: "Cultural Heritage Music",
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
        },
      },
      {
        id: { videoId: "VuY_IPH5cfg" },
        snippet: {
          title: "Ndizy Note Improvisation Workshop",
          description:
            "Learn to improvise with Ndizy notes in different musical styles",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/VuY_IPH5cfg/hqdefault.jpg",
            },
          },
          channelTitle: "Improvisation Masters",
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
        },
      },
      {
        id: { videoId: "_pMbamlX0l4" },
        snippet: {
          title: "Modern Ndizy Music Fusion",
          description: "Blending traditional Ndizy music with modern genres",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/_pMbamlX0l4/hqdefault.jpg",
            },
          },
          channelTitle: "Fusion Music Lab",
          publishedAt: new Date(Date.now() - 518400000).toISOString(),
        },
      },
      {
        id: { videoId: "zZAB5EbkbTQ" },
        snippet: {
          title: "Ndizy Music Theory Basics",
          description:
            "Understanding the music theory behind Ndizy compositions",
          thumbnails: {
            high: {
              url: "https://img.youtube.com/vi/zZAB5EbkbTQ/hqdefault.jpg",
            },
          },
          channelTitle: "Music Theory Explained",
          publishedAt: new Date(Date.now() - 604800000).toISOString(),
        },
      },
    ];

    return {
      items: mockVideos.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt),
      ),
    };
  }
}

export const UserClassesManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [lastViewedIndex, setLastViewedIndex] = useState(null);
  const itemsPerPage = 8;

  // Fetch YouTube videos on component mount
  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  // Watch for when we reach index 6 and open next page
  useEffect(() => {
    if (
      lastViewedIndex === 6 &&
      currentPage < Math.ceil(filteredVideos.length / itemsPerPage)
    ) {
      // Move to next page
      setCurrentPage((prevPage) => prevPage + 1);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Reset the index tracker
      setLastViewedIndex(null);
    }
  }, [lastViewedIndex, currentPage]);

  const fetchYouTubeVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchQuery = "Ndizy note music";
      const response = await YouTubeService.searchVideos(searchQuery, 50);

      if (response && response.items) {
        const transformedVideos = response.items.map((item, index) => {
          return {
            id: `video-${index}`,
            youtubeId: item.id.videoId,
            title: item.snippet.title,
            shortDescription:
              item.snippet.description || "Watch this Ndizy note music video",
            fullDescription:
              item.snippet.description ||
              "A beautiful Ndizy note music performance. Learn traditional Ndizy music techniques and enjoy authentic performances.",
            category: "Ndizy",
            level:
              index % 3 === 0
                ? "Beginner"
                : index % 3 === 1
                  ? "Intermediate"
                  : "Advanced",
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
              bio: "Specialized in traditional Ndizy music with years of teaching experience.",
            },
            curriculum: [
              {
                title: "Introduction to Ndizy Music",
                duration: "10 min",
                type: "Video",
              },
              {
                title: "Basic Techniques",
                duration: "15 min",
                type: "Video",
              },
              {
                title: "Practice Exercises",
                duration: "20 min",
                type: "Video",
              },
            ],
            publishedAt: item.snippet.publishedAt,
            totalViews: Math.floor(Math.random() * 10000) + 1000,
          };
        });

        transformedVideos.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
        );

        setVideos(transformedVideos);
      } else {
        throw new Error("No videos found");
      }
    } catch (err) {
      console.error("Error loading videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: "all",
      name: "All Videos",
      icon: <LibraryIcon />,
      count: videos.length,
    },
    {
      id: "Ndizy",
      name: "Ndizy Music",
      icon: <MusicNoteIcon />,
      count: videos.length,
    },
    {
      id: "tutorial",
      name: "Tutorials",
      icon: <PlayIcon />,
      count: videos.filter((v) => v.title.toLowerCase().includes("tutorial"))
        .length,
    },
    {
      id: "performance",
      name: "Performances",
      icon: <MicIcon />,
      count: videos.filter(
        (v) =>
          v.title.toLowerCase().includes("performance") ||
          v.title.toLowerCase().includes("music"),
      ).length,
    },
  ];

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : selectedCategory === "tutorial"
        ? videos.filter((v) => v.title.toLowerCase().includes("tutorial"))
        : selectedCategory === "performance"
          ? videos.filter(
              (v) =>
                v.title.toLowerCase().includes("performance") ||
                v.title.toLowerCase().includes("music"),
            )
          : videos;

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = filteredVideos.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVideoThumbnailClick = (videoItem, index) => {
    if (!videoItem) return;

    // Track the index of the video that was clicked
    const relativeIndex = (currentPage - 1) * itemsPerPage + index;
    setLastViewedIndex(relativeIndex);

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
          <div className="absolute top-10 left-10 opacity-10">
            <MusicNoteIcon className="text-6xl" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <LibraryIcon className="text-6xl" />
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
                Latest <span className="text-cyan-300">Ndizy Note Music</span>{" "}
                Videos
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Explore the latest Ndizy note music videos, tutorials, and
                performances from YouTube.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center items-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <PlayIcon />
                    <span className="font-semibold">
                      {videos.length} Videos
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <ViewIcon />
                    <span className="font-semibold">
                      {videos.reduce(
                        (sum, video) => sum + (video.totalViews || 0),
                        0,
                      )}{" "}
                      Total Views
                    </span>
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
                <LoadingIcon />
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
                <LoadingIcon className="text-4xl text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Loading Videos...
                </h3>
                <p className="text-white/70">
                  Fetching latest Ndizy note music videos from YouTube
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Error Loading Videos
                  </h3>
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
                  {currentVideos.map((video, index) => (
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
                          onClick={() =>
                            handleVideoThumbnailClick(video, index)
                          }
                          showPlayButton={true}
                          totalViews={video.totalViews}
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
                            <StarIcon className="text-yellow-400" />
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
                          onClick={() =>
                            handleVideoThumbnailClick(video, index)
                          }
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
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
                    <LibraryIcon className="text-6xl text-gray-400 mx-auto mb-4" />
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
