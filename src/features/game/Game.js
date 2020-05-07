import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementTurn, resetGame, selectTurn } from "./gameSlice";
import {
  dealCard,
  shuffleCards,
  selectShuffled,
  selectDealt,
  selectTop,
  resetDeck,
} from "../deck/deckSlice";

import { addToPlayerHand, resetPlayer } from "../player/playerSlice";
import { addToDealerHand, resetDealer } from "../dealer/dealerSlice";

// import styles from './Counter.module.css';

export function Game() {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();
  const dealtCard = useSelector(selectDealt);
  const top = useSelector(selectTop);

  const handleDeal = () => {
    dispatch(dealCard());
    dispatch(addToPlayerHand(top));
  };

  const handleReset = () => {
    dispatch(resetDeck());
    dispatch(resetGame());
    dispatch(resetDealer());
    dispatch(resetPlayer());
  };

  return (
    <div className="box">
      <p>Game</p>
      <div>Turn: {turn}</div>
      <button aria-label="Turn" onClick={() => dispatch(shuffleCards())}>
        Shuffle
      </button>
      <button aria-label="Turn" onClick={() => handleDeal()}>
        Deal player Card
      </button>
      {/* <button aria-label="" onClick={() => dispatch(incrementTurn())}>
        Hit
      </button>
      <button aria-label="" onClick={() => dispatch(incrementTurn())}>
        Hold
      </button> */}
      <button aria-label="" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
}
