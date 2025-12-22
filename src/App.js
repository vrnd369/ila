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
  { id: "masterplan", y: 21300 },
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
  // Wait for fonts and CSS to fully load to ensure consistent measurements between dev and production
  useEffect(() => {
    let measurementTimeout = null;
    const MAX_RETRIES = 8; // Increased for production stability
    let lastHeight = 0;
    let stableMeasurements = 0;
    const REQUIRED_STABLE = 2; // Need 2 consecutive stable measurements
    
    const measure = () => {
      if (!imgRef.current) return;
      
      // Wait for fonts to load before measuring to ensure consistent layout
      // This prevents alignment differences between localhost and production
      const performMeasurement = (attempt = 0) => {
        // Use multiple requestAnimationFrame calls to ensure layout is fully complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => { // Extra frame for production stability
              if (imgRef.current) {
                const height = imgRef.current.getBoundingClientRect().height;
                // Only update if height is valid and stable
                if (height > 0) {
                  // Check if height is stable across multiple measurements
                  if (Math.abs(height - lastHeight) < 1) {
                    stableMeasurements++;
                    if (stableMeasurements >= REQUIRED_STABLE) {
                      // Height is stable, set it
                      setImgHeight(height);
                      return; // Exit once stable
                    }
                  } else {
                    // Height changed, reset counter
                    stableMeasurements = 0;
                    lastHeight = height;
                  }
                  
                  // Continue measuring if not stable yet
                  if (attempt < MAX_RETRIES) {
                    setTimeout(() => performMeasurement(attempt + 1), 100);
                  } else {
                    // Max retries reached, use current height
                    setImgHeight(height);
                  }
                } else if (attempt < MAX_RETRIES) {
                  // Height is 0, retry after delay
                  setTimeout(() => performMeasurement(attempt + 1), 150);
                }
              }
            });
          });
        });
      };

      // Wait for fonts to load, then wait longer for CSS to be fully applied
      // Production needs more time for resources to load
      const waitForFontsAndCSS = () => {
        if (document.fonts && document.fonts.ready) {
          // Wait for fonts to load
          document.fonts.ready.then(() => {
            // Longer delay for production to ensure CSS is fully applied
            // This is critical for production where CSS might load slightly later
            setTimeout(() => {
              performMeasurement();
            }, 300); // Increased from 150ms for production stability
          });
        } else {
          // Fallback for browsers without Font Loading API
          // Longer delay to allow fonts and CSS to load
          setTimeout(() => {
            performMeasurement();
          }, 500);
        }
      };

      waitForFontsAndCSS();
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete && img.naturalHeight > 0) {
        // Image already loaded, measure after fonts and CSS
        measure();
      } else {
        img.addEventListener("load", measure);
      }
    }

    // Also measure on window load to catch any late-loading resources
    // This is critical for production where resources load at different times
    const handleWindowLoad = () => {
      if (imgRef.current && imgRef.current.complete) {
        // Final measurement after everything is loaded
        // Longer delay to ensure all CSS and fonts are fully applied
        setTimeout(() => {
          measure();
        }, 500); // Final check after a longer delay for production
      }
    };
    
    if (document.readyState === 'complete') {
      // Document already loaded
      setTimeout(handleWindowLoad, 200);
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Debounce resize to prevent excessive measurements
    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reset stability counter on resize
        stableMeasurements = 0;
        lastHeight = 0;
        measure();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('load', handleWindowLoad);
      if (img) img.removeEventListener("load", measure);
      if (measurementTimeout) clearTimeout(measurementTimeout);
      if (resizeTimeout) clearTimeout(resizeTimeout);
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
