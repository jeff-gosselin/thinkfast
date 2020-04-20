import React from "react";
import "../styles/Points.scss";

export default function Points({ cardPoints }) {
  console.log("pts", cardPoints);
  return (
    <div id="points" className={cardPoints > 0 ? "plus" : "minus"}>
      <h1>{cardPoints > 0 ? `+${cardPoints}` : `${cardPoints}`}</h1>
    </div>
  );
}
