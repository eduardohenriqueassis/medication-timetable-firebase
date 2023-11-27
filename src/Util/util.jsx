import React from "react";

export let utils = {
  passwordCheck: "As senhas não conferem",
  name: "Preencha o nome.",
  email: "Preencha o email",
  password: "A senha precisa ter pelo menos 6 caracteres",
  passwordLogin: "Insira sua senha",
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
};

export const checkInputValidity = (e, errType) => {
  const [error, setError] = React.useState(null);
  const [errorType, setErrType] = React.useState(null);
  const value = e ? e.target.value : null;
  if (errType === "email" && !types.email.regex.test(value)) {
    setError(types.email.message);
    setErrType(errType);
    return;
  } else {
    setError("");
    setErrType("");
  }
  if (value && value.length > 3) {
    setError(null);
  } else {
    setError(utils[errType]);
    setErrType(errType);
  }

  return { error, errorType };
};
