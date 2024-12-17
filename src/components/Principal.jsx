import React from "react";
import Menu from "./Menu";

import "../styles/principal.css";
import "../styles/menu.css";

const Principal = () => {
  return (
    <>
      <div className="index-container">
        <Menu />
      </div>
      <div className="main-container">
        <div className="body_container">
          <div className="name">
            <p>Início</p>
          </div>

          <section className="graficos">
            <div className="graphic">
              <section className="numericos">
                <div className="numGraphic">99</div>
              </section>
              <div>
                <h3>Processos por área</h3>
                <p>Subtítulo 1</p>
              </div>
            </div>
            <div className="graphic">
              <section className="numericos">
                <div className="numGraphic">98</div>
              </section>
              <div>
                <h3>Processos por área</h3>
                <p>Subtítulo 2</p>
              </div>
            </div>
            <div className="graphic">
              <section className="numericos">
                <div className="numGraphic">97</div>
              </section>
              <div>
                <h3>Processos por área</h3>
                <p>Subtítulo 3</p>
              </div>
            </div>
          </section>

          <div className="TabelaUsuarios">
            <p>Áreas em inadequação</p>
            <table>
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Responsável</th>
                  <th>Última movimentação</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Área 1</td>
                  <td>Responsável A</td>
                  <td>12/12/2024</td>
                  <td>Em andamento</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Principal;
