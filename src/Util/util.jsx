import React from "react";

export let utils = {
  passwordCheck: "As senhas não conferem",
  name: "Preencha o nome.",
};

export const types = {
  email: {
    regex:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: "Preencha um email válido.",
  },
  number: {
    regex: /^\d+|\d+\,\d$/,
    message: "Coloque um número válido.",
  },
  date: {
    regex: /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/,
    message: "Escolha uma data.",
  },
  password: {
    message: "A senha precisa ter pelo menos 6 caracteres",
  },
  passwordLogin: {
    message: "Insira sua senha",
  },
  name: {
    message: "Preencha seu nome.",
  },
  confirm: {
    message: "As senhas não conferem.",
  },
  calendar: {
    message: "Escolha uma data.",
  },
};

export const Utils = (fieldType) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);

  function onBlur({ currentTarget }) {
    if (fieldType === "password") {
      localStorage.setItem("password", "");
      if (currentTarget.value.length < 6) {
        setError(types[fieldType].message);
        return;
      } else {
        localStorage.setItem("password", currentTarget.value);
      }
    }

    if (fieldType === "confirm") {
      let pass = localStorage.getItem("password");
      currentTarget.value === pass
        ? setError(null)
        : setError(types[fieldType].message);
      return;
    }
    if (fieldType === "calendar") {
      currentTarget.value.length === 0
        ? setError(types[fieldType].message)
        : setError(null);
      return;
    }
    if (currentTarget.value.length === 0) {
      setError("Preencha um valor");
      return;
    }
    if (fieldType === "dosage" && currentTarget.value === "0") {
      setError("Escolha um valor");
      return;
    }
    if (
      fieldType === "email" &&
      !types[fieldType].regex.test(currentTarget.value)
    ) {
      setError(types[fieldType].message);
      return;
    }
  }

  function setValueForDosage() {
    setValue("");
    setError(null);
  }

  function onChange({ target }) {
    const toUpper = fieldType === "medication" || fieldType === "indication";
    const elementName = target.attributes.label;
    const inputValue = target.value === "" || target.value === "Hora atual";
    setError(false);
    setValue(toUpper ? target.value.toUpperCase() : target.value);
    if (elementName && elementName.nodeValue === "Horas *" && inputValue) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function setDisabledState(value) {
    if ((value === "Hora atual" || value === "") && hours) {
      setDisabled(true);
      return true;
    } else {
      setDisabled(false);
      return false;
    }
  }

  function setTime() {
    const today = new Date();
    var hours = today.getHours();

    var formattedHour = Number((hours < 10 ? "0" : "") + hours);

    let period = "";
    if (formattedHour > 6 && formattedHour <= 12) {
      period = "dia";
    } else if (formattedHour > 12 && formattedHour <= 18) {
      period = "tarde";
    } else if (formattedHour > 0 && formattedHour <= 6) {
      period = "madrugada";
    } else {
      period = "noite";
    }
    return period;
  }

  function fillFields(medication) {}

  return {
    error,
    onBlur,
    onChange,
    value,
    setValueForDosage,
    setDisabledState: () => setDisabledState(value),
    disabled,
    message: () => setTime(),
    fillFields,
  };
};
