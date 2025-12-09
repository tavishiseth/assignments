import React from "react";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Courses from "./components/Courses";

function App() {
  return (
    <div>
      <h1>Online Courses Platform</h1>
      <div style={{ display: "flex", gap: "50px" }}> {/* display: "flex" arranges the child <div> elements side by side horizontally. */}
        <div style={{ flex: 1 }}> {/* flex: 1 means both columns take equal width in the flex container. */}
          <Home /> {/* Regular user view */}
        </div>
        <div style={{ flex: 1 }}>
          <AdminHome /> {/* Admin view */}
        </div>
      </div>
      <div>
        {/* Public Courses view */}
        <Courses />  {/* fetchCourses() inside Courses will load courses from /users/courses */}
      </div>
    </div>
  );
}

export default App;