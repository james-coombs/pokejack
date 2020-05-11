import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gameReducer from "../features/game/gameSlice";
import deckReducer from "../features/deck/deckSlice";
import dealerReducer from "../features/dealer/dealerSlice";
import playerReducer from "../features/player/playerSlice";
import pokedexReducer from "../features/pokedex/pokedexSlice";

// const store = configureStore({
//   reducer: {
//     game: gameReducer,
//     deck: deckReducer,
//     dealer: dealerReducer,
//     player: playerReducer,
//   },

//   middleware: [thunk],
// });

const reducer = {
  game: gameReducer,
  deck: deckReducer,
  dealer: dealerReducer,
  player: playerReducer,
  pokedex: pokedexReducer,
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
  // devTools: process.env.NODE_ENV !== "production",
  // preloadedState,
  // enhancers: [reduxBatch],
});

export default store;
