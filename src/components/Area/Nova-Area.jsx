<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Menu from "../Menu";

import { useNavigate, useParams } from "react-router-dom";
import styles from '../../styles/StyleArea/nova-area.css'

function NovaArea() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [nomeArea, setNomeArea] = useState("");
    const [descricaoArea, setDescricaoArea] = useState("");
    const [responsavel, setResponsavel] = useState("");

    const validarCampos = () => {
        if(!nomeArea || !descricaoArea) {
            alert("Por favor, preencha o nome da Área e a descrição");
            return false;
        }
        return true;
    }

    const handleSalvarArea = () => {
        if(!validarCampos()) return;

        const novaArea = {
            id: id || Date.now(), //Gera um novo ID se não existir
            nome: nomeArea,
            descricao: descricaoArea,
            responsavel: responsavel,
        };

        const areasSalvos = JSON.parse(localStorage.getItem("area")) || [];
        const index = areasSalvos.findIndex((a) => a.id === novaArea.id);

        if (index >= 0) {
            areasSalvos[index] = novaArea; //Atualiza área existente
        } else {
            areasSalvos.push(novaArea); //Adiciona uma nova área
        }

        localStorage.setItem("area", JSON.stringify(areasSalvos));
        navigate("/area");
    };

    useEffect(() => {
        if (id) {
            const areasSalvos = JSON.parse(localStorage.getItem("area")) || [];
            const area = areasSalvos.find((a) => a.id === Number(id));
            
            if(area) {
                setNomeArea(area.nome);
                setDescricaoArea(area.descricao);
                setResponsavel(area.responsavel);
            }
        }
    }, [id]);

    return (
        <>
            <div className="index-container">
                <Menu />
            </div>
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import "../../styles/StyleArea/nova-area.css";

function NovaArea() {
  const [nomeArea, setNomeArea] = useState("");
  const [descricaoArea, setDescricaoArea] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const navigate = useNavigate();

  // Função para adicionar uma nova área
  const handleAdicionarArea = () => {
    // Validação dos campos obrigatórios
    if (!nomeArea || !responsavel) {
      alert("Por favor, preencha o nome da área e selecione um responsável.");
      return;
    }
>>>>>>> 6f3a20cb51724f8bc1618fefb029fea48441bf58

    // Nova área que será adicionada
    const novaArea = {
      id: Date.now(), // Gera um ID único
      nome: nomeArea,
      descricao: descricaoArea,
      responsavel: responsavel,
      subAreas: 0, // Valor padrão
      status: "Ativo", // Status padrão
    };

    // Recupera as áreas existentes do localStorage
    const areasExistentes = JSON.parse(localStorage.getItem("areas")) || [];

    // Adiciona a nova área
    const novasAreas = [...areasExistentes, novaArea];
    localStorage.setItem("areas", JSON.stringify(novasAreas));

<<<<<<< HEAD
                {/* Botão de Adicionar */}
                <div className="btn-add-area">
                    <button className="botao-area" onClick={handleSalvarArea}>Salvar</button>
                </div>
            </div>
        </>
    );
=======
    // Redireciona para a página de Áreas
    navigate("/Area");
  };

  return (
    <div className="container-principal">
      <div className="index-container">
        <Menu />
      </div>

      <div className="title-area">
        <h2>Nova Área</h2>
      </div>
      <div className="container-area">
        {/* Título e Descrição */}
        <div className="container-title-description">
          <input
            className="text-area"
            type="text"
            placeholder="Insira aqui o nome da área"
            value={nomeArea}
            onChange={(e) => setNomeArea(e.target.value)}
          />
          <textarea
            className="description-area"
            type="text"
            placeholder="Adicione uma descrição para essa área"
            value={descricaoArea}
            onChange={(e) => setDescricaoArea(e.target.value)}
          />
        </div>

        {/* Responsável */}
        <div className="select-responsavel-container">
          <select
            className="select-responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          >
            <option value="">Selecione o responsável da área</option>
            <option value="Name 1">Name 1</option>
            <option value="Name 2">Name 2</option>
            <option value="Name 3">Name 3</option>
          </select>
        </div>

        {/* Botão de Adicionar */}
        <div className="btn-add-area">
          <button className="botao-area" onClick={handleAdicionarArea}>
            Adicionar Área
          </button>
        </div>
      </div>
    </div>
  );
>>>>>>> 6f3a20cb51724f8bc1618fefb029fea48441bf58
}

export default NovaArea;
