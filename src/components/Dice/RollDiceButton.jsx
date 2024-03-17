import style from "./RollDiceButton.module.css";

import useGameFX from "../../context/GameFX";
import { useAudioContext } from "../../context/AudioContext";
import { getStyles } from "../../utils/functions/get-styles";
import { useDiceContext } from "../../context/DiceContext";
import useSettings from "../../context/Settings";
import Dots from "../Dots/Dots";

const RollDiceButton = () => {
  const { setIsRollBtnHovered } = useGameFX();
  const { playRollDiceAudio } = useAudioContext();
  const { rollCount, getNewDice, setDiceRolling } = useDiceContext();

  const isDisabled = useIsDisabled();

  const switchRollBtnHoverFX = {
    on: () => setIsRollBtnHovered(true),
    off: () => setIsRollBtnHovered(false),
  };

  const rollDice = () => {
    setDiceRolling(true);
    playRollDiceAudio(rollCount);
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
  const { isYahtzee, rollCount, diceRolling } = useDiceContext();
  const { rollButtonOn } = useGameFX();

  if (initFxOn) {
    return !rollButtonOn || diceRolling || rollCount === 3 || isYahtzee;
  } else {
    return diceRolling || rollCount === 3 || isYahtzee;
  }
};
