import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  topProducts: [],
  isFetching: false,
  error: false,
  errorAlreadyReviewd: false,
  success: false,
  page: 1,
  pages: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProductsSuccess(state, action) {
      state.isFetching = false;
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.success = true;
    },
    getProductsFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    getProductByIdStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProductByIdSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
      state.success = true;
    },
    getProductByIdFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    productCreateReviewStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    productCreateReviewSuccess(state, action) {
      state.isFetching = false;
      state.products[
        state.products.findIndex(
          (item) => item._id === action.payload.productId
        )
      ].reviews = action.payload.review;
      state.success = true;
    },
    productCreateReviewFailure(state, action) {
      state.isFetching = false;
      state.errorAlreadyReviewd = action.payload;
    },

    createProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
      state.success = true;
    },
    createProductFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    updateProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
      state.success = true;
    },
    updateProductFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    getTopProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTopProductsSuccess(state, action) {
      state.isFetching = false;
      state.topProducts = action.payload;
      state.success = true;
    },
    getTopProductsFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
