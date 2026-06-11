import React from 'react';
import { motion } from 'framer-motion';

/**
 * TimelineContent
 * Adaptation of the source component's `@/components/ui/timeline-animation`
 * helper for this Vite + React + framer-motion project.
 *
 * Renders any HTML tag as a motion element that plays `customVariants`
 * once on mount. `animationNum` is forwarded to framer-motion as `custom`,
 * so variant functions can stagger by index.
 *
 * Note: we animate on mount (initial -> animate) rather than `whileInView`.
 * Under React.StrictMode (enabled in main.jsx) the in-view observer with
 * `once: true` can register on the discarded first mount and never reveal,
 * leaving every element stuck at opacity 0.
 */
export default function TimelineContent({
  as = 'div',
  animationNum,
  customVariants,
  className,
  children,
  ...rest
}) {
  // `timelineRef` exists in the source component's API but isn't needed here;
  // strip it so it never spreads onto the DOM element.
  delete rest.timelineRef;

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
