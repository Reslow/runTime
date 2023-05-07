import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./slice/timeSlice";

const reduxStore = configureStore({
  reducer: {
    time: timeSlice,
  },
});

export default reduxStore;
