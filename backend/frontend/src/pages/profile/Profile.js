import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/api/user";
import { getMyOrders } from "../../redux/api/order";
import Message from "./../../components/message/Message";
import Loader from "./../../components/loader/Loader";
import TableData from "../../components/tableData/TableData";
import "./profile.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { orders, isFetching, error } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateValues, setUpdateValues] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
    confirmPassword: "",
  });
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getMyOrders(dispatch);
    }
  }, [user, navigate, dispatch]);

  const onChangeHandler = (e) => {
    setUpdateValues({
      ...updateValues,
      [e.target.name]: e.target.value.trim(),
    });
    if (updateValues.email !== "" && updateValues.password !== "") {
      setDisabledBtn(false);
    }
    if (updateValues.email === "" || updateValues.password === "") {
      setDisabledBtn(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userupdate = {
      id: user._id,
      name: updateValues.name,
      email: updateValues.email,
      password: updateValues.password,
    };
    if (updateValues.password === updateValues.confirmPassword) {
      updateUser(dispatch, userupdate);
    }
  };

  return (
    <div className="profileContainer">
      <div className="col">
        <h2>User Profile</h2>
        {user.error && <Message type="error" message={user.error} />}
        {updateValues.password !== updateValues.confirmPassword && (
          <Message type="error" message="passwords do not match " />
        )}
        <form onSubmit={submitHandler}>
          <div className="group">
            <label>Name</label>
            <input
              value={updateValues.name}
              type="text"
              required
              placeholder=" Enter name"
              name="name"
              onChange={onChangeHandler}
            />
          </div>

          <div className="group">
            <label>Email</label>
            <input
              value={updateValues.email}
              type="text"
              required
              placeholder=" Enter Email"
              name="email"
              onChange={onChangeHandler}
            />
          </div>

          <div className="group">
            <label>Password</label>
            <input
              value={updateValues.password}
              type="password"
              placeholder=" Enter Password"
              name="password"
              onChange={onChangeHandler}
            />
          </div>

          <div className="group">
            <label>Confirm Password</label>
            <input
              value={updateValues.confirmPassword}
              type="password"
              placeholder=" Enter Confirm Password"
              name="confirmPassword"
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit">
            {user.isFetching ? <Loader /> : "Update"}
          </button>
        </form>
      </div>

      <div className="col">
        <h2>My Orders</h2>
        {isFetching ? (
          <Loader />
        ) : error ? (
          <Message type="error" message={error} />
        ) : (
          <TableData data={orders} />
        )}
      </div>
    </div>
  );
};

export default Profile;
