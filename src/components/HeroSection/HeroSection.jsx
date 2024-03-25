import React, { useContext } from "react";

// internal imports
import style from "./HeroSection.module.css";
import { Buttons } from "../ComponentIndex";
import FileUpload from "./FileUpload/FileUpload";
import { themeContext } from "../../Theme";

const HeroSection = () => {
  const { theme } = useContext(themeContext);
  return (
    <div className={style.heroSection}>
      <div className={style.heroSection_box}>
        <div className={style.heroSection_box_left}>
          <div>
            <h1>
              Upload and <span className={style.underlined_1}>share</span>
              <span className={`${style.underlined_2}`}></span>
            </h1>
            <h1 className={style.h1Cont}>your files.</h1>
            <p>
              Your files are stored on the blockchain without the help of any
              third party.
              <br /> You can share and give access to your files through{" "}
              <a
                href="https://en.wikipedia.org/wiki/InterPlanetary_File_System"
                target="_blank"
              >
                IPFS
              </a>
            </p>
            <Buttons btnName="Watch Video  &#x25B6;" className={style.btn} />
          </div>
        </div>
        <div
          className={`${style.heroSection_box_right} ${
            theme === "light-mode" ? style.lightMode : ""
          }`}
        >
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
