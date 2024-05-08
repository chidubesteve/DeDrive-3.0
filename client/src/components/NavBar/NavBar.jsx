import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

//internal imports
import styles from "./NavBar.module.css";
import { ToggleButton } from ".";
import { Buttons } from ".";
import { SideBar } from ".";
import { Modal } from ".";
import { RevokeModal } from ".";

export const truncateAddress = (address) => {
  if (!address) return "";
  const firstSix = address.substring(0, 6);
  const lastFive = address.slice(-5);
  return (
    <i>
      {firstSix}...{lastFive}
    </i>
  );
};
const NavBar = ({ account, connectWallet, loadingConnectWallet, contract }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [revokeModal, setRevokeModal] = useState(false);

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
      setRevokeModal(false);
      setModalOpen(false);
    } else {
      setOpenSideMenu(false);
    }
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
                    rel="noreferrer noopenner"
                  >
                    Help
                  </a>
                </li>
                <li className={styles.navBoxItem}>
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
                        className={styles.navBoxItem}
                        onClick={() => openRevokeModal()}
                      >
                        Revoke
                      </li>
                    )
                  : ""}
              </ul>
            </nav>
            {account.length > 0
              ? !modalOpen && (
                  <Buttons
                    btnName="Share"
                    handleClick={() => {
                      openModal();
                    }}
                    className={styles.btn}
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
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            contract={contract}
            account={account}
            loadingConnectWallet={loadingConnectWallet}
            connectWallet={connectWallet}
          />
        )}
      </div>
    </>
  );
};

export default NavBar;
