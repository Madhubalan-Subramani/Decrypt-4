import type { ScoreResult } from "../types";

export const evaluateGuess = (guess: string, secret: string): ScoreResult => {
  const guessArr = guess.split("");
  const secretArr = secret.split("");

  let p = 0;
  let m = 0;

  const secretVisited = new Array(4).fill(false);
  const guessVisited = new Array(4).fill(false);

  for (let i = 0; i < 4; i++) {
    if (guessArr[i] === secretArr[i]) {
      p++;
      secretVisited[i] = true;
      guessVisited[i] = true;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (guessVisited[i]) continue;

    for (let j = 0; j < 4; j++) {
      if (!secretVisited[j] && guessArr[i] === secretArr[j]) {
        m++;
        secretVisited[j] = true;
        break;
      }
    }
  }

  return { p, m };
};
