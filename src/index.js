import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import all CSS at root level to prevent FOUC (Flash of Unstyled Content)
import "./index.css";
import "./App.css";
import "./components/Navbar.css";
import "./components/Footer.css";
import "./components/LoadingScreen.css";
import "./sections/HomeSection.css";
import "./sections/AboutSection.css";
import "./sections/HighlightsSection.css";
import "./sections/AmenitiesSection.css";
import "./sections/MasterplanSection.css";
import "./sections/ContactUsSection.css";
import "./sections/SectionText.css";

// Fonts are preloaded in index.html with display=swap
// No need for complex JS font loading - browser handles it efficiently

// Prevent scroll restoration and ensure page starts at top
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Ensure page starts at top on initial load
window.scrollTo(0, 0);

// Prevent any hash-based scrolling
if (window.location.hash) {
  window.location.hash = '';
  window.scrollTo(0, 0);
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
