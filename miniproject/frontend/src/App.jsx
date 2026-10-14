import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [marks, setMarks] = useState("");
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);

    // Fetch students from backend on load and when search changes
    useEffect(() => {
        fetch(`http://localhost:5000/api/students?search=${search}`)
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, [search]);

    // Add student
    async function addStudent() {
        if (name === "" || roll === "" || marks === "") {
            alert("Please fill all details");
            return;
        }

        if (
            Number(marks) < 0 ||
            Number(marks) > 100 ||
            !Number.isFinite(Number(marks))
        ) {
            alert("Marks must be between 0 and 100");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, roll, marks: Number(marks) })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Error adding student");
                return;
            }

            setStudents([...students, data]);
            setName("");
            setRoll("");
            setMarks("");
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to connect to server");
        }
    }

    // Delete student
    async function deleteStudent(rollNumber) {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${rollNumber}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setStudents(students.filter((student) => student.roll !== rollNumber));
            } else {
                alert("Error deleting student");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to connect to server");
        }
    }

    return (
        <div className="app">
            <h1>Student Management System</h1>

            <div className="container">
                <h2>Add Student Details</h2>

                <div className="form">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter Roll No."
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Enter Marks (0-100)"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />
                </div>

                <button className="add-btn" onClick={addStudent}>
                    Add Student
                </button>

                <h2>Search Student</h2>

                <input
                    className="search"
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No.</th>
                            <th>Marks</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.roll}>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.marks}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteStudent(student.roll)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <p>No students found.</p>
                )}

                <p className="total">
                    Total Students: {students.length}
                </p>
            </div>
        </div>
    );
}

export default App;