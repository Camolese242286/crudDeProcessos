import React, { useState } from "react";
import Menu from "./Menu";
import "../styles/principal.css";
import "../styles/menu.css";
import StatusIndicator from "./StatusIndicator";
import Header from "./Header";

const Principal = () => {
  // Usando um estado de objeto para manter os status de cada linha de forma independente
  const [statuses, setStatuses] = useState({
    area1: "Não Enviado",
    area2: "Não Enviado",
    area3: "Não Enviado",
    area4: "Não Enviado",
    area5: "Não Enviado",
  });

  // Função para lidar com a mudança do status no dropdown
  const handleStatusChange = (event, area) => {
    const newStatus = event.target.value;
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [area]: newStatus, // Atualiza o status da área específica
    }));
  };

  return (
    <>
      <div className="index-container">
        <Menu />
        <Header />
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
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Área 1</td>
                  <td>Responsável A</td>
                  <td>12/12/2024</td>
                  <td>
                    {/* StatusIndicator baseado no status da área1 */}
                    <StatusIndicator status={statuses.area1} />
                  </td>
                  <td>
                    {/* Dropdown para mudar o status de Área 1 */}
                    <select
                      value={statuses.area1}
                      onChange={(e) => handleStatusChange(e, "area1")}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Área 2</td>
                  <td>Responsável B</td>
                  <td>12/05/2023</td>
                  <td>
                    {/* StatusIndicator baseado no status da área2 */}
                    <StatusIndicator status={statuses.area2} />
                  </td>
                  <td>
                    {/* Dropdown para mudar o status de Área 2 */}
                    <select
                      value={statuses.area2}
                      onChange={(e) => handleStatusChange(e, "area2")}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Área 3</td>
                  <td>Responsável C</td>
                  <td>12/06/2023</td>
                  <td>
                    {/* StatusIndicator baseado no status da área3 */}
                    <StatusIndicator status={statuses.area3} />
                  </td>
                  <td>
                    {/* Dropdown para mudar o status de Área 3 */}
                    <select
                      value={statuses.area3}
                      onChange={(e) => handleStatusChange(e, "area3")}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Área 4</td>
                  <td>Responsável D</td>
                  <td>12/07/2023</td>
                  <td>
                    {/* StatusIndicator baseado no status da área4 */}
                    <StatusIndicator status={statuses.area4} />
                  </td>
                  <td>
                    {/* Dropdown para mudar o status de Área 4 */}
                    <select
                      value={statuses.area4}
                      onChange={(e) => handleStatusChange(e, "area4")}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Área 5</td>
                  <td>Responsável E</td>
                  <td>12/08/2023</td>
                  <td>
                    {/* StatusIndicator baseado no status da área5 */}
                    <StatusIndicator status={statuses.area5} />
                  </td>
                  <td>
                    {/* Dropdown para mudar o status de Área 5 */}
                    <select
                      value={statuses.area5}
                      onChange={(e) => handleStatusChange(e, "area5")}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Não Enviado">Não Enviado</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não Respondido">Não Respondido</option>
                    </select>
                  </td>
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
