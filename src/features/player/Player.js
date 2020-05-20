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

      <div className="row">
        {playerHand.length ? (
          playerHand.map((data) => (
            <>
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
            </>
          ))
        ) : (
          <p style={{ margin: "0 auto" }}>Player hand is empty.</p>
        )}
      </div>
    </div>
  );
}
