import React, { useState, useRef, useContext } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { LuUploadCloud } from "react-icons/lu";

// Internal imports
import style from "./FileUpload.module.css";
import { themeContext } from "../../../Theme";

const FileUpload = ({ account, contract }) => {
  const { theme } = useContext(themeContext);
  const [file, setFile] = useState([]);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [cid, setCid] = useState();
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileLimit, setFileLimit] = useState(false);

  const MAX_COUNT = 4;
  let limitExceeded = false;
  const readFile = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile(file);
    };
    reader.onerror = () => {
      console.error("An error occurred when reading", file.name);
    };
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      if (droppedFiles.length === 1) {
        const droppedFile = event.dataTransfer.files[0];
        readFile(droppedFile);
        setShowUploadButton(true);
        setFileName("Dropped file: " + droppedFile.name);
        console.log(droppedFile.name);
        console.log(droppedFile);
      } else if (droppedFiles.length > 1) {
        alert("Drag and drop supports only single file");
      }
    }
  };

  const handleDragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(true);
  };

  const handleClick = (e) => {
    // Make sure the target is not the upload button or its children
    if (!e.target.closest(`.${style.upload_button}`)) {
      inputRef.current.click();
    }
  };

  const handleFileSelect = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;

    const selectedFile = selectedFiles[0];
    if (selectedFile) {
      readFile(selectedFile);
      setFileName("Selected: " + selectedFile.name);
      setShowUploadButton(true);
      console.log(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      console.log(file);
      try {
        const formData = new FormData();
        formData.append("file", file);
        // Send formData to backend server
        await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,

        }).then(response => {
          response.json()
        }).then(data => {
          console.log(data)
          console.log("server result gotten");
        });     

      } catch (error) {
        console.log(error);
        alert(error.message || "Oops an error occurred. kindly try again");
      }
    }
  };

  return (
    <div
      className={`${style.file_upload_div} ${
        theme === "light-mode" ? style.lightMode : ""
      } dropzone ${isDragging ? style.dragging : ""}`}
      id="file_upload_div"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      data-tooltip-id="my-tooltip"
      data-tooltip-content={
        "Select or drag-and-drop your files or images here."
      }
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

      <form action="/upload" encType="multipart/form-data">
        <input
          type="file"
          ref={inputRef}
          name="file"
          id="select_file_input"
          accept="*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </form>

      {showUploadButton ? (
        <div className={style.showUploadButtonContainer}>
          <p>{fileName}</p>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(e);
              }}
              className={style.upload_button}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <LuUploadCloud className={style.upload_icon} />
      )}
    </div>
  );
};

export default FileUpload;
