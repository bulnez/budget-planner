import React from "react";
import styles from "../../Styles/Button.module.css";

const STYLES = ["primary", "warning", "inactive"];
const SIZES = ["medium", "small"];

const Button = ({ text, buttonStyle, buttonSize, onClick }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`${styles.btn} ${styles[checkButtonStyle]} ${styles[checkButtonSize]}`}
      onClick={onClick}
      disabled={checkButtonStyle === "inactive" ? "disabled" : ""}
    >
      {text}
    </button>
  );
};

export default Button;
