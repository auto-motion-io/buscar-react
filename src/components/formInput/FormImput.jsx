import React from "react";
import style from "./FormImput.module.css";

const FormInput = ({label, type = "text", width, height = "6vh", maxLength = 255, id, onChange}) => {
  return (
    <div className={style['container-input']}>
        <label htmlFor={id}>{label}</label>
        <input type={type} name={label} id={id} maxLength={maxLength} onChange={onChange} style={{height:height, width:width}}/>
    </div>
  );
};

export default FormInput;