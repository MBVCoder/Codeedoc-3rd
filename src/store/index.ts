import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@store/auth/authslice";
import modelSlice from "@store/model/modelSlice";
import productAiSlice from "@store/model/productAiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    model: modelSlice,
    productAi: productAiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
