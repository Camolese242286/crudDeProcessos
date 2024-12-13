import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import Hook from "../Hook"
import SearchWithArea from "../Area/SearchArea"

import './Nova-Area'

import "../../styles/StyleArea/area.css"

function Area() {
    const navigate = useNavigate();
    const [areas, setAreas] = useState([]);
    const [areasFiltrados, setAreasFiltrados] = useState("");

    const handleNovaArea = () => {
        navigate('/Nova-Area');
    }

    return (
        <>
            <div>
                <Hook />
            </div>

            <div className="container-area">
                <div className="position-area">
                    <div className="title">
                        <h2>Áreas da Empresa</h2>
                    </div>

                    <div className="select-area">
                        <select className="slArea">
                            <option value="">Todas as áreas</option>
                            <option value="Area 1">Área 1</option>
                            <option value="Area 2">Área 2</option>
                            <option value="Area 3">Área 3</option>
                        </select>
                    </div>

                    <div className="search">
                        <SearchWithArea 
                            areas = {areas}
                            setAreasFiltrados={setAreasFiltrados}
                        />
                    </div>

                    <dib className="botao-area">
                        <button onClick={handleNovaArea}>+ Nova Área</button>
                    </dib>

                    <div className="TableArea">
                        <div>
                            <table border='1'>
                                <thead>
                                    <tr className="table-names">
                                        <th>Nome da área</th>
                                        <th>Responsável</th>
                                        <th># Sub-Áreas</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>


                </div>

            </div></>
    )
}

export default Area;