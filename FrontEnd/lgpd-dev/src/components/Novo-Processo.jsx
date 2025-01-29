import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Processos";
import Questao from "./Questao";
import EnviarProcesso from "./Popup_Salvar_Enviar";
import "../styles/novo-processo.css";

function NovoProcesso({ onClose, processo, onSave }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [currentView, setCurrentView] = useState("");
  const [editandoNomeProcesso, setEditandoNomeProcesso] = useState(false);
  const [nomeProcesso, setNomeProcesso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridades, setPrioridade] = useState("");
  const [questoes, setQuestoes] = useState([]); // Guardar todas as questões criadas
  const [questoesPorTipo, setQuestoesPorTipo] = useState({
    "Texto-aberto": [],
    "Upload-arquivo": [],
    CheckList: [],
    "Seletor-opcoes": [],
  });

  const [SelectedOption, setSelectedOption] = useState(""); // Tipo de questão selecionado
  const [popupVisivel, setPopupVisivel] = useState(false);

  useEffect(() => {
    if (processo) {
      setNomeProcesso(processo.nome);
      setPrioridade(processo.prioridades);
      setDescricao(processo.descricao);
      setQuestoes(processo.questoes || []);
    } else {
      setNomeProcesso("");
      setDescricao("");
      setPrioridade("");
      setQuestoes([]);
    }
    //}
  }, [processo]);

  const validarCampos = () => {
    if (!nomeProcesso || !descricao) {
      alert("Por favor, preencha o nome do Processo e a descrição");
      return false;
    }
    setStep(2);
    return true;
  };

  const handleSalvarClick = () => {
    if (!validarCampos()) return;

    const novoProcesso = {
      id: processo ? processo.id : Date.now(),
      nome: nomeProcesso,
      descricao: descricao,
      prioridades: prioridades,
      dataCriacao: new Date().toISOString(),
      questoes: [...questoes], // Salvar todas as questões, sem separar por tipo
    };

    onSave(novoProcesso);
  };

  const handleAbrirPopup = () => {
    if (!validarCampos()) return;
    setPopupVisivel(true);
  };

  const handleFecharPopup = () => {
    setPopupVisivel(false);
  };

  const handleCancelarClick = () => {
    navigate("/processos");
  };

  const handleCancelarNovoProcesso = () => {
    setStep(1);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAdicionarQuestao = () => {
    if (!SelectedOption) {
      alert("Por favor, selecione um tipo de questão antes de adicionar");
      return;
    }
    const novaQuestao = {
      id: questoes.length + 1,
      tipo: SelectedOption,
      titulo: "",
      resposta: SelectedOption === "Texto-aberto" ? "" : null,
      itens: SelectedOption === "CheckList" ? [] : null,
      opcoes: SelectedOption === "Seletor-opcoes" ? [] : null,
      arquivo: SelectedOption === "Upload-arquivo" ? null : undefined,
    };
    setQuestoes([...questoes, novaQuestao]);
    setSelectedOption("");
  };

  const handleMoverQuestaoParaCima = (index) => {
    if (index === 0) return; // Não faz nada se for o primeiro item

    const questoesAtualizadas = [...questoes];
    const temp = questoesAtualizadas[index - 1];
    questoesAtualizadas[index - 1] = questoesAtualizadas[index];
    questoesAtualizadas[index] = temp;

    setQuestoes(questoesAtualizadas);
  };

  const handleMoverQuestaoParaBaixo = (index) => {
    if (index === questoes.length - 1) return; // Não faz nada se for o último item

    const questoesAtualizadas = [...questoes];
    const temp = questoesAtualizadas[index + 1];
    questoesAtualizadas[index + 1] = questoesAtualizadas[index];
    questoesAtualizadas[index] = temp;

    setQuestoes(questoesAtualizadas);
  };

  const handleRemoverQuestao = (id) => {
    const questoesAtualizadas = questoes.filter((questao) => questao.id !== id);
    setQuestoes(questoesAtualizadas);
  };

  const handleEditarQuestao = (id, novosDados) => {
    const questoesAtualizadas = questoes.map((questao) =>
      questao.id === id ? { ...questao, ...novosDados } : questao
    );
    setQuestoes(questoesAtualizadas);
  };

  const renderizarQuestao = () => {
    return questoes.map((questao) => <div key={questao.id}></div>);
  };

  return (
    <div className="container-novo-processo">
      <div className="popupContainer">
        <div className="etapa-1">
          {step === 1 ? (
            <div className="containerProcesso">
              <div className="container-titulo">
                <input
                  className="texto"
                  type="text"
                  placeholder="Insira aqui o nome do processo"
                  value={nomeProcesso}
                  onChange={(e) => setNomeProcesso(e.target.value)}
                  onFocus={() => setEditandoNomeProcesso(true)}
                  onBlur={() => setEditandoNomeProcesso(false)}
                />
                <div>
                  <input
                    className="descricao"
                    placeholder="Adicione uma descrição para esse processo"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
              </div>

              <div className="prioridade">
                <p>Prioridade</p>
                <select
                  className="selectPrioridade"
                  value={prioridades}
                  onChange={(e) => setPrioridade(e.target.value)}
                >
                  <option value="" className="frase">
                    Selecione a prioridade do processo
                  </option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="botoes-actions">
                <button onClick={onClose} className="btn-cancelar-processo">
                  Cancelar
                </button>
                <button onClick={validarCampos} className="btn-salvar-enviar">
                  Próximo
                </button>
              </div>
            </div>
          ) : (
            <div className="etapa-2">
              <div className="containerProcesso">
                <div className="stageHeader">
                  <h3 className="colorProcess">{nomeProcesso}</h3>
                  <p className="colorDescription">{descricao}</p>
                  <p>Prioridade:{prioridades}</p>
                  <div className="selectQuestionOption">
                    <p>Selecione o tipo da Questão:</p>
                    <select
                      className="selectOpcoes"
                      value={SelectedOption}
                      onChange={handleOptionChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Texto-aberto">Texto Aberto</option>
                      <option value="Upload-arquivo">Upload de arquivo</option>
                      <option value="CheckList">Checklist</option>
                      <option value="Seletor-opcoes">Seletor de opções</option>
                    </select>
                    <div className="btn-novaQuestao">
                      <button
                        onClick={handleAdicionarQuestao}
                        className="add-btn"
                      >
                        + Nova Questão
                      </button>
                    </div>
                  </div>
                </div>
                {renderizarQuestao()}

                <div className="questoes-container">
                  {questoes.map((questao, index) => (
                    <Questao
                      key={questao.id}
                      questao={questao}
                      index={index}
                      handleEditarQuestao={handleEditarQuestao}
                      handleMoverQuestaoParaCima={handleMoverQuestaoParaCima}
                      handleMoverQuestaoParaBaixo={handleMoverQuestaoParaBaixo}
                      handleRemoverQuestao={handleRemoverQuestao}
                    />
                  ))}
                </div>

                <div className="botoes-actions">
                  <button
                    onClick={handleCancelarNovoProcesso}
                    className="btn-cancelar-processo"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSalvarClick}
                    className="btn-salvar-processo"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={handleAbrirPopup}
                    className="btn-salvar-enviar"
                  >
                    Salvar e Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
          {popupVisivel && (
            <EnviarProcesso
              visivel={popupVisivel}
              fecharPopup={handleFecharPopup}
              nomeProcesso={nomeProcesso}
              onEnviar={handleSalvarClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default NovoProcesso;
