export const isYahtzee = (diceValues) => {
  return new Set(diceValues).size === 1;
};
