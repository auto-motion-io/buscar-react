import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Oficinas from "./pages/oficinas/Oficinas";
import Servicos from "./pages/servicos/Servicos";
import Pecas from "./pages/pecas/Pecas";
import MeusServicos from "./pages/meusServicos/MeusServicos";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/oficinas" element={<Oficinas />} />
                        <Route path="/servicos" element={<Servicos />} />
                        <Route path="/pecas" element={<Pecas />} />
                        <Route path="/meusServicos" element={<MeusServicos />} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;