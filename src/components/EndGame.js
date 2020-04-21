import React from "react";

import "../styles/EndGame.scss";

export default function EndGame({ setIsEnd, setPlayerMode }) {
  const restart = () => {
    setIsEnd(false);
    setPlayerMode(null);
  };

  return (
    <div onClick={() => restart()} id="end-game">
      <h1>Player 1 Wins!!!</h1>
    </div>
  );
}
