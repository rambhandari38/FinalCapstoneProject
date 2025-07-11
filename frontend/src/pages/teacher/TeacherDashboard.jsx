import React, { useEffect, useState } from "react";
import API from "../../api";

export default function TeacherDashboard({ user, logout }) {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState({
    title: "",
    content: "",
    file: null,
    dueDate: "",
  });
  const [assignmentList, setAssignmentList] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await API.get("/users/students");
        setStudents(res.data);
      } catch (err) {
        alert("Failed to load students");
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await API.get("/assignments");
        setAssignmentList(res.data);
      } catch (err) {
        alert("Failed to load assignments");
      }
    }
    fetchAssignments();
  }, []);

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const saveAttendance = async () => {
    setLoading(true);
    try {
      const attendanceList = students.map((stu) => ({
        studentId: stu._id,
        present: attendance[stu._id] || false,
      }));
      await API.post("/attendance", { attendanceList, date });
      alert("Attendance saved!");
    } catch (err) {
      alert("Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setAssignment({ ...assignment, file: files[0] });
    } else {
      setAssignment({ ...assignment, [name]: value });
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    if (!assignment.title || !assignment.file || !assignment.dueDate) {
      return alert("Please provide title, file, and due date.");
    }
    const formData = new FormData();
    formData.append("title", assignment.title);
    formData.append("content", assignment.content);
    formData.append("dueDate", assignment.dueDate);
    formData.append("file", assignment.file);

    try {
      const res = await API.post("/assignments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Assignment uploaded successfully");
      setAssignment({ title: "", content: "", file: null, dueDate: "" });
      setAssignmentList((prev) => [res.data, ...prev]);
    } catch (err) {
      alert("Failed to upload assignment");
    }
  };

  const getStudentNameById = (id) => {
    const student = students.find((s) => s._id === id);
    return student ? student.username : "(Unknown)";
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📚 Teacher Dashboard</h1>
        <p>
          Welcome, <strong>{user.username}</strong> (Role: {user.role})
        </p>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </header>

      <section style={styles.section}>
        <h2>📋 Attendance ({date})</h2>
        <label style={{ marginBottom: 10 }}>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
        </label>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu._id}>
                <td>{stu.username}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={!!attendance[stu._id]}
                    onChange={() => toggleAttendance(stu._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={saveAttendance} disabled={loading} style={styles.primaryBtn}>
          {loading ? "Saving..." : "Save Attendance"}
        </button>
      </section>

      <section style={styles.section}>
        <h2>📤 Upload Assignment</h2>
        <form onSubmit={handleAssignmentSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={assignment.title}
            onChange={handleAssignmentChange}
            style={styles.input}
            required
          />
          <textarea
            name="content"
            placeholder="Optional description"
            value={assignment.content}
            onChange={handleAssignmentChange}
            rows={3}
            style={styles.input}
          />
          <input
            type="date"
            name="dueDate"
            value={assignment.dueDate}
            onChange={handleAssignmentChange}
            style={styles.input}
            required
          />
          <input
            type="file"
            name="file"
            onChange={handleAssignmentChange}
            accept=".pdf,.doc,.docx"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.primaryBtn}>Upload</button>
        </form>
      </section>

      <section style={styles.section}>
        <h2>📄 Assignments</h2>
        {assignmentList.length === 0 ? (
          <p>No assignments uploaded.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Due</th>
                <th>File</th>
                <th>Submitted</th>
                <th>Remaining</th>
                <th>Names</th>
              </tr>
            </thead>
            <tbody>
              {assignmentList.map((a) => {
                const submittedIds = a.submittedBy || [];
                const submittedNames = submittedIds.map(getStudentNameById);
                const remaining = students.length - submittedIds.length;
                return (
                  <tr key={a._id}>
                    <td>{a.title}</td>
                    <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                    <td>
                      <a href={`http://localhost:5000/${a.file}`} target="_blank" rel="noreferrer">
                        Download
                      </a>
                    </td>
                    <td>{submittedIds.length}</td>
                    <td>{remaining}</td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: 15 }}>
                        {submittedNames.length === 0 ? (
                          <li>—</li>
                        ) : (
                          submittedNames.map((name, idx) => (
                            <li key={idx}>{name}</li>
                          ))
                        )}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 1100,
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif",
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
  th: {
    backgroundColor: "#eee",
  },
  td: {
    padding: "10px 5px",
    borderBottom: "1px solid #ccc",
  },
};
