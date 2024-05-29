import styles from "./Sticker.module.css"
import galao from "../../utils/assets/galao-combustivel.svg"
import raio from "../../utils/assets/raio.svg"
import hibrido from "../../utils/assets/hibrido.svg"
import carro from "../../utils/assets/stick-carro.svg"
import moto from "../../utils/assets/moto.svg"
import caminhao from "../../utils/assets/caminhao.svg"
import onibus from "../../utils/assets/onibus.svg"

const Sticker = ({ label, type }) => {
    const imageMap = {
        "combustão": galao,
        "elétrico": raio,
        "híbrido": hibrido,
        "carro": carro,
        "moto": moto,
        "caminhao": caminhao,
        "onibus": onibus
    };

    const srcImagem = imageMap[type] || null;

    return (
        <div className={styles.container}>
            <div className={styles["box-img"]}>
                {srcImagem && <img src={srcImagem} alt={`Ícone do ${type}`} />}
            </div>
            <p>{label}</p>
        </div>
    )
}

export default Sticker;
