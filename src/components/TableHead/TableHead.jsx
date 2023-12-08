import React from "react";
import styles from "./TableHead.module.css";

const TableHead = () => {
  return (
    <ul className={styles.tableHead}>
      <li className={`${styles.cell} ${styles.column3}`}>Medicamento</li>
      <li className={`${styles.cell} ${styles.column0}`}>Dosagem</li>
      <li className={`${styles.cell} ${styles.column0}`}>Indicação</li>
      <li className={`${styles.cell} ${styles.column1}`}>Espaço</li>
      <li className={`${styles.cell} ${styles.column2}`}>Início</li>
      <li className={`${styles.cell} ${styles.column2}`}>Fim</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.column4}`}>Hora</li>
      <li className={`${styles.cell} ${styles.action} ${styles.column1}`}>
        <p>Ações</p>
      </li>
    </ul>
  );
};

export default TableHead;
