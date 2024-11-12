import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./slices/sliderSlice";
import activeTabReducer from "./slices/activeTabSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    activeTab: activeTabReducer,
  },
});
