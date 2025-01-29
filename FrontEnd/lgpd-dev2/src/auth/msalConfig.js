import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "d1a75ae8-2782-42f7-b68d-9e911d509fc6", // Seu Client ID
    authority: "https://login.microsoftonline.com/65736186-3d24-4583-af75-0a3383d75476", // Sua autoridade
    redirectUri: "http://localhost:3000/principal", // URL de redirecionamento após o login
  },
  cache: {
    cacheLocation: "localStorage", // Armazena o estado da sessão no localStorage
    storeAuthStateInCookie: false, // Não armazena no cookie
  },
};

export const msalInstance = new PublicClientApplication(msalConfig); // Instância do MSAL
