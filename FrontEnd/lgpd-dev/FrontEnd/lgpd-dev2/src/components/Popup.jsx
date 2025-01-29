import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Popup.css";

const Popup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onClose();
        navigate("/");
    };

    return (
        <div className="blurPopup">
            <div className="popupContainer">
                <div className="popupHeader">
                    <p>Sair?</p>
                </div>
                <div className="popupBody">
                    <p>Tem certeza que deseja sair da plataforma LGPD Qintess?</p>
                </div>
                <div className="popupFooter">
                    <button className="cancelButton" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="logoutButton" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
