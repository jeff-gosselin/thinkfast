import React, { useState } from "react";

import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import GameScreen from "./components/GameScreen";
import "./styles/App.scss";

export default function App() {
  const [playerMode, setPlayerMode] = useState(null);

  function gameMode(e, players) {
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  return (
    <div id="App">
      <div id="start-screen" className={playerMode !== null ? null : null}>
        <Logo playerMode={playerMode} />
        <SelectPlayers gameMode={gameMode} playerMode={playerMode} />
      </div>
      {playerMode !== null ? <GameScreen playerMode={playerMode} /> : null}
    </div>
  );
}
