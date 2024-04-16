import { BrowserRouter } from "react-router-dom";
import "./App.css";

import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <CustomerRoutes />
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
