import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import turnReducer from "../features/turn/turnSlice";
import deckReducer from "../features/deck/deckSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    turn: turnReducer,
    deck: deckReducer,
  },
});
