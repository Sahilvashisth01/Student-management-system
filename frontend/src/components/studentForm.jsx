const StudentForm = ({
  formData,
  handleChange,
  handleSubmit,
  editId
}) => {

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
      />

      <input
        type="text"
        name="course"
        value={formData.course}
        onChange={handleChange}x
        placeholder="Enter Course"
      />

      <button>
        {editId ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
};

export default StudentForm;