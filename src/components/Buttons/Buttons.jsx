import React, { useContext } from "react";

// internal imports
import style from "./Buttons.module.css";
import { themeContext } from "../../Theme";

const Buttons = ({ btnName, handleClick, className }) => {
  const {theme} = useContext(themeContext);
  return (
    <div className={ className ? className : style.box}>
      <button
        className={`${style.button} ${theme ==='light-mode' ? (style.lightMode) : ""}`}
        onClick={() => handleClick()}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Buttons;
