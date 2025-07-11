import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "./pages/login/Login";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminTest from "./pages/AdminTest";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      switch (user.role) {
        case "superadmin":
          navigate("/superadmin");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${user.role}`} />} />

      <Route
        path="/superadmin"
        element={
          <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
            <SuperAdminDashboard user={user} logout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} allowedRoles={["admin"]}>
            <AdminTest user={user} logout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute user={user} allowedRoles={["teacher"]}>
            <TeacherDashboard user={user} logout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute user={user} allowedRoles={["student"]}>
            <StudentDashboard user={user} logout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={`/${user.role}`} />} />
    </Routes>
  );
}

export default App;
