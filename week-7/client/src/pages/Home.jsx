import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Courses from "../components/Courses";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Online Courses</h2>

      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
          <Courses />
        </div>
      ) : (
        <div style={styles.authContainer}>
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
};

const styles = {
  authContainer: {
    display: "flex",
    gap: "50px",
    marginTop: "20px",
  },
  logoutButton: {
    padding: "10px 15px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default Home;