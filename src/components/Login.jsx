import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useAuth } from "../auth/useAuth"; // Função de login personalizada

import "../styles/login.css"; // Estilos da página
import logo from "../images/logo.png"; // Logo da página

function Login() {
  const { login } = useAuth();
  const { instance } = useMsal();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password); 
      if (result) {
        const activeAccount = instance.getActiveAccount();
        if (activeAccount) {
          console.log("Usuário logado:", activeAccount.username);
          navigate("/principal");
        }
      } else {
        setError("Login falhou! Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao tentar autenticar. Tente novamente.");
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ["User.Read", "openid", "profile"],
      });
      console.log("Usuário logado com a Microsoft:", response.account);
      navigate("/principal");
    } catch (error) {
      console.error("Erro ao fazer login com a Microsoft:", error);
      setError("Erro ao tentar fazer login com a Microsoft. Tente novamente.");
    }
  };

  return (
    <main>
      <div className="page-container">
        {/* Container da imagem*/}
        <div className="left-container"></div>

        {/* Container do formulário de login*/}
        <div className="right-container">
          <div className="login-box">
            <div className="logo_topo">
              <img src={logo} alt="Logo" />
              <div className="font-lgpd">
                <h1>Portal</h1>
                <h1>LGPD</h1>
              </div>
            </div>
            <div className="h2p">
              <h2>Login</h2>
              <p>Entre para acessar plataforma LGPD da Qintess</p>
            </div>
            {/* Formulário de login */}
            <form className="input_login" onSubmit={handleLogin}>
              {/*Mensagem de erro no Login comm a Microsoft*/}
              {error && <div className="error-message">{error}</div>}

            </form>
            <div className="botoes">
            </div>
            <button className="botao_microsoft" type="button" onClick={handleMicrosoftLogin}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
