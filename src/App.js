import React, { useState } from "react";

import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import GameScreen from "./components/GameScreen";
import EndGame from "./components/EndGame";

import "./styles/App.scss";

export default function App() {
  const [playerMode, setPlayerMode] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  function gameMode(e, players) {
    let theme = new Howl({
      src: ["audio/theme.mp3"],
      volume: 0.2,
      loop: true
    });
    theme.play();
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  return (
    <div id="App">
      {isEnd ? (
        <EndGame setIsEnd={setIsEnd} setPlayerMode={setPlayerMode} />
      ) : null}
      <div id="start-screen" className={playerMode !== null ? null : null}>
        <Logo playerMode={playerMode} />
        <SelectPlayers gameMode={gameMode} playerMode={playerMode} />
      </div>
      {playerMode !== null && !isEnd ? (
        <GameScreen
          playerMode={playerMode}
          setPlayerMode={setPlayerMode}
          setIsEnd={setIsEnd}
        />
      ) : null}
    </div>
  );
}
