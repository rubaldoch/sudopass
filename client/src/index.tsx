import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// SudoPass must run on 360x550 px dimensions
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
