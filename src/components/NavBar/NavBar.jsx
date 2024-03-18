import React from "react";

//internal imports
import styles from "./NavBar.module.css";
import { ToggleButton } from ".";
import { Buttons } from ".";

const NavBar = () => {
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
                <a href="#">Share</a>
              </li>
            </ul>
          </nav>
          <Buttons btnName="Share" handleClick={() => {}} />
          <Buttons btnName="Connect Wallet" handleClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
