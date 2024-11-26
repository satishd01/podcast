import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isNotificationOpen: false,
  },
  reducers: {
    toggleNotification: (state, action) => {
      return {
        ...state,
        isNotificationOpen: !state.isNotificationOpen,
      };
    },
  },
});

export const { toggleNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
