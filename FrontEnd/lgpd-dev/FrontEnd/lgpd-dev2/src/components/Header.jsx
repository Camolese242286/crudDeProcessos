import React from "react";
import { useLocation } from "react-router-dom"; // Para capturar a rota atual

import "../styles/header.css";

const Header = () => {
  const location = useLocation(); // Obtém a rota atual

  // Mapeia nomes amigáveis para cada rota
  const pageNames = {
    "/principal": "Início",
    "/processos": "Processos",
    "/Novo-Processo": "Novo Processo",
    "/area": "Áreas da Empresa",
    "/Nova-Area": "Nova Áreas da Empresa",
    "/editar-area": "Editando Áreas da Empresa",
    "/Outros": "Outros Exemplos",
  };

  const pageTitle = pageNames[location.pathname] || "LGPD";

  return (
    <header className="header">
      <h1>{pageTitle}</h1>
    </header>
  );
};

export default Header;
