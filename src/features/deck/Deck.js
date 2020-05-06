import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  dealCard,
  shuffleCards,
  selectShuffled,
  selectDealt,
} from "./deckSlice";
// import styles from './Counter.module.css';

export function Deck() {
  const shuffled = useSelector(selectShuffled);
  const dealt = useSelector(selectDealt);
  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  console.log("deck shuffled", shuffled);
  console.log("dealt", dealt);

  return (
    <div>
      <p>Deck</p>
      <button aria-label="Turn" onClick={() => dispatch(shuffleCards())}>
        Shuffle
      </button>
      <button aria-label="Turn" onClick={() => dispatch(dealCard())}>
        Deal Card
      </button>
    </div>
  );
}
