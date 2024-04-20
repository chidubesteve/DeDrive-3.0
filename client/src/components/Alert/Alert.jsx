import React, {useState} from 'react'

// internal imports
import style from './Alert.module.css'

const Alert = ({type, message}) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClick =(e) => {
    e.preventDefault();
    setShowAlert(false);
  }
  return (
    (showAlert &&   
    <div className={`${style.alert} ${style[type]}`}>
      <span className={style.closebtn} onClick={handleClick}>
        &times;
      </span>
      {message}
    </div>
    )
  );
}

export default Alert  