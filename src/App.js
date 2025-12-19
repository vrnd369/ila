import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "./App.css";

import bgImage from "./assets/mainpage2.png";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import HighlightsSection from "./sections/HighlightsSection";
import AmenitiesSection from "./sections/AmenitiesSection";
import MasterplanSection from "./sections/MasterplanSection";
import ContactUsSection from "./sections/ContactUsSection";


const IMAGE_HEIGHT = 33648;

// Desktop section anchors (default)
const SECTION_ANCHORS_DESKTOP = [
  { id: "home", y: 3500 },
  { id: "about", y: 5000 },
  { id: "highlights", y: 9500 },
  { id: "amenities", y: 16000 },
  { id: "masterplan", y: 21200 },
  { id: "contactus", y: 30000 },
];

// Tablet section anchors (768px - 1024px)
const SECTION_ANCHORS_TABLET = [
  { id: "home", y: 2500 },
  { id: "about", y: 3800 },
  { id: "highlights", y: 7200 },
  { id: "amenities", y: 12000 },
  { id: "masterplan", y: 16000 },
  { id: "contactus", y: 23000 },
];

// Mobile section anchors (below 768px) - Adjusted to stay within image bounds
const SECTION_ANCHORS_MOBILE = [
  { id: "home", y: 2400 },
  { id: "about", y: 4500 },
  { id: "highlights", y: 9500 },
  { id: "amenities", y: 16000 },
  { id: "masterplan", y: 23000 },
  { id: "contactus", y: 31000 },
];

// Function to get appropriate section anchors based on screen size
const getSectionAnchors = (width) => {
  if (width < 768) {
    return SECTION_ANCHORS_MOBILE;
  } else if (width < 1024) {
    return SECTION_ANCHORS_TABLET;
  }
  return SECTION_ANCHORS_DESKTOP;
};

export default function App() {
  const imgRef = useRef(null);
  const wrapRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  const [imgHeight, setImgHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1920; // Default to desktop width
  });

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = useMemo(() => {
    const anchors = getSectionAnchors(windowWidth);
    return anchors.map((s) => ({
      ...s,
      ratio: s.y / IMAGE_HEIGHT,
    }));
  }, [windowWidth]);

  // ✅ Measure AFTER image loads + on resize
  useEffect(() => {
    // Optimize font loading - load critical fonts first
    if ('fonts' in document) {
      // Load critical fonts immediately for faster rendering
      const criticalFonts = [
        '300 1em "Playfair Display"',
        '300 1em "Cormorant Garamond"',
      ];
      
      Promise.all(
        criticalFonts.map(font => document.fonts.load(font))
      ).then(() => {
        // Critical fonts loaded
      }).catch(() => {
        // Fonts failed, continue anyway
      });
      
      // Wait for all fonts to be ready (non-blocking)
      document.fonts.ready.then(() => {
        // All fonts loaded
      });
    }

    const measure = () => {
      if (!imgRef.current) return;
      setImgHeight(imgRef.current.getBoundingClientRect().height);
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete) measure();
      img.addEventListener("load", measure);
    }

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      if (img) img.removeEventListener("load", measure);
    };
  }, []);

  useEffect(() => {
    // Safety timeout so the loader never gets stuck if the video fails
    const timeoutId = setTimeout(() => setShowLoader(false), 12000);
    return () => clearTimeout(timeoutId);
  }, []);


  const handleLoaderFinish = useCallback(() => {
    setShowLoader(false);
    // Scroll to top of page (logo and navbar) after loading finishes
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 100);
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      if (!imgHeight) return;

      const section = sections.find((s) => s.id === id);
      if (!section || !wrapRef.current) return;

      const NAV_HEIGHT = 70;
      const wrapTop = wrapRef.current.getBoundingClientRect().top + window.scrollY;

      const y = wrapTop + section.ratio * imgHeight - NAV_HEIGHT;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth",
      });
    },
    [imgHeight, sections]
  );

  return (
    <div className="page">
      {showLoader && <LoadingScreen onFinish={handleLoaderFinish} />}

      <Navbar scrollToSection={scrollToSection} />

      <div className="posterWrap" ref={wrapRef}>
        <img ref={imgRef} src={bgImage} alt="ILA" className="posterImg" />

        {imgHeight > 0 &&
          sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="overlay"
              style={{ top: `${s.ratio * imgHeight}px` }}
            >
              {s.id === "home" && <HomeSection />}
              {s.id === "about" && <AboutSection />}
              {s.id === "highlights" && <HighlightsSection />}
              {s.id === "amenities" && <AmenitiesSection />}
              {s.id === "masterplan" && <MasterplanSection />}
              {s.id === "contactus" && <ContactUsSection />}
            </div>
          ))}
        
        {imgHeight > 0 && (
          <div 
            className="footerWrapper"
            style={{ 
              position: 'absolute', 
              top: `${imgHeight}px`, 
              left: 0, 
              right: 0, 
              zIndex: 2,
              transform: windowWidth < 768 ? 'translateY(0)' : 'translateY(-100%)'
            }}
          >
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
