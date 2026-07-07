import { motion } from "framer-motion";
import type { GameAttempt } from "../../types";

interface AttemptCardProps {
  attempt: GameAttempt;
}

export const AttemptCard: React.FC<AttemptCardProps> = ({ attempt }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group rounded-3xl border p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        attempt.isSolved
          ? "border-emerald-300 bg-emerald-50 shadow-emerald-900/5 dark:border-emerald-800 dark:bg-emerald-950/30"
          : "border-white/60 bg-white/80 shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-black/20"
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[90px_1fr_auto] sm:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Attempt
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            #{attempt.tryCount}
          </p>
        </div>

        <div className="flex gap-2">
          {attempt.number.split("").map((digit, index) => (
            <div
              key={`${attempt.id}-${index}`}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 font-mono text-xl font-black text-indigo-600 shadow-inner dark:border-slate-700 dark:bg-slate-950 dark:text-indigo-300"
            >
              {digit}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <span className="rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {attempt.position} Position
          </span>

          <span className="rounded-2xl bg-amber-100 px-4 py-2 text-xs font-black text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            {attempt.matches} Match
          </span>
        </div>
      </div>
    </motion.article>
  );
};
