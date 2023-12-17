import React from "react";
import styles from "./AddEditMedication.module.css";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import Dropdown from "../../Elements/Dropdown/Dropdown";
import Calendar from "../../Elements/Calendar/Calendar";
import { Utils, utils } from "../../Util/util";
import { useAuthValue } from "../../context/AuthContext";
import generateProcessedMedicationObj from "../../Hooks/generateProcessedMedicationObj";
import { useInsertMedication } from "../../Hooks/useInsertMedication";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateMedication } from "../../Hooks/useUpdateMedication";
import Checked from "../../assets/checkbox-checked.png";

const AddEditMedication = () => {
  const [hoursArrList, setHoursArrList] = React.useState([]);
  const [step, setStep] = React.useState("1");
  const [checked, setChecked] = React.useState(false);
  const [medId, setMedId] = React.useState("");
  const [isCreate, setIsCreate] = React.useState(true);
  const { insertMedication, response } = useInsertMedication("medications");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateMedication, response: updateResponse } =
    useUpdateMedication("medications");
  const medicationData = location.state;
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
    if (medicationData === null) {
      setIsCreate(true);
    } else if (medicationData && !medicationData.isCreate) {
      setIsCreate(false);
      fillFieldsToEdit(medicationData);
    } else setIsCreate(true);
  }, []);

  function fillFieldsToEdit(data) {
    setMedId(data.medication.id);
    const medItems = data.medication.medicationData;
    medication.fillFields(medItems.medication);
    indication.fillFields(medItems.indication);
    dosage.fillFields(medItems.dosage);
    dosageType.fillFields(dosageType.extractS(medItems.dosageType));
    if (medItems.amountOfDays === "0") {
      setChecked(true);
    } else {
      setChecked(false);
      amountOfDays.fillFields(medItems.amountOfDays);
    }
    space.fillFields(space.extractHourFromMedicationData(medItems.space));
    hours.fillFields(medItems.listOfHours[0].split(":")[0]);
    minutes.fillFields(medItems.listOfHours[0].split(":")[1]);
    calendar.fillFields(calendar.formatDateToEdit(medItems.start));
  }

  React.useEffect(() => {
    let arr = ["", "Hora atual"];
    for (let i = 0; i <= 23; i++) {
      arr.push(i.toString());
    }
    setHoursArrList(arr);
  }, []);

  React.useEffect(() => {
    if (checked) {
      amountOfDays.fillFields("0");
      amountOfDays.setError(null);
    } else {
      amountOfDays.value === "0" ? amountOfDays.fillFields("") : null;
    }
  }, [checked]);

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
      (minutes.value || hours.disabled)
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
      const medicationData = generateProcessedMedicationObj({ ...obj });
      if (isCreate) {
        insertMedication({
          medicationData,
          uid: user.uid,
          createdBy: user.displayName,
        });
      } else {
        const obj = {
          medicationData,
        };
        obj.uid = user.uid;
        obj.createdBy = user.displayName;
        updateMedication(medId, obj);
      }

      navigate("/table");
    } else {
      if (medication.value.length === 0) medication.checkFormOnSubmit();
      if (indication.value.length === 0) indication.checkFormOnSubmit();
      if (dosage.value.length === 0) dosage.checkFormOnSubmit();
      if (dosageType.value.length === 0) dosageType.checkFormOnSubmit();
      if (calendar.value.length === 0) calendar.checkFormOnSubmit();
      if (amountOfDays.value.length === 0 && !checked)
        amountOfDays.checkFormOnSubmit();
      if (space.value.length === 0) space.checkFormOnSubmit();
      if (hours.value.length === 0) hours.checkFormOnSubmit();
      if (minutes.value.length === 0) minutes.checkFormOnSubmit();
    }
  }

  function getStep() {
    if (dosageType.value === "comprimido" || dosageType.value === "dose")
      setStep("0.5");
    else setStep("1");
  }

  function toggleCheckbox() {
    checked ? setChecked(false) : setChecked(true);
  }

  return (
    <section className={`${styles.tabWrapper} container`}>
      {isCreate ? (
        <h1 className={styles.h1}>Insira os dados do seu medicamento.</h1>
      ) : (
        <h1 className={styles.h1}>Atualize os dados do seu medicamento.</h1>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        {medId && (
          <div className={styles.medId}>
            <p>
              Id: <span>{medId}</span>
            </p>
          </div>
        )}
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
                step={step}
                onSelect={getStep}
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
              {checked ? (
                <Input
                  label="Nº de dias *"
                  name="amountOfDays"
                  type="number"
                  {...amountOfDays}
                  disabled
                />
              ) : (
                <Input
                  label="Nº de dias *"
                  name="amountOfDays"
                  type="number"
                  min="1"
                  {...amountOfDays}
                />
              )}
            </div>
            <div className={styles.checkboxWrapper}>
              <div className={styles.btnCheckbox} onClick={toggleCheckbox}>
                {checked ? (
                  <img
                    src={Checked}
                    alt="checked"
                    aria-label="Uso contínuo? marcado"
                  />
                ) : (
                  <div
                    className={styles.checkbox}
                    aria-label="Uso contínuo? desmarcado"
                  ></div>
                )}
              </div>
              <p>Uso contínuo?</p>
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

          {hours.disabled ? (
            <div className={styles.hoursMinutes}>
              <div className={styles.hoursAlone}>
                <Dropdown
                  label="Horas *"
                  optionsList={hoursArrList}
                  name="hours"
                  type="text"
                  {...hours}
                />
              </div>
            </div>
          ) : (
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
          )}
        </div>

        <div className={styles.btnWrapper}>
          {response.loading || updateResponse.loading ? (
            isCreate ? (
              <Button disabled>Cadastrando...</Button>
            ) : (
              <Button>Atualizando</Button>
            )
          ) : isCreate ? (
            <Button>Cadastrar Medicamento</Button>
          ) : (
            <Button>Atualizar Medicamento</Button>
          )}
        </div>
        {response.error && <p className={styles.error}>{response.error}</p>}
      </form>
    </section>
  );
};

export default AddEditMedication;
