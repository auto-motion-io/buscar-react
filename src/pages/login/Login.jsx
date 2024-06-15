import React, { useState } from "react";
import styles from "./Login.module.css"
import FormInput from "../../components/formInput/FormImput";
import logoBuscar from "../../utils/assets/logo.svg"
import Botao from "../../components/botao/Botao";
import imagemFundo from "../../utils/assets/img-login.svg"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api2 } from "../../api";
import Loader from "../../components/loader/Loader";

const Login = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleEntrar() {
        setIsLoading(true)
        api2.post("/usuarios/login", {
            email: email.toLowerCase(),
            senha: senha
        }).then((response) => {
            toast.success("Login realizado com sucesso!");
            navigate("/")
            sessionStorage.setItem("logged", true)
            sessionStorage.setItem("nome", response.data.nome)
            sessionStorage.setItem("idUsuario", response.data.idUsuario)
            sessionStorage.setItem("token", window.btoa(response.data.token))
        }).catch((e) => {
            console.log(e)
            toast.error(e.response.data.message)
            setIsLoading(false)
        })
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className={styles["content"]}>
                <div className={styles["left-side"]}>
                    <div className={styles["container"]}>
                        <img src={logoBuscar} alt="Logo buscar" onClick={() => navigate("/")} />
                        <div className={styles["form"]}>
                            <FormInput label={"Email*"} width={"20vw"} id={"inp_email"} onChange={(e) => setEmail(e.target.value)} />
                            <FormInput label={"Senha*"} width={"20vw"} id={"inp_senha"} onChange={(e) => setSenha(e.target.value)} type="password" />
                            <a href="/recuperarSenha">Esqueci minha senha</a>
                        </div>
                        <Botao texto={"Entrar"} width={"10vw"} onClick={(handleEntrar)} />
                    </div>
                    <a href="/cadastro">Sem login? Cadastre-se</a>
                </div>
                <div className={styles["right-side"]}>
                    <h1>Onde a busca ganha velocidade.</h1>
                    <img src={imagemFundo} alt="Imagem fundo" />
                </div>
            </div>
        </>
    )
}
export default Login;