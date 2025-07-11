import React, { useEffect } from "react";

export default function AdminTest({ logout }) {
  useEffect(() => {
    // Reset body & root styling on mount
    const root = document.getElementById("root");
    if (root) {
      root.style.padding = "0";
      root.style.margin = "0";
      root.style.background = "none";
      root.style.boxShadow = "none";
    }
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "none";
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        // width: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        background: 'none'
      }}
    >
      <p>Admin Page - No layout loaded</p>
      <button
        onClick={logout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}
