import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard({
  player1Score,
  player2Score,
  startClock,
  runClock,
  clockTime
}) {
  console.log("P1:", player1Score);
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />

      <div className="scoreboard">
        <div className="scoreboard-p1 turn">
          <h2>PLAYER 1</h2>
          <h3 className="score">
            {player1Score}
            <span>pts</span>
          </h3>
        </div>

        <div className="scoreboard-p2">
          <h2>PLAYER 2</h2>
          <h3 className="score">
            {player2Score}
            <span>pts</span>
          </h3>
        </div>
      </div>

      <div className="turn-indicators">
        <div className="turn-indicators-p1" />
        <div className="turn-indicators-p2 inactive" />
      </div>

      <div onClick={runClock} className={!startClock ? "clock start" : "hide"}>
        START
      </div>
      <div className="clock">{`${Math.floor(clockTime / 60)}:${
        Math.floor(clockTime % 60) < 10 ? "0" : ""
      }${Math.floor(clockTime % 60)}`}</div>
    </div>
  );
}
