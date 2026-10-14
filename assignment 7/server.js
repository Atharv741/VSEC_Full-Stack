
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Temporary in-memory student data
let students = [
  { id: 1, name: "Rahul", age: 20, course: "BCA" },
  { id: 2, name: "Priya", age: 21, course: "BSc" }
];

let nextId = 3;

// GET: Retrieve all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET: Retrieve a student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST: Add a new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    !Number.isInteger(age) || age <= 0 ||
    typeof course !== "string" || !course.trim()
  ) {
    return res.status(400).json({
      message: "Provide a valid name, positive integer age, and course"
    });
  }

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    age,
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// PUT: Update a student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    !Number.isInteger(age) || age <= 0 ||
    typeof course !== "string" || !course.trim()
  ) {
    return res.status(400).json({
      message: "Provide a valid name, positive integer age, and course"
    });
  }

  student.name = name.trim();
  student.age = age;
  student.course = course.trim();

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
