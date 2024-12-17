import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import Search from "./Search";

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

  const handleNovaArea = () => {
    navigate("/Nova-Area");
  };

  return (
    <div className="container-page">
      <div className="container-area">
        <Menu />
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
              </tr>
            </thead>
            <tbody>
              {areasFiltrados.map((area) => (
                <tr key={area.id}>
                  <td>{area.nome}</td>
                  <td>{area.responsavel}</td>
                  <td>{area.subAreas}</td>
                  <td>{area.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Area;
