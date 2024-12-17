import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "./Menu";
import Popup from "./Popup";
import "./Processos";
import PopupSalvarEnviar from "./Popup_Salvar_Enviar";

import { FaTrashAlt } from "react-icons/fa";

import "../styles/novo-processo.css";

function NovoProcesso() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomeProcesso, setNomeProcesso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridades, setPrioridade] = useState("");
  const [questoes, setQuestoes] = useState([]);
  const [questoesPorTipo, setQuestoesPorTipo] = useState({
    "Texto-aberto": [],
    "Upload-arquivo": [],
    "CheckList": [],
    "Seletor-opcoes": [],
  });
  const [SelectedOption, setSelectedOption] = useState(""); //Armazena a opção selecionada
  const [popupVisivel, setPopupVisivel] = useState(false);

  const validarCampos = () => {
    if (!nomeProcesso || !descricao) {
      alert("Por favor, preencha o nome do Processo e a descrição");
      return false;
    }
    return true;
  };

  // Preencher o nome do processo e da descrição
  // Salvar os dados na tabela
  const handleSalvarClick = () => {
    if (!validarCampos()) return;

    const questoesAtualizadas = {
      ...questoesPorTipo,
      [SelectedOption]: [...questoes],
    };

    /*const questoesCompletas = {
      ...questoesPorTipo,
      [SelectedOption]: questoes,
    }*/

    const novoProcesso = {
      id: id || Date.now(),
      nome: nomeProcesso,
      descricao: descricao,
      prioridades: prioridades,
      dataCriacao: new Date().toISOString(),
      questoesPorTipo: questoesAtualizadas, //Inclui todas as questões
    };

    const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
    const index = processosSalvos.findIndex((p) => p.id === novoProcesso.id);
    //processosSalvos.push(novoProcesso);

    if (index >= 0) {
      processosSalvos[index] = novoProcesso;
    } else {
      processosSalvos.push(novoProcesso);
    }

    localStorage.setItem("processos", JSON.stringify(processosSalvos));
    setQuestoesPorTipo(questoesAtualizadas);
    navigate("/processos");
  };

  const handleAbrirPopup = () => {
    if (!validarCampos()) return;
    setPopupVisivel(true);
  };

  const handleFecharPopup = () => {
    setPopupVisivel(false);
  };

  const handleEnviarProcesso = (responsaveis) => {
    console.log("Processo enviado para: ", responsaveis);
  };

  useEffect(() => {
    if (id) {
      const processosSalvos =
        JSON.parse(localStorage.getItem("processos")) || [];
      const processo = processosSalvos.find((p) => p.id === Number(id));

      if (processo) {
        setNomeProcesso(processo.nome);
        setPrioridade(processo.prioridades);
        setDescricao(processo.descricao);

        const primeiraOpcao =
          Object.keys(processo.questoesPorTipo || {})[0] || "";
        setSelectedOption(primeiraOpcao);
        setQuestoes([...(processo.questoesPorTipo[primeiraOpcao] || [])]);
        setQuestoesPorTipo(processo.questoesPorTipo || {});
        //setSelectedOption(""); //Reseta a opção selecionada
        //setQuestoes([]); //Inicializa com questões vazias até a troca de opção
      }
    }
  }, [id]);

  const handleCancelarClick = () => {
    navigate("/processos");
  };

  //Salva as questões da opção atual antes de trocar
  const handleOptionChange = (e) => {
    const novaOpcao = e.target.value;

    setQuestoes((prev) => ({
      ...prev,
      [SelectedOption]: [...questoes], //Salva as questões da opção atual
    }));

    // Atualiza a opção selecionada
    setSelectedOption(novaOpcao);

    // Carrega as questões da nova opção ou iniciativa vazio
    setQuestoes(questoesPorTipo[novaOpcao] || []);
  };

  const handleAdicionarQuestao = () => {
    if (!SelectedOption) {
      alert("Por favor, selecione uma opção antes de adicionar");
      return;
    }

    const novaQuestao = {
      id: Date.now(),
      titulo: "",
      resposta: "",
      tipo: SelectedOption,
      itens:
        SelectedOption === "CheckList" ? [{ text: "", checked: false }] : [], //Inicializa itens para checklist
    };
    //setQuestoes([...questoes, novaQuestao]); //Atualiza o estado local das questões
    setQuestoes((prev) => [...prev, novaQuestao]);
  };

  const handleAtualizarQuestao = (id, field, value) => {
    const questoesAtualizadas = questoes.map((questao) =>
      questao.id === id ? { ...questao, [field]: value } : questao
    );
    setQuestoes(questoesAtualizadas);
  };

  const handleRemoverQuestao = (id) => {
    setQuestoes(questoes.filter((questao) => questao.id !== id));
  };

  // Adiciona um novo item no checklist
  const handleAdicionarItemChecklist = (id) => {
    const questoesAtualizadas = questoes.map((questao) =>
      questao.id === id
        ? {
            ...questao,
            itens: [...(questao.itens || []), { text: "", checked: false }],
          }
        : questao
    );
    setQuestoes(questoesAtualizadas);
  };

  //Atualiza um item específico do checklist
  const handleAtualizarChecklistText = (id, index, value) => {
    const questoesAtualizadas = questoes.map((questao) => {
      if (questao.id === id) {
        const novoItens = [...(questao.itens || [])];
        novoItens[index] = { ...novoItens[index], text: value }; //Atualiza o valor do item no índice específico
        return { ...questao, itens: novoItens };
      }
      return questao;
    });
    setQuestoes(questoesAtualizadas);
  };

  const handleAtualizarChecklistCheckbox = (id, index, checked) => {
    const questoesAtualizadas = questoes.map((questao) => {
      if (questao.id === id) {
        const novoItens = [...(questao.itens || [])];
        novoItens[index] = { ...novoItens[index], checked };
        return { ...questao, itens: novoItens };
      }
      return questao;
    });
    setQuestoes(questoesAtualizadas);
  };

  const handleEditarQuestao = (id, novosDados) => {
    const questoesAtualizadas = questoes.map((questao) =>
      questao.id === id ? { ...questao, ...novosDados } : questao
    );

    setQuestoes(questoesAtualizadas);

    setQuestoesPorTipo((prev) => ({
      ...prev,
      [SelectedOption]: questoesAtualizadas,
    }));
  };

  return (
    <>
      <div className="index-container">
        <Menu />
        <div className="title-fixed">
          <h1>Novo Processo</h1>
        </div>

        <div className="container">
          {/* Título e descrição */}
          <div className="container-titulo">
            <input
              className="texto"
              type="text"
              placeholder="Insira aqui o nome do processo"
              value={nomeProcesso}
              onChange={(e) => setNomeProcesso(e.target.value)}
            />
            <div>
              <textarea
                className="descricao"
                type="text"
                placeholder="Adicione uma descrição para esse processo"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="options">
            <div className="prioridade">
              <p>Selecione a Prioridade</p>
              <select
                className="selectPrioridade"
                value={prioridades}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            {/* Opções */}
            <div className="opcoes-processo">
              <p>Selecione o tipo da Questão</p>
              <select className="selectOpcoes" onChange={handleOptionChange}>
                <option value="">Selecione...</option>
                <option value="Texto-aberto">Texto Aberto</option>
                <option value="Upload-arquivo">Upload de arquivo</option>
                <option value="CheckList">Checklist</option>
                <option value="Seletor-opcoes">Seletor de opções</option>
              </select>
            </div>
          </div>
          {/* Botão para adicionar questão */}
          <div className="btn-novaQuestao">
            <button onClick={handleAdicionarQuestao} className="add-btn">
              Adicionar Questão
            </button>
          </div>

          {/* Renderizar questões */}
          <div className="questoes-container">
            {questoes.map((questao, index) => (
              <div key={questao.id} className="questao-item">
                <div className="numero-questao">{index + 1}.</div>
                <div className="questao-conteudo">
                  <input
                    type="text"
                    value={questao.titulo}
                    onChange={(e) =>
                      handleEditarQuestao(questao.id, {
                        titulo: e.target.value,
                      })
                    }
                    placeholder="Título da pergunta do questionário"
                  />
                  {questao.tipo === "Texto-aberto" && (
                    <input
                      type="text"
                      value={questao.resposta}
                      onChange={(e) =>
                        handleEditarQuestao(questao.id, {
                          resposta: e.target.value,
                        })
                      }
                      placeholder="Digite sua resposta"
                    />
                  )}

                  <div className="upload-input">
                    {questao.tipo === "Upload-arquivo" && (
                      <input
                        type="file"
                        onChange={(e) =>
                          handleEditarQuestao(
                            questao.id,
                            "resposta",
                            e.target.files[0]?.name || ""
                          )
                        }
                      />
                    )}
                  </div>

                  {questao.tipo === "CheckList" && (
                    <div className="checklist-container">
                      {questao.itens?.map((item, idx) => (
                        <div key={idx} className="checklist-item">
                          <input
                            type="checkbox"
                            checked={item.checked || false} //Define o estado inicial
                            onChange={(e) => {
                              const atualizado = [...questao.itens];
                              atualizado[idx].checked = e.target.checked; //Alterna o valor
                              handleAtualizarChecklistCheckbox(
                                questao.id,
                                idx,
                                e.target.checked
                              );
                            }}
                            style={{ width: "20px", height: "18px" }}
                          />
                          <input
                            type="text"
                            value={item.text || ""}
                            onChange={(e) =>
                              handleAtualizarChecklistText(
                                questao.id,
                                idx,
                                e.target.value
                              )
                            }
                            placeholder={`Item ${idx + 1}`}
                          ></input>
                        </div>
                      ))}

                      <button
                        className="btn-add-item"
                        onClick={() => handleAdicionarItemChecklist(questao.id)}
                      >
                        + Adicionar item
                      </button>
                    </div>
                  )}

                  {questao.tipo === "Seletor-opcoes" && (
                    <div className="select-container">
                      {questao.itens?.map((item, idx) => (
                        <div key={idx} className="select-item">
                          <select
                            value={item.value || ""}
                            onChange={(e) => {
                              const atualizado = [...questao.itens];
                              atualizado[idx].value = e.target.value; //Atualiza o valor selecionado
                              handleAtualizarQuestao(
                                questao.id,
                                "itens",
                                atualizado
                              );
                            }}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="Opção 1">Opção 1</option>
                            <option value="Opção 2">Opção 2</option>
                            <option value="Opção 3">Opção 3</option>
                          </select>
                        </div>
                      ))}
                      <button
                        className="btn-add-item"
                        onClick={() => {
                          const atualizado = [...questao.itens, { value: "" }];
                          handleAtualizarQuestao(
                            questao.id,
                            "itens",
                            atualizado
                          );
                        }}
                      >
                        + Adicionar item
                      </button>
                    </div>
                  )}
                </div>

                {/* Botão de remover */}
                <button
                  className="btn-delete"
                  onClick={() => handleRemoverQuestao(questao.id)}
                >
                  <div className="icon">
                    <FaTrashAlt size={20} />
                  </div>
                </button>
              </div>
            ))}
            {/* Botões da Página */}
            <div className="btn-botoes">
              <div className="botao-cancelar">
                <button onClick={handleCancelarClick}>Cancelar</button>
              </div>
              <div className="botoes-salvar">
              <div className="botao-salvar">
                <button onClick={handleSalvarClick}>Salvar</button>
              </div>

              <div className="botao-salvar-enviar">
                <button onClick={handleAbrirPopup} className="salvar-enviar">
                  Salvar e enviar
                </button>

                <PopupSalvarEnviar
                  visivel={popupVisivel}
                  fecharPopup={handleFecharPopup}
                  nomeProcesso={nomeProcesso}
                  onEnviar={handleEnviarProcesso}
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NovoProcesso;
