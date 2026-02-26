// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // SVG Icons
// const StarIcon = ({ className = "w-5 h-5", filled = false }) => (
//   <svg
//     className={className}
//     fill={filled ? "currentColor" : "none"}
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={filled ? "0" : "2"}
//       d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//     />
//   </svg>
// );

// const QuoteIcon = ({ className = "w-8 h-8" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
//   </svg>
// );

// const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
//   </svg>
// );

// const PianoIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z" />
//   </svg>
// );

// const GuitarIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" />
//   </svg>
// );

// const MicIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
//   </svg>
// );

// const DrumsIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
//   </svg>
// );

// const CalendarIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
//   </svg>
// );

// const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
//   <svg
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 19l-7-7 7-7"
//     />
//   </svg>
// );

// const ChevronRightIcon = ({ className = "w-6 h-6" }) => (
//   <svg
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 5l7 7-7 7"
//     />
//   </svg>
// );

// const PlayIcon = ({ className = "w-4 h-4" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = ({ className = "w-4 h-4" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// // Star Rating Component
// const StarRating = ({ rating, className = "" }) => {
//   return (
//     <div className={`flex items-center gap-1 ${className}`}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <StarIcon
//           key={star}
//           filled={star <= rating}
//           className={`w-3 h-3 xsm:w-4 xsm:h-4 sm:w-4 sm:h-4 ${
//             star <= rating ? "text-yellow-400" : "text-gray-300"
//           }`}
//         />
//       ))}
//     </div>
//   );
// };

// // Testimonial Card Component
// const TestimonialCard = ({ testimonial, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       whileHover={{ scale: 1.02, y: -5 }}
//       className="bg-white rounded-2xl p-4 xsm:p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
//     >
//       {/* Quote Icon */}
//       <div className="text-purple-100 mb-3 xsm:mb-4">
//         <QuoteIcon className="w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8" />
//       </div>

//       {/* Rating */}
//       <div className="mb-3 xsm:mb-4">
//         <StarRating rating={testimonial.rating} />
//       </div>

//       {/* Testimonial Text */}
//       <p className="text-gray-600 text-sm xsm:text-base leading-relaxed mb-4 xsm:mb-5 flex-grow">
//         "{testimonial.text}"
//       </p>

//       {/* Student Info */}
//       <div className="flex items-center gap-3 xsm:gap-4 pt-3 xsm:pt-4 border-t border-gray-100">
//         <img
//           src={testimonial.avatar}
//           alt={testimonial.name}
//           className="w-8 h-8 xsm:w-10 xsm:h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//         />
//         <div className="flex-1 min-w-0">
//           <h4 className="font-semibold text-gray-800 text-sm xsm:text-base truncate">
//             {testimonial.name}
//           </h4>
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="text-gray-500 text-xs xsm:text-sm">
//               {testimonial.instrument}
//             </span>
//             <span className="text-gray-300">•</span>
//             <span className="text-gray-500 text-xs xsm:text-sm">
//               {testimonial.duration}
//             </span>
//           </div>
//           <div className="flex items-center gap-1 mt-1">
//             <CalendarIcon className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4" />
//             <span className="text-gray-500 text-xs xsm:text-sm">
//               Joined {testimonial.joinDate}
//             </span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Carousel Component
// const TestimonialCarousel = ({ testimonials, autoPlay = true }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);

//   // Calculate items per slide based on screen size
//   const getItemsPerSlide = () => {
//     if (typeof window === "undefined") return 1;

//     const width = window.innerWidth;
//     if (width >= 1280) return 4; // xl
//     if (width >= 1024) return 3; // lg
//     if (width >= 768) return 2; // md
//     if (width >= 640) return 2; // sm
//     return 1; // xsm and below
//   };

//   const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

//   useEffect(() => {
//     const handleResize = () => {
//       setItemsPerSlide(getItemsPerSlide());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isPlaying || !autoPlay) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isPlaying, autoPlay, totalSlides]);


