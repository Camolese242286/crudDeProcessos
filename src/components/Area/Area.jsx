import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import Header from "../Header";
import Search from "./Search";

import ExcluirPopupArea from "./Popup-excluir-area";

import { PencilSimpleLine, Trash } from "phosphor-react"

import "../../styles/StyleArea/area.css";

function Area() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]); // Estado com a lista de áreas
  const [areasFiltrados, setAreasFiltrados] = useState([]);

  useEffect(() => {
    // Carrega as áreas salvas no localStorage
    const areasSalvas = JSON.parse(localStorage.getItem("areas")) || [];
    setAreas(areasSalvas);
    setAreasFiltrados(areasSalvas);
  }, []);

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

  //Excluir o id da area na tabela
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [popupExclusao, setpopupExclusao] = useState(false);

  //Editar o campo da área
  const handleEditarArea = (id) => {
    navigate(`/editar-area/${id}`);
  }

  //Excluir o id da area
  const handleExluirArea = (id) => {
    setIdParaExcluir(id);
    setpopupExclusao(true);
  }

  //Confirmar a exclusão do id 
  const confirmarExclusaoArea = () => {
    const novaAreas = areas.filter(
      (area) => area.id !== idParaExcluir
    );
    setAreas(novaAreas);
    setAreasFiltrados(novaAreas);
    localStorage.setItem("area", JSON.stringify(novaAreas));
    setpopupExclusao(false);
  }

  const cancelarExclusaoArea = () => {
    setpopupExclusao(false);
    setIdParaExcluir(null);
  }

  return (
    <div className="container-page-area">
        <Menu />
        <Header/>
    <div className="container-area">
        <div className="title">
          <h2>Áreas da Empresa</h2>
        </div>

        <div className="settings">
          <div className="filters-area">
            <select
              className="slArea"
              onChange={(e) => {
                const filtro = e.target.value;
                const filtrados = filtro
                  ? areas.filter((area) => area.nome === filtro)
                  : areas;
                setAreasFiltrados(filtrados);
              }}
            >
              <option value="">Todas as áreas</option>
              {areas.map((area) => (
                <option key={area.id} value={area.nome}>
                  {area.nome}
                </option>
              ))}
            </select>
          </div>
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

              {popupExclusao && (
                <ExcluirPopupArea
                  titleArea= "Excluir área?"
                  mensagem= "Essa ação não pode ser desfeita"
                  onConfirm={confirmarExclusaoArea}
                  onCancel={cancelarExclusaoArea}
                />
              )}

              {/*}{areasFiltrados.map((area) => (
                <tr key={area.id}>
                  <td>{area.nome}</td>
                  <td>{area.responsavel}</td>
                  <td>{area.subAreas}</td>
                  <td>{area.status}</td>
                </tr>
              ))}*/}

            </tbody>
          </table>
        </div>
      </div>
     </div>
  );
}

export default Area;
