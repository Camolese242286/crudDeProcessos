import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Hook from "./Hook";
import Select from "react-select";
import SearchWithDebounce from "./SearchProcesso";
import ExcluirPopup from "./Popup-excluir-processo";

import { BiBorderRadius, BiDotsVerticalRounded } from "react-icons/bi";
import { GoPencil, GoTrash } from "react-icons/go";

import "./Novo-Processo"

import '../styles/processos.css'

const Processos = () => {
    const navigate = useNavigate();
    const [processos, setProcessos] = useState([]);
    const [processosFiltrados, setProcessosFiltrados] = useState([]);
    const [selectProcessos, setSelectProcessos] = useState("");

    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const [mostrarPopup, setMostrarPopup] = useState(false);

    /*const handleChange = (selectedOption) => {
        console.log("Selecionado: ", selectedOption);
    }*/

    const handleButtonOpen = () => {
        navigate('/Novo-Processo');
    }

    useEffect(() => {
        const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
        setProcessos(processosSalvos);
        setProcessosFiltrados(processosSalvos);
    }, []);

    /*const processosFiltrados = processos.filter((processo) => {
        if (!statusSelecionado) return true;
        return processo.status === statusSelecionado;
    })*/

    const handleEditar = (id) => {
        navigate(`/editar-processo/${id}`);
    }

    const handleExcluir = (id) => {
        setIdParaExcluir(id);
        setMostrarPopup(true);
    };

    const confirmarExclusao = () => {
        const novoProcessos = processos.filter((processo) => processo.id !== idParaExcluir)
        setProcessos(novoProcessos);
        setProcessosFiltrados(novoProcessos);
        localStorage.setItem("processos", JSON.stringify(novoProcessos));
        setMostrarPopup(false);
    };

    const cancelarExclusao = () => {
        setMostrarPopup(false);
        setIdParaExcluir(null);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "Data Inválida" : date.toLocaleDateString("pt-BR");
    };

    const handleStatusChange = (processoId, novoStatus) => {
        const novosProcessos = processos.map((processo) =>
            processo.id === processoId ? { ...processo, status: novoStatus } : processo
        );
        setProcessos(novosProcessos);
        localStorage.setItem("processos", JSON.stringify(novosProcessos));

        setProcessosFiltrados(novosProcessos);
    }

    return (
        <>
            <div className="content-title">
                <Hook />
                <div className="page">
                    <p>Processos</p>
                </div>
            </div>

            <div className="select-processos">
                <select className="slProcessos"
                    value={selectProcessos}
                    onChange={(e) => setSelectProcessos(e.target.value)}
                >
                    <option value="">Todos os processos</option>
                    <option value="Testando1">Testando 1</option>
                    <option value="Testando2">Testando 2</option>
                    <option value="Testando3">Testando 3</option>
                </select>
                {/*}<Select
                    options={options}
                    placeholder="Todos os processos"
                    onChange={handleChange}
                    styles={customStyles}
                />*/}
            </div>

            <div className="searchProcesso">
                <SearchWithDebounce
                    processos={processos}
                    setProcessosFiltrados={setProcessosFiltrados}
                />
            </div>

            <div className="TabelaProcesso">
                <div>
                    <table border='1'>
                        <thead>
                            <tr className="Nomes-tabela">
                                <th className="nomeProcesso">Nome processo</th>
                                <th>Prioridade</th>
                                <th>Status</th>
                                <th className="dtaCriacao">Data da criação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processosFiltrados.length > 0 ? (
                                processosFiltrados.map((processo) => (
                                    <tr key={processo.id}>
                                        <td className="link-processo">{processo.nome}</td>
                                        <td className="prioridade">{processo.prioridades || "Não definida"}</td>
                                        <td className="status">
                                            <select
                                                value={processo.status || "Não definido"}
                                                onChange={(e) =>
                                                    handleStatusChange(processo.id, e.target.value)
                                                    /*const novoStatus = e.target.value;
                                                    setProcessos((prev) =>
                                                        prev.map((p) =>
                                                            p.id === processo.id ? { ...p, status: novoStatus } : p
                                                        ));
                                                    localStorage.setItem("processos", JSON.stringify(processos));*/
                                                }
                                            >
                                                <option value="">Selecione o Status</option>
                                                <option value="Enviado">Enviado</option>
                                                <option value="Não enviado">Não enviado</option>
                                                <option value="Respondido">Respondido</option>
                                                <option value="Não respondido">Não respondido</option>
                                            </select>
                                        </td>
                                        <td className="dataCriacao">{formatDate(processo.dataCriacao)}
                                            <div className="menu-container">
                                                <div className="menu-btn">
                                                    <BiDotsVerticalRounded size={22} />
                                                </div>

                                                <div className="menu-opcoes">
                                                    <button className="btn-editar" onClick={() => handleEditar(processo.id)}><GoPencil /> Editar</button>
                                                    <button className="btn-excluir" onClick={() => handleExcluir(processo.id)}><GoTrash /> Excluir</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        Nenhum processo encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {mostrarPopup && (
                        <ExcluirPopup
                            title="Excluir processo?"
                            mensagem="Essa ação não pode ser desfeita"
                            onConfirm={confirmarExclusao}
                            onCancel={cancelarExclusao}
                        />
                    )}
                </div>
            </div>

            <div className="botaoNovoProcesso">
                <button onClick={handleButtonOpen} className="novoProcesso">+ Novo Processo</button>
            </div>
        </>
    )
}

export default Processos;