import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { GuessFormValues } from "../../types";

interface GuessPanelProps {
  onGuessSubmit: (guess: string) => void;
  onReset: () => void;
  isSolved: boolean;
  totalAttempts: number;
}

const validationSchema = Yup.object({
  guess: Yup.string()
    .required("Enter a 4-digit guess.")
    .matches(/^[1-9]+$/, "Use digits from 1 to 9 only.")
    .length(4, "Enter exactly 4 digits.")
    .test(
      "unique-digits",
      "Digits must be unique.",
      (value) => !!value && new Set(value.split("")).size === value.length,
    ),
});

const GuessIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResetIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4v6h6M20 20v-6h-6M6.5 17.5A7.5 7.5 0 0 0 18.8 15M17.5 6.5A7.5 7.5 0 0 0 5.2 9"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GuessPanel: React.FC<GuessPanelProps> = ({
  onGuessSubmit,
  onReset,
  isSolved,
  totalAttempts,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<GuessFormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      guess: "",
    },
  });

  const guess = watch("guess") ?? "";
  const activeIndex = Math.min(guess.length, 3);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = event.target.value.replace(/[^1-9]/g, "").slice(0, 4);

    setValue("guess", cleanValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const onSubmit = (data: GuessFormValues) => {
    onGuessSubmit(data.guess);
    reset();

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-[1.5rem] border border-white/60 bg-white/80 p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Your Guess
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Type only 4 unique digits.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-center dark:bg-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tries
          </p>
          <p className="text-base font-semibold text-slate-950 dark:text-white">
            {totalAttempts}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
            Enter secret code
          </span>

          <div
            role="button"
            tabIndex={0}
            onClick={focusInput}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                focusInput();
              }
            }}
            className="relative cursor-text"
          >
            <input
              ref={inputRef}
              value={guess}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isSolved}
              inputMode="numeric"
              autoComplete="off"
              aria-label="Enter 4 unique digits"
              className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0 disabled:cursor-not-allowed"
            />

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => {
                const digit = guess[index];
                const showCursor =
                  isFocused && !isSolved && index === activeIndex && !digit;

                return (
                  <motion.div
                    key={index}
                    animate={{
                      scale: digit || showCursor ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={`relative flex h-14 items-center justify-center rounded-2xl border text-2xl font-semibold transition duration-200 sm:h-16 ${
                      digit || showCursor
                        ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-500/10 dark:border-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                        : "border-slate-200 bg-slate-50 text-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-700"
                    }`}
                  >
                    {digit || "—"}

                    {showCursor && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute h-7 w-[2px] rounded-full bg-indigo-600 dark:bg-indigo-300"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </label>

        <div className="min-h-5">
          {errors.guess && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              className="text-xs font-semibold text-rose-500"
            >
              {errors.guess.message}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={!isValid || isSolved}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-none disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          >
            Guess
            <GuessIcon />
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              onReset();
            }}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <ResetIcon />
            Reset
          </button>
        </div>
      </form>
    </motion.section>
  );
};
