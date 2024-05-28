import React from "react";
import styles from "./Footer.module.css";
import logoMotion from "../../utils/assets/motion-logo.svg"
import logoBuscar from "../../utils/assets/logo-buscar-pb.svg"
import chaveVerde from "../../utils/assets/chave-verde.svg"
import chaveLaranja from "../../utils/assets/chave-laranja.svg"
import { useNavigate } from "react-router-dom";

const Footer = () => {
    var navigate = useNavigate();

    function mudarPagina(pagina) {
        navigate(pagina);
    }

    return (
        <footer>
            <div className={styles["background"]}>
                <img className={styles["img1"]} src={chaveVerde} alt="Imagem do Footer" />
                <img className={styles["img2"]} src={chaveLaranja} alt="Imagem do Footer" />
            </div>
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <div className={styles["box-img"]}>
                        <img src={logoBuscar} alt="" />
                    </div>
                    <div className={styles["separador"]}></div>
                    <div id="img1" className={styles["box-img"]}>
                        <img className={styles["motion"]} src={logoMotion} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
