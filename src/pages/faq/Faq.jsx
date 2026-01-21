// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // SVG Icons
// const ChevronDownIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//   </svg>
// );

// const ChevronUpIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//   </svg>
// );

// const SearchIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
//   </svg>
// );

// const BookIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
//   </svg>
// );

// const PaymentIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
//   </svg>
// );

// const UserIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const SupportIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const EmailIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//   </svg>
// );

// const PhoneIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
//   </svg>
// );

// const SunIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM6.34 5.16l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0zm13.08 12.42l1.42 1.42c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.42-1.42c-.39-.39-1.02-.39-1.41 0a.9959.9959 0 000 1.41zM5.16 17.66l1.42-1.42c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0zm12.42-13.08l1.42-1.42c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0z"/>
//   </svg>
// );

// const MoonIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
//   </svg>
// );



// // FAQ Item Component
// const FAQItem = ({ faq, isOpen, onClick, index, darkMode = false }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border overflow-hidden ${
//         darkMode 
//           ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
//           : 'bg-white border-gray-100 hover:bg-gray-50'
//       }`}
//     >
//       <button
//         onClick={onClick}
//         className={`w-full px-4 xsm:px-6 sm:px-8 py-4 xsm:py-5 sm:py-6 text-left flex items-center justify-between gap-4 transition-colors duration-200 ${
//           darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
//         }`}
//       >
//         <h3 className={`text-base xsm:text-lg sm:text-xl font-semibold flex-1 pr-4 ${
//           darkMode ? 'text-white' : 'text-gray-800'
//         }`}>
//           {faq.question}
//         </h3>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex-shrink-0 w-6 h-6 xsm:w-7 xsm:h-7 text-purple-600"
//         >
//           {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//         </motion.div>
//       </button>
      
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="px-4 xsm:px-6 sm:px-8 pb-4 xsm:pb-5 sm:pb-6">
//               <p className={`leading-relaxed text-sm xsm:text-base ${
//                 darkMode ? 'text-gray-300' : 'text-gray-600'
//               }`}>
//                 {faq.answer}
//               </p>
//               {faq.additionalInfo && (
//                 <div className={`mt-3 xsm:mt-4 p-3 xsm:p-4 rounded-lg border ${
//                   darkMode 
//                     ? 'bg-blue-900/20 border-blue-800' 
//                     : 'bg-blue-50 border-blue-200'
//                 }`}>
//                   <p className={`text-xs xsm:text-sm font-medium ${
//                     darkMode ? 'text-blue-300' : 'text-blue-700'
//                   }`}>
//                     {faq.additionalInfo}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // Category Filter Component
// const CategoryFilter = ({ categories, activeCategory, onCategoryChange, darkMode = false }) => {
//   return (
//     <div className="flex flex-wrap gap-2 xsm:gap-3 justify-center">
//       {categories.map((category) => (
//         <motion.button
//           key={category.id}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => onCategoryChange(category.id)}
//           className={`flex items-center gap-2 px-4 xsm:px-5 py-2 xsm:py-2.5 rounded-xl font-semibold text-xs xsm:text-sm transition-all ${
//             activeCategory === category.id
//               ? 'bg-purple-600 text-white shadow-lg'
//               : darkMode
//                 ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           {category.icon}
//           {category.name}
//           <span className={`px-2 py-1 rounded-full text-xs ${
//             activeCategory === category.id
//               ? 'bg-white/20 text-white'
//               : darkMode
//                 ? 'bg-gray-600 text-gray-300'
//                 : 'bg-white text-gray-700'
//           }`}>
//             {category.count}
//           </span>
//         </motion.button>
//       ))}
//     </div>
//   );
// };

// export const FAQ = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [openItems, setOpenItems] = useState(new Set());
//   const [darkMode, setDarkMode] = useState(false);

//   // Initialize dark mode from system preference or localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       setDarkMode(true);
//       document.documentElement.classList.add('dark');
//     } else {
//       setDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
    
