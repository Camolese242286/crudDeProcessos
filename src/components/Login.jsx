import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useAuth } from "../auth/useAuth"; // Função de login personalizada

import "../styles/login.css"; // Estilos da página
import logo from "../images/logo.png"; // Logo da página

function Login() {
  const { login } = useAuth(); // Função para autenticar o usuário com email e senha
  const { instance } = useMsal(); // Instância do MSAL para login via Microsoft
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // Armazena o email digitado
  const [password, setPassword] = useState(""); // Armazena a senha digitada
  const [error, setError] = useState(""); // Mensagem de erro para o usuário

  // Função de login com credenciais tradicionais (e-mail e senha)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password); // Passa o email e a senha para autenticação
      if (result) {
        const activeAccount = instance.getActiveAccount();
        if (activeAccount) {
          console.log("Usuário logado:", activeAccount.username);
          navigate("/principal"); // Redireciona para a página principal após o login
        }
      } else {
        setError("Login falhou! Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao tentar autenticar. Tente novamente.");
    }
  };

  // Função de login com a conta Microsoft via MSAL
  const handleMicrosoftLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ["User.Read", "openid", "profile"],
      });
      console.log("Usuário logado com a Microsoft:", response.account);
      navigate("/principal"); // Redireciona para a página principal após login com Microsoft
    } catch (error) {
      console.error("Erro ao fazer login com a Microsoft:", error);
      setError("Erro ao tentar fazer login com a Microsoft. Tente novamente.");
    }
  };

  return (
    <main>
      <div className="page-container">
        {/* Container da imagem à esquerda */}
        <div className="left-container"></div>

        {/* Container do formulário de login à direita */}
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
              <p>Entre com sua conta Microdoft para acessar a plataforma LGPD da Qintess</p>
            </div>
            {/* Formulário de login */}
            <form className="input_login" onSubmit={handleLogin}>
              {/* <label>
                E-mail:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o valor do e-mail
                  placeholder="exemplo@email.com"
                  required
                />
              </label> */}

              {/* <label>
                Senha:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o valor da senha
                  placeholder="Min. 8 caracteres"
                  required
                />
              </label> */}

              {/* Exibição de erro, caso haja */}
              {error && <div className="error-message">{error}</div>}

              {/* <div className="options">
                <label className="cl-checkbox">
                  <input type="checkbox" />
                  <span>Mantenha-me conectado</span>
                </label>
                <label>
                  <a href="http://www.google.com">Esqueci minha senha</a>
                </label>
              </div> */}
            </form>
            <div className="botoes">
              {/* <button type="submit">ENTRAR</button> */}
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
