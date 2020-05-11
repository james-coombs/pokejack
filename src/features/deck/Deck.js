import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDeck, selectDealt } from "./deckSlice";
// import styles from './Counter.module.css';

export function Deck() {
  const deck = useSelector(selectDeck);
  const dealt = useSelector(selectDealt);
  const dispatch = useDispatch();

  return (
    <div className="box">
      <p>Deck</p>
      <div className="row">
        {deck.map((s) => (
          <div className="col-3">{JSON.stringify(s)}</div>
        ))}
      </div>
    </div>
  );
}
