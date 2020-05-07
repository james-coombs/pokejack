import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHand, selectTotal } from "./playerSlice";
// import styles from './Counter.module.css';

export function Player() {
  const total = useSelector(selectTotal);
  const hand = useSelector(selectHand);

  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="box">
      <p>Player</p>
      <div>Total: {total}</div>
      <div>
        {hand.length
          ? hand.map((c) => <div className="col-3">{JSON.stringify(c)}</div>)
          : "Player hand is empty."}
      </div>
    </div>
  );
}
