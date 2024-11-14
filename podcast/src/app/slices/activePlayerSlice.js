import { createSlice } from "@reduxjs/toolkit";

const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState: {
    activePlayer: null,
  },
  reducers: {
    setActivePlayer: (state, action) => {
      return {
        ...state,
        activePlayer: action.payload,
      };
    },
  },
});

export const { setActivePlayer } = activePlayerSlice.actions;

export default activePlayerSlice.reducer;
