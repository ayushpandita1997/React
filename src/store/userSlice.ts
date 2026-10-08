import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReceivedRequest, SentRequest, User } from "../utils/types";

export const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    addUser: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const feedSlice = createSlice({
  name: "feed",
  initialState: null as User[] | null,
  reducers: {
    addUserFeed: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeUserFeed: (state, action: PayloadAction<string>) => {
      return state?.filter((user) => user._id !== action.payload) ?? [];
    },
  },
});

export const connectionSlice = createSlice({
  name: "connections",
  initialState: null as User[] | null,
  reducers: {
    connections: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const receivedRequestsSlice = createSlice({
  name: "receivedRequests",
  initialState: null as ReceivedRequest[] | null,
  reducers: {
    receivedRequests: (_state, action: PayloadAction<ReceivedRequest[]>) => {
      return action.payload;
    },
    removeReceivedRequest: (state, action: PayloadAction<string>) => {
      return state?.filter((request) => request._id !== action.payload) ?? [];
    },
  },
});

export const sentRequestsSlice = createSlice({
  name: "sentRequest",
  initialState: null as SentRequest[] | null,
  reducers: {
    sentRequest: (_state, action: PayloadAction<SentRequest[]>) => {
      return action.payload;
    },
    // removeSentRequest: (state, action: PayloadAction<string>) => {
    //   return state?.filter((user) => user._id !== action.payload) ?? [];
    // },
  },
});

export const { addUser, removeUser } = userSlice.actions; //action creators
export const { addUserFeed, removeUserFeed } = feedSlice.actions;
export const { connections } = connectionSlice.actions;
export const { receivedRequests, removeReceivedRequest } =
  receivedRequestsSlice.actions;
export const { sentRequest } = sentRequestsSlice.actions;

export const userReducer = userSlice.reducer;
export const feedReducer = feedSlice.reducer;
export const connectionReducer = connectionSlice.reducer;
export const receivedRequestsReducer = receivedRequestsSlice.reducer;
export const sentRequestsReducer = sentRequestsSlice.reducer;

// so the 'user' is a slice created inside the store and userReducer is the
// reducer which manages the action logic like addUser, removeUser inside the slice
