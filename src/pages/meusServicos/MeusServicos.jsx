import React from "react";
import FormToken from "../../components/formToken/FormToken";
import style from "./MeusServicos.module.css";
import logo from "../../utils/assets/logo.svg";

const MeusServicos = () => {
  return (
    <>
    <div className="app-container">
    <img src={logo} alt="Left" className="side-image left-image" />
      <h1 className={style["titulo"]}>Meus Serviços</h1>
        <p>Informe o Token que sua oficina forneceu para visualização</p>
        <div className={style["app"]}>
          <div className={style["header"]}>
          </div>
          <FormToken />
        </div>
        </div>
    </>
);
};

export default MeusServicos;
