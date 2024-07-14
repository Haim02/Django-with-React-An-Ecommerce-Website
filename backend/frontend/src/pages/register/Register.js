import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/api/user";
import Message from "./../../components/message/Message";
import Loader from "./../../components/loader/Loader";
import "./register.scss";

const Resgister = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerValuesError, setRegisterValuesError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value.trim(),
    });

    if (registerValues.email !== "" || isFocus === true) {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "",
      });
    } else {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "Email is required",
      });
    }

    if (registerValues.name !== "" || isFocus === true) {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "",
      });
    } else {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "Name is required",
      });
    }

    if (registerValues.password !== "" || isFocus === true) {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "",
      });
    } else {
      setRegisterValuesError({
        ...registerValuesError,
        [e.target.name]: "Password is required",
      });
    }
  };

  const onBlurHandle = (e) => {
    setIsFocus(false);
  };

  const onFucosHandle = (e) => {
    setIsFocus(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      registerValues.name === "" &&
      registerValues.email === "" &&
      registerValues.password === ""
    ) {
      setRegisterValuesError({
        name: "Name is required",
        email: "Email is required",
        password: "Password is required",
      });
      return;
    }

    if (registerValues.name === "") {
      setRegisterValuesError({
        ...registerValuesError,
        name: "Name is required",
      });
      return;
    }

    if (registerValues.email === "") {
      setRegisterValuesError({
        ...registerValuesError,
        email: "Email is required",
      });
      return;
    }
    if (registerValues.password === "") {
      setRegisterValuesError({
        ...registerValuesError,
        password: "Password is required",
      });
      return;
    }

    if (registerValues.password !== registerValues.confirmPassword) {
      setRegisterValuesError({
        ...registerValuesError,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    const userRegister = {
      name: registerValues.name,
      email: registerValues.email,
      password: registerValues.password,
    };

    register(dispatch, userRegister);

    if (user.user) {
      navigate("/");
    }
  };

  return (
    <div className="registerContainer">
      <div className="row">
        <div className="col">
          <div className="formContainer">
            <h1>REGISTER</h1>
            {user.error && <Message type="error" message={user.error} />}
            {/* {registerValues.password !== registerValues.confirmPassword && (
              <Message type="error" message={user.error} />
            )} */}
            <form onSubmit={submitHandler}>
              <div className="group">
                <label>Name</label>
                <input
                  value={registerValues.name}
                  type="text"
                  placeholder=" Enter name"
                  name="name"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                />
                {registerValuesError.name && <p>{registerValuesError.name}</p>}
              </div>

              <div className="group">
                <label>Email</label>
                <input
                  value={registerValues.email}
                  type="email"
                  placeholder=" Enter Email"
                  name="email"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                />
                {registerValuesError.email && (
                  <p>{registerValuesError.email}</p>
                )}
              </div>

              <div className="group">
                <label>Password</label>
                <input
                  value={registerValues.password}
                  type="password"
                  placeholder=" Enter Password"
                  name="password"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                />
                {registerValuesError.password && (
                  <p>{registerValuesError.password}</p>
                )}
              </div>

              <div className="group">
                <label>Confirm Password</label>
                <input
                  value={registerValues.confirmPassword}
                  type="password"
                  placeholder=" Enter Confirm Password"
                  name="confirmPassword"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                />
                {registerValuesError.confirmPassword && (
                  <p>{registerValuesError.confirmPassword}</p>
                )}
              </div>
              <button type="submit">
                {user.isFetching ? <Loader /> : "Register"}
              </button>
            </form>

            <div className="row">
              <div className="col">
                Have an Account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resgister;
