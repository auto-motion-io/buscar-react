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

const Perfil = () => {

    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUsuario");

    const [editing, setEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const saveButtonRef = useRef(null);

    const config = {
        headers: {
            "Authorization": `Bearer ${window.atob(sessionStorage.getItem("token"))}`
        }
    }
    const data = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
    }

    async function saveChanges(){
        api2.put(`/usuarios/${idUser}`, data, config)
        .then((response) =>{
            toast.success("Modificações salvas!")
            navigate("/login")
        }).catch((e) =>{
            console.log("Erro" + e)
            toast.error("Erro!")
        })
    }

    useEffect(() => {
        const getDados = async () => {
            try {
                const response = await api2.get(`/usuarios/${idUser}`);
                setNome(response.data.nome);
                setSobrenome(response.data.sobrenome);
                setEmail(response.data.email);
                setSenha(response.data.senha);
            } catch (e) {
                console.log("Erro: " + e);
                toast.error("Erro ao carregar os dados");
            }
        };

        getDados();
    }, [idUser]); // Chamar apenas uma vez quando o componente é montado

    useEffect(() => {
        if (editing && saveButtonRef.current) {
            saveButtonRef.current.style.display = "flex";
        } else if (saveButtonRef.current) {
            saveButtonRef.current.style.display = "none";
        }
    }, [editing]); // Apenas escutar mudanças em `editing`

    return (
        <>
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
                    <span onClick={() => setEditing(true)} className={styles.lapis}>
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
                            readOnly={!editing} // Definir readOnly baseado no estado editing
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Sobrenome"}
                            width={"11vw"}
                            id={"inp_sobrenome"}
                            onChange={(e) => setSobrenome(e.target.value)}
                            value={sobrenome}
                            readOnly={!editing} // Definir readOnly baseado no estado editing
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Email"}
                            width={"26vw"}
                            id={"inp_email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            readOnly={!editing} // Definir readOnly baseado no estado editing
                        />
                        <FormInput
                            backgroundColor={"#eceae59e"}
                            label={"Senha"}
                            width={"17vw"}
                            id={"inp_senha"}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password"
                            value={senha}
                            readOnly={!editing} // Definir readOnly baseado no estado editing
                        />
                        <div ref={saveButtonRef} className={styles.save} onClick={() => {saveChanges()}}>
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
