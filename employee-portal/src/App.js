import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/dashboard/*" element={<EmployeeDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
