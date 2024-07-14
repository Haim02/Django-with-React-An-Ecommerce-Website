import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage || null,
  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLoginStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    userLoginSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = null;
    },
    userLoginFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    userRegisterStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    userRegisterSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = null;
    },
    userRegisterFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    userLogoutSuccess(state) {
      state.isFetching = false;
      localStorage.removeItem("user");
      state.user = null;
    },

    userUpdateStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    userUpdateSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = null;
    },
    userUpdateFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
