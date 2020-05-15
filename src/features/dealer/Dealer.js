import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDealerHand, selectDealerTotal } from "./dealerSlice";

import shiny from "../../img/shiny.png";

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
          ? dealerHand.map((data) => (
              <>
                <div className="col-2 px-0">
                  {data.isShiny ? (
                    <img alt="shiny" src={shiny} height="25" width="25" />
                  ) : null}
                  <img
                    src={
                      data.isShiny
                        ? data.sprites.front_shiny
                        : data.sprites.front_default
                    }
                    alt={data.name}
                    height="50"
                    width="50"
                  />
                  <p>
                    {data.name} - {data.suit} - {data.value}
                  </p>
                </div>
              </>
            ))
          : "Dealer hand is empty."}
      </div>
    </div>
  );
}
