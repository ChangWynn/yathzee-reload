import { useGameContext } from "../../context/GameContext";
import { ACTION } from "../../reducers/room-states";
import Room from "./Room";
import style from "./Rooms.module.css";
import { useAudioContext } from "../../context/AudioContext";
import { useDiceContext } from "../../context/DiceContext";

const Rooms = () => {
  const { subTotalForBonus, isYahtzeeBonusEligible, roomStates, dispatchRoomStates } =
    useGameContext();
  const { diceValues, isYahtzee } = useDiceContext();
  const { playLockRoomAudio } = useAudioContext();

  const getUniqueDice = () => {
    return [...new Set(diceValues)];
  };

  const resolveDiceValueScore = (value) => {
    let score = 0;
    diceValues.forEach((diceValue) => {
      if (diceValue === value) score += value;
    });
    return score;
  };

  const resolveBonusScore = () => {
    if (roomStates.bonus.isLocked) return;
    if (subTotalForBonus >= 63) {
      playLockRoomAudio(3);
      dispatchRoomStates({
        action: ACTION.LOCK_ROOM,
        payload: {
          roomName: "bonus",
          roomScore: 35,
        },
      });
    } else return 0;
  };

  const resolveThreeOrFourOfAKindScore = (kind) => {
    for (let die = 1; die <= 6; die++) {
      if (diceValues.filter((dieValue) => dieValue === die).length >= kind) {
        return diceValues.reduce((sum, dieValue) => {
          return sum + dieValue;
        });
      }
    }
    return 0;
  };

  const resolveFullHouseScore = () => {
    if (isYahtzee && isYahtzeeBonusEligible) return 25;

    const uniqueDice = getUniqueDice();
    if (uniqueDice.length !== 2) return 0;

    const countDice = [0, 0];
    diceValues.forEach((die) => {
      if (die === uniqueDice[0]) countDice[0] += 1;
      if (die === uniqueDice[1]) countDice[1] += 1;
    });

    if (countDice.includes(3 || 2)) return 25;
    else return 0;
  };

  const resolveStraightScore = (length) => {
    if (isYahtzee && isYahtzeeBonusEligible && length === 4) return 30;
    if (isYahtzee && isYahtzeeBonusEligible && length === 5) return 40;

    const uniqueDice = getUniqueDice().sort();
    if (uniqueDice.length < length) return 0;

    let consecutiveNumbers = [];
    for (let i = 0; i < uniqueDice.length; i++) {
      if (uniqueDice[i] + 1 === uniqueDice[i + 1]) {
        consecutiveNumbers.push(uniqueDice[i]);
        if (consecutiveNumbers.length === length - 1) {
          if (length === 4) return 30;
          if (length === 5) return 40;
        }
      } else {
        consecutiveNumbers = [];
      }
    }
    return 0;
  };

  const resolveYahtzeeScore = () => {
    if (!roomStates.yahtzee.isLocked && isYahtzee) return 50;
    else return 0;
  };

  const resolveChanceScore = () => {
    return diceValues.reduce((sum, num) => sum + num);
  };

  return (
    <div className={style["rooms"]}>
      <RoomsHalf>
        <Room roomName="ones" resolveRoomScore={() => resolveDiceValueScore(1)} fxTiming={800} />
        <Room roomName="twos" resolveRoomScore={() => resolveDiceValueScore(2)} fxTiming={700} />
        <Room roomName="threes" resolveRoomScore={() => resolveDiceValueScore(3)} fxTiming={600} />
        <Room roomName="fours" resolveRoomScore={() => resolveDiceValueScore(4)} fxTiming={500} />
        <Room roomName="fives" resolveRoomScore={() => resolveDiceValueScore(5)} fxTiming={400} />
        <Room roomName="sixes" resolveRoomScore={() => resolveDiceValueScore(6)} fxTiming={300} />
        <Room roomName="bonus" resolveRoomScore={resolveBonusScore} fxTiming={200} />
      </RoomsHalf>
      <RoomsHalf>
        <Room
          reversed
          roomName="threeOfAKind"
          resolveRoomScore={() => resolveThreeOrFourOfAKindScore(3)}
          fxTiming={800}
        />
        <Room
          reversed
          roomName="fourOfAKind"
          resolveRoomScore={() => resolveThreeOrFourOfAKindScore(4)}
          fxTiming={700}
        />
        <Room
          reversed
          roomName="fullHouse"
          resolveRoomScore={resolveFullHouseScore}
          fxTiming={600}
        />
        <Room
          reversed
          roomName="smallStraight"
          resolveRoomScore={() => resolveStraightScore(4)}
          fxTiming={500}
        />
        <Room
          reversed
          roomName="largeStraight"
          resolveRoomScore={() => resolveStraightScore(5)}
          fxTiming={400}
        />
        <Room reversed roomName="yahtzee" resolveRoomScore={resolveYahtzeeScore} fxTiming={300} />
        <Room reversed roomName="chance" resolveRoomScore={resolveChanceScore} fxTiming={200} />
      </RoomsHalf>
    </div>
  );
};

export default Rooms;

const RoomsHalf = ({ children }) => {
  return <div className={style["half-room"]}>{children}</div>;
};
