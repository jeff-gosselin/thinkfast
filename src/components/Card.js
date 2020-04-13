import React from "react";
import { ReactComponent as CardBackImg } from "../svgs/logo-brain.svg";
import "../styles/Card.scss";

export default function Card({ gameCard }) {
  return (
    <div className="card">
      <div className="back">
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
