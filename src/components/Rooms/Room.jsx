import style from "./Room.module.css";
import useRoomsState from "../../context/RoomsState";
import useGameFX from "../../context/GameFX";
import { getStyles } from "../../utils/functions/get-styles";
import { useEffect, useState } from "react";
import useGameSoundFX from "../../context/GameSoundFX";
import { ACTION } from "../../reducers/room-states";
import useRoomScore from "../../hooks/use-room-score";
import useDiceState from "../../context/DiceState";

const Room = ({ roomName, resolveRoomScore, fxTiming }) => {
  const [roomFxOn, setRoomFxOn] = useState(false);

  const { init, gameIsReady } = useGameFX();
  const { playLockRoomCategorySFX } = useGameSoundFX();
  const { roomStates, dispatchRoomStates, subTotalForBonus } = useRoomsState();
  const { isYahtzee, setIsYahtzee, resetDice, resetRollCount, isRollZero, diceRolling } =
    useDiceState();

  const roomState = roomStates[roomName];
  const roomScore = useRoomScore(roomName, resolveRoomScore);
  const isRoomBonus = roomState.name === "bonus";

  useEffect(() => {
    const roomFxTimeout = setTimeout(() => {
      setRoomFxOn(true);
    }, fxTiming);

    return () => clearTimeout(roomFxTimeout);
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
        disabled={!gameIsReady || diceRolling || isRoomBonus || isRollZero || roomState.isLocked}
        className={getStyles([
          style["room"],
          style[roomName],
          style[roomFxOn ? "ready" : "not-ready"],
          style[roomState.isLocked && "locked"],
          style[!isRoomBonus && !roomState.isLocked && roomScore > 0 && !isRollZero && "potential"],
        ])}
      >
        <span className={style["room-name"]}>{roomName}</span>
        {roomName === "bonus" && !roomStates.bonus.isLocked && (
          <span className={style["room-name"]}>{`${63 - subTotalForBonus} points left `}</span>
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
