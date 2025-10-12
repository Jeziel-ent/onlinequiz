import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* 🔹 Navbar appears on all pages */}
      <Navbar />

      {/* 🔹 Routes for all pages */}
      <div className="pt-16"> {/* Adds space for fixed Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
