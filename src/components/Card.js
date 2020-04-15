import React, { useState } from "react";
import { ReactComponent as CardBackImg } from "../svgs/logo-brain.svg";
import "../styles/Card.scss";

export default function Card({ gameCard, cardSelected }) {
  const [revealCard, setRevealCard] = useState(false);

  const selectedCardAction = e => {
    setRevealCard(true);
    cardSelected(e, gameCard);
  };

  return (
    <div className="card">
      <div
        onClick={selectedCardAction}
        className={revealCard ? "back clicked" : "back"}
      >
        <CardBackImg class="back-img" />
      </div>
      <div className="front">
        <img width="60%" src={`card-svgs/${gameCard.url}`} alt="" />
      </div>
    </div>
  );
}