//     if (newDarkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   // FAQ Data
//   const faqData = [
//     // General Questions
//     {
//       id: 1,
//       category: 'general',
//       question: "What makes NdziNote Academy different from other music schools?",
//       answer: "NdziNote Academy combines traditional music education with innovative teaching methods. We offer personalized learning paths, master-level instruction from professional musicians, performance opportunities, and state-of-the-art facilities. Our unique approach focuses on both technical proficiency and artistic expression.",
//       additionalInfo: "Our student success rate is 98%, with many students achieving their musical goals within the first year."
//     },
//     {
//       id: 2,
//       category: 'general',
//       question: "Do I need any prior musical experience to join?",
//       answer: "No prior experience is necessary! We welcome students of all levels - from complete beginners to advanced musicians. Our curriculum is designed to meet you where you are and help you progress at your own pace. Beginners start with foundational skills while advanced students focus on mastery and performance.",
//       additionalInfo: "Over 60% of our students start as complete beginners."
//     },
//     {
//       id: 3,
//       category: 'general',
//       question: "What age groups do you teach?",
//       answer: "We teach students of all ages from 5 years old to adults. Our programs are tailored to different age groups: Children (5-12), Teens (13-17), and Adults (18+). Each age group has specially designed curriculum and teaching approaches to maximize learning effectiveness.",
//       additionalInfo: "We offer family discounts for multiple enrollments from the same household."
//     },

//     // Courses & Classes
//     {
//       id: 4,
//       category: 'courses',
//       question: "What instruments do you offer lessons for?",
//       answer: "We offer comprehensive lessons for piano, guitar (acoustic, electric, and bass), violin, viola, cello, drums, and voice. Additionally, we provide specialized programs in music theory, composition, songwriting, and music production. Each instrument has multiple skill levels from beginner to professional.",
//       additionalInfo: "New instruments are added regularly based on student demand."
//     },
//     {
//       id: 5,
//       category: 'courses',
//       question: "How long are the typical lesson sessions?",
//       answer: "Lesson durations vary based on the program and student level: 30 minutes for young beginners, 45 minutes for intermediate students, and 60 minutes for advanced students and adults. We also offer extended 90-minute sessions for intensive training and master classes.",
//       additionalInfo: "Most students start with 45-minute sessions for optimal learning balance."
//     },
//     {
//       id: 6,
//       category: 'courses',
//       question: "Can I switch instruments or instructors if needed?",
//       answer: "Yes, absolutely! We understand that musical interests can evolve. You can switch instruments or request a different instructor at any time. We'll work with you to find the perfect match and ensure a smooth transition without disrupting your learning progress.",
//       additionalInfo: "Instrument switches are free for the first change within 6 months."
//     },
//     {
//       id: 7,
//       category: 'courses',
//       question: "Do you offer group classes or only private lessons?",
//       answer: "We offer both private one-on-one lessons and small group classes (2-4 students). Private lessons provide personalized attention, while group classes offer collaborative learning and peer motivation. Many students combine both for a comprehensive musical education.",
//       additionalInfo: "Group classes are 30% more affordable than private lessons."
//     },

//     // Pricing & Payment
//     {
//       id: 8,
//       category: 'pricing',
//       question: "What are your payment options and plans?",
//       answer: "We offer flexible payment options including monthly subscriptions, package deals, and pay-as-you-go plans. Monthly subscriptions start at $149/month, while individual lessons range from $60-120 per session. We accept credit cards, debit cards, PayPal, and offer payment plans for longer commitments.",
//       additionalInfo: "Annual subscriptions save you 20% compared to monthly payments."
//     },
//     {
//       id: 9,
//       category: 'pricing',
//       question: "Do you offer scholarships or financial aid?",
//       answer: "Yes, we believe music education should be accessible to everyone. We offer merit-based scholarships, need-based financial aid, and family discounts. We also have work-study programs where students can assist with administrative tasks in exchange for reduced tuition.",
//       additionalInfo: "Application deadlines for scholarships are quarterly - next deadline is March 31st."
//     },
//     {
//       id: 10,
//       category: 'pricing',
//       question: "What is your cancellation and refund policy?",
//       answer: "You can cancel or reschedule lessons with 24 hours notice without charge. For cancellations within 24 hours, we charge 50% of the lesson fee. Package purchases are refundable within 30 days for unused sessions. Monthly subscriptions can be canceled anytime with 30 days notice.",
//       additionalInfo: "Emergency cancellations due to illness are handled case by case with doctor's note."
//     },

