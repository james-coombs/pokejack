import { createSlice } from "@reduxjs/toolkit";
import cards from "./cards";

export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deckCards: cards,
    shuffledCards: [],
    dealtCard: {},
  },
  reducers: {
    dealCard: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.dealtCard = state.shuffledCards[0];
      state.shuffledCards = state.shuffledCards.slice(1);
    },
    shuffleCards: (state) => {
      const shuffled = shuffleArray(state.deckCards);
      state.shuffledCards = shuffled;
    },

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const { dealCard, shuffleCards } = deckSlice.actions;

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
// export const selectCount = (state) => state.turn.value;
export const selectShuffled = (state) => state.deck.shuffledCards;
export const selectDealt = (state) => state.deck.dealtCard;

export default deckSlice.reducer;
