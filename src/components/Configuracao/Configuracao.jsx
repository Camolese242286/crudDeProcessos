import React from "react";

import "../../styles/StyleConfiguracao/configuracao.css"

import Menu from "../Menu"

const configuracao = () => {
    return (
        <>
            <div className="container-index">
                <Menu />
            </div>

            <div className="title">
                <div>
                    <h2>Configuração</h2>
                </div>
            </div>

            <section>
                <div>
                    <div className="container-password">
                        <div>
                            <h3>Alterar senha</h3>
                        </div>
                    </div>
                </div>

            </section>

        </>


    )
}

export default configuracao;