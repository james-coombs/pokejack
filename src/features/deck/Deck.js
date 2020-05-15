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
      <div className="row">
        {/* {deck.map((data) => {
          return updated ? (
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
          ) : null;
        })} */}
      </div>
    </div>
  );
}