//   const currentTestimonials = testimonials.slice(
//     currentIndex * itemsPerSlide,
//     (currentIndex + 1) * itemsPerSlide
//   );

//   return (
//     <div className="relative">
//       {/* Carousel Container */}
//       <div className="relative overflow-hidden rounded-2xl">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -100 }}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xsm:gap-5 sm:gap-6 lg:gap-8"
//           >
//             {currentTestimonials.map((testimonial, index) => (
//               <TestimonialCard
//                 key={testimonial.id}
//                 testimonial={testimonial}
//                 index={index}
//               />
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Slide Counter */}
//       <div className="text-center mt-3 xsm:mt-4">
//         <span className="text-sm xsm:text-base text-gray-600 font-medium">
//           {currentIndex + 1} / {totalSlides}
//         </span>
//       </div>
//     </div>
//   );
// };

// // Filter Button Component
// const FilterButton = ({ active, onClick, children, count }) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className={`flex items-center gap-2 px-3 xsm:px-4 py-2 xsm:py-2.5 rounded-xl font-semibold text-xs xsm:text-sm transition-all whitespace-nowrap ${
//       active
//         ? "bg-purple-600 text-white shadow-lg"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//   >
//     {children}
//     <span className="bg-white/20 px-1.5 xsm:px-2 py-0.5 rounded-full text-xs">
//       {count}
//     </span>
//   </motion.button>
// );

// export const Testimonials = () => {
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [viewMode, setViewMode] = useState("carousel"); // 'carousel' or 'grid'
//   const [visibleTestimonials, setVisibleTestimonials] = useState(8);

//   // Testimonials Data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       instrument: "Piano",
//       duration: "2 years",
//       joinDate: "Jan 2023",
//       rating: 5,
//       text: "NdziNote Academy transformed my piano playing completely. The instructors are incredibly patient and the curriculum is perfectly structured for beginners.",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 2,
//       name: "Marcus Chen",
//       instrument: "Guitar",
//       duration: "1 year",
//       joinDate: "Mar 2023",
//       rating: 5,
//       text: "As a complete beginner, I was nervous about learning guitar. The step-by-step approach made it so easy to follow and I'm now playing my favorite songs!",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 3,
//       name: "Elena Rodriguez",
//       instrument: "Vocal",
//       duration: "8 months",
//       joinDate: "Jun 2023",
//       rating: 5,
//       text: "The vocal training here is exceptional. My range has expanded dramatically and I've gained so much confidence in my singing abilities.",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 4,
//       name: "David Kim",
//       instrument: "Drums",
//       duration: "1.5 years",
//       joinDate: "Nov 2022",
//       rating: 4,
//       text: "The drum instructors are amazing! They break down complex rhythms into simple patterns that even beginners can master quickly.",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 5,
//       name: "Amanda Wilson",
//       instrument: "Piano",
//       duration: "3 years",
//       joinDate: "Aug 2021",
//       rating: 5,
//       text: "I've tried other music schools before, but NdziNote's personalized approach is unmatched. My progress has been incredible!",
//       avatar:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 6,
//       name: "James Thompson",
//       instrument: "Guitar",
//       duration: "6 months",
//       joinDate: "Sep 2023",
//       rating: 5,
//       text: "The online classes are so convenient and the instructors make you feel like you're right there in the room with them. Highly recommended!",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 7,
//       name: "Lisa Park",
//       instrument: "Vocal",
//       duration: "2 years",
//       joinDate: "Feb 2022",
//       rating: 5,
//       text: "From breathing techniques to performance skills, every aspect of vocal training is covered thoroughly. I've grown so much as a singer.",
//       avatar:
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 8,
//       name: "Michael Brown",
//       instrument: "Drums",
//       duration: "1 year",
//       joinDate: "Dec 2022",
//       rating: 4,
//       text: "The structured lessons and regular performance opportunities have built my confidence tremendously. Great community of musicians!",
//       avatar:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 9,
//       name: "Sophia Garcia",
//       instrument: "Piano",
//       duration: "4 months",
//       joinDate: "Jan 2024",
//       rating: 5,
//       text: "As an adult learner, I was worried about starting piano. The instructors are so encouraging and the pace is perfect for busy schedules.",
//       avatar:
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 10,
//       name: "Alex Turner",
//       instrument: "Guitar",
//       duration: "2.5 years",
//       joinDate: "Jul 2021",
//       rating: 5,
//       text: "I went from basic chords to composing my own music. The music theory integration is seamless and actually enjoyable to learn!",
//       avatar:
//         "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 11,
//       name: "Rachel Green",
//       instrument: "Vocal",
//       duration: "1 year",
//       joinDate: "Mar 2023",
//       rating: 5,
//       text: "The performance workshops are incredible. I went from being terrified of singing in public to loving stage performances!",
//       avatar:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       id: 12,
//       name: "Kevin Martinez",
//       instrument: "Drums",
//       duration: "9 months",
//       joinDate: "Jun 2023",
//       rating: 4,
//       text: "The instructors really understand how to build solid foundations. My timing and coordination have improved dramatically.",
//       avatar:
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
//     },
//   ];

