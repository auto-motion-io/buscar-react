import React from "react";
import style from "./Input.module.css";

const Input = ({texto, type = "text", width, height, maxLength = 255, imagem, tamImg, marginRight, id, onChange, value}) => {
  return (
    <div className={style['container-input']}>
      <img className={style["imagem"]} src={imagem} alt="" style={{height: tamImg}}/>
      <input id={id} onChange={onChange} className={style['input']} type={type} style={{width:width, height:height, marginRight:marginRight}} maxLength={maxLength} placeholder={texto} value={value}/>
    </div>
  );
};

export default Input;