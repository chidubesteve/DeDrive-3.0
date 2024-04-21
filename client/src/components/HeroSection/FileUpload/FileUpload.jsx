import React, { useState, useRef, useContext } from "react";
import { Tooltip } from "react-tooltip";
import { LuUploadCloud } from "react-icons/lu";

// Internal imports
import style from "./FileUpload.module.css";
import { themeContext } from "../../../Theme";
import { Alert } from "../../ComponentIndex";

const FileUpload = ({ account, contract }) => {
  const { theme } = useContext(themeContext);
  const [file, setFile] = useState([]);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [cid, setCid] = useState();
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [alert, setAlert] = useState(null);

  const readFile = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile(file);
    };
    reader.onerror = () => {
      console.error("An error occurred when reading", file.name);
      setAlert(
        <Alert
          type="error"
          message={`An error occurred when reading ${file.name}. Kindly try again`}
        />
      );
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
        setAlert(
          <Alert
            type="warning"
            message={"Drag and drop supports only single file"}
          />
        );
        return;
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
    if (!showUploadButton) {
    // Make sure the target is not the upload button or its children
    if (!e.target.closest(`.${style.upload_button}`)) {
      inputRef.current.click();
    }
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
        const formData = new FormData();
        formData.append("file", file);
        // Send formData to backend server
        await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then(data => {
                throw new Error(data.message || "Oops, something went wrong! Kindly try again")
              });
            }
            return response.json()
          })
          .then((data) => {
            console.log("Parsed JSON data:", data);
            console.log("server result gotten");
            const imgHash = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
            setAlert(
              <Alert message={"File uploaded successfully!"} type={"success"} />
            );
            console.log(imgHash);
          })
          .catch((err) => {
            err.message === "Invalid file type!"
              ? (setAlert(
                  <Alert
                    message={
                      err.message +
                      " Supported file types are images, .pdf, .docx, .epub, .txt files"
                    }
                    type={"warning"}
                  />
                ))
              : (setAlert(<Alert message={err.message} type={"error"} />));
          });
    }
  };

  return (
    <>
      {alert}
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
          "Select or drag-and-drop your file or image here."
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
            accept=".pdf, .txt, .docx, image/*, .epub"
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
                  setAlert(<Alert message={ "Uploading, please wait..."} type={'info'}/>)
                }}
                className={style.upload_button}
              >
                Upload File
              </button>
            </div>
          </div>
        ) : (
          <LuUploadCloud className={style.upload_icon} />
        )}
      </div>
    </>
  );
};

export default FileUpload;
