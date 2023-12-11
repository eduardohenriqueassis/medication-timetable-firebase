import React from "react";
import styles from "./Table.module.css";
import { useFetchMedications } from "../../Hooks/useFetchMedications";
import MedicationTable from "../MedicationTable/MedicationTable";
import Button from "../../Elements/Button/Button";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [query, setQuery] = React.useState("");
  const { medications, loading } = useFetchMedications("medications");
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    const isCreate = true;
    navigate("/add-edit", { state: { isCreate: isCreate } });
  }
  if (loading) {
    return <p className="pLoading">Carregando...</p>;
  }
  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          Tabela com os dias e horários dos seus medicamentos.
        </h1>
        <div className={styles.btnWrapper}>
          <Button onClick={handleClick}>Cadastrar Medicamento</Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <MedicationTable data={medications} />
      </div>
    </div>
  );
};

export default Table;
