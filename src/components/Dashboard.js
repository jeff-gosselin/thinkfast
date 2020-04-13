import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />

      <div className="scoreboard">
        <div className="scoreboard-p1 turn">
          <h2>PLAYER 1</h2>
          <h3 className="score">
            0<span>pts</span>
          </h3>
        </div>

        <div className="scoreboard-p2">
          <h2>PLAYER 2</h2>
          <h3 className="score">
            0<span>pts</span>
          </h3>
        </div>
      </div>

      <div className="turn-indicators">
        <div className="turn-indicators-p1" />
        <div className="turn-indicators-p2 inactive" />
      </div>

      <div className="clock start">START</div>
      <div className="clock">00:00</div>
    </div>
  );
}
