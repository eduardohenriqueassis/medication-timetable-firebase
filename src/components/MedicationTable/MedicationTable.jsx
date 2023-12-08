import React from "react";
import TableHead from "../TableHead/TableHead";
import styles from "./MedicationTable.module.css";

const MedicationTable = ({ data }) => {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data) composeArrayRows();
  }, [data]);

  const composeArrayRows = () => {
    let arr = [];
    for (let element of data) arr.push(element);
    composeRows(arr);
  };
  function composeRows(arr) {
    setRows(
      arr.map((medication) => (
        <ul className={styles.row} key={medication.id}>
          <li className={styles.id}>{medication.uid}</li>
          <li className={`${styles.cell} ${styles.column3}`}>
            <p className={styles.info}>Medicamento: </p>{" "}
            {medication.medicationData.medication}
          </li>
          <li className={`${styles.cell} ${styles.column0}`}>
            <p className={styles.info}>Dosagem: </p>
            {medication.medicationData.dosage}{" "}
            {medication.medicationData.dosageType}
          </li>
          <li className={`${styles.cell} ${styles.column0}`}>
            <p className={styles.info}>Indicação: </p>
            {medication.medicationData.indication}
          </li>
          <li className={`${styles.cell} ${styles.column1}`}>
            <p className={styles.info}>Espaço: </p>
            {medication.medicationData.space}
          </li>
          <li className={`${styles.cell} ${styles.column2}`}>
            <p className={styles.info}>Início: </p>
            {medication.medicationData.start}
          </li>
          <li className={`${styles.cell} ${styles.column2}`}>
            <p className={styles.info}>Fim: </p>
            {medication.medicationData.end}
          </li>
          <li className={styles.liHours}>
            <ul className={styles.ulHours}>
              {medication.medicationData.listOfHours.map((hour, index) => (
                <li key={index} className={`${styles.cell}`}>
                  <p className={styles.info}>Hora-{index + 1}: </p>
                  {hour}
                </li>
              ))}
            </ul>
          </li>
          <li className={`${styles.cell} ${styles.lastCell} ${styles.column1}`}>
            <div className={styles.iconsWrapper}>
              <button
                className={`${styles.edit} ${styles.btn}`}
                id={`edit-${medication.uid}`}
                onClick={handleEdit}
              >
                <img src="/src/Assets/edit.png" alt="edit" />
              </button>
              <button
                className={`${styles.delete} ${styles.btn}`}
                id={`delete-${medication.uid}`}
                onClick={handleDelete}
              >
                <img src="/src/Assets/delete.png" alt="edit" />
              </button>
            </div>
          </li>
        </ul>
      ))
    );
  }
  function handleEdit(event) {
    // event.preventDefault();
    // const id = event.currentTarget.id;
    // const medicationId = id.split("-");
    // getMedicationById(medicationId[1]);
  }

  function handleDelete(event) {
    // const id = event.currentTarget.id;
    // const medicationId = id.split("-")[1];
    // deleteMedication(medicationId);
  }
  return (
    <div className={styles.medicationTableWrapper}>
      <TableHead />
      <div className={styles.rowsWrapper}>{rows}</div>
    </div>
  );
};

export default MedicationTable;
