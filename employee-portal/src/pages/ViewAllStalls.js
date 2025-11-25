import React, { useState, useEffect } from "react";
import "../styles/Table.css";
import "../styles/ViewAllStalls.css";
import { getAllStalls } from "../utils/api";

function ViewAllStalls() {
    const [filter, setFilter] = useState("All");
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStalls(true); // Show loading on initial load
        // Auto-refresh every 5 seconds to get updated reservation status (silent refresh)
        const interval = setInterval(() => {
            loadStalls(false); // Don't show loading on auto-refresh
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    const loadStalls = async (showLoading = true) => {
        if (showLoading) {
            setLoading(true);
        }
        const stallList = await getAllStalls();
        setStalls(stallList);
        if (showLoading) {
            setLoading(false);
        }
    };

    const getStatusDisplay = (status) => {
        if (status === "AVAILABLE" || status === "Available") {
            return "Available";
        } else if (status === "RESERVED" || status === "Reserved") {
            return "Reserved";
        }
        return status;
    };

    const filtered = stalls.filter((s) => {
        if (filter === "All") return true;
        const statusDisplay = getStatusDisplay(s.status);
        return statusDisplay === filter;
    });

    if (loading) {
        return <div className="table-container">Loading...</div>;
    }

    return (
        <div className="table-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>All Stalls</h2>
                <button 
                    onClick={loadStalls}
                    style={{
                        backgroundColor: "#008C8C",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    🔄 Refresh
                </button>
            </div>
            <div className="filter-bar">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>Available</option>
                    <option>Reserved</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Stall ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Reserved By</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                No stalls found
                            </td>
                        </tr>
                    ) : (
                        filtered.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id.substring(0, 8)}...</td>
                                <td>{s.name || s.id.substring(0, 8) + "..."}</td>
                                <td>{s.size || "-"}</td>
                                <td>{s.price ? `Rs. ${s.price.toLocaleString()}` : "-"}</td>
                                <td className={getStatusDisplay(s.status) === "Available" ? "available" : "reserved"}>
                                    {getStatusDisplay(s.status)}
                                </td>
                                <td>{s.reservedBy || "-"}</td>
                                <td>{s.contact || "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllStalls;