import style from "./Game.module.css";
import { getStyles } from "../../utils/functions/get-styles";

import Menu from "../../components/Menu/Menu";
import useGameFX from "../../context/GameFX";

import Rooms from "../../components/Rooms/Rooms";
import Dice from "../../components/Dice/Dice";
import RollDiceButton from "../../components/Dice/RollDiceButton";
import Dots from "../../components/Dots/Dots";
import TotalScore from "../../components/TotalScore/TotalScore";
import EndGame from "../../components/Modal/EndGame/EngGame";
import PageContainer from "../PageContainer";

const Game = () => {
  const { dashboardOn, yahtzeeFxOn } = useGameFX();

  return (
    <PageContainer id="game">
      <Menu />
      <div
        className={getStyles([
          style["game-container"],
          style[dashboardOn && "active"],
          style[yahtzeeFxOn && "yahtzee-celebration"],
        ])}
      >
        <TotalScore />
        <Rooms />
        <Dice />
        <RollDiceButton />
        <Dots />
      </div>
      <EndGame />
    </PageContainer>
  );
};

export default Game;
