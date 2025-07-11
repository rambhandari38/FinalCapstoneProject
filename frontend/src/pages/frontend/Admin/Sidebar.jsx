// src/pages/frontend/Admin/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaClipboardList, FaCogs, FaUsers, FaChartBar, FaCalendarAlt } from "react-icons/fa";

export default function Sidebar() {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
  };

  const activeLinkStyle = {
    backgroundColor: "#ddd",
    borderRadius: "5px",
  };

  return (
    <div style={{ width: "220px", background: "#f5f5f5", minHeight: "100vh", padding: "20px 10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin</h2>
      <nav>
        <NavLink to="/admin" style={linkStyle} end activeStyle={activeLinkStyle}>
          <FaTachometerAlt style={{ marginRight: "10px" }} />
          Dashboard
        </NavLink>
        <NavLink to="/admin/courses" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaBook style={{ marginRight: "10px" }} />
          Courses
        </NavLink>
        <NavLink to="/admin/assignments" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaClipboardList style={{ marginRight: "10px" }} />
          Assignments
        </NavLink>
        <NavLink to="/admin/skills" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaChartBar style={{ marginRight: "10px" }} />
          Skills
        </NavLink>
        <NavLink to="/admin/skillprogressdetail" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaChartBar style={{ marginRight: "10px" }} />
          Skill Details
        </NavLink>
        <NavLink to="/admin/studygroups" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaUsers style={{ marginRight: "10px" }} />
          Study Groups
        </NavLink>
        <NavLink to="/admin/schedule" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaCalendarAlt style={{ marginRight: "10px" }} />
          Schedule
        </NavLink>
        <NavLink to="/admin/settings" style={linkStyle} activeStyle={activeLinkStyle}>
          <FaCogs style={{ marginRight: "10px" }} />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}
