import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/api/user";
import Message from "./../../components/message/Message";
import Loader from "./../../components/loader/Loader";
import "./login.scss";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.user) {
      navigate("/");
    }
  }, [navigate, user.user]);

  const onChangeHandler = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value.trim() });

    if (loginValues.email !== "" || isFocus === true) {
      setEmailError("");
    } else setEmailError("Email is riquired");

    if (loginValues.password !== "" || isFocus === true) {
      setPasswordError("");
    } else setPasswordError("Password is riquired");
  };

  const onBlurHandle = (e) => {
    setIsFocus(false);
  };

  const onFucosHandle = (e) => {
    setIsFocus(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginValues.email === "" && loginValues.password === "") {
      setEmailError("Email is riquired");
      setPasswordError("Password is riquired");
      return;
    }
    if (loginValues.email === "") {
      setEmailError("Email is riquired");
      return;
    }
    if (loginValues.password === "") {
      setPasswordError("Password is riquired");
      return;
    }

    e.preventDefault();
    const userLogin = {
      username: loginValues.email,
      password: loginValues.password,
    };

    login(dispatch, userLogin);

    if (user.user) {
      navigate("/");
    }
  };

  return (
    <div className="loginContainer">
      <div className="row">
        <div className="col">
          <div className="formContainer">
            <h1>LOGIN</h1>
            {user.error && <Message type="error" message={user.error} />}
            <form onSubmit={submitHandler}>
              <div className="group">
                <label>Email</label>
                <input
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                  value={loginValues.email}
                  type="email"
                  placeholder=" Enter Email"
                  name="email"
                  onChange={onChangeHandler}
                />
                {emailError && <p>{emailError}</p>}
              </div>

              <div className="group">
                <label>Password</label>
                <input
                  value={loginValues.password}
                  type="password"
                  placeholder=" Enter Password"
                  name="password"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandle}
                  onFocus={onFucosHandle}
                />
                {passwordError && <p>{passwordError}</p>}
              </div>
              <button type="submit">
                {user.isFetching ? <Loader /> : "Sign In"}
              </button>
            </form>

            <div className="row">
              <div className="col">
                New Customer?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
