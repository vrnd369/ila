import React, { useState, useRef, useEffect } from "react";
import "./HighlightsSection.css";

// Import images
import page1 from "../assets/page1.png";
import page2 from "../assets/page2.png";
import page4 from "../assets/page4.png";
import page6 from "../assets/page6.png";
import page7 from "../assets/page7.png";
import page8 from "../assets/page8.png";
import page9 from "../assets/page9.png";
import page17 from "../assets/page17.png";

// Hotel data with images
const hotelImages = [
  { id: 1, image: page1, name: "iLA", location: "MOINABAD" },
  { id: 2, image: page2, name: "iLA", location: "MOINABAD" },
  { id: 3, image: page4, name: "iLA", location: "MOINABAD" },
  { id: 4, image: page6, name: "iLA", location: "MOINABAD" },
  { id: 5, image: page7, name: "iLA", location: "MOINABAD" },
  { id: 6, image: page8, name: "iLA", location: "MOINABAD" },
  { id: 7, image: page9, name: "iLA", location: "MOINABAD" },
  { id: 8, image: page17, name: "iLA", location: "MOINABAD" },
];

export default function HighlightsSection() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [nextHeroIndex, setNextHeroIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      const cards = trackRef.current.children;
      if (cards[currentHeroIndex]) {
        cards[currentHeroIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentHeroIndex]);

  // Handle image transition with fade effect
  const changeImage = (newIndex) => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    
    setNextHeroIndex(newIndex);
    setIsTransitioning(true);
    
    // After animation completes, switch to new image
    setTimeout(() => {
      setCurrentHeroIndex(newIndex);
      setNextHeroIndex(null);
      setIsTransitioning(false);
    }, 700);
  };

  const handleNext = () => {
    const nextIndex = (currentHeroIndex + 1) % hotelImages.length;
    changeImage(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentHeroIndex - 1 + hotelImages.length) % hotelImages.length;
    changeImage(prevIndex);
  };

  const handleCarouselItemClick = (index) => {
    if (index !== currentHeroIndex) {
      changeImage(index);
    }
  };

  // Show current image number (1-8) instead of page number
  const currentImageNumber = currentHeroIndex + 1;

  return (
    <>
      <h1 className="highlightsTitle">A LIFE CURATED IN GREEN</h1>

      <p className="highlightsText">
        Spread across a lush, dense flora and fauna. iLA – An Ultra Luxury Farm
        Land and Resort brings you thoughtfully curated estate of farm villa
        plots, where nature, wellness, and mindful design come together in
        perfect harmony.
      </p>

      <p className="highlightsText">
        It's crafted for families and individuals who value space, sustainability,
        and a deeper connection to the land.
      </p>

      <div className="highlightsFeaturesContainer">
        <h2 className="highlightsFeaturesTitle">
          WHERE FORESTS <br /> MEET FINE LIVING
        </h2>

        <ul className="highlightsFeaturesList">
          <li className="highlightsFeatureItem">
            128-acre gated community in Moinabad
          </li>
          <li className="highlightsFeatureItem">
            35 mins from Airport, 25 mins from Financial District
          </li>
          <li className="highlightsFeatureItem">
            210 Vaastu-compliant, low-density plots starting from 1000+ Sq. Yards
          </li>
          <li className="highlightsFeatureItem">
            70% green open space with preserved biodiversity zones and water channels
          </li>
          <li className="highlightsFeatureItem">
            22 acres of dense forest with 70,000+ oxygen-rich trees
          </li>
          <li className="highlightsFeatureItem">
            98% rainwater harvesting through recharge pits, ponds, and percolation systems
          </li>
          <li className="highlightsFeatureItem">
            Lifetime membership to a 5-acre boutique luxury resort featuring
            75,000 sq. ft. of built-up space and 36 elegantly designed rooms with
            serene pool views
          </li>
          <li className="highlightsFeatureItem">
            Free plantations with 1-year maintenance per plot
          </li>
          <li className="highlightsFeatureItem">
            Premium infrastructure including internal CC roads, 24×7 security,
            and utility-ready layouts
          </li>
        </ul>

        <h2 className="highlightsIdealTitle">IDEAL FOR</h2>

        <ul className="highlightsIdealList">
          <li className="highlightsIdealItem">WEEKEND RETREATS</li>
          <li className="highlightsIdealItem">SMART INVESTMENT</li>
          <li className="highlightsIdealItem">LEGACY LIVING</li>
        </ul>
      </div>

      {/* Hotels & Resorts Section */}
      <div className="hotelsResortsSection">
        {/* Hero Image with Carousel Overlay */}
        <div className="hotelsHeroSection">
          <div className="hotelsHeroImageContainer">
            {/* Current Image */}
            <img
              src={hotelImages[currentHeroIndex].image}
              alt={hotelImages[currentHeroIndex].name}
              className={`hotelsHeroImage hotelsHeroImageCurrent ${
                isTransitioning ? 'fade-out' : 'fade-in'
              }`}
            />
            {/* Next Image (during transition) */}
            {isTransitioning && nextHeroIndex !== null && (
              <img
                src={hotelImages[nextHeroIndex].image}
                alt={hotelImages[nextHeroIndex].name}
                className="hotelsHeroImage hotelsHeroImageNext fade-in"
              />
            )}
          </div>
          <div className={`hotelsHeroOverlay ${isTransitioning ? "fade-out" : "fade-in"}`}>
            <h2 className="hotelsHeroName">{hotelImages[currentHeroIndex].name}</h2>
            <p className="hotelsHeroLocation">{hotelImages[currentHeroIndex].location}</p>
            <span className="hotelsHeroExplore">EXPLORE→</span>
          </div>

          {/* Carousel positioned on bottom right of hero */}
          <div className="hotelsCarouselWrapper">
            <button className="hotelsCarouselNav hotelsCarouselPrev" onClick={handlePrev}>
              ←
            </button>

            <div className="hotelsCarouselPageIndicator">{currentImageNumber}</div>

            <div className="hotelsCarousel" ref={trackRef}>
              {hotelImages.map((item, index) => (
                <div
                  key={item.id}
                  className={`hotelsCarouselCard ${index === currentHeroIndex ? "active" : ""}`}
                  onClick={() => handleCarouselItemClick(index)}
                >
                  <div className="hotelsCarouselCardTitle">{item.name}</div>
                  <div className="hotelsCarouselCardImage">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              ))}
            </div>

            <button className="hotelsCarouselNav hotelsCarouselNext" onClick={handleNext}>
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
