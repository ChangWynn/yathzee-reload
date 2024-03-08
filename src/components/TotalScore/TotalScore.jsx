import useGameFX from "../../context/GameFX";
import useRoomsState from "../../context/RoomsState";
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
  const { scoreDecorationOn, isRollBtnHovered } = useGameFX();
  const { totalHasUpdated } = useRoomsState();
  return (
    <div
      className={getStyles([
        style["score-decoration"],
        style[(scoreDecorationOn || isRollBtnHovered) && "normal-lights-up"],
        style[scoreDecorationOn && totalHasUpdated && "quick-lights-up"],
      ])}
    />
  );
};

const Score = () => {
  const { totalScoreOn } = useGameFX();
  const { totalScore, totalHasUpdated } = useRoomsState();

  return (
    <strong
      className={getStyles([
        style["score-total"],
        style[totalScoreOn && "active"],
        style[totalScoreOn && totalHasUpdated && "on-update"],
      ])}
    >
      {totalScore}
    </strong>
  );
};
