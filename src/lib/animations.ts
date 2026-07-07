// src/lib/animations.ts
import type { Variants } from "framer-motion";

export const navbarVariants: Variants = {
  hidden: {
    y: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

export const logoVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 16,
    },
  },
};

export const brandTextVariants: Variants = {
  hidden: {
    x: -40,
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const menuButtonVariants: Variants = {
  hidden: {
    x: 35,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 18,
    },
  },
};

export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
    scale: 0.92,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.94,
    filter: "blur(8px)",
    transition: {
      duration: 0.18,
    },
  },
};

export const dropdownItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export const pageContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

export const pageItemVariants: Variants = {
  hidden: {
    y: 35,
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};