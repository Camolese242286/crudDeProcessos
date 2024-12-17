import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Principal from "./components/Principal";
import Processos from "./components/Processos";
import NovoProcesso from "./components/Novo-Processo";
// import Buscar from "./components/BuscarQuestao";
import Popup from "./components/Popup_Salvar_Enviar";
import Questionario from "./components/Notificacao/notificacao"
import NovaArea from "./components/Area/Nova-Area"

import Area from "./components/Area/Area"

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/principal"
          element={
            <Principal
              handleOpenPopup={handleOpenPopup}
              isPopupOpen={isPopupOpen}
              handleClosePopup={handleClosePopup}
            />
          }
        />
        <Route path="/processos" element={<Processos />} />
        <Route path="/Novo-Processo" element={<NovoProcesso />} />
        <Route path="/editar-processo/:id" element={<NovoProcesso />} />
        <Route path="/salvar-enviar" element={<Popup />} />
        <Route path="/area" element={<Area />} />
        <Route path="/questionario/:id" element={<Questionario />} />
        <Route path="/Nova-Area" element={<NovaArea />} />
        <Route path="/editar-area/:id" element={<NovaArea />} />
        
      </Routes>
    </>
  );
}

export default App;
