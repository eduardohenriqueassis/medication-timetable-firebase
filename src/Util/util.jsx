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
};

export const Utils = (fieldType) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function onBlur({ currentTarget }) {
    const message = types[fieldType].message;
    if (currentTarget.value.length === 0) setError(message);
    if (
      fieldType === "email" &&
      !types[fieldType].regex.test(currentTarget.value)
    ) {
      setError(types[fieldType].message);
      return;
    }
  }

  function onChange({ target }) {
    setError(false);
    setValue(target.value);
  }

  return { error, onBlur, onChange, value };
};
