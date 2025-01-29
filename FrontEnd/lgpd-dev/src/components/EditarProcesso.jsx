// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Menu from "./Menu";
// import PopupSalvarEnviar from "./Popup_Salvar_Enviar";
// import { ArrowSquareDown, ArrowSquareUp, Trash } from "phosphor-react";
// import "../styles/novo-processo.css";

// function EditarProcesso() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [nomeProcesso, setNomeProcesso] = useState("");
//   const [descricao, setDescricao] = useState("");
//   const [prioridades, setPrioridade] = useState("");
//   const [questoes, setQuestoes] = useState([]);
//   const [SelectedOption, setSelectedOption] = useState("");
//   const [popupVisivel, setPopupVisivel] = useState(false);

//   // Carregar os dados do processo ao inicializar
//   useEffect(() => {
//     const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
//     const processo = processosSalvos.find((p) => p.id === Number(id));

//     if (processo) {
//       setNomeProcesso(processo.nome);
//       setDescricao(processo.descricao);
//       setPrioridade(processo.prioridades);
//       setQuestoes(processo.questoes || []);
//     }
//   }, [id]);

//   const validarCampos = () => {
//     if (!nomeProcesso || !descricao) {
//       alert("Por favor, preencha o nome do Processo e a descrição");
//       return false;
//     }
//     return true;
//   };

//   const handleSalvarClick = () => {
//     if (!validarCampos()) return;

//     const processoAtualizado = {
//       id: Number(id),
//       nome: nomeProcesso,
//       descricao: descricao,
//       prioridades: prioridades,
//       questoes: [...questoes],
//     };

//     try {
//       const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];

//       const processoDuplicado = processosSalvos.find(
//         (p) => p.nome === processoAtualizado.nome && p.id !== processoAtualizado.id
//       );

//       if (processoDuplicado) {
//         alert("Já existe outro processo com o mesmo nome.");
//         return;
//       }

//       const index = processosSalvos.findIndex((p) => p.id === processoAtualizado.id);

//       if (index >= 0) {
//         processosSalvos[index] = processoAtualizado;
//       } else {
//         processosSalvos.push(processoAtualizado);
//       }

//       localStorage.setItem("processos", JSON.stringify(processosSalvos));

//       alert("Processo salvo com sucesso.");
//       navigate("/processos");
//     } catch (error) {
//       console.error("Erro ao salvar o processo:", error);
//       alert("Ocorreu um erro ao tentar salvar o processo.");
//     }
//   };

//   const handleAbrirPopup = () => {
//     if (!validarCampos()) return;
//     setPopupVisivel(true);
//   };
//   const handleFecharPopup = () => {
//     setPopupVisivel(false);
//   };

