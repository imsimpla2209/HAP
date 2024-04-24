import { BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";

import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "features/customer/user/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const out = () => {
    localStorage.clear();
    navigate("/login");
  }
  useEffect(() => {
    dispatch(getMe(out));
  }, []);

  return (
    <>
      <CustomerRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;
