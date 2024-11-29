import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePlayer: {
    name: "Podcast 1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://placehold.co/50",
  },
  playNext: [
    {
      id: "1",
      name: "Podcast 2",
      episode: "1",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "Podcast 3",
      episode: "2",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      imageUrl: "https://placehold.co/50",
    },
  ],
  history: [],
  playMode: 0, // 0: Repeat, 1: Shuffle, 2: Repeat Once
};

const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState,
  reducers: {
    setActivePlayer: (state, action) => {
      state.activePlayer = action.payload;
    },
    togglePlayMode: (state) => {
      state.playMode = (state.playMode + 1) % 3; // Cycle between 0, 1, 2
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    removeFromPlayNext: (state, action) => {
      state.playNext = state.playNext.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderPlayNext: (state, action) => {
      state.playNext = action.payload;
    },
  },
});

export const {
  setActivePlayer,
  togglePlayMode,
  addToHistory,
  removeFromPlayNext,
  reorderPlayNext,
} = activePlayerSlice.actions;

export default activePlayerSlice.reducer;
