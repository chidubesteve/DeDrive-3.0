import React, { useContext } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsShare } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";

// INTERNAL IMPORTS
import style from "./Boxes.module.css";
import { themeContext } from "../../../Theme";

const Boxes = ({ iconName, number }) => {
  let IconComponent = null;
  const { theme } = useContext(themeContext);

  switch (iconName) {
    case "LuUploadCloud":
      IconComponent = LuUploadCloud;
      break;
    case "BsShare":
      IconComponent = BsShare;
      break;
    case "TfiReload":
      IconComponent = TfiReload;
      break;
    default:
      "Icons not found! :(";
      break;
  }
  return (
    <div
      className={`${style.box} ${
        theme === "light-mode" ? style.lightMode : ""
      }`}
    >
      {IconComponent && (
        <IconComponent
          className={`${style.icon} ${
            theme === "light-mode" ? style.lightMode : ""
          }`}
        />
      )}
      <div className={style.number_box}>
        <p>{number}</p>
      </div>
    </div>
  );
};

export default Boxes;
