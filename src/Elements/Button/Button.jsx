import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.disabled && styles.disabled}`}
    >
      {children}
    </button>
  );
};

export default Button;
