import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

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

  const createCourse = async () => {
    if (!token) {
      setMessage("Please login as admin");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/admin/courses",
        { title, description, imageUrl, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setTitle("");
      setDescription("");
      setImageUrl("");
      setPrice("");
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating course");
    }
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>
      {message && <p>{message}</p>}

      <h4>Create Course</h4>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={createCourse}>Create Course</button>

      <h4>Your Courses</h4>
      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            {c.title} - ${c.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;