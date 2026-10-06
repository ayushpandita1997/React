import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  profilePic: string;
  skills: string[];
  age: number;
  gender: string;
  bio: string;
};

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
    removeUserFeed: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions; //action creators
export const { addUserFeed, removeUserFeed } = feedSlice.actions;

export const userReducer = userSlice.reducer;
export const feedReducer = feedSlice.reducer;

// so the 'user' is a slice created inside the store and userReducer is the
// reducer which manages the action logic like addUser, removeUser inside the slice
