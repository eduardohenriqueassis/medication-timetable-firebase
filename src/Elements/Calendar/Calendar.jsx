import React from "react";
import styles from "./Calendar.module.css";
import { useTheme } from "../../context/ThemeContext";

const Calendar = ({ label, name, value, onChange, error, onBlur, dark }) => {
  const { isDarkMode} = useTheme();
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${isDarkMode ? styles.dark : ''} ${styles.input}`}
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={() => {return false}}
      ></input>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Calendar;
