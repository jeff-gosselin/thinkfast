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

export default function GameScreen({ playerMode, setPlayerMode, setIsEnd }) {
  // Time for each round
  let roundTime = 3;

  // Master Volume
  Howler.volume(0.85);

  // Cards
  const [gameCards, setGameCards] = useState([]);
  const [cardChoices, setCardChoices] = useState([]);
  const [matches, setMatches] = useState([]);

  // Players
  const [player1Score, setplayer1Score] = useState(0);
  const [player2Score, setplayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(true);

  // Clock
  const [startClock, setStartClock] = useState(false);
  const [clockTime, setClockTime] = useState(roundTime);

  // Rounds
  const [round, setRound] = useState(1);

  // Current points scored
  const [shake, setShake] = useState(false);
  const [points, setPoints] = useState(0);

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
    console.log("This is Round #", round);
    if (playerMode === 1) {
      let shuffledDeck = shuffleCards(cards);
      return setGameCards([...shuffledDeck]);
    }
  }, [round]);

  ////////////////////////////////////////////////////////////////////

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
  const ifMatch = card => {
    const matchMade = new Howl({
      src: ["audio/match.mp3"],
      volume: 0.25
    });

    // Doesn't play normal match sound if the match is the Timer
    card.name !== "Timer" && matchMade.play();

    if (currentPlayer === true) {
      setplayer1Score(player1Score + card.pts);
    } else {
      setplayer2Score(player2Score + card.pts);
    }

    setMatches([card.name, ...matches]);
    setPoints(card.pts);
    setTimeout(() => setCardChoices([]), 1000);
  };

  // 3. If there is not a match
  const notMatch = () => {
    let misMatch = new Howl({
      src: ["audio/error.mp3"],
      volume: 0.35
    });

    if (currentPlayer === true) {
      setplayer1Score(player1Score - 1);
    } else {
      setplayer2Score(player2Score - 1);
    }
    setPoints(-1);

    setTimeout(() => setCardChoices([]), 1000);
    misMatch.play();
  };

  // ** When a card is selected **********************************************************
  const handleCardSelection = card => {
    let revealCard = new Howl({
      src: ["audio/click.mp3"]
    });
    // Can't choose a card unless clock has been started
    if (!startClock) {
      return;
    }

    // Adds a card if no other cards were yet selected
    if (cardChoices.length === 0) {
      revealCard.play();
      setCardChoices([card]);
    }

    // When 2nd card selection is made... checks if same card was not selected twice before adding
    if (cardChoices.length === 1 && card.id !== cardChoices[0].id) {
      revealCard.play();
      setCardChoices([...cardChoices, card]);

      // After 2 cards are selected... performs proper response to match or no match
      let match = checkMatch(cardChoices[0].name, card.name);
      if (match) {
        // If player gets the "Timer" match... 30 seconds are added to the clock
        if (card.name === "Timer") {
          let audio = new Howl({
            src: ["audio/time-added.mp3"],
            volume: 0.5
          });
          setClockTime(clockTime + 30);
          audio.play();
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
    let clockClick = new Howl({
      src: ["audio/clock-click.mp3"],
      volume: 0.5
    });
    // let countdown = new Howl({
    //   src: ["audio/countdown.mp3"],
    //   volume: 0.5,
    //   loop: true
    // });
    clockClick.play();
    // countdown.play();
    setStartClock(true);
    let clock = setInterval(
      () =>
        setClockTime(clockTime => {
          if (clockTime > 0) {
            return clockTime - 1;
          } else {
            let buzz = new Howl({
              src: ["audio/buzzer.mp3"],
              volume: 0.35
            });
            buzz.play();
            // countdown.stop();
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
    Howler.unload();
  };

  return (
    <div id="game-screen">
      {round > 8 ? gameOver() : null}
      {round === Math.ceil(round) && !startClock ? (
        <Round roundNumber={round} />
      ) : null}
      {cardChoices.length > 1 ? <Points cardPoints={points} /> : null}
      <Dashboard
        currentPlayer={currentPlayer}
        player1Score={player1Score}
        player2Score={player2Score}
        startClock={startClock}
        runClock={runClock}
        clockTime={clockTime}
        shake={shake}
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
