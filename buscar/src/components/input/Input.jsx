import React from "react";
import style from "./Input.module.css";

const Input = ({ texto, type = "text", width, height, maxLength = 255, imagem}) => {
  return (
    <input type={type} id="" style={{width:width, height:height}} maxLength={maxLength}/>
  );
};

export default Input;