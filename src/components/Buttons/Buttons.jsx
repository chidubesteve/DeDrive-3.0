import React from 'react'

// internal imports
import style from './Buttons.module.css'

const Buttons = ({ btnName, handleClick }) => {
  return (
    <div className={style.box}>
      <button className={style.button} onClick={() => handleClick()}>
        {btnName}
      </button>
    </div>
  );
};

export default Buttons