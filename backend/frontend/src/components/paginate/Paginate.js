import React from "react";
import uuid from "react-uuid";
import { Link, useSearchParams } from "react-router-dom";
import "./paginate.scss";

const Paginate = ({ pages, page, keyword = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const keywordParam = searchParams.get("keyword");

  return (
    pages > 1 && (
      <div className="paginateContainer">
        {[...Array(pages).keys()].map((x) => (
          <div className="linkContainer" key={uuid()}>
            <Link
              className="link"
              to={`/?keyword=${keyword || ""}&page=${x + 1}`}
            >
              {x + 1}
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default Paginate;
