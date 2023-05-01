import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: [],
  reducers: {
    addNumbers: (state, action) => {
      const time = {
        sec: action.payload.sec,
        act: action.payload.act,
        id: action.payload.id,
      };

      state.push(time);
    },
    removeNumbers: (state) => {
      state.shift();
    },
  },
});

// this is for dispatch
export const { addNumbers, removeNumbers } = timeSlice.actions;

// this is for configureStore
export default timeSlice.reducer;
