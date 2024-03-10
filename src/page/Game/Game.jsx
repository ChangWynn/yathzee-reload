import style from "./Game.module.css";
import { getStyles } from "../../utils/functions/get-styles";

import useGameFX from "../../context/GameFX";

import Rooms from "../../components/Rooms/Rooms";
import Dice from "../../components/Dice/Dice";
import RollDiceButton from "../../components/Dice/RollDiceButton";
import TotalScore from "../../components/TotalScore/TotalScore";
import EndGame from "../../components/Modal/EndGame/EngGame";
import PageContainer from "../PageContainer";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BackButton, RestartButton, SettingsButton } from "../../components/Navbar/Buttons";
import useSettings from "../../context/Settings";

const Game = () => {
  const { setInit, dashboardOn, yahtzeeFxOn } = useGameFX();
  const { initFxOn } = useSettings();

  useEffect(() => {
    if (initFxOn) {
      setInit(true);
    }
  }, [initFxOn, setInit]);

  return (
    <PageContainer id="game">
      <Navbar>
        <BackButton />
        {/* <SettingsButton /> */}
        <RestartButton />
      </Navbar>
      <div
        className={getStyles([
          style["game-container"],
          style[initFxOn && "init-state"],
          style[dashboardOn && "activated"],
          style[yahtzeeFxOn && "yahtzee-celebration"],
        ])}
      >
        <TotalScore />
        <Rooms />
        <Dice />
        <RollDiceButton />
      </div>
      <EndGame />
    </PageContainer>
  );
};

export default Game;
