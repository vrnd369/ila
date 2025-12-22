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
// Wait for fonts to load before rendering to prevent layout shifts
// This ensures consistent measurements between development and production

// Prevent scroll restoration
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Don't scroll to top here - let the loading screen handle it after video finishes
// This prevents scrolling to top during hot reloads in development

// Wait for fonts to load before rendering to ensure consistent layout
// Also wait a bit for CSS to be fully applied in production
const renderApp = () => {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App />);
};

if (typeof window !== 'undefined' && document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    // Fonts are loaded, wait longer for CSS to be fully applied
    // This ensures consistent rendering between development and production
    // Production needs more time for CSS to be fully processed
    setTimeout(() => {
      renderApp();
    }, 150); // Increased delay for production stability
  });
} else {
  // Fallback for browsers without Font Loading API
  // Wait longer to ensure CSS is loaded
  setTimeout(() => {
    renderApp();
  }, 250);
}
