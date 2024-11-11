import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    isSliderOpen: false,
  },
  reducers: {
    toggleSlider: (state, action) => {
      return {
        ...state,
        isSliderOpen: !state.isSliderOpen,
      };
    },
  },
});

export const { toggleSlider } = sliderSlice.actions;

export default sliderSlice.reducer;
