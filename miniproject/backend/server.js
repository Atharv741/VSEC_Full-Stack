const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Student Schema and Model
const Student = mongoose.model("Student", new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, unique: true },
    marks: { type: Number, required: true, min: 0, max: 100 }
}));

// Home API
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// Get all students and search students
app.get("/api/students", async (req, res) => {
    try {
        const search = req.query.search || "";
        const students = await Student.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { roll: { $regex: search, $options: "i" } }
            ]
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Add student
app.post("/api/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: "Error adding student", error: err.message });
    }
});

// Delete student by Roll Number
app.delete("/api/students/:roll", async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ roll: req.params.roll });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting student" });
    }
});

// Start server after MongoDB connects
mongoose.connection.once("open", () => {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});