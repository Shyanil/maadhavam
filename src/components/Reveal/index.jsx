import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Reveal
 * Reusable scroll-triggered entrance animation. Fades + lifts + un-blurs an
 * element the first time it scrolls into view. Driven by the `useInView` hook
 * (not `whileInView`) so it stays reliable under React.StrictMode.
 *
 * Props:
 *  - as: HTML tag to render (default 'div'); e.g. 'p', 'h2', 'form'
 *  - delay: stagger delay in seconds
 *  - y: vertical travel distance in px
 *  - ...rest: forwarded to the element (className, onSubmit, etc.)
 */
export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 24,
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(8px)' };
  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <MotionTag
      ref={ref}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{
        duration: reduce ? 0.2 : 0.55,
        delay: reduce ? 0 : delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
