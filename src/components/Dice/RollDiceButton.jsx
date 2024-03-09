import style from "./RollDiceButton.module.css";

import useGameFX from "../../context/GameFX";
import useGameSoundFX from "../../context/GameSoundFX";
import { getStyles } from "../../utils/functions/get-styles";
import useDiceState from "../../context/DiceState";
import useSettings from "../../context/Settings";
import Dots from "../Dots/Dots";

const RollDiceButton = () => {
  const { setIsRollBtnHovered } = useGameFX();
  const { playDiceRollSFX } = useGameSoundFX();
  const { getNewDice, setDiceRolling } = useDiceState();

  const isDisabled = useIsDisabled();

  const switchRollBtnHoverFX = {
    on: () => setIsRollBtnHovered(true),
    off: () => setIsRollBtnHovered(false),
  };

  const rollDice = () => {
    setDiceRolling(true);
    playDiceRollSFX();
    getNewDice();

    setTimeout(() => {
      switchRollBtnHoverFX.off();
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
        <Dots />
      </div>
    </>
  );
};

export default RollDiceButton;

const useIsDisabled = () => {
  const { initFxOn } = useSettings();
  const { isYahtzee, rollCount, diceRolling } = useDiceState();
  const { rollButtonOn } = useGameFX();

  if (initFxOn) {
    return !rollButtonOn || diceRolling || rollCount === 3 || isYahtzee;
  } else {
    return diceRolling || rollCount === 3 || isYahtzee;
  }
};
