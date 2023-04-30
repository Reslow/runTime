import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./slice/timeSlice";

const reduxStore = configureStore({
  reducer: {
    addNumbers: timeSlice,
  },
});

export default reduxStore;
