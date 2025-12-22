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

/** Your poster image height in pixels (you already have this) */
const POSTER_H = 33648;

/** Desktop anchors */
const SECTION_ANCHORS_DESKTOP = [
  { id: "home", y: 3500 },
  { id: "about", y: 5000 },
  { id: "highlights", y: 9600 },
  { id: "amenities", y: 16100 },
  { id: "masterplan", y: 21300 },
  { id: "contactus", y: 30000 },
];

/** Tablet anchors */
const SECTION_ANCHORS_TABLET = [
  { id: "home", y: 2500 },
  { id: "about", y: 3800 },
  { id: "highlights", y: 7200 },
  { id: "amenities", y: 12000 },
  { id: "masterplan", y: 15500 },
  { id: "contactus", y: 23000 },
];

/** Mobile anchors */
const SECTION_ANCHORS_MOBILE = [
  { id: "home", y: 2400 },
  { id: "about", y: 4500 },
  { id: "highlights", y: 9500 },
  { id: "amenities", y: 16000 },
  { id: "masterplan", y: 22500 },
  { id: "contactus", y: 31000 },
];

const getSectionAnchors = (width) => {
  if (width < 768) return SECTION_ANCHORS_MOBILE;
  if (width < 1024) return SECTION_ANCHORS_TABLET;
  return SECTION_ANCHORS_DESKTOP;
};

export default function App() {
  const wrapRef = useRef(null);

  // ✅ detect poster width so we can set aspect-ratio => stable height on refresh
  const [posterW, setPosterW] = useState(0);

  // ✅ stable height for overlay positioning (based on wrapper, not img)
  const [wrapHeight, setWrapHeight] = useState(0);

  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  // ✅ keep your loader (simplified: always show on hard refresh)
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return true;

    const navEntry = performance.getEntriesByType("navigation")[0];
    const isHardLoad =
      navEntry && (navEntry.type === "reload" || navEntry.type === "navigate");

    if (isHardLoad) {
      sessionStorage.removeItem("loaderShownTime");
      return true;
    }

    const t = sessionStorage.getItem("loaderShownTime");
    if (t) {
      const dt = Date.now() - parseInt(t, 10);
      if (dt < 300) return false;
    }
    return true;
  });

  // ✅ detect naturalWidth once
  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setPosterW(img.naturalWidth);
  }, []);

  // window width updates
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ratios from poster pixel coords
  const sections = useMemo(() => {
    const anchors = getSectionAnchors(windowWidth);
    return anchors.map((s) => ({ ...s, ratio: s.y / POSTER_H }));
  }, [windowWidth]);

  // ✅ measure wrapper height (stable because wrapper has aspect-ratio)
  const measureWrapHeight = useCallback(() => {
    if (!wrapRef.current) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const h = wrapRef.current.getBoundingClientRect().height;
        if (h > 0) setWrapHeight(h);
      });
    });
  }, []);

  useEffect(() => {
    if (!posterW) return;

    measureWrapHeight();

    const onResize = () => measureWrapHeight();
    const onLoad = () => measureWrapHeight();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
    };
  }, [posterW, measureWrapHeight]);

  // lock scroll while loader visible (optional, but stable now due to scrollbar-gutter)
  useEffect(() => {
    if (showLoader) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.overflowX = "hidden";
      // re-measure after unlock
      measureWrapHeight();
    }
  }, [showLoader, measureWrapHeight]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const handleLoaderFinish = useCallback(() => {
    setShowLoader(false);
    sessionStorage.setItem("loaderShownTime", Date.now().toString());

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 50);
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 200);
    });
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      if (!wrapHeight || !wrapRef.current) return;

      const section = sections.find((s) => s.id === id);
      if (!section) return;

      const NAV_HEIGHT = 70;
      const wrapTop = wrapRef.current.getBoundingClientRect().top + window.scrollY;
      const y = wrapTop + section.ratio * wrapHeight - NAV_HEIGHT;

      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    },
    [wrapHeight, sections]
  );

  const wrapStyle = posterW
    ? { aspectRatio: `${posterW} / ${POSTER_H}` }
    : { minHeight: "100vh" };

  return (
    <div className="page">
      {showLoader && <LoadingScreen onFinish={handleLoaderFinish} />}

      <Navbar scrollToSection={scrollToSection} />

      <div className="posterWrap" ref={wrapRef} style={wrapStyle}>
        <img
          src={bgImage}
          alt="ILA"
          className="posterImg"
          loading="eager"
          decoding="async"
        />

        {wrapHeight > 0 &&
          sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="overlay"
              style={{ top: `${s.ratio * wrapHeight}px` }}
            >
              {s.id === "home" && <HomeSection />}
              {s.id === "about" && <AboutSection />}
              {s.id === "highlights" && <HighlightsSection />}
              {s.id === "amenities" && <AmenitiesSection />}
              {s.id === "masterplan" && <MasterplanSection />}
              {s.id === "contactus" && <ContactUsSection />}
            </div>
          ))}

        {/* Footer pinned to bottom of the poster */}
        <div className="footerWrapper">
          <Footer />
        </div>
      </div>
    </div>
  );
}
