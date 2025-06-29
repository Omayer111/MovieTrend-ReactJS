// import { StrictMode } from "react";
// import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(<AuthProvider>
    <App />
</AuthProvider>);
