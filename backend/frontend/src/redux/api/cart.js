import axios from "axios";
import { cartAction } from "../slice/cart";
const PATH = "http://localhost:8000/api";

export const addToCart = async (dispatch, id, qty) => {
  dispatch(cartAction.addToCartStart());
  try {
    const res = await axios.get(`${PATH}/products/${id}`);
    res.data.qty = qty;
    dispatch(cartAction.addToCartSuccess(res.data));
  } catch (error) {
    dispatch(cartAction.addToCartFailure());
  }
};

export const removeFromCart = async (dispatch, id) => {
  dispatch(cartAction.removeItemFromCartStart());
  dispatch(cartAction.removeItemFromCartSuccess(id));
  dispatch(cartAction.removeItemFromCartFailure());
};

export const saveShippingAddress = async (dispatch, data) => {
  dispatch(cartAction.shippingAddressSuccess(data));
};

export const savePaymentMethod = async (dispatch, data) => {
  dispatch(cartAction.paymentMethodSuccess(data));
};
