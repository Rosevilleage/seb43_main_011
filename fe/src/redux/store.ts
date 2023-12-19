import {
  AnyAction,
  CombinedState,
  Store,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import NavOpen from "./slices/NavSlice";
import UserSlice from "./slices/UserSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      User: UserSlice,
      NavOpen: NavOpen,
    },
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;

export const wrapper = createWrapper<Store<RootState, AnyAction>>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type AppStore = ReturnType<typeof makeStore>;
