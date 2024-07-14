import axios from "axios";
import { orderActions } from "../slice/order";
const PATH = "http://localhost:8000/api";
const userToken = JSON.parse(localStorage.getItem("user"));

export const createOrder = async (dispatch, order) => {
  dispatch(orderActions.createOrderStart());
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const res = await axios.post(`${PATH}/orders/add`, order, config);
    dispatch(orderActions.createOrderSuccess(res.data));
  } catch (error) {
    dispatch(orderActions.createOrderFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const getOrder = async (dispatch, id) => {
  dispatch(orderActions.getOrderByIdStart());
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };
    const res = await axios.get(`${PATH}/orders/${id}`, config);
    dispatch(orderActions.getOrderByIdSuccess(res.data));
  } catch (error) {
    dispatch(orderActions.getOrderByIdFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const orderPay = async (dispatch, id, paymentResult) => {
  dispatch(orderActions.orderPayStart());
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };
    const res = await axios.put(`${PATH}/orders/${id}/pay`, config);
    dispatch(orderActions.orderPaySuccess());
  } catch (error) {
    dispatch(orderActions.orderPayFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const getMyOrders = async (dispatch) => {
  dispatch(orderActions.getMyOrdersStart());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const res = await axios.get(`${PATH}/orders/myorders`, config);
    dispatch(orderActions.getMyOrdersSuccess(res.data));
  } catch (error) {
    dispatch(orderActions.getMyOrdersFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

export const updateOrderToDelivered = async (dispatch, order) => {
  dispatch(orderActions.updateOrderTodeliveredStart());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const res = await axios.get(
      `${PATH}/orders/${order._id}/deliver`,
      config
    );
    dispatch(orderActions.updateOrderTodeliveredSuccess(res.data));
  } catch (error) {
    dispatch(orderActions.updateOrderTodeliveredFailure(error?.response?.data?.detail || 'An error occurred, please try again later'));
  }
};

