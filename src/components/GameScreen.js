import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import { shuffleCards } from "../shuffleCards";

// Component imports
import Round from "./Round";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";

// Styles import
import "../styles/GameScreen.scss";

import { Howl, Howler } from "howler";

export default function GameScreen({ playerMode }) {
  // Time for each round
  let roundTime = 60;

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
    console.log("matches:", card1, card2);
    if (card1 === card2) {
      return true;
    } else {
      return false;
    }
  };

  // 2. If there is a match
  const ifMatch = card => {
    const audio = new Howl({
      src: ["audio/match.mp3"]
    });

    if (currentPlayer === true) {
      setplayer1Score(player1Score + card.pts);
      audio.play();
    } else {
      setplayer2Score(player2Score + card.pts);
      card.name !== "Timer" && audio.play();
    }
    setMatches([card.name, ...matches]);
    setCardChoices([]);
  };

  // 3. If there is not a match
  const notMatch = () => {
    let misMatch = new Howl({
      src: ["audio/no.mp3"]
    });
    misMatch.play();
    if (currentPlayer === true) {
      setplayer1Score(player1Score - 1);
    } else {
      setplayer2Score(player2Score - 1);
    }
    setTimeout(() => setCardChoices([]), 1000);
  };

  // ** When a card is selected
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
      setCardChoices([...cardChoices, card]);
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
            src: ["audio/time-added.mp3"]
          });
          setClockTime(clockTime + 30);
          audio.play();
        }
        ifMatch(card); // Adds points to player's score
      } else {
        notMatch(); // Subtracts a point to player's score
      }
    }
  };

  // Start clock
  const runClock = () => {
    setStartClock(true);
    let clock = setInterval(
      () =>
        setClockTime(clockTime => {
          if (clockTime > 0) {
            return clockTime - 1;
          } else {
            let audio = new Howl({
              src: ["audio/buzzer.mp3"],
              volume: 0.35
            });
            audio.play();
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

  return (
    <div id="game-screen">
      {round === Math.ceil(round) && !startClock ? (
        <Round roundNumber={round} />
      ) : null}
      <Dashboard
        currentPlayer={currentPlayer}
        player1Score={player1Score}
        player2Score={player2Score}
        startClock={startClock}
        runClock={runClock}
        clockTime={clockTime}
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
