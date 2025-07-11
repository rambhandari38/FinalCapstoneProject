// pages/frontend/Admin/MainLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout({ user, logout }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Shared layout (e.g., header, logout button) */}
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Admin Panel</h2>
          <button onClick={logout}>Logout</button>
        </header>

        {/* This is where the page content (like Dashboard, Courses) goes */}
        <Outlet />
      </div>
    </div>
  );
}
