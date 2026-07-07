import React from "react";
import { SecretVault } from "./SecretVault";

interface GameHeroProps {
  compact: boolean;
}

export const GameHero: React.FC<GameHeroProps> = ({ compact }) => {
  return (
    <section
      className={`rounded-[1.5rem] border border-white/60 bg-white/75 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-black/20 ${
        compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
      }`}
    >
      <div
        className={
          compact
            ? "grid gap-3 sm:grid-cols-[1fr_210px] sm:items-center"
            : "grid gap-4 lg:grid-cols-[1fr_250px] lg:items-center"
        }
      >
        <div className={compact ? "space-y-1" : "space-y-3"}>
          {!compact && (
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
              Memory Challenge
            </p>
          )}

          <h1
            className={`bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-clip-text py-1 font-black leading-[1.15] tracking-tight text-transparent ${
              compact
                ? "text-2xl sm:text-3xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            Crack the 4-Digit Code
          </h1>

          {!compact && (
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Enter four unique digits from 1 to 9. After every guess, use the
              clue board to find the hidden number.
            </p>
          )}
        </div>

        <SecretVault compact={compact} />
      </div>
    </section>
  );
};
