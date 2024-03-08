import style from "./Room.module.css";
import useRoomsState from "../../context/RoomsState";
import useGameFX from "../../context/GameFX";
import { getStyles } from "../../utils/functions/get-styles";
import { useEffect, useState } from "react";
import useGameSoundFX from "../../context/GameSoundFX";
import { ACTION } from "../../reducers/room-states";
import useRoomScore from "../../hooks/use-room-score";
import useDiceState from "../../context/DiceState";
import useSettings from "../../context/Settings";

const Room = ({ roomName, resolveRoomScore, fxTiming, reversed = false }) => {
  const [roomFxOn, setRoomFxOn] = useState(false);

  const { initFxOn } = useSettings();
  const { init } = useGameFX();
  const { playLockRoomCategorySFX } = useGameSoundFX();
  const { roomStates, dispatchRoomStates, subTotalForBonus } = useRoomsState();
  const { isYahtzee, setIsYahtzee, resetDice, resetRollCount, isRollZero, diceRolling } =
    useDiceState();

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

  const lockRoom = () => {
    if (isYahtzee) setIsYahtzee(false);
    dispatchRoomStates({
      action: ACTION.LOCK_ROOM,
      payload: {
        roomName,
        roomScore,
      },
    });
    playLockRoomCategorySFX(roomState.soundFx);
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
          style[roomName],
          style[reversed && "reversed"],
          style[initFxOn && "init-state"],
          style[!initFxOn || roomFxOn ? "ready" : "not-ready"],
          style[roomState.isLocked && "locked"],
          style[!isRoomBonus && !roomState.isLocked && roomScore > 0 && !isRollZero && "potential"],
        ])}
      >
        <span className={style["room-name"]}>{roomName}</span>
        {roomName === "bonus" && !roomStates.bonus.isLocked && (
          <span className={style["room-bonus-score-left"]}>{`(${
            63 - subTotalForBonus
          } pts left)`}</span>
        )}
        <span className={style["room-score"]}>
          <p>
            {isRollZero && !isRoomBonus && roomState.lockedScore === 0
              ? "0"
              : roomState.isLocked
              ? roomState.lockedScore
              : roomScore}
          </p>
        </span>
      </button>
    );
  } else return null;
};

export default Room;

const useIsDisabled = ({ roomState, isRoomBonus }) => {
  const { initFxOn } = useSettings();
  const { diceRolling, isRollZero } = useDiceState();
  const { gameIsReady } = useGameFX();

  if (initFxOn) {
    return !gameIsReady || diceRolling || isRoomBonus || isRollZero || roomState.isLocked;
  } else {
    return diceRolling || isRoomBonus || isRollZero || roomState.isLocked;
  }
};
