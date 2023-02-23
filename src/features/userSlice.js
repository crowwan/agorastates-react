import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    signIn(state, { payload }) {
      return payload;
    },
    logOut(state) {
      return "";
    },
  },
});

export const { signIn, logOut } = userSlice.actions;
export default userSlice.reducer;
