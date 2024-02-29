import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const categorySlice = createSlice({
  name: "Category list",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getCategories } = categorySlice.actions;
export default categorySlice.reducer;
