import React, { createContext } from "react";

export const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [createUserSuccess, setCreateUserSuccess] = React.useState(false);

  const toggleSuccess = () => {
    setCreateUserSuccess(createUserSuccess === false ? true : false);
  };

  return (
    <SuccessContext.Provider value={{ createUserSuccess, toggleSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};
