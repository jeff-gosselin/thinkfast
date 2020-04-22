import React from "react";
import "../styles/Round.scss";

import { Howl } from "howler";

export default function Round({ roundNumber }) {
  let audio = new Howl({
    src: [`audio/round-${roundNumber}.mp3`],
    volume: 0.3,
    rate: 1.45,
  });

  audio.play();

  return (
    <div className="round-screen">
      <h1>{`ROUND ${roundNumber}`}</h1>
    </div>
  );
}
