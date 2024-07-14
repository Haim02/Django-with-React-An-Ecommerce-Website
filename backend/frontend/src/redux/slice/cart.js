import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cartItems: cartItemsFromStorage || [],
  product: null,
  shippingAddress: shippingAddressFromStorage || {},
  paymentMethod: "",
  isFetching: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCartStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    addToCartSuccess(state, action) {
      state.isFetching = false;
      const item = action.payload;
      const exisItem = state.cartItems.find((x) => x._id === item._id);
      if (exisItem) {
        state.cartItems[
          state.cartItems.findIndex((x) => x._id === exisItem._id)
        ] = item;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addToCartFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getcartStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getcartSuccess(state, action) {
      state.isFetching = false;
      state.cart = action.payload;
    },
    getcartFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    removeItemFromCartStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    removeItemFromCartSuccess(state, action) {
      state.isFetching = false;
      state.cartItems.splice(
        state.cartItems.findIndex((item) => item._id === action.payload),
        1
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCartFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    updatecartsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updatecartsSuccess(state, action) {
      state.isFetching = false;
      state.carts[
        state.carts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.cart;
    },
    updatecartsImagesSuccess(state, action) {
      state.cart.images = state.cart.images.filter(
        (img) => img !== action.payload
      );
    },
    updatecartsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    deletecartsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deletecartsSuccess(state, action) {
      state.isFetching = false;
      state.carts.splice(
        state.carts.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deletecartsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    clearState(state) {
      state.cart = null;
      state.carts = null;
    },

    shippingAddressStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    shippingAddressSuccess(state, action) {
      state.isFetching = false;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      state.shippingAddress = action.payload;
    },
    shippingAddressFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    paymentMethodSuccess(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
