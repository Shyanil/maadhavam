import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counter
 * Counts up from 0 to `to` the first time it scrolls into view, using
 * requestAnimationFrame with an ease-out curve. Numbers are grouped with the
 * Indian locale. Respects prefers-reduced-motion (shows the final value).
 */
export default function Counter({ to, duration = 1.6, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  const shouldAnimate = inView && !reduce;

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldAnimate, to, duration]);

  // Reduced motion shows the final value immediately; no setState in render.
  const display = reduce ? to : value;

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
