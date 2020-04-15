import React from "react";
import Card from "./Card";
import "../styles/Grid.scss";

export default function Cards({ gameCards, cardSelected }) {
  let cards;

  if (gameCards) {
    cards = gameCards.map(gameCard => (
      <Card gameCard={gameCard} cardSelected={cardSelected} key={gameCard.id} />
    ));
  }
  return (
    <div className="game-grid" style={{ zIndex: 100 }}>
      {cards}
    </div>
  );
}
