import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== "/") {
      navigate("/");
      window.reload();
    }
  }, [navigate]);
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
