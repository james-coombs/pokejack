import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHand, selectTotal } from "./dealerSlice";
// import styles from './Counter.module.css';

export function Dealer() {
  const total = useSelector(selectTotal);
  const hand = useSelector(selectHand);

  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="box">
      <p>Dealer</p>
      <div>Total: {total}</div>
      <div>
        {hand.length
          ? hand.map((c) => <div className="col-3">{JSON.stringify(c)}</div>)
          : "Dealer hand is empty."}
      </div>
    </div>
  );
}
