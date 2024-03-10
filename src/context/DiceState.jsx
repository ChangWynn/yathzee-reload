import { createContext, useContext, useState } from "react";
import { notRollingInitialDice, rollingInitialDice } from "../utils/constants/initial-dice-state";
import { useEffect } from "react";

const DiceCtx = createContext(null);

export const DiceState = ({ children }) => {
  const [dice, setDice] = useState(notRollingInitialDice);
  const [diceValues, setDiceValues] = useState(null);
  const [isYahtzee, setIsYahtzee] = useState(false);

  const [rollCount, setRollCount] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);

  const incrementRollCount = () => {
    setTimeout(() => {
      setRollCount((prevRollCount) => (prevRollCount += 1));
    }, 800);
  };

  const resetRollCount = () => {
    setRollCount(0);
  };

  const getNewDice = () => {
    const rolledDice = dice.map(
      (die) =>
        die.isLocked ? die : { ...die, isRolling: true, value: Math.floor(Math.random() * 6) + 1 } // Math.floor(Math.random() * 6) + 1
    );
    setDice([...rolledDice]);

    setTimeout(() => {
      const finishedDice = rolledDice.map((die) => ({ ...die, isRolling: false }));
      setDice([...finishedDice]);
      setDiceValues(() => {
        return finishedDice.map((die) => {
          return die.value;
        });
      });
    }, 800);

    incrementRollCount();
  };

  const resetDice = () => {
    const unlockedDice = dice.map((die) => {
      return { ...die, isLocked: false };
    });
    setDice(unlockedDice);
  };

  const reInitDice = () => {
    setDice(rollingInitialDice);
    setDiceValues(null);
    setRollCount(0);

    setTimeout(() => {
      setDice(notRollingInitialDice);
    }, 300);
  };

  useEffect(() => {
    if (new Set(diceValues).size === 1) {
      setIsYahtzee(true);
    }
  }, [diceValues]);

  return (
    <DiceCtx.Provider
      value={{
        dice,
        setDice,
        resetDice,
        reInitDice,
        getNewDice,
        diceValues,
        isYahtzee,
        setIsYahtzee,
        rollCount,
        resetRollCount,
        isRollZero: rollCount === 0,
        diceRolling,
        setDiceRolling,
      }}
    >
      {children}
    </DiceCtx.Provider>
  );
};

export default function useDiceState() {
  return useContext(DiceCtx);
}
