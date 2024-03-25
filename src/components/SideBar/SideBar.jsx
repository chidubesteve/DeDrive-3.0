import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";

// internal imports
import { Buttons } from "../ComponentIndex";
import style from "./SideBar.module.css";
import { themeContext } from "../../Theme";

const SideBar = ({ setOpenSideMenu }) => {
  const { theme } = useContext(themeContext);
  const closeSideBar = () => {
    setOpenSideMenu(false);
  };
  return (
    <div
      className={`${style.sideBar} ${
        theme === "light-mode" ? style.lightMode : ""
      }`}
    >
      <GrClose
        className={style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />
      <div className={`${style.sideBar_box}`}>
      <h2>DeDrive 3.0</h2>
      <br />
        <p>
          The decentralized drive system. Upload, view, share, approve and revoke access to your files,
          the decentralized way!
        </p>
      </div>
      <div className={style.sideBar_menu}>
        <nav className={style.sideBar_menu_nav}>
          <ul className={style.sideBar_menu_ul}>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="https://direct.me/phoenixtech">About me</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.sideBar_button}>
        <Buttons btnName="Share" handleClick={() => {}} />
        <Buttons btnName="Connect Wallet" handleClick={() => {}} />
      </div>
    </div>
  );
};

export default SideBar;
