import React, { useState } from "react";

import Hook from "../Hook"

function NovaArea() {
    const [nomeArea, setNomeArea] = useState("");
    const [descricaoArea, setDescricaoArea] = useState("");
    const [responsavel, setResponsavel] = useState("");
    return (
        <>
            <div className="index-container">
                <Hook />
            </div>

            <div className="title-area">
                <h2>Nova Área</h2>
            </div>

            <div className="container">
                <div className="container-title-description">
                    <input
                        className="text-area"
                        type="text"
                        placeholder="Insira aqui o nome da área"
                        value={nomeArea}
                        onChange={(e) => setNomeArea(e.target.value)}
                    />
                    <div>
                        <textarea
                            className="description-area"
                            type="text"
                            placeholder="Adicione uma descrição para esse processo"
                            value={descricaoArea}
                            onChange={(e) => setDescricaoArea(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <select className="select-responsavel">
                        <option value="">Selecione o responsável da área</option>
                        <option value="name 1">Name 1</option>
                        <option value="name 2">Name 2</option>
                        <option value="name 3">Name 3</option>
                    </select>
                </div>

            </div>


        </>



    )
}

export default NovaArea;