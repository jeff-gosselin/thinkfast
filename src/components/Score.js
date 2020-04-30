import React from "react";
import "../styles/HighScores.scss";

export default function Score({ position, name, score, date }) {
  return (
    <li className="score-row">
      <div>{position}</div>
      <div>{name}</div>
      <div>{score}</div>
      <div>{date}</div>
    </li>
  );
}
