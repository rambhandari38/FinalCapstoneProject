// import React from 'react';
// import {
//   FaHome, FaBook, FaClipboardList, FaChartBar, FaCalendarAlt, FaUser, FaCogs, FaUsers
// } from 'react-icons/fa';
// import { MdLibraryBooks, MdHelpOutline, MdLogout } from 'react-icons/md';
// import { IoMdSchool } from 'react-icons/io';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="logo">
//         <div className="logo-circle">E</div>
//         <h3>EduSmart</h3>
//       </div>
//       <div className="logo-divider"></div>

//       <div className="section-title">MAIN</div>
//       <ul className="menu">
//         <li><button><FaHome /> Dashboard</button></li>
//         <li className="active"><button><FaBook /> My Courses</button></li>
//         <li><button><FaCalendarAlt /> Schedule</button></li>
//         <li><button><FaClipboardList /> Assignments</button></li>
//         <li><button><FaChartBar /> Grades</button></li>
//         <li><button><IoMdSchool /> Attendance</button></li>
//       </ul>

//       <div className="section-title">RESOURCES</div>
//       <ul className="menu">
//         <li><button><MdLibraryBooks /> Book Library</button></li>
//         <li><button><FaUsers /> Recommendations</button></li>
//         <li><button><FaUsers /> Skills Exchange</button></li>
//         <li><button><FaUsers /> Study Groups</button></li>
//       </ul>

//       <div className="section-title">SETTINGS</div>
//       <ul className="menu">
//         <li><button><FaUser /> Profile</button></li>
//         <li><button><FaCogs /> Settings</button></li>
//         <li><button><MdHelpOutline /> Help Center</button></li>
//         <li><button><MdLogout /> Logout</button></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome, FaBook, FaClipboardList, FaChartBar, FaCalendarAlt, FaUser, FaCogs, FaUsers
} from 'react-icons/fa';
import { MdLibraryBooks, MdHelpOutline, MdLogout } from 'react-icons/md';
import { IoMdSchool } from 'react-icons/io';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-circle">E</div>
        <h3>EduSmart</h3>
      </div>
      <div className="logo-divider"></div>

      <div className="section-title">MAIN</div>
      <ul className="menu">
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <button onClick={() => navigate('/dashboard')}><FaHome /> Dashboard</button>
        </li>
        <li className={isActive('/courses') ? 'active' : ''}>
          <button onClick={() => navigate('/courses')}><FaBook /> My Courses</button>
        </li>
        <li className={isActive('/schedule') ? 'active' : ''}>
          <button onClick={() => navigate('/schedule')}><FaCalendarAlt /> Schedule</button>
        </li>
        <li className={isActive('/assignments') ? 'active' : ''}>
          <button onClick={() => navigate('/assignments')}><FaClipboardList /> Assignments</button>
        </li>
        <li className={isActive('/grades') ? 'active' : ''}>
          <button onClick={() => navigate('/grades')}><FaChartBar /> Grades</button>
        </li>
        <li className={isActive('/attendance') ? 'active' : ''}>
          <button onClick={() => navigate('/attendance')}><IoMdSchool /> Attendance</button>
        </li>
      </ul>

      <div className="section-title">RESOURCES</div>
      <ul className="menu">
        <li className={isActive('/library') ? 'active' : ''}>
          <button onClick={() => navigate('/library')}><MdLibraryBooks /> Book Library</button>
        </li>
        <li className={isActive('/recommendations') ? 'active' : ''}>
          <button onClick={() => navigate('/recommendations')}><FaUsers /> Recommendations</button>
        </li>
        <li className={isActive('/skills') ? 'active' : ''}>
          <button onClick={() => navigate('/skills')}><FaUsers /> Skills Exchange</button>
        </li>
        <li className={isActive('/groups') ? 'active' : ''}>
          <button onClick={() => navigate('/groups')}><FaUsers /> Study Groups</button>
        </li>
      </ul>

      <div className="section-title">SETTINGS</div>
      <ul className="menu">
        <li className={isActive('/profile') ? 'active' : ''}>
          <button onClick={() => navigate('/profile')}><FaUser /> Profile</button>
        </li>
        <li className={isActive('/settings') ? 'active' : ''}>
          <button onClick={() => navigate('/settings')}><FaCogs /> Settings</button>
        </li>
        <li className={isActive('/help') ? 'active' : ''}>
          <button onClick={() => navigate('/help')}><MdHelpOutline /> Help Center</button>
        </li>
        <li>
          <button onClick={() => alert("Logout logic goes here")}><MdLogout /> Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
