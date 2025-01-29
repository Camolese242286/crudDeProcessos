import React from "react";

// Componente StatusIndicator que exibe um status baseado em texto.
const StatusIndicator = ({ status }) => {
  let statusText = "";
  let statusStyle = {};

  switch (status) {
    case "Enviado":
      statusText = "Enviado";
      statusStyle = { backgroundColor: "#4caf50", color: "white" }; // Verde
      break;
    case "Não Enviado":
      statusText = "Não Enviado";
      statusStyle = { backgroundColor: "#f44336", color: "white" }; // Vermelho
      break;
    case "Finalizado":
      statusText = "Finalizado";
      statusStyle = { backgroundColor: "#2196f3", color: "white" }; // Azul
      break;
    case "Respondido":
      statusText = "Respondido";
      statusStyle = { backgroundColor: "#ff9800", color: "white" }; // Laranja
      break;
    case "Não Respondido":
      statusText = "Não Respondido";
      statusStyle = { backgroundColor: "#5664b3", color: "white" }; // Cinza
      break;
    default:
      statusText = "Indefinido";
      statusStyle = { backgroundColor: "#9e9e9e", color: "white" }; // Cinza
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "14px",
        padding: "10px",
        borderRadius: "20px",
        width: '130px',
        fontWeight: 'bolder',
        ...statusStyle,
      }}
    >
      {statusText}
    </div>
  );
};

export default StatusIndicator;
