import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />
      <div className="scoreboard">
        <div className="scoreboard-p1">
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
    </div>
  );
}
