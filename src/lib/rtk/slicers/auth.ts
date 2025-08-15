import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/lib/types";

const initialState: AuthState = {
    type: null,
    access_token: null,
    refresh_token: null,
    expires_in: null,
    expired_at: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.type = action.payload.type;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.expires_in = action.payload.expires_in;
            state.expired_at = action.payload.expired_at;
        },
        logout: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            state.expires_in = null;
            state.expired_at = null;
        }
    }
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;