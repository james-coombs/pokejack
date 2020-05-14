import { createSlice } from "@reduxjs/toolkit";
// import store from "../../app/store";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerHand: [],
    playerTotal: 0,
  },
  reducers: {
    addToPlayerHand: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.playerHand.push(action.payload);
    },
    setPlayerTotal: (state, action) => {
      state.playerTotal += action.payload;
    },
    resetPlayer: (state) => {
      state.playerHand = [];
      state.playerTotal = 0;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  addToPlayerHand,
  setPlayerTotal,
  resetPlayer,
} = playerSlice.actions;

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
export const selectPlayerTotal = (state) => state.player.playerTotal;
export const selectPlayerHand = (state) => state.player.playerHand;

export default playerSlice.reducer;
