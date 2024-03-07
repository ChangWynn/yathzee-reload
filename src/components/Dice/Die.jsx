import style from "./Die.module.css";
import useGameFX from "../../context/GameFX";
import useGameSoundFX from "../../context/GameSoundFX";
import { getStyles } from "../../utils/functions/get-styles";
import useDiceState from "../../context/DiceState";

const Die = ({ index, die }) => {
  const { diceOn, isRollBtnHovered } = useGameFX();
  const { playLockDieSFX } = useGameSoundFX();
  const { dice, setDice, rollCount } = useDiceState();

  const isRollZero = rollCount === 0;

  const toggleLock = () => {
    if (isRollZero) return;
    playLockDieSFX();
    const updatedDice = [...dice];
    updatedDice[index].isLocked = !updatedDice[index].isLocked;
    setDice([...updatedDice]);
  };

  return (
    <div
      className={getStyles([
        style["die"],
        style[die.isLocked && "locked"],
        style[die.isRolling && "rolling"],
        style[isRollZero && "inactive"],
        style[isRollBtnHovered && "hovered"],
      ])}
      onClick={toggleLock}
    >
      <img
        className={style[diceOn ? "shown" : "hidden"]}
        src={require(`../../assets/dice/dice-${die.value}.png`)}
        alt={`dice number ${die.value}`}
      />
    </div>
  );
};

export default Die;
