import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rating from "../../components/rating/Rating";
import { createProductReview } from "../../redux/api/productsApi";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../redux/api/productsApi";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import uuid from "react-uuid";
import "./productPage.scss";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { product, isFetching, error, errorAlreadyReviewd } = useSelector(
    (state) => state.product
  );
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [qty, setQty] = useState(1);
  const [reviewValues, setReviewValues] = useState({
    rating: 0,
    comment: "",
  });

  const changeHandler = (e) => {
    setReviewValues((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    getProduct(dispatch, id);
  }, [dispatch, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    createProductReview(dispatch, id, reviewValues);
  };

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : error ? (
        <Message type="info" message={error} />
      ) : (
        product &&
        product.rating && (
          <div>
            <div className="productPageContainer">
              <div className="imageContainer">
                <img src={product?.image} alt={product.name} />
              </div>

              <div className="listContainer">
                <div className="listGroup">
                  <div className="listItem">
                    <h3>{product.name}</h3>
                  </div>
                  <div className="line"></div>

                  <div className="listItem">
                    <Rating
                      value={Number(product?.rating)}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                  <div className="line"></div>

                  <div className="listItem">
                    <h3>Price: ${product.price}</h3>
                  </div>
                  <div className="line"></div>

                  <div className="listItemDescription">
                    <h3>Description: {product.description}</h3>
                  </div>
                </div>
              </div>

              <div className="cardContainer">
                <div className="card">
                  <div className="listGroup">
                    <div className="listItem">
                      <div className="row">
                        <div className="col">Price:</div>
                        <div className="col">
                          <strong>${product.price}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="listItem">
                      <div className="row">
                        <div className="col">Status:</div>
                        <div className="col">
                          <strong>
                            {product.countInStack > 0
                              ? "In Stock"
                              : "Out of stock"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {product.countInStack > 0 && (
                      <div className="listItem">
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <form>
                              <select
                                className="selectNum"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStack).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="listItemBtn">
                      <button
                        className="btn"
                        disabled={product.countInStack === 0}
                        type="button"
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rowReview">
              <div>
                <h4>Review</h4>
                {product.reviews.length === 0 && (
                  <Message type="info" message="No reviews" />
                )}
                <div className="listGroup">
                  {product.reviews.map((review) => (
                    <div className="listItem" key={uuid()}>
                      <strong>{review.name || "user"}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                      <div className="line"></div>
                    </div>
                  ))}
                  <div className="listCroup">
                    <h4>Writh a review</h4>
                    {isFetching && <Loader />}
                    {errorAlreadyReviewd && (
                      <Message type="error" message={errorAlreadyReviewd} />
                    )}
                    {user.user ? (
                      <form onSubmit={submitHandler}>
                        <label>Rating</label>
                        <div className="formGrop">
                          <select
                            className="formControl"
                            name="rating"
                            value={reviewValues.rating}
                            onChange={changeHandler}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>

                        <div className="formGrop">
                          <label>Review</label>
                          <textarea
                            rows="5"
                            name="comment"
                            value={reviewValues.comment}
                            placeholder="comment"
                            onChange={changeHandler}
                          />
                        </div>
                        <button disabled={isFetching} type="submit">
                          Submit
                        </button>
                      </form>
                    ) : (
                      <div>
                        <Message
                          error="warning"
                          message={
                            <Link to="/login">Login to write a review</Link>
                          }
                        />
                      </div>
                    )}
                    <div className="listItem"></div>
                    <dv />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductPage;
