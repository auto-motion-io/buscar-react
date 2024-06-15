import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg";
import styles from "./Oficinas.module.css";
import CardContent from "../../components/cardContent/CardContent";
import { api1, api2 } from "../../api";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Oficinas = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [propulsao, setPropulsao] = useState("");
  const [marca, setMarca] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getOficinas = async (tipoVeiculo, propulsao, marca) => {

    try {
      setIsLoading(true)
      const response = await api1.get(`/oficinas/tipo-veiculo-propulsao-marca?tipoVeiculo=${tipoVeiculo}&tipoPropulsao=${propulsao}&marca=${marca}`);
      const { data } = response;

      const promises = data.map(async (oficina) => {
        if (!oficina.hasBuscar) return null;

        try {
          const viaCepPromise = axios.get(`https://viacep.com.br/ws/${oficina.cep}/json/`);
          const notaPromise = api2.get(`/avaliacoes/media-notas-oficina/${oficina.id}`);

          const [viaCepResponse, notaResponse] = await Promise.all([viaCepPromise, notaPromise]);

          const viaCepData = viaCepResponse.data;
          const notaOficina = notaResponse.data;

          return {
            ...oficina,
            logradouro: viaCepData.logradouro,
            nota: parseFloat(notaOficina.nota).toFixed(1)
          };
        } catch (error) {
          setIsLoading(false)
          console.error(`Erro ao buscar dados para o CEP ${oficina.cep}:`, error);
          return {
            ...oficina,
            logradouro: 'Logradouro não encontrado',
          };
        }
      });

      const updatedData = await Promise.all(promises);
      const filteredData = updatedData.filter((item) => item !== null);

      setCardsData(filteredData);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.log("Erro: ", e);
    }
  };

  useEffect(() => {
    getOficinas(tipoVeiculo, propulsao, marca);
  }, []);

  const handleCard = (id) => {
    navigate(`/oficinas/${id}`);
  };

  const filtros = (
    <>
      <Input id={"inp_tpVeiculo"} texto={"Tipo de Veículo"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} onChange={(e) => setTipoVeiculo(e.target.value)} value={tipoVeiculo} />
      <Input id={"inp_propulsao"} texto={"Propulsão"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} onChange={(e) => setPropulsao(e.target.value)} value={propulsao} />
      <Input id={"inp_marca"} texto={"Marca"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} onChange={(e) => setMarca(e.target.value)} value={marca} />
    </>
  );

  return (
    <main>
      <Loader show={isLoading} />
      <NavBar currentPage={"oficinas"} />
      <PageStart pagina={"Oficinas"} filtro={filtros} />
      <div onClick={() => getOficinas(tipoVeiculo, propulsao, marca)} className={styles["pesquisa"]}></div>
      <div className={styles["content"]}>
        {cardsData &&
          cardsData.map((data) => (
            <CardContent
              key={data.id}
              type={"Oficina"}
              titulo={data.nome}
              end={data.logradouro + ", " + data.numero}
              tel={data.informacoesOficina.whatsapp || "N/A"}
              nota={data.nota}
              onclickCard={() => handleCard(data.id)}
            />
          ))}
      </div>
      <Footer />
    </main>
  );
};

export default Oficinas;