import React from "react";
import styles from "./Calendar.module.css";

const Calendar = ({ label, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type="date"
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // min={today}
      ></input>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Calendar;