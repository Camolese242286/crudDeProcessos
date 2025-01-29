import React from "react";
import "../styles/Popup-excluir-processo.css";

const ExcluirPopup = ({ title, mensagem, onConfirm, onCancel }) => {
  return (
    <div className="popup_delete">
      <div className="conteudo">
        <h3 className="titulo">{title}</h3>
        <p className="mensagem">{mensagem}</p>
        <div className="popup-excluir-botao">
          <button onClick={onCancel} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-confirmar">
            Excluir Processo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcluirPopup;
