import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  email: string;
}

interface AuthState {
  user: UserInfo | null;
  access_token: string | null;
  rememberMe: boolean;
}

const initialState: AuthState = {
  user: null,
  access_token: null,
  rememberMe: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (
      state,
      action: PayloadAction<{
        access_token: string;
        rememberMe: boolean;
        email: string;
      }>,
    ) => {
      const { access_token, rememberMe, email } = action.payload;
      state.access_token = access_token;
      state.rememberMe = rememberMe;
      state.user = { email };
      // if (rememberMe) {
      //   localStorage.setItem("access_token", access_token);
      // } else {
      //   sessionStorage.setItem("access_token", access_token);
      // }
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.rememberMe = false;
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
    },
  },
});

export const { setCredential, setUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
