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
import {
  addToPlayerHand,
  resetPlayer,
  selectPlayerTotal,
  selectPlayerHand,
  setPlayerTotal,
} from "../player/playerSlice";
import {
  addToDealerHand,
  takeDealerAction,
  resetDealer,
  selectDealerTotal,
  selectDealerHand,
  setDealerTotal,
} from "../dealer/dealerSlice";

import { checkTotal } from "./util";

import store from "../../app/store";

export function Game() {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();
  const dealtCard = useSelector(selectDealt);
  const top = useSelector(selectTop);

  const playerTotal = useSelector(selectPlayerTotal);
  const playerHand = useSelector(selectPlayerHand);

  const dealerTotal = useSelector(selectDealerTotal);
  const dealerHand = useSelector(selectDealerHand);

  const handleStart = () => {
    handleShuffle();

    for (var i = 0; i < 4; i++) {
      i % 2 === 0 ? handleDeal(true) : handleDeal(false);
    }
  };

  const handleDeal = (isPlayer) => {
    let topCard = store.getState().deck.topCard;

    if (isPlayer) {
      dispatch(addToPlayerHand(topCard));
      checkTotal(isPlayer);

      dispatch(removeCard());
      dispatch(setTopCard());

      return;
    }

    dispatch(addToDealerHand(topCard));
    checkTotal(isPlayer);

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

  const checkTotal = (isPlayer) => {
    let total, hand, cardVal;

    if (isPlayer) {
      total = playerTotal;
      hand = store.getState().player.playerHand;
    } else {
      total = dealerTotal;
      hand = store.getState().dealer.dealerHand;
    }

    hand.map((c) => {
      cardVal = c.value;

      console.log("cardVal:", cardVal);
      console.log("hand:", hand);
      console.log("init total:", total);

      if (isNaN(cardVal)) {
        // Ace
        if (cardVal === "A") {
          if (total + 11 > 21) {
            cardVal = 1;
          } else {
            cardVal = 11;
          }
        } else {
          // Face Card
          cardVal = 10;
        }
      }
    });

    if (isPlayer) {
      dispatch(setPlayerTotal(cardVal));
    } else {
      dispatch(setDealerTotal(cardVal));
    }

    return;
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
