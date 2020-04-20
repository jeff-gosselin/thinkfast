import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard({
  currentPlayer,
  player1Score,
  player2Score,
  startClock,
  runClock,
  clockTime,
  shake
}) {
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />

      <div className="scoreboard">
        <div className={currentPlayer ? "scoreboard-p1 turn" : "scoreboard-p1"}>
          <h2>PLAYER 1</h2>
          <h3 className={shake && currentPlayer ? "score shake" : "score"}>
            {player1Score}
            <span className="pts">pts</span>
          </h3>
        </div>

        <div
          className={!currentPlayer ? "scoreboard-p2 turn" : "scoreboard-p2"}
        >
          <h2>PLAYER 2</h2>
          <h3 className={shake && !currentPlayer ? "score shake" : "score"}>
            {player2Score}
            <span className="pts">pts</span>
          </h3>
        </div>
      </div>

      <div className="turn-indicators">
        <div
          className={
            currentPlayer ? "turn-indicators-p1" : "turn-indicators-p1 inactive"
          }
        />
        <div
          className={
            !currentPlayer
              ? "turn-indicators-p2"
              : "turn-indicators-p2 inactive"
          }
        />
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
