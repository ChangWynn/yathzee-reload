import Home from "./page/Home/Home";
import Game from "./page/Game/Game";
import Leaderboard from "./page/Leaderboard/Leaderboard";

import { RoomsState } from "./context/RoomsState";
import { DiceState } from "./context/DiceState";
import { GameFX } from "./context/GameFX";
import { GameSoundFX } from "./context/GameSoundFX";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <DiceState>
      <RoomsState>
        <GameFX>
          <GameSoundFX>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </GameSoundFX>
        </GameFX>
      </RoomsState>
    </DiceState>
  );
};

export default App;
