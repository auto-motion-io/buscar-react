import React from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg"

const Servicos = () => {
  const filtros = (
    <>
      <Input texto={"Tipo de Veículo"} imagem={seta} height={"6vh"} width={"9vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
      <Input texto={"Valor"} imagem={seta} height={"6vh"} width={"7vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  )
  return (
    <>
      <NavBar currentPage={"servicos"} />
      <PageStart pagina={"Serviços"} filtro={filtros}/>
    </>
  );
};

export default Servicos;
