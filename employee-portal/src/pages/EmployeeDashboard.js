import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ViewAllStalls from "./ViewAllStalls";
import Reservations from "./Reservations";
import UserManagement from "./Usermanagement";
import GenreSelection from "./GenreSelection";
import '../styles/EmployeeDashboard.css';


function EmployeeDashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-main">
                <Header />
                <div className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<ViewAllStalls />} />
                        <Route path="/reservations" element={<Reservations />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/genres" element={<GenreSelection />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard;