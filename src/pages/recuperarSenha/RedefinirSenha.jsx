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

const RedefinirSenha = () => {

    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    async function handleRedefinir() {
        if(novaSenha === confirmarSenha){
            setIsLoading(true)
            api2.put(`/usuarios/atualizar-senha?id=${localStorage.getItem("idUser")}`, {
                senha: novaSenha
            }).then(() => {
                toast.success("Senha redefinida com sucesso!");
                localStorage.clear();
                navigate("/login")
            }).catch((e) => {
                console.log("Erro ao redefinir senha: " + e)
                toast.error("Erro ao redefinir senha")
                setIsLoading(false)
            })
        }
        else{
            toast.error("As senhas não coincidem")
        }
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className={styles["content"]}>
                <h1>Redefinir Senha</h1>
                <p>Redefina sua nova senha e guarde-a com cuidado</p>
                <div className={styles["container"]} style={{height:"50vh"}}>
                    <div className={styles["form"]}>
                        <FormInput label={"Nova senha*"} width={"20vw"} id={"inp_senha1"} onChange={(e) => setNovaSenha(e.target.value)} type="password"/>
                        <FormInput label={"Confirmar senha*"} width={"20vw"} id={"inp_senha2"} onChange={(e) => setConfirmarSenha(e.target.value)} type="password"/>
                    </div>
                    <Botao texto={"Redefinir"} width={"10vw"} onClick={(handleRedefinir)} />
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
export default RedefinirSenha;