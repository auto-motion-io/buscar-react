import React from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg"
import styles from "./Oficinas.module.css"
import CardContent from "../../components/cardContent/CardContent";

const Oficinas = () => {

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
        <CardContent type={"Oficina"} titulo={"Primos"} end={"Rua Asdrubal Gonçalves, 187"} tel={"(11)91765-0409"} nota={"10.0"} />
        <CardContent type={"Oficina"} titulo={"Moto Matsul"} end={"Rua Miguel Ferreira de Melo, 987"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
        <CardContent type={"Oficina"} titulo={"Fast Motos"} end={"Avenida Maria Coelho de Aguiar, 1201"} tel={"(11)91765-0409"} nota={"8.5"} />
      </div>
    </>
  );
};

export default Oficinas;
