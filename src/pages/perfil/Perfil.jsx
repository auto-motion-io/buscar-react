import React, { useState, useRef, useEffect } from "react";
import styles from "./Perfil.module.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import FormInput from "../../components/formInput/FormImput";
import logoMotion from "../../utils/assets/motion-logo.svg";
import perfil from "../../utils/assets/perfil.svg";
import file from "../../utils/assets/file.svg";
import lapis from "../../utils/assets/lapis.svg";
import disquete from "../../utils/assets/disquete.svg";
import { api2 } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/botao/Botao";
import Loader from "../../components/loader/Loader";

const Perfil = () => {

    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUsuario");

    const [editing, setEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [mudandoSenha, setMudandoSenha] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const saveButtonRef = useRef(null);
    const backModalRef = useRef(null);

    const config = {
        headers: {
            "Authorization": `Bearer ${window.atob(sessionStorage.getItem("token"))}`
        }
    }
    const data = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
    }

    async function saveChanges() {
        api2.put(`/usuarios/${idUser}`, data, config)
            .then((response) => {
                toast.success("Modificações salvas!")
                sessionStorage.setItem("nome", response.data.nome)
                setTimeout(() =>{
                    window.location.reload()
                },2000)
            }).catch((e) => {
                console.log("Erro" + e)
                toast.error("Erro!")
            })
    }

    async function changePassword(){
        setIsLoading(true);
        api2.put(`/usuarios/atualizar-senha/${idUser}`,{
            senhaAntiga: senhaAtual,
            senhaNova: novaSenha
        }, config).then(() =>{
            changeModal()
            toast.success("Senha alterada com sucesso")
            sessionStorage.clear()
            navigate("/login")
        }).catch((e) =>{
            console.log("Erro" +e)
            toast.error("Erro ao mudar senha")
            setIsLoading(false);
        })
    }

    useEffect(() => {
        const getDados = async () => {
            try {
                const response = await api2.get(`/usuarios/${idUser}`);
                setNome(response.data.nome);
                setSobrenome(response.data.sobrenome);
                setEmail(response.data.email);
            } catch (e) {
                console.log("Erro: " + e);
                toast.error("Erro ao carregar os dados");
            }
        };

        getDados();
    }, [idUser]);

    useEffect(() => {
        if (editing && saveButtonRef.current) {
            saveButtonRef.current.style.display = "flex";
        } else if (!editing) {
            saveButtonRef.current.style.display = "none";
        }
    }, [editing]);

    function changeModal() {
        setMudandoSenha(!mudandoSenha)
        if (mudandoSenha) {
            backModalRef.current.style.display = "none"
        }
        else {
            backModalRef.current.style.display = "flex"
        }
    }

    return (
        <>
            <div ref={backModalRef} className={styles["back-modal"]}>
                <div className={styles["modal-senha"]}>
                    <div className={styles["form-senha"]}>
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Senha atual*"}
                            width={"11vw"}
                            id={"inp_senhaAtual"}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            value={senhaAtual}
                            type={"password"}
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Nova senha*"}
                            width={"11vw"}
                            id={"inp_novaSenha"}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            value={novaSenha}
                            type={"password"}
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Confirmar senha*"}
                            width={"11vw"}
                            id={"inp_confSenha"}
                            onChange={(e) => setConfSenha(e.target.value)}
                            value={confSenha}
                            type={"password"}
                        />
                    </div>
                    <div className={styles["botoes"]}>
                        <Botao
                            texto={"Cancelar"}
                            width={"9vw"}
                            onClick={changeModal}
                            cor={"transparent"}
                            corFont={"#3B563C"}
                        />
                        <Botao
                            texto={"Salvar"}
                            width={"9vw"}
                            onClick={changePassword}
                        />
                    </div>
                </div>
            </div>
            <NavBar currentPage={"meusServicos"} />
            <section className={styles.content}>
                <div className={styles["left-side"]}>
                    <div className={styles.secoes}>
                        <div className={styles.secao}>
                            <img src={perfil} alt="" />
                            <p>Meu Perfil</p>
                        </div>
                        <div className={styles.secao}>
                            <img src={file} alt="" />
                            <p>Meus Serviços</p>
                        </div>
                    </div>
                    <div className={styles["logo-motion"]}>
                        <img src={logoMotion} alt="" />
                    </div>
                </div>
                <div className={styles["right-side"]}>
                    <span onClick={() => setEditing(!editing)} className={styles.lapis}>
                        <img src={lapis} alt="" />
                    </span>
                    <div className={styles.perfilGerente}>
                        <img src="" alt="" />
                    </div>
                    <div className={styles.form}>
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Nome"}
                            width={"11vw"}
                            id={"inp_nome"}
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            readOnly={!editing}
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Sobrenome"}
                            width={"11vw"}
                            id={"inp_sobrenome"}
                            onChange={(e) => setSobrenome(e.target.value)}
                            value={sobrenome}
                            readOnly={!editing}
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Email"}
                            width={"26vw"}
                            id={"inp_email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            readOnly={!editing}
                        />
                    </div>
                    <div className={styles["botoes"]}>
                        <Botao
                            texto={"Alterar Senha"}
                            width={"10vw"}
                            onClick={changeModal}
                        />
                        <div ref={saveButtonRef} className={styles.save} onClick={() => { saveChanges() }}>
                            <img src={disquete} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Perfil;
