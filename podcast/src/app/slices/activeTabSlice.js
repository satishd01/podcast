import { createSlice } from "@reduxjs/toolkit";

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState: {
    activeTab: "Podcasts",
  },
  reducers: {
    toggleActiveTab: (state, action) => {
      return {
        ...state,
        activeTab: action.payload,
      };
    },
  },
});

export const { toggleActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
