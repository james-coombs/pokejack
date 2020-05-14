import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayerHand,
  setPlayerTotal,
  selectPlayerTotal,
  selectTotal,
} from "./playerSlice";
// import styles from './Counter.module.css';

export function Player() {
  const playerTotal = useSelector(selectPlayerTotal);
  const playerHand = useSelector(selectPlayerHand);

  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  // useEffect(() => {
  //   checkHand();
  // });

  // const checkHand = (participant) => {
  //   // let h = store.getState().player.hand;
  //   // console.log("playerHand", h);
  //   let total = playerTotal;
  //   // hand.map((c) => (total += c.value));
  //   hand.map((c) => {
  //     let cardVal = c.value;

  //     if (isNaN(cardVal)) {
  //       // Ace
  //       if (cardVal === "A") {
  //         console.log("ACE - TOTAL: ", total);
  //         if (total + 11 > 21) {
  //           console.log(
  //             "Dealt A, total is GT 21. Setting A to 1: ",
  //             total + 11
  //           );
  //           cardVal = 1;
  //         } else if (total + 11 < 21) {
  //           console.log(
  //             "Dealt A, total is LT 21. Setting A to 11: ",
  //             total + 11
  //           );
  //           cardVal = 11;
  //         }
  //       } else {
  //         // Face Card
  //         console.log("face", cardVal);
  //         cardVal = 10;
  //       }
  //     }
  //     total += cardVal;
  //   });

  //   dispatch(setPlayerTotal(total));
  //   console.log("final hand total: ", total);

  //   return;
  // };

  return (
    <div className="box">
      <p>Player</p>
      <div>Player Total: {playerTotal}</div>
      <div>
        {playerHand.length
          ? playerHand.map((c) => (
              <div className="col-3">{JSON.stringify(c)}</div>
            ))
          : "Player hand is empty."}
      </div>
    </div>
  );
}
