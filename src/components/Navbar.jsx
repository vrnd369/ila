import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "highlights", label: "Highlights" },
  { id: "amenities", label: "Amenities" },
  { id: "masterplan", label: "Masterplan" },
  { id: "contactus", label: "Contact Us" },
];

export default function Navbar({ scrollToSection }) {
  const [open, setOpen] = useState(false);
  const openedAtRef = useRef(0);

  const openMenu = () => {
    openedAtRef.current = Date.now();
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!open) return;

    const safeToClose = () => Date.now() - openedAtRef.current > 200;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    const onAnyScrollIntent = () => {
      if (safeToClose()) closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onAnyScrollIntent, { passive: true });
    window.addEventListener("wheel", onAnyScrollIntent, { passive: true });
    window.addEventListener("touchmove", onAnyScrollIntent, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onAnyScrollIntent);
      window.removeEventListener("wheel", onAnyScrollIntent);
      window.removeEventListener("touchmove", onAnyScrollIntent);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const go = (id) => {
    closeMenu();
    setTimeout(() => scrollToSection?.(id), 140);
  };

  return (
    <>
      {/* Floating Logo Button (closed state) */}
      <div className={`ilaNavLogoWrap ${open ? "hide" : ""}`}>
        <button
          type="button"
          className="ilaLogoBtn"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <img src={logo} alt="ILA" width="40" height="40" loading="eager" />
        </button>

        {/* Tagline BELOW the box */}
       
      </div>

      {/* Fullscreen Menu Overlay */}
      <div className={`ilaWaveMenu ${open ? "open" : ""}`} aria-hidden={!open}>
        {/* Backdrop (click closes) */}
        <button
          className="ilaBackdrop"
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
        />

        {/* Menu content */}
        <div className="ilaMenuContent" role="dialog" aria-modal="true">
          {/* Header: CENTER logo + tagline, X pinned right */}
          <div className="ilaMenuHeader">
            <div className="ilaMenuBrand">
              <img src={logo} alt="ILA" className="ilaMenuLogo" width="46" height="46" loading="eager" />
              <div className="ilaTagline dark" aria-hidden="true">
                <span className="tag-top">THE FLOW</span>
                <span className="tag-mid">of</span>
                <span className="tag-bottom">LIFE</span>
              </div>
            </div>

            <button
              type="button"
              className="ilaCloseBtn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Menu Items */}
          <nav className="ilaMenuNav" aria-label="Site sections">
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="ilaMenuItem"
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                onClick={() => go(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Bottom glow */}
          <div className="ilaWaveEdge" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
