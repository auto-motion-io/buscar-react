import React from "react";
import styles from "./NavBar.module.css";
import imgHome from "../../utils/assets/home.svg";
import imgOficinas from "../../utils/assets/carro.svg";
import imgPecas from "../../utils/assets/maleta.svg";
import imgMeusServicos from "../../utils/assets/ferramenta.svg";
import logo from "../../utils/assets/logo.svg";
import Botao from "../botao/Botao";
import { useNavigate } from "react-router-dom";

const NavBar = ({currentPage}) => {
  var navigate = useNavigate();

  function mudarPagina(pagina) {
    navigate(pagina);
  }

  const pageClasses = {
    home: currentPage === "home" ? styles.active : "",
    oficinas: currentPage === "oficinas" ? styles.active : "",
    servicos: currentPage === "servicos" ? styles.active : "",
    pecas: currentPage === "pecas" ? styles.active : "",
    meusServicos: currentPage === "meusServicos" ? styles.active : "",
  };

  return (
    <nav>
        <div className={styles["logo"]}>
            <img src={logo} alt="Logo"/>
        </div>
        <div className={styles["menu"]}>
            <span onClick={() => mudarPagina("/home")} className={pageClasses.home}>
                <img src={imgHome} alt="Home" />
            </span>
            <span onClick={() => mudarPagina("/oficinas")} className={pageClasses.home}>
                <img src={imgOficinas} alt="Oficinas" />
            </span>
            <span onClick={() => mudarPagina("/servicos")} className={pageClasses.servicos}>
                <img src={imgMeusServicos} alt="Serviços" />
            </span>
            <span onClick={() => mudarPagina("/pecas")} className={pageClasses.home}>
                <img src={imgPecas} alt="Peças" />
            </span>
            <span onClick={() => mudarPagina("/meusServicos")} className={pageClasses.home}>
                <img src={imgMeusServicos} alt="Meus Serviços" />
            </span>
        </div>
        <div>
            <Botao texto={"Cadastrar"} cor={"#3B563C"}/>
            <Botao texto={"Entrar"} cor={"#F4F2ED"} corFont={"#3B563C"}/>
        </div>
    </nav> 
    );
};

export default NavBar;
