import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import SearchWithDebounce from "./SearchProcesso";
import ExcluirPopup from "./Popup-excluir-processo";
import { PencilLine, Trash } from "phosphor-react";
import Header from "./Header";
import api from "./apiService";

const Processos = () => {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [processosFiltrados, setProcessosFiltrados] = useState([]);
  const [selectProcessos, setSelectProcessos] = useState("");
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        const response = await api.get("/processos");
        setProcessos(response.data);
        setProcessosFiltrados(response.data);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchProcessos();
  }, []);

  const navegarPara = (rota) => navigate(rota);

  const handleExcluir = (id) => {
    setIdParaExcluir(id);
    setMostrarPopup(true);
  };

  const confirmarExclusao = async () => {
    try {
      await api.delete(`/processos/${idParaExcluir}`);
      const novosProcessos = processos.filter(({ id }) => id !== idParaExcluir);
      setProcessos(novosProcessos);
      setProcessosFiltrados(novosProcessos);
      setMostrarPopup(false);
    } catch (error) {
      console.error("Erro ao excluir processo:", error);
    }
  };

  const cancelarExclusao = () => {
    setMostrarPopup(false);
    setIdParaExcluir(null);
  };

  const handleStatusChange = async (processoId, novoStatus) => {
    try {
      const processoAtualizado = processos.find(({ id }) => id === processoId);
      const response = await api.put(`/processos/${processoId}`, {
        ...processoAtualizado,
        status: novoStatus,
      });

      const novosProcessos = processos.map((processo) =>
        processo.id === processoId ? response.data : processo
      );
      setProcessos(novosProcessos);
      setProcessosFiltrados(novosProcessos);
    } catch (error) {
      console.error("Erro ao atualizar status do processo:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Data Inválida" : date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="processos-container">
      <Menu />
      <Header title={"Processos"} />
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
            {processosFiltrados.length ? (
              processosFiltrados.map(({ id, nome, prioridade, status, dataCriacao }) => (
                <tr key={id}>
                  <td>{nome}</td>
                  <td>{prioridade || "Não definida"}</td>
                  <td>
                    <select
                      value={status || "Não definido"}
                      onChange={(e) => handleStatusChange(id, e.target.value)}
                    >
                      <option value="">Selecione o Status</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Não enviado">Não enviado</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Não respondido">Não respondido</option>
                    </select>
                  </td>
                  <td>{formatDate(dataCriacao)}</td>
                  <td className="acoes">
                    <div className="icones">
                      <button onClick={() => navegarPara(`/editar-processo/${id}`)}>
                        <PencilLine />
                      </button>
                      <button onClick={() => handleExcluir(id)}>
                        <Trash />
                      </button>
                    </div>
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
        <button onClick={() => navegarPara("/Novo-Processo")}>+ Novo Processo</button>
      </div>
    </div>
  );
};

export default Processos;
