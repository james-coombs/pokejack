import React from "react";
// import logo from "./logo.svg";
import { Game } from "./features/game/Game";
import { Deck } from "./features/deck/Deck";
import { Dealer } from "./features/dealer/Dealer";
import { Player } from "./features/player/Player";
import { Pokedex } from "./features/pokedex/Pokedex";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Dealer />
      <Deck />
      {/* <Pokedex /> */}

      <Game />
      <Player />
    </div>
  );
}

export default App;
