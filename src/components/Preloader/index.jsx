import React, { useState, useEffect } from 'react';
import logo from '../../assets/maadhavam_removebg_logo.png';

// Above-the-fold imagery we want decoded and cached before revealing the site.
// These are the exact same URLs the hero uses, so preloading warms its cache.
import slide1 from '../../assets/hero_slider_1.webp';
import slide2 from '../../assets/hero_slider_2.webp';
import slide3 from '../../assets/hero_slider_3.webp';
import slide4 from '../../assets/hero_slider_4.webp';

const PRELOAD_IMAGES = [slide1, slide2, slide3, slide4];

const MIN_DURATION_MS = 1600; // keep the splash up long enough to feel intentional
const MAX_DURATION_MS = 5000; // never trap the user if an image stalls
const FADE_MS = 700;          // must match the CSS fade-out transition

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // a missing image must not block the reveal
    img.src = src;
    if (img.complete) resolve(); // already cached
  });
}

export default function Preloader() {
  const [hidden, setHidden] = useState(false);   // fade-out has started
  const [removed, setRemoved] = useState(false); // fully unmounted

  // Preload hero imagery, then reveal the site (respecting min/max timing).
  useEffect(() => {
    const start = Date.now();
    let settled = false;

    const reveal = () => {
      if (settled) return;
      settled = true;
      const wait = Math.max(0, MIN_DURATION_MS - (Date.now() - start));
      window.setTimeout(() => setHidden(true), wait);
    };

    Promise.all(PRELOAD_IMAGES.map(preloadImage)).then(reveal);
    const safetyId = window.setTimeout(reveal, MAX_DURATION_MS);
    return () => window.clearTimeout(safetyId);
  }, []);

  // Lock page scroll while the splash is visible; unmount after the fade.
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = 'hidden';
      return undefined;
    }
    const id = window.setTimeout(() => {
      setRemoved(true);
      document.body.style.overflow = '';
    }, FADE_MS);
    return () => window.clearTimeout(id);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      className={`preloader${hidden ? ' is-hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Madhavam Realty"
    >
      <div className="preloader-glow" aria-hidden="true" />
      <div className="preloader-inner">
        <img
          src={logo}
          alt=""
          className="preloader-logo"
          width="124"
          height="124"
          draggable="false"
        />
        <p className="preloader-wordmark">Madhavam Realty</p>
        <p className="preloader-tagline">Trusted Property Advisory · Kolkata</p>
        <div className="preloader-bar" aria-hidden="true">
          <span className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
