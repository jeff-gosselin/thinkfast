import React from "react";

import "../styles/EndGame.scss";

export default function EndGame({
  setIsEnd,
  playerMode,
  setPlayerMode,
  player1Score,
  setPlayer1Score,
  player2Score,
  setPlayer2Score,
}) {
  const restart = () => {
    setIsEnd(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayerMode(null);
  };

  const winner = () => {
    // 1 Player Mode
    if (playerMode === 1 && player1Score < 0) {
      return (
        <div className="farewell-message">
          <h1>You are such a negative person!</h1>
          <p>{`You scored ${player1Score} points.`}</p>
        </div>
      );
    }

    if (playerMode === 1 && player1Score > 0 && player1Score <= 25) {
      return (
        <div className="farewell-message">
          <h1>You need a lot more practice!</h1>
          <p>{`You only scored ${player1Score} points.`}</p>
        </div>
      );
    }

    if (playerMode === 1 && player1Score > 25 && player1Score <= 50) {
      return (
        <div className="farewell-message">
          <h1>You are not too bad at this!</h1>
          <p>{`You scored ${player1Score} points.`}</p>
        </div>
      );
    }

    if (playerMode === 1 && player1Score > 50) {
      return (
        <div className="farewell-message">
          <h1>You have acheived greatness!</h1>
          <p>{`You scored ${player1Score} points.`}</p>
        </div>
      );
    }

    // 2 Player Mode
    if (playerMode === 2 && player1Score === player2Score) {
      return (
        <div className="farewell-message">
          <h1>Wow! It is a draw. </h1>
          <p>{`You both scored ${player1Score} points.`}</p>
        </div>
      );
    }

    if (playerMode === 2 && player1Score > player2Score) {
      return (
        <div className="farewell-message">
          <h1>Player 1</h1>
          <h2>wins the game!!</h2>
          <p>{`Beating the competition by ${
            player1Score - player2Score
          } points.`}</p>
        </div>
      );
    }

    if (playerMode === 2 && player1Score < player2Score) {
      return (
        <div className="farewell-message">
          <h1>Player 2</h1>
          <h2>wins the game!!</h2>
          <p>{`Beating the competition by ${
            player2Score - player1Score
          } points.`}</p>
        </div>
      );
    }
  };

  return (
    <div id="end-game">
      {winner()}

      <button onClick={() => restart()}>Play Again?</button>
    </div>
  );
}
