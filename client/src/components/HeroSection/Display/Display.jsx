import React, { useState, useContext } from "react";

//internal imports
import style from "./Display.module.css";
import { Buttons } from "../../ComponentIndex";
import { Alert } from "../../ComponentIndex";
import { pdf, word, txt, epub, defFile, img } from "../../../images/index";
import {truncateAddress} from '../../NavBar/NavBar';
import { themeContext } from "../../../Theme";

const Display = ({ account, contract, uploadedData }) => {
  const [alert, setAlert] = useState(null);
  const { theme } = useContext(themeContext);
  const [files, setFiles] = useState("");

  
  const getFiles = async () => {
    let dataArray;
    const enteredAddress = document.getElementById("getFile").value;
    try {
      if (enteredAddress) {
        dataArray = await contract.display(enteredAddress);
        console.log(uploadedData);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (err) {
      setAlert(<Alert message={err.message} type={"error"} />);
    }
    console.log(dataArray);

    try {
        const isEmpty = Object.keys(dataArray).length === 0;
      if (!isEmpty) {
        const files = dataArray.map((url, i) => {
          const hash = url.substring(url.lastIndexOf("/") + 1); // extract hash
          const matchedData = uploadedData.find((item) => item.IpfsHash === hash);
  
          let fileTypeIcon;
          let fileName;
          let timestamp;
  
         const  truncatedAddress = truncateAddress(hash)
  
          if (matchedData) {
            fileName = matchedData.FileName;
            timestamp = new Date(matchedData.Timestamp).toLocaleString();
  
            const fileType = matchedData.MimeType;
            if (fileType.startsWith("image/")) {
              fileTypeIcon = <img src={img} alt="" />;
            } else if (fileType === "application/pdf") {
              fileTypeIcon = <img src={pdf} alt="PDF file" />;
            } else if (
              fileType === "application/msword" ||
              fileType ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
              fileTypeIcon = <img src={word} alt="Word file" />;
            } else if (fileType === "text/plain") {
              fileTypeIcon = <img src={txt} alt="Text file" />;
            } else if (fileType === "application/epub+zip") {
              fileTypeIcon = <img src={epub} alt="EPUB file" />;
            } else {
              fileTypeIcon = <img src={defFile} alt="Default" />;
            }
          } else {
            fileName = "Unknown";
            timestamp = "Unknown";
            fileTypeIcon = <img src={defFile} alt="Default" />;
          }         

        return (
          <div className={style.card} key={i}>
            <a href={url} target="_blank" rel="noreferrer noopener">
              {fileTypeIcon}
            </a>
            <div className={style.details_container}>
              <h4>
                <b>{fileName}</b>
              </h4>
              <p>CID: {truncatedAddress}</p>
              <p>{timestamp}</p>
            </div>
          </div>
        );
      });
      setFiles(files);
    } else {
      setAlert(<Alert message={"No files to display"} type={"info"} />);
    }
    } catch (e) {
      setAlert(<Alert message={"No files to display"} type={"info"} />);
      console.log(e)
    }
  };
  const handleClick = account.length > 0 ? getFiles : () => {};
  return (
    <>
      {alert}
      <div className={style.display_container}>
        <div className={style.image_list}>{files}</div>
        <div className={style.input_container}>
          <input
            type="text"
            name="getFile"
            id="getFile"
            className={`${style.address} ${theme === "light-mode" ? style.lightMode : ""
          }`}
            placeholder="Enter Address"
            disabled={!account}
          />
          <Buttons btnName="Get Files" handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default Display;