//   const handleEnviarProcesso = (responsaveis) => {
//     console.log("Processo enviado para: ", responsaveis);
//     handleSalvarClick();
//     alert("Processo enviado!");
//     navigate("/processos");
//   };

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleAdicionarQuestao = () => {
//     if (!SelectedOption) {
//       alert("Por favor, selecione um tipo de questão antes de adicionar");
//       return;
//     }

//     const novaQuestao = {
//       id: Date.now(),
//       titulo: "",
//       resposta: "",
//       tipo: SelectedOption,
//       itens: SelectedOption === "CheckList" ? [{ text: "", checked: false }] : [],
//     };

//     setQuestoes((prev) => [...prev, novaQuestao]);
//   };

//   const handleRemoverQuestao = (id) => {
//     setQuestoes(questoes.filter((questao) => questao.id !== id));
//   };

//   const handleMoverQuestaoParaCima = (index) => {
//     if (index === 0) return;

//     const questoesAtualizadas = [...questoes];
//     const temp = questoesAtualizadas[index - 1];
//     questoesAtualizadas[index - 1] = questoesAtualizadas[index];
//     questoesAtualizadas[index] = temp;

//     setQuestoes(questoesAtualizadas);
//   };

//   const handleMoverQuestaoParaBaixo = (index) => {
//     if (index === questoes.length - 1) return;

//     const questoesAtualizadas = [...questoes];
//     const temp = questoesAtualizadas[index + 1];
//     questoesAtualizadas[index + 1] = questoesAtualizadas[index];
//     questoesAtualizadas[index] = temp;

//     setQuestoes(questoesAtualizadas);
//   };

//   return (
//     <div className="container-novo-processo">
//       <Menu />
//       <div className="title-fixed">
//         <h1>Editar Processo</h1>
//       </div>

//       <div className="container-processo">
//         <div className="container-titulo">
//           <input
//             className="texto"
//             type="text"
//             placeholder="Insira aqui o nome do processo"
//             value={nomeProcesso}
//             onChange={(e) => setNomeProcesso(e.target.value)}
//           />
//           <div>
//             <textarea
//               className="descricao"
//               placeholder="Adicione uma descrição para esse processo"
//               value={descricao}
//               onChange={(e) => setDescricao(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="options">
//           <div className="prioridade">
//             <p>Selecione a Prioridade</p>
//             <select
//               className="selectPrioridade"
//               value={prioridades}
//               onChange={(e) => setPrioridade(e.target.value)}
//             >
//               <option value="">Selecione...</option>
//               <option value="Alta">Alta</option>
//               <option value="Média">Média</option>
//               <option value="Baixa">Baixa</option>
//             </select>
//           </div>

//           <div className="select-opcoes-questao">
//             <p>Selecione o tipo da Questão</p>
//             <select className="selectOpcoes" onChange={handleOptionChange}>
//               <option value="">Selecione...</option>
//               <option value="Texto-aberto">Texto Aberto</option>
//               <option value="Upload-arquivo">Upload de arquivo</option>
//               <option value="CheckList">Checklist</option>
//               <option value="Seletor-opcoes">Seletor de opções</option>
//             </select>
//           </div>
//         </div>

//         <div className="btn-novaQuestao">
//           <button onClick={handleAdicionarQuestao} className="add-btn">
//             Adicionar Questão
//           </button>
//         </div>

//         <div className="questoes-container">
//           {questoes.map((questao, index) => (
//             <div key={questao.id} className="questao-item">
//               <div className="header-questao">
//                 <div className="numero-questao">{index + 1}.</div>
//                 <div className="setas_excluir">
//                   <div className="setas-flex">
//                     <div
//                       className="icone-questao"
//                       onClick={() => handleMoverQuestaoParaCima(index)}
//                     >
//                       <ArrowSquareUp />
//                     </div>
//                     <div
//                       className="icone-questao"
//                       onClick={() => handleMoverQuestaoParaBaixo(index)}
//                     >
//                       <ArrowSquareDown />
//                     </div>
//                   </div>
//                   <div>
//                     <div
//                       className="icone-excluir"
//                       onClick={() => handleRemoverQuestao(questao.id)}
//                     >
//                       <Trash />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="questao-conteudo">
//                 <input
//                   type="text"
//                   value={questao.titulo}
//                   onChange={(e) =>
//                     handleAtualizarQuestao(questao.id, { titulo: e.target.value })
//                   }
//                   placeholder="Título da pergunta"
//                 />
//                 {questao.tipo === "Texto-aberto" && (
//                   <input
//                     type="text"
//                     value={questao.resposta}
//                     onChange={(e) =>
//                       handleAtualizarQuestao(questao.id, { resposta: e.target.value })
//                     }
//                     placeholder="Digite sua resposta"
//                   />
//                 )}
//                 {questao.tipo === "Upload-arquivo" && (
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       handleAtualizarQuestao(questao.id, "resposta", e.target.files[0]?.name || "")
//                     }
//                   />
//                 )}
//                 {questao.tipo === "CheckList" && (
//                   <div className="checklist-container">
//                     {questao.itens?.map((item, idx) => (
//                       <div key={idx} className="checklist-item">
//                         <input
//                           type="checkbox"
//                           checked={item.checked || false}
//                           onChange={(e) =>
//                             handleAtualizarCheckListItem(questao.id, idx, e.target.checked)
//                           }
//                         />
//                         <input
//                           type="text"
//                           value={item.text}
//                           onChange={(e) =>
//                             handleAtualizarCheckListItem(questao.id, idx, e.target.value)
//                           }
//                           placeholder="Texto do item"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="botao">
//           <button onClick={handleSalvarClick} className="botao-salvar">
//             Salvar
//           </button>
//           <button onClick={handleAbrirPopup} className="botao-salvar-enviar">
//             Salvar e Enviar
//           </button>
//         </div>
//       </div>

//       {popupVisivel && (
//         <PopupSalvarEnviar
//           onClose={handleFecharPopup}
//           onSave={handleEnviarProcesso}
//         />
//       )}
//     </div>
//   );
// }

// export default EditarProcesso;
