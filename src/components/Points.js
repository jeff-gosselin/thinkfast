import React from "react";
import "../styles/Points.scss";

export default function Points({ cardPoints }) {
  console.log("pts", cardPoints);
  return (
    <div id="points">
      <h1>{cardPoints}</h1>
    </div>
  );
}
