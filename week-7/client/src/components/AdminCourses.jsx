import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [editingCourseId, setEditingCourseId] = useState(null);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:3000/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createCourse = async () => {
    if (!token) return setMessage("Please login as admin");
    try {
      const res = await axios.post(
        "http://localhost:3000/admin/courses",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setForm({ title: "", description: "", imageUrl: "", price: "" });
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating course");
    }
  };

  const startEdit = (course) => {
    setEditingCourseId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      price: course.price,
    });
  };

  const updateCourse = async () => {
    if (!token || !editingCourseId) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/admin/courses/${editingCourseId}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setEditingCourseId(null);
      setForm({ title: "", description: "", imageUrl: "", price: "" });
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating course");
    }
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>
      {message && <p>{message}</p>}

      <h4>{editingCourseId ? "Edit Course" : "Create Course"}</h4>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      {editingCourseId ? (
        <button onClick={updateCourse}>Update Course</button>
      ) : (
        <button onClick={createCourse}>Create Course</button>
      )}

      <h4>Your Courses</h4>
      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            {c.title} - ${c.price}{" "}
            <button onClick={() => startEdit(c)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;