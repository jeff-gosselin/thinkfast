import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Grid.scss";
import "../styles/Learn.scss";

export default function HighScores({ highScoresPage, setHighScoresPage }) {
  const hideHighScores = () => {
    window.scrollTo(0, 0);
    document.querySelector(".learn").scrollTo(0, 0);
    setHighScoresPage(false);
  };

  return (
    <div
      onClick={() => hideHighScores()}
      className={highScoresPage ? "learn" : "learn hide"}
    >
      <div className="learn-section">
        <LogoBrain className="learn-section-brain" />
        <LogoText className="learn-section-text" />
      </div>

      <div className="learn-content">
        <h2>HIGH SCORES</h2>
      </div>
    </div>
  );
}
