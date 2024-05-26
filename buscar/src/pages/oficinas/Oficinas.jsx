import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg"
import styles from "./Oficinas.module.css"
import CardContent from "../../components/cardContent/CardContent";
import api from "../../api";

const Oficinas = () => {

  const [cardsData, setCardsData] = useState()

  function getOficinas(){
    api.get().then((response) => {
      const {data} = response;
      console.log(data)
      setCardsData(data)
    }).catch((e) => {
      console.log("erro" + e)
    })
  }

  useEffect(() => {
    getOficinas();
  }, [])

  const filtros = (
    <>
      <Input texto={"Tipo de Veículo"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Propulsão"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Marca"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  )
  return (
    <>
      <NavBar currentPage={"oficinas"} />
      <PageStart pagina={"Oficinas"} filtro={filtros} />
      <div className={styles["content"]}>
        {/* <CardContent type={"Oficina"} titulo={"Primos"} end={"Rua Asdrubal Gonçalves, 187"} tel={"(11)91765-0409"} nota={"10.0"} /> */}
        {cardsData && cardsData.map((data) => (
          <CardContent 
            type={"Oficina"}
            titulo={data.nomeOficina}
            end={data.endereco}
            tel={data.telefone}
            nota={data.nota}
          />
        ))}
      </div>
    </>
  );
};

export default Oficinas;
