import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  { id: "highlights", y: 9400 },
  { id: "amenities", y: 16200 },
  { id: "masterplan", y: 21100 },
  { id: "contactus", y: 30000 },
];

// Tablet section anchors (768px - 1024px)
const SECTION_ANCHORS_TABLET = [
  { id: "home", y: 2500 },
  { id: "about", y: 3800 },
  { id: "highlights", y: 7200 },
  { id: "amenities", y: 12000 },
  { id: "masterplan", y: 15500 },
  { id: "contactus", y: 23000 },
];

// Mobile section anchors (below 768px) - Adjusted to stay within image bounds
const SECTION_ANCHORS_MOBILE = [
  { id: "home", y: 2400 },
  { id: "about", y: 4500 },
  { id: "highlights", y: 9500 },
  { id: "amenities", y: 16000 },
  { id: "masterplan", y: 22500 },
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
  // Show loader on every page load/refresh
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check navigation type to detect page refresh vs hot reload
      const navEntry = performance.getEntriesByType('navigation')[0];
      const isPageRefresh = navEntry && (navEntry.type === 'reload' || navEntry.type === 'navigate');
      
      // If it's a page refresh or navigate, always show loader
      if (isPageRefresh) {
        // Clear any old timestamp on refresh
        sessionStorage.removeItem('loaderShownTime');
        return true;
      }
      
      // For hot reloads, check if loader was shown very recently (within 300ms)
      const loaderShownTime = sessionStorage.getItem('loaderShownTime');
      if (loaderShownTime) {
        const now = Date.now();
        const timeSinceLoader = now - parseInt(loaderShownTime, 10);
        // Only skip if loader was shown less than 300ms ago (definitely a hot reload)
        if (timeSinceLoader < 300) {
          return false; // Don't show loader on hot reload
        }
      }
      
      // Default: show loader
      return true;
    }
    return true;
  });
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

  // Measure image height after load to position sections correctly
  useEffect(() => {
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

  // Prevent scrolling while loader is visible
  useEffect(() => {
    if (showLoader) {
      // Lock scroll position while loading
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Don't scroll to top here - only when video finishes
    } else {
      // Unlock scroll after loader is hidden - restore normal scrolling
      // IMPORTANT: Only html should scroll, body should never create scrollbar
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      // Body should never create its own scrollbar
      document.body.style.overflow = '';
      document.body.style.overflowY = 'visible';
      document.body.style.overflowX = 'hidden';
    }
  }, [showLoader]);

  useEffect(() => {
    // Disable browser scroll restoration to prevent unwanted scrolling
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Don't set timeout - let the video finish naturally (8 seconds)
    // The video's "ended" event will call handleLoaderFinish
  }, [showLoader]);


  const handleLoaderFinish = useCallback(() => {
    setShowLoader(false);
    // Mark that loader has been shown with timestamp (prevents showing on hot reload)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('loaderShownTime', Date.now().toString());
    }
    // Only scroll to top when loading video finishes (first load)
    // This ensures scroll only happens after the video, not during hot reloads
    // Use multiple attempts to ensure we stay at top
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      // Force scroll again after delays to ensure it sticks and prevent any auto-scroll
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, 50);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, 200);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, 500);
    });
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
        <img 
          ref={imgRef} 
          src={bgImage} 
          alt="ILA" 
          className="posterImg"
          loading="eager"
          decoding="async"
        />

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
        
        {imgRef.current && imgHeight > 0 && (
          <div 
            className="footerWrapper"
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              zIndex: 2,
              width: '100%'
            }}
          >
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
