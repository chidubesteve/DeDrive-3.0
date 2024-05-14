import React, { useContext, useState, useEffect } from "react";

// internal imports
import style from "./HeroSection.module.css";
import { Buttons } from "../ComponentIndex";
import FileUpload from "./FileUpload/FileUpload";
import { themeContext } from "../../Theme";
import Display from "./Display/Display";

const HeroSection = ({ account, contract }) => {
  const { theme } = useContext(themeContext);
  const [uploadedData, setUploadedData] = useState([]);

  const handleFileUpload = (data) => {
    setUploadedData(data);
  };
  // Read from sessionStorage when the component mounts
  useEffect(() => {
    const sessionData = sessionStorage.getItem("uploadedData");
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        setUploadedData(parsedData);
      } catch (error) {
        console.error("Error parsing uploadedData from sessionStorage:", error);
        sessionStorage.removeItem("uploadedData");
        setUploadedData([]);
      }
    }
  }, []);

  // Save to sessionStorage whenever uploadedData changes
  useEffect(() => {
    sessionStorage.setItem("uploadedData", JSON.stringify(uploadedData));
    console.log("Uploaded data changed:");
  }, [uploadedData]);

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
                rel="noreferrer"
                title="What is IPFS?"
              >
                IPFS
              </a>
            </p>
            <Buttons
              btnName="Watch Video  &#x25B6;"
              className={style.btn}
              handleClick={() => {
                "https://www.youtube.com/watch?v=1vNdbMSd_WY";
              }}
            />
          </div>
        </div>
        <div
          className={`${style.heroSection_box_right} ${
            theme === "light-mode" ? style.lightMode : ""
          }`}
        >
          <FileUpload
            account={account}
            contract={contract}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
      <Display
        account={account}
        contract={contract}
        uploadedData={uploadedData}
      />
    </div>
  );
};

export default HeroSection;
