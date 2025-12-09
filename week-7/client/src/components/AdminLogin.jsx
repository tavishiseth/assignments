import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        formData
      );
      setMessage(response.data.message);
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        window.location.reload(); // refresh to show admin dashboard
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div>
      <h3>Admin Login</h3>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;