import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Rating from "../rating/Rating";
import "./product.scss";

const Product = ({ product }) => {
  return (
    <div className="productContainer">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || <FontAwesomeIcon icon={faImage} />}
          alt="img"
        />
        <div className="cartBody">
          <div className="title">
            <strong>{product.name}</strong>
          </div>

          <div className="text">
            <div>
              {product.rating} from {product.numReviews} reviews
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </div>

          <h3>${product.price}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Product;
