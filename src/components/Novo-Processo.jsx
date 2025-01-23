import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Processos";
import Questao from "./Questao";
import EnviarProcesso from './Popup_Salvar_Enviar';
import "../styles/novo-processo.css";

function NovoProcesso({onClose, processo, onSave}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [currentView, setCurrentView] = useState('');
  const [editandoNomeProcesso, setEditandoNomeProcesso] = useState(false);
  const [nomeProcesso, setNomeProcesso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridades, setPrioridade] = useState("");
  const [questoes, setQuestoes] = useState([]); // Guardar todas as questões criadas
  const [questoesPorTipo, setQuestoesPorTipo] = useState({
    "Texto-aberto": [],
    "Upload-arquivo": [],
    "CheckList": [],
    "Seletor-opcoes": [],
  });

  const [SelectedOption, setSelectedOption] = useState(''); // Tipo de questão selecionado
  const [popupVisivel, setPopupVisivel] = useState(false);

  useEffect(() => {
    /*if (id) {
      const processosSalvos =
        JSON.parse(localStorage.getItem("processos")) || [];
      const processo = processosSalvos.find((p) => p.id === Number(id));*/

      if (processo) {
        setNomeProcesso(processo.nome);
        setPrioridade(processo.prioridades);
        setDescricao(processo.descricao);
        setQuestoes(processo.questoes || []); // Carregar todas as questões
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
      //id: Number(processo) || Date.now(),
      id: processo ? processo.id : Date.now(),
      nome: nomeProcesso,
      descricao: descricao,
      prioridades: prioridades,
      dataCriacao: new Date().toISOString(),
      questoes: [...questoes], // Salvar todas as questões, sem separar por tipo
    };

    onSave(novoProcesso);
    /*try {
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      const index = processosSalvos.findIndex((p) => p.id === novoProcesso.id);

      if (index >= 0) {
        processosSalvos[index] = novoProcesso;
      } else {
        processosSalvos.push(novoProcesso);
      }

      localStorage.setItem("processos", JSON.stringify(processosSalvos));
      onClose();
      //navigate("/processos");
    } catch (error) {
      console.error("Erro ao salvar processo:", error);
      alert("Erro ao salvar processo. Por favor, tente novamente.");
    }*/
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
  }

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
      titulo: '',
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
    return questoes.map((questao) => (
      <div key={questao.id}></div>      
    ));
  };

  return (
    <div className="container-novo-processo">
      <div className="popup-containe"
        style={{
          position: "fixed",
          width: step === 1 ? "57em" : "90em",
          height: step === 1 ? "29em" : "50em",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fcfaff",
          padding: "30px",
          boxShadow: "10px 20px 30px rgba(0, 3, 0, 0.2)",
          zIndex: 1000,
          border: "none",
          borderRadius: "10px",
          transition: "all 0.5s ease",
        }}
      >

        <div className="etapa-1">
          {step === 1 ? (
            <div className="container-processo">
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
                    onFocus={() => setDescricao("")}
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
                  <option value="" className="frase">Selecione a prioridade do processo</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="proximo">
                <button onClick={validarCampos}>
                  Próximo
                </button>
              </div>

              <div className="botoes-actions">
                <button onClick={onClose} className="btn-cancelar-processo">
                  Cancelar
                </button>
                <button onClick={handleSalvarClick} className="btn-salvar-processo">
                  Salvar
                </button>
                <button onClick={handleAbrirPopup} className="btn-salvar-enviar">
                  Salvar e Enviar
                </button>
              </div>
            </div>

          ) : (

            <div className="etapa-2">
              <h3 className="colorProcess">{nomeProcesso}</h3>
              <p className="colorDescription">{descricao}</p>

              <div className="prioridade-step2">
                <p>Prioridade</p>
                <select
                  className="selectPrioridade"
                  value={prioridades}
                  onChange={(e) => setPrioridade(e.target.value)}
                >
                  <option value="" className="frase">Selecione a prioridade do processo</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="select-opcoes-questao">
                <p>Selecione o tipo da Questão</p>
                <select className="selectOpcoes" value={SelectedOption} onChange={handleOptionChange}>
                  <option value="">Selecione...</option>
                  <option value="Texto-aberto">Texto Aberto</option>
                  <option value="Upload-arquivo">Upload de arquivo</option>
                  <option value="CheckList">Checklist</option>
                  <option value="Seletor-opcoes">Seletor de opções</option>
                </select>
              </div>

              <div className="btn-novaQuestao">
                <button onClick={handleAdicionarQuestao} className="add-btn">
                  Adicionar Questão
                </button>
              </div>

              {renderizarQuestao()}

              <div className="questoes-container" style={{ maxHeight: "420px", overflowY: "auto" }}>
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
                <button onClick={handleSalvarClick} className="btn-salvar-processo">
                  Salvar
                </button>
                <button onClick={handleAbrirPopup} className="btn-salvar-enviar">
                  Salvar e Enviar
                </button>
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
    </div >
  );
}
export default NovoProcesso;
