import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../../redux/api/cart";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import "./payment.scss";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(dispatch, paymentMethod);
    navigate("/placeorder");
  };

  return (
    <div className="PaymentContainer">
      <div className="formContainer">
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={submitHandler}>
          <div className="group">
            <label>Select Method</label>
            <div className="col">
              <input
                type="checkbox"
                id="paypal"
                name="paymentMethod"
                placeholder="Paypal or Credit Card"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal or Credit Card
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
