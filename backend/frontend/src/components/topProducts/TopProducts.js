import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getTopProducts } from "../../redux/api/productsApi";
import Loader from "./../../components/loader/Loader";
import Message from "../../components/message/Message";
import uuid from "react-uuid";
import "./topProducts.scss";

const TopProducts = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    getTopProducts(dispatch);
  }, [dispatch]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return product.isFetching ? (
    <Loader />
  ) : product.error ? (
    <Message type="info" message={product.error} />
  ) : (
    <div className="topProductsContainer">
      <Carousel breakPoints={breakPoints} className="topProductsCarousel">
        {product.topProducts.map((product) => (
          <div className="topProductsItem" key={uuid()}>
            <Link to={`/product/${product._id}`}>
              <div className="topProductsItemCaption">
                <h4>
                  {product.name} (${product.price})
                </h4>
              </div>
              <img src={product.image} alt={product.name} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopProducts;
