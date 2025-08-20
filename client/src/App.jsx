import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management</h1>
      <ul>
        {students.map((s) => (
          <li key={s.rollNo}>
            {s.name} ({s.department}) - Marks: {s.marks}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
