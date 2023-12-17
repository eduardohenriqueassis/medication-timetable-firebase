// themeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(true);
  }, []);

  const toggleTheme = (e) => {
    if (e) {
      e.preventDefault();
      e.target.blur();
    }
    setIsDarkMode((prevMode) => !prevMode);
    updateCssVariables(isDarkMode);
  };

  const updateCssVariables = (darkMode) => {
    const root = document.documentElement;
    if (!darkMode) {
      root.style.setProperty("--body-background", "#fff");
      root.style.setProperty("--gray-bbb", "#bbb");
      root.style.setProperty("--gray-ccc", "#ccc");
      root.style.setProperty("--gray-ddd", "#ddd");
      root.style.setProperty("--gray-eee", "#eee");
      root.style.setProperty("--gray-333", "#333");
      root.style.setProperty("--gray-777", "#777");
      root.style.setProperty("--gray-blue", "#4a6070");
      root.style.setProperty("--dark-blue", "#001f36");
      root.style.setProperty("--main-blue", "#1468a5");
      root.style.setProperty("--middle-blue", "#8cd3f1");
      root.style.setProperty("--hover-blue", "#004374");
      root.style.setProperty("--middle-blue", "#001423");
      root.style.setProperty("--light-blue", "#e9f1f5");
      root.style.setProperty("--super-light-blue", "#f0f7fc");
      root.style.setProperty("--text-color", "#001423");
      root.style.setProperty("--link", "#004374");
      root.style.setProperty("--active-border", "#1468a5");
      root.style.setProperty("--text-error", "#f31");
      root.style.setProperty("--logo", "#1468a5");
      root.style.setProperty("--hover-green", "#1c965d");
      // inputs --------------
      root.style.setProperty("--input-txt", "#777");
      root.style.setProperty("--input-placeholder", "#777");
      root.style.setProperty("--input-border", "#1468a5");
      root.style.setProperty("--input-background", "#eee");
      root.style.setProperty("--input-focus-background", "#fff");
      root.style.setProperty("--input-focus-border", "#004374");
      root.style.setProperty("--input-disabled-border", "#bbb");
      root.style.setProperty("--input-disabled-text-color", "#eee");
      // btn -------------
      root.style.setProperty("--btn-background", "#1468a5");
      root.style.setProperty("--btn-text-hover", "#eee");
      root.style.setProperty("--btn-background-hover", "#004374");
      root.style.setProperty("--btn-disabled", "#bbb");
      root.style.setProperty(
        "--gradient-180",
        "linear-gradient(180deg, rgba(238, 238, 238, 1) 0%,rgba(238, 238, 238, 1) 32%,rgba(221, 221, 221, 1) 98%,rgba(238, 238, 238, 1) 100% )"
      );
      root.style.setProperty(
        "--gradient-360",
        "linear-gradient(360deg,rgba(238, 238, 238, 1) 0%, rgba(238, 238, 238, 1) 32%, rgba(221, 221, 221, 1) 98%, rgba(238, 238, 238, 1) 100% );"
      );
    } else {
      root.style.setProperty("--body-background", "#fff");
      root.style.setProperty("--gray-bbb", "#bbb");
      root.style.setProperty("--gray-ccc", "#ccc");
      root.style.setProperty("--gray-ddd", "#ddd");
      root.style.setProperty("--gray-eee", "#eee");
      root.style.setProperty("--gray-333", "#333");
      root.style.setProperty("--gray-777", "#777");
      root.style.setProperty("--gray-blue", "#4a6070");
      root.style.setProperty("--dark-blue", "#001f36");
      root.style.setProperty("--main-blue", "#1468a5");
      root.style.setProperty("--middle-blue", "#8cd3f1");
      root.style.setProperty("--hover-blue", "#004374");
      root.style.setProperty("--middle-blue", "#001423");
      root.style.setProperty("--light-blue", "#e9f1f5");
      root.style.setProperty("--super-light-blue", "#f0f7fc");
      root.style.setProperty("--text-color", "#001423");
      root.style.setProperty("--link", "#004374");
      root.style.setProperty("--active-border", "#1468a5");
      root.style.setProperty("--text-error", "#f31");
      root.style.setProperty("--logo", "#1468a5");
      root.style.setProperty("--hover-green", "#1c965d");
      // inputs --------------
      root.style.setProperty("--input-txt", "#777");
      root.style.setProperty("--input-placeholder", "#777");
      root.style.setProperty("--input-border", "#1468a5");
      root.style.setProperty("--input-background", "#eee");
      root.style.setProperty("--input-focus-background", "#fff");
      root.style.setProperty("--input-focus-border", "#004374");
      root.style.setProperty("--input-disabled-border", "#bbb");
      root.style.setProperty("--input-disabled-text-color", "#eee");
      // btn -------------
      root.style.setProperty("--btn-background", "#1468a5");
      root.style.setProperty("--btn-text-hover", "#eee");
      root.style.setProperty("--btn-background-hover", "#004374");
      root.style.setProperty("--btn-disabled", "#bbb");
      root.style.setProperty(
        "--gradient-180",
        "linear-gradient(180deg, rgba(238, 238, 238, 1) 0%,rgba(238, 238, 238, 1) 32%,rgba(221, 221, 221, 1) 98%,rgba(238, 238, 238, 1) 100% )"
      );
      root.style.setProperty(
        "--gradient-360",
        "linear-gradient(360deg,rgba(238, 238, 238, 1) 0%, rgba(238, 238, 238, 1) 32%, rgba(221, 221, 221, 1) 98%, rgba(238, 238, 238, 1) 100% );"
      );
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
