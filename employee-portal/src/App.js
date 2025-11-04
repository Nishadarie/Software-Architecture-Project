import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import GenreSelection from "./pages/GenreSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genres"
          element={
            <ProtectedRoute>
              <GenreSelection />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
