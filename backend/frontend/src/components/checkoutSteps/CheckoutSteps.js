import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./checkoutSteps.scss";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkoutStepsContainer">
      <div className="navItem">
        {step1 ? (
          <NavLink
            to="/login"
            style={{ color: "black", textDecoration: "none" }}
          >
            <b>Login</b>
          </NavLink>
        ) : (
          <Nav.Link disabled style={{ pointerEvents: "none", color: "gray" }}>
            Login
          </Nav.Link>
        )}
      </div>
      <div className="navItem">
        {step2 ? (
          <NavLink
            to="/shipping"
            style={{ color: "black", textDecoration: "none" }}
          >
            <b>Shipping</b>
          </NavLink>
        ) : (
          <Nav.Link disabled style={{ pointerEvents: "none", color: "gray" }}>
            Shipping
          </Nav.Link>
        )}
      </div>
      <div className="navItem">
        {step3 ? (
          <NavLink
            to="/payment"
            style={{ color: "black", textDecoration: "none" }}
          >
            <b>Payment</b>
          </NavLink>
        ) : (
          <Nav.Link disabled style={{ pointerEvents: "none", color: "gray" }}>
            Payment
          </Nav.Link>
        )}
      </div>
      <div className="navItem">
        {step4 ? (
          <NavLink
            to="/placeOrder"
            style={{ color: "black", textDecoration: "none" }}
          >
            <b>Place Order</b>
          </NavLink>
        ) : (
          <Nav.Link disabled style={{ pointerEvents: "none", color: "gray" }}>
            Place Order
          </Nav.Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
