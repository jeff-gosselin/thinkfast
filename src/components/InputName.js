import React from "react";

// Images Import as a Component
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";

// Styles
import "../styles/Grid.scss";
import "../styles/Learn.scss";
import "../styles/InputName.scss";

export default function InputName({
  inputNamePage,
  playerMode,
  prepStartGame,
  setNameForPlayer1,
  nameForPlayer1,
  setNameForPlayer2,
  nameForPlayer2,
}) {
  console.log("NAME:", nameForPlayer1);
  return (
    <div className={inputNamePage ? "learn" : "learn hide"}>
      <div className="learn-section">
        <LogoBrain className="learn-section-brain" />
        <LogoText className="learn-section-text" />
      </div>

      {playerMode === 1 ? (
        <div>
          <div className="learn-content">
            <h2>Enter Name Below</h2>
          </div>
          <form onSubmit={prepStartGame}>
            <input
              onChange={(e) => setNameForPlayer1(e.target.value)}
              className="input-box box-1"
              type="text"
              placeholder="Name for Player 1"
              value={nameForPlayer1}
            />
            <button className="start-btn">START GAME</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="learn-content">
            <h2>Enter Names Below</h2>
          </div>
          <form onSubmit={prepStartGame}>
            <input
              onChange={(e) => setNameForPlayer1(e.target.value)}
              className="input-box box-1"
              type="text"
              placeholder="Name for Player 1"
              value={nameForPlayer1}
            />
            <input
              onChange={(e) => setNameForPlayer2(e.target.value)}
              className="input-box box-2"
              type="text"
              placeholder="Name for Player 2"
              value={nameForPlayer2}
            />
            <button className="start-btn">START GAME</button>
          </form>
        </div>
      )}
    </div>
  );
}