//     // Registration & Enrollment
//     {
//       id: 11,
//       category: 'registration',
//       question: "How do I enroll in classes?",
//       answer: "Enrollment is simple: 1) Schedule a free trial lesson to meet your instructor, 2) Complete the enrollment form online, 3) Choose your preferred lesson package, and 4) Schedule your regular lesson times. Our enrollment team will guide you through every step of the process.",
//       additionalInfo: "Most students complete enrollment within 24 hours."
//     },
//     {
//       id: 12,
//       category: 'registration',
//       question: "Do you offer trial lessons?",
//       answer: "Yes! We highly recommend starting with a free 30-minute trial lesson. This allows you to meet your potential instructor, experience our teaching style, discuss your goals, and ensure it's the right fit before committing. Trial lessons are completely free with no obligation.",
//       additionalInfo: "95% of students who take trial lessons enroll in our programs."
//     },
//     {
//       id: 13,
//       category: 'registration',
//       question: "What is your class scheduling flexibility?",
//       answer: "We offer flexible scheduling with lessons available 7 days a week from 8 AM to 9 PM. You can choose fixed weekly time slots or flexible scheduling based on instructor availability. We also make scheduling changes easy through our student portal or mobile app.",
//       additionalInfo: "Evening and weekend slots are most popular - book early to secure your preferred time."
//     },

//     // Student Support
//     {
//       id: 14,
//       category: 'support',
//       question: "What support do you provide outside of lessons?",
//       answer: "Beyond scheduled lessons, we provide comprehensive support including: practice materials, video tutorials, progress tracking, performance opportunities, student community access, and 24/7 online support. Our instructors are also available for quick questions between lessons via our student portal.",
//       additionalInfo: "Students who use our additional resources progress 40% faster."
//     },
//     {
//       id: 15,
//       category: 'support',
//       question: "How do you track student progress?",
//       answer: "We use a comprehensive progress tracking system that includes: regular assessments, performance recordings, skill checklists, and personalized feedback reports. Parents receive monthly progress updates, and all students have access to their progress dashboard showing achievements and areas for improvement.",
//       additionalInfo: "Digital progress reports are available in your student portal anytime."
//     },
//     {
//       id: 16,
//       category: 'support',
//       question: "Do you offer performance opportunities?",
//       answer: "Absolutely! We organize regular student recitals, community performances, and annual concerts. Students also have opportunities to participate in competitions, recording sessions, and collaborate with other musicians. Performance is an essential part of musical development and we provide ample opportunities to showcase your skills.",
//       additionalInfo: "Next student recital: April 15th - registration opens March 1st."
//     },

//     // Technical & Online
//     {
//       id: 17,
//       category: 'technical',
//       question: "Do you offer online lessons?",
//       answer: "Yes, we offer high-quality online lessons through our dedicated platform. Online lessons include: HD video streaming, digital sheet music sharing, real-time annotation, recording features, and integrated practice tools. Many students successfully learn online with the same excellent results as in-person lessons.",
//       additionalInfo: "Online lessons are perfect for busy schedules and eliminate travel time."
//     },
//     {
//       id: 18,
//       category: 'technical',
//       question: "What equipment do I need for online lessons?",
//       answer: "For online lessons, you'll need: a computer/tablet with webcam, stable internet connection, and your instrument. We recommend headphones for better audio quality. Our platform works on all major browsers and we provide technical support to ensure smooth lesson experiences.",
//       additionalInfo: "Most modern laptops and tablets work perfectly with our platform."
//     },
//     {
//       id: 19,
//       category: 'technical',
//       question: "Can I access learning materials online?",
//       answer: "Yes! All students get access to our comprehensive online learning portal featuring: video lessons, sheet music library, practice exercises, theory resources, and progress tracking. The portal is accessible 24/7 from any device, allowing you to learn and practice anytime, anywhere.",
//       additionalInfo: "Our portal adds new content weekly to keep learning fresh and engaging."
//     }
//   ];

