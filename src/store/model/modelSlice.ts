import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const models = localStorage.getItem("models");

interface ModelState {
  models: any[];
}

const initialState: ModelState = {
  models: models ? JSON.parse(models) : [],
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<any[]>) => {
      state.models = action.payload;
    },
  },
});

export const { setModels } = modelSlice.actions;

export default modelSlice.reducer;
