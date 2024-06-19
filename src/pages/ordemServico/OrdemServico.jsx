import React, { useState, useRef, useEffect } from "react";
import styles from "./OrdemServico.module.css";
import logo from "../../utils/assets/pit&buscar.svg"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Botão from "../../components/botao/Botao"
const OrdemServico = () => {
    const contentRef = useRef();

    const gerarPDF = () => {
        const content = contentRef.current;

        html2canvas(content, { scale: 3 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            const imgWidth = 210; // Largura A4 em mm
            const imgProps = canvas.width / canvas.height;
            const pdfHeight = imgWidth / imgProps;

            const pdf = new jsPDF('p', 'mm', [imgWidth, pdfHeight]);

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
            pdf.save("ordem-servico.pdf");
        });
    };

    return (
    <div>
        <div className={styles["botao"]}>
        <Botão onClick={gerarPDF} cor="#435d44" texto="Gerar OS"  />
        </div>
 <div ref={contentRef} className={styles["body"]}>
        <div className={styles["folha"]}>
        <div className={styles["id"]}>
            <div className={styles["id_tag"]}>
                <span className={styles["fonte-grande1"]}>#</span><span className={styles["fonte-grande1"]}>3566</span>
            </div>
            <div  className={styles["token"]}>
            <span className={styles["fonte-pequena"]}>Token: </span><span className={styles["fonte-pequena"]}>25BYAN</span>
            </div>

        </div>

        <div className={styles["infosGerais"]}>

            <div className={styles["infos1"]} >
                <span className={styles["fonte-negrito"]}>Início</span>
                <span className={styles["fonte-pequena"]}>08/07/2024</span>
                <span className={styles["fonte-negrito"]}>Término</span>
                <span className={styles["fonte-pequena"]}>08/07/2024</span>

            </div>
            <div className={styles["infos2"]}>
                <span className={styles["fonte-negrito"]}>Status</span>
                <span className={styles["fonte-pequena"]}>Em andamento</span>
                <span className={styles["fonte-negrito"]}>Classificação</span>
                <span className={styles["fonte-pequena"]}>Serviço</span>
            </div>
            <div className={styles["infos3"]}>
                <span className={styles["fonte-negrito"]}>Garantia</span>
                <span className={styles["fonte-pequena"]}>30 Dias</span>
            </div>
        </div>



        <div className={styles["clienteOficina"]}>
        <div className={styles["oficina"]}>
                <span className={styles["fonte-media"]}>Dados da Oficina</span>
                <span className={styles["fonte-pequena"]}>Milton Serviços LTDA</span>
                <span className={styles["fonte-pequena"]}>11 96815-6570</span>
                <span className={styles["fonte-pequena"]}>automilton@gmail.com</span>
                <div><span className={styles["fonte-pequena"]}>Rua Miguel Ferreira de Melo</span><span className={styles["fonte-pequena"]}>,</span><span className={styles["fonte-pequena"]}>256</span></div>
                <div><span className={styles["fonte-pequena"]}>São Paulo</span><span className={styles["fonte-pequena"]}>,</span><span className={styles["fonte-pequena"]}>SP</span></div>
        </div>
        <div className={styles["cliente"]}>
                <span className={styles["fonte-media"]}>Dados da Oficina</span>
                <span className={styles["fonte-pequena"]}>Milton Serviços LTDA</span>
                <span className={styles["fonte-pequena"]}>11 96815-6570</span>
                <span className={styles["fonte-pequena"]}>automilton@gmail.com</span>
        </div>
        </div>


        <div className={styles["veiculo"]}>
            <div className={styles["titulo1"]}>
                <span className={styles["fonte-media"]}>Dados do Veículo</span>
            </div>

            <div className={styles["titulos2"]}>
             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Placa</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Cor</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Modelo</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Ano</span>
             </div>
            </div>


            <div className={styles["linhaRegistro"]}>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>CMM5861</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>Prata</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>1.8</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>1998</span>
             </div>
        

            </div>

        </div>


        <div className={styles["produto"]}>
            <div className={styles["titulo1"]}>
                <span className={styles["fonte-media"]}>Produtos</span>
            </div>

            <div className={styles["titulos2"]}>
             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Nome</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Quantidade</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Valor Unidade</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Valor Total</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Garantia</span>
             </div>
            </div>


            <div className={styles["linhaRegistro"]}>

            <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>Filtro de Óleo</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>10</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>R$</span><span className={styles["fonte-pequena"]}>58,00</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>R$</span><span className={styles["fonte-pequena"]}>58,00</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>90 Dias</span>
             </div>

            </div>
        </div>


        <div className={styles["serviços"]}>
        <div className={styles["titulo1"]}>
                <span className={styles["fonte-media"]}>Serviços</span>
            </div>

            <div className={styles["titulos2"]}>
             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Nome</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Valor Total</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-negrito"]}>Garantia</span>
             </div>
            </div>


            <div className={styles["linhaRegistro"]}>

            <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>Troca de Filtro de Óleo</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>R$</span><span className={styles["fonte-pequena"]}>58,00</span>
             </div>

             <div className={styles["unico"]}>
             <span className={styles["fonte-pequena"]}>90 Dias</span>
             </div>

            </div>

        </div>


        <div className={styles["total"]}>
        <div>
        <span className={styles["fonte-grande"]}>Valor Total</span>
        </div>

        <div>
        <span className={styles["fonte-grande"]}>R$</span><span className={styles["fonte-grande"]}>235,95</span>  
        </div>

        </div>


        <div className={styles["footer"]}>
            <img src={logo} alt="" width={"200px"}/>
        </div>


        </div>
       </div>

    </div>
      
    );
};

export default OrdemServico;
