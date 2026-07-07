import React from "react";
import { motion } from "framer-motion";

interface SecretVaultProps {
  compact?: boolean;
}

export const SecretVault: React.FC<SecretVaultProps> = ({
  compact = false,
}) => {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/60 ${
        compact ? "p-2.5" : "p-3"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Hidden Target
        </p>

        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Locked
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className={`flex items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-inner dark:border-slate-800 dark:bg-slate-900 ${
              compact ? "h-9" : "h-12 sm:h-14"
            }`}
          >
            <span className="select-none text-lg font-semibold text-slate-400 blur-[3px] dark:text-slate-500">
              #
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
