import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./searcBox.scss";

const SearcBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(`${location.pathname}`);
    }
  };

  return (
    <form onSubmit={submitHandler} className="searcBoxContainer">
      <input type="text" onChange={(e) => setKeyword(e.target.value)}></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearcBox;
