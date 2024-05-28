import React from "react";
import NavBar from "../../components/navbar/NavBar";
import PageStart from "../../components/pageStart/PageStart";
import Input from "../../components/input/Input";
import seta from "../../utils/assets/seta.svg"

const Pecas = () => {
  const filtros = (
    <>
      <Input texto={"Valor"} imagem={seta} height={"6vh"} width={"7vw"} tamImg={"1vh"} marginRight={"1.5vw"} />
    </>
  )
  return (
    <>
      <NavBar currentPage={"pecas"} />
      <PageStart pagina={"Peças"} filtro={filtros}/>
    </>
  );
};

export default Pecas;
