import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  LuArrowUpRight,
  LuArrowRight,
  LuMapPin,
  LuBuilding2,
  LuChevronDown,
  LuSearch,
  LuRotateCcw,
} from 'react-icons/lu';

import edenImg from '../../assets/eden_devprayag.webp';
import vinayakImg from '../../assets/vinayak_21_acre.webp';
import bhawaniImg from '../../assets/bhawani_paraiso.webp';
import dtcImg from '../../assets/dtc_still_waters.webp';
import psImg from '../../assets/ps_sansara.webp';

/*
 * Each project carries the metadata the search panel filters on:
 *   intent   — which of Buy / Rent it is available for
 *   location — one of the four serviced areas
 *   type     — Residential / Commercial / Land
 * Edit titles, tags or metadata here and both the list and the filter update.
 */
const SLIDES = [
  { id: 'eden', title: 'Eden Devprayag', tag: 'Hillside Residences', image: edenImg, location: 'New Town', type: 'Residential', intent: ['buy'] },
  { id: 'vinayak', title: 'Vinayak 21 Acre', tag: 'Plotted Township', image: vinayakImg, location: 'Rajarhat', type: 'Land', intent: ['buy'] },
  { id: 'bhawani', title: 'Bhawani Paraiso', tag: 'Premium Apartments', image: bhawaniImg, location: 'Howrah', type: 'Residential', intent: ['buy', 'rent'] },
  { id: 'dtc', title: 'DTC Still Waters', tag: 'Waterfront Homes', image: dtcImg, location: 'Hooghly', type: 'Residential', intent: ['buy'] },
  { id: 'ps', title: 'PS Sansara', tag: 'Signature Living', image: psImg, location: 'New Town', type: 'Commercial', intent: ['rent'] },
];

const LOCATIONS = ['New Town', 'Rajarhat', 'Howrah', 'Hooghly'];
const TYPES = ['Residential', 'Commercial', 'Land'];

/* The clip-path "wipe" the active project's image reveals with. */
const clipPathVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
};

function splitText(text) {
  return text
    .split(' ')
    .map((word) => word.concat(' '))
    .map((word) => word.split(''))
    .flat(1);
}

/* Per-character "wipe up" reveal — faded base slides out, full-colour slides in.
   Hidden from assistive tech (the row's aria-label carries the real name). */
function StaggerTitle({ text, isActive }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className="fp-row-title-text" data-active={isActive} aria-hidden="true">
        {text}
      </span>
    );
  }

  const characters = splitText(text);
  return (
    <span className="fp-row-title-text" aria-hidden="true">
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="fp-char">
          <MotionConfig
            transition={{ delay: i * 0.022, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="fp-char-base"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%' } : { y: '0%' }}
            >
              {char}
              {char === ' ' && i < characters.length - 1 && <>&nbsp;</>}
            </motion.span>
            <motion.span
              className="fp-char-reveal"
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

function ProjectRow({ project, index, isActive, onActivate }) {
  const reduceMotion = useReducedMotion();
  return (
    <li className="fp-row-item">
      <Link
        to="/projects"
        className={`fp-row${isActive ? ' is-active' : ''}`}
        onMouseEnter={() => onActivate(index)}
        onFocus={() => onActivate(index)}
        aria-label={`${project.title} — ${project.type} in ${project.location}. View project.`}
      >
        <span className="fp-row-index">{String(index + 1).padStart(2, '0')}</span>

        <span className="fp-row-main">
          <span className="fp-row-title">
            <StaggerTitle text={project.title} isActive={isActive} />
          </span>
          <span className="fp-row-meta">
            {project.tag} <span aria-hidden="true">·</span> {project.location}{' '}
            <span aria-hidden="true">·</span> {project.type}
          </span>
        </span>

        <span className="fp-row-media" aria-hidden="true">
          <motion.img
            className="fp-row-img"
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            variants={clipPathVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            transition={{ ease: [0.33, 1, 0.68, 1], duration: reduceMotion ? 0 : 0.7 }}
          />
        </span>

        <span className="fp-row-arrow" aria-hidden="true">
          <LuArrowUpRight />
        </span>

        <span className="fp-row-underline" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function FeaturedProjects() {
  // Pending search-panel selections.
  const [intent, setIntent] = useState('buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  // Applied filter (null = no search yet, show the full curated list).
  const [applied, setApplied] = useState(null);
  const [active, setActive] = useState(0);

  const visible = useMemo(() => {
    if (!applied) return SLIDES;
    return SLIDES.filter(
      (s) =>
        s.intent.includes(applied.intent) &&
        (!applied.location || s.location === applied.location) &&
        (!applied.type || s.type === applied.type),
    );
  }, [applied]);

  // Guard against an active index left dangling after the list shrinks.
  const activeIndex = Math.min(active, Math.max(0, visible.length - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied({ intent, location, type });
    setActive(0); // reveal the first match
  };

  const handleClear = () => {
    setApplied(null);
    setIntent('buy');
    setLocation('');
    setType('');
    setActive(0);
  };

  const countLabel = `${visible.length} ${visible.length === 1 ? 'Project' : 'Projects'}${
    applied ? ' found' : ''
  }`;

  return (
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
            Tell us what you&rsquo;re looking for, then explore our portfolio of
            residences, townships, and waterfront homes across Kolkata.
          </p>

          {/* ---- Search panel ---- */}
          <form className="fp-search" onSubmit={handleSubmit}>
            <div
              className="fp-search-tabs"
              role="group"
              aria-label="Looking to buy or rent"
            >
              {['buy', 'rent'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`fp-tab${intent === mode ? ' is-active' : ''}`}
                  aria-pressed={intent === mode}
                  onClick={() => setIntent(mode)}
                >
                  {mode === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>

            <div className="fp-search-fields">
              <label className="fp-field">
                <span className="fp-field-label">Location</span>
                <span className="fp-field-control">
                  <LuMapPin className="fp-field-icon" aria-hidden="true" />
                  <select
                    className="fp-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All locations</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="fp-field-chevron" aria-hidden="true" />
                </span>
              </label>

              <label className="fp-field">
                <span className="fp-field-label">Property Type</span>
                <span className="fp-field-control">
                  <LuBuilding2 className="fp-field-icon" aria-hidden="true" />
                  <select
                    className="fp-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">All types</option>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="fp-field-chevron" aria-hidden="true" />
                </span>
              </label>

              <button type="submit" className="fp-find">
                <LuSearch aria-hidden="true" />
                Find Property
              </button>
            </div>
          </form>

          {/* ---- Result count + clear ---- */}
          <div className="fp-list-head">
            <span className="fp-list-count">{countLabel}</span>
            {applied && (
              <button type="button" className="fp-clear" onClick={handleClear}>
                <LuRotateCcw aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {/* ---- Row-by-row project list ---- */}
          {visible.length > 0 ? (
            <ul className="fp-list">
              {visible.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={index === activeIndex}
                  onActivate={setActive}
                />
              ))}
            </ul>
          ) : (
            <div className="fp-empty">
              <p className="fp-empty-title">No matching properties</p>
              <p className="fp-empty-text">
                We couldn&rsquo;t find a featured project for that combination. Try a
                different location or property type.
              </p>
              <button type="button" className="fp-clear" onClick={handleClear}>
                <LuRotateCcw aria-hidden="true" />
                Reset search
              </button>
            </div>
          )}

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
  );
}
