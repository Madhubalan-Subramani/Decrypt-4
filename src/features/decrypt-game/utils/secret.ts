const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const createSecretNumber = (): string => {
  const shuffled = [...DIGITS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).join("");
};
