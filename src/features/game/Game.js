import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { incrementTurn, resetGame, selectTurn } from "./gameSlice";
import {
  removeCard,
  shuffleCards,
  setTopCard,
  selectDealt,
  selectTop,
  resetDeck,
} from "../deck/deckSlice";
import { addToPlayerHand, resetPlayer } from "../player/playerSlice";
import {
  addToDealerHand,
  takeDealerAction,
  resetDealer,
} from "../dealer/dealerSlice";

import store from "../../app/store";

export function Game() {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();
  const dealtCard = useSelector(selectDealt);
  const top = useSelector(selectTop);

  const handleStart = () => {
    handleShuffle();

    for (var i = 0; i < 4; i++) {
      i % 2 === 0 ? handleDeal(true) : handleDeal(false);
    }
  };

  const handleDeal = (isPlayer) => {
    let topCard = store.getState().deck.topCard;

    if (!isPlayer) {
      dispatch(addToDealerHand(topCard));
      dispatch(removeCard());
      dispatch(setTopCard());

      return;
    }
    dispatch(addToPlayerHand(topCard));
    dispatch(removeCard());
    dispatch(setTopCard());
  };

  const handleShuffle = () => {
    dispatch(shuffleCards());
    dispatch(setTopCard());
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
      <div>Top Card: {JSON.stringify(top)}</div>
      <div>Turn: {turn}</div>
      <button aria-label="Turn" onClick={() => handleShuffle()}>
        Shuffle
      </button>
      <button aria-label="Turn" onClick={() => handleDeal(true)}>
        Hit
      </button>
      <button aria-label="Turn" onClick={() => handleDeal(true)}>
        Hold
      </button>
      {/* <button aria-label="Turn" onClick={() => handleDeal(false)}>
        Dealer Card
      </button> */}
      <button aria-label="Turn" onClick={() => handleStart()}>
        Start
      </button>
      <button aria-label="" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
}
