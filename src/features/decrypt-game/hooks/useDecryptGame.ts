import { useMemo, useRef, useState } from "react";
import { evaluateGuess } from "../utils/gameEngine";
import { createSecretNumber } from "../utils/secret";
import type { GameAttempt } from "../../types";

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
};

export const useDecryptGame = () => {
  const secretRef = useRef(createSecretNumber());
  const [history, setHistory] = useState<GameAttempt[]>([]);

  const isSolved = useMemo(() => {
    return history.some((attempt) => attempt.isSolved);
  }, [history]);

  const submitGuess = (guess: string) => {
    if (isSolved) return;

    const { p, m } = evaluateGuess(guess, secretRef.current);

    setHistory((prev) => {
      const newAttempt: GameAttempt = {
        id: createId(),
        tryCount: prev.length + 1,
        number: guess,
        position: p,
        matches: m,
        isSolved: p === 4,
        createdAt: new Date().toISOString(),
      };

      // first attempt first, latest attempt last
      return [newAttempt, ...prev];
    });
  };

  const resetGame = () => {
    secretRef.current = createSecretNumber();
    setHistory([]);
  };

  return {
    history,
    submitGuess,
    resetGame,
    isSolved,
    totalAttempts: history.length,
  };
};
