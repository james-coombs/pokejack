import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerHand: [],
    playerTotal: 0,
  },
  reducers: {
    addToPlayerHand: (state, action) => {
      state.playerHand.push(action.payload);
    },
    setPlayerTotal: (state, action) => {
      state.playerTotal += action.payload;
    },
    resetPlayer: (state) => {
      state.playerHand = [];
      state.playerTotal = 0;
    },
  },
});

export const {
  addToPlayerHand,
  setPlayerTotal,
  resetPlayer,
} = playerSlice.actions;

export const selectPlayerTotal = (state) => state.player.playerTotal;
export const selectPlayerHand = (state) => state.player.playerHand;

export default playerSlice.reducer;
