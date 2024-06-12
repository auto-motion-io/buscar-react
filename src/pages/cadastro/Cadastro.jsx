import React, { useState } from "react";
import styles from "./Cadastro.module.css"
import FormInput from "../../components/formInput/FormImput";
import logoBuscar from "../../utils/assets/logo.svg"
import Botao from "../../components/botao/Botao";
import imagemFundo from "../../utils/assets/img-cadastro.svg"
import { api2 } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const capitalizeInitials = (str) => {
        return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    };

    async function handleCadastrar() {
        api2.post("/usuarios/cadastrar", {
            nome: capitalizeInitials(nome),
            sobrenome: capitalizeInitials(sobrenome),
            email: email.toLowerCase(),
            senha: senha
        }).then((response) => {
            console.log(response.data);
            toast.success("Cadastro realizado com sucesso!");
            navigate("/login")
        }).catch((e) => {
            console.log("Erro ao realizar cadastro: " + e);
            toast.error("Erro ao realizar cadastro!")
        })
    }

    return (
        <div className={styles["content"]}>
            <div className={styles["left-side"]}>
                <h1>Busque por oficinas, serviços e peças.</h1>
                <img src={imagemFundo} alt="Imagem fundo" />
            </div>
            <div className={styles["right-side"]}>
                <div className={styles["container"]}>
                    <img src={logoBuscar} alt="Logo buscar" onClick={() => navigate("/")} />
                    <div className={styles["form"]}>
                        <FormInput label={"Nome*"} width={"10vw"} id={"inp_nome"} onChange={(e) => setNome(e.target.value)} />
                        <FormInput label={"Sobrenome*"} width={"10vw"} id={"inp_sobrenome"} onChange={(e) => setSobrenome(e.target.value)} />
                        <FormInput label={"Email*"} width={"23vw"} id={"inp_email"} onChange={(e) => setEmail(e.target.value)} />
                        <FormInput label={"Senha*"} width={"14vw"} id={"inp_senha"} onChange={(e) => setSenha(e.target.value)} type="password" />
                    </div>
                    <Botao texto={"Cadastrar"} width={"10vw"} onClick={(handleCadastrar)} />
                </div>
                <a href="/login">Já tem cadastro? Faça login</a>
            </div>
        </div>
    )
}
export default Cadastro;