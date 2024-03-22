import React, { useState, useRef, useContext } from "react";
import { Tooltip } from "react-tooltip";
import { LuUploadCloud } from "react-icons/lu";

// Internal imports
import style from "./FileUpload.module.css";
import { themeContext } from "../../../Theme";

const FileUpload = () => {
  const {theme} = useContext(themeContext);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFiles([...droppedFiles]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles([selectedFile]);
    }
  };

  return (
    <div
      className={`${style.file_upload_div} ${
        theme === "light-mode" ? style.lightMode : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      data-tooltip-id="my-tooltip"
      data-tooltip-content={"Click or drag-and-drop your files or images here."}
      data-tooltip-place="bottom"
      data-tooltip-delay-show={400}
      data-tooltip-delay-hide={400}
    >
      <Tooltip
        id="my-tooltip"
        className={`${style.toolTip} ${
          theme === "light-mode" ? style.lightMode : ""
        }`}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        accept="image/*, text/plain"
      />
      <LuUploadCloud className={style.upload_icon} />
    </div>
  );
};

export default FileUpload;
