import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    inProgress: false,
    winner: null,
  },
  reducers: {
    resetGame: (state) => {
      state.winner = null;
      state.inProgress = false;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    toggleGameProgress: (state) => {
      state.inProgress = !state.inProgress;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setWinner, toggleGameProgress, resetGame } = gameSlice.actions;

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
export const selectWinner = (state) => state.game.winner;
export const selectGameInProgress = (state) => state.game.inProgress;

export default gameSlice.reducer;
