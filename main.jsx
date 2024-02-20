import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./public/styles/index.css";

// Importa los estilos y scripts de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("react-container")
);
