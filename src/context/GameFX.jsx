import { createContext, useContext, useEffect, useState } from "react";
import useDiceState from "./DiceState";
import useSettings from "./Settings";

const GameFxCtx = createContext(null);

export const GameFX = ({ children }) => {
  const { isYahtzee } = useDiceState();
  const { initFxOn } = useSettings();

  const [init, setInit] = useState(false);
  const [dashboardOn, setDashboardOn] = useState(false);
  const [titleOn, setTitleOn] = useState(false);
  const [navbarOn, setNavbarOn] = useState(false);

  const [totalScoreOn, setTotalScoreOn] = useState(false);
  const [scoreDecorationOn, setScoreDecorationOn] = useState(false);

  const [diceContainerOn, setDiceContainer] = useState(false);
  const [diceOn, setDiceOn] = useState(false);
  const [rollButtonOn, setRollButtonOn] = useState(false);

  const [gameIsReady, setGameIsReady] = useState(false);

  const [isRollBtnHovered, setIsRollBtnHovered] = useState(false);

  const [yahtzeeFxOn, setYahtzeeFxOn] = useState(false);

  useEffect(() => {
    if (initFxOn && init) {
      launchEffect(setDashboardOn, 1200);
      launchEffect(setTitleOn, 2400);
      launchEffect(setNavbarOn, 1200);
      launchEffect(setDiceContainer, 1800);
      launchEffect(setRollButtonOn, 2400);
      launchEffect(setDiceOn, 2000);
      launchEffect(setGameIsReady, 3000);
      launchEffect(setScoreDecorationOn);
      stopEffect(setScoreDecorationOn, 1400);
      launchEffect(setTotalScoreOn, 1200);
    }

    return shutDownAllEffects;
  }, [initFxOn, init]);

  useEffect(() => {
    let yahtzeeTimeout;
    if (isYahtzee) {
      setYahtzeeFxOn(true);
      yahtzeeTimeout = setTimeout(() => {
        setYahtzeeFxOn(false);
      }, 2000);
    }

    return () => clearTimeout(yahtzeeTimeout);
  }, [isYahtzee]);

  const launchEffect = (setEffect, timing = 0) => {
    if (timing === 0) {
      setEffect(true);
    } else {
      return setTimeout(() => {
        setEffect(true);
      }, timing);
    }
  };

  const stopEffect = (setEffect, timing = 0) => {
    return setTimeout(() => {
      setEffect(false);
    }, timing);
  };

  const shutDownAllEffects = () => {
    setInit(false);
    setDashboardOn(false);
    setTitleOn(false);
    setNavbarOn(false);
    setDiceContainer(false);
    setRollButtonOn(false);
    setDiceOn(false);
    setGameIsReady(false);
  };

  return (
    <GameFxCtx.Provider
      value={{
        init,
        setInit,
        gameIsReady,
        dashboardOn,
        titleOn,
        navbarOn,
        totalScoreOn,
        scoreDecorationOn,
        diceContainerOn,
        rollButtonOn,
        diceOn,
        yahtzeeFxOn,
        isRollBtnHovered,
        setIsRollBtnHovered,
      }}
    >
      {children}
    </GameFxCtx.Provider>
  );
};

export default function useGameFX() {
  return useContext(GameFxCtx);
}
