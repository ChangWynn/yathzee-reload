import style from "./Dice.module.css";

import useGameFX from "../../context/GameFX";
import Die from "./Die";
import { getStyles } from "../../utils/functions/get-styles";
import useDiceState from "../../context/DiceState";
import useSettings from "../../context/Settings";

const Dice = () => {
  const { initFxOn } = useSettings();
  const { diceContainerOn, isRollBtnHovered } = useGameFX();
  const { dice, diceRolling } = useDiceState();

  return (
    <div
      className={getStyles([
        style["dice-container"],
        style[initFxOn && "init-state"],
        style[diceContainerOn && "active"],
        style[diceRolling && "rolling"],
        style[isRollBtnHovered && "hovered"],
      ])}
    >
      {dice.map((die, index) => (
        <Die key={index} die={die} index={index} />
      ))}
    </div>
  );
};

export default Dice;
