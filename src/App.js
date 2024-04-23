import { BrowserRouter } from "react-router-dom";
import "./App.css";

import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "features/customer/user/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CustomerRoutes />
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
