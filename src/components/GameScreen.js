import React from "react";
import Dashboard from "./Dashboard";
import Grid from "./Grid";
import "../styles/GameScreen.scss";

export default function GameScreen() {
  return (
    <div id="game-screen">
      <Dashboard />
      <Grid />
    </div>
  );
}
