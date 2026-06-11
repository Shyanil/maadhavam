import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { LuArrowUpRight, LuArrowRight } from 'react-icons/lu';

import edenImg from '../../assets/eden_devprayag.webp';
import vinayakImg from '../../assets/vinayak_21_acre.webp';
import bhawaniImg from '../../assets/bhawani_paraiso.webp';
import dtcImg from '../../assets/dtc_still_waters.webp';
import psImg from '../../assets/ps_sansara.webp';

/* Project names map to the local asset images. The short tags are editable. */
const SLIDES = [
  { id: 'eden', title: 'Eden Devprayag', tag: 'Hillside Residences', image: edenImg },
  { id: 'vinayak', title: 'Vinayak 21 Acre', tag: 'Plotted Township', image: vinayakImg },
  { id: 'bhawani', title: 'Bhawani Paraiso', tag: 'Premium Apartments', image: bhawaniImg },
  { id: 'dtc', title: 'DTC Still Waters', tag: 'Waterfront Homes', image: dtcImg },
  { id: 'ps', title: 'PS Sansara', tag: 'Signature Living', image: psImg },
];

const clipPathVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
};

const HoverSliderContext = createContext(undefined);

function useHoverSlider() {
  const ctx = useContext(HoverSliderContext);
  if (!ctx) {
    throw new Error('useHoverSlider must be used within FeaturedProjects');
  }
  return ctx;
}

function splitText(text) {
  const words = text.split(' ').map((word) => word.concat(' '));
  return words.map((word) => word.split('')).flat(1);
}

/* Per-character "wipe up" reveal — faded base slides out, full-colour layer slides in */
function StaggerTitle({ text, index }) {
  const { activeSlide } = useHoverSlider();
  const reduceMotion = useReducedMotion();
  const isActive = activeSlide === index;
  const characters = splitText(text);

  if (reduceMotion) {
    return (
      <span className="hs-title-text" data-active={isActive}>
        {text}
      </span>
    );
  }

  return (
    <span className="hs-title-text">
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="hs-char">
          <MotionConfig
            transition={{
              delay: i * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="hs-char-base"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%' } : { y: '0%' }}
            >
              {char}
              {char === ' ' && i < characters.length - 1 && <>&nbsp;</>}
            </motion.span>
            <motion.span
              className="hs-char-reveal"
              initial={{ y: '110%' }}
              animate={isActive ? { y: '0%' } : { y: '110%' }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
}

function ProjectMedia() {
  const { activeSlide } = useHoverSlider();
  const reduceMotion = useReducedMotion();
  const active = SLIDES[activeSlide];

  return (
    <div className="hs-media">
      <div className="hs-media-frame">
        {SLIDES.map((slide, index) => (
          <motion.img
            key={slide.id}
            className="hs-media-img"
            src={slide.image}
            alt={`${slide.title} — ${slide.tag}`}
            loading="lazy"
            decoding="async"
            transition={{ ease: [0.33, 1, 0.68, 1], duration: reduceMotion ? 0 : 0.8 }}
            variants={clipPathVariants}
            animate={activeSlide === index ? 'visible' : 'hidden'}
          />
        ))}

        <div className="hs-media-caption">
          <span className="hs-media-caption-title">{active.title}</span>
          <Link to="/projects" className="hs-media-cta">
            View Project
            <LuArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeSlide, setActiveSlide] = useState(0);
  const changeSlide = useCallback((index) => setActiveSlide(index), []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <section className="featured" id="projects">
        <div className="container">
          <div className="featured-panel">
            {/* Header */}
            <p className="featured-eyebrow">
              <span className="featured-eyebrow-text">Featured Projects</span>
              <span className="featured-eyebrow-rule" aria-hidden="true" />
            </p>
            <h2 className="featured-heading">
              Signature developments,
              <br className="featured-break" /> crafted to last
            </h2>
            <p className="featured-sub">
              Hover or tap a project to explore our portfolio of residences,
              townships, and waterfront homes across Kolkata.
            </p>

            {/* Hover slideshow */}
            <div className="featured-stage">
              <div className="hs-titles">
                {SLIDES.map((slide, index) => {
                  const isActive = index === activeSlide;
                  return (
                    <button
                      type="button"
                      key={slide.id}
                      className={`hs-title${isActive ? ' is-active' : ''}`}
                      onMouseEnter={() => changeSlide(index)}
                      onFocus={() => changeSlide(index)}
                      onClick={() => changeSlide(index)}
                      aria-pressed={isActive}
                    >
                      <span className="hs-title-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="hs-title-main">
                        <StaggerTitle text={slide.title} index={index} />
                        <span className="hs-title-tag">{slide.tag}</span>
                      </span>
                      <span className="hs-title-underline" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* The glowing accent line */}
              <div className="glow-line" aria-hidden="true" />

              <ProjectMedia />
            </div>

            {/* Footer CTA */}
            <div className="featured-footer">
              <Link to="/projects" className="featured-cta">
                Explore All Projects
                <LuArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </HoverSliderContext.Provider>
  );
}
