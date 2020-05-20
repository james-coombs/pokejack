import React from "react";
import { useSelector, useDispatch } from "react-redux";

export function Controls(props) {
  return (
    <div className="">
      <button aria-label="Turn" onClick={() => props.handleStart()}>
        Start
      </button>

      <button aria-label="Turn" onClick={() => props.playerTurn()}>
        Hit
      </button>

      <button aria-label="Turn" onClick={() => props.dealerTurn()}>
        Hold
      </button>

      <button aria-label="" onClick={() => props.handleReset()}>
        Reset
      </button>
    </div>
  );
}
