import { configureStore } from "@reduxjs/toolkit";
import { connectionReducer, feedReducer, userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
