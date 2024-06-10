import React, { useState } from "react";
import styles from "./RecuperarSenha.module.css"
import FormInput from "../../components/formInput/FormImput";
import logoBuscar from "../../utils/assets/logo.svg"
import Botao from "../../components/botao/Botao";
import imagemFundo from "../../utils/assets/img-login.svg"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api2 } from "../../api";
import Loader from "../../components/loader/Loader";

const RecuperarSenha = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    async function handleEnviar() {
        setIsLoading(true)
        api2.post(`/usuarios/recuperar-senha?email=${email}`)
            .then((response) => {
                toast.success("Um email foi enviado para que sua redefinição seja feita!");
                localStorage.setItem("idUser", response.data.idUsuario);
                navigate("/login")
            }).catch((e) => {
                console.log("Erro ao enviar email: " + e)
                toast.error("Email não encontrado no sistema!")
                setIsLoading(false)
            })
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className={styles["content"]}>
                <h1>Recuperar Senha</h1>
                <p>Informe seu Email e te enviaremos uma mensagem para recuperação</p>
                <div className={styles["container"]}>
                    <div className={styles["form"]}>
                        <FormInput label={"Email*"} width={"20vw"} id={"inp_email"} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Botao texto={"Enviar"} width={"10vw"} onClick={(handleEnviar)} />
                </div>
                <div className={styles["logo"]}>
                    <img src={logoBuscar} alt="Logo Buscar" onClick={() => navigate("/home")} style={{cursor:"pointer"}}/>
                </div>
                <div className={styles["background-img"]}>
                    <img src={imagemFundo} alt="Imagem fundo" />
                </div>
            </div>
        </>
    )
}
export default RecuperarSenha;