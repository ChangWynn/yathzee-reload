import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./page/Home/Home";
import Game from "./page/Game/Game";
import Leaderboard from "./page/Leaderboard/Leaderboard";

import { RoomsState } from "./context/RoomsState";
import { DiceState } from "./context/DiceState";
import { GameFX } from "./context/GameFX";
import { GameSoundFX } from "./context/GameSoundFX";

import { Routes, Route } from "react-router-dom";
import { Settings } from "./context/Settings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Settings>
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
      </Settings>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
