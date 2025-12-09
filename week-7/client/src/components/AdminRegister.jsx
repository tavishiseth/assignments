import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleRegister() {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/signup",
        formData
      );
      setMessage(response.data.message);
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        window.location.reload(); // refresh to show admin dashboard
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering");
    }
  }

  return (
    <div>
      <h3>Admin Register</h3>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegister;