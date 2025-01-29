import React from "react";
import { useParams } from "react-router-dom";

function Questionario() {
    const { id } = useParams();

    return (
        <div>
            <h1>Detalhe do questionário {id}</h1>
        </div>
    )
}

export default Questionario;