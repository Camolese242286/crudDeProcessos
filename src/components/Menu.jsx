import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListPlus,
  House,
  Buildings,
  Gear,
  SignOut,
  Bell,
} from "phosphor-react";

import Popup from "./Popup";
import "../styles/menu.css";

import logo from "../images/logotipo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleViewNotifications = () => {
    setNotificationsCount(0);
  };

  // Função para gerenciar o mouse hover em cada item
  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <img src={logo} alt="Logotipo" className="sidebar-logo" />
        </div>

        <div className="sidebar-menu">
          <div
            className="menu-item"
            onClick={() => navigate("/principal")}
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}
          >
            <House size={35} />
            {hoveredIcon === "home" && <span>Início</span>}
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/processos")}
            onMouseEnter={() => handleMouseEnter("processos")}
            onMouseLeave={handleMouseLeave}
          >
            <ListPlus size={35} />
            {hoveredIcon === "processos" && <span>Processos</span>}
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/area")}
            onMouseEnter={() => handleMouseEnter("area")}
            onMouseLeave={handleMouseLeave}
          >
            <Buildings size={35} />
            {hoveredIcon === "area" && <span>Área</span>}
          </div>

          <div
            className="menu-item"
            onClick={handleViewNotifications}
            onMouseEnter={() => handleMouseEnter("notificacoes")}
            onMouseLeave={handleMouseLeave}
          >
            <Bell size={35} />
            {notificationsCount > 0 && (
              <span className="notification-badge">{notificationsCount}</span>
            )}
            {hoveredIcon === "" && <span>Notificações</span>}
          </div>
        </div>

        <div className="sidebar-footer" onClick={handleOpenPopup}>
          <SignOut size={35} />
          {hoveredIcon === "sair" && <span>Sair</span>}
        </div>
      </div>

      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default Sidebar;
