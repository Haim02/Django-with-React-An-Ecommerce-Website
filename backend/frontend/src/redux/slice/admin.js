import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  orders: [],
  users: [],
  user: null,
  isFetching: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
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
      state.error = null;
    },
    addToCartFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getProductsListStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProductsListSuccess(state, action) {
      state.isFetching = false;
      state.products = action.payload;
      state.error = null;
    },
    getProductsListFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getProdyctByIdStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProdyctByIdSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
      state.error = null;
    },
    getProdyctByIdFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    createProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess(state, action) {
      state.isFetching = false;
      state.products.push(action.payload);
      state.error = null;
    },
    createProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    deleteProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess(state, action) {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = null;
    },
    deleteProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    updateProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateProductsSuccess(state, action) {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
      state.error = null;
    },
    updateProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getUsersListStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getUsersListSuccess(state, action) {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersListFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getUserByIdStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getUserByIdSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
    },
    getUserByIdFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    createUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    createUserSuccess(state, action) {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    createUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    updateUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess(state, action) {
      state.isFetching = false;
      state.users[
        state.user.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    deleteUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess(state, action) {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    getOrdersStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getOrdersSuccess(state, action) {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrdersFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    updateOrderTodeliveredStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderTodeliveredSuccess(state, action) {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((order) => order._id === action.payload.id)
      ].isDeliverdd = true;
    },
    updateOrderTodeliveredFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    clearState(state) {
      state.cart = null;
      state.carts = null;
    },
  },
});

export const adminAction = adminSlice.actions;

export default adminSlice;
