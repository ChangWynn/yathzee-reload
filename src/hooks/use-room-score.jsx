import { useEffect, useState } from "react";
import useDiceState from "../context/DiceState";
import useRoomsState from "../context/RoomsState";

const useRoomScore = (roomName, resolveRoomScore) => {
  const { diceValues } = useDiceState();
  const { roomStates } = useRoomsState();

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

export default useRoomScore;
