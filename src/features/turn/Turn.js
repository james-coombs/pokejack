import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset, selectCount } from "./turnSlice";
// import styles from './Counter.module.css';

export function Turn() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <p>Turn</p>
      <div>{count}</div>
      <button aria-label="Turn" onClick={() => dispatch(increment())}>
        Go
      </button>
      <button aria-label="Turn" onClick={() => dispatch(reset())}>
        reset
      </button>
    </div>
  );
}
