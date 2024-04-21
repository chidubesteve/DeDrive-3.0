import React, { useState, useEffect } from "react";

// internal imports
import style from "./Alert.module.css";

const Alert = ({ type, message }) => {
  const [showAlert, setShowAlert] = useState(true);

  // function to hide alert after 5 secs if user doesn't close it
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showAlert]);

  useEffect(() => {
    if(message) {
      setShowAlert(true);
    }
  }, [message])
  

  const handleClick = (e) => {
    e.preventDefault();
    setShowAlert(false);
  };
  return (
    showAlert && (
      <div className={`${style.alert} ${style[type]}`}>
        <span className={style.closebtn} onClick={handleClick}>
          &times;
        </span>
        {message}
      </div>
    )
  );
};

export default Alert;
