import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilLine, Trash } from "phosphor-react";
import Menu from "./Menu";
import SearchWithDebounce from "./SearchProcesso";
import ExcluirPopup from "./Popup-excluir-processo";
import Header from "./Header";
import StatusIndicator from "./StatusIndicator";
import api from "./apiService";
import { Link } from "react-router-dom";
import IconOpen from "../images/iconOpen.png";
import NovoProcesso from "./Novo-Processo";

const Processos = () => {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [processosFiltrados, setProcessosFiltrados] = useState([]);
  const [selectProcessos, setSelectProcessos] = useState("");
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarNovoProcesso, setMostrarNovoProcesso] = useState(false);

  useEffect(() => {
    const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
    setProcessos(processosSalvos);
    setProcessosFiltrados(processosSalvos);
  }, []);

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

  useEffect(() => {
    localStorage.setItem("processos", JSON.stringify(processos));
  }, [processos]);

  const navegarPara = (rota) => navigate(rota);

  const handleExcluir = (id) => {
    setIdParaExcluir(id);
    setMostrarPopup(true);
  };

  const confirmarExclusao = () => {
    const novosProcessos = processos.filter(({ id }) => id !== idParaExcluir);
    setProcessos(novosProcessos);
    setProcessosFiltrados(novosProcessos);
    setMostrarPopup(false);
  };

  const cancelarExclusao = () => {
    setMostrarPopup(false);
    setIdParaExcluir(null);
  };

  const handleNovoProcessoClick = () => {
    setMostrarNovoProcesso(true);
  }

  const handleFecharProcessoClick = () => {
    setMostrarNovoProcesso(false);
  }



  const handleStatusChange = (processoId, novoStatus) => {
    const processoAtualizado = processos.find(({ id }) => id === processoId);
    processoAtualizado.status = novoStatus;

    const novosProcessos = processos.map((processo) =>
      processo.id === processoId ? processoAtualizado : processo
    );

    setProcessos(novosProcessos);
    setProcessosFiltrados(novosProcessos);
    localStorage.setItem("processos", JSON.stringify(novosProcessos));
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
              <th></th>
              <th>Nome Processo</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.length ? (
              processosFiltrados.map((processo) => (
                <tr key={processo.id}>
                  <td>
                    <div>
                      <Link to={`/editar-processo/${processo.id}`}>
                        <img src={IconOpen} alt="Go to Processo" />
                      </Link>
                    </div>
                  </td>
                  <td>{processo.nome}</td>
                  <td>{processo.prioridades || "Não definida"}</td>
                  <td>
                    <div className="status-container">
                      <select
                        value={processo.status || "Não definido"}
                        onChange={(e) =>
                          handleStatusChange(processo.id, e.target.value)
                        }
                      >
                        <option value="">Selecione o Status</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Não Enviado">Não enviado</option>
                        <option value="Respondido">Respondido</option>
                        <option value="Não Respondido">Não respondido</option>
                      </select>
                      <StatusIndicator status={processo.status} />
                    </div>
                  </td>
                  <td>{formatDate(processo.dataCriacao)}</td>
                  <td className="acoes">
                    {/* <button
                        onClick={() =>
                          navegarPara(`/editar-processo/${processo.id}`)
                        }
                      >
                        <PencilLine />
                      </button> */}
                    <button onClick={() => handleExcluir(processo.id)}>
                      <Trash />
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
        <button onClick={handleNovoProcessoClick}>
          + Novo Processo
        </button>
      </div>

      {mostrarNovoProcesso && (
        <div className="desfoquefundo">
          <NovoProcesso onClose={handleFecharProcessoClick} />
        </div>
      )}

    </div>
  );
};

export default Processos;
