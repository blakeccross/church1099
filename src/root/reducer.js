/*
const initialState = {
  backgroundColor: "red",
  user: {},
  mode: "start",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
      };
    case "user":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

*/

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getUser(state, action) {
      state.data = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
