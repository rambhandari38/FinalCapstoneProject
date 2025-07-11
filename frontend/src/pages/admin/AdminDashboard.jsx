import React from "react";
import Socket from "../Socket"; // ✅ adjust path if needed

export default function AdminDashboard({ user, logout }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.username} (Role: {user.role})</p>
      <button onClick={logout}>Logout</button>
      <p>Admin functionality goes here...</p>

      {/* <section style={styles.section}> */}
            <h2>💬 Chat With Users</h2>
            <Socket currentUser={user.username} />
          {/* </section> */}
    </div>
  );
}
