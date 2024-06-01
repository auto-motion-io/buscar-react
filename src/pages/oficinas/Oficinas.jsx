import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg";
import styles from "./Oficinas.module.css";
import CardContent from "../../components/cardContent/CardContent";
import api from "../../api";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const Oficinas = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);

  function getOficinas() {
    api.get("/oficinas")
      .then(async (response) => {
        const { data } = response;

        const updatedData = await Promise.all(data.map(async (oficina) => {
          try {
            if (!oficina.hasBuscar) return null; // Ignorar se hasBuscar for false

            const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${oficina.cep}/json/`);
            const viaCepData = viaCepResponse.data;

            return {
              ...oficina,
              logradouro: viaCepData.logradouro,
            };
          } catch (error) {
            console.error(`Erro ao buscar dados para o CEP ${oficina.cep}:`, error);
            return {
              ...oficina,
              logradouro: 'Logradouro não encontrado',
            };
          }
        }));

        // Filtrar itens nulos (cujo hasBuscar seja false)
        const filteredData = updatedData.filter(item => item !== null);

        setCardsData(filteredData);
      })
      .catch((e) => {
        console.log("erro" + e);
      });
  }

  useEffect(() => {
    getOficinas();
  }, []);

  const handleCard = (id) =>{
    navigate(`/oficinas/${id}`)
  }

  const filtros = (
    <>
      <Input texto={"Tipo de Veículo"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Propulsão"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Marca"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  );

  return (
    <>
      <NavBar currentPage={"oficinas"} />
      <PageStart pagina={"Oficinas"} filtro={filtros} />
      <div className={styles["content"]}>
        {cardsData && cardsData.map((data) => (
          <CardContent
            key={data.id}
            type={"Oficina"}
            titulo={data.nome}
            end={data.logradouro + ", " + data.numero}
            tel={data.informacoesOficina.whatsapp}
            nota={data.informacoesOficina.horarioFimFds}
            onclickCard={() => handleCard(data.id)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Oficinas;
