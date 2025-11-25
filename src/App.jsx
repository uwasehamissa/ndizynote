// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import "./App.css";
import { Navbar } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Classes } from "./pages/classes/Classes";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />\
        <Route path="/classes" element={<Classes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
