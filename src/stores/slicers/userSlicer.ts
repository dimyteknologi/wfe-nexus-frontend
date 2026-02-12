import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentUserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface IUser {
  token: string | null;
  currentUser: ICurrentUserProps | null;
}

const INITIAL_STATE: IUser = {
  currentUser: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setCurrentUser, setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
