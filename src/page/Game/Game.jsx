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
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BackButton, RestartButton, SettingsButton } from "../../components/Navbar/Buttons";

const Game = () => {
  const { setInit, dashboardOn, yahtzeeFxOn } = useGameFX();

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <PageContainer id="game">
      <Navbar>
        <BackButton />
        {/* <SettingsButton />
        <RestartButton /> */}
      </Navbar>
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
