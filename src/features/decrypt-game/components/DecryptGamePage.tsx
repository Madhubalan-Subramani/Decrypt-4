import React from "react";
import { useDecryptGame } from "../hooks/useDecryptGame";
import { GameHero } from "./GameHero";
import { GuessPanel } from "./GuessPanel";
import { AttemptHistory } from "./AttemptHistory";
import { SuccessPortal } from "./SuccessPortal";

export const DecryptGamePage: React.FC = () => {
  const { history, submitGuess, resetGame, isSolved, totalAttempts } =
    useDecryptGame();

  const hasAttempts = history.length > 0;

  return (
    <>
      <main className="relative flex-1 overflow-hidden px-3 py-3 sm:px-5 lg:px-8 lg:py-5">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-700/20" />
          <div className="absolute right-0 top-48 h-60 w-60 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-700/20" />
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-fuchsia-400/15 blur-3xl dark:bg-fuchsia-700/20" />
        </div>

        <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-4">
          <GameHero compact={hasAttempts} />

          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[340px_1fr] lg:items-start">
            <div className="sticky top-3 z-20 lg:static">
              <GuessPanel
                onGuessSubmit={submitGuess}
                onReset={resetGame}
                isSolved={isSolved}
                totalAttempts={totalAttempts}
              />
            </div>

            <AttemptHistory attempts={history} />
          </div>
        </div>
      </main>

      <SuccessPortal
        open={isSolved}
        attempts={totalAttempts}
        onRestart={resetGame}
      />
    </>
  );
};
