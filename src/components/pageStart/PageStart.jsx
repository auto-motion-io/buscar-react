import React, {useState} from "react";
import Input from "../input/Input";
import styles from "./PageStart.module.css"
import local from "../../utils/assets/localizacao.svg"
import lupa from "../../utils/assets/lupa.svg"

const PageStart = ({pagina, filtro}) => {


    const [localizacao, setLocalizacao] = useState("")
    const [palavraChave, setPalavraChave] = useState("")
    return(
        <div className={styles["container"]}>
            <div className={styles["loc"]}>
                <Input id={"inp_a"} texto={"Insira sua localização"} imagem={local} height={"7.5vh"} width={"30vw"} onChange={(e) => setLocalizacao(e.target.value)} value={localizacao}/>
            </div>
            <div className={styles["page-name"]}>
                <span className={styles["titulo"]}>{pagina}</span>
                <Input id={"inp_b"} texto={"Palavra-Chave"} imagem={lupa} height={"6vh"} width={"12vw"} onChange={(e) => setPalavraChave(e.target.value)} value={palavraChave}/>
            </div>
            <div className={styles["filtros"]}>
                {filtro}
            </div>
        </div>
    );
}

export default PageStart;