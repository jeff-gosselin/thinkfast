import React from "react";
import Card from "./Card";
import { cardRandomizer } from "../gameFunctions";
import "../styles/Grid.scss";

export default function Cards({ gameCards }) {
  let cards;

  if (gameCards) {
    let shuffledDeck = cardRandomizer(gameCards);
    cards = shuffledDeck.map(gameCard => (
      <Card gameCard={gameCard} key={gameCard.id} />
    ));
  }
  return (
    <div className="game-grid" style={{ zIndex: 100 }}>
      {cards}
    </div>
  );
}
