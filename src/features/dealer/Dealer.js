import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToHand, getTotal, selectHand, selectTotal } from "./dealerSlice";
import { selectDealt } from "../deck/deckSlice";
// import styles from './Counter.module.css';

export function Dealer() {
  const dealerHand = useSelector(selectHand);
  const dealerTotal = useSelector(selectTotal);
  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  console.log("dealt", useSelector(selectDealt));
  //   console.log("dealer hand", dealerHand);
  //   console.log("dealer total", dealerTotal);

  return (
    <div>
      <p>Dealer</p>

      <button aria-label="Turn" onClick={() => dispatch(addToHand())}>
        Get Card
      </button>
    </div>
  );
}
