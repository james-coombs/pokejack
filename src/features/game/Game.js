import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementTurn, resetGame, selectTurn } from "./gameSlice";
import {
  dealCard,
  shuffleCards,
  selectShuffled,
  selectDealt,
} from "../deck/deckSlice";
// import styles from './Counter.module.css';

export function Game() {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="box">
      <p>Game</p>
      <div>Turn: {turn}</div>
      <button aria-label="Turn" onClick={() => dispatch(shuffleCards())}>
        Shuffle
      </button>
      <button aria-label="Turn" onClick={() => dispatch(dealCard())}>
        Start Game
      </button>
      {/* <button aria-label="" onClick={() => dispatch(incrementTurn())}>
        Hit
      </button>
      <button aria-label="" onClick={() => dispatch(incrementTurn())}>
        Hold
      </button> */}
      <button aria-label="" onClick={() => dispatch(resetGame())}>
        Reset
      </button>
    </div>
  );
}
