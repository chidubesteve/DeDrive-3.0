import React, { useContext } from "react";
import styles from "./globals.css";
import { themeContext } from "./Theme";

const App = () => {
  const theme = useContext(themeContext);
  return <div className={`App ${theme}`}> App</div>;
};

export default App;
