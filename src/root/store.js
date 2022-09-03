//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

//export const store = createStore(reducer);
export const store = configureStore({
  reducer: reducer,
});
