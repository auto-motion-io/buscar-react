import React from "react";
import style from "./Botao.module.css"

const Botao = ({texto, cor, corFont = "#FFFFFF", onClick = null}) => {
  return (
    <button className={style["botao"]} onClick={onClick} style={{backgroundColor: cor, color: corFont}}>{texto}</button>
  );
};

export default Botao;