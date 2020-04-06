import React from "react";
import "../styles/SelectPlayers.scss";

export default function SelectPlayers({ gameMode }) {
  return (
    <div className="player-menu">
      <h2>SELECT MODE</h2>
      <button onClick={e => gameMode(e, 1)} className="player-menu-btn-one">
        SINGLE PLAYER
      </button>
      <button onClick={e => gameMode(e, 2)} className="player-menu-btn-two">
        TWO PLAYER
      </button>
    </div>
  );
}
