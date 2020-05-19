import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayerHand,
  setPlayerTotal,
  selectPlayerTotal,
  selectTotal,
} from "./playerSlice";

import shiny from "../../img/shiny.png";

// import styles from './Counter.module.css';

export function Player() {
  const playerTotal = useSelector(selectPlayerTotal);
  const playerHand = useSelector(selectPlayerHand);

  const dispatch = useDispatch();

  return (
    <div className="box">
      <p>Player</p>
      <div>Player Total: {playerTotal}</div>

      <div>
        {playerHand.length
          ? playerHand.map((data) => (
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
