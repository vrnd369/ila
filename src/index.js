import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./App.css";

// Font loading optimization - Load critical fonts immediately
if ('fonts' in document) {
  // Load critical fonts immediately
  const loadCriticalFonts = async () => {
    try {
      await Promise.all([
        document.fonts.load('300 1em "Playfair Display"'),
        document.fonts.load('300 1em "Cormorant Garamond"'),
      ]);
      
      // Mark fonts as loaded
      document.documentElement.classList.add('fonts-loaded');
      document.body.classList.add('fonts-loaded');
    } catch (error) {
      // Fallback: show content anyway after short delay
      setTimeout(() => {
        document.documentElement.classList.add('fonts-timeout');
        document.body.classList.add('fonts-timeout');
      }, 100);
    }
  };
  
  // Start loading fonts immediately
  loadCriticalFonts();
  
  // Fallback timeout - show content after 1 second even if fonts aren't loaded
  setTimeout(() => {
    if (!document.body.classList.contains('fonts-loaded')) {
      document.documentElement.classList.add('fonts-timeout');
      document.body.classList.add('fonts-timeout');
    }
  }, 1000);
} else {
  // Browser doesn't support Font Loading API
  document.documentElement.classList.add('fonts-timeout');
  document.body.classList.add('fonts-timeout');
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
