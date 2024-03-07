import style from "./RollDiceButton.module.css";

import useGameFX from "../../context/GameFX";
import useGameSoundFX from "../../context/GameSoundFX";
import { getStyles } from "../../utils/functions/get-styles";
import useDiceState from "../../context/DiceState";

const RollDiceButton = () => {
  const { rollButtonOn, setIsRollBtnHovered } = useGameFX();
  const { playDiceRollSFX } = useGameSoundFX();
  const { getNewDice, isYahtzee, rollCount, diceRolling, setDiceRolling } = useDiceState();

  const isDisabled = !rollButtonOn || diceRolling || rollCount === 3 || isYahtzee;

  const switchRollBtnHoverFX = {
    on: () => setIsRollBtnHovered(true),
    off: () => setIsRollBtnHovered(false),
  };

  const rollDice = () => {
    setDiceRolling(true);
    playDiceRollSFX();
    getNewDice();

    setTimeout(() => {
      setDiceRolling(false);
    }, 800);
  };

  return (
    <>
      <div className={style["roll-button-container"]}>
        <button
          className={getStyles([style["roll-button"], style[isDisabled ? "disabled" : "enabled"]])}
          disabled={isDisabled}
          onClick={rollDice}
          onMouseEnter={switchRollBtnHoverFX.on}
          onMouseLeave={switchRollBtnHoverFX.off}
        >
          ROLL
        </button>
      </div>
    </>
  );
};

export default RollDiceButton;
