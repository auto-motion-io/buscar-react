import React, { useState, useEffect } from "react";
import styles from "./PagOficina.module.css";
import Sticker from "../../components/sticker/Sticker";
import estrela from "../../utils/assets/estrela.svg";
import localCinza from "../../utils/assets/localizacao-cinza.svg";
import telCinza from "../../utils/assets/telefone-cinza.svg";
import relogioCinza from "../../utils/assets/relogio-cinza.svg";
import calendarioCinza from "../../utils/assets/calendario-cinza.svg";
import checkCinza from "../../utils/assets/check-cinza.svg";
import check from "../../utils/assets/check.svg";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import api from "../../api";
import axios from "axios"; // Importar Axios
import { useParams, useNavigate } from "react-router-dom";

const PagOficina = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegação
  const [nomeOficina, setNomeOficina] = useState("");
  const [nota, setNota] = useState("");
  const [veiculosTrabalha, setVeiculosTrabalha] = useState([]);
  const [propulsaoTrabalha, setPropulsaoTrabalha] = useState([]);
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [inicioTrabalho, setInicioTrabalho] = useState("");
  const [fimTrabalho, setFimTrabalho] = useState("");
  const [imagem, setImagem] = useState("");
  const [diasTrabalha, setDiasTrabalha] = useState([]);
  const [hasBuscar, setHasBuscar] = useState(false); // Estado para armazenar o valor de hasBuscar
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados

  useEffect(() => {
    // Verifica se o id é um número válido
    const isValidId = /^\d+$/.test(id);

    if (!isValidId) {
      navigate("/servicos");
      return;
    }

    async function getOficinaDetails() {
      try {
        const response = await api.get(`/oficinas/${id}`);
        const data = response.data;

        // Verifica se os dados da oficina foram obtidos com sucesso
        if (!data) {
          navigate("/servicos");
          return;
        }

        // Verifica se hasBuscar é true
        setHasBuscar(data.hasBuscar);

        // Se hasBuscar for false, redireciona para a página de erro servicos
        if (!data.hasBuscar) {
          navigate("/servicos");
          return;
        }

        setNomeOficina(data.nome);
        setNota(data.informacoesOficina.horarioFimSem);
        setVeiculosTrabalha(data.informacoesOficina.tipoVeiculosTrabalha.split(";"));
        setPropulsaoTrabalha(data.informacoesOficina.tipoPropulsaoTrabalha.split(";"));
        setTelefone(data.informacoesOficina.whatsapp);
        setInicioTrabalho(data.informacoesOficina.horarioIniSem);
        setFimTrabalho(data.informacoesOficina.horarioFimSem);
        setImagem(data.logoUrl);

        // Converte os valores do array diasSemanaAberto para valores booleanos
        const diasAbertos = data.informacoesOficina.diasSemanaAberto.split(";").map(value => value === "true");
        setDiasTrabalha(diasAbertos);

        // Busca o endereço formatado com base no CEP
        buscarEnderecoFormatado(data.cep, data.numero);
      } catch (error) {
        console.log("Erro ao buscar dados da oficina:", error);
        navigate("/servicos");
      } finally {
        setLoading(false); // Marca que os dados foram carregados
      }
    }

    async function buscarEnderecoFormatado(cep, numero) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        const enderecoFormatado = `${logradouro}, ${numero} - ${bairro}, ${localidade}, ${uf}`;
        setEndereco(enderecoFormatado);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        setEndereco("Endereço não encontrado");
      }
    }

    getOficinaDetails();
  }, [id, navigate]); // Adicionando navigate como dependência

  const capitalizeInitials = (str) => {
    return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  };

  if (loading) {
    return <div>Loading...</div>; // Renderiza um indicador de carregamento enquanto os dados estão sendo obtidos
  }

  if (!hasBuscar) {
    return null; // Se hasBuscar for false, não renderiza nada
  }

  return (
    <main>
      <NavBar currentPage={"oficinas"} />
      <div className={styles["title"]}>
        <div className={styles["nome-ofc"]}>
          <h1>{nomeOficina}</h1>
        </div>
        <div className={styles["redirecionadores"]}>
          <Sticker label={"Google Maps"} type={"local"} />
          <Sticker label={"WhatsApp"} type={"wpp"} />
        </div>
      </div>
      <div className={styles["informacoes"]}>
        <div className={styles["left-side"]}>
          <div className={styles["avaliacao"]}>
            <img src={estrela} alt="estrela das avaliações" />
            <p>{nota}</p>
          </div>
          <div className={styles["all-stickers"]}>
            <div className={styles["stickers"]}>
              {propulsaoTrabalha.map((propulsao, index) => (
                <Sticker key={index} label={capitalizeInitials(propulsao)} type={propulsao.toLowerCase()} />
              ))}
            </div>
            <div className={styles["stickers"]}>
              {veiculosTrabalha.map((veiculo, index) => (
                <Sticker key={index} label={capitalizeInitials(veiculo)} type={veiculo.toLowerCase()} />
              ))}
            </div>
          </div>
          <div className={styles["loc-ctt"]}>
            <div className={styles["campo"]}>
              <div className={styles["img-box"]}>
                <img src={localCinza} alt="" />
              </div>
              <p>{endereco}</p>
            </div>
            <div className={styles["campo"]}>
              <div className={styles["img-box"]}>
                <img src={telCinza} alt="" />
              </div>
              <p>{telefone}</p>
            </div>
            <div className={styles["campo"]}>
              <div className={styles["img-box"]}>
                <img src={relogioCinza} alt="" />
              </div>
              <p>{`${inicioTrabalho}H00 às ${fimTrabalho}H00`}</p>
            </div>
            <div style={{ alignItems: "start" }} className={styles["campo"]}>
              <div className={styles["img-box"]}>
                <img src={calendarioCinza} alt="" />
              </div>
              <div className={styles["checks"]}>
                {diasTrabalha.map((dia, index) => (
                  <div key={index} className={styles["dias"]}>
                    <img src={dia ? check : checkCinza} alt="" />
                    <p>{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["right-side"]}>
          <div className={styles["img-mock"]}>
            <img src="" alt="Imagem da Oficina" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PagOficina;
