import { configureStore } from "@reduxjs/toolkit";
//import { reducer } from "./reducer";
import userReducer from "./reducer";

//export const store = configureStore({
//reducer: reducer,
//});

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
