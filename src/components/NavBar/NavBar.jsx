import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

//internal imports
import styles from "./NavBar.module.css";
import { ToggleButton } from ".";
import { Buttons } from ".";
import { SideBar } from ".";

const NavBar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openSideBar = () => {
    !openSideMenu ? setOpenSideMenu(true) : setOpenSideMenu(false);
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarBox}>
        <div className={styles.navBarBoxLeft}>
          <h1 className={styles.AppNameText}>DeDrive 3.0</h1>
        </div>
        <div className={styles.rightSideNav}>
          <ToggleButton />
          <nav className={styles.navBox}>
            <ul>
              <li className={styles.navBoxItem}>
                <a href="#">Help</a>
              </li>
              <li className={styles.navBoxItem}>
                <a href="https://direct.me/phoenixtech" target="_blank">
                  About me
                </a>
              </li>
            </ul>
          </nav>
          <Buttons
            btnName="Share"
            handleClick={() => {}}
            className={styles.btn}
          />
          <Buttons
            btnName="Connect Wallet"
            handleClick={() => {}}
            className={styles.btn}
          />
        {/* MENU BUTTON */}
        <div className={styles.navbar_container_right_menuBtn}>
          <CgMenuRight
            className={styles.menuIcon}
            onClick={() => openSideBar()}
            size={25}
          />
        </div>
        </div>
      </div>
      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
          <SideBar setOpenSideMenu={setOpenSideMenu} />
      )}
    </div>
  );
};

export default NavBar;
