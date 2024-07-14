import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orders: [],
  isFetching: false,
  error: false,
  success: false,
  orderPay: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    createOrderStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    createOrderSuccess(state, action) {
      state.isFetching = false;
      state.order = action.payload;
      state.success = true;
    },
    createOrderFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    getOrderByIdStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getOrderByIdSuccess(state, action) {
      state.isFetching = false;
      state.order = action.payload;
      state.success = true;
    },
    getOrderByIdFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    orderPayStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    orderPaySuccess(state, action) {
      state.isFetching = false;
      state.orderPay = true;
      state.success = true;
    },
    orderPayFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    getMyOrdersStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getMyOrdersSuccess(state, action) {
      state.isFetching = false;
      state.orders = action.payload;
      state.success = true;
    },
    getMyOrdersFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
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
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
