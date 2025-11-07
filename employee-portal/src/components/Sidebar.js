import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Employee Portal</h2>
            <nav>
                <u1>
                    <li><Link to="/dashboard">View All Stalls</Link></li>
                    <li><Link to="/dashboard/reservations">Reservations</Link></li>
                    <li><Link to="/dashboard/users">User Management</Link></li>
                     <li><Link to="/dashboard/genres">Genre Selection</Link></li>
                </u1>
            </nav>
        </div>
    );
}

export default Sidebar;