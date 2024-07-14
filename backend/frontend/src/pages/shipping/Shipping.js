import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../../redux/api/cart";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import "./shipping.scss";

const Shipping = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [shippingValues, setShippingValues] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postaclcode: shippingAddress.postaclcode,
    country: shippingAddress.country,
  });

  useEffect(() => {
    if (!user.user) {
      navigate("/login");
    }
  }, [navigate, user.user]);

  const onChangeHandler = (e) => {
    setShippingValues({
      ...shippingValues,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress(dispatch, shippingValues);
    navigate("/payment");
  };

  return (
    <div className="shippingContainer">
      <div className="formContainer">
        <CheckoutSteps step1 />
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <div className="group">
            <label>Address</label>
            <input
              value={shippingValues.address}
              type="text"
              required
              placeholder=" Enter Address"
              name="address"
              onChange={onChangeHandler}
            />
          </div>
          <div className="group">
            <label>City</label>
            <input
              value={shippingValues.city}
              type="text"
              required
              placeholder=" Enter city"
              name="city"
              onChange={onChangeHandler}
            />
          </div>
          <div className="group">
            <label>Postaclcode</label>
            <input
              value={shippingValues.postaclcode}
              type="text"
              required
              placeholder=" Enter postaclcode"
              name="postaclcode"
              onChange={onChangeHandler}
            />
          </div>
          <div className="group">
            <label>Country</label>
            <input
              value={shippingValues.country}
              type="text"
              required
              placeholder=" Enter country"
              name="country"
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
