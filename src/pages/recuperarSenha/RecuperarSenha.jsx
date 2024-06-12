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
    const [novaSenha, setNovaSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [next, setNext] = useState(false);


    async function handleEnviar() {
        setIsLoading(true)
        api2.post(`/usuarios/set-token?op=senha`, {
            email: email.toLowerCase(),
        })
            .then(() => {
                toast.success("Insira o token que foi enviado no email inserido!");
                setNext(true)
                setIsLoading(false)
            }).catch((e) => {
                console.log("Erro ao enviar email: " + e)
                toast.error("Email não encontrado no sistema!")
                setIsLoading(false)
            })
    }

    async function handleRedefinir() {
        if (confSenha === novaSenha) {
            setIsLoading(true)
            api2.post(`/usuarios/confirmar-token?op=senha`, {
                email: email.toLowerCase(),
                senha: novaSenha,
                token: token
            }).then(() => {
                toast.success("Senha alterada com sucesso!");
                navigate("/login")
            }).catch((e) => {
                setIsLoading(false)
                console.log("Erro ao aletrar senha " + e)
                toast.error("Token inválido!")
            })
        } else {
            toast.error("Senhas não coincidem")
        }
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className={styles["content"]}>
                <h1>Recuperar Senha</h1>
                {!next ? (
                    <p>Informe seu Email e te enviaremos um token para recuperação</p>
                ) : (
                    <p>Insira o token que foi enviado para seu email!</p>
                )}
                <div className={styles["container"]}>
                    <div className={styles["form"]}>
                        {!next ? (
                            <FormInput label={"Email*"} width={"20vw"} id={"inp_email"} onChange={(e) => setEmail(e.target.value)} value={email} />
                        ) : (
                            <>
                                <FormInput label={"Token*"} width={"20vw"} id={"inp_token"} onChange={(e) => setToken(e.target.value)} value={token} />
                                <FormInput label={"Nova senha*"} width={"20vw"} id={"inp_senha1"} onChange={(e) => setNovaSenha(e.target.value)} type="password" value={novaSenha} />
                                <FormInput label={"Confirmar senha*"} width={"20vw"} id={"inp_senha2"} onChange={(e) => setConfSenha(e.target.value)} type="password" value={confSenha} />
                            </>
                        )}
                    </div>
                    <div className={styles["botoes"]}>
                        {!next ? (
                            <>
                                <Botao texto={"Voltar"} cor={"#F4F2ED"} corFont={"#3B563C"} width={"8vw"} onClick={() => navigate("/login")} />
                                <Botao texto={"Enviar"} width={"8vw"} onClick={(handleEnviar)} />
                            </>
                        ) : (
                            <>
                                <Botao texto={"Voltar"} cor={"#F4F2ED"} corFont={"#3B563C"} width={"8vw"} onClick={() => setNext(false)} />
                                <Botao texto={"Redefinir"} width={"8vw"} onClick={(handleRedefinir)} />
                            </>
                        )}
                    </div>
                </div>
                <div className={styles["logo"]}>
                    <img src={logoBuscar} alt="Logo Buscar" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                </div>
                <div className={styles["background-img"]}>
                    <img src={imagemFundo} alt="Imagem fundo" />
                </div>
            </div>
        </>
    )
}
export default RecuperarSenha;