import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button className={css.btn} onClick={onClick}>
        Show more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
