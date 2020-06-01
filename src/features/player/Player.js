import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayerHand,
  setPlayerTotal,
  selectPlayerTotal,
  selectTotal,
} from "./playerSlice";

import CardFront from "../../components/CardFront";

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
          playerHand.map((data) => <CardFront data={data} />)
        ) : (
          <p style={{ margin: "0 auto" }}>Player hand is empty.</p>
        )}
      </div>
    </div>
  );
}
