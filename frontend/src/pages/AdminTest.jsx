import React, { useEffect } from "react";
// import './AdminTest.css';

export default function AdminTest({ logout }) {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  return (
    <div className="admin-page">
      <p className="admin-title">Admin Page - No layout loaded</p>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
}


// import React, { useEffect } from "react";

// export default function AdminTest({ logout }) {
//   useEffect(() => {
//     // Reset body & root styling on mount
//     const root = document.getElementById("root");
//     if (root) {
//       root.style.padding = "0";
//       root.style.margin = "0";
//       root.style.background = "none";
//       root.style.boxShadow = "none";
//       root.style.width = "100%";
//     }
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.background = "none";
//   }, []);

//   return (
//     <div
//       style={{
//         height: '100vh',
//         width: '100vw', // FULL WIDTH
//         margin: 0,
//         padding: 0,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: '1.5rem',
//         background: 'white', // or 'none' if transparent
//       }}
//     >
//       <p>Admin Page - No layout loaded</p>
//       <button
//         onClick={logout}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           fontSize: '1rem',
//           cursor: 'pointer',
//           backgroundColor: '#2d89ff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }




// import React, { useEffect } from "react";

// export default function AdminTest({ logout }) {
//   useEffect(() => {
//     // Reset body & root styling on mount
//     const root = document.getElementById("root");
//     if (root) {
//       root.style.padding = "0";
//       root.style.margin = "0";
//       root.style.background = "none";
//       root.style.boxShadow = "none";
//       root.style.width = "100%";
//     }
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.background = "none";
//   }, []);

//   return (
//     <div
//       style={{
//         height: '100vh',
//         width: '100vw', // FULL WIDTH
//         margin: 0,
//         padding: 0,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: '1.5rem',
//         background: 'white', // or 'none' if transparent
//       }}
//     >
//       <p>Admin Page - No layout loaded</p>
//       <button
//         onClick={logout}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           fontSize: '1rem',
//           cursor: 'pointer',
//           backgroundColor: '#2d89ff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
