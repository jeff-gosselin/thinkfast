import React, { useState, useEffect } from "react";
import { cards } from "./cardData";
import Logo from "./components/Logo";
import SelectPlayers from "./components/SelectPlayers";
import "./styles/App.scss";

export default function App() {
  const [playerMode, setPlayerMode] = useState(null);
  const [gameCards, setGameCards] = useState([]);

  function gameMode(e, players) {
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  useEffect(() => {
    return setGameCards([...cards]);
  }, []);

  return (
    <div className="App">
      {/* <h1 onClick={e => gameMode(e, 2)}>Bye CodeSandbox</h1> */}

      <Logo />
      <SelectPlayers />
    </div>
  );
}
