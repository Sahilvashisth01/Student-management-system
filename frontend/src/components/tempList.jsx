const StudentList = ({
  students,
  handleEdit,
  handleDelete
}) => {

  return (

    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

  );
};

export default StudentList;