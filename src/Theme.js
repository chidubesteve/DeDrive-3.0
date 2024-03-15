import React, { useState, createContext, useLayoutEffect } from "react";

const themeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    // default theme for the app is dark
    localStorage.setItem("theme", "dark-mode");
    return "dark-mode";
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark-mode") {
      setTheme("light-mode");
    } else {
      setTheme("dark-mode");
    }
  }

  // used to ensure the persistence of the theme preference across sessions by updating the localStorage.
  useLayoutEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light-mode") {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export { themeContext, ThemeProvider };
