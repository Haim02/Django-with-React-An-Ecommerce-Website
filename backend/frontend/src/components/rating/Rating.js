import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import "./rating.scss";

const Rating = ({ value, text }) => {
  if (value === 1) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 1.5) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStarHalf} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 2) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 2.5) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStarHalf} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 3) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 3.5) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStarHalf} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 4) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 4.5) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStarHalf} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
  if (value === 5) {
    return (
      <div className="ratingContainer">
        <span>
          <i>
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </i>
        </span>
        <span className="text">{text && text}</span>
      </div>
    );
  }
};

export default Rating;
