import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../../components/message/Message";
import Loader from "./../../components/loader/Loader";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { createOrder } from "../../redux/api/order";
import uuid from "react-uuid";
import "./placeOrder.scss";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const newCard = { ...cart };

  newCard.itemsPrice = newCard.cartItems
    .reduce((acc, item) => acc + item?.price * item?.qty, 0)
    .toFixed(2);

  newCard.shippingPrice = (newCard.itemsPrice > 100 ? 0 : 10).toFixed(2);
  newCard.taxPrice = Number(0.082 * newCard.itemsPrice).toFixed(2);

  newCard.totalPrice = (
    Number(newCard.itemsPrice) +
    Number(newCard.shippingPrice) +
    Number(newCard.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const onClickHandler = () => {
    const orderObj = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: newCard.itemsPrice,
      shippingPrice: newCard.shippingPrice,
      texPrice: newCard.taxPrice,
      totalPrice: newCard.totalPrice,
    };
    createOrder(dispatch, orderObj);
    if (order.order) {
      navigate(`/order/${order.order?._id}`);
    }
  };

  return (
    <div className="placeOrderContainer">
      <div className="CheckoutStepsContainer">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="row">
        <div className="col">
          <div className="listGroup">
            <div className="listGroupItem">
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city}
                {"  "}
                {cart.shippingAddress?.postaclcode},{"  "}
                {cart.shippingAddress?.country}
              </p>
            </div>
            <div className="hr"></div>
            <div className="listGroupItem">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="hr"></div>
            <div className="listGroupItem">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message type="info" message="Your cart is empty" />
              ) : (
                <div className="listGroupItems">
                  {cart.cartItems.map((item) => (
                    <div className="listGroupItem" id={uuid()}>
                      <div className="row">
                        <div className="colImage">
                          <img
                            className="itemImage"
                            src={item.image || "../images/airpods.jpg"}
                            alt=""
                          />
                        </div>
                        <div className="col">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </div>
                        <div className="col">
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                      <div className="hr"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="listGroup">
              <div className="listGroupItem">
                <h2>Order Summary</h2>
              </div>
              <div className="listGroupItem">
                <div className="row">
                  <div className="col">Item:</div>
                  <div className="col">{newCard.itemsPrice}</div>
                </div>
              </div>
              <div className="listGroupItem">
                <div className="row">
                  <div className="col">Shipping:</div>
                  <div className="col">{newCard.shippingPrice}</div>
                </div>
              </div>
              <div className="listGroupItem">
                <div className="row">
                  <div className="col">Tax:</div>
                  <div className="col">{newCard.taxPrice}</div>
                </div>
              </div>
              <div className="listGroupItem">
                <div className="row">
                  <div className="col">Total:</div>
                  <div className="col">{newCard.totalPrice}</div>
                </div>
              </div>
              {order.error && (
                <div className="listGroupItem">
                  {order.error && (
                    <Message type="error" message={order.error} />
                  )}
                </div>
              )}
              <div className="listGroupItem">
                <button
                  className="btn"
                  disabled={cart.cartItems === 0}
                  type="button"
                  onClick={onClickHandler}
                >
                  {order.isFetching ? <Loader /> : "Proceed To Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
