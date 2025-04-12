import React from "react";
import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <FadeLoader color="#535353" size={50} />
    </div>
  );
};

export default Loader;
