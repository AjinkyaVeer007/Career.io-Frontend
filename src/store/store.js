import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import jobSlice from "./jobSlice";

const store = configureStore({
  reducer: {
    categoriesData: categorySlice,
    jobData: jobSlice,
  },
});

export default store;
