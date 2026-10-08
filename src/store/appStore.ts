import { configureStore } from "@reduxjs/toolkit";
import {
  connectionReducer,
  feedReducer,
  receivedRequestsReducer,
  userReducer,
} from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    receivedRequests: receivedRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
