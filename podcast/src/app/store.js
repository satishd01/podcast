import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./slices/sliderSlice";
import activeTabReducer from "./slices/activeTabSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    activeTab: activeTabReducer,
    search: searchReducer,
  },
});
