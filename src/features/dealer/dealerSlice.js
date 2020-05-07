import { createSlice } from "@reduxjs/toolkit";
// import store from "../../app/store";

export const dealerSlice = createSlice({
  name: "dealer",
  initialState: {
    hand: [],
    total: 0,
  },
  reducers: {
    addToDealerHand: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.hand.push(1);
    },
    getDealerTotal: (state) => {
      state.value = 0;
    },
    resetDealer: (state) => {
      state.hand = [];
      state.total = 0;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  addToDealerHand,
  getDealerTotal,
  resetDealer,
} = dealerSlice.actions;

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
export const selectTotal = (state) => state.dealer.total;
export const selectHand = (state) => state.dealer.hand;

export default dealerSlice.reducer;
