import React from "react";
import { Sidebar } from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
