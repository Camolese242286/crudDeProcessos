import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../Menu";
import SearchWithArea from "../Area/SearchArea";

import "../../styles/StyleArea/area.css";

function Area() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [areasFiltrados, setAreasFiltrados] = useState("");

  const handleNovaArea = () => {
    navigate("/Nova-Area");
  };

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
              </tr>
            </thead>
            <tbody>
              {/* Aqui você pode mapear os dados filtrados */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Area;
