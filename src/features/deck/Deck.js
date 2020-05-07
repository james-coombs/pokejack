import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShuffled, selectDealt } from "./deckSlice";
// import styles from './Counter.module.css';

export function Deck() {
  const shuffled = useSelector(selectShuffled);
  const dealt = useSelector(selectDealt);
  const dispatch = useDispatch();

  return (
    <div className="box">
      <p>Deck</p>
      <div className="row">
        {shuffled.map((s) => (
          <div className="col-3">{JSON.stringify(s)}</div>
        ))}
      </div>
    </div>
  );
}
