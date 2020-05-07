import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import deckReducer from "../features/deck/deckSlice";
import dealerReducer from "../features/dealer/dealerSlice";
import playerReducer from "../features/player/playerSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    deck: deckReducer,
    dealer: dealerReducer,
    player: playerReducer,
  },
});
