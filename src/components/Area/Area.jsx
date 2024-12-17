import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../Menu";
import SearchWithArea from "../Area/SearchArea";

import {PencilSimpleLine, Trash } from "phosphor-react"

import "../../styles/StyleArea/area.css";

function Area() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [areasFiltrados, setAreasFiltrados] = useState("");

  //Excluir o id da area na tabela
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  //Abrir outra página
  const handleNovaArea = () => {
    navigate("/Nova-Area");
  };

  //Os campos serão salvos na tabela após preencher na "Nova-Area"
  useEffect(() => {
    const areasSalvos = JSON.parse(localStorage.getItem("area")) || [];
    setAreas(areasSalvos);
    setAreasFiltrados(areasSalvos);
  }, []);

  //Editar o campo da área
  const handleEditarArea = (id) => {
    navigate(`/editar-area/${id}`);
  }

  const handleExluirArea = (id) => {
    setIdParaExcluir(id);
  }

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="container-area">
        <div className="title">
          <h2>Áreas da Empresa</h2>
        </div>

        <div className="settings">
          <div className="filters-area">
            <select className="slArea">
              <option value="">Todas as áreas</option>
              <option value="Area 1">Área 1</option>
              <option value="Area 2">Área 2</option>
              <option value="Area 3">Área 3</option>
            </select>
          </div>
          <SearchWithArea
            className="search"
            areas={areas}
            setAreasFiltrados={setAreasFiltrados}
          />
          <div className="botao-area">
            <button onClick={handleNovaArea}>+ Nova Área</button>
          </div>
        </div>

        <div className="TableArea">
          <table>
            <thead>
              <tr className="table-names">
                <th>Nome da área</th>
                <th>Responsável</th>
                <th># Sub-Áreas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Aqui você pode mapear os dados filtrados */}
              {areasFiltrados.length > 0 ? (
                areasFiltrados.map((area) => (
                  <tr key={area.id}>
                    <td>{area.nome}</td>
                    <td>{area.responsavel}</td>
                    <td>0</td>
                    <td>Ativo</td>
                    <td className="acoes">
                      <button onClick={() => handleEditarArea(area.id)}>
                        <PencilSimpleLine size={18} />
                      </button>
                      <button onClick={() => handleExluirArea(area.id)}>
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhuma área cadastrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Area;
