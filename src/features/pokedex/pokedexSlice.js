import { createSlice } from "@reduxjs/toolkit";
import pokemonData from "./pokemonData";
export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: {
    numbers: [],
    pokemonNames: [],
    pokemonData: pokemonData,
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
  },
});

export const {
  getPokemonNames,
  getPokemonData,
  getNumber,
} = pokedexSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectPokemonNames = (state) => state.pokedex.pokemonNames;
export const selectPokemonData = (state) => state.pokedex.pokemonData;
export const selectPokemonNumber = (state) => state.pokedex.number;

export default pokedexSlice.reducer;
