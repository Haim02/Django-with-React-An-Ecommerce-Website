import axios from "axios";
import { userAction } from "../slice/user";
const PATH = "http://localhost:8000/api";

export const login = async (dispatch, user) => {
  dispatch(userAction.userLoginStart());
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${PATH}/users/login`, user, config);
    dispatch(userAction.userLoginSuccess(res.data));
  } catch (error) {
    dispatch(userAction.userLoginFailure(error?.response?.data?.detail || 'A problem occurred. Please try again later'));
  }
};

export const register = async (dispatch, user) => {
  dispatch(userAction.userRegisterStart());
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${PATH}/users/register`, user, config);
    dispatch(userAction.userRegisterSuccess(res.data));
  } catch (error) {
    dispatch(userAction.userRegisterFailure(error?.response?.data?.detail || 'A problem occurred. Please try again later'));
  }
};

export const logout = (dispatch) => {
  dispatch(userAction.userLogoutSuccess());
};

export const updateUser = async (dispatch, user) => {
  dispatch(userAction.userUpdateStart);
  const userToken = JSON.parse(localStorage.getItem("user"));

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const res = await axios.put(`${PATH}/users/profile/update`, user, config);
    dispatch(userAction.userUpdateSuccess(res.data));
  } catch (error) {
    dispatch(userAction.userUpdateFailure(error.response.data.detail));
  }
};

export const removeFromCart = async (dispatch, id) => {
  dispatch(userAction.removeItemFromCartStart());
  dispatch(userAction.removeItemFromCartSuccess(id));
  dispatch(userAction.removeItemFromCartFailure());
};
