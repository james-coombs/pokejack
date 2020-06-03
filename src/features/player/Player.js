import React from "react";
import { useSelector } from "react-redux";
import { selectPlayerHand, selectPlayerTotal } from "./playerSlice";

import CardFront from "../../components/CardFront";

export function Player() {
  const playerTotal = useSelector(selectPlayerTotal);
  const playerHand = useSelector(selectPlayerHand);

  return (
    <div className="box">
      <p>Player</p>
      <div>Player Total: {playerTotal}</div>

      <div className="row px-5">
        {playerHand.length ? (
          playerHand.map((data) => <CardFront data={data} />)
        ) : (
          <p style={{ margin: "0 auto" }}>Player hand is empty.</p>
        )}
      </div>
    </div>
  );
}
