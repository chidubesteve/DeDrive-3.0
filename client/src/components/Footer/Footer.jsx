import React from "react";

// internal imports
import style from "./Footer.module.css";
import Boxes from "./Boxes/Boxes";

const Footer = () => {
  return (
    <div className={style.box}>
      <h1>How it works?</h1>
      <div className={style.boxes_container}>
        <div className={style.box_item}>
          <Boxes iconName="LuUploadCloud" number="1" />
          <div className={style.box_item_info}>
            <h1>Upload</h1>
            <p>Simply select or drag and drop your file into the window.</p>
          </div>
        </div>
        <div className={style.box_item}>
          <Boxes iconName="TfiReload" number="2" />
          <div className={style.box_item_info}>
            <h1>Process</h1>
            <p>Wait till your files are uploaded to the blockchain.</p>
          </div>
        </div>
        <div className={style.box_item}>
          <Boxes iconName="BsShare" number="3" />
          <div className={style.box_item_info}>
            <h1>Share</h1>
            <p>
              Share the ipfs link with any wallet address of your choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
