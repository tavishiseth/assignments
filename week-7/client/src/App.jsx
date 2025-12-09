import React from "react";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";

function App() {
  return (
    <div>
      <h1>Online Courses Platform</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ flex: 1 }}>
          <Home /> {/* Regular user view */}
        </div>
        <div style={{ flex: 1 }}>
          <AdminHome /> {/* Admin view */}
        </div>
      </div>
    </div>
  );
}

export default App;