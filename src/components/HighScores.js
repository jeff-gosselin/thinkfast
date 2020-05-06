import React from "react";

// Images Import as a Component
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";

// Components Import
import Score from "./Score";

// Styles
import "../styles/Grid.scss";
import "../styles/Learn.scss";

export default function HighScores({
  highScoresPage,
  setHighScoresPage,
  highScores,
}) {
  const hideHighScores = () => {
    window.scrollTo(0, 0);
    document.querySelector(".learn").scrollTo(0, 0);
    setHighScoresPage(false);
  };

  // High scores are sorted from highest to lowest, numbered, and formated
  let pos = 0;
  let sortedScores = highScores.sort((a, b) => b.score - a.score);
  let scores = sortedScores.map((highscore) => {
    return (
      <Score
        position={++pos}
        name={highscore.name}
        score={highscore.score}
        date={highscore.date}
        key={highscore._id}
      />
    );
  });

  return (
    <div
      onClick={() => hideHighScores()}
      className={highScoresPage ? "learn" : "learn hide"}
    >
      <p className="close-btn noselect">X</p>
      <div className="learn-section">
        <LogoBrain className="learn-section-brain" />
        <LogoText className="learn-section-text" />
      </div>

      <div className="learn-content">
        <h2>HIGH SCORES</h2>
      </div>
      <ul className="scores-table">
        <li className="score-row">
          <div className="score-header"></div>
          <div className="score-header">Name</div>
          <div className="score-header">Score</div>
          <div className="score-header">Date</div>
        </li>
        {scores}
      </ul>
    </div>
  );
}
