// import React from 'react';
// import "./MainLayout.css";
// import Sidebar from '../Student/Sidebar';
// import Footer from '../Student/Footer';
// import Header from '../Student/Header';
// import { Outlet } from 'react-router-dom';

// const MainLayout = () => {
//   return (
//     <div className="main-layout" style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Header />
//         <div style={{ flex: 1 }}>
//           <Outlet /> {/* All page components will render here */}
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import React from 'react';
import './MainLayout.css';
import Sidebar from '../Student/Sidebar';
import Footer from '../Student/Footer';
import Header from '../Student/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
