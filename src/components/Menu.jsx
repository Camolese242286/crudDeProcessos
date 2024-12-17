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

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleViewNotifications = () => {
    setNotificationsCount(0);
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <img src={logo} alt="Logotipo" className="sidebar-logo" />
        </div>

        <div className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate("/principal")}>
            <House size={22} />
            <span>Início</span>
          </div>

          <div className="menu-item" onClick={() => navigate("/processos")}>
            <ListPlus size={22} />
            <span>Processos</span>
          </div>

          <div className="menu-item" onClick={() => navigate("/area")}>
            <Buildings size={22} />
            <span>Área</span>
          </div>

          <div
            className="menu-item notification"
            onClick={handleViewNotifications}
          >
            <Bell size={22} />
            {notificationsCount > 0 && (
              <span className="notification-badge">{notificationsCount}</span>
            )}
            <span>Notificações</span>
          </div>
        </div>

        <div className="sidebar-footer" onClick={handleOpenPopup}>
          <SignOut size={22} />
          <span>Sair</span>
        </div>
      </div>

      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default Sidebar;
