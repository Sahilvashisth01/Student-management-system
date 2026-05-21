const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send('Welcome to the Student Management API');
});

//get all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching students');
        } else {
            res.json(results);
        }
    });
});

//add a new student
app.post("/students", (req, res) => {
    const {name, email, course } = req.body;
    const sql = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";
    db.query(sql, [name, email, course], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding student');
        } else {
            res.json({ id: results.insertId, name, email, course });
        }
    });
});

//update a student
app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, course } = req.body;
    const sql = "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?";
    db.query(sql, [name, email, course, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating student');
        } else {
            res.json({ id, name, email, course });
        }
    });
});

//delete a student
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting student');
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    });
});


//start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});