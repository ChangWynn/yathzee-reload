import { createContext, useContext, useEffect, useState } from "react";
import bootGameSoundFX from "../assets/sfx/boot-game.mp3";

import rollDiceSFX1 from "../assets/sfx/roll-1.mp3";
import rollDiceSFX2 from "../assets/sfx/roll-2.mp3";
import rollDiceSFX3 from "../assets/sfx/roll-3.mp3";

import lockDieSoundFX from "../assets/sfx/lock-die.mp3";

import lockRoomCategorySFX1 from "../assets/sfx/lock-room-category-1.mp3";
import lockRoomCategorySFX2 from "../assets/sfx/lock-room-category-2.mp3";
import lockRoomCategorySFX3 from "../assets/sfx/lock-room-category-3.mp3";

import lockRoomCategoryBonusSFX4 from "../assets/sfx/lock-room-category-4.mp3";
import yahtzeeCelebrationSFX from "../assets/sfx/yahtzee-celebration.mp3";
import yahtzeeBonusSFX from "../assets/sfx/yahtzee-bonus.mp3";

import useDiceState from "./DiceState";
import useGameFX from "./GameFX";
import useRoomsState from "./RoomsState";

const GameSoundFxCtx = createContext(null);

export const GameSoundFX = ({ children }) => {
  const { roomStates } = useRoomsState();
  const { rollCount } = useDiceState();
  const { yahtzeeFxOn } = useGameFX();

  const [bootGameSFX] = useState(new Audio(bootGameSoundFX));
  const [lockDieSFX] = useState(new Audio(lockDieSoundFX));
  const lockRoomCategorySFX = [
    new Audio(lockRoomCategorySFX1),
    new Audio(lockRoomCategorySFX2),
    new Audio(lockRoomCategorySFX3),
    new Audio(lockRoomCategoryBonusSFX4),
  ];
  const [diceRollSFX] = useState([
    new Audio(rollDiceSFX1),
    new Audio(rollDiceSFX2),
    new Audio(rollDiceSFX3),
  ]);
  const [yahtzeeCelebrationsSFX] = useState([
    new Audio(yahtzeeCelebrationSFX),
    new Audio(yahtzeeBonusSFX),
  ]);

  const playBootGameSFX = () => {
    bootGameSFX.currentTime = 0;
    bootGameSFX.play();
  };
  const stopBootGameSFX = () => {
    bootGameSFX.pause();
    bootGameSFX.currentTime = 0;
  };

  const playDiceRollSFX = () => {
    diceRollSFX.forEach((soundFX, index) => {
      soundFX.currentTime = 0;
      rollCount === index ? soundFX.play() : soundFX.pause();
    });
  };

  const playLockDieSFX = () => {
    lockDieSFX.currentTime = 0;
    lockDieSFX.play();
  };

  const playLockRoomCategorySFX = (category) => {
    const soundFx = lockRoomCategorySFX[category - 1];
    soundFx.currentTime = 0;
    soundFx.play();
  };

  const playYahtzeeCelebration = (index) => {
    yahtzeeCelebrationsSFX[index].currentTime = 0;
    yahtzeeCelebrationsSFX[index].play();
  };

  useEffect(() => {
    if (yahtzeeFxOn) {
      const isFirstYahtzee = !roomStates.yahtzee.isLocked;
      playYahtzeeCelebration(isFirstYahtzee ? 0 : 1);
    }
  }, [yahtzeeFxOn, roomStates]);

  return (
    <GameSoundFxCtx.Provider
      value={{
        playBootGameSFX,
        stopBootGameSFX,
        playDiceRollSFX,
        playLockDieSFX,
        playLockRoomCategorySFX,
        playYahtzeeCelebration,
      }}
    >
      {children}
    </GameSoundFxCtx.Provider>
  );
};

export default function useGameSoundFX() {
  return useContext(GameSoundFxCtx);
}
