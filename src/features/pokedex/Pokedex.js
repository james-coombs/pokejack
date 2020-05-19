import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemonNames,
  selectPokemonNames,
  getPokemonData,
  selectPokemonData,
  addPokemonNumbers,
  selectPokemonNumbers,
  getOrderedPokemon,
} from "./pokedexSlice";

import { selectDeck, updateCards } from "../deck/deckSlice";

import { ReactComponent as Club } from "../../svg/club.svg";
import shiny from "../../img/shiny.png";

export function Pokedex() {
  const dispatch = useDispatch();
  const pokemonData = useSelector(selectPokemonData);
  const pokemonNumbers = useSelector(selectPokemonNumbers);

  const deck = useSelector(selectDeck);

  // PokeAPI wrapper setup
  const Pokedex = require("pokeapi-js-wrapper");
  const options = {
    protocol: "https",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 10 * 1000, // 5s
  };
  const P = new Pokedex.Pokedex(options);

  // Generate 52 random numbers to select from api
  // Check against existing list of numbers to stop dupes from being created
  const getNumbers = () => {
    let tmp = [...pokemonNumbers];

    let checkNumber = () => {
      let number = Math.floor(Math.random() * 649) + 1;

      if (!tmp.includes(number)) {
        tmp.push(number);
      } else {
        console.log("Dupe number: ", number);
        checkNumber();
      }
    };

    let i = 52;
    while (i--) {
      checkNumber();
    }

    return tmp;
  };

  // Get 52 random pokemon from api
  const fetchPokemon = async () => {
    // This wil get list of all available Pokemon (807), but sprites don't exist for gen. 6+
    // Because of this, hard-coding '649' (Genesect) in getNumbers()  as the limit
    // const interval = { limit: 1, offset: 0 };
    // const list = await P.getPokemonSpeciesList();
    // console.log(list);
    // dispatch(getNumber(list.count)); // 807

    const numbers = getNumbers();
    dispatch(addPokemonNumbers(numbers));

    for (let i = 0; i < numbers.length; i++) {
      const pkmn = await P.resource(
        `https://pokeapi.co/api/v2/pokemon/${numbers[i]}`
      );

      dispatch(
        getPokemonData({
          id: pkmn.id,
          name: pkmn.name,
          sprites: pkmn.sprites,
          stats: pkmn.stats,
        })
      );
    }
  };

  // console.log(deck);

  return (
    <div className="box">
      {/* <button aria-label="Turn" onClick={() => fetchPokemon()}>
        Fetch All (DO NOT PRESS UNLESS NEEDED)
      </button> */}
      {/* <button aria-label="Turn" onClick={() => orderPokes()}>
        order pokes
      </button> */}
      {/* <p>Pokemon: </p>
      <div className="row">
        {deck.map((data) => {
          let isShiny = getShiny();
          return updated ? (
            <>
              <div className="col-2 px-0">
                {isShiny ? (
                  <img alt="shiny" src={shiny} height="25" width="25" />
                ) : null}
                <img
                  src={
                    isShiny
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
        })}
      </div> */}
    </div>
  );
}
