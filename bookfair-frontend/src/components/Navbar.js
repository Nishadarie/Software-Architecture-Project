// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Exhibition System</h2>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stall-reservation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Stall Reservation
          </NavLink>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
