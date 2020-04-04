import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/SelectPlayers.scss";

export default function SelectPlayers() {
  return (
    <div className="player-menu">
      <h2>SELECT GAME MODE</h2>
      <button className="player-menu-btn-one">SINGLE PLAYER</button>
      <button className="player-menu-btn-two">TWO PLAYER</button>
    </div>
  );
}
