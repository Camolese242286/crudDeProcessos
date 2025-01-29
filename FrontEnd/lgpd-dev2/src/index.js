import React from "react";
import { createRoot } from "react-dom/client"; // Importa o createRoot
import { BrowserRouter as Router } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { msalConfig } from "./auth/msalConfig";

// Instância do cliente MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Pega o elemento root
const container = document.getElementById("root");
const root = createRoot(container); // Cria o root com a nova API

// Renderiza a aplicação
root.render(
  <MsalProvider instance={msalInstance}>
    <Router>
      <App />
    </Router>
  </MsalProvider>
);
