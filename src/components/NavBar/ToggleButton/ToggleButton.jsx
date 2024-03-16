import React, { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

// internal import
import styles from "./ToggleButton.module.css";
import {themeContext} from "../../../Theme";

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  return (
    <div className={styles.button_box}>
      {theme === "dark-mode" ? (
        <MdLightMode
          className={styles.dark_mode_icon}
          onClick={toggleTheme}
          title="switch to dark mode"
        />
      ) : (
        <MdDarkMode
          className={styles.light_mode_icon}
          onClick={toggleTheme}
          title="switch to light mode"
        />
      )}
    </div>
  );
};

export default ToggleButton;
