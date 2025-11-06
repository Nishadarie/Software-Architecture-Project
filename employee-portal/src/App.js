import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import GenreSelection from "./pages/GenreSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/genres" element={<GenreSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