//   // Categories
//   const categories = [
//     { 
//       id: 'all', 
//       name: 'All Questions', 
//       icon: <SearchIcon className="w-4 h-4" />, 
//       count: faqData.length 
//     },
//     { 
//       id: 'general', 
//       name: 'General', 
//       icon: <MusicNoteIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'general').length 
//     },
//     { 
//       id: 'courses', 
//       name: 'Courses', 
//       icon: <BookIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'courses').length 
//     },
//     { 
//       id: 'pricing', 
//       name: 'Pricing', 
//       icon: <PaymentIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'pricing').length 
//     },
//     { 
//       id: 'registration', 
//       name: 'Registration', 
//       icon: <UserIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'registration').length 
//     },
//     { 
//       id: 'support', 
//       name: 'Support', 
//       icon: <SupportIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'support').length 
//     },
//     { 
//       id: 'technical', 
//       name: 'Technical', 
//       icon: <SupportIcon className="w-4 h-4" />, 
//       count: faqData.filter(f => f.category === 'technical').length 
//     }
//   ];

//   // Filter FAQs based on category and search
//   const filteredFAQs = faqData.filter(faq => {
//     const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
//     const matchesSearch = searchQuery === '' || 
//       faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const toggleFAQ = (id) => {
//     const newOpenItems = new Set(openItems);
//     if (newOpenItems.has(id)) {
//       newOpenItems.delete(id);
//     } else {
//       newOpenItems.add(id);
//     }
//     setOpenItems(newOpenItems);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 pt-20 ${
//       darkMode 
//         ? 'bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white' 
//         : 'bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white'
//     }`}>
//       {/* Header with Theme Toggle */}


//       {/* Hero Section */}
//       <section className={`relative py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden ${
//         darkMode ? 'via-purple-700' : ''
//       }`}>
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute top-4 xsm:top-6 left-4 xsm:left-6 opacity-10">
//           <SupportIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
//         </div>
//         <div className="absolute bottom-4 xsm:bottom-6 right-4 xsm:right-6 opacity-10">
//           <SearchIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
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
//               Frequently Asked <span className="text-cyan-300">Questions</span>
//             </motion.h1>
//             <motion.p 
//               className="text-base xsm:text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 xsm:mb-8 leading-relaxed"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               Find answers to common questions about our music programs, enrollment process, 
//               pricing, and everything you need to start your musical journey.
//             </motion.p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className={`py-8 xsm:py-12 sm:py-16 transition-colors duration-300 ${
//         darkMode ? 'bg-gray-800' : 'bg-white'
//       }`}>
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl mx-auto"
//           >
//             <div className="relative">
//               <SearchIcon className={`absolute left-4 xsm:left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 xsm:w-6 xsm:h-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-400'
//               }`} />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for answers..."
//                 className={`w-full pl-12 xsm:pl-16 pr-12 xsm:pr-16 py-4 xsm:py-5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base xsm:text-lg shadow-lg transition-colors duration-300 ${
//                   darkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
//                 }`}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className={`absolute right-4 xsm:right-6 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
//                   }`}
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//             <p className={`text-center text-sm xsm:text-base mt-3 xsm:mt-4 ${
//               darkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               {filteredFAQs.length} questions found
//               {searchQuery && ` for "${searchQuery}"`}
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* FAQ Content */}
//       <section className="py-12 xsm:py-16 sm:py-20 lg:py-24">
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
//           {/* Category Filters */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8 xsm:mb-12 sm:mb-16"
//           >
//             <CategoryFilter
//               categories={categories}
//               activeCategory={activeCategory}
//               onCategoryChange={setActiveCategory}
//               darkMode={darkMode}
//             />
//           </motion.div>

