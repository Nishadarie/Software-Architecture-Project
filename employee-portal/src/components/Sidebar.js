import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Employee Portal</h2>
            <nav>
                <u1>
                    <li><Link to="/">View All Stalls</Link></li>
                    <li><Link to="/reservations">Reservations</Link></li>
                    <li><Link to="/users">User Management</Link></li>
                </u1>
            </nav>
        </div>
    );
}

export default Sidebar;