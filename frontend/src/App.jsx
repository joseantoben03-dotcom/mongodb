import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", rollNo: "", department: "", marks: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/students", form);
    setStudents([...students, res.data]);
    setForm({ name: "", rollNo: "", department: "", marks: "" });
  };

  return (
    <div className="app-container">
      <h1>🎓 Student Management</h1>

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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
