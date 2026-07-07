export interface ScoreResult {
  p: number;
  m: number;
}

export interface GameAttempt {
  id: string;
  tryCount: number;
  number: string;
  position: number;
  matches: number;
  isSolved: boolean;
  createdAt: string;
}

export interface GuessFormValues {
  guess: string;
}