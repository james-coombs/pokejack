import { createSlice } from "@reduxjs/toolkit";

export const dealerSlice = createSlice({
  name: "dealer",
  initialState: {
    dealerHand: [],
    dealerTotal: 0,
    willTakeCard: false,
  },
  reducers: {
    addToDealerHand: (state, action) => {
      state.dealerHand.push(action.payload);
    },
    setDealerTotal: (state, action) => {
      state.dealerTotal += action.payload;
    },
    takeDealerAction: (state, action) => {
      action.payload >= 17
        ? (state.willTakeCard = false)
        : (state.willTakeCard = true);
    },
    resetDealer: (state) => {
      state.dealerhand = [];
      state.dealerTotal = 0;
    },
  },
});

export const {
  addToDealerHand,
  getDealerTotal,
  resetDealer,
  takeDealerAction,
  setDealerTotal,
} = dealerSlice.actions;

export const selectDealerTotal = (state) => state.dealer.dealerTotal;
export const selectDealerHand = (state) => state.dealer.dealerHand;

export default dealerSlice.reducer;
