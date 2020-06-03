import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDeck, selectDealt } from "./deckSlice";

import { ReactComponent as Club } from "../../svg/club.svg";
import shiny from "../../img/shiny.png";

export function Deck() {
  const deck = useSelector(selectDeck);
  const dealt = useSelector(selectDealt);
  const dispatch = useDispatch();

  let updated = deck[0].bst ? true : false;

  return (
    <div className="box">
      {/* <button aria-label="Turn" onClick={() => fetchPokemon()}>
        Fetch All (DO NOT PRESS UNLESS NEEDED)
      </button> */}

      <p>Pokemon: </p>
      <div className="row"></div>
    </div>
  );
}
