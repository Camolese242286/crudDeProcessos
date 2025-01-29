import { msalConfig } from "./msalConfig";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

export const useAuth = () => {
  const login = async (email, password) => {
    const request = {
      scopes: ["User.Read"], // Escopo para obter informações do usuário
      username: email,
      password: password,
    };

    try {
      // Usando a autenticação baseada em nome de usuário e senha
      const response = await msalInstance.acquireTokenByUsernamePassword(request);
      console.log("Login bem-sucedido:", response);
      return response; // Retorna a resposta de sucesso
    } catch (error) {
      console.error("Erro de login:", error);
      return null; // Retorna null em caso de erro
    }
  };

  return { login };
};
