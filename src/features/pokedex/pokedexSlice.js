import { createSlice } from "@reduxjs/toolkit";
import pokemonData from "./pokemonData";
import { act } from "react-dom/test-utils";
export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: {
    numbers: [],
    pokemonNames: [],
    pokemonData: pokemonData,
    orderedPokemon: [],
  },
  reducers: {
    getNumber: (state, action) => {
      state.numbers.push(action.payload);
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
  getNumber,
  getOrderedPokemon,
} = pokedexSlice.actions;

export const selectPokemonNames = (state) => state.pokedex.pokemonNames;
export const selectPokemonData = (state) => state.pokedex.pokemonData;
export const selectPokemonNumber = (state) => state.pokedex.number;

export default pokedexSlice.reducer;
