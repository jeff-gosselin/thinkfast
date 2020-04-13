import React, { useState, useEffect } from "react";
import { cards } from "../cardData";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Grid from "./Grid";
import "../styles/GameScreen.scss";

export default function GameScreen() {
  const [gameCards, setGameCards] = useState([]);

  useEffect(() => {
    return setGameCards([...cards]);
  }, []);

  return (
    <div id="game-screen">
      <Dashboard />
      <Cards gameCards={gameCards} />
      <Grid />
    </div>
  );
}
