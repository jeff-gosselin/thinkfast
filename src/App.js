import React, { useState } from "react";
import "./styles.css";
import { gameMode } from "./functions.js";

export default function App() {
  const [playerMode, setPlayerMode] = useState(null);

  function gameMode(e, players) {
    players === 1 ? setPlayerMode(1) : setPlayerMode(2);
  }

  console.log(playerMode);
  return (
    <div className="App">
      <h1 onClick={e => gameMode(e, 1)}>Bye CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
