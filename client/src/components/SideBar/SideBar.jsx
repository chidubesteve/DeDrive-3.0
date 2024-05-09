import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";

// internal imports
import { Buttons } from "../ComponentIndex";
import style from "./SideBar.module.css";
import { themeContext } from "../../Theme";
import { truncateAddress } from "../NavBar/NavBar";

const SideBar = ({
  setOpenSideMenu,
  connectWallet,
  loadingConnectWallet,
  account,
  setRevokeModal,
  setModalOpen,
}) => {
  const { theme } = useContext(themeContext);

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };
  const openModal = () => {
    setModalOpen(true);
    setRevokeModal(false);
    setOpenSideMenu(false);
  };
  const openRevokeModal = () => {
    setRevokeModal(true);
    setModalOpen(false);
    setOpenSideMenu(false);
  };
  const handleConnectClick = account.length > 0 ? () => {} : connectWallet;

  return (
    <>
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
            The decentralized file system. Upload, view, share, approve and
            revoke access to your files, the decentralized way!
          </p>
        </div>
        <div className={style.sideBar_menu}>
          <nav className={style.sideBar_menu_nav}>
            <ul className={style.sideBar_menu_ul}>
              <li>
                <a
                  href="https://github.com/chidubesteve/DeDrive-3.0/blob/main/README.md"
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="https://direct.me/phoenixtech"
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  About me
                </a>
              </li>
              {account.length > 0 && (
                <li
                  className={style.navBoxItem}
                  onClick={() => openRevokeModal()}
                >
                  Revoke
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className={style.sideBar_button}>
          {account.length > 0 && (
            <Buttons
              btnName="Share"
              handleClick={() => openModal()}
              className={style.btn}
            />
          )}

          {/* // Connect wallet button */}
          <Buttons
            btnName={
              account.length > 0 ? truncateAddress(account) : "Connect Wallet"
            }
            handleClick={handleConnectClick}
            loading={loadingConnectWallet}
            className={style.btn}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
