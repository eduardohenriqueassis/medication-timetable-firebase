import React from "react";
import TableHead from "../TableHead/TableHead";
import styles from "./MedicationTable.module.css";
import { useDeleteMedication } from "../../Hooks/useDeleteMedication";
import { useNavigate } from "react-router-dom";

const MedicationTable = ({ data }) => {
  const [rows, setRows] = React.useState([]);
  const { deleteMedication } = useDeleteMedication("medications");
  const navigate = useNavigate();

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
                onClick={() => handleEdit(medication)}
              >
                <img src="/src/Assets/edit.png" alt="edit" />
              </button>
              <button
                className={`${styles.delete} ${styles.btn}`}
                id={`delete-${medication.uid}`}
                onClick={() => handleDelete(medication)}
              >
                <img src="/src/Assets/delete.png" alt="edit" />
              </button>
            </div>
          </li>
        </ul>
      ))
    );
  }
  function handleEdit(medication) {
    navigate("/add-edit", { state: { medication } });
  }

  function handleDelete({ id }) {
    deleteMedication(id);
  }
  return (
    <div className={styles.medicationTableWrapper}>
      <TableHead />
      {data && data.length > 0 ? (
        <div
          className={`${styles.rowsWrapper} ${
            data && data.length === 1 ? styles.singleMedication : ""
          }`}
        >
          {rows}
        </div>
      ) : (
        <div className={styles.noData}>
          <p>Você ainda não tem medicamentos cadastrados.</p>
        </div>
      )}
    </div>
  );
};

export default MedicationTable;
