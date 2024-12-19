import { configureStore } from "@reduxjs/toolkit";
import { gamesReducer } from "./gamesReducer";
import detailReducer from "./detailReducer";

const store = configureStore({
  reducer: {
    games: gamesReducer, // directly include reducers in an object
    detail: detailReducer,
  },
});

export default store;
