import React, { useState } from "react";
import API from "../../api";  // your axios instance with baseURL and token interceptors
// import "./SuperAdminDashboard.css";


export default function SuperAdminDashboard({ user, logout }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/users/create-user", {
        username: newUsername,
        password: newPassword,
        role: newRole,
      });
      alert("User created successfully!");
      setNewUsername("");
      setNewPassword("");
      setNewRole("admin");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>SuperAdmin Dashboard</h1>
      <p>
        Welcome, <strong>{user.username}</strong> (Role: {user.role})
      </p>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <h2>Create User</h2>
      <form onSubmit={createUser} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button type="submit" disabled={loading} style={{ padding: 10, fontSize: 16 }}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
