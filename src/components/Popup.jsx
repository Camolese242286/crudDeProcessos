import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Popup.css"

const Popup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onClose();
        navigate("/");
    }

    {/*}const handleCancel = () => {
        onClose();
    };

    const handleLogout = () => {
        navigate('/');
    };*/}

    return (
        <div className="blurPopup">
            <div className="Popup"
                style={{
                    position: "fixed",
                    left: "42em",
                    width: "30em",
                    backgroundColor: "#FCFAFF",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    height: "14em",                    
                    borderRadius: "35px",
                }}
            >
            <div className="popUpExit">
                <div className="sair">
                    <div><p>Sair?</p></div>
                </div>
                <div className="aviso">
                    <div><p>Tem certeza que deseja sair da plataforma LGDP Qintess</p></div>
                </div>
                <div className="botao">
                    <button className="cancelar" onClick={onClose}>Cancelar</button>
                    <button className="bSair" onClick={handleLogout}>Sair</button>
                </div>
            </div>

        </div >
        </div >
    );
}

export default Popup;
