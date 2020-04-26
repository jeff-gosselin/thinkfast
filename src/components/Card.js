import React from "react";
import { ReactComponent as CardBackImg } from "../svgs/logo-brain.svg";
import "../styles/Card.scss";

export default function Card({
  gameCard,
  handleCardSelection,
  cardChoices,
  matches,
}) {
  return (
    <div className="card">
      <div
        onClick={() => handleCardSelection(gameCard)}
        className={
          matches.includes(gameCard.name) || cardChoices.includes(gameCard)
            ? "back clicked"
            : "back"
        }
      >
        <CardBackImg class="back-img" />
      </div>
      <div className="front">
        <img
          className="noselect"
          width="60%"
          src={`card-svgs/${gameCard.url}`}
          alt=""
        />
      </div>
    </div>
  );
}
