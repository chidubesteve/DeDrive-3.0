import React, {useState, useContext} from 'react';
import { ethers } from 'ethers';

//internal imports
import style from './RevokeModal.module.css'
import { Alert } from "../../ComponentIndex";
import { themeContext } from "../../../Theme";


const RevokeModal = ({contract, setRevokeModal}) => {
    const [alert, setAlert] = useState(null);
  const { theme } = useContext(themeContext);

  const revoke = async() => {
    const address = document.getElementById("address").value;
    if (ethers.isAddress(address)) {
      try {
        await contract.disallow(address);
        setAlert(
          <Alert
            message={`You have revoked access from ${address}`}
            type={"success"}
          />
        );
        await new Promise((resolve) => setTimeout(resolve, 3000)); // added a delay to ensure that the alert is set before the modal closes
        setRevokeModal(false);
      } catch (err) {
        console.error(err);
        setAlert(
          <Alert
            message={`Couldn't revoke access of ${address}`}
            type={"error"}
          />
        );
        return;
      }
    } else {
      setAlert(<Alert message={"Invalid address"} type={"error"} />);
    }
  }


  return (
    <>
      {alert}
      <div className={style.modalBackground}>
        <div
          className={`${style.modalContainer} ${
            theme === "dark-mode" ? style.darkMode : ""
          }`}
        >
          <div className={style.title}>Revoke access from:</div>
          <div className={style.body}>
            <input
              type="text"
              className={style.address}
              id="address"
              placeholder="Enter Address"
              title="Please fill out this field"
            />
          </div>

          <div className={style.footer}>
            <button
              onClick={() => {
                setRevokeModal(false);
              }}
              className={style.cancelBtn}
            >
              Cancel
            </button>
            <button onClick={() => revoke()} className={style.revokeBtn}>
              Revoke
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RevokeModal