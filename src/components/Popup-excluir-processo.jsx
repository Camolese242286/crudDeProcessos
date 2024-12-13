import React from "react";

import "../styles/Popup-excluir-processo.css"

const ExcluirPopup = ({ title, mensagem, onConfirm, onCancel }) => {
    return (
        <div className="popup">
            <div className="conteudo">
                <div className="conteudo-msg">
                    <h3 className="titulo">{title}</h3>
                    <p className="mensagem">{mensagem}</p>
                </div>
            </div>
            <div className="popup-botao">
                <button onClick={onConfirm} className="btn-confirmar">Excluir Processo</button>
                <button onClick={onCancel} className="btn-cancelar">Cancelar</button>
            </div>
        </div>
    )
}

export default ExcluirPopup;