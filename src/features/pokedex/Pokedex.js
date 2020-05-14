import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemonNames,
  selectPokemonNames,
  getPokemonData,
  selectPokemonData,
  getNumber,
  selectPokemonNumber,
} from "./pokedexSlice";

import { ReactComponent as Club } from "../../svg/club.svg";
import shiny from "../../img/shiny.png";

/*
    initailly get kanto dex

    api call to get all reigins
    selector to show reigon list

    on select, make api call to get that reigin's dex
    add new dex to local storage
  */

export function Pokedex() {
  const dispatch = useDispatch();
  const pokemonData = useSelector(selectPokemonData);

  const Pokedex = require("pokeapi-js-wrapper");
  const options = {
    protocol: "https",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 10 * 1000, // 5s
  };
  const P = new Pokedex.Pokedex(options);

  const fetchPokemon = async () => {
    // This wil get list of all available Pokemon (807), but sprites don't exist for gen. 6+
    // Because of this, hard-coding '649' (Genesect) as the limit
    // const interval = { limit: 1, offset: 0 };
    // const list = await P.getPokemonSpeciesList();
    // console.log(list);
    // dispatch(getNumber(list.count)); // 807

    for (let i = 0; i < 52; i++) {
      let number = Math.floor(Math.random() * 649) + 1;
      dispatch(getNumber(number));
      const pkmn = await P.resource(
        `https://pokeapi.co/api/v2/pokemon/${number}`
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

  const getShiny = () => {
    // 1/8192 is shiny chance
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    return x === y;
  };

  return (
    <div className="box">
      <button aria-label="Turn" onClick={() => fetchPokemon()}>
        Fetch All
      </button>
      <p>Pokemon: </p>
      <div className="row">
        {pokemonData.map((data) => {
          let isShiny = getShiny();
          return (
            <>
              <div className="col-1 px-0">
                <p>{data.name}</p>
                {isShiny ? <img src={shiny} height="25" width="25" /> : null}
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
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
