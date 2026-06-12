import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';
import slide1 from '../../assets/hero_slider_1.webp';
import slide2 from '../../assets/hero_slider_2.webp';
import slide3 from '../../assets/hero_slider_3.webp';
import slide4 from '../../assets/hero_slider_4.webp';

const SLIDES = [
  {
    image: slide1,
    alt: 'Luxury modern Indian villa bathed in warm golden evening light against a cream sky',
    headline: (
      <>
        <span>Premium Properties</span>
        <span>Across Kolkata</span>
      </>
    ),
  },
  {
    image: slide2,
    alt: 'Premium apartment community in New Town Kolkata with landscaped open spaces',
    headline: (
      <>
        <span>Residential Spaces</span>
        <span>Made Simple</span>
      </>
    ),
  },
  {
    image: slide3,
    alt: 'Professional property consultant advising clients in a premium office',
    headline: (
      <>
        <span>Expert Guidance</span>
        <span>For Every Move</span>
      </>
    ),
  },
  {
    image: slide4,
    alt: 'Modern commercial towers across the Kolkata business district at sunset',
    headline: (
      <>
        <span>Smart Investments</span>
        <span>Long-Term Value</span>
      </>
    ),
  },
];

const AUTOPLAY_MS = 2500;

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);

  // Resolve the user's motion preference once on mount.
  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Auto-advance quickly. The timer is keyed on `active`/`paused`, so manual
  // navigation restarts the full interval and hovering/focusing pauses it.
  useEffect(() => {
    if (reduceMotion.current || paused) return undefined;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  const goTo = useCallback((i) => {
    setActive((i + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <section
      className="hh"
      aria-roledescription="carousel"
      aria-label="Featured property highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hh-bg" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt=""
            className={`hh-bg-img${i === active ? ' is-active' : ''}`}
            loading="eager"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            width="1600"
            height="900"
            draggable="false"
          />
        ))}
      </div>
      <div className="hh-shade" aria-hidden="true" />

      <div className="container hh-inner">
        <div className="hh-content">
          <p className="hh-eyebrow">
            <span className="hh-eyebrow-rule" aria-hidden="true" />
            Trusted Property Advisory · Kolkata
          </p>

          <div className="hh-headline-wrap">
            <h1 className="hh-headline" key={active}>
              {SLIDES[active].headline}
            </h1>
          </div>

          <p className="hh-subtext">
            Residential, commercial, and investment advisory for Kolkata&rsquo;s key growth locations.
          </p>

          <Link to="/projects" className="hh-view-more">
            View More
            <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="hh-controls">
        <button
          type="button"
          className="hh-arrow"
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
        >
          <LuChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className="hh-arrow"
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
        >
          <LuChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="hh-slide-panel" role="tablist" aria-label="Choose featured slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`hh-slide-tab${i === active ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </section>
  );
}
