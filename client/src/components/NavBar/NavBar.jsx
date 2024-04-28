import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

//internal imports
import styles from "./NavBar.module.css";
import { ToggleButton } from ".";
import { Buttons } from ".";
import { SideBar } from ".";

const NavBar = ({ account, connectWallet, loadingConnectWallet }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openSideBar = () => {
    !openSideMenu ? setOpenSideMenu(true) : setOpenSideMenu(false);
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    const firstSix = address.substring(0, 6);
    const lastFive = address.slice(-5);
    return <i>{firstSix}...{lastFive}</i>
  };
  const handleConnectClick = account.length > 0 ? () => {} : connectWallet
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
                <a
                  href="https://github.com/chidubesteve/DeDrive-3.0/blob/main/README.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help
                </a>
              </li>
              <li className={styles.navBoxItem}>
                <a
                  href="https://direct.me/phoenixtech"
                  target="_blank"
                  rel="noreferrer"
                >
                  About me
                </a>
              </li>
            </ul>
          </nav>
          {account.length > 0 ? (
            <Buttons
              btnName="Share"
              handleClick={() => {}}
              className={styles.btn}
            />
          ) : (
            ""
          )}

          {/* // Connect wallet button */}
          <Buttons
            btnName={
              account.length > 0 ? truncateAddress(account) : "Connect Wallet"
            }
            handleClick={handleConnectClick}
            loading={loadingConnectWallet}
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
      {openSideMenu && <SideBar setOpenSideMenu={setOpenSideMenu} />}
    </div>
  );
};

export default NavBar;
