import React, { useState } from "react";

import '../styles/configPopup.css'

const ConfigPopup = ({ cardConfig = {}, onClose, onSave }) => {
    const [title, setTitle] = useState(cardConfig.title || "");
    const [subtitle, setSubtitle] = useState(cardConfig.subtitle || "");
    const [dataType, setDataType] = useState(cardConfig.dataType || "area");

    const handleSave = () => {
        onSave({ title, subtitle, dataType });
        onClose();
    }

    return (
        <div className="popup-over">
            <div className="pop-cont">
                <h1 className="pop-title">Configurar Card</h1>
                <label className="pTitle">
                    <p>Título:</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <p>Subtitulo:</p>
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                </label>
                <label className="typeData">
                    <p>Tipo de Dado:</p>
                    <select
                        className="select-card"                        
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                    >
                        <option value="area">Area</option>
                        <option value="processo">Processo</option>
                        <option value="outro">Outro</option>
                    </select>
                </label>

                <div className="popup-action">
                    <button onClick={handleSave} className="save">Salvar</button>
                    <button onClick={onClose} className="cancel">Cancelar</button>
                </div>
            </div>
        </div>
    )

}

export default ConfigPopup;