import { createSlice } from "@reduxjs/toolkit";

const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState: {
    activePlayer: null,
    playNext: [
      {
        id: "1",
        name: "Podcast 2",
        episode: "1",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://placehold.co/50",
      },
      {
        id: "4",
        name: "Podcast 5",
        episode: "1",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://placehold.co/50",
      },
      {
        id: "2",
        name: "Podcast 3",
        episode: "1",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://placehold.co/50",
      },
      {
        id: "3",
        name: "Podcast 4",
        episode: "1",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://placehold.co/50",
      },
    ],
    history: [],
    playMode: 0, // 0 - repeat, 1 - shuffle, 2 - repeat once
  },
  reducers: {
    setActivePlayer: (state, action) => {
      state.activePlayer = action.payload;
    },
    addToHistory: (state, action) => {
      if (state.history[state.history.length - 1]?.id !== action.payload.id) {
        state.history.push(action.payload);
      }
    },
    removeFromPlayNext: (state, action) => {
      state.playNext = state.playNext.filter(
        (song) => song.id !== action.payload
      );
    },
    reorderPlayNext: (state, action) => {
      state.playNext = action.payload;
    },
    togglePlayMode: (state) => {
      state.playMode = (state.playMode + 1) % 3;
    },
  },
});

export const {
  setActivePlayer,
  addToHistory,
  removeFromPlayNext,
  reorderPlayNext,
  togglePlayMode,
} = activePlayerSlice.actions;

export default activePlayerSlice.reducer;
