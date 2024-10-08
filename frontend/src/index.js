import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ShopProvider>
      <App />
    </ShopProvider>
  </Router>
);
