import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import { shuffleCards } from "../gameFunctions";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";
import "../styles/GameScreen.scss";

export default function GameScreen() {
  const [gameCards, setGameCards] = useState([]);
  const [cardSelections, setCardSelections] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const checkMatch = () => {
    // checkes if 2 cards are selected and if not aborts
    if (cardSelections.length !== 2) {
      return;
    } else if (cardSelections[0].name === cardSelections[1].name) {
      console.log("Match!!");
      // add points to player's score
      // remove cards from the gameCards
      setCardSelections([]);
      return true;
    } else {
      console.log("No Match!!");
      // hide the cards that were revealed
      setCardSelections([]);
      return false;
    }
  };

  const cardSelected = (e, selectedCard) => {
    // make it so same card can't be selected twice so id can't be the same
    let picked = cardSelections.includes(selectedCard);
    console.log("picked?", picked);

    // Adds card to selection if less than 2 cards picked and won't allow for same card being picked twice.
    if (!picked && cardSelections.length < 2) {
      setCardSelections([...cardSelections, selectedCard]);
    }
  };

  useEffect(() => {
    let shuffledDeck = shuffleCards(cards);
    return setGameCards([...shuffledDeck]);
  }, [currentPlayer]);

  useEffect(() => {
    checkMatch();
  }, [cardSelections]);

  return (
    <div id="game-screen">
      <Dashboard />
      <Cards gameCards={gameCards} cardSelected={cardSelected} />
      <Grid />
    </div>
  );
}
