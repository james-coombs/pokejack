import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { incrementTurn, setWinner, resetGame, selectTurn } from "./gameSlice";
import {
  removeCard,
  shuffleCards,
  setTopCard,
  selectDealt,
  selectTop,
  resetDeck,
  selectDeck,
  updateCards,
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
  dealerWillHit,
  resetDealer,
  selectDealerTotal,
  selectDealerHand,
  setDealerTotal,
} from "../dealer/dealerSlice";
import {
  getPokemonNames,
  selectPokemonNames,
  getPokemonData,
  selectPokemonData,
  addPokemonNumbers,
  selectPokemonNumbers,
  getOrderedPokemon,
} from "../pokedex/pokedexSlice";

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

  const pokemonData = useSelector(selectPokemonData);

  const deck = useSelector(selectDeck);

  // Start game
  // (make api call, order deck by bst, shuffle, deal first 2 cards to each participant)
  const handleStart = () => {
    // fetchPokemon();
    orderPokes();
    handleShuffle();

    for (var i = 0; i < 4; i++) {
      i % 2 === 0 ? handleDeal(true) : handleDeal(false);
    }
    dispatch(incrementTurn());
  };

  const checkWin = (total, isPlayer) => {
    if (total === 21) {
      dispatch(setWinner(isPlayer ? "player" : "dealer"));
      console.log("Winner: ", isPlayer ? "player" : "dealer");
      // End Game
    }
    if (total > 21) {
      dispatch(setWinner(isPlayer ? "dealer" : "player"));
      console.log("Looser: ", isPlayer ? "player" : "dealer");

      // End Game
    }
  };

  const compareHands = () => {
    const p = store.getState().player.playerTotal;
    const d = store.getState().dealer.dealerTotal;
    const winner = Math.max(p, d);
    console.log("winner", winner);
    dispatch(setWinner(winner));
  };

  /*
    Player turn:
      hit
        deal card
          check total
            if 21, win
            if < 21, loose
      hold
        dealer turn
          if dealer hold, reveal cards, check winner

      Dealer turn:
        check total
          if 21, win
          if > 16, hold
          if <= 16, hit
            check total
              if 21, win
              if < 21, loose
            player turn
  */

  const playerTurn = () => {
    handleDeal(true);
    let playerTotal = store.getState().player.playerTotal;
    console.log("player total: ", playerTotal);
    checkWin(playerTotal, true);
  };

  const dealerTurn = () => {
    let dealerTotal = store.getState().dealer.dealerTotal;
    checkWin(dealerTotal, false);

    if (dealerTotal <= 16) {
      console.log("HIT - dealer total LT/EQ 16");
      handleDeal(false);
      dealerTurn();
      return;
    } else {
      console.log("HOLD - dealer total GT 16");
      compareHands();
      return;
    }
  };

  // Deal to participant based in isPlayer bool
  const handleDeal = (isPlayer) => {
    let topCard = store.getState().deck.topCard;

    if (isPlayer) {
      dispatch(addToPlayerHand(topCard));
      calculateTotal(isPlayer);
      dispatch(removeCard());
      dispatch(setTopCard());
      return;
    }

    dispatch(addToDealerHand(topCard));
    calculateTotal(isPlayer);

    dispatch(removeCard());
    dispatch(setTopCard());
  };

  // Shuffle deck
  const handleShuffle = () => {
    dispatch(shuffleCards());
    dispatch(setTopCard());
  };

  // Clear player/game state
  const handleReset = () => {
    dispatch(resetDeck());
    dispatch(resetGame());
    dispatch(resetDealer());
    dispatch(resetPlayer());
  };

  // Random number comparison to dedcide shiny
  const getShiny = () => {
    // 1/8192 is shiny chance
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    return x === y;
  };

  // Order pokemon by bst, merge ordered list with deck
  const orderPokes = () => {
    let ordered = [];
    let cards = [];

    for (let i = 0; i < pokemonData.length; i++) {
      let total = 0;
      let stats = pokemonData[i].stats;

      for (let j = 0; j < stats.length; j++) {
        total += stats[j].base_stat;
      }

      ordered[i] = Object.assign({}, pokemonData[i], {
        bst: total,
        isShiny: getShiny(),
      });
    }

    ordered = ordered.sort((a, b) => (a.bst > b.bst ? 1 : -1));

    for (let i = 0; i < deck.length; i++) {
      cards[i] = { ...ordered[i], ...deck[i] };
    }

    dispatch(updateCards(cards));
  };

  // Calculate hand total based on dealt cards
  // Sets ace to 1 or 11
  const calculateTotal = (isPlayer) => {
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

      // console.log("cardVal:", cardVal);
      // console.log("hand:", hand);
      // console.log("init total:", total);

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
      <button aria-label="Turn" onClick={() => handleStart()}>
        Start
      </button>

      <button aria-label="Turn" onClick={() => playerTurn()}>
        Hit
      </button>

      <button aria-label="Turn" onClick={() => dealerTurn()}>
        Hold
      </button>

      {/* <button aria-label="Turn" onClick={() => handleDeal(false)}>
        Hit Dealer
      </button> */}
      {/* <button aria-label="Turn" onClick={() => handleDeal(false)}>
        Dealer Card
      </button> */}

      <button aria-label="" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
}
