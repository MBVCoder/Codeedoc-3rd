import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const models = localStorage.getItem("models");

interface ModelState {
  models: any[];
  media: any[];
}

const initialState: ModelState = {
  models: models ? JSON.parse(models) : [],
  media: [],
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<any[]>) => {
      state.models = action.payload;
    },
    setModelMedia: (state, action: PayloadAction<any[]>) => {
      state.media = action.payload;
    },
    removeModel: (state) => {
      state.models = [];
      localStorage.removeItem("models");
    },
  },
});

export const { setModels , setModelMedia , removeModel} = modelSlice.actions;

export default modelSlice.reducer;
