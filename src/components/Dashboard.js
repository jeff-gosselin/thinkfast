import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />
      <div className="scoreboard">
        <div className="scoreboard-p1">
          <h2>Player 1</h2>
        </div>
        <div className="scoreboard-p2">
          <h2>Player 2</h2>
        </div>
      </div>
    </div>
  );
}