//           {/* FAQ List */}
//           <div className="max-w-4xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-4 xsm:space-y-5 sm:space-y-6"
//             >
//               {filteredFAQs.length > 0 ? (
//                 filteredFAQs.map((faq, index) => (
//                   <FAQItem
//                     key={faq.id}
//                     faq={faq}
//                     isOpen={openItems.has(faq.id)}
//                     onClick={() => toggleFAQ(faq.id)}
//                     index={index}
//                     darkMode={darkMode}
//                   />
//                 ))
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className={`text-center py-12 xsm:py-16 rounded-2xl shadow-lg ${
//                     darkMode ? 'bg-gray-800' : 'bg-white'
//                   }`}
//                 >
//                   <SearchIcon className={`w-12 h-12 xsm:w-16 xsm:h-16 mx-auto mb-4 ${
//                     darkMode ? 'text-gray-600' : 'text-gray-400'
//                   }`} />
//                   <h3 className={`text-xl xsm:text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}>
//                     No questions found
//                   </h3>
//                   <p className={`text-sm xsm:text-base max-w-md mx-auto ${
//                     darkMode ? 'text-gray-400' : 'text-gray-500'
//                   }`}>
//                     {searchQuery 
//                       ? `We couldn't find any questions matching "${searchQuery}". Try different keywords or browse by category.`
//                       : "No questions available in this category. Please select another category."
//                     }
//                   </p>
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Contact CTA */}
//       <section className={`py-12 xsm:py-16 sm:py-20 transition-colors duration-300 ${
//         darkMode ? 'bg-gray-800' : 'bg-gray-50'
//       }`}>
//         <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <h2 className={`text-2xl xsm:text-3xl sm:text-4xl font-bold mb-4 xsm:mb-6 ${
//               darkMode ? 'text-white' : 'text-gray-800'
//             }`}>
//               Still Have Questions?
//             </h2>
//             <p className={`text-base xsm:text-lg sm:text-xl mb-6 xsm:mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-300' : 'text-gray-600'
//             }`}>
//               Our friendly support team is here to help you with any additional questions 
//               about our music programs, enrollment process, or anything else you'd like to know.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 xsm:gap-6 justify-center items-center">
//               <motion.a
//                 href="mailto:support@ndzinote.com"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-3 bg-purple-600 text-white font-bold py-3 xsm:py-4 px-6 xsm:px-8 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg"
//               >
//                 <EmailIcon className="w-5 h-5" />
//                 Email Support
//               </motion.a>
//               <motion.a
//                 href="tel:+15551234567"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`flex items-center gap-3 font-bold py-3 xsm:py-4 px-6 xsm:px-8 rounded-xl border transition-all duration-300 shadow-lg ${
//                   darkMode
//                     ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
//                     : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 <PhoneIcon className="w-5 h-5" />
//                 Call Now
//               </motion.a>
//             </div>
//             <div className="mt-6 xsm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 xsm:gap-6 max-w-md mx-auto">
//               <div className={`text-center p-4 rounded-xl shadow-lg ${
//                 darkMode ? 'bg-gray-700' : 'bg-white'
//               }`}>
//                 <EmailIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
//                 <p className={`font-semibold ${
//                   darkMode ? 'text-white' : 'text-gray-800'
//                 }`}>support@ndzinote.com</p>
//                 <p className={`text-sm ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>Email Response: Within 2 hours</p>
//               </div>
//               <div className={`text-center p-4 rounded-xl shadow-lg ${
//                 darkMode ? 'bg-gray-700' : 'bg-white'
//               }`}>
//                 <PhoneIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
//                 <p className={`font-semibold ${
//                   darkMode ? 'text-white' : 'text-gray-800'
//                 }`}>+1 (555) 123-4567</p>
//                 <p className={`text-sm ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>Phone Support: 9AM-9PM Daily</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };















































/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons
const ChevronDownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const BookIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
  </svg>
);

const PaymentIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
  </svg>
);

const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SupportIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

