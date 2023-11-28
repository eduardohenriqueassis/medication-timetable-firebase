import React, { useRef } from "react";
import styles from "./AddEditMedication.module.css";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import Dropdown from "../../Elements/Dropdown/Dropdown";
import Calendar from "../../Elements/Calendar/Calendar";
import { Utils } from "../../Util/util";
import GenerateProcessedMedicationObj from "../../Hooks/GenerateProcessedMedicationObj";

const AddEditMedication = () => {
  const [hoursArrList, setHoursArrList] = React.useState([]);
  const medication = Utils("medication");
  const indication = Utils("indication");
  const dosage = Utils("dosage");
  const dosageType = Utils("dosageType");
  const calendar = Utils("calendar");
  const amountOfDays = Utils();
  const space = Utils();
  const hours = Utils();
  const minutes = Utils();

  React.useEffect(() => {
    let arr = ["", "Hora atual"];
    for (let i = 0; i <= 23; i++) {
      arr.push(i.toString());
    }
    setHoursArrList(arr);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      medication.value &&
      indication.value &&
      dosage.value &&
      Number(dosage.value) > 0 &&
      dosageType.value &&
      calendar.value &&
      amountOfDays.value &&
      space.value &&
      hours.value &&
      minutes.value
    ) {
      const obj = {
        medication,
        indication,
        dosage,
        dosageType,
        calendar,
        amountOfDays,
        space,
        hours,
        minutes,
      };
      const medicationData = GenerateProcessedMedicationObj({ ...obj });
    } else {
      alert("não");
    }
  }
  function setAlert() {
    if (dosageType.value.length === 0) {
      dosage.setValueForDosage();
      alert("Por favor escolha um tipo de medida primeiro.");
      return;
    }
  }

  return (
    <section className={`${styles.tabWrapper} container`}>
      <h1 className={styles.h1}>Insira os dados do seu medicamento.</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.medicationIndicationWrapper}>
          <div className={styles.medicationWrapper}>
            <Input
              label="Medicamento *"
              type="text"
              name="medication"
              {...medication}
            />
          </div>

          <div className={styles.indicationWrapper}>
            <Input
              label="Indicação *"
              name="indication"
              type="text"
              {...indication}
            />
          </div>
        </div>

        <div className={styles.dosageDateWrapper}>
          <div className={styles.dosageWrapper}>
            <div className={styles.dosageInputWrapper}>
              <Input
                label="Qtde *"
                name="dosage"
                type="number"
                min="0"
                {...dosage}
                step={localStorage.getItem("step")}
                onClick={setAlert}
              />
            </div>
            <div className={styles.amountTypeWrapper}>
              <Dropdown
                label="Tipo de medida *"
                optionsList={["", "ml", "gota", "comprimido", "dose"]}
                type="text"
                name="dosageType"
                {...dosageType}
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
                {...calendar}
              />
            </div>
            <div className={styles.daysWrapper}>
              <Input
                label="Nº de dias *"
                name="amountOfDays"
                type="number"
                min="1"
                {...amountOfDays}
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
              {...space}
            />
          </div>

          <div className={styles.hoursMinutes}>
            <div className={styles.hours}>
              <Dropdown
                label="Horas *"
                optionsList={hoursArrList}
                name="hours"
                type="text"
                {...hours}
              />
            </div>
            <div className={styles.minutes}>
              <Dropdown
                label="Min*"
                optionsList={["", "00", "15", "30", "45"]}
                name="minutes"
                type="text"
                {...minutes}
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
