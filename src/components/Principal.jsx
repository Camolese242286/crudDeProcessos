import React, { useEffect, useState } from "react";

import ConfigPopup from "./ConfigPopup";

import Menu from "./Menu";
import "../styles/principal.css";
import "../styles/menu.css";
import StatusIndicator from "./StatusIndicator";
import Header from "./Header";
import { Link } from "react-router-dom";
import IconOpen from "../images/iconOpen.png";

const Principal = () => {
  const [principais, setPrincipais] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [cardConfigs, setCardConfigs] = useState([]);
  //const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const handleStatusChange = (event, area) => {
    const newStatus = event.target.value;

    setStatuses((prevStatuses) => {
      const updatedStatuses = {
        ...prevStatuses,
        [area]: newStatus,
      };

      const principalSalvos =
        JSON.parse(localStorage.getItem("principal")) || [];
      const updatedPrincipais = principalSalvos.map((item) => {
        if (item.nome === area) {
          return { ...item, status: newStatus };
        }
        return item;
      });

      localStorage.setItem("principal", JSON.stringify(updatedPrincipais));
      return updatedStatuses;
    });
  };

  useEffect(() => {
    const principalSalvos = JSON.parse(localStorage.getItem("principal")) || [];
    setPrincipais(principalSalvos);

    const savedConfigs = JSON.parse(localStorage.getItem("cardConfigs")) || [
      {
        id: 0,
        title: "Processo por area",
        subtitle: "Substítulo 1",
        dataType: "area",
      },
      {
        id: 0,
        title: "Processo por area",
        subtitle: "Substítulo 2",
        dataType: "processo",
      },
      {
        id: 0,
        title: "Processo por area",
        subtitle: "Substítulo 3",
        dataType: "outro",
      },
    ];
    setCardConfigs(savedConfigs);

    const initialStatuses = principalSalvos.reduce((acc, item) => {
      acc[item.nome] = item.status || "Não enviado";
      return acc;
    }, {});
    setStatuses(initialStatuses);
  }, []);

  const handleCardClick = (cardId) => {
    if (cardId >= 0 && cardId < cardConfigs.length) {
      setCurrentCard(cardId);
      //setIsPopupOpen(true);
    }
  };

  const updateCardConfig = (cardId, updateConfig) => {
    const newConfigs = cardConfigs.map((config, index) =>
      index === cardId ? { ...config, ...updateConfig } : config
    );
    setCardConfigs(newConfigs);
    localStorage.setItem("cardConfigs", JSON.stringify(newConfigs));
  };

  const calcularTotal = (dataType) => {
    if (dataType === "area") {
      //const areasDistintas = new Set(principais.map((item) => item.nome));
      //return areasDistintas.size;
      const processosSalvos = JSON.parse(localStorage.getItem("area")) || [];
      return processosSalvos.length;
    } else if (dataType === "processo") {
      const processosSalvos =
        JSON.parse(localStorage.getItem("processos")) || [];
      return processosSalvos.length;
    } else {
      return 0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Data inválida" : date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <div className="index-container">
        <Menu />
        <Header />
      </div>
      <div className="body-container">
        <section className="graficos">
          {cardConfigs.map((config, index) => (
            <div
              className="graphic"
              key={index}
              onClick={() => handleCardClick(index)}
            >
              <section className="numericos">
                <div className="num-graphic">
                  {calcularTotal(config.dataType)}
                </div>
              </section>
              <div>
                <h3>{config.title}</h3>
                <p>{config.subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        {/*}{isPopupOpen && (
          <ConfigPopup
            cardConfigs={cardConfigs[currentCard]}
            onClose={() => setIsPopupOpen(false)}
            onSave={(updateConfig) => updateCardConfig(currentCard, updateConfig)}
          />
        )}*/}

        <div className="tabela-usuarios">
          <p>Áreas em inadequação</p>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Área</th>
                <th>Responsável</th>
                <th>Última movimentação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {principais.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div>
                      <Link to="/area">
                        <img src={IconOpen} alt="Go to Area" />
                      </Link>
                    </div>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.responsavel}</td>
                  <td>{formatDate(item.ultimaMovimentacao)}</td>
                  <td>
                    <StatusIndicator status={statuses[item.nome]} />
                  </td>
                  <td>
                    <select
                      value={statuses[item.nome]}
                      onChange={(e) => handleStatusChange(e, item.nome)}
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
