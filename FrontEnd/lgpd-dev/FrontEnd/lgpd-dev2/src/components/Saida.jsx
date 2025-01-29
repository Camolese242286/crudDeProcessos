import React from "react";

import './Menu';
import '../styles/Menu.css';

import './Popup';
import '../styles/Popup.css';

import { RxExit } from "react-icons/rx";

function Saida({ onClick }) {
    return (
        <header>
            <div className="saida-container">
                <div className="menu-item">
                    <a onClick={onClick} style={{ cursor: "pointer" }}>
                        <RxExit size={40} color="#8000FF" /></a>
                    <span className="icon-label">Sair</span>
                </div>
            </div>
        </header>
    )
}
export default Saida;

