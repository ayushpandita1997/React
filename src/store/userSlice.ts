import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
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

export const { addUser, removeUser } = userSlice.actions; //action creators

export default userSlice.reducer; //actual reducer

// so the 'user' is a slice created inside the store and userReducer is the
// reducer which manages the action logic like addUser, removeUser inside the slice
