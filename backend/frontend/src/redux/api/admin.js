import axios from "axios";
import { adminAction } from "../slice/admin";
const PATH = "http://localhost:8000/api";

const userToken = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userToken?.token}`,
  },
};

export const getProductsList = async (dispatch) => {
  dispatch(adminAction.getProductsListStart());
  try {
    const res = await axios.get(`${PATH}/products`);
      dispatch(adminAction.getProductsListSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.getProductsListFailure(error?.response?.data?.detail || 'No products'));
  }
};

export const getProductById = async (dispatch, id) => {
  dispatch(adminAction.getProdyctByIdStart());
  try {
    const res = await axios.get(`${PATH}/products/${id}`);
    dispatch(adminAction.getProdyctByIdSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.getProdyctByIdFailure(error?.response?.data?.detail || 'Products Not Found' ));
  }
};

export const createProduct = async (dispatch, product) => {
  dispatch(adminAction.createProductStart());
  try {
    const res = await axios.post(`${PATH}/products/create`, product, config);
    dispatch(adminAction.createProductSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.createProductFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const updateProduct = async (dispatch, product, id) => {
  dispatch(adminAction.updateProductsStart());
  try {
    const res = await axios.put(
      `${PATH}/products/update/${id}`,
      product,
      config
    );
    dispatch(adminAction.updateProductsSuccess(res.data));
} catch (error) {
    dispatch(adminAction.updateProductsFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(adminAction.deleteProductStart());
  try {
    const res = await axios.put(
      `${PATH}/products/delete/${id}`,
      config
    );
    dispatch(adminAction.deleteProductSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.deleteProductFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const getUsersList = async (dispatch) => {
  dispatch(adminAction.getUsersListStart());
  try {
    const res = await axios.get(`${PATH}/users`, config);
    dispatch(adminAction.getUsersListSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.getUsersListFailure(error?.response?.data?.detail || 'No Users'));
  }
};

export const getUsersById = async (dispatch, id) => {
  dispatch(adminAction.getUserByIdStart());
  try {
    const res = await axios.get(`${PATH}/users/${id}`, config);
    dispatch(adminAction.getUserByIdSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.getUserByIdFailure(error?.response?.data?.detail || 'User Not Found' ));
  }
};

export const createUser = async (dispatch, product) => {
  dispatch(adminAction.createUserStart());
  try {
    const res = await axios.post(`${PATH}/users/create`, product, config);
    dispatch(adminAction.createUserSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.createUserFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const updateUser = async (dispatch, user, id) => {
  dispatch(adminAction.updateUserStart());
  try {
    const res = await axios.put(
      `${PATH}/users/update/${id}`,
      user,
      config
    );
    dispatch(adminAction.updateUserSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.updateUserFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const deleteUser = async (dispatch, id) => {
  dispatch(adminAction.deleteUserStart());
  try {
    const res = await axios.delete(
      `${PATH}/users/delete/${id}`,
      config
    );
    dispatch(adminAction.deleteUserSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.deleteUserFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const getOrders = async (dispatch) => {
  dispatch(adminAction.getOrdersStart());
  try {
    const res = await axios.get(
      `${PATH}/orders`,
      config
    );
    dispatch(adminAction.getOrdersSuccess(res.data));
} catch (error) {
    dispatch(adminAction.getOrdersFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const updateOrderToDelivered = async (dispatch, order) => {
  dispatch(adminAction.updateOrderTodeliveredStart());
  try {
    const res = await axios.get(
      `${PATH}/orders/${order._id}/deliver`,
      config
    );
    dispatch(adminAction.updateOrderTodeliveredSuccess(res.data));
  } catch (error) {
    dispatch(adminAction.updateOrderTodeliveredFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};
