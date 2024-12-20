import React, { useState } from "react";
import Menu from "./Menu";
import "../styles/principal.css";
import "../styles/menu.css";
import StatusIndicator from "./StatusIndicator";
import Header from "./Header";

const Principal = () => {
  const [statuses, setStatuses] = useState({
    area1: "Não Enviado",
    area2: "Não Enviado",
    area3: "Não Enviado",
    area4: "Não Enviado",
    area5: "Não Enviado",
  });

  const handleStatusChange = (event, area) => {
    const newStatus = event.target.value;
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [area]: newStatus,
    }));
  };

  return (
    <>
      <div className="index-container">
        <Menu />
        <Header />
      </div>
      <div className="body-container">
        <section className="graficos">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="graphic" key={index}>
              <section className="numericos">
                <div className="num-graphic">{99 - index}</div>
              </section>
              <div>
                <h3>Processos por área</h3>
                <p>Subtítulo {index + 1}</p>
              </div>
            </div>
          ))}
        </section>
        <div className="tabela-usuarios">
          <p>Áreas em inadequação</p>
          <table>
            <thead>
              <tr>
                <th>Área</th>
                <th>Responsável</th>
                <th>Última movimentação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(statuses).map((area, index) => (
                <tr key={area}>
                  <td>Área {index + 1}</td>
                  <td>Responsável {String.fromCharCode(65 + index)}</td>
                  <td>12/{12 - index}/2024</td>
                  <td>
                    <StatusIndicator status={statuses[area]} />
                  </td>
                  <td>
                    <select
                      value={statuses[area]}
                      onChange={(e) => handleStatusChange(e, area)}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Principal;
