import React, { useState } from "react";
import { ReactComponent as CardBackImg } from "../svgs/logo-brain.svg";
import "../styles/Card.scss";

export default function Card({ gameCard, cardSelected }) {
  const [revealCard, setRevealCard] = useState(false);

  return (
    <div className="card">
      <div
        onClick={e => cardSelected(e, gameCard)}
        className={revealCard ? "back clicked" : "back"}
      >
        <CardBackImg class="back-img" />
      </div>
      <div className="front">
        {gameCard.name}
        <img
          src={`${process.env.PUBLIC_URL}/card-svgs/${gameCard.url}`}
          alt=""
        />
      </div>
    </div>
  );
}
