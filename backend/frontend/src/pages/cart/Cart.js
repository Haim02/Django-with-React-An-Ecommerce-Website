import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/loader/Loader";
import Message from "./../../components/message/Message";
import { addToCart, removeFromCart } from "../../redux/api/cart";
import uuid from "react-uuid";
import "./cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[2];
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      addToCart(dispatch, productId, qty);
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    removeFromCart(dispatch, id);
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      {cart.isFetching ? (
        <Loader />
      ) : (
        <div className="cartContainer">
          <h1>Shopping Cart</h1>
          <div className="col">
            {cart.cartItems.length === 0 ? (
              <Message
                type="info"
                message={
                  <div>
                    Your cart is empty <Link to="/">Go Back</Link>
                  </div>
                }
              />
            ) : (
              <div className="listGroup">
                <div className="listGroupItems">
                  {cart.cartItems.map((item) => {
                    return (
                      <div className="listGroupItem" key={uuid()}>
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
                          <div className="col">${item.price}</div>
                          <div className="col">
                            <form>
                              <select
                                className="selectNum"
                                value={item.qty}
                                onChange={(e) =>
                                  addToCart(
                                    dispatch,
                                    item._id,
                                    Number(e.target.value)
                                  )
                                }
                              >
                                {[...Array(item.countInStack).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </form>
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              onClick={() => removeFromCartHandler(productId)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="colBtn">
                  <div className="cart">
                    <div className="listGroup">
                      <div className="listGroupItem">
                        <h2>
                          Subtotal (
                          {cart.cartItems.reduce(
                            (acc, item) => acc + item.qty,
                            0
                          )}
                          ) items
                        </h2>
                        $
                        {cart.cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="listItemBtn">
                      <button
                        className="btn"
                        disabled={cart.cartItems === 0}
                        type="button"
                        onClick={checkoutHandler}
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
