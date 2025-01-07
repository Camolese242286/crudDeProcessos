import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import Popup from "./Popup";
import "./Processos";
import PopupSalvarEnviar from "./Popup_Salvar_Enviar";
import { FaTrashAlt } from "react-icons/fa";
import { ArrowSquareDown, ArrowSquareUp, Trash } from "phosphor-react";
import Header from "./Header";
import "../styles/novo-processo.css";

function NovoProcesso() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const [SelectedOption, setSelectedOption] = useState(""); // Tipo de questão selecionado
  const [popupVisivel, setPopupVisivel] = useState(false);

  useEffect(() => {
    if (id) {
      const processosSalvos =
        JSON.parse(localStorage.getItem("processos")) || [];
      const processo = processosSalvos.find((p) => p.id === Number(id));

      if (processo) {
        setNomeProcesso(processo.nome);
        setPrioridade(processo.prioridades);
        setDescricao(processo.descricao);
        setQuestoes(processo.questoes || []); // Carregar todas as questões
      }
    }
  }, [id]);

  const validarCampos = () => {
    if (!nomeProcesso || !descricao) {
      alert("Por favor, preencha o nome do Processo e a descrição");
      return false;
    }
    return true;
  };

  const handleSalvarClick = () => {
    if (!validarCampos()) return;

    const novoProcesso = {
      id: Number(id) || Date.now(),
      nome: nomeProcesso,
      descricao: descricao,
      prioridades: prioridades,
      dataCriacao: new Date().toISOString(),
      questoes: [...questoes], // Salvar todas as questões, sem separar por tipo
    };

    try {
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      const index = processosSalvos.findIndex((p) => p.id === novoProcesso.id);

      if (index >= 0) {
        processosSalvos[index] = novoProcesso;
      } else {
        processosSalvos.push(novoProcesso);
      }

      localStorage.setItem("processos", JSON.stringify(processosSalvos));
      navigate("/processos");
    } catch (error) {
      console.error("Erro ao salvar processo:", error);
      alert("Erro ao salvar processo. Por favor, tente novamente.");
    }
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

  const handleEnviarProcesso = (responsaveis) => {
    console.log("Processo enviado para: ", responsaveis);
    // Aqui pode ser adicionada a lógica de envio, dependendo da aplicação
    handleSalvarClick(); // Salva antes de enviar
    alert("Processo enviado!");
    navigate("/processos");
  };  

  const handleOptionChange = (e) => {
    const novaOpcao = e.target.value;

    setQuestoesPorTipo((prev) => ({
      ...prev,
      [SelectedOption]: questoes, //Salva as questões da opção atual
    }));

    // Atualiza a opção selecionada
    setSelectedOption(novaOpcao);

    // Carrega as questões da nova opção ou iniciativa vazio
    //setQuestoes(questoesPorTipo[novaOpcao] || []);
  };

  const handleAdicionarQuestao = () => {
    if (!SelectedOption) {
      alert("Por favor, selecione um tipo de questão antes de adicionar");
      return;
    }

    const novaQuestao = {
      id: Date.now(),
      titulo: "",
      resposta: "",
      tipo: SelectedOption,
      itens:
        SelectedOption === "CheckList" ? [{ text: "", checked: false }] : [], // Itens para CheckList
    };

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

  const handleAtualizarChecklistText = (id, index, value) => {
    const questoesAtualizadas = questoes.map((questao) => {
      if (questao.id === id) {
        const novoItens = [...(questao.itens || [])];
        novoItens[index] = { ...novoItens[index], text: value }; // Atualiza o texto do item
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

  return (
    <div className="container-novo-processo">
      <Menu />
      <Header />
      {/* <div className="title-fixed">
        <h1>Novo Processo</h1>
      </div> */}

      <div className="container-processo">
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
              placeholder="Adicione uma descrição para esse processo"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <div className="options">

          {/* Opções */}
          <div className="select-opcoes-questao">
            <p>Selecione o tipo da Questão</p>
            <select className="selectOpcoes" onChange={handleOptionChange}>
              <option value="">Selecione...</option>
              <option value="Texto-aberto">Texto Aberto</option>
              <option value="Upload-arquivo">Upload de arquivo</option>
              <option value="CheckList">Checklist</option>
              <option value="Seletor-opcoes">Seletor de opções</option>
            </select>
          </div>
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
        </div>

        {/* Botão para adicionar questão */}
        <div className="btn-novaQuestao">
          <button onClick={handleAdicionarQuestao} className="add-btn">
            Adicionar Questão
          </button>
        </div>

        {/* Renderizar todas as questões */}
        <div className="questoes-container">
          {questoes.map((questao, index) => (
            <div key={questao.id} className="questao-item">
              <div className="header-questao">
                <div className="numero-questao">{index + 1}.</div>
                <div className="setas_excluir">
                  <div className="setas-flex">
                    <div
                      className="icone-questao"
                      onClick={() => handleMoverQuestaoParaCima(index)}
                    >
                      <ArrowSquareUp />
                    </div>
                    <div
                      className="icone-questao"
                      onClick={() => handleMoverQuestaoParaBaixo(index)}
                    >
                      <ArrowSquareDown />
                    </div>
                  </div>
                  <div>
                    <div
                      className="icone-excluir"
                      onClick={() => handleRemoverQuestao(questao.id)}
                    >
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
              <div className="questao-conteudo">
                <input
                  type="text"
                  value={questao.titulo}
                  onChange={(e) =>
                    handleEditarQuestao(questao.id, { titulo: e.target.value })
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
                          checked={item.checked || false}
                          onChange={(e) => {
                            const atualizado = [...questao.itens];
                            atualizado[idx].checked = e.target.checked;
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
                            atualizado[idx].value = e.target.value;
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
                        handleAtualizarQuestao(questao.id, "itens", atualizado);
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
        </div>

        {/* Botões de ação */}
        <div className="botoes-actions">
          <button
            onClick={handleCancelarClick}
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
    </div>
  );
}

export default NovoProcesso;
