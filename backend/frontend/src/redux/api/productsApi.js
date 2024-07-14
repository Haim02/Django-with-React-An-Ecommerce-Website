import axios from "axios";
import { productActions } from "../slice/product";
const PATH = "http://localhost:8000/api";

const userToken = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userToken?.token}`,
  },
};

export const getProducts = async (dispatch, keyword = "", page = "") => {
  dispatch(productActions.getProductsStart());
  try {
    const res = await axios.get(
      `${PATH}/products?${keyword}${page && `&page=${page}`}`
    );
    dispatch(productActions.getProductsSuccess(res.data));
  } catch (error) {
    dispatch(
      productActions.getProductsFailure(
        error?.response?.data?.detail || "No products"
      )
    );
  }
};

export const getProduct = async (dispatch, id) => {
  dispatch(productActions.getProductByIdStart());
  try {
    const res = await axios.get(`${PATH}/products/${id}`);
    dispatch(productActions.getProductByIdSuccess(res.data));
  } catch (error) {
    dispatch(
      productActions.getProductByIdFailure(
        error?.response?.data?.detail || "Products Not Found"
      )
    );
  }
};

export const createProduct = async (dispatch, product) => {
  dispatch(productActions.createProductStart());
  try {
    const res = await axios.post(`${PATH}/products/create`, product, config);
    dispatch(productActions.createProductSuccess(res.data));
  } catch (error) {
    dispatch(productActions.createProductFailure(error.response.data.detail));
  }
};

export const updateProduct = async (dispatch, product, id) => {
  dispatch(productActions.updateProductStart());
  try {
    const res = await axios.put(
      `${PATH}/products/update/${id}`,
      product,
      config
    );
    dispatch(productActions.updateProductSuccess(res.data));
  } catch (error) {
    dispatch(
      productActions.updateProductFailure(
        error.response.data.detail ||
          "An error occurred, please try again later"
      )
    );
  }
};

export const createProductReview = async (dispatch, productId, review) => {
  dispatch(productActions.productCreateReviewStart());
  try {
    const res = await axios.post(
      `${PATH}/products/${productId}/reviews`,
      review,
      config
    );
    dispatch(productActions.productCreateReviewSuccess(productId, review));
  } catch (error) {
    dispatch(
      productActions.productCreateReviewFailure(
        error?.response?.data?.detail ||
          "An error occurred, please try again later"
      )
    );
  }
};

export const getTopProducts = async (dispatch) => {
  dispatch(productActions.getTopProductsStart());
  try {
    const res = await axios.get(`${PATH}/products/top`);
    dispatch(productActions.getTopProductsSuccess(res.data));
  } catch (error) {
    dispatch(
      productActions.getTopProductsFailure(
        error?.response?.data.detail || "No Products"
      )
    );
  }
};
