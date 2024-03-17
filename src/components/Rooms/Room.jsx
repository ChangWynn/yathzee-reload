import style from "./Room.module.css";
import { useGameContext } from "../../context/GameContext";
import useGameFX from "../../context/GameFX";
import { getStyles } from "../../utils/functions/get-styles";
import { useEffect, useState } from "react";
import { useAudioContext } from "../../context/AudioContext";
import { ACTION } from "../../reducers/room-states";
import { useDiceContext } from "../../context/DiceContext";
import useSettings from "../../context/Settings";
import { formatRoomName } from "../../utils/functions/format-rooms-name";

const Room = ({ roomName, resolveRoomScore, fxTiming, reversed = false }) => {
  const [roomFxOn, setRoomFxOn] = useState(false);

  const { initFxOn } = useSettings();
  const { init } = useGameFX();
  const { playLockRoomAudio } = useAudioContext();
  const { roomStates, dispatchRoomStates, subTotalForBonus } = useGameContext();
  const { isYahtzee, setIsYahtzee, resetDice, resetRollCount, isRollZero, diceRolling } =
    useDiceContext();

  const roomState = roomStates[roomName];
  const roomScore = useRoomScore(roomName, resolveRoomScore);
  const isRoomBonus = roomState.name === "bonus";

  const isDisabled = useIsDisabled({ isRoomBonus, roomState });

  useEffect(() => {
    if (init) {
      setTimeout(() => {
        setRoomFxOn(true);
      }, fxTiming);
    }
  }, [init, fxTiming]);

  const resolveDisplayedScore = () => {
    if (roomState.isLocked) {
      return roomState.lockedScore + (roomName === "yahtzee" ? roomState.totalExtraScore : 0);
    }
    if (isRollZero && !isRoomBonus) return 0;
    return roomScore;
  };

  const lockRoom = () => {
    if (isYahtzee) setIsYahtzee(false);
    dispatchRoomStates({
      action: ACTION.LOCK_ROOM,
      payload: {
        roomName,
        roomScore,
      },
    });
    playLockRoomAudio(roomState.soundFx);
    resetRollCount();
    resetDice();
  };

  if (roomState) {
    return (
      <button
        onClick={lockRoom}
        disabled={isDisabled}
        className={getStyles([
          style["room"],
          style[reversed && "reversed"],
          style[!initFxOn || roomFxOn ? "ready" : "not-ready"],
          style[roomState.isLocked && "locked"],
          style[!isRoomBonus && !roomState.isLocked && roomScore > 0 && !isRollZero && "potential"],
          style[roomName === "bonus" && "bonus"],
          style[diceRolling && "rolling"],
          style[isRollZero && "roll-zero-disabled"],
        ])}
      >
        <span className={style["room-name"]}>{formatRoomName(roomName)}</span>
        {roomName === "bonus" && !roomStates.bonus.isLocked && (
          <span className={style["room-bonus-score-left"]}>{`(${
            63 - subTotalForBonus
          } pts left)`}</span>
        )}
        <span className={style["room-score"]}>
          <p>{resolveDisplayedScore()}</p>
        </span>
      </button>
    );
  } else return null;
};

export default Room;

const useIsDisabled = ({ roomState, isRoomBonus }) => {
  const { initFxOn } = useSettings();
  const { diceRolling, isRollZero } = useDiceContext();
  const { gameIsReady } = useGameFX();

  if (initFxOn) {
    return !gameIsReady || diceRolling || isRoomBonus || isRollZero || roomState.isLocked;
  } else {
    return diceRolling || isRoomBonus || isRollZero || roomState.isLocked;
  }
};

const useRoomScore = (roomName, resolveRoomScore) => {
  const { diceValues } = useDiceContext();
  const { roomStates } = useGameContext();

  const [roomScore, setRoomScore] = useState(0);

  useEffect(() => {
    if (!roomStates[roomName].isLocked && diceValues) {
      const resolvedScore = resolveRoomScore();
      setRoomScore(resolvedScore);
    }

    return () => setRoomScore(0);
  }, [diceValues, resolveRoomScore]);

  return roomScore;
};
