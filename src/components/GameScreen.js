import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import { shuffleCards } from "../shuffleCards";

// Component imports
import Round from "./Round";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";
import Points from "./Points";

// Styles import
import "../styles/GameScreen.scss";

// Dependancy for sound
import { Howl, Howler } from "howler";

export default function GameScreen({
  playerMode,
  player1Score,
  setPlayer1Score,
  player2Score,
  setPlayer2Score,
  setIsEnd,
  highScores,
  setHighScores,
  nameForPlayer1,
  nameForPlayer2,
  setStartGame,
}) {
  // Time for each round
  let roundTime = 60;

  // Master Volume
  Howler.volume(0.85);

  // Game Sound Effects

  // Cards
  const [gameCards, setGameCards] = useState([]);
  const [cardChoices, setCardChoices] = useState([]);
  const [matches, setMatches] = useState([]);

  // Players
  const [currentPlayer, setCurrentPlayer] = useState(true);

  // Clock
  const [startClock, setStartClock] = useState(false);
  const [clockTime, setClockTime] = useState(roundTime);
  const [timeAdded, setTimeAdded] = useState(false);

  // Rounds
  const [round, setRound] = useState(1);

  // Current points scored
  const [shake, setShake] = useState(false);
  const [points, setPoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);

  ////////////////////////////////////////////////////////////////////

  // Shuffles deck when players switch turns
  useEffect(() => {
    let shuffledDeck = shuffleCards(cards);
    return setGameCards([...shuffledDeck]);
  }, [currentPlayer]);

  // Resets and shuffles cards if all matches in deck are made
  useEffect(() => {
    if (matches.length === 14) {
      let shuffledDeck = shuffleCards(cards);
      setMatches([]);
      setGameCards([...shuffledDeck]);
    }
  }, [cardChoices]);

  // New Round
  useEffect(() => {
    if (playerMode === 1) {
      let shuffledDeck = shuffleCards(cards);
      return setGameCards([...shuffledDeck]);
    }
  }, [round]);

  ////////////////////////////////////////////////////////////////////

  // SPECIAL TILES **************************************************
  const timerTile = () => {
    setClockTime(clockTime + 30); // Adds 30 seconds to the clock
    setTimeAdded(true); // initiates clock animation
    const thirtySecs = new Howl({
      src: ["audio/time-added.mp3"],
      volume: 0.5,
    });
    thirtySecs.play();
  };

  const bonusTile = (card) => {
    if (matches.length === 0) {
      return card.pts;
    }
    // Checks what the last match was worth
    if (matches[0] === "Wildcard" || matches[0] === "Doubler") {
      if (card.name === "Wildcard") {
        return bonusPoints; // State that stored what last matched bonus tile was worth
      }

      if (card.name === "Doubler") {
        return bonusPoints * 2; // State that stored what last matched bonus tile was worth
      }
    } else {
      let lastMatch = gameCards.filter((gameCard) => {
        return gameCard.name === matches[0];
      });

      if (card.name === "Wildcard") {
        return lastMatch[0].pts;
      }

      if (card.name === "Doubler") {
        return lastMatch[0].pts * 2;
      }
    }
  };

  // SPECIAL TILES ABOVE **************************************************

  // Scoring
  const addToScore = (points) => {
    if (currentPlayer === true) {
      setPlayer1Score(player1Score + points);
    } else {
      setPlayer2Score(player2Score + points);
    }
  };

  // ** What happens after 2 cards are picked
  // 1. Checks for a match
  const checkMatch = (card1, card2) => {
    setShake(true);
    if (card1 === card2) {
      return true;
    } else {
      return false;
    }
  };

  // 2. If there is a match
  const ifMatch = (card) => {
    // Set sound for match
    const matchMade = new Howl({
      src: ["audio/match.mp3"],
      volume: 0.25,
    });

    // Doesn't play this normal match sound if the match is the Timer
    card.name !== "Timer" && matchMade.play();

    // Check for type of match... bonus tiles or regular match
    let tilePoints;
    if (card.name === "Wildcard") {
      addToScore(bonusTile(card));
      tilePoints = bonusTile(card);
      setBonusPoints(tilePoints); // Stores the points scored by the bonus tile
      if (matches[0] === "Timer") {
        timerTile();
      }
    } else if (card.name === "Doubler") {
      addToScore(bonusTile(card));
      tilePoints = bonusTile(card);
      setBonusPoints(tilePoints); // Stores the points scored by the bonus tile
    } else {
      addToScore(card.pts);
      tilePoints = card.pts;
    }

    setMatches([card.name, ...matches]);
    setPoints(tilePoints); // Displays current points a match gives
    setTimeout(() => setCardChoices([]), 1000); // Flips tiles back to hidden
  };

  // 3. If there is not a match
  const notMatch = () => {
    addToScore(-1);

    // Triggers display of "-1" on screen
    setPoints(-1);

    // Tiles are flipped over to hide them
    setTimeout(() => setCardChoices([]), 800);
    const misMatch = new Howl({
      src: ["audio/error.mp3"],
      volume: 0.35,
    });
    misMatch.play();
  };

  // ** When a card is selected **********************************************************
  const handleCardSelection = (card) => {
    // Prevents from clicking cards that are already a match
    if (matches.includes(card.name)) {
      return;
    }

    // Can't choose a card unless clock has been started
    if (!startClock) {
      return;
    }

    // Sound for card reveal

    // Adds a card if no other cards were yet selected
    if (cardChoices.length === 0) {
      const revealCard = new Howl({
        src: ["audio/click.mp3"],
      });
      revealCard.play();
      setCardChoices([card]);
      setTimeAdded(false);
    }

    // When 2nd card selection is made... checks if same card was not selected twice before adding
    if (cardChoices.length === 1 && card.id !== cardChoices[0].id) {
      const revealCard = new Howl({
        src: ["audio/click.mp3"],
      });
      revealCard.play();
      setCardChoices([...cardChoices, card]);

      // After 2 cards are selected... performs proper response to match or no match
      let match = checkMatch(cardChoices[0].name, card.name);
      if (match) {
        // If player gets the "Timer" match... 30 seconds are added to the clock
        if (card.name === "Timer") {
          timerTile();
        }
        ifMatch(card); // Adds points to player's score
      } else {
        notMatch(); // Subtracts a point to player's score
      }
      setTimeout(() => setShake(false), 1000);
    }
  };

  // Start clock
  const runClock = () => {
    const clockClick = new Howl({
      src: ["audio/clock-click.mp3"],
      volume: 0.5,
    });
    clockClick.play();

    setStartClock(true);
    let clock = setInterval(
      () =>
        setClockTime((clockTime) => {
          if (clockTime > 0) {
            return clockTime - 1;
          } else {
            const buzz = new Howl({
              src: ["audio/buzzer.mp3"],
              volume: 0.35,
            });
            buzz.play();
            setTimeAdded(false);
            setMatches([]);
            setCardChoices([]);

            // Switches to other player if in 2 Player Mode
            if (playerMode !== 1) {
              setCurrentPlayer(!currentPlayer);
              setRound(round + 0.5);
            } else {
              setRound(round + 1);
            }

            setStartClock(false);
            setClockTime(roundTime);
            clearInterval(clock);
          }
        }),
      1000
    );
  };

  // End of Game
  const gameOver = () => {
    setIsEnd(true);
    setStartGame(false);
    Howler.unload();
  };

  console.log("X");
  return (
    <div id="game-screen">
      {Math.floor(round) > 8 ? gameOver() : null}
      {round === Math.ceil(round) && !startClock ? (
        <Round roundNumber={round} />
      ) : null}
      {cardChoices.length > 1 ? <Points cardPoints={points} /> : null}
      <Dashboard
        currentPlayer={currentPlayer}
        round={round}
        player1Score={player1Score}
        player2Score={player2Score}
        nameForPlayer1={nameForPlayer1}
        nameForPlayer2={nameForPlayer2}
        startClock={startClock}
        runClock={runClock}
        clockTime={clockTime}
        shake={shake}
        timeAdded={timeAdded}
      />
      <Cards
        gameCards={gameCards}
        handleCardSelection={handleCardSelection}
        cardChoices={cardChoices}
        matches={matches}
      />
      <Grid />
    </div>
  );
}
