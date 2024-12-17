import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import "../../styles/StyleArea/nova-area.css";

function NovaArea() {
  const [nomeArea, setNomeArea] = useState("");
  const [descricaoArea, setDescricaoArea] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const navigate = useNavigate();

  // Função para adicionar uma nova área
  const handleAdicionarArea = () => {
    // Validação dos campos obrigatórios
    if (!nomeArea || !responsavel) {
      alert("Por favor, preencha o nome da área e selecione um responsável.");
      return;
    }

    // Nova área que será adicionada
    const novaArea = {
      id: Date.now(), // Gera um ID único
      nome: nomeArea,
      descricao: descricaoArea,
      responsavel: responsavel,
      subAreas: 0, // Valor padrão
      status: "Ativo", // Status padrão
    };

    // Recupera as áreas existentes do localStorage
    const areasExistentes = JSON.parse(localStorage.getItem("areas")) || [];

    // Adiciona a nova área
    const novasAreas = [...areasExistentes, novaArea];
    localStorage.setItem("areas", JSON.stringify(novasAreas));

    // Redireciona para a página de Áreas
    navigate("/Area");
  };

  return (
    <div className="container-principal">
      <div className="index-container">
        <Menu />
      </div>

      <div className="title-area">
        <h2>Nova Área</h2>
      </div>
      <div className="container-area">
        {/* Título e Descrição */}
        <div className="container-title-description">
          <input
            className="text-area"
            type="text"
            placeholder="Insira aqui o nome da área"
            value={nomeArea}
            onChange={(e) => setNomeArea(e.target.value)}
          />
          <textarea
            className="description-area"
            type="text"
            placeholder="Adicione uma descrição para essa área"
            value={descricaoArea}
            onChange={(e) => setDescricaoArea(e.target.value)}
          />
        </div>

        {/* Responsável */}
        <div className="select-responsavel-container">
          <select
            className="select-responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          >
            <option value="">Selecione o responsável da área</option>
            <option value="Name 1">Name 1</option>
            <option value="Name 2">Name 2</option>
            <option value="Name 3">Name 3</option>
          </select>
        </div>

        {/* Botão de Adicionar */}
        <div className="btn-add-area">
          <button className="botao-area" onClick={handleAdicionarArea}>
            Adicionar Área
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovaArea;
