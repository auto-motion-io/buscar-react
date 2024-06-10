import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg";
import styles from "./Pecas.module.css";
import CardContent from "../../components/cardContent/CardContent";
import { api1 } from "../../api";
import Footer from "../../components/footer/Footer";

const Pecas = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);

  const getPecas = async () => {
    try {
      const response = await api1.get("/produtoEstoque");
      const { data } = response;

      const updatedData = await Promise.all(
        data.map(async (peca) => {
          if (!peca.oficina.hasBuscar) return null;

          try {
            const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${peca.oficina.cep}/json/`);

            const viaCepData = viaCepResponse.data;

            return {
              ...peca,
              logradouro: viaCepData.logradouro,
            };
          } catch (error) {
            console.error(`Erro ao buscar dados para o CEP ${peca.oficina.cep}:`, error);
            return {
              ...peca,
              logradouro: "Logradouro não encontrado",
            };
          }
        })
      );

      const filteredData = updatedData.filter((item) => item !== null);

      setCardsData(filteredData);
    } catch (e) {
      console.error("Erro ao buscar peças:", e);
    }
  };

  useEffect(() => {
    getPecas();
  }, []);

  const handleCard = (id) => {
    navigate(`/oficinas/${id}`);
  };

  const filtros = (
    <>
      <Input texto={"Valor"} imagem={seta} height={"6vh"} width={"7vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  );

  return (
    <main>
      <NavBar currentPage={"pecas"} />
      <PageStart pagina={"Peças"} filtro={filtros} />
      <div className={styles["content"]}>
        {cardsData &&
          cardsData.map((data) => (
            <CardContent
              key={data.id}
              type={"Peca"}
              titulo={data.nome}
              subT={data.oficina.nome}
              end={data.logradouro + ", " + data.oficina.numero}
              tel={data.oficina.informacoesOficina.whatsapp || "N/A"}
              nota={"R$" +data.valorVenda}
              onclickCard={() => handleCard(data.oficina.id)}
            />
          ))}
      </div>
      <Footer />
    </main>
  );
};

export default Pecas;
