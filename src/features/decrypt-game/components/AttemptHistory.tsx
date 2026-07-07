import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GameAttempt } from "../../types";

interface AttemptHistoryProps {
  attempts: GameAttempt[];
}

interface AttemptRowProps {
  attempt: GameAttempt;
}

const AttemptRow = memo(({ attempt }: AttemptRowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`grid grid-cols-2 gap-3 rounded-2xl border px-3 py-2.5 text-xs shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[60px_1fr_92px_92px] sm:items-center ${
        attempt.isSolved
          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase text-slate-400">
          Try
        </p>
        <p className="font-semibold text-slate-950 dark:text-white">
          #{attempt.tryCount}
        </p>
      </div>

      <div className="flex justify-end gap-1.5 sm:justify-start">
        {attempt.number.split("").map((digit, index) => (
          <span
            key={`${attempt.id}-${index}`}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-mono text-sm font-semibold text-indigo-600 dark:bg-slate-950 dark:text-indigo-300"
          >
            {digit}
          </span>
        ))}
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase text-slate-400">
          Position
        </p>
        <p className="font-semibold text-emerald-600 dark:text-emerald-300">
          {attempt.position} position
        </p>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase text-slate-400">
          Match
        </p>
        <p className="font-semibold text-amber-600 dark:text-amber-300">
          {attempt.matches} match
        </p>
      </div>
    </motion.div>
  );
});

AttemptRow.displayName = "AttemptRow";

export const AttemptHistory: React.FC<AttemptHistoryProps> = ({ attempts }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-[1.5rem] border border-white/60 bg-white/75 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-black/20 sm:p-5"
    >
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-500 dark:text-fuchsia-300">
            Attempt History
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
            Clue Board
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            Position = right digit + right place
          </span>

          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            Match = right digit + wrong place
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {attempts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400"
          >
            No guesses yet. Enter your first 4-digit code to start.
          </motion.div>
        ) : (
          <div className="max-h-[calc(100dvh-430px)] min-h-[160px] space-y-2 overflow-y-auto pr-1 sm:max-h-[420px] lg:max-h-[520px]">
            {attempts.map((attempt) => (
              <AttemptRow key={attempt.id} attempt={attempt} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
