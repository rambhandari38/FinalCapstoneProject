import React, { useEffect, useState } from "react";
import API from "../../api"; // Make sure this path is correct
import "./StudentDashboard.css";
import Socket from "../Socket"; // ✅ adjust path if needed


export default function StudentDashboard({ user, logout }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const attendanceRes = await API.get("/attendance/my-attendance");
        setAttendanceRecords(attendanceRes.data);

        const assignmentsRes = await API.get("/assignments");
        setAssignments(assignmentsRes.data);

        const submissionsRes = await API.get("/submissions/mine");
        setSubmissions(submissionsRes.data);
      } catch (err) {
        alert("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssignmentId) return alert("Please select an assignment");
    if (!file) return alert("Please select a file to upload");

    const formData = new FormData();
    formData.append("assignmentId", selectedAssignmentId);
    formData.append("file", file);

    try {
      setUploading(true);
      await API.post("/submissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Assignment submitted successfully");

      const submissionsRes = await API.get("/submissions/mine");
      setSubmissions(submissionsRes.data);

      setSelectedAssignmentId("");
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert("Submission failed");
      console.error("Submission error:", err.response || err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎓 Student Dashboard</h1>
        <p>
          Welcome, <strong>{user.username}</strong> (Role: {user.role})
        </p>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <section style={styles.section}>
        <h2>🕒 Attendance</h2>
        {loading ? (
          <p>Loading attendance...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((record, i) => (
                  <tr key={i}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td style={{ color: record.present ? "green" : "red" }}>
                      {record.present ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>

      <section style={styles.section}>
        <h2>📄 Assignments</h2>
        {loading ? (
          <p>Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments available.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a._id}>
                  <td>{a.title}</td>
                  <td>{a.content || "—"}</td>
                  <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={styles.section}>
        <h2>📤 Submit Assignment</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            required
            value={selectedAssignmentId}
            onChange={(e) => setSelectedAssignmentId(e.target.value)}
            style={styles.input}
          >
            <option value="">-- Select Assignment --</option>
            {assignments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.title}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.primaryBtn} disabled={uploading}>
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2>📬 Your Submissions</h2>
        {loading ? (
          <p>Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Submitted On</th>
                <th>File</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.assignment.title}</td>
                  <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/${sub.file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </td>
                  <td>{sub.grade != null ? sub.grade : "Not graded yet"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ✅ Chat Component */}
    <section style={styles.section}>
      <h2>💬 Chat With Users</h2>
      <Socket currentUser={user.username} />
    </section>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 1000,
    margin: "auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  logoutBtn: {
    marginTop: 10,
    backgroundColor: "#ff5e5e",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: 5,
    cursor: "pointer",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  primaryBtn: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
};