//   // Filter categories
//   const categories = [
//     {
//       id: "all",
//       name: "All Reviews",
//       icon: <MusicNoteIcon className="w-4 h-4" />,
//       count: testimonials.length,
//     },
//     {
//       id: "piano",
//       name: "Piano",
//       icon: <PianoIcon className="w-4 h-4" />,
//       count: testimonials.filter((t) => t.instrument.toLowerCase() === "piano")
//         .length,
//     },
//     {
//       id: "guitar",
//       name: "Guitar",
//       icon: <GuitarIcon className="w-4 h-4" />,
//       count: testimonials.filter((t) => t.instrument.toLowerCase() === "guitar")
//         .length,
//     },
//     {
//       id: "vocal",
//       name: "Vocal",
//       icon: <MicIcon className="w-4 h-4" />,
//       count: testimonials.filter((t) => t.instrument.toLowerCase() === "vocal")
//         .length,
//     },
//     {
//       id: "drums",
//       name: "Drums",
//       icon: <DrumsIcon className="w-4 h-4" />,
//       count: testimonials.filter((t) => t.instrument.toLowerCase() === "drums")
//         .length,
//     },
//   ];

//   // Filter testimonials
//   const filteredTestimonials =
//     selectedFilter === "all"
//       ? testimonials
//       : testimonials.filter(
//           (t) => t.instrument.toLowerCase() === selectedFilter
//         );

//   const displayedTestimonials = filteredTestimonials.slice(
//     0,
//     visibleTestimonials
//   );

//   const loadMore = () => {
//     setVisibleTestimonials((prev) => prev + 4);
//   };

//   // Stats
//   const stats = [
//     {
//       number: "500+",
//       label: "Happy Students",
//       description: "Joined our music family",
//     },
//     {
//       number: "4.9/5",
//       label: "Average Rating",
//       description: "From all reviews",
//     },
//     {
//       number: "98%",
//       label: "Success Rate",
//       description: "Achieve their goals",
//     },
//     {
//       number: "15+",
//       label: "Expert Instructors",
//       description: "Professional musicians",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
//       {/* Hero Section */}
//       <section className="relative py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute top-4 xsm:top-6 left-4 xsm:left-6 opacity-10">
//           <MusicNoteIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
//         </div>
//         <div className="absolute bottom-4 xsm:bottom-6 right-4 xsm:right-6 opacity-10">
//           <QuoteIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
//         </div>
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <motion.h1
//               className="text-2xl xsm:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xsm:mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               Student <span className="text-cyan-300">Success Stories</span>
//             </motion.h1>
//             <motion.p
//               className="text-base xsm:text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 xsm:mb-8 leading-relaxed"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               Hear from our students about their transformative musical journeys
//               and discover why NdziNote Academy is the choice for aspiring
//               musicians.
//             </motion.p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-8 xsm:py-12 sm:py-16 bg-white">
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 xsm:gap-6 sm:gap-8 max-w-4xl mx-auto"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className="text-center p-4 xsm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg"
//               >
//                 <div className="text-2xl xsm:text-3xl sm:text-4xl font-bold text-gray-800 mb-1 xsm:mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm xsm:text-base font-semibold text-gray-700 mb-1">
//                   {stat.label}
//                 </div>
//                 <div className="text-xs xsm:text-sm text-gray-600">
//                   {stat.description}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-12 xsm:py-16 sm:py-20 lg:py-24">
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-8 xsm:mb-12 sm:mb-16"
//           >
//             <h2 className="text-2xl xsm:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 xsm:mb-4">
//               What Our <span className="text-purple-600">Students Say</span>
//             </h2>
//             <p className="text-base xsm:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
//               Real stories from real students who have transformed their musical
//               abilities with our expert guidance.
//             </p>
//           </motion.div>

