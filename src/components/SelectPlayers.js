import React from "react";
import "../styles/SelectPlayers.scss";

export default function SelectPlayers({
  gameMode,
  playerMode,
  setHighScoresPage,
}) {
  return (
    <div
      className={
        playerMode !== null
          ? "player-menu menu-vanish"
          : "player-menu menu-appear"
      }
    >
      <button onClick={(e) => gameMode(e, 1)} className="player-menu-btn-one">
        SINGLE PLAYER
      </button>
      <button onClick={(e) => gameMode(e, 2)} className="player-menu-btn-two">
        TWO PLAYER
      </button>
      <button
        onClick={() => setHighScoresPage(true)}
        className="player-menu-btn-three"
      >
        HIGH SCORES
      </button>
    </div>
  );
}
