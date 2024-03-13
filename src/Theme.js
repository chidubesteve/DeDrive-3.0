import React, { useState, createContext, useEffect } from "react";

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

const themeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark-mode") {
      setTheme("light-mode");
    } else {
      setTheme("dark-mode");
    }
  }

    // used to ensure the persistence of the theme preference across sessions by updating the localStorage.
  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setTheme("theme", theme);
    };

    refreshTheme();
  }, [theme]);

    return (
        <themeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
      </themeContext.Provider>
  )
};

export  {themeContext, themeProvider};
