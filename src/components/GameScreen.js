import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import { shuffleCards } from "../gameFunctions";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";
import "../styles/GameScreen.scss";

export default function GameScreen() {
  // Time for each round
  let roundTime = 59;

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

  useEffect(() => {
    let shuffledDeck = shuffleCards(cards);
    return setGameCards([...shuffledDeck]);
  }, [currentPlayer]);

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
    const audio = new Audio("audio/match.mp3");

    if (currentPlayer === true) {
      setplayer1Score(player1Score + card.pts);
      audio.play();
    } else {
      setplayer2Score(player2Score + card.pts);
      audio.play();
    }
    setMatches([card.name, ...matches]);
    setCardChoices([]);
  };

  // 3. If there is not a match
  const notMatch = () => {
    if (currentPlayer === true) {
      setplayer1Score(player1Score - 1);
    } else {
      setplayer2Score(player2Score - 1);
    }
    setTimeout(() => setCardChoices([]), 1000);
  };

  // ** When a card is selected
  const handleCardSelection = card => {
    // Adds a card if no other cards were yet selected
    if (cardChoices.length === 0) {
      setCardChoices([...cardChoices, card]);
    }

    // When 2nd card selection is made... checks if same card was not selected twice before adding
    if (cardChoices.length === 1 && card.id !== cardChoices[0].id) {
      setCardChoices([...cardChoices, card]);

      // After 2 cards are selected... performs proper response to match or no match
      let match = checkMatch(cardChoices[0].name, card.name);
      if (match) {
        ifMatch(card);
      } else {
        notMatch();
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
            setCurrentPlayer(!currentPlayer);
            setStartClock(false);
            setClockTime(roundTime);
            setMatches([]);
            clearInterval(clock);
          }
        }),
      1000
    );
  };

  console.log("start clock?", startClock);
  return (
    <div id="game-screen">
      <Dashboard
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
