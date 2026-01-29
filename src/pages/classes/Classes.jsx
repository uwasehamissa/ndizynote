/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

const FullscreenIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const FullscreenExitIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
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

// Video Thumbnail Component
const VideoThumbnail = ({ youtubeId, title, onClick }) => {
  const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <img
        src={getYouTubeThumbnail(youtubeId)}
        alt={title}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.target.src = `https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop`;
        }}
      />

      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <PlayIcon className="text-white w-8 h-8" />
        </motion.div>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        ▶ Play
      </div>
    </div>
  );
};

// Simple YouTube Player Component
const SimpleYouTubePlayer = ({ videoId, title, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef(null);

  // Generate YouTube embed URL
  const getYouTubeEmbedUrl = () => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`;
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={playerContainerRef}
      className={`relative bg-black rounded-xl overflow-hidden aspect-video ${
        isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen rounded-none' : ''
      }`}
    >
      {/* YouTube iframe with NATIVE CONTROLS */}
      <iframe
        src={getYouTubeEmbedUrl()}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />

      {/* Custom Controls Overlay */}
      {!isFullscreen && (
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            title="Fullscreen"
          >
            <FullscreenIcon className="text-white w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 bg-red-600/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            title="Close"
          >
            <CloseIcon className="text-white w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videoId, title }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`bg-black ${isFullscreen ? 'fixed inset-0 w-screen h-screen' : 'rounded-2xl max-w-6xl w-full max-h-[90vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!isFullscreen && (
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="bg-red-600 text-white p-2 rounded-lg transition-colors hover:bg-red-700"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className={isFullscreen ? "h-full" : "p-6 h-[calc(90vh-80px)]"}>
          <SimpleYouTubePlayer 
            videoId={videoId} 
            title={title}
            onClose={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export const Classes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-defined music videos - Hardcoded with actual YouTube video IDs
  const musicClasses = [
    // Piano Videos
    {
      id: "piano-1",
      title: "KWIGA KURIRIMBA : AMAKURU UKENEYE KUMENYA NK` UMURIRIMBYI",
      category: "piano",
      youtubeId: "U-GMJVcQMRk",
      description: "Learn essential piano knowledge for piano players. Source of Mental Relaxation",
      instructor: "NDIZY NoMore",
      duration: "25 min",
      rating: 4.8,
      students: 12500,
      level: "Beginner",
      publishedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "piano-2",
      title: "How to Play Piano - Lesson 1",
      category: "piano",
      youtubeId: "U-GMJVcQMRk",
      description: "Beginner piano lesson covering basic notes and finger positioning",
      instructor: "Music Master",
      duration: "18 min",
      rating: 4.7,
      students: 8900,
      level: "Beginner",
      publishedAt: "2024-01-10T14:30:00Z"
    },
    {
      id: "piano-3",
      title: "Piano Chords Tutorial",
      category: "piano",
      youtubeId: "U-GMJVcQMRk",
      description: "Learn basic piano chords and how to play your first song",
      instructor: "Chord Expert",
      duration: "22 min",
      rating: 4.6,
      students: 11200,
      level: "Beginner",
      publishedAt: "2024-01-08T09:15:00Z"
    },
    {
      id: "piano-4",
      title: "Advanced Piano Techniques",
      category: "piano",
      youtubeId: "U-GMJVcQMRk",
      description: "Master advanced piano techniques and improvisation",
      instructor: "Professional Pianist",
      duration: "35 min",
      rating: 4.9,
      students: 5400,
      level: "Advanced",
      publishedAt: "2024-01-05T16:45:00Z"
    },
    // Guitar Videos
    {
      id: "guitar-1",
      title: "Guitar Basics for Absolute Beginners",
      category: "guitar",
      youtubeId: "KxEaWKe2hLM",
      description: "Start playing guitar from scratch with this comprehensive tutorial",
      instructor: "Guitar Master",
      duration: "22 min",
      rating: 4.6,
      students: 15200,
      level: "Beginner",
      publishedAt: "2024-01-12T11:20:00Z"
    },
    {
      id: "guitar-2",
      title: "Learn 10 Easy Guitar Songs",
      category: "guitar",
      youtubeId: "KxEaWKe2hLM",
      description: "Master 10 popular songs perfect for beginners",
      instructor: "Song Teacher",
      duration: "30 min",
      rating: 4.8,
      students: 9800,
      level: "Beginner",
      publishedAt: "2024-01-09T13:45:00Z"
    },
    {
      id: "guitar-3",
      title: "Fingerstyle Guitar Techniques",
      category: "guitar",
      youtubeId: "KxEaWKe2hLM",
      description: "Learn beautiful fingerstyle guitar patterns and techniques",
      instructor: "Fingerstyle Expert",
      duration: "28 min",
      rating: 4.8,
      students: 7600,
      level: "Intermediate",
      publishedAt: "2024-01-07T16:30:00Z"
    },
    {
      id: "guitar-4",
      title: "Electric Guitar Solo Techniques",
      category: "guitar",
      youtubeId: "KxEaWKe2hLM",
      description: "Master electric guitar soloing and lead techniques",
      instructor: "Rock Guitarist",
      duration: "32 min",
      rating: 4.9,
      students: 6200,
      level: "Advanced",
      publishedAt: "2024-01-04T14:15:00Z"
    },
    // Vocal Videos
    {
      id: "vocal-1",
      title: "Vocal Warm-ups and Exercises",
      category: "vocal",
      youtubeId: "HqcDWPjgcsE",
      description: "Essential vocal exercises to improve your singing voice",
      instructor: "Vocal Coach",
      duration: "20 min",
      rating: 4.7,
      students: 18300,
      level: "All Levels",
      publishedAt: "2024-01-14T13:10:00Z"
    },
    {
      id: "vocal-2",
      title: "How to Sing High Notes",
      category: "vocal",
      youtubeId: "HqcDWPjgcsE",
      description: "Techniques to safely reach and maintain high notes",
      instructor: "Professional Singer",
      duration: "32 min",
      rating: 4.9,
      students: 9200,
      level: "Intermediate",
      publishedAt: "2024-01-11T15:30:00Z"
    },
    {
      id: "vocal-3",
      title: "Breathing Techniques for Singers",
      category: "vocal",
      youtubeId: "HqcDWPjgcsE",
      description: "Master proper breathing to improve vocal performance",
      instructor: "Breathing Specialist",
      duration: "25 min",
      rating: 4.8,
      students: 11500,
      level: "Beginner",
      publishedAt: "2024-01-06T10:45:00Z"
    },
    {
      id: "vocal-4",
      title: "Vocal Range Expansion",
      category: "vocal",
      youtubeId: "HqcDWPjgcsE",
      description: "Exercises to expand your vocal range safely",
      instructor: "Voice Specialist",
      duration: "28 min",
      rating: 4.7,
      students: 8400,
      level: "Intermediate",
      publishedAt: "2024-01-03T12:20:00Z"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Videos", icon: <MusicNoteIcon className="w-5 h-5" />, count: musicClasses.length },
    { id: "piano", name: "Piano", icon: <PianoIcon className="w-5 h-5" />, count: musicClasses.filter(c => c.category === "piano").length },
    { id: "guitar", name: "Guitar", icon: <GuitarIcon className="w-5 h-5" />, count: musicClasses.filter(c => c.category === "guitar").length },
    { id: "vocal", name: "Vocal", icon: <MicIcon className="w-5 h-5" />, count: musicClasses.filter(c => c.category === "vocal").length }
  ];

  const filteredClasses = selectedCategory === "all" 
    ? musicClasses 
    : musicClasses.filter((c) => c.category === selectedCategory);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Free Music Tutorials
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              Watch free music videos by category. Click any video to play!
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm">
                <span className="font-bold">{musicClasses.length}</span> Free Videos Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-white/80 backdrop-blur-sm sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Count */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold">{filteredClasses.length}</span> videos in{" "}
            <span className="font-bold">
              {selectedCategory === "all" ? "All Categories" : categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Video Thumbnail */}
                <div className="p-3">
                  <VideoThumbnail
                    youtubeId={classItem.youtubeId}
                    title={classItem.title}
                    onClick={() => handleVideoClick(classItem)}
                  />
                </div>

                {/* Video Info */}
                <div className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      classItem.level === "Beginner" 
                        ? "bg-green-100 text-green-800" 
                        : classItem.level === "Intermediate" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : classItem.level === "Advanced"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {classItem.level}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {classItem.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-sm">
                    {classItem.title}
                  </h3>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {classItem.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="text-yellow-400 w-3 h-3" />
                      <span className="text-xs text-gray-600">
                        {classItem.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({classItem.students.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {classItem.instructor}
                    </span>
                  </div>

                  {/* Watch Button */}
                  <button
                    onClick={() => handleVideoClick(classItem)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseModal}
        videoId={selectedVideo?.youtubeId}
        title={selectedVideo?.title}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            {musicClasses.length} Free Music Tutorials • All videos play directly from YouTube
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Click any thumbnail to start watching
          </p>
        </div>
      </footer>
    </div>
  );
};