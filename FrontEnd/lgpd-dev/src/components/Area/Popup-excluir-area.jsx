import React from "react";
import "../../styles/StyleArea/popup-excluir-area.css"

const ExcluirPopupArea = ({ titleArea, mensagem, onConfirm, onCancel }) => {
    return (
        <div className="ctn-popup">
            <div className="content-exclude">
                <h3 className="title-area">{titleArea}</h3>
                <p className="msgArea">{mensagem}</p>
                <div className="btn-exclude">
                    <button onClick={onConfirm} className="btn-confirm">
                        Excluir área
                    </button>
                    <button onClick={onCancel} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExcluirPopupArea;