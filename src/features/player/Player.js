import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayerHand, setPlayerTotal, selectTotal } from "./playerSlice";
// import styles from './Counter.module.css';

export function Player() {
  const playerTotal = useSelector(selectTotal);
  const hand = useSelector(selectPlayerHand);

  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  useEffect(() => {
    checkHand();
  });

  const checkHand = () => {
    // let h = store.getState().player.hand;
    // console.log("playerHand", h);
    let total = playerTotal;
    // hand.map((c) => (total += c.value));
    hand.map((c) => {
      let val = c.value;

      if (isNaN(val)) {
        // Ace
        if (val === "A") {
          console.log("ACE - TOTAL: ", total);
          if (total + 11 > 21) {
            console.log("Dealt A, total is GT 21. Setting to 1: ", total + 11);
            val = 1;
          }
          if (total + 11 < 21) {
            console.log("Dealt A, total is LT 21. Setting to 11: ", total + 11);
            val = 11;
          }
        } else {
          // Face Card
          console.log("face", val);
          val = 10;
        }
      }
      total += val;
    });
    console.log(total);

    setPlayerTotal(total);
  };

  return (
    <div className="box">
      <p>Player</p>
      <div>Player Total: {playerTotal}</div>
      <div>
        {hand.length
          ? hand.map((c) => <div className="col-3">{JSON.stringify(c)}</div>)
          : "Player hand is empty."}
      </div>
    </div>
  );
}
