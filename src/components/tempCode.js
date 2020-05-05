// Check if Player 1's score is worthy to post
if (player1Score > highScores[9].score) {
  axios
    .delete(`https://thinkfast-api.herokuapp.com/scores/${highScores[9]._id}`)
    .then(function (response) {
      console.log(`${highScores[9].name} has been deleted (p1)`);
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post("https://thinkfast-api.herokuapp.com/scores", {
      name: nameForPlayer1,
      score: player1Score,
      date: getTheDate(),
    })
    .then(function (response) {
      console.log("High score posted (p1)");
      setIsP1HighScore(true);
      axios
        .get("https://thinkfast-api.herokuapp.com/scores")
        .then((res) => {
          setHighScores([...res.data]);
          console.log("High scores page updated (p1)");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

if (player2Score > highScores[9].score) {
  axios
    .delete(`https://thinkfast-api.herokuapp.com/scores/${highScores[9]._id}`)
    .then(function (response) {
      console.log(`${highScores[9].name} has been deleted for player 2`);
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post("https://thinkfast-api.herokuapp.com/scores", {
      name: nameForPlayer2,
      score: player2Score,
      date: getTheDate(),
    })
    .then(function (response) {
      console.log("High score posted (p2)");
      setIsP2HighScore(true);
      axios
        .get("https://thinkfast-api.herokuapp.com/scores")
        .then((res) => {
          setHighScores([...res.data]);
          console.log("High scores page updated (p2)");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// API REQUEST FUNCTIONS
const eliminateScorerFromTopTen = (scorerId) => {
  axios
    .delete(`https://thinkfast-api.herokuapp.com/scores/${scorerId}`)
    .then(function (response) {
      console.log(`${scorerId} has been deleted (p1)`);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const postScorerToTopTen = (player, player1or2) => {
  axios
    .post("https://thinkfast-api.herokuapp.com/scores", {
      name: player.name,
      score: player.score,
      date: player.date,
    })
    .then(function (response) {
      console.log(`High score posted for ${player.name}`);
      if (player1or2 === 1) {
        setIsP1HighScore(true);
      } else {
        setIsP2HighScore(true);
      }
      getAndSetHighScores(setHighScores);
    })
    .catch(function (error) {
      console.log(error);
    });
};
