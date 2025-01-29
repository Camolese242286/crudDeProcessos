import React from "react";

const Buscador = () => {
  const containerStyle = {
    position: "relative",
    display: "inline-block",
    width: "250px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px", // Espaço para o ícone à esquerda
    border: "1px solid #6800ff",
    borderRadius: "15px",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const iconStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)", // Centraliza o ícone verticalmente
    color: "#888",
    pointerEvents: "none", // Evita interação com o ícone
    fontSize: "18px",
  };

  return (
    <div style={containerStyle}>
      {/* Ícone da lupa */}
      <span style={iconStyle}>&#x1F50D;</span>
      {/* Input */}
      <input
        type="text"
        placeholder="Pesquisar..."
        style={inputStyle}
      />
    </div>
  );
};

export default Buscador;