//           {/* Carousel View */}
//           {viewMode === "carousel" && (
//             <TestimonialCarousel
//               testimonials={filteredTestimonials}
//               autoPlay={true}
//             />
//           )}

//           {/* No Results Message */}
//           {filteredTestimonials.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-12 xsm:py-16"
//             >
//               <QuoteIcon className="w-12 h-12 xsm:w-16 xsm:h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl xsm:text-2xl font-bold text-gray-600 mb-2">
//                 No testimonials found
//               </h3>
//               <p className="text-gray-500 text-sm xsm:text-base">
//                 Try selecting a different instrument filter
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };


































































/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SVG Icons
const StarIcon = ({ className = "w-5 h-5", filled = false }) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? "0" : "2"}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const QuoteIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const PianoIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 11.5h.25V19h-4.5v-4.5H10c.55 0 1-.45 1-1V5h2v8.5c0 .55.45 1 1 1zM5 5h2v8.5c0 .55.45 1 1 1h.25V19H5V5zm14 14h-3.25v-4.5H16c.55 0 1-.45 1-1V5h2v14z" />
  </svg>
);

const GuitarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" />
  </svg>
);

const MicIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </svg>
);

const DrumsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const PlayIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

// Star Rating Component
const StarRating = ({ rating, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= rating}
          className={`w-3 h-3 xsm:w-4 xsm:h-4 sm:w-4 sm:h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl p-4 xsm:p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="text-purple-100 mb-3 xsm:mb-4">
        <QuoteIcon className="w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8" />
      </div>

      {/* Rating */}
      <div className="mb-3 xsm:mb-4">
        <StarRating rating={testimonial.rating || testimonial.stars || 0} />
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-100 text-sm xsm:text-base leading-relaxed mb-4 xsm:mb-5 flex-grow">
        "{testimonial.text || testimonial.testimonial || testimonial.review }"
      </p>

      {/* Student Info */}
      <div className="flex items-center gap-3 xsm:gap-4 pt-3 xsm:pt-4 border-t border-gray-100">
        <img
          src={testimonial.image?.url || testimonial.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"}
          alt={testimonial.name}
          className="w-8 h-8 xsm:w-10 xsm:h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
          }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm xsm:text-base truncate">
            {testimonial.name || "Anonymous Student"}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-100 text-xs xsm:text-sm">
              {testimonial.instrument || testimonial.program || "Not specified"}
            </span>
            <span className="text-red-400">•</span>
            <span className="text-gray-100 text-xs xsm:text-sm">
              {testimonial.duration || "Not specified"}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <CalendarIcon className="text-gray-400 w-3 h-3 xsm:w-4 xsm:h-4" />
            <span className="text-gray-100 text-xs xsm:text-sm">
              Joined {testimonial.joinDate || testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleDateString() : "Not specified"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Carousel Component
const TestimonialCarousel = ({ testimonials, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Calculate items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 1;

    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2; // md
    if (width >= 640) return 2; // sm
    return 1; // xsm and below
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = testimonials.length > 0 ? Math.ceil(testimonials.length / itemsPerSlide) : 0;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, totalSlides]);

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  if (testimonials.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 xsm:py-16 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white"
      >
        <QuoteIcon className="w-12 h-12 xsm:w-16 xsm:h-16 text-gray-100 mx-auto mb-4" />
        <h3 className="text-xl xsm:text-2xl font-bold text-white mb-2">
          No testimonials available
        </h3>
        <p className="text-gray-100 text-sm xsm:text-base">
          Check back later for student reviews
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white py-4">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xsm:gap-5 sm:gap-6 lg:gap-8"
          >
            {currentTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial._id || testimonial.id || index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Counter */}
      {totalSlides > 0 && (
        <div className="text-center mt-3 xsm:mt-4">
          <span className="text-sm xsm:text-base text-gray-100 font-medium">
            {currentIndex + 1} / {totalSlides}
          </span>
        </div>
      )}
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ active, onClick, children, count }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-3 xsm:px-4 py-2 xsm:py-2.5 rounded-xl font-semibold text-xs xsm:text-sm transition-all whitespace-nowrap ${
      active
        ? "bg-purple-600 text-white shadow-lg"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {children}
    <span className="bg-white/20 px-1.5 xsm:px-2 py-0.5 rounded-full text-xs">
      {count}
    </span>
  </motion.button>
);

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("carousel");

  // API Base URL
  const API_URL = "https://ndizmusicprojectbackend.onrender.com";

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      // console.log("🔍 Fetching testimonials from API...");

      const response = await axios.get(`${API_URL}/testimonials`);
      // console.log("📥 API Response:", response.data);

      let testimonialData = [];

      // Handle response format
      if (response.data && Array.isArray(response.data)) {
        testimonialData = response.data;
        // console.log(`✅ Received ${testimonialData.length} testimonials`);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        testimonialData = response.data.data;
        // console.log(`✅ Received ${testimonialData.length} testimonials`);
      } else {
        // console.warn("Unexpected API response format:", response.data);
        toast.warning("Unexpected data format from server");
      }

      setTestimonials(testimonialData);
      
      if (testimonialData.length > 0) {
        toast.success(`Loaded ${testimonialData.length} testimonials`);
      } else {
        toast.info("No testimonials available yet");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to load testimonials";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Calculate instrument statistics from API data
  const getInstrumentStats = () => {
    if (!testimonials.length) return { all: 0 };

    const stats = { all: testimonials.length };
    
    // Count by instrument/program (case-insensitive)
    testimonials.forEach(testimonial => {
      const instrument = (testimonial.instrument || testimonial.program || testimonial.course || "other").toLowerCase();
      stats[instrument] = (stats[instrument] || 0) + 1;
    });

    return stats;
  };

  const instrumentStats = getInstrumentStats();

  // Filter testimonials based on selection
  const filteredTestimonials = selectedFilter === "all" 
    ? testimonials 
    : testimonials.filter(testimonial => {
        const instrument = (testimonial.instrument || testimonial.program || testimonial.course || "").toLowerCase();
        return instrument.includes(selectedFilter);
      });

  // Get unique instruments for filter buttons
  const getUniqueInstruments = () => {
    const instruments = new Set();
    testimonials.forEach(testimonial => {
      const instrument = testimonial.instrument || testimonial.program || testimonial.course;
      if (instrument) {
        instruments.add(instrument.toLowerCase());
      }
    });
    return Array.from(instruments).slice(0, 4); // Limit to 4 instruments
  };

  const uniqueInstruments = getUniqueInstruments();

  // Categories for filter buttons
  const categories = [
    {
      id: "all",
      name: "All Reviews",
      icon: <MusicNoteIcon className="w-4 h-4" />,
      count: instrumentStats.all || 0,
    },
    ...uniqueInstruments.map((instrument, index) => {
      const icons = [PianoIcon, GuitarIcon, MicIcon, DrumsIcon];
      const IconComponent = icons[index] || MusicNoteIcon;
      const name = instrument.charAt(0).toUpperCase() + instrument.slice(1);
      
      return {
        id: instrument,
        name: name,
        icon: <IconComponent className="w-4 h-4" />,
        count: instrumentStats[instrument] || 0,
      };
    }),
  ];

  // Calculate overall stats from API data
  const calculateStats = () => {
    if (testimonials.length === 0) {
      return [
        { number: "0", label: "Total Students", description: "Joined our music family" },
        { number: "0/5", label: "Average Rating", description: "From all reviews" },
        { number: "0%", label: "Approved", description: "Verified testimonials" },
        { number: "0", label: "Instruments", description: "Different courses" },
      ];
    }

    // Calculate average rating
    const totalRating = testimonials.reduce((sum, t) => sum + (t.rating || t.stars || 0), 0);
    const averageRating = (totalRating / testimonials.length).toFixed(1);

    // Count approved testimonials
    const approvedCount = testimonials.filter(t => t.status === "approved" || t.verified).length;
    const approvalRate = Math.round((approvedCount / testimonials.length) * 100);

    // Count unique instruments
    const uniqueInstrumentsCount = new Set(
      testimonials.map(t => t.instrument || t.program || t.course).filter(Boolean)
    ).size;

    return [
      { 
        number: testimonials.length.toString(), 
        label: "Total Students", 
        description: "Shared their experience" 
      },
      { 
        number: `${averageRating}/5`, 
        label: "Average Rating", 
        description: "From all reviews" 
      },
      { 
        number: `${approvalRate}%`, 
        label: "Approved", 
        description: "Verified testimonials" 
      },
      { 
        number: uniqueInstrumentsCount.toString(), 
        label: "Instruments", 
        description: "Different courses" 
      },
    ];
  };

  const stats = calculateStats();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-100">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white pt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Hero Section */}
      <section className="relative py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white  overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="absolute top-4 xsm:top-6 left-4 xsm:left-6 opacity-10">
          <MusicNoteIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="absolute bottom-4 xsm:bottom-6 right-4 xsm:right-6 opacity-10">
          <QuoteIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-2xl xsm:text-3xl sm:text-4xl text-white lg:text-5xl xl:text-6xl font-bold mb-4 xsm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Student <span className="text-cyan-300">Success Stories</span>
            </motion.h1>
            <motion.p
              className="text-base xsm:text-lg sm:text-xl lg:text-2xl text-gray-100 mb-6 xsm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hear from our students about their transformative musical journeys
              and discover why NdziNote Academy is the choice for aspiring
              musicians.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 xsm:py-12 sm:py-16 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white text-white">
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 xsm:gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 xsm:p-6 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl shadow-lg"
              >
                <div className="text-2xl xsm:text-3xl sm:text-4xl font-bold text-gray-100 mb-1 xsm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm xsm:text-base font-semibold text-gray-100 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs xsm:text-sm text-gray-100">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white">
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 xsm:mb-12 sm:mb-16"
          >
            <h2 className="text-2xl xsm:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 xsm:mb-4">
              What Our <span className="text-purple-600">Students Say</span>
            </h2>
            <p className="text-base xsm:text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto px-2">
              Real stories from real students who have transformed their musical
              abilities with our expert guidance.
            </p>
          </motion.div>


          {/* Carousel View */}
          <TestimonialCarousel
            testimonials={filteredTestimonials}
            autoPlay={true}
          />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 xsm:py-16"
            >
              <div className="text-red-500 mb-4">
                <MusicNoteIcon className="w-12 h-12 xsm:w-16 xsm:h-16 mx-auto" />
              </div>
              <h3 className="text-xl xsm:text-2xl font-bold text-gray-600 mb-2">
                Failed to load testimonials
              </h3>
              <p className="text-gray-500 text-sm xsm:text-base mb-4">
                {error}
              </p>
              <button
                onClick={fetchTestimonials}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* No Results Message */}
          {!loading && testimonials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 xsm:py-16"
            >
              <QuoteIcon className="w-12 h-12 xsm:w-16 xsm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl xsm:text-2xl font-bold text-gray-600 mb-2">
                No testimonials yet
              </h3>
              <p className="text-gray-500 text-sm xsm:text-base">
                Be the first to share your experience!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};