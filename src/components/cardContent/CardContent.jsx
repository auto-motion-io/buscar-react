import React, { useEffect, useRef } from "react";
import styles from "./CardContent.module.css";
import local from "../../utils/assets/localizacao.svg";
import wppIcon from "../../utils/assets/wppIcon.svg";
import estrela from "../../utils/assets/estrela.svg";

const CardContent = ({ type, titulo, subT, end, tel, nota, onclickCard }) => {
    const subTRef = useRef(null);
    const containerRef = useRef(null);
    const estrelaRef = useRef(null);
    const precoRef = useRef(null)

    useEffect(() => {
        if (type === "Peca") {
            estrelaRef.current.style.display = "none"
            precoRef.current.style.fontSize = "2.5vh"
            precoRef.current.style.fontFamily = "Product-Sans-Bold"
            precoRef.current.style.color = "#3B563C"
        } else if (type === "Oficina") {
            subTRef.current.style.display = "none";
            containerRef.current.style.height = "50vh";
        }
    }, [type]);


    return (
        <div onClick={onclickCard} ref={containerRef} className={styles["container"]}>
            <div className={styles["imagem"]}>
                <img src="" alt="" />
            </div>
            <div className={styles["title"]}>
                <h3 className={styles["titulo-style"]}>{titulo}</h3>
                <div className={styles["avaliacao"]}>
                    <img ref={estrelaRef} src={estrela} alt="" />
                    <p ref={precoRef}>{nota}</p>
                </div>
            </div>
            <div className={styles["infos"]}>
                <div ref={subTRef} className={styles["subT"]}>
                    <p>{subT}</p>
                </div>
                <div className={styles["box"]}>
                    <div className={styles["alignner"]}>
                        <img src={local} alt="" />
                    </div>
                    <p>{end}</p>
                </div>
                <div className={styles["box"]}>
                    <div className={styles["alignner"]}>
                        <img src={wppIcon} alt="" />
                    </div>
                    <p>{tel}</p>
                </div>
            </div>
        </div>
    );
};

export default CardContent;
