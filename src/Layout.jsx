import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== "/") {
      navigate("/");
      window.location.reload();
    }
  }, [navigate]);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};
