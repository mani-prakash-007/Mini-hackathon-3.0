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
    <div className="flex w-[1440px] h-[822px] border border-gray-200">
      <Sidebar />
      <Outlet />
    </div>
  );
};
