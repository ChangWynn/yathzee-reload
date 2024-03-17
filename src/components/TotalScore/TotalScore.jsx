import { useDiceContext } from "../../context/DiceContext";
import useGameFX from "../../context/GameFX";
import { useGameContext } from "../../context/GameContext";
import useSettings from "../../context/Settings";
import { getStyles } from "../../utils/functions/get-styles";
import style from "./TotalScore.module.css";

const TotalScore = () => {
  return (
    <div className={style["score"]}>
      <div className={style["score-container"]}>
        <ScoreDecoration />
        <Score />
        <ScoreDecoration />
      </div>
    </div>
  );
};

export default TotalScore;

const ScoreDecoration = () => {
  const { initFxOn } = useSettings();
  const { scoreDecorationOn, isRollBtnHovered } = useGameFX();
  const { totalHasUpdated, isEndGame } = useGameContext();
  const { diceRolling } = useDiceContext();

  return (
    <div
      className={getStyles([
        style["score-decoration"],
        style[
          ((initFxOn && scoreDecorationOn) || isRollBtnHovered || diceRolling || isEndGame) &&
            "normal-lights-up"
        ],
        style[((initFxOn && scoreDecorationOn) || totalHasUpdated) && "quick-lights-up"],
      ])}
    />
  );
};

const Score = () => {
  const { initFxOn } = useSettings();
  const { totalScoreOn } = useGameFX();
  const { totalScore, totalHasUpdated } = useGameContext();

  return (
    <strong
      className={getStyles([
        style["score-total"],
        style[(!initFxOn || totalScoreOn) && "active"],
        style[(totalScoreOn || !initFxOn) && totalHasUpdated && "on-update"],
      ])}
    >
      {totalScore}
    </strong>
  );
};
