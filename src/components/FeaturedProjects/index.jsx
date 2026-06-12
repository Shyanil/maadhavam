import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight, LuArrowUpRight, LuArrowRight } from 'react-icons/lu';

import edenImg from '../../assets/eden_devprayag.webp';
import vinayakImg from '../../assets/vinayak_21_acre.webp';
import bhawaniImg from '../../assets/bhawani_paraiso.webp';
import dtcImg from '../../assets/dtc_still_waters.webp';
import psImg from '../../assets/ps_sansara.webp';

const SLIDES = [
  { id: 'eden', title: 'Eden Devprayag', tag: 'Hillside Residences', image: edenImg, location: 'New Town, Kolkata', type: 'Residential', originalIndex: 0 },
  { id: 'vinayak', title: 'Vinayak 21 Acre', tag: 'Plotted Township', image: vinayakImg, location: 'Rajarhat, Kolkata', type: 'Land', originalIndex: 1 },
  { id: 'bhawani', title: 'Bhawani Paraiso', tag: 'Premium Apartments', image: bhawaniImg, location: 'Howrah, Kolkata', type: 'Residential', originalIndex: 2 },
  { id: 'dtc', title: 'DTC Still Waters', tag: 'Waterfront Homes', image: dtcImg, location: 'Hooghly, Kolkata', type: 'Residential', originalIndex: 3 },
  { id: 'ps', title: 'PS Sansara', tag: 'Signature Living', image: psImg, location: 'New Town, Kolkata', type: 'Commercial', originalIndex: 4 },
];

export default function FeaturedProjects() {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [filteredSlides, setFilteredSlides] = useState(SLIDES);
  const [active, setActive] = useState(SLIDES.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const autoplayTimer = useRef(null);

  const displaySlides = React.useMemo(() => {
    return [...filteredSlides, ...filteredSlides, ...filteredSlides];
  }, [filteredSlides]);

  const handleNext = useCallback(() => {
    setActive((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => prev - 1);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleFilterChange = (loc) => {
    setSelectedLocation(loc);
    let result = SLIDES;
    if (loc !== 'All') {
      if (loc === 'Howrah & Hooghly') {
        result = SLIDES.filter(s => s.location.includes('Howrah') || s.location.includes('Hooghly'));
      } else {
        result = SLIDES.filter(s => s.location.includes(loc));
      }
    }
    setFilteredSlides(result);
    setIsTransitioning(false);
    setActive(result.length);

    setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
  };

  // Handle wrapping around for infinite scrolling
  useEffect(() => {
    if (active >= filteredSlides.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActive(active - filteredSlides.length);
      }, 600); // matches transition speed
      return () => clearTimeout(timer);
    }
    if (active < filteredSlides.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActive(active + filteredSlides.length);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [active, filteredSlides.length]);

  // Turn transitions back on after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Autoplay
  useEffect(() => {
    if (paused) return undefined;
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 3000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [paused, handleNext]);

  return (
    <section className="featured" id="projects">
      {/* Header and Title inside the standard page container */}
      <div className="container">
        <div className="featured-header-row">
          <div className="featured-header-left">
            <p className="featured-eyebrow">
              <span className="featured-eyebrow-text">Featured Projects</span>
              <span className="featured-eyebrow-rule" aria-hidden="true" />
            </p>
            <h2 className="featured-heading">
              Signature developments, crafted to last
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="featured-arrows">
            <button
              type="button"
              className="featured-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous projects"
            >
              <LuChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="featured-arrow-btn"
              onClick={handleNext}
              aria-label="Next projects"
            >
              <LuChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Location Filters */}
        <div className="featured-filter-row">
          <div className="featured-filters" role="group" aria-label="Filter projects by location">
            {['All', 'New Town', 'Rajarhat', 'Howrah & Hooghly'].map((loc) => (
              <button
                key={loc}
                type="button"
                className={`featured-filter-btn${selectedLocation === loc ? ' is-active' : ''}`}
                onClick={() => handleFilterChange(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel container outside container (full-bleed layout) */}
      <div
        className="fpc-container"
        onMouseEnter={() => {
          setPaused(true);
          setShowCursor(true);
        }}
        onMouseLeave={() => {
          setPaused(false);
          setShowCursor(false);
          setIsHoveringCard(false);
        }}
        onMouseMove={handleMouseMove}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Custom follow cursor tracking wrapper */}
        <div
          className="fpc-custom-cursor-wrapper"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
          }}
        >
          <div className={`fpc-custom-cursor${showCursor ? ' is-visible' : ''}${isHoveringCard ? ' is-hovered' : ''}`}>
            <span>View<br />Project</span>
          </div>
        </div>

        <div
          className="fpc-track"
          style={{
            transform: `translateX(var(--fpc-translate))`,
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            '--fpc-translate': `calc(-${active} * var(--fpc-slide-width-with-gap))`
          }}
        >
          {displaySlides.map((project, idx) => (
            <Link
              key={`${project.id}-${idx}`}
              to="/projects"
              className="fpc-card"
              aria-label={`${project.title} in ${project.location}. Click to view details.`}
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}
            >
              <div className="fpc-card-img-box">
                <img src={project.image} alt="" loading="lazy" />
                <div className="fpc-card-overlay">
                  <span className="fpc-card-number">{String(project.originalIndex + 1).padStart(2, '0')}</span>
                  <div className="fpc-card-text">
                    <span className="fpc-card-city">{project.location}</span>
                    <h3 className="fpc-card-title">{project.title}</h3>
                    <p className="fpc-card-meta">{project.tag} · {project.type}</p>
                  </div>
                  <span className="fpc-card-cta">
                    View Details
                    <LuArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer CTA inside the container */}
      <div className="container">
        <div className="featured-footer">
          <Link to="/projects" className="featured-cta">
            Explore All Projects
            <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
