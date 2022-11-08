import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "../../features/contact/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});