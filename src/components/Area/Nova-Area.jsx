import React, { useState, useEffect } from "react";
import Menu from "../Menu";

import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/StyleArea/nova-area.css";
import Header from "../Header";

function NovaArea() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomeArea, setNomeArea] = useState("");
  const [descricaoArea, setDescricaoArea] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [subArea, setSubArea] = useState("");

  const validarCampos = () => {
    if (!nomeArea || !descricaoArea) {
      alert("Por favor, preencha o nome da Área e a descrição");
      return false;
    }
    return true;
  };

  const handleSalvarArea = () => {
    if (!validarCampos()) return;

    const novaArea = {
      id: id || Date.now(), //Gera um novo ID se não existir
      nome: nomeArea,
      descricao: descricaoArea,
      subArea: subArea,
    };

    if (index >= 0) {
      areasSalvos[index] = novaArea;
    } else {
      areasSalvos.push(novaArea);
    }

    localStorage.setItem("area", JSON.stringify(areasSalvos));
    navigate("/area");
  };

  useEffect(() => {
    if (id) {
      const areasSalvos = JSON.parse(localStorage.getItem("area")) || [];
      const area = areasSalvos.find((a) => a.id === Number(id));

      if (area) {
        setNomeArea(area.nome);
        setDescricaoArea(area.descricao);
        setResponsavel(area.responsavel);
        setSubArea(area.subArea);
      }
    }
  }, [id]);

  const handleCancelArea = () => {
    navigate('/area');
  }

  return (
    <div className="container-principal">
      <div className="index-container">
        <Menu />
        <Header />
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

        <div className="sub-area-container">
          <input
            className="sub-area"
            type="text" 
            placeholder="Sub-Area"
            value={subArea}
            onChange={(e) => setSubArea(e.target.value)}
            />
        </div>

        {/* Botão de Adicionar */}
        <div className="btn-add-area">
          <button className="btn-cancelar-area" onClick={handleCancelArea}>
            Cancelar
          </button>
          <button className="btn-salvar-area" onClick={handleSalvarArea}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovaArea;
