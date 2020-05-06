import React, { useState, useEffect } from "react";
import axios from "axios";
import { Howl } from "howler";

import "../styles/EndGame.scss";

export default function EndGame({
  setIsEnd,
  playerMode,
  setPlayerMode,
  nameForPlayer1,
  nameForPlayer2,
  player1Score,
  setPlayer1Score,
  player2Score,
  setPlayer2Score,
  highScores,
  setHighScores,
  getAndSetHighScores,
}) {
  const [isHighScore, setIsHighScore] = useState([]); // When true will notify of new high score

  // End of game sound
  let trophy = new Howl({
    src: ["audio/trophy.mp3"],
    volume: 0.3,
  });

  let end = new Howl({
    src: ["audio/game-end.mp3"],
    volume: 0.2,
  });

  // API REQUEST FUNCTIONS
  const eliminateScorerFromTopTen = (scorerId) => {
    axios
      .delete(`https://thinkfast-api.herokuapp.com/scores/${scorerId}`)
      .then(function (response) {
        console.log(`${scorerId} has been deleted`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postHighScoreToTopTen = (player) => {
    axios
      .post("https://thinkfast-api.herokuapp.com/scores", {
        name: player.name,
        score: player.score,
        date: player.date,
      })
      .then(function (response) {
        console.log(`High score posted for ${player.name}`);
        getAndSetHighScores(setHighScores);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FUNCTIONS DEALING WITH HIGH SCORES
  // If in 2-player mode and both score higher than the current 10th place score this will determine what scores will get posted and eliminated
  const determineScoresToPost = (p1, p2) => {
    let tempScores = highScores.slice();
    tempScores = [...tempScores, p1, p2];
    tempScores.sort((a, b) => b.score - a.score);
    let topTen = tempScores.slice(0, 10);
    let whoMadeTheTopTen = topTen.filter(
      (score) => !score.hasOwnProperty("_id")
    );

    setIsHighScore([...whoMadeTheTopTen]);
    trophy.play();

    if (postScores(whoMadeTheTopTen) === 2) {
      console.log("Delete:", tempScores[10], tempScores[11]);
      eliminateScorerFromTopTen(tempScores[10]._id);
      eliminateScorerFromTopTen(tempScores[11]._id);
    } else {
      console.log("Delete:", tempScores[11]);
      eliminateScorerFromTopTen(tempScores[11]._id);
    }
  };

  const postScores = (scores) => {
    scores.forEach((score) => {
      postHighScoreToTopTen(score);
    });
    return scores.length;
  };

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Play ending music
    end.play();

    // Get today's date and return as formatted string "m/yy"
    const getTheDate = () => {
      let today = new Date();
      let month = String(today.getMonth() + 1);
      let year = String(today.getFullYear()).slice(-2);
      return `${month}/${year}`;
    };

    // Create object for player 1
    const p1 = {
      name: nameForPlayer1,
      score: player1Score,
      date: getTheDate(),
    };

    // Create object for player 2
    const p2 = {
      name: nameForPlayer2,
      score: player2Score,
      date: getTheDate(),
    };

    // First, in a 2-player game, determine if both players score high enough to be in top 10.
    // Second, in either a single or 2-player game check if player 1 scored high enough.
    // Third, check if player 2 scored high enough
    if (
      playerMode === 2 &&
      player1Score > highScores[9].score &&
      player2Score > highScores[9].score
    ) {
      determineScoresToPost(p1, p2);
    } else if (player1Score > highScores[9].score) {
      eliminateScorerFromTopTen(highScores[9]._id);
      postHighScoreToTopTen(p1);
      setIsHighScore([p1]);
      trophy.play();
    } else if (player2Score > highScores[9].score) {
      eliminateScorerFromTopTen(highScores[9]._id);
      postHighScoreToTopTen(p2);
      setIsHighScore([p2]);
      trophy.play();
    }
  }, [nameForPlayer1]);

  //////////////////////////////////////////////////////////////////

  const restart = () => {
    setIsEnd(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setIsHighScore([]);
    setPlayerMode(null);
  };

  // MESSAGING FOR END OF GAME (DEPENDS ON PLAYER MODE AND PLAYER'S SCORE)
  let endOfGameMessage;

  // 1 Player Mode
  if (playerMode === 1 && player1Score < 0) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>You are such a negative person!</h1>
        <p>{`You scored ${player1Score} points.`}</p>
      </div>
    );
  }

  if (playerMode === 1 && player1Score === 0) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>You thought you were a hero, but then got zero!</h1>
        <p>{`You scored ${player1Score} points.`}</p>
      </div>
    );
  }

  if (playerMode === 1 && player1Score > 0 && player1Score <= 25) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>You need a lot more practice!</h1>
        <p>{`You only scored ${player1Score} points.`}</p>
      </div>
    );
  }

  if (playerMode === 1 && player1Score > 25 && player1Score <= 50) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>You are not too bad at this!</h1>
        <p>{`You scored ${player1Score} points.`}</p>
      </div>
    );
  }

  if (playerMode === 1 && player1Score > 50) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>You have acheived greatness!</h1>
        <p>{`You scored ${player1Score} points.`}</p>
      </div>
    );
  }

  // 2 Player Mode
  if (playerMode === 2 && player1Score === player2Score) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>Wow!</h1>
        <h2>It's a draw.</h2>
        <p>{`You both scored ${player1Score} points.`}</p>
      </div>
    );
  }

  if (playerMode === 2 && player1Score > player2Score) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>{nameForPlayer1}</h1>
        <h2>wins the game!!</h2>
        <p>
          {`${nameForPlayer2} is a loser`}
          <br />
          {`and has been`}
          <br />
          {`beaten by ${player1Score - player2Score}`}{" "}
          {player1Score - player2Score === 1 ? "point." : "points."}
        </p>
      </div>
    );
  }

  if (playerMode === 2 && player1Score < player2Score) {
    endOfGameMessage = (
      <div className="farewell-message">
        <h1>{nameForPlayer2}</h1>
        <h2>wins the game!!</h2>
        <p>
          {`${nameForPlayer1} is a loser`}
          <br />
          {`and has been`}
          <br />
          {`beaten by ${player2Score - player1Score}`}{" "}
          {player2Score - player1Score === 1 ? "point." : "points."}
        </p>
      </div>
    );
  }

  console.log("Who scored high:", isHighScore);
  return (
    <div id="end-game">
      {endOfGameMessage}
      {isHighScore.length === 1 ? (
        <div className="top-scorer">
          <img className="trophy" src="card-svgs/award.svg" alt="" />
          <h3 className="top-score-message">
            {`Congrats ${isHighScore[0].name}!!`}
            <br />
            {`You scored in the top ten!`}
          </h3>
        </div>
      ) : null}

      {isHighScore.length === 2 ? (
        <div className="top-scorer">
          <img className="trophy" src="card-svgs/award.svg" alt="" />
          <h3 className="top-score-message">
            {`Congratulations...`}
            <br />
            {`${isHighScore[0].name} and ${isHighScore[1].name},`}
            <br />
            {`both of you scored`}
            <br />
            {`in the top ten!`}
          </h3>
        </div>
      ) : null}

      <button onClick={() => restart()}>Play Again?</button>
    </div>
  );
}
