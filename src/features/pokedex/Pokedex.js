import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemonNames,
  selectPokemonNames,
  getPokemonData,
  selectPokemonData,
  getNumber,
  selectPokemonNumber,
  getOrderedPokemon,
} from "./pokedexSlice";

import { selectDeck, updateCards } from "../deck/deckSlice";

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

  const deck = useSelector(selectDeck);

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

  const orderPokes = () => {
    let ordered = [];
    let cards = [];

    for (let i = 0; i < pokemonData.length; i++) {
      let total = 0;
      let stats = pokemonData[i].stats;

      for (let j = 0; j < stats.length; j++) {
        total += stats[j].base_stat;
      }

      ordered[i] = Object.assign({}, pokemonData[i], { bst: total });
    }

    ordered = ordered.sort((a, b) => (a.bst > b.bst ? 1 : -1));

    for (let i = 0; i < deck.length; i++) {
      cards[i] = { ...ordered[i], ...deck[i] };
    }

    dispatch(updateCards(cards));

    console.log(cards);
  };

  console.log(deck);

  let updated = deck[0].bst ? true : false;

  return (
    <div className="box">
      {/* <button aria-label="Turn" onClick={() => fetchPokemon()}>
        Fetch All
      </button> */}
      <button aria-label="Turn" onClick={() => orderPokes()}>
        order pokes
      </button>
      <p>Pokemon: </p>
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
      </div>
    </div>
  );
}
