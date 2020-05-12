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

/*
    initailly get kanto dex

    api call to get all reigins
    selector to show reigon list

    on select, make api call to get that reigin's dex
    add new dex to local storage
  */

export function Pokedex() {
  const dispatch = useDispatch();
  const pokemonNames = useSelector(selectPokemonNames);
  const pokemonNumber = useSelector(selectPokemonNumber);

  const Pokedex = require("pokeapi-js-wrapper");
  const options = {
    protocol: "https",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 10 * 1000, // 5s
  };
  const P = new Pokedex.Pokedex(options);

  const fetchAll = async () => {
    // This wil get list of all available Pokemon (807), but sprites don't exist for gen. 6+
    // Because of this, hard-coding '649' (Genesect) as the limit
    // const interval = { limit: 1, offset: 0 };
    // const list = await P.getPokemonSpeciesList();
    // console.log(list);
    // dispatch(getNumber(list.count)); // 807

    for (let i = 0; i < 52; i++) {
      let number = Math.floor(Math.random() * 649) + 1;
      dispatch(getNumber(number));
      // const pkmn = await P.resource(
      //   `https://pokeapi.co/api/v2/pokemon/${number}`
      // );

      // dispatch(
      //   getPokemonData({
      //     id: pkmn.id,
      //     name: pkmn.name,
      //     sprites: pkmn.sprites,
      //     stats: pkmn.stats,
      //   })
      // );
    }

    // const shuffled = pokes.pokemon_entries.sort(() => 0.5 - Math.random());

    // let selected = shuffled.slice(0, 52);

    // console.log(selected);

    // dispatch(getPokemonNames(selected));
  };

  const fetchOne = () => {
    pokemonNames.forEach(async (name) => {
      const poke = await P.getPokemonByName(name.pokemon_species.name);
      dispatch(getPokemonData(poke));
    });
  };

  const num = () => {
    console.log("num");
    for (let i = 0; i < 52; i++) {
      console.log(i, Math.floor(Math.random() * 964) + 1);
    }
  };

  return (
    <div className="box">
      <button aria-label="Turn" onClick={() => fetchAll()}>
        Fetch All
      </button>
      <button aria-label="Turn" onClick={() => num()}>
        Num
      </button>
      <p>Pokemon: </p>
      {/* <div>{pokemon ? pokemon.forEach((p) => JSON.parse(p)) : null}</div> */}
    </div>
  );
}
