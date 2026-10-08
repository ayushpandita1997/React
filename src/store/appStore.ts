import { configureStore } from "@reduxjs/toolkit";
import {
  connectionReducer,
  feedReducer,
  receivedRequestsReducer,
  sentRequestsReducer,
  userReducer,
} from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    receivedRequests: receivedRequestsReducer,
    sentRequest: sentRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
