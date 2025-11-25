import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home"; // ✅ Home page
import ForgotPassword from "./components/ForgotPassword";
import Success from "./components/Success";
import Navbar from "./components/Navbar";
import ReserveStall from "./pages/ReserveStall"; // ✅ Updated import (from pages)
import "./Login.css";

function AppContent() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const showNavbar = location.pathname !== "/home";

  return (
    <>
      {/*  */}
      {showNavbar && <Navbar />}

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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
