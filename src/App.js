import React, { useState, useEffect } from "react";
import axios from "axios";

// Components Import
import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import GameScreen from "./components/GameScreen";
import EndGame from "./components/EndGame";
import Learn from "./components/Learn";
import HighScores from "./components/HighScores";
import InputName from "./components/InputName";

// Styles
import "./styles/App.scss";

// Dependancy for sound
import { Howl } from "howler";

export default function App() {
  // Players
  const [playerMode, setPlayerMode] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [inputNamePage, setInputNamePage] = useState(false);
  const [nameForPlayer1, setNameForPlayer1] = useState("");
  const [nameForPlayer2, setNameForPlayer2] = useState("");

  // Stores High Scores
  const [highScores, setHighScores] = useState([]);

  // Toggles High Scores page
  const [highScoresPage, setHighScoresPage] = useState(false);

  // Toggles Game Instructions page
  const [learnGame, setLearnGame] = useState(false);

  // Toggles input error message
  const [inputError, setInputError] = useState(false);

  // Determines if game begins
  const [startGame, setStartGame] = useState(false);

  // Determines if game ends
  const [isEnd, setIsEnd] = useState(false);

  // Theme Music
  let theme = new Howl({
    src: ["audio/theme.mp3"],
    volume: 0.2,
    loop: true,
  });

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getAndSetHighScores(setHighScores);
  }, []);

  /////////////////////////////////////////////////////////////////////////////
  const getAndSetHighScores = async (setStateFunction) => {
    axios
      .get("https://thinkfast-api.herokuapp.com/scores")
      .then((response) => {
        let data = response.data.sort((a, b) => b.score - a.score);
        console.log("sorted", data);
        setStateFunction(data);
        console.log("From App:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Perfoms action based on single or two player mode
  function gameMode(e, players) {
    theme.play();
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
    setInputNamePage(true); // Displays Name Input Page
  }

  function prepStartGame(e) {
    e.preventDefault();
    let inputCheck = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;

    if (playerMode === 1) {
      setNameForPlayer1(nameForPlayer1.replace(/\s+$/, ""));
      let inputTest = inputCheck.test(nameForPlayer1);
      if (inputTest) {
        setInputNamePage(false);
        setStartGame(true);
      } else {
        setInputError(true);
      }
    }

    if (playerMode === 2) {
      setNameForPlayer1(nameForPlayer1.replace(/\s+$/, ""));
      setNameForPlayer2(nameForPlayer2.replace(/\s+$/, ""));
      let inputTest1 = inputCheck.test(nameForPlayer1);
      let inputTest2 = inputCheck.test(nameForPlayer2);
      if (inputTest1 && inputTest2) {
        setInputNamePage(false);
        setStartGame(true);
      } else {
        setInputError(true);
      }
    }
  }

  return (
    <div id="App">
      {isEnd ? (
        <EndGame
          setIsEnd={setIsEnd}
          playerMode={playerMode}
          setPlayerMode={setPlayerMode}
          nameForPlayer1={nameForPlayer1}
          nameForPlayer2={nameForPlayer2}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
          highScores={highScores}
          setHighScores={setHighScores}
          getAndSetHighScores={getAndSetHighScores}
          theme={theme}
        />
      ) : null}
      <div id="start-screen">
        <Logo playerMode={playerMode} />
        <SelectPlayers
          gameMode={gameMode}
          playerMode={playerMode}
          setHighScoresPage={setHighScoresPage}
        />
      </div>

      <InputName
        inputNamePage={inputNamePage}
        playerMode={playerMode}
        setNameForPlayer1={setNameForPlayer1}
        nameForPlayer1={nameForPlayer1}
        setNameForPlayer2={setNameForPlayer2}
        nameForPlayer2={nameForPlayer2}
        prepStartGame={prepStartGame}
        inputError={inputError}
      />

      {startGame && !isEnd ? (
        <GameScreen
          playerMode={playerMode}
          setPlayerMode={setPlayerMode}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
          nameForPlayer1={nameForPlayer1}
          nameForPlayer2={nameForPlayer2}
          setIsEnd={setIsEnd}
          highScores={highScores}
          setHighScores={setHighScores}
          setStartGame={setStartGame}
        />
      ) : null}

      {playerMode === null ? (
        <div className="learn-game">
          <p onClick={() => setLearnGame(true)} className="learn-game-link">
            HOW TO PLAY
          </p>
        </div>
      ) : null}

      {!startGame ? (
        <HighScores
          highScoresPage={highScoresPage}
          setHighScoresPage={setHighScoresPage}
          highScores={highScores}
        />
      ) : null}
      {!startGame ? (
        <Learn learnGame={learnGame} setLearnGame={setLearnGame} />
      ) : null}
    </div>
  );
}
