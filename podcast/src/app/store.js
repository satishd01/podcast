import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./slices/sliderSlice";
import activeTabReducer from "./slices/activeTabSlice";
import searchReducer from "./slices/searchSlice";
import activePlayerReducer from "./slices/activePlayerSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    activeTab: activeTabReducer,
    activePlayer: activePlayerReducer,
    search: searchReducer,
  },
});
