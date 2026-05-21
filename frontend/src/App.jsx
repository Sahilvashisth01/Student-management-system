import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/studentList";
import "./App.css";

const apiUrl = "http://localhost:8000/students";
function App() {
  const [students, setStudents] = useState([]); //state to hold students data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [editId, setEditId] = useState(null);

  //fetch all student from backend
  const fetchstudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchstudents();
  }, []); //fetch students when component mounts

  const handleChange = (e) => {
    //handle form input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //update form data based on input name and value
    });
  };

  // Add new student
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission behavior

    try {
      if (editId) {
        // Update existing student
        await axios.put(`${apiUrl}/${editId}`, formData);
        setEditId(null); // Clear edit ID after updating
      } else {
        // Add new student
        await axios.post(apiUrl, formData);
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        course: "",
      });

      // Refresh table
      fetchstudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchstudents(); // Refresh table after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setEditId(student.id); // Set the ID of the student being edited
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Student Management System</h1>

      {/* Form */}
      <StudentForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editId={editId}
      />

        {/* Student List */}
      <StudentList
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
