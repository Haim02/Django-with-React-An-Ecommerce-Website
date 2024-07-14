import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Message from "./../../components/message/Message";
import Loader from "./../../components/loader/Loader";
import { orderPay, getOrder } from "../../redux/api/order";
import { updateOrderToDelivered } from "../../redux/api/admin";
import uuid from "react-uuid";
import "./order.scss";

const Order = () => {
  const [sdkReady, setSdkReady] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const newOrder = { ...order };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (!order.order) {
      getOrder(dispatch, id);
    }
  }, [dispatch, id, order.order, user, navigate]);

  const deliverHandler = () => {
    deliverHandler(dispatch, order);
  };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: newOrder.order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = (data) => {
    console.log("onApprove data", data);
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.paymentMethod]);

  if (order.order) {
    return (
      <>
        {order.isFetching ? (
          <Loader />
        ) : order.error ? (
          <Message type="error" message={"order.error"} />
        ) : (
          <div className="orderContainer">
            <h1>Order: {order.order._id}</h1>
            <div className="row">
              <div className="col">
                <div className="listGroup">
                  <div className="listGroupItem">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {newOrder.order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong> {newOrder.order.user.email}
                    </p>
                    <p>
                      <strong>Shipping: </strong>
                      {newOrder.order.shippingAddress?.address},{" "}
                      {newOrder.order.shippingAddress?.city}
                      {"  "}
                      {newOrder.order.shippingAddress?.postaclcode},{"  "}
                      {newOrder.order.shippingAddress?.country}
                    </p>
                    {newOrder.order.isDeliverdd ? (
                      <Message
                        type="success"
                        message={`Deliverd on ${newOrder.order?.isDeliverdd}`}
                      />
                    ) : (
                      <Message type="warning" message="Not Deliverd" />
                    )}
                  </div>
                  <div className="hr"></div>
                  <div className="listGroupItem">
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {newOrder.order.paymentMethod}
                    </p>
                    {newOrder.order.isPaid ? (
                      <Message
                        type="success"
                        message={`Paid on ${newOrder.order?.paidAt}`}
                      />
                    ) : (
                      <Message type="warning" message="Not Paid" />
                    )}
                  </div>
                  <div className="hr"></div>
                  <div className="listGroupItem">
                    <h2>Order Items</h2>
                    {newOrder.order.orderItems.length === 0 ? (
                      <Message type="info" message="Order is empty" />
                    ) : (
                      <div className="listGroupItems" id={uuid()}>
                        {newOrder.order.orderItems.map((item) => (
                          <div className="listGroupItem">
                            <div className="row">
                              <div className="colImage">
                                <img
                                  className="itemImage"
                                  src={item.image || "../images/airpods.jpg"}
                                  alt=""
                                />
                              </div>
                              <div className="col">
                                <Link to={`/product/${item._id}`}>
                                  item.name{" "}
                                </Link>
                                <Link to={`/product/${item?._id}`}>
                                  {item.name}
                                </Link>
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
                        <div className="col">{newOrder.itemsPrice}</div>
                      </div>
                    </div>
                    <div className="listGroupItem">
                      <div className="row">
                        <div className="col">Shipping:</div>
                        <div className="col">
                          {newOrder.order.shippingPrice}
                        </div>
                      </div>
                    </div>
                    <div className="listGroupItem">
                      <div className="row">
                        <div className="col">Tax:</div>
                        <div className="col">{newOrder.order.texPrice}</div>
                      </div>
                    </div>
                    <div className="listGroupItem">
                      <div className="row">
                        <div className="col">Total:</div>
                        <div className="col">{newOrder.order.totalPrice}</div>
                      </div>
                    </div>
                    {sdkReady && (
                      <div className="listGroupItem">
                        <PayPalScriptProvider options={initialOptions}>
                          <PayPalButtons
                            createOrder={(data, actions) =>
                              createOrder(data, actions)
                            }
                            onApprove={(data, actions) =>
                              onApprove(data, actions)
                            }
                          />
                        </PayPalScriptProvider>
                      </div>
                    )}
                  </div>

                  {order.isFetching && <Loader />}
                  {user &&
                    user.isAdmin &&
                    newOrder.order.isPaid &&
                    !newOrder.order.isDeliverdd && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Order;
