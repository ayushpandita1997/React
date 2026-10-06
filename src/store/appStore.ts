import { configureStore } from "@reduxjs/toolkit";
import { feedReducer, userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
