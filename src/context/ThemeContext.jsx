// themeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    updateCssVariables(isDarkMode);
  };

  const updateCssVariables = (darkMode) => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--body-background", "#001423");
      // Outras variáveis específicas para o modo escuro
    } else {
      root.style.setProperty("--body-background", "#fff");
      // Restaurar outras variáveis para o modo claro, se necessário
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
