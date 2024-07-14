import React, { useEffect } from "react";
import uuid from "react-uuid";
import Product from "./../../components/product/Product";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/api/productsApi";
import Loader from "./../../components/loader/Loader";
import Message from "../../components/message/Message";
import Paginate from "../../components/paginate/Paginate";
import TopProducts from "../../components/topProducts/TopProducts";
import "./home.scss";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const keyword = searchParams.get("keyword");
  const paramPage = searchParams.get("page");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    let newParam = "";
    if (keyword) {
      newParam = `keyword=${keyword}`;
    }
    getProducts(dispatch, newParam, paramPage);
  }, [dispatch, keyword, paramPage]);

  return (
    <div className="homeContainer">
      {!keyword && <TopProducts />}
      <h1>Latest Products</h1>
      {product.isFetching ? (
        <Loader />
      ) : product.error ? (
        <Message type="info" message={product.error} />
      ) : (
        <>
          <div className="row">
            {product.products.map((product) => (
              <div className="col" key={uuid()}>
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            page={product.pages}
            pages={product.pages}
            keyword={keyword}
          />
        </>
      )}
    </div>
  );
};

export default Home;
