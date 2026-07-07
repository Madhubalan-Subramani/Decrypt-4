import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.2,
        ease: "easeOut",
      }}
      className="border-t border-slate-200 bg-white/70 px-4 py-4 text-center text-xs font-medium text-slate-500 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400"
    >
      <motion.p
        animate={{
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        &copy; {currentYear} Madhubalan. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};
