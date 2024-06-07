import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg";
import styles from "./Servicos.module.css";
import CardContent from "../../components/cardContent/CardContent";
import { api1, api2 } from "../../api";
import Footer from "../../components/footer/Footer";

const Servicos = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);

  const getServicos = async () => {
    try {
      const response = await api1.get("/buscar-servicos");
      const { data } = response;

      const updatedData = await Promise.all(
        data.map(async (servico) => {
          if (!servico.oficina.hasBuscar) return null;

          try {
            const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${servico.oficina.cep}/json/`);
            const notaResponse = await api2.get(`/avaliacoes/media-notas-oficina/${servico.oficina.id}`);

            const viaCepData = viaCepResponse.data;
            const notaOficina = notaResponse.data;

            return {
              ...servico,
              logradouro: viaCepData.logradouro,
              nota: parseFloat(notaOficina.nota).toFixed(1),
            };
          } catch (error) {
            console.error(`Erro ao buscar dados para o CEP ${servico.oficina.cep}:`, error);
            return {
              ...servico,
              logradouro: "Logradouro não encontrado",
              nota: "N/A", // Padrão para "N/A" se houver um erro ao buscar a nota
            };
          }
        })
      );

      const filteredData = updatedData.filter((item) => item !== null);

      setCardsData(filteredData);
    } catch (e) {
      console.error("Erro ao buscar serviços:", e);
    }
  };

  useEffect(() => {
    getServicos();
  }, []);

  const handleCard = (id) => {
    navigate(`/oficinas/${id}`);
  };

  const filtros = (
    <>
      <Input texto={"Tipo de Veículo"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Valor"} imagem={seta} height={"6vh"} width={"7vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  );

  return (
    <>
      <NavBar currentPage={"servicos"} />
      <PageStart pagina={"Serviços"} filtro={filtros} />
      <div className={styles["content"]}>
        {cardsData &&
          cardsData.map((data) => (
            <CardContent
              key={data.id}
              type={"Servico"}
              titulo={data.nome}
              subT={data.oficina.nome}
              end={data.logradouro + ", " + data.oficina.numero}
              tel={data.oficina.informacoesOficina.whatsapp || "N/A"}
              nota={data.nota}
              onclickCard={() => handleCard(data.oficina.id)}
            />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Servicos;
