import React, { StrictMode } from "react";
import "./output.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
