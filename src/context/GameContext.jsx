import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { ACTION, initialRoomStates, roomStatesReducer } from "../reducers/room-states";
import { useDiceContext } from "./DiceContext";

const GameContext = createContext(null);

const GameStateProvider = ({ children }) => {
  const { reInitDice, isYahtzee } = useDiceContext();
  const [roomStates, dispatchRoomStates] = useReducer(roomStatesReducer, initialRoomStates);

  const [subTotalForBonus, setSubTotalForBonus] = useState(0);
  const [numberOfExtraYahtzee, setNumberOfExtraYahtzee] = useState(0);

  const [totalScore, setTotalScore] = useState(0);
  const [totalHasUpdated, setTotalHasUpdated] = useState(false);

  const [isEndGame, setIsEndGame] = useState(false);

  const isYahtzeeBonusEligible =
    roomStates.yahtzee.isLocked && roomStates.yahtzee.lockedScore === 50;

  const updateTotalScore = useCallback(() => {
    let sum = 0;
    for (const room of Object.values(roomStates)) {
      sum += room.lockedScore;
    }
    sum += roomStates.yahtzee.totalExtraScore;
    setTotalScore(sum);
  }, [roomStates]);

  const checkIsEndGame = () => {
    let numberOfRoomLocked = 0;
    for (const room of Object.values(roomStates)) {
      numberOfRoomLocked += room.isLocked ? 1 : 0;
    }

    return (!roomStates.bonus.isLocked && numberOfRoomLocked === 13) || numberOfRoomLocked === 14;
  };

  // update subTotalForBonus
  useEffect(() => {
    const eligible = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    let sum = 0;

    if (subTotalForBonus < 63) {
      for (const [key, value] of Object.entries(roomStates)) {
        if (eligible.includes(key)) {
          sum += value.lockedScore;
        }
      }
      setSubTotalForBonus(sum);
    }
  }, [subTotalForBonus, roomStates]);

  // update numberOfYahtzee
  useEffect(() => {
    if (isYahtzee && roomStates.yahtzee.isLocked) {
      setNumberOfExtraYahtzee((prevValue) => prevValue + 1);
    }
  }, [isYahtzee]);

  // add extra yahtzee score to yahtzee score
  useEffect(() => {
    if (isYahtzeeBonusEligible) {
      dispatchRoomStates({
        action: ACTION.ADD_YAHTZEE_BONUS,
        payload: { numberOfExtraYahtzee },
      });
    }
  }, [numberOfExtraYahtzee]);

  // update total score
  useEffect(() => {
    setTotalHasUpdated(true);
    updateTotalScore();

    const totalHasUpdatedTimeout = setTimeout(() => {
      setTotalHasUpdated(false);
    }, 200);

    return () => clearTimeout(totalHasUpdatedTimeout);
  }, [roomStates, updateTotalScore]);

  //set endGame
  useEffect(() => {
    if (checkIsEndGame()) {
      setIsEndGame(true);
    }
  }, [roomStates]);

  useEffect(() => {}, []);

  const resetGame = () => {
    setIsEndGame(false);
    reInitDice();
    dispatchRoomStates({ action: ACTION.RESET_GAME, payload: {} });
  };

  return (
    <GameContext.Provider
      value={{
        roomStates,
        dispatchRoomStates,
        totalScore,
        subTotalForBonus,
        isYahtzeeBonusEligible,
        totalHasUpdated,
        isEndGame,
        setIsEndGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameStateProvider;

export function useGameContext() {
  return useContext(GameContext);
}
