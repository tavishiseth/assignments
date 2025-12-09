// implement the home page UI here.
import React from "react";

// components imports
import Login from "../components/Login";
import Register from "../components/Register";
import Courses from "../components/Courses";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Learning Platform</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Login</h2>
          <Login />
        </div>

        <div style={styles.card}>
          <h2>Register</h2>
          <Register />
        </div>
      </div>

      <div style={styles.coursesSection}>
        <h2>Available Courses</h2>
        <Courses />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "40px",
    textAlign: "center",
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "40px",
    flexWrap: "wrap",
  },

  card: {
    width: "350px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f7f7f7",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  coursesSection: {
    marginTop: "30px",
  },
};

export default Home;