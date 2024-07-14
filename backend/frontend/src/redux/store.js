import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slice/cart";
import userSlice from "./slice/user";
import orderSlice from "./slice/order";
import productSlice from "./slice/product";
import adminSlice from "./slice/admin";
import { setupListeners } from "@reduxjs/toolkit/query";

const reducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  product: productSlice.reducer,
  admin: adminSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

setupListeners(store.dispatch);
