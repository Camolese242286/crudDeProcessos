import React, { useState } from "react";

import '../styles/Popup_Salvar_Enviar.css'

const EnviarProcesso = ({ visivel, fecharPopup, nomeProcesso, onEnviar }) => {
    const [inputValue, setInputValue] = useState("");
    const [responsaveis, setResponsaveis] = useState([]);
    const [opcoes, setOpcoes] = useState([
        "Ana Burbano",
        "Anna Puerta",
        "Arthur Pereira Policarpo",
        "Guilherme Nogueira de Paula",
        "João Antonio",
        "Larissa Gomes Garcia",
        "Leonardo Gratti Volf",
        "Lucas Teixeira Aita",
        "Nuno Manuel Duarte",
        "Rafael Barbosa Camolese",
        "Rafael de Oliveira Rocha",
        "Rafaela Silverio da Silva",
        "Raulison Alves Resende",
        "Rene Menezes Santos",
        "Vitoria da Silva Torres",
    ]);

    const handleAddResponsavel = (nome) => {
        if (!responsaveis.includes(nome)) {
            setResponsaveis([...responsaveis, nome]);
        }
        setInputValue(""); //Limpa os campos de entrada
    };

    const handleRemoverResponsavel = (nome) => {
        setResponsaveis(responsaveis.filter((item) => item !== nome));
    };

    const handleEnviar = () => {
        onEnviar(responsaveis);
        fecharPopup();
    }

    const filteredOptions = opcoes.filter(
        (nome) =>
            nome.toLowerCase().includes(inputValue.toLowerCase()) &&
            !responsaveis.includes(nome)
    );

    if (!visivel) return null; //Se não estiver visível, não reneriza nada

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="content">
                    <h2>Enviar processo</h2>
                    <p className="descricaoPopup">Você está enviando o processo "{nomeProcesso}" para respostas</p>
                    <p className="labelNomes">Selecione os responsáveis pelas respostas das áreas</p>
                    <input
                        className="inputNomes"
                        type="text"
                        placeholder="Digite os nomes ou emails dos responsáveis"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {inputValue && filteredOptions.length > 0 && (
                        <ul className="dropdown">
                            {filteredOptions.map((nome) => (
                                <li key={nome} onClick={() => handleAddResponsavel(nome)}>
                                    {nome}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="popup-container">
                        <div className="tags-container">
                            {responsaveis.map((nome) => (
                                <div key={nome} className="tag">
                                    {nome}
                                    <button className="remove-btn"
                                        onClick={() => handleRemoverResponsavel(nome)}> X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="botoesPopup">
                        <button className="fecharPop" onClick={fecharPopup}>Cancelar</button>
                        <button className="enviarPop" onClick={handleEnviar}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnviarProcesso;

