import React, { useState, useEffect } from "react";

import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import GameScreen from "./components/GameScreen";
import EndGame from "./components/EndGame";
import Learn from "./components/Learn";
import HighScores from "./components/HighScores";

import "./styles/App.scss";

// Dependancy for sound
import { Howl, Howler } from "howler";

export default function App() {
  // Players
  const [playerMode, setPlayerMode] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  // Toggles High Scores page
  const [highScoresPage, setHighScoresPage] = useState(false);

  // Toggles Game Instructions page
  const [learnGame, setLearnGame] = useState(false);

  // Determines if game ends
  const [isEnd, setIsEnd] = useState(false);

  function gameMode(e, players) {
    let theme = new Howl({
      src: ["audio/theme.mp3"],
      volume: 0.2,
      loop: true,
    });
    theme.play();
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  useEffect(() => {
    console.log("Blah!");
  }, []);

  return (
    <div id="App">
      {isEnd ? (
        <EndGame
          setIsEnd={setIsEnd}
          playerMode={playerMode}
          setPlayerMode={setPlayerMode}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
        />
      ) : null}
      <div id="start-screen" className={playerMode !== null ? null : null}>
        <Logo playerMode={playerMode} />
        <SelectPlayers
          gameMode={gameMode}
          playerMode={playerMode}
          setHighScoresPage={setHighScoresPage}
        />
      </div>
      {playerMode !== null && !isEnd ? (
        <GameScreen
          playerMode={playerMode}
          setPlayerMode={setPlayerMode}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
          setIsEnd={setIsEnd}
        />
      ) : null}

      {playerMode === null ? (
        <div className="learn-game">
          <p onClick={() => setLearnGame(true)} className="learn-game-link">
            How to Play
          </p>
        </div>
      ) : null}

      <HighScores
        highScoresPage={highScoresPage}
        setHighScoresPage={setHighScoresPage}
      />
      <Learn learnGame={learnGame} setLearnGame={setLearnGame} />
    </div>
  );
}
