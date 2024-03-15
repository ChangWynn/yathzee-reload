import videoBackground from "./background/videoBackground.mp4";

import dice1 from "./dice/dice-1.png";
import dice2 from "./dice/dice-2.png";
import dice3 from "./dice/dice-3.png";
import dice4 from "./dice/dice-4.png";
import dice5 from "./dice/dice-5.png";
import dice6 from "./dice/dice-6.png";

import roll1 from "./sfx/roll-1.mp3";
import roll2 from "./sfx/roll-2.mp3";
import roll3 from "./sfx/roll-3.mp3";

import Y from "./yahtzee-letters/Y.png";
import A from "./yahtzee-letters/A.png";
import H from "./yahtzee-letters/H.png";
import T from "./yahtzee-letters/T.png";
import Z from "./yahtzee-letters/Z.png";
import E from "./yahtzee-letters/E.png";

export const assets = {
  background: {
    video: videoBackground,
  },
  dice: {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  },
  soundFx: {
    roll: {
      1: roll1,
      2: roll2,
      3: roll3,
    },
  },
  titleLetter: { Y, A, H, T, Z, E },
};
