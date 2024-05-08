import React, { useContext, useState } from "react";
import { GrClose } from "react-icons/gr";

// internal imports
import { Buttons } from "../ComponentIndex";
import style from "./SideBar.module.css";
import { themeContext } from "../../Theme";
import { Modal } from "../NavBar";
import { RevokeModal } from "../NavBar";
import { truncateAddress } from "../NavBar/NavBar";

const SideBar = ({
  setOpenSideMenu,
  contract,
  connectWallet,
  loadingConnectWallet,
  account,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [revokeModal, setRevokeModal] = useState(false);
  const { theme } = useContext(themeContext);

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };
  const openModal = () => {
    if (!modalOpen) {
      setModalOpen(true);
      setRevokeModal(false);
      setOpenSideMenu(false);
    } else {
      setModalOpen(false);
    }
  };
  const openRevokeModal = () => {
    if (!revokeModal) {
      setRevokeModal(true);
      setModalOpen(false);
      setOpenSideMenu(false);
    } else {
      setRevokeModal(false);
    }
  };
  const handleConnectClick = account.length > 0 ? () => {} : connectWallet;

  return (
    <>
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
      {revokeModal && (
        <RevokeModal setRevokeModal={setRevokeModal} contract={contract} />
      )}
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
              {account.length > 0
                ? !revokeModal && (
                    <li
                      className={style.navBoxItem}
                      onClick={() => openRevokeModal()}
                    >
                      Revoke
                    </li>
                  )
                : ""}
            </ul>
          </nav>
        </div>
        <div className={style.sideBar_button}>
          {account.length > 0
            ? !modalOpen && (
                <Buttons
                  btnName="Share"
                  handleClick={() => {
                    openModal();
                  }}
                  className={style.btn}
                />
              )
            : ""}

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
