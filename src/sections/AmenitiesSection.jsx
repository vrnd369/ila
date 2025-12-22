import React, { useEffect, useRef, useState } from "react";

// Import images
import page3 from "../assets/page3.png";
import page11 from "../assets/page11.png";
import page12 from "../assets/page12.png";
import page13 from "../assets/page13.png";
import page15 from "../assets/page15.png";
import page16 from "../assets/page16.png";
import page19 from "../assets/page19.png";

// Create a flat array of all images with their titles
const allImages = [
  { image: page3, title: "Wellness" },
  { image: page11, title: "Rejuvenation" },
  { image: page12, title: "Leisure" },
  { image: page13, title: "Wellness" },
  { image: page15, title: "Rejuvenation" },
  { image: page16, title: "Leisure" },
  { image: page19, title: "Recreation" },
];

export default function AmenitiesSection() {
  const carouselRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <h1 className="amenitiesTitle">DESIGNED for SLOW<br />DAYS & DEEP LIVING</h1>
      <p className="amenitiesText">
        At iLA, every element is thoughtfully designed to<br />
        support a life of balance, where nature, wellness, and<br />
        community come together effortlessly
      </p>
      <p className="amenitiesText">
        From spaces that encourage movement and<br />
        mindfulness to zones meant for gathering and<br />
        celebration, the amenities at iLA reflect a lifestyle rooted<br />
        in sustainability, harmony, and purposeful living.
      </p>

      <div className="amenitiesLegacyContainer">
        <h2 className="amenitiesLegacyTitle">BUILT FOR LEGACY,<br/> STYLED FOR NOW:</h2>
        <p className="amenitiesLegacyText">
          Each amenity at iLA is designed to nurture a quiet,<br />
          flowing lifestyle, one where nature, movement, and<br />
          mindfulness are interwoven into daily life.
        </p>
        <ul className="amenitiesList">
          <li className="amenitiesItem">Outdoor Yoga decks for mindful movement.</li>
          <li className="amenitiesItem">Herbal Gardens and Fragrance trails for sensory joy.</li>
          <li className="amenitiesItem">1.5 km knee-friendly Walking track through Green zones.</li>
          <li className="amenitiesItem">1.5 km Cycling loop across the layout.</li>
          <li className="amenitiesItem">Wellness Clubhouse and Fitness Studio.</li>
          <li className="amenitiesItem">Aviary Walk and Biodiversity Corridors.</li>
          <li className="amenitiesItem">Indoor and Outdoor sports complexes with Sports bar & Restaurant</li>
          <li className="amenitiesItem">Open-air Amphitheatre and seasonal event lawns.</li>
          <li className="amenitiesItem">Natural contours and ecological zones are preserved throughout the area.</li>
          <li className="amenitiesItem">Toddler Play area, Adventure Play area for Older Children</li>
        </ul>
      </div>

      {/* Image Carousel Section - Horizontal Sliding Carousel */}
      <div className={`amenitiesCarouselWrapper ${isVisible ? "visible" : ""}`} ref={carouselRef}>
        <div className="amenitiesCarouselHeader">
          <h2 className="amenitiesCarouselTitle">WHERE ADVENTURE BECKONS</h2>
          <h3 className="amenitiesCarouselSubtitle">FOUR WILDERNESS RETREATS</h3>
          <p className="amenitiesCarouselText">
            Get ready to take a deep breath of comfort, adventure,<br />
            and tranquility at iLA!
          </p>
        </div>

        <div className="amenitiesCarouselViewport">
          <div className="amenitiesCarouselTrack">
            {allImages.map((item, index) => (
              <div
                key={index}
                className={`amenitiesCarouselItem ${hoveredIndex === index ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="amenitiesCarouselImageWrapper">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="amenitiesCarouselItemTitle">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
