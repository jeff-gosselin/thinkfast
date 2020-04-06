import React, { useState, useEffect } from "react";
import { cards, timerCards, bonusCard } from "./cardData";
import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import "./styles/App.scss";

export default function App() {
  const [playerMode, setPlayerMode] = useState(null);
  const [gameCards, setGameCards] = useState([]);
  const [timerGameCards, setTimerGameCards] = useState([]);
  const [bonusGameCard, setBonusGameCard] = useState([]);

  function gameMode(e, players) {
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  useEffect(() => {
    setGameCards([...cards]);
    setTimerGameCards([...timerCards]);
    setBonusGameCard([...bonusCard]);
  }, []);

  console.log(playerMode);
  return (
    <div className="App">
      <Logo />
      <SelectPlayers gameMode={gameMode} />
    </div>
  );
}
