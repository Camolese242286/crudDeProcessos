import React from 'react';
import { ArrowSquareUp, ArrowSquareDown, Trash } from 'phosphor-react';
import "../styles/novo-processo.css";

const Questao = ({ questao, index, handleEditarQuestao, handleMoverQuestaoParaCima, handleMoverQuestaoParaBaixo, handleRemoverQuestao }) => {
  const tiposDeQuestao = {
    TEXTO_ABERTO: 'Texto-aberto',
    UPLOAD_ARQUIVO: 'Upload-arquivo',
    CHECKLIST: 'CheckList',
    SELETOR_OPCOES: 'Seletor-opcoes',
  };

  const RenderizarQuestao = () => {
    switch (questao.tipo) {
      case tiposDeQuestao.TEXTO_ABERTO:
        return (
          <input
            type="text"
            value={questao.resposta}
            onChange={(e) =>
              handleEditarQuestao(questao.id, { resposta: e.target.value })
            }
            placeholder="Digite sua resposta"
          />
        );
      case tiposDeQuestao.UPLOAD_ARQUIVO:
        return (
          <div className="input_file">
            <input              
              type="file"
              onChange={(e) =>
                handleEditarQuestao(questao.id, { arquivo: e.target.files[0] })
              }
            />
          </div>

        );
      case tiposDeQuestao.CHECKLIST:
        return (         
          <div className='checklist-container'>            
            {questao.itens?.map((item, idx) => (
              <div key={idx} className="checklist-item">
                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={(e) => {
                    const atualizado = [...questao.itens];
                    atualizado[idx].checked = e.target.checked;
                    handleEditarQuestao(questao.id, { itens: atualizado });
                  }}
                  style={{ width: "20px", height: "18px" }}
                />
                <input
                  type="text"
                  value={item.text || ""}
                  onChange={(e) => {
                    const atualizado = [...questao.itens];
                    atualizado[idx].text = e.target.value;
                    handleEditarQuestao(questao.id, { itens: atualizado });
                  }}
                  placeholder={`Item ${idx + 1}`}
                />
              </div>              
            ))}         
            <button
              className="btn-add-item"
              onClick={() => {
                const atualizado = [...questao.itens, { text: "", checked: false }];
                handleEditarQuestao(questao.id, { itens: atualizado });
              }}
            >
              + Adicionar item
            </button>   
          </div>
        );
      case tiposDeQuestao.SELETOR_OPCOES:
        return (
          <div>
            {questao.opcoes.map((opcao, idx) => (
              <div key={idx} className="opcao-item">
                <input
                  type="text"
                  value={opcao}
                  onChange={(e) => {
                    const atualizado = [...questao.opcoes];
                    atualizado[idx] = e.target.value;
                    handleEditarQuestao(questao.id, { opcoes: atualizado });
                  }}
                  placeholder={`Opção ${idx + 1}`}
                />
              </div>
            ))}
            <button
              className="btn-add-item"
              onClick={() => {
                const atualizado = [...questao.opcoes, ""];
                handleEditarQuestao(questao.id, { opcoes: atualizado });
              }}
            >
              + Adicionar opção
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="questao-item">
      <div className="header-questao">
        <div className="numero-questao">{index + 1}.</div>
        <div className="questao-conteudo">
          <input
            type="text"
            value={questao.titulo}
            onChange={(e) =>
              handleEditarQuestao(questao.id, { titulo: e.target.value })
            }
            placeholder="Título da pergunta do questionário"
          />
          {RenderizarQuestao()}
        </div>
        <div className="setas_excluir">
          <div className="setas-flex">
            <div className="icone-questao" onClick={() => handleMoverQuestaoParaCima(index)}>
              <ArrowSquareUp />
            </div>
            <div className="icone-questao" onClick={() => handleMoverQuestaoParaBaixo(index)}>
              <ArrowSquareDown />
            </div>
          </div>
          <div>
            <div className="icone-excluir" onClick={() => handleRemoverQuestao(questao.id)}>
              <Trash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questao;