// FAQ Item Component
const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-white overflow-hidden bg-gradient-to-t from-[#1e4c9c] to-[#183772]"
    >
      <button
        onClick={onClick}
        className="w-full px-4 xsm:px-6 sm:px-8 py-4 xsm:py-5 sm:py-6 text-left flex items-center justify-between gap-4 transition-colors duration-200 "
      >
        <h3 className="text-base xsm:text-lg sm:text-xl font-semibold flex-1 pr-4 text-white">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-6 h-6 xsm:w-7 xsm:h-7 text-purple-600"
        >
          {isOpen ? <ChevronUpIcon className='text-blue-600 font-bold' /> : <ChevronDownIcon className='text-green-600 font-bold' />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white"
          >
            <div className="px-4 xsm:px-6 sm:px-8 pb-4 xsm:pb-5 sm:pb-6">
              <p className="leading-relaxed text-sm xsm:text-base text-gray-100">
                {faq.answer}
              </p>
              {faq.additionalInfo && (
                <div className="mt-3 xsm:mt-4 p-3 xsm:p-4 rounded-lg border bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
                  <p className="text-xs xsm:text-sm font-medium text-white">
                    {faq.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 xsm:gap-3 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 xsm:px-5 py-2 xsm:py-2.5 rounded-xl font-semibold text-xs xsm:text-sm transition-all ${
            activeCategory === category.id
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.icon}
          {category.name}
          <span className={`px-2 py-1 rounded-full text-xs ${
            activeCategory === category.id
              ? 'bg-white/20 text-white'
              : 'bg-white text-gray-700'
          }`}>
            {category.count}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  // FAQ Data
  const faqData = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: "What makes NdziNote Academy different from other music schools?",
      answer: "NdziNote Academy combines traditional music education with innovative teaching methods. We offer personalized learning paths, master-level instruction from professional musicians, performance opportunities, and state-of-the-art facilities. Our unique approach focuses on both technical proficiency and artistic expression.",
      additionalInfo: "Our student success rate is 98%, with many students achieving their musical goals within the first year."
    },
    {
      id: 2,
      category: 'general',
      question: "Do I need any prior musical experience to join?",
      answer: "No prior experience is necessary! We welcome students of all levels - from complete beginners to advanced musicians. Our curriculum is designed to meet you where you are and help you progress at your own pace. Beginners start with foundational skills while advanced students focus on mastery and performance.",
      additionalInfo: "Over 60% of our students start as complete beginners."
    },
    {
      id: 3,
      category: 'general',
      question: "What age groups do you teach?",
      answer: "We teach students of all ages from 5 years old to adults. Our programs are tailored to different age groups: Children (5-12), Teens (13-17), and Adults (18+). Each age group has specially designed curriculum and teaching approaches to maximize learning effectiveness.",
      additionalInfo: "We offer family discounts for multiple enrollments from the same household."
    },

    // Courses & Classes
    {
      id: 4,
      category: 'courses',
      question: "What instruments do you offer lessons for?",
      answer: "We offer comprehensive lessons for piano, guitar (acoustic, electric, and bass), violin, viola, cello, drums, and voice. Additionally, we provide specialized programs in music theory, composition, songwriting, and music production. Each instrument has multiple skill levels from beginner to professional.",
      additionalInfo: "New instruments are added regularly based on student demand."
    },
    {
      id: 5,
      category: 'courses',
      question: "How long are the typical lesson sessions?",
      answer: "Lesson durations vary based on the program and student level: 30 minutes for young beginners, 45 minutes for intermediate students, and 60 minutes for advanced students and adults. We also offer extended 90-minute sessions for intensive training and master classes.",
      additionalInfo: "Most students start with 45-minute sessions for optimal learning balance."
    },
    {
      id: 6,
      category: 'courses',
      question: "Can I switch instruments or instructors if needed?",
      answer: "Yes, absolutely! We understand that musical interests can evolve. You can switch instruments or request a different instructor at any time. We'll work with you to find the perfect match and ensure a smooth transition without disrupting your learning progress.",
      additionalInfo: "Instrument switches are free for the first change within 6 months."
    },
    {
      id: 7,
      category: 'courses',
      question: "Do you offer group classes or only private lessons?",
      answer: "We offer both private one-on-one lessons and small group classes (2-4 students). Private lessons provide personalized attention, while group classes offer collaborative learning and peer motivation. Many students combine both for a comprehensive musical education.",
      additionalInfo: "Group classes are 30% more affordable than private lessons."
    },

    // Pricing & Payment
    {
      id: 8,
      category: 'pricing',
      question: "What are your payment options and plans?",
      answer: "We offer flexible payment options including monthly subscriptions, package deals, and pay-as-you-go plans. Monthly subscriptions start at $149/month, while individual lessons range from $60-120 per session. We accept credit cards, debit cards, PayPal, and offer payment plans for longer commitments.",
      additionalInfo: "Annual subscriptions save you 20% compared to monthly payments."
    },
    {
      id: 9,
      category: 'pricing',
      question: "Do you offer scholarships or financial aid?",
      answer: "Yes, we believe music education should be accessible to everyone. We offer merit-based scholarships, need-based financial aid, and family discounts. We also have work-study programs where students can assist with administrative tasks in exchange for reduced tuition.",
      additionalInfo: "Application deadlines for scholarships are quarterly - next deadline is March 31st."
    },
    {
      id: 10,
      category: 'pricing',
      question: "What is your cancellation and refund policy?",
      answer: "You can cancel or reschedule lessons with 24 hours notice without charge. For cancellations within 24 hours, we charge 50% of the lesson fee. Package purchases are refundable within 30 days for unused sessions. Monthly subscriptions can be canceled anytime with 30 days notice.",
      additionalInfo: "Emergency cancellations due to illness are handled case by case with doctor's note."
    },

    // Registration & Enrollment
    {
      id: 11,
      category: 'registration',
      question: "How do I enroll in classes?",
      answer: "Enrollment is simple: 1) Schedule a free trial lesson to meet your instructor, 2) Complete the enrollment form online, 3) Choose your preferred lesson package, and 4) Schedule your regular lesson times. Our enrollment team will guide you through every step of the process.",
      additionalInfo: "Most students complete enrollment within 24 hours."
    },
    {
      id: 12,
      category: 'registration',
      question: "Do you offer trial lessons?",
      answer: "Yes! We highly recommend starting with a free 30-minute trial lesson. This allows you to meet your potential instructor, experience our teaching style, discuss your goals, and ensure it's the right fit before committing. Trial lessons are completely free with no obligation.",
      additionalInfo: "95% of students who take trial lessons enroll in our programs."
    },
    {
      id: 13,
      category: 'registration',
      question: "What is your class scheduling flexibility?",
      answer: "We offer flexible scheduling with lessons available 7 days a week from 8 AM to 9 PM. You can choose fixed weekly time slots or flexible scheduling based on instructor availability. We also make scheduling changes easy through our student portal or mobile app.",
      additionalInfo: "Evening and weekend slots are most popular - book early to secure your preferred time."
    },

    // Student Support
    {
      id: 14,
      category: 'support',
      question: "What support do you provide outside of lessons?",
      answer: "Beyond scheduled lessons, we provide comprehensive support including: practice materials, video tutorials, progress tracking, performance opportunities, student community access, and 24/7 online support. Our instructors are also available for quick questions between lessons via our student portal.",
      additionalInfo: "Students who use our additional resources progress 40% faster."
    },
    {
      id: 15,
      category: 'support',
      question: "How do you track student progress?",
      answer: "We use a comprehensive progress tracking system that includes: regular assessments, performance recordings, skill checklists, and personalized feedback reports. Parents receive monthly progress updates, and all students have access to their progress dashboard showing achievements and areas for improvement.",
      additionalInfo: "Digital progress reports are available in your student portal anytime."
    },
    {
      id: 16,
      category: 'support',
      question: "Do you offer performance opportunities?",
      answer: "Absolutely! We organize regular student recitals, community performances, and annual concerts. Students also have opportunities to participate in competitions, recording sessions, and collaborate with other musicians. Performance is an essential part of musical development and we provide ample opportunities to showcase your skills.",
      additionalInfo: "Next student recital: April 15th - registration opens March 1st."
    },

    // Technical & Online
    {
      id: 17,
      category: 'technical',
      question: "Do you offer online lessons?",
      answer: "Yes, we offer high-quality online lessons through our dedicated platform. Online lessons include: HD video streaming, digital sheet music sharing, real-time annotation, recording features, and integrated practice tools. Many students successfully learn online with the same excellent results as in-person lessons.",
      additionalInfo: "Online lessons are perfect for busy schedules and eliminate travel time."
    },
    {
      id: 18,
      category: 'technical',
      question: "What equipment do I need for online lessons?",
      answer: "For online lessons, you'll need: a computer/tablet with webcam, stable internet connection, and your instrument. We recommend headphones for better audio quality. Our platform works on all major browsers and we provide technical support to ensure smooth lesson experiences.",
      additionalInfo: "Most modern laptops and tablets work perfectly with our platform."
    },
    {
      id: 19,
      category: 'technical',
      question: "Can I access learning materials online?",
      answer: "Yes! All students get access to our comprehensive online learning portal featuring: video lessons, sheet music library, practice exercises, theory resources, and progress tracking. The portal is accessible 24/7 from any device, allowing you to learn and practice anytime, anywhere.",
      additionalInfo: "Our portal adds new content weekly to keep learning fresh and engaging."
    }
  ];

  // Categories
  const categories = [
    { 
      id: 'all', 
      name: 'All Questions', 
      icon: <SearchIcon className="w-4 h-4" />, 
      count: faqData.length 
    },
    { 
      id: 'general', 
      name: 'General', 
      icon: <MusicNoteIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'general').length 
    },
    { 
      id: 'courses', 
      name: 'Courses', 
      icon: <BookIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'courses').length 
    },
    { 
      id: 'pricing', 
      name: 'Pricing', 
      icon: <PaymentIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'pricing').length 
    },
    { 
      id: 'registration', 
      name: 'Registration', 
      icon: <UserIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'registration').length 
    },
    { 
      id: 'support', 
      name: 'Support', 
      icon: <SupportIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'support').length 
    },
    { 
      id: 'technical', 
      name: 'Technical', 
      icon: <SupportIcon className="w-4 h-4" />, 
      count: faqData.filter(f => f.category === 'technical').length 
    }
  ];

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen transition-colors duration-300 pt-20 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
      {/* Hero Section */}
      <section className="relative py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 xsm:top-6 left-4 xsm:left-6 opacity-10">
          <SupportIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="absolute bottom-4 xsm:bottom-6 right-4 xsm:right-6 opacity-10">
          <SearchIcon className="w-8 h-8 xsm:w-12 xsm:h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-2xl xsm:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xsm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Frequently Asked <span className="text-cyan-300">Questions</span>
            </motion.h1>
            <motion.p 
              className="text-base xsm:text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 xsm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Find answers to common questions about our music programs, enrollment process, 
              pricing, and everything you need to start your musical journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 xsm:py-12 sm:py-16 transition-colors duration-300 bg-gradient-to-t from-[#1e4c9c] to-[#183772] text-white">
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <SearchIcon className="absolute left-4 xsm:left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 xsm:w-6 xsm:h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 xsm:pl-16 pr-12 xsm:pr-16 py-4 xsm:py-5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base xsm:text-lg shadow-lg transition-colors duration-300 bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 xsm:right-6 top-1/2 transform -translate-y-1/2 transition-colors text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-center text-sm xsm:text-base mt-3 xsm:mt-4 text-gray-100">
              {filteredFAQs.length} questions found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 xsm:py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 xsm:mb-12 sm:mb-16"
          >
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 xsm:space-y-5 sm:space-y-6"
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onClick={() => toggleFAQ(faq.id)}
                    index={index}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 xsm:py-16 rounded-2xl shadow-lg bg-white"
                >
                  <SearchIcon className="w-12 h-12 xsm:w-16 xsm:h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl xsm:text-2xl font-bold mb-2 text-gray-600">
                    No questions found
                  </h3>
                  <p className="text-sm xsm:text-base max-w-md mx-auto text-gray-500">
                    {searchQuery 
                      ? `We couldn't find any questions matching "${searchQuery}". Try different keywords or browse by category.`
                      : "No questions available in this category. Please select another category."
                    }
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 xsm:py-16 sm:py-20 transition-colors duration-300 bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
        <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl xsm:text-3xl sm:text-4xl font-bold mb-4 xsm:mb-6 text-white">
              Still Have Questions?
            </h2>
            <p className="text-base xsm:text-lg sm:text-xl mb-6 xsm:mb-8 max-w-2xl mx-auto text-gray-100">
              Our friendly support team is here to help you with any additional questions 
              about our music programs, enrollment process, or anything else you'd like to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 xsm:gap-6 justify-center items-center">
              <motion.a
                href="mailto:support@ndzinote.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-purple-600 text-white font-bold py-3 xsm:py-4 px-6 xsm:px-8 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg"
              >
                <EmailIcon className="w-5 h-5" />
                Email Support
              </motion.a>
              <motion.a
                href="tel:+15551234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 font-bold py-3 xsm:py-4 px-6 xsm:px-8 rounded-xl border transition-all duration-300 shadow-lg bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
              >
                <PhoneIcon className="w-5 h-5" />
                Call Now
              </motion.a>
            </div>
            <div className="mt-6 xsm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 xsm:gap-6 max-w-md mx-auto">
              <div className="text-center p-4 rounded-xl shadow-lg bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
                <EmailIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-100">support@ndzinote.com</p>
                <p className="text-sm text-gray-100">Email Response: Within 24 hours</p>
              </div>
              <div className="text-center p-4 rounded-xl shadow-lg bg-gradient-to-t from-[#1e4c9c] to-[#183772]">
                <PhoneIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-100">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-100">Phone Support: 9AM-9PM Daily</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};