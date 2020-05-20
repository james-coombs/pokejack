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
      <div className="row text-center">
        {dealerHand.length ? (
          dealerHand.map((data) => (
            <>
              {data === dealerHand[0] ? (
                <div className="col-3 px-0">
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
                    height="100"
                    width="100"
                  />
                  <p>
                    {data.name} - {data.suit} - {data.value}
                  </p>
                </div>
              ) : (
                <img
                  src={
                    data.isShiny
                      ? data.sprites.back_shiny
                      : data.sprites.back_default
                  }
                  alt={data.name}
                  height="100"
                  width="100"
                />
              )}
            </>
          ))
        ) : (
          <p style={{ margin: "0 auto" }}>Dealer hand is empty.</p>
        )}
      </div>
    </div>
  );
}
