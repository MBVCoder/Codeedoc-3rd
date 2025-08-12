import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
	token: string | null;
	refreshToken: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
