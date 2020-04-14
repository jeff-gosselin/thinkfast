import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";
import "../styles/GameScreen.scss";

export default function GameScreen() {
  const [gameCards, setGameCards] = useState([]);
  const [cardSelections, setCardSelections] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const checkMatch = () => {
    console.log(cardSelections);
    // checkes if 2 cards are selected and if not aborts
    if (cardSelections.length !== 2) {
      return;
    } else if (cardSelections[0].name === cardSelections[1].name) {
      console.log("Match!!");
      // add points to player's score
      // remove cards from the gameCards
      setCardSelections([]);
    } else {
      console.log("No Match!!");
      setCardSelections([]);
    }
  };

  const cardSelected = (e, selectedCard) => {
    // make it so same card can't be selected twice so id can't be the same
    if (cardSelections.length < 2) {
      setCardSelections([...cardSelections, selectedCard]);
    }
  };

  useEffect(() => {
    return setGameCards([...cards]);
  }, [currentPlayer]);

  console.log("You have selected: ", cardSelections);
  checkMatch();
  return (
    <div id="game-screen">
      <Dashboard />
      <Cards gameCards={gameCards} cardSelected={cardSelected} />
      <Grid />
    </div>
  );
}
