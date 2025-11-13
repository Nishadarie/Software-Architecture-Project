import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home"; // ✅ Home page
import ForgotPassword from "./components/ForgotPassword";
import Success from "./components/Success";
import Navbar from "./components/Navbar";
import ReserveStall from "./pages/ReserveStall"; // ✅ Updated import (from pages)
import "./Login.css";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <BrowserRouter>
      {/* ✅ Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/success" element={<Success />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* ✅ Stall Reservation Page (from /pages) */}
        <Route
          path="/stall-reservation"
          element={isAuthenticated ? <ReserveStall /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
