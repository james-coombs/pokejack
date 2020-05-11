import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, selectPokemon } from "./pokedexSlice";

/*
    initailly get kanto dex

    api call to get all reigins
    selector to show reigon list

    on select, make api call to get that reigin's dex
    add new dex to local storage
  */

export function Pokedex() {
  const dispatch = useDispatch();
  //   const pokemon = useSelector(selectPokemon);

  //   useEffect(() => {
  //     getP();
  //   });

  const Pokedex = require("pokeapi-js-wrapper");
  const options = {
    protocol: "https",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 5 * 1000, // 5s
  };
  const P = new Pokedex.Pokedex(options);

  //   const [pkmn, setPokemon] = useState([]);

  async function fetch() {
    const pokes = await P.getGenerationByName("generation-i");
    // setPokemon(pokes);
    const sp = [pokes.pokemon_species].flat();
    dispatch(addPokemon(sp));
  }

  return (
    <div className="box">
      <button aria-label="Turn" onClick={() => fetch()}>
        Add pokes
      </button>
      <p>Pokemon: </p>
      {/* <div>{pokemon.length ? pokemon.map((p) => JSON.parse(p)) : null}</div> */}
    </div>
  );
}
