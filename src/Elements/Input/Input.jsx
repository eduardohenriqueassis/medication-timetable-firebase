import React from "react";
import styles from "./Input.module.css";
import EyeYes from "./../../assets/passwordShow.svg";
import EyeNo from "./../../assets/passwordHide.svg";

const Input = React.forwardRef(
  (
    {
      label,
      type,
      name,
      value,
      onChange,
      error,
      onBlur,
      min,
      step,
      placeholder,
      showPasswordIcon,
      onClick,
      onSelect,
      ariaLabel,
      disabled,
      autoComplete,
    },
    ref
  ) => {
    const [passwordIcon, setPasswordIcon] = React.useState("show Password");
    const [icon, setIcon] = React.useState(true);
    const [inputType, setInputType] = React.useState(type);
    function changeIcon() {
      setIcon(!icon);
      setInputType(inputType === "text" ? "password" : "text");
    }
    return (
      <div
        className={`${styles.inputWrapper} ${
          disabled ? styles.disabledInput : ""
        }`}
      >
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          className={styles.input}
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          step={step}
          placeholder={placeholder}
          onClick={onClick}
          onSelect={onSelect}
          ref={ref}
          aria-label={ariaLabel}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        {error && <p className={styles.error}>{error}</p>}
        {showPasswordIcon && (
          <div className={styles.icon} onClick={changeIcon}>
            <img src={icon ? EyeNo : EyeYes} alt={passwordIcon} />
          </div>
        )}
      </div>
    );
  }
);

export default Input;
