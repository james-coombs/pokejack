import { createSlice } from "@reduxjs/toolkit";
import pokemonData from "./pokemonData";
import { act } from "react-dom/test-utils";
export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: {
    pokemonNumbers: [],
    pokemonNames: [],
    // pokemonData: pokemonData,
    pokemonData: [],

    orderedPokemon: [],
  },
  reducers: {
    addPokemonNumbers: (state, action) => {
      state.pokemonNumbers = state.pokemonNumbers.concat(action.payload);
    },
    getPokemonNames: (state, action) => {
      state.pokemonNames = action.payload;
    },
    getPokemonData: (state, action) => {
      state.pokemonData.push(action.payload);
    },
    getOrderedPokemon: (state, action) => {
      state.orderedPokemon = action.payload;
    },
  },
});

export const {
  getPokemonNames,
  getPokemonData,
  addPokemonNumbers,
  getOrderedPokemon,
} = pokedexSlice.actions;

export const selectPokemonNames = (state) => state.pokedex.pokemonNames;
export const selectPokemonData = (state) => state.pokedex.pokemonData;
export const selectPokemonNumbers = (state) => state.pokedex.pokemonNumbers;

export default pokedexSlice.reducer;
