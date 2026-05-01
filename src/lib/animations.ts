// Global Animation Tokens and Configuration
// Based on Aditya Genset Animation Specification v1.0

export const easings = {
  cinematic: [0.2, 0.7, 0.2, 1] as const,
  snap: [0.4, 0, 0.2, 1] as const,
};

export const durations = {
  instant: 0.12,
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.2,
};

export const stagger = {
  base: 0.04, // 40ms
  fast: 0.02, // 20ms
  slow: 0.08, // 80ms
};

// Common animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: durations.base, ease: easings.cinematic }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: durations.slow, ease: easings.cinematic }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: durations.base, ease: easings.cinematic }
  }
};

export const slideInRight = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { duration: durations.slow, ease: easings.cinematic }
  }
};

export const slideInLeft = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: { duration: durations.slow, ease: easings.cinematic }
  }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: stagger.base,
    }
  }
};

export const wordStagger = {
  visible: {
    transition: {
      staggerChildren: 0.06, // 60ms for word-by-word
    }
  }
};

// Button hover/tap animations
export const buttonHover = {
  scale: 1.02,
  transition: { duration: durations.fast, ease: easings.snap }
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: durations.instant, ease: easings.snap }
};

// Card hover animations
export const cardHover = {
  y: -4,
  transition: { duration: durations.base, ease: easings.cinematic }
};

// Glass card hover
export const glassCardHover = {
  borderOpacity: 0.24,
  y: -2,
  transition: { duration: durations.slow, ease: easings.cinematic }
};
