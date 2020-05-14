import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDealerHand, selectDealerTotal } from "./dealerSlice";
// import styles from './Counter.module.css';

export function Dealer() {
  const dealertotal = useSelector(selectDealerTotal);
  const dealerHand = useSelector(selectDealerHand);

  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="box">
      <p>Dealer</p>
      <div>Total: {dealertotal}</div>
      <div>
        {dealerHand.length
          ? dealerHand.map((c) => (
              <div className="col-3">{JSON.stringify(c)}</div>
            ))
          : "Dealer hand is empty."}
      </div>
    </div>
  );
}
