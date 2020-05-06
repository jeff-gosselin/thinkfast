import React from "react";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Dashboard.scss";

export default function Dashboard({
  currentPlayer,
  round,
  player1Score,
  player2Score,
  nameForPlayer1,
  nameForPlayer2,
  startClock,
  runClock,
  clockTime,
  shake,
  timeAdded,
}) {
  return (
    <div id="dashboard">
      <LogoText className="header-logo" />

      <div className="scoreboard noselect">
        <div className={currentPlayer ? "scoreboard-p1 turn" : "scoreboard-p1"}>
          <h2>{nameForPlayer1}</h2>
          <h3 className={shake && currentPlayer ? "score shake" : "score"}>
            {player1Score}
            <span className="pts">pts</span>
          </h3>
        </div>

        <div
          className={!currentPlayer ? "scoreboard-p2 turn" : "scoreboard-p2"}
        >
          <h2>{nameForPlayer2 !== "" ? nameForPlayer2 : "PLAYER 2"}</h2>
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

      <div
        onClick={runClock}
        className={!startClock ? "clock start noselect" : "hide"}
      >
        START
      </div>
      <div
        className={timeAdded ? "clock noselect clock-shake" : "clock noselect"}
      >
        <h5 className="round-text">Round {Math.floor(round)}</h5>
        {`${Math.floor(clockTime / 60)}:${
          Math.floor(clockTime % 60) < 10 ? "0" : ""
        }${Math.floor(clockTime % 60)}`}
      </div>
    </div>
  );
}
