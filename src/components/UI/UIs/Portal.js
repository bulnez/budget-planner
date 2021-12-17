import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ message }) => {
  return ReactDOM.createPortal(<div>{message}</div>, document.body);
};

export default Modal;
