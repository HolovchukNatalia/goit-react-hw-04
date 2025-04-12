import React from "react";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p className={css.messageError}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
