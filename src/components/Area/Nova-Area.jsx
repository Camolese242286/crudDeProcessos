import React, { useState } from "react";
import Menu from "../Menu";
import styles from '../../styles/StyleArea/nova-area.css'
function NovaArea() {
    const [nomeArea, setNomeArea] = useState("");
    const [descricaoArea, setDescricaoArea] = useState("");
    const [responsavel, setResponsavel] = useState("");

    return (
        <>
            <div className="index-container">
                <Menu />
            </div>

            <div className="title-area">
                <h2>Nova Área</h2>
            </div>

            <div className="container-area">
                {/* Título e Descrição */}
                <div className="container-title-description">
                    <input
                        className="text-area"
                        type="text"
                        placeholder="Insira aqui o nome da área"
                        value={nomeArea}
                        onChange={(e) => setNomeArea(e.target.value)}
                    />
                    <textarea
                        className="description-area"
                        type="text"
                        placeholder="Adicione uma descrição para essa área"
                        value={descricaoArea}
                        onChange={(e) => setDescricaoArea(e.target.value)}
                    />
                </div>

                {/* Responsável */}
                <div className="select-responsavel-container">
                    <select
                        className="select-responsavel"
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                    >
                        <option value="">Selecione o responsável da área</option>
                        <option value="name 1">Name 1</option>
                        <option value="name 2">Name 2</option>
                        <option value="name 3">Name 3</option>
                    </select>
                </div>

                {/* Botão de Adicionar */}
                <div className="btn-add-area">
                    <button className="botao-area">Adicionar Área</button>
                </div>
            </div>
        </>
    );
}

export default NovaArea;
