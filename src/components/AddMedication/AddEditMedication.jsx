import React from "react";
import styles from "./AddEditMedication.module.css";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import Dropdown from "../../Elements/Dropdown/Dropdown";
import Calendar from "../../Elements/Calendar/Calendar";

const AddEditMedication = () => {
  const [hoursArrList, setHoursArrList] = React.useState([]);
  React.useEffect(() => {
    let arr = ["", "Hora atual"];
    for (let i = 0; i <= 23; i++) {
      arr.push(i.toString());
    }
    setHoursArrList(arr);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className={`${styles.tabWrapper} container`}>
      <h1 className={styles.h1}>Insira os dados do seu medicamento.</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.medicationIndicationWrapper}>
          <div className={styles.medicationWrapper}>
            <Input label="Medicamento *" type="text" name="medication" />
          </div>

          <div className={styles.indicationWrapper}>
            <Input label="Indicação *" name="indication" type="text" />
          </div>
        </div>

        <div className={styles.dosageDateWrapper}>
          <div className={styles.dosageWrapper}>
            <div className={styles.dosageInputWrapper}>
              <Input label="Qtde *" name="dosage" type="number" />
            </div>
            <div className={styles.amountTypeWrapper}>
              <Dropdown
                label="Tipo de medida *"
                optionsList={["", "ml", "gota", "comprimido", "dose"]}
                type="text"
                name="dosage"
              />
            </div>
          </div>
          <div className={styles.startDaysAmountWrapper}>
            <div className={styles.dateWrapper}>
              <Calendar
                className={styles.inputDate}
                label="Início *"
                name="start"
                type="date"
              />
            </div>
            <div className={styles.daysWrapper}>
              <Input
                label="Nº de dias *"
                name="amountOfDays"
                type="number"
                min="1"
              />
            </div>
          </div>
        </div>
        <div className={styles.hoursSpaceWrapper}>
          <div className={styles.spaceWrapper}>
            <Dropdown
              label="h/h *"
              optionsList={["", "4h", "6h", "8h", "12h", "1/dia"]}
              name="space"
              type="text"
            />
          </div>

          <div className={styles.hoursMinutes}>
            <div className={styles.hours}>
              <Dropdown
                label="Horas *"
                optionsList={hoursArrList}
                name="hours"
                type="text"
              />
            </div>
            <div className={styles.minutes}>
              <Dropdown
                label="Min*"
                optionsList={["", "00", "15", "30", "45"]}
                name="minutes"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className={styles.btnWrapper}>
          <Button>Cadastrar</Button>
        </div>
      </form>
    </section>
  );
};

export default AddEditMedication;
