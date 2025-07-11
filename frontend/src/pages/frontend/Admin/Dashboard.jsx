// pages/frontend/Admin/Dashboard.jsx
import React from "react";

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <p>This is your admin dashboard.</p>
    </div>
  );
}
