import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", rollNo: "", department: "", marks: "" });
  const [message, setMessage] = useState("");

  // Fetch all students
  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/students", form);
      setMessage(res.data.message);
      fetchStudents(); // refresh list
      setForm({ name: "", rollNo: "", department: "", marks: "" });
    } catch (err) {
      setMessage("❌ Error: " + err.response.data.error);
    }
  };

  // Delete student
  const handleDelete = async (rollNo) => {
    await axios.delete(`http://localhost:5000/students/${rollNo}`);
    setMessage("🗑️ Student deleted successfully!");
    fetchStudents();
  };

  // Update student (marks only for demo)
  const handleUpdate = async (rollNo) => {
    const newMarks = prompt("Enter new marks:");
    if (!newMarks) return;
    await axios.put(`http://localhost:5000/students/${rollNo}`, { marks: Number(newMarks) });
    setMessage("✏️ Student updated successfully!");
    fetchStudents();
  };

  return (
    <div className="app-container">
      <h1>🎓 Student Management</h1>

      {message && <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Roll No" value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Marks" value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })} />
        <button type="submit">Add Student</button>
      </form>

      <ul>
        {students.map(s => (
          <li key={s._id}>
            <span className="student-info">
              {s.name} ({s.rollNo}) - {s.department}
            </span>
            <span className="student-marks">{s.marks} marks</span>
            <div>
              <button onClick={() => handleUpdate(s.rollNo)}>Update</button>
              <button onClick={() => handleDelete(s.rollNo)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
