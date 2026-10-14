
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample student data
let students = [
  { id: 1, name: "Rahul", age: 20 },
  { id: 2, name: "Priya", age: 21 }
];

let nextId = 3;

// 1. GET - Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// 2. POST - Add a new student
app.post("/students", (req, res) => {
  const { name, age } = req.body;

  if (!name || !Number.isInteger(age) || age <= 0) {
    return res.status(400).json({
      message: "Valid name and positive age are required"
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    age
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// 3. PUT - Update a student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, age } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    !Number.isInteger(age) || age <= 0
  ) {
    return res.status(400).json({
      message: "Valid name and positive age are required"
    });
  }

  student.name = name.trim();
  student.age = age;

  res.json({
    message: "Student updated successfully",
    student
  });
});

// 4. DELETE - Delete a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
