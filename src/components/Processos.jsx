import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "./Menu";
import SearchWithDebounce from "./SearchProcesso";
import ExcluirPopup from "./Popup-excluir-processo";

import { GoPencil, GoTrash } from "react-icons/go";
import Buscador from "./Busca";

const Processos = () => {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [processosFiltrados, setProcessosFiltrados] = useState([]);
  const [selectProcessos, setSelectProcessos] = useState("");

  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleButtonOpen = () => {
    navigate("/Novo-Processo");
  };

  useEffect(() => {
    const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
    setProcessos(processosSalvos);
    setProcessosFiltrados(processosSalvos);
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar-processo/${id}`);
  };

  const handleExcluir = (id) => {
    setIdParaExcluir(id);
    setMostrarPopup(true);
  };

  const confirmarExclusao = () => {
    const novoProcessos = processos.filter(
      (processo) => processo.id !== idParaExcluir
    );
    setProcessos(novoProcessos);
    setProcessosFiltrados(novoProcessos);
    localStorage.setItem("processos", JSON.stringify(novoProcessos));
    setMostrarPopup(false);
  };

  const cancelarExclusao = () => {
    setMostrarPopup(false);
    setIdParaExcluir(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Data Inválida" : date.toLocaleDateString("pt-BR");
  };

  const handleStatusChange = (processoId, novoStatus) => {
    const novosProcessos = processos.map((processo) =>
      processo.id === processoId
        ? { ...processo, status: novoStatus }
        : processo
    );
    setProcessos(novosProcessos);
    localStorage.setItem("processos", JSON.stringify(novosProcessos));
    setProcessosFiltrados(novosProcessos);
  };

  return (
    <div className="processos-container">
      <Menu />
      <div className="header">
        <h1>Processos</h1>
      </div>

      <div className="filters">
        <select
          className="slProcessos"
          value={selectProcessos}
          onChange={(e) => setSelectProcessos(e.target.value)}
        >
          <option value="">Todos os processos</option>
          <option value="Testando1">Testando 1</option>
          <option value="Testando2">Testando 2</option>
          <option value="Testando3">Testando 3</option>
        </select>
        <SearchWithDebounce
          className="componente_Search"
          processos={processos}
          setProcessosFiltrados={setProcessosFiltrados}
        />
      </div>

      <div className="TabelaProcesso">
        <table>
          <thead>
            <tr>
              <th>Nome Processo</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.length > 0 ? (
              processosFiltrados.map((processo) => (
                <tr key={processo.id}>
                  <td>{processo.nome}</td>
                  <td>{processo.prioridades || "Não definida"}</td>
                  <td>
                    <select
                      value={processo.status || "Não definido"}
                      onChange={(e) =>
                        handleStatusChange(processo.id, e.target.value)
                      }
                    >
                      <option value="">Selecione o Status</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Não enviado">Não enviado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não respondido">Não respondido</option>
                    </select>
                  </td>
                  <td>{formatDate(processo.dataCriacao)}</td>
                  <td className="acoes">
                    <button onClick={() => handleEditar(processo.id)}>
                      <GoPencil />
                    </button>
                    <button onClick={() => handleExcluir(processo.id)}>
                      <GoTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  Nenhum processo encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {mostrarPopup && (
        <ExcluirPopup
          title="Excluir processo?"
          mensagem="Essa ação não pode ser desfeita"
          onConfirm={confirmarExclusao}
          onCancel={cancelarExclusao}
        />
      )}

      <div className="botaoNovoProcesso">
        <button onClick={handleButtonOpen}>+ Novo Processo</button>
      </div>
    </div>
  );
};

export default Processos;
