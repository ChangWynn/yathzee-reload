import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { ACTION, initialRoomStates, roomStatesReducer } from "../reducers/room-states";
import useDiceState from "./DiceState";

const RoomsStateCtx = createContext(null);

export const RoomsState = ({ children }) => {
  const { reInitDice, isYahtzee } = useDiceState();
  const [roomStates, dispatchRoomStates] = useReducer(roomStatesReducer, initialRoomStates);

  const [subTotalForBonus, setSubTotalForBonus] = useState(0);
  const [numberOfExtraYahtzee, setNumberOfExtraYahtzee] = useState(0);

  const [totalScore, setTotalScore] = useState(0);
  const [totalHasUpdated, setTotalHasUpdated] = useState(false);

  const [isEndGame, setIsEndGame] = useState(false);

  const updateTotalScore = useCallback(() => {
    let sum = 0;
    for (const room of Object.values(roomStates)) {
      sum += room.lockedScore;
    }
    setTotalScore(sum);
  }, [roomStates]);

  const checkIsEndGame = () => {
    let numberOfRoomLocked = 0;
    for (const room of Object.values(roomStates)) {
      numberOfRoomLocked += room.isLocked ? 1 : 0;
    }

    return (!roomStates.bonus.isLocked && numberOfRoomLocked === 1) || numberOfRoomLocked === 14;
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
    dispatchRoomStates({
      action: ACTION.ADD_YAHTZEE_BONUS,
      payload: { extraScore: numberOfExtraYahtzee * 100 },
    });
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
    dispatchRoomStates({ action: ACTION.RESET_GAME, payload: {} });
    reInitDice();
  };
  return (
    <RoomsStateCtx.Provider
      value={{
        roomStates,
        dispatchRoomStates,
        totalScore,
        subTotalForBonus,
        totalHasUpdated,
        isEndGame,
        setIsEndGame,
        resetGame,
      }}
    >
      {children}
    </RoomsStateCtx.Provider>
  );
};

export default function useRoomsState() {
  return useContext(RoomsStateCtx);
}
