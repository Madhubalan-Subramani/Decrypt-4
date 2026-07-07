import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface SuccessPortalProps {
  open: boolean;
  attempts: number;
  onRestart: () => void;
}

const confettiItems = [
  { left: "8%", delay: 0, emoji: "✨" },
  { left: "18%", delay: 0.2, emoji: "🎉" },
  { left: "28%", delay: 0.4, emoji: "⭐" },
  { left: "40%", delay: 0.1, emoji: "💫" },
  { left: "52%", delay: 0.3, emoji: "🎊" },
  { left: "64%", delay: 0.5, emoji: "✨" },
  { left: "76%", delay: 0.15, emoji: "⭐" },
  { left: "88%", delay: 0.35, emoji: "🎉" },
];

export const SuccessPortal: React.FC<SuccessPortalProps> = ({
  open,
  attempts,
  onRestart,
}) => {
  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950/70 px-4 backdrop-blur-md">
      {confettiItems.map((item, index) => (
        <motion.span
          key={index}
          className="pointer-events-none absolute top-[-40px] text-2xl sm:text-3xl"
          style={{ left: item.left }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 180, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.2,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-white p-6 text-center shadow-2xl dark:bg-slate-900 sm:p-8"
      >
        <motion.div
          className="absolute inset-0 -z-0 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-emerald-500/15"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-5xl shadow-xl shadow-orange-500/25"
          >
            🏆
          </motion.div>

          <h2 className="mt-6 text-3xl font-black text-slate-950 dark:text-white">
            Amazing! You Cracked It!
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            You found the hidden 4-digit code in{" "}
            <span className="font-black text-indigo-600 dark:text-indigo-300">
              {attempts}
            </span>{" "}
            {attempts === 1 ? "try" : "tries"}. Great focus, memory, and pattern
            tracking!
          </p>

          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            Mission completed. Ready for the next challenge?
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Restart Game
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};
