import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    profile: null,
    isAuthenticated: false,
  },

  reducers: {
    setAdmin: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },

    clearAdmin: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
