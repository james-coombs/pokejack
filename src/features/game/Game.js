import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controls } from "./Controls";
import { Dealer } from "../dealer/Dealer";
import { Player } from "../player/Player";
import CardBack from "../../components/CardBack";

import {
  setWinner,
  selectWinner,
  toggleGameProgress,
  resetGame,
  selectGameInProgress,
} from "./gameSlice";
import {
  removeCard,
  shuffleCards,
  setTopCard,
  selectTop,
  resetDeck,
  selectDeck,
  updateCards,
} from "../deck/deckSlice";

import {
  addToPlayerHand,
  resetPlayer,
  selectPlayerTotal,
  setPlayerTotal,
} from "../player/playerSlice";
import {
  addToDealerHand,
  resetDealer,
  selectDealerTotal,
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
  const dispatch = useDispatch();

  const topCard = useSelector(selectTop);
  const playerTotal = useSelector(selectPlayerTotal);
  const dealerTotal = useSelector(selectDealerTotal);
  const pokemonData = useSelector(selectPokemonData);
  const deck = useSelector(selectDeck);
  const winner = useSelector(selectWinner);
  const gameInProgress = useSelector(selectGameInProgress);

  // Start game
  // (make api call, order deck by bst, shuffle, deal first 2 cards to each participant)
  const handleStart = () => {
    // fetchPokemon();
    orderPokes();
    handleShuffle();

    for (var i = 0; i < 4; i++) {
      i % 2 === 0 ? handleDeal(true) : handleDeal(false);
    }

    dispatch(toggleGameProgress());
  };

  // Decide game winner
  const checkWin = (isPlayerTurn) => {
    const player = store.getState().player;

    // Check after player holds
    if (isPlayerTurn) {
      if (player.playerTotal === 21) {
        dispatch(setWinner("player"));
        dispatch(toggleGameProgress());

        return;
      }
      if (player.playerTotal > 21) {
        dispatch(setWinner("dealer"));
        dispatch(toggleGameProgress());

        return;
      }
      return;
      // Dealer's turn
    } else {
      const dealer = store.getState().dealer;

      if (dealer.dealerTotal === 21) {
        dispatch(setWinner("dealer"));
        dispatch(toggleGameProgress());

        return;
      }
      if (player.playerTotal === 21) {
        dispatch(setWinner("player"));
        dispatch(toggleGameProgress());

        return;
      }
      if (player.playerTotal > 21) {
        dispatch(setWinner("dealer"));
        dispatch(toggleGameProgress());

        return;
      }
      if (dealer.dealerTotal > 21) {
        dispatch(setWinner("player"));
        dispatch(toggleGameProgress());

        return;
      } else {
        const max = Math.max(player.playerTotal, dealer.dealerTotal);
        const winner = dealer.dealerTotal === max ? "dealer" : "player";
        dispatch(setWinner(winner));
        dispatch(toggleGameProgress());

        return;
      }
    }
  };

  // PLayer action
  const playerTurn = () => {
    handleDeal(true);
    // let playerTotal = store.getState().player.playerTotal;
    // console.log("player total: ", playerTotal);
    checkWin(true);
  };

  // Dealer action
  const dealerTurn = () => {
    let dealerTotal = store.getState().dealer.dealerTotal;
    checkWin();

    if (dealerTotal <= 16) {
      handleDeal(false);
      dealerTurn();
      return;
    } else {
      checkWin();
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
      <div className="">
        <Dealer />
        <div className="text-center col-12">
          {winner ? <p>Winner: {winner}</p> : null}
          {topCard.name && gameInProgress ? (
            <div>
              <CardBack data={topCard} horizontal={true} />
            </div>
          ) : null}
        </div>
        <Player />
        <Controls
          handleStart={handleStart}
          playerTurn={playerTurn}
          dealerTurn={dealerTurn}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
}
