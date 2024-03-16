import { useState, useEffect, useRef, forwardRef, createContext, useContext } from "react";

import useGameFX from "./GameFX";
import useRoomsState from "./RoomsState";

const AudioContext = createContext(null);

const AudioProvider = ({ children }) => {
  const { roomStates } = useRoomsState();
  const { yahtzeeFxOn } = useGameFX();

  const lockDieAudioRef = useRef(null);

  const firstRollAudioRef = useRef(null);
  const secondRollAudioRef = useRef(null);
  const thirdRollAudioRef = useRef(null);

  const lockRoomAudioRef1 = useRef(null);
  const lockRoomAudioRef2 = useRef(null);
  const lockRoomAudioRef3 = useRef(null);
  const lockRoomAudioRef4 = useRef(null);

  const yahtzeeAudioRef = useRef(null);
  const yahtzeeBonusAudioRef = useRef(null);

  const playYahtzeeAudio = useAudio([yahtzeeAudioRef, yahtzeeBonusAudioRef]);
  const playLockDieAudio = useAudio([lockDieAudioRef]);
  const playRollDiceAudio = useAudio([firstRollAudioRef, secondRollAudioRef, thirdRollAudioRef]);
  const playLockRoomAudio = useAudio([
    lockRoomAudioRef1,
    lockRoomAudioRef2,
    lockRoomAudioRef3,
    lockRoomAudioRef4,
  ]);

  useEffect(() => {
    if (yahtzeeFxOn) {
      const isyahtzeeAudioRef = !roomStates.yahtzee.isLocked;
      playYahtzeeAudio(isyahtzeeAudioRef ? 0 : 1);
    }
  }, [yahtzeeFxOn]);

  return (
    <AudioContext.Provider
      value={{
        playLockDieAudio,
        playRollDiceAudio,
        playLockRoomAudio,
        playYahtzeeAudio,
      }}
    >
      <Audio ref={lockDieAudioRef} filename="lock-die" />
      <Audio ref={firstRollAudioRef} filename="roll-1" />
      <Audio ref={secondRollAudioRef} filename="roll-2" />
      <Audio ref={thirdRollAudioRef} filename="roll-3" />
      <Audio ref={lockRoomAudioRef1} filename="lock-room-category-1" />
      <Audio ref={lockRoomAudioRef2} filename="lock-room-category-2" />
      <Audio ref={lockRoomAudioRef3} filename="lock-room-category-3" />
      <Audio ref={lockRoomAudioRef4} filename="lock-room-category-4" />
      <Audio ref={yahtzeeAudioRef} filename="yahtzee-celebration" />
      <Audio ref={yahtzeeBonusAudioRef} filename="yahtzee-bonus" />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;

export function useAudioContext() {
  return useContext(AudioContext);
}

const Audio = forwardRef(({ filename }, ref) => {
  return <audio ref={ref} src={`assets/sfx/${filename}.mp3`} type="audio/mpeg" preload="auto" />;
});

const useAudio = (ref) => {
  const [audioRef] = useState([...ref]);
  const playAudioRef = (index = 0) => {
    if (audioRef[index].current) {
      audioRef[index].current.currentTime = 0;
      audioRef[index].current.play();
    }
  };

  return playAudioRef;
};
