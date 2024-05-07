import React, {useContext, useEffect, useState} from 'react'
import { ethers } from "ethers";

//internal imports
import style from './Modal.module.css';
import { themeContext } from "../../../Theme";
import {Alert} from '../../ComponentIndex'

const Modal = ({setModalOpen, contract}) => {
  const { theme } = useContext(themeContext);
  const [alert, setAlert] = useState(null)

  const sharing = async () => {
    const address = document.getElementById('address').value;
    if (ethers.isAddress(address)) {
      try {
        await contract.allow(address);
        setAlert(
          <Alert
            message={`You have given access to ${address}`}
            type={"success"}
          />
        );
        await new Promise((resolve) => setTimeout(resolve, 3000)); // added a delay to ensure that the alert is set before the modal closes
        setModalOpen(false);
      } catch (err) {
        console.error(err);
        setAlert(
          <Alert
            message={`Couldn't give access to ${address}`}
            type={"error"}
          />
        );
        return;
      }
    } else {
      setAlert(<Alert message={"Invalid address"} type={"error"} />);
    }
  }
  useEffect(() => {
    const accessList = async () => {
    try {
      const addressList = await contract.shareAccess();
      console.log(addressList);
      let select = document.getElementById("selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;

        select.appendChild(el);
      }
    } catch (err) {
      console.error("Error fetching address list:", err);
    }
    } 
    contract && accessList();
}, [contract])

  return (
    <>
      {alert}
    <div className={style.modalBackground}>
      <div
        className={`${style.modalContainer} ${
          theme === "dark-mode" ? style.darkMode : ""
        }`}
      >
        <div className={style.title}>Share with</div>
        <div className={style.body}>
          <input
            type="text"
            className={style.address}
            id="address"
            placeholder="Enter Address"
            title='Please fill out this field'
          />
        </div>
        <form id="myForm">
          <select
            className={`${style.selectNumber} ${
              theme === "dark-mode" ? style.darkMode : ""
            }`} id='selectNumber'
          >
            <option className={style.option}>People With Access</option>
          </select>
        </form>
        <div className={style.footer}>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className={style.cancelBtn}
          >
            Cancel
          </button>
          <button onClick={() => sharing()} className={style.shareBtn}>
            Share
          </button>
        </div>
      </div>
      </div>
      </>
  );
}

export default Modal