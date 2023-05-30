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
    addList: (state, action) => {
      const newState = action.payload;
      return newState;
    },

    removeNumbers: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      return newState;
    },
  },
});

// this is for dispatch
export const { addNumbers, removeNumbers, addList } = timeSlice.actions;

// this is for configureStore
export default timeSlice.reducer;
