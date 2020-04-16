import React from "react";
import Card from "./Card";
import "../styles/Grid.scss";

export default function Cards({
  gameCards,
  handleCardSelection,
  cardChoices,
  matches
}) {
  let cards;

  if (gameCards) {
    cards = gameCards.map(gameCard => (
      <Card
        gameCard={gameCard}
        handleCardSelection={handleCardSelection}
        cardChoices={cardChoices}
        matches={matches}
        key={gameCard.id}
      />
    ));
  }
  return (
    <div className="game-grid" style={{ zIndex: 100 }}>
      {cards}
    </div>
  );
}
