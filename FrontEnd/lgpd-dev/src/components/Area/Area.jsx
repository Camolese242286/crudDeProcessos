import React, { useState, useEffect } from "react";
import StatusIndicator from "../StatusIndicator";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import Header from "../Header";
import Search from "./Search";
import { Link } from "react-router-dom";
import IconOpen from "../../images/iconOpen.png";
import NovaArea from "./Nova-Area";

import ExcluirPopupArea from "./Popup-excluir-area";

import { PencilSimpleLine, Trash } from "phosphor-react";

import "../../styles/StyleArea/area.css";

const Area = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState({});
  const [areas, setAreas] = useState([]);
  const [principal, setPrincipal] = useState([]);
  const [areasFiltrados, setAreasFiltrados] = useState([]);
  const [mostrarNovaArea, setMostrarNovaArea] = useState(false);
  const [areaParaEditar, setAreaParaEditar] = useState(null);

  //Os campos serão salvos na tabela após preencher na "Nova-Area"
  useEffect(() => {
    const areasSalvas = JSON.parse(localStorage.getItem('area')) || [];
    setAreas(areasSalvas);
    setAreasFiltrados(areasSalvas);

    const principalSalvos = JSON.parse(localStorage.getItem('principal')) || [];
    setPrincipal(principalSalvos);
  }, []);

  useEffect(() => {
    setAreasFiltrados(areas);
    localStorage.setItem("area", JSON.stringify(areas));
  }, [areas]);

  //Excluir o id da area na tabela
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [popupExclusao, setpopupExclusao] = useState(false);

  //Editar o campo da área
  /*const handleEditarArea = (id) => {
    navigate(`/editar-area/${id}`);
  };*/

  //Excluir o id da area
  const handleExluirArea = (id) => {
    setIdParaExcluir(id);
    setpopupExclusao(true);
  };

  //Confirmar a exclusão do id
  const confirmarExclusaoArea = () => {
    const novaAreas = areas.filter((area) => area.id !== idParaExcluir);
    setAreas(novaAreas);
    setAreasFiltrados(novaAreas);
    localStorage.setItem("area", JSON.stringify(novaAreas));
    //localStorage.setItem("principal", JSON.stringify(novaAreas));

    const principaisAtualizadas = principal.filter((item) => item.id !== idParaExcluir);
    setPrincipal(principaisAtualizadas);
    localStorage.setItem("principal", JSON.stringify(principaisAtualizadas));

    setpopupExclusao(false);
  };

  //Cancelar a exclusao do id
  const cancelarExclusaoArea = () => {
    setpopupExclusao(false);
    setIdParaExcluir(null);
  };

  const handleNovaAreaClick = () => {
    setAreaParaEditar(null);
    setMostrarNovaArea(true);
  }

  const handleEditarAreaClick = (area) => {
    setAreaParaEditar(area);
    setMostrarNovaArea(true);
  }

  const handleFecharAreaClick = () => {
    setMostrarNovaArea(false);
  }

  const handleSalvarArea = (novaArea) => {
    const areasAtualizadas = areas.map((a) =>
      a.id === novaArea.id ? novaArea : a
    );
    if (!areasAtualizadas.find((a) => a.id === novaArea.id)) {
      areasAtualizadas.push(novaArea);
    }
    setAreas(areasAtualizadas);
    localStorage.setItem('area', JSON.stringify(areasAtualizadas));
    //setMostrarNovaArea(false);

    const novaEntradaPrincipal = {
      id: novaArea.id,
      nome: novaArea.nome,
      responsavel: novaArea.responsavel,
      ultimaMovimentacao: new Date().toISOString(),
      status: "",
    };

    const principaisAtualizadas = principal.map((item) =>
      item.id === novaEntradaPrincipal.id ? novaEntradaPrincipal : item
    );
    
    // Se não encontrar a área, adiciona
    if (!principaisAtualizadas.find((item) => item.id === novaEntradaPrincipal.id)) {
      principaisAtualizadas.push(novaEntradaPrincipal);
    }

    //const principaisAtualizadas = [...principal, novaEntradaPrincipal];
    setPrincipal(principaisAtualizadas);
    localStorage.setItem("principal", JSON.stringify(principaisAtualizadas));

    setMostrarNovaArea(false);

    /*const principalAtualizadas = principal.map((p) =>
      p.id === principal.id ? principal : p
    );
    if (!principalAtualizadas.find((p) => p.id === principal.id)) {
      principalAtualizadas.push(principal);
    }
    setPrincipal(principalAtualizadas);
    localStorage.setItem('principal', JSON.stringify(principalAtualizadas));
    setMostrarNovaArea(false);*/
  }

  return (
    <div className="container-page-area">
      <Menu />
      <Header />
      <div className="container_area">
        <div className="settings">
          <div className="filters-area">
            <select
              className="slArea"
              onChange={(e) => {
                const filtro = e.target.value;
                const filtrados = filtro
                  ? areas.filter((area) => area.nome === filtro)
                  : areas;
                setAreasFiltrados(filtrados);
              }}
            >
              <option value="">Todas as áreas</option>
              {areas.map((area) => (
                <option key={area.id} value={area.nome}>
                  {area.nome}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="TableArea">
          <table>
            <thead>
              <tr className="table-names">
                <th></th>
                <th>Nome da área</th>
                <th>Responsável</th>
                <th># Sub-Áreas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {areasFiltrados.length > 0 ? (
                areasFiltrados.map((area) => (
                  <tr key={area.id}>
                    <td>
                      <div>
                        <Link onClick={() => handleEditarAreaClick(area)}>
                          <img src={IconOpen} alt="Area de Empresa" />
                        </Link>                        
                      </div>
                    </td>
                    <td>{area.nome}</td>
                    <td>{area.responsavel}</td>
                    <td>{area.subArea}</td>
                    <td><StatusIndicator status={statuses[area.status]} /></td>
                    <td className="acoes">
                      <div className="icon-acoes">
                        <button onClick={() => handleExluirArea(area.id)}>
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhuma área cadastrada</td>
                </tr>
              )}

              {popupExclusao && (
                <ExcluirPopupArea
                  titleArea="Excluir área?"
                  mensagem="Essa ação não pode ser desfeita"
                  onConfirm={confirmarExclusaoArea}
                  onCancel={cancelarExclusaoArea}
                />
              )}
            </tbody>
          </table>
        </div>

        <div className="btnNovaArea">
          <button onClick={handleNovaAreaClick}>+ Nova Área</button>
        </div>

        {mostrarNovaArea && (
          <div className="desfoquefundoArea">
            <NovaArea
              onClose={handleFecharAreaClick}
              area={areaParaEditar}
              onSaveArea={handleSalvarArea}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Area;
