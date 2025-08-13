import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

interface AuthState{
	token: string | null;
	refreshToken: string | null;
}

const initialState: AuthState = {
  token: token || null,
  refreshToken: refreshToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.refreshToken = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  },
});

export const { setToken , logOut } = authSlice.actions;

export default authSlice.reducer;
