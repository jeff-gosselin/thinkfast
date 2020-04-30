import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Grid.scss";
import "../styles/Learn.scss";

export default function Learn({ learnGame, setLearnGame }) {
  const hideInstructions = () => {
    window.scrollTo(0, 0);
    document.querySelector(".learn").scrollTo(0, 0);
    setLearnGame(false);
  };

  return (
    <div
      onClick={() => hideInstructions()}
      className={learnGame ? "learn" : "learn hide"}
    >
      <div className="learn-section">
        <LogoBrain className="learn-section-brain" />
        <LogoText className="learn-section-text" />
      </div>

      <div className="learn-content">
        <h2>HOW TO PLAY</h2>

        <div className="learn-content-section">
          <h3>Synopsis:</h3>
          <p>
            Players race against the clock to reveal as many matching tiles as
            they can for the highest score possible.
          </p>
        </div>

        <div className="learn-content-section">
          <h3>Scoring:</h3>
          <p>
            Most of the tiles that you match in the game are worth 4 points, but
            there are a few tiles that are special...
          </p>

          <div className="points-info">
            <img src="card-svgs/timer.svg" alt="" />

            <div className="points-info-p">
              <h4>The Timer</h4>
              <p>Adds 30 seconds to the clock and worth 2 points</p>
            </div>
          </div>

          <div className="points-info">
            <img className="robot" src="card-svgs/robot.svg" alt="" />

            <div className="points-info-p">
              <h4>The Robot</h4>
              <p>Match this tile to receive 10 points</p>
            </div>
          </div>

          <div className="points-info">
            <img className="scientist" src="card-svgs/scientist.svg" alt="" />

            <div className="points-info-p">
              <h4>The Scientist</h4>
              <p>Match this tile to receive 15 points</p>
            </div>
          </div>

          <div className="points-info">
            <img className="wildcard" src="card-svgs/question.svg" alt="" />

            <div className="points-info-p">
              <h4>The Wildcard</h4>
              <p>Worth as much as your previous match</p>
            </div>
          </div>

          <div className="points-info">
            <img src="card-svgs/double.svg" alt="" />

            <div className="points-info-p">
              <h4>The Doubler</h4>
              <p>Worth double the points of your previous match</p>
            </div>
          </div>

          <p className="deduct">
            It is worth noting that everytime you select 2 tiles and fail to get
            a match, you are deducted a point.
          </p>

          <p className="deduct">
            * Tip - Use special tile matches in combination to maximize points.
          </p>

          <h3 className="gameplay">Game Play:</h3>
          <p>
            A player on their turn must click the "START" button to start the
            clock. Then immediately begin clicking tiles to reveal them. When
            the clock runs out, either the round is over or the next player
            goes. There are 8 rounds of action. Good luck!!!
          </p>

          <p className="copyright">
            &copy; ThinkFast 2020, created by Jeff Gosselin.
          </p>
        </div>
      </div>
    </div>
  );
}
