import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Learn.scss";

export default function Learn({ learnGame, setLearnGame }) {
  return (
    <div
      onClick={() => setLearnGame(false)}
      className={learnGame ? "learn" : "learn hide"}
    >
      <div className="learn-section">
        <LogoBrain className="learn-section-brain" />
        <LogoText className="learn-section-text" />
      </div>
    </div>
  );
}
